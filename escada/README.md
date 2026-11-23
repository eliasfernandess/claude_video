# A escada: vídeo low-poly

Vídeo vertical (1080x1920, 30 fps, ~4min21s) da história do Namiques e da Lívia, no estilo da skill
[`/low-poly`](https://github.com/artemnovitckii/claude-animation-skills/tree/main/skills/low-poly)
(PS1/N64: render interno de 360x640 ampliado 3x, vértices "tremidos", dithering de 15 bits, texturas de pixel
desenhadas em código e legendas amarelas pequenas com contorno preto).

## Gerar

Requisitos: Node 18+, Python 3 com numpy, ffmpeg e Chromium do Playwright.

```bash
bash make.sh
```

Saída: `out/a-escada.mp4` e `out/a-escada.sheet.jpg` (folha de contato com a área segura do Instagram em vermelho).

Para conferir quadros sem renderizar tudo:

```bash
node tools/render.mjs --allshots 0.5 --dir out/snaps
```

```bash
node tools/render.mjs --snap 12.5,80 --dir out/snaps
```

## Arquivos

| Arquivo | O que é |
|---|---|
| `audio/narracao.mp3` | voz do Namiques (ElevenLabs) |
| `roteiro/timeline.json` | legendas, pausas inseridas e efeitos sonoros, no tempo original da narração |
| `tools/build_audio.py` | insere as pausas, sintetiza os efeitos em código (vento, rangidos, passos, toc-toc, teclado, chuva, piano…), mixa e gera `web/timeline.js` |
| `web/engine.js` | motor low-poly: shader PS1, texturas, cenários (bairro, escadas, nuvens, escola, rodoviária, salão, cozinha…) e personagens |
| `web/shots.js` | os 41 planos do documento de direção de arte, com câmera e atuação sincronizadas com a voz |
| `tools/render.mjs` | renderiza no Chromium headless e entrega os quadros ao ffmpeg |

## Observações sobre o áudio

- O MP3 da ElevenLabs não tem as pausas ⏸ do roteiro; elas são inseridas na edição (`inserts` na timeline).
- A ElevenLabs não leu três falas: *"cinco, seis, sete, oito"*, *"Ela dizia que piano na cozinha era uma ideia horrível"* e
  *"e disse: 'Ainda bem que não ficou na cozinha.'"*. A contagem e a fala da Lívia aparecem como texto na tela, dentro de pausas.
  A frase do piano horrível ficou de fora.
- Os tempos das frases foram medidos com Whisper (sherpa-onnx).
