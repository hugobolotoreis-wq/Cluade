# Regras por canal

Três canais, três leitores, três linhas editoriais. Nunca o mesmo texto em dois sítios.

Distribuição semanal até o endpoint da página de empresa existir: 7 no perfil do Hugo,
2 na página da Genitec (manuais), 2 no Instagram. Total 11.
Quando a página puder ser publicada por API, passa a 5 / 4 / 2.

## Canal 1: LinkedIn pessoal do Hugo

Canal principal. As pessoas respondem a pessoas, não a logótipos.
Calendário base em `conteudo/estrategia.md`. Os posts extra ocupam sexta 08:30 e
segunda 08:30, com os tópicos menos usados nas últimas 4 semanas.

Formatos: texto com imagem (a maioria), carrossel em PDF (1 por semana, nos posts
de educação), vídeo curto quando houver.

O que distingue este canal: mostra a dúvida, o erro e o processo. É o único sítio
onde o Hugo pode escrever "não sei" e "isto correu mal".

Restrições técnicas (ver `dados/capacidades-treg.md`):
- O texto do post vai no campo `commentary` e exige escape com barra invertida nos
  caracteres ( ) [ ] { } < > @ | ~ . O escape é feito pelo Publicador, nunca pelo Redator.
- Imagem exige dois passos: `image.upload.init`, PUT dos bytes, depois o post com o URN.
- Não há agendamento na API. A hora de publicação vem das rotinas.
- O token expira a 25/12/2026. Renovar até 20/12/2026.
- O cabeçalho `LinkedIn-Version` muda a cada trimestre. Validar antes de publicar.

## Canal 2: Página da Genitec no LinkedIn

Linha editorial própria, não é eco do perfil pessoal. O leitor é o mesmo decisor,
mas aqui procura saber se a empresa é séria.

**Publicação manual.** Não existe endpoint de organização. O agente deixa o texto e a
imagem prontos em `semanas/<semana>/pacote.md`; quem publica é o Hugo.

Mistura semanal (2 posts enquanto for manual):
- 1 funcionalidade do GenitecSales: um ecrã acabado, o que resolve, em 3 linhas
- 1 alternado entre dado de mercado e bastidores da construção
Quando passar a 4, acrescentar 1 carrossel de educação e 1 dado de mercado.

Nunca testemunhos nem casos de cliente até haver autorização em `conteudo/factos.md`.

## Canal 3: Instagram da Genitec

O decisor está aqui fora do horário de trabalho, a passar o dedo. Não lê jargão de
outbound. O que funciona é o trabalho visto por fora.

2 por semana:
- 1 carrossel, o mesmo tema do carrossel do LinkedIn com o texto reduzido a metade
- 1 Reel de 30 a 45 segundos, ou um feed estático quando não houver gravação

Legenda de 40 a 80 palavras, em três blocos: gancho, "arrasta", CTA.
A primeira linha tem de funcionar sozinha. Máximo 4 hashtags, todas específicas.
Nunca links na legenda. O link vai na bio e o QR no último slide.

Diferenças obrigatórias face ao LinkedIn:
- Sem taxas de resposta nem percentagens de campanha
- Sem a palavra outbound. Prospeção sim
- O tema é o trabalho e as pessoas, não a metodologia

Restrições técnicas:
- A API só aceita JPEG e exige URL público. O `scripts/carrossel.mjs` já gera JPEG.
- Carrossel: 2 a 10 imagens. A capa conta.
- Stories: um contentor por story, sem carrossel.
- Limite da Meta: 100 publicações por API em 24 h. Um carrossel conta como uma.
- Falta ligar a credencial: `treg connections connect --provider instagram --capability post`.
  Uma ligação só de leitura devolve 403.

## Desenho dos carrosséis

Referência de ofício: Apollo.io no Instagram (não de resultado: 25 gostos com 10.374
seguidores). O que se copia:
- Título em serifa grande e centrado no terço de cima, com a etiqueta em sans por cima
- Pastilha de estado: EM CONSTRUÇÃO, BETA FECHADA, JÁ DISPONÍVEL
- Fundos sólidos alternados, nunca dois seguidos iguais
- Último slide sempre CTA com QR
- Blocos de conversa falsa em HTML para ilustrar uma ideia

O que não se copia: memes com fotografias (banco de imagens continua proibido) e o
humor de escritório americano. O tom é o de `identidade/persona-genitec.md`.
