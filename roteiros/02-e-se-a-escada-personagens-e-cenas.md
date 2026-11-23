# A escada: personagens e cenas (versão sonho)

Direção de arte para gerar as imagens e animações do vídeo (Midjourney, Leonardo, Ideogram, Kling, Runway etc.).
A descrição de cada cena está em português. **Os prompts estão em inglês**, porque os geradores entendem melhor.

---

## 1. O conceito: "O Espaço dos Sonhos"

O vídeo inteiro acontece **dentro de um sonho**: um espaço escuro e infinito, como a mente de alguém à noite. Não existe chão nem horizonte. Existem as **escadas flutuando no vazio**, a **névoa** e as **luzes**. Cada luz é um pensamento, uma lembrança ou um desejo.

O espectador não "assiste" às cenas: ele **navega** entre elas. A câmera flutua devagar, atravessa bolhas de luz, passa por entre partículas e muda de lugar como quem anda num sonho.

A realidade brasileira aparece **em pedaços flutuando**: uma laje com caixa d'água azul, um varal, uma pipa presa num fio, uma cadeira de plástico. São fragmentos da vida real boiando no escuro, porque é assim que a memória guarda as coisas.

### O ambiente

| Camada | Descrição |
|---|---|
| **Fundo** | vazio azul-marinho quase preto, com nebulosas roxas e índigo bem suaves, como tinta diluída em água escura |
| **Abaixo** | um **mar de sonhos**: superfície preta e espelhada, muito lá embaixo, que reflete as luzes. Tudo que é deixado para trás cai devagar até ele e afunda como uma estrela apagando |
| **Meio** | as escadas de madeira flutuando, a névoa violeta em faixas, ilhas de memória (pedaços do bairro) |
| **Frente** | partículas de luz fora de foco passando perto da câmera, que dão profundidade e a sensação de flutuar |

### O código das luzes (o que cada uma significa)

Este é o "idioma" do vídeo. Mantenha as cores consistentes e o público vai sentir a história mesmo sem perceber.

| Luz | Aparência | Significado |
|---|---|---|
| **Luz-sonho** | dourada, quente, pulsando devagar | o desejo, o objetivo, o topo da escada |
| **Vaga-lumes de pensamento** | pontinhos brancos e quentes que flutuam em volta das pessoas | o que a pessoa está pensando agora |
| **Bolhas de memória** | esferas grandes e translúcidas, como bolhas de sabão, com uma **cena da vida real** lá dentro | lembranças, vivências, o passado |
| **Luz-afeto** | âmbar e rosa-pêssego | amor, cumplicidade, os momentos dos dois |
| **Luz-ausência** | azul-frio, apagando aos poucos | saudade, distância, o que não foi vivido |
| **Brasas que caem** | objetos que se desfazem em partículas e caem até o mar escuro | o que foi deixado para trás em troca de um degrau |
| **Constelações** | estrelas que formam desenhos (um teclado, uma sapatilha, uma casa) | os planos e a vida que os dois imaginaram juntos |

### Como a câmera se move

- **Flutuação constante:** nada fica 100% parado. Movimento lento de deriva para cima, para os lados e em espiral suave.
- **Parallax:** partículas na frente, personagens no meio e nebulosa no fundo, cada camada numa velocidade.
- **Transições "atravessando a luz":** para mudar de cena, a câmera mergulha dentro de uma bolha de memória ou de um vaga-lume, a tela vira luz e abre na cena seguinte.
- **Foco que respira:** o foco passa de uma luz em primeiro plano para o personagem (rack focus).
- **Quebras da quarta parede (👁):** a câmera **para de flutuar** pela primeira vez, as luzes congelam e o fundo escurece. Só o Namiques continua se mexendo. É um choque proposital: o sonho "pausa" para ele falar com quem assiste.

### Arco de cores

| Ato | Clima |
|---|---|
| 1. A escada | escuro com pontos dourados, misterioso e convidativo |
| 2. Lívia | o escuro se enche de âmbar e rosa; as luzes se multiplicam |
| 3. Afastamento | as luzes quentes vão virando azul-frio e algumas apagam; a névoa engrossa |
| 4. A escolha | quase sem luz: só as duas escadas e poucas brasas |
| 5. Anos depois | o real (a escola) bem iluminado, com luzes de sonho entrando pela janela; a "outra vida" numa bolha dourada gigante |
| 6. Quarta parede | escuridão total, uma única luz em cima do Namiques |

### Bloco de estilo (colar no início de TODO prompt)
```
dreamlike cinematic 2D painted illustration, infinite dark dreamscape, deep navy and indigo void with soft purple nebula haze, floating glowing light orbs and firefly-like particles, translucent memory bubbles, volumetric light, shallow depth of field with bokeh, ethereal, melancholic and magical, vertical 9:16,
```

**Negativo (se o gerador aceitar):**
```
--no daylight, bright sky, flat lighting, cartoon, 3D render, text, watermark
```

---

## 2. Personagens

Os personagens são brasileiros e reais. Só o mundo em volta é sonho. Eles sempre recebem uma **luz de recorte** (rim light) da cor do momento, para destacar do escuro.

### NAMIQUES (protagonista e narrador)

| | Juventude (cenas 1–28) | Anos depois (cenas 29–41) |
|---|---|---|
| **Idade** | 24 | 33 |
| **Pele / traços** | **pele branca**, levemente rosada nas bochechas e no nariz, algumas sardas claras, rosto anguloso, olhos castanho-claros (quase mel) | iguais, com linhas de expressão leves em volta dos olhos |
| **Cabelo** | **loiro dourado**, liso a levemente ondulado, médio, bagunçado, caindo na testa | loiro mais escuro, curto e penteado pra trás, com alguns fios grisalhos nas têmporas |
| **Barba** | rala, loira, por fazer | loira escura, cheia e bem aparada |
| **Corpo** | magro, alto, um pouco curvado de tanto ficar no teclado | mais firme, postura reta |
| **Roupa** | camiseta de algodão mostarda desbotada, camisa de flanela xadrez azul aberta, calça jeans gasta, tênis de lona surrado | camisa de linho bege com as mangas dobradas, calça de sarja escura, sapato de couro simples |
| **Objetos-assinatura** | **fitinha do Senhor do Bonfim** amarela no pulso (ela **brilha levemente dourada** no sonho); **teclado portátil antigo** com uma tecla remendada com fita | a **mesma fitinha**, desbotada e quase branca, com um brilho fraquinho; óculos de armação fina |
| **Luz própria** | vaga-lumes de pensamento sempre em volta das mãos quando ele toca; **o cabelo loiro pega a cor das luzes do sonho** (dourado nos momentos de sonho, âmbar com a Lívia, azulado na ausência) | menos vaga-lumes, mais calmos |

```
NAMIQUES: 24-year-old white Brazilian man, fair skin with slightly rosy cheeks and a few light freckles, messy medium-length golden blond hair falling over his forehead, light hazel-brown eyes, light blond stubble, tall and slim, faded mustard t-shirt under an open blue plaid flannel shirt, worn jeans, beat-up canvas sneakers, softly glowing yellow Bonfim ribbon bracelet on his wrist, old portable keyboard
```
```
NAMIQUES age 33: same white Brazilian man, darker blond hair cut short and combed back, a few grey hairs at the temples, full neatly trimmed dark blond beard, thin-framed glasses, beige linen shirt with rolled sleeves, dark trousers, faded almost-white Bonfim ribbon bracelet with a faint glow
```

