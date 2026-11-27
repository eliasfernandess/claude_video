// "E se você virasse um ímã humano?" — versão B (estilo de rosto de pele, cards e diagramas). Voz a 1,0x, 91,9 s.
import * as THREE from 'three';
import { makeShot, smooth, lerp, clamp, rng } from './motor/core.js';
import { cut, glowSprite } from './motor/kit.js';
import { phone } from './motor/kit2.js';
import { cameraCortes } from './cortes.js';
import { tiaguin, senhora, pessoa, deitar, despertador, chaveTex, garfoTex, moedaTex, brincoTex, linhasCampo, quarto, papel, imaTex, ITENS, certoTex, erradoTex, bussolaTex, agulhaTex, cartaoVersoTex, barraTex, bolaFerroTex, reguaTex, setaTex, onibusIconeTex, miniTiaguinTex, fulcroTex, tabuaTex, desenhaMapa, mercado, rua, onibusDentro } from './pecas.js';

const FX = (st) => ({ bloom: .2, bloomT: .95, vig: .5, grain: .05, exposure: 1.02, range: 2.2, blur: 11, ...st });
const pop = (t, a, d = .18) => { const k = clamp((t - a) / d); return k <= 0 ? 0 : 1 + Math.sin(k * Math.PI) * .25; };
const voa = (t, a, b) => smooth(a, b, t);
const lerp3 = (p, q, k) => p.map((v, i) => lerp(v, q[i], k));

/** Monta uma cena: montar(c) devolve o estado; anima(t, o, s) anima em tempo absoluto; planos com tempos absolutos. */
function cena(fundo, montar, planos, anima, fx = {}) { return (t0, t1) => {
  const s = makeShot(t0, t1, fundo, 38), o = montar(s.scene, s) || {}; const P = planos.map(([f, ...r]) => [f - t0, ...r]);
  s.update = (t, u) => { const pl = cameraCortes(s.camera, u, P); const r = anima ? anima(t, o, s, pl) : null; return FX({ focus: pl.dist, ...fx, ...(r || {}) }); }; return s; }; }

/** Objetos grudados no Tiaguin (despertador na testa, chave, garfo e moedas). */
function equipar(ti) { const rel = despertador(.82); rel.position.set(0, .15, .07); rel.rotation.z = .12; rel.traverse(m => { if (m.name === 'pe') m.visible = false; }); ti.head.add(rel);
  const chave = cut(chaveTex, .24, .12); chave.position.set(.13, 1.22, .08); chave.rotation.z = .45; const garfo = cut(garfoTex, .1, .25); garfo.position.set(-.15, 1.0, .08); garfo.rotation.z = -.35;
  const moedas = [[.17, .84], [-.07, .72], [.13, .52]].map(([a, b]) => { const m = cut(moedaTex, .085, .085); m.position.set(a, b, .08); return m; }); [chave, garfo, ...moedas].forEach(m => ti.root.add(m));
  return { rel, chave, garfo, moedas, show(r = true, c = true, g = true, m = 3) { rel.visible = r; chave.visible = c; garfo.visible = g; moedas.forEach((x, i) => x.visible = i < m); } }; }
const OBJ_LOCAL = { chave: [.13, 1.22], garfo: [-.15, 1.0], moedas: [[.17, .84], [-.07, .72], [.13, .52]] };
function brilho(c, cor = '#FFE08A', sz = .35) { const g = glowSprite(cor, sz, .9); c.add(g); return g; }

