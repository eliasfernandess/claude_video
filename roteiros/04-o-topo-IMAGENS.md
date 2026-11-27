# O TOPO: personagens e cenas para gerar as imagens

Roteiro em segunda pessoa ("você"), no estilo da skill **"E se animado"** (Kit 1.2.0): bonequinho 2D recortado dentro de cenário 3D com luz de cinema.
A narração está em `04-o-topo-elevenlabs.txt`. São **362 palavras, cerca de 2:10 a 2:20**, divididas aqui em **23 planos** de 5 a 6 segundos.

> **Personagens:** o protagonista "você" usa o **visual do Tiaguin** (loiro, fitinha do Bonfim) e a **Sofia** usa o **visual da Lívia** (cabelo cacheado castanho-escuro, xuxinha amarela). Só mudou o nome dela.

---

## 1. Resumo do estilo (da skill)

- **Cenário 3D** com cara de maquete de brinquedo, **sem contorno**, cores saturadas e suaves, **muitos detalhes** (cena vazia é o erro mais comum).
- **Luz de cinema:** uma luz principal com sombra, luz de preenchimento colorida, janelas e telas brilhando, **feixes diagonais**, contraluz.
- **Profundidade:** fundo em bokeh e **um objeto desfocado bem na frente da câmera** em quase todo plano.
- **Personagens 2D:** cabeça redonda **escura e brilhante** com reflexo azulado, **olhos brancos que atuam** (arcos, corações, lágrimas, traços), sem boca e sem nariz, braços finos e pretos, roupas detalhadas, **borda de luz** e **sombra no chão**. Só o protagonista tem halo.
- **Câmera:** planos longos, sempre se movendo devagar; revelação por recuo.
- **Texto na tela:** legendas de até 3 palavras com destaque dourado; placa escura com número dourado; etiqueta curta no canto. **Nada de frase irônica escrita.**

**Checklist de cada imagem:** tem feixe de luz? Algo desfocado na frente? Fundo em bokeh? Sombra no chão e borda de luz? Detalhes suficientes?

### Bloco de estilo (cole no lugar de `[ESTILO]`)
```
stylized 3D diorama scene with toy-like simple geometry and painted textures, no outlines on the environment, soft saturated colors, cinematic lighting with one key light casting shadows and a colored fill light, glowing practical lights with soft bloom, diagonal volumetric light beams, strong depth of field with bokeh background and a blurred object in the extreme foreground, light haze, rich environmental details; flat 2D cut-out cartoon characters placed inside the 3D world: big round glossy near-black heads with a bluish highlight, expressive white oval eyes, no mouth, no nose, thin black limbs, dark gloves, detailed clothing, thin bright rim light around the silhouette, contact shadow and long cast shadow on the ground; vertical 9:16 composition, film still
```

