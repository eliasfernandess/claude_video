// Peças 2D no estilo "recorte flat" (Estilo 4). Tudo é SVG em texto; os ids permitem animar com GSAP.
const OUT = '#2a2d3e';           // contorno
const OW = 3.2;                  // espessura do contorno
const PELES = { clara: '#FFD9B8', media: '#E8B08A', morena: '#B97A57', escura: '#8A5638' };

// linha "pílula" com contorno (truque: linha escura mais grossa por baixo)
function pilula(x1, y1, x2, y2, w, cor) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${OUT}" stroke-width="${w + OW * 2}" stroke-linecap="round"/>` +
         `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${cor}" stroke-width="${w}" stroke-linecap="round"/>`;
}
const circ = (x, y, r, cor, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${cor}" stroke="${OUT}" stroke-width="${OW}" ${extra}/>`;
const elip = (x, y, rx, ry, cor, extra = '') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${cor}" stroke="${OUT}" stroke-width="${OW}" ${extra}/>`;
function escurece(hex, f = .82) {
  const n = parseInt(hex.slice(1), 16), r = (n >> 16) * f, g = (n >> 8 & 255) * f, b = (n & 255) * f;
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
}

// ---------- personagem ----------
// o: {id, x, y, h, pele, camisa, calca, sapato, cabelo:'rabo'|'espetado'|'topete'|'curto'|'coque'|'careca', corCabelo, olho, fita, saia}
function pessoa(o) {
  const u = (o.h || 330) / 330, id = o.id;
  const pele = PELES[o.pele || 'clara'] || o.pele, cab = o.corCabelo || '#6B4226', cam = o.camisa || '#4FB3BF',
        cal = o.calca || '#E8D3A8', sap = o.sapato || '#5A4636', olho = o.olho || '#3D6FD1';
  const r = 66 * u, hy = -264 * u;
  let s = `<g id="${id}" transform="translate(${o.x || 0} ${o.y || 0}) scale(${o.flip ? -1 : 1} 1)">`;
  s += `<g id="${id}-corpo">`;
  // cabelo de trás (rabo de cavalo / cabelo comprido)
  if (o.cabelo === 'rabo') {
    s += `<g id="${id}-rabo"><path d="M ${30 * u} ${hy - 52 * u} C ${100 * u} ${hy - 66 * u}, ${108 * u} ${hy + 10 * u}, ${84 * u} ${hy + 64 * u} C ${72 * u} ${hy + 40 * u}, ${62 * u} ${hy + 4 * u}, ${40 * u} ${hy - 20 * u} Z" fill="${cab}" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/>` +
         `<path d="M ${62 * u} ${hy - 30 * u} C ${82 * u} ${hy - 4 * u}, ${88 * u} ${hy + 24 * u}, ${82 * u} ${hy + 50 * u}" fill="none" stroke="${escurece(cab, .8)}" stroke-width="${4 * u}" stroke-linecap="round"/>` +
         `${circ(44 * u, hy - 40 * u, 9 * u, '#E8505B')}</g>`;
  }
  if (o.cabelo === 'longo') s += `<path d="M ${-r - 6 * u} ${hy - 10 * u} C ${-r - 14 * u} ${hy + 70 * u}, ${-r} ${hy + 120 * u}, ${-r + 18 * u} ${hy + 120 * u} L ${r - 18 * u} ${hy + 120 * u} C ${r} ${hy + 120 * u}, ${r + 14 * u} ${hy + 70 * u}, ${r + 6 * u} ${hy - 10 * u} Z" fill="${cab}" stroke="${OUT}" stroke-width="${OW}"/>`;
  // pernas
  const pl = o.saia ? pele : cal;
  s += `<g id="${id}-pernas">${pilula(-17 * u, -96 * u, -19 * u, -18 * u, 27 * u, pl)}${pilula(17 * u, -96 * u, 19 * u, -18 * u, 27 * u, pl)}` +
       `${elip(-24 * u, -10 * u, 21 * u, 12 * u, sap)}${elip(24 * u, -10 * u, 21 * u, 12 * u, sap)}</g>`;
  // braços (grupos girando no ombro)
  const braco = (lado) => {
    const sx = lado * 41 * u, sy = -184 * u, rot = lado * -14;
    let b = `<g transform="translate(${sx} ${sy})"><g id="${id}-braco${lado < 0 ? 'E' : 'D'}" transform="rotate(${rot})">`;
    b += pilula(0, 0, 0, 74 * u, 22 * u, pele) + pilula(0, 0, 0, 30 * u, 23 * u, cam);
    b += circ(0, 80 * u, 12.5 * u, pele);
    if (o.fita && lado < 0) b += `<rect x="${-13 * u}" y="${56 * u}" width="${26 * u}" height="${6 * u}" rx="${2 * u}" fill="#3FA7E0" stroke="${OUT}" stroke-width="${1.6 * u}"/><path d="M ${8 * u} ${61 * u} q ${8 * u} ${10 * u} ${3 * u} ${20 * u}" stroke="#3FA7E0" stroke-width="${4 * u}" fill="none" stroke-linecap="round"/>`;
    return b + '</g></g>';
  };
  s += braco(-1);
  // tronco
  if (o.saia) s += `<path d="M ${-40 * u} ${-120 * u} L ${-54 * u} ${-70 * u} Q 0 ${-58 * u} ${54 * u} ${-70 * u} L ${40 * u} ${-120 * u} Z" fill="${cal}" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  s += `<rect x="${-45 * u}" y="${-202 * u}" width="${90 * u}" height="${108 * u}" rx="${30 * u}" fill="${cam}" stroke="${OUT}" stroke-width="${OW}"/>`;
  s += `<path d="M ${10 * u} ${-198 * u} h ${22 * u} a ${26 * u} ${26 * u} 0 0 1 ${10 * u} ${20 * u} v ${60 * u} a ${26 * u} ${26 * u} 0 0 1 ${-12 * u} ${20 * u} h ${-20 * u} Z" fill="#000" opacity=".08"/>`;
  s += braco(1);
  // cabeça
  s += `<g id="${id}-cabeca">`;
  s += circ(-r + 2 * u, hy + 8 * u, 13 * u, pele) + circ(r - 2 * u, hy + 8 * u, 13 * u, pele);
  s += circ(0, hy, r, pele);
  s += `<path d="M ${r * .35} ${hy - r * .82} A ${r} ${r} 0 0 1 ${r * .98} ${hy + r * .2} A ${r * 1.05} ${r * 1.05} 0 0 0 ${r * .35} ${hy - r * .82}" fill="#000" opacity=".06"/>`;
  // bochechas
  s += `<ellipse cx="${-40 * u}" cy="${hy + 26 * u}" rx="${12 * u}" ry="${7 * u}" fill="#FF8A8A" opacity=".45"/><ellipse cx="${40 * u}" cy="${hy + 26 * u}" rx="${12 * u}" ry="${7 * u}" fill="#FF8A8A" opacity=".45"/>`;
  // olhos
  const olhoSvg = (x) => `<g class="olho" transform="translate(${x} ${hy + 4 * u})"><g class="olhoEsc">` +
    elip(0, 0, 19 * u, 22 * u, '#fff') +
    `<g class="pupila"><circle r="${13.5 * u}" fill="${olho}"/><circle r="${13.5 * u}" fill="none" stroke="${escurece(olho, .6)}" stroke-width="${2 * u}"/><circle r="${7.5 * u}" fill="#16182a"/>` +
    `<circle cx="${5 * u}" cy="${-6 * u}" r="${4.6 * u}" fill="#fff"/><circle cx="${-4.5 * u}" cy="${5 * u}" r="${2.2 * u}" fill="#fff"/></g></g></g>`;
  s += `<g id="${id}-olhos">${olhoSvg(-25 * u)}${olhoSvg(25 * u)}</g>`;
  // sobrancelhas
  const sc = o.cabelo === 'careca' ? '#7a6a5a' : escurece(cab, .7);
  s += `<g id="${id}-sobr"><path d="M ${-36 * u} ${hy - 26 * u} Q ${-25 * u} ${hy - 33 * u} ${-14 * u} ${hy - 27 * u}" stroke="${sc}" stroke-width="${5 * u}" fill="none" stroke-linecap="round"/>` +
       `<path d="M ${14 * u} ${hy - 27 * u} Q ${25 * u} ${hy - 33 * u} ${36 * u} ${hy - 26 * u}" stroke="${sc}" stroke-width="${5 * u}" fill="none" stroke-linecap="round"/></g>`;
  // nariz
  s += `<path d="M ${-4 * u} ${hy + 22 * u} q ${4 * u} ${4 * u} ${8 * u} 0" stroke="${escurece(pele, .7)}" stroke-width="${3 * u}" fill="none" stroke-linecap="round"/>`;
  // bocas (uma visível por vez)
  const my = hy + 38 * u;
  s += `<g id="${id}-boca">` +
    `<path class="b-sorriso" d="M ${-15 * u} ${my} Q 0 ${my + 13 * u} ${15 * u} ${my}" stroke="${OUT}" stroke-width="${4 * u}" fill="none" stroke-linecap="round"/>` +
    `<g class="b-aberta" visibility="hidden"><path d="M ${-17 * u} ${my - 2 * u} Q 0 ${my + 30 * u} ${17 * u} ${my - 2 * u} Z" fill="#B83A3A" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/><ellipse cx="0" cy="${my + 12 * u}" rx="${8 * u}" ry="${5 * u}" fill="#F28A8A"/><path d="M ${-13 * u} ${my} L ${13 * u} ${my}" stroke="#fff" stroke-width="${4 * u}"/></g>` +
    `<g class="b-o" visibility="hidden">${elip(0, my + 6 * u, 9 * u, 11 * u, '#B83A3A')}</g>` +
    `<path class="b-meio" visibility="hidden" d="M ${-12 * u} ${my + 4 * u} Q ${4 * u} ${my + 10 * u} ${16 * u} ${my - 2 * u}" stroke="${OUT}" stroke-width="${4 * u}" fill="none" stroke-linecap="round"/>` +
    `</g>`;
  // cabelo da frente
  const top = hy - r;
  if (o.cabelo === 'rabo' || o.cabelo === 'curto' || o.cabelo === 'coque' || o.cabelo === 'longo') {
    s += `<path d="M ${-r - 3 * u} ${hy + 6 * u} C ${-r - 8 * u} ${top - 26 * u}, ${r + 8 * u} ${top - 26 * u}, ${r + 3 * u} ${hy + 6 * u} C ${r - 8 * u} ${hy - 30 * u}, ${r - 20 * u} ${hy - 44 * u}, ${10 * u} ${hy - 46 * u} C ${-20 * u} ${hy - 44 * u}, ${-50 * u} ${hy - 30 * u}, ${-r - 3 * u} ${hy + 6 * u} Z" fill="${cab}" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/>`;
    s += `<path d="M ${-30 * u} ${top + 6 * u} C ${-10 * u} ${top - 2 * u}, ${20 * u} ${top}, ${40 * u} ${top + 14 * u}" stroke="#fff" opacity=".35" stroke-width="${5 * u}" fill="none" stroke-linecap="round"/>`;
    if (o.cabelo === 'coque') s += circ(0, top - 14 * u, 24 * u, cab);
  }
  if (o.cabelo === 'espetado' || o.cabelo === 'topete') {
    s += `<path d="M ${-r - 2 * u} ${hy + 4 * u} C ${-r - 6 * u} ${top - 26 * u}, ${r + 6 * u} ${top - 26 * u}, ${r + 2 * u} ${hy + 4 * u} C ${r - 10 * u} ${hy - 26 * u}, ${30 * u} ${hy - 40 * u}, 0 ${hy - 40 * u} C ${-30 * u} ${hy - 40 * u}, ${-r + 10 * u} ${hy - 26 * u}, ${-r - 2 * u} ${hy + 4 * u} Z" fill="${cab}" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/>`;
    const zz = `M ${-36 * u} ${top + 12 * u} L ${-30 * u} ${top - 26 * u} L ${-12 * u} ${top + 2 * u} L ${2 * u} ${top - 34 * u} L ${16 * u} ${top + 2 * u} L ${32 * u} ${top - 22 * u} L ${38 * u} ${top + 14 * u}`;
    s += `<path d="${zz} Z" fill="${cab}"/><path d="${zz}" fill="none" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round" stroke-linecap="round"/>`;
    if (o.cabelo === 'topete') s += `<path d="M ${-20 * u} ${hy - 34 * u} C ${-30 * u} ${hy - 70 * u}, ${30 * u} ${hy - 80 * u}, ${44 * u} ${hy - 52 * u} C ${20 * u} ${hy - 60 * u}, ${0} ${hy - 50 * u}, ${-20 * u} ${hy - 34 * u} Z" fill="${cab}" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  }
  s += `</g></g></g>`;
  return s;
}

// ---------- cenário ----------
function nuvem(x, y, k = 1) {
  return `<g transform="translate(${x} ${y}) scale(${k})" opacity=".95"><path d="M -90 20 a 40 40 0 0 1 30 -50 a 55 55 0 0 1 100 -10 a 40 40 0 0 1 55 45 Z" fill="#fff"/></g>`;
}
function casa(x, y, w, h, cor, telhado, janelas = 2, andares = 2) {
  let s = `<g transform="translate(${x} ${y})">`;
  s += `<rect x="0" y="${-h}" width="${w}" height="${h}" fill="${cor}" stroke="${OUT}" stroke-width="${OW}"/>`;
  s += `<rect x="0" y="${-h}" width="${w * .18}" height="${h}" fill="#000" opacity=".06"/>`;
  s += `<path d="M -10 ${-h} L ${w / 2} ${-h - w * .42} L ${w + 10} ${-h} Z" fill="${telhado}" stroke="${OUT}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  const jw = w * .22, jh = h / andares * .42;
  for (let a = 0; a < andares; a++) for (let j = 0; j < janelas; j++) {
    const jx = w * (j + .5) / janelas - jw / 2, jy = -h + h / andares * a + h / andares * .22;
    if (a === andares - 1 && j === 0 && janelas > 1) { s += `<rect x="${jx}" y="${-h * .38}" width="${jw * 1.1}" height="${h * .38}" rx="${jw * .5}" ry="${jw * .5}" fill="${escurece(cor, .55)}" stroke="${OUT}" stroke-width="${OW}"/>`; continue; }
    s += `<rect x="${jx}" y="${jy}" width="${jw}" height="${jh}" rx="4" fill="#BFE3F2" stroke="${OUT}" stroke-width="${OW}"/><line x1="${jx + jw / 2}" y1="${jy}" x2="${jx + jw / 2}" y2="${jy + jh}" stroke="${OUT}" stroke-width="2"/><rect x="${jx - 4}" y="${jy + jh}" width="${jw + 8}" height="6" fill="#fff" stroke="${OUT}" stroke-width="2"/>`;
  }
  return s + '</g>';
}
function arvore(x, y, k = 1) {
  return `<g transform="translate(${x} ${y}) scale(${k})">${pilula(0, 0, 0, -90, 16, '#9B6B43')}${circ(0, -130, 58, '#6CC070')}${circ(-38, -100, 38, '#5DB165')}${circ(40, -104, 40, '#5DB165')}<circle cx="-14" cy="-150" r="16" fill="#fff" opacity=".25"/></g>`;
}
function raios(cx, cy, n, c1, c2, R = 3000) {
  let s = `<g class="raios" transform="translate(${cx} ${cy})"><circle r="${R}" fill="${c1}"/>`;
  for (let i = 0; i < n; i++) {
    const a0 = i / n * Math.PI * 2, a1 = (i + .5) / n * Math.PI * 2;
    s += `<path d="M 0 0 L ${Math.cos(a0) * R} ${Math.sin(a0) * R} L ${Math.cos(a1) * R} ${Math.sin(a1) * R} Z" fill="${c2}"/>`;
  }
  return s + `</g>`;
}
function fogo(id, x, y, k = 1) {
  return `<g id="${id}" transform="translate(${x} ${y}) scale(${k})"><path class="ch1" d="M 0 10 C -26 8 -30 -20 -12 -40 C -10 -24 -2 -24 0 -56 C 14 -34 30 -20 22 -2 C 18 8 10 11 0 10 Z" fill="#FF7A2F" stroke="${OUT}" stroke-width="3"/><path class="ch2" d="M 0 6 C -12 4 -14 -10 -4 -22 C -2 -12 4 -14 4 -28 C 12 -16 16 -6 12 0 C 10 4 6 6 0 6 Z" fill="#FFD23F"/></g>`;
}
function brilho(x, y, k = 1, cor = '#FFE680') {
  return `<path transform="translate(${x} ${y}) scale(${k})" d="M 0 -20 Q 3 -3 20 0 Q 3 3 0 20 Q -3 3 -20 0 Q -3 -3 0 -20 Z" fill="${cor}" stroke="${OUT}" stroke-width="2"/>`;
}
