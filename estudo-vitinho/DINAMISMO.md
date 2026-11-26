# Estudo: dinamismo, transições e animação do @aprendendocomvitinho1

Medido quadro a quadro, a 30 qps, em 3 vídeos virais:
- "A cidade das trocas" (146 s);
- "O corredor" (142 s);
- "O motorista Valdir" (144 s).

A ferramenta é `ferramentas/analisar_transicoes.py <video.mp4>`. A imagem de referência é `frames/transicoes-quadro-a-quadro.jpg`: cada linha mostra 14 quadros seguidos (0,47 s).

## A descoberta principal

**Não é o número de cortes que dá a sensação de fluidez, é que a câmera nunca para e cada plano "chega" com um freio.**

| Medida | Cidade das trocas | O corredor | Motorista Valdir |
|---|---|---|---|
| Algo muda na tela a cada (mediana) | **0,83 s** | **0,80 s** | **0,72 s** |
| Desenho novo a cada | ~2 a 3 s | ~2 a 3 s | ~2 a 3 s |
| Planos com câmera se mexendo | 50 de 55 | 37 de 58 | 49 de 64 |
| Zoom lento dentro do plano | ~3 a 4% por segundo | ~0 a 2% | ~2% |
| Zoom rápido de transição (p90) | 12% por segundo | 9% por segundo | até 54% por segundo |

"Algo muda" quer dizer uma destas coisas:
- um corte;
- um zoom rápido;
- uma troca de pose ou expressão;
- um objeto que pula na tela;
- um número que aparece.

Ou seja: **desenho novo a cada 2 a 3 s, e dentro de cada desenho mais 2 ou 3 "batidas" de ~0,8 s.**

## Os 7 movimentos que ele usa

### 1. A "chegada com freio" (a assinatura do perfil)
O plano novo começa já em movimento, com um zoom forte que desacelera até quase parar.

Medição do zoom quadro a quadro no "Cidade das trocas", aos 21,9 s (close do dente → plano médio):

```
quadro:  1     2     3     4     5     6     7     8 ...
escala: 0,71  0,70  0,74  0,81  0,88  0,95  0,99  1,00 1,00
```

- Cerca de **3x de escala em 7 quadros (0,23 s)**.
- O 1º quadro já dá o maior salto, depois freia: curva **expo.out**.
- O zoom de entrada aos 31 s é igual: 1,34 → 1,45 → 1,21 → 1,11 → 1,06 → 1,03 → 1,01, ou **~2,6x em 8 quadros**.
- **Close e plano aberto são o MESMO desenho.** A câmera só "voa" de um para o outro, sem corte. Por isso parece contínuo.

### 2. Deriva lenta (Ken Burns), nunca parado
- Depois do freio, a câmera continua andando ~0,1% por quadro, cerca de **3% por segundo**.
- Na maioria das vezes é zoom-in. Às vezes é zoom-out ou pan lateral de 1,5 a 4% da tela por segundo.
- Quase nenhum plano fica parado.

### 3. Corte seco na palavra
- É a troca mais comum entre desenhos diferentes. Acontece em 1 quadro, **no começo da frase ou na palavra-chave**.
- Funciona porque o plano seguinte já entra com a "chegada com freio".

### 4. Chicote (whip) com borrão de movimento
- **1 a 3 quadros** com borrão direcional forte, horizontal ou vertical.
- A imagem que sai borra e escorrega, e a que entra aparece já nítida.
- Ele usa em ~5 a 10% das trocas, para "virar a página" de um assunto.

### 5. Fusão casada (match dissolve)
- **9 a 10 quadros (~0,33 s)** entre dois desenhos com **o mesmo enquadramento**.
- Exemplos: o ônibus 47 de noite que vira o ônibus 47 de dia, ou a mesma sala em outra época.
- Ele usa para passagem de tempo, sempre junto com zoom lento.

### 6. Pop-in girando
- Sobre um fundo de **raios girando** (roxo ou amarelo), o objeto nasce no centro **pequeno, girando e borrado**.
- Em ~8 quadros ele cresce até o tamanho final, com um leve "passa e volta".
- Exemplo: o catálogo da Casa das Trocas, aos 2,6 s.
- Ele usa para explicar uma regra ou um objeto importante.

### 7. Revelação por cor
- Durante um zoom de entrada, o personagem começa como **silhueta preta** e ganha cor em ~8 a 10 quadros. Exemplo: a mãe de sorriso branco, aos 31 s.
- No vídeo inteiro, cor e saturação contam a história: a multidão cinza com só um colorido, a tristeza azul-escura.

## Animação dentro do plano (o "boneco de recorte")

- **Troca de pose ou expressão é instantânea**, sem interpolar: o braço muda de posição, o olho fecha, a boca abre. É feita **na palavra**: "emburrada" → cara emburrada.
- Os detalhes vivem sozinhos:
  - pipoca caindo;
  - gotinha de suor;
  - brilhinho ✨;
  - lâmpada balançando;
  - multidão andando no lugar.
- Números e placas **pulam** na tela: "1" → "2" crescendo, relógio "3:12".
- Piscada de olho de vez em quando.
- A legenda é **karaokê**: 1 a 3 palavras, e a palavra falada acende em amarelo.

## Receita para o nosso Estilo 4

| Item | Valor |
|---|---|
| Desenho novo | a cada 2 a 3,5 s, no começo da frase (`cortes_sugeridos.json`) |
| Batida dentro do plano | a cada ~0,8 s: troca de pose ou expressão, objeto que pula, número, zoom de close |
| Chegada de cada plano | zoom de 1,3x a 3x → 1x em **0,23 s, expo.out** (ou deslocamento de 20 a 40% da tela) |
| Deriva | 3% por segundo, de zoom-in na maioria. Alterne de vez em quando com zoom-out ou pan. |
| Close ↔ aberto | mesmo desenho, câmera voando 0,25 s, **sem corte** |
| Troca entre desenhos | ~65% corte seco, ~20% chicote (2 a 3 quadros, borrão de 40 px, alternando a direção), ~10% fusão casada (0,33 s), ~5% pop-in em raios |
| Personagem | pose e expressão trocadas na palavra, piscada a cada 2 a 4 s, "respirar" leve, detalhes animados |
| Nunca | plano parado, fusão lenta (> 0,4 s), transição "de PowerPoint" (cubo, página virando) |

**Como fazer no kit:** é 2D em SVG dentro do HTML do hyperframes, com a câmera sendo um `<g>` animado pelo GSAP (`scale`/`x`/`y`, `expo.out`).
- Chicote: borrão direcional do SVG, `feGaussianBlur stdDeviation="40 0"`.
- Fusão: `opacity`.
- Pop-in: `scale` + `rotation` + borrão.
- Personagens: peças separadas (cabeça, olhos, boca, braços), com as poses trocadas por `visibility`.
