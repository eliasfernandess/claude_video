# CINCO MINUTOS: personagens e cenas para gerar as imagens

Estilo baseado na skill **"E se animado"** (Kit 1.2.0). A história, os personagens e as características continuam os mesmos: **Tiaguin** loiro, **Lívia** morena de cabelo cacheado, a feira, o Canadá e o relógio de cinco minutos.

---

## 1. Como é o estilo do kit (explicado)

A fórmula da skill cabe numa frase: **bonequinho 2D, recortado e cartunizado, dentro de um cenário 3D de verdade, filmado como um filme.**

### 1.1 O cenário é 3D (parece maquete de brinquedo)
- Tudo é feito de formas simples e limpas: caixas, cilindros, esferas. Barracas, prédios, carros, prateleiras e móveis parecem miniaturas.
- **O cenário não tem contorno preto.** O desenho vem da cor chapada com degradê suave e de texturas pintadas (tijolo, madeira, azulejo, lona listrada).
- Cores **saturadas, mas suaves**: tijolo, teal, mostarda, rosa, creme, azul-petróleo. Nunca neon puro.
- **Muitos detalhes em todo lugar:** letreiros, cartazes, plantas, canecas, caixotes, toldos listrados, fios de luz, placas de rua. **Cena vazia é o erro mais comum.**

### 1.2 A luz é de cinema
- **Uma luz principal** (sol, lua, poste, abajur) que projeta sombra, mais uma **luz de preenchimento colorida** (azul à noite, quente de dia).
- **Luzes que brilham dentro da cena:** janelas âmbar, letreiros, telas de celular e lâmpadas com um halo suave (bloom).
- **Feixes de luz diagonais** atravessando a cena (sol pela janela, luz de persiana).
- **Contraluz** forte recortando os personagens.
- **Cada momento tem uma temperatura:** noite azul e roxa com âmbar, entardecer rosa e laranja, dia limpo e claro, sépia para o passado.

### 1.3 Profundidade
- **Fundo desfocado** (bokeh) e o personagem nítido.
- Quase sempre há **um objeto desfocado bem na frente da câmera**: um toldo, uma caixa, uma planta, alguém passando.
- Neblina leve, que clareia o que está longe.
- Câmera na altura dos olhos ou baixa, com coisas em primeiro, segundo e terceiro plano.

### 1.4 Os personagens
- **Recorte 2D plano**, virado para a câmera, dentro do cenário 3D.
- **Cabeça grande e redonda** (cerca de 30% da altura), **quase preta e brilhante**, com um reflexo azulado no topo e uma borda fina de luz.
- **Olhos brancos ovais que atuam:** viram arcos quando sorriem, corações quando se apaixonam, traços quando estão sérios, lágrimas quando choram. **Sem boca e sem nariz.** Mulheres costumam ter cílios e blush rosado.
- **Tronco em bloco, braços e pernas finos e pretos**, mãos com luvas escuras.
- **Roupas detalhadas** (bolsos, cordões, botões, estampas) e **cabelo como peça separada**, com mechas de brilho.
- **Borda de luz** em volta da silhueta, que pega a cor da luz da cena. **Só o personagem principal ganha um halo** a mais.
- **Sombra no chão:** cada personagem tem uma sombra de contato e uma sombra longa projetada.

### 1.5 Câmera e ritmo
- **Planos longos** (4 a 6 s), com a câmera sempre se movendo devagar: desliza, sobe, recua, gira em arco ou atravessa algo.
- **Revelação por recuo:** começa num detalhe e abre para o mundo.
- Close de personagem é comum: a cabeça ocupa um terço do quadro.
- **Nunca cortar a cada palavra.** Várias frases cabem numa ação só.

### 1.6 Texto na tela
- Legendas de até 3 palavras, com as palavras-chave em **dourado**.
- **Placa escura com número dourado brilhando** (ex.: o relógio 5:00).
- **Etiqueta curta de contexto no canto** (ex.: "TORONTO", "8 ANOS ANTES").
- Letreiros e cartazes fazem parte do cenário, em perspectiva.
- **Nada de frase irônica escrita na tela.**

### 1.7 Checklist antes de aprovar cada imagem
1. Tem **feixe de luz**?
2. Tem **algo desfocado na frente**?
3. O **fundo derrete** em bokeh?
4. Os personagens têm **sombra no chão** e **borda de luz**?
5. A cena tem **detalhes suficientes**?

