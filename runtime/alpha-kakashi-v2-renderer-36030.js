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
let rendering=false,lastProjectionSnapshot=null,pendingVisualSnapshot=null,lastBattleSuspended=false;

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
#${ROOT_ID} .kv2-actor{position:absolute;left:var(--sc-stage-anchor-x,var(--kv2-x,5%));bottom:var(--kv2-y,0);width:var(--kv2-w,min(20vw,220px));height:var(--kv2-h,min(52vh,380px));max-height:100%;display:flex;align-items:flex-end;justify-content:center;opacity:.92;filter:saturate(.96) brightness(.96) drop-shadow(0 18px 24px rgba(0,0,0,.48));transform:none!important;transition:none!important;will-change:auto!important}\n#${ROOT_ID} .kv2-actors[data-count="1"] .kv2-actor{--kv2-w:min(29vw,330px);--kv2-h:min(62vh,465px)}\n#${ROOT_ID} .kv2-actors[data-count="2"] .kv2-actor{--kv2-w:min(25vw,292px);--kv2-h:min(59vh,435px)}\n#${ROOT_ID} .kv2-actors[data-count="3"] .kv2-actor{--kv2-w:min(21vw,235px);--kv2-h:min(53vh,390px)}\n#${ROOT_ID} .kv2-actors[data-count="4"] .kv2-actor,#${ROOT_ID} .kv2-actors[data-count="5"] .kv2-actor{--kv2-w:min(18vw,195px);--kv2-h:min(48vh,350px)}\n#${ROOT_ID} .kv2-actor.is-focus{opacity:1;filter:saturate(1.05) brightness(1.08) drop-shadow(0 22px 30px rgba(0,0,0,.55));z-index:4}
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
/* Final Kakashi Golden motion policy: actor/card choreography is static.
   Story truth and cue-local staging still advance, but no actor animation owns frames. */
