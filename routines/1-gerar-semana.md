# Routine 1: gerar os posts da semana

**Horário:** domingo, 22:00 (Europe/Lisbon), todas as semanas.
**Repositório:** este.
**Conectores:** Gmail (envio do pacote ao Hugo).
**Variáveis de ambiente:** `TREG_TOKEN`, `CHROME_PATH` (se necessário).

## Prompt (copiar para a Routine)

```
Lê o CLAUDE.md e todos os ficheiros em conteudo/. Segue-os à letra.

1. SEMANA
   - Calcula a semana que começa amanhã (segunda-feira), no formato AAAA-Wnn (ISO).
   - Pasta: semanas/<semana>/. Se notas.md não existir lá, procura a nota mais recente
     em semanas/ e usa-a, mas marca TODOS os posts com ⚠️ "sem notas novas".
   - Determina a fase pela data (ver conteudo/estrategia.md).

2. REFERÊNCIAS (máximo 6 chamadas ao Treg)
   - Para cada perfil em referencias/perfis.md, pede os posts mais recentes com
     fetchinio.linkedin.user.posts (count 20). Ignora partilhas.
   - Guarda em referencias/<semana>.md os 3 posts com mais (reações + comentários)
     publicados nos últimos 7 dias: primeira linha, formato, reações, comentários.
   - Usa-os só como inspiração de formato e estrutura. Nunca copies frases.

3. MATÉRIA-PRIMA
   - notas.md da semana (fonte principal).
   - conteudo/factos.md.
   - Se existir o ficheiro changelog.md na pasta da semana, usa-o para o post de
     construção em público.
   - metricas.md: evita hooks usados nas últimas 4 semanas; favorece os tópicos
     com melhor desempenho.

4. ESCREVER OS 4 POSTS
   - Segue a mistura semanal de conteudo/estrategia.md (slots A, B, C, D com dia e hora).
   - Para cada post: 2 alternativas de primeira linha (hook A e hook B), texto completo
     com o hook A, CTA de conteudo/ctas.md, e primeiro comentário se houver link.
   - Aplica as skills stop-slop e humanizer.
   - Faz a auditoria do CLAUDE.md e escreve-a por baixo de cada post.

5. IMAGENS
   - Escolhe o tipo de imagem pela primeira linha (conteudo/imagens.md).
   - Gera com: node scripts/render.mjs <modelo> '<json>' semanas/<semana>/img/post-<slot>.png
   - Fotos: só de media/fotos/indice.md. Ecrãs: só de media/ecras/indice.md.
   - Se faltar foto ou ecrã adequado, escreve o pedido em "## Pedidos ao Hugo" e usa
     o cartão de frase como alternativa provisória.
   - Abre cada PNG gerado e confirma que o texto cabe e se lê bem.

6. PACOTE
   - Escreve semanas/<semana>/pacote.md no formato de semanas/_modelo/pacote.md.
   - Todos os posts com estado: rascunho.
   - Faz commit e push com a mensagem "Pacote da semana <semana>".

7. ENVIAR AO HUGO
   - Envia um email para hugobolotoreis@gmail.com com o assunto
     "Posts da semana <semana>: aprovar até segunda 12:00".
   - Corpo: os 4 posts (dia, hora, hook A, hook B, texto, CTA), os pedidos ao Hugo,
     e instruções curtas: "Para aprovar, edita pacote.md e muda estado: rascunho
     para estado: aprovado. Podes trocar o hook e editar o texto antes de aprovar."
   - Anexa as 4 imagens.

Nunca publiques nada nesta Routine.
```
