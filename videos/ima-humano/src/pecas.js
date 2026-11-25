// Peças do vídeo "E se você virasse um ímã humano?" (versão B: rosto de pele, cards, diagramas em papel)
import * as THREE from 'three';
import { rng, clamp } from './motor/core.js';
import { makeChar, canvasTex } from './motor/char.js';
import { box, std, cut, glowSprite, facadeTex } from './motor/kit.js';

const T = (w, h, d) => canvasTex(w, h, (x) => { x.clearRect(0, 0, w, h); x.lineJoin = 'round'; x.lineCap = 'round'; d(x); });
const INK = '#23202A';
const fonte = (x, px, cor = INK) => { x.font = `700 ${px}px Oswald`; x.fillStyle = cor; x.textAlign = 'center'; x.textBaseline = 'middle'; };

// ---------------- personagens ----------------
export const PELE_TIAGUIN = '#F3CDAA';
const loiroTex = (tex) => tex('loiroC', 300, 300, (x) => { x.translate(150, 150); const g = x.createLinearGradient(0, -140, 0, 0); g.addColorStop(0, '#EDC860'); g.addColorStop(1, '#C99A33'); x.fillStyle = g; x.fill(new Path2D('M-126 6 Q-136 -112 -40 -136 Q40 -152 104 -112 Q136 -84 128 0 Q116 -42 86 -60 L78 -28 Q58 -62 26 -70 L18 -36 Q-6 -70 -40 -70 L-48 -34 Q-70 -66 -96 -52 Q-120 -30 -126 6Z')); x.strokeStyle = '#FFE597'; x.lineWidth = 6; x.lineCap = 'round'; [[-84, -100, -30, -122], [-20, -120, 40, -126], [56, -108, 96, -82]].forEach(([a, b, c, d]) => { x.beginPath(); x.moveTo(a, b); x.quadraticCurveTo((a + c) / 2, b - 14, c, d); x.stroke(); }); });
function fitinha(p) { const g = new THREE.Group(); [['#2E7BD6', 0], ['#F2C230', .016]].forEach(([c, dy]) => g.add(box(.085, .014, .05, std(c), 0, dy, 0, false))); g.position.set(0, -120 / 420, .012); p.arms.R.f.add(g); g.add(box(.012, .07, .006, std('#2E7BD6'), .03, -.05, .03, false)); return p; }
const semSombra = (p) => { p.blob = p.root.children[1]; return p; };
export const tiaguin = () => { const p = semSombra(fitinha(makeChar({ outfit: 'avental', hat: loiroTex, skin: PELE_TIAGUIN, sobr: '#A9792E', calca: '#3F5D8C', tenis: '#2E3442' }))); p.expr('neutro'); return p; };
export const senhora = () => { const p = semSombra(makeChar({ outfit: 'roxo', hair: 'bun', hairc: '#D8D4CE', skin: '#B97B55', sobr: '#CFCAC4', calca: '#4A3F5E', tenis: '#5A4636' })); p.expr('sorriso'); return p; };
export const pessoa = (i) => { const o = [['laranja', '#E9B896', 'bob', '#3A2618', '#33405E'], ['azul', '#8C5A3C', 'afro', '#1E140E', '#2E2E36'], ['verde', '#D9A07A', 'long', '#5A3A22', '#4A4A52'], ['jaleco', '#F0C8A4', null, null, '#2E3648'], ['amarelo', '#6E4630', 'bun', '#1a1008', '#3A3F55']][i % 5];
  const p = semSombra(makeChar({ outfit: o[0], skin: o[1], hair: o[2] || undefined, hairc: o[3] || undefined, calca: o[4], tenis: '#2E3442' })); p.expr('neutro'); return p; };
/** Deita o personagem de barriga para cima (cabeça para -x), sobre uma superfície na altura y. */
export function deitar(p, x, y, z) { p.root.position.set(x, y, z); p.root.rotation.set(-Math.PI / 2, 0, Math.PI / 2); if (p.blob) p.blob.visible = false; }

// ---------------- objetos de metal ----------------
const faceRel = T(256, 256, (x) => { x.fillStyle = '#FBF8F1'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.strokeStyle = INK; x.lineWidth = 8; x.stroke(); fonte(x, 34); for (let i = 1; i <= 12; i++) { const a = i / 12 * 6.283 - 1.571; x.fillText(String(i), 128 + Math.cos(a) * 90, 128 + Math.sin(a) * 90); } x.lineWidth = 9; x.beginPath(); x.moveTo(128, 128); x.lineTo(128, 210); x.stroke(); x.lineWidth = 11; x.beginPath(); x.moveTo(128, 128); x.lineTo(118, 70); x.stroke(); x.fillStyle = '#D8392F'; x.beginPath(); x.arc(128, 128, 10, 0, 7); x.fill(); });
export function despertador(sc = 1) { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, .07, 28), std('#D8392F', { roughness: .45 })); b.rotation.x = Math.PI / 2; b.castShadow = true; g.add(b);
  const f = cut(faceRel, .17, .17); f.position.z = .036; g.add(f); for (const s of [-1, 1]) { const s1 = new THREE.Mesh(new THREE.SphereGeometry(.045, 16, 10, 0, 6.3, 0, 1.6), std('#C9CDD6', { metalness: .6, roughness: .3 })); s1.position.set(s * .07, .095, 0); s1.rotation.z = -s * .5; g.add(s1); const pe = box(.02, .05, .02, std('#2E3442'), s * .06, -.11, 0); pe.name = 'pe'; g.add(pe); }
  g.scale.setScalar(sc); g.tocar = (t) => { g.rotation.z = Math.sin(t * 70) * .14; }; return g; }
