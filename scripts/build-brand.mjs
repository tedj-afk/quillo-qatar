import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
// Rasterize the committed, font-outlined vector sources without system fonts.
await sharp('public/quillo-wordmark.svg').png().toFile('public/quillo-wordmark.png');
await sharp('public/og.svg').png().toFile('public/og.png');
for (const size of [16,32,48]) await sharp('public/favicon.svg').resize(size,size).png().toFile(`public/favicon-${size}x${size}.png`);
const png=await sharp('public/favicon.svg').resize(48,48).png().toBuffer();
const ico=Buffer.alloc(22); ico.writeUInt16LE(1,2); ico.writeUInt16LE(1,4); ico[6]=48; ico[7]=48; ico.writeUInt16LE(1,10); ico.writeUInt16LE(32,12); ico.writeUInt32LE(png.length,14); ico.writeUInt32LE(22,18);
await writeFile('public/favicon.ico',Buffer.concat([ico,png]));
console.log('Generated Quillo brand assets from the font-outlined SVG sources.');
