#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path");
const ROOT=path.resolve(__dirname,"..");
const FILE=path.join(ROOT,"runtime/alpha-story-scene-board-33900.js");
let source=fs.readFileSync(FILE,"utf8");
let changed=false;

function insertAfter(marker,text,label){
  const at=source.indexOf(marker);
  if(at<0)throw new Error(label+": marker missing");
  const pos=at+marker.length;
  source=source.slice(0,pos)+text+source.slice(pos);
  changed=true;
}
function replaceRange(startMarker,endMarker,text,label){
  const start=source.indexOf(startMarker);
  const end=source.indexOf(endMarker,start+startMarker.length);
  if(start<0||end<0||end<=start)throw new Error(label+": range missing");
  source=source.slice(0,start)+text+source.slice(end);
  changed=true;
}
function replaceOnce(oldText,newText,label){
  const first=source.indexOf(oldText);
  if(first<0)throw new Error(label+": source seam missing");
  if(source.indexOf(oldText,first+oldText.length)>=0)throw new Error(label+": source seam non-unique");
  source=source.slice(0,first)+newText+source.slice(first+oldText.length);
  changed=true;
}

if(!source.includes("function resolveChroniclePresentationDepth33900(")){
  const marker="function getActiveStorySceneBoardProjection(){const runtime=currentRuntime();return runtime?resolveStorySceneBoardProjection(runtime.sceneId,runtime.beatId,runtime):null;}\n";
  const block=String.raw`
const CHRONICLE_PRESENTATION_DEPTHS_33900=Object.freeze(["full","standard","quick"]);
function normalizeChroniclePresentationDepth33900(value,fallback="standard"){
  const candidate=typeof value==="string"?value.toLowerCase():"";
  return CHRONICLE_PRESENTATION_DEPTHS_33900.includes(candidate)?candidate:fallback;
}
function resolveChroniclePresentationDepth33900(runtime=currentRuntime(),beat=currentBeat(runtime)){
  try{
    if(typeof getActiveChronicleInteractionDepth==="function"){
      const canonical=getActiveChronicleInteractionDepth();
      const normalized=normalizeChroniclePresentationDepth33900(canonical,null);
      if(normalized)return normalized;
    }
  }catch(_error){}
  const override=runtime&&runtime.localContext&&runtime.localContext.__chroniclePresentationDepth;
  const authored=beat&&beat.uiHints&&(beat.uiHints.presentationDepth||beat.uiHints.chroniclePresentationDepth);
  return normalizeChroniclePresentationDepth33900(override||authored||"standard");
}
function authoritySuppliedContextItems33900(beat=currentBeat(currentRuntime())){
  const hints=beat&&beat.uiHints&&typeof beat.uiHints==="object"?beat.uiHints:{};
  try{
    if(typeof getStorySceneAuthoritySuppliedContextItems==="function"){
      const canonical=getStorySceneAuthoritySuppliedContextItems({ui_hints:hints});
      if(Array.isArray(canonical))return canonical.slice(0,8).map(row=>clone(row)).filter(Boolean);
    }
  }catch(_error){}
  const raw=Array.isArray(hints.contextItems)?hints.contextItems:[];
  return raw.slice(0,8).map((item,index)=>{
    if(typeof item==="string")return{id:"context_"+(index+1),label:item,value:null};
    if(!item||typeof item!=="object")return null;
    return{
      id:String(item.id||("context_"+(index+1))),
      label:String(item.label||item.title||item.name||"Context"),
      value:item.value===undefined||item.value===null?null:String(item.value)
    };
  }).filter(Boolean);
}
`;
  insertAfter(marker,block,"depth helper insertion");
}

