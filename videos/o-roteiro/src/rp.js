// Peças do vídeo "O roteiro": páginas datilografadas, cafeteria, máquina de escrever, celular, estúdio.
import * as THREE from 'three';
import { rng, clamp } from './motor/core.js';
import { makeChar, canvasTex } from './motor/char.js';
import { box, std, cut, glowSprite, softBlob } from './motor/kit.js';
import { brickTex } from './motor/kit2.js';
import { hatTopTex } from './motor/art.js';

// ---------- personagens ----------
export const voce = (glow = .16) => makeChar({ outfit: 'hero', glow });
export const voceVelho = () => makeChar({ outfit: 'hero', hair: 'old', glasses: true });
export const homem = () => makeChar({ outfit: 'terno', hat: hatTopTex });
export const atendente = () => makeChar({ outfit: 'laranja', glasses: true });
export const espectador = () => makeChar({ outfit: 'azul', hair: 'bob', hairc: '#5A3A22', lash: true });

// ---------- textura que só é redesenhada quando o estado muda ----------
export function quadroDinamico(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; let key = null;
  return { tex: t, set(k, draw) { if (k === key) return; key = k; x.clearRect(0, 0, w, h); draw(x, w, h); t.needsUpdate = true; } }; }

function wrap(x, txt, maxW) { const out = []; for (const par of txt.split('\n')) { let line = ''; for (const w of par.split(' ')) { const t = line ? line + ' ' + w : w; if (x.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t; } out.push(line); } return out; }

/** Página de roteiro. linhas: [{txt, prog(0..1), marca:bool, cinza:bool}] */
export function desenhaPagina(x, W, H, { titulo = 'A VIDA DE VOCÊ', pag = 1, linhas = [], carimbo = '', cursor = false, velho = 0 } = {}) {
  x.fillStyle = velho ? '#E6D9BC' : '#F6F0E2'; x.fillRect(0, 0, W, H);
  const R = rng(pag * 7); for (let i = 0; i < 400; i++) { x.fillStyle = `rgba(120,90,50,${R() * .05})`; x.fillRect(R() * W, R() * H, 3, 3); }
  x.strokeStyle = '#C9B99A55'; x.lineWidth = 2; x.beginPath(); x.moveTo(70, 0); x.lineTo(70, H); x.stroke();
  x.fillStyle = '#3A3226'; x.font = "700 30px 'IBM Plex Mono'"; x.textAlign = 'left'; x.fillText(titulo, 96, 86); x.textAlign = 'right'; x.font = "600 24px 'IBM Plex Mono'"; x.fillText('pág. ' + pag, W - 50, 86); x.textAlign = 'left';
  x.fillStyle = '#3A3226'; x.fillRect(96, 104, W - 150, 3);
  let y = 170; x.font = "600 36px 'IBM Plex Mono'";
  for (const L of linhas) { const shown = L.txt.slice(0, Math.round(L.txt.length * clamp(L.prog ?? 1))); const ls = wrap(x, L.txt, W - 170); let rest = shown.length;
    for (const ln of ls) { const part = ln.slice(0, Math.max(0, rest)); rest -= ln.length + 1;
      if (L.marca && part) { x.fillStyle = '#F2D65A'; x.fillRect(90, y - 34, x.measureText(ln).width + 14, 46); }
      x.fillStyle = L.cinza ? '#9A9082' : '#2A241C'; x.fillText(part, 96, y); y += 52; }
    y += 22; }
  if (cursor && Math.floor(performance.now ? 0 : 0) === 0) { x.fillStyle = '#2A241C'; x.fillRect(96, y - 40, 20, 44); }
  if (carimbo) { x.save(); x.translate(W * .62, H * .78); x.rotate(-.22); x.strokeStyle = '#C9361F'; x.lineWidth = 10; x.font = "900 74px Inter"; const w = x.measureText(carimbo).width + 60; x.strokeRect(-w / 2, -62, w, 92); x.fillStyle = '#C9361F'; x.textAlign = 'center'; x.fillText(carimbo, 0, 8); x.restore(); }
}
/** Folha de papel 3D (plano com textura dinâmica). */
export function folha(w = 1.05, h = 1.4) { const q = quadroDinamico(768, 1024); const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: q.tex, roughness: .9, side: THREE.DoubleSide })); m.castShadow = true; m.receiveShadow = true; m.q = q; return m; }

