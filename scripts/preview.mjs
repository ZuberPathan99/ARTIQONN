import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

// A development-only static preview. No application backend is deployed.
const root = resolve('build/client');
const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405);
    response.end('Local preview does not accept submissions.');
    return;
  }
  try {
    const path = decodeURIComponent(
      new URL(request.url, `http://127.0.0.1:${port}`).pathname,
    );
    let file = resolve(root, `.${path}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) {
      response.writeHead(403);
      response.end();
      return;
    }
    let status = 200;
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      await stat(file);
    } catch {
      file = resolve(root, '404.html');
      status = 404;
    }
    const content = await readFile(file);
    const type = types[extname(file)] || 'application/octet-stream';
    const compress =
      /text|javascript|xml|svg/.test(type) &&
      /gzip/.test(request.headers['accept-encoding'] || '');
    response.writeHead(status, {
      'Content-Type': type,
      'Cache-Control': 'no-cache',
      Vary: 'Accept-Encoding',
      ...(compress ? { 'Content-Encoding': 'gzip' } : {}),
    });
    response.end(
      request.method === 'HEAD'
        ? undefined
        : compress
          ? gzipSync(content)
          : content,
    );
  } catch {
    response.writeHead(500);
    response.end(
      'Build the website with npm run build before starting the preview.',
    );
  }
});
server.listen(port, '127.0.0.1', () =>
  console.log(`ARTIQONN production preview: http://127.0.0.1:${port}`),
);
