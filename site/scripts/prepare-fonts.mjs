import { mkdir, writeFile } from 'node:fs/promises';
const directory = new URL('../public/fonts/', import.meta.url);
await mkdir(directory, { recursive: true });
for (const family of ['Inter', 'Montserrat']) {
  const response = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@100..900&display=swap`, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
  if (!response.ok) throw new Error(`Font stylesheet: ${response.status}`);
  const css = await response.text();
  if (!css.includes('font-weight: 100 900')) throw new Error('Expected a variable font response');
  const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)];
  if (!urls.length) throw new Error(`No font URL for ${family}`);
  const file = await fetch(urls.at(-1)[1]);
  if (!file.ok) throw new Error(`Font file: ${file.status}`);
  await writeFile(new URL(`${family.toLowerCase()}.woff2`, directory), Buffer.from(await file.arrayBuffer()));
  console.log(`${family}: local font prepared`);
}
