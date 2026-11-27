// "Nessa cidade, todo mundo vive dentro de um jogo" — Estilo 3 (HUD de jogo, luz de cinema) com a fala rápida do Estilo 1. 112,5 s.
import * as THREE from 'three';
import { makeShot, smooth, lerp, clamp } from './motor/core.js';
import { cut, glowSprite, box, std } from './motor/kit.js';
import { phone } from './motor/kit2.js';
import { cameraCortes } from './cortes.js';
import { tiaguin, nina, dona, pessoa, sentar, etiqueta, praca, padaria, casaJanela, tela, desenhaPlacar, vassoura, botijao, caixa, arena, chaoY, bau, fogueira, mira, zona, desenhaCeu, fundoRaios, iconeTex, desenhaMorro, desenhaTermo, poeira } from './pecas.js';

const FX = (st) => ({ bloom: .38, bloomT: .82, bloomR: .7, vig: .58, grain: .055, exposure: 1.0, range: 2.0, blur: 15, ...st });
const pop = (t, a, d = .2) => { const k = clamp((t - a) / d); return k <= 0 ? 0.001 : 1 + Math.sin(k * Math.PI) * .25; };
const ky = (t, a, b) => smooth(a, b, t);

function cena(fundo, montar, planos, anima, fx = {}) { return (t0, t1) => {
  const s = makeShot(t0, t1, fundo, 38), o = montar(s.scene, s) || {}; const P = planos.map(([f, ...r]) => [f - t0, ...r]);
  s.update = (t, u) => { const pl = cameraCortes(s.camera, u, P); const r = anima ? anima(t, o, s, pl) : null; return FX({ focus: pl.dist, ...fx, ...(r || {}) }); }; return s; }; }

// ===================== Praça (povo com etiquetas) =====================
const POVO = [[-2.3, -1.6, 0, 'MARCOS', 12, .9], [2.5, -1.3, 1, 'JÚLIA', 18, .7], [-3.9, .5, 2, 'SEU ZÉ', 31, .5], [3.7, .7, 3, 'CAROL', 9, 1], [-1.1, -3.4, 4, 'LUAN', 7, .8], [1.5, -3.8, 5, 'DUDA', 22, .6], [-5.2, -2.4, 6, 'BIA', 15, .9], [5.3, -2.7, 7, 'PEDRO', 5, .4], [-.4, -5.6, 0, 'LARA', 27, 1], [3.6, -5.2, 1, 'TONHO', 40, .3]];
function montaPraca(c, { povo = true, mae = false, ti = true, cida = false, placar = false, missoes = false } = {}) { const { tl } = praca(c); const o = { tl, povo: [] };
  if (povo) for (const [x, z, i, n, nv, v] of POVO) { const p = pessoa(i); p.place(x, z); etiqueta(p, n, nv, v); c.add(p.root); o.povo.push(p); }
  if (mae) { const m = pessoa(6); m.place(3.0, 1.6); c.add(m.root); etiqueta(m, 'RITA', 14, .9); const b = pessoa(2); b.place(3.75, 1.7, 0, .5); c.add(b.root); b.expr('feliz'); etiqueta(b, 'BEBÊ', 1, 1, 1.25, .9); o.mae = m; o.bebe = b; }
  if (ti) { const t = tiaguin(); t.place(0, 1.2); c.add(t.root); etiqueta(t, 'TIAGUIN', 3, 1); o.ti = t; }
  if (cida) { const d = dona(); d.place(1.45, .95); c.add(d.root); etiqueta(d, 'DONA CIDA', 2, .35); o.cida = d; const orb = glowSprite('#FFD23F', .5, 1); orb.visible = false; c.add(orb); o.orb = orb; }
  if (placar) { const pl = new THREE.Group(); pl.add(box(2.6, 3.3, .5, std('#6E6A68'), 0, 1.65, 0)); const tx = tela(2.3, 3.0, 512, 668, desenhaPlacar, { brilho: .85 }); tx.position.set(0, 1.72, .26); pl.add(tx); pl.position.set(6.6, 0, -.8); pl.rotation.y = -.5; c.add(pl); o.placar = tx; }
  if (missoes) { o.vas = vassoura(); o.gas = botijao(); o.cx = caixa(); c.add(o.vas, o.gas, o.cx); }
  o.poeira = poeira(c, 90, [16, 5, 12], '#FFD9A8', 4, [0, 2.2, -2]); return o; }