// ===================== 1. Quarto: acordou ímã (0 – 15,75) =====================
const TI = [.75, -1.2];
const q1 = cena('#E6D8C0', (c) => { const { rel } = quarto(c); const ti = tiaguin(); c.add(ti.root); const eq = equipar(ti); const campo = linhasCampo(); c.add(campo); campo.position.set(TI[0], .95, TI[1] + .05);
    const voo = { chave: cut(chaveTex, .24, .12), garfo: cut(garfoTex, .1, .25), moedas: [0, 1, 2].map(() => cut(moedaTex, .085, .085)) }; [voo.chave, voo.garfo, ...voo.moedas].forEach(m => c.add(m)); return { rel, ti, eq, campo, voo }; },
  [[2.04, [-1.75, 2.45, -.6], [-1.8, 2.3, -.75], [-2.0, .6, -1.95], [-2.0, .6, -1.95], 40],
   [4.07, [1.2, 1.45, 2.7], [1.0, 1.42, 2.3], [.75, 1.05, -1.2], [.75, 1.05, -1.2], 38],
   [6.80, [.6, 1.0, -1.05], [.55, .97, -1.2], [.1, .72, -2.2], [.1, .73, -2.2], 32],
   [9.57, [.55, 1.45, 1.6], [.55, 1.4, 1.25], [.55, 1.2, -1.4], [.6, 1.3, -1.4], 38],
   [11.0, [.75, 1.66, .3], [.75, 1.66, .15], [.75, 1.62, -1.2], [.75, 1.62, -1.2], 34],
   [13.78, [.35, 1.35, 1.7], [.5, 1.3, 1.45], [.7, 1.0, -1.2], [.7, 1.0, -1.2], 38],
   [15.75, [1.3, 1.45, 3.0], [1.05, 1.4, 2.5], [.75, 1.0, -1.2], [.75, 1.0, -1.2], 38]],
  (t, o) => { const { ti, eq, rel, campo, voo } = o; const flash = t >= 2.04 && t < 4.07, deitado = t < 6.8 && !flash;
    if (deitado) { deitar(ti, -.55, .68, -1.95); ti.expr(t < 1.0 ? 'dormindo' : t < 4.07 ? 'pensando' : 'susto'); ti.pose({}); }
    else { ti.root.rotation.set(0, 0, 0); ti.place(TI[0], TI[1]); if (ti.blob) ti.blob.visible = true; }
    const chegou = t >= 9.57 || flash; rel.visible = !chegou; eq.rel.visible = chegou;
    if (!chegou) { if (t < 7.58) { rel.position.set(.15, .73, -2.2); if (t > 4.07) rel.tocar(t); else rel.rotation.z = 0; } else { const k = voa(t, 7.58, 9.57); rel.position.set(lerp(.15, TI[0], k), lerp(.73, 1.77, k) + Math.sin(k * Math.PI) * .5, lerp(-2.2, TI[1] + .09, k)); rel.rotation.z = k * 6.283 * 1.5; } }
    if (chegou && !flash) eq.rel.rotation.z = .12 + (t < 10.2 ? Math.sin(t * 50) * .2 * (10.2 - t) : 0);
    const chg = [['chave', 11.06, [2.6, 1.7, -1.6]], ['garfo', 11.73, [-1.6, 1.3, -1.8]], ['m0', 12.57, [2.2, .5, -2.2]], ['m1', 12.75, [-1.4, .4, -2.0]], ['m2', 12.95, [1.9, 1.1, -2.4]]];
    chg.forEach(([n, ta, de]) => { const i = n[0] === 'm' ? +n[1] : -1; const mundo = n === 'chave' ? voo.chave : n === 'garfo' ? voo.garfo : voo.moedas[i]; const loc = n === 'chave' ? OBJ_LOCAL.chave : n === 'garfo' ? OBJ_LOCAL.garfo : OBJ_LOCAL.moedas[i];
      const preso = flash || t >= ta, voando = !flash && t >= ta - .5 && t < ta; const alvo = [TI[0] + loc[0], loc[1], TI[1] + .09]; mundo.visible = voando;
      if (voando) { const k = voa(t, ta - .5, ta); mundo.position.set(...lerp3(de, alvo, k)); mundo.rotation.z = (1 - k) * 8; }
      const obj = n === 'chave' ? eq.chave : n === 'garfo' ? eq.garfo : eq.moedas[i]; obj.visible = preso && !deitado; });
    campo.set(flash ? 1 : t > 13.9 ? smooth(13.9, 14.6, t) : 0, t);
    if (!deitado) { if (flash) { ti.expr('susto'); ti.pose({ armL: [30, 10], armR: [30, 10] }); } else if (t < 9.0) { ti.expr('sorriso'); ti.pose({ armL: [150 + Math.sin(t * 3) * 8, 20], armR: [150 - Math.sin(t * 3) * 8, 20] }); } else if (t < 9.57) { ti.expr('susto'); ti.pose({}); } else if (t < 11.0) { ti.expr('dor'); ti.pose({ armL: [40, 60], armR: [40, 60] }); } else { ti.expr(t > 13.8 ? 'pensando' : 'susto'); ti.pose({ armL: [20, 10], armR: [20, 10] }); } }
  });

