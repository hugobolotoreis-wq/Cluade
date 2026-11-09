// Gera um carrossel: um PNG e um JPEG por slide, mais um PDF de varias paginas.
// PNG para o LinkedIn, JPEG para o Instagram (a API so aceita JPEG),
// PDF para publicar como documento no LinkedIn.
//
// Uso: node scripts/carrossel.mjs <dados.json> <pasta-de-saida>
// Requer: npm i playwright
// Se o Chromium do Playwright nao estiver instalado, define CHROME_PATH.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { chromium } from 'playwright';

const [ficheiro, pasta] = process.argv.slice(2);
if (!ficheiro || !pasta) {
  console.error('Uso: node scripts/carrossel.mjs <dados.json> <pasta-de-saida>');
  process.exit(1);
}

const L = 1080, A = 1350;
const FUNDOS = ['fundo-claro', 'fundo-escuro', 'fundo-laranja'];
const d = JSON.parse(readFileSync(ficheiro, 'utf8'));
if (!Array.isArray(d.slides) || d.slides.length < 1) {
  console.error('O JSON precisa de pelo menos um slide.');
  process.exit(1);
}
if (d.slides.length + 1 > 10) {
  console.error('O Instagram aceita no maximo 10 imagens por carrossel. Tens ' + (d.slides.length + 1) + '.');
  process.exit(1);
}
const total = 1 + d.slides.length;

const pastilha = p => p ? `<span class="pastilha ${p.estilo ?? ''}">${p.texto}</span>` : '';
const preencher = (modelo, valores) => {
  let html = readFileSync(resolve('templates', modelo), 'utf8');
  for (const [k, v] of Object.entries(valores)) html = html.replaceAll(`{{${k}}}`, v ?? '');
  return html.replace(/\{\{[a-z_]+\}\}/g, '');
};

const paginas = [
  preencher('carrossel-capa.html', {
    fundo: d.fundo_capa ?? 'fundo-escuro',
    etiqueta: d.etiqueta,
    pastilha_bloco: pastilha(d.pastilha),
    titulo: d.titulo,
    chamada: d.chamada ?? 'Arrasta'
  }),
  ...d.slides.map((s, i) => preencher('carrossel-slide.html', {
    fundo: s.fundo ?? FUNDOS[i % FUNDOS.length],
    etiqueta: s.etiqueta ?? d.etiqueta,
    pastilha_bloco: pastilha(s.pastilha),
    indice: `${i + 2}/${total}`,
    titulo: s.titulo,
    palco: s.palco ?? '',
    corpo: s.corpo ?? ''
  }))
];

mkdirSync(pasta, { recursive: true });
const navegador = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}
);
const pagina = await navegador.newPage({ viewport: { width: L, height: A } });

for (let i = 0; i < paginas.length; i++) {
  const tmp = resolve('templates', `_tmp_${i}.html`);
  writeFileSync(tmp, paginas[i]);
  await pagina.goto('file://' + tmp);
  await pagina.evaluate(() => document.fonts.ready);
  const nome = `slide-${String(i + 1).padStart(2, '0')}`;
  await pagina.screenshot({ path: join(pasta, `${nome}.png`) });
  await pagina.screenshot({ path: join(pasta, `${nome}.jpg`), type: 'jpeg', quality: 92 });
  rmSync(tmp);
}

// PDF de varias paginas para publicar como documento no LinkedIn
const corpo = h => h
  .replace(/^[\s\S]*<body([^>]*)>/, '<div$1 data-pagina>')
  .replace(/<\/body>[\s\S]*$/, '</div>');
const estilos = paginas.map(p => p.match(/<style>[\s\S]*?<\/style>/)?.[0] ?? '').join('');
const tmpPdf = resolve('templates', '_tmp_pdf.html');
writeFileSync(tmpPdf, `<!doctype html><html lang="pt"><head><meta charset="utf-8">
<link rel="stylesheet" href="base.css">${estilos}
<style>
html,body{height:auto;width:auto}
body{display:block;padding:0;background:none}
div[data-pagina]{width:${L}px;height:${A}px;page-break-after:always;
  background:var(--papel);color:var(--tinta);font-family:var(--fonte);
  display:flex;flex-direction:column;justify-content:space-between;
  padding:96px 88px;position:relative;overflow:hidden}
div[data-pagina]:last-child{page-break-after:auto}
</style></head><body>${paginas.map(corpo).join('')}</body></html>`);
await pagina.goto('file://' + tmpPdf);
await pagina.evaluate(() => document.fonts.ready);
await pagina.pdf({
  path: join(pasta, 'carrossel.pdf'),
  width: `${L}px`, height: `${A}px`,
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' }
});
rmSync(tmpPdf);

await navegador.close();
console.log(`${paginas.length} slides em PNG e JPEG, mais carrossel.pdf, em ${pasta}`);