export const chaveTex = T(256, 128, (x) => { x.fillStyle = '#E9B83E'; x.strokeStyle = '#8A6516'; x.lineWidth = 5; x.beginPath(); x.arc(56, 64, 40, 0, 7); x.fill(); x.stroke(); x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(46, 64, 14, 0, 7); x.fill(); x.globalCompositeOperation = 'source-over'; x.fillStyle = '#E9B83E'; x.fillRect(92, 54, 140, 20); x.strokeRect(92, 54, 140, 20); for (const a of [150, 180, 210]) { x.fillRect(a, 74, 14, 22); x.strokeRect(a, 74, 14, 22); } });
export const garfoTex = T(128, 320, (x) => { x.fillStyle = '#D7DCE3'; x.strokeStyle = '#6B7380'; x.lineWidth = 4; x.beginPath(); x.roundRect(54, 120, 20, 190, 10); x.fill(); x.stroke(); x.beginPath(); x.moveTo(30, 20); x.lineTo(30, 100); x.quadraticCurveTo(30, 136, 64, 140); x.quadraticCurveTo(98, 136, 98, 100); x.lineTo(98, 20); x.lineTo(88, 20); x.lineTo(88, 90); x.lineTo(80, 90); x.lineTo(80, 20); x.lineTo(72, 20); x.lineTo(72, 90); x.lineTo(56, 90); x.lineTo(56, 20); x.lineTo(48, 20); x.lineTo(48, 90); x.lineTo(40, 90); x.lineTo(40, 20); x.closePath(); x.fill(); x.stroke(); });
export const moedaTex = T(128, 128, (x) => { x.fillStyle = '#E7C15A'; x.strokeStyle = '#9A7420'; x.lineWidth = 6; x.beginPath(); x.arc(64, 64, 56, 0, 7); x.fill(); x.stroke(); x.beginPath(); x.arc(64, 64, 42, 0, 7); x.stroke(); fonte(x, 54, '#9A7420'); x.fillText('1', 64, 66); });
export const brincoTex = T(128, 128, (x) => { x.strokeStyle = '#F2C94C'; x.lineWidth = 12; x.beginPath(); x.arc(64, 70, 34, 0, 7); x.stroke(); x.fillStyle = '#7FD3F0'; x.beginPath(); x.arc(64, 30, 14, 0, 7); x.fill(); });

/** Linhas de campo magnético em volta de um corpo (laços de dipolo). */
export function linhasCampo(alt = 1.9, larg = 1.25) { const g = new THREE.Group(); const mats = [];
  [.5, .75, 1.0, 1.25].forEach((L, k) => { for (const s of [-1, 1]) { const pts = []; for (let i = 0; i <= 40; i++) { const th = .1 * Math.PI + .8 * Math.PI * i / 40, r = L * Math.sin(th) ** 2; pts.push(new THREE.Vector3(s * r * Math.sin(th) * larg, r * Math.cos(th) * alt, 0)); }
    const m = new THREE.MeshBasicMaterial({ color: k % 2 ? '#FF8A5C' : '#56D8F2', transparent: true, opacity: .9, blending: THREE.AdditiveBlending, depthWrite: false }); mats.push(m);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, .011, 6, false), m)); } });
  g.set = (op, t = 0) => { g.visible = op > .01; mats.forEach((m, i) => { m.opacity = op * (.55 + .45 * Math.sin(t * 5 + i)); }); g.scale.setScalar(.92 + .08 * Math.sin(t * 3)); }; return g; }

// ---------------- luzes ----------------
export function luzDia(c, { cor = '#FFF1DC', dir = [4, 8, 5], forca = 2.2, ceu = '#F6EEDF', chao = '#8A7660', amb = 1.25 } = {}) {
  c.add(new THREE.HemisphereLight(ceu, chao, amb)); const d = new THREE.DirectionalLight(cor, forca); d.position.set(...dir); d.castShadow = true; d.shadow.mapSize.set(2048, 2048); d.shadow.bias = -.0004; Object.assign(d.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, far: 40 }); c.add(d); return d; }

