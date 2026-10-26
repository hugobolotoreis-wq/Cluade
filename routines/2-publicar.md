# Routine 2: publicar posts aprovados e recolher métricas

**Horário:** todos os dias às 08:30 e às 12:30 (Europe/Lisbon).
**Repositório:** este.
**Conectores:** Gmail.
**Variáveis de ambiente:** `TREG_TOKEN`.
**Requisito:** a conta do LinkedIn do Hugo ligada ao Treg (o endpoint de publicação usa a conta do próprio).

## Prompt (copiar para a Routine)

```
Lê o CLAUDE.md, secção "Publicação". Segue-a à letra.

1. ENCONTRAR O POST
   - Abre o pacote.md da semana atual (semanas/AAAA-Wnn/).
   - Procura UM post com estado: aprovado cuja data e hora já passaram e que tenha
     menos de 3 horas de atraso. Se houver mais de um, publica o mais antigo e deixa
     os outros para a execução seguinte.
   - Se não houver nenhum, salta para o passo 4.
   - Se encontrares um post com estado: rascunho cuja hora já passou, não publiques:
     muda para estado: saltado e envia ao Hugo um email "Post não aprovado: <primeira linha>".

2. PUBLICAR
   - Modo API (só se o carregamento de imagens pelo Treg estiver confirmado em
     CLAUDE.md): carrega a imagem, publica com linkedin.linkedin.user.post.create,
     guarda o URN.
   - Modo manual (por defeito, enquanto a imagem não estiver confirmada): envia ao
     Hugo um email com o assunto "Publicar agora: <primeira linha>", o texto exato,
     a imagem em anexo e o primeiro comentário. Estado: enviado-para-publicacao-manual.
   - Usa o texto exatamente como está no bloco aprovado. Não corrijas nada.

3. REGISTAR
   - Atualiza o bloco no pacote.md: estado, hora real, URN (se houver).
   - Se publicaste pela API e o post tem primeiro comentário, envia ao Hugo um email
     "Publicado: <primeira linha>" com o link do post e o comentário para colar.
   - Em caso de erro: estado: erro, a mensagem de erro, e email ao Hugo.

4. MÉTRICAS
   - Para cada post publicado há mais de 48 horas sem métricas em metricas.md:
     se tiver URN, chama treg.linkedin.post.detail e regista reações, comentários e
     partilhas. Se foi publicado à mão, procura o post com fetchinio.linkedin.user.posts
     (perfil do Hugo, count 10) pela primeira linha.
   - Acrescenta uma linha a metricas.md: semana, slot, tópico, hook, tipo de imagem,
     CTA, reações, comentários, partilhas.

5. Commit e push com a mensagem "Publicação/métricas <data>".

Nunca publiques mais de 1 post por execução. Nunca publiques um post que não esteja
com estado: aprovado.
```
