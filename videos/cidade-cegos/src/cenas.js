// Nesta cidade, todo mundo é cego: cenas (voz a 1,15x, 116 s, ~47 trocas de imagem)
import * as THREE from 'three';
import { makeShot, smooth, lerp, clamp, rng } from './motor/core.js';
import { canvasTex } from './motor/char.js';
import { box, std, cut, glowSprite, street, building, tree } from './motor/kit.js';
import { crowd, saucer, uT } from './motor/kit2.js';
import { cameraCortes } from './cortes.js';
import { bairro } from './pecas.js';
import { tiaguin, bento, vizinho, cego, pijama, galinhaTex, notaTex, sinoTex, discoGiz, patoNuvemTex, placaTex, pipocaTex, diaClaro, praca, caixaDagua } from './rp.js';

const FX = (st) => ({ bloom: .3, bloomT: .9, vig: .38, exposure: 1.03, ...st });
/** Afasta a câmera nos planos fechados até uma distância mínima do alvo (closes não colam no rosto). */
function afastar(P, H = 2.0, fovBase = 38) { const ab = (p, a, fov) => { const min = (H / 2) / Math.tan((fov || fovBase) * Math.PI / 360); const d = Math.hypot(p[0] - a[0], p[1] - a[1], p[2] - a[2]); if (d >= min) return p; const k = min / Math.max(d, 1e-3); return [a[0] + (p[0] - a[0]) * k, a[1] + (p[1] - a[1]) * k, a[2] + (p[2] - a[2]) * k]; }; return P.map(([f, p0, p1, a0, a1, fov]) => [f, ab(p0, a0, fov), ab(p1, a1, fov), a0, a1, fov]); }

/** Praça: palco de quase tudo. cb(u, o) posiciona e anima; planos = cortes de câmera. */
function cenaPraca(cb, planos, { festa = false, disco = false, multidao = 0 } = {}) { const PL = afastar(planos); return (t0, t1) => {
  const s = makeShot(t0, t1, '#9FD2F2', 38), c = s.scene; diaClaro(c); praca(c, { festa });
  const ti = tiaguin(); ti.tint('#FFF6EA'); c.add(ti.root); const be = bento(); be.tint('#FFF6EA'); c.add(be.root);
  const cs = Array.from({ length: 6 }, (_, i) => { const p = cego(i); p.tint('#FFF6EA'); c.add(p.root); return p; });
  const gal = cut(galinhaTex, .34, .5); c.add(gal); const bola = new THREE.Mesh(new THREE.SphereGeometry(.08, 16, 12), std('#E2533F', { roughness: .4 })); bola.castShadow = true; c.add(bola);
  const giz = new THREE.Mesh(new THREE.PlaneGeometry(1.15, .58), new THREE.MeshBasicMaterial({ map: discoGiz, transparent: true, depthWrite: false })); giz.rotation.x = -Math.PI / 2; giz.position.set(-.2, .015, .6); c.add(giz);
  const ufo = disco ? saucer() : null; if (ufo) { ufo.scale.setScalar(.6); c.add(ufo); }
  if (multidao) { const R = rng(4), sp = []; for (let i = 0; i < multidao; i++) sp.push([(R() - .5) * 12, -3 - R() * 6, 0, 0]); crowd(c, sp, { raised: .4, jump: .12, tint: '#FFF0E0' }); }
  s.update = (t, u) => { const cam = s.camera; uT.value = t; const o = { ti, be, cs, gal, bola, giz, ufo, t };
    cs.forEach((p, i) => { const R = rng(i + 3); p.place(-5 + i * 2 + Math.sin(t * .3 + i) * .6, -4.5 - R() * 3, 0); p.walk(t + i, .5, .5); p.eye(['open', 'happy', 'look', 'open', 'lookl', 'happy'][i]); }); gal.visible = false; bola.visible = false; giz.visible = false;
    const st = cb(u, o) || {}; const pl = cameraCortes(cam, u, PL); [ti, be, ...cs].forEach((p) => p.face(cam)); gal.lookAt(cam.position);
    return FX({ focus: st.focus ?? pl.dist, range: st.range ?? 1.6, blur: 14, ...st.fx }); };
  return s; }; }