// ---------------- quarto ----------------
const madeiraTex = T(512, 512, (x) => { const R = rng(3); x.fillStyle = '#9C7350'; x.fillRect(0, 0, 512, 512); for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#94694A' : '#A27A55'; x.fillRect(0, i * 64, 512, 62); x.fillStyle = '#6E4C33'; x.fillRect(0, i * 64 + 62, 512, 2); for (let k = 0; k < 40; k++) { x.fillStyle = `rgba(60,36,20,${R() * .12})`; x.fillRect(R() * 512, i * 64 + R() * 60, 40 + R() * 80, 2); } } });
const janelaTex = T(512, 512, (x) => { const g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, '#9FD2F2'); g.addColorStop(1, '#E6F2F6'); x.fillStyle = g; x.fillRect(0, 0, 512, 512); const R = rng(4); for (let i = 0; i < 9; i++) { const w = 40 + R() * 50, h = 120 + R() * 220, a = i * 58 - 10; x.fillStyle = ['#B8C9D4', '#A9BCC9', '#C4D2DA'][i % 3]; x.fillRect(a, 512 - h, w, h); x.fillStyle = '#ffffff66'; for (let yy = 512 - h + 12; yy < 500; yy += 22) for (let xx = a + 6; xx < a + w - 8; xx += 14) x.fillRect(xx, yy, 6, 9); } x.strokeStyle = '#5A4632'; x.lineWidth = 3; x.beginPath(); x.moveTo(300, 512); x.lineTo(300, 230); x.moveTo(270, 260); x.lineTo(330, 260); x.stroke(); });
const posterTex = T(256, 340, (x) => { x.fillStyle = '#9C3B2E'; x.fillRect(0, 0, 256, 340); x.fillStyle = '#F2C94C'; x.beginPath(); x.arc(128, 150, 70, 0, 7); x.fill(); x.fillStyle = '#F6EEDF'; x.fillRect(30, 260, 196, 18); x.fillRect(60, 292, 136, 12); });
export function quarto(c) {
  madeiraTex.wrapS = madeiraTex.wrapT = THREE.RepeatWrapping; madeiraTex.repeat.set(3, 3); const chao = box(10, .1, 10, new THREE.MeshStandardMaterial({ map: madeiraTex, roughness: .8 }), 0, -.05, 0); chao.receiveShadow = true; c.add(chao);
  const fundo = box(10, 4.4, .12, std('#E6D8C0'), 0, 2.2, -2.66); fundo.receiveShadow = true; c.add(fundo); const lado = box(.12, 4.4, 10, std('#DDCDB2'), -3.2, 2.2, 0); lado.receiveShadow = true; c.add(lado);
  c.add(box(10, .16, .06, std('#B9A68A'), 0, .08, -2.58));
  const jan = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.3), new THREE.MeshBasicMaterial({ map: janelaTex })); jan.position.set(1.4, 2.05, -2.59); c.add(jan);
  const mold = std('#F6F1E6'); [[0, .68, 1.46, .1], [0, -.68, 1.46, .1], [-.68, 0, .1, 1.46], [.68, 0, .1, 1.46], [0, 0, .06, 1.3], [0, 0, 1.3, .06]].forEach(([a, b, w, h]) => c.add(box(w, h, .08, mold, 1.4 + a, 2.05 + b, -2.56))); c.add(box(1.6, .08, .22, mold, 1.4, 1.36, -2.5));
  const pst = cut(posterTex, .55, .73); pst.position.set(-1.0, 2.25, -2.59); c.add(pst);
  c.add(box(1.0, .05, .22, std('#7A5638'), -2.2, 1.85, -2.52)); const R = rng(7); for (let i = 0; i < 9; i++) c.add(box(.07, .2 + R() * .1, .16, std(['#C9472F', '#3F6E9C', '#E2B13C', '#5E8F5A', '#8A5BA8'][i % 5]), -2.6 + i * .09, 1.98, -2.52));
  c.add(box(2.3, .32, 1.2, std('#7A5638'), -1.5, .16, -1.95)); c.add(box(2.2, .16, 1.12, std('#F2EEE6'), -1.5, .4, -1.95));
  c.add(box(1.5, .1, 1.16, std('#5E8F5A'), -1.15, .5, -1.95)); c.add(box(.42, .12, .7, std('#FBF8F1'), -2.35, .54, -1.95)); c.add(box(.12, .8, 1.2, std('#7A5638'), -2.68, .4, -1.95));
  c.add(box(.55, .62, .45, std('#8E6644'), .15, .31, -2.25)); c.add(box(.5, .03, .4, std('#6E4C33'), .15, .5, -2.02));
  const rel = despertador(1); rel.position.set(.15, .73, -2.2); c.add(rel);
  luzDia(c, { dir: [5, 7, 3], forca: 2.3 }); const fill = new THREE.PointLight('#FFE7C4', 6, 7, 2); fill.position.set(1.4, 2.2, -1.6); c.add(fill);
  c.fog = new THREE.Fog('#E6D8C0', 9, 22);
  return { rel };
}

