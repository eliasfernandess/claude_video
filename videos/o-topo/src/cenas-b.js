// O topo, parte B: planos 9 a 17 (58,43 s até o fim)
import * as THREE from 'three';
import { makeShot, aim, keys, smooth, lerp, clamp, rng } from './motor/core.js';
import { makeChar, canvasTex } from './motor/char.js';
import { box, std, cut, glowSprite, softBlob } from './motor/kit.js';
import { phone, stars } from './motor/kit2.js';
import { tiaguin, sofia, escada, brilhos, bolha, desCasa, desBonde, desCama, ceuNoite, ceuTarde, ceuSonho, ceuFrio, ceuAmanhecer, nuvens, luzes, telaChat, lisboaTex, lisboaRua, bonde } from './pecas.js';
import { topoNoite, chamando } from './cenas-a.js';

const tela = (txt, bg, fg) => canvasTex(512, 320, (x) => { x.fillStyle = bg; x.fillRect(0, 0, 512, 320); x.fillStyle = fg; x.textAlign = 'center'; x.font = '900 72px Inter'; x.fillText(txt, 256, 190); });
const folhaMes = (m) => canvasTex(256, 320, (x) => { x.fillStyle = '#F6F2EA'; x.fillRect(0, 0, 256, 320); x.fillStyle = '#C9361F'; x.fillRect(0, 0, 256, 70); x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '800 40px Inter'; x.fillText(m, 128, 50); x.fillStyle = '#555'; x.font = '600 20px Inter'; for (let i = 0; i < 30; i++) x.fillText(String(i + 1), 30 + (i % 7) * 33, 110 + Math.floor(i / 7) * 42); });

/** 9. Ela liga e você tá ocupado… "quando tudo melhorar"… por meses */
export function s09(t0, t1) {
  const s = makeShot(t0, t1, '#1B2440', 40), c = s.scene; c.fog = new THREE.FogExp2('#4A5A80', .016); ceuFrio(c); stars(c, 1200, 280, 3);
  luzes(c, { sky: '#8FA0D0', ground: '#1a1a28', hi: .75, key: '#C8D4FF', ki: .9, pos: [4, 12, 8], area: 10 });
  nuvens(c, [[-9, -4, -12, 8], [10, -6, -18, 9], [0, -10, -26, 14]], '#6A78A0', .6);
  const eA = escada(c, { x: -1.15, y: -3, z: 1, n: 24, dir: [0, -.32], rise: .24, rail: '#4F8A5A' }); const eB = escada(c, { x: 1.15, y: -3, z: 1, n: 24, dir: [0, -.32], rise: .24, rail: '#D98AA0', seed: 6, railSide: -1 });
  const a = eA.at(14), b = eB.at(14);
  const heroi = tiaguin(false, .12); heroi.place(a[0], a[2], a[1]); c.add(heroi.root); heroi.tint('#D8DCF4'); const sf = sofia(false); sf.place(b[0], b[2], b[1]); c.add(sf.root); sf.tint('#D8DCF4');
  // mesa de trabalho no degrau
  c.add(box(1.1, .06, .55, '#6A4A32', a[0] + .1, a[1] + .78, a[2] + .45)); for (const dx of [-.45, .55]) c.add(box(.05, .78, .05, '#3a2a20', a[0] + dx, a[1] + .39, a[2] + .45));
  const lap = box(.5, .3, .02, new THREE.MeshBasicMaterial({ color: '#9FD8FF' }), a[0] + .1, a[1] + .97, a[2] + .6); c.add(lap); for (let i = 0; i < 4; i++) c.add(box(.3, .02, .4, '#F6F2EA', a[0] - .32, a[1] + .82 + i * .025, a[2] + .45));
  const glA = new THREE.PointLight('#9FD8FF', 2, 2.5, 1.6); glA.position.set(a[0] + .1, a[1] + 1.1, a[2] + 1); c.add(glA);
  const pB = phone((x, k) => chamando(x, k), .12, .24); c.add(pB); const pA = phone((x, k) => chamando(x, k), .12, .24); c.add(pA);
  const meses = ['MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO'].map((m, i) => { const f = cut(folhaMes(m), .5, .62); c.add(f); return f; });
  s.update = (t, u) => { const cam = s.camera; const part = u < 1.9 ? 0 : u < 3.9 ? 1 : 2;
    heroi.face(cam); sf.face(cam);
    if (part === 0) { heroi.eye('down'); heroi.pose({ armL: [20, -60], armR: [lerp(20, 60, smooth(1.1, 1.4, u)), lerp(-60, -10, smooth(1.1, 1.4, u))] }); sf.eye('happy'); sf.pose({ armL: [16, -80] }); }
    else if (part === 1) { heroi.eye('look'); heroi.pose({ armR: [16, -80], armL: [20, -60] }); sf.eye('shut'); sf.pose({ head: -16, lean: -6, armL: [10, -40] }); }
    else { heroi.eye('flat'); heroi.pose({ armL: [20, -60], armR: [20, -60] }); sf.eye('flat'); sf.pose({ armL: [10, 4] }); }
    pB.visible = part === 0; pB.position.set(b[0] - .2, b[1] + 1.18, b[2] + .25); pB.lookAt(cam.position); pB.paint(false);
    pA.visible = part === 1; pA.position.set(a[0] + .2, a[1] + 1.18, a[2] + .25); pA.lookAt(cam.position); pA.paint(false);
    meses.forEach((f, i) => { const k = clamp((u - 4.0 - i * .8) / 1.6); f.visible = k > 0 && k < 1; f.position.set(lerp(-2, 2, k), a[1] + 1.9 + Math.sin(k * 6 + i) * .3, a[2] + 1.4); f.rotation.set(Math.sin(k * 9) * .4, 0, Math.sin(k * 7 + i) * .6); });
    const K = smooth(0, 8.2, u); aim(cam, [0, a[1] + lerp(1.6, 1.8, K), a[2] + lerp(7.2, 6.4, K)], [0, a[1] + 1.25, a[2]], 0);
    return { focus: lerp(7.2, 6.4, K), range: 3, blur: 12, bloom: .4, bloomT: .8, vig: .55, exposure: 1.02, sat: .85 }; };
  return s;
}