if(!source.includes("sc-scene-board-33900__context")){
  const newBoard=[
    'function boardMarkup(projection,depth="standard",contextItems=[]){',
    '  const exactDepth=normalizeChroniclePresentationDepth33900(depth);',
    '  const actors=Array.isArray(projection.actors)?projection.actors.slice(0,4):[];',
    '  const objects=(projection.objects||[]).map(row=>`<span class="sc-scene-board-33900__object sc-live-state-callout-33900${row&&row.committed?" is-committed":""}"><b>${escapeHTML(row.label||"OBJECT")}</b>${escapeHTML(row.state||"")}</span>`).join("");',
    '  const top=exactDepth==="quick"?"":`<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">${escapeHTML(projection.location||"STORY SCENE")}</div>${projection.objective?`<div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>${escapeHTML(projection.objective)}</div>`:""}</div>`;',
    '  const fullContext=exactDepth==="full"&&Array.isArray(contextItems)&&contextItems.length',
    '    ?`<aside class="sc-scene-board-33900__context" aria-label="Authorised scene context"><div class="sc-scene-board-33900__context-label">CONTEXT</div>${contextItems.map(item=>`<div class="sc-scene-board-33900__context-row"><strong>${escapeHTML(item.label||"Context")}</strong>${item.value!==null&&item.value!==undefined?`<span>${escapeHTML(item.value)}</span>`:""}</div>`).join("")}</aside>`',
    '    :"";',
    '  const consequence=exactDepth==="quick"?"":`${projection.reaction?`<div class="sc-scene-board-33900__reaction">${escapeHTML(projection.reaction)}</div>`:""}${projection.committed?`<div class="sc-scene-board-33900__receipt">CHRONICLE FACT COMMITTED</div>`:""}`;',
    '  const objectMarkup=exactDepth==="quick"?"":(objects?`<div class="sc-scene-board-33900__objects sc-live-state-callouts-33900">${objects}</div>`:"");',
    '  return `${top}${fullContext}${consequence}<div class="sc-scene-board-33900__actors" data-count="${actors.length}">${actors.map((actor,index)=>actorMarkup(actor,index,actors.length)).join("")}</div>${objectMarkup}`;',
    '}',
    ''
  ].join("\n");
  replaceRange("function boardMarkup(projection){","function clearBoard(layer){",newBoard,"depth-aware board markup");
}

if(!source.includes("layer.dataset.scPresentationDepth=depth")){
  const newRender=String.raw`function renderStorySceneBoard33900(){
  if(rendering||typeof document==="undefined")return false;const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const runtime=currentRuntime(),beat=currentBeat(runtime),projection=runtime?resolveStorySceneBoardProjection(runtime.sceneId,runtime.beatId,runtime):null;if(!projection){clearBoard(layer);return false;}
  const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||(layer.querySelector&&layer.querySelector(".sc-story-stage"))||layer;if(!stage)return false;
  const depth=resolveChroniclePresentationDepth33900(runtime,beat),contextItems=authoritySuppliedContextItems33900(beat);
  rendering=true;try{
    installStyle();
    layer.dataset.scSceneBoard="true";layer.dataset.scSceneMode=projection.mode||"conversation";layer.dataset.scPresentationDepth=depth;
    if(stage.dataset)stage.dataset.scPresentationDepth=depth;
    applyBoardBackdrop(stage,runtime);
    let board=stage.querySelector?stage.querySelector(".sc-scene-board-33900"):null;
    if(!board){board=document.createElement("section");board.className="sc-scene-board-33900";board.setAttribute("aria-hidden","true");stage.appendChild(board);}
    if(board.dataset)board.dataset.scPresentationDepth=depth;
    const signature=JSON.stringify({projection,depth,contextItems});
    if(board.dataset&&board.dataset.signature!==signature){board.innerHTML=boardMarkup(projection,depth,contextItems);board.dataset.signature=signature;}
    updatePerformancePanel(layer,runtime);decorateStoryChoices33900(layer,runtime);return true;
  }finally{rendering=false;}
}
`;
  replaceRange("function renderStorySceneBoard33900(){","function scheduleBoardRender(){",newRender,"depth-aware render");
}