Se alguma resposta for "não", gere de novo.

---

## 2. Bloco de estilo (colar no início de TODO prompt)

```
stylized 3D diorama scene with toy-like simple geometry and painted textures, no outlines on the environment, soft saturated colors, cinematic lighting with one key light casting shadows and a colored fill light, glowing practical lights with soft bloom, diagonal volumetric light beams, strong depth of field with bokeh background and a blurred object in the extreme foreground, light haze, rich environmental details; flat 2D cut-out cartoon characters placed inside the 3D world: big round glossy near-black heads with a bluish highlight, expressive white oval eyes, no mouth, no nose, thin black limbs, dark gloves, detailed clothing, thin bright rim light around the silhouette, contact shadow and long cast shadow on the ground; vertical 9:16 composition, film still
```

**Negativo (se o gerador aceitar):** `--no outlines on background, flat background, neon, photorealistic people, mouth, nose, text errors`

---

## 3. Personagens

> **Sobre a cor da pele.** Neste estilo, **todos os personagens têm a cabeça escura e brilhante**: é a marca do visual, e a pele não aparece. Por isso, o que identifica cada um é **o cabelo, a roupa e os acessórios**, que mantêm as características combinadas: **Tiaguin loiro** e **Lívia de cabelo cacheado castanho-escuro**.
> Se você quiser que a pele apareça (Tiaguin branco, Lívia morena), troque no prompt `big round glossy near-black head` por `big round head with fair peach skin` (Tiaguin) ou `big round head with warm tan brown skin` (Lívia). O visual fica um pouco diferente do kit.

### TIAGUIN (narrador e protagonista)

| | Aos 24, na feira (cenas 4–9) | Aos 32, Canadá e reencontro (cenas 3, 10–16) |
|---|---|---|
| **Cabelo** | **loiro dourado**, bagunçado, com mechas caindo na testa e reflexos claros | loiro mais escuro, curto, penteado para o lado; **barba loira** curta como peça recortada no queixo |
| **Olhos** | brancos ovais, grandes, curiosos | brancos ovais, mais calmos e cansados |
| **Roupa** | camiseta branca, **avental vermelho** da barraca de pastel com bolso e cordão, bermuda jeans, tênis | **dólmã branca de chef** com botões duplos e **lenço vermelho no pescoço** (na cozinha); **jaqueta azul-marinho** com zíper e **mala de rodinhas** (no reencontro) |
| **Marca registrada** | **fitinha do Senhor do Bonfim amarela** no pulso fino e preto | a mesma fitinha, **desbotada, quase branca** |
| **Luz** | é o protagonista, então **só ele tem halo suave** em volta da borda de luz | igual |

**Prompts do personagem:**
```
TIAGUIN age 24: flat 2D cut-out cartoon young man, big round glossy near-black head with a bluish highlight, expressive white oval eyes, no mouth, messy golden blond hair as a separate shape with light shine streaks falling over the forehead, white t-shirt, red street-market apron with a pocket and tie strings, denim shorts, sneakers, thin black limbs, dark gloves, a yellow Bonfim ribbon tied on his thin wrist, bright rim light and a soft halo
```
```
TIAGUIN age 32: flat 2D cut-out cartoon man, big round glossy near-black head with a bluish highlight, calm white oval eyes, no mouth, short darker blond hair swept to the side, short blond beard shape on the chin, white double-breasted chef jacket with a red neckerchief, thin black limbs, dark gloves, a faded almost-white Bonfim ribbon on his wrist, bright rim light and a soft halo
```
```
TIAGUIN age 32 travel outfit: same character, navy zip-up jacket, dark trousers, pulling a rolling suitcase
```

### LÍVIA (sem falas)

| | Aos 22, na feira (cenas 4–9) | Aos 30, advogada (cenas 10–15) |
|---|---|---|
| **Cabelo** | **cacheado, castanho-escuro e bem volumoso**, feito de círculos sobrepostos com brilho, preso no alto com uma **xuxinha amarela** e cachos soltos na testa | os mesmos cachos, **soltos** e grandes até o meio das costas |
| **Olhos** | brancos ovais com **cílios**, **blush rosado** nas bochechas | iguais, com o olhar mais seguro |
| **Roupa** | camiseta branca, **avental verde** da barraca de caldo de cana, saia jeans, tênis | **blazer azul-marinho** com camisa clara, calça social, **brincos de argola dourados pequenos**, pasta de couro |
| **Objeto** | **livro de Direito enorme**, cheio de marcadores coloridos | celular e pasta do fórum |

