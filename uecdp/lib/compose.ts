declare module 'sharp' {
  interface ResizeOptions {
    fit?: string
    position?: string
  }

  interface JpegOptions {
    quality?: number
    mozjpeg?: boolean
  }

  interface CompositeInput {
    input: Buffer | string
    top: number
    left: number
    blend?: string
  }

  interface Sharp {
    resize(width: number, height: number, options?: ResizeOptions): Sharp
    toBuffer(): Promise<Buffer>
    composite(inputs: CompositeInput[]): Sharp
    png(): Sharp
    jpeg(options: JpegOptions): Sharp
  }

  function sharp(input?: string | Buffer): Sharp
}

import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

// ─── Template dimensions ──────────────────────────────────────────────────────
// Measured from the actual uploaded template (1024×1280px)
const TEMPLATE_WIDTH = 1024
const TEMPLATE_HEIGHT = 1280

// ─── Circle (yellow photo area) ───────────────────────────────────────────────
// Pixel-perfect values derived by analysing the template image programmatically.
// The yellow circle's inner photo area (inside the white ring):
const CIRCLE_LEFT = 58        // px from left edge to bounding box top-left
const CIRCLE_TOP = 450        // px from top edge to bounding box top-left
const CIRCLE_DIAMETER = 430   // diameter of the photo area

// ─── Name label ───────────────────────────────────────────────────────────────
// The yellow name label rectangle sits at rows 855–969, X 86–461
const NAME_LEFT = 90
const NAME_TOP = 885          // top row of the yellow label rectangle
const NAME_BOX_WIDTH = 375    // label width
const NAME_BOX_HEIGHT = 114   // label height (855→969)
const NAME_FONT_SIZE = 40
const NAME_COLOR = '#1a5c1a'  // dark green matching the design

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Reads the template PNG from /public/template.png.
 * Throws if the file is missing — fail fast so the dev knows.
 */
function getTemplatePath(): string {
  const templatePath = path.join(process.cwd(), 'public', 'template.png')
  if (!fs.existsSync(templatePath)) {
    throw new Error(
      'template.png not found in /public. ' +
        'Export your flyer template as a PNG and place it at public/template.png'
    )
  }
  return templatePath
}

/**
 * Creates a circular mask SVG buffer.
 */
function makeCircleMask(diameter: number): Buffer {
  const r = diameter / 2
  return Buffer.from(
    `<svg width="${diameter}" height="${diameter}" xmlns="http://www.w3.org/2000/svg">
       <circle cx="${r}" cy="${r}" r="${r}" fill="white"/>
     </svg>`
  )
}

/**
 * Creates an SVG text overlay for the person's name.
 * The SVG is sized to the full label box. In sharp, `y` is the text baseline.
 * We use NAME_BOX_HEIGHT/2 + NAME_FONT_SIZE/3 to vertically center the baseline.
 */
function makeNameOverlay(name: string): Buffer {
  // Sanitize name for SVG (escape XML special chars)
  const safeName = name
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  // Auto-fit: pick the largest font size (capped at NAME_FONT_SIZE) that keeps
  // the name within the label box, so long names never overflow.
  const HPAD = 24
  const maxWidth = NAME_BOX_WIDTH - HPAD * 2
  const CHAR_WIDTH_FACTOR = 0.62 // conservative avg glyph advance for bold sans
  const visibleLen = Math.max(name.trim().length, 1)

  let fontSize = Math.min(
    NAME_FONT_SIZE,
    Math.floor(maxWidth / (CHAR_WIDTH_FACTOR * visibleLen))
  )
  fontSize = Math.max(fontSize, 14) // readability floor

  const estWidth = CHAR_WIDTH_FACTOR * fontSize * visibleLen
  const baselineY = Math.round(NAME_BOX_HEIGHT / 2 + fontSize * 0.35)

  // Hard guarantee: if even at the floor size the name is still too wide,
  // squeeze the glyph spacing so it fits exactly within the box.
  const fitAttr =
    estWidth > maxWidth
      ? ` textLength="${maxWidth}" lengthAdjust="spacingAndGlyphs"`
      : ''

  return Buffer.from(
    `<svg width="${NAME_BOX_WIDTH}" height="${NAME_BOX_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
       <text
         x="${NAME_BOX_WIDTH / 2}"
         y="${baselineY}"
         font-size="${fontSize}"
         font-weight="700"
         font-family="DejaVu Sans, Arial, Helvetica, sans-serif"
         fill="${NAME_COLOR}"
         text-anchor="middle"${fitAttr}
       >${safeName}</text>
     </svg>`
  )
}

/**
 * Composes the final DP image:
 *  1. Loads template
 *  2. Crops the user's photo into a circle
 *  3. Composites the circle onto the template's yellow area
 *  4. Overlays the person's name
 *
 * Returns a JPEG buffer ready to upload or stream.
 */
export async function composeDP(
  photoBuffer: Buffer,
  name: string
): Promise<Buffer> {
  const templatePath = getTemplatePath()

  // Step 1 — Resize and circle-crop the user's photo
  const resizedPhoto = await sharp(photoBuffer)
    .resize(CIRCLE_DIAMETER, CIRCLE_DIAMETER, {
      fit: 'cover',
      position: 'centre',
    })
    .toBuffer()

  const circularPhoto = await sharp(resizedPhoto)
    .composite([
      {
        input: makeCircleMask(CIRCLE_DIAMETER),
        blend: 'dest-in',
      },
    ])
    .png()   // must stay PNG to preserve transparency
    .toBuffer()

  // Step 2 — Composite everything onto the template
  const result = await sharp(templatePath)
    .resize(TEMPLATE_WIDTH, TEMPLATE_HEIGHT) // ensure template is correct size
    .composite([
      {
        input: circularPhoto,
        top: CIRCLE_TOP,
        left: CIRCLE_LEFT,
        blend: 'over',
      },
      {
        // SVG is sized to NAME_BOX_WIDTH × NAME_BOX_HEIGHT — placed at the label's top-left
        input: makeNameOverlay(name),
        top: NAME_TOP,
        left: NAME_LEFT,
        blend: 'over',
      },
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer()

  return result
}
