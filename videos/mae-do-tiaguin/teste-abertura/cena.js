// Teste de abertura do vídeo 09 (Estilo 4): 0 a 12,9 s do roteiro.
const DUR = 12.9;
const $ = (q) => document.querySelector(q);
const SVGNS = 'http://www.w3.org/2000/svg';

// ---------- texto e tempo das palavras (estimado a 3,65 palavras/s; troca pela voz real depois) ----------
const FRASES = [
  [0.0, 'Nessa cidade, todo mundo nasce com um superpoder.'],
  [2.2, 'Mas ele só aparece na meia-noite em que você faz doze anos.'],
  [5.5, 'Oi, eu sou a mãe do Tiaguin.'],
  [7.4, 'E eu sou a única pessoa dessa cidade que nunca teve poder nenhum.'],
  [11.0, 'Pelo menos era o que eu achava.'],
];
const PAL = [];
FRASES.forEach(([t0, txt], i) => {
  const t1 = (FRASES[i + 1] ? FRASES[i + 1][0] : DUR) - 0.12;
  const ws = txt.split(' '), pes = ws.map(w => w.replace(/[^\wÀ-ú]/g, '').length + 1.6), tot = pes.reduce((a, b) => a + b);
  let t = t0;
  ws.forEach((w, k) => { const d = (t1 - t0) * pes[k] / tot; PAL.push({ w, t, f: t + d, frase: i }); t += d; });
});
const W = (palavra, n = 1) => { let c = 0; for (const p of PAL) if (p.w.toLowerCase().replace(/[^\wÀ-ú-]/g, '') === palavra && ++c === n) return p.t; throw palavra; };
// blocos de 1 a 3 palavras, quebrando na pontuação
const BLOCOS = []; { let b = [];
  PAL.forEach((p, i) => { b.push(i); const fim = /[,.?!:…]$/.test(p.w) || b.length === 3 || (b.map(j => PAL[j].w).join(' ').length > 13 && b.length >= 2) || i === PAL.length - 1 || PAL[i + 1].frase !== p.frase;
    if (fim) { BLOCOS.push(b); b = []; } }); }
const DESTAQUE = new Set(['cidade', 'superpoder', 'meia-noite', 'doze', 'mãe', 'Tiaguin', 'única', 'nunca', 'poder', 'achava']);

// ---------- câmeras ----------
const CAMS = {};
function cena(id, conteudo, fundo = '#fff') {
  const s = document.createElementNS(SVGNS, 'svg');
  s.setAttribute('viewBox', '0 0 1080 1920'); s.setAttribute('class', 'cena'); s.id = 'sc_' + id;
  s.innerHTML = `<rect width="1080" height="1920" fill="${fundo}"/><g class="cam">${conteudo}</g>`;
  $('#palco').insertBefore(s, $('#vinheta'));
  CAMS[id] = { g: s.querySelector('.cam'), x: 540, y: 960, z: 0, r: 0, dx: 0 };
  return s;
}
function aplicaCams() {
  for (const c of Object.values(CAMS)) c.g.setAttribute('transform', `translate(540 960) rotate(${c.r}) scale(${Math.exp(c.z)}) translate(${-c.x - c.dx} ${-c.y})`);
}
const Z = Math.log;

