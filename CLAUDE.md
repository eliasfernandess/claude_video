# Instruções para os vídeos deste repositório

Este repositório produz vídeos verticais narrados (estilo "E se…") com o Kit "E se animado". **Há 3 estilos**, descritos em `ESTILOS.md`:
- Estilo 1: conto rápido, tipo Vitinho;
- Estilo 2: "E se" + física, tipo @rmhkaiser;
- Estilo 3: "E se" + jogo, tipo @toonscartoons00.

Pergunte qual estilo usar se a pessoa não disser. Ritmo, legenda, visual e som mudam de um estilo para outro: siga a tabela do `ESTILOS.md`.

As regras abaixo são as do **Estilo 1**. Antes de um vídeo nesse estilo, leia `GUIA-RITMO-E-SOM.md`. Resumo do que não pode faltar no Estilo 1:

- **Ritmo de 3,5 a 3,8 palavras por segundo** (perfil de referência: 3,65). Roteiro = duração × 3,65 palavras. Sempre passe a voz por `ferramentas/apertar_voz.py` (o `ferramentas/novo_video.py` já faz isso) e confira o ritmo que ele imprime.
- **Sem silêncio:** pausas de até 0,2 s, voz começando em 0 s, fim 0,4 s depois da última palavra.
- **Cortes dinâmicos:** uma troca de imagem a cada 2 a 3,5 s, no início das frases (`cortes_sugeridos.json`). Reaproveite cenários e use cortes secos de câmera (`ferramentas/kit-extras/cortes.js`).
- **Som discreto (pedido da pessoa):** trilha contínua pelo clima mas **baixa** (-24 dB, abaixando 9 dB na fala), **poucos efeitos** só nos momentos-chave (~1 a cada 6 s, -16 a -24 dB), whoosh só em troca de cenário (-25 dB), mix em -14 LUFS (`ferramentas/mixar.py` + `som.json`; exemplo calibrado em `videos/o-roteiro/som.json`). A narração tem que estar sempre na frente.
- **Ambiente da nuvem:** o whisper e o CDN do GSAP não funcionam aqui (o `novo_video.py` contorna os dois). Não há placa de vídeo: renderize em partes com `ferramentas/renderizar_partes.sh`, desanexado.
- Personagens recorrentes: protagonista loiro (visual do Tiaguin, fitinha do Bonfim) e personagem feminina morena de cabelo cacheado (visual da Lívia/Sofia), salvo pedido diferente.
- Fale com a pessoa em português simples.
