const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
p.on('pageerror', e => console.log('ERRO', e.message)); p.on('console', m => console.log('console', m.text()));
await p.goto('file://' + process.cwd() + '/index.html'); await p.waitForFunction('window.pronto', null, {timeout: 15000});
const ts = process.argv.slice(2).map(Number);

for (const t of ts) { await p.evaluate(t => renderAt(t), t); await p.screenshot({ path: `st_${t.toFixed(2)}.png` }); }
await b.close(); })();