// ===================== 2. Diagrama: o que o ímã puxa (15,75 – 20,55) =====================
const d1 = cena('#EFE6D3', (c) => { papel(c); const ima = cut(imaTex, .8, .8); ima.position.set(0, .95, 0); c.add(ima);
    const it = {}; [['ferro', -.45, .05], ['aco', .45, .05], ['aluminio', -.55, -.85], ['plastico', 0, -.85], ['ouro', .55, -.85]].forEach(([n, x, y]) => { const m = cut(ITENS[n], .42, .5); m.position.set(x, y, .01); c.add(m); const b = cut(n === 'ferro' || n === 'aco' ? certoTex : erradoTex, .16, .16); b.position.set(x + .16, y + .2, .03); c.add(b); it[n] = { m, b, x, y }; }); return { it }; },
  [[17.72, [0, .5, 4.4], [0, .5, 4.0], [0, .45, 0], [0, .45, 0], 30], [20.55, [0, .0, 5.9], [0, .02, 5.5], [0, .02, 0], [0, .02, 0], 30]],
  (t, o) => { const T = { ferro: 16.58, aco: 17.17, aluminio: 18.52, plastico: 19.15, ouro: 19.92 };
    for (const n in o.it) { const { m, b, x, y } = o.it[n]; if (n === 'ferro' || n === 'aco') { const k = voa(t, T[n] - .15, T[n] + .2); const dx = n === 'ferro' ? -.22 : .22; m.position.set(lerp(x, dx, k), lerp(y, .5, k), .01); m.rotation.z = (n === 'ferro' ? -1 : 1) * k * .2; b.position.set(m.position.x + .16 * (n === 'ferro' ? -1 : 1), m.position.y - .1, .03); }
      else { m.position.x = x + (t > T[n] - .3 && t < T[n] + .3 ? Math.sin(t * 60) * .012 : 0); } const sc = pop(t, T[n] + .05); b.scale.setScalar(Math.max(.001, sc)); b.visible = sc > 0; } }, { blur: 3, range: 4, vig: .35 });

// ===================== 3. Quarto: o celular enlouquece (20,55 – 23,45) =====================
const q2 = cena('#E6D8C0', (c) => { quarto(c).rel.visible = false; const ti = tiaguin(); ti.place(TI[0], TI[1]); c.add(ti.root); equipar(ti); const cel = phone((x, a) => desenhaMapa(x, a)); cel.position.set(.95, 1.25, -.5); cel.rotation.set(-.08, -.15, 0); c.add(cel); return { ti, cel }; },
  [[22.0, [1.02, 1.32, .28], [1.0, 1.3, .14], [.95, 1.25, -.5], [.95, 1.25, -.5], 34], [23.45, [.2, 1.55, 1.1], [.3, 1.5, .9], [.8, 1.3, -1.0], [.8, 1.3, -1.0], 38]],
  (t, o) => { o.cel.paint(t * 4.2 + Math.sin(t * 7) * .6); o.ti.expr(t < 22 ? 'susto' : 'sem_graca'); o.ti.pose({ armR: [35, 70], head: Math.sin(t * 2) * 4 }); });