**Prompts da personagem:**
```
LIVIA age 22: flat 2D cut-out cartoon young woman, big round glossy near-black head with a bluish highlight, expressive white oval eyes with eyelashes, rosy blush on the cheeks, no mouth, very voluminous dark brown curly hair made of overlapping glossy curl circles tied up high with a yellow scrunchie and loose curls on the forehead, white t-shirt, green sugarcane-juice-stand apron, denim skirt, sneakers, thin black limbs, dark gloves, holding a huge law book full of colorful bookmarks, bright rim light
```
```
LIVIA age 30: flat 2D cut-out cartoon woman lawyer, big round glossy near-black head with a bluish highlight, white oval eyes with eyelashes, rosy blush, no mouth, long loose voluminous dark brown curly hair reaching her mid-back, navy blazer over a light blouse, tailored trousers, small gold hoop earrings, leather briefcase, thin black limbs, dark gloves, bright rim light
```

### Secundários (cena 2)

| Personagem | Descrição | Prompt |
|---|---|---|
| **Dona Cida** | senhora, coque grisalho, óculos redondos, uniforme de enfermeira azul-claro com crachá, mala pequena | `DONA CIDA: flat 2D cut-out cartoon elderly woman, big round glossy near-black head, white oval eyes with eyelashes, rosy blush, grey hair bun, round glasses, light blue nurse uniform with an ID badge, small suitcase, rim light` |
| **Seu Zé** | senhor, bigode grisalho como peça recortada, quepe e uniforme de piloto azul-marinho com listras douradas | `SEU ZE: flat 2D cut-out cartoon elderly man, big round glossy near-black head, white oval eyes, grey mustache shape, navy airline pilot uniform with gold stripes and cap, rim light` |

### Folhas de personagem (gerar primeiro e usar como referência)
```
[ESTILO] character turnaround sheet, front, three-quarter and back views, plain soft grey studio background, [PERSONAGEM]
```
Troque `[PERSONAGEM]` por cada um dos prompts acima (Tiaguin 24, Tiaguin 32, Lívia 22, Lívia 30). Depois use essas folhas como **referência de personagem** em todas as cenas (Midjourney `--cref`, Leonardo "Character Reference", Kling/Runway "reference image").

---

## 4. Cenas

> Em cada prompt, cole o **bloco de estilo** da seção 2 no lugar de `[ESTILO]` e troque `TIAGUIN 24`, `TIAGUIN 32`, `LIVIA 22` e `LIVIA 30` pelos prompts da seção 3.
> **Plano** = duração aproximada na tela. **Frente desfocada** = o objeto que fica borrado bem na frente da câmera (regra do kit).
> **Texto na tela** vai no editor, não no gerador (sai mais limpo).

---

### CENA 01: A regra (plano de ~6 s)
**Fala:** *"E se, no dia em que o seu maior sonho se realizasse, você ganhasse cinco minutos pra ver a vida que teria tido se tivesse ficado?"*

- **Lugar:** praça de cidade brasileira em miniatura 3D: coreto, bancos de praça, uma banca de jornal, uma padaria com toldo listrado, orelhão, postes antigos, árvores redondas, prédios baixos coloridos com janelas acesas.
- **Ação:** várias pessoas passando. Em cima da cabeça de cada uma flutua um **relógio de bolso dourado** que brilha.
- **Luz:** entardecer rosa e laranja; postes e janelas acendendo em âmbar; feixes de sol diagonais.
- **Câmera:** começa no detalhe de um relógio flutuando e recua devagar até mostrar a praça inteira.
- **Frente desfocada:** galhos de uma árvore.
- **Texto na tela:** placa escura no centro com **"5:00"** em dourado brilhante.

```
[ESTILO] a miniature Brazilian town square at sunset: a gazebo, park benches, a newsstand, a bakery with a striped awning, a public payphone, old street lamps, round trees, low colorful buildings with glowing amber windows, several cut-out cartoon people walking with a small glowing golden pocket watch floating above each head, pink and orange sunset sky, diagonal sun beams, blurred tree branches in the extreme foreground
```