/** Rua: semáforo que canta, padaria com sino, gente de pijama, vizinho de chinelo de pato. */
function cenaRua(cb, planos) { planos = afastar(planos); return (t0, t1) => {
  const s = makeShot(t0, t1, '#9FD2F2', 38), c = s.scene; diaClaro(c); street(c, false);
  const cores = ['#E59A86', '#F2D27A', '#9FC2B4', '#B7A6D2', '#E7B68A', '#8FB0D6'];
  let z = 2, i = 0; while (z > -60) { const d = 6 + (i * 3 % 4); c.add(building(70 + i, { x: 9, z: z - d / 2, w: 7, d, floors: 2 + i % 2, side: -1, night: false, col: cores[i % 6], shop: i === 0 ? { name: 'PADARIA', bg: '#B23C33', fg: '#FFF2D8', awning: '#F2C14E' } : undefined })); c.add(building(90 + i, { x: -9, z: z - d / 2, w: 7, d, floors: 2 + (i + 1) % 2, side: 1, night: false, col: cores[(i + 3) % 6] })); z -= d; i++; }
  for (let k = 0; k < 5; k++) tree(c, -5.2, -6 - k * 11, 1.0, undefined, k);
  const sem = new THREE.Group(); sem.add(box(.12, 3.2, .12, std('#2a2a30'), 0, 1.6, 0)); sem.add(box(.5, 1.3, .4, std('#1E1E24'), 0, 3.3, 0)); const luzes = ['#E2342F', '#F2C230', '#3FCF6A'].map((k, j) => { const m = new THREE.Mesh(new THREE.CircleGeometry(.14, 20), new THREE.MeshBasicMaterial({ color: k })); m.position.set(0, 3.7 - j * .4, .21); sem.add(m); return m; }); sem.add(box(.3, .3, .2, std('#F2C14E'), .3, 2.3, 0)); sem.position.set(-4.1, .14, -2); c.add(sem);
  const notas = []; for (let k = 0; k < 10; k++) { const n = cut(notaTex, .3, .3, { blend: true }); c.add(n); notas.push(n); }
  const sino = cut(sinoTex, .5, .5); sino.position.set(5.1, 2.9, -4.2); c.add(sino);
  const pj = Array.from({ length: 5 }, (_, k) => { const p = pijama(k); p.tint('#FFF6EA'); c.add(p.root); return p; });
  const cs = Array.from({ length: 3 }, (_, k) => { const p = cego(k + 2); p.tint('#FFF6EA'); c.add(p.root); return p; });
  const vz = vizinho(); vz.tint('#FFF6EA'); c.add(vz.root);
  s.update = (t, u) => { const cam = s.camera; const o = { pj, cs, vz, t, sinoEm: 99 };
    cb(u, o);
    notas.forEach((n, k) => { const ph = (u * .6 + k / 10) % 1; n.position.set(-4.1 + Math.sin(ph * 9 + k) * .5, 3.6 + ph * 2.2, -1.8); n.material.opacity = Math.sin(ph * Math.PI); n.lookAt(cam.position); });
    luzes.forEach((m, j) => m.material.color.set(j === 2 ? '#3FCF6A' : '#3a3a40')); sino.rotation.z = Math.sin(u * 14) * .35 * Math.max(0, 1 - Math.abs(u - o.sinoEm) / 1.5);
    const pl = cameraCortes(cam, u, planos); [...pj, ...cs, vz].forEach((p) => p.face(cam));
    return FX({ focus: pl.dist, range: 1.8, blur: 13 }); };
  return s; }; }

