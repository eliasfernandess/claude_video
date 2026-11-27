// Roteiro visual do vídeo 09: cada plano começa numa palavra (tempos do alinhamento da voz).
function monta() {
  cena('praca', mundoPraca(), '#E6F6FB'); cena('vela', mundoVela(), '#FFD45C'); cena('cozinha', mundoCozinha(), '#FBEFD5'); cena('rua', mundoRua(), '#EAF7FB');
  cena('padaria', mundoPadaria(), '#FFE9C7'); cena('aula', mundoAula(), '#CFE8D8'); cena('vizinho', mundoVizinho(), '#EAF7FB');
  cena('cozAntiga', mundoCozAntiga(), '#E9F2D8'); cena('relAntigo', mundoRelogioAntigo(), '#E9F2D8'); cena('medico', mundoMedico(), '#DCEFF5'); cena('escola', mundoEscola(), '#EAF7FB');
  cena('muro', mundoMuro(), '#EAF7FB'); cena('colher', mundoColher(), '#E9F2D8');
  cena('quarto', mundoQuarto('qa', '#7A5A33', '', '#C98E5A', '#E5737A', P('qaMen', MENINA, { x: 0, y: 0 })), '#7A5A33');
  cena('ventania', mundoVentania(), '#7D8F8C'); cena('ceuVoa', mundoCeuVoando(), '#5F7470'); cena('fuga', mundoFuga(), '#6F837F'); cena('porta', mundoPorta(), '#9FE0C6');
  cena('olho', mundoOlho(), '#7D8C9E'); cena('calma', mundoCalma(), '#E6F6FB'); cena('biblio', mundoBiblioteca(), '#E9D9BE'); cena('ancora', mundoAncora(), '#7FC4E8');
  cena('livro', mundoLivro(), '#8E3B3B'); cena('varanda', mundoVaranda(), '#FFD39A'); cena('festas', mundoFestas(), '#E6F6FB'); cena('mesaLivro', mundoMesaLivro(), '#3B2A22');
  cena('casaNoite', mundoCasaNoite(), '#1d2550'); cena('berco', mundoBerco(), '#F2E2F2');
  cena('quartoTg', mundoQuarto('qt', '#2D3A6E', '', '#9B6B43', '#5DADE2', P('qtTg', TG, { x: 0, y: 0 }),
    `<rect x="900" y="760" width="260" height="960" fill="#FFD890" opacity=".55"/><rect x="900" y="760" width="260" height="960" fill="none" stroke="${OUT}" stroke-width="${OW}"/>` + P('qtMae', MAE, { x: 1010, y: 1720, h: 400 }) +
    `<circle id="qtBrilho" cx="420" cy="1250" r="70" fill="#7FD3FF" opacity="0" filter="url(#borra)"/>`), '#2D3A6E');
  cena('relNoite', mundoRelogioNoite(), '#24305e');
  montaLegenda();
  FB = [25.76, 46.06];

  // ===================== ABERTURA (0 a 12,75 s) =====================
  plano(0, 'praca', { x: 800, y: 1972, s: 5.9 }, 'seco', { deriva: 0, vx: 4 });
  esconde('#prBand, #prMesa', 0);
  TL.set('#prBola', { x: 640, y: 1930 }, 0).to('#prBola', { x: 960, y: 1918, duration: .36, ease: 'none' }, 0).to('#prBola', { x: 1700, y: 1880, duration: .6, ease: 'none' }, .36);
  TL.set('#prVoador', { x: 420, y: 1925 }, 0).to('#prVoador', { x: 820, y: 1880, duration: .4, ease: 'none' }, .2).to('#prVoador', { x: 1500, y: 1250, duration: 1.3, ease: 'none' }, .6);
  rapido(0, .8); pisca('prMae', .5); boca('prMae', 'o', .55); boca('prMae', 'sorriso', 1.9);
  plano(.8, 'praca', { x: 790, y: 1830, s: 1.02 }, 'voo', { dur: .5, ease: 'power2.out', deriva: -.03, vx: 50 });
  TL.fromTo('#prBroto', { attr: { transform: 'scale(1 0)' } }, { attr: { transform: 'scale(1 1)' }, duration: .35, ease: 'back.out(2)', immediateRender: false }, 1.5);
  TL.from('#prFaiscas path', { opacity: 0, duration: .08, stagger: .2 }, 1.3);
  balanca('#prFlutua', 'y', -18, .6, 0, 6); balanca('#prForte', 'y', -10, .35, 0, 6); chamas('#prFogo1', 0, 3.5); chamas('#prFogo2', .05, 3.5);
  plano(2.98, 'praca', { x: 800, y: 440, s: 2.55 }, 'voo', { dur: .5, ease: 'power3.inOut' });
  [0, 1, 2].forEach(k => TL.set('#prrelS', { attr: { transform: `rotate(${246 + k * 6} 800 420)` } }, 3.5 + k * .7));
  plano(5.42, 'vela', { x: 540, y: 960, s: 1 }, 'pop', { deriva: .06 });
  popGira('#vela12', 5.42);
  TL.fromTo('#sc_vela .raios', { attr: { transform: 'translate(540 960) rotate(0)' } }, { attr: { transform: 'translate(540 960) rotate(18)' }, duration: .6, ease: 'none', immediateRender: false }, 5.42);
  chamas('#velaA', 5.42, 5.95); chamas('#velaB', 5.47, 5.95);
  plano(5.92, 'cozinha', { x: 545, y: 1430, s: 1.5 }, 'chicote>', { deriva: .04 });
  esconde('#czBolo, #czCal', 5.9);
  acena('czMae', 'D', -150, -128, 5.92, 5); braco('czMae', 'D', -14, 7.1, .15, 'power2.out');
  boca('czMae', 'aberta', 5.92); boca('czMae', 'sorriso', 6.3); boca('czMae', 'aberta', 6.9); boca('czMae', 'sorriso', 7.2);
  TL.to('#czTg-bracoD', { attr: { transform: 'rotate(-70)' }, duration: .18, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 5.92);
  braco('czTg', 'D', -160, 7.29); boca('czTg', 'aberta', 7.29); pisca('czMae', 6.6);
  plano(7.85, 'rua', { x: 540, y: 1330, s: 1.0 }, 'vooDe', { de: { x: 540, y: 1410, s: 4.4 }, deriva: .03 });
  TL.from('#sc_rua .ruaAura', { attr: { rx: 0, ry: 0 }, opacity: 0, duration: .3, stagger: .2, ease: 'back.out(2)', immediateRender: false }, 8.4);
  boca('ruMae', 'meio', 10.13); olha('ruMae', 0, 7, 10.13);
  TL.to('#sc_rua .ruaAura', { opacity: .9, duration: .25, yoyo: true, repeat: 1 }, 10.99);
  plano(11.51, 'rua', { x: 540, y: 1405, s: 4.6 }, 'voo', { dur: .26, ease: 'expo.out', deriva: .04 });
  olha('ruMae', 8, -2, 12.3); TL.to('#ruMae-sobr', { y: -9, duration: .12, ease: 'back.out(3)' }, 12.3); boca('ruMae', 'meio', 12.36);
  TL.fromTo('#ruBrilho', { attr: { transform: 'translate(576 1394) scale(0) rotate(0)' } }, { attr: { transform: 'translate(576 1394) scale(0.42) rotate(90)' }, duration: .3, ease: 'back.out(3)', immediateRender: false }, 12.45);

  // ===================== FESTA E 3 EXEMPLOS (12,75 a 25,76) =====================
  plano(12.75, 'praca', { x: 800, y: 1760, s: .92 }, 'chicotev', { deriva: .03 });
  mostra('#prBand, #prMesa', 12.7); TL.set('#prBola, #prVoador', { visibility: 'hidden' }, 12.7);
  chamas('#prBolof1', 12.75, 16.5); chamas('#prBolof2', 12.8, 16.5);
  TL.to('#sc_praca .pupila', { y: -9, x: 3, duration: .15 }, 15.69);
  plano(16.13, 'praca', { x: 800, y: 440, s: 2.3 }, 'voo', { dur: .45 });
  plano(17.06, 'padaria', { x: 540, y: 1260, s: 1.15 }, 'corte', { k: 1.6 });
  TL.from('#pdMaos circle', { opacity: 0, duration: .25 }, 17.48); balanca('#pdVapor', 'y', -24, .4, 17.06, 18.73);
  boca('pdP', 'aberta', 17.94); pisca('pdP', 18.3);
  plano(18.73, 'aula', { x: 540, y: 1300, s: .95 }, 'chicote>');
  plano(19.56, 'aula', { x: 640, y: 1270, s: 2.6 }, 'voo', { dur: .3, ease: 'expo.out' });
  TL.fromTo('#auProf-nuca', { opacity: 0 }, { opacity: 1, duration: .1, immediateRender: false }, 19.56);
  plano(20.78, 'aula', { x: 320, y: 1800, s: 2.1 }, 'voo', { dur: .3, ease: 'expo.out' });
  TL.to('#auCola', { attr: { transform: 'translate(390 1990) rotate(-8)' }, duration: .15 }, 21.0); mostra('#auSuor', 21.0); boca('auAl', 'o', 21.0); braco('auAl', 'D', -14, 21.0);
  plano(21.66, 'vizinho', { x: 500, y: 1540, s: 1.3 }, 'corte', { k: 1.5 });
  balanca('#vzViz', 'y', -6, .5, 21.66, 25.7);
  plano(22.91, 'vizinho', { x: 545, y: 1870, s: 2.3 }, 'voo', { dur: .35 });
  pop('#vzRegua', 23.3, 1, .3);
  plano(24.25, 'vizinho', { x: 900, y: 1700, s: 1.25 }, 'voo', { dur: .4 });
  esconde('#vzRegua', 24.25);
  TL.to('#vzViz, #vzSombra', { x: 480, duration: .9, ease: 'power1.inOut' }, 24.35);

  // ===================== FLASHBACK (25,76 a 46,06) =====================
  plano(25.76, 'cozAntiga', { x: 480, y: 1300, s: 1.7 }, 'seco', { deriva: .025 });
  chamas('#caBf1', 25.76, 31.3); chamas('#caBf2', 25.8, 31.3);
  plano(27.83, 'cozAntiga', { x: 800, y: 780, s: 1.8 }, 'voo', { dur: .4 });
  [0, 1, 2, 3].forEach(i => TL.fromTo('#caViz' + i, { visibility: 'visible', y: 260 }, { y: 0, duration: .25, ease: 'back.out(2)', immediateRender: false }, 27.9 + i * .18));
  plano(29.18, 'relAntigo', { x: 540, y: 1100, s: 1.0, r: -3 }, 'freio', { k: 1.8 }); mostra('#raT0', 29.18);
  plano(29.69, 'relAntigo', { x: 560, y: 1080, s: 1.25, r: 3 }, 'freio', { k: 1.6 }); esconde('#raT0', 29.69); mostra('#raT1', 29.69); TL.set('#raRM', { attr: { transform: 'rotate(6 540 900)' } }, 29.69);
  plano(30.62, 'relAntigo', { x: 540, y: 1150, s: .95, r: -2 }, 'freio', { k: 1.6 }); esconde('#raT1', 30.62); mostra('#raT2', 30.62); TL.set('#raRM', { attr: { transform: 'rotate(60 540 900)' } }, 30.62);
  plano(31.3, 'cozAntiga', { x: 400, y: 1350, s: 3.0 }, 'freio', { k: 1.4 });
  fecha('caMen', 31.3); boca('caMen', 'triste', 31.3); esconde('#caBolo .chamasBolo', 31.45); mostra('#caFumaca', 31.45); TL.from('#caFumaca circle', { opacity: 0, y: 20, stagger: .05, duration: .2, immediateRender: false }, 31.45);
  plano(31.52, 'medico', { x: 600, y: 1330, s: .95 }, 'corte');
  TL.from('#mdDoc0, #mdDoc1, #mdDoc2', { y: 300, duration: .2, stagger: .12, ease: 'back.out(2)', immediateRender: false }, 31.52);
  plano(32.24, 'medico', { x: 930, y: 1420, s: 2.3 }, 'voo', { dur: .35 });
  boca('mdD2', 'aberta', 32.81); boca('mdD2', 'sorriso', 33.2);
  plano(33.3, 'medico', { x: 820, y: 700, s: 2.0 }, 'voo', { dur: .35 });
  mostra('#mdTxt', 34.51); TL.fromTo('#mdTxt', { attr: { transform: 'scale(0.01)' } }, { attr: { transform: 'scale(1)' }, duration: .25, ease: 'back.out(2.5)', immediateRender: false }, 34.51); rapido(34.5, 34.8);
  plano(35.65, 'escola', { x: 560, y: 1400, s: .95 }, 'vooDe', { de: { x: 960, y: 1690, s: 4 } });
  balanca('#esK1', 'y', -40, .5, 35.65, 37.7); chamas('#esFogo', 35.65, 37.7); balanca('#esBolhas', 'y', -60, .9, 35.65, 37.7);
  boca('esMen', 'triste', 37.16); olha('esMen', 0, 6, 37.16);
  plano(37.72, 'muro', { x: 430, y: 1180, s: 1.25 }, 'corte', { k: 1.5 });
  TL.to('#muPula', { y: -30, duration: .25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 37.8); boca('muMen', 'aberta', 38.98);
  plano(39.35, 'muro', { x: 560, y: 1980, s: 1.8 }, 'freio', { k: 1.7 });
  esconde('#muPula', 39.35); mostra('#muGesso', 39.35); boca('muMen2', 'triste', 39.35); mostra('#muMen2-lagrima', 39.6);
  plano(40.2, 'colher', { x: 620, y: 1150, s: 1.1 }, 'chicote<', { deriva: .05 });
  olha('coMen', -6, 8, 40.2); [0, 1, 2, 3, 4, 5, 6].forEach(i => pop('#coX' + i, 40.6 + i * .25, 1, .18, `translate(${-130 + (i % 4) * 85} ${-50 + Math.floor(i / 4) * 90})`));
  TL.to('#coColher', { attr: { transform: 'translate(540 1600) rotate(4)' }, duration: .1, yoyo: true, repeat: 3 }, 42.33);
  plano(42.98, 'quarto', { x: 520, y: 1150, s: 1.0 }, 'fusao', { deriva: .04 });
  olha('qaMen', 6, 0, 43.0);
  plano(44.8, 'quarto', { x: 200, y: 1290, s: 3.0 }, 'voo', { dur: .5, ease: 'power2.inOut', deriva: .05 });
  boca('qaMen', 'triste', 44.8); mostra('#qaMen-lagrima', 45.4);

  // ===================== VENTANIA (46,06 a 66,59) =====================
  plano(46.06, 'ventania', { x: 800, y: 1750, s: .85 }, 'seco', { deriva: .02, vx: -20 });
  TL.to('#vtEscuro', { opacity: .45, duration: 1, ease: 'none' }, 46.06);
  TL.to('#vtFolhas .folha', { x: 400, y: -80, duration: 1.2, stagger: { each: .04, repeat: 3 }, ease: 'none' }, 46.06);
  olha('vtMae', 0, -8, 46.3); boca('vtMae', 'o', 46.66);
  plano(47.09, 'ventania', { x: 800, y: 1960, s: 2.3 }, 'corte', { k: 1.5 });
  boca('vtCaio', 'o', 47.3); TL.to('#vtRede', { opacity: 1, duration: .3 }, 48.6); TL.fromTo('#vtRede', { attr: { transform: 'rotate(0 800 1880)' } }, { attr: { transform: 'rotate(1080 800 1880)' }, duration: 2.3, ease: 'none', immediateRender: false }, 48.6);
  braco('vtCaio', 'E', 120, 50.1); braco('vtCaio', 'D', -120, 50.1);
  plano(50.85, 'ventania', { x: 800, y: 1550, s: .78 }, 'voo', { dur: .5, ease: 'power2.out', deriva: -.02 });
  TL.fromTo('#vtTornado', { attr: { transform: 'translate(800 2160) scale(0.01)' } }, { attr: { transform: 'translate(800 2160) scale(1)' }, duration: .7, ease: 'back.out(1.4)', immediateRender: false }, 50.9);
  TL.to('#vtRede', { opacity: 0, duration: .2 }, 50.9);
  TL.to('#vtT .tLinha', { x: 30, duration: .12, yoyo: true, repeat: 60, ease: 'sine.inOut', stagger: .03 }, 50.9);
  plano(53.22, 'ceuVoa', { x: 540, y: 820, s: 1.2 }, 'chicote^', { deriva: .05 });
  TL.to('#sc_ceuVoa .cvTelha', { x: '+=260', y: '-=120', duration: 1.4, ease: 'none', stagger: .05 }, 53.22);
  TL.fromTo('#sc_ceuVoa .cvTi', { attr: { transform: 'rotate(0)' } }, { attr: { transform: 'rotate(540)' }, duration: 1.4, ease: 'none', immediateRender: false }, 53.22);
  plano(53.97, 'ceuVoa', { x: 540, y: 1500, s: 1.3 }, 'voo', { dur: .3, ease: 'expo.out' });
  TL.fromTo('#cvCarro', { attr: { transform: 'rotate(0)' } }, { attr: { transform: 'rotate(400)' }, duration: .9, ease: 'none', immediateRender: false }, 53.97);
  TL.to('#cvFolhas .folha', { x: 500, y: -200, duration: 1.6, ease: 'none', stagger: .03 }, 53.22);
  plano(54.79, 'fuga', { x: 560, y: 1500, s: .9 }, 'corte');
  TL.to('#fgV0', { x: -300, y: -300, duration: 2.2, ease: 'power1.in' }, 54.9); TL.to('#fgV1', { x: 500, y: -500, duration: 2.2, ease: 'power1.in' }, 55.0); TL.to('#fgV2', { x: 1300, y: -200, duration: 2.2, ease: 'power1.in' }, 55.1);
  TL.to('#fgViz', { x: 520, duration: 1.8, ease: 'none' }, 55.74); TL.to('#fgSombra', { x: 220, duration: 1.8, ease: 'none' }, 55.74); balanca('#fgViz', 'y', 2040, .25, 55.74, 56.7);
  TL.to('#fgFolhas .folha', { x: 600, y: -100, duration: 1.9, ease: 'none', stagger: .03 }, 54.79);
  plano(56.71, 'porta', { x: 640, y: 1350, s: 1.0 }, 'chicote>');
    TL.to('#ptFolhas .folha', { x: 900, duration: 2.2, ease: 'none', stagger: .05 }, 56.71); balanca('#ptVento', 'x', 80, .4, 56.71, 59);
  plano(59.04, 'ventania', { x: 520, y: 1900, s: 1.8 }, 'corte', { k: 1.4 });
  TL.to('#vtBebe', { x: 1080, y: 2000, duration: .4, ease: 'power2.inOut' }, 59.16); braco('vtMae', 'D', -40, 59.16, .3); braco('vtG1', 'E', 40, 59.4, .3);
  plano(59.99, 'ventania', { x: 720, y: 1800, s: 1.05 }, 'corte', { k: 1.3, deriva: 0 });
  esconde('#vtMaeW', 59.99); mostra('#vtMaeCostas', 59.99);
  TL.to('#vtMaeCostas', { x: 200, y: -110, duration: 1.3, ease: 'none' }, 60.0); 
  plano(61.33, 'olho', { x: 430, y: 1640, s: 2.9 }, 'corte', { k: 1.5, deriva: .05 });
  TL.to('#sc_olho .olD', { x: '+=700', y: '-=120', duration: .8, stagger: .12, repeat: 2, ease: 'none' }, 61.33);
  TL.to('#olFolhas .folha', { x: 1000, duration: 1.4, ease: 'none', stagger: .03 }, 61.33);
  TL.to('#olParede', { x: 240, duration: 3, ease: 'none' }, 61.33);
  pisca('olMae', 62.0); olha('olMae', 6, 0, 61.6);
  plano(62.62, 'olho', { x: 560, y: 1650, s: 1.4 }, 'voo', { dur: .35 });
  TL.to('#olMaeW', { x: 150, duration: .5, ease: 'power2.out' }, 62.7); braco('olMae', 'E', -70, 63.3, .25, 'power2.out'); braco('olMae', 'D', 70, 63.3, .25, 'power2.out');
  fecha('olMae', 63.72); boca('olMae', 'sorriso', 63.72); boca('olCaio', 'o', 62.62); fecha('olCaio', 63.9);
  plano(64.24, 'calma', { x: 800, y: 1780, s: .88 }, 'seco', { deriva: .02 });
  TL.fromTo('#clCarro', { attr: { transform: 'translate(800 600) rotate(160)' } }, { attr: { transform: 'translate(800 1980) rotate(190)' }, duration: 1.0, ease: 'power2.in', immediateRender: false }, 64.33); mostra('#clSplash', 65.33);
  TL.from('#clSplash', { y: 60, opacity: 0, duration: .2, immediateRender: false }, 65.33); rapido(64.3, 65.6);
  TL.to('#clFolhas .folha', { y: 300, duration: 2.3, ease: 'sine.out', stagger: .02 }, 64.24);
  boca('clMae', 'o', 65.33); boca('clCaio', 'o', 65.33); pisca('clMae', 66.1);

  // ===================== A ÂNCORA (66,59 a 82,71) =====================
  plano(66.59, 'biblio', { x: 560, y: 1300, s: .92 }, 'chicote>', { deriva: .03 });
  boca('biL', 'aberta', 67.42); boca('biL', 'sorriso', 67.9); pisca('biMae', 68.4);
  plano(69.41, 'biblio', { x: 570, y: 1400, s: 2.3 }, 'voo', { dur: .4 });
  mostra('#biPoeira', 69.7); TL.fromTo('#biPoeira circle', { opacity: .9, y: 0 }, { opacity: 0, y: -120, duration: .9, stagger: .05, immediateRender: false }, 69.7);
  plano(71.05, 'biblio', { x: 570, y: 1420, s: 3.6 }, 'voo', { dur: .35, ease: 'expo.out', deriva: .05 });
  plano(72.63, 'ancora', { x: 540, y: 1000, s: 1 }, 'pop', { deriva: .05 });
  popGira('#anIcone', 72.63); pop('#anTxt', 72.8, 1, .3);
  TL.fromTo('#sc_ancora .raios', { attr: { transform: 'translate(540 960) rotate(0)' } }, { attr: { transform: 'translate(540 960) rotate(14)' }, duration: .6, ease: 'none', immediateRender: false }, 72.63);
  plano(73.23, 'livro', { x: 540, y: 960, s: 1.02 }, 'chicote<', { deriva: .04 });
  plano(74.22, 'livro', { x: 1640, y: 960, s: 1.02 }, 'voo', { dur: .32, ease: 'power3.inOut', deriva: .04 });
  plano(75.82, 'livro', { x: 2740, y: 960, s: 1.02 }, 'voo', { dur: .32, ease: 'power3.inOut', deriva: .04 });
  TL.to('#lvOnda', { opacity: 0, x: 40, duration: .6 }, 77.4); TL.to('#lvCalma', { opacity: 1, duration: .6 }, 77.4);
  plano(78.51, 'varanda', { x: 560, y: 1640, s: 1.3 }, 'corte', { k: 1.4, deriva: .03 });
  TL.to('#vrMaeW', { filter: 'grayscale(0)', duration: .5, ease: 'none' }, 79.0);
  boca('vrTg', 'aberta', 79.34); boca('vrTg', 'sorriso', 79.7); fecha('vrMae', 80.7); boca('vrMae', 'sorriso', 80.7);
  plano(79.76, 'varanda', { x: 560, y: 1660, s: 1.75 }, 'voo', { dur: 2.4, ease: 'sine.inOut', deriva: .02 });

  // ===================== FESTAS E MISTÉRIO (82,71 a 92,05) =====================
  plano(82.71, 'festas', { x: 500, y: 1820, s: 1.05 }, 'chicote>');
  chamas('#fsB1f1', 82.71, 84.4); chamas('#fsB1f2', 82.75, 84.4);
  plano(84.41, 'festas', { x: 1860, y: 1820, s: 1.05 }, 'voo', { dur: .32, ease: 'power3.inOut' });
  chamas('#fsB2f1', 84.4, 87); chamas('#fsB2f2', 84.45, 87);
  plano(86.03, 'festas', { x: 1650, y: 1975, s: 3.4 }, 'voo', { dur: .28, ease: 'expo.out' });
  TL.to('#fsMae2-olhos .olho:first-child .olhoEsc', { attr: { transform: 'scale(1 0.08)' }, duration: .06 }, 86.4); TL.to('#fsMae2-olhos .olho:first-child .olhoEsc', { attr: { transform: 'scale(1 1)' }, duration: .06 }, 86.85);
  boca('fsMae2', 'meio', 86.4);
  plano(87.03, 'mesaLivro', { x: 540, y: 1000, s: .95 }, 'fusao', { deriva: .03 });
  plano(88.14, 'mesaLivro', { x: 600, y: 1000, s: 1.55 }, 'voo', { dur: .5, ease: 'power2.inOut' });
  plano(91.17, 'mesaLivro', { x: 660, y: 1000, s: 2.6 }, 'voo', { dur: .25, ease: 'expo.out' });
  TL.fromTo('#mlPedaco', { attr: { transform: 'translate(860 700) rotate(20)' } }, { attr: { transform: 'translate(820 1500) rotate(200)' }, duration: .8, ease: 'power1.in', immediateRender: false }, 91.4);

  // ===================== AMANHÃ (92,05 a 103) =====================
  plano(92.05, 'cozinha', { x: 640, y: 1000, s: 1.25 }, 'corte', { k: 1.5 });
  TL.set('#czNoite', { opacity: .5 }, 92.05).set('#czLuz', { opacity: 1 }, 92.05); mostra('#czBolo, #czCal', 92.05); esconde('#czTgW, #czTigela, #czMaeW', 92.05);
  TL.set('#czRelH', { attr: { transform: 'rotate(-1 820 640)' } }, 92.05);
  pop('#czCirc', 92.17, 1, .3); chamas('#czBf1', 92.05, 94.7); chamas('#czBf2', 92.1, 94.7);
  plano(93.46, 'cozinha', { x: 690, y: 1180, s: 2.3 }, 'voo', { dur: .35, ease: 'expo.out' });
  plano(94.66, 'berco', { x: 540, y: 1150, s: 1.1 }, 'chicote<', { deriva: .04 });
  mostra('#bcRiso', 95.8); [95.8, 96.0].forEach(t => { TL.set('#bcEsc', { opacity: .55 }, t).set('#bcLuz', { opacity: .2 }, t).set('#bcEsc', { opacity: 0 }, t + .1).set('#bcLuz', { opacity: 1 }, t + .1); });
  plano(96.13, 'casaNoite', { x: 540, y: 1200, s: .95 }, 'corte', { k: 1.4 });
  [96.3, 96.45, 96.62, 96.8, 96.95].forEach((t, k) => [0, 1, 2, 3, 4].forEach(i => TL.set('#cnJ' + i, { opacity: (k + i) % 2 ? .1 : 1 }, t + i * .02)));
  TL.set('.cnJan', { opacity: 1 }, 97.1);
  plano(97.21, 'quartoTg', { x: 540, y: 1300, s: .95 }, 'fusao', { deriva: .03 });
  fecha('qtTg', 97.21); boca('qtTg', 'sorriso', 97.21); pisca('qtMae', 98.2);
  plano(99.06, 'quartoTg', { x: 310, y: 1270, s: 2.0 }, 'voo', { dur: .6, ease: 'power2.inOut', deriva: .04 });
  TL.to('#qtBrilho', { opacity: .9, duration: .35, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 99.6);
  plano(100.2, 'relNoite', { x: 540, y: 1050, s: .95 }, 'freio', { k: 1.8, deriva: .07 });
  TL.fromTo('#rnRS', { attr: { transform: 'rotate(300 540 880)' } }, { attr: { transform: 'rotate(360 540 880)' }, duration: DUR - 100.25, ease: 'steps(10)', immediateRender: false }, 100.25);
  compila();
  TL.set({}, {}, DUR);
}
document.fonts.load('700 60px Fredoka').then(() => { monta(); window.pronto = true; renderAt(0); });