const animaPovo = (o, t, s) => { o.povo.forEach((p, i) => { p.face(s.camera); p.pose({ armL: [6 + Math.sin(t * 1.3 + i) * 3, 4], armR: [6 - Math.sin(t * 1.1 + i) * 3, 4], head: Math.sin(t * .8 + i * 1.7) * 3 }); p.expr(i % 3 === 0 ? 'sorriso' : 'neutro'); }); o.poeira.anima(t); };

// 1. Abertura (0 – 9,16)
const p1 = cena('#2E2A66', (c) => montaPraca(c, { mae: true, ti: true }),
  [[3.78, [0, 10, 15], [0, 8.6, 11.5], [0, 1.5, -3], [0, 1.6, -3.5], 42],
   [6.06, [-.5, 3.6, 2.4], [-.3, 3.8, .8], [0, 4.8, -9.4], [0, 4.8, -9.4], 36],
   [9.16, [3.6, 1.35, 6.6], [3.5, 1.3, 6.0], [3.4, 1.0, 1.6], [3.4, 1.0, 1.6], 34]],
  (t, o, s) => { o.tl.tela.paint('logo'); animaPovo(o, t, s); o.ti.face(s.camera); o.ti.expr('sorriso'); o.ti.pose({}); o.mae.face(s.camera); o.bebe.face(s.camera); o.mae.expr('feliz'); o.mae.pose({ armR: [40, 50] }); o.bebe.pose({ armL: [150 + Math.sin(t * 6) * 15, 10], armR: [150 - Math.sin(t * 6) * 15, 10] }); },
  { range: 3.0 });

// 2. Padaria (9,16 – 10,19)
const pad = cena('#2E2A66', (c) => { padaria(c); const ti = tiaguin(); ti.place(-.9, -.9); c.add(ti.root); etiqueta(ti, 'TIAGUIN', 3, 1); return { ti }; },
  [[10.19, [.4, 1.7, 3.6], [.3, 1.65, 3.1], [-.3, 1.3, -1.2], [-.3, 1.3, -1.2], 40]],
  (t, o, s) => { o.ti.face(s.camera); o.ti.expr(t < 9.6 ? 'neutro' : 'sem_graca'); o.ti.pose({ armR: [30, 40] }); });

// 3. Casa: a luz apaga (10,19 – 11,40)
const casa = cena('#2E2A66', (c) => casaJanela(c),
  [[11.40, [-1.0, 2.6, 4.8], [-1.0, 2.7, 4.2], [-1.2, 2.8, -2], [-1.2, 2.8, -2], 38]],
  (t, o) => { o.apaga(ky(t, 10.75, 10.9)); }, { range: 4 });

