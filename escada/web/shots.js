// A escada: roteiro de camera e atuacao, plano a plano, sincronizado com a narracao.
// Os tempos sao escritos no tempo ORIGINAL do audio da ElevenLabs (T(...)); I(n)/IE(n) = inicio/fim da pausa n.
import {
  THREE, V, clamp, smooth, lerp, scene, camera, U, mood, keyDir, points, spotlight, SETS, PROPS, CH, KIDS, ADULTS, P, merge,
  stairA, stairB, stairC, stairBuild, stepPos, dust, rain, resetFrame, showProp, updateWindows, setCam, render, kites, RW, RH,
  lam, basic, box, group, T as TX, phone, makeSchool,
} from './engine.js';

const TL = window.TL;
const T = (o) => o + TL.lead + TL.inserts.reduce((s, [p, d]) => s + (o >= p ? d : 0), 0);
const IE = (i) => T(TL.inserts[i][0]);
const I = (i) => IE(i) - TL.inserts[i][1];
const PI = Math.PI;
const env = (t) => TL.env[clamp(Math.round(t * TL.fps), 0, TL.env.length - 1)] || 0;
const talk = (t, base = 'neutral') => (env(t) > .28 ? 'open' : base);
const ease = (k) => k * k * (3 - 2 * k);
const L = (a, b, k) => a.clone().lerp(b, k);
const add = (p, x, y, z) => V(p.x + x, p.y + y, p.z + z);
const curve = (pts, k) => new THREE.CatmullRomCurve3(pts).getPoint(clamp(k, 0, 1));
const wob = (t, a = 1) => V(Math.sin(t * .7) * .03 * a, Math.sin(t * .9 + 1) * .02 * a, 0);
const { nam, namOld, liv, livOld, jef, davi } = CH;
const show = (...names) => { for (const n of names) SETS[n].visible = true; };
const handsMid = (c) => { c.root.updateMatrixWorld(true); const a = new THREE.Vector3(), b = new THREE.Vector3(); c.arms[0].hand.getWorldPosition(a); c.arms[1].hand.getWorldPosition(b); return a.add(b).multiplyScalar(.5); };
const headPos = (c) => { c.root.updateMatrixWorld(true); const v = new THREE.Vector3(); c.headMesh.getWorldPosition(v); return v; };
const handPos = (c, i) => { c.root.updateMatrixWorld(true); const v = new THREE.Vector3(); c.arms[i].hand.getWorldPosition(v); return v; };

// objetos extras desta historia
const OFF = (x, y, z) => V(x, y, z);
const HALL = OFF(-300, 0, 0), ROOM = OFF(-300, 0, 80), BED = OFF(-300, 0, 160), SIN = OFF(300, 0, 80), KIT = OFF(300, 0, 160), STA = OFF(300, 0, 0), VOID = OFF(0, -200, 400);
for (const k of KIDS) { k.props.rec = box(k.arms[1].el, .035, .26, .035, lam({ color: 0xf4f2ea }), 0, -.42, .08); }
const livFootOld = liv.legs[0].foot.material, livFootNew = lam({ color: 0xffd6de, emissive: 0x3a1c20 }), livFootSkin = lam({ color: 0x4a2a1c });
const setLivFeet = (m, tape) => { liv.legs.forEach((l) => { l.foot.material = m; }); liv.props.tape.visible = tape; liv.ribbonMeshes.forEach((r) => { r.visible = m === livFootNew; }); };
const groundSchool = makeSchool(SETS.bairro, -8, 0, 9.5, 1.25);
groundSchool.g.visible = true;
const car = group(); car.visible = false;
{
  const b = lam({ color: 0x3a4a6a }); box(car, 1.7, .6, 3.8, b, 0, .55, 0); box(car, 1.5, .5, 2.0, b, 0, 1.1, -.2); box(car, 1.52, .4, 1.9, basic({ color: 0x1a2430 }), 0, 1.12, -.2);
  for (const z of [-1.2, 1.2]) for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, .2, 8), lam({ color: 0x111111 })); w.rotation.z = PI / 2; w.position.set(s * .8, .3, z); car.add(w); }
  for (const s of [-1, 1]) box(car, .3, .12, .05, basic({ color: 0xfff2c0 }), s * .55, .6, 1.91);
  car.position.set(-1.5, 0, 15.2); car.rotation.y = -PI / 2;
}
const doorGlow = box(SETS.schoolIn, 1.2, 2.5, .05, basic({ color: 0xfff0c8 }), -1.1, 1.2, 4.3);
const camPhone = phone(scene, TX.phoneGlow); camPhone.visible = false;
const handPhone = phone(nam.arms[1].el, TX.phoneCall); handPhone.position.set(0, -.36, .07); handPhone.rotation.x = -.3;
const lidPivot = group(PROPS.keyboard); lidPivot.position.set(0, .035, -.1);
const lid = box(lidPivot, .62, .02, .2, lam({ color: 0x3a3a3c }), 0, 0, .1);

// --------------------------------------------------------------- planos
const SHOTS = [];
const S = (t0, fn) => SHOTS.push({ t0, fn });
const dom = { cap: document.getElementById('cap'), title: document.getElementById('title'), split: document.getElementById('split'), fade: document.getElementById('fade') };
let titleText = '', fadeV = 0, splitOn = false;

