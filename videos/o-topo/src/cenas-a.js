// O topo, parte A: planos 1 a 8 (0 a 58,43 s)
import * as THREE from 'three';
import { makeShot, aim, keys, smooth, lerp, clamp, rng } from './motor/core.js';
import { canvasTex } from './motor/char.js';
import { box, std, cut, glowSprite, softBlob, skyline } from './motor/kit.js';
import { phone, stars, crowd, uT } from './motor/kit2.js';
import { tiaguin, sofia, escada, laje, bairro, poeira, brilhos, bolha, desCasa, desBonde, desCama, ceuNoite, ceuAmanhecer, ceuTarde, ceuSonho, ceuFrio, nuvens, luzes, telaChat, lisboaTex } from './pecas.js';

const chamando = (x, k) => { const g = x.createLinearGradient(0, 0, 0, 1110); g.addColorStop(0, '#1F3A4A'); g.addColorStop(1, '#0E1A24'); x.fillStyle = g; x.fillRect(0, 0, 540, 1110); x.fillStyle = '#3E2518'; x.beginPath(); x.arc(270, 330, 110, 0, 7); x.fill(); x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '700 64px Inter'; x.fillText('Sofia', 270, 540); x.font = '600 36px Inter'; x.fillStyle = k ? '#FF8A80' : '#cfe'; x.fillText(k ? 'Sem resposta' : 'Chamando…', 270, 610); x.fillStyle = '#E2533F'; x.beginPath(); x.arc(270, 920, 60, 0, 7); x.fill(); };
export { chamando };

/** Topo à noite (usado no plano 1 e no 17): plataforma, escada descendo para trás, cidade lá embaixo. */
export function topoNoite(c, { lisboa = false } = {}) {
  c.fog = new THREE.FogExp2('#1A1740', .009); ceuNoite(c); stars(c, 2200, 300, 4);
  if (lisboa) { const l = cut(lisboaTex(true), 150, 75, { fog: false }); l.position.set(0, -30, -90); c.add(l); }
  else { skyline(c, -160, 420, 70, ['#1C1A3A', '#26224A', '#332C58'], true, 5, -52); bairro(c, { cz: -36, n: 80, spread: 70, night: true, y: -22, seed: 11 }); }
  luzes(c, { sky: '#5E64B8', ground: '#1a1420', hi: .7, key: '#AFB8FF', ki: .9, pos: [6, 12, 8], area: 8 });
  const wm = std('#7A4E30', { roughness: .8 }); c.add(box(3.4, .18, 2.4, wm, .8, -.09, 0)); c.add(box(3.2, .5, 2.2, std('#5A3822'), .8, -.4, 0));
  for (const x of [-.8, 2.4]) c.add(box(.1, .95, .1, '#4F8A5A', x, .47, -1.1)); c.add(box(3.3, .06, .06, '#4F8A5A', .8, .95, -1.1));
  escada(c, { x: -.4, y: -5.1, z: -8.4, n: 24, dir: [0, .3], rise: .21, rail: '#4F8A5A' });
  nuvens(c, [[-7, -6, -10, 7], [8, -7, -16, 8], [-3, -11, -24, 10], [11, -4, -38, 12], [-12, -3, -30, 10]], '#4E4E92', .6);
  const vazio = glowSprite('#FFD9A0', 1.4, .18); vazio.position.set(1.45, .55, .2); c.add(vazio); const vz = softBlob(1, .5, .25); vz.position.set(1.45, .012, .2); c.add(vz);
  const fx = brilhos(c, [0, -1, -6], { n: 40, spread: [14, 8, 8], col: '#FFD27A', size: .1, op: .35 });
  return { vazio, fx };
}

/** 1. No dia em que você realizar seu maior sonho… ninguém do outro lado */
export function s01(t0, t1) {
  const s = makeShot(t0, t1, '#0A0C22', 38), c = s.scene; const { vazio, fx } = topoNoite(c);
  const heroi = tiaguin(true, .18); heroi.place(.3, .3, 0); c.add(heroi.root); heroi.tint('#D8D6F2');
  const ph = phone((x, k) => chamando(x, k), .2, .4); c.add(ph); const pl = new THREE.PointLight('#9FD8FF', 1.4, 2.2, 1.6); c.add(pl);
  s.update = (t, u) => {
    const cam = s.camera; const K = smooth(.4, 6.8, u);
    aim(cam, [lerp(1.0, 3.4, K), lerp(1.55, 2.6, K), lerp(2.4, 8.4, K)], [lerp(.5, .3, K), lerp(1.45, .1, K), lerp(0, -3, K)], -.01);
    heroi.face(cam); heroi.eye(u < 5.0 ? 'down' : 'sad'); heroi.pose({ armR: [18, -86], armL: [6, 4], head: -4 });
    ph.position.set(.48, 1.18, .28); ph.rotation.set(-.25, -.2, 0); ph.paint(u > 4.6); pl.position.set(.5, 1.3, .5); pl.intensity = u > 4.6 ? .6 : 1.4;
    vazio.material.opacity = .1 + smooth(5.0, 6.6, u) * .3; fx(u);
    return { focus: lerp(2.2, 8.4, K), range: lerp(.9, 4, K), blur: 14, bloom: .35, bloomT: .9, vig: .55, exposure: 1.05 };
  };
  return s;
}

