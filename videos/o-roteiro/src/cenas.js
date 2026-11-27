// O roteiro: cenas (tempos alinhados à voz apertada, 86 s, ~40 trocas de imagem)
import * as THREE from 'three';
import { makeShot, aim, keys, smooth, lerp, clamp, rng } from './motor/core.js';
import { makeChar, canvasTex } from './motor/char.js';
import { box, std, cut, glowSprite, softBlob, sky } from './motor/kit.js';
import { phone, stars, nebula, notif } from './motor/kit2.js';
import { cameraCortes } from './cortes.js';
import { tiaguin, brilhos, luzes, ceuNoite } from './pecas.js';
import { voce, voceVelho, homem, atendente, espectador, quadroDinamico, desenhaPagina, folha, mesaMadeira, xicara, cafeteria, envelope, maquina } from './rp.js';

const FX = (st) => ({ bloom: .3, bloomT: .9, vig: .45, exposure: 1.02, ...st });

/** Universo datilografando a sua vida (0-4,48 e 75,23-79,55) */
function universo(texto, planos) { return (t0, t1) => {
  const s = makeShot(t0, t1, '#070A1E', 38), c = s.scene; c.fog = new THREE.FogExp2('#120E30', .01); ceuNoite(c); stars(c, 2600, 280, 2);
  nebula(c, -14, 10, -60, 40, '#6A3A9A', 3, .35); nebula(c, 16, 4, -70, 46, '#2A4A9A', 5, .3);
  c.add(new THREE.HemisphereLight('#8A90FF', '#1a1020', .7)); const k = new THREE.DirectionalLight('#FFE0B0', 1.6); k.position.set(4, 8, 6); k.castShadow = true; k.shadow.mapSize.set(2048, 2048); Object.assign(k.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, far: 30 }); c.add(k);
  c.add(box(4, .25, 2.6, std('#5A3A28'), 0, -.12, 0)); const { teclas } = maquina(c);
  const pg = folha(1.5, 2.0); pg.position.set(0, 2.0, -.62); pg.rotation.x = -.12; c.add(pg);
  const voando = []; for (let i = 0; i < 14; i++) { const f = folha(.5, .66); f.q.set('f' + i, (x, W, H) => desenhaPagina(x, W, H, { pag: i + 2, linhas: [{ txt: 'Ele vai deixar pra depois.', cinza: true }] })); c.add(f); voando.push(f); }
  const lamp = new THREE.PointLight('#FFD8A0', 5, 5, 1.6); lamp.position.set(0, 2.6, 1); c.add(lamp); const fx = brilhos(c, [0, 2, -2], { n: 70, spread: [10, 6, 8], col: '#FFE2A0', size: .08, op: .6 });
  s.update = (t, u) => { const cam = s.camera; const prog = clamp(u / (t1 - t0 - .4));
    pg.q.set('p' + Math.round(prog * 40), (x, W, H) => desenhaPagina(x, W, H, { pag: 1, linhas: texto.map((l, i) => ({ ...l, prog: clamp(prog * texto.length - i) })) }));
    teclas.forEach((tk, i) => { tk.position.y = (tk.userData.y0 ??= tk.position.y) - (Math.sin(u * 30 + i * 2.3) > .85 ? .03 : 0); });
    voando.forEach((f, i) => { const R = rng(i + 5); const a = R() * 6.28, r = 2 + R() * 3; const sp = .25 + R() * .3; f.position.set(Math.cos(a + u * sp) * r, 1.5 + R() * 4 + Math.sin(u + i) * .3, -2 - R() * 4 + Math.sin(a + u * sp) * r * .4); f.rotation.set(u * sp * 2 + i, u * sp + i, i); });
    const pl = cameraCortes(cam, u, planos); fx(u);
    return FX({ focus: pl.dist, range: 1.8, blur: 14, bloom: .45, bloomT: .8, vig: .55 }); };
  return s; }; }

/** Cafeteria: planos com personagens (vários trechos do vídeo) */
function cafe(roteiroCena, planos) { return (t0, t1) => {
  const s = makeShot(t0, t1, '#F2E2C8', 38), c = s.scene; cafeteria(c);
  const vc = voce(.16); c.add(vc.root); vc.tint('#FFF4E6'); const hm = homem(); c.add(hm.root); hm.tint('#FFF4E6'); const at = atendente(); c.add(at.root); at.tint('#FFF4E6');
  const env = envelope(); c.add(env); const pagina = folha(.42, .56); c.add(pagina); const ph = phone((x) => { x.fillStyle = '#10152C'; x.fillRect(0, 0, 540, 1110); }, .1, .2); c.add(ph);
  const xic2 = xicara(-.75, .81, .45); c.add(xic2); xic2.visible = false;
  const brilhoEnv = glowSprite('#FFE6A0', .7, .0); c.add(brilhoEnv); const fx = brilhos(c, [-1, 1.4, .4], { n: 40, spread: [1.6, 1.4, 1.2], col: '#FFE2A0', size: .07, op: 0 });
  s.update = (t, u) => { const cam = s.camera; const st = roteiroCena(u, { vc, hm, at, env, pagina, ph, xic2, brilhoEnv }) || {};
    const pl = cameraCortes(cam, u, planos); [vc, hm, at].forEach((p) => p.face(cam));
    return FX({ focus: pl.dist, range: st.range ?? 1.2, blur: 15, exposure: st.exposure ?? 1.02, sat: st.sat ?? 1 }); };
  return s; }; }