// 4. Praça: missões, etiquetas, temporada, placar, dona Cida (11,40 – 41,34)
const TI = [0, 1.2];
const p2 = cena('#2E2A66', (c) => montaPraca(c, { cida: true, placar: true, missoes: true }),
  [[13.29, [.9, 1.75, 4.4], [.7, 1.7, 3.8], [0, 1.45, 1.2], [0, 1.45, 1.2], 34],
   [14.11, [-1.8, 1.0, 3.4], [-1.6, 1.0, 3.0], [0, .8, 1.2], [0, .8, 1.2], 38],
   [14.95, [1.6, 1.3, 3.6], [1.4, 1.25, 3.2], [0, 1.0, 1.2], [0, 1.0, 1.2], 38],
   [15.79, [-1.2, 1.5, 3.9], [-1.0, 1.5, 3.5], [0, 1.2, 1.2], [0, 1.2, 1.2], 38],
   [17.08, [-1.2, 2.45, .9], [-.6, 2.45, .5], [-2.3, 2.25, -1.6], [-2.3, 2.25, -1.6], 32],
   [19.09, [-4.6, 2.5, 2.4], [1.8, 2.5, 1.6], [-2.4, 2.1, -2.2], [3.2, 2.1, -2.4], 40],
   [21.33, [0, 5.5, 9.5], [0, 5.0, 8.6], [0, 1.8, -2.5], [0, 1.8, -2.5], 42],
   [23.18, [-2.4, .7, 3.6], [-2.2, .9, 2.6], [0, 4.6, -9.4], [0, 4.8, -9.4], 40],
   [25.89, [0, 4.8, 1.4], [0, 4.8, .4], [0, 4.8, -9.4], [0, 4.8, -9.4], 36],
   [29.14, [-3.6, 1.9, 4.2], [-3.0, 1.9, 3.6], [.5, 2.8, -6], [.5, 2.9, -6], 40],
   [32.58, [4.0, 1.9, 4.4], [4.3, 1.85, 3.8], [6.6, 1.75, -.8], [6.6, 1.75, -.8], 38],
   [34.94, [5.0, 1.8, 2.3], [5.2, 1.75, 1.8], [6.6, 1.72, -.8], [6.6, 1.72, -.8], 34],
   [36.85, [.35, 1.75, 4.4], [.3, 1.72, 3.9], [0, 1.62, 1.2], [0, 1.62, 1.2], 32],
   [40.02, [.75, 1.6, 5.6], [.75, 1.55, 5.1], [.72, 1.25, 1.1], [.72, 1.25, 1.1], 36],
   [41.34, [0, 4.8, 1.0], [0, 4.8, .2], [0, 4.8, -9.4], [0, 4.8, -9.4], 36]],
  (t, o, s, pl) => { animaPovo(o, t, s); const { ti, cida, tl, vas, gas, cx, orb, placar } = o; ti.face(s.camera); cida.face(s.camera);
    if (t < 21.33) tl.tela.paint('logo'); else if (t < 23.18) tl.tela.paint('temporada'); else if (t < 25.89) tl.tela.paint('ranking', +smooth(23.4, 25.6, t).toFixed(3)); else if (t < 40.02) tl.tela.paint('temporada'); else tl.tela.paint('ranking', +lerp(.8, .86, smooth(40.0, 41.3, t)).toFixed(3), 'TIAGUIN');
    placar.paint(+smooth(33.0, 34.2, t).toFixed(2));
    vas.visible = t >= 13.29 && t < 14.11; gas.visible = t >= 14.11 && t < 14.95; cx.visible = t >= 14.95 && t < 15.79;
    if (t < 13.29) { ti.expr('pensando'); ti.pose({ armR: [30, 90], head: 4 }); }
    else if (t < 14.11) { ti.expr('esperto'); const f = Math.sin(t * 12); ti.pose({ armL: [30, 40], armR: [30, 40], lean: f * 3 }); vas.position.set(TI[0] + f * .15, 0, TI[1] + .25); vas.rotation.z = f * .25; }
    else if (t < 14.95) { ti.expr('sorriso'); ti.walk(t, 1, .7); gas.position.set(TI[0] + .42, .0, TI[1] + .1); }
    else if (t < 15.79) { ti.expr('dor'); ti.pose({ armL: [150, 20], armR: [150, 20], squash: -.02 }); cx.position.set(TI[0], 2.2, TI[1] + .1); }
    else if (t < 34.94) { ti.expr(t < 21.33 ? 'sorriso' : 'susto'); ti.pose({}); }
    else if (t < 36.85) { ti.expr('esperto'); ti.pose({ armR: [20, 10], head: -3 }); }
    else { ti.expr(t < 40.02 ? 'sorriso' : 'triste'); ti.pose({ armR: [lerp(6, 70, smooth(37.2, 37.6, t)), 10] }); }
    cida.expr(t < 38.3 ? 'triste' : 'feliz'); cida.pose(t > 38.3 && t < 40 ? { armL: [40, 60] } : {});
    const ko = smooth(37.6, 38.6, t); orb.visible = ko > 0 && ko < 1; orb.position.set(lerp(TI[0] + .3, 1.3, ko), 1.35 + Math.sin(ko * Math.PI) * .5, lerp(TI[1] + .1, 1.05, ko));
    cida.setTag('DONA CIDA', 2, t > 38.6 ? .95 : .35); ti.setTag('TIAGUIN', 3, t > 37.6 ? .5 : 1);
    const vermelho = t >= 21.33 && t < 34.94; return { tint: vermelho ? '#FFD0CC' : '#ffffff', range: pl.i >= 6 && pl.i <= 8 ? 4 : 2.2 }; });

