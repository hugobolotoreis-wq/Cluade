# Routine: Publicador

**Horário:** todos os dias às 08:30 e às 12:30 (Europe/Lisbon).
**Conectores:** Gmail.
**Variáveis de ambiente:** `TREG_TOKEN`.
**Requisito:** conta do LinkedIn do Hugo ligada ao Treg.

## Prompt

```
Lê o CLAUDE.md. Chama o subagente publicador (.claude/agents/publicador.md)
e segue as regras dele à letra. No máximo 1 post por execução. Nunca publiques
um post que não esteja com estado: aprovado.
```