// ===== ATO 1: A ESCADA =====
S(0, (lt, k, t) => {                                                   // 01 a escada no ceu (bairro ao entardecer)
  mood('dusk'); show('bairro', 'clouds', 'dream'); stairA.g.visible = true; kites(t);
  keyDir(6, 5, 8);
  const pos = curve([V(5.5, 2.2, 19), V(6.5, 8, 10), V(7, 22, -6), V(6.5, 33, -24)], ease(k));
  const tgt = curve([V(0, 6.5, -3), V(0, 14, -12), V(0, 28, -30), V(0, 37.5, -44)], ease(k));
  setCam(pos, tgt, 54);
  fadeV = 1 - smooth(0, 1.1, lt);
});
S(T(8.42), (lt, k, t) => {                                             // 02 apresentacao (quarta parede)
  mood('dusk', { near: 4, far: 38 }); show('bairro', 'clouds'); stairA.g.visible = true; kites(t);
  const p = stepPos(stairA, 1);
  const turn = smooth(.25, 1.25, lt);
  nam.pose(merge(P.stand(t), { ...p, ry: lerp(PI, .18, turn), hyw: lerp(0, -.2, turn) - .1 * (1 - turn), ex: lt < 1.3 ? 'neutral' : talk(t, 'half') }));
  const h = add(p, 0, 1.75, 0);
  setCam(L(add(h, .55, -.1, 2.9), add(h, .3, 0, 2.0), ease(k)).add(wob(t)), add(h, 0, -.1, 0), 48);
  keyDir(5, 4, 6, p);
});
S(T(17.5), (lt, k, t) => {                                             // 03 os primeiros degraus (poeira dourada)
  mood('dusk'); show('bairro', 'clouds'); stairA.g.visible = true;
  const kc = 3 + lt * 1.85;
  stairBuild(stairA, kc + 2.4);
  dust(stairA, Math.floor(kc + 2.4), t, .8);
  const p = stepPos(stairA, kc); p.y += .05 * Math.abs(Math.sin(kc * PI));
  nam.pose(merge(P.climb(kc * PI), { ...p, ry: PI, ex: 'neutral' }));
  if (t >= T(19.2)) showProp('pillow', stepPos(stairA, 6), [0, .3, 0]);
  if (t >= T(21.3)) showProp('calendar', add(stepPos(stairA, 9), .2, 0, 0), [0, -.4, 0]);
  if (t >= T(22.1)) { const f = showProp('fear', add(stepPos(stairA, 11), -.25, 0, 0)); f.rotation.z = .08 * Math.sin(t * 40); f.position.x += .01 * Math.sin(t * 55); }
  setCam(add(p, 4.3, 1.1, .9), add(p, 0, .9, -.7), 50);
  keyDir(6, 5, 4, p);
});
S(T(23.4), (lt, k, t) => {                                             // 04 o vizinho e o videogame
  mood('dusk'); show('bairro', 'clouds'); stairA.g.visible = stairC.g.visible = true;
  stairBuild(stairC, 9.6); dust(stairC, 9, t, .5);
  let kk, ry = PI, pose;
  const grab = lt > 2.55;
  if (lt < 1.0) { kk = 6; pose = { lean: .5 * smooth(0, .4, lt) * (1 - smooth(.7, 1, lt)), rax: -.9 * (1 - smooth(.7, 1, lt)), ex: 'neutral' }; }
  else if (lt < 2.0) { kk = 6 + smooth(1.0, 1.9, lt); pose = merge(P.climb((lt - 1) * PI * 2), { ex: 'neutral' }); }
  else if (lt < 2.35) { kk = 7; ry = lerp(PI, 0, smooth(2.0, 2.35, lt)); pose = { ex: 'surprise', hx: -.1 }; }
  else { kk = 7 - (lt - 2.35) * 4.8; ry = 0; pose = merge(P.walk((lt - 2.35) * 18, 1.3), { ex: 'smile', lean: .15 }); }
  kk = Math.max(kk, .5);
  const p = stepPos(stairC, kk); if (lt > 2.35) p.y += .06 * Math.abs(Math.sin((lt - 2.35) * 9 * PI));
  jef.pose(merge(pose, p, { ry }));
  jef.props.ctrl.visible = grab;
  if (!grab) showProp('console', stepPos(stairC, 6), [0, .4, 0]);
  const pn = stepPos(stairA, 13);
  nam.pose(merge(P.stand(t), pn, { ry: -PI / 2 + .3, hyw: -.25, ex: lt > 2.6 ? 'smile' : 'half' }));
  const c = stepPos(stairC, 5.5);
  setCam(add(c, -3.4, 1.6, 4.6), add(c, 1.1, .6, -.6), 50);
  keyDir(5, 6, 6, c);
});
S(T(27.2), (lt, k, t) => {                                             // 05 "eu nao." (luz de tela no rosto)
  mood('night', { near: 2, far: 16, fog: 0x060a18 }); show('bairro'); stairA.g.visible = true;
  const p = stepPos(stairA, 14);
  nam.pose(merge(P.stand(t), p, { ry: 0, hx: .06, ex: talk(t) }));
  const h = headPos(nam);
  points([[add(h, 0, -.12, .55), 0x6a9cff, 1.1, 3, 2], [add(h, .6, .5, .6), 0xffc890, .6, 3, 2]]);
  keyDir(-3, 6, -4, p);
  setCam(add(h, .04 * Math.sin(t), -.02, lerp(1.55, 1.2, ease(k))), add(h, 0, -.04, 0), 42);
});
S(T(32.3), (lt, k, t) => {                                             // 06 o sonho la em cima (POV)
  mood('dusk'); show('bairro', 'clouds', 'dream'); stairA.g.visible = true; SETS.dreamSchool.setLit(0);
  const top = stepPos(stairA, 131);
  const p = stepPos(stairA, lerp(22, 36, ease(k)));
  setCam(add(p, 0, 1.6, .2), add(top, 0, 1.2, -2.2), 50);
  keyDir(6, 5, 8, top);
});
S(T(36.7), (lt, k, t) => {                                             // 07 noite: "cinco, seis, sete, oito"
  mood('night'); show('bairro', 'clouds'); stairA.g.visible = stairB.g.visible = true; stairB.g.position.x = 2.0;
  const walkEnd = T(38.3) - T(36.7);
  const kc = 56 + 4 * smooth(0, walkEnd, lt);
  const p = stepPos(stairA, kc);
  const listen = smooth(walkEnd + .1, walkEnd + .8, lt);
  nam.pose(merge(lt < walkEnd ? P.climb(kc * PI) : P.stand(t), p, { ry: PI, hyw: -1.2 * listen, ex: 'neutral' }));
  const inPause = t >= I(0);
  const pl = stepPos(stairB, 62);
  liv.pose(merge(P.stand(t), pl, { ry: -.3 + (inPause ? .25 * Math.sin((t - I(0)) * 4) : 0), laz: 1.1, raz: 1.1, lae: -.2, rae: -.2, ex: inPause ? 'open' : 'neutral' }));
  const a = stepPos(stairA, 58);
  const reveal = smooth(I(0) - .2, IE(0), t);
  setCam(L(add(a, 3.6, .3, 3.0), add(a, 3.0, .9, 4.0), reveal), L(add(a, 0, 1.1, -.6), add(pl, -.4, 1.0, 0), reveal), 50);
  keyDir(4, 6, 6, a);
});

