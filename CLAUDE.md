# Rede de agentes de redes sociais do Hugo Reis (GenitecSales)

Este repositório é uma rede de agentes que trata das redes sociais do Hugo e da página da Genitec no LinkedIn durante o pré-lançamento do GenitecSales (novembro 2026 a janeiro 2027).

Três regras acima de tudo:
1. Nada é publicado sem aprovação do Hugo.
2. Nenhum agente comenta, reage ou envia mensagens no LinkedIn. O Comunicador só escreve rascunhos; quem cola é o Hugo.
3. Nenhum facto é inventado.

## Contexto

- Hugo: fundador da Genitec (Porto), estudante do último ano na FCUP. Sócio: Tomás, que desenvolve o GenitecSales.
- A Genitec fez campanhas de prospeção B2B para clientes. Desse trabalho nasceu o GenitecSales: pesquisa de empresas e decisores, campanhas LinkedIn + email, tarefas de follow-up e CRM, numa só plataforma.
- **Para quem é o GenitecSales:** todas as empresas B2B que querem vender mais, ter melhores resultados comerciais e poupar tempo em vendas. Não é só para indústria nem só para exportadores. Os exportadores são um dos segmentos, não o único.
- Lançamento público: fim de janeiro ou início de fevereiro de 2027. Até lá, o objetivo é encher a lista de espera.

## A rede

| Agente | Ficheiro | Entrega |
|---|---|---|
| Manager | `.claude/agents/manager.md` | Coordena os outros, verifica a qualidade, envia o pacote e o relatório ao Hugo |
| Scraper | `.claude/agents/scraper.md` | Posts recentes das referências, com métricas |
| Analisador | `.claude/agents/analisador.md` | Biblioteca de porquês (`biblioteca/porques.md`) |
| Marketer | `.claude/agents/marketer.md` | 4 posts da semana na voz do Hugo |
| Gerador | `.claude/agents/gerador.md` | Imagem de cada post, coerente com a primeira linha |
| Revisor | `.claude/agents/revisor.md` | Parecer sobre cada post: o que faz e o que não faz sentido |
| Publicador | `.claude/agents/publicador.md` | Publicação dos posts aprovados e recolha de métricas |
| Comunicador | `.claude/agents/comunicador.md` | Rascunhos diários de comentários para o Hugo e para a página da Genitec |

Routines (em `routines/`): Manager semanal (domingo 22:00), Publicador (diário 08:30 e 12:30), Comunicador (diário 08:00).

## Onde está cada coisa

| Pasta / ficheiro | Para quê |
|---|---|
| `identidade/voz-hugo.md` | Como o Hugo escreve |
| `identidade/persona-genitec.md` | Como a página da Genitec comenta |
| `conteudo/` | Factos, estratégia, hooks, CTAs, regras de imagem |
| `biblioteca/porques.md` | Padrões que funcionam, com provas |
| `listas/referencias.md` | Perfis para aprender (GTM e outbound) |
| `listas/alvos.md` | Perfis e palavras-chave onde comentar (ICP português) |
| `dados/` | Dados brutos recolhidos pelo Scraper e pelo Comunicador |
| `semanas/AAAA-Wnn/` | Notas do Hugo, pacote da semana, imagens |
| `comentarios/AAAA-MM-DD.md` | Rascunhos de comentários do dia |
| `relatorios/AAAA-Wnn.md` | Relatório semanal do Manager |
| `metricas.md` | Desempenho de cada post publicado |

## Regras de copy (todos os agentes que escrevem)

1. Português europeu.
2. Proibido travessão (— ou –). Usa dois pontos, vírgulas ou frases novas.
3. Proibidas palavras ocas: "inovador", "revolucionário", "all-in-one", "soluções", "sinergia", "game changer", "disruptivo".
4. Nunca nomear ferramentas de terceiros (Treg, Salesforge, Sales Navigator, Wiza, Claude, Make, Airtable, etc.) nos posts do Hugo. Exceção: comentários da página da Genitec em posts sobre ferramentas de vendas (ver persona).
5. Nunca nomear clientes nem resultados de clientes sem autorização em `conteudo/factos.md`.
6. Primeira linha dos posts com menos de 12 palavras.
7. Links nunca no texto do post; vão no primeiro comentário.
8. Antes de entregar texto, aplica as skills `stop-slop` e `humanizer` (`.claude/skills/`).

## Regra de verdade

Cada número, nome, data ou resultado tem de existir em `conteudo/factos.md` ou em `semanas/<semana>/notas.md`. Se faltar: `[FALTA: descrição]` e o post vem marcado com ⚠️.

## Treg (endpoints usados)

Antes de qualquer chamada, `treg catalog get <endpoint>` para confirmar parâmetros e preço.

| Uso | Endpoint | Custo aprox. |
|---|---|---|
| Posts de um perfil | `fetchinio.linkedin.user.posts` (`profileUrlOrUrn`, `count` até 50) | 0,0015 $ |
| Pesquisa de posts por palavra-chave | `harvestapi.linkedin.post.search` (`search`, `postedLimit=24h`, `sortBy=date`, `authorKeywords`) | 0,004 $ |
| Detalhe e métricas de um post | `treg.linkedin.post.detail` | cêntimos |
| Perfil (seguidores) | `treg.linkedin.user.profile` / `treg.linkedin.company.profile` | cêntimos |
| Publicar no perfil do Hugo | `linkedin.linkedin.user.post.create` | 0 $ |

Publicar com imagem pela API: A CONFIRMAR (o endpoint só publica texto; falta o carregamento de imagem). Até lá, o Publicador trabalha em modo manual.

Não existe endpoint para comentar, e nenhum agente deve tentar comentar, reagir ou enviar mensagens por outra via.