/** miragem do topo: porta aberta, dinheiro, chave */
const miragemTex = () => canvasTex(512, 512, (x) => { x.clearRect(0, 0, 512, 512); const g = x.createRadialGradient(256, 256, 20, 256, 256, 250); g.addColorStop(0, '#FFF3C8'); g.addColorStop(.5, '#FFD27A88'); g.addColorStop(1, '#FFD27A00'); x.fillStyle = g; x.fillRect(0, 0, 512, 512);
  x.fillStyle = '#8A5A36'; x.fillRect(196, 150, 120, 200); x.fillStyle = '#FFFBEA'; x.fillRect(208, 162, 96, 188); x.fillStyle = '#B07A4A'; x.beginPath(); x.moveTo(208, 162); x.lineTo(170, 180); x.lineTo(170, 340); x.lineTo(208, 350); x.fill();
  x.fillStyle = '#6BAF6E'; for (let i = 0; i < 4; i++) { x.fillRect(66, 300 - i * 18, 90, 16); } x.fillStyle = '#F2C230'; for (let i = 0; i < 5; i++) { x.beginPath(); x.ellipse(110 + (i % 2) * 8, 330 - i * 10, 30, 10, 0, 0, 7); x.fill(); }
  x.strokeStyle = '#F2C230'; x.lineWidth = 12; x.beginPath(); x.arc(390, 250, 26, 0, 7); x.stroke(); x.fillStyle = '#F2C230'; x.fillRect(380, 274, 20, 90); x.fillRect(400, 330, 24, 12); x.fillRect(400, 352, 18, 10); });

/** 2. Deixa eu te mostrar… imagina uma escada… liberdade, dinheiro… tem uma regra */
export function s02(t0, t1) {
  const s = makeShot(t0, t1, '#F2A27A', 40), c = s.scene; c.fog = new THREE.Fog('#F7C6A0', 30, 140); ceuAmanhecer(c);
  skyline(c, -150, 420, 80, ['#B98AA0', '#C99AA6', '#D9AAA8'], false, 7, -10); bairro(c, { cz: -24, n: 70, spread: 50, seed: 3, y: 0 });
  luzes(c, { sky: '#FFD9B8', ground: '#6A4A50', hi: .9, key: '#FFD0A0', ki: 1.5, pos: [-10, 6, -12], area: 12 });
  laje(c, { x: 0, z: 0, w: 8, d: 7, seed: 2 });
  const e = escada(c, { x: .6, y: .1, z: -1.2, n: 60, dir: [.02, -.34], rise: .25, rail: '#4F8A5A' });
  const mir = cut(miragemTex(), 9, 9, { blend: true, fog: false, add: true }); mir.position.set(1.8, 16, -22); c.add(mir); const sol = glowSprite('#FFE2A0', 14, .7); sol.position.set(1.8, 16, -22.5); c.add(sol);
  nuvens(c, [[-8, 9, -18, 6], [9, 12, -26, 8], [-4, 18, -34, 9]], '#FFE2D2', .7);
  const heroi = tiaguin(false, .14); heroi.place(-.4, 1.4, 0); c.add(heroi.root); heroi.tint('#FFE8D6');
  const gato = cut(canvasTex(128, 128, (x) => { x.clearRect(0, 0, 128, 128); x.fillStyle = '#E39B4A'; x.beginPath(); x.ellipse(64, 90, 40, 24, 0, 0, 7); x.fill(); x.beginPath(); x.arc(96, 70, 18, 0, 7); x.fill(); x.beginPath(); x.moveTo(84, 58); x.lineTo(88, 40); x.lineTo(96, 54); x.fill(); x.beginPath(); x.moveTo(100, 54); x.lineTo(108, 40); x.lineTo(110, 58); x.fill(); x.strokeStyle = '#E39B4A'; x.lineWidth = 10; x.beginPath(); x.moveTo(26, 90); x.quadraticCurveTo(6, 70, 20, 50); x.stroke(); }), .6, .6); gato.position.set(-2.6, .32, .8); c.add(gato);
  const fx = brilhos(c, [1, 8, -10], { n: 50, spread: [10, 14, 10], col: '#FFE6A8', size: .14, op: .5 });
  s.update = (t, u) => { const cam = s.camera;
    // 0-1.9 s: câmera despenca do céu até a laje; depois sobe seguindo a escada
    const D = smooth(0, 1.9, u), U = smooth(2.2, 9.2, u);
    const pos = u < 1.95 ? [lerp(2, -1.6, D), lerp(26, 1.5, D), lerp(-8, 5.2, D)] : [lerp(-1.6, -2.4, U), lerp(1.5, 2.2, U), lerp(5.2, 6.4, U)];
    const tgt = u < 1.95 ? [lerp(1.5, -.3, D), lerp(20, 1.5, D), lerp(-14, 0, D)] : [lerp(-.3, 1.4, U), lerp(1.5, 12.5, U), lerp(0, -18, U)];
    aim(cam, pos, tgt, u < 1.95 ? (1 - D) * .3 : 0);
    gato.lookAt(cam.position); heroi.face(cam); heroi.eye(u < 3.2 ? 'open' : u < 5.5 ? 'wide' : 'happy'); heroi.pose({ armL: [8, 4], armR: [lerp(8, 60, smooth(3, 4, u)), lerp(4, -20, smooth(3, 4, u))], head: 6 });
    mir.material.opacity = .4 + smooth(2.5, 5, u) * .6; sol.material.opacity = .5 + Math.sin(u * 3) * .1; fx(u);
    return { focus: u < 1.95 ? 30 : lerp(6, 18, U), range: lerp(4, 12, U), blur: u < 1.95 ? 6 : 12, bloom: .5, bloomT: .8, vig: .4, exposure: 1.02, flash: u < .25 ? (1 - u / .25) * .4 : 0 }; };
  return s;
}

