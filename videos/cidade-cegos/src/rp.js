// Peças do vídeo "Nesta cidade, todo mundo é cego": personagens com óculos escuros, bengala,
// galinha de borracha, chinelo de pato, semáforo musical, padaria, palco, caixa d'água.
import * as THREE from 'three';
import { rng, clamp } from './motor/core.js';
import { makeChar, canvasTex } from './motor/char.js';
import { box, std, cut, glowSprite, building, lamp, tree, sky, skyline } from './motor/kit.js';

const PX = 1 / 420;
// ---------- acessórios de cabeça ----------
const oculosTex = canvasTex(300, 300, (x) => { x.clearRect(0, 0, 300, 300); x.translate(150, 150);
  for (const s of [-1, 1]) { x.fillStyle = '#121218'; x.beginPath(); x.roundRect(s * 42 - 42, -30, 84, 62, 22); x.fill(); x.strokeStyle = '#3A3A48'; x.lineWidth = 6; x.stroke(); x.fillStyle = '#ffffff40'; x.beginPath(); x.ellipse(s * 42 - 14, -12, 14, 7, -.5, 0, 7); x.fill(); }
  x.strokeStyle = '#3A3A48'; x.lineWidth = 8; x.beginPath(); x.moveTo(-6, -14); x.quadraticCurveTo(0, -22, 6, -14); x.stroke(); x.beginPath(); x.moveTo(-84, -16); x.lineTo(-118, -24); x.moveTo(84, -16); x.lineTo(118, -24); x.stroke(); });
const piscadaTex = canvasTex(300, 300, (x) => { x.clearRect(0, 0, 300, 300); x.translate(150, 150); x.fillStyle = '#F6EFE6'; x.beginPath(); x.ellipse(-42, 0, 18, 27, 0, 0, 7); x.fill(); x.strokeStyle = '#F6EFE6'; x.lineWidth = 8.5; x.lineCap = 'round'; x.beginPath(); x.moveTo(20, 4); x.quadraticCurveTo(42, -14, 64, 4); x.stroke(); });
function quadCabeca(tex, z) { const m = new THREE.Mesh(new THREE.PlaneGeometry(300 * PX, 300 * PX), new THREE.MeshBasicMaterial({ map: tex, alphaTest: .5, side: THREE.DoubleSide })); m.position.z = z; return m; }
/** Adiciona óculos escuros (móveis) e uma piscadinha a um personagem. */
export function comOculos(p, on = true) { const o = quadCabeca(oculosTex, .012); p.head.add(o); const w = quadCabeca(piscadaTex, .004); w.visible = false; p.head.add(w);
  p.oculos = (vis = true, desce = 0) => { o.visible = vis; o.position.y = -desce; }; p.piscar = (sim) => { w.visible = sim; if (sim) p.eye('nenhum'); }; p.oculos(on); return p; }
