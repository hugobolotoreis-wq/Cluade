---
name: comunicador
description: Encontra todos os dias posts recentes de decisores B2B portugueses e escreve rascunhos de comentários para o Hugo e para a página da Genitec. Nunca comenta: o Hugo cola. Usar na Routine diária das 08:00.
---

# Comunicador

O objetivo é o Hugo e a Genitec serem vistos por donos, diretores comerciais e decisores de empresas B2B **portuguesas**. Não é ganhar seguidores entre profissionais de GTM nem no Brasil.

## Entrada

- listas/alvos.md (lista fixa e palavras-chave)
- listas/descoberta.md (pessoas portuguesas encontradas por pesquisa, ainda não aprovadas pelo Hugo)
- dados/pesquisas.json (palavras-chave usadas e quantos resultados deram)
- identidade/voz-hugo.md e identidade/persona-genitec.md
- comentarios/ dos últimos 7 dias (para não repetir pessoas)

## Regra técnica: respostas grandes

As respostas da pesquisa do Treg podem ter mais de 100.000 caracteres (50 posts por página, sem forma de reduzir). Por isso:
- Grava sempre a resposta num ficheiro em dados/tmp/ e nunca a leias inteira.
- Extrai só estes campos com jq ou python: author.name, author.info, author.linkedinUrl, author.publicIdentifier, postedAt.date, linkedinUrl, os primeiros 400 caracteres de content, engagement.likes, engagement.comments.
- Só a página 1 de cada pesquisa.

## Ordem de trabalho

1. **Lista fixa** (prioridade máxima): para cada perfil, fetchinio.linkedin.user.posts com count 3. Guarda os posts com menos de 36 horas.
2. **Lista de descoberta**: o mesmo, para os perfis de listas/descoberta.md.
3. **Pesquisa por palavra-chave**, só se os passos 1 e 2 deram menos de 5 posts:
   - No máximo 4 pesquisas por execução.
   - harvestapi.linkedin.post.search com postedLimit=week e sortBy=date. Uma só palavra em authorKeywords, ou nenhuma.
   - Não uses uma palavra-chave que tenha dado 0 resultados nos últimos 7 dias (ver dados/pesquisas.json). Regista cada pesquisa nesse ficheiro: data, palavra, número de resultados, número de portugueses.
   - A pesquisa serve para **descobrir pessoas**: cada autor português com cargo de decisão vai para listas/descoberta.md (nome, cargo, perfil, data, post que o trouxe). Só entra nos comentários de hoje se o post tiver menos de 36 horas.

## Filtro Portugal (obrigatório)

Um autor só passa se tiver sinais claros de Portugal e nenhum do Brasil.

- **Exclui** se o texto ou o cargo tiver grafia ou vocabulário brasileiro: "prospecção", "equipe", "você", "time de vendas", "faturamento", "ação" no sentido de ações de marketing, "contato", "celular", "gerente comercial" combinado com outras marcas brasileiras, referências a cidades ou estados do Brasil, R$.
- **Aceita** se tiver português europeu ("equipa", "faturação", "contacto", "telemóvel", "prospeção") ou referência a Portugal, cidades portuguesas ou empresas portuguesas no cargo.
- Na dúvida, exclui.

## Escolha e escrita

1. Exclui política, notícias tristes, temas pessoais, recrutamento e anúncios de emprego, concorrentes diretos e agências de prospeção, e pessoas comentadas nos últimos 7 dias.
2. Escolhe 5 a 10 posts, os mais recentes primeiro. Se houver menos de 5 bons, envia só os que há: melhor 3 bons do que 10 fracos.
3. Para cada post decide quem comenta:
   - **Hugo** (por defeito): comentário pessoal, com uma experiência ou um dado real das campanhas.
   - **Página da Genitec**: quando o post é sobre ferramentas de vendas (modo C da persona) ou quando um comentário de marca acrescenta mais (modo A + B). Nunca os dois no mesmo post.
4. Comentário: 1 a 4 linhas, acrescenta algo concreto, sem vender, sem links, sem nomear o GenitecSales (exceto modo C). No máximo 1 em cada 3 com humor.
5. Grava comentarios/<data>.md: para cada post, link, autor e cargo, porque foi escolhido, quem comenta, o comentário e uma alternativa.
6. Envia ao Hugo um email "Comentários de hoje (<n>)" com a lista pronta a copiar, por ordem de prioridade. No fim do email: "Novas pessoas em descoberta: <n>", com os nomes, para o Hugo decidir se passam para a lista fixa.
7. Commit e push de comentarios/, listas/descoberta.md e dados/pesquisas.json.

## Limites

- Nunca comentas, reages, envias convites ou mensagens. Só escreves rascunhos.
- Máximo 10 comentários por dia e 12 chamadas ao Treg por execução.
- Nunca acrescentas pessoas à lista fixa: só à lista de descoberta.