/** Close das páginas sobre a mesa do café */
function paginas(seq, planos, { velho = 0 } = {}) { return (t0, t1) => {
  const s = makeShot(t0, t1, '#3A2A20', 34), c = s.scene; c.fog = new THREE.Fog('#3A2A20', 4, 14);
  mesaMadeira(c, { w: 6, d: 4 }); c.add(xicara(.85, 0, -.35)); c.add(box(.12, .02, .9, std('#2A2A30'), -.85, .01, .2));
  const pen = new THREE.Mesh(new THREE.CylinderGeometry(.012, .012, .5, 10), std('#C9361F')); pen.rotation.z = Math.PI / 2; pen.rotation.y = .5; pen.position.set(.6, .02, .5); c.add(pen);
  c.add(new THREE.HemisphereLight('#FFE9D0', '#3A2A20', .6)); const lamp = new THREE.SpotLight('#FFD8A8', 30, 8, .6, .6, 1.6); lamp.position.set(-.6, 2.6, .8); lamp.castShadow = true; lamp.shadow.mapSize.set(2048, 2048); c.add(lamp, lamp.target);
  const pg = folha(1.05, 1.4); pg.rotation.x = -Math.PI / 2; pg.position.set(0, .012, 0); c.add(pg); const pg2 = folha(1.05, 1.4); pg2.rotation.x = -Math.PI / 2; pg2.position.set(0, .006, 0); c.add(pg2);
  const cards = new THREE.Group(); c.add(cards);
  s.update = (t, u) => { const cam = s.camera; let i = seq.findIndex((q) => u < q[0]); if (i < 0) i = seq.length - 1; const ini = i ? seq[i - 1][0] : 0, [fim, est] = seq[i]; const k = clamp((u - ini) / Math.max(.01, fim - ini));
    const e = typeof est === 'function' ? est(k, u) : est; const vira = e.giro !== undefined; const cima = vira ? (e.virar || e.pag) : e.pag, baixo = e.virar ? e.pag : { ...e.pag, pag: e.pag.pag + 1 };
    pg.q.set(JSON.stringify(cima), (x, W, H) => desenhaPagina(x, W, H, { velho, ...cima }));
    pg2.visible = vira; if (vira) pg2.q.set('v' + JSON.stringify(baixo), (x, W, H) => desenhaPagina(x, W, H, { velho, ...baixo }));
    pg.rotation.set(-Math.PI / 2, 0, 0); pg.position.set(0, .012, 0); if (e.giro !== undefined) { const g = e.giro; pg.position.set(-.52 + Math.cos(g * Math.PI) * .52, .012 + Math.sin(g * Math.PI) * .52, 0); pg.rotation.set(-Math.PI / 2, -g * Math.PI, 0); }
    const pl = cameraCortes(cam, u, planos); return FX({ focus: pl.dist, range: .5, blur: 16, vig: .55, bloom: .25, sat: velho ? .55 : 1, tint: velho ? '#F4E2C0' : '#ffffff' }); };
  return s; }; }

/** Celular sobre a mesa: vibra, proposta, desculpa digitada */
const telaProposta = (x, fase, k) => { const g = x.createLinearGradient(0, 0, 0, 1110); g.addColorStop(0, '#1B2A4A'); g.addColorStop(1, '#0E1424'); x.fillStyle = g; x.fillRect(0, 0, 540, 1110); x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '700 92px Inter'; x.fillText('08:42', 270, 160);
  if (fase === 0) { notif(x, 260, 'Nova mensagem', 'Temos uma vaga pra você', '#2F9A6A'); return; }
  x.fillStyle = '#EDE6DA'; x.fillRect(0, 230, 540, 880); x.fillStyle = '#2F6D63'; x.fillRect(0, 230, 540, 110); x.fillStyle = '#fff'; x.font = '700 36px Inter'; x.textAlign = 'left'; x.fillText('Estúdio Horizonte', 40, 300);
  x.fillStyle = '#fff'; x.beginPath(); x.roundRect(30, 380, 440, 210, 24); x.fill(); x.fillStyle = '#222'; x.font = '600 32px Inter'; ['A vaga que você queria', 'abriu. Começa segunda?', 'Responde até hoje 🙂'].forEach((l, i) => x.fillText(l, 55, 440 + i * 50));
  if (fase >= 2) { const txt = 'Agora não é uma boa hora, quem sabe depois'; const sh = txt.slice(0, Math.round(txt.length * k)); x.fillStyle = '#fff'; x.fillRect(0, 980, 540, 130); x.fillStyle = '#333'; x.font = '600 28px Inter'; const ls = [sh.slice(0, 30), sh.slice(30)]; ls.forEach((l, i) => x.fillText(l, 30, 1030 + i * 36)); x.fillStyle = fase === 3 ? '#9AA' : '#2F6D63'; x.beginPath(); x.arc(490, 1040, 34, 0, 7); x.fill(); x.fillStyle = '#fff'; x.font = '700 30px Inter'; x.fillText('➤', 476, 1052); } };
function celular(planos) { return (t0, t1) => {
  const s = makeShot(t0, t1, '#3A2A20', 34), c = s.scene; c.fog = new THREE.Fog('#3A2A20', 4, 14); mesaMadeira(c, { w: 6, d: 4 }); c.add(xicara(.55, 0, -.3));
  c.add(new THREE.HemisphereLight('#FFE9D0', '#3A2A20', .6)); const lamp = new THREE.SpotLight('#FFD8A8', 26, 8, .6, .6, 1.6); lamp.position.set(-.6, 2.6, .8); lamp.castShadow = true; c.add(lamp, lamp.target);
  const env = envelope(); env.rotation.x = -Math.PI / 2; env.position.set(-.55, .02, -.2); env.rotation.z = .3; c.add(env);
  const ph = phone((x, f, k) => telaProposta(x, f, k), .36, .74); ph.rotation.x = -Math.PI / 2; c.add(ph); const gl = new THREE.PointLight('#9FD8FF', 1.5, 1.5, 1.6); c.add(gl);
  const mao = cut(canvasTex(256, 256, (x) => { x.clearRect(0, 0, 256, 256); x.fillStyle = '#20202A'; x.beginPath(); x.ellipse(128, 200, 60, 80, 0, 0, 7); x.fill(); x.beginPath(); x.roundRect(110, 40, 36, 150, 18); x.fill(); x.strokeStyle = '#FFE9C8'; x.lineWidth = 6; x.beginPath(); x.ellipse(128, 200, 60, 80, 0, 0, 7); x.stroke(); }), .3, .3); mao.rotation.x = -Math.PI / 2; c.add(mao);
  s.update = (t, u) => { const cam = s.camera; const vib = u < 1.2 ? Math.sin(u * 90) * .006 : 0; ph.position.set(.05 + vib, .03, .2); ph.rotation.z = vib * 4;
    const fase = u < 1.22 ? 0 : u < 2.9 ? 1 : u < 4.9 ? 2 : 3; const k = fase === 2 ? clamp((u - 2.9) / 1.8) : 1; ph.paint(fase, Math.round(k * 40) / 40); gl.position.set(.05, .5, .2);
    mao.visible = fase >= 2; mao.position.set(.12, .07, .42 - (fase === 3 ? .1 : Math.abs(Math.sin(u * 14)) * .02));
    const pl = cameraCortes(cam, u, planos); return FX({ focus: pl.dist, range: .4, blur: 16, vig: .5, bloom: .35, bloomT: .85 }); };
  return s; }; }