### O mundo das escadas
As escadas são **de madeira, com corrimão verde descascado**, e saem das **lajes de um bairro brasileiro** (caixas d'água azuis, varais, antenas). Elas sobem pelo céu, flutuando. **Cada degrau novo se forma de uma poeira dourada.** A escada da Sofia é igual, com o **corrimão rosa**.
```
ESCADA: an old wooden staircase with a peeling green handrail floating in the sky, rising from a Brazilian rooftop with blue water tanks, clotheslines and antennas, a new step forming from swirling golden dust
```

---

## 2. Personagens

> No estilo do kit **todas as cabeças são escuras**: quem identifica cada um é o cabelo, a roupa e os acessórios. Se quiser a pele aparecendo, troque `big round glossy near-black head` por `big round head with fair peach skin` (você) ou `big round head with warm tan brown skin` (Sofia).

### VOCÊ (protagonista, visual do Tiaguin)
| | Jovem (planos 3–16) | Anos depois (planos 1, 17–23) |
|---|---|---|
| **Cabelo** | **loiro dourado**, bagunçado, mechas caindo na testa | loiro mais escuro, curto, penteado; **barba loira** curta |
| **Roupa** | camiseta branca, **camisa xadrez vermelha aberta**, jeans, tênis, mochila | **casaco azul-marinho** de lã, camisa clara, calça escura, mala de viagem |
| **Marca** | **fitinha do Senhor do Bonfim amarela** no pulso | a mesma fitinha, **desbotada** |
| **Luz** | halo suave (é o protagonista) | igual |

```
VOCE young: flat 2D cut-out cartoon young man, big round glossy near-black head with a bluish highlight, expressive white oval eyes, no mouth, messy golden blond hair as a separate shape with shine streaks falling over the forehead, white t-shirt under an open red plaid overshirt, jeans, sneakers, backpack, thin black limbs, dark gloves, yellow Bonfim ribbon on his thin wrist, bright rim light and soft halo
```
```
VOCE older: same cartoon man years later, short darker blond hair neatly combed, short blond beard shape, navy wool coat over a light shirt, dark trousers, faded almost-white Bonfim ribbon on his wrist, bright rim light and soft halo
```

### SOFIA (visual da Lívia, sem falas)
| | Jovem (planos 7–16) | Anos depois (planos 18–20) |
|---|---|---|
| **Cabelo** | **cacheado, castanho-escuro, bem volumoso**, preso no alto com **xuxinha amarela** e cachos soltos na testa | cachos **soltos** até o meio das costas |
| **Rosto** | olhos brancos com **cílios**, **blush rosado** | igual |
| **Roupa** | camiseta branca, cardigã mostarda, saia jeans, tênis, **crachá de trabalho** no pescoço, mochila com um **livro grosso** (trabalha de dia, estuda à noite) | **sobretudo cor de camelo**, lenço estampado no pescoço, brincos dourados pequenos, bolsa de viagem |

```
SOFIA young: flat 2D cut-out cartoon young woman, big round glossy near-black head with a bluish highlight, expressive white oval eyes with eyelashes, rosy blush, no mouth, very voluminous dark brown curly hair made of overlapping glossy curl circles tied up high with a yellow scrunchie and loose curls on the forehead, white t-shirt, mustard cardigan, denim skirt, sneakers, a work ID badge on a lanyard, backpack with a thick book, thin black limbs, dark gloves, rim light
```
```
SOFIA older: same cartoon woman years later, long loose voluminous dark brown curls to mid-back, camel trench coat, patterned neck scarf, small gold earrings, travel bag, rim light
```

### Folhas de personagem (gerar primeiro e usar como referência)
```
[ESTILO] character turnaround sheet, front, three-quarter and back views, plain soft grey studio background, [PERSONAGEM]
```

### Objetos que se repetem (gerar sozinhos e usar como referência)
- **O celular do protagonista:** capinha vermelha, com um adesivo pequeno de escada.
- **A escada** (bloco acima).
- **O bondinho amarelo de Lisboa:** aparece no sonho (plano 9) e de verdade em Lisboa (planos 18 a 23).

---

## 3. Planos

> Cole o **bloco de estilo** no lugar de `[ESTILO]` e troque `VOCE young`, `VOCE older`, `SOFIA young`, `SOFIA older` e `ESCADA` pelos prompts acima.
> **Frente desfocada** = objeto borrado bem na frente da câmera. **Texto na tela** vai no editor.

---

### PLANO 01: Ninguém do outro lado (~7 s)
**Fala:** *"No dia em que você realizar seu maior sonho, vai pegar o celular pra contar pra alguém. E não vai ter ninguém do outro lado."*

- **Cena:** noite. **O topo da escada**, alto acima de uma cidade iluminada. No último degrau há uma plataforma com tudo o que ele queria: uma poltrona de couro, uma janela enorme, a cidade brilhando lá embaixo. VOCÊ (mais velho) está sentado com o celular na mão; a tela mostra **"Chamando…"** e depois a ligação cai. Ao lado dele, **um espaço vazio** no degrau.
- **Luz:** azul-noite com o âmbar das janelas da cidade; a tela do celular ilumina o rosto; contraluz da lua.
- **Câmera:** começa no close do celular e recua devagar até mostrar como ele está alto e sozinho.
- **Frente desfocada:** a borda do corrimão.

```
[ESTILO] night, the very top of a floating wooden staircase high above a glowing city, a small landing with a leather armchair and a huge window frame, VOCE older sitting alone holding a red phone whose screen reads "Chamando...", an empty space beside him on the step, night blue light with amber city windows below, the phone lighting his face, moon backlight, blurred handrail in the extreme foreground
```

---

### PLANO 02: Deixa eu te mostrar (~4 s)
**Fala:** *"Deixa eu te mostrar como isso acontece."*

- **Cena:** a câmera **despenca de costas** pela escada, de cima para baixo, passando por degraus, nuvens e luzes, como quem volta no tempo, até chegar a uma laje do bairro de manhã cedo.
- **Luz:** a noite vira amanhecer laranja durante a queda.
- **Câmera:** travessia rápida para baixo (o único movimento rápido do vídeo).
- **Texto na tela:** etiqueta no canto **"ANOS ANTES"**.

```
[ESTILO] view looking down a long floating wooden staircase that spirals from the night sky down through clouds to a Brazilian neighborhood rooftop at sunrise, motion streaks, colors shifting from night blue at the top to warm orange dawn at the bottom
```

---

### PLANO 03: A escada (~6 s)
**Fala:** *"Imagina uma escada que leva até tudo o que você sempre quis. Liberdade. Dinheiro. Nunca mais depender de ninguém."*

- **Cena:** VOCÊ (jovem) na laje, de manhã, olhando para cima. A **ESCADA** sai da laje e sobe até uma **luz dourada** no céu. Lá em cima, como miragem: **uma porta aberta** (liberdade), **pilhas de notas e moedas brilhando** (dinheiro), **uma chave de casa** (nunca mais depender de ninguém).
- **Detalhes da laje:** caixa d'água azul, varal com roupas, antena, cadeira de praia, vaso de planta, gato.
- **Luz:** sol nascendo, feixes diagonais; a luz dourada pulsando no topo.
- **Câmera:** começa nos pés dele e sobe seguindo a escada até a miragem.
- **Frente desfocada:** roupa pendurada no varal.

```
[ESTILO] early morning on a Brazilian rooftop with a blue water tank, clothesline with hanging clothes, antenna, beach chair, potted plant and a cat, VOCE young looking up at ESCADA rising into a pulsing golden light, in the light a mirage of an open door, glowing stacks of money and a floating house key, sunrise light beams, blurred hanging shirt in the extreme foreground
```

---

### PLANO 04: A regra (~5 s)
**Fala:** *"Mas tem uma regra: cada degrau só aparece quando você abre mão de alguma coisa."*

- **Cena:** close no pé dele no ar, sobre o vazio. Ele **solta um objeto** (uma caneca de café com "Família" escrito) e, quando a caneca cai, **o degrau se forma de poeira dourada** debaixo do pé.
- **Luz:** manhã clara; a poeira dourada brilha.
- **Câmera:** close lateral, baixa.
- **Frente desfocada:** um pedaço de nuvem.

```
[ESTILO] close-up side view of a cartoon foot in a sneaker hovering over empty air, a coffee mug falling away below, a new wooden step forming from swirling golden dust under the foot, bright morning sky, blurred cloud in the extreme foreground
```

---

### PLANO 05: Domingos, festas, o medo (~6 s)
**Fala:** *"No começo é fácil. Uns domingos. Algumas festas. O medo de tentar."*

- **Cena:** VOCÊ subindo. Nos degraus de baixo ficam as coisas deixadas: uma **churrasqueira com a mesa de domingo** (família pequenininha lá embaixo acenando), **balões e um chapéu de festa**, e uma **sombrinha preta encolhida com olhos assustados** (o medo) sentada sozinha num degrau.
- **Luz:** dia claro; as coisas deixadas ficam um pouco mais cinzentas.
- **Câmera:** desliza de lado, subindo com ele.
- **Frente desfocada:** um balão.

```
[ESTILO] VOCE young climbing ESCADA in daylight, left behind on the lower steps: a small Sunday barbecue table with a tiny waving family, party balloons and a party hat, and a small dark shadow creature with scared white eyes sitting alone on a step, the left-behind things slightly desaturated, side tracking view, blurred balloon in the extreme foreground
```

---

### PLANO 06: Muita gente desiste (~5 s)
**Fala:** *"Muita gente sobe dois degraus e desiste. Você não."*

- **Cena:** plano aberto: **dezenas de escadas** saindo das lajes do bairro. Em muitas, as pessoas **descem de volta**: um carrega o sofá de volta, outro abraça o videogame, outra volta pra rede. Só VOCÊ continua subindo, já bem mais alto que todos.
- **Luz:** fim de manhã, céu azul limpo; a escada dele com um brilho dourado.
- **Câmera:** recua e sobe para mostrar todas as escadas.
- **Frente desfocada:** uma antena.

```
[ESTILO] wide shot of a Brazilian hillside neighborhood with dozens of floating wooden staircases rising from the rooftops, many cartoon people climbing back down: one carrying a sofa back, one hugging a game console, one returning to a hammock, while VOCE young keeps climbing much higher than everyone, his staircase faintly glowing gold, clear blue late-morning sky, blurred rooftop antenna in the extreme foreground
```

---

### PLANO 07: A Sofia (~6 s)
**Fala:** *"E é subindo que você conhece a Sofia, na escada ao lado. Ela também tá tentando mudar de vida."*

- **Cena:** entre nuvens, uma **segunda escada** (corrimão rosa) aparece do lado. SOFIA (jovem) sobe com a mochila e o livro grosso, crachá no pescoço, o tênis desamarrado. Os dois se veem: os olhos dele viram **corações por um instante**; ela pisca, tímida, com blush.
- **Luz:** tarde dourada, contraluz forte entre as duas escadas.
- **Câmera:** arco lento passando entre as duas escadas.
- **Frente desfocada:** a ponta de uma nuvem.

```
[ESTILO] among soft clouds in golden afternoon light, a second floating wooden staircase with a pink handrail beside ESCADA, SOFIA young climbing with a backpack, a thick book and a work badge, VOCE young on his staircase noticing her with heart-shaped eyes for a moment, she blinks shyly with blush, strong backlight between the two staircases, blurred cloud wisp in the extreme foreground
```

---

### PLANO 08: O lanche e a madrugada (~6 s)
**Fala:** *"Vocês sobem juntos. Um divide o lanche com o outro. Ela fica acordada até tarde só pra conversar com você."*

- **Imagem 1:** os dois sentados cada um no seu degrau, as escadas lado a lado, **dividindo uma coxinha** e uma garrafa térmica de café, passando de uma escada para a outra.
- **Imagem 2:** noite estrelada. Sofia deitada no degrau com o celular aceso no rosto, **bocejando com os olhos quase fechando**, mas ainda conversando; do outro lado, ele também no celular. Relógio de pulso: 2h.
- **Luz:** a primeira quente de fim de tarde; a segunda azul com o brilho dos celulares e a lua.
- **Câmera:** close nos dois; depois recua para o céu estrelado.
- **Frente desfocada:** a garrafa térmica; uma estrela borrada.

```
[ESTILO] VOCE young and SOFIA young sitting on their side-by-side floating staircases sharing a coxinha and a thermos of coffee passed across the gap, happy arc eyes, warm late-afternoon light, blurred thermos in the extreme foreground
```
```
[ESTILO] starry night, SOFIA young lying on a step with a glowing phone over her face, sleepy half-closed eyes but still chatting, on the next staircase VOCE young also lit by his phone, a big moon, soft blue night with phone glow, blurred star bokeh in the extreme foreground
```

---

### PLANO 09: Sonhar juntos (~6 s)
**Fala:** *"Vocês começam a sonhar juntos. Uma casa. Uma viagem pra Lisboa. Uma manhã sem despertador."*

- **Mundo do sonho** (regra do kit): luz **dourada e rosada**, pétalas flutuando, halos fortes. Três miragens dentro de **bolhas** flutuando entre as escadas:
  1. **uma casa** com varanda, rede e plantas;
  2. **Lisboa:** o **bondinho amarelo** subindo uma ladeira, telhados alaranjados e azulejos azuis;
  3. **uma cama** com sol entrando e um **despertador desligado da tomada**.
- **Ação:** os dois apontando para as bolhas, olhos de coração.
- **Câmera:** passa de bolha em bolha.
- **Frente desfocada:** pétalas.

```
[ESTILO] dreamy golden and pink light with floating petals, between two floating staircases three glowing bubbles: a small house with a porch and a hammock, a Lisbon scene with a yellow tram climbing a steep street with orange rooftops and blue azulejo tiles, a cozy bed in morning sunlight with an unplugged alarm clock, VOCE young and SOFIA young pointing at the bubbles with heart-shaped eyes, blurred petals in the extreme foreground
```

---

### PLANO 10: As escadas se afastam (~7 s)
**Fala:** *"Só que ninguém te avisa de uma coisa: quanto mais alto você sobe, mais as escadas se afastam."*

- **Cena:** plano bem aberto. As duas escadas sobem lado a lado e, **quanto mais alto, mais se abrem em V**, cada uma para um lado do céu.
- **Luz:** o dourado esfria para azul-acinzentado; neblina entre as duas.
- **Câmera:** recua e sobe devagar para mostrar o V inteiro.
- **Frente desfocada:** nuvem.

```
[ESTILO] very wide shot, two floating wooden staircases rising side by side and spreading apart into a V shape as they climb higher into the sky, two small figures on them, golden light cooling into blue-grey, haze between them, blurred cloud in the extreme foreground
```

---

### PLANO 11: A mão longe, os gritos (~6 s)
**Fala:** *"Primeiro, a mão dela fica um pouco longe. Depois, vocês precisam gritar pra se ouvir."*

- **Imagem 1:** close nas duas mãos esticadas, as pontas dos dedos quase se tocando; a fitinha amarela no pulso dele.
- **Imagem 2:** os dois longe, cada um com as **mãos em concha na boca**, gritando; entre eles, ondas de som que se desfazem na neblina.
- **Luz:** azul-frio, neblina grossa.
- **Câmera:** do close das mãos ela recua até o plano aberto.
- **Frente desfocada:** neblina.

```
[ESTILO] close-up of two cartoon gloved hands stretching toward each other across a gap between two staircases, fingertips almost touching, a yellow Bonfim ribbon on one wrist, cold blue haze
```
```
[ESTILO] VOCE young and SOFIA young far apart on their separate staircases, each with cupped hands around their face shouting, faint sound wave rings dissolving in thick blue-grey mist between them, blurred mist in the extreme foreground
```

---

### PLANO 12: Ocupado e dormindo (~6 s)
**Fala:** *"Ela liga e você tá ocupado. Você retorna e ela já dormiu."*

- **Tela dividida.**
  - **Lado A:** Sofia (dia) liga, sorrindo; ele, num degrau transformado em escritório (mesa, notebook, pilha de papéis, caneca), **recusa a ligação** com o dedo, sem olhar.
  - **Lado B:** ele (noite) liga; ela dormindo no degrau, abraçada no livro, celular vibrando na mão.
- **Luz:** o lado dela quente; o dele frio de tela de computador.
- **Câmera:** parada; corte seco entre os dois lados.
- **Frente desfocada:** a caneca.

```
[ESTILO] split screen: left, SOFIA young smiling and calling on her phone while VOCE young sits at a desk built on his staircase step with a laptop, stacks of papers and a mug, declining the call with one finger without looking; right, night, VOCE young calling while SOFIA young is asleep on her step hugging her thick book, the phone vibrating in her hand, warm light on her side, cold screen light on his, blurred mug in the extreme foreground
```

---

### PLANO 13: Por meses (~6 s)
**Fala:** *"'Quando tudo melhorar, a gente aproveita.' Vocês repetem isso por meses."*

- **Cena:** um **calendário de parede** pendurado entre as duas escadas, as folhas dos meses **voando** uma atrás da outra (MARÇO, ABRIL, MAIO, JUNHO…). Atrás, o clima muda rápido nas escadas: sol, chuva, folhas secas. Os dois cada vez mais longe e menores.
- **Luz:** muda com as estações, sempre um pouco mais fria.
- **Câmera:** parada no calendário, com o fundo mudando.
- **Frente desfocada:** folhas de calendário voando.

```
[ESTILO] a wall calendar floating between two distant staircases with month pages flying off one after another reading MARÇO, ABRIL, MAIO, JUNHO, behind it the weather on the staircases changing quickly from sun to rain to falling leaves, the two small figures growing farther apart, slightly colder light each time, blurred flying calendar pages in the extreme foreground
```

---

### PLANO 14: A notícia e as três semanas (~7 s)
**Fala:** *"Até que uma noite você recebe uma notícia incrível. Pega o celular pra contar pra ela… e percebe que faz três semanas que vocês não conversam de verdade."*

- **Imagem 1:** noite. VOCÊ pulando no degrau com o notebook aceso mostrando **"APROVADO"**, confetes de luz, olhos em estrela.
- **Imagem 2:** close no celular: a conversa com **"Sofia"**, a última mensagem com a data de **três semanas atrás**. Os olhos dele, refletidos na tela, viram **dois traços**.
- **Texto na tela:** placa escura com **"3 SEMANAS"** em dourado.
- **Luz:** a comemoração em luz quente; o close em azul frio.
- **Câmera:** da comemoração, empurra até o celular.
- **Frente desfocada:** confete.

```
[ESTILO] night, VOCE young jumping with joy on his staircase step, star-shaped eyes, a laptop screen glowing "APROVADO", sparkles and light confetti around him, warm light, blurred confetti in the extreme foreground
```
```
[ESTILO] close-up of a red phone screen showing a chat with "Sofia" and the last message dated three weeks ago, the reflection of two white line-shaped eyes on the glass, cold blue light
```

---

### PLANO 15: Descer (~6 s)
**Fala:** *"Você pensa em descer. Ela também. Mas nenhum dos dois sabe mais como caber na vida do outro."*

- **Cena:** os dois descem alguns degraus, cada um na sua escada, até um **patamar** onde as escadas se aproximam. Entre eles, **duas portas** flutuando lado a lado: a dele, um escritório lotado de papéis; a dela, uma sala de aula noturna cheia de livros. **As portas são de tamanhos diferentes e não encaixam** uma na outra.
- **Luz:** crepúsculo roxo; a luz das portas acesas.
- **Câmera:** desliza entre os dois, passando pelas portas.
- **Frente desfocada:** a quina de uma porta.

```
[ESTILO] dusk purple light, VOCE young and SOFIA young walking down a few steps of their own staircases to a landing where the staircases come close, between them two floating lit doorways of different sizes that do not fit together: his opening to a cluttered office full of papers, hers to an evening classroom full of books, both looking at the doors unsure, blurred door edge in the extreme foreground
```

---

### PLANO 16: A despedida (~5 s)
**Fala:** *"Então vocês se despedem."*

- **Cena:** um abraço no patamar. Depois, plano aberto: cada um volta a subir a própria escada, para lados opostos, sem olhar para trás.
- **Luz:** azul do anoitecer, contraluz recortando o abraço.
- **Câmera:** fechada no abraço, recua até eles virarem dois pontinhos.
- **Frente desfocada:** o corrimão.

```
[ESTILO] VOCE young and SOFIA young in a long hug on a small landing between two floating staircases at nightfall, strong backlight outlining them, then both climbing their own staircases in opposite directions without looking back, blue evening sky, blurred handrail in the extreme foreground
```

---

### PLANO 17: O topo (~6 s)
**Fala:** *"Anos depois, você chega ao topo. Contas pagas. Despertador desligado. Tudo o que você pediu."*

- **Cena:** o topo da escada virou um **apartamento enorme e bonito no céu**: janelão, sofá, plantas, prateleira de livros. Numa mesinha, **uma pilha de boletos com o carimbo "PAGO"** e um **despertador desligado da tomada**. VOCÊ (mais velho), de pé, olhando tudo.
- **Texto na tela:** etiqueta no canto **"ANOS DEPOIS"**.
- **Luz:** manhã clara e limpa, feixes pela janela.
- **Câmera:** desliza pela mesinha (boletos e despertador) até ele.
- **Frente desfocada:** uma planta.

```
[ESTILO] the top of the staircase turned into a large beautiful apartment in the sky: huge window, sofa, plants, bookshelf, a side table with a stack of bills stamped "PAGO" and an unplugged alarm clock, VOCE older standing and looking around, clean bright morning light beams through the window, blurred potted plant in the extreme foreground
```

---

### PLANO 18: Sofia, por acaso (~6 s)
**Fala:** *"Numa viagem, você encontra a Sofia por acaso. Ela sorri. Você também."*

- **Cena:** uma **ladeira de Lisboa** (de verdade, não sonho): **escadinhas de pedra**, casas com azulejos azuis e amarelos, roupas penduradas nas janelas, o **bondinho amarelo** passando, uma pastelaria com toldo. VOCÊ subindo com a mala. SOFIA (mais velha) descendo as escadinhas. Os dois param. **Olhos em arco**, um sorriso pequeno.
- **Luz:** fim de tarde dourado de Lisboa, sombras longas nas pedras.
- **Câmera:** baixa, olhando a escadinha de baixo para cima.
- **Frente desfocada:** um vaso de gerânios na janela.

```
[ESTILO] a steep Lisbon street with stone stairs, houses covered in blue and yellow azulejo tiles, laundry hanging from windows, a yellow tram passing, a pastry shop with an awning, VOCE older walking up with a suitcase and SOFIA older walking down the stairs, both stopping and smiling softly with arc eyes, golden late-afternoon Lisbon light, long shadows on the cobblestones, low camera angle, blurred geranium pot in the extreme foreground
```

---

### PLANO 19: A outra vida (~7 s)
**Fala:** *"Por um segundo, você vê a outra vida inteira. A casa. As viagens. Ela roubando o seu lado da cama."*

- **Mundo do sonho:** dourado e rosa, pétalas, halos. As mesmas miragens do plano 9, agora **vividas**:
  1. a casa com varanda e rede, os dois na rede;
  2. **as viagens:** uma mala cheia de adesivos de cidades, os dois numa foto no bondinho amarelo;
  3. **a cama:** ela dormindo de atravessado, **ocupando o lado dele**, e ele na beirada, quase caindo, sorrindo.
- **Câmera:** atravessa as três cenas como uma travessia contínua.
- **Frente desfocada:** pétalas.

```
[ESTILO] dreamy golden and pink light with floating petals, a dream sequence: VOCE older and SOFIA older together in a hammock on a porch; a suitcase covered in city stickers and a photo of the two of them on a yellow Lisbon tram; a cozy bed where SOFIA older sleeps sprawled diagonally taking his side while VOCE older is squeezed at the edge smiling, blurred petals in the extreme foreground
```

---

### PLANO 20: Alguém chama o nome dela (~6 s)
**Fala:** *"Aí alguém chama o nome dela. Um abraço. E cada um segue o seu caminho."*

- **Cena:** de volta à ladeira real. No alto da escadinha, uma pessoa (silhueta desfocada, acenando) chama Sofia. Os dois se dão **um abraço rápido**. Depois, **ela sobe e ele desce** a mesma escadinha, em direções opostas.
- **Luz:** o dourado do fim de tarde baixando.
- **Câmera:** parada, plano aberto da escadinha.
- **Frente desfocada:** a quina de um muro de azulejo.

```
[ESTILO] the same Lisbon stone stairway, a blurred figure at the top waving and calling, VOCE older and SOFIA older sharing a brief hug, then her walking up and him walking down the same stairs in opposite directions, fading golden light, blurred azulejo wall corner in the extreme foreground
```

---

### PLANO 21: A janela do hotel (~7 s)
**Fala:** *"Naquela noite, você olha pela janela do hotel. É Lisboa. A cidade que vocês prometeram conhecer juntos."*

- **Cena:** quarto de hotel à noite, de trás dele: janela grande aberta para **Lisboa iluminada** (telhados alaranjados, o castelo aceso no morro, o rio com reflexo, a ponte vermelha ao longe, o bondinho passando lá embaixo). Na poltrona, o casaco; na cama, a mala aberta.
- **Luz:** noite azul e roxa com as luzes âmbar da cidade; o abajur do quarto quente.
- **Câmera:** desliza devagar por trás do ombro dele até a vista.
- **Frente desfocada:** a cortina.

```
[ESTILO] a hotel room at night seen from behind VOCE older standing at a large open window overlooking illuminated Lisbon: orange rooftops, a lit castle on the hill, the river with reflections, a red suspension bridge in the distance, a tram passing below, his coat on an armchair and an open suitcase on the bed, night blue and purple with warm amber city lights, a warm bedside lamp, blurred curtain in the extreme foreground
```

---

### PLANO 22: A foto que não foi (~6 s)
**Fala:** *"Você pega o celular pra mandar uma foto da vista… e guarda de novo."*

- **Imagem 1:** close no celular vermelho apontado para a vista: a câmera do celular enquadrando Lisboa; por cima, a conversa **"Sofia"** aberta, o polegar parado sobre "enviar".
- **Imagem 2:** a mão guarda o celular no bolso do casaco; a tela apaga. A fitinha desbotada no pulso.
- **Luz:** a tela do celular é a luz mais forte; a cidade em bokeh atrás.
- **Câmera:** close, parada; só a mão se move.

```
[ESTILO] close-up of a gloved hand holding a red phone up to a hotel window, the phone camera framing glowing Lisbon at night, a chat with "Sofia" open on top, the thumb hesitating over the send button, a faded Bonfim ribbon on the wrist, city lights melted into bokeh behind
```
```
[ESTILO] close-up of the same gloved hand sliding the red phone with a dark screen back into a navy coat pocket, faded Bonfim ribbon on the wrist, Lisbon lights in soft bokeh, quiet blue light
```

---

### PLANO 23: O topo vazio (~9 s)
**Fala:** *"Você chegou lá em cima. Só não sabia que o topo fica vazio quando não tem ninguém pra dizer: 'A gente conseguiu.'"*

- **Cena:** **volta ao plano 1**, agora com a escada sobre **Lisboa à noite**. VOCÊ sentado sozinho no último degrau, **o espaço do lado vazio**. A câmera recua, recua, recua: o topo fica minúsculo no céu imenso. Muito longe, quase invisível, **outra escada de corrimão rosa** com uma luzinha acesa.
- **Na frase final** ("a gente conseguiu"): a única coisa que brilha é **o lugar vazio do lado dele**, com uma luz suave em cima, como se alguém devesse estar ali.
- **Luz:** noite azul profunda, cidade âmbar lá embaixo, lua.
- **Câmera:** recuo longo e lento, o movimento mais longo do vídeo.
- **Frente desfocada:** uma nuvem passando.

```
[ESTILO] night, VOCE older sitting alone on the highest step of a floating wooden staircase high above illuminated Lisbon, an empty space beside him on the step softly lit by a single gentle light from above as if someone should be there, very far away a tiny second staircase with a pink handrail and one small warm light, deep blue night sky with a moon, amber city lights below, very wide pull-back framing, blurred passing cloud in the extreme foreground
```

---

## 4. O que precisa ser igual em todo o vídeo

| Elemento | Onde aparece |
|---|---|
| **A escada** (madeira, corrimão verde descascado; a dela com corrimão rosa) | planos 1–16 e 23 |
| **O celular vermelho** | planos 1, 8, 12, 14, 22 |
| **Fitinha do Bonfim** (viva quando jovem, desbotada depois) | todos os planos dele |
| **Xuxinha amarela** da Sofia | planos 7–16 |
| **Bondinho amarelo** de Lisboa | planos 9, 18, 19, 21 |
| **O lugar vazio do lado dele** | planos 1 e 23 (abre e fecha o vídeo) |
| **Casa com varanda e rede** | planos 9 e 19 |

## 5. Duração

- A narração tem cerca de **2:10 a 2:20**. Os 23 planos somam mais ou menos isso.
- O kit foi feito para vídeos de 45 a 60 segundos: se for montar com ele, ele avisa que o áudio passou do tamanho, mas continua.
- Se quiser encurtar, os trechos mais fáceis de cortar sem perder a história são o plano 6 ("Muita gente sobe dois degraus…") e o plano 13 ("Vocês repetem isso por meses").