// 5. Portal da arena (41,34 – 42,12)
const portal = cena('#05070C', (c) => { c.add(new THREE.HemisphereLight('#8FB8FF', '#000', .4)); c.add(box(2.6, 4.2, .2, std('#1b1f29'), 0, 2.1, -4)); c.add(box(2.0, 3.7, .05, new THREE.MeshBasicMaterial({ color: '#B8DCF2' }), 0, 1.85, -3.88)); const g = glowSprite('#9FD8FF', 6, .45); g.position.set(0, 2, -3.7); c.add(g);
    const ch = box(30, .1, 30, std('#10141E'), 0, -.05, 0); ch.receiveShadow = true; c.add(ch); const sp = new THREE.SpotLight('#CFEFFF', 5, 14, .6, .6, 1.4); sp.position.set(0, 2.5, -3.5); sp.target.position.set(0, 0, 4); c.add(new THREE.DirectionalLight('#9FB8FF', .8)); c.add(sp, sp.target); const ti = tiaguin('23'); c.add(ti.root); ti.root.traverse((m) => { if (m.isMesh && m.parent && m.parent.isMesh) m.visible = false; }); ti.tint('#556070'); return { ti }; },
  [[42.12, [.8, 1.5, 3.6], [.6, 1.45, 3.0], [0, 1.4, -2], [0, 1.4, -3], 40]],
  (t, o) => { o.ti.place(0, lerp(1.4, -.6, smooth(41.34, 42.12, t))); o.ti.walk(t, 1.2, .8); o.ti.root.rotation.y = Math.PI; }, { bloom: .5, bloomT: .8, exposure: .9, blur: 8 });

// ===================== Arena =====================
const JOG = [[-4, 6], [5, 5], [-7, -2], [7, -3], [-3, -7], [3, -8], [-9, 4], [9, 2], [0, 9], [-6, 8], [6, -9], [-10, -6], [10, -6], [2, 12], [-2, -11]];
const a1 = cena('#4A5BA8', (c) => { arena(c); bau(c, 0, 0); const js = JOG.map(([x, z], i) => { const p = pessoa(i, String(i + 1).padStart(2, '0')); c.add(p.root); etiqueta(p, ['RAFA', 'BIA', 'LUAN', 'MEL', 'IGOR', 'ANA', 'CAIO', 'LIA', 'VINI', 'TATI', 'JOCA', 'DIDI', 'GUGA', 'NICO', 'SOL'][i], 2 + (i % 5), 1); p.de = [x, z]; p.root.traverse((m) => { if (m.isMesh && m.parent && m.parent.isMesh) m.visible = false; }); return p; });
    const ti = tiaguin('23'); c.add(ti.root); etiqueta(ti, 'TIAGUIN', 3, .5); const po = poeira(c, 80, [20, 6, 20], '#FFE2B0', 7, [0, 2, 0]); return { js, ti, po }; },
  [[45.07, [0, 16, 19], [0, 13, 15], [0, 0, 0], [0, .3, 0], 40],
   [46.78, [-3.4, .55, 6.2], [-3.9, .6, 5.4], [-6, 1.2, 1.5], [-7, 1.2, 0], 44]],
  (t, o, s) => { const k = smooth(42.12, 46.8, t); o.js.forEach((p, i) => { const [x, z] = p.de, f = lerp(1, .12, k * (.8 + (i % 3) * .1)); const px = x * f, pz = z * f; p.root.position.set(px, chaoY(px, pz), pz); p.root.rotation.y = Math.atan2(-x, -z); p.walk(t * 1.6 + i, 1.6, 1); p.expr('bravo'); });
    const kt = smooth(45.07, 46.78, t); const tx = lerp(-2, -8, kt), tz = lerp(2.5, -.5, kt); o.ti.root.position.set(tx, chaoY(tx, tz), tz); if (t < 45.07) o.ti.root.rotation.y = 0; else o.ti.face(s.camera); o.ti.walk(t * 1.6, 1.6, 1.1); o.ti.expr('esperto'); o.po.anima(t); return t < 45.07 ? { range: 12, blur: 8 } : {}; });

// 6. Explicações em fundo de raios (46,78 – 57,43)
const telaJogo = (x, ang) => { const W = 540, H = 1110; const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2B2F6B'); g.addColorStop(1, '#0E1030'); x.fillStyle = g; x.fillRect(0, 0, W, H); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#FFD23F'; x.font = '800 70px Barlow'; x.fillText('ARENA', W / 2, 120); x.save(); x.translate(W / 2, 480); x.rotate(Math.sin(ang * 3) * .1); x.fillStyle = '#C9D3DE'; x.beginPath(); x.moveTo(0, -230); x.lineTo(34, 120); x.lineTo(-34, 120); x.closePath(); x.fill(); x.fillStyle = '#E9B83E'; x.fillRect(-110, 120, 220, 34); x.fillRect(-20, 154, 40, 110); x.restore();
  x.fillStyle = '#E2413B'; x.beginPath(); x.roundRect(70, 860, 400, 130, 30); x.fill(); x.fillStyle = '#fff'; x.font = '800 62px Barlow'; x.fillText('PEGAR ARMA', W / 2, 928); };
