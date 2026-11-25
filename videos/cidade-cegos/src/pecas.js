// Peças reaproveitáveis do vídeo "O topo": escadas, lajes, poeira dourada, bolhas, personagens.
import * as THREE from 'three';
import { rng, smooth, clamp, lerp } from './motor/core.js';
import { makeChar, canvasTex } from './motor/char.js';
import { box, std, cut, glowSprite, sky } from './motor/kit.js';
import { brickTex } from './motor/kit2.js';

// ---------- personagens ----------
const blondTex = (dark) => (tex) => tex('blond' + (dark ? 'D' : ''), 300, 300, (x) => {
  x.translate(150, 150); const a = dark ? '#B98A3E' : '#E8C25A', b = dark ? '#8E6326' : '#C99A33', h = dark ? '#E2BD72' : '#FFE597';
  const g = x.createLinearGradient(0, -140, 0, 0); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g;
  if (dark) x.fill(new Path2D('M-122 -10 Q-128 -128 -10 -134 Q118 -132 124 -16 Q108 -70 40 -84 Q-30 -92 -80 -62 Q-112 -40 -122 -10Z'));
  else x.fill(new Path2D('M-126 6 Q-136 -112 -40 -136 Q40 -152 104 -112 Q136 -84 128 0 Q116 -42 86 -60 L78 -28 Q58 -62 26 -70 L18 -36 Q-6 -70 -40 -70 L-48 -34 Q-70 -66 -96 -52 Q-120 -30 -126 6Z'));
  x.strokeStyle = h; x.lineWidth = 6; x.lineCap = 'round';
  [[-84, -100, -30, -122], [-20, -120, 40, -126], [56, -108, 96, -82]].forEach(([a1, b1, c1, d1]) => { x.beginPath(); x.moveTo(a1, b1); x.quadraticCurveTo((a1 + c1) / 2, b1 - 14, c1, d1); x.stroke(); });
});
const scrunchTex = (tex) => tex('scrunch', 300, 300, (x) => { x.translate(150, 150); x.fillStyle = '#F2C230'; x.beginPath(); x.ellipse(0, -150, 34, 16, 0, 0, 7); x.fill(); x.fillStyle = '#FFE07A'; x.beginPath(); x.ellipse(-8, -154, 14, 6, 0, 0, 7); x.fill(); });
export function tiaguin(older = false, glow = .16) { return makeChar({ outfit: older ? 'terno2' : 'avental', glow, hat: blondTex(older) }); }
export function sofia(older = false) { return makeChar({ outfit: older ? 'azul' : 'amarelo', hair: 'afro', hairc: '#3E2518', lash: true, hat: older ? undefined : scrunchTex }); }

// ---------- materiais ----------
const woodTex = (base = '#8A5A36', seed = 3) => { const t = canvasTex(256, 64, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 64); const R = rng(seed); for (let i = 0; i < 26; i++) { x.fillStyle = `rgba(${R() < .5 ? '255,220,170' : '30,15,5'},${R() * .16})`; x.fillRect(0, R() * 64, 256, 2 + R() * 3); } x.fillStyle = '#3A2414'; x.fillRect(0, 0, 256, 3); x.fillRect(0, 61, 256, 3); }); return t; };
const peelTex = (col, seed = 5) => canvasTex(128, 32, (x) => { x.fillStyle = col; x.fillRect(0, 0, 128, 32); const R = rng(seed); for (let i = 0; i < 14; i++) { x.fillStyle = '#B08A62'; x.fillRect(R() * 128, R() * 32, 4 + R() * 12, 2 + R() * 5); } });

