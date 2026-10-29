# Routine: Comunicador

**Horário:** todos os dias às 08:00 (Europe/Lisbon).
**Conectores:** Gmail.
**Variáveis de ambiente:** `TREG_TOKEN`.

## Prompt

```
Lê o CLAUDE.md. Chama o subagente comunicador (.claude/agents/comunicador.md)
e segue as regras dele à letra. Escreve apenas rascunhos de comentários e
envia-os ao Hugo por email. Nunca comentes, reajas ou envies mensagens no
LinkedIn. Faz commit e push de comentarios/<data>.md no fim.
```

**Custo aproximado:** até 12 chamadas ao Treg por dia, menos de 0,05 $ por dia.
