// node render.js saida.mp4 [t0] [t1]  — 30 qps, 5 subquadros por quadro (borrão de movimento real)
const { chromium } = require('playwright'); const { spawn } = require('child_process');
(async () => {
  const out = process.argv[2], S = +(process.env.SUB || 16), FPS = 30, SH = .75;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('ERRO', e.message));
  await p.goto('file://' + process.cwd() + '/index.html'); await p.waitForFunction('window.pronto');
  const cortes = await p.evaluate(() => CORTES.slice().sort((a, b) => a - b)); const dur = await p.evaluate(() => DUR), t0 = +(process.argv[3] || 0), t1 = +(process.argv[4] || dur);
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS * S), '-i', '-',
    '-vf', `tmix=frames=${S},select='eq(mod(n\\,${S})\\,${S - 1})',setpts=N/${FPS}/TB`, '-r', String(FPS), '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N = Math.round((t1 - t0) * FPS), ini = Date.now();
  for (let f = 0; f < N; f++) {
    for (let k = 0; k < S; k++) {
      const tc = t0 + f / FPS; let a = 0, z = dur; for (const c of cortes) { if (c <= tc + 1e-6) a = c; else { z = c; break; } }
      const t = Math.min(z - 1e-4, Math.max(a, tc + (k / (S - 1) - .5) * SH / FPS));
      await p.evaluate(t => renderAt(t), t);
      const buf = await p.screenshot({ type: 'jpeg', quality: 93 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    }
    if (f % 30 === 0) console.log(`quadro ${f}/${N} (${((Date.now() - ini) / 1000).toFixed(0)} s)`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('FIM', out);
})();