/** Rotina em cortes rápidos: acordar, trabalhar, voltar, celular, tentar algo diferente */
function rotina(planos) { return (t0, t1) => {
  const s = makeShot(t0, t1, '#2A2E3A', 38), c = s.scene; c.add(new THREE.HemisphereLight('#B8C4E0', '#2a2a30', .8));
  const sala = (x0, cor, chao) => { c.add(box(6, .1, 5, std(chao), x0, -.05, 0)); c.add(box(6, 4, .2, std(cor), x0, 2, -2.4)); const l = new THREE.DirectionalLight('#FFF0D8', 1.3); l.position.set(x0 - 3, 6, 5); l.target.position.set(x0, 0, 0); l.castShadow = true; l.shadow.mapSize.set(1024, 1024); Object.assign(l.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5 }); c.add(l, l.target); };
  // 1 quarto
  sala(0, '#7A8AB8', '#8A6A4A'); c.add(box(2.2, .5, 1.6, std('#F4F0E8'), 0, .35, -1.3)); c.add(box(2.2, .18, 1.0, std('#4A86C7'), 0, .66, -1.0)); const desp = cut(canvasTex(256, 256, (x) => { x.clearRect(0, 0, 256, 256); x.fillStyle = '#E2533F'; x.beginPath(); x.arc(128, 140, 90, 0, 7); x.fill(); x.fillStyle = '#F6F2EA'; x.beginPath(); x.arc(128, 140, 72, 0, 7); x.fill(); x.fillStyle = '#E2533F'; x.beginPath(); x.arc(70, 52, 30, 0, 7); x.arc(186, 52, 30, 0, 7); x.fill(); x.strokeStyle = '#222'; x.lineWidth = 7; x.beginPath(); x.moveTo(128, 140); x.lineTo(128, 86); x.moveTo(128, 140); x.lineTo(168, 140); x.stroke(); }), .45, .45); desp.position.set(1.4, .95, -1.6); c.add(desp); c.add(box(.6, .6, .5, std('#6A4A32'), 1.4, .3, -1.6));
  const p1 = voce(.14); p1.place(-.4, -.2, 0); c.add(p1.root);
  // 2 escritório
  sala(20, '#C9C2B2', '#6A6A72'); c.add(box(2, .06, .9, std('#EDE7DA'), 20, .82, -1)); const mon = box(.9, .55, .05, new THREE.MeshBasicMaterial({ color: '#9FD0F0' }), 20, 1.35, -1.3); c.add(mon); const p2 = voce(.14); p2.place(20.2, -.4, 0); c.add(p2.root); for (let i = 0; i < 5; i++) c.add(box(.3, .02, .4, '#F6F2EA', 20.7, .86 + i * .02, -.9));
  // 3 volta pra casa (ponto de ônibus à tarde)
  c.add(box(6, .1, 5, std('#8E8378'), 40, -.05, 0)); const ceu = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), new THREE.MeshBasicMaterial({ map: canvasTex(8, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#3A4A86'); g.addColorStop(1, '#F2A27A'); x.fillStyle = g; x.fillRect(0, 0, 8, 256); }) })); ceu.position.set(40, 3, -3); c.add(ceu);
  c.add(box(2.4, .08, 1, std('#2F6D63'), 40, 2.3, -1.2)); for (const dx of [-1.1, 1.1]) c.add(box(.06, 2.3, .06, '#222', 40 + dx, 1.15, -1.5)); c.add(box(2, .08, .4, '#6A4A32', 40, .5, -1.4)); const p3 = voce(.14); p3.place(40.3, -.6, 0); c.add(p3.root);
  // 4 sofá com celular (noite)
  sala(60, '#3A3A5A', '#5A4A3A'); c.add(box(2.6, .5, .9, std('#B23C33'), 60, .3, -1.5)); c.add(box(2.6, .9, .25, std('#B23C33'), 60, .7, -1.95)); const p4 = voce(.14); p4.place(60, -1.1, 0); c.add(p4.root); const tela = glowSprite('#9FD8FF', .6, .6); c.add(tela);
  // 5 tentar algo diferente: violão na sala
  sala(80, '#E9C88A', '#8A6A4A'); const p5 = voce(.16); p5.place(80, -.3, 0); c.add(p5.root); const vio = cut(canvasTex(256, 512, (x) => { x.clearRect(0, 0, 256, 512); x.fillStyle = '#C9762E'; x.beginPath(); x.ellipse(128, 360, 100, 120, 0, 0, 7); x.fill(); x.beginPath(); x.ellipse(128, 220, 76, 80, 0, 0, 7); x.fill(); x.fillStyle = '#3A2414'; x.beginPath(); x.arc(128, 320, 34, 0, 7); x.fill(); x.fillRect(116, 20, 24, 200); x.strokeStyle = '#eee'; x.lineWidth = 2; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(120 + i * 6, 20); x.lineTo(120 + i * 6, 440); x.stroke(); } }), .7, 1.4); c.add(vio);
  const notas = brilhos(c, [80, 1.6, 0], { n: 20, spread: [2, 1.4, 1], col: '#FFE2A0', size: .1, op: .7 });
  s.update = (t, u) => { const cam = s.camera; const pl = cameraCortes(cam, u, planos); [p1, p2, p3, p4, p5].forEach((p) => p.face(cam));
    p1.eye('flat'); p1.pose({ armL: [20, 4], armR: [20, 4], head: -6 }); p2.eye('flat'); p2.pose({ armL: [30, -70], armR: [30, -70] }); p3.eye('down'); p4.eye('down'); p4.pose({ armR: [18, -90], armL: [18, -90], head: -10 }); tela.position.set(60.15, 1.15, -.85);
    const tenta = u < 4.2; p5.eye(tenta ? 'happy' : 'flat'); p5.pose(tenta ? { armL: [40, -80], armR: [30, -40 + Math.sin(u * 16) * 14] } : { armL: [8, 4], armR: [8, 4], head: -8 }); vio.position.set(tenta ? 80.05 : 81.1, tenta ? .95 : .7, tenta ? -.2 : -1.9); vio.rotation.z = tenta ? .5 : .1; notas(u);
    return FX({ focus: pl.dist, range: 1.6, blur: 14, sat: .85 }); };
  return s; }; }

