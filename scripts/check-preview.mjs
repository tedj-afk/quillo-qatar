import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('out');
const pages=['index.html',...readdirSync(path.join(root,'case-studies')).filter(name=>name.endsWith('.html')).map(name=>'case-studies/'+name)];
const errors=[];
for (const page of pages) {
  const html=readFileSync(path.join(root,page),'utf8');
  const ids=new Set([...html.matchAll(/\bid="([^"]*)"/g)].map(match=>match[1]));
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/, page+' must remain a preview');
  assert.ok(!html.includes('www.byhippo.design'),page+' must not refer to the old canonical domain');
  for (const [,attr,raw] of html.matchAll(/\b(href|src)="([^"]*)"/g)) {
    const url=raw.replaceAll('&amp;','&');
    if (/^(https?:|data:|mailto:|tel:)/.test(url)) continue;
    if (url.startsWith('#')) { if(url.length>1&&!ids.has(decodeURIComponent(url.slice(1)))) errors.push(page+': missing '+url); continue; }
    if (!url.startsWith('/')) continue;
    const pathname=decodeURIComponent(url.split(/[?#]/)[0]);
    const file=path.join(root,pathname);
    if (![file,file+'.html',path.join(file,'index.html')].some(candidate=>existsSync(candidate)&&statSync(candidate).isFile())) errors.push(page+': missing '+attr+' '+url);
  }
}
assert.deepEqual(errors,[]);
console.log(`Passed: ${pages.length} pages; local links, assets, anchors, preview indexing, and canonical isolation.`);