const r1 = cena('#7A2A5A', (c) => { const fundo = fundoRaios(c); const cel = phone(telaJogo, .9, 1.85); cel.position.set(0, .1, .2); c.add(cel);
    const ic = ['ar', 'agua', 'comida'].map((n, i) => { const m = cut(iconeTex(n, ['3 MIN', '3 DIAS', '3 SEMANAS'][i]), .8, 1.0); m.position.set((i - 1) * .85, .75, .1); c.add(m); return m; });
    const esp = cut(iconeTex('espada', 'ESPADA'), 1.1, 1.375); esp.position.set(-.68, .75, .1); c.add(esp); const gar = cut(iconeTex('garrafa', 'ÁGUA'), 1.1, 1.375); gar.position.set(.68, .75, .1); c.add(gar); const gg = glowSprite('#7FD8FF', 2.4, .8); gg.position.set(.68, .85, .05); c.add(gg);
    const morro = tela(2.6, 2.2, 900, 760, desenhaMorro); morro.position.set(0, -.1, .1); c.add(morro); c.add(new THREE.AmbientLight('#ffffff', 2)); return { fundo, cel, ic, esp, gar, gg, morro }; },
  [[48.98, [0, .1, 5.0], [0, .1, 4.4], [0, .1, 0], [0, .1, 0], 30],
   [50.30, [0, 0, 9.0], [0, 0, 8.2], [0, 0, 0], [0, 0, 0], 30],
   [53.86, [0, 0, 9.6], [0, 0, 9.0], [0, 0, 0], [0, 0, 0], 30],
   [55.33, [0, .2, 10.2], [0, .2, 9.6], [0, .2, 0], [0, .2, 0], 30],
   [57.43, [0, -.1, 9.8], [0, -.1, 9.2], [0, -.1, 0], [0, -.1, 0], 30]],
  (t, o) => { o.fundo.rotation.z = t * .05; o.cel.visible = t < 48.98; o.cel.paint(t); o.cel.rotation.z = Math.sin(t * 2) * .03;
    const T3 = [50.30, 51.39, 52.53]; o.ic.forEach((m, i) => { m.visible = t >= 49.9 && t < 53.86 && t >= T3[i] - .05; m.scale.setScalar(Math.max(.001, pop(t, T3[i]))); });
    const it = t >= 53.86 && t < 55.33; o.esp.visible = o.gar.visible = o.gg.visible = it; o.gar.scale.setScalar(1 + .06 * Math.sin(t * 6)); o.esp.scale.setScalar(Math.max(.001, pop(t, 53.9))); o.gg.material.opacity = .6 + .3 * Math.sin(t * 5);
    o.morro.visible = t >= 55.33; o.morro.paint(+smooth(55.6, 57.2, t).toFixed(3)); }, { blur: 2, range: 6, vig: .45, bloom: .25 });

// 7. Arena: riacho e rio (57,43 – 62,25)
const a2 = cena('#4A5BA8', (c) => { arena(c); const ti = tiaguin('23'); c.add(ti.root); etiqueta(ti, 'TIAGUIN', 3, .5); const nad = [0, 1, 2, 3].map((i) => { const p = pessoa(i + 3, String(i + 3).padStart(2, '0')); c.add(p.root); etiqueta(p, ['MEL', 'IGOR', 'ANA', 'CAIO'][i], 3, .8, 2.3, .9); return p; }); const po = poeira(c, 60, [10, 4, 10], '#FFE2B0', 3, [5, 1, 0]); return { ti, nad, po }; },
  [[59.49, [3.2, .9, 3.4], [3.4, .85, 2.9], [4.6, .1, 0], [4.6, .1, 0], 38],
   [61.69, [8.8, 1.2, 6.0], [8.6, 1.1, 5.4], [6, -.6, 0], [6, -.6, -.5], 40],
   [62.25, [3.6, 1.4, 3.1], [3.6, 1.4, 2.8], [4.0, 1.0, 0], [4.0, 1.0, 0], 34]],
  (t, o, s) => { const { ti } = o; const bebe = t < 59.49; const tx = bebe ? 4.4 : 3.9, tz = 0; ti.root.position.set(tx, chaoY(tx, tz), tz); ti.face(s.camera);
    if (bebe) { ti.expr('feliz'); sentar(ti, 1, false); ti.pose({ armL: [40, 120], armR: [40, 120], legL: [82, -150], legR: [82, -150], lean: 8 }); ti.body.position.y = -.5; ti.setTag('TIAGUIN', 3, t > 58.6 ? .65 : .5); }
    else { ti.body.position.y = 0; ti.expr(t < 61.69 ? 'pensando' : 'esperto'); ti.pose({ armR: t > 61.69 ? [60, 60] : [6, 4], head: t > 61.69 ? Math.sin(t * 14) * 8 : 0 }); }
    o.nad.forEach((p, i) => { const z = -4 + i * 2.2 + Math.sin(t * .7 + i) * .3, x = 6 + (i % 2 ? .4 : -.4) + (t - 59.49) * .25; p.root.position.set(x, -1.45, z); p.face(s.camera); p.pose({ armL: [150 + Math.sin(t * 7 + i) * 30, 20], armR: [150 - Math.sin(t * 7 + i) * 30, 20] }); p.expr(i % 2 ? 'susto' : 'dor'); p.root.visible = t >= 59.49 && t < 61.69; });
    o.po.anima(t); });