// ---------------- diagramas em papel ----------------
const papelTex = T(1024, 1024, (x) => { x.fillStyle = '#EFE6D3'; x.fillRect(0, 0, 1024, 1024); const R = rng(11); for (let i = 0; i < 9000; i++) { x.fillStyle = `rgba(${R() > .5 ? '120,100,70' : '255,255,255'},${R() * .07})`; x.fillRect(R() * 1024, R() * 1024, 2, 2); } const g = x.createRadialGradient(512, 512, 200, 512, 512, 720); g.addColorStop(0, '#00000000'); g.addColorStop(1, '#5A40201C'); x.fillStyle = g; x.fillRect(0, 0, 1024, 1024); });
export function papel(c) { const m = new THREE.Mesh(new THREE.PlaneGeometry(12, 16), new THREE.MeshBasicMaterial({ map: papelTex })); m.position.z = -.3; c.add(m); }
export const imaTex = T(400, 400, (x) => { x.lineCap = 'butt'; x.strokeStyle = '#D8392F'; x.lineWidth = 90; x.beginPath(); x.moveTo(90, 300); x.lineTo(90, 170); x.arc(200, 170, 110, Math.PI, 0, false); x.lineTo(310, 300); x.stroke(); x.fillStyle = '#C9CDD6'; x.fillRect(45, 290, 90, 70); x.fillRect(265, 290, 90, 70); x.strokeStyle = INK; x.lineWidth = 6; x.strokeRect(45, 290, 90, 70); x.strokeRect(265, 290, 90, 70); fonte(x, 40, '#fff'); x.fillText('N', 90, 230); x.fillText('S', 310, 230); });
function item(desenho, rot) { return T(320, 380, (x) => { x.save(); x.translate(160, 150); desenho(x); x.restore(); fonte(x, 46); x.fillText(rot, 160, 336); }); }
export const ITENS = {
  ferro: item((x) => { x.fillStyle = '#8B9098'; x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.roundRect(-14, -100, 28, 190, 6); x.fill(); x.stroke(); x.beginPath(); x.roundRect(-48, -112, 96, 22, 8); x.fill(); x.stroke(); x.beginPath(); x.moveTo(-14, 90); x.lineTo(0, 124); x.lineTo(14, 90); x.fill(); x.stroke(); }, 'FERRO'),
  aco: item((x) => { x.fillStyle = '#B9C0CA'; x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.roundRect(-22, -70, 44, 170, 6); x.fill(); x.stroke(); for (let i = 0; i < 7; i++) { x.beginPath(); x.moveTo(-22, -50 + i * 22); x.lineTo(22, -40 + i * 22); x.stroke(); } x.beginPath(); x.roundRect(-56, -110, 112, 44, 12); x.fill(); x.stroke(); }, 'AÇO'),
  aluminio: item((x) => { x.fillStyle = '#C9D3DE'; x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.roundRect(-56, -110, 112, 210, 18); x.fill(); x.stroke(); x.fillStyle = '#3F7CC4'; x.fillRect(-56, -40, 112, 70); x.strokeRect(-56, -40, 112, 70); }, 'ALUMÍNIO'),
  plastico: item((x) => { x.fillStyle = '#F2D06B'; x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-62, -100); x.lineTo(62, -100); x.lineTo(44, 100); x.lineTo(-44, 100); x.closePath(); x.fill(); x.stroke(); x.fillStyle = '#ffffff66'; x.fillRect(-40, -80, 14, 150); }, 'PLÁSTICO'),
  ouro: item((x) => { x.strokeStyle = '#E2B13C'; x.lineWidth = 26; x.beginPath(); x.arc(0, 10, 66, 0, 7); x.stroke(); x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.arc(0, 10, 80, 0, 7); x.stroke(); x.beginPath(); x.arc(0, 10, 52, 0, 7); x.stroke(); x.fillStyle = '#7FD3F0'; x.beginPath(); x.moveTo(0, -90); x.lineTo(26, -62); x.lineTo(0, -40); x.lineTo(-26, -62); x.closePath(); x.fill(); x.stroke(); }, 'OURO'),
};
export const certoTex = T(160, 160, (x) => { x.fillStyle = '#3FA65A'; x.beginPath(); x.arc(80, 80, 72, 0, 7); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 18; x.beginPath(); x.moveTo(42, 82); x.lineTo(70, 110); x.lineTo(118, 52); x.stroke(); });
export const erradoTex = T(160, 160, (x) => { x.fillStyle = '#D8392F'; x.beginPath(); x.arc(80, 80, 72, 0, 7); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 18; x.beginPath(); x.moveTo(50, 50); x.lineTo(110, 110); x.moveTo(110, 50); x.lineTo(50, 110); x.stroke(); });
export const bussolaTex = T(600, 600, (x) => { x.fillStyle = '#FBF8F1'; x.beginPath(); x.arc(300, 300, 280, 0, 7); x.fill(); x.strokeStyle = INK; x.lineWidth = 14; x.stroke(); x.lineWidth = 4; for (let i = 0; i < 36; i++) { const a = i / 36 * 6.283, r0 = i % 9 ? 250 : 225; x.beginPath(); x.moveTo(300 + Math.cos(a) * r0, 300 + Math.sin(a) * r0); x.lineTo(300 + Math.cos(a) * 268, 300 + Math.sin(a) * 268); x.stroke(); } fonte(x, 64); x.fillText('N', 300, 120); x.fillText('S', 300, 482); x.fillText('L', 482, 302); x.fillText('O', 118, 302); });
export const agulhaTex = T(120, 600, (x) => { x.fillStyle = '#D8392F'; x.beginPath(); x.moveTo(60, 40); x.lineTo(100, 300); x.lineTo(20, 300); x.closePath(); x.fill(); x.fillStyle = '#3F5D8C'; x.beginPath(); x.moveTo(60, 560); x.lineTo(100, 300); x.lineTo(20, 300); x.closePath(); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(60, 300, 20, 0, 7); x.fill(); });
export const cartaoVersoTex = T(860, 540, (x) => { const g = x.createLinearGradient(0, 0, 860, 540); g.addColorStop(0, '#5B3FA8'); g.addColorStop(1, '#2E5FA8'); x.fillStyle = g; x.beginPath(); x.roundRect(0, 0, 860, 540, 44); x.fill(); x.fillStyle = '#17161E'; x.fillRect(0, 70, 860, 120); x.fillStyle = '#F6F2EA'; x.fillRect(60, 250, 520, 70); fonte(x, 40, '#fff'); x.textAlign = 'left'; x.fillText('TARJA MAGNÉTICA', 60, 400); });
export const barraTex = T(64, 160, (x) => { x.fillStyle = '#D8392F'; x.fillRect(8, 8, 48, 72); x.fillStyle = '#3F7CC4'; x.fillRect(8, 80, 48, 72); x.strokeStyle = '#fff'; x.lineWidth = 4; x.strokeRect(8, 8, 48, 144); });
export const bolaFerroTex = T(200, 200, (x) => { const g = x.createRadialGradient(80, 70, 10, 100, 100, 96); g.addColorStop(0, '#D7DCE3'); g.addColorStop(1, '#5E6570'); x.fillStyle = g; x.beginPath(); x.arc(100, 100, 92, 0, 7); x.fill(); x.strokeStyle = INK; x.lineWidth = 6; x.stroke(); });
export const reguaTex = T(1200, 200, (x) => { x.fillStyle = '#F2D06B'; x.beginPath(); x.roundRect(0, 40, 1200, 120, 16); x.fill(); x.strokeStyle = INK; x.lineWidth = 6; x.stroke(); for (let i = 0; i <= 40; i++) { x.lineWidth = i % 10 ? 3 : 6; x.beginPath(); x.moveTo(50 + i * 27.5, 40); x.lineTo(50 + i * 27.5, i % 10 ? 70 : 96); x.stroke(); } fonte(x, 46); x.fillText('0', 50, 128); x.fillText('1 m', 325, 128); x.fillText('2 m', 600, 128); x.fillText('3 m', 875, 128); });
export const setaTex = (cor = '#F2C230') => T(512, 128, (x) => { x.fillStyle = cor; x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(10, 44); x.lineTo(380, 44); x.lineTo(380, 12); x.lineTo(500, 64); x.lineTo(380, 116); x.lineTo(380, 84); x.lineTo(10, 84); x.closePath(); x.fill(); x.stroke(); });
export const onibusIconeTex = T(520, 300, (x) => { x.fillStyle = '#2E8C7E'; x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.roundRect(10, 20, 500, 220, 30); x.fill(); x.stroke(); x.fillStyle = '#BFE6F2'; for (let i = 0; i < 5; i++) { x.fillRect(40 + i * 92, 50, 70, 70); x.strokeRect(40 + i * 92, 50, 70, 70); } x.fillStyle = INK; for (const a of [110, 400]) { x.beginPath(); x.arc(a, 245, 42, 0, 7); x.fill(); } });
export const miniTiaguinTex = T(200, 400, (x) => { x.fillStyle = '#D2483A'; x.beginPath(); x.roundRect(50, 130, 100, 140, 20); x.fill(); x.fillStyle = '#3F5D8C'; x.fillRect(60, 270, 34, 110); x.fillRect(106, 270, 34, 110); x.fillStyle = '#F3CDAA'; x.beginPath(); x.arc(100, 80, 58, 0, 7); x.fill(); x.fillStyle = '#E3B94E'; x.beginPath(); x.arc(100, 64, 58, Math.PI * 1.05, Math.PI * 1.95); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(80, 86, 7, 0, 7); x.arc(120, 86, 7, 0, 7); x.fill(); });
export const fulcroTex = T(300, 260, (x) => { x.fillStyle = '#8E6644'; x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(150, 10); x.lineTo(280, 250); x.lineTo(20, 250); x.closePath(); x.fill(); x.stroke(); });
export const tabuaTex = T(1400, 80, (x) => { x.fillStyle = '#B9895E'; x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.roundRect(4, 8, 1392, 64, 14); x.fill(); x.stroke(); });

