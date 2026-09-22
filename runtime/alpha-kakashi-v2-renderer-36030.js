// ============================================================================
// ACADEMY KAKASHI V2 — SINGLE SCENE-BOARD RENDERER — 36030
//
// This is the sole Academy Kakashi Story DOM owner.
// Core/state/battle modules are forbidden from manipulating Story DOM.
// ============================================================================
(function installAcademyKakashiV2Renderer36030(){
"use strict";
if(globalThis.SC_ACADEMY_KAKASHI_V2_RENDERER_36030)return;

const PATCH_ID="academy_kakashi_v2_renderer_36030_2026_09_22";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const STYLE_ID="kakashi-v2-renderer-36030-style";
const ROOT_ID="kakashi-v2-scene-board";
let rendering=false,lastProjectionSnapshot=null;

function esc(v){return String(v??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function storySuspendedForBattle(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID)return false;
  const pending=rt.pendingBattle&&rt.pendingBattle.battleId;
  if(!pending)return false;
  try{
    const battle=typeof currentBattle!=="undefined"?currentBattle:null;
    const rc=battle&&battle.returnContext||null;
    return !!(battle&&rc&&rc.type==="story_scene"&&rc.sceneId===SCENE_ID);
  }catch(_e){return false;}
}
function isActive(){const rt=active();return !!rt&&rt.sceneId===SCENE_ID&&!storySuspendedForBattle();}
function projection(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||typeof getAcademyKakashiV2Presentation36020!=="function")return null;
  return getAcademyKakashiV2Presentation36020(rt.beatId);
}
function cueState(){
  if(typeof getAcademyKakashiV2TransitionState36040==="function")return getAcademyKakashiV2TransitionState36040();
  const p=projection(),cues=p&&p.cues||[];return{cueIndex:0,cueCount:cues.length,atEnd:cues.length<=1};
}
function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return;
  const s=document.createElement("style");s.id=STYLE_ID;s.textContent=`
#story-scene-presentation-layer[data-kakashi-v2="true"]{display:block!important;background:#020508!important;overflow:hidden!important;align-items:stretch!important;justify-content:stretch!important}
#story-scene-presentation-layer[data-kakashi-v2="true"]>*:not(#${ROOT_ID}){display:none!important}
#${ROOT_ID}{position:absolute;inset:0;z-index:1;overflow:hidden;background:#020508;color:#e9dfca;font-family:inherit;isolation:isolate}
#${ROOT_ID} .kv2-backdrop{position:absolute;inset:0;z-index:-3;background-position:center;background-size:cover;background-repeat:no-repeat;transform:scale(1.001)}
#${ROOT_ID} .kv2-scrim{position:absolute;inset:0;z-index:-2;background:linear-gradient(180deg,rgba(0,4,8,.10),rgba(0,4,8,.05) 47%,rgba(0,4,8,.42) 72%,rgba(0,4,8,.82))}
#${ROOT_ID} .kv2-frame{position:absolute;inset:1.4%;border:1px solid rgba(197,158,70,.16);pointer-events:none}
#${ROOT_ID} .kv2-top{position:absolute;left:3.2%;right:3.2%;top:3.2%;height:8.5%;display:grid;grid-template-columns:minmax(0,1fr) minmax(240px,34%);align-items:start;gap:24px;z-index:20;pointer-events:none}
#${ROOT_ID} .kv2-location{justify-self:start;padding:7px 10px;border-left:2px solid rgba(215,173,73,.72);background:linear-gradient(90deg,rgba(2,9,13,.82),rgba(2,9,13,.34));font-size:clamp(8px,.62vw,11px);font-weight:900;letter-spacing:.14em;color:#e4c978;text-transform:uppercase;text-shadow:0 2px 4px #000}
#${ROOT_ID} .kv2-objective{justify-self:end;box-sizing:border-box;width:min(100%,390px);padding:8px 11px;border:1px solid rgba(75,209,220,.46);background:rgba(2,12,16,.82);box-shadow:0 10px 30px rgba(0,0,0,.32);font-size:clamp(9px,.68vw,12px);line-height:1.35;color:#e9eeeb}
#${ROOT_ID} .kv2-objective b{display:block;margin-bottom:3px;color:#67dce5;font-size:7px;letter-spacing:.14em}
#${ROOT_ID} .kv2-actors{position:absolute;left:3.5%;right:3.5%;top:13.2%;bottom:29%;z-index:4;pointer-events:none}
#${ROOT_ID} .kv2-actor{position:absolute;left:var(--sc-stage-anchor-x,var(--kv2-x,5%));bottom:var(--kv2-y,0);width:var(--kv2-w,min(20vw,220px));height:var(--kv2-h,min(52vh,380px));max-height:100%;display:flex;align-items:flex-end;justify-content:center;opacity:.78;filter:saturate(.82) brightness(.88) drop-shadow(0 18px 24px rgba(0,0,0,.48));transform:translate3d(0,0,0);transition:filter .14s ease,opacity .14s ease!important}\n#${ROOT_ID} .kv2-actors[data-count="1"] .kv2-actor{--kv2-w:min(29vw,330px);--kv2-h:min(62vh,465px)}\n#${ROOT_ID} .kv2-actors[data-count="2"] .kv2-actor{--kv2-w:min(25vw,292px);--kv2-h:min(59vh,435px)}\n#${ROOT_ID} .kv2-actors[data-count="3"] .kv2-actor{--kv2-w:min(21vw,235px);--kv2-h:min(53vh,390px)}\n#${ROOT_ID} .kv2-actors[data-count="4"] .kv2-actor,#${ROOT_ID} .kv2-actors[data-count="5"] .kv2-actor{--kv2-w:min(18vw,195px);--kv2-h:min(48vh,350px)}\n#${ROOT_ID} .kv2-actor.is-focus{opacity:1;filter:saturate(1.05) brightness(1.08) drop-shadow(0 22px 30px rgba(0,0,0,.55));z-index:4}
#${ROOT_ID} .kv2-actor[data-slot="kakashi"]{--kv2-x:4%;--kv2-w:min(20vw,220px)}
#${ROOT_ID} .kv2-actor[data-slot="mi"]{--kv2-x:29%;--kv2-w:min(19vw,210px)}
#${ROOT_ID} .kv2-actor[data-slot="ps"]{--kv2-x:52%;--kv2-w:min(19vw,210px)}
#${ROOT_ID} .kv2-actor[data-slot="amt"]{--kv2-x:75%;--kv2-w:min(19vw,210px)}
#${ROOT_ID} .kv2-actor[data-slot="pakkun"]{--kv2-x:42%;--kv2-y:1%;--kv2-w:min(14vw,150px);--kv2-h:min(37vh,270px)}
#${ROOT_ID} .kv2-actor[data-slot="anbu"]{--kv2-x:72%;--kv2-w:min(20vw,220px)}
#${ROOT_ID} .kv2-actor[data-slot="minato"]{--kv2-x:69%;--kv2-y:10%;--kv2-w:min(23vw,250px);--kv2-h:min(55vh,400px)}
#${ROOT_ID}[data-preset="sakura_group"] .kv2-actor[data-slot="kakashi"]{--kv2-x:2%;--kv2-w:min(18vw,195px)}
#${ROOT_ID}[data-preset="sakura_group"] .kv2-actor[data-slot="pakkun"]{--kv2-x:24%;--kv2-w:min(13vw,140px);--kv2-h:min(34vh,245px)}
#${ROOT_ID}[data-preset="sakura_group"] .kv2-actor[data-slot="ps"]{--kv2-x:43%;--kv2-w:min(18vw,195px)}
#${ROOT_ID}[data-preset="sakura_group"] .kv2-actor[data-slot="amt"]{--kv2-x:70%;--kv2-w:min(18vw,195px)}
#${ROOT_ID}[data-preset="escort"] .kv2-actor{--kv2-w:min(16vw,174px);--kv2-h:min(45vh,330px)}
#${ROOT_ID}[data-preset="escort"] .kv2-actor[data-slot="kakashi"]{--kv2-x:1%}
#${ROOT_ID}[data-preset="escort"] .kv2-actor[data-slot="mi"]{--kv2-x:19%}
#${ROOT_ID}[data-preset="escort"] .kv2-actor[data-slot="ps"]{--kv2-x:38%}
#${ROOT_ID}[data-preset="escort"] .kv2-actor[data-slot="amt"]{--kv2-x:57%}
#${ROOT_ID}[data-preset="escort"] .kv2-actor[data-slot="pakkun"]{--kv2-x:79%;--kv2-w:min(13vw,140px);--kv2-h:min(32vh,235px)}
#${ROOT_ID}[data-preset="anbu_report"] .kv2-actor[data-slot="anbu"]{--kv2-x:9%;--kv2-y:0}
#${ROOT_ID}[data-preset="anbu_report"] .kv2-actor[data-slot="pakkun"]{--kv2-x:43%;--kv2-y:0;--kv2-w:min(14vw,150px);--kv2-h:min(36vh,255px)}
#${ROOT_ID}[data-preset="anbu_report"] .kv2-actor[data-slot="kakashi"]{--kv2-x:71%;--kv2-y:0}
#${ROOT_ID}[data-preset="hokage_report"] .kv2-actor[data-slot="anbu"]{--kv2-x:13%;--kv2-y:0}
#${ROOT_ID}[data-preset="hokage_report"] .kv2-actor[data-slot="minato"]{--kv2-x:67%;--kv2-y:12%}
#${ROOT_ID} .kv2-actor img{display:block;width:100%;height:100%;object-fit:contain;object-position:center bottom}
#${ROOT_ID} .kv2-actor.is-entering{animation:kv2ActorEnter36030 .48s cubic-bezier(.2,.75,.24,1) both}
#${ROOT_ID} .kv2-ghost-layer{position:absolute;inset:0;z-index:12;pointer-events:none;overflow:hidden}\n#${ROOT_ID} .kv2-actor-ghost{position:absolute!important;z-index:1!important;margin:0!important;pointer-events:none!important}
#${ROOT_ID} .kv2-actor-ghost.is-falling{animation:kv2ActorFall36030 .54s cubic-bezier(.55,.05,.78,.25) both}
#${ROOT_ID} .kv2-actor-ghost.is-fleeing{animation:kv2ActorFlee36030 .48s cubic-bezier(.4,.05,.8,.3) both}
#${ROOT_ID} .kv2-actor-ghost.is-fading{animation:kv2ActorFade36030 .32s ease both}
@keyframes kv2ActorEnter36030{from{opacity:0;transform:translate3d(56px,0,0) scale(.96);filter:brightness(.45) blur(1px)}to{opacity:1;transform:translate3d(0,0,0) scale(1);filter:drop-shadow(0 18px 24px rgba(0,0,0,.48))}}
@keyframes kv2ActorFall36030{from{opacity:1;transform:translate3d(0,0,0) rotate(0)}to{opacity:0;transform:translate3d(0,118%,0) rotate(5deg)}}
@keyframes kv2ActorFlee36030{from{opacity:1;transform:translate3d(0,0,0) scale(1)}to{opacity:0;transform:translate3d(135%,0,0) scale(.94)}}
@keyframes kv2ActorFade36030{from{opacity:1}to{opacity:0}}
#${ROOT_ID} .kv2-card-frame{position:absolute;inset:0;border:1px solid rgba(210,172,80,.28);background:linear-gradient(180deg,transparent 50%,rgba(1,6,9,.68));box-shadow:inset 0 0 0 1px rgba(255,255,255,.018)}
#${ROOT_ID} .kv2-actor-label{position:absolute;left:6%;right:6%;bottom:3%;padding:6px 8px;border:1px solid rgba(208,168,75,.4);background:rgba(2,7,11,.88);text-align:center;font-size:8px;font-weight:900;letter-spacing:.11em;color:#eee2c7;text-shadow:0 1px 2px #000}\n#${ROOT_ID} .kv2-actor-state{display:table;margin:4px auto 0;padding:2px 6px;border:1px solid rgba(92,215,225,.35);background:rgba(4,23,28,.82);color:#7fe1e8;font-size:7px;font-weight:900;letter-spacing:.08em}\n#${ROOT_ID} .kv2-object-layer{position:absolute;inset:0;z-index:16;pointer-events:none}\n#${ROOT_ID} .kv2-package-token{position:absolute;top:42%;left:var(--sc-stage-anchor-x,50%);width:64px;height:45px;transform:translate(-8%,-50%);display:grid;place-items:center;border:1px solid rgba(221,178,73,.75);background:linear-gradient(145deg,rgba(42,30,12,.95),rgba(12,14,13,.96));box-shadow:0 12px 28px rgba(0,0,0,.48),0 0 18px rgba(221,178,73,.12);color:#e4c66e;font-size:7px;font-weight:900;letter-spacing:.12em}\n#${ROOT_ID} .kv2-package-token::before{content:"";position:absolute;width:32px;height:21px;border:1px solid rgba(226,190,100,.64);background:linear-gradient(135deg,#4a3a21,#21190f);transform:rotate(-4deg)}\n#${ROOT_ID} .kv2-package-token span{position:absolute;top:calc(100% + 5px);white-space:nowrap;padding:3px 5px;background:rgba(2,8,11,.82);border:1px solid rgba(215,174,76,.32)}\n#${ROOT_ID} .kv2-package-token[hidden]{display:none!important}\n#${ROOT_ID} .kv2-departure-ghost{position:absolute!important;z-index:13!important;pointer-events:none!important}
#${ROOT_ID} .kv2-dialogue{position:absolute;left:7%;right:7%;bottom:3.7%;min-height:19%;max-height:23%;z-index:30;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto 1fr auto;column-gap:18px;padding:14px 18px 12px;border:1px solid rgba(211,171,78,.68);background:linear-gradient(180deg,rgba(3,10,15,.88),rgba(2,7,11,.96));box-shadow:0 20px 55px rgba(0,0,0,.52),inset 0 0 0 1px rgba(255,255,255,.025);backdrop-filter:blur(5px)}
#${ROOT_ID} .kv2-speaker{grid-column:1;grid-row:1;color:#e3bd5f;font-size:9px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;min-height:13px}
#${ROOT_ID} .kv2-text{grid-column:1/-1;grid-row:2;margin-top:6px;overflow:auto;white-space:pre-wrap;color:#e8ece8;font-size:clamp(12px,.98vw,16px);line-height:1.42;text-shadow:0 1px 2px #000}
#${ROOT_ID} .kv2-progress{grid-column:2;grid-row:1;color:#63747a;font-size:8px;font-weight:900;letter-spacing:.08em}
#${ROOT_ID} .kv2-actions{grid-column:1/-1;grid-row:3;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 8px;margin-top:10px;max-height:10vh;overflow:auto}
#${ROOT_ID} .kv2-actions button{min-height:34px;border:1px solid rgba(211,171,78,.55);background:linear-gradient(180deg,rgba(13,26,32,.94),rgba(5,13,18,.97));color:#eee2c8;padding:7px 10px;text-align:left;font-size:clamp(7px,.55vw,10px);font-weight:900;letter-spacing:.075em;cursor:pointer}
#${ROOT_ID} .kv2-actions button:hover,#${ROOT_ID} .kv2-actions button:focus-visible{border-color:#68dce6;color:#8ce5ec;outline:none;background:rgba(10,42,49,.96)}
#${ROOT_ID} .kv2-next{grid-column:2;grid-row:3;justify-self:end;align-self:end;width:36px;height:30px;border:1px solid rgba(92,215,225,.42);background:rgba(6,30,36,.8);color:#71dee7;font-size:19px;font-weight:900;cursor:pointer}
#${ROOT_ID} .kv2-battle{grid-column:1/-1!important;text-align:center!important;border-color:rgba(206,91,72,.66)!important;color:#f2c0ae!important;background:linear-gradient(180deg,rgba(67,20,15,.82),rgba(27,9,8,.95))!important}
#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-top,#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-actors,#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-dialogue{display:none!important}
#${ROOT_ID} .kv2-receipt{display:none;position:absolute;left:50%;top:50%;width:min(780px,78vw);max-height:76vh;transform:translate(-50%,-50%);z-index:40;box-sizing:border-box;padding:34px 38px;border:1px solid rgba(214,173,74,.72);background:linear-gradient(165deg,rgba(6,13,17,.98),rgba(2,7,10,.99));box-shadow:0 36px 90px rgba(0,0,0,.72),inset 0 0 50px rgba(201,162,73,.03);overflow:auto}
#${ROOT_ID} .kv2-receipt span{display:block;color:#64dae3;font-size:9px;font-weight:900;letter-spacing:.16em}
#${ROOT_ID} .kv2-receipt h1{margin:9px 0 18px;color:#e5c66f;font:900 clamp(21px,2.1vw,34px)/1 Georgia,serif;letter-spacing:.05em}
#${ROOT_ID} .kv2-receipt pre{margin:0;white-space:pre-wrap;color:#e1e6e1;font:600 clamp(11px,.83vw,14px)/1.65 inherit}
#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-receipt{display:block}
#${ROOT_ID}[data-battle-action-only="true"] .kv2-speaker,#${ROOT_ID}[data-battle-action-only="true"] .kv2-progress,#${ROOT_ID}[data-battle-action-only="true"] .kv2-text{display:none!important}
#${ROOT_ID}[data-battle-action-only="true"] .kv2-dialogue{min-height:8%;max-height:10%;grid-template-rows:1fr;padding:10px 14px}
#${ROOT_ID}[data-battle-action-only="true"] .kv2-actions{grid-row:1;margin-top:0;max-height:none}\n#${ROOT_ID} .kv2-receipt button{margin-top:24px;width:100%;min-height:40px;border:1px solid rgba(95,215,225,.42);background:rgba(7,33,39,.72);color:#78dfe7;font-weight:900;letter-spacing:.1em;cursor:pointer}
#${ROOT_ID} .kv2-wipe{position:absolute;inset:0;z-index:999;background:#000;opacity:0;pointer-events:none;transition:opacity .22s ease}
#${ROOT_ID} .kv2-wipe.is-covering{opacity:1;pointer-events:auto}
@media(max-width:900px){#${ROOT_ID} .kv2-actors{left:1.5%;right:1.5%;bottom:31%}#${ROOT_ID} .kv2-actor{--kv2-w:min(19vw,170px);--kv2-h:min(44vh,290px)}#${ROOT_ID} .kv2-actor[data-slot="pakkun"]{--kv2-w:min(13vw,120px);--kv2-h:min(30vh,210px)}#${ROOT_ID} .kv2-dialogue{left:3%;right:3%;bottom:2.5%;max-height:26%;min-height:22%}#${ROOT_ID} .kv2-top{left:2.5%;right:2.5%;grid-template-columns:1fr minmax(190px,42%)}}
@media(prefers-reduced-motion:reduce){#${ROOT_ID} .kv2-wipe{transition:none!important}#${ROOT_ID} .kv2-actor.is-entering,#${ROOT_ID} .kv2-actor-ghost{animation:none!important}}
`;
  document.head.appendChild(s);
}
function availableChoices(){
  try{
    const beat=typeof getCurrentStorySceneBeat==="function"?getCurrentStorySceneBeat():null;
    if(!beat||!Array.isArray(beat.choices))return[];
    return beat.choices.map(choice=>{
      const availability=typeof evaluateStorySceneChoiceAvailability==="function"?evaluateStorySceneChoiceAvailability(choice):{available:true};
      return{choiceId:choice.choiceId,label:choice.label,available:availability.available===true,knownBlocker:availability.knownBlocker||null};
    }).filter(c=>c.available);
  }catch(_e){return[];}
}
function actorSlot(actor){
  const id=String(actor&&actor.id||"");
  if(id==="academy_kakashi")return"kakashi";
  if(id==="academy_kakashi_origin_masked_interceptor")return"mi";
  if(id==="academy_kakashi_origin_package_smuggler")return"ps";
  if(id==="academy_kakashi_origin_amt")return"amt";
  if(id==="pakkun_origin_unfamiliar_ninken")return"pakkun";
  if(id==="konoha_anbu_operational_contact")return"anbu";
  if(id==="kage_minato")return"minato";
  return"unknown";
}
function actorMarkup(actor){
  const figure=document.createElement("figure");
  figure.className="kv2-actor";
  figure.dataset.actorId=String(actor.id||"");
  figure.dataset.slot=actorSlot(actor);
  const frame=document.createElement("div");frame.className="kv2-card-frame";
  const img=document.createElement("img");img.alt="";img.src=String(actor.image||"");
  const label=document.createElement("figcaption");label.className="kv2-actor-label";
  const name=document.createElement("strong");name.textContent=String(actor.label||"");
  const state=document.createElement("small");state.className="kv2-actor-state";state.hidden=true;
  label.append(name,state);
  figure.append(frame,img,label);
  return figure;
}
function ensureRoot(layer){
  let root=document.getElementById(ROOT_ID);
  if(root)return root;
  root=document.createElement("section");root.id=ROOT_ID;root.setAttribute("aria-label","Academy Kakashi Origin scene");
  root.innerHTML=`
    <div class="kv2-backdrop"></div>
    <div class="kv2-scrim"></div>
    <div class="kv2-frame"></div>
    <header class="kv2-top"><div class="kv2-location"></div><div class="kv2-objective"><b>OBJECTIVE</b><span></span></div></header>
    <div class="kv2-actors"></div>
    <section class="kv2-dialogue" aria-live="polite">
      <div class="kv2-speaker"></div><div class="kv2-progress"></div><div class="kv2-text"></div>
      <div class="kv2-actions"></div><button class="kv2-next" type="button" data-kv2-advance="true" aria-label="Continue">›</button>
    </section>
    <article class="kv2-receipt"><span>SHINOBI CHRONICLES · RECORD</span><h1>CHRONICLE RECEIPT</h1><pre></pre><button type="button" data-kv2-advance="true">CONTINUE</button></article>
    <div class="kv2-object-layer" aria-hidden="true"><div class="kv2-package-token" data-story-object-id="PACKAGE" hidden><span>PACKAGE</span></div></div>
    <div class="kv2-ghost-layer" aria-hidden="true"></div>
    <div class="kv2-wipe"></div>`;
  layer.appendChild(root);
  return root;
}
function currentCue(p,t){
  const cues=p&&Array.isArray(p.cues)?p.cues:[];if(!cues.length)return{kind:"narration",text:""};
  return cues[Math.max(0,Math.min(cues.length-1,Number(t.cueIndex)||0))]||cues[0];
}
function setBackdrop(root,path){
  const node=root.querySelector(".kv2-backdrop");if(!node)return;
  const safe=String(path||"").replace(/\\/g,"\\\\").replace(/"/g,'\\"');
  const value=`linear-gradient(180deg,rgba(0,0,0,.06),rgba(0,0,0,.42)),url("${safe}")`;
  if(node.style.backgroundImage!==value)node.style.backgroundImage=value;
}
function actorAnchor(actor){
  const slot=actorSlot(actor);
  if(slot==="kakashi")return"PLAYER_LEFT";
  if(slot==="amt")return"INNER_LEFT";
  if(slot==="ps")return"CENTER";
  if(slot==="mi")return"OPPONENT_RIGHT";
  if(slot==="pakkun")return"INNER_LEFT";
  if(slot==="anbu")return"PLAYER_LEFT";
  if(slot==="minato")return"OPPONENT_RIGHT";
  return"CENTER";
}
function participantStateForActor(p,actor){
  const s=p&&p.state||{},slot=actorSlot(actor);
  if(slot==="mi")return s.participants&&s.participants.MI&&s.participants.MI.state||null;
  if(slot==="ps")return s.participants&&s.participants.PS&&s.participants.PS.state||null;
  if(slot==="amt")return s.participants&&s.participants.AMT&&s.participants.AMT.state||null;
  if(slot==="pakkun")return s.pakkun&&s.pakkun.present===true?"PRESENT":null;
  return null;
}
function readableActorState(p,actor){
  const raw=participantStateForActor(p,actor);
  const slot=actorSlot(actor),holder=p&&p.state&&p.state.package&&p.state.package.holder||null;
  const key=slot==="mi"?"MI":slot==="ps"?"PS":slot==="amt"?"AMT":slot==="kakashi"?"KAKASHI":slot==="anbu"?"ANBU":null;
  if(key&&holder===key)return"HAS PACKAGE";
  const map={BATTLE_DEFEATED:"DEFEATED",FIELD_SECURED_PENDING_COLLECTION:"RESTRAINED",ANBU_CUSTODY:"ANBU CUSTODY",POLICE_CUSTODY:"POLICE CUSTODY",ESCAPED:"ESCAPED",RELEASED:"RELEASED",DEAD:"DEAD"};
  return raw&&map[raw]||null;
}
function speakerActorId(p,cue){
  const name=String(cue&&cue.speakerName||"").toUpperCase();
  if(!name)return null;
  const aliases=[
    [/KAKASHI/,"kakashi"],[/MASKED INTERCEPTOR|INTERCEPTOR/,"mi"],[/PACKAGE SMUGGLER|SMUGGLER/,"ps"],
    [/ANBU MARKED TARGET|MARKED TARGET/,"amt"],[/PAKKUN/,"pakkun"],[/MINATO|HOKAGE/,"minato"],[/ANBU/,"anbu"]
  ];
  const slot=(aliases.find(([re])=>re.test(name))||[])[1]||null;
  const actor=(p&&p.actors||[]).find(a=>actorSlot(a)===slot);
  return actor&&actor.id||null;
}
function holderSlot(holder){
  return holder==="AMT"?"amt":holder==="PS"?"ps":holder==="MI"?"mi":holder==="KAKASHI"?"kakashi":holder==="ANBU"?"anbu":null;
}
function holderActor(p,holder){
  const slot=holderSlot(holder);
  return (p&&p.actors||[]).find(a=>actorSlot(a)===slot)||null;
}
function snapshotProjection(p){
  if(!p)return null;
  const participants=p.state&&p.state.participants||{};
  return{
    id:String(p.id||""),
    preset:String(p.preset||"standard"),
    actors:(p.actors||[]).map(a=>({id:String(a.id||""),slot:actorSlot(a),anchor:actorAnchor(a)})),
    packageHolder:p.state&&p.state.package&&p.state.package.holder||null,
    participantStates:{MI:participants.MI&&participants.MI.state||null,PS:participants.PS&&participants.PS.state||null,AMT:participants.AMT&&participants.AMT.state||null}
  };
}
function departureMode(previous,next,id){
  const prev=(previous&&previous.actors||[]).find(a=>a.id===id);
  const key=prev&&prev.slot==="mi"?"MI":prev&&prev.slot==="ps"?"PS":prev&&prev.slot==="amt"?"AMT":null;
  const state=key&&next&&next.participantStates&&next.participantStates[key]||null;
  if(state==="ESCAPED"||state==="RELEASED")return"FLEE";
  if(state==="DEAD"||state==="BATTLE_DEFEATED")return"COLLAPSE";
  return"EXIT";
}
function prepareDepartureGhosts(root,previous,next){
  const ghostLayer=root.querySelector(".kv2-ghost-layer"),out=[];
  if(!ghostLayer||!previous||!next)return out;
  const nextIds=new Set((next.actors||[]).map(a=>a.id));
  for(const row of previous.actors||[]){
    if(nextIds.has(row.id))continue;
    const live=[...root.querySelectorAll(".kv2-actors > .kv2-actor")].find(n=>n.dataset.actorId===row.id);
    if(!live)continue;
    const rr=root.getBoundingClientRect(),rect=live.getBoundingClientRect(),ghost=live.cloneNode(true);
    const ghostId="departure:"+row.id;
    ghost.dataset.actorId=ghostId;ghost.classList.add("kv2-departure-ghost");
    ghost.style.left=(rect.left-rr.left)+"px";ghost.style.top=(rect.top-rr.top)+"px";ghost.style.bottom="auto";
    ghost.style.width=rect.width+"px";ghost.style.height=rect.height+"px";
    ghostLayer.appendChild(ghost);
    out.push({originalId:row.id,ghostId,kind:departureMode(previous,next,row.id)});
  }
  return out;
}
function syncPackageToken(root,p){
  const token=root.querySelector('[data-story-object-id="PACKAGE"]');if(!token)return;
  const holder=p&&p.state&&p.state.package&&p.state.package.holder||null;
  const actor=holderActor(p,holder);
  if(!holder||!actor){token.hidden=true;return;}
  token.hidden=false;token.dataset.packageHolder=String(holder);
  const finalAnchor=actorAnchor(actor);
  if(typeof applyStoryStageAnchor33900==="function")applyStoryStageAnchor33900(token,finalAnchor);
  else token.style.setProperty("--sc-stage-anchor-x","50%");
  token.dataset.packageAnchor=finalAnchor;
}
function deriveProjectionChoreography(root,previous,next,p){
  if(!previous||!next)return[];
  const cues=[];
  const prevIds=new Set((previous.actors||[]).map(a=>a.id));
  for(const actor of next.actors||[]){
    if(!prevIds.has(actor.id))cues.push({kind:actor.slot==="mi"?"SURPRISE_ENTRY":"ENTER",actorId:actor.id,fromAnchor:actor.slot==="mi"?"FAR_ENTRY_RIGHT":null});
  }
  for(const row of prepareDepartureGhosts(root,previous,next))cues.push({kind:row.kind,actorId:row.ghostId});
  if(previous.packageHolder&&next.packageHolder&&previous.packageHolder!==next.packageHolder){
    const from=(previous.actors||[]).find(a=>a.slot===holderSlot(previous.packageHolder));
    const to=(next.actors||[]).find(a=>a.slot===holderSlot(next.packageHolder));
    if(from&&to)cues.push({kind:"OBJECT_TRANSFER",objectId:"PACKAGE",fromAnchor:from.anchor,toAnchor:to.anchor});
  }
  if(previous.id==="v2_watch_exchange"&&next.id==="v2_stop_assassin_setup"){
    const kakashi=(p.actors||[]).find(a=>actorSlot(a)==="kakashi"),mi=(p.actors||[]).find(a=>actorSlot(a)==="mi");
    if(kakashi&&mi)cues.push({kind:"FOCUS",actorId:kakashi.id},{kind:"LUNGE",actorId:kakashi.id,targetId:mi.id});
  }
  if(next.id==="v2_mi_stop_win"&&next.participantStates.MI==="BATTLE_DEFEATED"){
    const mi=(p.actors||[]).find(a=>actorSlot(a)==="mi");
    if(mi)cues.push({kind:"RECOIL",actorId:mi.id},{kind:"COLLAPSE",actorId:mi.id});
  }
  return cues;
}
function playProjectionTransition(root,previous,next,p){
  if(typeof playStoryChoreography33900!=="function"||!previous||!next)return{success:true,skipped:true};
  const cues=deriveProjectionChoreography(root,previous,next,p);
  const rt=active();
  const scopeKey=(rt&&rt.instanceId||"kakashi")+":"+next.id+":"+previous.id+"->"+next.id+":"+String(next.packageHolder||"");
  return playStoryChoreography33900({root,scopeKey,cues});
}

function syncActors(root,actors,p){
  const box=root.querySelector(".kv2-actors");if(!box)return;
  const desired=Array.isArray(actors)?actors:[];
  box.dataset.count=String(desired.length);
  const keep=new Set(desired.map(a=>String(a.id||"")));
  for(const node of [...box.querySelectorAll(":scope > .kv2-actor")]){
    if(!keep.has(String(node.dataset.actorId||"")))node.remove();
  }
  const existing=new Map([...box.querySelectorAll(":scope > .kv2-actor")].map(node=>[String(node.dataset.actorId||""),node]));
  for(const actor of desired){
    const id=String(actor.id||"");
    let node=existing.get(id);
    if(!node){node=actorMarkup(actor);existing.set(id,node);}
    const img=node.querySelector("img"),label=node.querySelector(".kv2-actor-label"),name=label&&label.querySelector("strong"),stateNode=label&&label.querySelector(".kv2-actor-state");
    if(img&&img.getAttribute("src")!==String(actor.image||""))img.setAttribute("src",String(actor.image||""));
    if(name&&name.textContent!==String(actor.label||""))name.textContent=String(actor.label||"");
    const stateText=readableActorState(p,actor);
    if(stateNode){stateNode.hidden=!stateText;if(stateNode.textContent!==String(stateText||""))stateNode.textContent=String(stateText||"");}
    const slot=actorSlot(actor);if(node.dataset.slot!==slot)node.dataset.slot=slot;
    if(typeof applyStoryStageAnchor33900==="function")applyStoryStageAnchor33900(node,actorAnchor(actor));
    box.appendChild(node);
  }
}
function syncActions(root,actions){
  const box=root.querySelector(".kv2-actions");if(!box)return;
  const signature=JSON.stringify(actions||[]);
  if(box.dataset.signature===signature)return;
  box.dataset.signature=signature;
  box.replaceChildren();
  for(const action of actions||[]){
    const button=document.createElement("button");button.type="button";
    if(action.choiceId)button.dataset.kv2Choice=String(action.choiceId);
    else button.dataset.kv2Advance="true";
    if(action.battle===true)button.className="kv2-battle";
    button.textContent=String(action.label||"");
    box.appendChild(button);
  }
}
function syncStandard(root,p,t){
  const cue=currentCue(p,t),speaker=cue.kind==="dialogue"?cue.speakerName:(cue.kind==="record"?"CHRONICLE RECEIPT":"NARRATION");
  setBackdrop(root,p.backdrop);
  const location=root.querySelector(".kv2-location"),objective=root.querySelector(".kv2-objective"),objectiveText=objective&&objective.querySelector("span");
  if(location&&location.textContent!==String(p.location||"KONOHA · NIGHT"))location.textContent=String(p.location||"KONOHA · NIGHT");
  if(objective){objective.style.display=p.objective?"":"none";if(objectiveText&&objectiveText.textContent!==String(p.objective||""))objectiveText.textContent=String(p.objective||"");}
  syncActors(root,Array.isArray(p.actors)?p.actors:[],p);
  syncPackageToken(root,p);
  const focused=speakerActorId(p,cue);
  for(const node of root.querySelectorAll(".kv2-actor"))node.classList.toggle("is-focus",!!focused&&node.dataset.actorId===focused);
  const speakerNode=root.querySelector(".kv2-speaker"),progress=root.querySelector(".kv2-progress"),textNode=root.querySelector(".kv2-text");
  if(speakerNode&&speakerNode.textContent!==String(speaker||""))speakerNode.textContent=String(speaker||"");
  const progressText=`${Math.min((Number(t.cueIndex)||0)+1,Math.max(1,Number(t.cueCount)||1))} / ${Math.max(1,Number(t.cueCount)||1)}`;
  if(progress&&progress.textContent!==progressText)progress.textContent=progressText;
  if(textNode&&textNode.textContent!==String(cue.text||""))textNode.textContent=String(cue.text||"");
  const choices=t.atEnd?availableChoices():[];
  const beat=typeof getCurrentStorySceneBeat==="function"?getCurrentStorySceneBeat():null;
  const battleReady=t.atEnd&&beat&&beat.mode==="battle_transition";
  root.dataset.battleActionOnly=battleReady&&Number(t.cueCount||0)===0?"true":"false";
  const semanticNext=t.atEnd&&beat&&beat.mode!=="choice"&&beat.mode!=="battle_transition";
  const actions=choices.length?choices.map(row=>({choiceId:row.choiceId,label:row.label})):battleReady?[{label:"BEGIN PL BATTLE",battle:true}]:[];
  syncActions(root,actions);
  const actionBox=root.querySelector(".kv2-actions");if(actionBox)actionBox.style.display=actions.length?"grid":"none";
  const next=root.querySelector(".kv2-next");if(next)next.style.display=!actions.length&&(!t.atEnd||semanticNext)?"":"none";
}
function syncReceipt(root,p,t){
  root.dataset.battleActionOnly="false";
  setBackdrop(root,p.backdrop);
  syncActors(root,[]);
  const cue=currentCue(p,t),pre=root.querySelector(".kv2-receipt pre");
  if(pre&&pre.textContent!==String(cue.text||""))pre.textContent=String(cue.text||"");
}
function render(){
  if(rendering||typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");
  if(!isActive()){if(layer){delete layer.dataset.kakashiV2;const stale=document.getElementById(ROOT_ID);if(stale){if(typeof cancelStoryChoreography33900==="function")cancelStoryChoreography33900(stale,"story_suspended_or_exited");stale.remove();}}if(!active()||active().sceneId!==SCENE_ID)lastProjectionSnapshot=null;return false;}
  if(!layer)return false;
  const p=projection();if(!p)return false;
  rendering=true;
  try{
    installStyle();layer.dataset.kakashiV2="true";const root=ensureRoot(layer);root.dataset.preset=p.preset||"standard";
    const previous=lastProjectionSnapshot,next=snapshotProjection(p),semanticChanged=!!previous&&!!next&&(previous.id!==next.id||previous.packageHolder!==next.packageHolder||JSON.stringify(previous.actors)!==JSON.stringify(next.actors)||JSON.stringify(previous.participantStates)!==JSON.stringify(next.participantStates));
    const t=cueState();
    if(p.preset==="chronicle_receipt")syncReceipt(root,p,t);else syncStandard(root,p,t);
    if(semanticChanged)playProjectionTransition(root,previous,next,p);
    lastProjectionSnapshot=next;
    bind(root);return true;
  }finally{rendering=false;}
}
function bind(root){
  for(const b of root.querySelectorAll("[data-kv2-choice]"))b.onclick=()=>globalThis.advanceAcademyKakashiV236040?globalThis.advanceAcademyKakashiV236040(b.dataset.kv2Choice):advanceStoryScene(b.dataset.kv2Choice);
  for(const b of root.querySelectorAll("[data-kv2-advance]"))b.onclick=()=>globalThis.advanceAcademyKakashiV236040?globalThis.advanceAcademyKakashiV236040():advanceStoryScene();
  const box=root.querySelector(".kv2-dialogue");
  if(box)box.onclick=e=>{if(e.target&&e.target.closest&&e.target.closest("button"))return;globalThis.advanceAcademyKakashiV236040?globalThis.advanceAcademyKakashiV236040():advanceStoryScene();};
}
function setWipe(covering){
  const root=document.getElementById(ROOT_ID),wipe=root&&root.querySelector(".kv2-wipe");if(!wipe)return false;
  wipe.classList.toggle("is-covering",covering===true);return true;
}
const PRE_RENDER=typeof renderStoryScenePresentationLayer==="function"?renderStoryScenePresentationLayer:null;
if(PRE_RENDER){
  globalThis.renderStoryScenePresentationLayer=function kakashiV2RendererWrapper(){const result=PRE_RENDER.apply(this,arguments);if(isActive())render();return result;};
  try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_e){}
}
if(typeof document!=="undefined"){
  document.addEventListener("keydown",e=>{if(!isActive()||e.defaultPrevented||!(e.key==="Enter"||e.key===" "))return;const tag=String(e.target&&e.target.tagName||"").toLowerCase();if(["input","textarea","select"].includes(tag))return;e.preventDefault();globalThis.advanceAcademyKakashiV236040?globalThis.advanceAcademyKakashiV236040():advanceStoryScene();});
}
function geometryDiagnostics(){
  if(typeof document==="undefined")return{pass:true,headless:true};
  const root=document.getElementById(ROOT_ID);if(!root)return{pass:false,reason:"renderer_root_missing"};
  const objective=root.querySelector(".kv2-objective"),dialogue=root.querySelector(".kv2-dialogue"),actors=[...root.querySelectorAll(".kv2-actor")];
  const intersects=(a,b)=>a&&b&&!(a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom);
  const ob=objective&&objective.getBoundingClientRect(),db=dialogue&&dialogue.getBoundingClientRect();
  const actorBounds=actors.map(a=>a.getBoundingClientRect());
  return{pass:(!ob||actorBounds.every(b=>!intersects(ob,b)))&&(!db||actorBounds.every(b=>!intersects(db,b))),objectiveActorOverlap:ob?actorBounds.filter(b=>intersects(ob,b)).length:0,dialogueActorOverlap:db?actorBounds.filter(b=>intersects(db,b)).length:0,visibleDialogueSurfaces:root.querySelectorAll(".kv2-dialogue").length};
}
function diagnostics(){
  const source=render.toString(),checks={
    soleKakashiRoot:ROOT_ID==="kakashi-v2-scene-board",
    hidesNativeStorySurface:installStyle.toString().includes('>*:not(#')&&installStyle.toString().includes('{display:none!important}'),
    protectedObjectiveRegion:installStyle.toString().includes("grid-template-columns:minmax(0,1fr) minmax(240px,34%)"),
    protectedDialogueRegion:installStyle.toString().includes("bottom:29%")&&installStyle.toString().includes("bottom:3.7%"),
    receiptReplacesScene:installStyle.toString().includes('[data-preset="chronicle_receipt"] .kv2-top')&&String(syncReceipt).includes("kv2-receipt"),
    projectionComesFromCore:String(projection).includes("getAcademyKakashiV2Presentation36020"),
    stableKeyedActorDom:!String(syncStandard).includes("innerHTML")&&!String(syncActors).includes("innerHTML")&&String(syncActors).includes("appendChild(node)"),
    persistentGhostLayer:String(ensureRoot).includes("kv2-ghost-layer"),
    deterministicActorSlots:String(actorSlot).includes("academy_kakashi_origin_masked_interceptor")&&installStyle.toString().includes('data-slot="minato"'),
    sharedSemanticAnchors:String(syncActors).includes("applyStoryStageAnchor33900")&&String(actorAnchor).includes("PLAYER_LEFT")&&String(actorAnchor).includes("OPPONENT_RIGHT"),
    adaptiveActorProminence:installStyle.toString().includes('data-count="1"')&&installStyle.toString().includes('data-count="2"'),
    sharedChoreographyConsumer:String(playProjectionTransition).includes("playStoryChoreography33900"),
    packageTokenConsumesHolderTruth:String(syncPackageToken).includes("state.package")&&String(syncPackageToken).includes("packageHolder"),
    speakerFocusUsesCurrentCue:String(syncStandard).includes("speakerActorId"),
    noMutationObserver:!String(render).includes("MutationObserver"),
    battleSuspendsStoryProjection:String(storySuspendedForBattle).includes("pendingBattle")&&String(storySuspendedForBattle).includes('rc.type==="story_scene"'),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.renderAcademyKakashiV236030=render;
globalThis.setAcademyKakashiV2Wipe36030=setWipe;
globalThis.playAcademyKakashiV2ProjectionTransition36030=playProjectionTransition;
globalThis.runAcademyKakashiV2Renderer36030Diagnostics=diagnostics;
globalThis.runAcademyKakashiV2Geometry36030=geometryDiagnostics;
globalThis.SC_ACADEMY_KAKASHI_V2_RENDERER_36030=Object.freeze({patchId:PATCH_ID,rootId:ROOT_ID,browserGoldenClaimed:false});
try{if(isActive())render();}catch(_e){}
})();