// 8. Raios: a água rouba calor (62,25 – 65,83)
const r2 = cena('#1E3A6A', (c) => { const fundo = fundoRaios(c, '#1E3A6A', '#2C5A8C'); const ar = tela(1.6, 3.0, 300, 560, desenhaTermo), ag = tela(1.6, 3.0, 300, 560, desenhaTermo); ar.position.set(-1.0, .2, .1); ag.position.set(1.0, .2, .1); c.add(ar, ag); return { fundo, ar, ag }; },
  [[65.83, [0, .2, 9.6], [0, .2, 8.8], [0, .2, 0], [0, .2, 0], 32]],
  (t, o) => { o.fundo.rotation.z = -t * .05; const k = smooth(62.8, 65.0, t); o.ar.paint('AR', +(1 - .03 * k).toFixed(3), '#FF8A5C'); o.ag.paint('ÁGUA', +(1 - .75 * k).toFixed(3), k > .5 ? '#5FC8FF' : '#FF8A5C'); }, { blur: 2, range: 6, vig: .45, bloom: .25 });

// 9. Noite: fogueiras (65,83 – 76,97)
const FOG = [[2.5, -4], [-3, 6], [10.5, -2], [-1, -11], [11, 7]]; const GF = chaoY(2.5, -4);
const n1 = cena('#070B1E', (c) => { arena(c, { hora: 'noite' }); const fs = FOG.map(([x, z]) => fogueira(c, x, z, 1)); const ps = FOG.map(([x, z], i) => { const p = pessoa(i + 1, String(i + 2).padStart(2, '0')); p.place(x + .9, z + .4, chaoY(x + .9, z + .4)); c.add(p.root); return p; });
    const ms = FOG.map(([x, z]) => { const m = mira(2.6); m.position.set(x, chaoY(x, z) + 1.2, z); c.add(m); return m; });
    const ti = tiaguin('23'); const tx = 1.5, tz = 4; ti.root.position.set(tx, chaoY(tx, tz), tz); c.add(ti.root); [[-.7, .1], [.7, .2], [0, -.5]].forEach(([a, b]) => { const r = new THREE.Mesh(new THREE.DodecahedronGeometry(.55, 0), new THREE.MeshStandardMaterial({ color: '#3A3E4A', flatShading: true })); r.position.set(tx + a, chaoY(tx + a, tz + b) + .2, tz + b); c.add(r); });
    const lua = new THREE.PointLight('#7E9CE0', 3, 6, 1.5); lua.position.set(tx + 1, 2.5, tz + 2); c.add(lua); return { fs, ps, ms, ti, fogN: c.fog }; },
  [[67.54, [3, 9, 24], [3, 8.4, 21], [4, 0, -1], [4, 0, -1], 40],
   [68.77, [4.0, GF + 1.1, -1.6], [3.8, GF + 1.0, -2.0], [2.5, GF + .6, -4], [2.5, GF + .6, -4], 36],
   [73.07, [30, GF + 4, 70], [29, GF + 4, 67], [2.5, GF + .5, -4], [2.5, GF + .5, -4], 30],
   [75.01, [4, 28, 8], [4, 26, 6], [4, 0, -1], [4, 0, -1], 44],
   [76.97, [3.0, GF + 1.6, 7.4], [2.8, GF + 1.5, 6.8], [1.5, GF + .5, 4], [1.5, GF + .5, 4], 36]],
  (t, o, s) => { const T0 = [66.4, 66.6, 66.8, 67.0, 67.2]; o.fs.forEach((f, i) => f.anima(t, smooth(T0[i], T0[i] + .4, t))); o.ps.forEach((p) => { p.face(s.camera); sentar(p, 1); p.expr('sorriso'); p.root.visible = t < 73.07 || t >= 75.01; });
    o.ms.forEach((m, i) => { const k = smooth(73.4 + i * .18, 73.6 + i * .18, t); m.visible = t >= 73.07 && t < 75.01 && k > 0; m.scale.setScalar(lerp(5, 2.6, k)); m.material.rotation = t * .8; m.material.opacity = k; });
    const { ti } = o; ti.face(s.camera); sentar(ti, 1, false); ti.pose({ legL: [82, -150], legR: [82, -150], armL: [12, 140], armR: [12, 140], head: 12 }); ti.body.position.y = -.55; ti.expr('dormindo'); ti.root.visible = t >= 75.01;
    const longe = t >= 68.77 && t < 73.07; s.scene.fog = longe ? null : o.fogN; o.fs.forEach((f, i) => { if (longe && i) f.visible = false; }); o.ps.forEach((p) => { if (longe) p.root.visible = false; }); return { exposure: longe ? .8 : t >= 75.01 ? .75 : 1.05, bloom: longe ? 1.4 : .6, bloomT: longe ? .4 : .7, blur: longe ? 0 : 15, tint: '#C8D4FF' }; });