// ===== ATO 2: LIVIA =====
const B2 = 2.0;
S(T(40.25), (lt, k, t) => {                                            // 08 a garota no degrau pequeno
  mood('night'); show('bairro', 'clouds'); stairA.g.visible = stairB.g.visible = true; stairB.g.position.x = B2;
  const p = stepPos(stairB, 62);
  const spin = 2 * PI * (smooth(.4, 1.3, lt) + smooth(2.7, 3.6, lt));
  const spinning = (lt > .4 && lt < 1.3) || (lt > 2.7 && lt < 3.6);
  const close = smooth(4.4, 5.4, lt);
  const pose = spinning ? { llx: -.9, llk: 1.8, llz: .5, lax: -.9, rax: -.9, lae: -.9, rae: -.9, laz: .2, raz: .2 } :
    { laz: 1.35 + .1 * Math.sin(t * 5), raz: 1.3 - .1 * Math.sin(t * 5), rz: .05 * Math.sin(t * 3.3), lae: -.15, rae: -.15 };
  liv.pose(merge(pose, p, { ry: .35 + spin, ex: close > .3 ? 'smile' : (Math.floor(t * 4) % 2 ? 'open' : 'neutral') }));
  const h = add(p, 0, 1.55, 0);
  setCam(L(add(p, 2.3, 1.1, 2.8), add(h, .5, .05, 1.2), ease(close)), L(add(p, 0, 1.0, 0), h, close), 50);
  keyDir(4, 6, 6, p);
});
function duo(t, stair2x = B2, kA = 60, kB = 61) {
  stairA.g.visible = stairB.g.visible = true; stairB.g.position.x = stair2x;
  return { a: stepPos(stairA, kA), b: stepPos(stairB, kB) };
}
function namKeyboard(t, p, ry, ex) {
  nam.pose(merge(P.keyboard(t), p, { ry, ex }));
  const m = handsMid(nam);
  const kb = showProp('keyboard', add(m, 0, -.03, 0), [0, ry, 0]);
  return kb;
}
S(T(46.3), (lt, k, t) => {                                             // 09 a nota errada de proposito
  mood('warm'); show('bairro', 'clouds');
  const { a, b } = duo(t);
  namKeyboard(t, add(a, .28, 0, 0), PI / 2, t > T(50.3) ? 'half' : 'neutral');
  const st = T(49.2), wr = T(52.12);
  let pose;
  if (t < st) pose = { laz: .9 + .4 * Math.sin(t * 3), raz: .9 - .4 * Math.sin(t * 3), lae: -.4, rae: -.4, llx: -.3 * Math.sin(t * 3), rlx: .3 * Math.sin(t * 3), hz: .1 * Math.sin(t * 3), ex: 'neutral' };
  else if (t < wr) { const s = smooth(st, st + .3, t) * (1 - smooth(st + .6, st + 1.2, t)); pose = { rz: .25 * s, laz: 1.5 * s + .6, raz: .3, llx: -.5 * s, ex: s > .2 ? 'surprise' : 'neutral' }; }
  else { const s = smooth(wr, wr + .35, t); pose = { rax: -.55 * s, rae: -2.3 * s, raz: .15, hx: .12 * s, ex: s > .5 ? 'laugh' : 'surprise', hyw: .25 * s }; }
  liv.pose(merge(pose, b, { ry: -PI / 2 }));
  const mid = add(L(a, b, .5), 0, 1.0, 0);
  setCam(L(add(mid, -.1, .9, 6.6), add(mid, 0, .7, 5.6), ease(k)), mid, 50);
  keyDir(3, 6, 6, mid);
});
S(T(53.2), (lt, k, t) => {                                             // 10 "ela sempre percebia" (quarta parede)
  mood('warm', { near: 2.5, far: 13 }); show('bairro', 'clouds');
  const { a } = duo(t, B2, 60, 66);
  const b = stepPos(stairB, 66);
  nam.pose(merge(P.stand(t), a, { ry: 0, ex: talk(t, 'smile') }));
  liv.pose(merge({ laz: 2.5, raz: 2.5, lae: -.6, rae: -.6, llx: -.9, llk: 1.6 }, b, { ry: t * 3 }));
  const h = headPos(nam);
  setCam(add(h, -.35, .02, 1.45 - .15 * k), add(h, .15, -.05, 0), 46);
  keyDir(3, 5, 6, a);
});
S(T(55.0), (lt, k, t) => {                                             // 11 os ensaios (montagem)
  show('bairro', 'clouds');
  const t1 = T(57.4), t2 = T(59.8);
  if (t < t1) {                                                        // a) sapatilha remendada batendo no degrau
    mood('warm', { near: 3, far: 16 });
    const { b } = duo(t, B2, 60, 62);
    liv.pose(merge(P.stand(t), b, { ry: .2, lf: -.35 * Math.max(0, Math.sin(t * 9)), llx: -.15 * Math.max(0, Math.sin(t * 9)) }));
    const f = add(b, .1, .08, .1);
    points([[add(f, .6, .6, .8), 0xffb060, 2.2, 4, 2]]);
    setCam(add(f, .55 - .1 * k, .3, .7), f, 40);
  } else if (t < t2) {                                                 // b) maos no teclado com a fitinha do Bonfim
    mood('warm');
    const { a } = duo(t, B2, 60, 61);
    const kb = namKeyboard(t, a, 0, 'neutral');
    const c = kb.position;
    points([[add(c, .3, .5, .5), 0xffc070, 1.8, 3, 2]]);
    setCam(add(c, .55, .62, .75), add(c, 0, .12, 0), 44);
  } else {                                                             // c) os dois ensaiando, escadas bem proximas
    mood('warm');
    const { a, b } = duo(t, 1.6, 60, 61);
    namKeyboard(t, add(a, .28, 0, 0), PI / 2, 'smile');
    const sp = (t - t2) * 2.2;
    liv.pose(merge({ laz: 2.4, raz: 2.4, lae: -.7, rae: -.7, llx: -.8, llk: 1.6, llz: .4 }, b, { ry: -PI / 2 + sp, ex: 'smile' }));
    const mid = add(L(a, b, .5), 0, 1.0, 0);
    const ang = lerp(-.35, .2, (t - t2) / (T(62.2) - t2));
    setCam(add(mid, Math.sin(ang) * 4.2, .6, Math.cos(ang) * 4.2), mid, 50);
  }
  keyDir(3, 6, 6, stepPos(stairA, 60));
});
S(T(62.2), (lt, k, t) => {                                             // 12 toc toc toc no corrimao
  mood('warm'); show('bairro', 'clouds');
  const { a, b } = duo(t, 1.6, 64, 64);
  const after = smooth(IE(1) - .3, IE(1) + .3, t);
  liv.pose(merge(P.stand(t), b, { ry: 0, laz: .32, lax: -.3, lae: -.25, raz: .1, hx: .6 * (1 - after), hyw: -.7 * after, lean: .12 * (1 - after), ex: after > .5 ? 'smile' : 'sad' }));
  let knock = 0;
  for (let i = 0; i < 3; i++) { const tk = I(1) + .15 + i * .36; knock = Math.max(knock, Math.exp(-Math.pow((t - tk) / .06, 2))); }
  const reach = smooth(I(1) - .5, I(1), t) * (1 - smooth(IE(1), IE(1) + .4, t));
  nam.pose(merge(P.stand(t), add(a, -.12, 0, 0), { ry: 0, raz: .22 * reach, rax: -.35 * reach, rae: (-.2 - .55 * knock) * reach, hyw: .5 * (1 - reach) - .4 * reach, hx: .3 * reach, ex: 'neutral' }));
  const near = smooth(I(1) - .4, I(1), t) * (1 - smooth(IE(1), IE(1) + .3, t));
  const hr = handPos(nam, 1);
  setCam(L(add(a, -1.15, 1.75, 2.3), add(hr, -.45, .35, .85), near), L(add(L(a, b, .55), 0, 1.15, 0), add(hr, .2, 0, 0), near), 50);
  points([[add(a, .8, 2.2, 1.2), 0xffc890, 2.5, 6, 2]]);
  keyDir(3, 6, 6, a);
});
S(T(66.28), (lt, k, t) => {                                            // 13 "eu to aqui" + uma vida inteira
  mood('warm'); show('bairro', 'clouds');
  const { a, b } = duo(t, 1.6, 64, 64);
  nam.pose(merge(P.stand(t), add(a, .22, 0, 0), { ry: PI / 2, ex: 'smile' }));
  liv.pose(merge(P.stand(t), b, { ry: -PI / 2, ex: 'smile', hz: .12 }));
  const mid = add(L(a, b, .5), 0, 1.4, 0);
  setCam(L(add(mid, 0, .1, 2.2), add(mid, 1.5, 2.5, 9.5), ease(k)), L(mid, add(mid, 0, -1.2, -2), ease(k)), 50);
  keyDir(3, 6, 6, mid);
});
S(T(69.95), (lt, k, t) => {                                            // 14 a casa desenhada (piano na cozinha)
  mood('warm'); show('bairro', 'clouds');
  const { a, b } = duo(t, 1.6, 65, 65);
  const t1 = T(72.4), t2 = T(75.0);
  const laugh = t > T(74.6) && t < T(77.0);
  nam.pose(merge(P.sit(), a, { ry: 0, ex: laugh ? 'laugh' : 'smile', lax: -.2, rax: -.2, hyw: .35, lean: laugh ? .2 * Math.abs(Math.sin(t * 9)) : 0 }));
  liv.pose(merge(P.sit(), b, { ry: 0, lax: -.7, rax: -.9, lae: -.9, rae: -1.0 + .15 * Math.sin(t * 14), hx: .45, ex: 'smile' }));
  const nb = showProp('notebook', add(handsMid(liv), 0, -.04, 0), [0, 0, 0], .95);
  if (t >= t1 && t < t2) {
    PROPS.notebook.children.at(-1).position.x = .12 + .08 * Math.sin(t * 6);
    setCam(add(nb.position, 0, .8, .2), nb.position, 46);
  } else {
    const mid = add(L(a, b, .5), 0, .7, 0);
    setCam(add(mid, .2, .5, 3.4 - .4 * k), mid, 50);
  }
  keyDir(3, 6, 6, a);
});
S(T(77.5), (lt, k, t) => {                                             // 15 o sonho tinha alguem dentro: duas janelas acesas
  mood('dusk'); show('clouds', 'dream'); SETS.dreamSchool.setLit(2);
  const c = SETS.dreamSchool.g.position;
  const ang = lerp(-.5, .25, ease(k));
  setCam(add(c, Math.sin(ang) * 11, 3.2, Math.cos(ang) * 11), add(c, 0, 1.6, 0), 48);
  keyDir(5, 6, 8, c);
});

