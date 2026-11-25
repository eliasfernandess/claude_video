# Os 3 estilos de vídeo do repositório

Antes de começar um vídeo, escolha o estilo. Se a pessoa não disser qual, pergunte.

![Comparação](estilos/comparacao-estilos.png)

| | **Estilo 1: Conto rápido** | **Estilo 2: "E se" + física** | **Estilo 3: "E se" + jogo** |
|---|---|---|---|
| Inspiração | @aprendendocomvitinho1 | @rmhkaiser | @toonscartoons00 |
| Vídeos nossos | O topo, O roteiro, Nesta cidade todo mundo é cego | Ímã humano | (nenhum ainda) |
| Estudo | `estudo-vitinho/README.md` + `GUIA-RITMO-E-SOM.md` | `ESTUDO-RMHKAISER.md` | `ESTUDO-TOONSCARTOONS.md` |
| Gancho | "Nesta cidade…", conto emocional | "E se você…?" + personagem com nome | "E se você acordasse dentro do jogo…?" + personagem gamer |
| História | Fantasia com lição de vida, emoção | Superpoder com consequência física explicada | Regra de jogo contra a vida real: "No jogo… Aqui…" |
| Duração | 1:30 a 2:00 | ~1:30 | ~1:50 |
| Palavras por segundo | **3,5 a 3,8** (3,65) | **~2,9** | **~2,7** |
| Roteiro | duração × 3,65 | duração × 2,9 (90 s ≈ 260) | duração × 2,7 (110 s ≈ 300) |
| Voz (ElevenLabs) | velocidade 1,10 a 1,15 | velocidade 1,0 | velocidade 1,0 |
| `novo_video.py` | padrão (`--pausa 0.18`) | `--vel 1.0 --pausa 0.35` | `--vel 1.0 --pausa 0.45` |
| Pausas | até 0,2 s | até 0,35 s | até 0,45 s, antes das viradas |
| Troca de imagem | a cada 2 a 3,5 s | a cada ~2,2 s | a cada ~2,5 s, com muitos closes |
| Personagens | Cabeça preta lisa (Tiaguin loiro, morena cacheada) | Rosto de pele com expressões (`kit-extras/estilo-b/char.js`) | Rosto de pele + roupa de aventureiro de RPG |
| Luz e cor | Clara, dia, cores do kit | Clara, granulado leve, vinheta | **Escura e de cinema:** fim de tarde roxo, masmorra, tocha, luz estourada |
| Legenda | Frase normal, pequena, embaixo do meio, palavra-chave amarela | CAIXA ALTA grossa (Oswald), 3 palavras, amarelo e vermelho | CAIXA ALTA semicondensada (tipo DIN), menor, amarelo |
| Informação na tela | Pouca | Cards brancos com etiqueta vermelha, "PÁ!", diagramas em papel bege | **HUD de jogo:** painel escuro, nível, barra de vida, dano "-1", "+100", "NÍVEL 2", cronômetro |
| Trilha | -24 dB, abaixa 9 na fala | -21 dB, abaixa 6 na fala | -21 dB, abaixa 6 na fala |
| Efeitos | Poucos, ~1 a cada 6 s | Nas ações fortes, ~1 a cada 4 s, junto com "PÁ!" | Sons de jogo (nível, dano, menu, moeda) junto com o HUD |
| Final | Fechado, emocional | Fechado + pergunta para quem assiste | Fechado + pergunta. Se virar série, cada parte tem que funcionar sozinha. |
| Exemplo de som | `videos/o-roteiro/som.json` | `videos/ima-humano/som.json` | — |

## Estilo 1: Conto rápido
- Regras completas em `GUIA-RITMO-E-SOM.md`. É o padrão das instruções em `CLAUDE.md`.
- Usa o kit sem mudanças, com `ferramentas/kit-extras/cortes.js` para os cortes secos.

## Estilo 2: "E se" + física
- Peças em `ferramentas/kit-extras/estilo-b/` (veja o `LEIA.md` de lá):
  - rosto de pele;
  - granulado;
  - legenda `"estilo": "rmh"` com `card`, `quadrinho` e `numero`;
  - fonte Oswald.
- Projeto de exemplo: `videos/ima-humano/`.

## Estilo 3: "E se" + jogo
Ainda não existe no kit. Para o primeiro vídeo, é preciso criar:
1. **HUD de jogo** (novos tipos no `legendas.mjs`):
   - `hud`: painel escuro com rótulo pequeno e número grande que pode contar;
   - `tag`: nome + "Nv." + corações em cima do personagem;
   - `vida`: barra que cai;
   - `dano`: número flutuante, vermelho ou verde;
   - `nivel`: "NÍVEL 2" com explosão dourada;
   - `item`: cartão de item com raridade;
   - `menu`: lista de opções com "INDISPONÍVEL";
   - `timer`: cronômetro fixo.
2. **Fonte semicondensada** (Barlow Semi Condensed, licença livre) e legenda no `"estilo": "jogo"`.
3. **Cenários de RPG:**
   - vila medieval ao entardecer;
   - masmorra com tochas;
   - porta com luz forte;
   - céu noturno;
   - fundo de raios para as explicações.
4. **Roupa de aventureiro** para o Tiaguin (túnica, cintos, bolsa, botas), aproveitando o rosto de pele do Estilo 2.
5. **Efeitos de "visão":** filtro escuro, grade neon e borda vermelha de dano, usando `tint`/`sat`/`vig` no `update`.
6. **Sons de jogo** gerados com `ferramentas/gerar_sons.py`: nível, dano, menu, moeda.