/** coisas deixadas para trás */
const sombraTex = () => canvasTex(256, 256, (x) => { x.clearRect(0, 0, 256, 256); x.fillStyle = '#121220'; x.beginPath(); x.moveTo(60, 230); x.quadraticCurveTo(40, 80, 128, 60); x.quadraticCurveTo(216, 80, 196, 230); x.quadraticCurveTo(160, 210, 128, 232); x.quadraticCurveTo(96, 210, 60, 230); x.fill(); x.fillStyle = '#F6EFE6'; x.beginPath(); x.ellipse(104, 130, 16, 24, 0, 0, 7); x.ellipse(152, 130, 16, 24, 0, 0, 7); x.fill(); x.fillStyle = '#121220'; x.beginPath(); x.arc(104, 138, 7, 0, 7); x.arc(152, 138, 7, 0, 7); x.fill(); });
const balaoTex = (col) => canvasTex(128, 256, (x) => { x.clearRect(0, 0, 128, 256); x.fillStyle = col; x.beginPath(); x.ellipse(64, 70, 50, 62, 0, 0, 7); x.fill(); x.fillStyle = '#ffffff55'; x.beginPath(); x.ellipse(44, 46, 12, 20, -.4, 0, 7); x.fill(); x.strokeStyle = '#eee'; x.lineWidth = 3; x.beginPath(); x.moveTo(64, 132); x.quadraticCurveTo(80, 190, 60, 254); x.stroke(); });
const toalhaTex = () => canvasTex(128, 128, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? '#D2483A' : '#F6F2EA'; x.fillRect(i * 16, j * 16, 16, 16); } });

