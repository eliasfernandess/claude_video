# 08 — "Nessa cidade, todo mundo vive dentro de um jogo" (Estilo 3 com o ritmo do Estilo 1)

- **Duração:** ~1:52. São 411 palavras a ~3,65 palavras por segundo.
- **Mistura pedida:**
  - **visual do Estilo 3:** HUD de jogo, luz de cinema, rosto de pele, legenda em CAIXA ALTA semicondensada;
  - **fala do Estilo 1:** rápida e sem pausas longas.
- **Voz (ElevenLabs):**
  - velocidade **1,10 a 1,15** e estabilidade "Natural";
  - o texto para colar está em `08-cidade-do-jogo-elevenlabs.txt`;
  - no kit: `novo_video.py ... --pausa 0.2` (padrão do Estilo 1).
- **O jogo:** "Sobreviva". É um nome inventado: arena, zona que fecha e "vence o último de pé", sem nada do filme.
- **Personagens:**
  - **Tiaguin:** loiro, fitinha do Bonfim, rosto de pele (Estilo 2/3), moletom vermelho na cidade e roupa de arena na temporada;
  - **dona Cida:** a senhora do vídeo do ímã;
  - **Nina:** adversária na arena, do bairro vizinho.
- **Final fechado** + pergunta para quem assiste.

## Como a cidade funciona (para manter a lógica nas cenas)

- **Barra de vida e nível:** todo mundo nasce nível 1, com barra de vida e nível em cima da cabeça. Todos veem os de todos.
- **Pontos:** são o dinheiro. Pão e luz custam pontos.
- **Missões:** os pontos só vêm de missões, que são trabalhos do dia a dia.
- **Temporada:** uma vez por ano, os **24 com menos pontos** vão para a arena.
- **Prêmio:** vence o último de pé, e o bairro do vencedor ganha comida o ano todo.
- **Sem renascer:** quem zera a vida sai do placar da praça para sempre. Não tem volta para o nível 1.

## Cenas