// ---------- CENA 1: a praça ----------
function chao(y0, y1, vx, vy, cor) {
  let s = `<rect x="-2000" y="${y0}" width="6000" height="${y1 - y0}" fill="${cor}"/>`;
  for (let k = 0, y = y0 + 40; y < y1; k++, y += 40 + k * 22) s += `<line x1="-2000" y1="${y}" x2="4000" y2="${y}" stroke="#d9bf95" stroke-width="3"/>`;
  for (let i = -14; i <= 14; i++) s += `<line x1="${vx + i * 30}" y1="${y0}" x2="${vx + i * 420}" y2="${y1}" stroke="#d9bf95" stroke-width="3"/>`;
  return s;
}
function torre(x, base, topo) {
  const w = 230;
  let s = `<g><rect x="${x - w / 2}" y="${topo}" width="${w}" height="${base - topo}" fill="#E9C99C" stroke="${OUT}" stroke-width="${OW}"/>`;
  for (let y = topo + 60; y < base; y += 70) s += `<line x1="${x - w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y}" stroke="#d4ae7c" stroke-width="3"/>`;
  s += `<rect x="${x - w / 2}" y="${topo}" width="${w * .2}" height="${base - topo}" fill="#000" opacity=".07"/>`;
  s += `<path d="M ${x - w / 2 - 24} ${topo} L ${x} ${topo - 190} L ${x + w / 2 + 24} ${topo} Z" fill="#E5737A" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  s += `<rect x="${x - w / 2 - 14}" y="${topo - 6}" width="${w + 28}" height="22" rx="6" fill="#F4DDB8" stroke="${OUT}" stroke-width="${OW}"/>`;
  for (let y = topo + 330; y < base - 200; y += 260) s += `<rect x="${x - 22}" y="${y}" width="44" height="90" rx="22" fill="#7AA6C2" stroke="${OUT}" stroke-width="${OW}"/>`;
  s += `<rect x="${x - 50}" y="${base - 170}" width="100" height="170" rx="50" fill="#9B6B43" stroke="${OUT}" stroke-width="${OW}"/>`;
  // relógio
  const cy = topo + 160, R = 92;
  s += `<g id="relogio">${circ(x, cy, R + 14, '#F4DDB8')}${circ(x, cy, R, '#FFFDF5')}`;
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; s += `<line x1="${x + Math.sin(a) * (R - 10)}" y1="${cy - Math.cos(a) * (R - 10)}" x2="${x + Math.sin(a) * (R - (i % 3 ? 18 : 26))}" y2="${cy - Math.cos(a) * (R - (i % 3 ? 18 : 26))}" stroke="${OUT}" stroke-width="${i % 3 ? 3 : 6}" stroke-linecap="round"/>`; }
  s += `<line id="pHora" x1="${x}" y1="${cy}" x2="${x}" y2="${cy - 46}" stroke="${OUT}" stroke-width="10" stroke-linecap="round" transform="rotate(-1 ${x} ${cy})"/>`;
  s += `<line id="pMin" x1="${x}" y1="${cy}" x2="${x}" y2="${cy - 70}" stroke="${OUT}" stroke-width="7" stroke-linecap="round" transform="rotate(-6 ${x} ${cy})"/>`;
  s += `<line id="pSeg" x1="${x}" y1="${cy + 14}" x2="${x}" y2="${cy - 78}" stroke="#E8505B" stroke-width="3.5" stroke-linecap="round" transform="rotate(240 ${x} ${cy})"/>`;
  s += `${circ(x, cy, 9, '#E8505B')}</g>`;
  s += `<g transform="translate(${x} ${cy + R + 54})"><rect x="-82" y="-30" width="164" height="60" rx="14" fill="#2a2d3e"/><text y="16" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="46" fill="#FFD23F">23:59</text></g>`;
  return s + '</g>';
}
function carro(x, y, k = 1, cor = '#5DADE2') {
  return `<g transform="translate(${x} ${y}) scale(${k})"><path d="M -110 0 L -110 -40 Q -100 -60 -70 -62 L -40 -100 Q -30 -110 0 -110 L 40 -110 Q 64 -110 74 -96 L 96 -62 Q 112 -58 112 -40 L 112 0 Z" fill="${cor}" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/><path d="M -30 -92 L 0 -92 L 0 -64 L -54 -64 Z M 14 -92 L 46 -92 L 64 -64 L 14 -64 Z" fill="#CFEAF7" stroke="${OUT}" stroke-width="3"/>${circ(-62, 2, 24, '#3a3a48')}${circ(62, 2, 24, '#3a3a48')}${circ(-62, 2, 9, '#bbb')}${circ(62, 2, 9, '#bbb')}</g>`;
}
const CORES_CASA = [['#F7A8B8', '#E5737A'], ['#9FE0C6', '#58B08F'], ['#C7B3F0', '#8E78C9'], ['#FFC9A1', '#E98B5A'], ['#FCE38A', '#E3B23C'], ['#A9D3F5', '#5D9CD3']];
function fileiraCasas(x0, x1, base, seed = 0) {
  let s = '', x = x0, i = seed;
  while (x < x1) { const w = 250 + (i * 37) % 90, h = 380 + (i * 53) % 170, c = CORES_CASA[i % 6]; s += casa(x, base, w, h, c[0], c[1], 2, 2); x += w + 6; i++; }
  return s;
}

function montaPraca() {
  let s = `<defs><linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD0EE"/><stop offset="1" stop-color="#E6F6FB"/></linearGradient>
    <radialGradient id="aura" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".55" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>`;
  s += `<rect x="-2000" y="-3000" width="6000" height="4520" fill="url(#ceu)"/>`;
  s += nuvem(200, 300, 1.6) + nuvem(1350, 180, 1.3) + nuvem(-200, 900, 1.2) + nuvem(1500, 760, 1.5) + nuvem(700, -200, 1.4);
  s += fileiraCasas(-900, 2500, 1500, 0);
  s += torre(800, 1500, 260);
  s += chao(1500, 3400, 800, 1250, '#EFDCBB');
  s += arvore(300, 1560, 1.5) + arvore(1330, 1560, 1.6);
  // gente ao fundo, pequena
  [[150, 1700, 'espetado', '#5B3A24', '#E8505B', 'media'], [380, 1690, 'coque', '#3b2a1f', '#9FE0C6', 'morena'], [1180, 1700, 'curto', '#2b2b2b', '#C7B3F0', 'clara'], [1420, 1690, 'careca', '#000000', '#FCE38A', 'escura']]
    .forEach(([x, y, cb, cc, cm, pl], i) => s += pessoa({ id: 'fundo' + i, x, y, h: 230, cabelo: cb, corCabelo: cc, camisa: cm, pele: pl, calca: '#6F7FA6' }));
  // menina flutuando (sombra no chão)
  s += `<ellipse cx="640" cy="2085" rx="60" ry="12" fill="#000" opacity=".12"/>`;
  s += `<g id="flutua">${pessoa({ id: 'flu', x: 640, y: 1960, h: 300, cabelo: 'rabo', corCabelo: '#3b2a1f', camisa: '#B98CDB', pele: 'morena', calca: '#8E6BB8', saia: true })}</g>`;
  // menino voando e bola de fogo passam ATRÁS da mãe
  s += `<g id="voador"><g transform="rotate(78)"><path d="M -30 -200 Q -120 -120 -70 -40 L 30 -190 Z" fill="#E8505B" stroke="${OUT}" stroke-width="${OW}"/>${pessoa({ id: 'voa', x: 0, y: 0, h: 260, cabelo: 'espetado', corCabelo: '#5B3A24', camisa: '#5DADE2', pele: 'media', calca: '#3E5F99' })}</g></g>`;
  s += `<g id="bola">${circ(0, 0, 34, '#FF7A2F')}<circle r="18" fill="#FFD23F"/><path d="M -30 -20 Q -90 -10 -130 0 Q -90 10 -30 22 Z" fill="#FFB347" opacity=".85"/></g>`;
  // mulher forte segurando um carro
  s += `<g id="forte">${carro(1090, 1700, 1.05, '#5DADE2')}${pessoa({ id: 'for', x: 1090, y: 2110, h: 350, cabelo: 'coque', corCabelo: '#2b2b2b', camisa: '#6CC070', pele: 'escura', calca: '#3E5F99' })}</g>`;
  // homem do fogo
  s += `<g id="homemFogo">${pessoa({ id: 'fog', x: 500, y: 2130, h: 350, cabelo: 'espetado', corCabelo: '#2b2b2b', camisa: '#E8505B', pele: 'morena', calca: '#555B6E' })}${fogo('fogoMao1', 452, 2050, 1.1)}${fogo('fogoMao2', 548, 2050, 1.1)}</g>`;
  // a mãe
  s += pessoa({ id: 'mae', x: 800, y: 2250, h: 360, cabelo: 'rabo', corCabelo: '#F6D36A', camisa: '#FFB347', calca: '#4A78C2', olho: '#3D8FD1' });
  // menino das plantas, na frente
  s += `<g id="planta">${pessoa({ id: 'pla', x: 1250, y: 2420, h: 300, cabelo: 'curto', corCabelo: '#5B3A24', camisa: '#FCE38A', pele: 'clara', calca: '#8E6BB8' })}<g transform="translate(1180 2440)"><g id="brotoIn" transform="scale(1 0)">${pilula(0, 0, 0, -120, 10, '#58B08F')}${elip(-26, -80, 26, 12, '#6CC070')}${elip(26, -110, 26, 12, '#6CC070')}${circ(0, -134, 18, '#F7A8B8')}</g></g></g>`;
  s += `<g id="faiscas">${brilho(380, 2280, 1.4)}${brilho(1180, 2000, 1.2, '#A9D3F5')}${brilho(980, 1800, 1, '#F7A8B8')}</g>`;
  return s;
}

// ---------- CENA 2: a vela "12" sobre os raios ----------
function montaVela() {
  return raios(540, 960, 20, '#FFD45C', '#FFC43A') +
    `<g id="vela12" transform="translate(540 1000)"><g id="vela12in">
      <ellipse cx="0" cy="250" rx="300" ry="40" fill="#000" opacity=".12"/>
      <text x="0" y="230" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="560" fill="#F7A8C8" stroke="${OUT}" stroke-width="14" paint-order="stroke" stroke-linejoin="round">12</text>
      <text x="0" y="230" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="560" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="40 60" opacity=".55">12</text>
      ${pilula(-118, -170, -118, -215, 7, '#2a2d3e')}${pilula(96, -170, 96, -215, 7, '#2a2d3e')}
      ${fogo('chamaA', -118, -215, 1.3)}${fogo('chamaB', 96, -215, 1.3)}
    </g></g>`;
}

// ---------- CENA 3: a cozinha ----------
function montaCozinha() {
  let s = `<rect x="-1000" y="-1000" width="3200" height="2700" fill="#FBEFD5"/>`;
  for (let x = -1000; x < 2200; x += 70) s += `<rect x="${x}" y="-1000" width="35" height="2700" fill="#F5E2BF"/>`;
  s += `<rect x="-1000" y="1680" width="3200" height="30" fill="#E8C99A" stroke="${OUT}" stroke-width="${OW}"/>`;
  for (let i = 0; i < 40; i++) for (let j = 0; j < 8; j++) s += `<rect x="${-1000 + i * 90}" y="${1710 + j * 90}" width="90" height="90" fill="${(i + j) % 2 ? '#BFE3D5' : '#F4FBF8'}"/>`;
  // janela com cortinas
  s += `<rect x="40" y="560" width="300" height="340" rx="14" fill="#BFE6F5" stroke="${OUT}" stroke-width="${OW}"/><line x1="190" y1="560" x2="190" y2="900" stroke="${OUT}" stroke-width="4"/>${nuvem(160, 700, .6)}`;
  s += `<path d="M 20 540 L 120 540 Q 90 720 140 920 L 20 920 Z" fill="#F7A8B8" stroke="${OUT}" stroke-width="${OW}"/><path d="M 360 540 L 260 540 Q 290 720 240 920 L 360 920 Z" fill="#F7A8B8" stroke="${OUT}" stroke-width="${OW}"/>`;
  // relógio de parede
  s += `${circ(820, 640, 70, '#FFFDF5')}<line x1="820" y1="640" x2="820" y2="595" stroke="${OUT}" stroke-width="6" stroke-linecap="round"/><line x1="820" y1="640" x2="852" y2="640" stroke="${OUT}" stroke-width="6" stroke-linecap="round"/>`;
  // geladeira
  s += `<rect x="900" y="820" width="260" height="870" rx="30" fill="#E3F1F7" stroke="${OUT}" stroke-width="${OW}"/><line x1="900" y1="1110" x2="1160" y2="1110" stroke="${OUT}" stroke-width="${OW}"/><rect x="930" y="900" width="14" height="140" rx="7" fill="#9BB"/><rect x="930" y="1150" width="14" height="200" rx="7" fill="#9BB"/>`;
  // Tiaguin à mesa (atrás)
  s += `<g id="tgMesa">${pessoa({ id: 'tg', x: 730, y: 1420, h: 330, cabelo: 'topete', corCabelo: '#F4CF5B', camisa: '#E8505B', calca: '#3E5F99', fita: true })}</g>`;
  s += `<path d="M 440 1300 L 940 1300 L 960 1560 Q 900 1580 840 1560 Q 780 1585 720 1560 Q 660 1585 600 1560 Q 540 1580 480 1560 L 420 1560 Z" fill="#E8505B" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/><path d="M 470 1310 L 460 1550 M 560 1310 L 556 1565 M 650 1310 L 650 1565 M 740 1310 L 744 1565 M 830 1310 L 838 1560 M 910 1310 L 925 1555" stroke="#fff" stroke-width="14" opacity=".5"/><rect x="430" y="1290" width="520" height="34" rx="10" fill="#C98E5A" stroke="${OUT}" stroke-width="${OW}"/>${pilula(470, 1324, 470, 1680, 22, '#B57A48')}${pilula(910, 1324, 910, 1680, 22, '#B57A48')}`;
  s += `<path d="M 670 1290 Q 670 1240 690 1236 L 770 1236 Q 790 1240 790 1290 Z" fill="#fff" stroke="${OUT}" stroke-width="${OW}"/><ellipse cx="730" cy="1238" rx="60" ry="10" fill="#F4D58D" stroke="${OUT}" stroke-width="2"/>`;
  // a mãe na frente
  s += pessoa({ id: 'maeC', x: 420, y: 1930, h: 540, cabelo: 'rabo', corCabelo: '#F6D36A', camisa: '#FFB347', calca: '#4A78C2', olho: '#3D8FD1' });
  return s;
}

// ---------- CENA 4: a rua, todo mundo com aura e ela sem cor ----------
function montaRua() {
  let s = `<rect x="-2000" y="-2000" width="5000" height="3500" fill="url(#ceu2)"/><defs><linearGradient id="ceu2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ED8F0"/><stop offset="1" stop-color="#EAF7FB"/></linearGradient></defs>`;
  s += nuvem(150, 500, 1.3) + nuvem(900, 380, 1.1);
  s += fileiraCasas(-900, 2200, 1350, 3);
  s += `<rect x="-2000" y="1350" width="5000" height="120" fill="#D9D2C5" stroke="${OUT}" stroke-width="${OW}"/><rect x="-2000" y="1470" width="5000" height="1400" fill="#EFDCBB"/>`;
  const AURAS = ['#FF7A2F', '#5DADE2', '#B98CDB', '#6CC070', '#FFD23F', '#F7A8B8', '#58D6C8', '#E8505B'];
  const G = [[150, 1560, 'espetado', '#5B3A24', '#E8505B', 'media'], [330, 1540, 'coque', '#2b2b2b', '#9FE0C6', 'escura'], [760, 1545, 'curto', '#3b2a1f', '#C7B3F0', 'clara'], [940, 1560, 'rabo', '#2b2b2b', '#FCE38A', 'morena'],
             [70, 1820, 'careca', '#000000', '#FFC9A1', 'morena'], [300, 1850, 'rabo', '#B5651D', '#A9D3F5', 'clara'], [800, 1850, 'espetado', '#2b2b2b', '#F08A4B', 'escura'], [1010, 1820, 'curto', '#F4CF5B', '#6CC070', 'media']];
  G.forEach(([x, y, cb, cc, cm, pl], i) => {
    const h = y > 1700 ? 330 : 280, cy = y - h * .55;
    s += `<g class="aura" id="aura${i}" style="transform-box:fill-box;transform-origin:center"><ellipse cx="${x}" cy="${cy}" rx="${h * .62}" ry="${h * .78}" fill="${AURAS[i]}" opacity=".55" filter="url(#borra)"/></g>`;
    s += pessoa({ id: 'r' + i, x, y, h, cabelo: cb, corCabelo: cc, camisa: cm, pele: pl, calca: '#6F7FA6' });
  });
  s = `<defs><filter id="borra" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26"/></filter></defs>` + s;
  s += `<g id="maeCinza" style="filter:grayscale(1) brightness(1.04)">${pessoa({ id: 'maeR', x: 540, y: 1700, h: 380, cabelo: 'rabo', corCabelo: '#F6D36A', camisa: '#FFB347', calca: '#4A78C2', olho: '#3D8FD1' })}</g>`;
  s += `<g id="brilhoOlho" opacity="0" transform="translate(576 1394) scale(0)">${brilho(0, 0, 1.1, '#FFF4B0')}</g>`;
  return s;
}