/** 3. Cada degrau só aparece quando você abre mão… domingos, festas, o medo */
export function s03(t0, t1) {
  const s = makeShot(t0, t1, '#8FC2E8', 38), c = s.scene; c.fog = new THREE.Fog('#CFE2F0', 20, 120); ceuTarde(c);
  bairro(c, { cz: -30, n: 60, spread: 60, seed: 5, y: -14 }); nuvens(c, [[-9, -2, -14, 7], [10, 1, -22, 8], [3, -6, -30, 9], [-12, 6, -40, 10]], '#ffffff', .85);
  luzes(c, { sky: '#CFE6FF', ground: '#806A60', hi: .95, key: '#FFF0D0', ki: 1.5, pos: [-8, 12, 10], area: 10 });
  const N = 34; const e = escada(c, { x: -3.2, y: -3.4, z: 0, n: N, dir: [.3, 0], rise: .24, rail: '#4F8A5A' });
  // degraus "ainda não existem": esconde os de cima e revela com poeira
  const hide = [24, 26, 28]; const dust = hide.map((i, k) => poeira(c, e.at(i), { t0: 1.4 + k * 2.6, dur: 1.1, seed: 4 + k }));
  // churrasco de domingo (mesa com toalha xadrez, churrasqueira, família pequena)
  const p1 = e.at(4); c.add(box(1.2, .06, .7, new THREE.MeshStandardMaterial({ map: toalhaTex() }), p1[0] - .1, p1[1] + .5, p1[2])); for (const dx of [-.5, .4]) c.add(box(.05, .5, .05, '#5C3C28', p1[0] + dx, p1[1] + .25, p1[2]));
  c.add(box(.5, .4, .3, '#2a2a30', p1[0] + .7, p1[1] + .4, p1[2] - .1)); const fogo = glowSprite('#FF8A3A', .6, .6); fogo.position.set(p1[0] + .7, p1[1] + .65, p1[2] - .1); c.add(fogo);
  crowd(c, [[p1[0] - .5, p1[2] - .45, p1[1], 0], [p1[0] + .1, p1[2] - .45, p1[1], 0], [p1[0] - .2, p1[2] - .5, p1[1], 0]], { h: .7, raised: 1, jump: .02, tint: '#E8E4F0' });
  // festa
  const p2 = e.at(9); [['#D2483A', -.2], ['#F2C230', .1], ['#4A86C7', .35], ['#E58A9A', .6]].forEach(([k, dx], i) => { const b = cut(balaoTex(k), .45, .9); b.position.set(p2[0] + dx, p2[1] + 1.1 + (i % 2) * .2, p2[2] - .1); c.add(b); });
  const chapeu = cut(canvasTex(64, 128, (x) => { x.clearRect(0, 0, 64, 128); x.fillStyle = '#7F6BC4'; x.beginPath(); x.moveTo(32, 4); x.lineTo(60, 124); x.lineTo(4, 124); x.fill(); x.fillStyle = '#F2C230'; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(20 + (i % 2) * 22, 40 + i * 18, 5, 0, 7); x.fill(); } }), .3, .6); chapeu.position.set(p2[0] - .35, p2[1] + .3, p2[2] + .1); c.add(chapeu);
  // o medo
  const p3 = e.at(15); const medo = cut(sombraTex(), .9, .9); medo.position.set(p3[0], p3[1] + .45, p3[2] + .1); c.add(medo);
  const heroi = tiaguin(false, .14); c.add(heroi.root); heroi.tint('#FFF4E6');
  s.update = (t, u) => { const cam = s.camera; const k = clamp(u / 9.6); const step = lerp(15, 27, smooth(.2, 9.4, u)); const p = e.at(step);
    heroi.place(p[0], p[2], p[1]); heroi.walk(t, .8, .7); heroi.face(cam); heroi.eye(u > 7.2 ? 'look' : 'happy');
    for (let i = 0; i < hide.length; i++) { e.steps[hide[i]].visible = u > 1.4 + i * 2.6 + .9; dust[i](u); }
    // o medo fica para trás, desbotado
    medo.position.y = p3[1] + .45 + Math.sin(u * 3) * .03; medo.lookAt(cam.position);
    aim(cam, [p[0] + 1.8, p[1] + 1.6, p[2] + 6.2], [p[0] - .6, p[1] + .3, p[2]], 0);
    return { focus: 6.4, range: 3.2, blur: 14, bloom: .3, bloomT: .9, vig: .38, exposure: 1.02 }; };
  return s;
}