// ---------- mesa de madeira (para closes das páginas) ----------
export function mesaMadeira(c, { w = 6, d = 4, y = 0, cor = '#7A4E30' } = {}) {
  const t = canvasTex(512, 512, (x) => { x.fillStyle = cor; x.fillRect(0, 0, 512, 512); const R = rng(4); for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(${R() < .5 ? '255,220,170' : '30,15,5'},${R() * .12})`; x.fillRect(0, R() * 512, 512, 2 + R() * 6); } for (let i = 0; i < 4; i++) { x.fillStyle = '#3A2414'; x.fillRect(0, i * 128, 512, 3); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(w / 2, d / 2); const m = box(w, .1, d, new THREE.MeshStandardMaterial({ map: t, roughness: .6 }), 0, y - .05, 0); m.receiveShadow = true; c.add(m); return m; }
export function xicara(x, y, z, cor = '#F4F0E8') { const g = new THREE.Group(); const cup = new THREE.Mesh(new THREE.CylinderGeometry(.11, .08, .14, 24), std(cor, { roughness: .3 })); cup.position.set(0, .07, 0); cup.castShadow = true; g.add(cup); const cafe = new THREE.Mesh(new THREE.CircleGeometry(.1, 24), std('#4A2A18', { roughness: .2 })); cafe.rotation.x = -Math.PI / 2; cafe.position.y = .135; g.add(cafe); const pires = new THREE.Mesh(new THREE.CylinderGeometry(.17, .17, .015, 24), std(cor)); g.add(pires); const asa = new THREE.Mesh(new THREE.TorusGeometry(.045, .012, 8, 16), std(cor)); asa.position.set(.12, .08, 0); g.add(asa); g.position.set(x, y, z); return g; }

// ---------- cafeteria ----------
export function cafeteria(c) {
  c.fog = new THREE.Fog('#F2E2C8', 10, 40);
  const piso = canvasTex(256, 256, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? '#2E3A3A' : '#E8E0D0'; x.fillRect(i * 32, j * 32, 32, 32); } }); piso.wrapS = piso.wrapT = THREE.RepeatWrapping; piso.repeat.set(5, 5);
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(14, 12), new THREE.MeshStandardMaterial({ map: piso, roughness: .5 })); fl.rotation.x = -Math.PI / 2; fl.position.z = -1; fl.receiveShadow = true; c.add(fl);
  const bt = brickTex('#9A5A40', 4, 3); c.add(box(14, 5, .2, new THREE.MeshStandardMaterial({ map: bt, roughness: .95 }), 0, 2.5, -4.2));
  c.add(box(.2, 5, 12, std('#3E6B66'), -5.2, 2.5, -1)); c.add(box(.2, 5, 12, std('#3E6B66'), 5.2, 2.5, -1));
  // quadro de giz com cardápio
  const menu = canvasTex(1024, 512, (x) => { x.fillStyle = '#1E2622'; x.fillRect(0, 0, 1024, 512); x.strokeStyle = '#8A6A44'; x.lineWidth = 24; x.strokeRect(0, 0, 1024, 512); x.fillStyle = '#F4EFE4'; x.textAlign = 'center'; x.font = "700 70px Caveat"; x.fillText('Café do Tempo', 512, 100); x.font = "700 44px Caveat"; x.textAlign = 'left'; [['Expresso', '6'], ['Pingado', '7'], ['Cappuccino', '12'], ['Pão de queijo', '8'], ['Bolo do dia', '10']].forEach(([a, b], i) => { x.fillText(a, 90, 190 + i * 62); x.textAlign = 'right'; x.fillText('R$ ' + b, 930, 190 + i * 62); x.textAlign = 'left'; }); });
  const mn = cut(menu, 3.2, 1.6); mn.position.set(1.2, 3.3, -4.05); c.add(mn);
  // balcão, máquina de expresso, vitrine
  c.add(box(4.2, 1.05, .9, std('#6A3E28'), 1.4, .52, -2.6)); c.add(box(4.3, .08, 1.0, std('#D9CBB2', { roughness: .4 }), 1.4, 1.08, -2.6));
  c.add(box(.9, .7, .55, std('#B8BCC4', { metalness: .6, roughness: .3 }), 2.6, 1.47, -2.8)); const luzM = glowSprite('#FFD9A0', .4, .6); luzM.position.set(2.6, 1.6, -2.5); c.add(luzM);
  const vit = new THREE.Mesh(new THREE.BoxGeometry(1.2, .45, .6), new THREE.MeshStandardMaterial({ color: '#CFE8F0', transparent: true, opacity: .35, roughness: .1 })); vit.position.set(.4, 1.35, -2.6); c.add(vit);
  ['#E9B44C', '#C9762E', '#F2D27A', '#8A4A2A'].forEach((k, i) => { const p = new THREE.Mesh(new THREE.SphereGeometry(.08, 12, 10), std(k)); p.position.set(-.05 + i * .28, 1.2, -2.6); c.add(p); });
  // lâmpadas pendentes
  for (const x of [-2.4, -.2, 2.2]) { c.add(box(.02, 1.2, .02, '#222', x, 4.0, -1)); const sh = new THREE.Mesh(new THREE.ConeGeometry(.3, .3, 20, 1, true), std('#2A4A44', { side: THREE.DoubleSide })); sh.position.set(x, 3.3, -1); c.add(sh); const b = glowSprite('#FFD29A', .9, .7); b.position.set(x, 3.15, -1); c.add(b); const pl = new THREE.PointLight('#FFC27A', 6, 7, 1.6); pl.position.set(x, 3.0, -1); c.add(pl); }
  // janela com a rua (luz da manhã)
  const jan = canvasTex(512, 512, (x) => { const g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, '#BFE0F4'); g.addColorStop(1, '#FCEBD0'); x.fillStyle = g; x.fillRect(0, 0, 512, 512); x.fillStyle = '#D9A07A'; x.fillRect(40, 220, 140, 292); x.fillStyle = '#9FC2B4'; x.fillRect(220, 180, 160, 332); x.fillStyle = '#3E8A52'; x.beginPath(); x.arc(430, 300, 70, 0, 7); x.fill(); });
  const jm = new THREE.Mesh(new THREE.PlaneGeometry(3, 2.4), new THREE.MeshBasicMaterial({ map: jan })); jm.position.set(-3.2, 2.2, -4.08); c.add(jm); for (const [x, y, w, h] of [[-3.2, 3.45, 3.1, .12], [-3.2, .95, 3.1, .12], [-4.75, 2.2, .12, 2.6], [-1.65, 2.2, .12, 2.6], [-3.2, 2.2, .06, 2.4]]) c.add(box(w, h, .1, '#EDE7DA', x, y, -4.0));
  const sol = new THREE.DirectionalLight('#FFE6C0', 1.6); sol.position.set(-6, 6, -9); sol.target.position.set(0, 0, 0); sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); Object.assign(sol.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, far: 40 }); c.add(sol, sol.target);
  c.add(new THREE.HemisphereLight('#FFE9D0', '#4A3A30', .8));
  // porta de saída à direita
  c.add(box(1.2, 2.4, .12, std('#3A2A20'), 4.1, 1.2, -4.08)); const vid = new THREE.Mesh(new THREE.PlaneGeometry(.8, 1.4), new THREE.MeshBasicMaterial({ color: '#FFF2D8' })); vid.position.set(4.1, 1.5, -4.0); c.add(vid);
  const saida = cut(canvasTex(256, 96, (x) => { x.fillStyle = '#1E7A4A'; x.fillRect(0, 0, 256, 96); x.fillStyle = '#fff'; x.font = '800 54px Inter'; x.textAlign = 'center'; x.fillText('SAÍDA', 128, 68); }), .6, .22); saida.position.set(4.1, 2.62, -4.0); c.add(saida);
  // mesas, cadeiras, plantas
  const mesa = (x, z) => { c.add(box(1.1, .06, .8, std('#8A5A36', { roughness: .5 }), x, .78, z)); c.add(box(.08, .75, .08, '#2a2a30', x, .38, z)); c.add(box(.5, .04, .5, '#2a2a30', x, .02, z)); };
  mesa(-1.0, .3); mesa(1.6, .9); mesa(-3.4, -1.4);
  const cad = (x, z) => { c.add(box(.45, .05, .45, std('#2E5A54'), x, .46, z)); c.add(box(.45, .5, .05, std('#2E5A54'), x, .7, z - .22)); for (const [dx, dz] of [[-.2, -.2], [.2, -.2], [-.2, .2], [.2, .2]]) c.add(box(.03, .46, .03, '#222', x + dx, .23, z + dz)); };
  cad(2.4, 1.0); cad(-3.4, -2.0);
  for (const [x, z] of [[-4.6, -3.4], [4.7, -2.5]]) { const pot = new THREE.Mesh(new THREE.CylinderGeometry(.3, .22, .5, 18), std('#C76B4A')); pot.position.set(x, .25, z); c.add(pot); const f = new THREE.Mesh(new THREE.SphereGeometry(.55, 12, 10), std('#3E8A52')); f.position.set(x, .95, z); f.castShadow = true; c.add(f); }
  c.add(xicara(-1.2, .81, .35)); c.add(xicara(1.75, .81, .85, '#E2533F'));
  return { mesaY: .81 };
}
/** Envelope com etiqueta do nome. */
export function envelope() { const t = canvasTex(512, 360, (x) => { x.fillStyle = '#E9D9B4'; x.fillRect(0, 0, 512, 360); x.strokeStyle = '#C9B48A'; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(256, 190); x.lineTo(512, 0); x.stroke(); x.fillStyle = '#F6F0E2'; x.fillRect(140, 220, 232, 70); x.fillStyle = '#2A241C'; x.font = "700 46px 'IBM Plex Mono'"; x.textAlign = 'center'; x.fillText('VOCÊ', 256, 270); x.fillStyle = '#B23C33'; x.beginPath(); x.arc(256, 190, 24, 0, 7); x.fill(); });
  const m = new THREE.Mesh(new THREE.BoxGeometry(.42, .3, .012), [std('#E9D9B4'), std('#E9D9B4'), std('#E9D9B4'), std('#E9D9B4'), new THREE.MeshStandardMaterial({ map: t, roughness: .8 }), std('#E2D0A8')]); m.castShadow = true; return m; }

// ---------- máquina de escrever do universo ----------
export function maquina(c) { const g = new THREE.Group(); const cor = std('#2E3448', { roughness: .4, metalness: .3 });
  g.add(box(2.4, .6, 1.6, cor, 0, .3, 0)); g.add(box(2.2, .5, .5, cor, 0, .75, -.5)); const rolo = new THREE.Mesh(new THREE.CylinderGeometry(.16, .16, 2.6, 24), std('#1A1A22', { roughness: .3 })); rolo.rotation.z = Math.PI / 2; rolo.position.set(0, 1.05, -.55); g.add(rolo);
  const teclas = []; for (let r = 0; r < 3; r++) for (let k = 0; k < 9; k++) { const tk = new THREE.Mesh(new THREE.CylinderGeometry(.085, .085, .06, 16), std('#F4EFE4', { roughness: .4 })); tk.position.set(-.85 + k * .21 + r * .05, .64 + r * .06, .55 - r * .24); g.add(tk); teclas.push(tk); }
  c.add(g); return { g, teclas }; }