// ---------- legenda karaokê ----------
function montaLegenda() {
  const L = $('#legenda');
  BLOCOS.forEach((b, k) => {
    const d = document.createElement('div'); d.className = 'bloco'; d.id = 'bl' + k;
    d.innerHTML = b.map(i => `<span class="pal${DESTAQUE.has(PAL[i].w.replace(/[^\wÀ-ú-]/g, '')) ? ' chave' : ''}" data-i="${i}">${PAL[i].w}</span>`).join(' ');
    L.appendChild(d);
  });
}
function legendaEm(t) {
  BLOCOS.forEach((b, k) => {
    const t0 = PAL[b[0]].t, t1 = k + 1 < BLOCOS.length ? PAL[BLOCOS[k + 1][0]].t : DUR;
    const on = t >= t0 && t < t1, el = $('#bl' + k);
    el.style.display = on ? 'block' : 'none';
    if (on) { const e = Math.min(1, (t - t0) / .08); el.style.transform = `scale(${.86 + .14 * e})`; }
    el.querySelectorAll('.pal').forEach(sp => sp.classList.toggle('ativa', t >= PAL[+sp.dataset.i].t));
  });
}

// ---------- montagem + linha do tempo ----------
const TL = gsap.timeline({ paused: true });
const CORTES = [0];
function mostra(id, t) { if (t > 0) CORTES.push(t); TL.set('.cena', { visibility: 'hidden' }, t).set('#sc_' + id, { visibility: 'visible' }, t); }
function boca(pid, qual, t) { TL.set(`#${pid}-boca > *`, { visibility: 'hidden' }, t).set(`#${pid}-boca .b-${qual}`, { visibility: 'visible' }, t); }
function pisca(pid, t) { TL.to(`#${pid}-olhos .olhoEsc`, { attr: { transform: 'scale(1 0.08)' }, duration: .05, yoyo: true, repeat: 1, ease: 'none' }, t); }
function chamas(sel, t0, t1) { // chama tremendo
  for (let t = t0; t < t1; t += .12) TL.to(`${sel} .ch1`, { attr: { transform: `scale(${(1 - ((t * 5.1) % 1) * .1).toFixed(3)} ${(1 + ((t * 7.3) % 1) * .22 - .08).toFixed(3)})` }, duration: .12, ease: 'sine.inOut' }, t);
}