/** Escada flutuante de madeira. dir = [dx,dz] por degrau; n degraus; rail = cor do corrimão. Retorna {g, topo(i)} */
export function escada(scene, { x = 0, y = 0, z = 0, n = 20, dir = [0, -.36], rise = .22, w = 1.05, rail = '#4F8A5A', seed = 1, railSide = 1, glow = 0 } = {}) {
  const g = new THREE.Group(); const wm = new THREE.MeshStandardMaterial({ map: woodTex('#8A5A36', seed), roughness: .8, emissive: '#FFB040', emissiveIntensity: glow });
  const rm = new THREE.MeshStandardMaterial({ map: peelTex(rail, seed), roughness: .7 }); const ang = Math.atan2(dir[0], dir[1]);
  const steps = [];
  for (let i = 0; i < n; i++) { const s = box(w, .1, .4, wm, x + dir[0] * i, y + rise * i, z + dir[1] * i); s.rotation.y = ang; g.add(s); steps.push(s);
    // viga de baixo (stringers)
    const st = box(.08, .26, .5, '#4A2E1C', 0, 0, 0); st.rotation.y = ang; st.position.set(x + dir[0] * i + Math.cos(ang) * w * .48 * railSide, y + rise * i - .14, z + dir[1] * i - Math.sin(ang) * w * .48 * railSide); g.add(st);
    const st2 = st.clone(); st2.position.set(x + dir[0] * i - Math.cos(ang) * w * .48 * railSide, y + rise * i - .14, z + dir[1] * i + Math.sin(ang) * w * .48 * railSide); g.add(st2);
    if (i % 2 === 0) { const post = box(.06, .9, .06, rm, x + dir[0] * i + Math.cos(ang) * w * .5 * railSide, y + rise * i + .45, z + dir[1] * i - Math.sin(ang) * w * .5 * railSide); g.add(post); } }
  // corrimão inclinado em segmentos
  for (let i = 0; i < n - 1; i++) { const a = new THREE.Vector3(x + dir[0] * i + Math.cos(ang) * w * .5 * railSide, y + rise * i + .92, z + dir[1] * i - Math.sin(ang) * w * .5 * railSide); const b = new THREE.Vector3(a.x + dir[0], a.y + rise, a.z + dir[1]); const len = a.distanceTo(b); const r = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, len, 8), rm); r.position.copy(a).add(b).multiplyScalar(.5); r.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()); r.castShadow = true; g.add(r); }
  scene.add(g);
  return { g, steps, at: (i, side = 0) => [x + dir[0] * i + Math.cos(ang) * side, y + rise * i + .05, z + dir[1] * i - Math.sin(ang) * side] };
}

/** Laje brasileira: piso de concreto, caixa d'água azul, varal, antena, plantas. */
export function laje(scene, { x = 0, z = 0, y = 0, w = 7, d = 6, seed = 1, varal = true, tank = true, deep = 3 } = {}) {
  const R = rng(seed); const g = new THREE.Group();
  const conc = canvasTex(256, 256, (c) => { c.fillStyle = '#A8A39A'; c.fillRect(0, 0, 256, 256); for (let i = 0; i < 900; i++) { c.fillStyle = `rgba(${R() < .5 ? '255,255,255' : '40,40,40'},${R() * .08})`; c.fillRect(R() * 256, R() * 256, 3, 3); } c.fillStyle = '#7d776e'; c.fillRect(0, 126, 256, 4); c.fillRect(126, 0, 4, 256); });
  conc.wrapS = conc.wrapT = THREE.RepeatWrapping; conc.repeat.set(w / 2, d / 2);
  g.add(box(w, .25, d, new THREE.MeshStandardMaterial({ map: conc, roughness: .95 }), x, y - .125, z));
  const bt = brickTex('#9A5A40', 3, 2); g.add(box(w, deep, d, new THREE.MeshStandardMaterial({ map: bt, roughness: .95 }), x, y - .25 - deep / 2, z));
  for (const [px, pd, pw, pdd] of [[0, d / 2, w, .15], [0, -d / 2, w, .15]]) g.add(box(pw, .5, pdd, '#B9B1A4', x + px, y + .25, z + pd));
  if (tank) { const tk = new THREE.Mesh(new THREE.CylinderGeometry(.62, .55, 1.0, 28), std('#2C7FC0', { roughness: .45 })); tk.position.set(x + w * .32, y + .9, z - d * .28); tk.castShadow = true; g.add(tk); const lid = new THREE.Mesh(new THREE.CylinderGeometry(.66, .66, .1, 28), std('#2670AC')); lid.position.set(tk.position.x, y + 1.45, tk.position.z); g.add(lid); g.add(box(1.3, .4, 1.3, '#9C958A', tk.position.x, y + .2, tk.position.z)); }
  if (varal) { const p1 = [x - w * .4, z + d * .1], p2 = [x + w * .05, z + d * .1]; for (const p of [p1, p2]) g.add(box(.05, 1.8, .05, '#55524C', p[0], y + .9, p[1])); g.add(box(p2[0] - p1[0], .015, .015, '#ddd', (p1[0] + p2[0]) / 2, y + 1.75, p1[1])); const cols = ['#D2483A', '#F2C14E', '#4A86C7', '#F6F2EA', '#6BAF8E'];
    for (let i = 0; i < 5; i++) { const cl = new THREE.Mesh(new THREE.PlaneGeometry(.42 + R() * .2, .55 + R() * .3), new THREE.MeshStandardMaterial({ color: cols[i], side: THREE.DoubleSide, roughness: 1 })); cl.position.set(p1[0] + .35 + i * .5, y + 1.42, p1[1]); cl.castShadow = true; g.add(cl); } }
  const ant = box(.04, 1.6, .04, '#3a3a40', x - w * .38, y + .8, z - d * .35); g.add(ant); g.add(box(.9, .03, .03, '#3a3a40', x - w * .38, y + 1.5, z - d * .35)); g.add(box(.6, .03, .03, '#3a3a40', x - w * .38, y + 1.3, z - d * .35));
  for (let i = 0; i < 3; i++) { const pot = new THREE.Mesh(new THREE.CylinderGeometry(.18, .14, .3, 14), std(['#C76B4A', '#D98A56', '#B85A3E'][i])); pot.position.set(x - w * .45 + i * .4, y + .15, z - d * .45); g.add(pot); const lf = new THREE.Mesh(new THREE.SphereGeometry(.24, 10, 8), std(['#3E8A52', '#4E9A5A', '#2F7244'][i])); lf.position.set(pot.position.x, y + .45, pot.position.z); lf.castShadow = true; g.add(lf); }
  scene.add(g); return g;
}