/** Cinema só de som. */
function cenaCinema(planos) { return (t0, t1) => {
  const s = makeShot(t0, t1, '#141022', 38), c = s.scene; c.add(new THREE.HemisphereLight('#6A64A8', '#141018', .5));
  c.add(box(16, .1, 14, std('#3A2030'), 0, -.05, -4)); c.add(box(16, 6, .2, std('#2A1A28'), 0, 3, -9));
  const tela = canvasTex(1024, 512, (x) => { x.fillStyle = '#0A0A10'; x.fillRect(0, 0, 1024, 512); x.strokeStyle = '#FFE6A0'; x.lineWidth = 10; x.fillStyle = '#FFE6A0'; x.beginPath(); x.moveTo(420, 200); x.lineTo(470, 200); x.lineTo(540, 140); x.lineTo(540, 380); x.lineTo(470, 320); x.lineTo(420, 320); x.closePath(); x.fill(); for (const r of [60, 110, 160]) { x.beginPath(); x.arc(540, 260, r, -.7, .7); x.stroke(); } });
  const tm = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), new THREE.MeshBasicMaterial({ map: tela })); tm.position.set(0, 3, -8.85); c.add(tm); const gl = new THREE.PointLight('#FFE6A0', 6, 10, 1.6); gl.position.set(0, 3, -7); c.add(gl);
  for (let r = 0; r < 4; r++) for (let k = 0; k < 7; k++) c.add(box(.8, .7, .7, std('#8A2030'), -3.6 + k * 1.2, .35 + r * .25, -2 + r * 1.3));
  const pes = Array.from({ length: 5 }, (_, i) => { const p = cego(i); p.tint('#C8C0E0'); p.place(-2.4 + i * 1.2, -2.5, .25); c.add(p.root); const pp = cut(pipocaTex, .3, .37); p.root.add(pp); pp.position.set(.2, .95, .1); return p; });
  const pops = []; for (let i = 0; i < 30; i++) { const g = glowSprite('#FFF4D6', .07, .9); c.add(g); pops.push(g); }
  s.update = (t, u) => { const cam = s.camera; pes.forEach((p, i) => { p.face(cam); p.eye(i % 2 ? 'happy' : 'open'); p.pose({ armR: [30, -80], armL: [8, 4], head: Math.sin(t * 2 + i) * 4 }); });
    pops.forEach((g, i) => { const R = rng(i + 9); const ph = (u * (.8 + R()) + R()) % 1; g.position.set(-2.4 + Math.floor(R() * 5) * 1.2 + .2, 1.6 + ph * .8 - ph * ph * .9, -2.4 + R() * .2); });
    const pl = cameraCortes(cam, u, planos); return FX({ focus: pl.dist, range: 2, blur: 14, vig: .55, bloom: .45, bloomT: .8 }); };
  return s; }; }

/** A ponte: o outro lado */
function cenaPonte(planos) { return (t0, t1) => {
  const s = makeShot(t0, t1, '#9FD2F2', 40), c = s.scene; diaClaro(c);
  const ag = new THREE.Mesh(new THREE.PlaneGeometry(80, 14), std('#5FA8D8', { roughness: .15 })); ag.rotation.x = -Math.PI / 2; ag.position.set(0, -.6, -8); c.add(ag);
  for (const z of [3, -21]) c.add(box(80, 1.2, 12, std('#8FBF6A'), 0, -.6, z));
  for (let k = 0; k < 12; k++) c.add(box(3.4, .25, 1.4, std('#8A5A36'), 0, .05 + Math.sin(k / 11 * Math.PI) * .9, -2.3 - k * 1.35)); for (const x of [-1.6, 1.6]) for (let k = 0; k < 12; k++) c.add(box(.08, .7, .08, '#5A3822', x, .4 + Math.sin(k / 11 * Math.PI) * .9, -2.3 - k * 1.35));
  const pl = cut(placaTex('OUTRO LADO →', '#B23C33'), 1.4, .55); pl.position.set(2.4, 1.9, -1.4); c.add(pl); c.add(box(.08, 1.7, .08, '#5A3822', 2.4, .85, -1.42));
  for (const [x, z] of [[-6, -1], [7, -2], [-8, -20], [6, -22]]) tree(c, x, z, 1.1, undefined, x);
  const ex = cego(1); ex.tint('#FFF6EA'); c.add(ex.root); const mala = box(.4, .3, .18, std('#3A4A6A'), 0, 0, 0); c.add(mala);
  s.update = (t, u) => { const cam = s.camera; const k = clamp(u / 3.9); const i = Math.min(11, k * 13); const y = .2 + Math.sin(Math.min(1, i / 11) * Math.PI) * .9; ex.place(0, -2.3 - i * 1.35, y); ex.walk(t, .8, .7); ex.face(cam); ex.eye('happy'); ex.pose({ armR: [150 + Math.sin(t * 9) * 12, 20] }); mala.position.set(-.35, y + .3, -2.3 - i * 1.35);
    pl.lookAt(cam.position.x, pl.position.y, cam.position.z); const p = cameraCortes(cam, u, planos); return FX({ focus: p.dist, range: 3, blur: 12 }); };
  return s; }; }