/** 4. Muita gente sobe dois degraus e desiste. Você não. */
export function s04(t0, t1) {
  const s = makeShot(t0, t1, '#8FC2E8', 42), c = s.scene; c.fog = new THREE.Fog('#D6E6F2', 30, 160); ceuTarde(c);
  luzes(c, { sky: '#CFE6FF', ground: '#806A60', hi: 1, key: '#FFF0D0', ki: 1.4, pos: [-10, 18, 12], area: 26 });
  bairro(c, { cz: -34, n: 90, spread: 50, seed: 9, y: 0 });
  const gente = [];
  const spots = [[-3.2, -2, '#3F6FB0'], [-1.6, -9, '#D2483A'], [2.0, -7, '#6BAF8E'], [3.4, -1, '#E9B44C'], [-3.6, -14, '#9A6AB0'], [3.8, -13, '#D98A56']];
  spots.forEach(([x, z, k], i) => { const e = escada(c, { x, y: 1.6, z, n: 7 + i % 3, dir: [0, -.32], rise: .25, rail: k, seed: i + 2 }); const p = makeCharFor(i); p.place(...[e.at(1)[0], e.at(1)[2], e.at(1)[1]]); p.tint('#FFF4E6'); c.add(p.root); gente.push([p, e, i]); });
  // o herói: escada central muito alta, com brilho
  const eh = escada(c, { x: .2, y: 1.6, z: -4.5, n: 48, dir: [0, -.3], rise: .3, rail: '#4F8A5A', glow: .12 });
  const heroi = tiaguin(false, .2); c.add(heroi.root); heroi.tint('#FFF4E6');
  const sof = box(1.1, .45, .5, '#B23C33'); c.add(sof); const vg = box(.4, .25, .1, '#22222a'); c.add(vg);
  s.update = (t, u) => { const cam = s.camera; uT.value = t;
    gente.forEach(([p, e, i]) => { const st = lerp(2, 0, smooth(.4 + i * .15, 2.6 + i * .15, u)); const q = e.at(st); p.place(q[0], q[2], q[1]); p.walk(t + i, .7, .6); p.face(cam); p.eye(i % 2 ? 'shut' : 'flat'); });
    const [p0, e0] = gente[0]; const q0 = e0.at(lerp(2, 0, smooth(.4, 2.6, u))); sof.position.set(q0[0], q0[1] + .9, q0[2] + .2); const [p1, e1] = gente[2]; const q1 = e1.at(lerp(2, 0, smooth(.7, 2.9, u))); vg.position.set(q1[0] + .25, q1[1] + 1.0, q1[2] + .2);
    const hs = lerp(28, 32, smooth(0, 3.5, u)); const h = eh.at(hs); heroi.place(h[0], h[2], h[1]); heroi.walk(t, .8, .7); heroi.face(cam); heroi.eye(u > 2.5 ? 'smug' : 'open');
    const K = smooth(0, 3.5, u); aim(cam, [lerp(.6, .9, K), lerp(4.2, 7.5, K), lerp(13, 15.5, K)], [lerp(.2, .2, K), lerp(3.6, 7.2, K), lerp(-6, -10, K)], 0);
    return { focus: lerp(16, 20, K), range: 12, blur: 8, bloom: .3, bloomT: .9, vig: .35, exposure: 1.02 }; };
  return s;
}
import { makeChar } from './motor/char.js';
function makeCharFor(i) { const o = [['rosa', 'long', '#6B3A22'], ['laranja'], ['verde', 'bun', '#2a1a10'], ['terno'], ['roxo', 'bob', '#C99A33'], ['azul', 'afro', '#1a1008']][i % 6]; return makeChar({ outfit: o[0], hair: o[1], hairc: o[2], lash: !!o[1] }); }

/** 5. E é subindo que você conhece a Sofia… também tá tentando mudar de vida */
export function s05(t0, t1) {
  const s = makeShot(t0, t1, '#F2B27A', 38), c = s.scene; c.fog = new THREE.Fog('#F7CDA6', 18, 120); ceuSonho(c);
  luzes(c, { sky: '#FFD9B8', ground: '#6A4A50', hi: .9, key: '#FFC890', ki: 1.6, pos: [2, 6, -14], area: 10 });
  nuvens(c, [[-8, -3, -10, 7], [9, -1, -16, 8], [-3, -8, -22, 9], [12, 4, -30, 10], [-12, 5, -34, 10]], '#FFE6D6', .8);
  const eA = escada(c, { x: -.8, y: -3, z: 2, n: 30, dir: [0, -.32], rise: .24, rail: '#4F8A5A' }); const eB = escada(c, { x: .8, y: -3.4, z: 2, n: 30, dir: [0, -.32], rise: .24, rail: '#D98AA0', seed: 6 });
  const heroi = tiaguin(false, .14); c.add(heroi.root); heroi.tint('#FFE8D6'); const sf = sofia(false); c.add(sf.root); sf.tint('#FFE8D6');
  const livro = box(.36, .48, .1, '#2F5D8A'); c.add(livro); const mochila = box(.42, .5, .2, '#C9361F'); c.add(mochila);
  const fx = brilhos(c, [0, 1, -2], { n: 60, spread: [8, 6, 8], col: '#FFE2A0', size: .1, op: .5 });
  s.update = (t, u) => { const cam = s.camera; const sb = lerp(12, 16, smooth(0, 4.5, u)); const b = eB.at(sb); sf.place(b[0], b[2], b[1]); sf.walk(t, .7, .6); sf.face(cam);
    const a = eA.at(16.5); heroi.place(a[0], a[2], a[1]); heroi.face(cam);
    heroi.eye(u < 1.2 ? 'open' : u < 3.2 ? 'heart' : 'happy'); heroi.pose({ head: 8, armL: [8, 4], armR: [8, 4] }); sf.eye(u < 2.4 ? 'down' : u < 3 ? 'shut' : 'happy');
    livro.position.set(b[0] + .28, b[1] + .95, b[2] + .12); mochila.position.set(b[0] - .2, b[1] + 1.2, b[2] - .14);
    const K = smooth(0, 5.4, u); aim(cam, [lerp(1.2, -.6, K), lerp(a[1] + 1.8, a[1] + 1.6, K), lerp(a[2] + 6.6, a[2] + 6.2, K)], [0, a[1] + 1.3, a[2] - .5], 0); fx(u);
    return { focus: 6.4, range: 2.6, blur: 14, bloom: .45, bloomT: .8, vig: .4, exposure: 1.02 }; };
  return s;
}

