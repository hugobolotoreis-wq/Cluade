// Uso: node scripts/render.mjs <modelo.html> '<json>' <saida.png>
// Requer: npm i playwright && npx playwright install chromium
// Opcional: CHROME_PATH=<caminho para um Chrome headless>
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { chromium } from 'playwright';

const [modelo, json, saida] = process.argv.slice(2);
if (!modelo || !json || !saida) { console.error('Uso: node scripts/render.mjs <modelo> <json> <saida.png>'); process.exit(1); }
const dados = JSON.parse(json);
let html = readFileSync(modelo, 'utf8');
for (const [k, v] of Object.entries(dados)) {
  const valor = typeof v === 'string' ? v : JSON.stringify(v);
  html = html.replaceAll(`{{${k}}}`, valor);
}
html = html.replace(/\{\{[a-z_]+\}\}/g, '');
const tmp = resolve(dirname(modelo), '_tmp_render.html');
writeFileSync(tmp, html);
mkdirSync(dirname(resolve(saida)), { recursive: true });
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.goto('file://' + tmp);
await page.waitForTimeout(300);
await page.screenshot({ path: saida });
await browser.close();
console.log('Imagem gravada em', saida);