### LÍVIA (bailarina)

> Ela não tem voz no vídeo. A atuação dela é toda pelo corpo, pelo rosto e **pelas luzes que ela deixa ao dançar**.

| | Juventude (cenas 7–28) | Anos depois (cenas 31–35) |
|---|---|---|
| **Idade** | 22 | 31 |
| **Pele / traços** | **pele morena** (bronzeada, castanho-clara), rosto redondo, olhos castanho-escuros grandes e expressivos, sobrancelhas marcadas, **covinha** do lado esquerdo | igual, com o olhar mais sereno |
| **Cabelo** | **cacheado, castanho-escuro e volumoso**, preso num **coque alto com um lenço amarelo**, com alguns cachos soltos na testa | cachos castanhos soltos e definidos até o meio das costas |
| **Roupa** | collant azul-marinho, saia de ensaio cinza, meia-calça rosa-clara furada no joelho, **moletom grande cinza** | sobretudo cor de camelo, blusa preta de gola alta, argolas douradas, credencial de companhia de dança |
| **Objeto-assinatura** | **sapatilha de ponta gasta remendada com esparadrapo** | **sapatilha nova** pendurada na bolsa pelas fitas |
| **Luz própria** | **cada movimento deixa um rastro de luz âmbar no ar**, como um traço de pincel que some devagar; a luz âmbar brilha na pele morena e acende as pontas dos cachos | rastro mais suave, quase invisível |

```
LIVIA: 22-year-old Brazilian woman, warm tan olive-brown skin (morena), big expressive dark brown eyes, dimple on the left cheek, voluminous dark brown curly hair in a high bun wrapped with a yellow headscarf with a few loose curls on her forehead, slim athletic ballet dancer, navy leotard, grey rehearsal skirt, pale pink tights with a hole at the knee, oversized grey hoodie, worn pointe shoes patched with white tape, her movements leave glowing amber light trails in the air
```
```
LIVIA age 31: same Brazilian woman with tan olive-brown skin, long loose defined dark brown curls reaching mid-back, camel coat over black turtleneck, gold hoop earrings, dance company lanyard, new pointe shoes hanging from her bag by the ribbons, serene gentle smile
```

### Secundários

| Personagem | Descrição | Prompt |
|---|---|---|
| **Jeferson, o vizinho** (19) | moreno claro, boné pra trás, regata de time, bermuda tactel, chinelo, controle de videogame | `JEFERSON: 19-year-old Brazilian guy, light brown skin, backwards cap, soccer jersey tank top, nylon shorts, flip-flops, holding a game controller` |
| **Davi, o aluno** (8) | pele marrom, cabelo raspado, banguela, uniforme de escola pública (camiseta branca de gola azul), cadarço desamarrado | `DAVI: 8-year-old Brazilian boy, brown skin, buzz cut, missing front tooth, white public school t-shirt with blue collar, untied sneakers` |
| **Alunos e plateia** | aparecem **dentro de bolhas de memória**, nunca soltos no sonho | `diverse Brazilian children with recorders and guitars; families on white plastic chairs filming with phones` |

---

## 3. Elementos do sonho (biblioteca para reaproveitar)

| Elemento | Descrição | Prompt |
|---|---|---|
| **A escada do Namiques** | madeira velha, corrimão verde descascado, flutuando no vazio sem apoio; **cada degrau novo se forma de poeira dourada** que se junta | `old wooden staircase floating in a dark void with no support, peeling green handrail, a new step forming out of swirling golden dust` |
| **A escada da Lívia** | igual, mas os degraus são **mais estreitos** e o corrimão é rosa desbotado | `narrow floating wooden staircase with faded pink handrail` |
| **Ilha da origem** | um pedaço do bairro flutuando: uma laje com caixa d'água azul, um varal com roupas balançando, uma pipa presa num fio de poste cortado. As escadas nascem dali | `a floating fragment of a Brazilian rooftop slab with a blue water tank, a clothesline with hanging clothes and a kite tangled in a broken power line, drifting in the dark void` |
| **A luz-sonho (topo)** | lá no alto, uma luz dourada pulsando. Dentro dela, quase uma miragem, a casinha azul com o letreiro **"Escola de Música Degrau"** | `distant pulsing golden light high above, inside it a faint mirage of a small pastel blue house with a hand-painted sign "Escola de Música Degrau"` |
| **O mar de sonhos** | superfície preta e espelhada lá embaixo, onde as brasas caem e apagam | `far below, a black mirror-like sea reflecting the floating lights, falling embers sinking into it` |
| **Bolha de memória** | esfera translúcida com reflexos de arco-íris e uma cena real dentro | `large translucent soap-bubble-like sphere floating in the dark, containing a vivid real-life scene inside` |

---

## 4. Cenas

> **Nos prompts, troque `NAMIQUES` e `LIVIA` pelo prompt de personagem da seção 2** (ou use a imagem de referência do personagem).
> Numeração igual à ordem do arquivo `02-e-se-a-escada-NAMIQUES-com-sfx.txt`.
> Cada cena tem: **Cenário**, **Luzes** (o que está acontecendo com elas e o que significam), **Ação**, **Câmera**, **Transição**, o **prompt de imagem** e o **prompt de movimento** (para animar no Kling, Runway ou outro gerador de vídeo).
> Em todo prompt de imagem, cole antes o **bloco de estilo** da seção 1.

---

### ATO 1: A ESCADA

#### Cena 01: O despertar no sonho
> *"E se existisse uma escada que levasse até o seu maior sonho… mas cada degrau só aparecesse quando você deixasse alguma coisa pra trás?"*