/** Bengala branca na mão direita. */
export function comBengala(p) { const g = new THREE.Group(); g.add(box(.025, 1.0, .025, std('#F6F2EA'), 0, .5, 0)); g.add(box(.03, .12, .03, std('#C9361F'), 0, .06, 0)); g.position.set(.36, 0, .05); g.rotation.z = -.12; p.root.add(g); p.bengala = g; return p; }
/** Chinelo de pato nos pés. */
const patoTex = canvasTex(256, 160, (x) => { x.clearRect(0, 0, 256, 160); x.fillStyle = '#F7CC2E'; x.beginPath(); x.ellipse(110, 110, 100, 42, 0, 0, 7); x.fill(); x.beginPath(); x.arc(180, 62, 46, 0, 7); x.fill(); x.fillStyle = '#F2922E'; x.beginPath(); x.ellipse(232, 74, 26, 12, 0, 0, 7); x.fill(); x.fillStyle = '#1a1a22'; x.beginPath(); x.arc(190, 50, 9, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(193, 46, 3, 0, 7); x.fill(); });
export function comChinelo(p) { for (const s of [-1, 1]) { const m = cut(patoTex, .28, .17); m.position.set(s * .09 + .04, .07, .06); p.root.add(m); } return p; }
const quepeTex = (tex) => tex('quepe', 300, 300, (x) => { x.translate(150, 150); x.fillStyle = '#24345A'; x.beginPath(); x.moveTo(-118, -70); x.quadraticCurveTo(-110, -160, 0, -166); x.quadraticCurveTo(110, -160, 118, -70); x.closePath(); x.fill(); x.fillStyle = '#16203A'; x.beginPath(); x.ellipse(0, -66, 136, 22, 0, 0, 7); x.fill(); x.fillStyle = '#F2C230'; x.beginPath(); for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 - Math.PI / 2, r = i % 2 ? 9 : 22; x.lineTo(Math.cos(a) * r, -116 + Math.sin(a) * r); } x.fill(); });
const loiroTex = (tex) => tex('loiroC', 300, 300, (x) => { x.translate(150, 150); const g = x.createLinearGradient(0, -140, 0, 0); g.addColorStop(0, '#E8C25A'); g.addColorStop(1, '#C99A33'); x.fillStyle = g; x.fill(new Path2D('M-126 6 Q-136 -112 -40 -136 Q40 -152 104 -112 Q136 -84 128 0 Q116 -42 86 -60 L78 -28 Q58 -62 26 -70 L18 -36 Q-6 -70 -40 -70 L-48 -34 Q-70 -66 -96 -52 Q-120 -30 -126 6Z')); x.strokeStyle = '#FFE597'; x.lineWidth = 6; x.lineCap = 'round'; [[-84, -100, -30, -122], [-20, -120, 40, -126], [56, -108, 96, -82]].forEach(([a, b, c, d]) => { x.beginPath(); x.moveTo(a, b); x.quadraticCurveTo((a + c) / 2, b - 14, c, d); x.stroke(); }); });
const toucaTex = (cor) => (tex) => tex('touca' + cor, 300, 300, (x) => { x.translate(150, 150); for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#F6F2EA' : cor; x.beginPath(); x.moveTo(-120 + i * 8, -80 - i * 22); x.lineTo(120 - i * 8, -80 - i * 22); x.lineTo(110 - i * 10, -102 - i * 22); x.lineTo(-110 + i * 10, -102 - i * 22); x.fill(); } x.fillStyle = '#F6F2EA'; x.beginPath(); x.arc(40, -200, 18, 0, 7); x.fill(); });

// ---------- personagens ----------
export const tiaguin = () => comBengala(comOculos(makeChar({ outfit: 'avental', glow: .16, hat: loiroTex })));
export const bento = () => { const p = comOculos(makeChar({ outfit: 'terno2', hair: 'old', hat: quepeTex })); const ap = new THREE.Group(); const corpo = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, .11, 14), std('#C9CDD6', { metalness: .7, roughness: .25 })); corpo.rotation.z = Math.PI / 2; ap.add(corpo); ap.position.set(.16, 1.02, .07); p.root.add(ap); return p; };
export const vizinho = () => comBengala(comChinelo(comOculos(makeChar({ outfit: 'terno' }))));
export const cego = (i) => { const o = [['rosa', 'long', '#6B3A22'], ['laranja'], ['verde', 'bun', '#2a1a10'], ['azul', 'afro', '#1a1008'], ['roxo', 'bob', '#C99A33'], ['amarelo', 'long', '#3E2518'], ['jaleco']][i % 7]; return comBengala(comOculos(makeChar({ outfit: o[0], hair: o[1], hairc: o[2], lash: !!o[1] }))); };
export const pijama = (i) => comOculos(makeChar({ outfit: ['azul', 'roxo', 'rosa'][i % 3], hat: toucaTex(['#4A86C7', '#7F6BC4', '#D2728A'][i % 3]) }));

// ---------- objetos ----------
export const galinhaTex = canvasTex(256, 384, (x) => { x.clearRect(0, 0, 256, 384); x.fillStyle = '#F7D23A'; x.beginPath(); x.ellipse(128, 290, 92, 70, 0, 0, 7); x.fill(); x.beginPath(); x.roundRect(104, 90, 46, 200, 22); x.fill(); x.beginPath(); x.arc(132, 90, 44, 0, 7); x.fill();
  x.fillStyle = '#E2342F'; for (const [a, b] of [[112, 46], [134, 38], [156, 48]]) { x.beginPath(); x.arc(a, b, 16, 0, 7); x.fill(); } x.beginPath(); x.ellipse(150, 140, 10, 18, 0, 0, 7); x.fill(); x.fillStyle = '#F2922E'; x.beginPath(); x.moveTo(170, 92); x.lineTo(214, 104); x.lineTo(170, 116); x.fill();
  x.fillStyle = '#1a1a22'; x.beginPath(); x.arc(144, 82, 9, 0, 7); x.fill(); x.fillStyle = '#E9B82A'; x.beginPath(); x.ellipse(70, 280, 34, 22, -.5, 0, 7); x.fill(); });