// ===== ATO 3: AS ESCADAS SE AFASTAM =====
S(T(81.2), (lt, k, t) => {                                             // 16 o afastamento
  const ta = T(84.6), tb = T(88.4), te = T(90.0);
  const gap = t < ta ? lerp(1.6, 2.2, smooth(T(81.2), ta, t)) : t < tb ? lerp(2.2, 3.0, smooth(ta, tb, t)) : lerp(3.0, 5.0, smooth(tb, te, t));
  const cool = smooth(T(81.2), te, t);
  mood(cool > .6 ? 'cold' : 'warm'); U.uCool.value = cool * .75; show('bairro', 'clouds');
  const { a, b } = duo(t, gap, 70, 70);
  let pn, pl;
  if (t < ta) { pn = { ex: 'neutral' }; pl = { ex: 'neutral' }; }
  else if (t < tb) { const r = smooth(ta, ta + .6, t); pn = { rax: -1.45 * r, raz: .05, ray: -.25 * r, lean: -.05, ex: 'sad' }; pl = { lax: -1.45 * r, lay: .25 * r, ex: 'sad' }; }
  else { const r = smooth(tb, tb + .4, t); const cup = { lax: -1.1 * r, rax: -1.1 * r, lae: -1.7 * r, rae: -1.7 * r, lay: -.4 * r, ray: .4 * r }; pn = { ...cup, ex: 'open' }; pl = { ...cup, ex: 'sadopen' }; }
  nam.pose(merge(P.stand(t), add(a, .25, 0, 0), { ry: PI / 2 }, pn));
  liv.pose(merge(P.stand(t), add(b, -.12, 0, 0), { ry: -PI / 2 }, pl));
  const mid = add(L(a, b, .5), 0, 1.3, 0);
  setCam(add(mid, 0, .5 + k * 1.5, 3.6 + k * 4.5), add(mid, 0, -.2, 0), 52);
  keyDir(3, 6, 6, mid);
});
S(T(90.0), (lt, k, t) => {                                             // 17 "e so pular pra escada dela" (quarta parede)
  mood('cold'); U.uCool.value = .6; show('bairro', 'clouds');
  const { a } = duo(t, 7.0, 72, 72);
  liv.pose(merge(P.stand(t), stepPos(stairB, 74), { ry: -PI / 2 }));
  const look = t > T(92.0) && t < T(93.5);
  nam.pose(merge(P.stand(t), a, { ry: 0, hyw: look ? -.6 : 0, ex: talk(t, 'neutral') }));
  const h = headPos(nam);
  setCam(add(h, -.35, .25, 1.55 - .2 * k), add(h, .18, -.2, 0), 50);
  keyDir(-3, 6, 5, a);
});
function splitRender(top, bottom) {
  splitOn = true;
  const asp = RW / (RH / 2);
  resetFrame(); top(asp); updateWindows(); render('top');
  resetFrame(); bottom(asp); updateWindows(); render('bottom');
  return 'done';
}
S(T(97.6), (lt, k, t) => splitRender((asp) => {                       // 18 as conquistas (tela dividida)
  mood('room'); show('room');
  const party = t > T(102.4);
  const j = party ? Math.abs(Math.sin(t * 7)) * .12 : 0;
  nam.pose(merge(P.stand(t), add(ROOM, .4, j, -1.2), { ry: party ? .3 : -.9, ex: party ? 'laugh' : 'smile', laz: party ? 2.6 : .1, raz: party ? 2.6 : 1.0, rae: party ? -.2 : -1.3 }));
  handPhone.visible = party;
  KIDS.slice(0, 3).forEach((c, i) => c.pose(merge(P.stand(t + i), add(ROOM, -.9 + i * .55, 0, -.2 + i * .15), { ry: PI - .9, rax: -1.3, rae: -1.5 + .05 * Math.sin(t * 8 + i), ex: party ? 'smile' : 'neutral' })));
  keyDir(3, 5, 6, ROOM);
  setCam(add(ROOM, 2.6, 1.4, 2.2), add(ROOM, -.2, .95, -.7), 50, asp);
}, (asp) => {
  mood('room'); show('bedroom');
  const party = t > T(102.4);
  const j = party ? Math.abs(Math.sin(t * 7 + 1)) * .12 : 0;
  if (!party) liv.pose(merge(P.sitChair(), add(BED, 0, .1, -.55), { ry: 0, lax: -1.0, rax: -1.0, lae: -.9, rae: -.9, hx: .3, ex: t > T(100.0) ? 'smile' : 'surprise' }));
  else liv.pose(merge(P.stand(t), add(BED, .2, j, .2), { ry: -.2, laz: 2.5, raz: 2.5, ex: 'laugh' }));
  const hm = party ? handPos(liv, 0) : handsMid(liv);
  showProp('letter', add(hm, 0, .1, .04), [party ? 0 : -.6, 0, 0]);
  keyDir(-3, 5, 6, BED);
  setCam(add(BED, .9, 1.35, 2.2), add(BED, 0, 1.0, -.6), 50, asp);
}));
S(T(107.6), (lt, k, t) => splitRender((asp) => {                      // 19 as ligacoes pra depois
  mood('roomCold'); show('room'); U.uCool.value = .35;
  const x = Math.sin(t * .9) * .8;
  nam.pose(merge(P.walk(t * 5, .6), add(ROOM, x, 0, -.6), { ry: Math.cos(t * .9) > 0 ? PI / 2 : -PI / 2, rax: -1.1, raz: .35, rae: -2.3, hyw: .2, ex: Math.floor(t * 5) % 3 ? 'open' : 'smile' }));
  handPhone.visible = true; handPhone.position.set(0, -.3, .1);
  showProp('lamp', add(ROOM, -1.8, .8, -2.4));
  points([[add(ROOM, -1.8, 1.3, -2.2), 0xffc070, 1.6, 5, 2]]);
  keyDir(3, 5, 6, ROOM);
  setCam(add(ROOM, 2.4, 1.5, 2.4), add(ROOM, 0, 1.0, -.8), 50, asp);
}, (asp) => {
  mood('roomCold'); show('bedroom'); U.uCool.value = .45;
  liv.pose({ ...add(BED, 0, .66, -.35), rx: -PI / 2, ex: 'closed', lax: -.1, rax: -.4, rae: -.8 });
  camPhone.visible = true; camPhone.position.copy(add(BED, .3, .64, -1.95)); camPhone.rotation.set(-PI / 2, 0, .3);
  points([[add(BED, .3, .9, -1.9), 0x9ad0ff, 1.4, 2, 2]]);
  keyDir(-3, 5, 6, BED);
  setCam(add(BED, 1.4, 1.7, .8), add(BED, 0, .6, -1.4), 50, asp);
}));
S(T(117.0), (lt, k, t) => {                                            // 20 "so um minuto"
  mood('night', { near: 6, far: 40 }); show('bairro', 'clouds'); stairA.g.visible = true;
  const a = stepPos(stairA, 79), b = stepPos(stairA, 82);
  const finger = smooth(T(121.6), T(121.9), t) * (1 - smooth(IE(2) - .3, IE(2), t));
  nam.pose(merge(P.sit(), a, { ry: 0, hx: .6, lax: -.8 + -.6 * finger, lae: -.9 + .4 * finger, rax: -.7, rae: -1.1 + .15 * Math.sin(t * 16), ex: 'neutral' }));
  showProp('sheets', add(handsMid(nam), .05, -.05, .05));
  showProp('lamp', add(a, -.45, 0, .05));
  const s0 = T(118.6), s1 = T(119.6);
  const spin = 4 * PI * smooth(s0, s1, t);
  const spinning = t > s0 - .2 && t < s1 + .1;
  const done = t > s1 + .1;
  liv.pose(merge(spinning ? { llx: -.9, llk: 1.8, llz: .5, laz: 2.7, raz: 2.7, lae: -.5, rae: -.5 } : done ? { laz: .9 * (1 - smooth(s1, s1 + 1.5, t)) + .1, raz: .9 * (1 - smooth(s1, s1 + 1.5, t)) + .1, hx: .25 } : P.stand(t), b,
    { ry: spin, ex: t > T(122.6) ? 'sad' : 'smile' }));
  points([[add(a, -.4, .5, .3), 0xffc070, 2.2, 4, 2]]);
  setCam(add(a, .9, 1.25, 3.3 - .4 * k), add(L(a, b, .5), 0, 1.0, 0), 50);
  keyDir(4, 6, 6, a);
});
S(T(123.32), (lt, k, t) => {                                           // 21 a sapatilha tirada
  show('bairro', 'clouds'); stairA.g.visible = true;
  const a = stepPos(stairA, 79), b = stepPos(stairA, 82);
  showProp('lamp', add(a, -.45, 0, .05));
  points([[add(a, -.4, .5, .3), 0xffc070, 1.8, 4, 2]]);
  if (t < T(124.9)) {
    mood('night', { near: 3, far: 20 });
    const up = smooth(T(123.6), T(124.3), t);
    nam.pose(merge(P.sit(), a, { ry: 0, hx: .6 * (1 - up) - .25 * up, rax: -.7, rae: -1.1, lax: -.8, lae: -.9, ex: up > .5 ? 'sad' : 'neutral' }));
    showProp('sheets', add(handsMid(nam), .05, -.05, .05));
    const h = headPos(nam);
    setCam(add(h, .25, -.1, 1.05), add(h, 0, -.1, 0), 46);
  } else {
    mood('cold'); U.uCool.value = .55;
    nam.pose(merge(P.sit(), a, { ry: 0, hx: -.25, ex: 'sad', rax: -.6, lax: -.6 }));
    const pull = Math.sin(t * 2.5) * .15;
    liv.pose(merge(P.sit(), b, { ry: 0, lean: .75, lax: -1.0 + pull, rax: -.9 - pull, lae: -.3, rae: -.3, hx: .4, ex: 'sad' }));
    points([[add(a, -.4, .5, .3), 0xffc070, 1.8, 4, 2], [add(b, .4, 1.7, -.9), 0x9ab0ff, 14, 6, 2]]);
    setCam(add(b, .45, 1.55, -1.35), add(b, -.1, .4, 1.6), 52);
  }
  keyDir(3, 6, 6, a);
});
S(T(126.9), (lt, k, t) => {                                            // 22 a cadeira vazia
  mood('room'); show('hall'); U.uCool.value = .15;
  const seats = [[0, 0], [0, 1], [0, 2], [0, 4], [0, 5], [0, 6], [1, 1], [1, 2], [1, 4], [1, 5], [2, 3], [2, 6]];
  ADULTS.forEach((ad, i) => {
    const [r, c] = seats[i]; const p = SETS.chairPos(r, c); const film = i % 3 === 0;
    ad.pose(merge(P.sitChair(), p, { ry: PI, ex: 'smile', ...(film ? { rax: -1.4, rae: -.5 } : {}) }));
    ad.props.phone.visible = film;
  });
  KIDS.slice(0, 4).forEach((c, i) => c.pose(merge(P.stand(t), add(HALL, -1.8 + i * 1.2, .45, -7.0), { ry: 0, lax: -1.2, laz: .5, lae: -1.2 + .1 * Math.sin(t * 6 + i), rax: -1.0, rae: -1.4 + .2 * Math.sin(t * 9 + i), ex: 'neutral' })));
  const n = add(HALL, -5.0, 0, -5.4);
  const toDoor = Math.atan2(3.5 - (-5.0), 9 - (-5.4));
  nam.pose(merge(P.stand(t), n, { ry: toDoor, ex: 'sad' }));
  const t1 = T(130.6), t2 = T(133.0);
  if (t < t1) setCam(add(HALL, -5.8, 2.3, -7.6 + lt * .1), add(HALL, .5, .8, 4.0), 52);
  else if (t < t2) { const c = SETS.chairPos(0, 3); setCam(add(c, .35, 1.25, -1.1 + .1 * (t - t1)), add(c, 0, .5, 0), 44); }
  else setCam(add(n, -.45, 1.7, -1.0), add(HALL, 3.5, 1.1, 9), 50);
  points([[add(HALL, 0, 3.5, -6.5), 0xffe0b0, 3, 10, 2]]);
  keyDir(2, 6, 4, HALL);
});
S(T(135.4), (lt, k, t) => {                                            // 23 a briga, na chuva
  mood('rain'); U.uCool.value = .6; show('bairro');
  const { a, b } = duo(t, 4.2, 70, 70);
  const g1 = Math.sin(t * 3.1), g2 = Math.sin(t * 2.6 + 1);
  nam.pose(merge(P.stand(t), add(a, .2, 0, 0), { ry: PI / 2, rax: -.6 - .4 * Math.max(0, g1), rae: -.8, lax: -.3, lean: .08, ex: Math.floor(t * 5) % 3 ? 'open' : 'sad' }));
  liv.pose(merge(P.stand(t), add(b, -.1, 0, 0), { ry: -PI / 2, lax: -.7 - .4 * Math.max(0, g2), lae: -1.0, ex: Math.floor(t * 4 + 2) % 3 ? 'sadopen' : 'sad' }));
  const mid = add(L(a, b, .5), 0, 1.3, 0);
  const t1 = T(140.2), t2 = T(141.6);
  if (t >= t1 && t < t2) { const h = headPos(liv); setCam(add(h, -.4, .05, .9), h, 46); rain(h, t, true, 4, 4); points([[add(h, -.5, .4, .7), 0xa8b8e0, 3, 3, 2]]); keyDir(-3, 8, 5, mid); return; }
  else { const kk = t < t1 ? (t - T(135.4)) / (t1 - T(135.4)) : (t - t2) / (T(145.7) - t2); setCam(add(mid, 0, .3 + kk * .4, t < t1 ? 5.2 - kk * 1.2 : 4.0 + kk * 3), mid, 50); rain(mid, t, true, 9, 7); }
  points([[add(mid, 0, 1.2, 2.0), 0xa8b8e0, 5, 9, 2]]);
  keyDir(-3, 8, 5, mid);
});
S(T(145.7), (lt, k, t) => {                                            // 24 "nada disso parece grande" (quarta parede, molhado)
  mood('rain', { near: 1.5, far: 9 }); U.uCool.value = .6; show('bairro'); stairA.g.visible = true;
  const a = stepPos(stairA, 70);
  nam.pose(merge(P.stand(t), a, { ry: 0, hx: .05, ex: talk(t, 'sad') }));
  const h = headPos(nam);
  rain(h, t, true, 3, 4);
  points([[add(h, .3, .4, .8), 0xa8b8e0, 2.2, 3, 2]]);
  setCam(add(h, 0, 0, lerp(1.05, .8, ease(k))), h, 46);
  keyDir(-2, 6, 4, a);
});

