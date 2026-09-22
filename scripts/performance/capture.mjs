const {chromium} = await import(process.env.PERF_TOOLS_DIR ? `${process.env.PERF_TOOLS_DIR}/node_modules/playwright/index.mjs` : 'playwright');
import fs from 'node:fs/promises';
const [base,tag]=process.argv.slice(2),dir=(process.env.PERF_OUTPUT_DIR || '/tmp/hippo-performance-evidence');
await fs.mkdir(dir,{recursive:true});
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL || 'chrome',headless:true,args:['--disable-quic']});
for(const [name,width,height,dpr] of [['desktop',1440,1000,1],['mobile',390,844,3]]){
 const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:dpr});const page=await ctx.newPage(); const requests=[],errors=[];const cdp=await ctx.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 const map=new Map();cdp.on('Network.requestWillBeSent',e=>{map.set(e.requestId,{url:e.request.url,type:e.type});});cdp.on('Network.responseReceived',e=>{const r=map.get(e.requestId);if(r)Object.assign(r,{status:e.response.status,headers:e.response.headers,mime:e.response.mimeType});});cdp.on('Network.loadingFinished',e=>{const r=map.get(e.requestId);if(r){r.bytes=e.encodedDataLength;requests.push(r);}});cdp.on('Network.loadingFailed',e=>errors.push({type:'network',...map.get(e.requestId),error:e.errorText}));page.on('pageerror',e=>errors.push({type:'page',error:e.message}));page.on('console',m=>{if(m.type()==='error')errors.push({type:'console',error:m.text()});});
 await page.addInitScript(()=>{window.__lcp=[];new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__lcp.push({time:e.startTime,size:e.size,url:e.url,element:e.element?.outerHTML}))).observe({type:'largest-contentful-paint',buffered:true});});
 try{await page.goto(base,{waitUntil:'domcontentloaded',timeout:30000}).catch(e=>errors.push({type:'navigation',error:e.message}));await page.waitForTimeout(base.startsWith('https')?15000:3500);
 const initialCount=requests.length;const initial=[...requests];const lcp=await page.evaluate(()=>window.__lcp);
 await page.screenshot({path:`${dir}/${tag}-${name}-top.png`});
 for(let y=0;y<await page.evaluate(()=>document.documentElement.scrollHeight);y+=height*.8){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(110);}
 await page.waitForTimeout(1500);
 const images=await page.evaluate(()=>[...document.images].map(e=>({src:e.getAttribute('src'),current:e.currentSrc,width:e.width,height:e.height,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight,loading:e.loading,display:getComputedStyle(e).display,visible:!!e.getClientRects().length,cls:e.className})));
 const fonts=await page.evaluate(()=>[...new Set([...document.querySelectorAll('body *')].filter(e=>e.getClientRects().length).map(e=>getComputedStyle(e).fontFamily))]);
 const links=await page.evaluate(()=>[...new Set([...document.querySelectorAll('a[href]')].map(e=>e.getAttribute('href')))]);
 await page.screenshot({path:`${dir}/${tag}-${name}-full.png`,fullPage:true});
 const result={base,name,initialCount,initialBytes:initial.reduce((s,r)=>s+(r.bytes||0),0),initialImageBytes:initial.filter(r=>r.type==='Image').reduce((s,r)=>s+(r.bytes||0),0),requests,initial,errors,lcp,images,fonts,links};await fs.writeFile(`${dir}/${tag}-${name}.json`,JSON.stringify(result,null,2));console.log(JSON.stringify({tag,name,initialCount,initialBytes:result.initialBytes,initialImageBytes:result.initialImageBytes,totalRequests:requests.length,totalBytes:requests.reduce((s,r)=>s+(r.bytes||0),0),errors,lcp,fonts,failed:requests.filter(r=>r.status>=400)}));
 }catch(e){console.log({name,error:e.message});}await ctx.close();
}await browser.close();