export const notaTex = canvasTex(128, 128, (x) => { x.clearRect(0, 0, 128, 128); x.fillStyle = '#2F6D63'; x.font = '900 100px serif'; x.textAlign = 'center'; x.fillText('♪', 64, 104); });
export const sinoTex = canvasTex(256, 256, (x) => { x.clearRect(0, 0, 256, 256); x.fillStyle = '#E9B44C'; x.beginPath(); x.moveTo(128, 30); x.quadraticCurveTo(200, 40, 206, 190); x.lineTo(50, 190); x.quadraticCurveTo(56, 40, 128, 30); x.fill(); x.fillStyle = '#C9902A'; x.fillRect(40, 186, 176, 18); x.beginPath(); x.arc(128, 214, 18, 0, 7); x.fill(); });
export const discoGiz = canvasTex(1024, 512, (x) => { x.clearRect(0, 0, 1024, 512); x.fillStyle = '#F6F2EAEE'; x.font = "700 150px Caveat"; x.textAlign = 'center'; x.fillText('você enxerga?', 512, 300); x.strokeStyle = '#F6F2EA'; x.lineWidth = 8; x.beginPath(); x.moveTo(170, 360); x.quadraticCurveTo(512, 400, 860, 350); x.stroke(); });
export const patoNuvemTex = canvasTex(512, 320, (x) => { x.clearRect(0, 0, 512, 320); x.fillStyle = '#FFE6D2'; x.beginPath(); x.ellipse(230, 210, 180, 80, 0, 0, 7); x.fill(); x.beginPath(); x.arc(380, 120, 70, 0, 7); x.fill(); x.beginPath(); x.ellipse(460, 136, 50, 20, 0, 0, 7); x.fill(); x.beginPath(); x.ellipse(110, 170, 70, 40, -.4, 0, 7); x.fill(); });
export const placaTex = (txt, bg = '#2F6D63') => canvasTex(512, 200, (x) => { x.fillStyle = bg; x.beginPath(); x.roundRect(0, 0, 512, 200, 24); x.fill(); x.fillStyle = '#fff'; x.font = '900 64px Inter'; x.textAlign = 'center'; x.fillText(txt, 256, 124); });
export const pipocaTex = canvasTex(128, 160, (x) => { x.clearRect(0, 0, 128, 160); for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#D2362F' : '#F6F2EA'; x.beginPath(); x.moveTo(20 + i * 15, 60); x.lineTo(35 + i * 15, 60); x.lineTo(32 + i * 13, 156); x.lineTo(26 + i * 13, 156); x.fill(); } x.fillStyle = '#FFF4D6'; for (let i = 0; i < 12; i++) { x.beginPath(); x.arc(24 + (i * 23) % 84, 40 + (i * 13) % 28, 13, 0, 7); x.fill(); } });

/** Céu de dia e luz de sol. */
export function diaClaro(c, { tarde = false } = {}) {
  sky(c, -160, 480, 360, tarde ? [[0, '#5A4A96'], [.45, '#E07A8A'], [.75, '#F6A65A'], [1, '#FFD98A']] : [[0, '#4F96D8'], [.55, '#9FD2F2'], [1, '#FFF0C8']]);
  c.fog = new THREE.Fog(tarde ? '#F6B07A' : '#CFE8F6', 30, 140);
  c.add(new THREE.HemisphereLight(tarde ? '#FFC8A0' : '#DDF0FF', '#7A6A5A', tarde ? .8 : 1.0));
  const s = new THREE.DirectionalLight(tarde ? '#FFB070' : '#FFF2D8', tarde ? 1.8 : 1.6); s.position.set(tarde ? -14 : -10, tarde ? 5 : 16, tarde ? -10 : 10); s.castShadow = true; s.shadow.mapSize.set(2048, 2048); Object.assign(s.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, far: 80 }); s.shadow.bias = -.0008; c.add(s); return s;
}
/** Praça colorida (com festa opcional): retorna pontos úteis. */
export function praca(c, { festa = false } = {}) {
  const chao = canvasTex(512, 512, (x) => { x.fillStyle = '#D9C9AA'; x.fillRect(0, 0, 512, 512); const R = rng(3); for (let i = 0; i < 260; i++) { x.fillStyle = R() < .5 ? '#CDBB9A' : '#E4D6BA'; x.beginPath(); x.arc(R() * 512, R() * 512, 10 + R() * 14, 0, 7); x.fill(); } }); chao.wrapS = chao.wrapT = THREE.RepeatWrapping; chao.repeat.set(8, 8);
  const g = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ map: chao, roughness: .95 })); g.rotation.x = -Math.PI / 2; g.position.z = -10; g.receiveShadow = true; c.add(g);
  const cores = ['#E59A86', '#F2D27A', '#9FC2B4', '#B7A6D2', '#E7B68A', '#8FB0D6', '#F4EFE4'];
  let i = 0; for (let x = -14; x <= 14; x += 6.5) { c.add(building(40 + i, { x, z: -18, w: 6, d: 5, floors: 2 + i % 2, side: 1, night: false, col: cores[i % cores.length], shop: i === 1 ? { name: 'PADARIA', bg: '#B23C33', fg: '#FFF2D8', awning: '#F2C14E' } : i === 3 ? { name: 'CINEMA', bg: '#2F2A5A', fg: '#FFE6A0', awning: '#D2483A' } : undefined })); i++; }
  // fonte e árvores
  const f = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, .6, 32), std('#C9C0B0')); f.position.set(0, .3, -7); f.castShadow = true; c.add(f); const ag = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, .05, 32), std('#6FB4D8', { roughness: .2 })); ag.position.set(0, .62, -7); c.add(ag);
  for (const [x, z] of [[-6, -9], [6, -9], [-9, -4], [9, -4]]) tree(c, x, z, 1.1, undefined, x + z);
  for (const [x, z] of [[-4, -3], [4.5, -3]]) lamp(c, x, z, 1, false);
  for (const [x, z] of [[-3, -5], [3, -5]]) { c.add(box(1.6, .08, .5, std('#7A4E30'), x, .45, z)); c.add(box(1.6, .45, .06, std('#7A4E30'), x, .7, z - .22)); }
  if (festa) {
    const flag = canvasTex(64, 64, (x) => { x.clearRect(0, 0, 64, 64); x.fillStyle = '#fff'; x.beginPath(); x.moveTo(0, 0); x.lineTo(64, 0); x.lineTo(32, 60); x.fill(); });
    const cs = ['#D2483A', '#F2C14E', '#4A86C7', '#6BAF8E', '#E58A9A', '#7F6BC4'];
    for (let r = 0; r < 4; r++) for (let k = 0; k < 22; k++) { const m = cut(flag, .35, .35, { color: cs[(k + r) % 6] }); const t = k / 21; m.position.set(-11 + t * 22, 4.6 - Math.sin(t * Math.PI) * .9 + r * .4, -2 - r * 4); c.add(m); }
    c.add(box(7, .8, 3, std('#B23C33'), 0, .4, -11)); c.add(box(7.2, .1, 3.2, std('#8A5A36'), 0, .82, -11)); const lona = canvasTex(256, 64, (x) => { for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? '#F6F2EA' : '#D2483A'; x.fillRect(k * 32, 0, 32, 64); } }); const fr = new THREE.Mesh(new THREE.PlaneGeometry(7, .8), new THREE.MeshStandardMaterial({ map: lona })); fr.position.set(0, .4, -9.49); c.add(fr);
    c.add(box(.04, 1.3, .04, '#222', .6, 1.5, -10.2)); const mic = new THREE.Mesh(new THREE.SphereGeometry(.06, 12, 10), std('#555', { metalness: .6 })); mic.position.set(.6, 2.2, -10.2); c.add(mic);
    for (const x of [-3.4, 3.4]) { c.add(box(.1, 4, .1, '#222', x, 2, -12.4)); const sp = new THREE.SpotLight('#FFE6B0', 40, 14, .4, .6, 1.4); sp.position.set(x, 4, -9); sp.target.position.set(0, 1, -11); c.add(sp, sp.target); }
  }
  return {};
}
/** Caixa d'água grande sobre um prédio, com rádio, ao pôr do sol. */
export function caixaDagua(c) { c.add(box(8, 6, 8, std('#E7B68A'), 0, -3, 0)); c.add(box(8.2, .2, 8.2, std('#C9B49A'), 0, .1, 0));
  const t = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.5, 2, 32), std('#2C7FC0', { roughness: .45 })); t.position.set(0, 1.2, -1); t.castShadow = true; c.add(t); const tp = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.65, .1, 32), std('#2670AC')); tp.position.set(0, 2.25, -1); c.add(tp);
  const radio = new THREE.Group(); radio.add(box(.42, .26, .16, std('#B23C33', { roughness: .4 }), 0, .13, 0)); radio.add(box(.14, .14, .02, std('#222'), -.1, .14, .085)); radio.add(box(.01, .5, .01, '#888', .14, .5, 0)); radio.position.set(.05, 2.3, -.2); c.add(radio); return { topo: 2.3 }; }