---

### CENA 02: Ninguém conta o que viu (plano de ~5 s)
**Fala:** *"A dona Cida viu a padaria que não abriu. O seu Zé, a horta. Ninguém conta o que viu."*

- **Lugar:** saguão de aeroporto em 3D: janelões com aviões lá fora, painel de voos, poltronas azuis enfileiradas, carrinho de malas, vasos com plantas, quiosque de café.
- **Ação:** dona Cida (enfermeira) e seu Zé (piloto), lado a lado, olhando cada um para uma **bolha dourada translúcida** à sua frente. Na bolha dela, uma padaria de bairro com o toldo "Padaria da Cida". Na dele, uma horta de quintal com regador. No fim, os dois põem **o dedo na frente do rosto** ("segredo"), com os olhos em arco, sorrindo.
- **Luz:** dia claro e frio entrando pelos janelões (feixes diagonais no piso brilhante); as bolhas jogam luz dourada nos personagens.
- **Câmera:** desliza da esquerda para a direita, de uma bolha para a outra.
- **Frente desfocada:** uma mala com etiquetas.

```
[ESTILO] a 3D airport terminal with huge windows showing parked airplanes, a departure board, rows of blue seats, a luggage cart, potted plants, a coffee kiosk; DONA CIDA and SEU ZE standing side by side, each looking at a translucent glowing golden bubble floating in front of them, inside hers a small neighborhood bakery with a striped awning labeled "Padaria da Cida", inside his a backyard vegetable garden with a watering can, both holding one finger in front of their faces as if keeping a secret, happy arc eyes, cool daylight beams across a shiny floor, golden glow on their faces, blurred suitcase with travel tags in the extreme foreground
```

---

### CENA 03: Canadá (plano de ~6 s)
**Fala:** *"Os meus chegaram no Canadá. Neve na janela. Meu nome na porta da cozinha."*

- **Lugar:** cozinha profissional de restaurante em Toronto: bancadas de inox, panelas penduradas, fogões com chamas azuis, vapor subindo, comandas presas num trilho, prateleira de temperos. Uma **porta vai-e-vem com uma placa "Chef Tiaguin"**. Pela janela, **neve caindo** sobre prédios de tijolo.
- **Ação:** Tiaguin (32), de dólmã, para no meio do serviço e olha para cima: o **relógio dourado** aparece flutuando sobre a cabeça dele.
- **Luz:** contraste **frio × quente**: azul-neve pela janela, âmbar das lâmpadas da cozinha e das chamas; vapor iluminado.
- **Câmera:** começa na neve pela janela, desliza até a placa da porta e termina no Tiaguin olhando o relógio.
- **Frente desfocada:** vapor e uma panela.
- **Texto na tela:** etiqueta no canto **"TORONTO"**; placa **"5:00"**.

```
[ESTILO] a professional restaurant kitchen in Toronto: stainless steel counters, hanging pots, stoves with blue flames, rising steam, order tickets on a rail, a spice shelf, a swinging kitchen door with a sign "Chef Tiaguin", a window showing snow falling on brick buildings; TIAGUIN 32 in the middle of service looking up at a glowing golden pocket watch floating above his head, cold blue snow light from the window mixed with warm amber kitchen lights and flames, steam catching the light, blurred steaming pot in the extreme foreground
```

---

### CENA 04: A feira, oito anos antes (plano de ~6 s)
**Fala:** *"Oito anos antes, eu fritava pastel na feira. Na barraca do lado, a Lívia vendia caldo de cana e estudava pra ser advogada."*

- **Lugar:** feira livre brasileira em 3D, cheia de detalhes: barracas com **lona listrada** (vermelha, amarela, azul), caixotes de frutas (laranja, banana, abacaxi), balanças, placas de preço escritas à mão, sacolas, fios de lâmpada. A barraca do Tiaguin tem a placa **"PASTEL"** e um tacho de óleo. A da Lívia tem a placa **"CALDO DE CANA"**, a **moenda** e feixes de cana encostados.
- **Ação:** Tiaguin (24) fritando pastel; Lívia (22) passando a cana na moenda, com o **livro de Direito aberto** no balcão e os olhos nele.
- **Luz:** **sol de domingo**, quente e saturado; feixes de luz atravessando as lonas; sombras coloridas das listras.
- **Câmera:** desliza lateralmente da barraca de pastel até a de caldo de cana.
- **Frente desfocada:** um caixote de laranjas.
- **Texto na tela:** etiqueta no canto **"8 ANOS ANTES"**.

