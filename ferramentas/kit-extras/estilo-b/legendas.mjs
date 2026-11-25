// Gera compositions/ui.html (legendas e gráficos) a partir da transcrição e do ui.json do projeto.
import fs from 'node:fs';
import path from 'node:path';
export function gerarUI(P) {
  const cfg = JSON.parse(fs.readFileSync(path.join(P, 'ui.json'), 'utf8'));
  const T = cfg.duracao;
  const d = JSON.parse(fs.readFileSync(path.join(P, 'assets', 'audio', 'transcript.json'), 'utf8'));
  const raw = Array.isArray(d) ? d : d.words;
  const NUM = { 0: 'zero', 1: 'um', 2: 'dois', 3: 'três', 4: 'quatro', 5: 'cinco', 6: 'seis', 7: 'sete', 8: 'oito', 9: 'nove', 10: 'dez', 11: 'onze', 12: 'doze', 13: 'treze', 14: 'catorze', 15: 'quinze', 16: 'dezesseis', 17: 'dezessete', 18: 'dezoito', 19: 'dezenove', 20: 'vinte' };
  const trocas = { ...NUM, ...(cfg.trocas || {}) }, destaques = new Set((cfg.destaques || []).map(s => s.toLowerCase())), ruins = new Set((cfg.ruins || []).map(s => s.toLowerCase())); const RMH = cfg.estilo === 'rmh';
  const limpa = (s) => s.toLowerCase().replace(/[.,!?;:…"]/g, '');
  // corrige palavras que o whisper junta ("Ea", "Eo") e aplica trocas
  const w = [];
  for (const x of raw) {
    const t = x.text.trim(); if (!t) continue;
    if (/^E[ao]$/.test(t)) { w.push({ text: 'E', start: x.start, end: x.start + .06 }, { text: t[1], start: x.start + .06, end: x.end }); continue; }
    const k = t.replace(/[.,!?;:]/g, ''); const punct = t.slice(k.length);
    w.push({ text: (trocas[k] ?? trocas[k.toLowerCase()] ?? k) + punct, start: x.start, end: x.end });
  }
  // grupos de até 3 palavras, quebrando em pontuação e pausas
  const grupos = []; let g = [];
  for (let i = 0; i < w.length; i++) {
    g.push(w[i]); const fim = /[.,!?;:]$/.test(w[i].text), pausa = w[i + 1] && w[i + 1].start - w[i].end > .18;
    if (fim || pausa || g.length >= (cfg.palavrasPorLegenda || 3) || i === w.length - 1) { grupos.push(g); g = []; }
  }
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const H = [], J = [];
  grupos.forEach((g, i) => {
    const a = g[0].start, nxt = grupos[i + 1] ? grupos[i + 1][0].start : T - .4, end = grupos[i + 1] ? Math.min(Math.max(g.at(-1).end + .05, g.at(-1).end + .35), nxt) : g.at(-1).end + .6;
    const sp = g.map(x => `<span style="color:${ruins.has(limpa(x.text)) ? '#F2493D' : destaques.has(limpa(x.text)) ? (RMH ? '#F8C630' : '#F2C14E') : '#fff'}">${esc(RMH ? x.text.toUpperCase() : x.text)}</span>`).join(' ');
    H.push(`<div id="cap${i}" class="clip capg" data-start="${a.toFixed(3)}" data-duration="${(end - a).toFixed(3)}">${sp}</div>`);
  });
  for (const [n, e] of (cfg.elementos || []).entries()) {
    const id = `el${n}`, a = e.inicio, dur = (e.fim - e.inicio).toFixed(3);
    if (e.tipo === 'placa' || e.tipo === 'contador') {
      H.push(`<div id="${id}" class="clip pq" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 216}px"><div class="pqi"><div id="${id}_n" class="pqn">${esc(e.tipo === 'contador' ? String(e.de ?? 0) : e.numero)}</div><div class="pql">${esc(e.rotulo || '')}</div></div></div>`);
      J.push(`tl.fromTo("#${id} .pqi",{opacity:0,scale:.92},{opacity:1,scale:1,duration:.16,ease:"power3.out"},${a});`);
      if (e.tipo === 'contador') J.push(`(function(){var o={v:${e.de ?? 0}},el=document.querySelector("#${id}_n");tl.fromTo(o,{v:${e.de ?? 0}},{v:${e.ate},duration:${e.duracaoConta ?? 1.2},ease:"power2.out",onUpdate:function(){if(el)el.textContent=String(Math.round(o.v)).replace(/\\B(?=(\\d{3})+(?!\\d))/g,".")+${JSON.stringify(e.sufixo || '')};}},${a + .05});})();`);
    } else if (e.tipo === 'pill') {
      H.push(`<div id="${id}" class="clip pill" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 224}px"><span>${esc(e.texto)}</span></div>`);
      J.push(`tl.fromTo("#${id}",{opacity:0},{opacity:1,duration:.3,ease:"none"},${a + .08});`);
    } else if (e.tipo === 'etiqueta') {
      H.push(`<div id="${id}" class="clip tag" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 230}px">${esc(e.texto)}</div>`);
      J.push(`tl.fromTo("#${id}",{opacity:0},{opacity:1,duration:.2},${a});`);
    } else if (e.tipo === 'destaque') {
      H.push(`<div id="${id}" class="clip pq" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 250}px"><div class="pqi" style="border-color:#6FF0D8aa"><div class="pqn" style="font-size:82px;color:#8FF0DD;text-shadow:0 0 22px #6FF0D888">${esc(e.texto)}</div></div></div>`);
      J.push(`tl.fromTo("#${id} .pqi",{opacity:0,scale:1.3},{opacity:1,scale:1,duration:.14,ease:"power3.out"},${a});`);
    } else if (e.tipo === 'card') {
      // card branco com etiqueta vermelha em cima (estilo B)
      H.push(`<div id="${id}" class="clip rcard" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 250}px"><div class="rci">${e.etiqueta ? `<div class="rct">${esc(e.etiqueta)}</div>` : ''}${e.sub ? `<div class="rcs">${esc(e.sub)}</div>` : ''}<div class="rcm" style="font-size:${e.tamanho ?? 84}px">${esc(e.titulo || '')}</div>${e.rodape ? `<div class="rcs">${esc(e.rodape)}</div>` : ''}</div></div>`);
      J.push(`tl.fromTo("#${id} .rci",{opacity:0,scale:.55,y:30},{opacity:1,scale:1,y:0,duration:.22,ease:"back.out(2.2)"},${a});`);
      J.push(`tl.to("#${id} .rci",{opacity:0,scale:.9,duration:.12,ease:"power2.in"},${(e.fim - .12).toFixed(3)});`);
    } else if (e.tipo === 'quadrinho') {
      H.push(`<div id="${id}" class="clip rq" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 420}px;left:${e.esquerda ?? 0}px;width:${e.largura ?? 1080}px"><span style="color:${e.cor ?? '#F8C630'};transform:rotate(${e.rot ?? -6}deg)">${esc(e.texto)}</span></div>`);
      J.push(`tl.fromTo("#${id} span",{scale:.2,opacity:0},{scale:1,opacity:1,duration:.14,ease:"back.out(3)"},${a});`);
      J.push(`tl.to("#${id} span",{opacity:0,duration:.12},${(e.fim - .12).toFixed(3)});`);
    } else if (e.tipo === 'numero') {
      H.push(`<div id="${id}" class="clip rn" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 700}px;left:${e.esquerda ?? 0}px;width:${e.largura ?? 1080}px"><span style="color:${e.cor ?? '#F8C630'};font-size:${e.tamanho ?? 120}px">${esc(e.texto)}</span></div>`);
      J.push(`tl.fromTo("#${id} span",{scale:.5,opacity:0},{scale:1,opacity:1,duration:.18,ease:"back.out(2.4)"},${a});`);
      J.push(`tl.to("#${id} span",{opacity:0,duration:.12},${(e.fim - .12).toFixed(3)});`);
    } else if (e.tipo === 'burst') {
      const pts = []; for (let k = 0; k < 28; k++) { const an = Math.PI * k / 14 - Math.PI / 2, r = k % 2 ? 165 : 250; pts.push(`${(270 + r * 1.2 * Math.cos(an)).toFixed(0)},${(240 + r * .82 * Math.sin(an)).toFixed(0)}`); }
      H.push(`<svg id="${id}" class="clip" data-start="${a}" data-duration="${dur}" width="540" height="480" viewBox="0 0 540 480" style="position:absolute;left:270px;top:${e.topo ?? 540}px;overflow:visible"><g id="${id}g"><polygon points="${pts.join(' ')}" fill="#F6D272" stroke="#C9472F" stroke-width="6" stroke-linejoin="round"/><text x="270" y="272" text-anchor="middle" font-family="Fraunces" font-weight="900" font-size="96" fill="#C9361F">${esc(e.texto)}</text></g></svg>`);
      J.push(`tl.fromTo("#${id}g",{scale:.35,rotation:-9,transformOrigin:"50% 50%"},{scale:1,rotation:-5,duration:.13,ease:"back.out(2)"},${a});`);
    }
  }
  const html = `<template>
<style>
@font-face{font-family:'Fraunces';src:url('assets/fonts/fraunces-black.ttf');font-weight:900}
#root{position:absolute;inset:0}
.capg{position:absolute;left:90px;width:900px;top:1190px;height:120px;display:flex;align-items:center;justify-content:center;gap:0 16px;flex-wrap:wrap;text-align:center;font:800 62px/1.05 Inter;letter-spacing:-.01em;text-shadow:0 3px 0 #0009,0 0 18px #000b,0 6px 26px #0007}
${RMH ? `@font-face{font-family:'Oswald';src:url('assets/fonts/oswald-700.woff2');font-weight:700}
.capg{top:1150px;font:700 66px/1.05 Oswald;letter-spacing:.012em;gap:0 18px;text-shadow:0 4px 0 #000a,0 0 4px #000,0 0 20px #000a}
.rcard{position:absolute;left:0;width:1080px;text-align:center}
.rci{display:inline-block;position:relative;background:#FBF8F1;border-radius:22px;padding:30px 60px 24px;box-shadow:0 14px 40px #0006;border:3px solid #E6DFD2;min-width:420px}
.rct{position:absolute;left:50%;top:-24px;transform:translateX(-50%);background:#D8392F;color:#fff;font:700 30px Oswald;letter-spacing:.06em;padding:6px 22px;border-radius:10px;white-space:nowrap}
.rcm{font:700 84px/1.05 Oswald;color:#23202A;letter-spacing:.01em}
.rcs{font:700 30px Oswald;color:#6B6458;letter-spacing:.08em;margin:4px 0}
.rq{position:absolute;text-align:center}
.rq span{display:inline-block;font:700 150px Oswald;-webkit-text-stroke:10px #23202A;paint-order:stroke fill;letter-spacing:.02em;text-shadow:0 10px 0 #0007}
.rn{position:absolute;text-align:center}
.rn span{display:inline-block;font-family:Oswald;font-weight:700;-webkit-text-stroke:9px #23202A;paint-order:stroke fill;text-shadow:0 8px 0 #0006}` : ''}
.capg span{display:inline-block}
.pq{position:absolute;left:0;width:1080px;text-align:center}
.pqi{display:inline-block;background:#0d1322EE;border:2px solid #EABA4266;border-radius:18px;padding:16px 44px 14px}
.pqn{font:900 112px Fraunces;color:#EABA42;text-shadow:0 0 22px #EABA4288;line-height:1.05}
.pql{font:600 30px 'IBM Plex Mono';letter-spacing:.14em;color:#d9d4c6;margin-top:4px}
.tag{position:absolute;left:70px;font:900 50px Fraunces;color:#F2E2BE;background:#3a2b1eE8;border:3px solid #E8C87E88;border-radius:10px;padding:6px 22px}
.pill{position:absolute;left:0;width:1080px;text-align:center}
.pill span{display:inline-block;background:#10162bE8;color:#EEF1F6;font:600 30px 'IBM Plex Mono';letter-spacing:.09em;padding:13px 34px;border-radius:40px;border:2px solid #EABA4288}
</style>
<div id="root" data-composition-id="ui" data-width="1080" data-height="1920" data-layout-allow-overlap>
${H.join('\n')}
</div>
<script>
const tl=gsap.timeline({paused:true});
tl.set({},{},${T});
${J.join('\n')}
window.__timelines["ui"]=tl;
</script>
</template>
`;
  fs.writeFileSync(path.join(P, 'compositions', 'ui.html'), html);
  return grupos.length;
}