// ===================== 4. Diagrama: a bússola (23,45 – 26,0) =====================
const d2 = cena('#EFE6D3', (c) => { papel(c); const b = cut(bussolaTex, 1.3, 1.3); b.position.set(0, .05, 0); c.add(b); const ag = cut(agulhaTex, .2, 1.0); ag.position.set(0, .05, .02); c.add(ag); const campo = linhasCampo(.9, .8); campo.rotation.z = Math.PI / 2; c.add(campo); return { ag, campo }; },
  [[26.0, [0, .05, 4.5], [0, .05, 3.9], [0, .05, 0], [0, .05, 0], 30]],
  (t, o) => { const k = smooth(24.6, 25.4, t); o.ag.rotation.z = Math.sin(t * 2.2) * .12 * (1 - k) + k * (t - 24.6) * 14; o.campo.set(smooth(24.4, 25.0, t), t); o.campo.position.set(lerp(-1.3, -.85, smooth(24.4, 25.6, t)), .05, .05); }, { blur: 3, range: 4, vig: .35 });

// ===================== 5. Mercado: cartão recusado (26,0 – 30,29) =====================
const m1 = cena('#F1E9D6', (c) => { const { maq } = mercado(c); const ti = tiaguin(); ti.place(-.25, -.15); c.add(ti.root); equipar(ti); const cx = pessoa(3); cx.place(.75, -1.75); c.add(cx.root); const cel = phone((x, a) => desenhaMapa(x, a), .2, .41); c.add(cel); return { maq, ti, cx, cel }; },
  [[28.01, [.15, 1.5, 2.7], [.1, 1.45, 2.35], [.05, 1.15, -.6], [.05, 1.15, -.6], 38], [30.29, [.7, 1.55, -.25], [.66, 1.48, -.36], [.55, 1.03, -.85], [.55, 1.03, -.85], 32]],
  (t, o) => { o.maq.estado(t < 29.3); o.ti.expr(t < 28.01 ? 'sem_graca' : 'susto'); o.ti.pose({ armR: [40, 70] }); o.cel.position.set(.07, 1.12, -.05); o.cel.rotation.set(-.3, -.3, 0); o.cel.paint(t * 4); o.cel.visible = t < 28.01; o.cx.expr(t < 29.4 ? 'neutro' : 'bravo'); });

// ===================== 6. Diagrama: a tarja do cartão (30,29 – 35,81) =====================
const d3 = cena('#EFE6D3', (c) => { papel(c); const cv = cut(cartaoVersoTex, 1.5, .94); cv.position.set(0, .35, 0); c.add(cv); const R = rng(5); const bs = []; for (let i = 0; i < 12; i++) { const b = cut(barraTex, .06, .15); b.position.set(-.66 + i * .12, .594, .02); b.userData.r = (R() - .5) * 7; c.add(b); bs.push(b); }
    const campo = linhasCampo(.7, .7); campo.rotation.z = Math.PI / 2; c.add(campo); return { bs, campo }; },
  [[33.40, [0, .62, 2.5], [0, .6, 1.9], [0, .59, 0], [0, .59, 0], 30], [35.81, [0, .38, 5.7], [0, .4, 5.3], [0, .36, 0], [0, .36, 0], 30]],
  (t, o) => { const k = smooth(33.6, 34.4, t); o.bs.forEach((b, i) => { b.rotation.z = b.userData.r * k + Math.sin(t * 9 + i) * .05 * (t > 31.9 ? 1 : 0) * (1 - k); }); o.campo.set(smooth(33.3, 33.8, t), t); o.campo.position.set(lerp(-1.6, -.75, smooth(33.3, 34.3, t)), .55, .05); }, { blur: 3, range: 4, vig: .35 });

