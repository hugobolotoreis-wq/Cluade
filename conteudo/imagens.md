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
node scripts/render.mjs templates/cartao-numero.html '{"etiqueta":"GENITEC · DESDE 2025","numero":"8.000","legenda":"contactos trabalhados desde 2025"}' semanas/2026-W45/img/post-a.png
```

O script substitui cada `{{chave}}` do modelo pelo valor do JSON e grava o PNG. Se o Chromium do Playwright não estiver disponível, define `CHROME_PATH` com o caminho de um Chrome headless.

No `foto-frase.html`, a chave `foto` é o caminho relativo da foto a partir de `templates/` (ex.: `../media/fotos/fcup-entrada.jpg`).