/** 6a. Vocês sobem juntos. Um divide o lanche com o outro. */
const coxinhaTex = () => canvasTex(128, 128, (x) => { x.clearRect(0, 0, 128, 128); x.fillStyle = '#D9822E'; x.beginPath(); x.moveTo(64, 10); x.quadraticCurveTo(120, 100, 64, 118); x.quadraticCurveTo(8, 100, 64, 10); x.fill(); x.fillStyle = '#F2B05A'; x.beginPath(); x.ellipse(52, 70, 10, 24, -.3, 0, 7); x.fill(); });
export function s06a(t0, t1) {
  const s = makeShot(t0, t1, '#F2A27A', 38), c = s.scene; c.fog = new THREE.Fog('#F4B890', 16, 110); ceuAmanhecer(c);
  luzes(c, { sky: '#FFD9B8', ground: '#6A4A50', hi: .9, key: '#FFB880', ki: 1.7, pos: [-6, 5, -12], area: 8 });
  nuvens(c, [[-7, -2, -10, 7], [8, -4, -14, 8], [0, -9, -24, 12]], '#FFD8C0', .8);
  const eA = escada(c, { x: -.75, y: -3, z: 2, n: 26, dir: [0, -.32], rise: .24, rail: '#4F8A5A' }); const eB = escada(c, { x: .75, y: -3, z: 2, n: 26, dir: [0, -.32], rise: .24, rail: '#D98AA0', seed: 6, railSide: -1 });
  const heroi = tiaguin(false, .14); c.add(heroi.root); heroi.tint('#FFE0CC'); const sf = sofia(false); c.add(sf.root); sf.tint('#FFE0CC');
  const cox = cut(coxinhaTex(), .3, .3); c.add(cox); const garrafa = new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, .34, 16), std('#C9361F', { roughness: .4 })); c.add(garrafa);
  s.update = (t, u) => { const cam = s.camera; const a = eA.at(14), b = eB.at(14); heroi.place(a[0], a[2], a[1]); sf.place(b[0], b[2], b[1]);
    const pass = smooth(.6, 1.8, u); heroi.pose({ armR: [lerp(10, 58, pass), lerp(4, -30, pass)], armL: [8, 4] }); sf.pose({ armL: [lerp(10, 58, pass), lerp(4, -30, pass)], armR: [8, 4] });
    heroi.face(cam); sf.face(cam); heroi.eye(u > 1.8 ? 'happy' : 'look'); sf.eye(u > 1.8 ? 'happy' : 'lookl');
    cox.position.set(lerp(a[0] + .3, b[0] - .3, pass), a[1] + 1.05 + Math.sin(pass * 3.14) * .15, a[2] + .2); cox.lookAt(cam.position); garrafa.position.set(b[0] + .1, b[1] + .2, b[2] + .3);
    aim(cam, [lerp(-.3, .3, u / 3), a[1] + 1.45, a[2] + 5.0], [0, a[1] + 1.15, a[2]], 0);
    return { focus: 5.0, range: 1.8, blur: 16, bloom: .45, bloomT: .8, vig: .45, exposure: 1.02 }; };
  return s;
}

