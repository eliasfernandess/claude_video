// Parte 2: "Hoje é a minha vez" — planos no tempo real das palavras (Whisper).
function monta() {
  cena('festa', mundoFesta(), '#131a45'); cena('conta', mundoContagem(), '#E8505B'); cena('nome', mundoNome(), '#8E9BB8');
  cena('ceu', mundoCeuNoite(), '#131a45'); cena('maos', mundoMaos(), '#232b5c');
  cena('abPad', mundoAbraco('abPad', pessoa({ ...PADEIRO, id: 'abPadP', x: 600, y: 1900, h: 380, bE: 110, bD: -20 }) + `<g id="abPadVapor" opacity="0" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"><path d="M 600 1560 q -14 -30 0 -60"/><path d="M 660 1560 q 14 -30 0 -60"/></g><g id="abPadBrilho" opacity="0"><circle cx="560" cy="1700" r="160" fill="#FF9A3C" opacity=".35" filter="url(#borra2)"/></g>`), '#131a45');
  cena('abZe', mundoAbraco('abZe', pessoa({ ...ZE, id: 'abZeP', x: 600, y: 1900, h: 340, bE: 110, bD: -60 }) + `<g id="abZeFogo" visibility="hidden">${fogo('abZeF', 740, 1730, 1.4)}</g>`), '#131a45');
  cena('abProf', mundoAbraco('abProf', pessoa({ ...PROF, id: 'abProfP', x: 600, y: 1900, h: 360, costas: 1, olhosNuca: 1 }), ''), '#131a45');
  cena('abViz', mundoAbraco('abViz', `<ellipse cx="660" cy="1915" rx="70" ry="14" fill="#000" opacity=".2"/><g id="abVizW">${pessoa({ ...VIZ, id: 'abVizP', x: 660, y: 1900, h: 420, bE: 110, bD: -150 })}</g>` +
    `<g transform="translate(760 1915)"><g id="abRegua" transform="scale(0.01)"><rect x="-16" y="-55" width="32" height="55" fill="#FFD23F" stroke="${OUT}" stroke-width="3"/>${placa(100, -30, '11 cm', '', 150, 40)}</g></g>`), '#131a45');
  DESTAQUE = new Set(['cidade', 'superpoder', 'meia-noite', 'doze', 'vez', 'tiaguin', 'segundos', 'padeiro', 'professora', 'vizinho', 'capacete', 'três', 'dois', 'um', 'atchim', 'apagou', 'fumaça', 'gelou', 'caiu', 'mim', 'subir', 'sozinho', 'fogo', 'olho', 'nuca',
    'inteira', 'só', 'torre', 'bandeirinhas', 'telhado', 'segurar', 'desliguei', 'também', 'pessoa', 'tocar', 'pula', 'abraça', 'acalma', 'devagarinho', 'guarda', 'devolve', 'esquenta', 'volta', 'vez', 'sobe', 'onze', 'presente', 'voar', 'mãe', 'nenhum', 'dou', 'voa', 'criança', 'poder', 'escolher', 'seu']);
  montaLegenda();

  // ===================== GANCHO (0 a 4,1 s) =====================
  plano(0, 'festa', { x: 800, y: 2020, s: 5.6 }, 'seco', { deriva: 0, vx: 4 });
  TL.set('#fsVoaW', { attr: { transform: 'translate(400 1960)' } }, 0).to('#fsVoaW', { attr: { transform: 'translate(1200 1900)' }, duration: .55, ease: 'none' }, .05); rapido(0, .7);
  TL.fromTo('#fsVoaW', { attr: { transform: 'translate(1200 1900)' } }, { attr: { transform: 'translate(300 1450)' }, duration: .01, immediateRender: false }, .62);
  olha('fsTg', 7, -3, .1); pisca('fsTg', .45); boca('fsTg', 'aberta', .3);
  plano(.6, 'festa', { x: 800, y: 1800, s: .86 }, 'voo', { dur: .5, ease: 'power2.out', deriva: -.02, vx: 30 });
  balanca('#vzW', 'y', -8, .5, 0, 16.2); chamas('#zeF1', 0, 16.8); chamas('#zeF2', .05, 16.8); chamas('#fsBolof1', 0, 16.8); chamas('#fsBolof2', .05, 16.8);
  balanca('#paoVapor', 'y', -16, .4, 0, 16.8);
  plano(2.45, 'festa', { x: 800, y: 440, s: 2.5 }, 'voo', { dur: .5, ease: 'power3.inOut' });
  [0, 1].forEach(k => TL.set('#fsRelS', { attr: { transform: `rotate(${246 + k * 6} 800 420)` } }, 3.0 + k * .9));
  // ===================== APRESENTAÇÃO (4,1 a 14,1) =====================
  plano(4.12, 'festa', { x: 800, y: 1960, s: 2.4 }, 'chicotev');
  braco('fsTg', 'D', 125, 4.5, .2); boca('fsTg', 'sorriso', 4.5); boca('fsTg', 'aberta', 5.1); pisca('fsTg', 5.3);
  plano(5.72, 'nome', { x: 540, y: 960, s: 1.0 }, 'freio', { k: 1.8, deriva: .05 });
  pop('#nmBrilho', 6.2, 1, .25);
  plano(6.66, 'festa', { x: 800, y: 480, s: 2.9 }, 'chicote>', { deriva: .05 });
  [50, 51, 52, 53, 54, 55, 56].forEach((k, i) => { TL.set('#cont' + k, { visibility: 'visible' }, 6.66 + i * .2).set('#cont' + k, { visibility: 'hidden' }, 6.86 + i * .2); });
  TL.set('#fsRelS', { attr: { transform: 'rotate(300 800 420)' } }, 6.66).to('#fsRelS', { attr: { transform: 'rotate(342 800 420)' }, duration: 1.2, ease: 'steps(7)' }, 6.66);
  plano(7.9, 'festa', { x: 800, y: 1800, s: .9 }, 'voo', { dur: .45, ease: 'power3.inOut', vx: 20 });
  plano(9.12, 'festa', { x: 1260, y: 1820, s: 2.5 }, 'corte', { k: 1.5 });
  braco('fsPad', 'D', -150, 9.2); boca('fsPad', 'aberta', 9.2);
  plano(9.82, 'festa', { x: 200, y: 1880, s: 2.6 }, 'corte', { k: 1.5 });
  TL.to('#fsProf-nuca g', { attr: { transform: 'scale(1 0.1)' }, duration: .05, yoyo: true, repeat: 1 }, 10.3);
  plano(10.68, 'festa', { x: 1000, y: 1820, s: 1.9 }, 'corte', { k: 1.5 });
  pop('#fsRegua', 11.42, 1, .25);
  plano(12.5, 'festa', { x: 470, y: 1990, s: 2.8 }, 'corte', { k: 1.6 });
  TL.to('#fsMae-olhos .olho:first-child .olhoEsc', { attr: { transform: 'scale(1 0.08)' }, duration: .06 }, 13.45).to('#fsMae-olhos .olho:first-child .olhoEsc', { attr: { transform: 'scale(1 1)' }, duration: .06 }, 13.85);
  boca('fsMae', 'meio', 13.4);
  // ===================== CONTAGEM E ESPIRRO (14,1 a 22,8) =====================
  plano(14.14, 'conta', { x: 540, y: 960, s: 1 }, 'pop', { deriva: .06 });
  popGira('#num3', 14.14); TL.set('#num3', { visibility: 'hidden' }, 14.74); popGira('#num2', 14.74); TL.set('#num2', { visibility: 'hidden' }, 15.36); popGira('#num1', 15.36);
  TL.fromTo('#sc_conta .raios', { attr: { transform: 'translate(540 960) rotate(0)' } }, { attr: { transform: 'translate(540 960) rotate(40)' }, duration: 2.1, ease: 'none', immediateRender: false }, 14.14);
  plano(16.15, 'festa', { x: 800, y: 2030, s: 6.2 }, 'seco', { deriva: 0 });
  esconde('#fsRegua', 16.1); fecha('fsTg', 16.15); boca('fsTg', 'o', 16.15); boca('fsTg', 'aberta', 16.3); fecha('fsTg', 16.6, false); boca('fsTg', 'o', 16.6);
  treme('festa', 16.3, .5, 55); FLASHES.push(16.3);
  plano(16.89, 'festa', { x: 800, y: 1800, s: .86 }, 'corte', { k: 1.3, deriva: .02 });
  TL.to('#fsLamp1 .lamp, #fsLamp2 .lamp', { opacity: .12, duration: .05, stagger: .03 }, 16.95); TL.to('#fsEscuro', { opacity: .45, duration: .5 }, 16.95);
  esconde('#zeFogo, #paoQuente, #paoVapor', 17.0);
  plano(17.77, 'festa', { x: 620, y: 1880, s: 2.6 }, 'corte', { k: 1.5 });
  mostra('#zeFumaca', 18.0); TL.fromTo('#zeFumaca circle', { y: 10, opacity: 0 }, { y: -50, opacity: .8, duration: .5, stagger: .06, immediateRender: false }, 18.0); boca('fsZe', 'o', 18.0);
  plano(19.47, 'festa', { x: 1260, y: 1820, s: 2.5 }, 'corte', { k: 1.5 });
  esconde('#zeFumaca', 19.47); mostra('#paoGelo', 20.13); boca('fsPad', 'o', 20.13); braco('fsPad', 'D', 60, 19.4, .01);
  plano(20.75, 'festa', { x: 1000, y: 1820, s: 1.9 }, 'corte', { k: 1.4 });
  TL.to('#vzW', { y: 30, duration: .12, ease: 'power2.in' }, 21.13); mostra('#fsPoeira', 21.25); TL.from('#fsPoeira circle', { y: 10, opacity: 0, duration: .3, stagger: .04, immediateRender: false }, 21.25); boca('fsViz', 'o', 21.25); treme('festa', 21.25, .25, 18);
  pop('#fsRegua', 21.77, 1, .25);
  // ===================== TODO MUNDO OLHANDO E O VOO (22,8 a 39,9) =====================
  plano(22.83, 'festa', { x: 800, y: 1950, s: 1.15 }, 'corte', { k: 1.25, deriva: .05 });
  esconde('#fsRegua', 22.8); TL.to('#fsSpot', { opacity: .55, duration: .4 }, 22.9);
  ['fsZe', 'fsPad', 'fsViz', 'fsMae', 'fsForte'].forEach((p, i) => olha(p, p === 'fsZe' || p === 'fsMae' ? 7 : -7, 2, 23.0 + i * .08));
  plano(24.29, 'festa', { x: 800, y: 1880, s: 1.6 }, 'corte', { k: 1.3, deriva: .02, vy: -120 });
  TL.to('#tgW', { y: -300, duration: 1.7, ease: 'power1.inOut' }, 24.4); TL.to('#tgSombra', { attr: { rx: 40 }, opacity: .08, duration: 1.7 }, 24.4); boca('fsTg', 'o', 24.4); olha('fsTg', 0, 8, 24.4);
  plano(26.07, 'festa', { x: 860, y: 1850, s: 3.4 }, 'freio', { k: 1.8 });
  mostra('#tgFogo', 26.25); chamas('#tgF', 26.25, 28.6); braco('fsTg', 'D', -60, 26.1, .1);
  plano(27.25, 'festa', { x: 800, y: 1740, s: 3.6 }, 'corte', { k: 1.5 });
  esconde('#tgFrente', 27.25); mostra('#tgCostas', 27.25);
  TL.fromTo('#tgOlhoNuca', { attr: { transform: 'translate(800 2022) scale(1 0.05)' } }, { attr: { transform: 'translate(800 2022) scale(1 1)' }, duration: .3, ease: 'back.out(2)', immediateRender: false }, 27.7);
  plano(28.59, 'ceu', { x: 540, y: 1200, s: 1.6, r: 0 }, 'vooDe', { de: { x: 540, y: 1150, s: 3.2 }, dur: .55, deriva: .02 });
  TL.fromTo(CAMS.ceu, { r: -14 }, { r: 0, duration: .6, ease: 'power2.out', immediateRender: false }, 28.59);
  TL.fromTo('#cnAuras', { attr: { transform: 'rotate(0)' } }, { attr: { transform: 'rotate(720)' }, duration: 11, ease: 'none', immediateRender: false }, 28.59);
  chamas('#cnTgF', 28.59, 39.9); boca('cnTg', 'aberta', 29.95);
  // voo pela cidade: a câmera segue o Tiaguin
  TL.to('#cnTgW', { attr: { transform: 'translate(1480 560)' }, duration: .9, ease: 'power2.inOut' }, 30.95);
  plano(30.95, 'ceu', { x: 1500, y: 700, s: 1.25 }, 'voo', { dur: .9, ease: 'power2.inOut' });
  TL.to('#cnSino', { attr: { transform: 'translate(1600 470) rotate(24)' }, duration: .15, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 31.85); treme('ceu', 31.85, .3, 20);
  TL.to('#cnTgW', { attr: { transform: 'translate(980 1330)' }, duration: .5, ease: 'power2.in' }, 32.35);
  plano(32.43, 'ceu', { x: 980, y: 1450, s: 1.35 }, 'chicotev');
  TL.to('#cnBand', { y: 420, duration: .7, ease: 'power2.in' }, 32.9);
  TL.to('#cnTgW', { attr: { transform: 'translate(2700 1240)' }, duration: 1.6, ease: 'none' }, 33.57);
  plano(33.57, 'ceu', { x: 2000, y: 1250, s: 1.3 }, 'chicote>', { deriva: 0, vx: 520 });
  TL.to('#sc_ceu .cnTelha', { y: '-=260', x: '+=120', duration: .8, stagger: .07, ease: 'power1.out' }, 34.3);
  TL.fromTo('#sc_ceu .cnTi', { attr: { transform: 'rotate(0)' } }, { attr: { transform: 'rotate(400)' }, duration: .9, ease: 'none', stagger: .07, immediateRender: false }, 34.3);
  plano(35.51, 'festa', { x: 800, y: 1850, s: .95 }, 'corte', { k: 1.3 });
  esconde('#tgW, #tgSombra', 35.5); TL.to('#fsSpot', { opacity: 0, duration: .01 }, 35.5);
  braco('fsForte', 'E', 165, 35.5, .01); TL.to('#fsZe', { y: '-=90', duration: .25, yoyo: true, repeat: 1, ease: 'power2.out' }, 35.9); TL.to('#fsPad', { y: '-=70', duration: .25, yoyo: true, repeat: 1, ease: 'power2.out' }, 36.05);
  plano(36.97, 'festa', { x: 420, y: 1650, s: 1.6 }, 'corte', { k: 1.4 });
  TL.set('#fsVoaW', { attr: { transform: 'translate(420 1350)' } }, 36.97).to('#fsVoaW', { attr: { transform: 'translate(430 2080)' }, duration: .5, ease: 'power2.in' }, 37.75); treme('festa', 38.25, .2, 14);
  plano(38.29, 'festa', { x: 1470, y: 1880, s: 2.2 }, 'corte', { k: 1.4 });
  braco('fsForte', 'E', 20, 38.6, .25, 'power2.in'); braco('fsForte', 'D', -20, 38.6, .25, 'power2.in'); TL.to('#fsForte', { y: '+=40', duration: .2 }, 38.75); boca('fsForte', 'o', 38.75);
  // ===================== A MÃE (39,9 a 52,6) =====================
  plano(39.92, 'festa', { x: 470, y: 1985, s: 3.0 }, 'corte', { k: 1.25, deriva: .05 });
  esconde('#maeCap', 40.9); mostra('#maeSem', 40.9); boca('fsMae2', 'meio', 41.0); olha('fsMae2', 0, -6, 41.0);
  plano(43.24, 'ceu', { x: 1690, y: 1500, s: 1.3 }, 'chicote^', { deriva: 0, vy: -600 });
  mostra('#cnMaeW', 43.2); esconde('#cnTgW', 43.2); TL.set('#cnTgW', { attr: { transform: 'translate(1350 520)' } }, 43.2);
  TL.fromTo('#cnMaeW', { attr: { transform: 'translate(1690 1900)' } }, { attr: { transform: 'translate(1690 760)' }, duration: 1.65, ease: 'none', immediateRender: false }, 43.24);
  mostra('#cnTgW', 44.3);
  plano(44.92, 'ceu', { x: 1500, y: 640, s: 1.2 }, 'voo', { dur: .3, ease: 'expo.out' });
  TL.to('#cnMaeW', { attr: { transform: 'translate(1420 600)' }, duration: .3, ease: 'power2.out' }, 44.92);
  plano(45.2, 'ceu', { x: 1350, y: 420, s: 1.9 }, 'corte', { k: 1.3, deriva: .03 });
  esconde('#cnMaeW, #cnTgW', 45.2); mostra('#cnAbraco', 45.2); fecha('cnAbMae', 45.6); fecha('cnAbTg', 45.6); boca('cnAbMae', 'sorriso', 45.2);
  TL.to('#cnOuro', { opacity: .8, duration: .6 }, 46.42); TL.to('#cnOuro', { opacity: 0, duration: 1.2 }, 47.1);
  plano(47.36, 'ceu', { x: 1350, y: 700, s: 1.2 }, 'voo', { dur: .6, ease: 'sine.inOut', deriva: .01 });
  TL.to('#cnAbraco', { attr: { transform: 'translate(1350 1400)' }, duration: 1.4, ease: 'sine.inOut' }, 47.36);
  plano(48.74, 'festa', { x: 470, y: 1985, s: 3.2 }, 'fusao', { deriva: .05 });
  TL.to('#fsEscuro', { opacity: .22, duration: .4 }, 48.7); boca('fsMae2', 'aberta', 49.68); boca('fsMae2', 'sorriso', 50.1); boca('fsMae2', 'aberta', 51.22); boca('fsMae2', 'sorriso', 51.6); pisca('fsMae2', 50.8);
  plano(51.94, 'festa', { x: 800, y: 2010, s: 3.6 }, 'corte', { k: 1.3 });
  mostra('#tgW', 51.9); TL.set('#tgW', { y: 0 }, 51.9); esconde('#tgCostas, #tgFogo', 51.9); mostra('#tgFrente', 51.9); olha('fsTg', 0, 0, 51.9, .01); boca('fsTg', 'sorriso', 52.1);
  TL.to('#fsTg-cabeca', { y: 14, duration: .12, yoyo: true, repeat: 1 }, 52.2);
  // ===================== DEVOLVENDO OS PODERES (52,6 a 63,3) =====================
  plano(52.68, 'abPad', { x: 520, y: 1600, s: 1.5 }, 'chicote>');
  TL.to('#abPadVapor', { opacity: 1, duration: .3 }, 53.88); TL.to('#abPadBrilho', { opacity: 1, duration: .3 }, 53.88); balanca('#abPadVapor', 'y', -20, .35, 53.9, 54.7); boca('abPadP', 'aberta', 53.9);
  plano(54.7, 'abZe', { x: 540, y: 1600, s: 1.5 }, 'chicote>');
  mostra('#abZeFogo', 55.72); chamas('#abZeF', 55.72, 56.7); pop('#abZeF', 55.72, 1.4, .25, 'translate(740 1730)'); boca('abZeP', 'aberta', 55.8);
  plano(56.62, 'abProf', { x: 560, y: 1580, s: 1.6 }, 'chicote>');
  TL.set('#abProfP-nuca > g', { visibility: 'hidden' }, 56.6); TL.set('#abProfP-nuca > g:nth-child(1)', { visibility: 'visible' }, 58.66); TL.set('#abProfP-nuca > g:nth-child(2)', { visibility: 'visible' }, 59.04);
  plano(58.66, 'abProf', { x: 640, y: 1520, s: 3.0 }, 'voo', { dur: .25, ease: 'expo.out' });
  plano(59.3, 'abViz', { x: 560, y: 1560, s: 1.4 }, 'chicote>');
  TL.to('#abVizW', { y: -14, duration: .4, ease: 'back.out(3)' }, 60.8); pop('#abRegua', 61.4, 1, .25); boca('abVizP', 'aberta', 61.4);
  plano(62.46, 'abViz', { x: 640, y: 1580, s: 3.0 }, 'voo', { dur: .25, ease: 'expo.out' });
  mostra('#abVizP-lagrima', 62.5); boca('abVizP', 'sorriso', 62.5);
  // ===================== O PODER DE VOAR (63,3 a 79,9) =====================
  plano(63.3, 'festa', { x: 800, y: 2080, s: 2.4 }, 'fusao', { deriva: .06 });
  TL.to('#tgPeito', { opacity: .9, duration: .6 }, 63.6); balanca('#tgPeito', 'opacity', .5, .35, 64.3, 65.4);
  plano(65.48, 'festa', { x: 470, y: 1985, s: 3.0 }, 'corte', { k: 1.3, deriva: .04 });
  boca('fsMae2', 'meio', 65.5); pisca('fsMae2', 66.9);
  plano(68.04, 'maos', { x: 540, y: 1000, s: 1.1 }, 'corte', { k: 1.3, deriva: .05 });
  TL.fromTo('#mxBrilho', { attr: { cx: 820 }, opacity: 0 }, { attr: { cx: 560 }, opacity: .95, duration: 1.4, ease: 'sine.inOut', immediateRender: false }, 68.2);
  mostra('#mxFaiscas', 69.61); pop('#mxFaiscas', 69.61, 1, .3);
  plano(70.01, 'festa', { x: 470, y: 1900, s: 1.5 }, 'corte', { k: 1.3, deriva: 0, vy: -160 });
  esconde('#tgW', 70.0); TL.to('#maeW', { y: -320, duration: 2.3, ease: 'power1.inOut' }, 70.1); braco('fsMae2', 'E', 120, 70.4, .3); braco('fsMae2', 'D', -120, 70.4, .3); boca('fsMae2', 'o', 70.4); boca('fsMae2', 'aberta', 71.99);
  TL.to('#fsEscuro', { opacity: 0, duration: .8 }, 70.5); TL.to('#fsLamp1 .lamp, #fsLamp2 .lamp', { opacity: 1, duration: .05, stagger: .03 }, 70.6);
  plano(72.57, 'ceu', { x: 1650, y: 900, s: 1.05 }, 'vooDe', { de: { x: 1650, y: 780, s: 3.0 }, dur: .6, deriva: -.04 });
  esconde('#cnAbraco', 72.5); mostra('#cnMaeVoa', 72.5); fecha('cnMV', 73.9); boca('cnMV', 'aberta', 72.6);
  TL.to('#cnMaeVoa', { attr: { transform: 'translate(1700 820)' }, duration: 2.6, ease: 'sine.inOut' }, 72.6);
  [0, 1, 2, 3].forEach(i => pop('#fa' + i, 73.0 + i * .35, 1, .4));
  plano(75.23, 'festa', { x: 800, y: 2010, s: 3.4 }, 'corte', { k: 1.4, deriva: .04 });
  mostra('#tgW', 75.2); TL.set('#tgPeito', { opacity: 0 }, 75.2); boca('fsTg', 'sorriso', 75.2);
  TL.to('#fsTg-olhos .olho:first-child .olhoEsc', { attr: { transform: 'scale(1 0.08)' }, duration: .06 }, 77.3).to('#fsTg-olhos .olho:first-child .olhoEsc', { attr: { transform: 'scale(1 1)' }, duration: .06 }, 77.65);
  plano(77.85, 'festa', { x: 820, y: 2000, s: 4.4 }, 'freio', { k: 1.6, deriva: .08 });
  braco('fsTg', 'D', -95, 77.9, .18); boca('fsTg', 'aberta', 78.4);
  compila();
  TL.set({}, {}, DUR);
}
document.fonts.load('700 60px Fredoka').then(() => { monta(); window.pronto = true; renderAt(0); });