/** Bairro de lajes ao redor (casas simples com caixas d'água). */
export function bairro(scene, { cx = 0, cz = -20, n = 40, spread = 40, seed = 7, night = false, y = 0 } = {}) {
  const R = rng(seed); const cols = ['#E7B68A', '#D98C7A', '#9FC2B4', '#F0D58C', '#B7A6D2', '#E9E1D3', '#C97B5B', '#8FB0D6'];
  for (let i = 0; i < n; i++) { const w = 3 + R() * 3, d = 3 + R() * 3, h = 2.5 + Math.floor(R() * 3) * 2.6; const px = cx + (R() - .5) * spread * 2, pz = cz + (R() - .5) * spread; if (Math.abs(px) < 4 && pz > -6) continue;
    const col = cols[Math.floor(R() * cols.length)]; const m = new THREE.MeshStandardMaterial({ color: col, roughness: .95, emissive: night ? '#20180e' : '#000' }); const b = box(w, h, d, m, px, y + h / 2 - 6, pz); scene.add(b);
    const wins = Math.floor(h / 2.6); for (let k = 0; k < wins; k++) { const lit = night && R() < .6; const wm = new THREE.MeshStandardMaterial({ color: lit ? '#FFD38A' : '#3B4A5E', emissive: lit ? '#FFB860' : '#000', emissiveIntensity: lit ? .9 : 0 }); scene.add(box(.7, .8, .05, wm, px, y - 6 + 1.4 + k * 2.6, pz + d / 2 + .03)); }
    if (R() < .7) { const tk = new THREE.Mesh(new THREE.CylinderGeometry(.45, .4, .7, 16), std('#2C7FC0')); tk.position.set(px + (R() - .5) * w * .5, y + h - 6 + .35, pz + (R() - .5) * d * .5); scene.add(tk); } }
}

