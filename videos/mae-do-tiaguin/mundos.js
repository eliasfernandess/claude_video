// Cenários e elenco do vídeo 09 (Estilo 4).
const MAE = { cabelo: 'rabo', corCabelo: '#F6D36A', camisa: '#FFB347', calca: '#4A78C2', olho: '#3D8FD1', h: 360 };
const MENINA = { cabelo: 'trancas', corCabelo: '#F6D36A', camisa: '#F7A8B8', calca: '#8E6BB8', saia: true, olho: '#3D8FD1', h: 250 };
const TG = { cabelo: 'topete', corCabelo: '#F4CF5B', camisa: '#E8505B', calca: '#3E5F99', fita: true, h: 300 };
const CAIO = { cabelo: 'espetado', corCabelo: '#5B3A24', camisa: '#6CC070', calca: '#3E5F99', pele: 'media', h: 290 };
const LURDES = { cabelo: 'coque', corCabelo: '#E9E9E9', camisa: '#B98CDB', calca: '#8E6BB8', saia: true, oculos: true, xale: '#E5737A', h: 320 };
const P = (id, base, extra) => pessoa({ ...base, ...extra, id });

// ---------- ajudantes de cenário ----------
const CORES_CASA = [['#F7A8B8', '#E5737A'], ['#9FE0C6', '#58B08F'], ['#C7B3F0', '#8E78C9'], ['#FFC9A1', '#E98B5A'], ['#FCE38A', '#E3B23C'], ['#A9D3F5', '#5D9CD3']];
function fileiraCasas(x0, x1, base, seed = 0) {
  let s = '', x = x0, i = seed;
  while (x < x1) { const w = 250 + (i * 37) % 90, h = 380 + (i * 53) % 170, c = CORES_CASA[i % 6]; s += casa(x, base, w, h, c[0], c[1], 2, 2); x += w + 6; i++; }
  return s;
}
function ceu(id, c1, c2, y0 = -3000, y1 = 1520) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect x="-3000" y="${y0}" width="8000" height="${y1 - y0}" fill="url(#${id})"/>`;
}
function chao(y0, y1, vx, cor, linha = '#d9bf95') {
  let s = `<rect x="-3000" y="${y0}" width="8000" height="${y1 - y0}" fill="${cor}"/>`;
  for (let k = 0, y = y0 + 40; y < y1; k++, y += 40 + k * 22) s += `<line x1="-3000" y1="${y}" x2="5000" y2="${y}" stroke="${linha}" stroke-width="3"/>`;
  for (let i = -16; i <= 16; i++) s += `<line x1="${vx + i * 30}" y1="${y0}" x2="${vx + i * 420}" y2="${y1}" stroke="${linha}" stroke-width="3"/>`;
  return s;
}
function relogio(pref, x, cy, R, h, m, s = 240, moldura = '#F4DDB8') {
  let o = `<g>${circ(x, cy, R + 14, moldura)}${circ(x, cy, R, '#FFFDF5')}`;
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2, L = i % 3 ? .18 : .28; o += `<line x1="${x + Math.sin(a) * R * .89}" y1="${cy - Math.cos(a) * R * .89}" x2="${x + Math.sin(a) * R * (1 - L)}" y2="${cy - Math.cos(a) * R * (1 - L)}" stroke="${OUT}" stroke-width="${R * (i % 3 ? .033 : .065)}" stroke-linecap="round"/>`; }
  o += `<line id="${pref}H" x1="${x}" y1="${cy}" x2="${x}" y2="${cy - R * .5}" stroke="${OUT}" stroke-width="${R * .11}" stroke-linecap="round" transform="rotate(${h} ${x} ${cy})"/>`;
  o += `<line id="${pref}M" x1="${x}" y1="${cy}" x2="${x}" y2="${cy - R * .76}" stroke="${OUT}" stroke-width="${R * .075}" stroke-linecap="round" transform="rotate(${m} ${x} ${cy})"/>`;
  o += `<line id="${pref}S" x1="${x}" y1="${cy + R * .15}" x2="${x}" y2="${cy - R * .85}" stroke="#E8505B" stroke-width="${R * .038}" stroke-linecap="round" transform="rotate(${s} ${x} ${cy})"/>`;
  return o + `${circ(x, cy, R * .1, '#E8505B')}</g>`;
}
function placa(x, y, txt, id = '', w = 164, fs = 46, cor = '#FFD23F') {
  return `<g ${id ? `id="${id}"` : ''} transform="translate(${x} ${y})"><rect x="${-w / 2}" y="-30" width="${w}" height="60" rx="14" fill="#2a2d3e"/><text y="16" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${fs}" fill="${cor}">${txt}</text></g>`;
}
function torre(pref, x, base, topo) {
  const w = 230;
  let s = `<g><rect x="${x - w / 2}" y="${topo}" width="${w}" height="${base - topo}" fill="#E9C99C" stroke="${OUT}" stroke-width="${OW}"/>`;
  for (let y = topo + 60; y < base; y += 70) s += `<line x1="${x - w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y}" stroke="#d4ae7c" stroke-width="3"/>`;
  s += `<rect x="${x - w / 2}" y="${topo}" width="${w * .2}" height="${base - topo}" fill="#000" opacity=".07"/>`;
  s += `<path d="M ${x - w / 2 - 24} ${topo} L ${x} ${topo - 190} L ${x + w / 2 + 24} ${topo} Z" fill="#E5737A" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  s += `<rect x="${x - w / 2 - 14}" y="${topo - 6}" width="${w + 28}" height="22" rx="6" fill="#F4DDB8" stroke="${OUT}" stroke-width="${OW}"/>`;
  for (let y = topo + 330; y < base - 200; y += 260) s += `<rect x="${x - 22}" y="${y}" width="44" height="90" rx="22" fill="#7AA6C2" stroke="${OUT}" stroke-width="${OW}"/>`;
  s += `<rect x="${x - 50}" y="${base - 170}" width="100" height="170" rx="50" fill="#9B6B43" stroke="${OUT}" stroke-width="${OW}"/>`;
  s += relogio(pref, x, topo + 160, 92, -1, -6) + placa(x, topo + 306, '23:59');
  return s + '</g>';
}
function carro(x, y, k = 1, cor = '#5DADE2', id = '') {
  return `<g ${id ? `id="${id}"` : ''} transform="translate(${x} ${y}) scale(${k})"><path d="M -110 0 L -110 -40 Q -100 -60 -70 -62 L -40 -100 Q -30 -110 0 -110 L 40 -110 Q 64 -110 74 -96 L 96 -62 Q 112 -58 112 -40 L 112 0 Z" fill="${cor}" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/><path d="M -30 -92 L 0 -92 L 0 -64 L -54 -64 Z M 14 -92 L 46 -92 L 64 -64 L 14 -64 Z" fill="#CFEAF7" stroke="${OUT}" stroke-width="3"/>${circ(-62, 2, 24, '#3a3a48')}${circ(62, 2, 24, '#3a3a48')}${circ(-62, 2, 9, '#bbb')}${circ(62, 2, 9, '#bbb')}</g>`;
}
function bandeirinhas(x0, x1, y, id = '') {
  let s = `<g ${id ? `id="${id}"` : ''}><path d="M ${x0} ${y} Q ${(x0 + x1) / 2} ${y + 90} ${x1} ${y}" stroke="${OUT}" stroke-width="3" fill="none"/>`;
  const cs = ['#E8505B', '#FFD23F', '#5DADE2', '#6CC070', '#B98CDB', '#F7A8B8'];
  for (let i = 1; i < 14; i++) { const f = i / 14, x = x0 + (x1 - x0) * f, yy = y + 90 * 4 * f * (1 - f) * .5 + 4; s += `<path d="M ${x - 22} ${yy} L ${x + 22} ${yy} L ${x} ${yy + 46} Z" fill="${cs[i % 6]}" stroke="${OUT}" stroke-width="2.5" stroke-linejoin="round"/>`; }
  return s + '</g>';
}
function bolo(x, y, k = 1, vela = '12', id = '') {
  return `<g ${id ? `id="${id}"` : ''} transform="translate(${x} ${y}) scale(${k})"><ellipse cx="0" cy="4" rx="120" ry="18" fill="#fff" stroke="${OUT}" stroke-width="${OW}"/><rect x="-96" y="-90" width="192" height="92" rx="16" fill="#F7A8C8" stroke="${OUT}" stroke-width="${OW}"/><path d="M -96 -66 q 24 26 48 0 q 24 26 48 0 q 24 26 48 0 q 24 26 48 0" fill="#fff" stroke="${OUT}" stroke-width="3"/>` +
    (vela ? `<text x="0" y="-100" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="76" fill="#A9D3F5" stroke="${OUT}" stroke-width="6" paint-order="stroke">${vela}</text>${pilula(-20, -158, -20, -172, 4, OUT)}${pilula(20, -158, 20, -172, 4, OUT)}<g class="chamasBolo">${fogo(id + 'f1', -20, -172, .55)}${fogo(id + 'f2', 20, -172, .55)}</g>` : '') + `</g>`;
}
function janela(x, y, w, h, ceuCor = '#BFE6F5', cortina = '#F7A8B8') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${ceuCor}" stroke="${OUT}" stroke-width="${OW}"/><line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${OUT}" stroke-width="4"/>` +
    (cortina ? `<path d="M ${x - 20} ${y - 20} L ${x + w * .33} ${y - 20} Q ${x + w * .22} ${y + h * .5} ${x + w * .4} ${y + h + 20} L ${x - 20} ${y + h + 20} Z" fill="${cortina}" stroke="${OUT}" stroke-width="${OW}"/><path d="M ${x + w + 20} ${y - 20} L ${x + w * .67} ${y - 20} Q ${x + w * .78} ${y + h * .5} ${x + w * .6} ${y + h + 20} L ${x + w + 20} ${y + h + 20} Z" fill="${cortina}" stroke="${OUT}" stroke-width="${OW}"/>` : '');
}
function paredeListras(c1, c2, y1 = 1680, passo = 70) {
  let s = `<rect x="-1500" y="-1500" width="4200" height="${y1 + 1500}" fill="${c1}"/>`;
  for (let x = -1500; x < 2700; x += passo) s += `<rect x="${x}" y="-1500" width="${passo / 2}" height="${y1 + 1500}" fill="${c2}"/>`;
  return s + `<rect x="-1500" y="${y1}" width="4200" height="30" fill="#E8C99A" stroke="${OUT}" stroke-width="${OW}"/>`;
}
function pisoXadrez(y0, c1, c2, n = 10) { let s = ''; for (let i = 0; i < 50; i++) for (let j = 0; j < n; j++) s += `<rect x="${-1500 + i * 90}" y="${y0 + j * 90}" width="90" height="90" fill="${(i + j) % 2 ? c1 : c2}"/>`; return s; }
function mesa(x, y, w, cor = '#C98E5A', toalha = null) {
  let s = toalha ? `<path d="M ${x - w / 2 + 10} ${y + 10} L ${x + w / 2 - 10} ${y + 10} L ${x + w / 2 + 10} ${y + 270} Q ${x} ${y + 300} ${x - w / 2 - 10} ${y + 270} Z" fill="${toalha}" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/>` : `${pilula(x - w / 2 + 40, y + 34, x - w / 2 + 40, y + 380, 22, escurece(cor, .9))}${pilula(x + w / 2 - 40, y + 34, x + w / 2 - 40, y + 380, 22, escurece(cor, .9))}`;
  return s + `<rect x="${x - w / 2}" y="${y}" width="${w}" height="34" rx="10" fill="${cor}" stroke="${OUT}" stroke-width="${OW}"/>`;
}
function estante(x, y, w, h, prat = 5, tipo = 'livros') {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#9B6B43" stroke="${OUT}" stroke-width="${OW}"/>`;
  const cs = ['#E8505B', '#5DADE2', '#6CC070', '#FFD23F', '#B98CDB', '#F08A4B', '#58B08F'];
  for (let p = 0; p < prat; p++) {
    const py = y + (p + 1) * h / prat;
    s += `<rect x="${x}" y="${py - 14}" width="${w}" height="14" fill="#7E5434"/>`;
    if (tipo === 'livros') for (let bx = x + 12, i = p * 3; bx < x + w - 30; i++) { const bw = 22 + (i * 7) % 16, bh = h / prat * (.55 + ((i * 13) % 30) / 100); s += `<rect x="${bx}" y="${py - 14 - bh}" width="${bw}" height="${bh}" fill="${cs[i % 7]}" stroke="${OUT}" stroke-width="2.4"/>`; bx += bw + 3; }
    if (tipo === 'paes') for (let bx = x + 50, i = p; bx < x + w - 40; i++, bx += 90) s += `<ellipse cx="${bx}" cy="${py - 40}" rx="40" ry="24" fill="${['#E3A857', '#D18F3F', '#F0C27B'][i % 3]}" stroke="${OUT}" stroke-width="2.6"/><path d="M ${bx - 20} ${py - 50} l 10 16 M ${bx} ${py - 54} l 10 16 M ${bx + 20} ${py - 50} l 8 14" stroke="#fff" stroke-width="3" opacity=".6"/>`;
  }
  return s;
}
function cama(x, y, w, cor, cobertor) { return `<rect x="${x}" y="${y}" width="${w}" height="120" rx="20" fill="${cor}" stroke="${OUT}" stroke-width="${OW}"/>${pilula(x + 30, y + 110, x + 30, y + 190, 24, escurece(cor, .8))}${pilula(x + w - 30, y + 110, x + w - 30, y + 190, 24, escurece(cor, .8))}<rect x="${x - 10}" y="${y - 160}" width="40" height="280" rx="16" fill="${cor}" stroke="${OUT}" stroke-width="${OW}"/>`; }
function folhas(id, n, x0, x1, y0, y1, seed = 1) {
  let s = `<g id="${id}">`;
  for (let i = 0; i < n; i++) { const r = (k) => { const v = Math.sin((i + seed) * 91.7 + k * 13.3) * 4375.5; return v - Math.floor(v); }; s += `<g class="folha" data-i="${i}"><path transform="translate(${x0 + r(1) * (x1 - x0)} ${y0 + r(2) * (y1 - y0)}) rotate(${r(3) * 360}) scale(${.8 + r(4) * .8})" d="M 0 -18 Q 16 0 0 18 Q -16 0 0 -18 Z" fill="${['#6CC070', '#E3B23C', '#58B08F'][i % 3]}" stroke="${OUT}" stroke-width="2"/></g>`; }
  return s + '</g>';
}
function fundoPraca(pref, ceuA = '#8FD0EE', ceuB = '#E6F6FB') {
  return ceu(pref + 'ceu', ceuA, ceuB) + nuvem(200, 300, 1.6) + nuvem(1350, 180, 1.3) + nuvem(-200, 900, 1.2) + nuvem(1500, 760, 1.5) +
    fileiraCasas(-900, 2500, 1500, 0) + torre(pref + 'rel', 800, 1500, 260) + chao(1500, 3400, 800, '#EFDCBB') + arvore(300, 1560, 1.5) + arvore(1330, 1560, 1.6);
}
function raiosCena(c1, c2) { return raios(540, 960, 20, c1, c2); }
function papel(x, y, w, h) { return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#F6ECD2" stroke="${OUT}" stroke-width="${OW}"/><rect x="${x + 14}" y="${y + 14}" width="${w - 28}" height="${h - 28}" fill="none" stroke="#c9b88f" stroke-width="3" stroke-dasharray="14 10"/>`; }
const tinta = '#6b4a2a';
function boneco(x, y, k = 1, cor = tinta) { return `<g transform="translate(${x} ${y}) scale(${k})" fill="none" stroke="${cor}" stroke-width="6" stroke-linecap="round"><circle cx="0" cy="-120" r="30"/><line x1="0" y1="-90" x2="0" y2="-20"/><line x1="0" y1="-70" x2="-34" y2="-40"/><line x1="0" y1="-70" x2="34" y2="-40"/><line x1="0" y1="-20" x2="-26" y2="30"/><line x1="0" y1="-20" x2="26" y2="30"/></g>`; }

// ---------- os cenários ----------
function mundoPraca() {
  let s = `<defs><filter id="borra" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26"/></filter></defs>` + fundoPraca('pr');
  s += bandeirinhas(-300, 1900, 1580, 'prBand') + `<g id="prMesa">${mesa(1140, 2180, 300, '#C98E5A', '#E8505B')}${bolo(1140, 2180, .9, '12', 'prBolo')}</g>`;
  [[150, 1700, 'espetado', '#5B3A24', '#E8505B', 'media'], [380, 1690, 'coque', '#3b2a1f', '#9FE0C6', 'morena'], [1180, 1700, 'curto', '#2b2b2b', '#C7B3F0', 'clara'], [1420, 1690, 'careca', '#000000', '#FCE38A', 'escura']]
    .forEach(([x, y, cb, cc, cm, pl], i) => s += pessoa({ id: 'prF' + i, x, y, h: 230, cabelo: cb, corCabelo: cc, camisa: cm, pele: pl, calca: '#6F7FA6' }));
  s += `<ellipse cx="640" cy="2085" rx="60" ry="12" fill="#000" opacity=".12"/><g id="prFlutua">${pessoa({ id: 'prFlu', x: 640, y: 1960, h: 300, cabelo: 'rabo', corCabelo: '#3b2a1f', camisa: '#B98CDB', pele: 'morena', calca: '#8E6BB8', saia: true })}</g>`;
  s += `<g id="prVoador"><g transform="rotate(78)"><path d="M -30 -200 Q -120 -120 -70 -40 L 30 -190 Z" fill="#E8505B" stroke="${OUT}" stroke-width="${OW}"/>${pessoa({ id: 'prVoa', x: 0, y: 0, h: 260, cabelo: 'espetado', corCabelo: '#5B3A24', camisa: '#5DADE2', pele: 'media', calca: '#3E5F99' })}</g></g>`;
  s += `<g id="prBola">${circ(0, 0, 34, '#FF7A2F')}<circle r="18" fill="#FFD23F"/><path d="M -30 -20 Q -90 -10 -130 0 Q -90 10 -30 22 Z" fill="#FFB347" opacity=".85"/></g>`;
  s += `<g id="prForte">${carro(1090, 1700, 1.05)}${pessoa({ id: 'prFor', x: 1090, y: 2110, h: 350, cabelo: 'coque', corCabelo: '#2b2b2b', camisa: '#6CC070', pele: 'escura', calca: '#3E5F99', bE: 165, bD: -165 })}</g>`;
  s += `<g>${pessoa({ id: 'prFog', x: 500, y: 2130, h: 350, cabelo: 'espetado', corCabelo: '#2b2b2b', camisa: '#E8505B', pele: 'morena', calca: '#555B6E', bE: 40, bD: -40 })}${fogo('prFogo1', 440, 2010, 1.1)}${fogo('prFogo2', 560, 2010, 1.1)}</g>`;
  s += P('prMae', MAE, { x: 800, y: 2250 });
  s += `<g>${pessoa({ id: 'prPla', x: 1250, y: 2420, h: 300, cabelo: 'curto', corCabelo: '#5B3A24', camisa: '#FCE38A', calca: '#8E6BB8' })}<g transform="translate(1180 2440)"><g id="prBroto" transform="scale(1 0)">${pilula(0, 0, 0, -120, 10, '#58B08F')}${elip(-26, -80, 26, 12, '#6CC070')}${elip(26, -110, 26, 12, '#6CC070')}${circ(0, -134, 18, '#F7A8B8')}</g></g></g>`;
  s += `<g id="prFaiscas">${brilho(380, 2280, 1.4)}${brilho(1180, 2000, 1.2, '#A9D3F5')}${brilho(980, 1800, 1, '#F7A8B8')}</g>`;
  return s;
}
function mundoVela() {
  return raiosCena('#FFD45C', '#FFC43A') + `<g transform="translate(540 1000)"><g id="vela12" transform="scale(0.01)"><ellipse cx="0" cy="250" rx="300" ry="40" fill="#000" opacity=".12"/>
    <text x="0" y="230" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="560" fill="#F7A8C8" stroke="${OUT}" stroke-width="14" paint-order="stroke" stroke-linejoin="round">12</text>
    <text x="0" y="230" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="560" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="40 60" opacity=".55">12</text>
    ${pilula(-118, -170, -118, -215, 7, OUT)}${pilula(96, -170, 96, -215, 7, OUT)}${fogo('velaA', -118, -215, 1.3)}${fogo('velaB', 96, -215, 1.3)}</g></g>`;
}
function mundoCozinha() {
  let s = paredeListras('#FBEFD5', '#F5E2BF') + pisoXadrez(1710, '#BFE3D5', '#F4FBF8');
  s += janela(40, 560, 300, 340) + nuvem(160, 700, .6);
  s += relogio('czRel', 820, 640, 70, -1, -6, 200, '#F4DDB8');
  s += `<rect x="900" y="820" width="260" height="870" rx="30" fill="#E3F1F7" stroke="${OUT}" stroke-width="${OW}"/><line x1="900" y1="1110" x2="1160" y2="1110" stroke="${OUT}" stroke-width="${OW}"/><rect x="930" y="900" width="14" height="140" rx="7" fill="#9BB"/><rect x="930" y="1150" width="14" height="200" rx="7" fill="#9BB"/>`;
  s += `<g id="czCal" visibility="hidden" transform="translate(620 600)"><rect x="-80" y="-90" width="160" height="180" rx="12" fill="#fff" stroke="${OUT}" stroke-width="${OW}"/><rect x="-80" y="-90" width="160" height="46" rx="12" fill="#E8505B" stroke="${OUT}" stroke-width="${OW}"/><text y="30" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="34" fill="${OUT}">AMANHÃ</text><g id="czCirc" transform="scale(0.01)"><ellipse cx="0" cy="20" rx="78" ry="40" fill="none" stroke="#E8505B" stroke-width="8"/></g></g>`;
  s += `<g id="czTgW">${P('czTg', TG, { x: 730, y: 1420 })}</g>`;
  s += mesa(690, 1290, 520, '#C98E5A', '#E8505B');
  s += `<g id="czTigela"><path d="M 670 1290 Q 670 1240 690 1236 L 770 1236 Q 790 1240 790 1290 Z" fill="#fff" stroke="${OUT}" stroke-width="${OW}"/><ellipse cx="730" cy="1238" rx="60" ry="10" fill="#F4D58D" stroke="${OUT}" stroke-width="2"/></g>`;
  s += `<g id="czBolo" visibility="hidden">${bolo(690, 1290, 1, '12', 'czB')}</g>`;
  s += `<g id="czMaeW">${P('czMae', MAE, { x: 420, y: 1930, h: 540 })}</g>`;
  s += `<rect id="czNoite" x="-1500" y="-1500" width="4200" height="4200" fill="#1d2550" opacity="0"/>`;
  s += `<g id="czLuz" opacity="0"><circle cx="690" cy="1200" r="420" fill="#FFD890" opacity=".22"/></g>`;
  return s;
}
function mundoRua() {
  let s = ceu('ruaceu', '#9ED8F0', '#EAF7FB', -2000, 1360) + nuvem(150, 500, 1.3) + nuvem(900, 380, 1.1) + fileiraCasas(-900, 2200, 1350, 3);
  s += `<rect x="-2000" y="1350" width="5000" height="120" fill="#D9D2C5" stroke="${OUT}" stroke-width="${OW}"/><rect x="-2000" y="1470" width="5000" height="1400" fill="#EFDCBB"/>`;
  const AU = ['#FF7A2F', '#5DADE2', '#B98CDB', '#6CC070', '#FFD23F', '#F7A8B8', '#58D6C8', '#E8505B'];
  const G = [[150, 1560, 'espetado', '#5B3A24', '#E8505B', 'media'], [330, 1540, 'coque', '#2b2b2b', '#9FE0C6', 'escura'], [760, 1545, 'curto', '#3b2a1f', '#C7B3F0', 'clara'], [940, 1560, 'rabo', '#2b2b2b', '#FCE38A', 'morena'],
    [70, 1820, 'careca', '#000000', '#FFC9A1', 'morena'], [300, 1850, 'rabo', '#B5651D', '#A9D3F5', 'clara'], [800, 1850, 'espetado', '#2b2b2b', '#F08A4B', 'escura'], [1010, 1820, 'curto', '#F4CF5B', '#6CC070', 'media']];
  G.forEach(([x, y, cb, cc, cm, pl], i) => {
    const h = y > 1700 ? 330 : 280;
    s += `<ellipse class="ruaAura" cx="${x}" cy="${y - h * .55}" rx="${h * .62}" ry="${h * .78}" fill="${AU[i]}" opacity=".55" filter="url(#borra)"/>`;
    s += pessoa({ id: 'ru' + i, x, y, h, cabelo: cb, corCabelo: cc, camisa: cm, pele: pl, calca: '#6F7FA6' });
  });
  s += `<g style="filter:grayscale(1) brightness(1.04)">${P('ruMae', MAE, { x: 540, y: 1700, h: 380 })}</g>`;
  s += `<g id="ruBrilho" transform="translate(576 1394) scale(0)">${brilho(0, 0, 1, '#FFF4B0')}</g>`;
  return s;
}
function mundoPadaria() {
  let s = paredeListras('#FFE9C7', '#FCDDB0', 1700, 90) + pisoXadrez(1730, '#E9C9A0', '#F7E6CC');
  s += estante(-120, 520, 1320, 900, 3, 'paes');
  s += `<rect x="-200" y="1420" width="1500" height="300" rx="16" fill="#C98E5A" stroke="${OUT}" stroke-width="${OW}"/><rect x="-200" y="1420" width="1500" height="40" fill="#E3A857" stroke="${OUT}" stroke-width="${OW}"/>`;
  s += `<g transform="translate(540 380)"><rect x="-210" y="-60" width="420" height="110" rx="20" fill="#E5737A" stroke="${OUT}" stroke-width="${OW}"/><text y="18" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="64" fill="#fff">PADARIA</text></g>`;
  s += pessoa({ id: 'pdP', x: 540, y: 1700, h: 520, cabelo: 'curto', corCabelo: '#5B3A24', camisa: '#fff', calca: '#6F7FA6', bigode: '#5B3A24', chapeu: 'chef', avental: 1, gordo: 1, pele: 'media', bE: -60, bD: 60 });
  s += `<g id="pdMaos"><circle cx="450" cy="1500" r="70" fill="#FF9A3C" opacity=".45" filter="url(#borra)"/><circle cx="630" cy="1500" r="70" fill="#FF9A3C" opacity=".45" filter="url(#borra)"/></g>`;
  s += `<ellipse cx="540" cy="1500" rx="120" ry="52" fill="#E3A857" stroke="${OUT}" stroke-width="${OW}"/><path d="M 480 1482 l 18 26 M 530 1476 l 18 26 M 580 1482 l 16 24" stroke="#fff" stroke-width="5" opacity=".6"/>`;
  s += `<g id="pdVapor" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".85"><path d="M 470 1460 q -14 -24 0 -48"/><path d="M 540 1456 q 14 -24 0 -48"/><path d="M 610 1460 q -14 -24 0 -48"/></g>`;
  return s;
}
function mundoAula() {
  let s = `<rect x="-1500" y="-1500" width="4200" height="3200" fill="#CFE8D8"/><rect x="-1500" y="1700" width="4200" height="1500" fill="#D9B98F"/>`;
  s += `<rect x="40" y="520" width="1000" height="560" rx="16" fill="#2F5D4A" stroke="#9B6B43" stroke-width="24"/><text x="140" y="680" font-family="Fredoka" font-weight="600" font-size="90" fill="#F4F4E8">PROVA</text><text x="140" y="820" font-family="Fredoka" font-weight="600" font-size="70" fill="#F4F4E8">7 + 5 = ?</text><text x="140" y="940" font-family="Fredoka" font-weight="600" font-size="70" fill="#F4F4E8" opacity=".7">12 × 2 = ?</text>`;
  s += pessoa({ id: 'auProf', x: 640, y: 1640, h: 470, costas: 1, olhosNuca: 1, cabelo: 'coque', corCabelo: '#6B4226', camisa: '#B98CDB', calca: '#555B6E', saia: 1, bD: -150 });
  s += `<g id="auAluno">${pessoa({ id: 'auAl', x: 260, y: 2090, h: 330, cabelo: 'espetado', corCabelo: '#2b2b2b', camisa: '#5DADE2', pele: 'morena', bD: -40 })}</g>`;
  s += mesa(300, 1870, 380, '#E3B23C');
  s += `<g id="auCola" transform="translate(390 1830) rotate(-8)"><rect x="-44" y="-30" width="88" height="60" rx="6" fill="#fff" stroke="${OUT}" stroke-width="3"/><path d="M -30 -12 h 60 M -30 2 h 50 M -30 16 h 56" stroke="#999" stroke-width="4"/></g>`;
  s += `<g id="auSuor" visibility="hidden"><path d="M 330 1720 q 12 20 0 30 q -12 -10 0 -30 Z" fill="#7EC8F0" stroke="${OUT}" stroke-width="2"/></g>`;
  return s;
}
function mundoVizinho() {
  let s = ceu('vzceu', '#9ED8F0', '#EAF7FB', -2000, 1300) + nuvem(250, 420, 1.3) + fileiraCasas(-900, 2200, 1300, 7);
  s += `<rect x="-2000" y="1300" width="5000" height="2000" fill="#D9D2C5"/><line x1="-2000" y1="1300" x2="3000" y2="1300" stroke="${OUT}" stroke-width="${OW}"/>`;
  for (let x = -2000; x < 3000; x += 160) s += `<line x1="${x}" y1="1300" x2="${x - 60}" y2="2600" stroke="#c9c1b2" stroke-width="3"/>`;
  s += `<ellipse cx="900" cy="1960" rx="190" ry="40" fill="#7FB8D9" stroke="${OUT}" stroke-width="${OW}"/><ellipse cx="860" cy="1950" rx="70" ry="10" fill="#fff" opacity=".5"/>`;
  s += `<ellipse id="vzSombra" cx="420" cy="1965" rx="70" ry="14" fill="#000" opacity=".15"/>`;
  s += `<g id="vzViz">${pessoa({ id: 'vzV', x: 420, y: 1880, h: 440, cabelo: 'curto', corCabelo: '#2b2b2b', camisa: '#5DADE2', calca: '#E8505B', magro: 1, capa: '#E8505B', bE: 150, bD: -150 })}</g>`;
  s += `<g transform="translate(520 1965)"><g id="vzRegua" transform="scale(0.01)"><rect x="-16" y="-85" width="32" height="85" fill="#FFD23F" stroke="${OUT}" stroke-width="3"/><path d="M -16 -70 h 12 M -16 -56 h 8 M -16 -42 h 12 M -16 -28 h 8 M -16 -14 h 12" stroke="${OUT}" stroke-width="2"/>${placa(110, -44, '10 cm', '', 150, 40)}</g></g>`;
  return s;
}
// ---- infância (flashback) ----
function mundoCozAntiga() {
  let s = paredeListras('#E9F2D8', '#DDE9C6', 1680, 60) + pisoXadrez(1710, '#E7D3B0', '#F7EBD6');
  s += `<rect x="600" y="520" width="400" height="360" rx="14" fill="#BFE6F5" stroke="${OUT}" stroke-width="${OW}"/><line x1="800" y1="520" x2="800" y2="880" stroke="${OUT}" stroke-width="4"/>`;
  [[650, '#F6D36A'], [730, '#5B3A24'], [830, '#2b2b2b'], [930, '#B5651D']].forEach(([x, cc], i) => s += `<g id="caViz${i}" visibility="hidden"><g transform="translate(0 0)">${pessoa({ id: 'caV' + i, x, y: 1110, h: 300, cabelo: ['rabo', 'espetado', 'coque', 'curto'][i], corCabelo: cc, camisa: '#ccc', pele: ['clara', 'media', 'escura', 'morena'][i] })}</g></g>`);
  s += `<rect x="580" y="880" width="440" height="40" fill="#E9F2D8" stroke="${OUT}" stroke-width="${OW}"/><rect x="580" y="900" width="440" height="300" fill="#E9F2D8"/>`;
  s += `<g transform="translate(240 620)"><rect x="-90" y="-100" width="180" height="200" rx="12" fill="#fff" stroke="${OUT}" stroke-width="${OW}"/><rect x="-90" y="-100" width="180" height="50" rx="12" fill="#5DADE2" stroke="${OUT}" stroke-width="${OW}"/><text y="40" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="44" fill="${OUT}">TERÇA</text></g>`;
  s += P('caMen', MENINA, { x: 360, y: 1540 });
  s += mesa(470, 1440, 520, '#C98E5A', '#9FE0C6') + `<g id="caBolo">${bolo(610, 1440, .85, '12', 'caB')}</g>`;
  s += `<g id="caFumaca" visibility="hidden" fill="#ddd" opacity=".8"><circle cx="594" cy="1272" r="14"/><circle cx="604" cy="1240" r="18"/><circle cx="592" cy="1204" r="22"/><circle cx="628" cy="1272" r="12"/><circle cx="638" cy="1242" r="16"/></g>`;
  return s;
}
function mundoRelogioAntigo() {
  let s = paredeListras('#E9F2D8', '#DDE9C6', 3000, 60) + relogio('raR', 540, 900, 300, -1, -6, 0, '#C98E5A');
  ['00:00', '00:01', '00:10'].forEach((t, i) => s += `<g id="raT${i}" visibility="hidden">${placa(540, 1360, t, '', 300, 90, '#FFD23F').replace('y="-30"', 'y="-56"').replace('height="60"', 'height="112"').replace('y="16"', 'y="32"')}</g>`);
  return s;
}
function mundoMedico() {
  let s = `<rect x="-1500" y="-1500" width="4200" height="3200" fill="#DCEFF5"/><rect x="-1500" y="1700" width="4200" height="1500" fill="#BFD9E2"/>`;
  s += `<g transform="translate(820 640)"><rect x="-140" y="-110" width="280" height="220" rx="10" fill="#fff" stroke="${OUT}" stroke-width="${OW}"/><text id="mdTxt" y="40" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="120" fill="#E8505B" visibility="hidden">200</text><text y="-50" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="34" fill="${OUT}">ANOS</text></g>`;
  s += `<rect x="-60" y="1350" width="420" height="80" rx="20" fill="#fff" stroke="${OUT}" stroke-width="${OW}"/>${pilula(0, 1430, 0, 1700, 20, '#9BB')}${pilula(300, 1430, 300, 1700, 20, '#9BB')}`;
  s += P('mdMen', MENINA, { x: 170, y: 1500, h: 240 });
  [[480, 'curto', '#5B3A24', 'media', 0], [700, 'espetado', '#2b2b2b', 'escura', 0], [930, 'careca', '#000000', 'clara', 1]].forEach(([x, cb, cc, pl, velho], i) =>
    s += `<g id="mdDoc${i}">${pessoa({ id: 'mdD' + i, x, y: 1820, h: 420, cabelo: cb, corCabelo: cc, pele: pl, camisa: '#fff', calca: '#5D9CD3', oculos: velho, bigode: velho ? '#ddd' : null, bD: velho ? -60 : -14 })}</g>`);
  s += `<g id="mdLupa" transform="translate(860 1420) rotate(-30)">${pilula(0, 0, 0, 80, 14, '#9B6B43')}${circ(0, -30, 40, '#DFF4FF', 'opacity=".9"')}</g>`;
  return s;
}
function mundoEscola() {
  let s = ceu('esceu', '#9ED8F0', '#EAF7FB', -2000, 1300) + `<rect x="-400" y="600" width="1900" height="700" fill="#FCE38A" stroke="${OUT}" stroke-width="${OW}"/>`;
  for (let x = -340; x < 1440; x += 170) s += `<rect x="${x}" y="680" width="110" height="140" rx="6" fill="#BFE3F2" stroke="${OUT}" stroke-width="${OW}"/><rect x="${x}" y="960" width="110" height="140" rx="6" fill="#BFE3F2" stroke="${OUT}" stroke-width="${OW}"/>`;
  s += `<g transform="translate(540 560)"><rect x="-150" y="-50" width="300" height="90" rx="16" fill="#58B08F" stroke="${OUT}" stroke-width="${OW}"/><text y="18" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="56" fill="#fff">ESCOLA</text></g>`;
  s += `<rect x="-2000" y="1300" width="5000" height="2000" fill="#E9D4AE"/>`;
  s += pessoa({ id: 'esK0', x: 160, y: 1700, h: 260, cabelo: 'espetado', corCabelo: '#2b2b2b', camisa: '#E8505B', pele: 'escura', bE: 40, bD: -40 }) + fogo('esFogo', 160, 1580, 1);
  s += `<g id="esK1">${pessoa({ id: 'esK1p', x: 420, y: 1560, h: 250, cabelo: 'rabo', corCabelo: '#B5651D', camisa: '#5DADE2', bE: 150, bD: -150 })}</g><ellipse cx="420" cy="1720" rx="50" ry="10" fill="#000" opacity=".12"/>`;
  s += pessoa({ id: 'esK2', x: 680, y: 1720, h: 260, cabelo: 'curto', corCabelo: '#5B3A24', camisa: '#6CC070', pele: 'media' }) + `<g id="esBolhas" fill="#BFE6F5" stroke="${OUT}" stroke-width="2" opacity=".85"><circle cx="740" cy="1420" r="22"/><circle cx="790" cy="1360" r="16"/><circle cx="720" cy="1310" r="12"/></g>`;
  s += `<rect x="830" y="1830" width="260" height="30" rx="10" fill="#9B6B43" stroke="${OUT}" stroke-width="${OW}"/>${pilula(860, 1860, 860, 1930, 14, '#7E5434')}${pilula(1060, 1860, 1060, 1930, 14, '#7E5434')}`;
  s += `<g style="filter:grayscale(1) brightness(1.05)">${P('esMen', MENINA, { x: 960, y: 1880, bE: 20, bD: -20 })}</g>`;
  return s;
}
function mundoMuro() {
  let s = ceu('muceu', '#9ED8F0', '#EAF7FB', -2000, 1700) + nuvem(200, 500, 1.2) + arvore(900, 1700, 1.8);
  s += `<rect x="-500" y="1300" width="1300" height="900" fill="#D9825B" stroke="${OUT}" stroke-width="${OW}"/>`;
  for (let y = 1300, k = 0; y < 2200; y += 60, k++) for (let x = -500 + (k % 2) * 60; x < 800; x += 120) s += `<rect x="${x}" y="${y}" width="120" height="60" fill="none" stroke="#b5654a" stroke-width="3"/>`;
  s += `<rect x="-2000" y="2200" width="5000" height="1000" fill="#7CC47F"/>`;
  s += `<g id="muPula"><path d="M 360 1100 Q 250 1150 260 1290 L 470 1290 Q 470 1150 400 1100 Z" fill="#E8505B" stroke="${OUT}" stroke-width="${OW}"/>${P('muMen', MENINA, { x: 380, y: 1300, bE: 120, bD: -120 })}</g>`;
  s += `<g id="muGesso" visibility="hidden">${P('muMen2', MENINA, { x: 560, y: 2200, bD: -60 })}<rect x="595" y="2058" width="64" height="36" rx="14" fill="#fff" stroke="${OUT}" stroke-width="${OW}" transform="rotate(30 627 2076)"/><path d="M 535 2040 L 650 2100" stroke="#5DADE2" stroke-width="12"/></g>`;
  return s;
}
function mundoColher() {
  let s = paredeListras('#E9F2D8', '#DDE9C6', 3000, 60);
  s += `<g transform="translate(800 520)"><rect x="-170" y="-150" width="340" height="300" rx="14" fill="#fff" stroke="${OUT}" stroke-width="${OW}"/><rect x="-170" y="-150" width="340" height="60" rx="14" fill="#5DADE2" stroke="${OUT}" stroke-width="${OW}"/>`;
  for (let i = 0; i < 7; i++) s += `<g id="coX${i}" visibility="hidden" transform="translate(${-130 + (i % 4) * 85} ${-50 + Math.floor(i / 4) * 90})"><path d="M -24 -24 L 24 24 M 24 -24 L -24 24" stroke="#E8505B" stroke-width="10" stroke-linecap="round"/></g>`;
  s += `</g>`;
  s += P('coMen', MENINA, { x: 540, y: 1900, h: 560 });
  s += `<rect x="-500" y="1460" width="2100" height="900" fill="#C98E5A" stroke="${OUT}" stroke-width="${OW}"/><rect x="-500" y="1460" width="2100" height="30" fill="#E3A857"/>`;
  s += `<g id="coColher" transform="translate(540 1600)"><ellipse cx="-110" cy="0" rx="60" ry="36" fill="#D6DDE2" stroke="${OUT}" stroke-width="${OW}"/>${pilula(-50, 0, 150, 0, 22, '#D6DDE2')}<ellipse cx="-120" cy="-10" rx="22" ry="10" fill="#fff" opacity=".7"/></g>`;
  return s;
}
function mundoQuarto(pref, parede, ch, corCama, cobertor, quem, extra = '') {
  let s = `<rect x="-1500" y="-1500" width="4200" height="3200" fill="${parede}"/><rect x="-1500" y="1700" width="4200" height="1500" fill="${escurece(parede, .8)}"/>`;
  s += `<rect x="640" y="420" width="320" height="380" rx="14" fill="#2a3466" stroke="${OUT}" stroke-width="${OW}"/><circle cx="860" cy="520" r="44" fill="#FFF4C8"/><circle cx="878" cy="508" r="40" fill="#2a3466"/>${[[700, 470], [760, 650], [910, 700]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#FFF4C8"/>`).join('')}<line x1="800" y1="420" x2="800" y2="800" stroke="${OUT}" stroke-width="4"/>`;
  s += cama(60, 1300, 900, corCama);
  s += `<ellipse cx="170" cy="1290" rx="120" ry="50" fill="#fff" stroke="${OUT}" stroke-width="${OW}"/><g transform="translate(370 1290) rotate(-90)">${quem}</g>`;
  s += `<path d="M 215 1222 Q 600 1180 960 1240 L 960 1420 L 215 1420 Q 185 1320 215 1222 Z" fill="${cobertor}" stroke="${OUT}" stroke-width="${OW}"/><path d="M 380 1270 Q 600 1230 940 1280" stroke="#fff" stroke-width="6" opacity=".35" fill="none"/>`;
  return s + extra;
}
// ---- ventania ----
function tornado(id, x, y, k = 1) {
  let s = `<g id="${id}" transform="translate(${x} ${y}) scale(${k})"><path d="M -360 -1300 Q -150 -500 -50 0 L 50 0 Q 150 -500 360 -1300 Z" fill="#9AA7B8" opacity=".92" stroke="${OUT}" stroke-width="${OW}"/>`;
  for (let i = 0; i < 9; i++) { const y0 = -120 - i * 135, w = 70 + i * 34; s += `<path class="tLinha" d="M ${-w} ${y0} Q 0 ${y0 + 40} ${w} ${y0}" stroke="#E6ECF2" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/>`; }
  return s + '</g>';
}
function mundoVentania() {
  let s = fundoPraca('vt', '#7D8F8C', '#C9D3C4') + bandeirinhas(-300, 1900, 1580);
  s += `<rect id="vtEscuro" x="-3000" y="-3000" width="8000" height="7000" fill="#2f4a46" opacity="0"/>`;
  s += `<g id="vtTornado" transform="translate(800 2160) scale(0.01)">${tornado('vtT', 0, 0, 1)}</g>`;
  s += `<g id="vtCaioW">${P('vtCaio', CAIO, { x: 800, y: 2160, chapeu: 'festa', bE: 30, bD: -30 })}</g>`;
  s += `<g id="vtRede" opacity="0"><path d="M 700 1900 q 100 -80 200 0 q -100 80 -200 0" stroke="#E6ECF2" stroke-width="10" fill="none"/><path d="M 680 1840 q 120 -90 240 0" stroke="#E6ECF2" stroke-width="8" fill="none"/></g>`;
  s += pessoa({ id: 'vtG1', x: 1150, y: 2260, h: 340, cabelo: 'coque', corCabelo: '#2b2b2b', camisa: '#9FE0C6', pele: 'escura', bE: 150, bD: -20 }) + pessoa({ id: 'vtG2', x: 1350, y: 2200, h: 320, cabelo: 'espetado', corCabelo: '#5B3A24', camisa: '#FCE38A', pele: 'media' });
  s += `<g id="vtMaeW">${P('vtMae', MAE, { x: 380, y: 2300, bE: -40, bD: 50 })}${bebe('vtBebe', 380, 2110, 1)}</g>`;
  s += `<g id="vtMaeCostas" visibility="hidden">${pessoa({ ...MAE, id: 'vtMC', x: 520, y: 2320, costas: 1, bE: 30, bD: -30 })}</g>`;
  s += folhas('vtFolhas', 26, -200, 1800, 1200, 2500, 3);
  return s;
}
function mundoCeuVoando() {
  let s = ceu('cvceu', '#5F7470', '#A9B8AE', -3000, 4000);
  for (let i = 0; i < 6; i++) s += `<g class="cvTelha" transform="translate(${200 + i * 140} ${700 + (i % 3) * 120})"><g class="cvTi"><path d="M -60 -20 L 60 -20 L 50 20 L -50 20 Z" fill="#E5737A" stroke="${OUT}" stroke-width="${OW}"/></g></g>`;
  s += `<g transform="translate(540 1500)"><g id="cvCarro">${carro(0, 50, 1.6, '#5DADE2')}</g></g>`;
  s += folhas('cvFolhas', 30, -200, 1300, 300, 2000, 7);
  return s;
}
function mundoFuga() {
  let s = fundoPraca('fg', '#6F837F', '#B9C6B9') + `<rect x="-3000" y="-3000" width="8000" height="7000" fill="#2f4a46" opacity=".35"/>`;
  [[200, 900, '#E8505B'], [700, 700, '#B98CDB'], [1000, 1000, '#6CC070']].forEach(([x, y, c], i) => s += `<g class="fgVoa" id="fgV${i}" transform="translate(${x} ${y})"><g transform="rotate(-60)"><path d="M -30 -180 Q -110 -110 -60 -40 L 30 -170 Z" fill="${c}" stroke="${OUT}" stroke-width="${OW}"/>${pessoa({ id: 'fgP' + i, x: 0, y: 0, h: 240, cabelo: ['espetado', 'rabo', 'curto'][i], corCabelo: '#3b2a1f', camisa: c, pele: ['media', 'clara', 'escura'][i] })}</g></g>`);
  s += `<g id="fgViz" transform="translate(300 2050)">${pessoa({ id: 'fgVz', x: 0, y: 0, h: 420, cabelo: 'curto', corCabelo: '#2b2b2b', camisa: '#5DADE2', calca: '#E8505B', magro: 1, capa: '#E8505B', bE: 70, bD: -70 })}</g><ellipse id="fgSombra" cx="300" cy="2085" rx="70" ry="14" fill="#000" opacity=".15"/>`;
  s += folhas('fgFolhas', 24, -200, 1800, 1100, 2400, 11);
  return s;
}
function mundoPorta() {
  let s = `<rect x="-1500" y="-1500" width="4200" height="4200" fill="#9FE0C6"/><rect x="-1500" y="-1500" width="300" height="4200" fill="#000" opacity=".05"/>`;
  s += `<rect x="300" y="700" width="480" height="1100" rx="20" fill="#9B6B43" stroke="${OUT}" stroke-width="${OW}"/><rect x="350" y="760" width="380" height="440" rx="14" fill="none" stroke="#7E5434" stroke-width="8"/><rect x="350" y="1260" width="380" height="440" rx="14" fill="none" stroke="#7E5434" stroke-width="8"/>${circ(700, 1250, 20, '#FFD23F')}`;
  s += `<rect x="-1500" y="1800" width="4200" height="1400" fill="#D9D2C5"/>`;
  s += pessoa({ id: 'ptF', x: 900, y: 1820, h: 520, cabelo: 'coque', corCabelo: '#2b2b2b', camisa: '#6CC070', pele: 'escura', calca: '#3E5F99', gordo: 1, bE: 100, bD: 70, flip: 0 });
  s += `<g id="ptVento" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".8" fill="none"><path d="M 100 900 q 80 -20 160 0"/><path d="M 60 1150 q 100 -24 200 0"/><path d="M 120 1450 q 70 -16 140 0"/></g>`;
  s += folhas('ptFolhas', 14, -100, 1200, 600, 1800, 21);
  return s;
}
function mundoOlho() {
  let s = `<rect x="-2000" y="-2000" width="5000" height="5000" fill="#7D8C9E"/>`;
  s += `<g id="olParede">`;
  for (let i = 0; i < 18; i++) s += `<path d="M ${-1500 + i * 240} -1500 Q ${-1300 + i * 240} 960 ${-1500 + i * 240} 3500" stroke="#B9C4D2" stroke-width="40" fill="none" opacity=".5"/>`;
  s += `</g><ellipse cx="540" cy="1900" rx="900" ry="140" fill="#9AA6B5"/>`;
  s += `<g id="olMaeW">${P('olMae', MAE, { x: 420, y: 1960, h: 420, bE: 10, bD: -10 })}</g>`;
  s += `<g id="olCaioW">${P('olCaio', CAIO, { x: 660, y: 1900, chapeu: 'festa' })}</g>`;
  s += `<g id="olDebris">${[[100, 900, '#E5737A'], [900, 700, '#FCE38A'], [200, 1400, '#5DADE2'], [950, 1300, '#E8505B'], [600, 500, '#6CC070']].map(([x, y, c], i) => `<g class="olD" data-i="${i}" transform="translate(${x} ${y})"><rect x="-40" y="-14" width="80" height="28" rx="6" fill="${c}" stroke="${OUT}" stroke-width="${OW}"/></g>`).join('')}</g>`;
  s += folhas('olFolhas', 22, -100, 1200, 400, 2200, 31);
  return s;
}
function mundoCalma() {
  let s = fundoPraca('cl') + bandeirinhas(-300, 1900, 1580);
  s += `<g transform="translate(800 2050)"><ellipse cx="0" cy="40" rx="260" ry="60" fill="#7FB8D9" stroke="${OUT}" stroke-width="${OW}"/><path d="M -260 40 L -260 90 Q 0 160 260 90 L 260 40" fill="#E9C99C" stroke="${OUT}" stroke-width="${OW}"/>${pilula(0, 30, 0, -120, 30, '#E9C99C')}</g>`;
  s += `<g id="clCarro" transform="translate(800 600) rotate(160)">${carro(0, 0, 1.1, '#5DADE2')}</g>`;
  s += `<g id="clSplash" visibility="hidden" fill="#BFE6F5" stroke="${OUT}" stroke-width="2.5"><path d="M 600 2040 q -20 -90 -60 -120 q 40 20 80 100 Z"/><path d="M 1000 2040 q 20 -90 60 -120 q -40 20 -80 100 Z"/><circle cx="700" cy="1900" r="16"/><circle cx="900" cy="1880" r="20"/></g>`;
  s += P('clMae', MAE, { x: 380, y: 2320, h: 380 }) + P('clCaio', CAIO, { x: 520, y: 2340, chapeu: 'festa', h: 280 });
  s += folhas('clFolhas', 20, -100, 1700, 800, 2300, 41);
  return s;
}
function mundoBiblioteca() {
  let s = `<rect x="-1500" y="-1500" width="4200" height="3300" fill="#E9D9BE"/>` + estante(-260, 300, 560, 1400, 5) + estante(780, 300, 560, 1400, 5);
  s += `<rect x="330" y="300" width="420" height="700" rx="200" fill="#FFF4C8" stroke="${OUT}" stroke-width="${OW}"/><path d="M 360 400 L 120 1900 L 700 1900 L 720 400 Z" fill="#FFF4C8" opacity=".35"/>`;
  s += `<rect x="-1500" y="1800" width="4200" height="1400" fill="#B88A5C"/>`;
  s += P('biL', LURDES, { x: 300, y: 1880, h: 400, bD: -70 }) + P('biMae', MAE, { x: 860, y: 1900, h: 400 });
  s += `<rect x="440" y="1460" width="260" height="440" fill="#7E5434" stroke="${OUT}" stroke-width="${OW}"/>`;
  s += `<g id="biLivro" transform="translate(570 1440)"><path d="M -200 0 L 0 20 L 200 0 L 200 -40 L 0 -20 L -200 -40 Z" fill="#8E3B3B" stroke="${OUT}" stroke-width="${OW}"/><path d="M -190 -40 Q -90 -70 0 -20 Q 90 -70 190 -40 L 190 -10 Q 90 -40 0 10 Q -90 -40 -190 -10 Z" fill="#F6ECD2" stroke="${OUT}" stroke-width="${OW}"/>` +
    `<g stroke="#b9a37a" stroke-width="4">${[-30, -18, -6].map(y => `<path d="M -160 ${y - 10} Q -90 ${y - 34} -20 ${y + 6}"/><path d="M 20 ${y + 6} Q 90 ${y - 34} 160 ${y - 10}"/>`).join('')}</g></g>`;
  s += `<g id="biPoeira" visibility="hidden" fill="#efe3c8" opacity=".85">${[[-90, -100, 30], [0, -150, 40], [100, -110, 34], [-40, -200, 26], [60, -220, 30]].map(([x, y, r]) => `<circle cx="${570 + x}" cy="${1440 + y}" r="${r}"/>`).join('')}</g>`;
  return s;
}
function mundoAncora() {
  return raiosCena('#7FC4E8', '#5DADE2') + `<g transform="translate(540 940)"><g id="anIcone" transform="scale(0.01)"><g fill="none" stroke="${OUT}" stroke-width="44" stroke-linecap="round"><circle cx="0" cy="-260" r="60"/><line x1="0" y1="-200" x2="0" y2="230"/><line x1="-150" y1="-120" x2="150" y2="-120"/><path d="M -240 80 Q -200 260 0 260 Q 200 260 240 80"/></g>` +
    `<g fill="none" stroke="#FFD23F" stroke-width="26" stroke-linecap="round"><circle cx="0" cy="-260" r="60"/><line x1="0" y1="-200" x2="0" y2="230"/><line x1="-150" y1="-120" x2="150" y2="-120"/><path d="M -240 80 Q -200 260 0 260 Q 200 260 240 80"/></g>` +
    `<path d="M -270 40 l 60 50 l -80 30 Z M 270 40 l -60 50 l 80 30 Z" fill="#FFD23F" stroke="${OUT}" stroke-width="8"/></g></g>` +
    `<g transform="translate(540 1330)"><g id="anTxt" transform="scale(0.01)"><text text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="150" fill="#fff" stroke="${OUT}" stroke-width="16" paint-order="stroke">ÂNCORA</text></g></g>`;
}
function mundoLivro() { // 3 páginas lado a lado (x = 540, 1640, 2740)
  let s = `<rect x="-1000" y="-1000" width="5000" height="4000" fill="#8E3B3B"/>`;
  for (const cx of [540, 1640, 2740]) s += papel(cx - 470, 330, 940, 1260);
  // 1: uma por geração
  s += `<g>${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => boneco(220 + c * 210, 640 + r * 330, .8, r === 1 && c === 2 ? '#C08A1E' : tinta)).join('')).join('')}<circle cx="640" cy="870" r="92" fill="none" stroke="#C08A1E" stroke-width="8" stroke-dasharray="16 10"/></g>`;
  // 2: nenhum poder funciona
  s += boneco(1640, 1180, 1.3) + `<g fill="none" stroke="#C0461E" stroke-width="10" stroke-linecap="round"><path d="M 1320 700 Q 1420 760 1500 900 Q 1540 980 1440 1060"/><path d="M 1960 700 L 1880 820 L 1940 840 L 1840 1000"/><path d="M 1340 1300 Q 1460 1220 1500 1120 Q 1520 1080 1470 1020"/></g><path d="M 1640 980 m -180 0 a 180 210 0 1 0 360 0 a 180 210 0 1 0 -360 0" fill="none" stroke="#C08A1E" stroke-width="6" stroke-dasharray="20 12"/>`;
  // 3: abraço acalma
  s += boneco(2680, 1180, 1.2) + boneco(2800, 1180, 1.2) + `<path d="M 2680 1060 Q 2740 1000 2800 1060" stroke="${tinta}" stroke-width="6" fill="none"/><g id="lvOnda" fill="none" stroke="#C0461E" stroke-width="7"><path d="M 2860 820 q 40 -60 80 0 q 40 60 80 0"/><path d="M 2860 920 q 40 -60 80 0 q 40 60 80 0"/></g><g id="lvCalma" opacity="0"><circle cx="2740" cy="1020" r="200" fill="#C08A1E" opacity=".18"/></g>`;
  return s;
}
function mundoVaranda() {
  let s = `<defs><linearGradient id="vrCeu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7A26B"/><stop offset=".6" stop-color="#FFD39A"/><stop offset="1" stop-color="#FFE9C2"/></linearGradient></defs><rect x="-2000" y="-2000" width="5000" height="3700" fill="url(#vrCeu)"/>`;
  s += `<circle cx="760" cy="1080" r="170" fill="#FFF1C4" opacity=".95"/>` + fileiraCasas(-900, 2200, 1500, 11).replace(/#BFE3F2/g, '#FFE59A');
  s += `<rect x="-2000" y="1500" width="5000" height="300" fill="#C98E5A" stroke="${OUT}" stroke-width="${OW}"/><rect x="-2000" y="1800" width="5000" height="1400" fill="#B57A48"/>`;
  s += `<g id="vrMaeW" style="filter:grayscale(1)">${P('vrMae', MAE, { x: 470, y: 1960, h: 440, bD: -120 })}</g>${P('vrTg', TG, { x: 650, y: 1980, h: 300, bE: 100 })}`;
  return s;
}
function mundoFestas() {
  let s = fundoPraca('fs') + bandeirinhas(-400, 1500, 1560) + bandeirinhas(1100, 3000, 1540);
  s += mesa(540, 2000, 420, '#C98E5A', '#5DADE2') + bolo(540, 2000, 1, '12', 'fsB1') + pessoa({ id: 'fsK1', x: 540, y: 1960, h: 280, cabelo: 'rabo', corCabelo: '#2b2b2b', camisa: '#FCE38A', pele: 'escura', chapeu: 'festa' });
  s += mesa(1960, 2000, 420, '#C98E5A', '#F7A8B8') + bolo(1960, 2000, 1, '12', 'fsB2') + pessoa({ id: 'fsK2', x: 1960, y: 1960, h: 280, cabelo: 'espetado', corCabelo: '#B5651D', camisa: '#9FE0C6', chapeu: 'festa' });
  s += `<g id="fsMae1W">${P('fsMae1', MAE, { x: 180, y: 2260, chapeu: 'capacete', bD: -70 })}<g transform="translate(250 2060) rotate(12)"><rect x="-34" y="-46" width="68" height="92" rx="8" fill="#C98E5A" stroke="${OUT}" stroke-width="${OW}"/><rect x="-24" y="-30" width="48" height="66" fill="#fff"/></g></g>`;
  s += `<g>${P('fsMae2', MAE, { x: 1640, y: 2260, chapeu: 'capacete', bD: -70 })}<g transform="translate(1710 2060) rotate(12)"><rect x="-34" y="-46" width="68" height="92" rx="8" fill="#C98E5A" stroke="${OUT}" stroke-width="${OW}"/><rect x="-24" y="-30" width="48" height="66" fill="#fff"/></g></g>`;
  return s;
}
function mundoMesaLivro() {
  let s = `<rect x="-1500" y="-1500" width="4200" height="4200" fill="#3B2A22"/><circle cx="540" cy="900" r="900" fill="#FFD890" opacity=".14"/>`;
  s += `<g transform="translate(540 1000)"><path d="M -480 -340 L 0 -300 L 480 -340 L 480 360 L 0 400 L -480 360 Z" fill="#8E3B3B" stroke="${OUT}" stroke-width="${OW}"/><path d="M -450 -320 L 0 -280 L 0 380 L -450 340 Z" fill="#F6ECD2" stroke="${OUT}" stroke-width="${OW}"/>` +
    `${[...Array(9)].map((_, i) => `<line x1="-400" y1="${-220 + i * 60}" x2="-60" y2="${-196 + i * 60}" stroke="#b9a37a" stroke-width="5"/>`).join('')}` +
    `<path d="M 0 -280 L 150 -296 L 120 -230 L 170 -170 L 110 -100 L 160 -20 L 100 60 L 150 140 L 90 220 L 140 300 L 120 384 L 0 380 Z" fill="#F6ECD2" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/></g>`;
  s += `<g id="mlPedaco" transform="translate(860 700) rotate(20)"><path d="M -40 -50 L 30 -40 L 10 0 L 40 40 L -30 50 Z" fill="#F6ECD2" stroke="${OUT}" stroke-width="3"/></g>`;
  return s;
}
function mundoCasaNoite() {
  let s = `<rect x="-2000" y="-2000" width="5000" height="4000" fill="#1d2550"/>${[[100, 300], [900, 200], [300, 600], [1000, 700], [650, 380]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#FFF4C8"/>`).join('')}<circle cx="880" cy="420" r="60" fill="#FFF4C8"/>`;
  s += `<rect x="140" y="900" width="800" height="900" fill="#C7B3F0" stroke="${OUT}" stroke-width="${OW}"/><path d="M 100 900 L 540 520 L 980 900 Z" fill="#8E78C9" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/><rect x="460" y="1480" width="160" height="320" rx="20" fill="#7E5434" stroke="${OUT}" stroke-width="${OW}"/>`;
  [[220, 1000], [660, 1000], [220, 1300], [660, 1300], [440, 640]].forEach(([x, y], i) => s += `<rect x="${x}" y="${y}" width="${i === 4 ? 200 : 200}" height="${i === 4 ? 150 : 200}" rx="10" fill="#2a3466" stroke="${OUT}" stroke-width="${OW}"/><rect class="cnJan" id="cnJ${i}" x="${x}" y="${y}" width="200" height="${i === 4 ? 150 : 200}" rx="10" fill="#FFD66B" stroke="${OUT}" stroke-width="${OW}"/>`);
  s += `<rect x="-2000" y="1800" width="5000" height="1400" fill="#2b3a2b"/>`;
  return s;
}
function mundoBerco() {
  let s = `<rect x="-1500" y="-1500" width="4200" height="4200" fill="#F2E2F2"/><rect id="bcEsc" x="-1500" y="-1500" width="4200" height="4200" fill="#1d2550" opacity="0"/>`;
  s += `<line x1="540" y1="-500" x2="540" y2="560" stroke="${OUT}" stroke-width="5"/><path d="M 440 560 L 640 560 L 600 480 L 480 480 Z" fill="#FFB347" stroke="${OUT}" stroke-width="${OW}"/><g id="bcLuz"><circle cx="540" cy="600" r="44" fill="#FFF4B0" stroke="${OUT}" stroke-width="${OW}"/><circle cx="540" cy="700" r="320" fill="#FFF4B0" opacity=".35"/></g>`;
  s += `<rect x="200" y="1300" width="680" height="380" rx="20" fill="#fff" stroke="${OUT}" stroke-width="${OW}"/>`;
  s += bebe('bcBebe', 540, 1300, 2.2);
  s += `<g id="bcRiso" visibility="hidden"><path d="M 440 1270 Q 470 1300 500 1270" stroke="${OUT}" stroke-width="6" fill="#B83A3A"/></g>`;
  for (let x = 220; x <= 860; x += 64) s += pilula(x, 1180, x, 1680, 14, '#fff');
  s += `<rect x="190" y="1160" width="700" height="34" rx="14" fill="#fff" stroke="${OUT}" stroke-width="${OW}"/>`;
  return s;
}
function mundoRelogioNoite() {
  let s = `<rect x="-1500" y="-1500" width="4200" height="4200" fill="#24305e"/><circle cx="540" cy="900" r="700" fill="#FFD890" opacity=".08"/>` + relogio('rnR', 540, 880, 320, -1, -6, 240, '#C98E5A');
  return s + `<g transform="translate(540 1400)"><rect x="-170" y="-58" width="340" height="116" rx="20" fill="#11152a"/><text y="34" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="96" fill="#FFD23F">23:59</text></g>`;
}
