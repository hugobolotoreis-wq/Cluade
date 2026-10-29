# Rede de agentes de redes sociais GenitecSales

8 agentes que tratam do LinkedIn do Hugo e da página da Genitec: recolhem referências, aprendem o que funciona, escrevem, geram imagens, revêem, publicam o que o Hugo aprovar e preparam comentários diários. Detalhes em `CLAUDE.md`.

## A semana com o sistema a funcionar

| Quando | Quem | O quê |
|---|---|---|
| Todos os dias, 08:00 | Comunicador | Email com 5 a 10 comentários prontos (Hugo e página da Genitec). O Hugo cola os que fazem sentido |
| Sexta | Hugo | Escreve `semanas/<semana>/notas.md` (10 min) |
| Domingo, 22:00 | Manager + scraper, analisador, marketer, gerador, revisor | Pacote com 4 posts, imagens e parecer do revisor, mais o relatório da semana, por email |
| Segunda, até 12:00 | Hugo | Aprova no `pacote.md` (`estado: aprovado`) |
| Seg 12:30, Ter/Qua/Qui 08:30 | Publicador | Publica (ou envia para publicação manual) o post aprovado e recolhe métricas 48 h depois |

No máximo 4 execuções de Routines por dia.

## Instalação

1. **Repositório:** falta copiar a skill `humanizer` (pasta `.claude/skills/humanizer/` do genitec-conteudo.zip). Testar as imagens: `npm install`, `npx playwright install chromium`, `node scripts/render.mjs templates/cartao-numero.html '{"etiqueta":"TESTE","numero":"8.000","legenda":"contactos trabalhados"}' teste.png`.
2. **Treg:** ligar a conta do LinkedIn do Hugo; criar o token `TREG_TOKEN`; testar o carregamento de imagens para o LinkedIn. Se funcionar, atualizar o CLAUDE.md e o Publicador passa a modo API.
3. **Routines (Claude Code):** criar as 3 Routines com os prompts de `routines/` (manager-semanal, publicador, comunicador), com o conector do Gmail e acesso de escrita ao repositório.
4. **Preencher:** `listas/referencias.md` (perfil do Hugo), `listas/alvos.md` (primeiros perfis fixos), `semanas/2026-W45/notas.md`, fotos em `media/fotos/` e ecrãs em `media/ecras/`.
5. **Testar:** correr cada Routine à mão uma vez antes de as ligar ao horário.

## O que só o Hugo edita

- `conteudo/factos.md`
- `semanas/<semana>/notas.md`
- `listas/alvos.md` (lista fixa)
- O estado de aprovação em `pacote.md`

## Regras que não mudam

- Nada é publicado sem `estado: aprovado`.
- Nenhum agente comenta, reage ou envia mensagens no LinkedIn.
- Nenhum número é inventado.