/** 6b. Ela fica acordada até tarde só pra conversar com você. */
const chatNoite = (x) => { x.fillStyle = '#0F1A2A'; x.fillRect(0, 0, 540, 1110); telaChat(x, { titulo: 'Tiaguin', linhas: [['e aí, dormiu?', false], ['não kkk', true], ['amanhã cedo tenho prova', true], ['fica mais um pouco', false]] }); };
export function s06b(t0, t1) {
  const s = makeShot(t0, t1, '#0A0C22', 38), c = s.scene; c.fog = new THREE.FogExp2('#141838', .014); ceuNoite(c); stars(c, 2600, 280, 9);
  luzes(c, { sky: '#4E54A8', ground: '#141020', hi: .6, key: '#AFC0FF', ki: .7, pos: [8, 14, 6], area: 8 });
  const lua = glowSprite('#E8ECFF', 9, .7); lua.position.set(-8, 14, -40); c.add(lua); const luaD = new THREE.Mesh(new THREE.CircleGeometry(2.2, 40), new THREE.MeshBasicMaterial({ color: '#F4F2E6', fog: false })); luaD.position.set(-8, 14, -40.5); c.add(luaD);
  nuvens(c, [[-7, -3, -10, 7], [8, -5, -14, 8]], '#3A3A7A', .6);
  const eA = escada(c, { x: -.9, y: -3, z: 2, n: 26, dir: [0, -.32], rise: .24, rail: '#4F8A5A' }); const eB = escada(c, { x: .9, y: -3, z: 2, n: 26, dir: [0, -.32], rise: .24, rail: '#D98AA0', seed: 6, railSide: -1 });
  const heroi = tiaguin(false, .12); c.add(heroi.root); heroi.tint('#C8CCF0'); const sf = sofia(false); c.add(sf.root); sf.tint('#C8CCF0');
  const pA = phone(chatNoite, .14, .28), pB = phone(chatNoite, .14, .28); c.add(pA, pB); const lA = new THREE.PointLight('#9FD8FF', 1.2, 1.6, 1.6), lB = lA.clone(); c.add(lA, lB);
  s.update = (t, u) => { const cam = s.camera; const a = eA.at(14), b = eB.at(15); heroi.place(a[0], a[2], a[1]); sf.place(b[0], b[2], b[1]);
    heroi.pose({ armR: [16, -80], armL: [6, 4] }); sf.pose({ armL: [16, -80], armR: [6, 4], head: -10 + Math.sin(u * 1.4) * 4, lean: -4 });
    heroi.face(cam); sf.face(cam); heroi.eye('down'); sf.eye(u % 1.6 < .25 ? 'shut' : 'flat');
    pA.position.set(a[0] + .2, a[1] + 1.18, a[2] + .25); pA.lookAt(cam.position); pB.position.set(b[0] - .2, b[1] + 1.18, b[2] + .25); pB.lookAt(cam.position); pA.paint(); pB.paint();
    lA.position.set(a[0] + .2, a[1] + 1.3, a[2] + .5); lB.position.set(b[0] - .2, b[1] + 1.3, b[2] + .5);
    const K = smooth(0, 3.2, u); aim(cam, [0, lerp(a[1] + 1.5, a[1] + 2.4, K), lerp(a[2] + 5.2, a[2] + 7, K)], [0, lerp(a[1] + 1.15, a[1] + 2.0, K), a[2]], 0);
    return { focus: lerp(5.2, 7, K), range: 2.2, blur: 15, bloom: .5, bloomT: .75, vig: .55, exposure: 1.05 }; };
  return s;
}

/** 7. Vocês começam a sonhar juntos: casa, Lisboa, manhã sem despertador */
export function s07(t0, t1) {
  const s = makeShot(t0, t1, '#F29AB0', 38), c = s.scene; c.fog = new THREE.Fog('#FFC8C0', 18, 120); ceuSonho(c);
  luzes(c, { sky: '#FFD0E0', ground: '#8A5A70', hi: 1, key: '#FFE0B0', ki: 1.3, pos: [-4, 10, 8], area: 8 });
  nuvens(c, [[-8, -3, -10, 7], [9, -4, -16, 8], [0, -9, -24, 12], [-12, 6, -30, 10]], '#FFE6F0', .85);
  const eA = escada(c, { x: -.9, y: -3, z: 2, n: 26, dir: [0, -.32], rise: .24, rail: '#4F8A5A' }); const eB = escada(c, { x: .9, y: -3, z: 2, n: 26, dir: [0, -.32], rise: .24, rail: '#D98AA0', seed: 6, railSide: -1 });
  const heroi = tiaguin(false, .16); c.add(heroi.root); heroi.tint('#FFE6EE'); const sf = sofia(false); c.add(sf.root); sf.tint('#FFE6EE');
  const B = [bolha(desCasa, 1.6), bolha(desBonde, 1.6), bolha((x, S) => desCama(x, S, false), 1.6)]; B.forEach(b => c.add(b));
  const petalas = brilhos(c, [0, 2, -1], { n: 90, spread: [8, 6, 6], col: '#FFB0C8', size: .1, op: .7 }); const ouro = brilhos(c, [0, 2, -2], { n: 40, spread: [6, 5, 4], col: '#FFE6A0', size: .14, op: .5, seed: 4 });
  s.update = (t, u) => { const cam = s.camera; const a = eA.at(14), b = eB.at(14); heroi.place(a[0], a[2], a[1]); sf.place(b[0], b[2], b[1]);
    const times = [.9, 2.3, 4.6]; B.forEach((bb, i) => { const k = smooth(times[i], times[i] + .7, u); bb.material.opacity = k; bb.scale.setScalar(.4 + .6 * k); bb.position.set([-1.0, 0, 1.0][i], a[1] + 2.5 + [0, .5, 0][i] + Math.sin(u * 1.3 + i) * .06, a[2] - .6); bb.lookAt(cam.position); });
    const idx = u < 2.3 ? 0 : u < 4.6 ? 1 : 2; heroi.pose({ armR: [lerp(8, 120, smooth(1, 1.5, u)), 0], armL: [8, 4], head: 6 }); sf.pose({ armL: [lerp(8, 120, smooth(2.4, 2.9, u)), 0], armR: [8, 4], head: -6 });
    heroi.face(cam); sf.face(cam); heroi.eye(u > 1.5 ? 'heart' : 'happy'); sf.eye(u > 3 ? 'heart' : 'happy');
    const K = smooth(0, 6.3, u); aim(cam, [lerp(-.4, .4, K), a[1] + lerp(1.8, 2.1, K), a[2] + lerp(6.4, 6.0, K)], [[-1, 0, 1][idx] * .3, a[1] + 1.9, a[2] - .6], 0); petalas(u); ouro(u);
    return { focus: 6.2, range: 2.6, blur: 13, bloom: .28, bloomT: .95, vig: .4, exposure: .95 }; };
  return s;
}