// ===== ATO 4: A ESCOLHA =====
S(T(150.9), (lt, k, t) => {                                            // 25 descendo / Livia com a passagem
  const t1 = T(153.6), t2 = T(155.2);
  if (t < t1) {
    mood('cold'); U.uCool.value = .45; show('bairro', 'clouds'); stairA.g.visible = true;
    const a = stepPos(stairA, 70);
    const kb = namKeyboard(t, a, 0, 'sad');
    nam.pose(merge(P.keyboard(0), a, { ry: 0, ex: 'sad', hx: .4 }));
    lidPivot.rotation.x = -1.6 * (1 - smooth(T(152.1), T(152.4), t));
    setCam(add(kb.position, .25, .75, 1.0), add(kb.position, 0, .35, 0), 50);
    keyDir(3, 6, 6, a);
  } else if (t < t2) {
    mood('night'); show('bairro'); stairA.g.visible = true;
    const kk = 22 - (t - t1) * 2.4;
    const p = stepPos(stairA, kk); p.y += .04 * Math.abs(Math.sin(kk * PI));
    nam.pose(merge(P.walk(kk * PI, .7), p, { ry: 0, hx: .2, ex: 'sad' }));
    setCam(add(p, 3.2, .6, -.5), add(p, 0, .9, 0), 50);
    keyDir(3, 6, 6, p);
  } else {
    mood('station'); show('station');
    SETS.bus.position.set(4.2, 0, 7.2); SETS.bus.rotation.y = -.55;
    const p = add(STA, 1.0, 0, 1.4);
    liv.pose(merge(P.stand(t), p, { ry: PI - .3, lax: -1.0, rax: -1.0, lae: -.7, rae: -.7, lay: -.25, ray: .25, hx: .4, ex: 'sad' }));
    showProp('ticket', add(handsMid(liv), 0, .05, -.04), [-.5, PI - .3, 0]);
    setCam(add(p, -.8, 1.55, -2.6 + .3 * (t - t2) / 3), add(p, .3, 1.15, 1), 50);
    keyDir(0, 8, -3, p);
  }
});
S(T(158.6), (lt, k, t) => {                                            // 26 "essa e a parte em que voce grita..." (quarta parede)
  mood('night', { near: 4, far: 24 }); show('bairro'); stairA.g.visible = true;
  const a = stepPos(stairA, 12);
  nam.pose(merge(P.stand(t), a, { ry: 0, ex: talk(t, 'half') }));
  const h = headPos(nam);
  points([[add(h, .3, .6, -1.2), 0xffd0a0, 6, 5, 2]]);
  setCam(add(h, -.15, .05, lerp(1.6, 1.2, ease(k))), add(h, 0, -.1, 0), 48);
  keyDir(-2, 4, -6, a);
});
S(T(163.7), (lt, k, t) => {                                            // 27 a sapatilha nova e as fotos
  mood('station'); show('station'); SETS.bus.position.set(4.2, 0, 7.2); SETS.bus.rotation.y = -.55;
  const pn = add(STA, .0, 0, 1.0), pl = add(STA, .85, 0, 1.05);
  const t1 = T(167.3), t2 = T(171.4);
  if (t < t1) {
    nam.pose(merge(P.stand(t), pn, { ry: PI / 2, ex: 'sad' }));
    liv.pose(merge(P.stand(t), pl, { ry: -PI / 2, ex: 'sad', hx: .15, lax: -.6, lae: -.8 }));
    showProp('ticket', add(handPos(liv, 0), 0, .04, 0), [-.5, -PI / 2, 0]);
    setCam(add(L(pn, pl, .5), -.3, 1.5, -2.6 + .3 * k), add(L(pn, pl, .5), 0, 1.2, 0), 50);
  } else if (t < t2) {
    setLivFeet(livFootNew, false);
    const up = smooth(t1 + .5, t1 + 1.3, t);
    liv.pose(merge(P.stand(t), pl, { ry: -PI / 2 + .4, hy: .1 * up, lf: 1.0 * up, rf: 1.0 * up }));
    const f = add(pl, 0, .15, 0);
    points([[add(f, -.5, .6, -.6), 0xffe8f0, .7, 3, 2]]);
    setCam(add(f, -1.7, .4, .25 - .15 * (t - t1) / 4), add(f, 0, .3, 0), 40);
  } else {
    nam.pose(merge(P.stand(t), pn, { ry: PI / 2, lax: -1.2, rax: -1.2, lae: -.5, rae: -.5, lay: -.2, ray: .2, hx: .5, ex: 'sad' }));
    const m = handsMid(nam);
    showProp('photos', add(m, 0, .04, 0), [.5, -PI / 2, 0], 1.1);
    points([[add(m, -.3, .5, -.4), 0xfff0d8, 2.2, 3, 2]]);
    setCam(add(m, -.25, .42, -.42), m, 42);
  }
  keyDir(0, 8, -3, pn);
});
S(T(175.6), (lt, k, t) => {                                            // 28 a despedida + cada um subindo a sua escada
  const t1 = T(178.4);
  if (t < t1) {
    mood('station'); show('station'); SETS.bus.position.set(4.2, 0, 7.2); SETS.bus.rotation.y = -.55;
    const pn = add(STA, .2, 0, 1.0), pl = add(STA, .62, 0, 1.0);
    const hug = { lax: -1.35, rax: -1.35, lay: -.35, ray: .35, laez: -1.3, raez: -1.3, lae: -.2, rae: -.2 };
    nam.pose(merge(P.stand(t), pn, hug, { ry: PI / 2, hz: .15, ex: 'closed' }));
    liv.pose(merge(P.stand(t), pl, hug, { ry: -PI / 2, hz: -.2, hyw: .3, ex: 'closed' }));
    const c = add(L(pn, pl, .5), 0, 1.4, 0);
    const ang = lerp(-.9, -.4, k * 1.8);
    setCam(add(c, Math.sin(ang) * 2.0, .1, -Math.cos(ang) * 2.0), c, 46);
    keyDir(0, 8, -3, c);
  } else {
    mood('dusk', { fog: 0x3a3050 }); U.uCool.value = .25; show('bairro', 'clouds');
    stairA.g.visible = stairB.g.visible = true;
    stairA.g.position.set(-.4, 4.1, 1.0); stairA.g.rotation.y = .3;
    stairB.g.position.set(2.8, 4.1, 1.0); stairB.g.rotation.y = -.3;
    const kk = 30 + (t - t1) * 1.6;
    const pa = stepPos(stairA, kk), pb = stepPos(stairB, kk + 1);
    nam.pose(merge(P.climb(kk * PI), pa, { ry: PI + .3 }));
    liv.pose(merge(P.climb((kk + .5) * PI), pb, { ry: PI - .3 }));
    setCam(V(1.2, 9 + (t - t1) * .6, 13), V(1.2, 16, -14), 54);
    keyDir(6, 5, 8);
  }
});

