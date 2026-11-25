# Estilo B (inspirado no estudo do @rmhkaiser)

Peças usadas no vídeo `videos/ima-humano`. Para usar num projeto novo do kit:

| Arquivo | Para onde copiar | O que faz |
|---|---|---|
| `char.js` | `meus-videos/<nome>/src/motor/char.js` | Personagem com rosto de pele: `makeChar({ skin, sobr, calca, tenis, ... })` e `p.expr('neutro'|'susto'|'feliz'|'sorriso'|'esperto'|'bravo'|'triste'|'dor'|'pensando'|'dormindo'|'ideia'|'sem_graca')`. Sem `skin`, continua igual ao kit original. |
| `core.js` | `meus-videos/<nome>/src/motor/core.js` | Aceita `grain` no retorno do `update` (granulado). |
| `legendas.mjs` | `tools/legendas.mjs` do kit | Com `"estilo": "rmh"` no `ui.json`: legenda em CAIXA ALTA (Oswald), `"ruins"` em vermelho, e os elementos `card` (etiqueta vermelha), `quadrinho` ("PÁ!") e `numero` ("12 t"). Sem `estilo`, nada muda. |
| `oswald-700.woff2` | `meus-videos/<nome>/assets/fonts/` | Fonte condensada (licença livre SIL OFL). Declare em `compositions/film.html` e carregue em `src/main.js`. |

Ritmo do estilo B: voz a 1,0x (~2,9 palavras/s), `novo_video.py --vel 1.0 --pausa 0.35`. Som: trilha a -21 dB abaixando 6 na fala, efeito em cada ação forte (~1 a cada 4 s). Exemplo: `videos/ima-humano/som.json`.