/** 8. Quanto mais alto você sobe, mais as escadas se afastam… gritar pra se ouvir */
export function s08(t0, t1) {
  const s = makeShot(t0, t1, '#3C4C70', 40), c = s.scene; c.fog = new THREE.FogExp2('#7E8CA8', .01); ceuFrio(c);
  const hemi = new THREE.HemisphereLight('#FFD9B8', '#2a2030', .9); c.add(hemi); const key = new THREE.DirectionalLight('#FFC890', 1.4); key.position.set(-6, 12, 8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, far: 80 }); c.add(key);
  nuvens(c, [[-9, -4, -12, 8], [10, -6, -18, 9], [0, -12, -26, 14]], '#C8D0E8', .7);
  const gA = new THREE.Group(), gB = new THREE.Group(); c.add(gA, gB);
  const eA = escada(gA, { x: 0, y: -4, z: 0, n: 40, dir: [0, -.3], rise: .26, rail: '#4F8A5A' }); const eB = escada(gB, { x: 0, y: -4, z: 0, n: 40, dir: [0, -.3], rise: .26, rail: '#D98AA0', seed: 6, railSide: -1 });
  const heroi = tiaguin(false, .14), sf = sofia(false); gA.add(heroi.root); gB.add(sf.root);
  const neb = brilhos(c, [0, 2, -4], { n: 60, spread: [10, 6, 8], col: '#C8D4F0', size: .5, op: .12 });
  s.update = (t, u) => { const cam = s.camera; const sep = lerp(.55, 2.5, smooth(1, 10.4, u)); gA.position.x = -sep; gB.position.x = sep;
    const ia = lerp(14, 22, smooth(0, 10.4, u)); const a = eA.at(ia), b = eB.at(ia); heroi.place(a[0], a[2], a[1]); sf.place(b[0], b[2], b[1]);
    const reach = u < 8.2; heroi.pose(reach ? { armR: [lerp(70, 95, smooth(5.8, 7, u)), 0], armL: [8, 4], lean: -4 } : { armR: [40, -120], armL: [40, -120] }); sf.pose(reach ? { armL: [lerp(70, 95, smooth(5.8, 7, u)), 0], armR: [8, 4], lean: 4 } : { armR: [40, -120], armL: [40, -120] });
    heroi.face(cam); sf.face(cam); heroi.eye(u < 6 ? 'open' : u < 8.2 ? 'sad' : 'wide'); sf.eye(u < 6 ? 'open' : u < 8.2 ? 'sad' : 'wide');
    const col = new THREE.Color('#FFD9B8').lerp(new THREE.Color('#8FA0D0'), smooth(1, 9, u)); hemi.color.copy(col); key.color.copy(col); c.fog.density = lerp(.006, .028, smooth(1, 10, u));
    const K = smooth(0, 10.9, u); const my = (a[1] + b[1]) / 2; aim(cam, [0, my + lerp(1.6, 3.0, K), lerp(a[2] + 6, a[2] + 15, K)], [0, my + lerp(1.3, 1.5, K), a[2]], 0); neb(u);
    return { focus: lerp(6, 15, K), range: lerp(2, 6, K), blur: 13, bloom: .35, bloomT: .85, vig: .5, exposure: 1.0, sat: lerp(1, .75, K) }; };
  return s;
}