// ===== ATO 5: ANOS DEPOIS =====
S(T(180.88), (lt, k, t) => {                                           // 29 a escola pronta
  mood('day'); show('bairro'); groundSchool.setLit(0);
  titleText = (t < I(3) + 2.6) ? 'ANOS DEPOIS' : '';
  const door = V(-8, 0, 11.9);
  namOld.pose(merge(P.stand(t), add(door, -1.25, 0, .3), { ry: .25, ex: 'smile', raz: .3 }));
  KIDS.slice(0, 5).forEach((c, i) => {
    const s = clamp((t - I(3) - i * .45) / 3.2, 0, 1);
    const p = L(V(-7 + (i % 2 ? .9 : -.6), 0, 17.5 + i * .5), add(door, 0, 0, .1), s);
    c.pose(merge(P.walk(t * 9 + i, 1), p, { ry: PI + (i % 2 ? .2 : -.1), ex: 'smile' }));
    c.root.visible = s < .98;
  });
  setCam(V(-5.6 - k * .6, 1.7, 19.5 - k * 1.0), V(-8, 2.2, 10.5), 52);
  keyDir(6, 10, 7, door);
});
S(T(183.4), (lt, k, t) => {                                            // 30 toc toc toc (porta)
  mood('room'); show('schoolIn');
  SETS.door.rotation.y = 0;
  let knock = 0;
  for (let i = 0; i < 3; i++) { const tk = I(4) + .2 + i * .36; knock = Math.max(knock, Math.exp(-Math.pow((t - tk) / .05, 2))); }
  SETS.door.position.z = 3.45 + .012 * knock;
  const turn = smooth(T(185.2), T(186.0), t);
  namOld.pose(merge(P.stand(t), add(SIN, .5, 0, -1.4), { ry: lerp(PI - .4, -.6, turn), hyw: -.4 * turn, ex: turn > .5 ? 'surprise' : 'neutral', rax: -.5 * (1 - turn), rae: -.8 * (1 - turn) }));
  if (t < I(4)) setCam(add(SIN, 2.4, 1.6, 1.6), add(SIN, .3, 1.2, -1.2), 50);
  else setCam(add(SIN, -.6, 1.25, 1.75 + .1 * (t - I(4))), add(SIN, -1.0, 1.15, 3.45), 44);
  points([[add(SIN, -1.0, 1.2, 3.0), 0xffe8c0, 1.5 + 2 * knock, 3, 2]]);
  keyDir(3, 6, 6, SIN);
});
S(T(186.9), (lt, k, t) => {                                            // 31 Livia volta
  mood('room'); show('schoolIn');
  const open = smooth(0, .8, lt);
  SETS.door.rotation.y = -1.7 * open;
  livOld.pose(merge(P.stand(t), add(SIN, -1.1, 0, 3.95), { ry: PI, ex: 'smile' }));
  namOld.pose(merge(P.stand(t), add(SIN, -.85, 0, 1.75), { ry: 0, ex: 'surprise' }));
  points([[add(SIN, -1.1, 1.8, 3.0), 0xfff0c8, 1.0 * open, 4, 2]]);
  setCam(add(SIN, .4, 1.7, 1.1 + .25 * k), add(SIN, -1.1, 1.45, 3.9), 50);
  keyDir(3, 6, 6, SIN);
});
S(T(190.1), (lt, k, t) => {                                            // 32 as fotos e o piano ("ainda bem que nao ficou na cozinha")
  mood('room'); show('schoolIn');
  const t1 = T(192.0), t2 = T(194.9), tq = I(5), tr = T(196.7);
  points([[add(SIN, -3.2, 1.8, -1.2), 0xffd090, 2.2, 6, 2]]);
  if (t < t1) {
    livOld.pose(merge(P.stand(t), add(SIN, -1.6 + .5 * (t - T(190.1)) / 2, 0, -2.4), { ry: PI - .2, hx: -.1, ex: 'smile' }));
    namOld.pose(merge(P.stand(t), add(SIN, -.3, 0, -1.0), { ry: PI - .6, ex: 'smile' }));
    setCam(add(SIN, -.2 - .8 * k * 3, 1.6, -.3), add(SIN, -1.6, 1.9, -3.4), 50);
  } else if (t < tr) {
    const w = smooth(t1, t2 - .4, t);
    const lp = add(SIN, lerp(-1.0, .75, w) + .35 * smooth(t2, tq, t), 0, -2.3);
    const lookBack = smooth(tq + .3, tq + .9, t);
    livOld.pose(merge(w < .99 ? P.walk(t * 6, .7) : P.stand(t), lp, { ry: PI, rax: -1.25 * smooth(t2 - .3, t2, t), rae: -.2, raz: .15, hyw: -1.0 * lookBack, ex: lookBack > .5 ? 'smile' : 'neutral' }));
    namOld.pose(merge(P.stand(t), add(SIN, -.6, 0, -.6), { ry: PI - .5, ex: 'smile' }));
    if (t < t2) setCam(add(SIN, -1.2, 1.6, .4), add(SIN, .8, 1.0, -2.9), 50);
    else { const h = headPos(livOld); setCam(add(SIN, -.6, 1.55, -.7), add(h, .3, -.35, -.1), 46); }
  } else {
    livOld.pose(merge(P.stand(t), add(SIN, 1.1, 0, -2.3), { ry: PI - .9, ex: 'smile' }));
    namOld.pose(merge(P.stand(t), add(SIN, -.6, 0, -.6), { ry: PI - .5, ex: 'laugh', lean: .12 * Math.abs(Math.sin(t * 8)) }));
    const h = headPos(namOld);
    setCam(add(h, -.75, -.05, -1.25), h, 46);
  }
  keyDir(3, 6, 6, SIN);
});
S(T(197.8), (lt, k, t) => {                                            // 33 a outra vida (lapis + aquarela dourada)
  mood('sketch'); show('kitchen'); U.uSketch.value = smooth(0, .7, lt);
  setLivFeet(livFootSkin, false);
  nam.props.bag.visible = false;
  nam.pose(merge(P.sitChair(), add(KIT, 1.3, 0, -1.48), { ry: PI, hy: -.55, lax: -1.15, rax: -1.15, lae: -.45 + .1 * Math.sin(t * 7), rae: -.45 + .1 * Math.sin(t * 8), lean: .12, hyw: -.4, ex: 'smile' }));
  const sp = t * 1.4;
  liv.pose(merge({ laz: 1.8 + .6 * Math.sin(t * 1.4), raz: 2.4 - .6 * Math.sin(t * 1.4), lae: -.5, rae: -.5, llx: -.6 * Math.max(0, Math.sin(t * 1.4)), llk: 1.0 * Math.max(0, Math.sin(t * 1.4)) }, add(KIT, -.95, 0, .45), { ry: sp, ex: 'smile' }));
  setCam(L(add(KIT, 2.9, 1.75, 2.9), add(KIT, 2.3, 1.6, 2.3), ease(k)), add(KIT, .1, 1.0, -.7), 50);
  keyDir(3, 6, 6, KIT);
});
S(T(206.1), (lt, k, t) => {                                            // 34 o celular vibra
  mood('room'); show('schoolIn'); U.uSketch.value = .8 * (1 - smooth(0, .55, lt));
  const ph = showProp('phone', add(SIN, 1.5, 1.262, -3.05), [-PI / 2, 0, .2]);
  if ((lt % .65) < .42) { ph.position.x += .006 * Math.sin(t * 160); ph.rotation.z += .03 * Math.sin(t * 130); }
  points([[add(SIN, 1.5, 1.7, -2.8), 0xbfe0ff, 1.4, 2, 2]]);
  setCam(add(SIN, 1.25, 1.75, -2.55), add(SIN, 1.5, 1.26, -3.05), 44);
  keyDir(3, 6, 6, SIN);
});
S(T(207.75), (lt, k, t) => {                                           // 35 o abraco e a saida
  mood('dusk'); show('bairro'); car.visible = true; groundSchool.setLit(2);
  const door = V(-8, 0, 12.1);
  const t1 = T(209.2), t2 = T(210.4);
  const hug = smooth(t1 - .3, t1 + .2, t) * (1 - smooth(t2 - .2, t2 + .2, t));
  const H = { lax: -1.35 * hug, rax: -1.35 * hug, lay: -.35 * hug, ray: .35 * hug, laez: -1.3 * hug, raez: -1.3 * hug };
  namOld.pose(merge(P.stand(t), add(door, -.25, 0, 0), H, { ry: PI / 2, ex: hug > .5 ? 'closed' : 'sad' }));
  const away = clamp((t - t2) / 2.2, 0, 1);
  const lp = L(add(door, .2, 0, 0), V(-4.0, 0, 15.0), away);
  livOld.pose(merge(away > 0 ? P.walk(t * 7, .8) : P.stand(t), lp, H, { ry: away > 0 ? Math.atan2(4.0, 2.9) : -PI / 2, ex: 'sad' }));
  setCam(V(-4.6, 1.7, 17.2), V(-7.7, 1.3, 12.3), 50);
  keyDir(-6, 4, 6, door);
});
S(T(211.5), (lt, k, t) => {                                            // 36 a aula continua
  mood('room'); show('schoolIn');
  const sit = smooth(T(215.0), T(215.6), t);
  let wrong = 0; for (const o of [.62, 1.72]) wrong = Math.max(wrong, smooth(T(213.4) + o, T(213.4) + o + .15, t) * (1 - smooth(T(213.4) + o + .6, T(213.4) + o + 1.0, t)));
  davi.pose(merge(P.sitChair(), add(SIN, 1.2, 0, -2.2), { ry: PI, hy: -.4, lax: -1.2 + .5 * wrong, rax: -1.2 + .5 * wrong, lae: -.3, rae: -.3, hx: .35 * wrong + .05, ex: wrong > .3 ? 'sad' : 'neutral' }));
  const np = L(add(SIN, 2.9, 0, -1.3), add(SIN, 1.75, 0, -2.2), smooth(T(214.2), T(215.0), t));
  namOld.pose(merge(sit > 0 ? merge(P.sitChair(), { hy: -.5 * sit, llx: -1.5 * sit, rlx: -1.5 * sit, llk: 1.5 * sit, rlk: 1.5 * sit }) : P.walk(t * 6, .6 * (t > T(214.2) ? 1 : 0)), np,
    { ry: PI + (sit > 0 ? 0 : .5), laz: .75 * sit, lae: -.6 * sit, lax: -.3 * sit, hyw: .5 * sit, ex: 'smile' }));
  points([[add(SIN, -3.2, 1.8, -1.2), 0xffa860, 3.2, 7, 1.6]]);
  setCam(add(SIN, -1.0 + .3 * k, 1.45, -.6), add(SIN, 1.45, .95, -2.3), 50);
  keyDir(-6, 3, 1, SIN);
});
S(T(217.6), (lt, k, t) => {                                            // 37 o entendimento (escola acesa a noite, escada no ceu)
  mood('night'); show('bairro', 'clouds'); stairA.g.visible = true; groundSchool.setLit(2);
  points([[V(-8, 1.6, 12.8), 0xffc070, 4, 8, 2]]);
  setCam(V(-3.2 + k * 1.5, 5.5 + k * 3, 27 + k * 6), V(-5, 9, -6), 54);
  keyDir(4, 8, 6);
});

