# Guia de ritmo e som (vale para todos os próximos vídeos)

Criado depois do vídeo "O topo", comparando-o com os 50 vídeos longos do perfil @aprendendocomvitinho1.

## 1. O que foi medido

| | Vitinho (mediana de 50 vídeos) | O topo (1ª versão) | Meta dos próximos |
|---|---|---|---|
| Palavras por segundo | **3,65** (faixa de 3,3 a 4,0; top 8: 3,4 a 3,8) | 2,95 | **3,5 a 3,8** |
| Maior pausa entre frases | 0,48 s (quase nunca passa de 0,5 s) | 0,50 s, com 17 pausas acima de 0,3 s | **até 0,2 s** |
| Trocas de imagem por minuto | **17 a 29** (média de ~23 → uma a cada ~2,6 s) | 10 | **20 a 25** |
| Trilha de fundo | contínua do 1º ao último segundo | nenhuma | **sempre** |
| Efeitos sonoros | pontuais nas ações | nenhum | **em toda ação e em todo corte** |
| Começo e fim | fala desde 0,0 s e termina na última palavra | 1,8 s parado no fim | **voz em 0,0 s; fim 0,4 s após a última palavra** |

## 2. Regras novas

### Roteiro
- **Tamanho = duração × 3,65.** 60 s ≈ 220 palavras · 90 s ≈ 330 · 2 min ≈ 440.
- Frases curtas. **Não use "…" nem linha em branco entre frases** só para pausar: na ElevenLabs, isso vira silêncio.
- Escreva a narração em parágrafos corridos. Separe só quando a cena mudar.

### Voz (ElevenLabs)
- Velocidade **1,10 a 1,15** (no v3/v4, o controle "Speed"). Se a voz não aceitar essa velocidade, gere em 1,0 e deixe a ferramenta acelerar.
- Estabilidade "Natural" (mais expressiva = menos robótica em velocidade alta).
- Depois de gerar, **sempre passe pela ferramenta de apertar a voz** (o preparador do projeto já faz isso).

### Imagem (kit E se animado)
- **Uma troca de imagem a cada 2 a 3,5 s**, sempre começando no início de uma frase. O preparador gera `cortes_sugeridos.json` com esses tempos.
- Não é preciso um cenário novo por corte: dentro da mesma cena, troque de ângulo com **corte seco** (geral → close do rosto → detalhe do objeto → plano aberto) usando `ferramentas/kit-extras/cortes.js`.
- Câmera sempre se movendo dentro de cada plano (empurrar, recuar, deslizar).
- Nada de tela parada: o vídeo termina 0,4 s depois da última palavra.

### Som
- **Trilha contínua** do início ao fim, escolhida pelo clima de cada trecho (pode trocar no meio com transição de 1 s). Ela abaixa ~6 a 7 dB enquanto há fala.
- **Whoosh curto em todo corte de imagem** (automático no mixador).
- **Efeito em toda ação que aparece na tela** (veja a tabela abaixo) e **som ambiente** em cada lugar (rua, vento, cidade, chuva).
- Volume final: **-14 LUFS** (padrão de Reels, TikTok e Shorts), pico de -1,5 dB. O mixador já faz isso.

| Situação na tela/fala | Efeito (`audio/sfx/`) |
|---|---|
| Corte de cena | `whoosh_curto` (automático) |
| Mudança grande de lugar ou de tempo | `whoosh`, `swell` |
| Algo mágico aparece, sonho, luz | `sopro_magico`, `brilho` |
| Antes de uma revelação ou virada | `riser` (termina exatamente na revelação) |
| Revelação, número forte, choque | `impacto` |
| Celular tocando ou vibrando | `chamando`, `vibra`, `notificacao` |
| Coisa aparecendo, bolha, balão | `pop` |
| Paixão, nervoso, emoção | `coracao` |
| Tempo passando | `tic_tac`, `papel` (folhas de calendário) |
| Batida na porta | `toc`, `toc_toc_toc` |
| Momento triste ou frustração | `plim_triste` |
| "Anos depois", final, conquista | `sino`, `ding` |
| Andar, subir, ir embora | `passos` |
| Trabalho, computador | `teclado` |
| Ambientes (repetem enquanto durar a cena) | `amb_cidade_noite`, `amb_rua_dia`, `amb_vento`, `amb_chuva` |

| Clima do trecho | Trilha (`audio/trilhas/`) |
|---|---|
| Reflexivo, saudade, começo de história | `emocional_piano` |
| Sonho, conquista, esperança | `esperanca` |
| Mistério, perigo, virada | `tensao_misterio` |
| Perda, despedida, final triste | `melancolia` |

> As trilhas e os efeitos de `audio/` foram **gerados por síntese** aqui (livres de direitos) e servem bem para começar. Para um som mais rico, troque a trilha por uma de banco com o mesmo clima (ElevenLabs Music, YouTube Audio Library, Pixabay Music) e coloque o arquivo em `audio/trilhas/`. O mixador aceita qualquer `.wav` ou `.mp3`.

## 3. Passo a passo do próximo vídeo

1. **Roteiro** com o tamanho certo (seção 2).
2. **Voz** gerada na ElevenLabs (velocidade 1,10 a 1,15) e enviada aqui.
3. **Projeto preparado:**
   ```bash
   python3 ferramentas/novo_video.py <pasta_do_kit> <nome> <voz.mp3> <roteiro.txt> --vel 1.0
   ```
   (use `--vel 1.1` se a voz veio na velocidade 1,0). Ele mostra o ritmo final (palavras/s) e cria `cortes_sugeridos.json`.
4. **Cenas** escritas seguindo os cortes sugeridos (cenários reaproveitados + cortes secos de câmera).
5. **Revisão por folhas de quadros** (como no "O topo").
6. **Roteiro de som** (`som.json`): trilha por trecho, efeitos de cada ação, ambientes e a lista de cortes. Exemplo completo: `videos/o-topo/som.json`.
7. **Mixagem:**
   ```bash
   python3 ferramentas/mixar.py videos/<nome>/som.json
   ```
8. **Render em partes** (sem placa de vídeo, leva ~25 min por 30 s de vídeo), já com o áudio mixado:
   ```bash
   setsid nohup ferramentas/renderizar_partes.sh <pasta_do_kit> <nome> 30 <mix.wav> > render.log 2>&1 < /dev/null &
   ```

## 4. Ferramentas

| Arquivo | O que faz |
|---|---|
| `ferramentas/apertar_voz.py` | Corta o silêncio do começo e do fim, limita as pausas a 0,18 s e acelera sem mudar o tom |
| `ferramentas/novo_video.py` | Prepara o projeto do kit: voz apertada, GSAP local, render mais leve, alinhamento das palavras, cortes sugeridos |
| `ferramentas/alinhar.py` | Alinha o texto do roteiro às pausas da voz (substitui o whisper, que não funciona aqui) |
| `ferramentas/kit-extras/cortes.js` | Cortes secos de câmera dentro de uma cena |
| `ferramentas/gerar_sons.py` | Gera os 26 efeitos e as 4 trilhas de `audio/` |
| `ferramentas/mixar.py` | Mixa voz, trilha (abaixando na fala), efeitos, ambientes e whooshes nos cortes, e nivela em -14 LUFS |
| `ferramentas/renderizar_partes.sh` | Renderiza em partes de forma desanexada e junta com o áudio final |