// ===================== 7. Quarto: regra número um (35,81 – 40,45) =====================
const q3 = cena('#E6D8C0', (c) => { quarto(c).rel.visible = false; const ti = tiaguin(); ti.place(TI[0], TI[1]); c.add(ti.root); equipar(ti); return { ti }; },
  [[37.97, [.55, 1.45, 1.9], [.6, 1.42, 1.55], [.7, 1.15, -1.2], [.7, 1.15, -1.2], 38], [40.45, [.95, 1.62, .45], [.9, 1.6, .25], [.75, 1.45, -1.2], [.75, 1.45, -1.2], 34]],
  (t, o) => { const k = smooth(36.2, 36.6, t); o.ti.expr(t < 36.3 ? 'pensando' : 'ideia'); o.ti.pose({ armR: [lerp(10, 165, k), 0], armL: [10, 6], head: -3 }); });

// ===================== 8. Diagrama: dobrou a distância, força ÷ 8 (40,45 – 44,80) =====================
const d4 = cena('#EFE6D3', (c) => { papel(c); const ima = cut(imaTex, .5, .5); ima.position.set(-.8, .25, 0); ima.rotation.z = -Math.PI / 2; c.add(ima); const reg = cut(reguaTex, 1.7, .29); reg.position.set(0, -.18, 0); c.add(reg);
    const bola = cut(bolaFerroTex, .24, .24); c.add(bola); const g = new THREE.PlaneGeometry(1, .14); g.translate(.5, 0, 0); const seta = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: setaTex('#D8392F'), alphaTest: .5, side: THREE.DoubleSide })); seta.rotation.z = Math.PI; c.add(seta); return { bola, seta }; },
  [[42.62, [-.12, .15, 6.3], [-.12, .15, 5.9], [-.12, .1, 0], [-.12, .1, 0], 30], [44.80, [-.12, .12, 6.7], [-.12, .12, 6.4], [-.12, .12, 0], [-.12, .12, 0], 30]],
  (t, o) => { const xb = lerp(-.39, 0, smooth(40.9, 41.8, t)); o.bola.position.set(xb, .25, .02); const d = xb + .78, L = .42 * Math.pow(.39 / d, 3); o.seta.position.set(xb - .14, .5, .02); o.seta.scale.x = Math.max(.02, L * (1 + .05 * Math.sin(t * 8))); }, { blur: 3, range: 4, vig: .35 });

// ===================== 9. Rua: o ônibus chega (44,80 – 47,55) =====================
const r1 = cena('#BFE0F0', (c) => { const { bus } = rua(c, { onibus: true }); const ti = tiaguin(); c.add(ti.root); equipar(ti); return { bus, ti }; },
  [[47.55, [4.6, 1.8, 7.6], [4.0, 1.7, 6.7], [1.0, 1.3, -.8], [.9, 1.3, -.8], 38]],
  (t, o, s) => { const k = smooth(44.8, 46.3, t); o.bus.position.x = lerp(16, 1.6, 1 - Math.pow(1 - k, 2)); const anda = smooth(46.4, 47.5, t); o.ti.place(lerp(.6, .9, anda), lerp(.7, -.05, anda)); if (anda > 0 && anda < 1) o.ti.walk(t, 1, .8); else o.ti.pose({ armR: [20, 10] }); o.ti.expr(t < 46.0 ? 'feliz' : 'sorriso'); o.ti.face(s.camera); });