/** Depois de ter dinheiro, tempo, se sentir pronto */
function depois(planos) { return (t0, t1) => {
  const s = makeShot(t0, t1, '#2A2A34', 34), c = s.scene; c.fog = new THREE.Fog('#2A2A34', 4, 16); mesaMadeira(c, { w: 30, d: 4, cor: '#5A4A3A' });
  c.add(new THREE.HemisphereLight('#B8C0D8', '#2a2a30', .55)); for (const x of [0, 8, 16]) { const l = new THREE.SpotLight('#FFE0B8', 26, 7, .5, .6, 1.6); l.position.set(x - .4, 2.4, 1); l.target.position.set(x, 0, 0); l.castShadow = true; c.add(l, l.target); }
  const porco = new THREE.Group(); const corpo = new THREE.Mesh(new THREE.SphereGeometry(.4, 24, 18), std('#F2A0B0', { roughness: .4 })); corpo.scale.set(1.3, 1, 1); corpo.position.y = .42; corpo.castShadow = true; porco.add(corpo); const fc = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .1, 18), std('#E58A9A')); fc.rotation.z = Math.PI / 2; fc.position.set(.55, .42, 0); porco.add(fc); for (const [x, z] of [[-.3, -.2], [.3, -.2], [-.3, .2], [.3, .2]]) porco.add(box(.1, .2, .1, '#E58A9A', x, .1, z)); porco.add(box(.2, .02, .04, '#3A2A2A', 0, .83, 0)); c.add(porco);
  const relog = new THREE.Group(); const aro = new THREE.Mesh(new THREE.CylinderGeometry(.45, .45, .12, 32), std('#C9A86A', { metalness: .5, roughness: .3 })); aro.rotation.x = Math.PI / 2; relog.add(aro); const face = new THREE.Mesh(new THREE.CircleGeometry(.4, 32), std('#F6F2EA')); face.position.z = .07; relog.add(face); const pon = box(.03, .3, .01, '#222', 0, .13, .08); relog.add(pon); const pon2 = box(.03, .22, .01, '#222', 0, .09, .08); relog.add(pon2); relog.position.set(8, .55, 0); c.add(relog);
  const esp = new THREE.Group(); esp.add(box(.9, 1.4, .06, std('#8A5A36'), 0, .75, 0)); const vid = new THREE.Mesh(new THREE.PlaneGeometry(.75, 1.25), new THREE.MeshStandardMaterial({ color: '#BFD4E0', metalness: .7, roughness: .1 })); vid.position.set(0, .75, .035); esp.add(vid); esp.position.set(16, 0, -.2); c.add(esp); const refl = voce(.0); refl.place(16, -.15, .1, .5); c.add(refl.root);
  s.update = (t, u) => { const cam = s.camera; const pl = cameraCortes(cam, u, planos); pon.rotation.z = -u * 6; pon.position.set(Math.sin(u * 6) * .13, Math.cos(u * 6) * .13, .08); refl.face(cam); refl.eye('small'); refl.pose({ head: -10 });
    return FX({ focus: pl.dist, range: .7, blur: 16, sat: .7, vig: .6 }); };
  return s; }; }

/** Versão mais velha: "Agora é tarde" (sépia) */
function velho(planos) { return (t0, t1) => {
  const s = makeShot(t0, t1, '#C9A87A', 38), c = s.scene; c.fog = new THREE.Fog('#D9BC8E', 8, 40); sky(c, -60, 200, 120, [[0, '#B08A5A'], [1, '#F2D8A8']]);
  c.add(box(20, .1, 12, std('#8A7A5A'), 0, -.05, -2)); c.add(new THREE.HemisphereLight('#FFE6C0', '#5A4A3A', .9)); const l = new THREE.DirectionalLight('#FFD8A0', 1.5); l.position.set(-5, 6, 4); l.castShadow = true; l.shadow.mapSize.set(2048, 2048); c.add(l);
  c.add(box(2, .1, .5, std('#6A4A32'), 0, .5, -.6)); c.add(box(2, .5, .08, std('#6A4A32'), 0, .85, -.85)); for (const dx of [-.9, .9]) c.add(box(.08, .5, .5, '#2a2a30', dx, .25, -.6));
  for (const [x, z] of [[-3, -5], [3.5, -6], [-6, -8]]) { c.add(box(.25, 2.5, .25, std('#5A3A28'), x, 1.25, z)); const f = new THREE.Mesh(new THREE.SphereGeometry(1.3, 14, 10), std('#8A9A5A')); f.position.set(x, 3, z); c.add(f); }
  const v = voceVelho(); v.place(.1, -.5, 0); v.tint('#F4E2C0'); c.add(v.root); const bengala = box(.04, 1, .04, '#3A2A20', .55, .5, -.2); c.add(bengala);
  const folhas = brilhos(c, [0, 2.5, -2], { n: 30, spread: [6, 3, 4], col: '#E9B47A', size: .12, op: .5 });
  s.update = (t, u) => { const cam = s.camera; const pl = cameraCortes(cam, u, planos); v.face(cam); v.eye(u < 1.95 ? 'look' : 'sad'); v.pose({ armR: [14, 4], head: u < 1.95 ? 4 : -8, lean: 3 }); folhas(u);
    return FX({ focus: pl.dist, range: 1.4, blur: 14, sat: .45, tint: '#FFE8C8', vig: .6 }); };
  return s; }; }