// ===== ATO 6: A QUARTA PAREDE =====
const sitVoid = (t, o) => { namOld.pose(merge(P.sit(), add(VOID, 0, .56, 0), { ry: 0, lax: -.25, rax: -.25, lae: -.5, rae: -.5 }, o)); points([[add(VOID, .5, 1.6, 1.6), 0xffe8d0, 2.2, 5, 2]]); };
S(I(6), (lt, k, t) => {                                                // 38 fundo preto, uma luz de cima
  mood('void'); show('void');
  sitVoid(t, { ex: t < T(225.79) ? 'neutral' : talk(t, 'neutral') });
  const h = headPos(namOld);
  spotlight(true, add(VOID, 0, 5.5, .6), add(VOID, 0, .8, 0), 0xfff0d8, 70, .45);
  setCam(add(VOID, .9, 1.25, lerp(3.2, 2.8, ease(k))), add(h, 0, -.5, 0), 46);
});
S(T(229.92), (lt, k, t) => {                                           // 39 "quem ficou na escada do lado?"
  mood('void'); show('void');
  const tilt = smooth(T(235.6), T(236.2), t);
  sitVoid(t, { hz: .18 * tilt, ex: talk(t, 'neutral') });
  const h = headPos(namOld);
  spotlight(true, add(VOID, 0, 5.5, .6), add(VOID, 0, .8, 0), 0xfff0d8, 70, .45);
  setCam(add(h, 0, .02, lerp(1.45, 1.1, ease(k))), h, 46);
});
S(T(237.5), (lt, k, t) => {                                            // 40 "bate tres vezes"
  mood('void'); show('void');
  let knock = 0;
  for (let i = 0; i < 3; i++) { const tk = I(8) + .15 + i * .36; knock = Math.max(knock, Math.exp(-Math.pow((t - tk) / .07, 2))); }
  const reach = smooth(T(237.5), T(238.3), t);
  sitVoid(t, { lax: -1.3 * reach - .15 * knock, lae: -.35 * reach, laz: -.12 * reach, lean: .15 * reach + .05 * knock, ex: talk(t, 'neutral') });
  const h = headPos(namOld);
  spotlight(true, add(VOID, 0, 5.5, .6), add(VOID, 0, .8, 0), 0xfff0d8, 70, .45);
  setCam(add(h, -.1, .05, 1.9), add(h, 0, -.2, 0), 50);
});
S(IE(8), () => { mood('void'); return 'black'; });                    // 41 tela preta

