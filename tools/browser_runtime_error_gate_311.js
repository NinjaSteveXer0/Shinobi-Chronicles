"use strict";

const assert=require("assert");

function validateAllowlist(allowlist){
  for(const row of allowlist||[]){
    assert(row&&row.kind&&row.match,"#311 browser error allowlist entry incomplete");
    assert(String(row.reason||"").trim(),"#311 browser error allowlist requires reason");
    assert(String(row.retirementCondition||"").trim(),"#311 browser error allowlist requires retirement/review condition");
  }
}
function matchesAllowlist(event,allowlist){
  return (allowlist||[]).some(row=>{
    if(row.kind!==event.kind)return false;
    return String(event.message||event.url||"").includes(String(row.match));
  });
}
async function installBrowserRuntimeErrorGate(page,{allowlist=[]}={}){
  validateAllowlist(allowlist);
  const events=[];
  page.on("pageerror",error=>events.push({kind:"pageerror",message:String(error&&error.message||error)}));
  page.on("console",msg=>{
    if(msg.type()==="error")events.push({kind:"console.error",message:msg.text()});
  });
  page.on("requestfailed",req=>{
    const failure=req.failure();
    events.push({kind:"requestfailed",url:req.url(),resourceType:req.resourceType(),message:failure&&failure.errorText||"request_failed"});
  });
  page.on("response",res=>{
    const req=res.request();
    const type=req.resourceType();
    if(res.status()>=400&&["script","stylesheet","image","font"].includes(type)){
      events.push({kind:"required_resource_http_error",url:res.url(),resourceType:type,message:String(res.status())});
    }
  });
  await page.addInitScript(()=>{
    globalThis.__scBrowserRuntimeErrors311=[];
    window.addEventListener("unhandledrejection",event=>{
      const reason=event&&event.reason;
      globalThis.__scBrowserRuntimeErrors311.push({
        kind:"unhandledrejection",
        message:String(reason&&reason.message||reason||"unhandled_rejection")
      });
    });
    window.addEventListener("error",event=>{
      if(event&&event.error)return;
      const target=event&&event.target;
      if(target&&target!==window){
        globalThis.__scBrowserRuntimeErrors311.push({
          kind:"resource_error",
          message:String(target.src||target.href||target.currentSrc||target.tagName||"resource_error")
        });
      }
    },true);
  });
  return{
    async snapshot(){
      const browserEvents=await page.evaluate(()=>Array.isArray(globalThis.__scBrowserRuntimeErrors311)?globalThis.__scBrowserRuntimeErrors311.slice():[]);
      const combined=[...events,...browserEvents];
      const unexpected=combined.filter(event=>!matchesAllowlist(event,allowlist));
      return{events:combined,unexpected,allowlist};
    },
    async assertClean(label="browser_runtime"){
      const snap=await this.snapshot();
      assert.strictEqual(snap.unexpected.length,0,"#311 unexpected browser runtime errors @ "+label+": "+JSON.stringify(snap.unexpected,null,2));
      return{label,eventCount:snap.events.length,unexpectedCount:0,allowlistCount:allowlist.length};
    },
    async reset(){
      events.length=0;
      await page.evaluate(()=>{
        if(Array.isArray(globalThis.__scBrowserRuntimeErrors311))globalThis.__scBrowserRuntimeErrors311.length=0;
        else globalThis.__scBrowserRuntimeErrors311=[];
      });
      return true;
    }
  };
}

module.exports={installBrowserRuntimeErrorGate,validateAllowlist};