/** Poeira dourada formando um degrau: retorna função(u) */
export function poeira(scene, pos, { n = 40, t0 = 0, dur = 1, seed = 3, r = .7, size = .16, col = '#FFD27A' } = {}) {
  const R = rng(seed); const ps = []; for (let i = 0; i < n; i++) { const s = glowSprite(col, size * (.5 + R()), .9); s.userData = [R() * 6.28, R() * r + .2, R() * .8, R()]; scene.add(s); ps.push(s); }
  return (u) => { const k = clamp((u - t0) / dur); for (const s of ps) { const [a, rr, h, ph] = s.userData; const sp = (1 - k) * rr; s.position.set(pos[0] + Math.cos(a + u * 2.4 + ph) * sp * 1.4, pos[1] + h * (1 - k) * .8 + Math.sin(u * 3 + ph * 6) * .03, pos[2] + Math.sin(a + u * 2.4 + ph) * sp * .5); s.material.opacity = (k < .98 ? .9 : .9 * (1 - (k - .98) * 50)) * (u < t0 ? 0 : 1); s.visible = u >= t0 - .1 && k < 1; } };
}
/** Vaga-lumes / brilhos flutuando ao redor de um ponto (função de u). */
export function brilhos(scene, c, { n = 60, spread = [6, 4, 6], col = '#FFE2A0', size = .12, seed = 9, op = .6 } = {}) {
  const R = rng(seed); const ps = []; for (let i = 0; i < n; i++) { const s = glowSprite(col, size * (.4 + R() * 1.2), op); s.userData = [c[0] + (R() - .5) * spread[0], c[1] + (R() - .5) * spread[1], c[2] + (R() - .5) * spread[2], R() * 6.28]; scene.add(s); ps.push(s); }
  return (u) => { for (const s of ps) { const [x0, y0, z0, ph] = s.userData; s.position.set(x0 + Math.sin(u * .6 + ph) * .3, y0 + Math.sin(u * .8 + ph * 2) * .25 + u * .05, z0 + Math.cos(u * .5 + ph) * .3); s.material.opacity = op * (.6 + .4 * Math.sin(u * 2 + ph * 3)); } };
}