```
[ESTILO] a lively Brazilian Sunday street market in 3D: stalls with red, yellow and blue striped canvas awnings, crates of oranges, bananas and pineapples, hanging scales, hand-written price signs, string lights; a stall with a sign "PASTEL" and a frying pot where TIAGUIN 24 fries pastéis, the next stall with a sign "CALDO DE CANA", a sugarcane press and bundles of sugarcane, where LIVIA 22 presses sugarcane with her huge law book open on the counter, warm saturated Sunday sunlight, light beams through the awnings, colorful striped shadows, blurred crate of oranges in the extreme foreground
```

---

### CENA 05: A lição de cada um (plano de ~5 s)
**Fala:** *"Ela tomava meu inglês. Eu tomava as leis dela. Quando ela errava, eu errava a próxima de propósito."*

- **Lugar:** entre as duas barracas, os dois sentados em **caixotes de madeira** virados, com copos de caldo de cana e um prato de pastel entre eles.
- **Ação:** os dois com **fichas de estudo** na mão. Lívia erra: os olhos dela ficam em "><" (careta). Tiaguin erra a próxima de propósito, com os olhos em espiral, exagerado. Lívia percebe, cruza os braços e ri: olhos em arco e blush forte.
- **Luz:** fim de tarde dourado, contraluz recortando os dois.
- **Câmera:** close em arco lento em volta deles.
- **Frente desfocada:** o copo de caldo de cana.

```
[ESTILO] between two market stalls, TIAGUIN 24 and LIVIA 22 sitting on upturned wooden crates with cups of sugarcane juice and a plate of pastéis between them, holding study flashcards, he makes an exaggerated dizzy spiral-eyes face on purpose, she crosses her arms and laughs with happy arc eyes and strong blush, golden late-afternoon backlight, warm rim light on both, blurred glass of sugarcane juice in the extreme foreground
```

---

### CENA 06: A vida no guardanapo (plano de ~5 s)
**Fala:** *"A gente desenhou uma vida num guardanapo: o nome dela numa porta, uma casa com varanda, uma cozinha só minha."*

- **Lugar:** close no balcão da barraca de pastel: porta-guardanapos, garrafa de molho, vidro de pimenta, uma moeda.
- **Ação:** um **guardanapo de papel** com um desenho feito a caneta, traço a traço: uma porta com **"Dra. Lívia"**, uma casinha com **varanda e rede**, uma cozinha com um fogão grande. A mão do Tiaguin, com a **fitinha amarela**, segura a caneta. A mão da Lívia aponta para a varanda.
- **Luz:** quente; uma lâmpada pendurada da barraca faz um halo.
- **Câmera:** parte de cima e desce bem devagar sobre o guardanapo.
- **Frente desfocada:** a garrafa de molho.

```
[ESTILO] extreme close-up of a market stall counter with a napkin holder, a sauce bottle, a pepper jar and a coin; a paper napkin with a ballpoint doodle: an office door labeled "Dra. Lívia", a small house with a porch and a hammock, a kitchen with a big stove; a dark gloved hand with a yellow Bonfim ribbon holding the pen, another hand pointing at the porch, warm light from a hanging bulb with a soft halo, blurred sauce bottle in the extreme foreground
```

---

### CENA 07: Na mesma semana (plano de ~5 s)
**Fala:** *"Aí, na mesma semana, ela passou na OAB… e o Canadá me chamou."*

- **Lugar:** a feira à noite, iluminada por fios de lâmpada; barracas fechando.
- **Ação:** **tela dividida.** Esquerda: Lívia pulando de alegria, o celular brilhando com **"APROVADA – OAB"**, confetes de luz em volta, olhos em estrela. Direita: Tiaguin parado, o celular com **"Job offer – Toronto"**, olhos arregalados, virando a cabeça para o lado dela.
- **Luz:** noite azul com âmbar das lâmpadas; as telas dos celulares iluminando os dois.
- **Câmera:** parada, com um leve empurrão para dentro.