// --------------------------------------------------------------- loop por quadro
SHOTS.sort((a, b) => a.t0 - b.t0);
export function renderAt(t) {
  let i = 0; while (i + 1 < SHOTS.length && SHOTS[i + 1].t0 <= t) i++;
  const sh = SHOTS[i], t1 = i + 1 < SHOTS.length ? SHOTS[i + 1].t0 : TL.duration;
  const lt = t - sh.t0, k = clamp(lt / (t1 - sh.t0), 0, 1);
  titleText = ''; fadeV = 0; splitOn = false;
  resetFrame(); setLivFeet(livFootOld, true); nam.props.bag.visible = true; handPhone.visible = false; camPhone.visible = false; car.visible = false;
  SETS.dreamSchool.setLit(0); groundSchool.setLit(0); lidPivot.rotation.x = -1.6; PROPS.notebook.children.at(-1).position.x = .3;
  SETS.door.rotation.y = 0; SETS.door.position.z = 3.45; SETS.bus.position.set(3, 0, 5.2); SETS.bus.rotation.y = 0;
  const r = sh.fn(lt, k, t, t1 - sh.t0);
  if (r === 'black') { renderer_black(); }
  else if (r !== 'done') { updateWindows(); render(); }
  // legenda
  const c = TL.captions.find((c) => t >= c[0] && t < c[1]);
  dom.cap.style.visibility = c ? 'visible' : 'hidden';
  if (c) { if (dom.cap.textContent !== c[2]) dom.cap.textContent = c[2]; dom.cap.className = 'cap' + (c[3] ? ' ' + c[3] : ''); }
  dom.title.textContent = titleText; dom.title.style.visibility = titleText ? 'visible' : 'hidden';
  dom.split.style.visibility = splitOn ? 'visible' : 'hidden';
  dom.fade.style.opacity = String(fadeV);
}
function renderer_black() { resetFrame(); mood('void'); setCam(V(0, -500, 0), V(0, -500, -1)); render(); }
window.SHOTS = SHOTS;