/** Estúdio do Tiaguin + feed + espectador (virada) */
function estudio(roteiroTi, planos) { return (t0, t1) => {
  const s = makeShot(t0, t1, '#1A1A2A', 36), c = s.scene;
  // estúdio
  c.add(box(8, .1, 6, std('#3A3A4A'), 0, -.05, 0)); const esp = canvasTex(256, 256, (x) => { x.fillStyle = '#2A2A3A'; x.fillRect(0, 0, 256, 256); for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? '#34344A' : '#262636'; x.beginPath(); x.moveTo(i * 32, j * 32 + 32); x.lineTo(i * 32 + 16, j * 32); x.lineTo(i * 32 + 32, j * 32 + 32); x.fill(); } }); esp.wrapS = esp.wrapT = THREE.RepeatWrapping; esp.repeat.set(4, 2);
  c.add(box(8, 4, .2, new THREE.MeshStandardMaterial({ map: esp, roughness: 1 }), 0, 2, -2.2)); const neon = cut(canvasTex(512, 128, (x) => { x.clearRect(0, 0, 512, 128); x.font = "700 92px Caveat"; x.textAlign = 'center'; x.shadowColor = '#FF6FA0'; x.shadowBlur = 20; x.fillStyle = '#FFB8D0'; x.fillText('no ar', 256, 96); }), 1.6, .4, { add: true }); neon.position.set(1.4, 2.7, -2.05); c.add(neon); const pn = new THREE.PointLight('#FF6FA0', 3, 4, 1.6); pn.position.set(1.4, 2.6, -1.5); c.add(pn);
  c.add(box(2.4, .06, 1, std('#2A2A30'), 0, .82, -.6)); const mic = new THREE.Mesh(new THREE.CapsuleGeometry(.07, .16, 6, 12), std('#666', { metalness: .7, roughness: .3 })); mic.position.set(-.3, 1.32, -.25); c.add(mic); c.add(box(.02, .5, .02, '#222', -.3, 1.05, -.35));
  const monitor = box(.9, .5, .04, new THREE.MeshBasicMaterial({ map: canvasTex(512, 280, (x) => { x.fillStyle = '#10152C'; x.fillRect(0, 0, 512, 280); x.strokeStyle = '#6FF0D8'; x.lineWidth = 3; x.beginPath(); for (let i = 0; i < 512; i += 4) x.lineTo(i, 140 + Math.sin(i * .2) * Math.sin(i * .031) * 90); x.stroke(); }) }), .6, 1.15, -.95); c.add(monitor);
  c.add(new THREE.HemisphereLight('#8A90D0', '#1a1a20', .7)); const key = new THREE.SpotLight('#FFE0C0', 30, 8, .6, .6, 1.6); key.position.set(-1.5, 3, 2.5); key.target.position.set(0, 1, 0); key.castShadow = true; c.add(key, key.target);
  const ti = tiaguin(false, .2); ti.place(0, -.95, 0); c.add(ti.root); ti.tint('#FFEEE6');
  const pag = folha(.36, .48); c.add(pag); pag.q.set('ti', (x, W, H) => desenhaPagina(x, W, H, { titulo: 'ROTEIRO — TIAGUIN', pag: 7, linhas: [{ txt: 'Tiaguin termina de falar.', marca: true }, { txt: 'A pessoa passa pro próximo vídeo.' }, { txt: 'E continua o dia como se não tivesse ouvido nada.' }] }));
  // feed (celular na mão, em x=30)
  const ph = phone((x, k) => { const card = (y, cor, txt) => { x.fillStyle = cor; x.fillRect(0, y, 540, 1110); x.fillStyle = '#fff'; x.font = '800 48px Inter'; x.textAlign = 'center'; x.fillText(txt, 270, y + 560); }; card(-k * 1110, '#2A1E4A', 'E SE…'); card(1110 - k * 1110, '#C9762E', 'receita em 30s'); x.fillStyle = '#ffffff99'; x.font = '600 26px Inter'; x.fillText('Para você', 270, 70); }, .36, .74); ph.position.set(30, 1.3, 0); c.add(ph);
  const dedo = cut(canvasTex(128, 256, (x) => { x.clearRect(0, 0, 128, 256); x.fillStyle = '#20202A'; x.beginPath(); x.roundRect(40, 20, 48, 236, 24); x.fill(); x.strokeStyle = '#FFE9C8'; x.lineWidth = 5; x.beginPath(); x.roundRect(40, 20, 48, 236, 24); x.stroke(); }), .14, .28); c.add(dedo); const lf = new THREE.PointLight('#B8C8FF', 2, 3, 1.6); lf.position.set(30, 1.6, 1); c.add(lf);
  // espectador no sofá (x=60)
  c.add(box(6, .1, 5, std('#3A3040'), 60, -.05, 0)); c.add(box(6, 4, .2, std('#2A2A40'), 60, 2, -2.2)); c.add(box(2.6, .5, .9, std('#4A5A8A'), 60, .3, -1.4)); c.add(box(2.6, .9, .25, std('#4A5A8A'), 60, .7, -1.85));
  const ve = espectador(); ve.place(60, -1.0, 0); c.add(ve.root); ve.tint('#C8D0F0'); const tl = glowSprite('#9FD8FF', .7, .7); tl.position.set(60.15, 1.15, -.75); c.add(tl); const lpv = new THREE.PointLight('#9FD8FF', 3, 3, 1.6); lpv.position.set(60.2, 1.2, -.4); c.add(lpv);
  s.update = (t, u) => { const cam = s.camera; const st = roteiroTi(u, { ti, pag, ph, dedo, ve }) || {}; const pl = cameraCortes(cam, u, planos); ti.face(cam); ve.face(cam);
    return FX({ focus: pl.dist, range: st.range ?? .8, blur: 15, vig: .55, bloom: .4, bloomT: .85 }); };
  return s; }; }