```
[ESTILO] split screen at night in a street market lit by string lights, left: LIVIA 22 jumping with joy, star-shaped eyes, sparkles around her, holding a glowing phone that reads "APROVADA – OAB"; right: TIAGUIN 24 standing frozen with wide eyes holding a glowing phone that reads "Job offer – Toronto", turning his head toward her side, night blue fill light with warm amber bulbs, phone screens lighting their faces
```

---

### CENA 08: "Se você ficar…" (plano de ~6 s)
**Fala:** *"Eu disse que ficava. Ela disse que, se eu ficasse, um dia ia olhar pra ela e ver tudo que eu não fiz."*

- **Lugar:** a feira sendo desmontada: lonas dobradas, caixotes empilhados, folhas e papéis no chão, um carrinho de feira.
- **Ação:** Tiaguin segura a mão da Lívia. Ela solta devagar, com os olhos em traço sério e **uma lágrima**, e aponta para o céu: lá longe, **um avião** cruzando.
- **Luz:** pôr do sol **laranja e rosa**, sombras longuíssimas dos dois no chão.
- **Câmera:** câmera baixa, de lado, subindo devagar até mostrar o avião no céu.
- **Frente desfocada:** uma lona dobrada.

```
[ESTILO] a street market being taken down at sunset: folded canvas awnings, stacked crates, scattered leaves and papers, a shopping trolley; LIVIA 22 slowly pulling her hand away from TIAGUIN 24, serious line eyes with a single tear, pointing to the sky where a small airplane crosses, orange and pink sunset, very long cast shadows on the ground, low side camera angle, blurred folded canvas in the extreme foreground
```

---

### CENA 09: Eu fui (plano de ~4 s, com 1 s de silêncio)
**Fala:** *"Eu fui."*

- **Lugar:** saguão de embarque vazio à noite: painel de voos **"TORONTO – EMBARQUE"**, janelão com um avião iluminado na pista, cadeiras vazias.
- **Ação:** Tiaguin (24), de costas, mochila no ombro, parado sozinho olhando o painel.
- **Luz:** azul e fria, **contraluz** forte do janelão recortando a silhueta; o painel brilha.
- **Câmera:** recua muito devagar, deixando ele pequeno no quadro.
- **Frente desfocada:** encosto de uma cadeira.

```
[ESTILO] an empty airport departure hall at night, a glowing departure board reading "TORONTO – EMBARQUE", a huge window with a lit airplane on the runway, rows of empty seats, TIAGUIN 24 seen from behind with a backpack standing alone, cold blue light, strong backlight from the window outlining his silhouette, long shadow on the shiny floor, blurred seat back in the extreme foreground
```

---

### CENA 10: "Só um minuto" (plano de ~6 s)
**Fala:** *"Quando ela ganhou a primeira causa, me ligou. Eu disse: 'só um minuto.' Quando voltei, ela tinha desligado."*

- **Ação:** **tela dividida.** Esquerda: Lívia (30), de blazer, saindo da escadaria de um **fórum** brasileiro (colunas, a placa "FÓRUM", bandeira), radiante, celular no ouvido, olhos em arco. Direita: a cozinha de Toronto lotada, comandas voando, Tiaguin (32) com a frigideira na mão **levantando um dedo** ("só um minuto"), sem olhar para o celular apoiado na bancada.
- **Segunda imagem:** close no celular sobre o inox: **"Chamada encerrada"**.
- **Luz:** o lado dela, sol quente; o lado dele, frio e agitado.
- **Câmera:** parada no split; corte para o close do celular.

```
[ESTILO] split screen: left, LIVIA 30 in a navy blazer walking down the steps of a Brazilian courthouse with columns, a "FÓRUM" sign and a flag, happy arc eyes, phone at her ear, warm sunlight; right, a busy Toronto restaurant kitchen with flying order tickets and steam, TIAGUIN 32 holding a frying pan and raising one finger as if saying "one minute" without looking at the phone on the counter, cold busy light
```
```
[ESTILO] close-up of a phone lying on a stainless steel kitchen counter, the screen reading "Chamada encerrada", cold blue light, steam blurred in the background, blurred knife handle in the extreme foreground
```

---

### CENA 11: Os cinco minutos (plano de ~7 s)
**Fala:** *"Aí os cinco minutos começaram. A varanda. Um restaurantezinho do lado da feira. Ela chegando do fórum, roubando batata da panela."*

