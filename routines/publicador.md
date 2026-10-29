# Routine: Publicador

Horário: todos os dias às 08:30 e às 12:30 (Europe/Lisbon).
Repositório: hugobolotoreis-wq/Cluade (com permissão de push no main).
Conectores: Treg, Gmail.
Ambiente: acesso de rede a www.linkedin.com (envio da imagem, passo 2).

## Prompt

Lê o CLAUDE.md e conteudo/publicacao-linkedin.md. Chama o subagente publicador (.claude/agents/publicador.md) e segue as regras dele à letra. Usa o conector Treg para as chamadas ao LinkedIn e o Gmail para os emails. No máximo 1 post por execução. Nunca publiques um post que não esteja com estado: aprovado.