/** Caixa d'água ao pôr do sol (+ casinha do vizinho em x=30) */
function cenaCaixa(cb, planos) { planos = afastar(planos); return (t0, t1) => {
  const s = makeShot(t0, t1, '#F6A65A', 38), c = s.scene; diaClaro(c, { tarde: true }); caixaDagua(c); bairro(c, { cz: -24, n: 70, spread: 50, seed: 8, y: -2 });
  const nuvem = cut(patoNuvemTex, 7, 4.4, { blend: true, fog: false }); nuvem.position.set(-2, 11, -40); c.add(nuvem); const sol = glowSprite('#FFD08A', 16, .8); sol.position.set(3, 5, -60); c.add(sol);
  const ti = tiaguin(); ti.tint('#FFE0C8'); c.add(ti.root); const be = bento(); be.tint('#FFE0C8'); c.add(be.root);
  c.add(box(6, 4, .3, std('#9FC2B4'), 30, 2, -2)); c.add(box(1.2, 2.2, .1, std('#7A4E30'), 30, 1.1, -1.84)); c.add(box(8, .1, 6, std('#C9C0B0'), 30, -.05, 0)); const vz = vizinho(); vz.tint('#FFE0C8'); vz.place(30.4, -1.2, 0); c.add(vz.root);
  s.update = (t, u) => { const cam = s.camera; cb(u, { ti, be, vz, t }); const pl = cameraCortes(cam, u, planos); [ti, be, vz].forEach((p) => p.face(cam)); nuvem.lookAt(cam.position);
    return FX({ focus: pl.dist, range: 2, blur: 13, bloom: .45, bloomT: .8, tint: '#FFF0E0' }); };
  return s; }; }

