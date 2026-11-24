# O topo: projeto do vídeo (Kit "E se animado" 1.2.0)

Código das cenas do vídeo, feito com o motor 3D do kit.

- `src/cenas.js`: a lista dos 18 planos, com os tempos alinhados à voz.
- `src/cenas-a.js` e `src/cenas-b.js`: as cenas.
- `src/pecas.js`: peças reaproveitadas (escadas, laje, Lisboa, bolhas de sonho, personagens).
- `ui.json`: legendas em destaque e placas ("3 SEMANAS", "ANOS DEPOIS", "LISBOA").
- `assets/audio/transcript.json` e `PALAVRAS.txt`: o tempo de cada palavra da narração.
- `alinhar.py`: como os tempos foram calculados. A transcrição automática do kit (whisper) não estava disponível, então o texto do roteiro foi alinhado às pausas da voz.

Para reconstruir: copie `src/` e os arquivos acima para `meus-videos/o-topo/` dentro do kit (com o áudio em `assets/audio/voz.wav`) e rode `node tools/renderizar.mjs o-topo`.
