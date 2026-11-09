# Empresa de agentes no Paperclip

Este repositório é o workspace de uma empresa de agentes do Paperclip que trata do
marketing de conteúdo do GenitecSales (nov 2026 a jan 2027).

O Paperclip faz a coordenação: heartbeats, orçamentos, tickets e aprovações. Por isso
não há Manager nem routines neste repositório.

## Missão (colar no campo de missão do Paperclip)

Levar 500 decisores B2B portugueses a inscreverem-se na lista de espera do GenitecSales
até 31 de janeiro de 2027. 11 publicações por semana: 7 no perfil de LinkedIn do Hugo
Reis, 2 na página da Genitec, 2 no Instagram. Nada é publicado sem aprovação explícita
do Hugo. Nenhum facto é inventado. Português europeu sempre.

## Agentes

| Agente | Ficheiro | Heartbeat | Orçamento |
|---|---|---|---|
| A0 Descobridor | `.claude/agents/descobridor.md` | Seg 05:30 | 400c |
| A1 Analista | `.claude/agents/analisador.md` + `scraper.md` | Ter e Qui 06:00 | 400c |
| A2 Redator | `.claude/agents/marketer.md` | Seg, Ter e Qui 06:30 | 500c |
| A3 Produtor | `.claude/agents/gerador.md` | Qua e Sex 06:00 | 200c |
| A4 Editor | `.claude/agents/revisor.md` + `publicador.md` | Diário 07:30 e 12:00 | 400c |

Teto total: 1500 cêntimos por mês. Alerta aos 70%.

## Rotina

```
Seg 05:30  A0 descobre fontes novas e atualiza listas/referencias.md
Seg 06:30  A2 planeia a semana
Ter 06:00  A1 recolhe e analisa, atualiza biblioteca/porques.md
Ter 06:30  A2 escreve
Qua 06:00  A3 produz imagens
Qui 06:00  A1 recolhe e analisa
Qui 06:30  A2 escreve
Sex 06:00  A3 produz imagens
Diário 07:30  A4 audita e entrega a fila ao Hugo
Diário 08:00  HUGO aprova ou devolve (30 a 45 min)
Diário 12:00  A4 publica o aprovado
Sex 17:00  A4 escreve relatorios/<semana>.md
```

## Governança

| Ação | Autonomia |
|---|---|
| Pesquisar, descobrir, analisar, escrever rascunhos, produzir imagens | Livre |
| Atualizar `listas/referencias.md` e `biblioteca/porques.md` | Livre |
| Publicar qualquer coisa | Aprovação explícita por peça |
| Enviar mensagem a uma pessoa real | Proibido a todos |
| Gastar acima de 2$ numa ação | Aprovação |
| Alterar o prompt de outro agente ou contratar agente novo | Aprovação |

O Hugo recebe dois tickets: a fila diária às 07:30 e o relatório de sexta às 17:00.

## Ciclo de melhoria

Sexta, 10 minutos: o Hugo escreve em `semanas/<semana>/notas.md` o que funcionou e o
que não funcionou, pelas palavras dele. Não é opcional. Sem isto os agentes produzem
sempre ao mesmo nível. O A1 lê as notas na terça e incorpora-as.

## Gancho do GitHub

Merge de PR no repositório do GenitecSales cria tarefa para o A1 com a descrição do PR.
Vira sinal do tópico "Construção em público" e segue o fluxo normal. Cada funcionalidade
que o Tomás entrega vira conteúdo sem ninguém escrever nada.

## Arranque

**Semana 1.** Contratar só A2 e A4. Objetivo único: uma peça ir de rascunho a publicada
com aprovação. Medir: foi publicada? Quantos minutos custou ao Hugo?

**Semana 2.** Entram A0, A1 e A3. Passar a 11 peças. Limpar o Instagram.
Medir: taxa de aprovação à primeira. Abaixo de 50%, o problema está no prompt do A2.

**Semana 3.** Página da lista de espera online com campo de origem.
Medir: primeiras inscrições atribuídas a conteúdo.

**Semana 4.** Se a aprovação à primeira estiver acima de 70% durante duas semanas,
soltar só o Instagram (revisão semanal em lote). O LinkedIn mantém aprovação individual
para sempre.

Rever todos os outputs nos primeiros 14 dias.

## Por confirmar antes de arrancar

- [ ] O Paperclip regista custo 0 com Claude Code por subscrição?
- [ ] O LinkedIn publica texto com imagem? Teste real com post descartável.
- [ ] O `/rest/documents` aceita o PDF do carrossel?
- [ ] O catálogo do Treg tem Community Management para publicar na página?
- [ ] O Instagram está ligado com capability post?
- [ ] Endereço final da lista de espera, para o QR e para os CTA diretos.
- [ ] O Treg chega ao Reddit e ao YouTube? Se não, a frente 2 do A0 passa a pesquisa web.
