# Imagens

Quase todos os posts levam imagem. Antes de "ver mais", a pessoa só vê a primeira linha e a imagem. A imagem tem de mostrar o objeto da primeira linha. Não repete a frase palavra por palavra: completa-a.

Formato: 1080 x 1350 px (vertical), PNG.

## Que imagem para cada tipo de primeira linha

| A primeira linha fala de… | Imagem | Como se faz |
|---|---|---|
| Um número | Cartão com o número em grande e uma legenda curta | `templates/cartao-numero.html` |
| A plataforma | Captura de um ecrã acabado do GenitecSales | `media/ecras/` (ver índice) |
| Resultados com vários valores | Gráfico de barras simples com os dados reais | `templates/grafico.html` |
| Uma opinião | Cartão com a frase-chave (não a primeira linha inteira) | `templates/cartao-frase.html` |
| História ou pessoal | Foto real do Hugo, ou foto com frase sobreposta | `media/fotos/` (ver índice) + `templates/foto-frase.html` |
| Teaser ou marco | Cartão com a data ou o marco | `templates/cartao-numero.html` com a data no lugar do número |

## Regras

- Nunca usar imagens de banco nem imagens geradas por IA de pessoas.
- Só ecrãs acabados, sem dados de teste, sem zeros, sem dados pessoais de contactos reais. Na dúvida, pedir ao Hugo.
- Se não há foto adequada no índice, não improvises: escreve o pedido em `## Pedidos ao Hugo` e usa o cartão de frase como alternativa provisória.
- Texto na imagem: no máximo 12 palavras.
- Cores da marca: fundo escuro #17181c, laranja #e8622a, claro #f2efe8.

## Como gerar

```
node scripts/render.mjs templates/cartao-numero.html '{"etiqueta":"GENITEC · DESDE 2025","numero":"15.000","legenda":"contactos trabalhados desde 2025"}' semanas/2026-W45/img/post-a.png
```

O script substitui cada `{{chave}}` do modelo pelo valor do JSON e grava o PNG. Se o Chromium do Playwright não estiver disponível, define `CHROME_PATH` com o caminho de um Chrome headless.

No `foto-frase.html`, a chave `foto` é o caminho relativo da foto a partir de `templates/` (ex.: `../media/fotos/fcup-entrada.jpg`).

## Carrosséis

Um carrossel são 2 a 10 imagens (a capa conta). Gera-se a partir de um JSON:

```
node scripts/carrossel.mjs semanas/2026-W46/carrossel-a.json semanas/2026-W46/img/carrossel-a
```

Saem três coisas na pasta: um PNG por slide (LinkedIn), um JPEG por slide (Instagram,
que só aceita JPEG) e um `carrossel.pdf` (documento do LinkedIn).

Modelo do JSON: `semanas/_modelo/carrossel.json`.

Campos:
- `etiqueta`: nome do módulo ou do tema, em maiúsculas
- `pastilha`: estado, `{"texto":"Beta fechada","estilo":"viva"}`. Estilos: vazio (laranja
  claro), `viva` (verde), `fria` (apagado)
- `titulo`: usa `<br>` para controlar a quebra e `<em>` na parte a destacar
- `fundo_capa` e `fundo` por slide: `fundo-claro`, `fundo-escuro`, `fundo-laranja`.
  Se omitires, alterna sozinho e nunca repete dois seguidos
- `palco`: HTML livre no centro do slide. Exemplos: `<p class="numerao">27%</p>`,
  uma captura de `media/ecras/`, ou um bloco de conversa
- `corpo`: 1 a 2 frases no fundo do slide

## Cores

Todas as cores estão em `templates/base.css`, no `:root`. Nenhum outro ficheiro pode ter
um hex escrito à mão. Para confirmar:

```
grep -rn "#[0-9a-fA-F]\{6\}" templates/ | grep -v base.css
```

Tem de devolver vazio.

## Fontes

O `base.css` carrega Instrument Serif, Archivo e IBM Plex Mono do Google Fonts. O render
precisa de acesso a fonts.googleapis.com e fonts.gstatic.com. Se o servidor não tiver
saída para lá, descarrega os `.woff2` para `templates/fontes/` e troca o `@import` por
regras `@font-face`. Sem isto, tudo sai em Arial e perde a identidade.

## Carrossel de referência

`templates/referencia/carrossel-referencia.html` é o padrão visual. Seis slides, seis
composições diferentes. Rende-se com `node scripts/referencia.mjs <pasta>`.

Regra que vem daqui: **num carrossel, nenhum slide repete a composição do anterior.**
A capa é tipografia sobre gradiente. Depois alternam colagem, diagrama, comparação e
conversa. O último é sempre CTA com QR.

Os quatro elementos fixos que atravessam todos os slides, e só esses:
rótulo de módulo, pastilha de estado, título em serifa, fundo sólido ou gradiente da paleta.

Fontes: Instrument Serif (títulos), Archivo (texto), Caveat (notas à mão), IBM Plex Mono.
Se o servidor não chegar ao Google Fonts, o render cai para Georgia e Arial e perde a
identidade. Descarregar os .woff2 para `templates/fontes/` resolve de vez.
