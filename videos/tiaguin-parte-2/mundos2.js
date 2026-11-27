// Cenários da parte 2 (noite do aniversário do Tiaguin). Usa os ajudantes de mundos.js.
const TGF = { ...TG, chapeu: 'festa' };
const PADEIRO = { cabelo: 'curto', corCabelo: '#5B3A24', camisa: '#fff', calca: '#6F7FA6', bigode: '#5B3A24', chapeu: 'chef', avental: 1, gordo: 1, pele: 'media' };
const PROF = { cabelo: 'coque', corCabelo: '#6B4226', camisa: '#B98CDB', calca: '#555B6E', saia: 1 };
const ZE = { cabelo: 'espetado', corCabelo: '#2b2b2b', camisa: '#E8505B', pele: 'morena', calca: '#555B6E' };
const VIZ = { cabelo: 'curto', corCabelo: '#2b2b2b', camisa: '#5DADE2', calca: '#E8505B', magro: 1, capa: '#E8505B' };
const FORTE = { cabelo: 'coque', corCabelo: '#2b2b2b', camisa: '#6CC070', pele: 'escura', calca: '#3E5F99', gordo: 1 };

function ceuNoite(id, y1 = 1520) {
  let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#131a45"/><stop offset=".7" stop-color="#3b3274"/><stop offset="1" stop-color="#6b4f8f"/></linearGradient></defs><rect x="-3000" y="-3000" width="9000" height="${y1 + 3000}" fill="url(#${id})"/>`;
  for (let i = 0; i < 90; i++) { const x = -1500 + ((i * 397) % 5200), y = -2600 + ((i * 251) % (y1 + 2300)); s += `<circle class="estrela" cx="${x}" cy="${y}" r="${2 + (i % 3) * 1.5}" fill="#FFF4C8" opacity="${.5 + (i % 4) * .12}"/>`; }
  return s;
}
const casasNoite = (x0, x1, base, seed) => `<g style="filter:brightness(.72) saturate(.85)">${fileiraCasas(x0, x1, base, seed).replace(/#BFE3F2/g, '#FFD66B')}</g>`;
function lampadas(x0, x1, y, id) {
  let s = `<g id="${id}"><path d="M ${x0} ${y} Q ${(x0 + x1) / 2} ${y + 120} ${x1} ${y}" stroke="#2a2d3e" stroke-width="3" fill="none"/>`;
  const cs = ['#FFD66B', '#FF9AA2', '#9FE0C6', '#FFD66B', '#B9A7F5'];
  for (let i = 1; i < 18; i++) { const f = i / 18, x = x0 + (x1 - x0) * f, yy = y + 120 * 4 * f * (1 - f) * .5 + 10; s += `<g class="lamp"><circle cx="${x}" cy="${yy}" r="26" fill="${cs[i % 5]}" opacity=".35"/><circle cx="${x}" cy="${yy}" r="11" fill="${cs[i % 5]}" stroke="${OUT}" stroke-width="2.5"/></g>`; }
  return s + '</g>';
}
function placaRotulo(x, y, txt, id, w = 170) { return `<g transform="translate(${x} ${y})"><g id="${id}" transform="scale(0.01)">${placa(0, 0, txt, '', w, 42)}</g></g>`; }

