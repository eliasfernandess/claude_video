// Gera compositions/ui.html (legendas e gráficos) a partir da transcrição e do ui.json do projeto.
import fs from 'node:fs';
import path from 'node:path';
export function gerarUI(P) {
  const cfg = JSON.parse(fs.readFileSync(path.join(P, 'ui.json'), 'utf8'));
  const T = cfg.duracao;
  const d = JSON.parse(fs.readFileSync(path.join(P, 'assets', 'audio', 'transcript.json'), 'utf8'));
  const raw = Array.isArray(d) ? d : d.words;
  const NUM = { 0: 'zero', 1: 'um', 2: 'dois', 3: 'três', 4: 'quatro', 5: 'cinco', 6: 'seis', 7: 'sete', 8: 'oito', 9: 'nove', 10: 'dez', 11: 'onze', 12: 'doze', 13: 'treze', 14: 'catorze', 15: 'quinze', 16: 'dezesseis', 17: 'dezessete', 18: 'dezoito', 19: 'dezenove', 20: 'vinte' };
  const trocas = { ...NUM, ...(cfg.trocas || {}) }, destaques = new Set((cfg.destaques || []).map(s => s.toLowerCase())), ruins = new Set((cfg.ruins || []).map(s => s.toLowerCase())); const RMH = cfg.estilo === 'rmh', JOGO = cfg.estilo === 'jogo';
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
    const sp = g.map(x => `<span style="color:${ruins.has(limpa(x.text)) ? (JOGO ? '#FF5A4E' : '#F2493D') : destaques.has(limpa(x.text)) ? (JOGO ? '#FFD23F' : RMH ? '#F8C630' : '#F2C14E') : '#fff'}">${esc(RMH || JOGO ? x.text.toUpperCase() : x.text)}</span>`).join(' ');
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
    } else if (e.tipo === 'hud') {
      // painel escuro de jogo (estilo 3): rótulo pequeno espaçado + valor grande; pode contar de/ate
      const pos = e.esquerda !== undefined ? `left:${e.esquerda}px` : 'left:0;width:1080px;text-align:center';
      const v0 = e.de !== undefined ? (e.prefixo || '') + Number(e.de).toFixed(e.casas || 0).replace('.', ',') + (e.sufixo || '') : (e.valor ?? '');
      H.push(`<div id="${id}" class="clip jh" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 200}px;${pos}"><div class="jhi" style="${e.borda ? `border-color:${e.borda};box-shadow:0 0 0 1px ${e.borda}55,0 12px 34px #000a,inset 0 0 22px ${e.borda}33` : ''}">${e.rotulo ? `<div class="jhl" style="${e.corRotulo ? `color:${e.corRotulo}` : ''}">${esc(e.rotulo)}</div>` : ''}<div id="${id}_n" class="jhv" style="font-size:${e.tamanho ?? 92}px;color:${e.cor ?? '#fff'}">${esc(String(v0))}</div>${e.sub ? `<div class="jhs">${esc(e.sub)}</div>` : ''}</div></div>`);
      J.push(`tl.fromTo("#${id} .jhi",{opacity:0,y:-16,scale:.94},{opacity:1,y:0,scale:1,duration:.18,ease:"power3.out"},${a});`);
      if (e.de !== undefined) J.push(`(function(){var o={v:${e.de}},el=document.querySelector("#${id}_n");tl.fromTo(o,{v:${e.de}},{v:${e.ate},duration:${e.duracaoConta ?? 1.0},ease:"${e.ease ?? 'power2.out'}",onUpdate:function(){if(el)el.textContent=${JSON.stringify(e.prefixo || '')}+o.v.toFixed(${e.casas || 0}).replace(".",",")+${JSON.stringify(e.sufixo || '')};}},${(a + (e.atraso ?? .1)).toFixed(3)});})();`);
      if (e.pulsa) J.push(`tl.fromTo("#${id} .jhv",{scale:1.25},{scale:1,duration:.25,ease:"back.out(3)"},${(a + (e.atraso ?? .1) + (e.duracaoConta ?? 1)).toFixed(3)});`);
      J.push(`tl.to("#${id} .jhi",{opacity:0,duration:.12},${(e.fim - .12).toFixed(3)});`);
    } else if (e.tipo === 'vida') {
      // barra de vida segmentada que cai (ou sobe) de "de" até "ate" (0 a 100)
      const pos = e.esquerda !== undefined ? `left:${e.esquerda}px` : 'left:0;width:1080px;text-align:center';
      H.push(`<div id="${id}" class="clip jh" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 200}px;${pos}"><div class="jhi jv"><div class="jvt"><span>${esc(e.rotulo || 'VIDA')}</span><b id="${id}_p">${e.de}%</b></div><div class="jvb"><div id="${id}_f" class="jvf" style="width:${e.de}%;background:${e.cor ?? 'linear-gradient(90deg,#FF5A4E,#FF8A5C)'}"></div><div class="jvs"></div></div></div></div>`);
      J.push(`tl.fromTo("#${id} .jhi",{opacity:0,y:-16},{opacity:1,y:0,duration:.18,ease:"power3.out"},${a});`);
      J.push(`(function(){var o={v:${e.de}},f=document.querySelector("#${id}_f"),p=document.querySelector("#${id}_p");tl.fromTo(o,{v:${e.de}},{v:${e.ate},duration:${e.duracaoConta ?? .6},ease:"power2.out",onUpdate:function(){if(f)f.style.width=o.v+"%";if(p)p.textContent=Math.round(o.v)+"%";}},${(a + (e.atraso ?? .25)).toFixed(3)});})();`);
      if (e.pisca) J.push(`tl.fromTo("#${id} .jvf",{opacity:1},{opacity:.35,duration:.22,repeat:${Math.max(1, Math.floor((e.fim - e.inicio) / .44) - 1)},yoyo:true,ease:"none"},${(a + .9).toFixed(3)});`);
      J.push(`tl.to("#${id} .jhi",{opacity:0,duration:.12},${(e.fim - .12).toFixed(3)});`);
    } else if (e.tipo === 'dano') {
      // número que sobe e some: "-5" vermelho, "+3" verde
      H.push(`<div id="${id}" class="clip jd" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 700}px;left:${e.esquerda ?? 0}px;width:${e.largura ?? 1080}px"><span style="color:${e.cor ?? (String(e.texto).startsWith('-') ? '#FF5A4E' : '#5BEA7A')};font-size:${e.tamanho ?? 110}px">${esc(e.texto)}</span></div>`);
      J.push(`tl.fromTo("#${id} span",{y:30,scale:.6,opacity:0},{y:0,scale:1,opacity:1,duration:.16,ease:"back.out(3)"},${a});`);
      J.push(`tl.to("#${id} span",{y:-110,opacity:0,duration:${Math.max(.3, e.fim - e.inicio - .25).toFixed(2)},ease:"power1.in"},${(a + .25).toFixed(3)});`);
    } else if (e.tipo === 'titulo') {
      // título grande dourado com raios girando (ou "erro" vermelho com falha de imagem)
      const erro = e.variante === 'erro'; const raios = [];
      if (!erro) for (let k = 0; k < 16; k++) { const a0 = k / 16 * Math.PI * 2, a1 = a0 + Math.PI / 32; raios.push(`<polygon points="400,400 ${(400 + 900 * Math.cos(a0)).toFixed(0)},${(400 + 900 * Math.sin(a0)).toFixed(0)} ${(400 + 900 * Math.cos(a1)).toFixed(0)},${(400 + 900 * Math.sin(a1)).toFixed(0)}" fill="${e.corRaio ?? '#FFD54A'}" opacity=".16"/>`); }
      H.push(`<div id="${id}" class="clip jt" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 560}px">${raios.length ? `<svg class="jtr" width="800" height="800" viewBox="0 0 800 800" style="position:absolute;left:140px;top:-330px;overflow:visible"><g id="${id}_r">${raios.join('')}</g></svg>` : ''}${e.rotulo ? `<div class="jtl">${esc(e.rotulo)}</div>` : ''}<div class="jtm ${erro ? 'jte' : ''}" style="font-size:${e.tamanho ?? 150}px">${esc(e.texto)}</div>${e.sub ? `<div class="jtl" style="margin-top:6px">${esc(e.sub)}</div>` : ''}</div>`);
      J.push(`tl.fromTo("#${id} .jtm",{scale:.4,opacity:0},{scale:1,opacity:1,duration:.2,ease:"back.out(2.6)"},${a});`);
      if (e.rotulo || e.sub) J.push(`tl.fromTo("#${id} .jtl",{opacity:0},{opacity:1,duration:.2},${(a + .12).toFixed(3)});`);
      if (raios.length) J.push(`tl.fromTo("#${id}_r",{rotation:0,transformOrigin:"400px 400px"},{rotation:${(e.fim - e.inicio) * 14},duration:${(e.fim - e.inicio).toFixed(2)},ease:"none"},${a});tl.fromTo("#${id} .jtr",{opacity:0},{opacity:1,duration:.3},${a});`);
      if (erro) { let sd = 7; const rnd = () => { sd = (sd * 16807) % 2147483647; return sd / 2147483647 - .5; }; for (let k = 0; k * .07 < e.fim - e.inicio - .2; k++) J.push(`tl.set("#${id} .jtm",{x:${(rnd() * (k % 5 === 0 ? 70 : 16)).toFixed(1)},skewX:${(rnd() * (k % 5 === 0 ? 24 : 4)).toFixed(1)}},${(a + .2 + k * .07).toFixed(3)});`); }
      J.push(`tl.to("#${id}",{opacity:0,duration:.14},${(e.fim - .14).toFixed(3)});`);
    } else if (e.tipo === 'aviso') {
      H.push(`<div id="${id}" class="clip ja" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 330}px"><span style="background:${e.fundo ?? '#E2413B'}">${esc(e.texto)}</span></div>`);
      J.push(`tl.fromTo("#${id} span",{scale:1.4,opacity:0},{scale:1,opacity:1,duration:.16,ease:"power3.out"},${a});tl.to("#${id} span",{opacity:0,duration:.12},${(e.fim - .12).toFixed(3)});`);
    } else if (e.tipo === 'gancho') {
      // pergunta do gancho escrita no topo; *palavra* fica amarela
      const txt = esc(e.texto).replace(/\*([^*]+)\*/g, '<b>$1</b>');
      H.push(`<div id="${id}" class="clip jg" data-start="${a}" data-duration="${dur}" style="top:${e.topo ?? 190}px">${txt}</div>`);
      J.push(`tl.fromTo("#${id}",{opacity:0,y:-10},{opacity:1,y:0,duration:.25},${a});tl.to("#${id}",{opacity:0,duration:.2},${(e.fim - .2).toFixed(3)});`);
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
${JOGO ? `@font-face{font-family:'Barlow';src:url('assets/fonts/barlow-600.woff2');font-weight:600}
@font-face{font-family:'Barlow';src:url('assets/fonts/barlow-700.woff2');font-weight:700}
@font-face{font-family:'Barlow';src:url('assets/fonts/barlow-800.woff2');font-weight:800}
.capg{top:1080px;font:700 60px/1.05 Barlow;letter-spacing:.025em;gap:0 16px;text-shadow:0 3px 0 #000b,0 0 3px #000,0 0 18px #000c}
.jh{position:absolute}
.jhi{display:inline-block;background:linear-gradient(180deg,#141b2bE6,#0b101cE6);border:2px solid #ffffff2e;border-radius:18px;padding:14px 36px 16px;box-shadow:0 12px 34px #000a;text-align:center;min-width:300px}
.jhl{font:600 30px Barlow;letter-spacing:.28em;color:#AEB8C8;margin-bottom:2px;white-space:nowrap}
.jhv{font:800 100px/1 Barlow;letter-spacing:.01em;white-space:nowrap;font-variant-numeric:tabular-nums;text-shadow:0 0 18px #ffffff33}
.jhs{font:600 28px Barlow;letter-spacing:.14em;color:#D7DDE8;margin-top:6px;white-space:nowrap}
.jv{min-width:520px;text-align:left;padding:14px 26px 18px}
.jvt{display:flex;justify-content:space-between;font:700 28px Barlow;letter-spacing:.22em;color:#D7DDE8;margin-bottom:10px}
.jvt b{letter-spacing:.04em;color:#fff}
.jvb{position:relative;height:30px;border-radius:8px;background:#ffffff1c;overflow:hidden;border:2px solid #ffffff30}
.jvf{position:absolute;left:0;top:0;bottom:0;border-radius:6px;box-shadow:0 0 16px #FF5A4E88}
.jvs{position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0,transparent 44px,#0b101c 44px,#0b101c 48px)}
.jd{position:absolute;text-align:center}
.jd span{display:inline-block;font-family:Barlow;font-weight:800;-webkit-text-stroke:7px #0b101c;paint-order:stroke fill;text-shadow:0 6px 0 #0008}
.jt{position:absolute;left:0;width:1080px;text-align:center}
.jtm{position:relative;font-family:Barlow;font-weight:800;line-height:1;color:#FFD54A;-webkit-text-stroke:8px #2a1d00;paint-order:stroke fill;text-shadow:0 8px 0 #0009,0 0 40px #FFD54A88;letter-spacing:.02em}
.jte{color:#FF4B42;-webkit-text-stroke:8px #2a0000;text-shadow:6px 0 0 #3FE0FF99,-6px 0 0 #FF2AA399,0 0 50px #FF4B42aa}
.jtl{position:relative;font:700 34px Barlow;letter-spacing:.3em;color:#fff;text-shadow:0 3px 0 #000a}
.ja{position:absolute;left:0;width:1080px;text-align:center}
.ja span{display:inline-block;color:#fff;font:800 40px Barlow;letter-spacing:.16em;padding:10px 28px;border-radius:10px;box-shadow:0 8px 24px #0008}
.jg{position:absolute;left:80px;width:920px;text-align:center;font:800 70px/1.08 Barlow;color:#fff;text-shadow:0 4px 0 #000b,0 0 20px #000c;letter-spacing:.01em}
.jg b{color:#FFD23F}` : ''}
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
