import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Originals stay outside public/. This static-export build needs no image server.
const sourceRoot = 'assets/images';
const sources = JSON.parse(await fs.readFile(`${sourceRoot}/sources.json`, 'utf8'));
const output = 'public/media';
await fs.mkdir(output, { recursive: true });
const manifest = {};
const report = [];
const expected = new Set();
for (const name of sources) {
  const original = await fs.readFile(path.join(sourceRoot, name));
  const metadata = await sharp(original).metadata();
  const icon = /hero-(design-original|work|world)/.test(name);
  const logo = name === 'hippo-logo.png';
  const maxWidth = Math.min(metadata.width, icon ? 246 : logo ? 1000 : 2560);
  const widths = [...new Set((icon ? [82, 164, 246] : logo ? [48, 96, 144, 400, 800, 1000] : [384, 640, 960, 1280, 1600, 2048, 2560]).filter(w => w < maxWidth).concat(maxWidth))];
  const variants = [];
  for (const width of widths) {
    const avif = metadata.format === 'heif';
    const format = avif ? 'avif' : 'webp';
    const options = avif ? { quality: 72, effort: 5, chromaSubsampling: '4:4:4' } : { quality: 90, alphaQuality: 100, effort: 5, lossless: logo || name.endsWith('sparkle.png') };
    // The source and encoder settings both participate in the fingerprint.
    const digest = createHash('sha256').update(original).update(JSON.stringify({width,format,options,sharp:sharp.versions})).digest('hex').slice(0,12);
    const file = `${name.replace(/\.[^.]+$/, '').replaceAll('/', '-')}-${width}.${digest}.${format}`;
    expected.add(file);
    let bytes;
    try { bytes = (await fs.stat(`${output}/${file}`)).size; }
    catch {
      let result = await sharp(original).resize({width,withoutEnlargement:true})[format](options).toBuffer();
      // Do not enlarge already-efficient full-resolution AVIF/WebP assets.
      if (width === metadata.width && (avif || metadata.format === 'webp') && original.length < result.length) result = original;
      await fs.writeFile(`${output}/${file}`,result);
      bytes=result.length;
    }
    variants.push({src:`/media/${file}`,width,bytes});
  }
  const fallback = variants.find(v=>v.width>=Math.min(960,maxWidth)) || variants.at(-1);
  manifest[`/${name}`] = { width:metadata.width, height:metadata.height, src:fallback.src, srcSet:variants.map(v=>`${v.src} ${v.width}w`).join(', ') };
  report.push({source:`/${name}`,originalBytes:original.length,width:metadata.width,height:metadata.height,variants});
}
for (const file of await fs.readdir(output)) if (!expected.has(file)) await fs.unlink(`${output}/${file}`);
// Tiny shared vectors remain SVG. Data URLs avoid a request per decorative icon;
// repeated markup compresses well and retains the original <img> layout/styles.
for (const file of await fs.readdir('public/agero')) {
  if (!file.endsWith('.svg') || file === 'notch.svg') continue;
  const svg = await fs.readFile(`public/agero/${file}`, 'utf8');
  manifest[`/agero/${file}`] = {src: `data:image/svg+xml,${encodeURIComponent(svg)}`};
}
await fs.mkdir('lib/generated',{recursive:true});
await fs.writeFile('lib/generated/images.json',JSON.stringify(manifest,null,2)+'\n');
await fs.writeFile('docs/performance/image-variants.json',JSON.stringify(report,null,2)+'\n');
console.log(`Prepared ${sources.length} images, ${expected.size} responsive variants.`);

// Fonts keep their exact glyph outlines and metrics; only their URLs change.
const fonts = {};
const fontRules = [];
await fs.mkdir('public/fonts', {recursive:true});
for (const [name, family, weight] of [['cal-sans', 'AG Cal', '400'], ['inter-regular', 'AG Inter', '400'], ['inter-medium', 'AG Inter', '500 700']]) {
  const data = await fs.readFile(`assets/fonts/${name}.woff2`);
  const hash = createHash('sha256').update(data).digest('hex').slice(0,12);
  const url = `/fonts/${name}.${hash}.woff2`;
  fonts[name] = url;
  await fs.writeFile(`public${url}`,data);
  fontRules.push(`@font-face{font-family:${family};src:url('${url}') format('woff2');font-display:swap;font-weight:${weight}}`);
}
for (const file of await fs.readdir('public/fonts')) if (!Object.values(fonts).includes(`/fonts/${file}`)) await fs.unlink(`public/fonts/${file}`);
await fs.writeFile('lib/generated/fonts.json',JSON.stringify(fonts,null,2)+'\n');
await fs.writeFile('app/generated-media.css',fontRules.join('\n') + `\n:root{--ag-orange-glow:url('${manifest['/agero/orange-glow.avif'].src}')}\n`);