// 10. Zona (76,97 – 103,69) e final (110,42 – fim)
const PT = [-.85, 1.0], PN = [.95, .85];
function montaZona(c) { arena(c, { hora: 'zona' }); const z = zona(c, 10); z.material.opacity = .75; const ti = tiaguin('23'); c.add(ti.root); etiqueta(ti, 'TIAGUIN', 3, .12); const ni = nina(); c.add(ni.root); etiqueta(ni, 'NINA', 4, .1);
  const galho = new THREE.Group(); const gm = new THREE.Mesh(new THREE.CylinderGeometry(.025, .04, .9, 6), new THREE.MeshStandardMaterial({ color: '#6A4A30', flatShading: true })); gm.position.y = .4; galho.add(gm); galho.position.set(0, -128 / 420, .02); ni.arms.L.f.add(galho);
  const ceuP = tela(5, 3.2, 1024, 655, desenhaCeu); ceuP.position.set(0, 8, -10); c.add(ceuP); const gl = glowSprite('#7FD8FF', 10, .12); gl.position.set(0, 8, -10.2); c.add(gl); const po = poeira(c, 70, [10, 5, 10], '#BFEFFF', 9, [0, 2, 0]); return { z, ti, ni, galho, ceuP, gl, po }; }
function animaZona(t, o, s) { const { z, ti, ni, galho, ceuP, gl, po } = o; po.anima(t); z.material.opacity = s.camera.position.y > 15 ? .8 : .22;
  const raio = lerp(10, 4.2, smooth(77.9, 99.6, Math.min(t, 99.6))); z.raio(raio, Math.min(t, 99.6));
  ti.root.position.set(PT[0], chaoY(...PT), PT[1]); ni.root.position.set(PN[0], chaoY(...PN), PN[1]); ti.face(s.camera); ni.face(s.camera);
  const kt = smooth(94.44, 94.95, t), kn = smooth(95.9, 96.5, t);
  if (kt > 0) sentar(ti, kt); else ti.pose({ armL: [14, 10], armR: [14, 10], head: t > 88.27 && t < 91.59 ? 10 : 0, lean: Math.sin(t * 2) * 1.5 });
  ti.expr(t < 87.27 ? 'dor' : t < 93.4 ? 'pensando' : t < 96.8 ? 'ideia' : 'sorriso');
  const sobe = smooth(87.4, 88.1, t) * (1 - smooth(95.4, 95.8, t)); if (kn > 0) sentar(ni, kn); else ni.pose({ armL: [lerp(30, 160, sobe), lerp(70, 10, sobe)], armR: [14, 10] }); galho.visible = t < 95.8;
  ni.expr(t < 95.3 ? 'bravo' : t < 96.4 ? 'pensando' : 'sorriso');
  if (t < 96.79) ceuP.paint('regra', t > 90.8 ? 1 : +smooth(90.3, 90.8, t).toFixed(2)); else if (t < 100.11) ceuP.paint('zero'); else ceuP.paint('erro', Math.round(Math.sin(t * 37) * (Math.sin(t * 5) > .3 ? 30 : 4)));
  gl.material.color.set(t >= 100.11 ? '#FF4B42' : '#7FD8FF');
  const glitch = (t > 98.25 && t < 98.7) || (t > 100.11 && Math.sin(t * 9) > .85); const kz = t > 99.17 && t < 100.11;
  return { tint: t >= 100.11 ? '#FFD6D2' : '#ffffff', sat: kz ? .4 : 1, flash: glitch ? .12 : 0, exposure: kz ? .9 : 1 }; }