function monta() {
  cena('praca', montaPraca(), '#E6F6FB');
  cena('vela', montaVela(), '#FFD45C');
  cena('cozinha', montaCozinha(), '#FBEFD5');
  cena('rua', montaRua(), '#EAF7FB');
  montaLegenda();
  const P = CAMS.praca, V = CAMS.vela, C = CAMS.cozinha, R = CAMS.rua;

  // ===== 0 a 0,55 s: close extremo da mãe, câmera parada, a piada passa em volta =====
  mostra('praca', 0);
  TL.set(P, { x: 800, y: 1972, z: Z(5.9), r: 0 }, 0);
  TL.set('#bola', { x: 640, y: 1930 }, 0).to('#bola', { x: 960, y: 1918, duration: .34, ease: 'none' }, .0);
  TL.set('#voador', { x: 420, y: 1925 }, 0).to('#voador', { x: 820, y: 1880, duration: .38, ease: 'none' }, .17);
  pisca('mae', .4);
  TL.to(P, { x: 803, duration: .55, ease: 'none' }, 0); // tremidinha mínima de câmera viva
  // ===== 0,55 s: voo para trás (3x+, freando) =====
  TL.to(P, { z: Z(1.02), y: 1830, x: 790, duration: .5, ease: 'power2.out' }, .55);
  // a bola e o menino seguem pelo céu
  TL.to('#voador', { x: 1500, y: 1250, duration: 1.2, ease: 'none' }, .54);
  TL.to('#bola', { x: 1700, y: 1880, duration: .6, ease: 'none' }, .34);
  // deriva + poderes pipocando
  TL.to(P, { x: 860, z: Z(.96), duration: 1.15, ease: 'none' }, 1.05);
  TL.fromTo('#brotoIn', { attr: { transform: 'scale(1 0)' } }, { attr: { transform: 'scale(1 1)' }, duration: .35, ease: 'back.out(2)' }, 1.15);
  TL.from('#faiscas path', { opacity: 0, duration: .08, stagger: .18 }, 1.0);
  TL.to('#flutua', { y: -18, duration: .6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0);
  TL.to('#forte', { y: -10, duration: .35, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 0);
  chamas('#fogoMao1', 0, 2.3); chamas('#fogoMao2', .05, 2.3);
  boca('mae', 'o', .45); boca('mae', 'sorriso', 1.6);
  // ===== 2,2 s: grua subindo até o relógio =====
  const tMas = W('mas');
  TL.to(P, { y: 440, x: 800, z: Z(2.55), duration: .5, ease: 'power3.inOut' }, tMas - .05);
  TL.to(P, { z: Z(2.85), duration: 2, ease: 'none' }, tMas + .45);
  [0, 1, 2, 3].forEach(k => TL.set('#pSeg', { attr: { transform: `rotate(${246 + k * 6} 800 420)` } }, tMas + .5 + k));
  // ===== "doze": pop-in girando da vela 12 =====
  const tDoze = W('doze') - .04;
  mostra('vela', tDoze);
  TL.set(V, { x: 540, y: 960, z: 0 }, tDoze);
  TL.fromTo('#vela12in', { attr: { transform: 'rotate(-260) scale(0.05)' } }, { attr: { transform: 'rotate(0) scale(1)' }, duration: .34, ease: 'back.out(1.6)' }, tDoze);
  TL.to(V, { z: Z(1.06), duration: 1, ease: 'none' }, tDoze);
  TL.fromTo('#sc_vela .raios', { attr: { transform: 'translate(540 960) rotate(0)' } }, { attr: { transform: 'translate(540 960) rotate(25)' }, duration: 1.2, ease: 'none' }, tDoze);
  chamas('#chamaA', tDoze, tDoze + 1.1); chamas('#chamaB', tDoze + .05, tDoze + 1.1);
  // ===== "Oi": chicote para a cozinha =====
  const tOi = W('oi');
  TL.to(V, { dx: -900, duration: .07, ease: 'power2.in' }, tOi - .07);
  mostra('cozinha', tOi);
  TL.fromTo(C, { x: 545, y: 1430, z: Z(1.5), dx: 900 }, { dx: 0, duration: .28, ease: 'expo.out' }, tOi);
  TL.to(C, { z: Z(1.6), x: 530, duration: 1.8, ease: 'none' }, tOi + .28);
  TL.to('#maeC-bracoD', { attr: { transform: 'rotate(-150)' }, duration: .12, ease: 'back.out(2)' }, tOi);
  TL.to('#maeC-bracoD', { attr: { transform: 'rotate(-128)' }, duration: .14, yoyo: true, repeat: 5, ease: 'sine.inOut' }, tOi + .12);
  TL.to('#maeC-bracoD', { attr: { transform: 'rotate(-14)' }, duration: .15, ease: 'power2.out' }, W('tiaguin') - .1);
  boca('maeC', 'aberta', tOi); boca('maeC', 'sorriso', tOi + .35); boca('maeC', 'aberta', W('mãe')); boca('maeC', 'sorriso', W('mãe') + .3);
  // Tiaguin mastigando / acenando com a colher
  TL.to('#tg-bracoD', { attr: { transform: 'rotate(-70)' }, duration: .18, yoyo: true, repeat: 5, ease: 'sine.inOut' }, tOi);
  TL.to('#tg-bracoD', { attr: { transform: 'rotate(-160)' }, duration: .12, ease: 'back.out(2)' }, W('tiaguin'));
  boca('tg', 'aberta', W('tiaguin'));
  pisca('maeC', tOi + 1.1);
  // ===== "E eu sou a única…": rua; começa no rosto dela e voa para trás =====
  const tE = W('e');
  mostra('rua', tE);
  TL.fromTo(R, { x: 540, y: 1410, z: Z(4.4) }, { z: Z(1.0), y: 1330, duration: .5, ease: 'power2.out' }, tE + .1);
  TL.to(R, { z: Z(1.1), duration: 3, ease: 'none' }, tE + .6);
  TL.from('.aura ellipse', { attr: { rx: 0, ry: 0 }, opacity: 0, duration: .3, stagger: .22, ease: 'back.out(2)' }, tE + .55);
  boca('maeR', 'meio', W('nunca') - .1);
  TL.to('#maeR-olhos .pupila', { y: 7, duration: .2 }, W('nunca') - .1);
  TL.to('.aura ellipse', { opacity: .9, duration: .25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, W('nenhum'));
  // ===== "Pelo menos…": a câmera volta voando ao rosto =====
  const tPelo = W('pelo');
  TL.to(R, { z: Z(4.6), y: 1405, duration: .26, ease: 'expo.out' }, tPelo);
  TL.to(R, { z: Z(4.85), duration: 1.6, ease: 'none' }, tPelo + .26);
  TL.to('#maeR-olhos .pupila', { x: 8, y: -2, duration: .15 }, W('achava') - .05);
  TL.to('#maeR-sobr', { y: -9, duration: .12, ease: 'back.out(3)' }, W('achava') - .05);
  boca('maeR', 'meio', W('achava'));
  TL.set('#brilhoOlho', { opacity: 1 }, W('achava') + .1).fromTo('#brilhoOlho', { attr: { transform: 'translate(576 1394) scale(0) rotate(0)' } }, { attr: { transform: 'translate(576 1394) scale(0.42) rotate(90)' }, duration: .3, ease: 'back.out(3)' }, W('achava') + .1);
  TL.set({}, {}, DUR);
}

window.renderAt = (t) => { TL.seek(t, false); aplicaCams(); legendaEm(t); };
window.DUR = DUR;
window.CORTES = CORTES;
window.PAL = PAL;
document.fonts.load('700 60px Fredoka').then(() => { monta(); window.pronto = true; renderAt(0); });