/** Final: você rasga a página e a porta se abre pra luz */
function final(planos) { return (t0, t1) => {
  const s = makeShot(t0, t1, '#F2E2C8', 38), c = s.scene; cafeteria(c); const vc = voce(.22); vc.place(-.2, 1.0, 0); c.add(vc.root); vc.tint('#FFF4E6');
  const meias = [folha(.21, .56), folha(.21, .56)]; meias.forEach((m, i) => { m.q.set('m' + i, (x, W, H) => { x.save(); x.translate(i ? -W : 0, 0); x.scale(2, 1); desenhaPagina(x, W, H, { pag: 99, linhas: [{ txt: 'Ele vai deixar pra depois.' }] }); x.restore(); }); c.add(m); });
  const luz = glowSprite('#FFF2C8', 3, .0); luz.position.set(4.1, 1.5, -3.7); c.add(luz); const pl2 = new THREE.PointLight('#FFE6B0', 0, 8, 1.4); pl2.position.set(4, 1.6, -3); c.add(pl2);
  const fx = brilhos(c, [-.2, 1.4, 1.1], { n: 60, spread: [1.4, 1.2, .8], col: '#FFE2A0', size: .07, op: .9 });
  s.update = (t, u) => { const cam = s.camera; const rasga = smooth(.5, .9, u), sai = smooth(1.6, 2.9, u);
    vc.place(lerp(-.2, 1.4, sai), lerp(1.0, -1.2, sai), 0); vc.face(cam); vc.eye(u < .5 ? 'angry' : 'happy'); if (sai > .02) vc.walk(t, .9, .8); else vc.pose({ armL: [40 + rasga * 30, -90], armR: [40 + rasga * 30, -90] });
    meias.forEach((m, i) => { m.position.set(-.2 + (i ? 1 : -1) * (.12 + rasga * .35) + (i ? 1 : -1) * sai * .3, 1.25 - sai * 1.1, 1.25); m.rotation.set(0, 0, (i ? -1 : 1) * rasga * .4 + sai * 2); m.visible = u < 2.9; });
    luz.material.opacity = smooth(1.2, 2.4, u) * .9; pl2.intensity = smooth(1.2, 2.4, u) * 8; fx(u); c.children.forEach((ch) => { if (ch.isSprite && ch !== luz && ch.material.color.getHexString() === 'ffe2a0') ch.visible = u > .5; });
    const p = cameraCortes(cam, u, planos); return FX({ focus: p.dist, range: 1.4, blur: 14, bloom: .5, bloomT: .8, exposure: lerp(1.02, 1.12, sai) }); };
  return s; }; }

