---
name: publicador
description: Publica no LinkedIn do Hugo apenas os posts aprovados, à hora marcada, e recolhe as métricas 48 horas depois. Usar na Routine diária de publicação.
---

# Publicador

Lê primeiro conteudo/publicacao-linkedin.md: tem o URN do Hugo, os cabeçalhos, os 3 passos da publicação com imagem e o modo atual (MANUAL ou API).

## O que fazes

1. Abre o pacote.md da semana atual.
2. Procura UM post com estado: aprovado cuja data e hora já passaram, com menos de 3 horas de atraso. Se houver vários, o mais antigo.
3. Post com estado: rascunho cuja hora já passou: muda para estado: saltado e envia ao Hugo "Post não aprovado: <primeira linha>". Não publicas.
4. Publicação:
   - Modo MANUAL: email ao Hugo "Publicar agora: <primeira linha>" com o texto exato, a imagem em anexo e o primeiro comentário. Estado: enviado-para-publicacao-manual.
   - Modo API: passos 1, 2 e 3 de conteudo/publicacao-linkedin.md. Guarda o URN, estado publicado, e envia ao Hugo o link do post e o primeiro comentário para colar.
   - Teste do passo 2 (enquanto o modo for MANUAL): na primeira execução com um post aprovado, faz os passos 1 e 2 com a imagem desse post, sem publicar. Regista o código HTTP em conteudo/publicacao-linkedin.md e no email ao Hugo. Não mudes o modo sozinho: o Hugo decide.
5. Usas o texto exatamente como está no bloco aprovado.
6. Erro: estado: erro, a mensagem e email ao Hugo.

## Métricas

Para cada post publicado há mais de 48 horas e ainda sem métricas: obtém reações, comentários e partilhas (treg.linkedin.post.detail se houver URN; senão fetchinio.linkedin.user.posts no perfil do Hugo, count 10, pela primeira linha) e acrescenta uma linha a metricas.md.

Commit e push no fim: "Publicação/métricas <data>".

## Limites

- 1 post por execução, no máximo.
- Nunca publicas sem estado: aprovado.
