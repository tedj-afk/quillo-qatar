const {chromium} = await import(process.env.PERF_TOOLS_DIR ? `${process.env.PERF_TOOLS_DIR}/node_modules/playwright/index.mjs` : 'playwright');
import fs from 'node:fs/promises';
const evidenceDir=process.env.PERF_OUTPUT_DIR || '/tmp/hippo-performance-evidence';
await fs.mkdir(evidenceDir,{recursive:true});
const b=await chromium.launch({channel:'chrome',headless:true});
const routes=['/','/case-studies/stackray','/case-studies/helpmegrow','/case-studies/quillo','/case-studies/atlas-mode','/case-studies/northstar-sync','/case-studies/signal-desk','/case-studies/kitebase'];
const results=[];
for(const route of routes.filter(r=>!process.env.PERF_ROUTES||process.env.PERF_ROUTES.split(',').includes(r))){for(const width of (route==='/'?[320,390,768,1440,1920]:[390,1440]).filter(w=>!process.env.PERF_WIDTHS||process.env.PERF_WIDTHS.split(',').map(Number).includes(w))){
 const row={route,width,errors:[],differences:[]};let baseline;
 for(const [label,port] of [['before',4173],['after',4174]]){
  const ctx=await b.newContext({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});const p=await ctx.newPage();
  p.on('pageerror',e=>row.errors.push({label,error:e.message}));p.on('response',r=>{if(r.status()>=400)row.errors.push({label,url:r.url(),status:r.status()});});p.on('requestfailed',r=>row.errors.push({label,url:r.url(),error:r.failure()}));
  await p.goto(`http://127.0.0.1:${port}${route}`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(250);
  for(let y=0;y<await p.evaluate(()=>document.documentElement.scrollHeight);y+=800){await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await p.waitForTimeout(35);}
  await p.waitForTimeout(700);await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(200);
  // Freeze only entrance transforms for a deterministic settled-state comparison.
  // The separate interaction checks run with all animations enabled.
  await p.addStyleTag({content:'.ag-site [style*="translateY"]{transform:none!important;opacity:1!important;filter:none!important}'});
  const snapshot=await p.evaluate(()=>({
   text:document.querySelector('main').innerText,
   overflow:document.documentElement.scrollWidth>innerWidth,
   height:document.documentElement.scrollHeight,
   elements:[...document.querySelectorAll('main h1,main h2,main h3,main p,main img,main section,header,.ag-showcase,.ag-work,.ag-service-image')].filter(e=>e.getClientRects().length).map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {tag:e.tagName,cls:e.className,x:r.x,y:r.y,w:r.width,h:r.height,font:s.font,color:s.color,background:s.backgroundColor};}),
   broken:[...document.images].filter(i=>i.getClientRects().length&&(!i.complete||!i.naturalWidth)).map(i=>i.currentSrc),
   links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))
  }));
  if(label==='before')baseline=snapshot;
  else{row.height=[baseline.height,snapshot.height];row.overflow=snapshot.overflow;row.broken=snapshot.broken;row.sameText=baseline.text===snapshot.text;row.sameLinks=JSON.stringify(baseline.links)===JSON.stringify(snapshot.links);
   const a=baseline.elements,c=snapshot.elements;
   if(a.length!==c.length)row.differences.push({elementCount:[a.length,c.length]});
   for(let i=0;i<Math.min(a.length,c.length);i++){let keys=['x','y','w','h'].filter(k=>Math.abs(a[i][k]-c[i][k])>1);if(a[i].font!==c[i].font)keys.push('font');if(a[i].color!==c[i].color||a[i].background!==c[i].background)keys.push('color');if(keys.length)row.differences.push({i,keys,before:a[i],after:c[i]});}
  }
  if(['/', '/case-studies/stackray','/case-studies/helpmegrow','/case-studies/quillo','/case-studies/atlas-mode'].includes(route)&&[390,1440].includes(width)){
   const slug=route==='/'?'home':route.split('/').at(-1);await p.screenshot({path:`${evidenceDir}/${slug}-${width}-${label}.png`,fullPage:true});
  }
  await ctx.close();
 }
 results.push(row);console.log(JSON.stringify(row));await fs.writeFile(`${evidenceDir}/regression.json`,JSON.stringify(results,null,2));
}}
await b.close();
