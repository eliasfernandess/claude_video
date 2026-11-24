# Instruções para os vídeos deste repositório

Este repositório produz vídeos verticais narrados (estilo "E se…") com o Kit "E se animado". Antes de qualquer vídeo novo, leia `GUIA-RITMO-E-SOM.md` e siga as regras dele. Resumo do que não pode faltar:

- **Ritmo de 3,5 a 3,8 palavras por segundo** (perfil de referência: 3,65). Roteiro = duração × 3,65 palavras. Sempre passe a voz por `ferramentas/apertar_voz.py` (o `ferramentas/novo_video.py` já faz isso) e confira o ritmo que ele imprime.
- **Sem silêncio:** pausas de até 0,2 s, voz começando em 0 s, fim 0,4 s depois da última palavra.
- **Cortes dinâmicos:** uma troca de imagem a cada 2 a 3,5 s, no início das frases (`cortes_sugeridos.json`). Reaproveite cenários e use cortes secos de câmera (`ferramentas/kit-extras/cortes.js`).
- **Som sempre:** trilha contínua pelo clima, efeito em toda ação, ambiente em cada lugar, whoosh em todo corte, mix em -14 LUFS (`ferramentas/mixar.py` + `som.json`; exemplo em `videos/o-topo/som.json`).
- **Ambiente da nuvem:** o whisper e o CDN do GSAP não funcionam aqui (o `novo_video.py` contorna os dois). Não há placa de vídeo: renderize em partes com `ferramentas/renderizar_partes.sh`, desanexado.
- Personagens recorrentes: protagonista loiro (visual do Tiaguin, fitinha do Bonfim) e personagem feminina morena de cabelo cacheado (visual da Lívia/Sofia), salvo pedido diferente.
- Fale com a pessoa em português simples.
