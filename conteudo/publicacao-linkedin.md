# Publicação no LinkedIn pelo Treg

Testado em 2026-10-29 a partir do claude.ai.

## Dados da conta

- Conta ligada no Treg: ferramenta linkedin (base https://api.linkedin.com), equipa Genitec.
- URN do Hugo (author): urn:li:person:bWeb9H8TYj
- Cabeçalhos em todas as chamadas /rest/: LinkedIn-Version 202609 e X-Restli-Protocol-Version 2.0.0. Se der erro de versão, usar o mês mais recente (AAAAMM).

## Publicar com imagem (3 passos)

1. Pedir espaço para a imagem (TESTADO, funciona)
   - Chamada à ferramenta própria no Treg: linkedin/rest/images?action=initializeUpload, POST
   - Corpo: initializeUploadRequest.owner = urn:li:person:bWeb9H8TYj
   - Resposta: value.uploadUrl e value.image (urn:li:image:...)

2. Enviar o ficheiro (POR TESTAR)
   - PUT do PNG para uploadUrl (em www.linkedin.com, fora da base da ferramenta no Treg).
   - Primeiro teste: curl -i -X PUT --upload-file img.png com o uploadUrl, sem autenticação.
   - 201: passo resolvido, registar aqui.
   - 401: o LinkedIn exige o token; perguntar ao Treg como enviar para um URL absoluto com a conta ligada (pedido no catálogo, id 1753). Até lá, modo manual.

3. Publicar o post: linkedin.linkedin.user.post.create, POST, mesmos cabeçalhos
   - author: urn:li:person:bWeb9H8TYj
   - commentary: texto do post, com os caracteres ( ) [ ] { } < > @ | ~ escapados com barra invertida
   - visibility: PUBLIC
   - distribution: feedDistribution MAIN_FEED, targetEntities e thirdPartyDistributionChannels vazios
   - content.media.id: o urn:li:image do passo 1; content.media.altText: descrição curta
   - lifecycleState: PUBLISHED
   - Sucesso: HTTP 201, URN do post no cabeçalho x-restli-id.

## Estado do modo de publicação

- Modo atual: MANUAL (até o passo 2 estar testado).
- Quando o passo 2 funcionar, mudar esta linha para "Modo atual: API".