/** Bolha de sonho com um desenho dentro. draw(ctx, 512) desenha a cena dentro do círculo. */
export function bolha(draw, size = 2) {
  const t = canvasTex(512, 512, (x) => { x.clearRect(0, 0, 512, 512); x.save(); x.beginPath(); x.arc(256, 256, 236, 0, 7); x.clip(); draw(x, 512); const g = x.createRadialGradient(256, 256, 150, 256, 256, 240); g.addColorStop(0, '#ffffff00'); g.addColorStop(1, '#FFE6F2aa'); x.fillStyle = g; x.fillRect(0, 0, 512, 512); x.restore();
    x.strokeStyle = '#FFF4E0'; x.lineWidth = 8; x.beginPath(); x.arc(256, 256, 238, 0, 7); x.stroke(); x.fillStyle = '#ffffffcc'; x.beginPath(); x.ellipse(170, 150, 50, 22, -.6, 0, 7); x.fill(); });
  return cut(t, size, size, { blend: true, fog: false });
}
// desenhos para as bolhas
export const desCasa = (x, S) => { const g = x.createLinearGradient(0, 0, 0, S); g.addColorStop(0, '#FFC9A8'); g.addColorStop(1, '#FFE9C4'); x.fillStyle = g; x.fillRect(0, 0, S, S); x.fillStyle = '#8BC98A'; x.fillRect(0, 360, S, 160); x.fillStyle = '#F4E3C3'; x.fillRect(130, 220, 250, 160); x.fillStyle = '#D2584A'; x.beginPath(); x.moveTo(110, 230); x.lineTo(255, 120); x.lineTo(400, 230); x.fill(); x.fillStyle = '#7A4A2A'; x.fillRect(110, 300, 290, 12); for (let i = 0; i < 6; i++) x.fillRect(120 + i * 54, 300, 8, 80); x.fillStyle = '#5A8AC8'; x.fillRect(170, 240, 60, 50); x.fillRect(290, 240, 60, 50); x.strokeStyle = '#E2533F'; x.lineWidth = 7; x.beginPath(); x.moveTo(160, 320); x.quadraticCurveTo(220, 360, 280, 320); x.stroke(); x.fillStyle = '#3E8A52'; x.beginPath(); x.arc(420, 330, 40, 0, 7); x.fill(); };
export const desBonde = (x, S) => { const g = x.createLinearGradient(0, 0, 0, S); g.addColorStop(0, '#9FD0F0'); g.addColorStop(1, '#FCE6C2'); x.fillStyle = g; x.fillRect(0, 0, S, S); const cs = ['#F4F0E6', '#F2D27A', '#E9A48A', '#B8D4E8']; for (let i = 0; i < 6; i++) { x.fillStyle = cs[i % 4]; x.fillRect(i * 90 - 20, 150 - i * 6, 92, 300); x.fillStyle = '#D9643E'; x.beginPath(); x.moveTo(i * 90 - 26, 154 - i * 6); x.lineTo(i * 90 + 26, 120 - i * 6); x.lineTo(i * 90 + 78, 154 - i * 6); x.fill(); x.fillStyle = '#3F6FB0'; for (let k = 0; k < 3; k++) x.fillRect(i * 90 + 6, 190 + k * 70 - i * 6, 26, 36); } x.fillStyle = '#F2C230'; x.save(); x.translate(250, 380); x.rotate(-.12); x.fillRect(-120, -70, 240, 120); x.fillStyle = '#FFF3C8'; for (let k = 0; k < 4; k++) x.fillRect(-100 + k * 56, -50, 40, 40); x.fillStyle = '#C9361F'; x.fillRect(-120, 26, 240, 14); x.restore(); x.fillStyle = '#B9B0A2'; x.fillRect(0, 440, S, 80); };
export const desCama = (x, S, sof) => { x.fillStyle = '#FFE7C9'; x.fillRect(0, 0, S, S); x.fillStyle = '#FFF7D6'; x.fillRect(320, 60, 140, 180); x.strokeStyle = '#C9A36A'; x.lineWidth = 8; x.strokeRect(320, 60, 140, 180); x.fillStyle = '#FFD86A55'; x.beginPath(); x.moveTo(320, 240); x.lineTo(460, 240); x.lineTo(300, 500); x.lineTo(80, 500); x.fill(); x.fillStyle = '#7A4A2A'; x.fillRect(40, 250, 340, 30); x.fillStyle = '#F6F2EA'; x.fillRect(60, 280, 320, 110); x.fillStyle = '#E58A9A'; x.fillRect(60, 320, 320, 80); x.fillStyle = '#ffffff'; x.fillRect(80, 270, 90, 40); x.fillRect(250, 270, 90, 40);
  if (sof) { x.fillStyle = '#16161f'; x.beginPath(); x.arc(150, 300, 34, 0, 7); x.fill(); x.fillStyle = '#3E2518'; for (const [a, b] of [[120, 280], [150, 268], [180, 282], [128, 310], [176, 306]]) { x.beginPath(); x.arc(a, b, 20, 0, 7); x.fill(); } x.fillStyle = '#16161f'; x.beginPath(); x.arc(355, 296, 30, 0, 7); x.fill(); x.fillStyle = '#E8C25A'; x.beginPath(); x.ellipse(355, 276, 30, 12, 0, 0, 7); x.fill(); }
  x.fillStyle = '#5A5A66'; x.fillRect(400, 340, 70, 50); x.fillStyle = '#E9E4D6'; x.beginPath(); x.arc(435, 340, 26, 0, 7); x.fill(); x.strokeStyle = '#333'; x.lineWidth = 4; x.beginPath(); x.moveTo(470, 380); x.quadraticCurveTo(490, 420, 470, 450); x.stroke(); };

/** céus prontos */
export const ceuNoite = (c) => sky(c, -150, 480, 360, [[0, '#070A1E'], [.45, '#15184A'], [.75, '#3A2A62'], [1, '#6B3D6E']]);
export const ceuAmanhecer = (c) => sky(c, -150, 480, 360, [[0, '#3A4A86'], [.4, '#8A7AB8'], [.7, '#F2A27A'], [1, '#FFD49A']]);
export const ceuTarde = (c) => sky(c, -150, 480, 360, [[0, '#4F86C8'], [.5, '#8FC2E8'], [1, '#FFE2B0']]);
export const ceuSonho = (c) => sky(c, -150, 480, 360, [[0, '#B86A9C'], [.45, '#F29AB0'], [.8, '#FFD0A0'], [1, '#FFE9B8']]);
export const ceuFrio = (c) => sky(c, -150, 480, 360, [[0, '#1B2440'], [.5, '#3C4C70'], [1, '#7E8CA8']]);

