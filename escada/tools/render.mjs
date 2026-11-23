// Renderiza o video quadro a quadro no Chromium headless (Playwright) e entrega JPEGs ao ffmpeg.
//   node tools/render.mjs --snap 3,10.5,20 [--dir out/snaps]          PNGs de conferencia
//   node tools/render.mjs --from 0 --to 30 --out out/part0.mp4         um trecho (segundos)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, arr) => (v.startsWith('--') ? a.concat([[v.slice(2), arr[i + 1]]]) : a), []));
const FPS = 30;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2', '.json': 'application/json' };

const server = http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  const file = u.startsWith('/vendor/three/') ? path.join(ROOT, 'node_modules/three', u.slice('/vendor/three/'.length)) : path.join(ROOT, 'web', u === '/' ? 'index.html' : u);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' }); res.end(data);
  });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(url);
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 }).catch(() => {});
if (errors.length) { console.error('erros na pagina:\n' + errors.join('\n')); }

if (args.allshots) {                       // um quadro por plano (na fracao pedida de cada plano)
  const fr = Number(args.allshots);
  args.snap = (await page.evaluate((fr) => { const s = window.SHOTS.map((x) => x.t0).concat([window.TL.duration]); return s.slice(0, -1).map((a, i) => (a + (s[i + 1] - a) * fr).toFixed(2)); }, fr)).join(',');
}
if (args.snap) {
  const dir = path.resolve(ROOT, args.dir || 'out/snaps');
  fs.mkdirSync(dir, { recursive: true });
  for (const s of args.snap.split(',')) {
    const t = Number(s);
    await page.evaluate((t) => window.renderAt(t), t);
    const f = path.join(dir, `t${t.toFixed(2).padStart(7, '0')}.png`);
    await page.screenshot({ path: f, type: 'png' });
    console.log(f);
  }
} else {
  const dur = await page.evaluate(() => window.TL.duration);
  const from = Number(args.from || 0), to = Math.min(Number(args.to || dur), dur);
  const f0 = Math.round(from * FPS), f1 = Math.round(to * FPS);
  const out = path.resolve(ROOT, args.out || 'out/video.mp4');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(FPS), out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = f0; f < f1; f++) {
    await page.evaluate((t) => window.renderAt(t), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if ((f - f0) % 150 === 0) console.log(`${path.basename(out)}: quadro ${f - f0}/${f1 - f0} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  console.log('ok', out, ((Date.now() - t0) / 1000).toFixed(0) + ' s');
}
if (errors.length) console.error(errors.slice(0, 10).join('\n'));
await browser.close();
server.close();
