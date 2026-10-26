# Sistema de conteúdo LinkedIn do Hugo Reis (GenitecSales)

Este repositório gera, aprova e publica os posts semanais do Hugo no LinkedIn durante o pré-lançamento do GenitecSales (novembro 2026 a janeiro 2027).

Nunca publicas nada que o Hugo não tenha aprovado. Nunca inventas factos.

## Quem é o Hugo

- Fundador da Genitec (Porto), estudante do último ano na FCUP.
- Sócio: Tomás, que desenvolve o GenitecSales.
- A Genitec fez campanhas de prospeção B2B para clientes. Desse trabalho nasceu o GenitecSales: pesquisa de empresas e decisores, campanhas LinkedIn + email, tarefas de follow-up e CRM, numa só plataforma.
- Lançamento público: fim de janeiro ou início de fevereiro de 2027. Até lá, o objetivo do conteúdo é encher a lista de espera.

## Onde está cada coisa

| Ficheiro | Para quê |
|---|---|
| `conteudo/factos.md` | Os únicos números e factos que podes afirmar sem estarem nas notas da semana |
| `conteudo/estrategia.md` | Fases, tópicos, mistura semanal |
| `conteudo/hooks.md` | Hooks provados e as versões Genitec |
| `conteudo/ctas.md` | Tipos de CTA e quando usar |
| `conteudo/imagens.md` | Regras de imagem e modelos disponíveis |
| `semanas/AAAA-Wnn/notas.md` | Notas do Hugo sobre a semana (escritas à sexta) |
| `semanas/AAAA-Wnn/pacote.md` | Os 4 posts da semana, com estado de aprovação |
| `semanas/AAAA-Wnn/img/` | Imagens dos posts |
| `media/fotos/indice.md` | Fotos reais do Hugo, com descrição de cada uma |
| `media/ecras/indice.md` | Capturas de ecrãs acabados do GenitecSales |
| `referencias/` | Posts com melhor desempenho de outros fundadores, recolhidos semanalmente |
| `metricas.md` | Desempenho de cada post publicado |
| `routines/` | Os prompts das duas Routines |

## Voz

- Português europeu, tratamento por "tu" para o leitor.
- Primeira pessoa, como o Hugo fala: direto, concreto, sem entusiasmo forçado.
- Frases curtas. No máximo 2 linhas por parágrafo. Muito espaço em branco.
- Fala de coisas que aconteceram, com números exatos, não de ideias genéricas.
- Pode admitir dúvida, erro e cansaço. Os posts de fundador que mais funcionam mostram o medo antes do plano.

## Regras de copy (obrigatórias)

1. Proibido travessão (— ou –). Usa dois pontos, vírgulas ou frases novas.
2. Proibidas palavras ocas: "inovador", "revolucionário", "all-in-one", "soluções", "sinergia", "game changer", "disruptivo".
3. Nunca nomear ferramentas de terceiros (Treg, Salesforge, Sales Navigator, Wiza, Claude, Make, Airtable, etc.).
4. Nunca nomear clientes nem mostrar resultados de clientes sem autorização registada em `conteudo/factos.md`.
5. Primeira linha com menos de 12 palavras. É a única coisa que se vê antes de "ver mais".
6. Links nunca no texto do post. Se o post precisar de link, escreve o "primeiro comentário" à parte.
7. Hashtags: no máximo 3, no fim, e só se fizerem sentido. Zero também está bem.
8. Emojis: no máximo 2 por post.
9. Antes de entregar, aplica as skills `stop-slop` e `humanizer` (em `.claude/skills/`).

## Regra de verdade (a mais importante)

Cada número, nome, data ou resultado num post tem de existir em `conteudo/factos.md` ou em `semanas/<semana>/notas.md`.

- Se precisas de um número e ele não existe: escreve `[FALTA: descrição do dado]` no texto e marca o post com ⚠️ no pacote.
- Não arredondas para cima, não extrapolas, não transformas uma estimativa em facto.
- Não prometes funcionalidades que não estão nas notas ou em `factos.md`.

## Auditoria de cada post (escrever no pacote, por baixo do post)

1. Cada facto tem fonte? (indicar ficheiro)
2. A primeira linha tem menos de 12 palavras e faz parar o scroll?
3. A imagem mostra o objeto da primeira linha?
4. Respeita todas as regras de copy?
5. O CTA é o indicado para este tópico e esta semana?

Se alguma falhar, reescreves antes de entregar.

## Publicação (só na Routine 2)

- Só publicas posts com `estado: aprovado` cuja data e hora já chegaram.
- Publicas o texto exatamente como está no bloco aprovado.
- Depois de publicar, atualizas o bloco para `estado: publicado`, com o URN e a hora real.
- Se falhar, `estado: erro`, com a mensagem, e avisas o Hugo por email.
- Nunca publicas mais do que 1 post por execução.

### Endpoints Treg

| Uso | Endpoint | Notas |
|---|---|---|
| Publicar no perfil do Hugo | `linkedin.linkedin.user.post.create` | POST. Corpo: `author` (URN do Hugo, já guardado na ligação), `commentary`, `visibility: "PUBLIC"`, `distribution: {"feedDistribution":"MAIN_FEED","targetEntities":[],"thirdPartyDistributionChannels":[]}`, `lifecycleState: "PUBLISHED"`. Cabeçalhos obrigatórios: `LinkedIn-Version: <AAAAMM>` (o LinkedIn retira versões a cada trimestre: usar uma versão atual) e `X-Restli-Protocol-Version: 2.0.0`. Em `commentary`, escapar com barra invertida os caracteres ( ) [ ] { } < > @ \| ~. Sucesso = HTTP 201, URN no cabeçalho `x-restli-id`. |
| Imagem no post | A CONFIRMAR | O endpoint acima só publica texto. O LinkedIn exige carregar a imagem primeiro (`/rest/images?action=initializeUpload`). Enquanto isto não estiver confirmado, ver "Modo manual" abaixo. |
| Métricas de um post | `treg.linkedin.post.detail` | Usar 48 horas depois de publicar. |
| Posts de referência | `fetchinio.linkedin.user.posts` | `profileUrlOrUrn`, `count` até 50. Filtrar partilhas (`resharedPostUrn`). |

Antes de qualquer chamada, consulta `treg catalog get <endpoint>` para confirmar parâmetros e preço.

### Modo manual (enquanto a imagem não publica pela API)

Na hora marcada, em vez de publicar, envia ao Hugo um email com o assunto `Publicar agora: <primeira linha>`, o texto final, a imagem em anexo e o primeiro comentário. Marca o post como `estado: enviado-para-publicacao-manual`.

### Primeiro comentário

O Treg ainda não tem endpoint para comentar. Quando um post tiver primeiro comentário, inclui-o no email de confirmação da publicação para o Hugo o colocar à mão.

## Pedidos ao Hugo

Se precisares de algo que não tens (uma foto, um ecrã, um número), não inventes nem substituas por imagem genérica. Escreve no pacote, na secção `## Pedidos ao Hugo`, exatamente o que precisas e para que post. Exemplo:

> Foto tua na FCUP, ao ar livre, para o post 3 (história de origem). Se não tiveres, uso o cartão com a frase.