// ---------------- celular ----------------
export function desenhaMapa(x, ang) { const W = 540, H = 1110; x.fillStyle = '#EDE8DC'; x.fillRect(0, 0, W, H); x.save(); x.translate(W / 2, H / 2 + 60); x.rotate(ang);
  x.fillStyle = '#B9DDB0'; x.fillRect(-500, -500, 320, 260); x.fillRect(160, 180, 360, 300); x.fillStyle = '#A8D4F2'; x.fillRect(-560, 280, 400, 200); x.strokeStyle = '#FFFFFF'; x.lineWidth = 40; for (let i = -3; i <= 3; i++) { x.beginPath(); x.moveTo(i * 170, -800); x.lineTo(i * 170, 800); x.stroke(); x.beginPath(); x.moveTo(-800, i * 200); x.lineTo(800, i * 200); x.stroke(); } x.strokeStyle = '#F2C230'; x.lineWidth = 26; x.beginPath(); x.moveTo(-700, -300); x.lineTo(700, 400); x.stroke(); x.restore();
  x.fillStyle = '#2F6FD0'; x.beginPath(); x.arc(W / 2, H / 2 + 60, 26, 0, 7); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 8; x.stroke();
  x.fillStyle = '#FBF8F1'; x.fillRect(0, 0, W, 150); fonte(x, 54); x.fillText('MAPA', W / 2, 92); x.fillStyle = '#D8392F'; x.beginPath(); x.roundRect(40, H - 190, W - 80, 110, 30); x.fill(); fonte(x, 40, '#fff'); x.fillText('BÚSSOLA SEM SINAL', W / 2, H - 134); }

