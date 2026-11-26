// Motor do Estilo 4: planos com câmera (chegada com freio + deriva), legenda karaokê, flashback e janelas "rápidas" para o borrão.
const $ = (q) => document.querySelector(q);
const SVGNS = 'http://www.w3.org/2000/svg';
const PAL = TRANSCRICAO.map(([w, t, f], i) => ({ w, t, f, i }));
const DUR = +(PAL[PAL.length - 1].f + 0.4).toFixed(2);
const norm = (w) => w.toLowerCase().replace(/[^a-z0-9à-ú-]/g, '');
function T(palavra, depois = 0) {
  const n = norm(palavra);
  for (const p of PAL) if (p.t >= depois - 1e-3 && norm(p.w) === n) return p.t;
  throw new Error('palavra não achada: ' + palavra + ' depois de ' + depois);
}
const Z = Math.log;
const TL = gsap.timeline({ paused: true });
const RAPIDO = [];               // janelas com movimento rápido (16 subquadros)
const rapido = (a, b) => RAPIDO.push([a, b]);
const CORTES = [0];

// ---------- cenas ----------
const CAMS = {};
function cena(id, conteudo, fundo = '#fff') {
  const s = document.createElementNS(SVGNS, 'svg');
  s.setAttribute('viewBox', '0 0 1080 1920'); s.setAttribute('class', 'cena'); s.id = 'sc_' + id;
  s.innerHTML = `<rect width="1080" height="1920" fill="${fundo}"/><g class="cam">${conteudo}</g>`;
  $('#cenas').appendChild(s);
  CAMS[id] = { g: s.querySelector('.cam'), x: 540, y: 960, z: 0, r: 0, dx: 0, dy: 0 };
}
function aplicaCams() {
  for (const c of Object.values(CAMS)) { const sv = c.g.ownerSVGElement, vis = sv.style.visibility === 'visible'; sv.style.display = vis ? 'block' : 'none'; if (!vis) continue; c.g.setAttribute('transform', `translate(540 960) rotate(${c.r}) scale(${Math.exp(c.z)}) translate(${-c.x - c.dx} ${-c.y - c.dy})`); }
}

// ---------- planos ----------
// plano(t, cena, {x, y, s, r}, entra, opções)
// entra: 'corte' (freio leve 1,25x), 'freio' (o.k = quanto), 'seco', 'voo' (mesma cena, voa do plano anterior),
//        'vooDe' (o.de = pose inicial de perto), 'chicote>' '<' '^' 'v', 'fusao', 'pop'
// o.deriva = zoom por segundo (padrão 0,03), o.vx/o.vy = pan por segundo, o.dur = duração da chegada, o.ease
const PLANOS = [];
function plano(t, cenaId, cam, entra = 'corte', o = {}) { PLANOS.push({ t, cena: cenaId, cam, entra, o }); }
function compila() {
  PLANOS.sort((a, b) => a.t - b.t);
  let fim = null;
  PLANOS.forEach((p, i) => {
    const prox = PLANOS[i + 1], t1 = prox ? prox.t : DUR, C = CAMS[p.cena], o = p.o;
    const P1 = { x: p.cam.x, y: p.cam.y, z: Z(p.cam.s), r: p.cam.r || 0, dx: 0, dy: 0 };
    let P0 = { ...P1 }, a = o.dur ?? .26, ease = o.ease || 'expo.out';
    const ant = PLANOS[i - 1];
    // visibilidade
    if (p.entra === 'fusao') {
      TL.set('#sc_' + p.cena, { visibility: 'visible', opacity: 0, zIndex: i + 1 }, p.t).to('#sc_' + p.cena, { opacity: 1, duration: .33, ease: 'none' }, p.t);
      TL.set('.cena:not(#sc_' + p.cena + ')', { visibility: 'hidden' }, p.t + .34);
      a = 0;
    } else if (!(ant && ant.cena === p.cena)) {
      TL.set('.cena', { visibility: 'hidden' }, p.t).set('#sc_' + p.cena, { visibility: 'visible', opacity: 1, zIndex: i + 1 }, p.t);
      CORTES.push(p.t);
    }
    // câmera
    const e = p.entra;
    if (e === 'corte') P0.z = P1.z + Z(o.k || 1.22);
    else if (e === 'freio') P0.z = P1.z + Z(o.k || 2.2);
    else if (e === 'seco' || e === 'pop') a = 0;
    else if (e === 'voo') { P0 = { ...fim }; a = o.dur ?? .45; ease = o.ease || 'power3.inOut'; }
    else if (e === 'vooDe') { P0 = { ...P1, x: o.de.x, y: o.de.y, z: Z(o.de.s) }; a = o.dur ?? .5; ease = o.ease || 'power2.out'; }
    else if (e[0] === 'c') { // chicote
      const d = e.slice(-1), k = 900;
      const sx = d === '>' ? 1 : d === '<' ? -1 : 0, sy = d === 'v' ? -1 : d === '^' ? 1 : 0;
      if (ant) { const CA = CAMS[ant.cena]; TL.fromTo(CA, { dx: 0, dy: 0 }, { dx: -sx * k, dy: -sy * k, duration: .07, ease: 'power2.in', immediateRender: false }, p.t - .07); TL.set(CA, { dx: 0, dy: 0 }, p.t); }
      P0.dx = sx * k; P0.dy = sy * k; a = o.dur ?? .28;
      rapido(p.t - .1, p.t);
    }
    if (a > 0) { TL.fromTo(C, P0, { ...P1, duration: a, ease, immediateRender: false }, p.t); rapido(p.t - .02, p.t + a + .04); }
    else TL.set(C, P1, p.t);
    // deriva até o próximo plano
    const len = Math.max(.01, t1 - p.t - a), dz = (o.deriva ?? .03) * len;
    const P2 = { ...P1, z: P1.z + dz, x: P1.x + (o.vx || 0) * len, y: P1.y + (o.vy || 0) * len };
    TL.fromTo(C, P1, { ...P2, duration: len, ease: 'none', immediateRender: false }, p.t + a);
    fim = P2;
  });
}