/** Nuvens pintadas (recortes macios). */
export function nuvens(scene, spots, col = '#ffffff', op = .85) { const t = canvasTex(512, 256, (x) => { x.clearRect(0, 0, 512, 256); x.fillStyle = '#fff'; for (const [a, b, r] of [[140, 160, 80], [230, 120, 100], [330, 150, 90], [400, 175, 60], [80, 190, 50]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } x.fillRect(80, 170, 380, 70); });
  for (const [x, y, z, s] of spots) { const m = cut(t, s * 2, s, { blend: true, color: col }); m.material.opacity = op; m.position.set(x, y, z); scene.add(m); } }

/** Luzes padrão: hemisférica + direcional com sombra. */
export function luzes(c, { sky: sk = '#8A90D0', ground = '#2a1f28', hi = .8, key = '#FFE0B0', ki = 1.2, pos = [-8, 14, 10], area = 14 } = {}) {
  c.add(new THREE.HemisphereLight(sk, ground, hi)); const d = new THREE.DirectionalLight(key, ki); d.position.set(...pos); d.castShadow = true; d.shadow.mapSize.set(2048, 2048); Object.assign(d.shadow.camera, { left: -area, right: area, top: area, bottom: -area, far: 80 }); d.shadow.bias = -.0008; c.add(d); return d;
}

/** Celular com tela pintada (para close). */
export function telaChat(x, { titulo = 'Sofia', linhas = [], rodape = '' } = {}) { x.fillStyle = '#EDE6DA'; x.fillRect(0, 0, 540, 1110); x.fillStyle = '#2F6D63'; x.fillRect(0, 0, 540, 150); x.fillStyle = '#fff'; x.font = '700 44px Inter'; x.textAlign = 'left'; x.fillText(titulo, 120, 96); x.fillStyle = '#3E2518'; x.beginPath(); x.arc(64, 82, 36, 0, 7); x.fill();
  let y = 230; for (const [txt, mine, data] of linhas) { if (data) { x.fillStyle = '#d8d0c2'; x.beginPath(); x.roundRect(170, y - 34, 200, 46, 20); x.fill(); x.fillStyle = '#555'; x.font = '600 26px Inter'; x.textAlign = 'center'; x.fillText(data, 270, y - 3); y += 70; continue; } x.font = '600 30px Inter'; const w = Math.min(380, x.measureText(txt).width + 50); x.fillStyle = mine ? '#CDEFD9' : '#FFFFFF'; x.beginPath(); x.roundRect(mine ? 510 - w : 30, y - 40, w, 66, 22); x.fill(); x.fillStyle = '#222'; x.textAlign = 'left'; x.fillText(txt, (mine ? 510 - w : 30) + 25, y + 3); y += 92; }
  if (rodape) { x.fillStyle = '#fff'; x.fillRect(0, 1010, 540, 100); x.fillStyle = '#999'; x.font = '600 28px Inter'; x.textAlign = 'left'; x.fillText(rodape, 40, 1068); } }

/** Pintura de Lisboa (dia ou noite): colinas de casas com telhados laranja, castelo, rio, ponte vermelha. */
export function lisboaTex(night) { return canvasTex(2048, 1024, (x) => { const R = rng(21);
  const g = x.createLinearGradient(0, 0, 0, 1024); if (night) { g.addColorStop(0, '#0B0F2A'); g.addColorStop(.55, '#26235A'); g.addColorStop(.75, '#4A2E5E'); } else { g.addColorStop(0, '#7FB2E0'); g.addColorStop(.7, '#FCE0B8'); } x.fillStyle = g; x.fillRect(0, 0, 2048, 1024);
  // rio
  x.fillStyle = night ? '#141A3A' : '#6E9CC0'; x.fillRect(0, 820, 2048, 204); if (night) for (let i = 0; i < 160; i++) { x.fillStyle = `rgba(255,${190 + R() * 50},120,${R() * .5})`; x.fillRect(R() * 2048, 830 + R() * 190, 20 + R() * 60, 3); }
  // ponte
  x.strokeStyle = night ? '#B8443A' : '#C9452F'; x.lineWidth = 10; x.beginPath(); x.moveTo(1500, 800); x.lineTo(2048, 790); x.stroke(); for (const px of [1640, 1900]) { x.fillStyle = x.strokeStyle; x.fillRect(px - 8, 640, 16, 170); x.lineWidth = 3; x.beginPath(); x.moveTo(px, 640); x.quadraticCurveTo(px + 130, 760, px + 260, 640); x.stroke(); x.beginPath(); x.moveTo(px, 640); x.quadraticCurveTo(px - 130, 760, px - 260, 640); x.stroke(); }
  // colinas com casas
  const hill = (cx, top, w) => { for (let i = 0; i < 260; i++) { const a = (R() - .5) * w, yy = top + Math.abs(a) / w * 300 + R() * 360; if (yy > 830) continue; const hw = 26 + R() * 30, hh = 30 + R() * 34; const cols = night ? ['#2E2A4A', '#3A3456', '#45405F'] : ['#F4EFE4', '#F2D27A', '#E9A48A', '#B8D4E8', '#F6E6C8']; x.fillStyle = cols[Math.floor(R() * cols.length)]; x.fillRect(cx + a, yy, hw, hh); x.fillStyle = night ? '#5A2E2A' : '#D9643E'; x.fillRect(cx + a - 2, yy - 8, hw + 4, 10); if (night && R() < .7) { x.fillStyle = R() < .8 ? '#FFC870' : '#FFE6B0'; x.fillRect(cx + a + 6, yy + 10, 7, 9); if (R() < .5) x.fillRect(cx + a + 16, yy + 10, 7, 9); } } };
  hill(520, 300, 900); hill(1350, 420, 1000); hill(150, 480, 500);
  // castelo no alto
  x.fillStyle = night ? '#C9A86A' : '#D8C49A'; x.fillRect(420, 260, 220, 60); for (let i = 0; i < 9; i++) x.fillRect(420 + i * 26, 244, 14, 18); x.fillRect(450, 220, 40, 50); x.fillRect(570, 226, 40, 44);
  if (night) { const gl = x.createRadialGradient(530, 280, 10, 530, 280, 220); gl.addColorStop(0, '#FFD08A66'); gl.addColorStop(1, '#FFD08A00'); x.fillStyle = gl; x.fillRect(300, 120, 460, 320); }
}); }

/** Fachada de azulejo com janelas e varanda (caixa com textura). */
export function azulejoTex(col, seed, night) { return canvasTex(512, 768, (x) => { const R = rng(seed); x.fillStyle = col; x.fillRect(0, 0, 512, 768); x.strokeStyle = '#ffffff33'; x.lineWidth = 1; for (let i = 0; i < 512; i += 16) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 768); x.stroke(); } for (let j = 0; j < 768; j += 16) { x.beginPath(); x.moveTo(0, j); x.lineTo(512, j); x.stroke(); } x.fillStyle = '#ffffff22'; for (let i = 0; i < 512; i += 32) for (let j = 0; j < 768; j += 32) { x.beginPath(); x.arc(i + 8, j + 8, 4, 0, 7); x.fill(); }
  for (let f = 0; f < 3; f++) for (let k = 0; k < 2; k++) { const wx = 90 + k * 230, wy = 90 + f * 230; x.fillStyle = '#F4EFE4'; x.fillRect(wx - 12, wy - 12, 124, 164); const lit = night && R() < .7; x.fillStyle = lit ? '#FFC870' : '#2F4A66'; x.fillRect(wx, wy, 100, 140); x.fillStyle = '#F4EFE4'; x.fillRect(wx + 47, wy, 6, 140); x.fillStyle = '#3A3A44'; x.fillRect(wx - 16, wy + 130, 132, 8); for (let b = 0; b < 8; b++) x.fillRect(wx - 12 + b * 17, wy + 100, 3, 32); if (R() < .5) { x.fillStyle = ['#D2483A', '#4A86C7', '#F6F2EA', '#F2C14E'][Math.floor(R() * 4)]; x.fillRect(wx + 10, wy + 104, 30, 28); } if (R() < .5) { x.fillStyle = '#D2483A'; x.beginPath(); x.arc(wx + 80, wy + 96, 10, 0, 7); x.fill(); x.fillStyle = '#3E8A52'; x.fillRect(wx + 66, wy + 100, 28, 8); } }
  x.fillStyle = '#D9643E'; x.fillRect(0, 0, 512, 18); }); }