- **Mudança de mundo:** é o "mundo do sonho" do kit: **luz dourada e rosada, flores no ar, halos fortes, tudo mais macio**. Contador no canto **4:59 → 4:12**.
- **Imagem 1:** a **casa com varanda e rede** igual ao desenho do guardanapo, com plantas, filtro de barro na janela e um gato dormindo. Ao lado, um restaurantezinho com a placa **"Cozinha do Tiaguin"** colado na feira.
- **Imagem 2:** a cozinha da casa: azulejos, fogão, panela de batata frita chiando. Lívia (30), de blazer, chega com a pasta do fórum e **rouba uma batata**. Tiaguin (32), de avental, faz que dá bronca, com os olhos em arco. Os dois com olhos de coração por um instante.
- **Câmera:** atravessa a porta da casa e entra na cozinha.
- **Frente desfocada:** folhas e flores.

```
[ESTILO] dreamy golden and pink light, soft glowing halos and floating petals, a small Brazilian house with a porch and a hammock exactly like a napkin doodle, potted plants, a clay water filter by the window, a cat sleeping on the step, next to it a tiny restaurant with a sign "Cozinha do Tiaguin" beside a street market, blurred flowers in the extreme foreground
```
```
[ESTILO] dreamy golden and pink light, a cozy Brazilian home kitchen with tiled walls, a stove and a sizzling pan of french fries, LIVIA 30 in a blazer just arrived with a court briefcase sneaking a fry from the pan, TIAGUIN 32 in a home apron pretending to scold her, both with happy arc eyes, warm glow, floating sparkles, blurred hanging plant in the extreme foreground
```

---

### CENA 12: As passagens (plano de ~5 s)
**Fala:** *"Mas toda madrugada, nessa vida, eu olhava passagens pro Canadá."*

- **Lugar:** a mesma cozinha, de madrugada: louça no escorredor, relógio de parede marcando 3h, geladeira com ímãs. Pela porta, o quarto escuro com Lívia dormindo.
- **Ação:** Tiaguin sozinho na mesa, a **luz do celular** no rosto escuro, tela **"Voos para Toronto"**, olhos em traço cansado.
- **Luz:** o dourado do sonho **esfria para azul**; só a tela brilha; um feixe de luar pela janela. Contador **1:03**.
- **Câmera:** empurra devagar até o rosto dele.
- **Frente desfocada:** a fruteira.

```
[ESTILO] the same Brazilian home kitchen at 3 a.m.: dishes on the drying rack, a wall clock showing three o'clock, a fridge with magnets, through the doorway LIVIA 30 asleep in a dark bedroom; TIAGUIN 32 sitting alone at the table, tired line eyes, his face lit by a glowing phone screen reading "Voos para Toronto", the golden dream light fading into cold blue, a moonlight beam through the window, blurred fruit bowl in the extreme foreground
```

---

### CENA 13: Qual saudade (plano de ~5 s)
**Fala:** *"Não existia vida sem saudade. Só dava pra escolher qual."*

- **Ação:** **tela dividida simétrica.** Esquerda: Tiaguin (32) de dólmã na janela de Toronto, olhando a neve. Direita: Tiaguin (32) na cozinha brasileira de madrugada, olhando o celular. **A mesma pose e os mesmos olhos** dos dois lados.
- **No centro:** o relógio dourado marca **0:00** e se apaga.
- **Luz:** azul dos dois lados, com um ponto quente em cada um (a lâmpada da cozinha e a tela).
- **Câmera:** parada; só o relógio some.

```
[ESTILO] perfectly symmetrical split screen, left: TIAGUIN 32 in a chef jacket standing at a Toronto window watching snow fall; right: TIAGUIN 32 at a dark Brazilian kitchen table at night looking at his phone; same pose and the same melancholic line eyes on both sides, cold blue light with one warm practical light on each side, a golden pocket watch showing "0:00" fading out in the center
```

---

### CENA 14: Pelo vidro (plano de ~6 s)
**Fala:** *"Ano passado, passei na frente do escritório dela. Ela me viu pelo vidro. A gente só sorriu."*