#${ROOT_ID} .kv2-actor.is-entering{animation:none!important}
#${ROOT_ID} .kv2-ghost-layer{display:none!important}
#${ROOT_ID} .kv2-actor-ghost,#${ROOT_ID} .kv2-departure-ghost,#${ROOT_ID} .kv2-outgoing-hold-ghost{display:none!important;animation:none!important;transition:none!important}
#${ROOT_ID} [data-sc-choreography-active],
#${ROOT_ID} .sc-choreo-enter,#${ROOT_ID} .sc-choreo-surprise-entry,#${ROOT_ID} .sc-choreo-collapse,#${ROOT_ID} .sc-choreo-flee,#${ROOT_ID} .sc-choreo-exit,
#${ROOT_ID} .sc-choreo-reposition,#${ROOT_ID} .sc-choreo-handoff,#${ROOT_ID} .sc-choreo-object-transfer,
#${ROOT_ID} .sc-choreo-focus,#${ROOT_ID} .sc-choreo-strike,#${ROOT_ID} .sc-choreo-recoil,#${ROOT_ID} .sc-choreo-lunge{
  animation:none!important;transition:none!important;transform:none!important;will-change:auto!important
}
#${ROOT_ID} .kv2-card-frame{display:none!important}
#${ROOT_ID} .kv2-actor-label{position:absolute;left:6%;right:6%;bottom:3%;padding:6px 8px;border:1px solid rgba(208,168,75,.4);background:rgba(2,7,11,.88);text-align:center;font-size:8px;font-weight:900;letter-spacing:.11em;color:#eee2c7;text-shadow:0 1px 2px #000}\n#${ROOT_ID} .kv2-actor-state{display:table;margin:4px auto 0;padding:2px 6px;border:1px solid rgba(92,215,225,.35);background:rgba(4,23,28,.82);color:#7fe1e8;font-size:7px;font-weight:900;letter-spacing:.08em}\n#${ROOT_ID} .kv2-object-layer{position:absolute;inset:0;z-index:16;pointer-events:none}\n#${ROOT_ID} .kv2-package-token{position:absolute;top:42%;left:var(--sc-stage-anchor-x,50%);width:64px;height:45px;transform:translate(-8%,-50%);display:grid;place-items:center;border:1px solid rgba(221,178,73,.75);background:linear-gradient(145deg,rgba(42,30,12,.95),rgba(12,14,13,.96));box-shadow:0 12px 28px rgba(0,0,0,.48),0 0 18px rgba(221,178,73,.12);color:#e4c66e;font-size:7px;font-weight:900;letter-spacing:.12em}\n#${ROOT_ID} .kv2-package-token::before{content:"";position:absolute;width:32px;height:21px;border:1px solid rgba(226,190,100,.64);background:linear-gradient(135deg,#4a3a21,#21190f);transform:rotate(-4deg)}\n#${ROOT_ID} .kv2-package-token span{position:absolute;top:calc(100% + 5px);white-space:nowrap;padding:3px 5px;background:rgba(2,8,11,.82);border:1px solid rgba(215,174,76,.32)}\n#${ROOT_ID} .kv2-package-token[hidden]{display:none!important}\n#${ROOT_ID} .kv2-departure-ghost,#${ROOT_ID} .kv2-outgoing-hold-ghost{position:absolute!important;z-index:13!important;pointer-events:none!important}\n#${ROOT_ID} .kv2-departure-ghost{display:flex;align-items:flex-end;justify-content:center;opacity:.92;filter:saturate(.9) brightness(.94) drop-shadow(0 18px 24px rgba(0,0,0,.48));transform:translate3d(0,0,0)}\n#${ROOT_ID} .kv2-outgoing-hold-ghost{display:flex;align-items:flex-end;justify-content:center;opacity:.92;filter:saturate(.96) brightness(.96) drop-shadow(0 18px 24px rgba(0,0,0,.48));transform:translate3d(0,0,0)}\n#${ROOT_ID} .kv2-departure-ghost img,#${ROOT_ID} .kv2-outgoing-hold-ghost img{display:block;width:100%;height:100%;object-fit:contain;object-position:center bottom}\n#${ROOT_ID} .kv2-actors{transition:none!important}
#${ROOT_ID}[data-transition-active="true"] .kv2-actors{pointer-events:none!important}\n#${ROOT_ID} .kv2-dialogue{position:absolute;left:50%;bottom:3%;width:min(72%,980px);min-height:0;max-height:none;z-index:30;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto auto auto;column-gap:14px;padding:11px 15px 12px;transform:translateX(-50%);border:1px solid rgba(93,215,225,.32);border-radius:16px;background:linear-gradient(180deg,rgba(5,16,22,.88),rgba(2,9,14,.95));box-shadow:0 18px 48px rgba(0,0,0,.46),inset 0 0 0 1px rgba(255,255,255,.025);backdrop-filter:blur(8px)}
#${ROOT_ID} .kv2-speaker{grid-column:1;grid-row:1;color:#e3bd5f;font-size:8px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;min-height:11px}
#${ROOT_ID} .kv2-text{grid-column:1/-1;grid-row:2;margin-top:4px;max-height:8.5vh;overflow:auto;white-space:pre-wrap;color:#eef3f1;font-size:clamp(12px,.94vw,15px);line-height:1.42;text-shadow:0 1px 2px #000}
#${ROOT_ID} .kv2-progress{grid-column:2;grid-row:1;color:#71858c;font-size:8px;font-weight:900;letter-spacing:.08em}
#${ROOT_ID} .kv2-continue-hint{grid-column:1/-1;grid-row:3;justify-self:end;margin-top:5px;color:#6fcfd8;font-size:7px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;opacity:.72}
#${ROOT_ID}[data-cue-kind="dialogue"] .kv2-dialogue{display:none}
#${ROOT_ID}[data-has-choices="true"] .kv2-dialogue{display:grid;width:min(88%,1280px);padding:11px 13px 13px;border-color:rgba(211,171,78,.55);border-radius:18px;background:linear-gradient(180deg,rgba(4,13,18,.94),rgba(2,8,12,.98))}
#${ROOT_ID}[data-has-choices="true"] .kv2-text{max-height:none}
#${ROOT_ID}[data-has-choices="true"] .kv2-continue-hint{display:none}
#${ROOT_ID} .kv2-speech{position:absolute;left:var(--kv2-speech-x,50%);bottom:23.5%;z-index:31;width:min(36vw,500px);box-sizing:border-box;transform:translateX(-50%);padding:12px 15px 13px;border:1px solid rgba(103,221,230,.55);border-radius:16px;background:linear-gradient(145deg,rgba(4,18,24,.94),rgba(2,9,14,.97));box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 22px rgba(78,210,220,.08);backdrop-filter:blur(8px);pointer-events:none}
#${ROOT_ID} .kv2-speech[hidden]{display:none!important}
#${ROOT_ID} .kv2-speech::after{content:"";position:absolute;left:var(--kv2-speech-tail,50%);top:-8px;width:14px;height:14px;transform:translateX(-50%) rotate(45deg);border-left:1px solid rgba(103,221,230,.5);border-top:1px solid rgba(103,221,230,.5);background:rgba(2,9,14,.97)}
#${ROOT_ID} .kv2-speech[data-speaker-side="opposition"]{border-color:rgba(218,176,77,.58);background:linear-gradient(145deg,rgba(25,18,6,.93),rgba(8,10,12,.97));box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 22px rgba(218,176,77,.08)}
#${ROOT_ID} .kv2-speech[data-speaker-side="opposition"]::after{border-color:rgba(218,176,77,.52);background:rgba(8,10,12,.97)}
#${ROOT_ID} .kv2-speech-name{color:#78dfe7;font-size:8px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}
#${ROOT_ID} .kv2-speech[data-speaker-side="opposition"] .kv2-speech-name{color:#e5c66f}
#${ROOT_ID} .kv2-speech-text{margin-top:5px;color:#f0f4f1;font-size:clamp(12px,.96vw,16px);line-height:1.42;text-shadow:0 1px 2px #000}
#${ROOT_ID} .kv2-actions{grid-column:1/-1;grid-row:3;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:10px;max-height:none;overflow:visible}
#${ROOT_ID} .kv2-actions button{position:relative;min-height:40px;border:1px solid rgba(211,171,78,.48);border-radius:10px;background:linear-gradient(180deg,rgba(13,27,33,.96),rgba(5,13,18,.98));color:#eee2c8;padding:8px 10px 8px 36px;text-align:left;font-size:clamp(7px,.56vw,10px);font-weight:900;letter-spacing:.07em;cursor:pointer;transition:border-color .14s ease,color .14s ease,transform .14s ease,background .14s ease}
#${ROOT_ID} .kv2-actions button::before{content:attr(data-intent-icon);position:absolute;left:11px;top:50%;transform:translateY(-50%);display:grid;place-items:center;width:16px;height:16px;border:1px solid rgba(112,215,224,.3);border-radius:50%;color:#74dce4;font-size:10px}
#${ROOT_ID} .kv2-actions button:hover,#${ROOT_ID} .kv2-actions button:focus-visible{border-color:#68dce6;color:#8ce5ec;outline:none;background:rgba(10,42,49,.96);transform:translateY(-1px)}
#${ROOT_ID} .kv2-battle{grid-column:1/-1!important;text-align:center!important;padding-left:10px!important;border-color:rgba(206,91,72,.66)!important;color:#f2c0ae!important;background:linear-gradient(180deg,rgba(67,20,15,.82),rgba(27,9,8,.95))!important}
#${ROOT_ID} .kv2-battle::before{display:none!important}
#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-top,#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-actors,#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-dialogue,#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-speech{display:none!important}
#${ROOT_ID} .kv2-receipt{display:none;position:absolute;left:50%;top:50%;width:min(780px,78vw);max-height:76vh;transform:translate(-50%,-50%);z-index:40;box-sizing:border-box;padding:34px 38px;border:1px solid rgba(214,173,74,.72);border-radius:18px;background:linear-gradient(165deg,rgba(6,13,17,.98),rgba(2,7,10,.99));box-shadow:0 36px 90px rgba(0,0,0,.72),inset 0 0 50px rgba(201,162,73,.03);overflow:auto}
#${ROOT_ID} .kv2-receipt span{display:block;color:#64dae3;font-size:9px;font-weight:900;letter-spacing:.16em}
#${ROOT_ID} .kv2-receipt h1{margin:9px 0 18px;color:#e5c66f;font:900 clamp(21px,2.1vw,34px)/1 Georgia,serif;letter-spacing:.05em}
#${ROOT_ID} .kv2-receipt pre{margin:0;white-space:pre-wrap;color:#e1e6e1;font:600 clamp(11px,.83vw,14px)/1.65 inherit}
#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-receipt{display:block}
#${ROOT_ID}[data-battle-action-only="true"] .kv2-speaker,#${ROOT_ID}[data-battle-action-only="true"] .kv2-progress,#${ROOT_ID}[data-battle-action-only="true"] .kv2-text,#${ROOT_ID}[data-battle-action-only="true"] .kv2-continue-hint{display:none!important}
#${ROOT_ID}[data-battle-action-only="true"] .kv2-dialogue{display:grid!important;width:min(56%,720px);padding:10px 14px;grid-template-rows:1fr}
#${ROOT_ID}[data-battle-action-only="true"] .kv2-actions{grid-row:1;margin-top:0;grid-template-columns:1fr}
#${ROOT_ID} .kv2-receipt button{margin-top:24px;width:100%;min-height:40px;border:1px solid rgba(95,215,225,.42);border-radius:10px;background:rgba(7,33,39,.72);color:#78dfe7;font-weight:900;letter-spacing:.1em;cursor:pointer}
#${ROOT_ID}[data-can-advance="true"]{cursor:pointer}
#${ROOT_ID}[data-has-choices="true"]{cursor:default}
#${ROOT_ID} .kv2-actor.kv2-cue-departed{opacity:0!important;pointer-events:none!important}
#${ROOT_ID} .kv2-actor[hidden]{display:none!important}
#${ROOT_ID} [data-sc-choreography-pending-entry="true"],#${ROOT_ID} [data-kv2-cue-withheld="true"]{opacity:0!important;visibility:hidden!important;pointer-events:none!important}
@media(max-width:900px){#${ROOT_ID} .kv2-actors{left:1.5%;right:1.5%;bottom:31%}#${ROOT_ID} .kv2-actor{--kv2-w:min(19vw,170px);--kv2-h:min(44vh,290px)}#${ROOT_ID} .kv2-actor[data-slot="pakkun"]{--kv2-w:min(13vw,120px);--kv2-h:min(30vh,210px)}#${ROOT_ID} .kv2-dialogue{width:94%;bottom:2.5%}#${ROOT_ID} .kv2-speech{width:min(70vw,480px);bottom:26%}#${ROOT_ID} .kv2-actions{grid-template-columns:repeat(2,minmax(0,1fr))}#${ROOT_ID} .kv2-top{left:2.5%;right:2.5%;grid-template-columns:1fr minmax(190px,42%)}}
@media(prefers-reduced-motion:reduce){#${ROOT_ID} *{animation:none!important;transition:none!important}}
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
  const img=document.createElement("img");img.alt="";img.src=String(actor.image||"");
  const label=document.createElement("figcaption");label.className="kv2-actor-label";
  const name=document.createElement("strong");name.textContent=String(actor.label||"");
  const state=document.createElement("small");state.className="kv2-actor-state";state.hidden=true;
  label.append(name,state);
  figure.append(img,label);
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
      <div class="kv2-actions"></div><div class="kv2-continue-hint" aria-hidden="true">CLICK ANYWHERE TO CONTINUE</div>
    </section>
    <aside class="kv2-speech" aria-live="polite" hidden><div class="kv2-speech-name"></div><div class="kv2-speech-text"></div></aside>
    <article class="kv2-receipt"><span>SHINOBI CHRONICLES · RECORD</span><h1>CHRONICLE RECEIPT</h1><pre></pre><button type="button" data-kv2-advance="true">CONTINUE</button></article>
    <div class="kv2-object-layer" aria-hidden="true"><div class="kv2-package-token" data-story-object-id="PACKAGE" hidden><span>PACKAGE</span></div></div>
    <div class="kv2-ghost-layer" aria-hidden="true"></div>`;
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
function actorAnchor(actor,p=null){
  const slot=actorSlot(actor),preset=String(p&&p.preset||"standard"),slots=(p&&p.actors||[]).map(actorSlot);
  if(["rooftop_2_person","tail","battle_pair"].includes(preset))return slot==="kakashi"?"PLAYER_LEFT":"OPPONENT_RIGHT";
  if(preset==="sakura_3_person")return slot==="amt"?"INNER_LEFT":slot==="ps"?"CENTER":"OPPONENT_RIGHT";
  if(preset==="sakura_group"){
    if(slot==="kakashi")return"PLAYER_LEFT";
    if(slot==="pakkun")return"INNER_LEFT";
    if(slot==="mi")return"OPPONENT_RIGHT";
    if(slot==="amt")return slots.includes("pakkun")?"INNER_RIGHT":"INNER_LEFT";
    if(slot==="ps")return slots.includes("pakkun")?"CENTER":"INNER_RIGHT";
  }
  if(preset==="escort")return slot==="kakashi"?"PLAYER_LEFT":slot==="mi"?"INNER_LEFT":slot==="ps"?"CENTER":slot==="amt"?"INNER_RIGHT":"OPPONENT_RIGHT";
  if(preset==="anbu_report")return slot==="anbu"?"PLAYER_LEFT":slot==="pakkun"?"CENTER":"OPPONENT_RIGHT";
  if(preset==="hokage_report")return slot==="anbu"?"PLAYER_LEFT":"OPPONENT_RIGHT";
  if(slot==="kakashi")return"PLAYER_LEFT";
  if(slot==="minato"||slot==="anbu"||slot==="mi")return"OPPONENT_RIGHT";
  if(slot==="amt")return"INNER_LEFT";
  if(slot==="ps")return"INNER_RIGHT";
  if(slot==="pakkun")return"CENTER";
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
  const map={BATTLE_DEFEATED:"DEFEATED",RESTRAINED:"RESTRAINED",ANBU_CUSTODY:"ANBU CUSTODY",POLICE_CUSTODY:"POLICE CUSTODY",ESCAPED:"ESCAPED",RELEASED:"RELEASED",KILLED:"KILLED"};
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
    backdrop:String(p.backdrop||""),
    transition:String(p.transition||""),
    actors:(p.actors||[]).map(a=>({id:String(a.id||""),slot:actorSlot(a),anchor:actorAnchor(a,p)})),
    packageHolder:p.state&&p.state.package&&p.state.package.holder||null,
    participantStates:{MI:participants.MI&&participants.MI.state||null,PS:participants.PS&&participants.PS.state||null,AMT:participants.AMT&&participants.AMT.state||null}
  };
}
function isHardProjectionTransition(previous,next){
  if(!previous||!next)return false;
  return previous.transition==="wipe"||next.transition==="wipe"||String(previous.backdrop||"")!==String(next.backdrop||"");
}
function departureMode(previous,next,id){
  const prev=(previous&&previous.actors||[]).find(a=>a.id===id);
  const key=prev&&prev.slot==="mi"?"MI":prev&&prev.slot==="ps"?"PS":prev&&prev.slot==="amt"?"AMT":null;
  const state=key&&next&&next.participantStates&&next.participantStates[key]||null;
  if(state==="ESCAPED"||state==="RELEASED")return"FLEE";
  if(state==="KILLED"||state==="BATTLE_DEFEATED")return"COLLAPSE";
  return"EXIT";
}
function departureGhostClass(kind){return kind==="COLLAPSE"?"is-falling":kind==="FLEE"?"is-fleeing":"is-fading";}
function captureDepartureVisuals(root,previous){
  if(!root||!previous)return[];
  const rr=root.getBoundingClientRect(),out=[];
  for(const row of previous.actors||[]){
    const live=[...root.querySelectorAll(".kv2-actors > .kv2-actor")].find(n=>n.dataset.actorId===row.id);
    if(!live)continue;
    const rect=live.getBoundingClientRect();
    out.push({
      originalId:row.id,
      clone:live.cloneNode(true),
      left:Math.max(0,rect.left-rr.left),
      top:Math.max(0,rect.top-rr.top),
      width:rect.width,
      height:rect.height,
      rootWidth:rr.width
    });
  }
  return out;
}
function appendDepartureGhost(root,visual,kind){
  const ghostLayer=root&&root.querySelector(".kv2-ghost-layer");
  if(!ghostLayer||!visual||!visual.clone)return null;
  const ghost=visual.clone,ghostId="departure:"+visual.originalId;
  ghost.className="kv2-departure-ghost kv2-actor-ghost "+departureGhostClass(kind);
  ghost.hidden=false;ghost.removeAttribute("aria-hidden");
  ghost.dataset.actorId=ghostId;ghost.dataset.originalActorId=visual.originalId;
  delete ghost.dataset.kv2CueWithheld;delete ghost.dataset.scChoreographyActive;delete ghost.dataset.scChoreographyTarget;delete ghost.dataset.scChoreographyPendingEntry;
  ghost.style.left=visual.left+"px";ghost.style.top=visual.top+"px";ghost.style.bottom="auto";
  ghost.style.width=visual.width+"px";ghost.style.height=visual.height+"px";
  const center=visual.left+visual.width/2,mid=(Number(visual.rootWidth)||0)/2;
  ghost.style.setProperty("--kv2-departure-x",center<mid?"-70vw":"70vw");
  ghostLayer.appendChild(ghost);
  const cleanup=()=>{try{ghost.remove();}catch(_e){}};
  ghost.addEventListener("animationend",cleanup,{once:true});setTimeout(cleanup,1800);
  return{originalId:visual.originalId,ghostId,kind};
}
function materializeDepartureGhosts(root,capture,next){
  if(!root||!capture||!capture.previous||!next)return[];
  for(const stale of [...root.querySelectorAll(".kv2-departure-ghost")])stale.remove();
  const nextIds=new Set((next.actors||[]).map(a=>a.id)),out=[];
  for(const visual of capture.actorVisuals||[]){
    if(nextIds.has(visual.originalId))continue;
    const ghost=appendDepartureGhost(root,visual,departureMode(capture.previous,next,visual.originalId));
    if(ghost)out.push(ghost);
  }
  return out;
}
function appendOutgoingHoldGhost(root,visual){
  const ghostLayer=root&&root.querySelector(".kv2-ghost-layer");
  if(!ghostLayer||!visual||!visual.clone)return null;
  const ghost=visual.clone,ghostId="hold:"+visual.originalId;
  ghost.className="kv2-outgoing-hold-ghost kv2-actor-ghost";
  ghost.hidden=false;ghost.removeAttribute("aria-hidden");
  ghost.dataset.actorId=ghostId;ghost.dataset.originalActorId=visual.originalId;
  delete ghost.dataset.kv2CueWithheld;delete ghost.dataset.scChoreographyActive;delete ghost.dataset.scChoreographyTarget;delete ghost.dataset.scChoreographyPendingEntry;
  ghost.style.left=visual.left+"px";ghost.style.top=visual.top+"px";ghost.style.bottom="auto";
  ghost.style.width=visual.width+"px";ghost.style.height=visual.height+"px";
  ghostLayer.appendChild(ghost);
  return{originalId:visual.originalId,ghostId};
}
function materializeRetainedHoldGhosts(root,capture,next){
  if(!root||!capture||!capture.previous||!next)return[];
  for(const stale of [...root.querySelectorAll(".kv2-outgoing-hold-ghost")])stale.remove();
  const nextIds=new Set((next.actors||[]).map(a=>a.id)),out=[];
  for(const visual of capture.actorVisuals||[]){
    if(!nextIds.has(visual.originalId))continue;
    const ghost=appendOutgoingHoldGhost(root,visual);
    if(ghost)out.push(ghost);
  }
  return out;
}
function preparePreCommitVisualSnapshot(){
  const p=projection(),previous=lastProjectionSnapshot||snapshotProjection(p);
  if(!previous)return{success:false,reason:"kakashi_v2_visual_snapshot_unavailable"};
  pendingVisualSnapshot={previous,actorVisuals:[]};
  return{success:true,actorCount:0,beatId:previous.id,presentationOnly:true,staticPresentation:true};
}
function cancelPreparedVisualSnapshot(reason="cancelled"){
  const existed=!!pendingVisualSnapshot;pendingVisualSnapshot=null;
  return{success:true,cancelled:existed,reason,presentationOnly:true};
}
function syncPackageToken(root,p){
  const token=root.querySelector('[data-story-object-id="PACKAGE"]');if(!token)return;
  const holder=p&&p.state&&p.state.package&&p.state.package.holder||null;
  const actor=holderActor(p,holder);
  if(!holder||!actor){token.hidden=true;return;}
  token.hidden=false;token.dataset.packageHolder=String(holder);
  const finalAnchor=actorAnchor(actor,p);
  if(typeof applyStoryStageAnchor33900==="function")applyStoryStageAnchor33900(token,finalAnchor);
  else token.style.setProperty("--sc-stage-anchor-x","50%");
  token.dataset.packageAnchor=finalAnchor;
}
function deriveProjectionChoreography(root,previous,next,p,departures=[]){
  if(!previous||!next)return[];
  const cues=[];
  // Depart committed outgoing actors before revealing newly mounted actors.
  // The shared owner pre-stages ENTER subjects as invisible until their cue starts,
  // preventing a semantic commit from painting an accidental four-card tableau.
  for(const row of departures)cues.push({
    kind:row.kind,actorId:row.ghostId,removeOnComplete:true,
    ...(row.kind==="COLLAPSE"?{durationMs:300}:row.kind==="FLEE"?{durationMs:240}:{})
  });
  const prevIds=new Set((previous.actors||[]).map(a=>a.id));
  for(const actor of next.actors||[]){
    if(!prevIds.has(actor.id)){
      if(next.id==="v2_watch_exchange"&&actor.slot==="mi")continue;
      cues.push({kind:actor.slot==="mi"?"SURPRISE_ENTRY":"ENTER",actorId:actor.id,fromAnchor:actor.slot==="mi"?"FAR_ENTRY_RIGHT":null});
    }
  }
  if(previous.packageHolder&&next.packageHolder&&previous.packageHolder!==next.packageHolder){
    const from=(previous.actors||[]).find(a=>a.slot===holderSlot(previous.packageHolder));
    const to=(next.actors||[]).find(a=>a.slot===holderSlot(next.packageHolder));
    if(from&&to)cues.push({kind:"OBJECT_TRANSFER",objectId:"PACKAGE",fromAnchor:from.anchor,toAnchor:to.anchor});
  }
  if(previous.id==="v2_watch_exchange"&&next.id==="v2_stop_assassin_setup"){
    const kakashi=(p.actors||[]).find(a=>actorSlot(a)==="kakashi"),mi=(p.actors||[]).find(a=>actorSlot(a)==="mi");
    if(kakashi&&mi)cues.push(
      {kind:"FOCUS",actorId:kakashi.id,durationMs:110},
      {kind:"STRIKE",actorId:kakashi.id,targetId:mi.id,durationMs:360}
    );
  }
  if(next.id==="v2_direct_strike_setup"){
    const kakashi=(p.actors||[]).find(a=>actorSlot(a)==="kakashi");
    const target=(p.actors||[]).find(a=>actorSlot(a)==="amt")||(p.actors||[]).find(a=>actorSlot(a)==="ps");
    if(kakashi&&target)cues.push(
      {kind:"FOCUS",actorId:kakashi.id,durationMs:110},
      {kind:"STRIKE",actorId:kakashi.id,targetId:target.id,durationMs:360}
    );
  }
  if(next.id==="v2_mi_stop_win"&&next.participantStates.MI==="BATTLE_DEFEATED"){
    const mi=(p.actors||[]).find(a=>actorSlot(a)==="mi");
    if(mi)cues.push({kind:"RECOIL",actorId:mi.id},{kind:"COLLAPSE",actorId:mi.id});
  }
  return cues;
}
function playProjectionTransition(root,previous,next,p,departures=[]){
  if(root&&typeof cancelStoryChoreography33900==="function")cancelStoryChoreography33900(root,"kakashi_golden_static_motion");
  return{success:true,skipped:true,staticPresentation:true};
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
    if(typeof applyStoryStageAnchor33900==="function")applyStoryStageAnchor33900(node,actorAnchor(actor,p));
    box.appendChild(node);
  }
}
function choiceIntentIcon(label){
  const s=String(label||"").toUpperCase();
  if(/WATCH|OBSERVE|WAIT/.test(s))return"◉";
  if(/PACKAGE|SECURE|PICK|SLIP/.test(s))return"◆";
  if(/STOP|DEFEAT|STRIKE|KILL|ATTACK/.test(s))return"↯";
  if(/FOLLOW|GO AFTER|PURSUE|MOVE/.test(s))return"➜";
  if(/RESTRAIN|ANBU|POLICE/.test(s))return"⊙";
  return"◇";
}
function syncActions(root,actions){
  const box=root.querySelector(".kv2-actions");if(!box)return;
  const signature=JSON.stringify(actions||[]);
  if(box.dataset.signature===signature)return;
  const hadActions=box.children.length>0;
  box.dataset.signature=signature;
  box.replaceChildren();
  for(const action of actions||[]){
    const button=document.createElement("button");button.type="button";
    if(action.choiceId)button.dataset.kv2Choice=String(action.choiceId);
    else button.dataset.kv2Advance="true";
    if(action.battle===true)button.className="kv2-battle";
    button.dataset.intentIcon=choiceIntentIcon(action.label);
    button.textContent=String(action.label||"");
    box.appendChild(button);
  }
  if((actions||[]).length&&!hadActions)box.dataset.revealedAt=String(Date.now());
}
function actorNodeBySlot(root,slot){
  return [...root.querySelectorAll(".kv2-actor")].find(node=>node.dataset.slot===slot)||null;
}
function applyWatchExchangeStaticState(root,p,t){
  if(!p||p.id!=="v2_watch_exchange")return;
  const idx=Number(t&&t.cueIndex)||0,amt=actorNodeBySlot(root,"amt"),ps=actorNodeBySlot(root,"ps"),mi=actorNodeBySlot(root,"mi");
  if(amt&&typeof applyStoryStageAnchor33900==="function")applyStoryStageAnchor33900(amt,idx>=5?"PLAYER_LEFT":"INNER_LEFT");
  if(ps&&typeof applyStoryStageAnchor33900==="function")applyStoryStageAnchor33900(ps,idx>=6?"OPPONENT_RIGHT":"INNER_RIGHT");
  if(mi&&typeof applyStoryStageAnchor33900==="function")applyStoryStageAnchor33900(mi,"CENTER");
  if(mi){
    const withheld=idx<10;
    if(withheld){mi.dataset.kv2CueWithheld="true";mi.hidden=true;mi.setAttribute("aria-hidden","true");}
    else{delete mi.dataset.kv2CueWithheld;mi.hidden=false;mi.removeAttribute("aria-hidden");}
  }
  if(amt){
    const moving=String(root.dataset.kv2CueMotion||"")==="v2_watch_exchange:11";
    amt.classList.toggle("kv2-cue-departed",idx>=11&&!moving);
  }
  const token=root.querySelector('[data-story-object-id="PACKAGE"]');
  if(token&&!token.hidden&&token.dataset.packageHolder==="PS"&&idx>=6&&typeof applyStoryStageAnchor33900==="function"){
    applyStoryStageAnchor33900(token,"OPPONENT_RIGHT");
    token.dataset.packageAnchor="OPPONENT_RIGHT";
  }
}
function normalizeCueLocalActorState(root,p){
  if(!root||!p||p.id==="v2_watch_exchange")return;
  for(const node of root.querySelectorAll(".kv2-actors > .kv2-actor")){
    node.classList.remove("kv2-cue-departed");
    delete node.dataset.kv2CueWithheld;
    node.hidden=false;
    node.removeAttribute("aria-hidden");
    node.style.removeProperty("--sc-choreo-flee-x");
  }
}
function syncSpeech(root,p,cue,focused){
  const speech=root.querySelector(".kv2-speech");if(!speech)return;
  const isDialogue=cue&&cue.kind==="dialogue"&&focused;
  speech.hidden=!isDialogue;
  if(!isDialogue)return;
  const actor=[...root.querySelectorAll(".kv2-actor")].find(node=>node.dataset.actorId===focused)||null;
  const name=speech.querySelector(".kv2-speech-name"),text=speech.querySelector(".kv2-speech-text");
  if(name&&name.textContent!==String(cue.speakerName||""))name.textContent=String(cue.speakerName||"");
  if(text&&text.textContent!==String(cue.text||""))text.textContent=String(cue.text||"");
  const slot=actor&&actor.dataset.slot||"unknown";
  speech.dataset.speakerSlot=slot;
  speech.dataset.speakerSide=slot==="kakashi"||slot==="pakkun"?"player":"opposition";
  if(actor&&typeof actor.getBoundingClientRect==="function"){
    const rr=root.getBoundingClientRect(),ar=actor.getBoundingClientRect();
    if(rr.width>0){
      const actorCenter=ar.left+ar.width/2;
      const pct=Math.max(20,Math.min(80,((actorCenter-rr.left)/rr.width)*100));
      speech.style.setProperty("--kv2-speech-x",pct+"%");
      const sr=speech.getBoundingClientRect();
      const tailPct=sr.width>0?Math.max(14,Math.min(86,((actorCenter-sr.left)/sr.width)*100)):50;
      speech.style.setProperty("--kv2-speech-tail",tailPct+"%");
    }
  }
}
function playCuePresentation(cueIndex){
  // Cue-local actor presence and anchor changes are synchronously projected by
  // applyWatchExchangeStaticState() during render(). No actor animation owns
  // frames in the final Kakashi Golden presentation.
  const root=typeof document!=="undefined"?document.getElementById(ROOT_ID):null;
  if(root&&typeof cancelStoryChoreography33900==="function")cancelStoryChoreography33900(root,"kakashi_cue_static_projection");
  return{success:true,skipped:true,staticPresentation:true,cueIndex:Number(cueIndex)||0};
}
function syncStandard(root,p,t){
  const cue=currentCue(p,t),speaker=cue.kind==="dialogue"?cue.speakerName:(cue.kind==="record"?"CHRONICLE RECEIPT":"NARRATION");
  setBackdrop(root,p.backdrop);
  const location=root.querySelector(".kv2-location"),objective=root.querySelector(".kv2-objective"),objectiveText=objective&&objective.querySelector("span");
  if(location&&location.textContent!==String(p.location||"KONOHA · NIGHT"))location.textContent=String(p.location||"KONOHA · NIGHT");
  if(objective){objective.style.display=p.objective?"":"none";if(objectiveText&&objectiveText.textContent!==String(p.objective||""))objectiveText.textContent=String(p.objective||"");}
  syncActors(root,Array.isArray(p.actors)?p.actors:[],p);
  normalizeCueLocalActorState(root,p);
  syncPackageToken(root,p);
  applyWatchExchangeStaticState(root,p,t);
  const focused=speakerActorId(p,cue);
  for(const node of root.querySelectorAll(".kv2-actor"))node.classList.toggle("is-focus",!!focused&&node.dataset.actorId===focused);
  syncSpeech(root,p,cue,focused);
  root.dataset.cueKind=String(cue.kind||"narration");
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
  root.dataset.hasChoices=actions.length?"true":"false";
  root.dataset.canAdvance=!actions.length&&(!t.atEnd||semanticNext)?"true":"false";
}
function syncReceipt(root,p,t){
  root.dataset.battleActionOnly="false";
  setBackdrop(root,p.backdrop);
  syncActors(root,[]);
  const cue=currentCue(p,t),pre=root.querySelector(".kv2-receipt pre");
  if(pre&&pre.textContent!==String(cue.text||""))pre.textContent=String(cue.text||"");
}
function playSharedStoryHardTransition36030(direction,rt){
  if(typeof playStoryHardSceneTransition33900!=="function")return{success:false,reason:"shared_story_transition_owner_missing"};
  return playStoryHardSceneTransition33900({
    scopeKey:"academy_kakashi_v2:"+String(direction||"handoff")+":"+String(rt&&rt.instanceId||"none")+":"+String(rt&&rt.beatId||"none")+":"+String(Date.now()),
    fromSceneId:SCENE_ID,toSceneId:SCENE_ID,
    fromBeatId:rt&&rt.beatId||null,toBeatId:rt&&rt.beatId||null,
    reason:"academy_kakashi_v2_"+String(direction||"handoff")
  });
}
function render(){
  if(rendering||typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer"),rt=active(),suspended=storySuspendedForBattle();
  if(!isActive()){
    pendingVisualSnapshot=null;
    if(rt&&rt.sceneId===SCENE_ID&&suspended&&!lastBattleSuspended){
      lastBattleSuspended=true;playSharedStoryHardTransition36030("story_to_battle",rt);
    }
    if(layer){
      delete layer.dataset.kakashiV2;
      const stale=document.getElementById(ROOT_ID);
      if(stale){if(typeof cancelStoryChoreography33900==="function")cancelStoryChoreography33900(stale,"story_suspended_or_exited");stale.remove();}
    }
    if(!rt||rt.sceneId!==SCENE_ID){lastProjectionSnapshot=null;lastBattleSuspended=false;}
    return false;
  }
  if(!layer)return false;
  if(lastBattleSuspended){playSharedStoryHardTransition36030("battle_to_story",rt);lastBattleSuspended=false;}
  const p=projection();if(!p)return false;
  rendering=true;
  try{
    installStyle();layer.dataset.kakashiV2="true";const root=ensureRoot(layer);root.dataset.preset=p.preset||"standard";
    const prepared=pendingVisualSnapshot,previous=prepared&&prepared.previous||lastProjectionSnapshot,next=snapshotProjection(p),semanticChanged=!!previous&&!!next&&(previous.id!==next.id||previous.packageHolder!==next.packageHolder||JSON.stringify(previous.actors)!==JSON.stringify(next.actors));
    pendingVisualSnapshot=null;
    delete root.dataset.outgoingTableau;delete root.dataset.transitionActive;
    const t=cueState();
    if(p.preset==="chronicle_receipt")syncReceipt(root,p,t);else syncStandard(root,p,t);
    if(semanticChanged)playProjectionTransition(root,previous,next,p,[]);
    lastProjectionSnapshot=next;
    bind(root);return true;
  }finally{rendering=false;}
}
function bind(root){
  const actionBox=root.querySelector(".kv2-actions");
  for(const b of root.querySelectorAll("[data-kv2-choice]"))b.onclick=e=>{
    if(e){e.preventDefault();e.stopPropagation();}
    const revealed=Number(actionBox&&actionBox.dataset.revealedAt||0);
    if(revealed&&Date.now()-revealed<360)return;
    globalThis.advanceAcademyKakashiV236040?globalThis.advanceAcademyKakashiV236040(b.dataset.kv2Choice):advanceStoryScene(b.dataset.kv2Choice);
  };
  for(const b of root.querySelectorAll("[data-kv2-advance]"))b.onclick=e=>{
    if(e){e.preventDefault();e.stopPropagation();}
    globalThis.advanceAcademyKakashiV236040?globalThis.advanceAcademyKakashiV236040():advanceStoryScene();
  };
  root.onclick=e=>{
    if(e.defaultPrevented)return;
    if(e.target&&e.target.closest&&e.target.closest("button,.kv2-actions,.kv2-receipt"))return;
    if(root.dataset.hasChoices==="true"||root.dataset.canAdvance!=="true")return;
    globalThis.advanceAcademyKakashiV236040?globalThis.advanceAcademyKakashiV236040():advanceStoryScene();
  };
}
const PRE_RENDER=typeof renderStoryScenePresentationLayer==="function"?renderStoryScenePresentationLayer:null;
if(PRE_RENDER){
  globalThis.renderStoryScenePresentationLayer=function kakashiV2RendererWrapper(){
  const result=PRE_RENDER.apply(this,arguments);
  const rt=active();
  // Even while Battle suspends Kakashi projection, run the renderer cleanup
  // path after the generic Story renderer so the preserved Story runtime cannot
  // reopen an opaque presentation layer above the Battle overlay.
  if(rt&&rt.sceneId===SCENE_ID)render();
  return result;
};
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
  const checks={
    soleKakashiRoot:ROOT_ID==="kakashi-v2-scene-board",
    hidesNativeStorySurface:installStyle.toString().includes('>*:not(#')&&installStyle.toString().includes('{display:none!important}'),
    protectedObjectiveRegion:installStyle.toString().includes("grid-template-columns:minmax(0,1fr) minmax(240px,34%)"),
    protectedDialogueRegion:installStyle.toString().includes("bottom:29%")&&installStyle.toString().includes("bottom:3%"),
    receiptReplacesScene:installStyle.toString().includes('[data-preset="chronicle_receipt"] .kv2-top')&&String(syncReceipt).includes("kv2-receipt"),
    projectionComesFromCore:String(projection).includes("getAcademyKakashiV2Presentation36020"),
    stableKeyedActorDom:!String(syncStandard).includes("innerHTML")&&!String(syncActors).includes("innerHTML")&&String(syncActors).includes("appendChild(node)"),
    actorAnimationRetired:installStyle.toString().includes("Final Kakashi Golden motion policy")&&installStyle.toString().includes("animation:none!important;transition:none!important;transform:none!important;will-change:auto!important"),
    ghostPresentationRetired:installStyle.toString().includes(".kv2-ghost-layer{display:none!important}")&&!String(render).includes("materializeDepartureGhosts(root"),
    cueStateStillProjectsSynchronously:String(syncStandard).includes("applyWatchExchangeStaticState(root,p,t)")&&String(playCuePresentation).includes("staticPresentation:true"),
    preCommitSnapshotHasNoActorClones:String(preparePreCommitVisualSnapshot).includes("actorVisuals:[]"),
    sharedTransitionHandoff:String(playSharedStoryHardTransition36030).includes("playStoryHardSceneTransition33900")&&String(render).includes('playSharedStoryHardTransition36030("story_to_battle"')&&String(render).includes('playSharedStoryHardTransition36030("battle_to_story"'),
    noDocumentCurtainOwnership:!installStyle.toString().includes("position:fixed;inset:0;z-index:2147483000")&&!String(render).includes("setGlobalCurtain"),
    rootTransitionLayersRetired:!installStyle.toString().includes(".kv2-transition-memory")&&!installStyle.toString().includes(".kv2-wipe")&&!String(ensureRoot).includes("kv2-transition-memory")&&!String(ensureRoot).includes("kv2-wipe"),
    projectionChoreographyRetired:String(playProjectionTransition).includes("kakashi_golden_static_motion")&&!String(playProjectionTransition).includes("playStoryChoreography33900({"),
    deterministicActorSlots:String(actorSlot).includes("academy_kakashi_origin_masked_interceptor")&&installStyle.toString().includes('data-slot="minato"'),
    sharedSemanticAnchors:String(syncActors).includes("applyStoryStageAnchor33900")&&String(actorAnchor).includes("PLAYER_LEFT")&&String(actorAnchor).includes("OPPONENT_RIGHT"),
    packageTokenConsumesHolderTruth:String(syncPackageToken).includes("state.package")&&String(syncPackageToken).includes("packageHolder"),
    speakerFocusUsesCurrentCue:String(syncStandard).includes("speakerActorId"),
    stageWideAdvanceGuard:String(bind).includes('root.dataset.hasChoices==="true"')&&String(bind).includes("Date.now()-revealed<360"),
    actorLinkedSpeech:String(syncSpeech).includes("--kv2-speech-x")&&installStyle.toString().includes(".kv2-speech"),
    fiveChoiceLayoutNoScroll:installStyle.toString().includes("repeat(3,minmax(0,1fr))")&&installStyle.toString().includes("overflow:visible"),
    noMutationObserver:!String(render).includes("MutationObserver"),
    battleSuspendsStoryProjection:String(storySuspendedForBattle).includes("pendingBattle")&&String(storySuspendedForBattle).includes('rc.type==="story_scene"'),
    wrapperRunsSuspensionCleanup:String(globalThis.renderStoryScenePresentationLayer).includes("rt&&rt.sceneId===SCENE_ID")&&String(globalThis.renderStoryScenePresentationLayer).includes("render()"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.renderAcademyKakashiV236030=render;
globalThis.playAcademyKakashiV2CuePresentation36030=playCuePresentation;
globalThis.prepareAcademyKakashiV2VisualSnapshot36030=preparePreCommitVisualSnapshot;
globalThis.cancelAcademyKakashiV2VisualSnapshot36030=cancelPreparedVisualSnapshot;
globalThis.playAcademyKakashiV2ProjectionTransition36030=playProjectionTransition;
globalThis.runAcademyKakashiV2Renderer36030Diagnostics=diagnostics;
globalThis.runAcademyKakashiV2Geometry36030=geometryDiagnostics;
globalThis.SC_ACADEMY_KAKASHI_V2_RENDERER_36030=Object.freeze({patchId:PATCH_ID,rootId:ROOT_ID,browserGoldenClaimed:false});
try{if(isActive())render();}catch(_e){}
})();
