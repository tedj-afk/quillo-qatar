const {chromium} = await import(process.env.PERF_TOOLS_DIR ? `${process.env.PERF_TOOLS_DIR}/node_modules/playwright/index.mjs` : 'playwright');
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const evidenceDir=process.env.PERF_OUTPUT_DIR || '/tmp/hippo-performance-evidence';
await fs.mkdir(evidenceDir,{recursive:true});
const b=await chromium.launch({channel:'chrome',headless:true});const results=[];
for(const width of [390,1440]){
 const p=await b.newPage({viewport:{width,height:900}});const errors=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
 await p.goto('http://127.0.0.1:4174');await p.waitForTimeout(1200);
 if(width===390){await p.getByRole('button',{name:'Open navigation'}).click();await p.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Services',exact:true}).click();await p.waitForTimeout(1600);assert.equal(await p.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'false');assert.equal(new URL(p.url()).hash,'#services');}
 for(const name of ['Website Design','Positioning & Copy','Build & Launch']){const tab=p.getByRole('tab',{name,exact:true});await tab.click();await p.waitForTimeout(900);assert.equal(await tab.getAttribute('aria-selected'),'true');assert.equal(await p.locator('.ag-service-image').evaluate(i=>i.complete&&i.naturalWidth>0),true);}
 const faq=p.locator('.ag-faq-item button').first();const wasOpen=await faq.getAttribute('aria-expanded');await faq.click();await p.waitForTimeout(500);assert.equal(await faq.getAttribute('aria-expanded'),wasOpen==='true'?'false':'true');await faq.click();
 const detail=p.locator('.ag-process-row').first();await detail.locator('summary').click();assert.equal(await detail.evaluate(e=>e.open),true);
 await p.getByRole('button',{name:'Next studio principle'}).click();await p.waitForTimeout(600);const visible=await p.locator('.ag-story-slide[aria-hidden="false"]').count();assert.equal(visible,1);
 const hrefs=await p.locator('a[href]').evaluateAll(nodes=>[...new Set(nodes.map(n=>n.getAttribute('href')))].filter(x=>x.startsWith('/')||x.startsWith('#')));
 for(const href of hrefs){if(href.startsWith('#'))assert.equal(await p.locator(href).count(),1,href);else{const response=await p.request.get('http://127.0.0.1:4174'+href);assert.equal(response.status(),200,href);}}
 await p.goto('http://127.0.0.1:4174/case-studies/stackray');await p.waitForTimeout(1000);
 const tabs=p.getByRole('tablist',{name:'Walk through the Stackray website'}).getByRole('tab');for(let i=0;i<await tabs.count();i++){await tabs.nth(i).click();await p.waitForTimeout(700);assert.equal(await tabs.nth(i).getAttribute('aria-selected'),'true');}
 await p.goto('http://127.0.0.1:4174/case-studies/quillo');await p.locator('video').scrollIntoViewIfNeeded();await p.locator('video').evaluate(v=>{v.muted=true;return v.play()});await p.waitForTimeout(500);assert.equal(await p.locator('video').evaluate(v=>!v.paused&&v.currentTime>0),true);await p.locator('video').evaluate(v=>v.pause());
 results.push({width,errors,passed:['mobile menu and anchor navigation','service tabs and images','FAQ','process accordion','studio carousel','internal links and fragment targets','case-study walkthrough','video playback']});await p.close();
}
await b.close();await fs.writeFile(`${evidenceDir}/interactions.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));