// ===================== 10. Ônibus: ação e reação (47,55 – 52,90) =====================
const XB = -.3;
const o1 = cena('#DCDFE2', (c) => { const ob = onibusDentro(c); const ti = tiaguin(); ti.place(XB, 0); c.add(ti.root); equipar(ti); const p1 = pessoa(1), p2 = pessoa(4); p1.place(-3.0, .1); p2.place(-4.6, -.1); c.add(p1.root, p2.root);
    const g = new THREE.PlaneGeometry(1, .16); g.translate(.5, 0, 0); const s1 = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: setaTex('#F2C230'), alphaTest: .5, side: THREE.DoubleSide })), s2 = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: setaTex('#56D8F2'), alphaTest: .5, side: THREE.DoubleSide })); s1.rotation.y = Math.PI / 2; s2.rotation.y = -Math.PI / 2; c.add(s1, s2); return { ob, ti, s1, s2, p1, p2 }; },
  [[49.15, [4.8, 1.55, .25], [4.3, 1.5, .2], [0, 1.3, -.2], [0, 1.3, -.2], 40], [52.90, [3.1, 1.45, .15], [2.85, 1.45, .1], [XB, 1.35, -.35], [XB, 1.35, -.35], 44]],
  (t, o, s) => { o.ob.avanca(t); o.ti.face(s.camera); o.p1.face(s.camera); o.p2.face(s.camera); o.p1.pose({ armR: [165, 0] }); o.p2.pose({ armL: [165, 0] });
    o.ti.expr(t < 49.7 ? 'sorriso' : 'pensando'); o.ti.pose({ armR: [165, 0] });
    const k1 = smooth(49.7, 50.1, t), k2 = smooth(51.0, 51.4, t); o.s1.visible = k1 > 0; o.s2.visible = k2 > 0; o.s1.position.set(XB, 1.78, -.12); o.s1.scale.x = Math.max(.001, .95 * k1); o.s2.position.set(XB, 1.5, -1.2); o.s2.scale.x = Math.max(.001, .95 * k2); }, { blur: 9 });

// ===================== 11. Diagrama: quem pesa menos é que vai (52,90 – 57,36) =====================
const d5 = cena('#EFE6D3', (c) => { papel(c); const f = cut(fulcroTex, .4, .35); f.position.set(0, -.62, 0); c.add(f); const tab = new THREE.Group(); tab.position.set(0, -.44, .01); c.add(tab); tab.add(cut(tabuaTex, 1.7, .1));
    const bus = cut(onibusIconeTex, .62, .36); bus.position.set(-.5, .22, .01); tab.add(bus); const mt = cut(miniTiaguinTex, .16, .32); c.add(mt); return { tab, mt }; },
  [[55.13, [0, -.1, 6.4], [0, -.1, 6.0], [0, -.1, 0], [0, -.1, 0], 30], [57.36, [0, .1, 6.2], [0, .1, 5.8], [0, .1, 0], [0, .1, 0], 30]],
  (t, o) => { const k = smooth(53.0, 53.6, t), th = .3 * k + (t > 53.6 ? Math.sin((t - 53.6) * 14) * .03 * Math.max(0, 1 - (t - 53.6) * 2) : 0); o.tab.rotation.z = th;
    const ex = .72, salto = smooth(53.75, 54.3, t), arco = Math.sin(Math.min(1, salto) * Math.PI) * .2 + salto * .35; o.mt.position.set(ex * Math.cos(th) + salto * .05, -.44 + ex * Math.sin(th) + .21 + arco, .03); o.mt.rotation.z = salto * .5; }, { blur: 3, range: 4, vig: .35 });