- **Cenário:** escuridão total. Aos poucos, a névoa roxa aparece. No centro, a ilha da origem (a laje com a caixa d'água azul e o varal) flutua no vazio. Dela sai uma escada de madeira que sobe até se perder na escuridão.
- **Luzes:** primeiro, um único vaga-lume acende na frente da câmera. Depois outro, e mais dez. Lá no alto, a **luz-sonho dourada** pulsa como um coração.
- **Ação:** nenhuma pessoa ainda. Só o mundo "acordando".
- **Câmera:** começa no escuro, com foco no vaga-lume em primeiro plano. O foco muda para a escada e a câmera sobe lentamente seguindo os degraus até a luz dourada.
- **Transição:** a câmera desce de volta como uma pena caindo e encontra o Namiques no primeiro degrau.

```
[STYLE] pitch-dark dream void slowly revealing purple mist, a floating fragment of a Brazilian rooftop slab with a blue water tank and a clothesline drifting in the center, an old wooden staircase rising from it into darkness, a pulsing golden light far above like a heartbeat, a single firefly glowing out of focus in the foreground
```
**Movimento:** `slow vertical camera rise following the floating staircase upward, fireflies gently appearing one by one, purple mist drifting, golden light at the top pulsing slowly`

---

#### Cena 02 👁: "Meu nome é Namiques."
> *"Pra mim, existiu. Meu nome é Namiques. E antes de você continuar rolando o feed… fica."*

- **Cenário:** primeiro degrau. Atrás dele, a ilha da origem e o varal balançando sem vento.
- **Luzes:** quando ele se vira para a câmera, **todas as luzes congelam no ar**. A névoa para. Fica só uma luz de recorte dourada nas costas dele.
- **Ação:** Namiques de costas, olhando para cima. Ele se vira devagar e encara a lente. Sorriso de canto. Na frase "fica", levanta levemente a mão, como quem pede para alguém não ir embora.
- **Câmera:** totalmente parada (é a primeira quebra da quarta parede). Plano médio.
- **Transição:** quando ele termina, as luzes voltam a se mexer, como um sonho que despausa.

```
[STYLE] NAMIQUES on the first step of a floating wooden staircase, turning to look directly into the camera, half smile, keyboard bag on his back, all surrounding light particles frozen mid-air, golden rim light on his shoulders, dark background with a floating rooftop and clothesline behind him
```
**Movimento:** `static camera, the man slowly turns around and looks into the lens, slightly raises one hand, frozen glowing particles around him, then particles start drifting again`

---

#### Cena 03: O preço dos degraus
> *"Eu deixei algumas horas de sono. Uns domingos. O medo de tentar."*

- **Cenário:** a escada subindo no vazio.
- **Luzes:** a cada frase, um objeto que estava com ele **se desfaz em brasas** e cai devagar até o mar de sonhos lá embaixo:
  - **"horas de sono":** um travesseiro que se desmancha em plumas de luz azul;
  - **"uns domingos":** folhinhas de calendário (com os domingos marcados em vermelho) que voam e queimam como papel;
  - **"o medo de tentar":** uma sombra pequena, encolhida, agarrada no tornozelo dele, que solta e cai.
  
  No instante em que cada coisa cai, **um degrau novo se forma de poeira dourada** sob o pé dele.
- **Câmera:** lateral, acompanhando a subida, com parallax das brasas caindo em primeiro plano.
- **Transição:** a câmera gira levemente e mostra que, ao lado, há outra escada.

```
[STYLE] NAMIQUES climbing a floating staircase, a pillow dissolving into glowing blue feathers falling below him, calendar pages with Sundays circled in red burning into embers, a small dark shadow creature letting go of his ankle and falling, each falling object becoming embers sinking toward a black mirror sea far below, a new step forming from golden dust under his foot
```
**Movimento:** `side tracking shot following him climbing, objects dissolving into embers and slowly falling into the dark abyss, golden dust swirling and forming a new step under his foot`

---

#### Cena 04: O vizinho que desceu
> *"Meu vizinho deixou o videogame. Mas desceu pra buscar no mesmo dia."*

- **Cenário:** uma escada vizinha, flutuando a uns metros, com só dois degraus.
- **Luzes:** o videogame do Jeferson, quando ele larga, **continua brilhando**: a tela azul e colorida acesa, piscando como um ímã.
- **Ação:** Jeferson põe o videogame no degrau e sobe um. Para. Olha para trás. Desce correndo, de chinelo, e abraça o videogame. O degrau que tinha aparecido se desfaz em poeira.
- **Câmera:** plano aberto, com o Namiques em primeiro plano, de costas e desfocado, observando.
- **Clima:** leve e engraçado. É o único respiro cômico do vídeo.

```
[STYLE] JEFERSON on a small floating staircase nearby running back down in flip-flops to hug his glowing game console left on a step, the step above him dissolving into dust, comedic expression, NAMIQUES out of focus in the foreground watching
```
**Movimento:** `the young man runs back down the floating steps and grabs the glowing game console, the upper step crumbles into golden dust, light humorous tone`

---

#### Cena 05 👁: "Eu não."
> *"Eu não. … E se você está vendo isso em vez de dormir… acho que você também não."*

- **Cenário:** fundo escuro desfocado.
- **Luzes:** tudo congela de novo. O rosto do Namiques é iluminado por uma **luz azulada vinda da câmera**, como se fosse a tela do celular de quem está assistindo.
- **Ação:** close. Ele olha direto para a lente. Na frase "você também não", inclina a cabeça e dá um sorriso cúmplice.
- **Câmera:** parada. Uma aproximação mínima, quase imperceptível.

```
[STYLE] close-up of NAMIQUES looking straight into the camera, his face lit by a cold blue glow as if from a phone screen, frozen light particles around him, dark blurred dream background, intimate complicit half smile
```
**Movimento:** `almost static extreme slow push-in, the man tilts his head slightly with a knowing smile, frozen particles`

---

#### Cena 06: O sonho lá em cima
> *"Lá em cima estava a escola de música que eu sempre quis abrir. Então eu subi."*

- **Cenário:** visão de baixo para cima (o ponto de vista dele). A escada sobe em espiral.
- **Luzes:** a luz-sonho dourada se abre como uma flor e mostra, dentro dela, a **miragem da casinha azul** com o letreiro **"Escola de Música Degrau"** e notas musicais de luz saindo das janelas.
- **Ação:** na frase "então eu subi", ele começa a subir com mais força.
- **Câmera:** de baixo para cima, girando em espiral devagar junto com a escada.
- **Transição:** a câmera sobe tão perto da luz dourada que a tela fica dourada e corta para a noite.

```
[STYLE] low angle POV looking up a spiral floating staircase, at the top a golden light blooming open like a flower revealing a mirage of a small pastel blue house with hand-painted sign "Escola de Música Degrau", glowing musical notes floating out of its windows
```
**Movimento:** `slow spiral camera rising up the staircase toward the golden light, musical notes of light floating out, light grows until it fills the screen`

---

#### Cena 07: Alguém contando baixinho
> *"Até que, numa noite, eu ouvi alguém contando baixinho… Cinco, seis, sete, oito…"*

- **Cenário:** mais alto no sonho. O vazio está mais estrelado e mais silencioso.
- **Luzes:** a cada número sussurrado, **uma luz âmbar acende** na escuridão ao lado: 5… 6… 7… 8. São quatro pontos que revelam, aos poucos, que ali existe outra escada.
- **Ação:** Namiques para e vira a cabeça na direção do som.
- **Câmera:** lenta, saindo do rosto dele e virando para o escuro ao lado.

```
[STYLE] high in a starry dark dreamscape, NAMIQUES pausing on his floating staircase and turning his head toward the darkness, four small amber lights glowing one by one in the dark beside him, revealing the outline of another staircase
```
**Movimento:** `camera slowly pans from his face into the darkness, four amber lights ignite one at a time revealing another staircase`

---

### ATO 2: LÍVIA

#### Cena 08: A bailarina no degrau pequeno
> *"Na escada do lado, uma garota tentava dançar num degrau pequeno demais. O nome dela era Lívia."*

- **Cenário:** a escada da Lívia, com degraus estreitos e corrimão rosa desbotado, flutuando a poucos metros da dele.
- **Luzes:** quando ela gira, os braços **deixam rastros de luz âmbar no ar**, como pinceladas que somem devagar. Os vaga-lumes se aproximam dela, curiosos.
- **Ação:** Lívia tenta uma pirueta no degrau estreito. Perde o equilíbrio, os braços abrem, ela se segura. Morde o lábio. Tenta de novo.
- **Câmera:** circula devagar em volta dela, com o Namiques desfocado do outro lado.
- **Destaque:** close rápido da **sapatilha remendada com esparadrapo** equilibrada na beirada do degrau, sobre o abismo.

```
[STYLE] LIVIA on a narrow step of a floating staircase with a faded pink handrail, attempting a pirouette above the dark abyss, her arms leaving glowing amber light trails like brushstrokes, fireflies drawn toward her, NAMIQUES out of focus on the neighboring staircase
```
```
[STYLE] extreme close-up of a worn pointe shoe patched with white tape balancing on the edge of a wooden step, dark abyss below with tiny reflected lights
```
**Movimento:** `slow orbit around the dancer as she spins and wobbles, amber light trails following her arms and fading, fireflies circling`

---

#### Cena 09: A nota errada de propósito
> *"Eu toquei uma música. Ela tentou acompanhar. Errou o passo. Eu errei a nota de propósito. E ela percebeu."*

- **Cenário:** as duas escadas, frente a frente.
- **Luzes:** cada nota que ele toca **sai do teclado como uma bolinha de luz dourada** e flutua até a escada dela. Quando ela erra o passo, o rastro âmbar dá um "tropeço" no ar. Quando ele erra a nota, sai uma **bolinha de luz torta, cor-de-rosa, meio desajeitada**, que vai quicando até ela.
- **Ação:** ela para, olha para a bolinha torta, olha para ele, entende. Ri com a mão na boca e a covinha aparece.
- **Câmera:** plano entre os dois, alternando o foco: as mãos dele, a bolinha voando, o rosto dela.

```
[STYLE] NAMIQUES sitting on a floating step playing an old keyboard, golden light orbs floating out of the keys toward the neighboring staircase, one clumsy crooked pink light orb bouncing awkwardly through the air, LIVIA catching it with her eyes and covering her laugh with her hand, dimple showing
```
**Movimento:** `glowing notes drift from the keyboard across the gap, one crooked pink note bounces clumsily, the girl stops, looks at him and laughs behind her hand`

---

#### Cena 10 👁: "Ela sempre percebia."
- **Luzes:** congelam. A bolinha cor-de-rosa fica parada no ar entre os dois.
- **Ação:** Namiques olha para a câmera com um sorriso saudoso. Ao fundo, desfocada e congelada, Lívia no meio do riso.
- **Câmera:** parada.

```
[STYLE] NAMIQUES looking at the viewer with a nostalgic smile, a small crooked pink light orb frozen in the air beside him, LIVIA frozen mid-laugh blurred in the background, warm amber rim light, dark dreamy void
```
**Movimento:** `static, only the man moves: a soft nostalgic smile, everything else frozen`

---

#### Cena 11: Os ensaios
> *"A gente começou a ensaiar junto. Eu num teclado velho. Ela com uma sapatilha quase furada."*

- **Cenário:** as escadas **mais próximas uma da outra** a cada ensaio.
- **Luzes:** o escuro começa a **se encher de luz quente**. As notas douradas dele e os rastros âmbar dela se misturam no ar e formam desenhos juntos: espirais, laços, uma onda. Os vaga-lumes se multiplicam.
- **Montagem (3 imagens rápidas):**
  1. close das mãos no teclado com a **fitinha do Bonfim brilhando**;
  2. close da sapatilha remendada fazendo meia-ponta;
  3. plano aberto dos dois ensaiando, com as luzes deles se entrelaçando entre as escadas.
- **Câmera:** cada imagem flutua num sentido diferente; na terceira, a câmera se afasta e mostra o quanto o vazio ficou iluminado.

```
[STYLE] close-up of hands on an old portable keyboard, a glowing yellow Bonfim ribbon on the wrist, golden light notes rising from the keys
```
```
[STYLE] close-up of worn taped pointe shoes rising onto demi-pointe on a floating wooden step, amber light trail circling the ankle
```
```
[STYLE] wide shot, NAMIQUES playing and LIVIA dancing on two floating staircases close together, his golden notes and her amber light trails intertwining in the air between them forming spirals, the dark void now filled with warm fireflies
```
**Movimento:** `golden notes and amber trails weave together into spirals between the two staircases, camera slowly pulls back revealing the void filling with warm lights`

---

#### Cena 12: Toc. Toc. Toc.
> *"Quando a Lívia tinha medo de olhar pra baixo, eu batia três vezes no corrimão."*

- **Cenário:** a escada dela, mais alta que antes. Embaixo, o abismo e o mar de sonhos.
- **Luzes:** quando ela olha para baixo, os rastros âmbar **tremem e ficam azulados**, porque o medo esfria a luz. Ele bate no corrimão, e **a cada toc sai uma onda de luz dourada** pela madeira, que atravessa o vão e chega na escada dela.
- **Ação:** Lívia agarrada ao corrimão, olhos arregalados para o abismo. Toc, toc, toc: a terceira onda de luz chega nas mãos dela, e ela respira e solta o ar.
- **Câmera:** de cima para baixo, mostrando a vertigem, e depois close dos nós dos dedos dele batendo.

```
[STYLE] LIVIA gripping a floating handrail, frightened, looking down into a dizzying dark abyss with a black mirror sea far below, her amber light trails trembling and turning blue, in the foreground NAMIQUES's knuckles knocking on his wooden handrail sending a ripple of golden light across the gap toward her
```
**Movimento:** `three knocks, each sending a golden light ripple along the wood and across the gap, the third ripple reaches her hands and her light turns warm again`

---

#### Cena 13: "Eu tô aqui."
- **Luzes:** a luz dela volta a ser âmbar. Entre os dois, os vaga-lumes formam uma **ponte fraquinha de luz**, que não dá para atravessar mas liga os dois.
- **Ação:** eles se olham por cima do vão. Ela sorri.
- **Câmera:** plano lateral, com as duas escadas e a ponte de luz no meio.

```
[STYLE] NAMIQUES and LIVIA looking at each other across the gap between their floating staircases, a faint fragile bridge of fireflies connecting them, warm amber glow, tender
```
**Movimento:** `fireflies slowly gather into a delicate bridge of light between the two, gentle floating camera`

---

#### Cena 14: A casa que ela desenhou
> *"A cozinha ia ter espaço pra um piano… Ela dizia que piano na cozinha era uma ideia horrível. Mas desenhou a casa com ele mesmo assim."*

- **Cenário:** os dois sentados nos degraus, lado a lado (as escadas quase encostando).
- **Luzes:** Lívia desenha **no ar com o dedo**, e o traço vira **constelação**: estrelas ligadas por linhas finas formando a planta da casa. Aparecem a escola, uma salinha de dança, e na cozinha, ao lado do fogão, **um piano**. Ela faz cara de "que ideia horrível", mas desenha o piano com mais estrelas que o resto.
- **Ação:** ele ri. Ela finge brava e cutuca o ombro dele.
- **Câmera:** de trás dos dois, mostrando a constelação na frente deles, grande no céu escuro.

```
[STYLE] NAMIQUES and LIVIA sitting side by side on floating steps seen from behind, she draws in the dark sky with her finger creating a glowing constellation shaped like a house floor plan: a music school, a small dance studio, and a kitchen with a piano next to the stove, the piano drawn with the brightest stars
```
**Movimento:** `her fingertip draws lines of stars in the sky forming a house plan, the piano constellation sparkles brighter, he laughs`

---

#### Cena 15: Um sonho com alguém dentro
> *"E, pela primeira vez, o meu sonho tinha alguém dentro."*

- **Luzes:** lá no alto, a miragem da casinha azul **ganha uma segunda janela acesa**, cor de âmbar, ao lado da janela dourada.
- **Câmera:** sobe devagar, deixa os dois lá embaixo e chega na casinha com as duas janelas.
- **Clima:** o momento mais quente e cheio de luz do vídeo inteiro.

```
[STYLE] mirage of a small pastel blue house inside a blooming golden light high in the dreamscape, now with two lit windows side by side, one golden and one amber, the whole void glowing warm with countless fireflies
```
**Movimento:** `camera floats upward from the couple to the dream house, a second window lights up in amber next to the golden one`

---

### ATO 3: AS ESCADAS SE AFASTAM

#### Cena 16: O afastamento
> *"Só que as escadas começaram a se afastar. Pouquinho. Primeiro, a gente precisava esticar os braços pra dar as mãos. Depois… falar mais alto."*

- **Cenário:** as duas escadas se separando devagar, como barcos à deriva.
- **Luzes:** a **ponte de vaga-lumes se rompe** no meio e as luzinhas se espalham. As luzes quentes em volta começam a **ficar azul-frio**, uma a uma. A névoa engrossa entre eles.
- **Sequência de 3 imagens:**
  1. os dois de mãos dadas, braços esticados, os dedos entrelaçados brilhando;
  2. só as pontas dos dedos se tocando, com uma faísca pequena entre elas;
  3. longe, com as mãos em concha na boca, gritando, e a névoa engolindo a voz.
- **Câmera:** se afasta devagar a cada imagem, mostrando o vão crescendo.

```
[STYLE] two floating staircases drifting apart in the dark, NAMIQUES and LIVIA stretching their arms to hold hands across the widening gap, their intertwined fingers glowing, the firefly bridge breaking apart, warm lights around them turning cold blue one by one
```
```
[STYLE] two floating staircases far apart separated by thick violet mist, NAMIQUES and LIVIA calling to each other with cupped hands, cold blue light, fireflies scattered and dimming
```
**Movimento:** `the two staircases slowly drift apart, hands stretch then slip, warm lights fade to blue one by one, mist thickens between them`

---

#### Cena 17 👁: "É só pular pra escada dela."
- **Cenário:** atrás do Namiques, o vão enorme entre as escadas e o abismo até o mar de sonhos.
- **Luzes:** congeladas. Algumas brasas paradas no meio da queda.
- **Ação:** ele olha para a câmera. Em "eu também pensei", olha rapidamente para trás, para o vão. Em "não dá", volta e encara, sério.
- **Câmera:** parada.

```
[STYLE] NAMIQUES facing the camera, behind him a vast gap between two floating staircases and a dizzying drop to a black mirror sea, frozen falling embers in the air, cold blue rim light, honest expression
```
**Movimento:** `static camera, he glances back at the abyss then looks back into the lens, frozen embers`

---

#### Cena 18: As conquistas
> *"Até que eu consegui os meus primeiros alunos. E a Lívia, uma audição em outra cidade. A gente comemorou."*

- **Cenário:** cada um na sua escada, agora longe.
- **Luzes:** surgem duas **bolhas de memória**:
  - na frente dele, uma bolha com **três crianças tocando flauta doce** numa salinha simples, com paredes de tijolo e um ventilador de teto;
  - na frente dela, uma bolha com uma **carta carimbada "AUDIÇÃO – SÃO PAULO"** e um palco de teatro iluminado.
  
  Quando eles comemoram, as bolhas soltam **fogos de artifício de luz** que voam pelo vazio. Por um instante, as luzes dos dois **se encontram no meio** de novo.
- **Câmera:** plano aberto, com as duas escadas e os fogos de luz se cruzando entre elas.

```
[STYLE] two distant floating staircases, in front of NAMIQUES a translucent memory bubble showing three Brazilian kids playing recorders in a simple brick room with a ceiling fan, in front of LIVIA a memory bubble showing a letter stamped "AUDIÇÃO – SÃO PAULO" and a lit theater stage, both cheering as bursts of light fireworks fly from the bubbles and meet in the middle of the dark void
```
**Movimento:** `memory bubbles glow, light fireworks burst out and cross the void, briefly meeting between the two staircases`

---

#### Cena 19: As ligações pra depois
> *"Mas os ensaios dela caíam no horário das minhas aulas. As ligações ficavam pra depois… Quando ela atendia, já estava dormindo."*

- **Cenário:** o vazio entre as escadas.
- **Luzes:** entre os dois flutuam **relógios de luz** com os ponteiros girando rápido. Um **celular de luz azul** viaja pelo vão, de uma escada para outra, tocando. Quando chega nela, ela já está dormindo encolhida no degrau, de moletom, e o celular **apaga no meio do caminho de volta** e cai como brasa.
- **Ação:** ele falando animado, gesticulando. Ela dormindo.
- **Câmera:** segue o celular de luz atravessando o vazio.

```
[STYLE] glowing blue phone-shaped light traveling across the dark gap between two floating staircases, clocks made of light with fast-spinning hands floating around, NAMIQUES talking excitedly on one side, LIVIA asleep curled up on a step in her grey hoodie on the other, the phone light dimming and falling like an ember
```
**Movimento:** `camera follows the glowing phone drifting across the gap, light clocks spinning fast, the phone light reaches the sleeping girl and fades out, falling into the abyss`

---

#### Cena 20: "Só um minuto."
> *"Uma noite, a Lívia voltou pra me mostrar um passo que finalmente tinha acertado. Eu disse: 'Só um minuto.'"*

- **Cenário:** a escada dele. Ela atravessou até lá (o vão está mais curto só naquela noite).
- **Luzes:** Lívia faz um **giro perfeito**, e o rastro âmbar desenha um **círculo completo e brilhante** no ar, o mais bonito do vídeo. Mas ele está de cabeça baixa, iluminado só por uma **luminária fria** de escrivaninha, riscando partituras.
- **Ação:** ela termina o giro, sorriso enorme, braços para cima… e ele nem levanta os olhos. "Só um minuto."
- **Câmera:** foco nela girando e, no fim do giro, o foco muda para ele de cabeça baixa.

```
[STYLE] LIVIA completing a perfect pirouette, her amber light trail forming a complete glowing circle in the air, radiant smile, arms raised, while NAMIQUES sits head down under a cold desk lamp marking music sheets, not looking, contrast between her warm light and his cold light
```
**Movimento:** `she spins, a perfect circle of amber light forms around her, camera rack focuses to him with his head down, the circle slowly fades`

---

#### Cena 21: A sapatilha tirada
> *"Quando eu levantei a cabeça, ela já tinha tirado a sapatilha."*

- **Luzes:** o círculo âmbar que ela desenhou **se desfaz em brasas** que caem. Não sobra nenhuma luz em volta dela.
- **Ação:** Lívia sentada no degrau, de costas para ele, desamarrando a fita da sapatilha bem devagar.
- **Câmera:** lenta, parada nas costas dela. Ele aparece desfocado, levantando a cabeça tarde demais.
- **Silêncio:** sem trilha nessa cena, só o som da fita.

```
[STYLE] LIVIA sitting on a floating step with her back turned, slowly untying her pointe shoe ribbons, the remains of an amber light circle crumbling into embers and falling around her, NAMIQUES blurred behind her lifting his head too late, cold muted blue tones
```
**Movimento:** `embers of the broken light circle slowly fall into the abyss, she unties the ribbon slowly, he raises his head in the background`

---

#### Cena 22: A cadeira vazia
> *"Na apresentação dos meus alunos, eu deixei uma cadeira vazia na primeira fila. Olhei pra porta até a última música."*

- **Cenário:** uma **bolha de memória enorme** flutuando no escuro. Dentro dela, o salão comunitário com bandeirolas coloridas, cadeiras de plástico brancas, famílias filmando com o celular, crianças tocando no palco baixo.
- **Luzes:** na primeira fila, **uma cadeira vazia**, com um papel escrito "RESERVADO", **é a única coisa iluminada em azul-frio**; o resto da bolha está em cor quente. Do lado do palco, uma **porta de luz** na parede da bolha, fechada.
- **Ação:** Namiques ao lado do palco, olhando para a porta. As crianças tocam, as famílias aplaudem. A porta não abre.
- **Câmera:** começa fora da bolha, no escuro, e entra devagar até a cadeira vazia.

```
[STYLE] a giant translucent memory bubble floating in the dark void, inside it a Brazilian community hall with colorful string bunting, white plastic chairs, families filming with phones, children performing on a low stage, one empty plastic chair in the front row with a paper sign "RESERVADO" glowing in cold blue while everything else is warm, NAMIQUES beside the stage staring at a closed door of light
```
**Movimento:** `camera slowly pushes into the memory bubble toward the empty glowing blue chair, children playing, the door of light stays closed`

---

#### Cena 23: A briga
> *"Naquela noite, a gente brigou. Não por falta de amor. Por uma cadeira. Por um minuto. Por todas as pequenas ausências…"*

- **Cenário:** as duas escadas longe. **Chove no sonho**: uma chuva de luz azul que cai do nada e some no mar escuro.
- **Luzes:** a cada frase ("por uma cadeira", "por um minuto"), **uma bolha pequena de memória passa entre os dois** mostrando o momento: a cadeira vazia, ele de cabeça baixa, o celular apagando. As bolhas **estouram** no meio da chuva.
- **Ação:** os dois discutindo de longe; as bocas se mexem, mas não se ouve nada.
- **Câmera:** entre os dois, no meio da chuva, girando devagar de um para o outro.

```
[STYLE] rain of cold blue light falling in the dark dreamscape between two distant floating staircases, NAMIQUES and LIVIA arguing from afar, small memory bubbles drifting between them showing an empty plastic chair, a man with his head down, a fading phone, bubbles bursting in the rain
```
**Movimento:** `blue light rain falling, tiny memory bubbles float between them and burst one by one, camera slowly rotates between the two figures`

---

#### Cena 24 👁: "Nada disso parece grande."
- **Luzes:** a chuva **congela no ar**: milhares de gotas azuis paradas em volta dele.
- **Ação:** Namiques, molhado, olha para a câmera. Fala baixo.
- **Câmera:** parada, plano fechado.

```
[STYLE] NAMIQUES soaked, looking straight into the camera, thousands of glowing blue raindrops frozen in mid-air around him, dark background, quiet serious expression
```
**Movimento:** `static camera, raindrops of light frozen in the air, only his eyes and lips move`

---

### ATO 4: A ESCOLHA

#### Cena 25: Descendo
> *"Então eu pensei em parar. Fechei o teclado. Desci alguns degraus. A Lívia estava ali, segurando a passagem que ela pensava em cancelar."*

- **Cenário:** quase escuridão total. As escadas, por um momento, **se aproximam de novo lá embaixo**, perto da ilha da origem.
- **Luzes:** quando ele fecha o teclado, **os vaga-lumes em volta dele apagam**. Cada degrau que ele desce **se desfaz atrás dele**. Lá embaixo, a única luz é um **bilhete de ônibus brilhando branco** na mão da Lívia, escrito "SÃO PAULO".
- **Ação:** ele desce devagar. Ela está parada, olhando para o bilhete.
- **Câmera:** de cima, seguindo ele descer na direção da luzinha do bilhete.

```
[STYLE] near total darkness, NAMIQUES closing his keyboard and walking down, steps dissolving behind him, his fireflies going out, far below near a floating rooftop fragment LIVIA holding a softly glowing white bus ticket that reads "SÃO PAULO", the only light in the scene
```
**Movimento:** `top-down camera follows him descending, steps crumbling behind him, the glowing ticket the only light below`

---

#### Cena 26 👁: "Essa é a parte em que você grita…"
- **Luzes:** congeladas. Só o bilhete brilha lá embaixo, desfocado.
- **Ação:** ele para no meio da escada e olha para a câmera com um sorriso triste. Em "eu ouvi", fecha os olhos por um segundo.
- **Câmera:** parada.

```
[STYLE] NAMIQUES standing halfway down a floating staircase in darkness, looking at the viewer with a sad smile, a blurred glowing ticket far below, soft cold backlight
```
**Movimento:** `static, he looks into the lens, closes his eyes for a second, opens them`

---

#### Cena 27: A sapatilha nova e as fotos
> *"Mas eu olhei pra sapatilha nova que ela finalmente tinha conseguido comprar. Ela olhou pras fotos dos meus alunos."*

- **Luzes:** dois closes, cada um com sua luz:
  1. os pés dela com a **sapatilha nova**, de cetim, brilhando dourado (é o sonho dela);
  2. as mãos dele segurando **fotos dos alunos** que brilham dourado também (é o sonho dele).
  
  Os dois sonhos têm **a mesma cor**. Nenhum é maior que o outro.
- **Câmera:** close, com uma flutuação mínima.

```
[STYLE] close-up of brand-new satin pointe shoes on LIVIA's feet glowing soft gold in the darkness
```
```
[STYLE] close-up of NAMIQUES's hands holding photos of smiling Brazilian children with instruments, the photos glowing soft gold, Bonfim ribbon on the wrist
```
**Movimento:** `soft golden glow pulsing gently on the shoes, then on the photos, matching rhythm`

---

#### Cena 28: A despedida
> *"A gente se despediu sem saber se estava fazendo a escolha certa. E continuou subindo."*

- **Cenário:** a ilha da origem, a laje com a caixa d'água e o varal, agora pequena e escura.
- **Luzes:** um abraço longo. Em volta deles, **os últimos vaga-lumes quentes** giram uma vez e se dividem em dois grupos: uns sobem com ele, outros com ela.
- **Ação:** abraço. Depois, plano bem aberto: cada um sobe a sua escada, em **direções opostas**, e as escadas se curvam para lados diferentes do vazio. Nenhum dos dois olha para trás.
- **Câmera:** começa fechada no abraço e se afasta até os dois virarem duas luzinhas distantes.
- **Transição:** tela preta. Texto: **"ANOS DEPOIS"**.

```
[STYLE] NAMIQUES and LIVIA in a long tight embrace on a small dark floating rooftop fragment with a blue water tank and clothesline, the last warm fireflies circling them once
```
```
[STYLE] extremely wide shot of the dark dreamscape, two floating staircases curving away in opposite directions, NAMIQUES and LIVIA climbing each their own, neither looking back, each followed by a small group of warm fireflies, becoming two distant lights
```
**Movimento:** `camera pulls back from the embrace to an extreme wide shot, the two figures climbing apart until they become two tiny lights in the void`

---

### ATO 5: ANOS DEPOIS

> A partir daqui, a **realidade** aparece mais. A escola é real, iluminada e brasileira. Mas o sonho continua presente: **as luzes flutuantes entram pela janela** e passeiam pela sala, como se a escola tivesse sido construída dentro do sonho.

#### Cena 29: A escola pronta
> *"Anos depois, a minha escola estava pronta."*

- **Cenário:** fim de tarde. Uma casa antiga reformada: fachada azul-clara, janelas com grade colorida, letreiro pintado à mão **"Escola de Música Degrau"**. O bairro ao redor é real. Em cima do telhado, quase imperceptível, **a ponta de uma escada de madeira** sumindo no céu.
- **Luzes:** vaga-lumes dourados entrando pelas janelas. Crianças entrando com instrumentos.
- **Ação:** Namiques (33) na porta, recebendo os alunos.
- **Câmera:** desce do céu (onde se vê a ponta da escada) até a porta da escola.

```
[STYLE] late afternoon, a real renovated pastel blue house in a Brazilian neighborhood with colorful window grilles and a hand-painted sign "Escola de Música Degrau", kids entering with instruments, NAMIQUES age 33 at the door, golden fireflies drifting in through the windows, faint tip of a wooden staircase disappearing into the sky above the roof
```
**Movimento:** `camera descends from the sky past the tip of a staircase down to the school door, fireflies drifting into the windows`

---

#### Cena 30: Três batidas na porta
> *"Numa quinta-feira qualquer, eu ouvi três batidas na porta."*

- **Cenário:** dentro da escola, piso de taco, paredes cheias de fotos de alunos.
- **Luzes:** a cada **toc** na porta, uma **onda de luz dourada** atravessa a madeira e se espalha pela sala, igual à do corrimão anos atrás. Os vaga-lumes da sala **param e se viram para a porta**.
- **Ação:** Namiques congela no meio da sala, com uma partitura na mão.
- **Câmera:** close na porta de madeira por dentro, com a luz passando pela fresta.

```
[STYLE] interior of a Brazilian music school with parquet floor and walls of student photos, close-up of a wooden door from inside, each knock sending a golden light ripple through the wood into the room, fireflies in the room freezing and turning toward the door, NAMIQUES age 33 frozen holding sheet music
```
**Movimento:** `three knocks, three golden ripples spread through the door and across the room, fireflies stop and turn toward the door`

---

#### Cena 31: Lívia
> *"Lívia. Ela estava na cidade pra uma apresentação."*

- **Luzes:** a porta abre e **entra luz âmbar** junto com ela. A sala inteira esquenta de cor.
- **Ação:** Lívia (31), de sobretudo, com a sapatilha nova pendurada na bolsa. Um sorriso contido.
- **Câmera:** por cima do ombro do Namiques, com ela na porta, na luz.

```
[STYLE] doorway of the music school, LIVIA age 31 standing in warm amber light, camel coat, new pointe shoes hanging from her bag by the ribbons, gentle restrained smile, NAMIQUES age 33 in the foreground seen from behind, amber glow flooding the room
```
**Movimento:** `door opens, amber light pours in around her, the room's colors warm up`

---

#### Cena 32: O piano
> *"Eu mostrei as salas. As fotos. O piano que eu finalmente consegui comprar. Ela passou a mão pela madeira… 'Ainda bem que não ficou na cozinha.'"*

- **Cenário:** sala principal com um **piano de armário** de madeira escura. Num prego da parede, quase escondida, **a sapatilha velha remendada com esparadrapo**, que ela esqueceu anos atrás e ele guardou.
- **Luzes:** quando ela passa a mão no piano, **notas de luz douradas** saem da madeira, como se o piano lembrasse. Ela vê a sapatilha velha no prego e a sapatilha brilha fraquinho, cor âmbar.
- **Ação:** ela sorri, ele ri.
- **Câmera:** segue a mão dela na madeira; muda o foco para a sapatilha no prego; volta para os dois rindo.

```
[STYLE] LIVIA age 31 running her fingers over a dark wood upright piano, tiny golden light notes rising from the wood where she touches, NAMIQUES age 33 laughing beside her, wall of student photos, an old pointe shoe patched with tape hanging on a nail in the corner glowing faint amber
```
**Movimento:** `her fingers glide on the piano releasing small light notes, rack focus to the old shoe on the nail glowing, back to them laughing`

---

#### Cena 33: A outra vida
> *"E, por um segundo, eu enxerguei aquela outra vida. A casa. O jantar atrasado. Ela dançando enquanto eu tocava."*

- **Cenário:** a sala da escola **se dissolve** e os dois ficam de pé no escuro do sonho de novo. Na frente deles, flutua a **maior bolha de memória do vídeo**, dourada, quente, enorme.
- **Dentro da bolha:** a vida que não aconteceu, toda em **traço de lápis com aquarela dourada**: uma cozinha brasileira simples, com azulejo branco e azul, filtro de barro, panela de pressão no fogão, mesa posta com o jantar atrasado, **o piano encostado na parede da cozinha**, Lívia dançando descalça e Namiques tocando. **A constelação da casa** que ela desenhou na cena 14 aparece no céu em volta da bolha.
- **Ação:** os dois olhando para dentro da bolha, lado a lado, sem se tocar.
- **Câmera:** começa nos dois e **entra na bolha**, navegando pela cozinha desenhada.

```
[STYLE] the music school dissolving into the dark dreamscape, NAMIQUES age 33 and LIVIA age 31 standing side by side without touching, facing the biggest glowing golden memory bubble, inside it in pencil sketch with golden watercolor wash: a simple Brazilian kitchen with blue and white tiles, a clay water filter, a pressure cooker on the stove, dinner table set late, an upright piano against the kitchen wall, LIVIA dancing barefoot while NAMIQUES plays, the star constellation of a house plan shining in the sky around the bubble
```
**Movimento:** `the room melts into darkness, the camera glides into the golden memory bubble and floats through the sketched kitchen, the drawing animates softly like a memory`

---

#### Cena 34: O celular vibra
> *"Aí o celular dela vibrou."*

- **Luzes:** a vibração aparece como uma **onda que racha a bolha dourada**. A bolha **estoura** em mil partículas douradas que caem devagar até o mar de sonhos. A constelação da casa **apaga estrela por estrela**.
- **Cenário:** voltam a sala real da escola e a cor normal. O celular dela vibra em cima do piano: **"Motorista – chegou"**.
- **Câmera:** de dentro da bolha, a câmera é "empurrada" para fora quando ela estoura.

```
[STYLE] a golden memory bubble cracking and bursting into thousands of golden particles falling into darkness, a house-shaped star constellation going out star by star, then a phone vibrating on top of a dark wood piano with screen "Motorista – chegou"
```
**Movimento:** `vibration ripple cracks the golden bubble, it bursts into falling golden particles, stars go out one by one, cut back to the real room and the vibrating phone`

---

#### Cena 35: Ela foi embora
> *"O carro estava esperando. A gente se abraçou. Ela foi embora."*

- **Luzes:** um abraço curto na porta. Quando ela sai, **a luz âmbar vai embora com ela**, como uma cauda de cometa. A sala volta para a luz natural do fim de tarde.
- **Câmera:** de dentro, vendo ela ir pela rua do bairro até o carro. A porta fecha devagar.

```
[STYLE] brief hug at the doorway of the music school, then LIVIA walking down a Brazilian neighborhood street toward a waiting car at sunset, a soft amber light trail following her like a comet tail, leaving the room
```
**Movimento:** `she walks away, the amber glow trails behind her and fades, the door slowly closes`

---

#### Cena 36: A aula continua
> *"Eu voltei pra sala, onde um aluno tentava acertar a primeira música. Sentei do lado dele. E continuei a aula."*

- **Cenário:** a sala do piano, com a luz dourada do fim de tarde entrando pela janela.
- **Luzes:** Davi erra a mesma nota, e sai uma **bolinha de luz torta, cor-de-rosa**, igualzinha à nota errada da cena 9. Namiques **sorri ao ver**. Senta ao lado e põe a mão no ombro dele. Os vaga-lumes voltam a se aproximar.
- **Câmera:** close na bolinha torta, depois no sorriso do Namiques, depois plano dos dois no piano.

```
[STYLE] DAVI at the upright piano missing a note, a small crooked pink light orb bouncing out of the keys, NAMIQUES age 33 smiling at it with recognition, sitting down beside the boy with a hand on his shoulder, warm late-afternoon window light, fireflies drifting back
```
**Movimento:** `a crooked pink note bounces out of the piano, the man smiles, sits beside the boy, fireflies gently return`

---

#### Cena 37: O entendimento
> *"Mas, naquela noite, eu finalmente entendi: sentir falta da vida que eu não vivi… não significa que a minha deu errado."*

- **Cenário:** noite. A escola vista de longe, no bairro real, com as janelas acesas e música vazando.
- **Luzes:** a câmera sobe, e o bairro vai **virando ilha flutuante** de novo no vazio escuro. Lá longe no sonho, uma **luzinha âmbar** (ela, em outro lugar) brilha. As duas luzes, a da escola e a dela, **piscam no mesmo ritmo**, sem se aproximar.
- **Câmera:** grua lenta subindo e se afastando.

```
[STYLE] night, the music school's warm windows glowing in a Brazilian neighborhood that slowly becomes a floating island in the dark dreamscape, far away in the void a single small amber light glowing, both lights pulsing in the same rhythm without coming closer, peaceful and bittersweet
```
**Movimento:** `slow crane up and away, the neighborhood turns into a floating island, a distant amber light pulses in sync with the school's light`

---

### ATO 6: A QUARTA PAREDE

#### Cena 38 👁: "Esse vídeo durou menos que uma ligação."
- **Cenário:** o sonho inteiro **apaga**. Escuridão total. Só o Namiques (33), sentado no degrau mais alto da escada, com **uma única luz** em cima dele, como um poste no nada.
- **Luzes:** nenhuma partícula. Só a fitinha do Bonfim, desbotada, com um **brilho fraquinho** no pulso.
- **Ação:** ele olha para a câmera. Fala devagar. Em "eu nunca fiz essa ligação", olha rapidamente para o celular na mão e guarda no bolso.
- **Câmera:** parada. Plano médio.

```
[STYLE] pure black void, a single overhead light like a lone streetlamp, NAMIQUES age 33 sitting on the highest step of a wooden staircase looking directly at the viewer, a faint glow on the faded Bonfim ribbon on his wrist, holding a phone, no particles, minimal and intimate
```
**Movimento:** `static, he looks at the lens, glances at his phone, puts it in his pocket`

---

#### Cena 39 👁: "Quem ficou na escada do lado?"
- **Luzes:** no escuro, **muito ao fundo**, acende **uma luzinha âmbar** desfocada. Ele não vê, mas quem assiste vê.
- **Ação:** ele inclina a cabeça, esperando a resposta de quem assiste.
- **Câmera:** um pouco mais perto que a anterior.

```
[STYLE] closer shot of NAMIQUES age 33 tilting his head as if waiting for the viewer's answer, black background, far behind him one tiny blurred amber light quietly glowing, single overhead light on his face
```
**Movimento:** `static, he tilts his head waiting, a tiny amber light fades in far behind him`

---

#### Cena 40 👁: "Bate três vezes."
- **Ação:** ele estica a mão em direção à câmera, com os nós dos dedos quase encostando na lente, como se fosse bater **por dentro da tela do celular**.
- **Luzes:** a cada **toc**, uma **onda de luz dourada se espalha pela tela inteira**, como se fosse no vidro (igual ao corrimão e à porta). Na terceira, a luzinha âmbar lá no fundo **brilha mais forte**.
- **Câmera:** parada; a mão vem em direção à lente.

```
[STYLE] NAMIQUES age 33 reaching toward the camera, knuckles almost touching the lens as if knocking on the screen from inside, a golden light ripple spreading across the whole frame like on glass, faded Bonfim ribbon glowing faintly, far behind a small amber light brightening
```
**Movimento:** `his hand comes toward the lens and knocks three times, each knock sends a golden ripple across the entire screen as if on glass, the distant amber light grows brighter on the third knock`

---

#### Cena 41: Tela preta
> *"Ainda dá tempo de ouvirem."*

- **Cenário:** **preto total**, sem nenhuma luz. Silêncio.
- **Ação:** depois da fala, no centro da tela, **um único vaga-lume** acende, igual ao primeiro da cena 01, e flutua para cima até sair da tela.
- **Texto (opcional):** em branco, pequeno, embaixo: **"toc toc toc"**.

```
[STYLE] complete black screen, a single tiny warm firefly appearing in the center and slowly floating upward
```
**Movimento:** `total darkness, one small firefly lights up in the center and drifts upward out of frame`

---

## 5. Dicas de produção

1. **Comece pelas folhas de personagem.** Gere o Namiques (24 e 33 anos) e a Lívia (22 e 31) de frente, perfil e costas, **sobre fundo escuro com luz de recorte**. Use essas imagens como referência em todas as cenas (Midjourney `--cref`, Leonardo "Character Reference", Kling/Runway "reference image").
2. **Gere o "mundo" separado dos personagens.** Faça primeiro o vazio com névoa e luzes (sem gente), e depois coloque os personagens por cima no editor. Assim o sonho fica idêntico em todas as cenas.
3. **Camadas de partículas no editor.** Uma camada de vaga-lumes desfocados na frente, passando devagar, resolve 80% da sensação de "navegar no sonho". Pode ser o mesmo arquivo de vídeo em loop, usado no vídeo inteiro.
4. **Cor das luzes = emoção.** Antes de exportar cada cena, confira se a cor das luzes bate com a tabela da seção 1 (dourado = sonho, âmbar = afeto, azul = ausência).
5. **Quarta parede = tudo para.** Nos 👁, congele as partículas (é só usar um frame parado da camada de luzes) e deixe só o Namiques se mexendo. A diferença de ritmo é o que faz o espectador sentir que ele "saiu do vídeo".
6. **Elementos que voltam** e que precisam ser **idênticos** quando reaparecem:
   - a bolinha de nota torta cor-de-rosa (cenas 9, 10 e 36);
   - a onda dourada do toc toc toc (cenas 12, 30 e 40);
   - a constelação da casa (cenas 14 e 33);
   - o vaga-lume solitário (cenas 1 e 41).
