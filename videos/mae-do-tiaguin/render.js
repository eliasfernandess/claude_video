// node render.js saida.mp4 quadroInicial quadroFinal
// 30 qps. Cada quadro é a média de 16 instantes (o borrão de movimento real).
// Nos trechos calmos só 4 instantes são desenhados (cada um repetido 4x), para ganhar tempo.
const { chromium } = require('playwright'); const { spawn } = require('child_process');
(async () => {
  const out = process.argv[2], f0 = +process.argv[3], f1 = +process.argv[4], S = 16, FPS = 30, SH = .75;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('ERRO', e.message));
  await p.goto('file://' + process.cwd() + '/index.html'); await p.waitForFunction('window.pronto', null, { timeout: 60000 });
  const cortes = await p.evaluate(() => CORTES.slice().sort((a, b) => a - b)), dur = await p.evaluate(() => DUR);
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS * S), '-i', '-',
    '-vf', `tmix=frames=${S},select='eq(mod(n\\,${S})\\,${S - 1})',setpts=N/${FPS}/TB`, '-r', String(FPS), '-c:v', 'libx264', '-crf', '15', '-preset', 'medium', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const envia = async (buf) => { if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); };
  const ini = Date.now();
  for (let f = f0; f < f1; f++) {
    const tc = f / FPS; let a = 0, z = dur; for (const c of cortes) { if (c <= tc + 1e-6) a = c; else { z = c; break; } }
    const n = await p.evaluate(t => subquadros(t) , tc);
    for (let k = 0; k < n; k++) {
      const t = Math.min(z - 1e-4, Math.max(a, tc + (k / (n - 1) - .5) * SH / FPS));
      await p.evaluate(t => renderAt(t), t);
      const buf = await p.screenshot({ type: 'jpeg', quality: 93 });
      for (let r = 0; r < S / n; r++) await envia(buf);
    }
    if ((f - f0) % 60 === 0) console.log(`quadro ${f - f0}/${f1 - f0} (${((Date.now() - ini) / 1000).toFixed(0)} s)`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('FIM', out);
})();