// ===================== 12. Ônibus: colou na janela e descolou (57,36 – 68,63) =====================
const o2 = cena('#DCDFE2', (c) => { const ob = onibusDentro(c); const ti = tiaguin(); ti.place(XB, 0); c.add(ti.root); equipar(ti); const p1 = pessoa(1); p1.place(-3.0, .1); c.add(p1.root); return { ob, ti, p1 }; },
  [[60.01, [2.6, 1.45, .35], [2.4, 1.45, .3], [XB, 1.35, -.6], [XB, 1.35, -.6], 44],
   [61.92, [XB, 1.6, -3.4], [XB, 1.6, -3.15], [XB, 1.58, -1.2], [XB, 1.58, -1.2], 34],
   [63.83, [XB + .2, 1.6, -3.0], [XB + .15, 1.6, -2.8], [XB, 1.55, -1.2], [XB, 1.55, -1.2], 34],
   [66.25, [2.3, 1.25, .4], [2.15, 1.22, .3], [XB - .1, .95, -.85], [XB - .1, .95, -.85], 44],
   [68.63, [2.2, 1.45, .85], [2.0, 1.42, .7], [XB, 1.2, -.6], [XB, 1.2, -.6], 42]],
  (t, o, s) => { o.ob.avanca(t); o.p1.face(s.camera); o.p1.pose({ armR: [165, 0] }); o.p1.expr(t > 58.5 && t < 62 ? 'susto' : 'neutro'); const ti = o.ti;
    const voo = voa(t, 58.02, 58.5); let z = lerp(0, -1.17, voo); for (const [a, zz] of [[66.42, -.98], [66.88, -.78], [67.13, -.6]]) if (t > a) z = lerp(z, zz, smooth(a, a + .15, t)); const solto = smooth(67.87, 68.15, t); z = lerp(z, -.25, solto);
    ti.root.position.set(XB, Math.sin(voo * Math.PI) * .12, z);
    if (t < 58.02) { ti.face(s.camera); ti.expr('susto'); ti.pose({ armL: [30, 10], armR: [30, 10] }); ti.body.scale.x = 1; }
    else if (solto < .5) { if (s.camera.position.z < -1.3) ti.root.rotation.y = Math.PI; else ti.face(s.camera); const esm = t < 61.92 ? 1 : 0; ti.expr(t < 61.92 ? 'dor' : t < 63.83 ? 'ideia' : 'bravo'); ti.pose({ armL: [100, 0], armR: [100, 0], legR: t > 64.3 ? [70, 0] : [0, 0] }); ti.body.scale.x = 1 + esm * .08; }
    else { ti.face(s.camera); ti.body.scale.x = 1; ti.expr('feliz'); ti.pose({ armL: [150, 20], armR: [150, 20] }); } }, { blur: 9 });

// ===================== 13. Ponto: a chave no bueiro (68,63 – 83,91) =====================
const TP = [-.35, .45];
const r2 = cena('#BFE0F0', (c) => { rua(c); const ti = tiaguin(); ti.place(TP[0], TP[1]); c.add(ti.root); equipar(ti); const sr = senhora(); sr.place(.95, .35); c.add(sr.root); const ps = pessoa(2); ps.place(.95, .4); c.add(ps.root);
    const chave = cut(chaveTex, .2, .1); c.add(chave); const chave2 = cut(chaveTex, .2, .1); c.add(chave2); const br = cut(brincoTex, .1, .1); c.add(br); const gl = brilho(c, '#FFE08A', .4); return { ti, sr, ps, chave, chave2, br, gl }; },
  [[71.61, [.3, 1.65, 6.4], [.3, 1.6, 5.8], [.3, 1.0, 0], [.3, 1.0, 0], 36],
   [75.0, [.6, .78, 1.55], [.52, .7, 1.35], [.25, .45, .15], [.25, .5, .15], 36],
   [77.01, [1.0, 1.55, 2.7], [.95, 1.55, 2.4], [.95, 1.4, .35], [.95, 1.4, .35], 34],
   [80.02, [.3, 1.55, 5.6], [.28, 1.5, 5.1], [.3, 1.15, .4], [.3, 1.15, .4], 36],
   [81.97, [.5, 1.5, 4.6], [.45, 1.45, 4.2], [.35, 1.15, .4], [.35, 1.15, .4], 36],
   [83.91, [.5, .62, 1.05], [.45, .58, .9], [.35, .2, .1], [.35, .28, .1], 34]],
  (t, o, s) => { const { ti, sr, ps, chave, chave2, br, gl } = o; const outro = t >= 80.02; sr.root.visible = !outro; ps.root.visible = outro; ps.face(s.camera); sr.face(s.camera); ti.face(s.camera);
    const kc = voa(t, 70.45, 70.95), some = smooth(70.95, 71.15, t); chave.visible = t < 71.2; chave.position.set(lerp(1.22, .35, kc), lerp(.98, .16, kc * kc) - some * .2, lerp(.42, .1, kc)); chave.rotation.z = kc * 5;
    sr.pose(t < 70.5 ? { armR: [45, 40] } : t < 75 ? { armR: [20, 10] } : { armR: [10, 6], armL: [10, 6] }); sr.expr(t < 70.6 ? 'sorriso' : t < 72 ? 'susto' : t < 75 ? 'pensando' : 'feliz'); if (t >= 75 && t < 77.01) sr.cheer(t, 0, .3);
    const ks = voa(t, 73.8, 74.5); chave2.visible = t > 73.7 && t < 80.02; chave2.position.set(lerp(.35, .22, ks), lerp(.05, .76, ks), lerp(.1, .52, ks)); chave2.rotation.z = Math.sin(t * 6) * .3 * (1 - ks) + .4 * ks;
    if (outro) { chave2.visible = t < 81.0; chave2.position.set(lerp(.22, .75, smooth(80.3, 80.9, t)), .95, .5); }
    const kb = voa(t, 82.3, 83.4); br.visible = t > 81.97; br.position.set(lerp(.35, .3, kb), lerp(.05, .62, kb), lerp(.1, .3, kb)); gl.visible = (t > 73.7 && t < 74.8) || t > 82.2; gl.position.copy(t > 82 ? br.position : chave2.position); gl.material.opacity = .6 + .3 * Math.sin(t * 9);
    const estica = smooth(72.2, 72.7, t) * (t < 75 ? 1 : 0); ti.pose(outro ? (t < 81.97 ? { armR: [70, 10] } : { armR: [35, 0] }) : { armR: [lerp(10, 38, estica), 0] });
    ti.expr(t < 72.2 ? 'susto' : t < 75 ? 'esperto' : t < 78.1 ? 'sem_graca' : 'feliz'); ps.expr('feliz'); ps.pose({ armL: [50, 20] }); }, { blur: 10 });