// ------------------------------- roteiro (tempos absolutos) -------------------------------
const tiPose = (ti, dx = 0, dz = 0) => ti.place(0 + dx, 1.2 + dz, 0);
export const CENAS = [
  // 0 — Nesta cidade, todo mundo é cego. Menos eu. Meu nome é Tiaguin…
  [cenaPraca((u, o) => { const { ti } = o; tiPose(ti); ti.oculos(true, u > 2.06 && u < 2.71 ? .1 : 0); ti.eye(u > 2.06 && u < 2.71 ? 'look' : 'happy'); ti.pose(u > 2.71 ? { armR: [140 + Math.sin(u * 10) * 12, 20] } : {}); o.be.place(30, 30, 0); }, [
    [2.06, [3, 6.5, 13], [2, 5.4, 11], [0, 1, -5], [0, 1, -4]],
    [2.71, [.1, 1.62, 2.25], [.1, 1.62, 2.15], [0, 1.6, 1.2], [0, 1.6, 1.2], 30],
    [4.71, [-.6, 1.5, 4.4], [-.4, 1.5, 4.0], [0, 1.2, 1.2], [0, 1.2, 1.2]]]), 0, 4.71],
  // 4.71 — eu sou expulso daqui. Pra sempre. Direto pro outro lado da ponte.
  [cenaPonte([[1.54, [5, 2.2, 6], [4.6, 2.1, 5.2], [2.4, 1.6, -1.4], [2.4, 1.6, -1.4]], [3.94, [0, 2.4, 6], [0, 2.6, 4.5], [0, .8, -10], [0, .8, -12]]]), 4.71, 8.65],
  // 8.65 — Então eu finjo. Todo santo dia.
  [cenaPraca((u, o) => { const { ti } = o; tiPose(ti); const k = smooth(.2, .9, u); ti.oculos(true, lerp(-.32, 0, k)); ti.eye(u < .7 ? 'open' : 'flat'); ti.pose({ armL: [lerp(10, 120, 1 - k), -40], armR: [8, 4] }); o.be.place(30, 30, 0); }, [
    [1.03, [.1, 1.62, 2.4], [.1, 1.62, 2.25], [0, 1.6, 1.2], [0, 1.6, 1.2], 30],
    [2.16, [1.6, 1.3, 4.5], [1.2, 1.35, 4.2], [0, 1.1, 1.2], [0, 1.1, 1.2]]]), 8.65, 10.81],
  // 10.81 — som e tato; semáforo canta; padaria toca sino; correndo de pijama
  [cenaRua((u, o) => { const { pj, cs, vz } = o; o.sinoEm = 4.6; cs.forEach((p, i) => { p.place(-3.6 + i * .9, -1 - i * 2 + u * .4, .14); p.walk(o.t + i, .6, .5); p.eye('open'); }); vz.place(40, 40, 0);
    pj.forEach((p, i) => { const k = clamp((u - 6.1) / 2.1); p.place(-2 + i * .9, lerp(-14, 2, k) - i * .7, 0); p.walk(o.t * 1.6 + i, 1.4, 1); p.eye(i % 2 ? 'happy' : 'wide'); }); }, [
    [2.09, [-1.4, 1.5, 4], [-1.6, 1.5, 3.4], [-3, 1, -2], [-3, 1, -3]],
    [3.84, [-2.6, 3.4, 2.2], [-2.8, 3.6, 1.8], [-4.1, 3.6, -2], [-4.1, 3.9, -2], 32],
    [6.08, [3.2, 2.6, -1], [3.3, 2.7, -1.4], [5.1, 2.9, -4.2], [5.1, 2.9, -4.2], 30],
    [8.13, [0, 1.4, 4.2], [0, 1.4, 4.4], [0, 1.1, -4], [0, 1.1, -4]]]), 10.81, 18.94],
  // 18.94 — cinema só tem som; pipoca
  [cenaCinema([[1.69, [0, 2.2, 5], [0, 2.4, 4.2], [0, 2.6, -8], [0, 2.8, -8]], [3.69, [1.2, 1.4, .6], [1.0, 1.4, .4], [-.2, 1.1, -2.5], [-.2, 1.1, -2.5], 32]]), 18.94, 22.63],
  // 22.63 — ninguém liga pra roupa; vizinho de terno e chinelo de pato; ele está ótimo
  [cenaRua((u, o) => { const { pj, cs, vz } = o; pj.forEach((p) => p.place(40, 40, 0)); cs.forEach((p) => p.place(40, 40, 0)); vz.place(-1.6, lerp(-1, 1.6, u / 5.46), .14); if (u < 4.57) vz.walk(o.t, .8, .7); else vz.pose({ armR: [110, -30] }); vz.eye(u < 4.57 ? 'open' : 'happy'); }, [
    [3.13, [.2, 1.5, 5.2], [0, 1.5, 5.4], [-1.6, 1.1, 0], [-1.6, 1.1, .8]],
    [4.57, [-1.3, .45, 2.6], [-1.35, .4, 2.6], [-1.55, .12, 1.3], [-1.55, .12, 1.5], 30],
    [5.46, [-1.0, 1.7, 3.9], [-1.1, 1.68, 3.8], [-1.6, 1.5, 1.6], [-1.6, 1.5, 1.6], 32]]), 22.63, 28.09],
  // 28.09 — óculos escuros, bengala, bom dia pro poste; já somos amigos
  [cenaPraca((u, o) => { const { ti } = o; o.be.place(30, 30, 0); const ida = smooth(0, 1.8, u); ti.place(lerp(-1.5, -3.5, ida), lerp(.4, -2.6, ida), 0); if (u < 1.8) ti.walk(o.t, .8, .7);
    else if (u < 4.83) { ti.eye('happy'); ti.pose({ armR: [130 + Math.sin(u * 9) * 14, 20] }); } else { ti.eye('happy'); ti.pose({ armL: [60, -110], armR: [60, -110], lean: -8 }); } }, [
    [2.09, [-.4, 1.5, 3.6], [-1.6, 1.5, 2.2], [-1.5, 1.1, .4], [-3.4, 1.1, -2.4]],
    [4.83, [-1.6, 1.8, 1.6], [-1.9, 1.8, 1.4], [-3.8, 2.2, -2.9], [-3.8, 2.2, -2.9], 34],
    [6.44, [-2.6, 1.6, 1.0], [-2.7, 1.6, .8], [-3.3, 1.35, -2.6], [-3.3, 1.35, -2.6], 36],
    [8.07, [-5.4, 1.4, 0], [-5.6, 1.4, -.3], [-3.35, 1.4, -2.6], [-3.35, 1.4, -2.6], 34]]), 28.09, 36.16],
  // 36.16 — Seu Bento e os testes (careta, bolinha, giz, disco voador) e o ronco
  [cenaPraca((u, o) => { const { ti, be, gal, bola, giz, ufo } = o; tiPose(ti); ti.oculos(true); const entra = smooth(0, .9, u); be.place(lerp(4, 1.1, entra), lerp(-1, 1.2, entra), 0); if (u < .9) be.walk(o.t, .8, .7);
    be.eye(u < 6.93 ? 'smug' : u < 8.06 ? 'angry' : 'smug'); be.oculos(true, u > 6.93 && u < 8.06 ? .17 : 0);
    if (u > 2.73 && u < 4.42) be.pose({ armL: [40, -110] }); else if (u > 4.42 && u < 6.93) { be.pose({ armR: [40, -100] }); gal.visible = true; gal.position.set(1.3, 1.35 + Math.sin(u * 3) * .03, 1.35); } else if (u > 11.68 && u < 15) be.pose({ armR: [150, 0], head: 10 }); else be.pose({});
    ti.eye(u > 21.82 ? 'shut' : 'flat'); ti.pose(u > 21.82 ? { squash: .03 + Math.sin(u * 30) * .015 } : {});
    if ((u > 8.06 && u < 9.28) || (u > 17.41 && u < 18.87)) { bola.visible = true; const kk = u < 9.28 ? (u - 8.06) / 1.22 * .6 : smooth(17.41, 17.9, u); bola.position.set(lerp(1.0, .02, kk), lerp(1.3, 1.62, kk) + Math.sin(kk * 3.14) * .25, lerp(1.25, 1.35, kk)); }
    giz.visible = u > 9.28; giz.position.set(-.9, .015, 2.2); if (u > 16.33 && u < 17.41) ti.place(-.9, 2.25, 0); if (ufo) { const a = u < 16.5, k = a ? clamp((u - 11.8) / 3.6) : clamp((u - 18.87) / 2.95); ufo.position.set(lerp(-5, 5, k), a ? 5.2 : 5.8 + Math.sin(u * 3) * .3, a ? -5 : -7); ufo.rotation.y = u * 3; ufo.visible = (u > 11.8 && u < 15.4) || (u > 18.87 && u < 21.82); } }, [
    [.93, [-1.5, 1.6, 6.2], [-1.0, 1.6, 5.6], [.8, 1.1, 0], [.8, 1.1, .8]],
    [2.73, [1.4, 1.65, 3.4], [1.3, 1.65, 3.2], [1.1, 1.55, 1.2], [1.1, 1.55, 1.2], 32],
    [4.42, [1.25, 1.35, 2.2], [1.25, 1.35, 2.1], [1.15, 1.3, 1.2], [1.15, 1.3, 1.2], 28],
    [6.93, [1.45, 1.35, 2.3], [1.4, 1.35, 2.2], [1.3, 1.35, 1.35], [1.3, 1.35, 1.35], 30],
    [8.06, [1.1, 1.62, 2.4], [1.1, 1.62, 2.3], [1.1, 1.6, 1.2], [1.1, 1.6, 1.2], 30],
    [9.28, [2.2, 1.5, 4.0], [2.0, 1.5, 3.8], [.5, 1.3, 1.2], [.5, 1.3, 1.2]],
    [11.68, [-.9, 3.4, 3.6], [-.9, 3.3, 3.45], [-.9, 0, 2.2], [-.9, 0, 2.2], 34],
    [15.0, [.4, .6, 5.5], [.5, .5, 5.2], [.6, 3.2, -2], [.4, 4.4, -4]],
    [16.33, [.1, 1.62, 2.25], [.1, 1.62, 2.15], [0, 1.6, 1.2], [0, 1.6, 1.2], 30],
    [17.41, [-.5, .55, 3.6], [-.55, .5, 3.5], [-.9, .1, 2.25], [-.9, .1, 2.25], 32],
    [18.87, [.6, 1.6, 2.6], [.55, 1.6, 2.5], [0, 1.6, 1.2], [0, 1.6, 1.2], 30],
    [21.82, [0, 2.2, 9], [0, 2.4, 10], [0, 3.5, -4], [0, 4, -6]],
    [24.64, [.12, 1.62, 2.2], [.1, 1.62, 2.05], [0, 1.58, 1.2], [0, 1.58, 1.2], 30]], { disco: true }), 36.16, 60.80],
  // 60.80 — a festa: Seu Bento, a galinha dança, a gargalhada, o silêncio, "cego de tanto rir", a piscadinha
  [cenaPraca((u, o) => { const { ti, be, gal, cs } = o; ti.place(0, 1.6, 0);
    const sobe = smooth(3.41, 5.0, u); be.place(lerp(4.6, .1, sobe), lerp(-10.2, -10.7, sobe), lerp(0, .87, smooth(4.2, 4.6, u))); if (u > 3.41 && u < 5.0) be.walk(o.t, .8, .7);
    const desce = smooth(26.5, 28.2, u); if (u > 26.5) be.place(lerp(.1, .9, desce), lerp(-10.7, 1.0, desce), lerp(.87, 0, smooth(26.5, 26.9, u)));
    const dancando = (u > 7.76 && u < 12.5) || u > 34.5; gal.visible = (u > 5.37 && u < 26.6) || u > 34.5; if (u <= 26.6) gal.position.set(.75, 2.05 + .87 + (dancando ? Math.abs(Math.sin(u * 8)) * .25 : 0), -10.4); else gal.position.set(.45, 1.45 + Math.abs(Math.sin(u * 8)) * .15, 1.4); gal.rotation.z = dancando ? Math.sin(u * 10) * .5 : 0;
    be.oculos(u < 26.67, 0); if (u > 26.67 && u < 34.5) be.piscar(true); else { be.piscar(false); be.eye('happy'); }
    be.pose(u > 19.67 && u < 24.7 ? { armR: [40, -100] } : dancando && u < 26 ? { armR: [100 + Math.sin(u * 10) * 20, 0] } : u > 34.5 ? { armL: [60, -40] } : {});
    ti.oculos(u < 14.25 || u > 30.5, u > 29.3 && u < 30.5 ? .12 : 0); ti.eye(u < 10.21 ? 'flat' : u < 14.25 ? 'shut' : u < 16.45 ? 'happy' : u < 34.5 ? 'wide' : 'happy');
    if (u > 10.21 && u < 14.25) ti.pose({ squash: .04 + Math.sin(u * 40) * .02 }); else if ((u > 14.25 && u < 16.45) || u > 34.5) ti.cheer(o.t, 0, .9); else ti.pose({});
    cs.forEach((p, i) => { p.place(-2.6 + i * 1.05, -2.2 - (i % 2) * .8, 0); if (u > 24.7 && u < 26.67) p.cheer(o.t, i, 1); else p.pose({ head: u > 16.45 && u < 19.67 ? (i < 3 ? -12 : 12) : 0 }); p.eye(u > 16.45 && u < 19.67 ? 'wide' : u > 24.7 && u < 26.67 ? 'happy' : 'open'); }); },
    [
    [1.53, [0, 6, 9], [0, 5.4, 8], [0, 2, -6], [0, 2, -6.5]],
    [3.41, [8.2, 2.2, -8.6], [7.8, 2.2, -8.9], [4.5, 1.3, -10.2], [4.3, 1.35, -10.3], 36],
    [5.37, [5.6, 2.6, -5.4], [3.2, 2.8, -6.2], [2.6, 1.8, -10.4], [.5, 2.3, -10.7], 42],
    [7.76, [1.1, 2.9, -8.3], [1.05, 2.9, -8.45], [.42, 2.65, -10.6], [.42, 2.7, -10.6], 32],
    [9.03, [.6, 2.9, -8.7], [.6, 2.9, -8.8], [.5, 2.85, -10.5], [.5, 2.85, -10.5], 30],
    [10.21, [-1.8, 2.8, -4], [-1.5, 2.8, -4.4], [.2, 2.4, -10.5], [.2, 2.4, -10.5]],
    [12.49, [.1, 1.62, 2.6], [.1, 1.62, 2.4], [0, 1.6, 1.6], [0, 1.6, 1.6], 30],
    [14.25, [.12, 1.62, 2.3], [.1, 1.62, 2.18], [0, 1.6, 1.6], [0, 1.6, 1.6], 28],
    [16.45, [1.4, 1.8, 4.6], [1.7, 2.0, 5.4], [0, 1.4, 1.6], [0, 1.4, 1.2]],
    [19.67, [0, 1.6, -5.2], [0, 1.6, -5.6], [0, 1.4, 2], [0, 1.4, 2]],
    [23.3, [-1.2, 2.6, -7.2], [-1.0, 2.6, -7.6], [.1, 2.4, -10.7], [.1, 2.4, -10.7], 34],
    [24.7, [.4, 2.65, -9.1], [.35, 2.65, -9.2], [.1, 2.6, -10.7], [.1, 2.6, -10.7], 30],
    [26.67, [0, 3.5, 4], [0, 3.8, 5], [0, 1.4, -4], [0, 1.4, -5]],
    [29.3, [.95, 1.6, 2.25], [.92, 1.6, 2.15], [.9, 1.58, 1.0], [.9, 1.58, 1.0], 30],
    [30.68, [.1, 1.62, 2.7], [.1, 1.62, 2.6], [0, 1.6, 1.6], [0, 1.6, 1.6], 30],
    [34.5, [.4, 1.6, 4.0], [.5, 1.6, 3.7], [.45, 1.5, 1.3], [.45, 1.5, 1.3]],
    [36.97, [1.8, 1.7, 4.4], [1.6, 1.7, 4.0], [.45, 1.4, 1.3], [.45, 1.4, 1.3], 34]], { festa: true, multidao: 70 }), 60.80, 97.77],
  // 97.77 — o segredo, a caixa d'água, o rádio, o pôr do sol com nuvem de pato, o vizinho, o final
  [cenaCaixa((u, o) => { const { ti, be, vz } = o; ti.place(-.55, -.6, 2.3); be.place(.65, -.6, 2.3); ti.oculos(u > 11.95, u > 11.95 ? lerp(-.3, 0, smooth(11.95, 12.8, u)) : 0); be.oculos(false); be.eye('happy'); ti.eye(u < 11.95 ? 'happy' : 'smug');
    ti.pose(u > 4.58 && u < 7.12 ? { armR: [60, -30] } : u > 7.12 && u < 9.56 ? { armR: [150, 0] } : {}); be.pose(u > 4.58 && u < 7.12 ? { armL: [50, -60] } : {}); vz.eye('smug'); vz.pose({ armR: [110, -30] }); }, [
    [1.41, [5, 4.5, 9], [4, 4.2, 8], [0, 2.2, -1], [0, 2.4, -1]],
    [4.58, [.05, 3.4, 2.6], [.05, 3.35, 2.4], [.05, 3.0, -.5], [.05, 3.0, -.5]],
    [7.12, [.6, 2.75, .7], [.5, 2.75, .6], [.05, 2.45, -.2], [.05, 2.45, -.2], 30],
    [9.56, [-.4, 3.0, 3.2], [-.6, 3.2, 3.0], [-2, 9, -40], [-2, 10, -40]],
    [11.95, [30.8, 1.5, 3.4], [30.7, 1.5, 3.2], [30.4, .4, -1.2], [30.4, 1.3, -1.2], 32],
    [13.61, [-.4, 3.95, 1.4], [-.45, 3.95, 1.25], [-.55, 3.9, -.6], [-.55, 3.9, -.6], 30],
    [18.68, [3.5, 4.2, 7], [5, 5.6, 11.5], [0, 3.1, -.6], [0, 3.1, -.6]]]), 97.77, 999],
];