// ---------- a festa na rua (mundo principal) ----------
function mundoFesta() {
  let s = `<defs><filter id="borra2" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="22"/></filter></defs>`;
  s += ceuNoite('fsCeu') + `<circle cx="1320" cy="300" r="90" fill="#FFF4C8"/><circle cx="1290" cy="280" r="18" fill="#efe2b0"/>`;
  s += casasNoite(-900, 2500, 1500, 2);
  s += `<g style="filter:brightness(.8)">${torre('fsRel', 800, 1500, 260)}</g>`;
  [50, 51, 52, 53, 54, 55, 56, 57, 58, 59].forEach(k => s += `<g id="cont${k}" visibility="hidden">${placa(800, 566, '23:59:' + k, '', 230, 44)}</g>`);
  s += chao(1500, 3400, 800, '#B8A688', '#9f8f73');
  s += lampadas(-400, 1100, 1560, 'fsLamp1') + lampadas(500, 2000, 1580, 'fsLamp2') + `<g id="fsBand">${bandeirinhas(-300, 1900, 1600)}</g>`;
  s += mesa(1100, 2150, 320, '#C98E5A', '#5DADE2') + bolo(1100, 2150, .9, '12', 'fsBolo');
  // a moça voadora (desliga e cai)
  s += `<g id="fsVoaW" transform="translate(300 1450)"><g transform="rotate(70)"><path d="M -30 -190 Q -110 -120 -60 -40 L 30 -180 Z" fill="#B98CDB" stroke="${OUT}" stroke-width="${OW}"/>${pessoa({ id: 'fsVoa', x: 0, y: 0, h: 250, cabelo: 'rabo', corCabelo: '#B5651D', camisa: '#F7A8B8' })}</g></g>`;
  // professora de costas, com olhos na nuca
  s += pessoa({ ...PROF, id: 'fsProf', x: 200, y: 2120, h: 360, costas: 1, olhosNuca: 1 });
  // seu Zé com fogo nas mãos
  s += `<g>${pessoa({ ...ZE, id: 'fsZe', x: 620, y: 2080, h: 340, bE: 40, bD: -40 })}<g id="zeFogo">${fogo('zeF1', 565, 1960, 1)}${fogo('zeF2', 675, 1960, 1)}</g><g id="zeFumaca" visibility="hidden" fill="#9aa" opacity=".8"><circle cx="565" cy="1930" r="20"/><circle cx="575" cy="1890" r="26"/><circle cx="675" cy="1930" r="20"/><circle cx="665" cy="1885" r="26"/></g></g>`;
  // vizinho flutuando 10 cm
  s += `<ellipse id="vzSombra2" cx="980" cy="2030" rx="70" ry="14" fill="#000" opacity=".18"/><g id="vzW">${pessoa({ ...VIZ, id: 'fsViz', x: 980, y: 1985, h: 420, bE: 150, bD: -150 })}</g>`;
  s += `<g transform="translate(1075 2030)"><g id="fsRegua" transform="scale(0.01)"><rect x="-16" y="-45" width="32" height="45" fill="#FFD23F" stroke="${OUT}" stroke-width="3"/>${placa(105, -24, '10 cm', '', 150, 40)}</g></g>`;
  s += `<g id="fsPoeira" visibility="hidden" fill="#d9ccb0" opacity=".9"><circle cx="930" cy="2030" r="18"/><circle cx="1030" cy="2032" r="16"/><circle cx="900" cy="2020" r="12"/><circle cx="1060" cy="2018" r="12"/></g>`;
  // padeiro com pão brilhando
  s += `<g>${pessoa({ ...PADEIRO, id: 'fsPad', x: 1260, y: 2120, h: 380, bE: -60, bD: 60 })}<g id="paoQuente"><circle cx="1260" cy="1960" r="80" fill="#FF9A3C" opacity=".45" filter="url(#borra2)"/></g><ellipse cx="1260" cy="1965" rx="90" ry="38" fill="#E3A857" stroke="${OUT}" stroke-width="${OW}"/><g id="paoGelo" visibility="hidden"><ellipse cx="1260" cy="1965" rx="92" ry="40" fill="#BFE6F5" opacity=".75" stroke="${OUT}" stroke-width="${OW}"/><path d="M 1200 1998 l 8 26 l 8 -26 M 1250 2002 l 7 30 l 7 -30 M 1300 1998 l 6 22 l 6 -22" fill="#DFF4FF" stroke="${OUT}" stroke-width="2"/></g><g id="paoVapor" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".85"><path d="M 1230 1920 q -12 -24 0 -48"/><path d="M 1290 1920 q 12 -24 0 -48"/></g></g>`;
  // mulher forte
  s += pessoa({ ...FORTE, id: 'fsForte', x: 1470, y: 2170, h: 370, bE: 165, bD: -165 });
  // a mãe (com e sem capacete)
  s += `<g id="maeW"><g id="maeCap">${P('fsMae', MAE, { x: 470, y: 2260, chapeu: 'capacete', bD: -150 })}<g transform="translate(400 2090) rotate(-10)"><rect x="-34" y="-46" width="68" height="92" rx="8" fill="#C98E5A" stroke="${OUT}" stroke-width="${OW}"/><rect x="-24" y="-30" width="48" height="66" fill="#fff"/></g></g>` +
       `<g id="maeSem" visibility="hidden">${P('fsMae2', MAE, { x: 470, y: 2260 })}</g></g>`;
  // o Tiaguin (de frente e de costas), com fogo na mão, auras e brilho no peito
  s += `<ellipse id="tgSombra" cx="800" cy="2255" rx="70" ry="14" fill="#000" opacity=".18"/>`;
  s += `<g id="tgW"><g id="tgFrente">${P('fsTg', TGF, { x: 800, y: 2250 })}</g><g id="tgCostas" visibility="hidden">${pessoa({ ...TGF, id: 'fsTgC', x: 800, y: 2250, costas: 1 })}<g id="tgOlhoNuca" transform="translate(800 2022) scale(1 0.05)">${elip(0, 0, 16, 18, '#fff')}<circle r="10" fill="#3D6FD1"/><circle r="5" fill="#16182a"/><circle cx="3" cy="-4" r="3" fill="#fff"/></g></g>` +
       `<g id="tgFogo" visibility="hidden">${fogo('tgF', 868, 2148, 1.1)}</g><circle id="tgPeito" cx="800" cy="2110" r="60" fill="#7FD3FF" opacity="0" filter="url(#borra2)"/></g>`;
  s += `<ellipse id="fsSpot" cx="800" cy="2100" rx="230" ry="330" fill="#FFF4C8" opacity="0" filter="url(#borra2)"/>`;
  s += `<rect id="fsEscuro" x="-3000" y="-3000" width="9000" height="7000" fill="#070b25" opacity="0"/>`;
  return s;
}
// ---------- contagem e nome ----------
function mundoContagem() {
  let s = raiosCena('#E8505B', '#F2706A');
  [['3', '#FFD23F'], ['2', '#9FE0C6'], ['1', '#FFFFFF']].forEach(([n, c], i) => s += `<g transform="translate(540 1050)"><g id="num${n}" visibility="hidden" transform="scale(0.01)"><text y="200" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="680" fill="${c}" stroke="${OUT}" stroke-width="18" paint-order="stroke">${n}</text></g></g>`);
  return s;
}
function mundoNome() {
  return `<rect x="-2000" y="-2000" width="5000" height="5000" fill="#8E9BB8"/><circle cx="540" cy="900" r="900" fill="#fff" opacity=".12"/>` +
    `<g transform="translate(540 960) rotate(-3)"><rect x="-420" y="-170" width="840" height="340" rx="22" fill="#FBF7EE" stroke="${OUT}" stroke-width="8"/><text y="60" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="190" fill="${OUT}" font-style="italic">Tiaguin</text><path d="M -300 110 Q 0 140 300 105" stroke="#E8505B" stroke-width="10" fill="none" stroke-linecap="round"/></g>` +
    `<g transform="translate(860 700)"><g id="nmBrilho" transform="scale(0.01)">${brilho(0, 0, 2.2, '#FFD23F')}</g></g>`;
}
// ---------- o céu (voo descontrolado, abraço no ar, a mãe voando) ----------
function mundoCeuNoite() {
  let s = `<defs><filter id="borra3" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="30"/></filter></defs>` + ceuNoite('cnCeu', 2400);
  s += `<circle cx="300" cy="-300" r="120" fill="#FFF4C8"/>`;
  s += casasNoite(-1200, 3800, 1900, 5);
  // torre com escada
  s += `<g style="filter:brightness(.85)">${torre('cnRel', 1600, 1900, 640)}</g>`;
  s += `<g id="cnSino" transform="translate(1600 470)"><path d="M -40 0 Q -40 -60 0 -60 Q 40 -60 40 0 L 50 20 L -50 20 Z" fill="#E3B23C" stroke="${OUT}" stroke-width="${OW}"/>${circ(0, 30, 10, '#9B6B43')}</g>`;
  for (let y = 660; y < 1900; y += 46) s += `<line x1="1725" y1="${y}" x2="1775" y2="${y}" stroke="#7E5434" stroke-width="8"/>`;
  s += `<line x1="1725" y1="640" x2="1725" y2="1900" stroke="#7E5434" stroke-width="10"/><line x1="1775" y1="640" x2="1775" y2="1900" stroke="#7E5434" stroke-width="10"/>`;
  // bandeirinhas entre dois postes
  s += `${pilula(700, 1900, 700, 1350, 18, '#555B6E')}${pilula(1250, 1900, 1250, 1350, 18, '#555B6E')}<g id="cnBand">${bandeirinhas(700, 1250, 1360)}</g>`;
  // padaria com telhado
  s += `<rect x="2400" y="1350" width="560" height="550" fill="#FFC9A1" stroke="${OUT}" stroke-width="${OW}"/><rect x="2560" y="1700" width="160" height="200" rx="20" fill="#7E5434" stroke="${OUT}" stroke-width="${OW}"/><g transform="translate(2680 1500)"><rect x="-190" y="-50" width="380" height="90" rx="18" fill="#E5737A" stroke="${OUT}" stroke-width="${OW}"/><text y="16" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="56" fill="#fff">PADARIA</text></g>`;
  for (let i = 0; i < 10; i++) s += `<g class="cnTelha" transform="translate(${2410 + i * 56} 1330)"><g class="cnTi"><path d="M -30 -18 L 30 -18 L 26 18 L -26 18 Z" fill="#E5737A" stroke="${OUT}" stroke-width="3"/></g></g>`;
  // Tiaguin voando com as auras
  const AU = ['#FF7A2F', '#5DADE2', '#B98CDB', '#6CC070', '#FFD23F', '#F7A8B8'];
  s += `<g id="cnTgW" transform="translate(540 1300)"><g id="cnAuras">${AU.map((c, i) => `<circle cx="${Math.cos(i / 6 * 6.283) * 210}" cy="${Math.sin(i / 6 * 6.283) * 210 - 120}" r="70" fill="${c}" opacity=".7" filter="url(#borra3)"/>`).join('')}</g>` +
       `<g transform="rotate(-25)">${pessoa({ ...TGF, id: 'cnTg', x: 0, y: 0, h: 300, bE: 150, bD: -150 })}${fogo('cnTgF', -60, -320, 1)}</g></g>`;
  // a mãe subindo a escada / pulando
  s += `<g id="cnMaeW" visibility="hidden" transform="translate(1690 1900)">${P('cnMae', MAE, { x: 0, y: 0, bE: 160, bD: -160 })}</g>`;
  // o abraço no ar
  s += `<g id="cnAbraco" visibility="hidden" transform="translate(1350 560)"><circle id="cnOuro" cx="0" cy="-160" r="260" fill="#FFD66B" opacity="0" filter="url(#borra3)"/>${P('cnAbMae', MAE, { x: -60, y: 0, bE: -60, bD: 90 })}${pessoa({ ...TGF, id: 'cnAbTg', x: 70, y: 40, h: 300, bE: -100 })}</g>`;
  // a mãe voando por cima da praça
  s += `<g id="cnMaeVoa" visibility="hidden" transform="translate(1600 900)"><g transform="rotate(-8)">${P('cnMV', MAE, { x: 0, y: 0, bE: 150, bD: -150 })}</g></g>`;
  s += `<g id="cnFogos">${[[900, 300, '#FFD23F'], [2300, 200, '#F7A8B8'], [1500, -100, '#9FE0C6'], [2700, 500, '#B9A7F5']].map(([x, y, c], i) => `<g transform="translate(${x} ${y})"><g class="fogoArt" id="fa${i}" transform="scale(0.01)">${[...Array(12)].map((_, k) => `<line x1="0" y1="0" x2="${Math.cos(k / 12 * 6.283) * 120}" y2="${Math.sin(k / 12 * 6.283) * 120}" stroke="${c}" stroke-width="10" stroke-linecap="round"/>`).join('')}<circle r="22" fill="#fff"/></g></g>`).join('')}</g>`;
  return s;
}
// ---------- abraços (o poder voltando) ----------
function mundoAbraco(pref, quem, efeito) {
  let s = ceuNoite(pref + 'Ceu') + casasNoite(-900, 2200, 1350, 9) + lampadas(-300, 1400, 1400, pref + 'L') + chao(1350, 3000, 540, '#B8A688', '#9f8f73');
  s += `<g style="filter:brightness(.9)">${quem}</g>` + pessoa({ ...TGF, id: pref + 'Tg', x: 450, y: 1900, h: 300, bD: -100, bE: 20 }) + efeito;
  return s;
}
// ---------- as mãos ----------
function mundoMaos() {
  let s = `<rect x="-2000" y="-2000" width="5000" height="5000" fill="#232b5c"/><circle cx="540" cy="960" r="700" fill="#FFD890" opacity=".1"/>`;
  s += `<g transform="translate(160 1040) rotate(-8)">${pilula(-400, 0, 220, 0, 190, PELES.clara)}${pilula(-400, 0, -60, 0, 200, '#FFB347')}${circ(260, 0, 110, PELES.clara)}</g>`;
  s += `<g transform="translate(920 1000) rotate(172)">${pilula(-300, 0, 180, 0, 130, PELES.clara)}${pilula(-300, 0, -40, 0, 140, '#E8505B')}${circ(220, 0, 80, PELES.clara)}<rect x="40" y="-70" width="34" height="140" rx="10" fill="#3FA7E0" stroke="${OUT}" stroke-width="4"/></g>`;
  s += `<circle id="mxBrilho" cx="700" cy="1010" r="120" fill="#7FD3FF" opacity="0" filter="url(#borra2)"/><g id="mxFaiscas" visibility="hidden">${brilho(620, 900, 1.6, '#FFF4B0')}${brilho(760, 1120, 1.2, '#7FD3FF')}${brilho(520, 1080, 1, '#FFF4B0')}</g>`;
  return s;
}