| # | Fala (começo) | Imagem | HUD / texto na tela | Som (jogo) |
|---|---|---|---|---|
| 1 | "E se você morasse numa cidade onde todo mundo vive dentro de um jogo?" | Cidade ao entardecer vista de cima. Cada pessoa com uma barrinha flutuando. | Gancho escrito no topo no 1º segundo | trilha começa |
| 2 | "Nessa cidade, o jogo se chama Sobreviva." | Telão gigante na praça com o logo "SOBREVIVA". | **SOBREVIVA** | plim de título |
| 3 | "Todo mundo nasce nível um, com uma barra de vida…" | Maternidade: bebê com "Nv. 1" e barra cheia em cima do berço. | tag **BEBÊ Nv. 1** ♥♥♥ | blip |
| 4 | "Pão custa pontos. Luz custa pontos." | Padaria: placa "PÃO: 5 PTS". A lâmpada de uma casa apaga. | **-5** vermelho · **SALDO 12** | moedinha · clique |
| 5 | "E ponto só se ganha cumprindo missão…" | Montagem rápida: Tiaguin varre, entrega gás e carrega caixa. | **MISSÃO ✓ +3**, **+5**, **+2** | 3 moedinhas |
| 6 | "Ninguém esconde nada: o nível e a vida…" | Rua cheia, close nas tags de vários moradores. | várias tags "Nv." | — |
| 7 | "Uma vez por ano começa a temporada." | Calendário/telão vira "TEMPORADA 101". Luz da praça fica vermelha. | **TEMPORADA 101** | riser curto |
| 8 | "Os vinte e quatro jogadores com menos pontos vão pra arena." | Ranking no telão rolando até os últimos 24, que piscam em vermelho. | **RANKING · 24 ÚLTIMOS** | alarme baixo |
| 9 | "Vence o último de pé, e o bairro dele come de graça…" | Painel de regras no telão. | **REGRA: VENCE O ÚLTIMO DE PÉ** (volta no final) | — |
| 10 | "E aqui não tem renascer…" | Placar de pedra da praça: um nome some, letra por letra. | **SEM RENASCER** em vermelho | sopro grave |
| 11 | "O Tiaguin tinha pontos pra ficar de fora." | Tiaguin com o saldo alto. | **TIAGUIN Nv. 3 · 48 PTS** | — |
| 12 | "Só que ele dava metade pra dona Cida…" | Ele passa pontos para a dona Cida, que está cansada. | **-24** dele / **+24** dela | moedinha |
| 13 | "Caiu pro penúltimo lugar. Foi pra arena." | Ranking: o nome dele em 23º, piscando. Corte para ele entrando num portão de luz. | **23º** | whoosh (troca de cenário) |
| 14 | "Lá dentro, todo mundo correu pro baú dourado…" | Arena (floresta e morro). 23 pessoas correndo para o baú no centro. Plano alto. | contador **JOGADORES 24** | passos rápidos |
| 15 | "O Tiaguin correu pro lado contrário." | Ele sozinho, correndo para o outro lado (câmera baixa). | — | — |
| 16 | "No jogo de celular, primeiro você pega a arma. Aqui vale outra regra…" | Fundo de raios: 3 ícones aparecem um por um (ar, água, comida). | **3 MIN · 3 DIAS · 3 SEMANAS** | pop pop pop |
| 17 | "Água vem antes de espada." | Cartão de item: espada riscada, garrafa d'água brilhando. | **ITEM COMUM · ÁGUA · ESSENCIAL** | brilho |
| 18 | "E água sempre desce pro lugar mais baixo." | Diagrama no morro: seta descendo até o vale. | seta + **↓** | — |
| 19 | "Ele foi descendo o morro até achar um riacho." | Tiaguin bebendo no riacho. A barra de vida sobe. | **+15** verde | água |
| 20 | "Os outros atravessaram o rio a nado…" | Jogadores nadando no rio escuro e frio. | — | splash |
| 21 | "Na água, o corpo perde calor vinte e cinco vezes mais rápido…" | Fundo de raios: termômetro "AR" e "ÁGUA" caindo em velocidades diferentes. | **× 25** em amarelo | — |
| 22 | "De noite, eles acenderam fogueira." | Noite na arena, várias fogueiras acendendo. | — | fogo |
| 23 | "No jogo, fogo só ilumina. Aqui, uma chama do tamanho de uma vela…" | Vista de longe: um pontinho de luz na mata escura, com régua de distância. | **2 km** | — |
| 24 | "Cada fogueira gritava: eu tô aqui." | Plano alto: fogueiras como alvos, com mira de jogo em cada uma. | mira HUD | blip de alvo |
| 25 | "O Tiaguin dormiu no escuro, seco." | Ele encolhido entre pedras no escuro. Só os olhos aparecem ("filtro escuro"). | — | grilos baixo |
| 26 | "No terceiro dia, a zona começou a fechar…" | Muro de luz azul apertando o mapa (minimapa encolhendo). | **DIA 3** · minimapa | zumbido da zona |
| 27 | "Sobraram dois: o Tiaguin e a Nina…" | Clareira: os dois frente a frente, Nina com um galho. | **JOGADORES 2** · tags das duas | impacto |
| 28 | "Vida dela: dez por cento. Dele: doze." | Barras de vida quase vazias, piscando. | **10%** · **12%** vermelhos | batimento |
| 29 | "Ela levantou o galho. Ele olhou o placar no céu." | Galho sobe (câmera lenta). Ele olha para cima. | — | — |
| 30 | "Vence o último de pé. De pé." | Placar no céu, zoom em "DE PÉ" brilhando em amarelo. | **VENCE O ÚLTIMO DE PÉ** | riser |
| 31 | "Então ele fez a jogada que ninguém tentou em cem anos. Sentou." | Ele senta no chão, tranquilo. | — | pausa da trilha (corte seco) |
| 32 | "A Nina entendeu e sentou também." | Ela solta o galho e senta, costas com costas. | — | — |
| 33 | "Jogadores de pé: zero. O placar travou. A zona parou." | O placar pisca **0**, a imagem trava (glitch) e o muro de luz para. | **JOGADORES DE PÉ: 0** | glitch |
| 34 | "E no céu apareceu uma palavra… erro." | Céu inteiro com **ERRO** em vermelho, com falha de imagem. | **ERRO** | erro de sistema |
| 35 | "Na praça, quem assistia no telão fez a mesma coisa. Sentou." | Praça lotada: as pessoas sentam em ondas, a dona Cida primeiro. | — | swell |
| 36 | "Desde aquele dia, o Sobreviva tá pausado." | Telão com o símbolo de pause gigante. As barras de vida flutuam paradas. | **⏸ PAUSADO** | sino |
| 37 | "E você, sentava ou lutava?" | Close final no Tiaguin sentado, olhando para a câmera. | — | — |

## Som
- Ritmo do Estilo 1, trilha como no Estilo 3 (~-21 dB, abaixando 6 na fala). A trilha fica tensa na arena e esperançosa no final.
- Efeitos de jogo curtos e baixos, junto com o HUD: moedinha, blip, plim de nível, glitch e erro.
- O silêncio da trilha **só** dura um instante no "Sentou." (cena 31), para marcar a virada.
- Volume final: -14 LUFS.