// ---------------- mercado ----------------
const telaMaq = (ok) => T(256, 200, (x) => { x.fillStyle = ok ? '#2F6FB0' : '#D8392F'; x.fillRect(0, 0, 256, 200); fonte(x, ok ? 30 : 44, '#fff'); if (ok) { x.fillText('APROXIME', 128, 80); x.fillText('O CARTÃO', 128, 122); } else { x.fillText('RECUSADO', 128, 76); x.lineWidth = 14; x.strokeStyle = '#fff'; x.beginPath(); x.moveTo(104, 112); x.lineTo(152, 160); x.moveTo(152, 112); x.lineTo(104, 160); x.stroke(); } });
const telaOk = telaMaq(true), telaNao = telaMaq(false);
export function mercado(c) { const R = rng(21);
  const piso = canvasTex(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? '#E9E4D8' : '#D6CFBF'; x.fillRect(i * 64, j * 64, 64, 64); } }); piso.wrapS = piso.wrapT = THREE.RepeatWrapping; piso.repeat.set(4, 4);
  const ch = box(12, .1, 12, new THREE.MeshStandardMaterial({ map: piso, roughness: .6 }), 0, -.05, 0); ch.receiveShadow = true; c.add(ch); c.add(box(12, 4.5, .1, std('#F1E9D6'), 0, 2.25, -3.6));
  for (let k = 0; k < 2; k++) { const sx = -2.6 + k * 3.4; c.add(box(3, 2.6, .5, std('#8E6644'), sx, 1.3, -3.3)); for (let f = 0; f < 4; f++) { c.add(box(2.9, .05, .5, std('#6E4C33'), sx, .4 + f * .6, -3.1)); for (let i = 0; i < 9; i++) { const h = .22 + R() * .2; c.add(box(.24, h, .26, std(['#D8392F', '#F2C230', '#3F7CC4', '#5E8F5A', '#F08A4B', '#8A5BA8', '#FBF8F1'][Math.floor(R() * 7)]), sx - 1.3 + i * .32, .43 + f * .6 + h / 2, -3.05)); } } }
  c.add(box(3.2, .95, .7, std('#3F5D8C'), .2, .475, -1.0)); c.add(box(3.3, .06, .78, std('#E9E4D8'), .2, .98, -1.0));
  const maq = new THREE.Group(); maq.add(box(.16, .04, .26, std('#26262E'), 0, 0, 0)); const tela = new THREE.Mesh(new THREE.PlaneGeometry(.12, .094), new THREE.MeshBasicMaterial({ map: telaOk })); tela.rotation.x = -Math.PI / 2; tela.position.set(0, .022, -.05); maq.add(tela); maq.position.set(.55, 1.03, -.85); maq.rotation.x = .35; c.add(maq);
  maq.estado = (ok) => { tela.material.map = ok ? telaOk : telaNao; };
  luzDia(c, { dir: [2, 9, 5], forca: 1.6, amb: 1.4, ceu: '#FFF8EC' }); c.fog = new THREE.Fog('#F1E9D6', 8, 20);
  return { maq };
}