// ---------- ajudantes de animação ----------
function boca(pid, qual, t) { TL.set(`#${pid}-boca > *`, { visibility: 'hidden' }, t).set(`#${pid}-boca .b-${qual}`, { visibility: 'visible' }, t); }
function pisca(pid, t) { TL.to(`#${pid}-olhos .olhoEsc`, { attr: { transform: 'scale(1 0.08)' }, duration: .05, yoyo: true, repeat: 1, ease: 'none' }, t); }
function fecha(pid, t, sim = true) { TL.set(`#${pid}-olhos .olhoEsc`, { attr: { transform: sim ? 'scale(1 0.08)' : 'scale(1 1)' } }, t); }
function olha(pid, x, y, t, d = .15) { TL.to(`#${pid}-olhos .pupila`, { x, y, duration: d, ease: 'power2.out' }, t); }
function braco(pid, lado, rot, t, d = .14, ease = 'back.out(2)') { TL.to(`#${pid}-braco${lado}`, { attr: { transform: `rotate(${rot})` }, duration: d, ease }, t); }
function acena(pid, lado, a, b, t, n = 5, d = .14) { TL.to(`#${pid}-braco${lado}`, { attr: { transform: `rotate(${a})` }, duration: .12, ease: 'back.out(2)' }, t); TL.to(`#${pid}-braco${lado}`, { attr: { transform: `rotate(${b})` }, duration: d, yoyo: true, repeat: n, ease: 'sine.inOut' }, t + .12); }
function mostra(sel, t) { TL.set(sel, { visibility: 'visible' }, t); }
function esconde(sel, t) { TL.set(sel, { visibility: 'hidden' }, t); }
function pop(sel, t, k = 1, d = .3, tr = '') { TL.fromTo(sel, { attr: { transform: `${tr} scale(0.01)` }, visibility: 'visible' }, { attr: { transform: `${tr} scale(${k})` }, duration: d, ease: 'back.out(2.2)', immediateRender: false }, t); rapido(t, t + d); }
function popGira(sel, t, tr = '', d = .34) { TL.fromTo(sel, { attr: { transform: `${tr} rotate(-260) scale(0.05)` }, visibility: 'visible' }, { attr: { transform: `${tr} rotate(0) scale(1)` }, duration: d, ease: 'back.out(1.6)', immediateRender: false }, t); rapido(t, t + d + .05); }
function chamas(sel, t0, t1) {
  for (let t = t0; t < t1; t += .12) TL.to(`${sel} .ch1`, { attr: { transform: `scale(${(1 - ((t * 5.1) % 1) * .1).toFixed(3)} ${(1 + ((t * 7.3) % 1) * .22 - .08).toFixed(3)})` }, duration: .12, ease: 'sine.inOut' }, t);
}
function balanca(sel, prop, amp, per, t0, t1) { const n = Math.max(1, Math.round((t1 - t0) / per) - 1); TL.to(sel, { [prop]: amp, duration: per, yoyo: true, repeat: n, ease: 'sine.inOut' }, t0); }