// ===================== 14. Quarto: o despertador agora ajuda (83,91 – fim) =====================
const q4 = cena('#E6D8C0', (c) => { quarto(c).rel.visible = false; const ti = tiaguin(); c.add(ti.root); const eq = equipar(ti); const campo = linhasCampo(); campo.position.set(TI[0], .95, TI[1] + .05); c.add(campo); return { ti, eq, campo }; },
  [[86.81, [-1.75, 2.45, -.6], [-1.8, 2.3, -.75], [-2.0, .6, -1.95], [-2.0, .6, -1.95], 38],
   [89.40, [-1.6, 1.95, -1.05], [-1.66, 1.85, -1.15], [-2.0, .66, -1.95], [-2.0, .66, -1.95], 36],
   [999, [.85, 1.6, 1.25], [.8, 1.58, .95], [.75, 1.4, -1.2], [.75, 1.4, -1.2], 36]],
  (t, o) => { const { ti, eq, campo } = o; const final = t >= 89.4;
    if (!final) { deitar(ti, -.55, .68, -1.95); ti.pose({}); ti.expr(t < 86.9 ? 'dormindo' : t < 87.8 ? 'susto' : 'feliz'); eq.rel.rotation.z = .12 + (t > 86.9 && t < 88.6 ? Math.sin(t * 70) * .16 : 0); campo.set(0); }
    else { ti.root.rotation.set(0, 0, 0); ti.place(TI[0], TI[1]); if (ti.blob) ti.blob.visible = true; ti.expr(t < 90.2 ? 'sorriso' : 'esperto'); ti.pose({ armR: [30, 40], armL: [10, 6], head: 4 }); campo.set(smooth(89.6, 90.3, t) * .8, t); eq.rel.rotation.z = .12; } });

export const CENAS = [[q1, 0, 15.75], [d1, 15.75, 20.55], [q2, 20.55, 23.45], [d2, 23.45, 26.0], [m1, 26.0, 30.29], [d3, 30.29, 35.81], [q3, 35.81, 40.45], [d4, 40.45, 44.80], [r1, 44.80, 47.55], [o1, 47.55, 52.90], [d5, 52.90, 57.36], [o2, 57.36, 68.63], [r2, 68.63, 83.91], [q4, 83.91, 999]];
