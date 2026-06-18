import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || '3000', 10);
const NEXT_PORT = parseInt(process.env.NEXT_PORT || '3001', 10);

const app = express();

// Forward /et360.dp/* to Next.js keeping the full path prefix
// (Next.js with basePath expects the prefix in the request)
const nextProxy = createProxyMiddleware({
  target: `http://127.0.0.1:${NEXT_PORT}`,
  changeOrigin: true,
  on: {
    error: (_err, _req, res) => {
      res.statusCode = 502;
      res.end('ET360.dp is starting — refresh in a moment.');
    },
  },
});

app.use((req, res, next) => {
  if (req.url.startsWith('/et360.dp')) return nextProxy(req, res, next);
  next();
});

// Vite SPA
app.use(express.static(join(__dirname, 'dist')));
app.get('*', (_req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

app.listen(PORT, () => {
  console.log(`Listening on :${PORT}  →  / (Vite)  +  /et360.dp (Next.js)`);
});