// ---------- legenda karaokê ----------
const DESTAQUE = new Set(['cidade', 'superpoder', 'meia-noite', 'doze', 'mãe', 'tiaguin', 'única', 'nunca', 'achava', 'festa', 'relógio', 'pão', 'olhos', 'voa', 'poça', 'terça', 'nada', 'duzentos', 'apagada', 'braço', 'colher', 'defeito',
  'ventania', 'caio', 'errado', 'furacão', 'telhado', 'carro', 'forte', 'vento', 'tocou', 'abracei', 'parou', 'lurdes', 'livro', 'âncora', 'geração', 'acalma', 'descansa', 'dúvidas', 'arrancada', 'amanhã', 'bebê', 'piscam', 'igual', 'poder', 'comenta']);
const BLOCOS = [];
function montaLegenda() {
  let b = [];
  PAL.forEach((p, i) => {
    b.push(i);
    const txt = b.map(j => PAL[j].w).join(' ');
    const fim = /[,.?!:…]$/.test(p.w) || b.length === 3 || (txt.length > 13 && b.length >= 2) || i === PAL.length - 1 || (PAL[i + 1].t - p.f > .25);
    if (fim) { BLOCOS.push(b); b = []; }
  });
  const L = $('#legenda');
  BLOCOS.forEach((b, k) => {
    const d = document.createElement('div'); d.className = 'bloco'; d.id = 'bl' + k;
    d.innerHTML = b.map(i => `<span class="pal${DESTAQUE.has(norm(PAL[i].w)) ? ' chave' : ''}" data-i="${i}">${PAL[i].w.replace(/^"|"$/g, '')}</span>`).join(' ');
    L.appendChild(d);
  });
}
let blocoAtivo = -1;
function legendaEm(t) {
  let ativo = -1;
  BLOCOS.forEach((b, k) => { const t0 = PAL[b[0]].t - .03, t1 = k + 1 < BLOCOS.length ? PAL[BLOCOS[k + 1][0]].t - .03 : DUR; if (t >= t0 && t < t1) ativo = k; });
  BLOCOS.forEach((b, k) => {
    const el = document.getElementById('bl' + k), on = k === ativo;
    el.style.display = on ? 'block' : 'none';
    if (on) { const e = Math.min(1, (t - PAL[b[0]].t + .03) / .08); el.style.transform = `scale(${.86 + .14 * Math.max(0, e)})`; el.querySelectorAll('.pal').forEach(sp => sp.classList.toggle('ativa', t >= PAL[+sp.dataset.i].t - .02)); }
  });
}

// ---------- flashback ----------
let FB = null;  // [entrada, saída]
function rnd(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function flashbackEm(t) {
  const on = FB && t >= FB[0] && t < FB[1];
  $('#cenas').style.filter = on ? `sepia(.55) saturate(.95) contrast(.95) brightness(${(.99 + (rnd(Math.floor(t * 24)) - .5) * .045).toFixed(3)})` : '';
  for (const id of ['fbAmarelo', 'fbBorda', 'fbVinheta', 'grao', 'poeira']) $('#' + id).style.display = on ? 'block' : 'none';
  if (on) {
    const f = Math.floor(t * 24);
    $('#grao').style.backgroundImage = `url(grao${f % 6}.png)`; $('#grao').style.backgroundPosition = `${Math.floor(rnd(f) * 200)}px ${Math.floor(rnd(f + 9) * 200)}px`;
    let s = '';
    const g = Math.floor(t * 12);
    for (let k = 0; k < 5; k++) if (rnd(g * 7 + k) > .55) s += `<circle cx="${rnd(g * 3 + k) * 1080}" cy="${rnd(g * 5 + k) * 1920}" r="${1.5 + rnd(g + k) * 4}" fill="#3a2a10" opacity=".45"/>`;
    if (rnd(g * 11) > .6) { const x = rnd(g * 13) * 1080; s += `<line x1="${x}" y1="0" x2="${x + 6}" y2="1920" stroke="#fff6d8" stroke-width="1.6" opacity=".35"/>`; }
    $('#poeira').innerHTML = s;
  }
  // clarão + borrão nas bordas do flashback
  let fl = 0, bl = 0;
  if (FB) for (const c of FB) { const d = t - c; if (d > -.18 && d < .3) { const k = d < 0 ? 1 + d / .18 : 1 - d / .3; fl = Math.max(fl, k); bl = Math.max(bl, k); } }
  $('#flash').style.opacity = (fl * .92).toFixed(3);
  if (bl > 0) $('#cenas').style.filter += ` blur(${(bl * 12).toFixed(1)}px)`;
}

// ---------- render ----------
window.renderAt = (t) => { TL.seek(t, false); aplicaCams(); legendaEm(t); flashbackEm(t); $('#preto').style.opacity = t >= DUR - .04 ? 1 : 0; };
window.subquadros = (t) => RAPIDO.some(([a, b]) => t >= a && t <= b) ? 16 : 4;
window.DUR = DUR;
window.CORTES = CORTES;