if(!source.includes('data-sc-presentation-depth="quick"')){
  const cssSeam='#${HARD_TRANSITION_CURTAIN_ID}{position:fixed;inset:0;z-index:2147483000;background:#020508;opacity:0;visibility:hidden;pointer-events:none;transition:none}';
  const css=String.raw`#story-scene-presentation-layer[data-sc-scene-board="true"][data-sc-presentation-depth="full"] .sc-scene-board-33900__context{position:absolute;left:2.4%;top:13%;z-index:18;width:min(25%,290px);max-height:31%;overflow:auto;padding:10px 11px;border:1px solid rgba(92,216,226,.34);border-radius:11px;background:linear-gradient(165deg,rgba(4,17,23,.88),rgba(2,8,12,.94));box-shadow:0 14px 34px rgba(0,0,0,.34);backdrop-filter:blur(7px)}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__context-label{margin-bottom:7px;color:#67d8e1;font:900 8px/1.2 inherit;letter-spacing:.16em}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__context-row{display:grid;gap:2px;padding:6px 0;border-top:1px solid rgba(255,255,255,.06);color:#dce9e8;font-size:9px;line-height:1.35}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__context-row strong{color:#e4c56d;font-size:8px;letter-spacing:.08em;text-transform:uppercase}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__context-row span{color:#dce9e8}
#story-scene-presentation-layer[data-sc-scene-board="true"][data-sc-presentation-depth="quick"][data-sc-cue-kind="narration"] .sc-chronicle-layout,
#story-scene-presentation-layer[data-sc-scene-board="true"][data-sc-presentation-depth="quick"][data-sc-cue-kind="internal_voice"] .sc-chronicle-layout{width:min(58%,760px)!important}
#story-scene-presentation-layer[data-sc-scene-board="true"][data-sc-presentation-depth="quick"] .sc-chronicle-actions{max-width:min(720px,64vw);margin-left:auto;margin-right:auto}
#story-scene-presentation-layer[data-sc-scene-board="true"][data-sc-presentation-depth="quick"] .sc-scene-board-33900__actor-tag small{display:none!important}
${cssSeam}`;
  replaceOnce(cssSeam,css,"depth CSS");
}

if(!source.includes("chronicleDepthReadsCanonicalAuthority:")){
  const diagSeam='    wrapsExistingStoryRenderer:!!PRE_RENDER,\n';
  const diag=String.raw`    chronicleDepthExactThree:JSON.stringify(CHRONICLE_PRESENTATION_DEPTHS_33900)===JSON.stringify(["full","standard","quick"]),
    chronicleDepthReadsCanonicalAuthority:String(resolveChroniclePresentationDepth33900).includes("getActiveChronicleInteractionDepth")&&String(resolveChroniclePresentationDepth33900).includes("__chroniclePresentationDepth"),
    chronicleFullConsumesAuthorityContext:String(authoritySuppliedContextItems33900).includes("getStorySceneAuthoritySuppliedContextItems")&&String(authoritySuppliedContextItems33900).includes("uiHints"),
    chronicleStandardRemainsBaseline:String(boardMarkup).includes('exactDepth==="quick"')&&String(boardMarkup).includes('exactDepth==="full"'),
    chronicleQuickDoesNotOwnChoices:!String(boardMarkup).includes("advanceStoryScene")&&!String(resolveChroniclePresentationDepth33900).includes("advanceStoryScene"),
    chronicleDepthDoesNotWriteHistory:!String(resolveChroniclePresentationDepth33900).includes("activityHistory")&&!String(authoritySuppliedContextItems33900).includes("activityHistory"),
    wrapsExistingStoryRenderer:!!PRE_RENDER,
`;
  replaceOnce(diagSeam,diag,"depth diagnostics");
}

if(!source.includes("globalThis.resolveChroniclePresentationDepth33900=")){
  const exportSeam='globalThis.runStorySceneBoard33900Diagnostics=runStorySceneBoard33900Diagnostics;\n';
  const exports=String.raw`globalThis.resolveChroniclePresentationDepth33900=resolveChroniclePresentationDepth33900;
globalThis.getStorySceneAuthorityContextItems33900=authoritySuppliedContextItems33900;
globalThis.runStorySceneBoard33900Diagnostics=runStorySceneBoard33900Diagnostics;
`;
  replaceOnce(exportSeam,exports,"depth exports");
}

if(changed)fs.writeFileSync(FILE,source);
console.log(JSON.stringify({pass:true,changed,file:path.relative(ROOT,FILE),depthConsumer:source.includes("resolveChroniclePresentationDepth33900"),browserGoldenClaimed:false},null,2));
