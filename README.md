# Conteúdo LinkedIn GenitecSales: instalação

Sistema que escreve os 4 posts semanais do Hugo, envia-os para aprovação e publica só os aprovados.

## Como funciona

| Quando | O quê |
|---|---|
| Sexta (revisão semanal) | O Hugo escreve `semanas/<semana>/notas.md` (10 min) |
| Domingo 22:00 | Routine 1 gera os 4 posts + imagens, faz commit e envia por email |
| Segunda até 12:00 | O Hugo edita `pacote.md` e muda `estado: rascunho` para `estado: aprovado` |
| Seg 12:30, Ter/Qua/Qui 08:30 | Routine 2 publica o post aprovado desse momento |
| 48 h depois | Routine 2 regista as métricas em `metricas.md` |

## Instalação (sábado, bloco Sistemas: Hugo + Tomás)

1. **Repositório**
   - Este repositório já tem os ficheiros. Falta a skill `humanizer`: copiar a pasta `.claude/skills/humanizer/` do ficheiro genitec-conteudo.zip para aqui.
   - Testar localmente: `npm install`, `npx playwright install chromium`, e depois
     `node scripts/render.mjs templates/cartao-numero.html '{"etiqueta":"TESTE","numero":"8.000","legenda":"contactos trabalhados"}' teste.png`

2. **Treg**
   - Ligar a conta do LinkedIn do Hugo ao Treg (necessário para publicar no perfil dele).
   - Criar um token do Treg para as Routines e guardá-lo como variável de ambiente `TREG_TOKEN`.
   - Confirmar com o Treg se é possível carregar imagens para o LinkedIn
     (`/rest/images?action=initializeUpload`) através da conta ligada.
     Se sim: atualizar a linha "Imagem no post" no `CLAUDE.md` e passar a Routine 2 para o modo API.
     Até lá, a Routine 2 trabalha em modo manual (envia ao Hugo o post pronto à hora marcada).

3. **Routines (Claude Code)**
   - Criar a Routine 1 com o prompt de `routines/1-gerar-semana.md`, horário semanal ao domingo às 22:00.
   - Criar a Routine 2 com o prompt de `routines/2-publicar.md`, horário diário às 08:30 e às 12:30.
   - Ligar o conector do Gmail às duas.
   - Dar acesso de escrita ao repositório (commit e push).
   - O plano Pro tem limite de execuções diárias: este sistema usa no máximo 3 por dia.

4. **Primeiro teste**
   - Preencher `semanas/2026-W45/notas.md` com os dados reais.
   - Pôr fotos em `media/fotos/` e ecrãs em `media/ecras/`, e atualizar os índices.
   - Correr a Routine 1 à mão. Rever o pacote em conjunto e afinar `CLAUDE.md` se o tom não estiver certo.
   - Aprovar um post de teste com hora 5 minutos à frente e correr a Routine 2 à mão.

## O que só o Hugo edita

- `conteudo/factos.md` (os únicos números que se podem afirmar)
- `semanas/<semana>/notas.md`
- o estado de aprovação em `pacote.md`

## Regras que não mudam

- Nada é publicado sem `estado: aprovado`.
- Nenhum número é inventado: se falta, aparece `[FALTA: ...]` e o post vem marcado com ⚠️.
- Os comentários respondem-se à mão, no próprio dia.