// ---------------- rua e ponto de ônibus ----------------
const gradeTex = T(256, 128, (x) => { x.fillStyle = '#3A3A40'; x.fillRect(0, 0, 256, 128); x.fillStyle = '#121216'; for (let i = 0; i < 10; i++) x.fillRect(12 + i * 24, 12, 12, 104); x.strokeStyle = '#5A5A62'; x.lineWidth = 6; x.strokeRect(3, 3, 250, 122); });
const placaPonto = T(256, 256, (x) => { x.fillStyle = '#2F6FB0'; x.beginPath(); x.roundRect(8, 8, 240, 240, 30); x.fill(); fonte(x, 64, '#fff'); x.fillText('PONTO', 128, 92); x.fillStyle = '#fff'; x.beginPath(); x.roundRect(64, 130, 128, 80, 14); x.fill(); x.fillStyle = '#2F6FB0'; x.fillRect(80, 146, 40, 28); x.fillRect(136, 146, 40, 28); });
const ladoOnibus = T(1024, 256, (x) => { x.fillStyle = '#F1ECE0'; x.fillRect(0, 0, 1024, 256); x.fillStyle = '#2E8C7E'; x.fillRect(0, 176, 1024, 40); x.fillStyle = '#26323C'; for (let i = 0; i < 7; i++) x.fillRect(30 + i * 140, 40, 120, 100); x.fillStyle = '#8FC6DA55'; for (let i = 0; i < 7; i++) x.fillRect(36 + i * 140, 46, 50, 88); fonte(x, 30, '#2E8C7E'); x.fillText('CIRCULAR 07', 880, 240); });
export function rua(c, { onibus = false } = {}) {
  luzDia(c, { dir: [-5, 9, 6], forca: 2.4 }); c.fog = new THREE.Fog('#CFE3EE', 14, 46);
  const asf = box(60, .1, 12, std('#55545C'), 0, -.05, -6.2); asf.receiveShadow = true; c.add(asf); for (let i = -6; i <= 6; i++) c.add(box(1.6, .012, .14, std('#E9E4D8'), i * 3.2, .006, -5.2));
  const calc = box(60, .14, 5, std('#C9C0B2'), 0, .07, 2.3); calc.receiveShadow = true; c.add(calc); c.add(box(60, .16, .16, std('#A39A8C'), 0, .08, -.16));
  const R = rng(31); for (let i = 0; i < 9; i++) { const w = 3.4 + R() * 1.6, h = 4 + Math.floor(R() * 4) * 1.4, x0 = -15 + i * 4.2; const ft = facadeTex(40 + i, Math.round(w), Math.round(h / 1.4), ['#C98F6B', '#8FA6B8', '#D9B86A', '#B9806A', '#9BB28A'][i % 5], false, .3).map; const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 3), [std('#8E7E70'), std('#8E7E70'), std('#8E7E70'), std('#8E7E70'), new THREE.MeshStandardMaterial({ map: ft, roughness: .9 }), std('#8E7E70')]); b.position.set(x0, h / 2, -14); b.castShadow = b.receiveShadow = true; c.add(b); }
  const sk = new THREE.Mesh(new THREE.PlaneGeometry(140, 60), new THREE.MeshBasicMaterial({ color: '#BFE0F0', fog: false })); sk.position.set(0, 20, -40); c.add(sk);
  const metal = std('#7E8894', { metalness: .4, roughness: .4 }); [[-3.4, 1.8], [-1.2, 1.8]].forEach(([a, b]) => c.add(box(.07, 2.4, .07, metal, a, 1.34, b))); c.add(box(2.6, .08, 1.3, std('#2F6FB0'), -2.3, 2.56, 1.4)); c.add(box(2.4, 1.6, .04, new THREE.MeshStandardMaterial({ color: '#CFE8F2', transparent: true, opacity: .35 }), -2.3, 1.4, 1.9)); c.add(box(1.8, .08, .4, std('#8E6644'), -2.3, .6, 1.6));
  c.add(box(.06, 2.6, .06, metal, -.9, 1.4, .3)); const pl = cut(placaPonto, .5, .5); pl.position.set(-.9, 2.6, .34); c.add(pl);
  const grade = new THREE.Mesh(new THREE.PlaneGeometry(.6, .3), new THREE.MeshStandardMaterial({ map: gradeTex, roughness: .7 })); grade.rotation.x = -Math.PI / 2; grade.position.set(.35, .142, .1); c.add(grade);
  let bus = null; if (onibus) { bus = new THREE.Group(); const corpo = new THREE.Mesh(new THREE.BoxGeometry(9, 2.7, 2.5), [std('#F1ECE0'), std('#F1ECE0'), std('#E6E0D2'), std('#F1ECE0'), new THREE.MeshStandardMaterial({ map: ladoOnibus, roughness: .5 }), std('#F1ECE0')]); corpo.position.y = 1.65; corpo.castShadow = true; bus.add(corpo); for (const a of [-3, 3]) { const r = new THREE.Mesh(new THREE.CylinderGeometry(.45, .45, .3, 20), std('#1E1E24')); r.rotation.x = Math.PI / 2; r.position.set(a, .45, 1.2); bus.add(r); } bus.position.set(20, 0, -1.7); c.add(bus); }
  return { bus };
}

