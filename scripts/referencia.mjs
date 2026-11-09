// Renderiza o carrossel de referencia: um PNG e um JPEG por <section>.
// Uso: node scripts/referencia.mjs <pasta-de-saida>
import { mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { chromium } from 'playwright';

const pasta = process.argv[2] ?? 'semanas/_modelo/referencia';
mkdirSync(pasta, { recursive: true });
const nav = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const pag = await nav.newPage({ viewport: { width: 1080, height: 1350 } });
await pag.goto('file://' + resolve('templates/referencia/carrossel-referencia.html'));
await pag.evaluate(() => document.fonts.ready);
await pag.waitForTimeout(400);
const n = await pag.locator('section').count();
for (let i = 0; i < n; i++) {
  const el = pag.locator('section').nth(i);
  const nome = `slide-${String(i + 1).padStart(2, '0')}`;
  await el.screenshot({ path: join(pasta, `${nome}.png`) });
  await el.screenshot({ path: join(pasta, `${nome}.jpg`), type: 'jpeg', quality: 92 });
}
await nav.close();
console.log(`${n} slides em ${pasta}`);
