import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || '3000', 10);
const NEXT_PORT = parseInt(process.env.NEXT_PORT || '3001', 10);

const app = express();

// Proxy /et360.dp/* to Next.js.
// We do NOT use app.use('/et360.dp', proxy) because Express strips the prefix
// before forwarding — Next.js with basePath expects the full /et360.dp prefix.
const nextProxy = createProxyMiddleware({
  target: `http://127.0.0.1:${NEXT_PORT}`,
  changeOrigin: true,
  on: {
    error: (_err, _req, res) => {
      res.statusCode = 502;
      res.end('The ET360.dp app is starting — please refresh in a moment.');
    },
  },
});

app.use((req, res, next) => {
  if (req.url.startsWith('/et360.dp')) return nextProxy(req, res, next);
  next();
});

// Vite SPA static build
app.use(express.static(join(__dirname, 'dist')));

// SPA fallback for client-side routing
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy listening on :${PORT}`);
  console.log(`  Vite SPA  →  /`);
  console.log(`  Next.js   →  /et360.dp`);
});
