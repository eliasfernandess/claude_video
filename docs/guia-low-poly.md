# Guia de estudo: claude-animation-skills (foco em /low-poly)

Fonte: https://github.com/artemnovitckii/claude-animation-skills (MIT, v1.1.0)

## Visão geral do repositório

São 11 skills do Claude Code que geram animações verticais para Reels/Shorts (1080x1920, 30 fps) sem nenhuma filmagem.

| Tipo | Skills | Como funciona |
|---|---|---|
| Rápidas (spec JSON) | `low-poly`, `minecraft`, `kurzgesagt`, `dan-koe`, `graph`, `map-route`, `breakdown`, `minimalistic-graphics` | `spec.json` → `build.py` → preenche `template.html` → HyperFrames renderiza → `.mp4` + folha de contato |
| Motores completos | `stick-figure`, `zach-d-films` (`zach-3d-films` é um apelido) | Projeto inteiro: roteiro, voz (Kokoro), tempos das palavras (Parakeet), cenas em código, render com Playwright |

Peças compartilhadas em `kit/`:
- `anim.py`: preenche o template, renderiza com `npx hyperframes@0.8.34`, tira snapshots e monta a folha de contato com a área segura do Instagram marcada em vermelho (topo 220 px, base 1500 px, laterais 100 px).
- `setup.sh`: `npm install` (three 0.169.0, playwright 1.49.1), baixa o GSAP 3.12.5 do cdnjs e "aquece" o HyperFrames. Com `--voice`, baixa ~1 GB de modelos de voz.
- `fonts/`: Inter, Inter Tight, Poppins, JetBrains Mono, Pixelify Sans (todas OFL).

Requisitos: ffmpeg, Node 18+, Python 3.9+.

## /low-poly em detalhe

### O que o vídeo padrão mostra (4,8 s)
Uma plataforma de trem japonesa em estilo PS1. Um cachorro Akita creme está sentado esperando (a história do Hachiko). O trem freia, esconde o cachorro, vai embora, e ele continua lá, agora com neve (o tempo passou).

| Tempo | O que acontece |
|---|---|
| 0–1,2 s | o cachorro espera, orelhas em pé, rabo abanando |
| 0,3 s | aparece a legenda 1 |
| 1,15–2,67 s | o trem entra freando, quase para e acelera para longe |
| 2,6 s | troca para a legenda 2 |
| 2,62 s | neve aparece sobre o cachorro, pétalas viram flocos |
| 3,45–3,95 s | o cachorro vira a cabeça para olhar a plataforma |
| 2,35–4,8 s | a câmera se aproxima devagar |

### Spec
```json
{"lines": ["he waited every day", "for almost 10 years"], "sign": "SHIBUYA", "prev": "EBISU", "next": "HARAJUKU", "snow": true}
```
- `lines`: 1 ou 2 legendas, até ~26 caracteres cada (passa disso, pode quebrar). Minúsculas e sem ponto final.
- `sign`, `prev`, `next`: placa da estação em fonte bitmap 5x7. **Só A–Z, 0–9, espaço, ponto e hífen** (sem acentos: "SÃO PAULO" falha, use "SAO PAULO"). `sign` até 20 caracteres (até 10 sai grande), `prev`/`next` até 9.
- `snow`: `false` mantém a primavera.
- Opcionais: `hold` (segundos extras no final), `out` (caminho de saída), `template` (template customizado, relativo ao spec).

Comandos:
```bash
python3 skills/low-poly/build.py meu-video.lowpoly.json            # vídeo completo (~1,5 min)
python3 skills/low-poly/build.py meu-video.lowpoly.json --snap 3.0 # só um PNG no tempo 3,0 s
```
Saída: `meu-video.lowpoly.mp4` e `meu-video.lowpoly.sheet.jpg`.

### Como o visual PS1 é feito (o que precisa ser mantido em cenas novas)
1. **Resolução baixa**: o WebGL renderiza num canvas de 360x640, exibido em 1080x1920 com `image-rendering: pixelated` (3x, vizinho mais próximo).
2. **Vértices tremidos**: a função `ps1(material)` injeta no vertex shader um arredondamento da posição na tela para uma grade de 180x320, o que faz a geometria "tremer" como no PS1.
3. **Dithering de 15 bits**: no fragment shader, uma matriz Bayer 4x4 quantiza cada canal para 32 níveis.
4. **Materiais**: `MeshLambertMaterial` com `flatShading: true` (faces chapadas) via `lam({...})`, ou `basic({...})` para coisas que brilham.
5. **Texturas desenhadas em código**: `tex(w, h, draw)` cria um canvas de 16 a 64 px com filtro nearest. Helpers: `px()` pinta pixel, `noise()` dá variação de cor, `col(hex, k)` escurece ou clareia.
6. **Modelos simples**: caixas, cones, cilindros de 4 lados (`frustum`), toros com poucos segmentos.
7. **Luz e atmosfera**: luz hemisférica quente + uma direcional laranja + uma fria de preenchimento + point light; névoa marrom (`Fog 10–30`).
8. **Câmera**: lente grande-angular (52°) perto do assunto.
9. **Legenda**: `div` HTML sobre o canvas, Inter 700 50 px, amarelo `#fff21a`, contorno preto de 3 px feito com `text-shadow`, em `top: 1272px` (cerca de 2/3 da altura).

### Regras de engenharia do template
- Tudo é uma **função pura do tempo**: `renderAt(t)` posiciona câmera, trem, cachorro e partículas a partir de `t`. Nada de `requestAnimationFrame` nem de estado acumulado. O HyperFrames dispara o evento `hf-seek` com o tempo de cada quadro.
- Aleatoriedade com **semente fixa** (`rnd()`, mulberry32), para o render ser reproduzível.
- Movimentos em **forma fechada** (o trem usa equações de aceleração constante) e transições com `smooth(a, b, t)` (smoothstep).
- Placeholders: `__SPEC__` vira o JSON do spec e `__DURATION__` a duração. O `div#root` precisa de `data-composition-id`, `data-duration`, `data-fps`, `data-width`, `data-height`.

### Criando cenas novas
1. Copiar `template.html` para junto do spec (ex.: `minha-cena.html`) e pôr `"template": "minha-cena.html"` no spec.
2. Trocar os modelos e as texturas, mantendo os 9 pontos de estilo acima.
3. Atenção a detalhes do `build.py`:
   - A duração é fixa em 4,8 s. Para um vídeo mais longo, use `hold` (ex.: `"hold": 10.2` gera 15 s) ou escreva um `build.py` próprio com `anim.build(..., duration=lambda s: X)`.
   - `lines`, `sign`, `prev` e `next` continuam sendo validados mesmo com template customizado.
   - Campos extras do spec geram só um aviso ("ignoring unknown spec fields") mas **chegam ao template** dentro de `SPEC`, então dá para criar parâmetros novos.

### Limitações
- As skills rápidas geram vídeo **sem áudio**. Música, narração e efeitos entram depois via ffmpeg (ou com as ferramentas de voz do `stick-figure`).
- A fonte da placa não tem acentos. Nas legendas, a fonte Inter deve cobrir á, ã, ç etc., mas vale confirmar com um `--snap`.
- Uma única cena por template. Vídeos com vários planos exigem escrever a lógica de cortes dentro do `renderAt(t)`.

### Gosto
- Histórias verdadeiras, levemente tristes ou estranhas: animais, história, fatos curiosos. Confira os fatos.
- O nome vem do estilo dos vídeos "low poly shorts", sem vínculo com nenhum canal.