- **Lugar:** rua de bairro brasileiro: calçada de pedra portuguesa, árvore, orelhão, padaria, banca, fios de poste. Uma **porta de vidro** com a placa **"Dra. Lívia – Advocacia"**. Lá dentro: estante de livros, vaso de planta e, na parede, **o guardanapo emoldurado**.
- **Ação:** Tiaguin (32), de jaqueta e mala de rodinhas, do lado de fora. Lívia (30), na mesa com um cliente, levanta os olhos e o vê. Os dois sorriem: **olhos em arco**, pequenos, sem exagero.
- **Luz:** fim de tarde **dourado**; reflexo da rua no vidro; feixe de sol entrando no escritório e batendo no quadro do guardanapo.
- **Câmera:** atravessa o vidro devagar e termina com o foco no guardanapo emoldurado.
- **Frente desfocada:** a mala de rodinhas.

```
[ESTILO] a Brazilian neighborhood street at golden hour: Portuguese stone pavement, a tree, a public payphone, a bakery, a newsstand, tangled power lines; a glass office door with a sign "Dra. Lívia – Advocacia", inside a bookshelf, a potted plant and a framed paper napkin doodle of a house with a porch on the wall; TIAGUIN 32 in a navy jacket with a rolling suitcase outside, LIVIA 30 at her desk with a client looking up through the glass, both exchanging a small smile with soft arc eyes, street reflections on the glass, a sun beam hitting the framed napkin, blurred suitcase handle in the extreme foreground
```

---

### CENA 15: A frase (plano de ~5 s)
**Fala:** *"Sentir falta da vida que você não viveu não quer dizer que a sua deu errado."*

- **Lugar:** o bairro visto de cima, ao entardecer: telhados, caixas d'água azuis, antenas, a feira sendo montada na esquina com as lâmpadas acendendo uma a uma.
- **Ação:** Tiaguin seguindo pela calçada com a mala, pequeno; pela janela do escritório, Lívia de volta ao cliente.
- **Luz:** rosa e laranja virando azul; janelas âmbar acendendo.
- **Câmera:** sobe e se afasta devagar (grua).
- **Frente desfocada:** a ponta de uma antena.

```
[ESTILO] high wide shot of a Brazilian neighborhood at dusk: rooftops with blue water tanks and antennas, a street market being set up at the corner with string lights turning on one by one, TIAGUIN 32 small on the sidewalk walking away pulling a suitcase, through an office window LIVIA 30 back with her client, pink and orange sky fading to blue, amber windows lighting up, blurred antenna in the extreme foreground
```

---

### CENA 16: A pergunta, quebrando a quarta parede (plano de ~6 s)
**Fala:** *"E você… se ganhasse os seus cinco minutos… teria coragem de olhar?"*

- **Lugar:** fundo escuro e liso, com um bokeh suave de luzes da cidade bem longe.
- **Ação:** close do Tiaguin (32), **olhando direto para a câmera** (os olhos brancos fixos em quem assiste). Ele estende a mão para a câmera com o **relógio dourado na palma**, marcando **5:00**, como se entregasse o relógio ao espectador.
- **Luz:** uma luz de cima e o **halo do protagonista** mais forte que no resto do vídeo; o relógio brilha dourado.
- **Câmera:** parada; a mão vem na direção da lente.
- **Texto na tela:** nenhum além da legenda.

```
[ESTILO] dark plain background with soft distant city bokeh, close-up of TIAGUIN 32 looking straight into the camera with steady white oval eyes, extending his open gloved hand toward the viewer holding a glowing golden pocket watch that shows "5:00", single top light, strong bright rim light and halo around him, the watch casting golden light on his hand and jacket
```

---

## 5. Elementos que precisam ser iguais em todo o vídeo

| Elemento | Onde aparece |
|---|---|
| **Relógio de bolso dourado** (com o mesmo desenho) | cenas 1, 3, 11, 12, 13 e 16 |
| **Fitinha do Bonfim amarela** no pulso do Tiaguin | todas as cenas dele (desbotada aos 32) |
| **Guardanapo desenhado** (porta "Dra. Lívia", casa com varanda e rede, fogão) | cena 6, a casa real na cena 11, emoldurado na cena 14 |
| **Xuxinha amarela** da Lívia | cenas 4 a 8 |
| **Placa "Chef Tiaguin"** | cena 3 |

Dica: gere primeiro o **relógio dourado** e o **guardanapo desenhado** sozinhos e use as imagens como referência nas cenas em que eles voltam.
