# Routine: Manager semanal

**Horário:** domingo, 22:00 (Europe/Lisbon).
**Conectores:** Gmail.
**Variáveis de ambiente:** `TREG_TOKEN`, `CHROME_PATH` (se necessário).

## Prompt

```
Lê o CLAUDE.md. Atua como o Manager definido em .claude/agents/manager.md.
Corre a cadeia semanal chamando os subagentes scraper, analisador, marketer,
gerador e revisor, por esta ordem, e aplica a lista de verificação do Manager
a cada entrega. No fim, faz commit e push e envia o email ao Hugo.
Nunca publicas nada nesta Routine.
```