/** 10. Uma notícia incrível… três semanas sem conversar de verdade */
const chat3sem = (x) => { telaChat(x, { titulo: 'Sofia', linhas: [['bom dia ☀️', false], ['bom dia', true], ['', false, 'HÁ 3 SEMANAS'], ['corrido hoje, depois falo', true], ['tá bom', false]], rodape: 'Mensagem' }); };
export function s10(t0, t1) {
  const s = makeShot(t0, t1, '#0A0C22', 38), c = s.scene; c.fog = new THREE.FogExp2('#141838', .014); ceuNoite(c); stars(c, 2600, 280, 12);
  luzes(c, { sky: '#4E54A8', ground: '#141020', hi: .65, key: '#AFC0FF', ki: .8, pos: [6, 12, 8], area: 8 });
  const e = escada(c, { x: 0, y: -3, z: 1, n: 26, dir: [0, -.32], rise: .24, rail: '#4F8A5A' }); const a = e.at(14);
  const heroi = tiaguin(false, .18); heroi.place(a[0] - .35, a[2], a[1]); c.add(heroi.root); heroi.tint('#E8E4F8');
  const lap = cut(tela('APROVADO', '#1E7A5A', '#FFFFFF'), .9, .56); lap.position.set(a[0] + .6, a[1] + 1.0, a[2] + .3); c.add(lap); c.add(box(.92, .04, .6, '#2a2a30', a[0] + .6, a[1] + .7, a[2] + .45)); c.add(box(.9, .7, .5, '#6A4A32', a[0] + .6, a[1] + .35, a[2] + .45));
  const gl = new THREE.PointLight('#8FF0C8', 2.5, 3, 1.6); gl.position.set(a[0] + .6, a[1] + 1.2, a[2] + 1); c.add(gl);
  const confete = brilhos(c, [a[0], a[1] + 2, a[2]], { n: 70, spread: [3, 2, 2], col: '#FFE2A0', size: .08, op: .9 });
  const ph = phone(chat3sem, .36, .74); c.add(ph);
  s.update = (t, u) => { const cam = s.camera; heroi.face(cam); const close = smooth(3.2, 4.6, u); heroi.root.visible = close < .45;
    if (u < 2.8) { heroi.cheer(t, 0, 1); heroi.eye('happy'); } else { heroi.pose({ armR: [18, -90], armL: [6, 4] }); heroi.eye(u < 4.6 ? 'open' : 'flat'); }
    confete(u); for (const ch of c.children) if (ch.isSprite && ch.material.color.getHexString() === 'ffe2a0') ch.visible = u < 3.2;
    const camPos = [lerp(.2, a[0] - .2, close), lerp(a[1] + 1.6, a[1] + 1.3, close), lerp(a[2] + 4.2, a[2] + .95, close)]; aim(cam, camPos, [lerp(.1, a[0] - .2, close), lerp(a[1] + 1.25, a[1] + 1.22, close), lerp(a[2], a[2] - 1, close)], 0);
    ph.visible = u > 2.8; ph.position.set(camPos[0], camPos[1] - .02 + (1 - close) * -.4, camPos[2] - .98); ph.rotation.set(0, 0, 0); ph.paint();
    return { focus: close > .5 ? .98 : 4.2, range: close > .5 ? .25 : 1.8, blur: 14, bloom: .45, bloomT: .8, vig: .55, exposure: 1.02 }; };
  return s;
}