const zn = cena('#3B4A8A', montaZona,
  [[80.84, [0, 26, 22], [0, 22, 18], [0, 0, 0], [0, 0, 0], 44],
   [84.78, [.1, 1.4, 6.6], [.1, 1.35, 5.8], [0, 1.15, .9], [0, 1.15, .9], 36],
   [86.30, [1.1, 1.75, 3.4], [1.05, 1.72, 3.0], [.95, 1.62, .85], [.95, 1.62, .85], 30],
   [87.27, [-.75, 1.75, 3.5], [-.8, 1.72, 3.1], [-.85, 1.62, 1.0], [-.85, 1.62, 1.0], 30],
   [88.27, [1.6, .5, 3.2], [1.55, .45, 2.9], [.95, 2.0, .85], [.95, 2.2, .85], 40],
   [89.56, [-.3, .7, 4.6], [-.3, .65, 4.2], [-.6, 5.2, -10], [-.6, 5.6, -10], 44],
   [91.59, [0, 8, 3.6], [0, 8, 2.4], [0, 8, -10], [0, 8, -10], 40],
   [94.44, [-.7, 1.72, 3.0], [-.75, 1.7, 2.7], [-.85, 1.62, 1.0], [-.85, 1.62, 1.0], 30],
   [95.08, [-.4, 1.2, 5.0], [-.4, 1.15, 4.6], [-.6, .9, 1.0], [-.6, .9, 1.0], 36],
   [96.79, [.1, 1.2, 6.8], [.1, 1.1, 6.2], [0, .8, .9], [0, .8, .9], 36],
   [99.17, [0, 8, 3.2], [0, 8, 2.4], [0, 8, -10], [0, 8, -10], 40],
   [100.11, [0, 22, 18], [0, 21.5, 17.5], [0, 0, 0], [0, 0, 0], 44],
   [103.69, [0, .9, 8], [0, 1.0, 7.2], [0, 6.2, -10], [0, 6.6, -10], 46]],
  (t, o, s) => animaZona(t, o, s));
const zf = cena('#3B4A8A', montaZona,
  [[999, [-.1, 1.05, 3.6], [-.1, 1.0, 3.2], [-.55, .95, 1.0], [-.55, .95, 1.0], 34]],
  (t, o, s) => { const r = animaZona(110, o, s); sentar(o.ti, 1); sentar(o.ni, 1); o.ti.expr(t < 111.3 ? 'sorriso' : 'esperto'); o.ni.expr('sorriso'); o.ceuP.paint('erro', 0); return { ...r, tint: '#ffffff', flash: 0 }; });

// 11. Praça final (103,69 – 110,42)
const p4 = cena('#2E2A66', (c) => { const o = montaPraca(c, { ti: false, cida: true }); o.cida.setTag('DONA CIDA', 2, .95); return o; },
  [[106.32, [2.6, 1.6, 5.6], [2.4, 1.6, 5.0], [0, 2.2, -4], [0, 2.4, -5], 40],
   [108.01, [0, 7.5, 11], [0, 7.0, 10.2], [0, 1.0, -2], [0, 1.0, -2], 44],
   [110.42, [0, 4.8, 1.2], [0, 4.8, .2], [0, 4.8, -9.4], [0, 4.8, -9.4], 36]],
  (t, o, s) => { animaPovo(o, t, s); o.cida.face(s.camera); if (t < 108.01) o.tl.tela.paint('ao_vivo', 1); else o.tl.tela.paint('pause');
    const ks = (i) => smooth(106.1 + i * .12, 106.5 + i * .12, t); o.povo.forEach((p, i) => { const k = ks(i + 1); if (k > 0) { sentar(p, k); p.expr('sorriso'); } });
    const kc = ks(0); if (kc > 0) sentar(o.cida, kc); else o.cida.pose({}); o.cida.expr(t < 105.9 ? 'susto' : 'feliz'); });

export const CENAS = [[p1, 0, 9.16], [pad, 9.16, 10.19], [casa, 10.19, 11.40], [p2, 11.40, 41.34], [portal, 41.34, 42.12], [a1, 42.12, 46.78], [r1, 46.78, 57.43], [a2, 57.43, 62.25], [r2, 62.25, 65.83], [n1, 65.83, 76.97], [zn, 76.97, 103.69], [p4, 103.69, 110.42], [zf, 110.42, 999]];