/** Rua-escadaria de Lisboa, subindo em -z. Retorna {degrau(i): [x,y,z]} */
export function lisboaRua(c, { night = false, n = 26 } = {}) { const R = rng(31); const stone = canvasTex(256, 128, (x) => { x.fillStyle = '#C9C0B0'; x.fillRect(0, 0, 256, 128); for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(${R() < .5 ? '255,255,255' : '60,50,40'},${R() * .15})`; x.beginPath(); x.arc(R() * 256, R() * 128, 6 + R() * 8, 0, 7); x.fill(); } x.fillStyle = '#8E8576'; x.fillRect(0, 0, 256, 6); });
  const sm = new THREE.MeshStandardMaterial({ map: stone, roughness: .9 }); const rise = .18, run = .55;
  for (let i = 0; i < n; i++) c.add(box(3.2, rise * (i + 1), run, sm, 0, rise * (i + 1) / 2, -i * run));
  const cols = ['#2F6FA8', '#E7C35A', '#E59A86', '#7FB4A8', '#F2EDE2', '#3E8AB0', '#D98A56'];
  for (const side of [-1, 1]) { let z = 1.5, k = 0; while (z > -n * run - 4) { const d = 3 + R() * 2.5, h = 9 + R() * 4; const yb = Math.max(0, (-z / run) * rise) - 1; const m = new THREE.MeshStandardMaterial({ map: azulejoTex(cols[Math.floor(R() * cols.length)], 40 + k + (side > 0 ? 50 : 0), night), roughness: .85, emissive: night ? '#ffffff' : '#000', emissiveIntensity: night ? .06 : 0 }); const b = new THREE.Mesh(new THREE.BoxGeometry(2.5, h, d), [m, m, std('#7a4030'), m, m, m]); b.position.set(side * 2.95, yb + h / 2, z - d / 2); b.castShadow = b.receiveShadow = true; c.add(b); const telh = box(2.7, .25, d + .2, '#C9552F', side * 2.95, yb + h + .12, z - d / 2); c.add(telh); z -= d + .05; k++; } }
  for (let i = 0; i < n; i += 6) { const y = (i + 1) * rise; c.add(box(.08, 2.8, .08, '#1c1c22', 1.4, y + 1.4, -i * run)); const head = box(.24, .32, .24, new THREE.MeshStandardMaterial({ color: '#FFE2AC', emissive: '#FFD089', emissiveIntensity: night ? 2.2 : .3 }), 1.4, y + 2.9, -i * run); c.add(head); if (night) { const pl = new THREE.PointLight('#FFC688', 4, 8, 1.6); pl.position.set(1.4, y + 2.7, -i * run); c.add(pl); } }
  // vasos de gerânio no primeiro plano
  return { degrau: (i, x = 0) => [x, rise * (i + 1), -i * run] };
}

/** Bondinho amarelo (caixa com janelas). */
export function bonde() { const g = new THREE.Group(); const t = canvasTex(512, 256, (x) => { x.fillStyle = '#F2C230'; x.fillRect(0, 0, 512, 256); x.fillStyle = '#F6F2EA'; x.fillRect(0, 0, 512, 40); x.fillStyle = '#2F4A66'; for (let i = 0; i < 6; i++) x.fillRect(20 + i * 82, 60, 64, 80); x.fillStyle = '#C9361F'; x.fillRect(0, 190, 512, 24); x.fillStyle = '#1c1c22'; x.font = '700 40px Inter'; x.fillText('28', 220, 30); }); const m = new THREE.MeshStandardMaterial({ map: t, roughness: .6 }); g.add(box(4.2, 2.3, 1.9, m, 0, 1.45, 0)); g.add(box(4.0, .3, 1.7, '#F6F2EA', 0, 2.7, 0)); g.add(box(4.4, .3, 1.6, '#2a2a30', 0, .3, 0)); return g; }