/** 11. Você pensa em descer. Ela também. Não sabem mais caber… se despedem */
const portaTex = (kind) => canvasTex(256, 512, (x) => { x.fillStyle = kind ? '#FFE9B0' : '#E8F0FF'; x.fillRect(0, 0, 256, 512); if (kind) { for (let i = 0; i < 40; i++) { x.fillStyle = i % 3 ? '#F6F2EA' : '#D9D2C2'; x.save(); x.translate(40 + (i * 53) % 180, 120 + (i * 97) % 360); x.rotate((i % 5 - 2) * .2); x.fillRect(-30, -20, 60, 40); x.restore(); } } else { x.fillStyle = '#2F5D4A'; x.fillRect(30, 60, 196, 120); x.fillStyle = '#fff'; x.font = '600 22px Inter'; x.fillText('Direito Civil', 50, 120); x.fillStyle = '#8A5A36'; for (let i = 0; i < 4; i++) x.fillRect(30, 260 + i * 60, 196, 14); x.fillStyle = '#4A86C7'; for (let i = 0; i < 6; i++) x.fillRect(40 + i * 30, 230, 20, 30); } });
export function s11(t0, t1) {
  const s = makeShot(t0, t1, '#3A2A62', 40), c = s.scene; c.fog = new THREE.FogExp2('#5A3E70', .016); ceuNoite(c);
  luzes(c, { sky: '#B88AC8', ground: '#2a1a30', hi: .8, key: '#FFB8A0', ki: 1.1, pos: [-6, 8, -10], area: 8 });
  nuvens(c, [[-9, -4, -12, 8], [10, -6, -18, 9]], '#7A5A8A', .6);
  c.add(box(5, .16, 2.4, std('#7A4E30'), 0, -.08, 0)); escada(c, { x: -1.9, y: .05, z: -1.3, n: 14, dir: [-.1, -.3], rise: .24, rail: '#4F8A5A' }); escada(c, { x: 1.9, y: .05, z: -1.3, n: 14, dir: [.1, -.3], rise: .24, rail: '#D98AA0', seed: 6, railSide: -1 });
  const pA = new THREE.Group(), pB = new THREE.Group(); c.add(pA, pB);
  const mkDoor = (g, w, h, kind, x) => { g.add(box(w + .16, h + .16, .12, '#5A3822', x, h / 2 + .3, -.6)); const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: portaTex(kind) })); p.position.set(x, h / 2 + .3, -.53); g.add(p); const l = new THREE.PointLight(kind ? '#FFD890' : '#B8D0FF', 2.5, 3, 1.6); l.position.set(x, h / 2 + .3, .2); g.add(l); };
  mkDoor(pA, 1.0, 2.0, 1, -.65); mkDoor(pB, .55, 1.2, 0, .55);
  const heroi = tiaguin(false, .14), sf = sofia(false); c.add(heroi.root, sf.root); heroi.tint('#F0E0F0'); sf.tint('#F0E0F0');
  s.update = (t, u) => { const cam = s.camera; const hug = smooth(5.2, 6.0, u);
    const ha = [lerp(-1.9, lerp(-1.25, -.28, hug), smooth(0, 1.6, u)), lerp(-2.4, .3, smooth(0, 1.6, u))], hb = [lerp(1.9, lerp(1.25, .28, hug), smooth(.6, 2.2, u)), lerp(-2.4, .3, smooth(.6, 2.2, u))];
    heroi.place(ha[0], ha[1], u < 1.6 ? lerp(.9, 0, smooth(0, 1.6, u)) : 0); sf.place(hb[0], hb[1], u < 2.2 ? lerp(.9, 0, smooth(.6, 2.2, u)) : 0);
    if (u < 2.2) { heroi.walk(t, .7, .6); sf.walk(t, .7, .6); } else if (hug > .5) { heroi.pose({ armR: [70, -110], armL: [8, 4], lean: 6 }); sf.pose({ armL: [70, -110], armR: [8, 4], lean: -6 }); } else { heroi.pose({ head: 8 }); sf.pose({ head: -8 }); }
    heroi.face(cam); sf.face(cam); heroi.eye(u < 2.2 ? 'down' : u < 5 ? 'sad' : 'shut'); sf.eye(u < 2.2 ? 'down' : u < 5 ? 'sad' : 'shut');
    const K = smooth(0, 7.1, u); aim(cam, [lerp(-.3, .3, K), lerp(1.8, 1.5, K), lerp(6.2, 4.8, K)], [0, 1.15, 0], 0);
    return { focus: lerp(6.2, 4.8, K), range: 2.2, blur: 14, bloom: .45, bloomT: .8, vig: .5, exposure: 1.02 }; };
  return s;
}

