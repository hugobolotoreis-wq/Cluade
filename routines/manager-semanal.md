# Routine: Manager semanal

Horário: domingo, 22:00 (Europe/Lisbon).
Repositório: hugobolotoreis-wq/Cluade (com permissão de push no main).
Conectores: Treg, Gmail.
Ambiente: acesso de rede a registry.npmjs.org e ao download do Chromium do Playwright (para gerar imagens).

## Prompt

Lê o CLAUDE.md. Atua como o Manager definido em .claude/agents/manager.md. Corre a cadeia semanal chamando os subagentes scraper, analisador, marketer, gerador e revisor, por esta ordem, e aplica a lista de verificação do Manager a cada entrega. Usa o conector Treg para todas as chamadas ao LinkedIn. No fim, faz commit e push e envia o email ao Hugo pelo Gmail. Nunca publicas nada nesta Routine.
