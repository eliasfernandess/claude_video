# Estilo 3: "E se" + jogo (inspirado no @toonscartoons00)

Peças usadas no vídeo `videos/cidade-do-jogo`. Para usar num projeto novo do kit:

| Arquivo | Para onde copiar | O que faz |
|---|---|---|
| `legendas.mjs` | `tools/legendas.mjs` do kit | Com `"estilo": "jogo"` no `ui.json`: legenda em CAIXA ALTA semicondensada (Barlow), amarelo nos `destaques` e vermelho nos `ruins`. Elementos novos (veja abaixo). Também mantém o `"estilo": "rmh"` do Estilo 2. |
| `barlow-600/700/800.woff2` | `meus-videos/<nome>/assets/fonts/` | Fonte (licença livre SIL OFL). Declare em `compositions/film.html` e carregue em `src/main.js` (`"700 40px Barlow"` etc.). |
| `../estilo-b/char.js` e `core.js` | `src/motor/` | Rosto de pele com expressões e granulado (os mesmos do Estilo 2). |

Peças 3D de exemplo (cidade ao entardecer, telão, etiqueta de jogo em cima da cabeça, arena low-poly, baú, fogueira, mira, zona de luz, placar no céu, fundo de raios) estão em `videos/cidade-do-jogo/src/pecas.js`.

## Elementos de HUD no `ui.json`

| `tipo` | Campos | Uso |
|---|---|---|
| `hud` | `rotulo`, `valor` ou `de`/`ate` (conta), `sufixo`, `prefixo`, `sub`, `cor`, `borda`, `tamanho`, `pulsa`, `topo` | Painel escuro: "JOGADORES 24", "SALDO 48 PTS", "× 25" |
| `vida` | `rotulo`, `de`, `ate` (0–100), `cor`, `pisca`, `topo` | Barra de vida segmentada que cai ou sobe |
| `dano` | `texto` ("-5" vermelho, "+3" verde), `topo`, `esquerda`, `largura` | Número que sobe e some |
| `titulo` | `texto`, `rotulo`, `sub`, `variante: "erro"`, `tamanho` | Título dourado com raios girando (ou vermelho com falha de imagem) |
| `aviso` | `texto`, `fundo`, `topo` | Etiqueta colorida: "SEM RENASCER" |
| `gancho` | `texto` (com `*trecho*` em amarelo), `topo` | Pergunta do gancho escrita no topo |

Sons de jogo: `python3 ferramentas/sons_jogo.py` (moeda, blip, nível, dano, menu, glitch, erro, zona, alvo, fogo, splash, batimento). Exemplo de som: `videos/cidade-do-jogo/som.json`.

Dica: a câmera que vê um personagem de costas mostra a "borda de luz" branca. Para ver alguém de costas, esconda essas bordas: `p.root.traverse(m => { if (m.isMesh && m.parent && m.parent.isMesh) m.visible = false; })`.