// ---------------- roteiro de cenas (tempos absolutos) ----------------
const L = (txt, o = {}) => ({ txt, ...o });
const PAG = { // planos de câmera para as páginas (sobre a mesa)
  cima: (fim) => [fim, [0, 1.45, -.1], [0, 1.35, -.12], [0, 0, -.3], [0, 0, -.32]],
  angulo: (fim) => [fim, [.5, .75, .5], [.4, .68, .42], [0, 0, -.4], [-.05, 0, -.42]],
  linha: (fim) => [fim, [-.15, .5, .15], [.1, .46, .12], [-.05, 0, -.42], [.1, 0, -.42], 26],
};
export const CENAS = [
  // 0 — E se o universo tivesse escrito a sua vida inteira… e você encontrasse o roteiro por acidente?
  [universo([L('Capítulo 1: a manhã em que você encontra este roteiro.'), L('Você vai pensar que é brincadeira.', { marca: true })], [
    [2.54, [3, 3.2, 7], [1.6, 2.6, 4.6], [0, 1.6, -.6], [0, 1.9, -.6]],
    [4.48, [0, 2.62, 1.55], [0, 2.58, 1.3], [0, 2.6, -.6], [0, 2.58, -.62], 30]]), 0, 4.48],
  // 4.48 — cafeteria: homem derruba o envelope; seu nome; você abre
  [cafe((u, o) => { const { vc, hm, at, env } = o; vc.place(-1.0, -.15, 0); vc.eye(u < 4.5 ? 'look' : 'wide'); vc.pose(u < 4.6 ? { armR: [16, -86] } : { armL: [30, -80], armR: [30, -80] }); at.place(1.6, -3.1, 0); at.eye('happy');
    const w = smooth(0, 1.9, u); hm.place(lerp(2.4, .5, w), lerp(.9, .4, w), 0); hm.walk(u, .9, .8); hm.eye('look'); if (u > 2.2) hm.place(lerp(.5, -2.6, smooth(2.2, 4.4, u)), .4, 0);
    const cai = smooth(1.75, 2.15, u); if (u < 4.67) { env.position.set(.55, lerp(1.0, .02, cai), .5); env.rotation.set(-Math.PI / 2 * cai, 0, .3 * cai); } else { env.position.set(-.85, 1.15, .1); env.rotation.set(-.3, 0, 0); } }, [
    [1.93, [-.1, 1.75, 7.4], [.1, 1.65, 6.8], [-.2, 1.2, -.8], [-.1, 1.2, -.8]],
    [3.2, [1.0, .45, 1.7], [.9, .4, 1.5], [.55, .25, .5], [.55, .15, .5], 32],
    [4.67, [.55, 1.0, .9], [.55, .9, .8], [.55, 0, .5], [.55, 0, .5], 30],
    [6.62, [-.3, 1.55, 2.3], [-.45, 1.5, 2.0], [-.9, 1.25, 0], [-.9, 1.25, 0]]]), 4.48, 11.10],
  // 11.10 — detalhes: roupa, café, mensagem apagada
  [paginas([
    [1.07, { pag: { pag: 1, linhas: [L('07:12 — Veste o moletom verde. De novo.', { marca: true })] } }],
    [2.13, { pag: { pag: 1, linhas: [L('07:12 — Veste o moletom verde. De novo.'), L('08:30 — Pede um café pingado.', { marca: true })] } }],
    [3.82, (k) => ({ pag: { pag: 1, linhas: [L('07:12 — Veste o moletom verde. De novo.'), L('08:30 — Pede um café pingado.'), L('08:31 — Escreve "oi, sumida". Apaga.', { marca: true, prog: .4 + k })] } })]],
    [PAG.angulo(1.07), PAG.linha(2.13), PAG.cima(3.82)]), 11.10, 14.92],
  // 14.92 — você pensando: isso só pode ser uma brincadeira
  [cafe((u, o) => { const { vc, at, hm, env, pagina } = o; vc.place(-1.0, -.15, 0); vc.eye(u < 1.2 ? 'down' : 'smug'); vc.pose({ armL: [30, -80], armR: [30, -80], head: u < 1.2 ? 0 : 8 }); at.place(1.6, -3.1, 0); hm.place(-9, -9, 0); env.position.set(-.6, .82, .3); env.rotation.set(-Math.PI / 2, 0, .4);
    pagina.position.set(-.85, 1.15, .1); pagina.rotation.set(-.3, 0, 0); pagina.q.set('a', (x, W, H) => desenhaPagina(x, W, H, { pag: 1, linhas: [L('Até a frase que você estaria pensando…')] })); }, [
    [2.48, [-.85, 1.6, 1.6], [-.9, 1.58, 1.35], [-.95, 1.5, 0], [-.95, 1.52, 0], 32]]), 14.92, 17.40],
  // 17.40 — brincadeira escrita; vira a página; oportunidade; medo; "agora não é a hora"
  [paginas([
    [1.66, { pag: { pag: 1, linhas: [L('Pensa: "Isso só pode ser uma brincadeira."', { marca: true })] } }],
    [2.89, (k) => ({ pag: { pag: 2, linhas: [] }, virar: { pag: 1, linhas: [L('Pensa: "Isso só pode ser uma brincadeira."')] }, giro: k })],
    [5.4, (k) => ({ pag: { pag: 2, linhas: [L('Ele vai receber uma oportunidade.', { prog: k * 2.2 }), L('Vai sentir medo.', { prog: k * 2.2 - 1 })] } })],
    [7.04, (k) => ({ pag: { pag: 2, linhas: [L('Ele vai receber uma oportunidade.'), L('Vai sentir medo.'), L('E vai dizer que agora não é a hora.', { marca: true, prog: k * 1.6 })] } })]],
    [PAG.linha(1.66), PAG.cima(2.89), PAG.angulo(5.4), PAG.linha(7.04)]), 17.40, 24.44],
  // 24.44 — celular vibra; a oportunidade; a desculpa; não envia
  [celular([
    [1.22, [.6, .35, .85], [.5, .3, .75], [.05, .03, .2], [.05, .03, .2], 30],
    [2.9, [.05, 1.15, .32], [.05, 1.05, .3], [.05, 0, .19], [.05, 0, .19]],
    [4.9, [.05, .95, .3], [.05, .9, .29], [.05, 0, .18], [.05, 0, .16]],
    [6.41, [.45, .5, .9], [.4, .45, .8], [.1, 0, .3], [.1, 0, .3], 32]]), 24.44, 30.85],
  // 30.85 — páginas seguintes: dias iguais
  [paginas([[2.41, (k) => ({ pag: { pag: 3 + Math.floor(k * 6), linhas: [L('Acorda. Trabalha. Volta pra casa.', { cinza: true }), L('Mexe no celular.', { cinza: true })] }, giro: (k * 6) % 1 })]],
    [[2.41, [.2, 1.3, .7], [-.1, 1.4, .55], [-.3, 0, -.1], [-.3, 0, -.15]]], { velho: 0 }), 30.85, 33.26],
  // 33.26 — acordar, trabalhar, voltar, celular, tentar algo diferente
  [rotina([
    [.34, [0, 1.4, 3.2], [0, 1.4, 3.0], [0, .9, -1], [0, .9, -1]],
    [.76, [20.3, 1.5, 2.6], [20.2, 1.5, 2.4], [20, 1.1, -1], [20, 1.1, -1]],
    [1.47, [40.6, 1.4, 3.4], [40.3, 1.4, 3.2], [40, 1.1, -1], [40, 1.1, -1]],
    [2.23, [60, 1.3, 2.6], [60, 1.25, 2.3], [60, 1.0, -1.1], [60, 1.0, -1.1]],
    [5.22, [80.6, 1.5, 3.4], [80.2, 1.45, 2.8], [80, 1.2, -.4], [80.1, 1.15, -.6]]]), 33.26, 38.48],
  // 38.48 — sempre a mesma frase: deixar pra depois
  [paginas([[3.48, (k) => ({ pag: { pag: 9, linhas: Array.from({ length: 6 }, (_, i) => L('Ele decidiu deixar pra depois.', { marca: i === 5, cinza: i < 5, prog: clamp(k * 7 - i) })) } })]],
    [[1.9, [0, 1.75, .25], [0, 1.6, .2], [0, 0, 0], [0, 0, -.02]], PAG.linha(3.48)]), 38.48, 41.96],
  // 41.96 — dinheiro, tempo, pronto
  [depois([
    [1.17, [1.5, 1.4, 3.9], [1.3, 1.3, 3.5], [0, .45, 0], [0, .45, 0]],
    [2.36, [8.7, 1.0, 3.4], [8.55, .95, 3.0], [8, .55, 0], [8, .55, 0]],
    [3.8, [16.5, 1.0, 2.0], [16.3, .95, 1.7], [16, .75, -.2], [16, .75, -.2]]]), 41.96, 45.76],
  // 45.76 — procura a página… não encontra
  [paginas([[3.28, (k) => ({ pag: { pag: 10 + Math.floor(k * 9), linhas: [L('Ele decidiu deixar pra depois.', { cinza: true })] }, giro: (k * 9) % 1 })], [4.11, { pag: { pag: 31, linhas: [] } }]],
    [[3.28, [.3, 1.3, .7], [0, 1.4, .55], [-.3, 0, -.1], [-.3, 0, -.15]], PAG.cima(4.11)], { velho: 1 }), 45.76, 49.87],
  // 49.87 — versão mais velha: agora é tarde
  [velho([
    [1.96, [1.8, 1.5, 5.0], [1.2, 1.4, 4.2], [0, 1.0, -.5], [0, 1.0, -.5]],
    [2.64, [.25, 1.45, 1.6], [.2, 1.43, 1.45], [.1, 1.35, -.5], [.1, 1.35, -.5], 30]]), 49.87, 52.51],
  // 52.51 — levanta, atendente bloqueia, diálogo, envelope em branco
  [cafe((u, o) => { const { vc, at, hm, env, pagina, xic2, brilhoEnv } = o; hm.place(-9, -9, 0); const lev = smooth(0, 1.2, u); vc.place(lerp(-1.0, 1.0, smooth(.6, 1.86, u)), lerp(-.15, 1.0, lev), 0);
    const bloq = smooth(1.86, 2.6, u); at.place(lerp(1.6, 2.2, bloq), lerp(-3.1, 1.0, bloq), 0);
    if (u < 1.86) { vc.walk(u, .9, .8); vc.eye('angry'); } else { vc.pose({}); vc.eye(u < 5.75 ? 'wide' : u < 6.95 ? 'angry' : 'wide'); }
    at.pose(u > 1.86 && u < 3.26 ? { armL: [80, 0], armR: [80, 0] } : u < 5.75 ? { armR: [40, -60] } : { armL: [8, 4] }); at.eye(u < 6.95 ? 'smug' : 'wide');
    xic2.visible = u > 3.26 && u < 5.75; xic2.position.set(2.0, 1.05, 1.4);
    env.position.set(-1.0, .82, .3); env.rotation.set(-Math.PI / 2, 0, .4); pagina.position.set(-.95, .825, .35); pagina.rotation.set(-Math.PI / 2, 0, .2);
    pagina.q.set(u > 8.6 ? 'b' : 'a', (x, W, H) => desenhaPagina(x, W, H, { pag: 12, linhas: u > 8.6 ? [L('— Mas eu não quero outro café.', { marca: true }), L('')] : [L('— É melhor sentar.')], cursor: u > 8.6 }));
    brilhoEnv.position.set(-.95, .95, .35); brilhoEnv.material.opacity = smooth(6.9, 7.6, u) * .9; }, [
    [1.86, [1.2, 1.7, 6.2], [1.6, 1.6, 5.4], [0, 1.1, -.5], [.6, 1.1, -.5]],
    [3.26, [1.0, 1.4, 3.6], [1.2, 1.4, 3.3], [2.2, 1.3, 1.0], [2.2, 1.3, 1.0], 34],
    [5.75, [1.7, 1.55, 2.9], [1.8, 1.55, 2.75], [2.2, 1.5, 1.0], [2.2, 1.5, 1.0], 30],
    [6.95, [1.35, 1.55, 2.6], [1.3, 1.55, 2.5], [1.0, 1.5, 1.0], [1.0, 1.5, 1.0], 30],
    [8.61, [2.6, 1.6, 2.4], [2.55, 1.55, 2.3], [2.2, 1.45, 1.0], [2.2, 1.45, 1.0], 28],
    [10.27, [-.95, 1.35, .9], [-.95, 1.25, .85], [-.95, .82, .35], [-.95, .82, .32], 30]]), 52.51, 62.78],
  // 62.78 — Pera… o roteiro do Tiaguin; próximo vídeo; espectador
  [estudio((u, o) => { const { ti, pag, ph, dedo, ve } = o; ti.eye(u < .4 ? 'wide' : u < 2.07 ? 'down' : 'wide'); ti.pose(u < .4 ? { head: 8 } : { armL: [30, -90], armR: [30, -90], head: -6 });
    pag.position.set(0, 1.3, -.62); pag.rotation.set(-.4, 0, 0); if (u > 2.07 && u < 4.51) { pag.position.set(0, .87, -.4); pag.rotation.set(-Math.PI / 2, 0, 0); }
    const k = clamp((u - 4.51) / 1.06); ph.paint(Math.round(k * 20) / 20); dedo.position.set(30.08, 1.0 + .4 * (1 - k) * (k > 0 ? 1 : 0) + (k > 0 ? 0 : .4), .05);
    ve.eye('flat'); ve.pose({ armR: [18, -90], armL: [18, -90], head: -8 }); }, [
    [.4, [.3, 1.6, 1.4], [.28, 1.6, 1.3], [0, 1.6, -.95], [0, 1.6, -.95], 30],
    [2.07, [-.9, 1.4, 1.9], [-.8, 1.35, 1.7], [0, 1.25, -.6], [0, 1.25, -.6]],
    [4.51, [0, 1.55, -.05], [0, 1.5, -.08], [0, .87, -.4], [0, .87, -.42], 28],
    [5.57, [30, 1.3, 1.3], [30, 1.3, 1.22], [30, 1.3, 0], [30, 1.3, 0]],
    [7.93, [60.4, 1.4, 2.8], [60.3, 1.35, 2.4], [60, 1.05, -1.0], [60, 1.05, -1.0]]]), 62.78, 70.71],
  // 70.71 — Tiaguin: era assim que deveria acabar; você seguindo o roteiro
  [estudio((u, o) => { const { ti, pag } = o; ti.eye(u < 1.82 ? 'flat' : 'sad'); ti.pose({ armL: [8, 4], armR: [8, 4] }); pag.position.set(0, .87, -.4); pag.rotation.set(-Math.PI / 2, 0, 0); }, [
    [1.82, [.15, 1.62, 1.6], [.1, 1.62, 1.35], [0, 1.6, -.95], [0, 1.6, -.95], 32]]), 70.71, 72.53],
  [cafe((u, o) => { const { vc, at, hm, env, xic2 } = o; hm.place(-9, -9, 0); vc.place(-1.0, -.15, 0); vc.eye('flat'); vc.pose({ armL: [30, -80], armR: [30, -80] }); at.place(-.2, .5, 0); at.eye('smug'); at.pose({ armR: [40, -60] }); xic2.visible = true; env.position.set(-.6, .82, .3); env.rotation.set(-Math.PI / 2, 0, .4); }, [
    [1.36, [.6, 1.5, 3.4], [.4, 1.5, 3.1], [-.6, 1.2, 0], [-.6, 1.2, 0]],
    [2.7, [-.5, 1.35, 2.1], [-.55, 1.33, 1.9], [-1.0, 1.25, 0], [-1.0, 1.25, 0], 32]]), 72.53, 75.23],
  // 75.23 — o universo nem precisaria te obrigar: o seu costume de deixar pra depois
  [universo([L('Ele não vai ser obrigado a nada.'), L('Vai só deixar pra depois.', { marca: true }), L('De novo.', { marca: true })], [
    [1.89, [-2.6, 2.6, 5.5], [-1.6, 2.3, 4.4], [0, 1.4, -.5], [0, 1.6, -.5]],
    [4.32, [0, 2.62, 1.55], [0, 2.58, 1.3], [0, 2.6, -.6], [0, 2.58, -.62], 30]]), 75.23, 79.55],
  // 79.55 — E você? Vai continuar vivendo o roteiro…
  [estudio((u, o) => { const { ti, pag } = o; ti.eye(u < .42 ? 'open' : 'smug'); ti.pose(u < 1.5 ? { armR: [60, -20] } : { armL: [8, 4], armR: [8, 4] }); pag.position.set(0, .87, -.4); pag.rotation.set(-Math.PI / 2, 0, 0); }, [
    [3.62, [0, 1.62, 1.45], [0, 1.62, 1.15], [0, 1.62, -.95], [0, 1.62, -.95], 32]]), 79.55, 83.17],
  // 83.17 — ou vai sair do automático: rasga a página e sai pra luz
  [final([[2.91, [-.2, 1.5, 3.7], [1.2, 1.5, 3.3], [-.2, 1.3, 1.0], [1.4, 1.3, -1.0]]]), 83.17, 999],
];
