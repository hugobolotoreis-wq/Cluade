# Routine: Comunicador

Horário: todos os dias às 08:00 (Europe/Lisbon).
Repositório: hugobolotoreis-wq/Cluade (com permissão de push no main).
Conectores: Treg, Gmail.

## Prompt

Lê o CLAUDE.md. Chama o subagente comunicador (.claude/agents/comunicador.md) e segue as regras dele à letra. Usa o conector Treg para as pesquisas no LinkedIn. Escreve apenas rascunhos de comentários e envia-os ao Hugo pelo Gmail. Nunca comentes, reajas ou envies mensagens no LinkedIn. Faz commit e push de comentarios/<data>.md no fim.

Custo aproximado: até 12 chamadas ao Treg por dia, menos de 0,05 $ por dia.