// ---------------- ônibus por dentro ----------------
const cidadeFaixa = T(2048, 512, (x) => { const g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, '#A9D6F0'); g.addColorStop(1, '#E6F2F6'); x.fillStyle = g; x.fillRect(0, 0, 2048, 512); const R = rng(9); let a = 0; while (a < 2048) { const w = 80 + R() * 140, h = 160 + R() * 260; x.fillStyle = ['#C98F6B', '#8FA6B8', '#D9B86A', '#B9806A', '#9BB28A'][Math.floor(R() * 5)]; x.fillRect(a, 512 - h, w, h); x.fillStyle = '#ffffff55'; for (let yy = 512 - h + 16; yy < 500; yy += 34) for (let xx = a + 10; xx < a + w - 16; xx += 26) x.fillRect(xx, yy, 12, 18); a += w + 6; } x.fillStyle = '#4F8F4A'; for (let i = 0; i < 30; i++) { x.beginPath(); x.arc(i * 70 + R() * 30, 470 + R() * 20, 40 + R() * 20, 0, 7); x.fill(); } });
export function onibusDentro(c) {
  c.add(new THREE.HemisphereLight('#FFF8EC', '#6A6A72', 1.5)); const d = new THREE.DirectionalLight('#FFF1DC', 1.6); d.position.set(2, 8, -6); d.castShadow = true; d.shadow.mapSize.set(2048, 2048); Object.assign(d.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, far: 30 }); c.add(d);
  const pis = box(14, .1, 2.6, std('#5E6570'), 0, -.05, 0); pis.receiveShadow = true; c.add(pis); c.add(box(14, .08, 2.6, std('#E9E6DE'), 0, 2.45, 0));
  const parede = std('#DCDFE2'); for (const zz of [-1.3, 1.3]) { c.add(box(14, 1.0, .08, parede, 0, .5, zz)); c.add(box(14, .4, .08, parede, 0, 2.25, zz)); for (let i = -5; i <= 5; i++) c.add(box(.16, 1.05, .1, parede, i * 1.4, 1.55, zz)); const vid = new THREE.Mesh(new THREE.PlaneGeometry(14, 1.05), new THREE.MeshStandardMaterial({ color: '#CFEAF5', transparent: true, opacity: .22, roughness: .05, metalness: .2, depthWrite: false })); vid.position.set(0, 1.55, zz); c.add(vid); }
  cidadeFaixa.wrapS = THREE.RepeatWrapping; cidadeFaixa.repeat.set(2, 1); const fora = new THREE.Mesh(new THREE.PlaneGeometry(40, 10), new THREE.MeshBasicMaterial({ map: cidadeFaixa, fog: false })); fora.position.set(0, 1.4, -7); c.add(fora); const fora2 = fora.clone(); fora2.position.z = 7; fora2.rotation.y = Math.PI; c.add(fora2);
  const azul = std('#2F6FB0', { roughness: .5 }), amarelo = std('#F2C230', { roughness: .35, metalness: .3 });
  for (let i = -4; i <= 4; i++) for (const zz of [-.85, .85]) { if (zz < 0 && (i === 0 || i === 1)) continue; c.add(box(.5, .08, .7, azul, i * 1.4 + .3, .48, zz)); c.add(box(.08, .6, .7, azul, i * 1.4 + .05, .8, zz)); c.add(box(.06, .44, .06, std('#7E8894'), i * 1.4 + .3, .22, zz)); }
  for (let i = -4; i <= 4; i += 2) { const pv = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, 2.45, 10), amarelo); pv.position.set(i * 1.4 + .9, 1.22, .42); c.add(pv); }
  const ph = new THREE.Mesh(new THREE.CylinderGeometry(.025, .025, 14, 8), amarelo); ph.rotation.z = Math.PI / 2; ph.position.set(0, 2.2, .42); c.add(ph);
  c.fog = new THREE.Fog('#DCDFE2', 8, 18);
  return { avanca: (t) => { cidadeFaixa.offset.x = t * .06; } };
}