/** 12. Anos depois, você chega ao topo. Contas pagas. Despertador desligado. */
const contasTex = () => canvasTex(256, 320, (x) => { x.fillStyle = '#F6F2EA'; x.fillRect(0, 0, 256, 320); x.fillStyle = '#999'; for (let i = 0; i < 9; i++) x.fillRect(24, 40 + i * 26, 140 + (i % 3) * 30, 8); x.save(); x.translate(130, 200); x.rotate(-.35); x.strokeStyle = '#C9361F'; x.lineWidth = 8; x.strokeRect(-90, -40, 180, 80); x.fillStyle = '#C9361F'; x.font = '900 56px Inter'; x.textAlign = 'center'; x.fillText('PAGO', 0, 20); x.restore(); });
const relogioTex = () => canvasTex(256, 256, (x) => { x.clearRect(0, 0, 256, 256); x.fillStyle = '#E2533F'; x.beginPath(); x.arc(128, 140, 90, 0, 7); x.fill(); x.fillStyle = '#F6F2EA'; x.beginPath(); x.arc(128, 140, 72, 0, 7); x.fill(); x.fillStyle = '#E2533F'; x.beginPath(); x.arc(70, 52, 30, 0, 7); x.arc(186, 52, 30, 0, 7); x.fill(); x.strokeStyle = '#222'; x.lineWidth = 7; x.beginPath(); x.moveTo(128, 140); x.lineTo(128, 90); x.moveTo(128, 140); x.lineTo(160, 150); x.stroke(); x.strokeStyle = '#333'; x.lineWidth = 5; x.beginPath(); x.moveTo(210, 200); x.quadraticCurveTo(250, 230, 230, 256); x.stroke(); });
export function s12(t0, t1) {
  const s = makeShot(t0, t1, '#8FC2E8', 40), c = s.scene; ceuTarde(c); nuvens(c, [[-8, -1, -16, 8], [9, 2, -24, 9], [0, -4, -30, 12]], '#ffffff', .9);
  luzes(c, { sky: '#DCEBFF', ground: '#8A7A6A', hi: 1, key: '#FFF2D8', ki: 1.4, pos: [-6, 7, -8], area: 8 });
  const piso = canvasTex(256, 256, (x) => { x.fillStyle = '#B88A5E'; x.fillRect(0, 0, 256, 256); for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#A97B50' : '#C49468'; x.fillRect(0, i * 32, 256, 30); } }); piso.wrapS = piso.wrapT = THREE.RepeatWrapping; piso.repeat.set(3, 3);
  c.add(box(9, .2, 7, new THREE.MeshStandardMaterial({ map: piso, roughness: .6 }), 0, -.1, -1)); c.add(box(9, .6, 7, std('#5A3822'), 0, -.5, -1));
  // parede com janelão (moldura) atrás
  for (const [x, w] of [[-4.2, .6], [4.2, .6], [-1.4, .12], [1.4, .12]]) c.add(box(w, 4.2, .15, '#F2EDE2', x, 2.1, -4.3)); c.add(box(9, .3, .15, '#F2EDE2', 0, 4.1, -4.3)); c.add(box(9, .5, .15, '#F2EDE2', 0, .25, -4.3));
  const sof = std('#2F6D63'); c.add(box(2.6, .45, .9, sof, -2.2, .3, -2.8)); c.add(box(2.6, .8, .25, sof, -2.2, .7, -3.2)); for (const x of [-3.45, -.95]) c.add(box(.22, .65, .9, sof, x, .4, -2.8));
  c.add(box(1.4, 2.4, .4, '#7A4E30', 3.3, 1.2, -3.6)); ['#D2483A', '#4A86C7', '#F2C14E', '#6BAF8E'].forEach((k, i) => c.add(box(.12, .5, .3, k, 2.85 + i * .14, 1.7, -3.5)));
  for (const [x, z] of [[3.9, -2.2], [-3.9, -1]]) { const pot = new THREE.Mesh(new THREE.CylinderGeometry(.3, .22, .5, 18), std('#C76B4A')); pot.position.set(x, .25, z); c.add(pot); const f = new THREE.Mesh(new THREE.SphereGeometry(.5, 12, 10), std('#3E8A52')); f.position.set(x, .9, z); f.castShadow = true; c.add(f); }
  c.add(box(.9, .06, .6, '#6A4A32', 1.2, .62, .9)); for (const dx of [-.38, .38]) c.add(box(.05, .6, .05, '#3a2a20', 1.2 + dx, .3, .9));
  const contas = cut(contasTex(), .34, .42); contas.position.set(1.0, .9, .95); c.add(contas); const rel = cut(relogioTex(), .3, .3); rel.position.set(1.42, .8, .95); c.add(rel);
  const heroi = tiaguin(true, .16); heroi.place(-.3, -.4, 0); c.add(heroi.root); heroi.tint('#FFF6EA');
  s.update = (t, u) => { const cam = s.camera; const K = smooth(0, 5.1, u); heroi.face(cam); heroi.eye(u < 3 ? 'open' : 'flat'); heroi.pose({ head: lerp(-6, 4, K) });
    contas.lookAt(cam.position); rel.lookAt(cam.position);
    aim(cam, [lerp(1.5, -.1, K), lerp(1.2, 1.5, K), lerp(2.4, 5.6, K)], [lerp(1.2, -.2, K), lerp(.85, 1.15, K), lerp(.9, -.4, K)], 0);
    return { focus: lerp(1.5, 5.6, K), range: lerp(.6, 2.6, K), blur: 15, bloom: .3, bloomT: .9, vig: .35, exposure: 1.04 }; };
  return s;
}

/** Lisboa de dia (planos 13 e 15) */
function lisboaDia(c) { c.fog = new THREE.Fog('#FCE0B8', 25, 90); ceuAmanhecer(c); const R = lisboaRua(c, { night: false });
  luzes(c, { sky: '#FFE6C8', ground: '#7A5A50', hi: .9, key: '#FFC88A', ki: 1.7, pos: [8, 9, 6], area: 12 });
  const ger = canvasTex(128, 128, (x) => { x.clearRect(0, 0, 128, 128); x.fillStyle = '#3E8A52'; for (let i = 0; i < 7; i++) { x.beginPath(); x.ellipse(30 + i * 12, 90, 12, 20, (i - 3) * .3, 0, 7); x.fill(); } x.fillStyle = '#E2334F'; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(30 + (i * 17) % 70, 50 + (i * 23) % 30, 12, 0, 7); x.fill(); } x.fillStyle = '#C76B4A'; x.fillRect(28, 100, 72, 28); });
  return { R, ger }; }

/** 13. Numa viagem, você encontra a Sofia por acaso. Ela sorri. Você também. */
export function s13(t0, t1) {
  const s = makeShot(t0, t1, '#FCE0B8', 40), c = s.scene; const { R, ger } = lisboaDia(c);
  const b = bonde(); b.position.set(-1, 0, 3.4); b.rotation.y = Math.PI / 2 * 0; c.add(b);
  const vaso = cut(ger, 1.2, 1.2); vaso.position.set(-1.25, 1.1, 1.6); c.add(vaso);
  const heroi = tiaguin(true, .16), sf = sofia(true); c.add(heroi.root, sf.root); heroi.tint('#FFEEDD'); sf.tint('#FFEEDD');
  const mala = box(.38, .5, .2, '#3A4A6A'); c.add(mala);
  s.update = (t, u) => { const cam = s.camera; const ih = lerp(1, 5, smooth(0, 2.4, u)), is = lerp(14, 8.5, smooth(0, 2.6, u)); const ph = R.degrau(ih, -.45), ps = R.degrau(is, .5);
    heroi.place(ph[0], ph[2], ph[1]); sf.place(ps[0], ps[2], ps[1]); if (u < 2.4) heroi.walk(t, .8, .7); else heroi.pose({ armL: [12, 4] }); if (u < 2.6) sf.walk(t, .8, .7); else sf.pose({});
    mala.position.set(ph[0] + .38, ph[1] + .3, ph[2] + .1); b.position.x = lerp(-5, 9, smooth(0, 2.6, u)); b.visible = u < 2.6;
    heroi.face(cam); sf.face(cam); heroi.eye(u < 2.4 ? 'open' : u < 3 ? 'wide' : 'happy'); sf.eye(u < 2.6 ? 'open' : u < 3.2 ? 'wide' : 'happy');
    aim(cam, [lerp(.6, .2, u / 4.8), lerp(1.0, 1.4, u / 4.8), 6.6], [0, lerp(2.4, 2.2, u / 4.8), -3.5], 0);
    return { focus: lerp(7, 8.6, u / 4.8), range: 3, blur: 13, bloom: .4, bloomT: .85, vig: .4, exposure: 1.03 }; };
  return s;
}

/** 14. Por um segundo, a outra vida inteira: a casa, as viagens, ela roubando o seu lado da cama */
export function s14(t0, t1) {
  const s = makeShot(t0, t1, '#F29AB0', 38), c = s.scene; c.fog = new THREE.Fog('#FFC8C0', 14, 90); ceuSonho(c);
  luzes(c, { sky: '#FFD0E0', ground: '#8A5A70', hi: 1, key: '#FFE0B0', ki: 1.2, pos: [-4, 10, 8], area: 8 });
  nuvens(c, [[-7, -2, -10, 7], [8, -3, -14, 8], [0, -7, -22, 12]], '#FFE6F0', .85);
  const B = [[bolha(desCasa, 2.4), [-1.1, 2.4, -1]], [bolha(desBonde, 2.4), [1.2, 1.2, -3.5]], [bolha((x, S) => desCama(x, S, true), 2.6), [-.6, 1.6, -6.5]]]; B.forEach(([b]) => c.add(b));
  const heroi = tiaguin(true, .2); heroi.place(.9, 1.2, 0); c.add(heroi.root); heroi.tint('#FFE6EE');
  const p1 = brilhos(c, [0, 2, -3], { n: 100, spread: [8, 6, 10], col: '#FFB0C8', size: .1, op: .7 }); const p2 = brilhos(c, [0, 2, -3], { n: 50, spread: [6, 5, 8], col: '#FFE6A0', size: .14, op: .5, seed: 4 });
  s.update = (t, u) => { const cam = s.camera; const K = smooth(0, 5.6, u);
    B.forEach(([b, p], i) => { b.position.set(p[0], p[1] + Math.sin(u * 1.2 + i) * .08, p[2]); b.lookAt(cam.position); b.material.opacity = smooth(.1 + i * .5, .8 + i * .5, u); });
    heroi.face(cam); heroi.eye(u < 4 ? 'happy' : 'heart'); heroi.pose({ head: 6 });
    aim(cam, [lerp(1.8, .4, K), lerp(1.7, 1.9, K), lerp(5.2, 3.4, K)], [lerp(-.2, -.5, K), lerp(1.9, 1.8, K), lerp(-1, -5, K)], 0); p1(u); p2(u);
    return { focus: lerp(5, 6, K), range: 4, blur: 12, bloom: .28, bloomT: .95, vig: .4, exposure: .95 }; };
  return s;
}

/** 15. Alguém chama o nome dela. Um abraço. Cada um segue o seu caminho. */
export function s15(t0, t1) {
  const s = makeShot(t0, t1, '#FCE0B8', 40), c = s.scene; const { R, ger } = lisboaDia(c);
  const vaso = cut(ger, 1.2, 1.2); vaso.position.set(1.3, 1.2, 1.8); c.add(vaso);
  const amigo = makeChar({ outfit: 'terno3' }); const pa = R.degrau(19, .6); amigo.place(pa[0], pa[2], pa[1]); amigo.tint('#FFEEDD'); c.add(amigo.root);
  const heroi = tiaguin(true, .16), sf = sofia(true); c.add(heroi.root, sf.root); heroi.tint('#FFEEDD'); sf.tint('#FFEEDD'); const mala = box(.38, .5, .2, '#3A4A6A'); c.add(mala);
  s.update = (t, u) => { const cam = s.camera; const hug = smooth(1.8, 2.3, u) * (1 - smooth(3.4, 3.8, u));
    const is = u < 3.6 ? 8.5 : lerp(8.5, 16, smooth(3.6, 6.2, u)), ih = u < 3.6 ? 7.6 : lerp(7.6, 2.5, smooth(3.6, 6.2, u));
    const ps = R.degrau(is, lerp(.5, .2, hug)), ph = R.degrau(ih, lerp(-.45, -.15, hug)); sf.place(ps[0], ps[2], ps[1]); heroi.place(ph[0], ph[2], ph[1]); mala.position.set(ph[0] - .35, ph[1] + .3, ph[2] + .1);
    amigo.face(cam); amigo.eye('happy'); amigo.pose({ armR: [150 + Math.sin(u * 9) * 14, 20] });
    if (u > 3.6) { sf.walk(t, .7, .6); heroi.walk(t, .7, .6); } else if (hug > .3) { heroi.pose({ armR: [70, -110], lean: 5 }); sf.pose({ armL: [70, -110], lean: -5 }); } else { heroi.pose({}); sf.pose({ head: -8 }); }
    heroi.face(cam); sf.face(cam); sf.eye(u < 1.5 ? 'look' : u < 3.6 ? 'happy' : 'down'); heroi.eye(u < 1.5 ? 'look' : u < 3.6 ? 'shut' : 'down');
    aim(cam, [0, 2.4, 5.4], [0, 2.4, -4], 0);
    return { focus: lerp(8.8, 6.6, smooth(3.6, 6.2, u)), range: 3, blur: 12, bloom: .4, bloomT: .85, vig: .45, exposure: lerp(1.03, .96, smooth(3, 6, u)) }; };
  return s;
}

/** 16. Naquela noite, a janela do hotel. É Lisboa. A foto da vista… e guarda de novo. */
export function s16(t0, t1) {
  const s = makeShot(t0, t1, '#141238', 40), c = s.scene;
  const ltex = lisboaTex(true); const vista = cut(ltex, 60, 30, { fog: false }); vista.position.set(0, 2, -32); c.add(vista);
  c.add(new THREE.HemisphereLight('#6E64B8', '#201828', .55)); const lamp = new THREE.PointLight('#FFB66E', 9, 7, 1.6); lamp.position.set(-2.4, 1.6, -.4); lamp.castShadow = true; lamp.shadow.mapSize.set(1024, 1024); c.add(lamp);
  const lum = new THREE.Mesh(new THREE.CylinderGeometry(.18, .3, .34, 20), new THREE.MeshStandardMaterial({ color: '#F6DDA4', emissive: '#FFB866', emissiveIntensity: 1.4 })); lum.position.set(-2.4, 1.3, -.6); c.add(lum); c.add(box(.6, .8, .5, '#6A4A32', -2.4, .4, -.6));
  // parede com janela grande
  const wall = std('#5A4A6A'); for (const [x, w] of [[-3.3, 2.6], [3.3, 2.6]]) c.add(box(w, 4.4, .2, wall, x, 2.2, -2)); c.add(box(9, .9, .2, wall, 0, .45, -2)); c.add(box(9, .6, .2, wall, 0, 4.1, -2));
  c.add(box(4.2, .1, .4, '#EDE7DA', 0, .95, -1.9)); for (const x of [-2, 2, 0]) c.add(box(.08, 3, .12, '#EDE7DA', x, 2.4, -1.95));
  const cort = (x) => { const t = canvasTex(256, 512, (g) => { for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#C9B07A' : '#B89A64'; g.fillRect(i * 32, 0, 32, 512); } }); const m = new THREE.Mesh(new THREE.PlaneGeometry(.9, 3.6), new THREE.MeshStandardMaterial({ map: t, side: THREE.DoubleSide })); m.position.set(x, 2.3, -1.75); return m; }; c.add(cort(-2.4), cort(2.4));
  c.add(box(2.4, .5, 1.8, '#F2EDE2', 2.6, .25, 1.0)); c.add(box(2.4, .5, .2, '#6A4A32', 2.6, .7, .1)); const malaA = box(.8, .25, .55, '#3A4A6A', 2.4, .62, 1.2); c.add(malaA);
  const heroi = tiaguin(true, .16); heroi.place(-.9, -1.2, 0); c.add(heroi.root); heroi.tint('#E8DCEC');
  const ph = phone((x) => { x.drawImage(ltex.image, 600, 150, 900, 1000, 0, 0, 540, 1110); x.fillStyle = '#00000055'; x.fillRect(0, 0, 540, 1110); x.fillStyle = '#F6F2EA'; x.beginPath(); x.roundRect(30, 760, 480, 230, 26); x.fill(); x.fillStyle = '#3E2518'; x.beginPath(); x.arc(90, 820, 34, 0, 7); x.fill(); x.fillStyle = '#222'; x.font = '700 36px Inter'; x.textAlign = 'left'; x.fillText('Sofia', 140, 832); x.fillStyle = '#2F6D63'; x.beginPath(); x.roundRect(310, 900, 170, 64, 32); x.fill(); x.fillStyle = '#fff'; x.font = '700 28px Inter'; x.fillText('Enviar', 350, 942); }, .36, .74); c.add(ph);
  const ph2 = phone((x) => { x.fillStyle = '#05050A'; x.fillRect(0, 0, 540, 1110); }, .36, .74); c.add(ph2);
  s.update = (t, u) => { const cam = s.camera; const close = smooth(5.9, 6.6, u), away = smooth(8.9, 9.8, u); heroi.root.visible = close < .5;
    heroi.face(cam); heroi.eye(u < 3 ? 'look' : 'sad'); heroi.pose(u < 5.9 ? { head: -4 } : { armR: [18, -90] });
    if (close < .5) { const K = smooth(0, 5.8, u); aim(cam, [lerp(1.4, .6, K), lerp(1.6, 1.5, K), lerp(4.6, 3.4, K)], [lerp(-.4, -.5, K), 1.6, -1.6], 0); ph.visible = ph2.visible = false; }
    else { const p = [-.7, 1.5, -.6]; aim(cam, p, [-.7, 1.5, -3], 0); ph.visible = u < 9.2; ph2.visible = u >= 9.2; const ph_ = u < 9.2 ? ph : ph2; ph_.position.set(-.7, 1.5 - away * 1.2, -1.66); ph_.rotation.set(-away * .4, 0, 0); ph.paint(); ph2.paint(); }
    return { focus: close < .5 ? 3.6 : 1.06, range: close < .5 ? 1.6 : .25, blur: 15, bloom: .45, bloomT: .8, vig: .55, exposure: 1.04 }; };
  return s;
}

/** 17. Você chegou lá em cima. O topo fica vazio… "A gente conseguiu." */
export function s17(t0, t1) {
  const s = makeShot(t0, t1, '#0A0C22', 38), c = s.scene; const { vazio, fx } = topoNoite(c, { lisboa: true });
  const longe = escada(c, { x: 18, y: -8, z: -40, n: 30, dir: [.1, -.3], rise: .26, rail: '#D98AA0', seed: 6 }); const lz = glowSprite('#FFC890', 2.2, .8); const lp = longe.at(29); lz.position.set(lp[0], lp[1] + 1, lp[2]); c.add(lz);
  const heroi = tiaguin(true, .2); heroi.place(.3, .3, 0); c.add(heroi.root); heroi.tint('#D8D6F2');
  s.update = (t, u) => { const cam = s.camera; const K = smooth(0, 8.2, u); heroi.face(cam); heroi.eye(u < 5.2 ? 'down' : 'sad'); heroi.pose({ head: -5 });
    vazio.material.opacity = .12 + smooth(5.0, 6.2, u) * .6; vazio.scale.setScalar(1.4 + smooth(5, 6.2, u) * .6); fx(u); lz.material.opacity = .5 + Math.sin(u * 2) * .2;
    aim(cam, [lerp(1.4, 6, K), lerp(1.6, 5, K), lerp(3.6, 18, K)], [lerp(.8, 1.2, K), lerp(1.2, -1, K), lerp(0, -6, K)], 0);
    return { focus: lerp(3.6, 18, K), range: lerp(1.4, 8, K), blur: 13, bloom: .45, bloomT: .8, vig: .6, exposure: lerp(1.04, .9, smooth(7, 8.2, u)) }; };
  return s;
}
