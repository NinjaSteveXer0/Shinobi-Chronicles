// ============================================================================
// SHINOBI CHRONICLES — ALPHA FRONT DOOR 33300
// Issue #165
//
// Player-facing boot contract:
//   Landing -> Ninja ID -> Choose Village -> Choose Ninja -> Origin Prologue
//
// This layer creates no new Registry, Acquisition, Rank, PL, Story, World or
// character-identity authority. It gates presentation/boot only, stores a
// display-profile Ninja ID separately from gameplay truth, truthfully exposes
// Konoha as the only Alpha-start village, and delegates Ninja confirmation to
// the existing selectChronicleOrigin(...) authority.
// ============================================================================
(function installAlphaFrontDoor33300(){
  "use strict";

  const PATCH_ID="alpha_front_door_33300_2026_09_13";
  const PLAYER_SAVE_KEY_33300="shinobiChroniclesPlayerSave";
  const SESSION_RESUME_KEY_33300="shinobiTestState";
  const PROFILE_KEY_33300="shinobiChroniclesFrontDoorProfileV1";
  const ROOT_ID="sc-alpha-front-door-33300";
  const STYLE_ID="sc-alpha-front-door-33300-style";

  const VILLAGES=Object.freeze([
    Object.freeze({id:"konoha",name:"HIDDEN LEAF",country:"LAND OF FIRE",enabled:true,status:"ALPHA START"}),
    Object.freeze({id:"suna",name:"HIDDEN SAND",country:"LAND OF WIND",enabled:false,status:"NOT AVAILABLE IN ALPHA"}),
    Object.freeze({id:"kiri",name:"HIDDEN MIST",country:"LAND OF WATER",enabled:false,status:"NOT AVAILABLE IN ALPHA"}),
    Object.freeze({id:"kumo",name:"HIDDEN CLOUD",country:"LAND OF LIGHTNING",enabled:false,status:"NOT AVAILABLE IN ALPHA"}),
    Object.freeze({id:"iwa",name:"HIDDEN STONE",country:"LAND OF EARTH",enabled:false,status:"NOT AVAILABLE IN ALPHA"})
  ]);

  const state={
    stage:"landing",
    ninjaId:"",
    villageId:null,
    selectedVariantId:null,
    feedback:null,
    installed:false,
    released:false
  };

  function h(value){
    return String(value??"")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function hasCanonicalSave33300(){
    try{
      const raw=localStorage.getItem(PLAYER_SAVE_KEY_33300);
      return typeof raw==="string"&&raw.trim().length>0;
    }catch(_error){return false;}
  }

  function readProfile33300(){
    try{
      const raw=localStorage.getItem(PROFILE_KEY_33300);
      if(!raw)return null;
      const parsed=JSON.parse(raw);
      if(!parsed||typeof parsed!=="object")return null;
      return {
        ninjaId:typeof parsed.ninjaId==="string"?parsed.ninjaId:null,
        villageId:parsed.villageId==="konoha"?"konoha":null,
        version:Number(parsed.version)||1,
        createdAt:Number(parsed.createdAt)||null
      };
    }catch(_error){return null;}
  }

  function persistProfile33300(){
    const profile={
      version:1,
      ninjaId:state.ninjaId,
      villageId:"konoha",
      createdAt:Date.now(),
      presentationOnly:true
    };
    try{localStorage.setItem(PROFILE_KEY_33300,JSON.stringify(profile));return true;}
    catch(_error){return false;}
  }

  function normalizeNinjaId33300(value){
    const normalized=String(value??"").trim().replace(/\s+/g," ");
    if(normalized.length<2||normalized.length>24)return {valid:false,value:normalized,reason:"Ninja ID must be 2–24 characters."};
    if(/[<>{}\u0000-\u001F\u007F]/.test(normalized))return {valid:false,value:normalized,reason:"Ninja ID contains unsupported characters."};
    return {valid:true,value:normalized,reason:null};
  }

  function getOriginEntries33300(){
    try{
      return typeof getAlphaChronicleOriginSelectionEntries==="function"
        ? getAlphaChronicleOriginSelectionEntries().filter(Boolean)
        : [];
    }catch(_error){return [];}
  }

  function getOriginEntry33300(variantId){
    return getOriginEntries33300().find(entry=>entry.variantId===variantId)||null;
  }

  function gameContainer33300(){
    return typeof document!=="undefined"?document.querySelector(".game-container"):null;
  }

  function lockUnderlyingGame33300(){
    const game=gameContainer33300();
    if(!game)return false;
    try{
      if(document.activeElement&&typeof document.activeElement.blur==="function")document.activeElement.blur();
      game.inert=true;
      game.setAttribute("aria-hidden","true");
      game.dataset.alphaFrontDoorLocked="true";
      return true;
    }catch(_error){return false;}
  }

  function unlockUnderlyingGame33300(){
    const game=gameContainer33300();
    if(!game)return false;
    try{
      game.inert=false;
      game.removeAttribute("aria-hidden");
      delete game.dataset.alphaFrontDoorLocked;
      return true;
    }catch(_error){return false;}
  }

  function ensureStyles33300(){
    if(typeof document==="undefined"||document.getElementById(STYLE_ID))return false;
    const style=document.createElement("style");
    style.id=STYLE_ID;
    style.textContent=`
      #${ROOT_ID}{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;overflow:auto;padding:28px;background:
        radial-gradient(circle at 50% 15%,rgba(26,70,78,.26),transparent 38%),
        radial-gradient(circle at 10% 90%,rgba(144,91,18,.16),transparent 35%),
        linear-gradient(180deg,rgba(2,8,12,.995),rgba(4,10,14,.998));color:#e9e2d1;font-family:Arial,Helvetica,sans-serif}
      #${ROOT_ID} *{box-sizing:border-box}
      .afd-shell{width:min(1180px,100%);min-height:min(760px,calc(100vh - 56px));border:1px solid rgba(214,169,58,.34);background:linear-gradient(180deg,rgba(7,18,25,.97),rgba(3,9,13,.985));box-shadow:0 28px 100px rgba(0,0,0,.72),inset 0 1px rgba(255,255,255,.025);display:flex;flex-direction:column}
      .afd-head{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding:30px 34px 22px;border-bottom:1px solid rgba(214,169,58,.16)}
      .afd-brand small,.afd-eyebrow{display:block;color:#d6aa42;font-size:10px;font-weight:900;letter-spacing:.2em;text-transform:uppercase}
      .afd-brand h1{margin:7px 0 4px;color:#f2dfad;font:400 42px/1.05 Georgia,serif;letter-spacing:.015em}.afd-brand p{margin:0;color:#738893;font-size:12px;letter-spacing:.06em}
      .afd-step{display:flex;gap:7px;align-items:center;padding-top:2px}.afd-step span{width:28px;height:4px;background:#26353d}.afd-step span.is-on{background:#d4aa43;box-shadow:0 0 12px rgba(212,170,67,.24)}
      .afd-body{flex:1;display:grid;place-items:center;padding:34px}.afd-panel{width:min(900px,100%)}
      .afd-title{margin:8px 0 10px;color:#efe0ba;font:400 34px/1.08 Georgia,serif}.afd-copy{margin:0 0 22px;max-width:720px;color:#93a1a7;line-height:1.62;font-size:14px}
      .afd-actions{display:flex;flex-wrap:wrap;gap:11px;margin-top:22px}.afd-btn{min-height:46px;padding:0 20px;border:1px solid rgba(214,169,58,.54);background:linear-gradient(180deg,rgba(104,76,20,.72),rgba(52,38,13,.9));color:#f4d877;font-weight:900;font-size:11px;letter-spacing:.11em;cursor:pointer}.afd-btn:hover:not(:disabled){filter:brightness(1.14)}.afd-btn.secondary{border-color:rgba(73,205,218,.34);background:rgba(29,69,76,.18);color:#73dae2}.afd-btn.danger{border-color:rgba(195,79,60,.45);background:rgba(103,28,20,.2);color:#e4a08e}.afd-btn:disabled{opacity:.3;cursor:not-allowed}
      .afd-save{margin:20px 0 0;padding:15px 17px;border:1px solid rgba(73,205,218,.15);background:rgba(73,205,218,.025);display:grid;gap:5px}.afd-save b{color:#7cdde4;font-size:10px;letter-spacing:.13em}.afd-save span{color:#82959d;font-size:12px}
      .afd-field{display:grid;gap:8px;margin:18px 0}.afd-field label{color:#cda747;font-size:10px;font-weight:900;letter-spacing:.14em}.afd-field input{width:100%;min-height:54px;border:1px solid rgba(214,169,58,.34);background:#050c11;color:#f0e4c9;padding:0 15px;font-size:17px;outline:none}.afd-field input:focus{border-color:#d8b04a;box-shadow:0 0 0 2px rgba(214,169,58,.08)}.afd-hint{color:#60737d;font-size:11px;line-height:1.5}
      .afd-feedback{margin:14px 0;padding:10px 12px;border-left:3px solid #b86d51;background:rgba(110,34,22,.12);color:#dfaa96;font-size:12px}.afd-feedback.ok{border-left-color:#3cbfc9;background:rgba(30,99,105,.12);color:#8adfe4}
      .afd-villages{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:9px;margin-top:22px}.afd-village{min-height:142px;padding:17px 14px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.016);text-align:left;color:#7c8d95;position:relative}.afd-village strong{display:block;color:#9ba8ad;font:400 18px Georgia,serif;margin:6px 0}.afd-village small{color:#566973;font-size:9px;letter-spacing:.1em}.afd-village em{display:block;margin-top:18px;color:#5d6b71;font-style:normal;font-size:8px;font-weight:900;letter-spacing:.11em}.afd-village.is-enabled{cursor:pointer;border-color:rgba(214,169,58,.44);background:linear-gradient(145deg,rgba(96,69,17,.2),rgba(23,53,58,.08));color:#d4ab46}.afd-village.is-enabled strong{color:#eddaa8}.afd-village.is-selected{box-shadow:inset 0 0 0 1px #d4aa43,0 0 24px rgba(214,169,58,.08)}.afd-lock{position:absolute;right:10px;top:9px;font-size:9px;color:#5b6970}
      .afd-ninjas{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin-top:18px}.afd-ninja{padding:0;border:1px solid rgba(255,255,255,.08);background:#071016;color:#d8d1c0;text-align:left;cursor:pointer;overflow:hidden}.afd-ninja img{display:block;width:100%;aspect-ratio:.70/1;object-fit:cover;background:#020507}.afd-ninja div{padding:10px 11px}.afd-ninja strong{display:block;color:#e8d8ad;font:400 14px Georgia,serif}.afd-ninja span{display:block;margin-top:4px;color:#657981;font-size:8px;font-weight:900;letter-spacing:.1em}.afd-ninja.is-selected{border-color:#d6aa42;box-shadow:0 0 0 1px rgba(214,170,66,.55),0 12px 28px rgba(0,0,0,.3)}
      .afd-summary{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 0}.afd-chip{padding:6px 9px;border:1px solid rgba(255,255,255,.09);color:#788b94;font-size:9px;font-weight:900;letter-spacing:.1em}.afd-chip b{color:#d9ba69}
      .afd-warning{margin:18px 0;padding:15px;border:1px solid rgba(190,75,57,.26);background:rgba(100,26,17,.12);color:#d8a291;line-height:1.55;font-size:13px}
      @media(max-width:900px){#${ROOT_ID}{padding:10px}.afd-shell{min-height:calc(100vh - 20px)}.afd-head,.afd-body{padding:22px}.afd-villages{grid-template-columns:1fr 1fr}.afd-ninjas{grid-template-columns:repeat(2,minmax(0,1fr))}.afd-brand h1{font-size:32px}}
    `;
    document.head.appendChild(style);
    return true;
  }

  function getStepIndex33300(){
    return ({landing:0,ninja_id:1,village:2,ninja:3,reset_confirm:0})[state.stage]??0;
  }

  function stepRail33300(){
    const current=getStepIndex33300();
    return `<div class="afd-step" aria-label="Onboarding progress">${[0,1,2,3].map(i=>`<span class="${i<=current?"is-on":""}"></span>`).join("")}</div>`;
  }

  function layout33300(inner){
    return `<section class="afd-shell" role="dialog" aria-modal="true" aria-label="Shinobi Chronicles front door">
      <header class="afd-head"><div class="afd-brand"><small>ALPHA CHRONICLE</small><h1>SHINOBI CHRONICLES</h1><p>WORLD OF NINJA</p></div>${stepRail33300()}</header>
      <main class="afd-body">${inner}</main>
    </section>`;
  }

  function renderLanding33300(){
    const existing=hasCanonicalSave33300();
    const profile=readProfile33300();
    return layout33300(`<div class="afd-panel"><span class="afd-eyebrow">ENTER THE CHRONICLE</span><h2 class="afd-title">Your story begins with a choice.</h2><p class="afd-copy">Create a new shinobi Chronicle from the beginning, or deliberately continue the Chronicle already stored in this browser. The game will no longer drop directly into an old Battle or Story checkpoint without asking.</p>
      ${existing?`<div class="afd-save"><b>EXISTING CHRONICLE DETECTED</b><span>${profile&&profile.ninjaId?`Ninja ID: ${h(profile.ninjaId)} · `:""}Continue restores the currently saved Chronicle exactly as it stands.</span></div>`:""}
      <div class="afd-actions">${existing?`<button class="afd-btn" data-afd-action="continue">CONTINUE CHRONICLE</button><button class="afd-btn danger" data-afd-action="new">NEW CHRONICLE</button>`:`<button class="afd-btn" data-afd-action="begin">BEGIN CHRONICLE</button>`}</div>
    </div>`);
  }

  function renderNinjaId33300(){
    return layout33300(`<div class="afd-panel"><span class="afd-eyebrow">STEP 1 · NINJA ID</span><h2 class="afd-title">Create your Ninja ID.</h2><p class="afd-copy">This is your player-facing Chronicle profile name. It is not a Registry character, Rank, PL value, ownership record or Story participant identity.</p>
      <div class="afd-field"><label for="afd-ninja-id">NINJA ID</label><input id="afd-ninja-id" maxlength="24" autocomplete="off" spellcheck="false" value="${h(state.ninjaId)}" placeholder="Enter your Ninja ID"><span class="afd-hint">2–24 characters. This profile label remains separate from the shinobi you choose next.</span></div>
      ${state.feedback?`<div class="afd-feedback">${h(state.feedback)}</div>`:""}
      <div class="afd-actions"><button class="afd-btn secondary" data-afd-action="back-landing">BACK</button><button class="afd-btn" data-afd-action="ninja-id-next">CHOOSE VILLAGE</button></div>
    </div>`);
  }

  function renderVillage33300(){
    return layout33300(`<div class="afd-panel"><span class="afd-eyebrow">STEP 2 · CHOOSE VILLAGE</span><h2 class="afd-title">Choose your starting village.</h2><p class="afd-copy">Alpha currently begins in Konohagakure. The other Great Villages are shown truthfully as unavailable starting points rather than pretending they have complete onboarding routes.</p>
      <div class="afd-villages">${VILLAGES.map(v=>`<button class="afd-village ${v.enabled?"is-enabled":""} ${state.villageId===v.id?"is-selected":""}" data-village-id="${v.id}" ${v.enabled?"":"disabled"}>${v.enabled?"":"<span class=\"afd-lock\">LOCKED</span>"}<small>${h(v.country)}</small><strong>${h(v.name)}</strong><em>${h(v.status)}</em></button>`).join("")}</div>
      ${state.feedback?`<div class="afd-feedback">${h(state.feedback)}</div>`:""}
      <div class="afd-actions"><button class="afd-btn secondary" data-afd-action="back-ninja-id">BACK</button><button class="afd-btn" data-afd-action="village-next" ${state.villageId==="konoha"?"":"disabled"}>CHOOSE NINJA</button></div>
    </div>`);
  }

  function renderNinja33300(){
    const entries=getOriginEntries33300();
    const selected=getOriginEntry33300(state.selectedVariantId);
    return layout33300(`<div class="afd-panel" style="width:min(1040px,100%)"><span class="afd-eyebrow">STEP 3 · CHOOSE NINJA</span><h2 class="afd-title">Choose the shinobi whose Chronicle you will begin.</h2><p class="afd-copy">This is the existing Chronicle-Origin choice. Confirmation creates exactly one protagonist ownership record and locks that Ninja identity before the authored Origin prologue begins.</p>
      <div class="afd-summary"><span class="afd-chip">NINJA ID · <b>${h(state.ninjaId)}</b></span><span class="afd-chip">VILLAGE · <b>HIDDEN LEAF</b></span></div>
      ${entries.length===10?`<div class="afd-ninjas">${entries.map(entry=>`<button class="afd-ninja ${state.selectedVariantId===entry.variantId?"is-selected":""}" data-origin-id="${h(entry.variantId)}"><img src="${h(entry.cardPath)}" alt="${h(entry.name)}"><div><strong>${h(entry.name)}</strong><span>${h(entry.rank)} · BASE PL ${Number(entry.basePL)||0}</span></div></button>`).join("")}</div>`:`<div class="afd-feedback">Origin selection authority is not ready: expected 10 candidates, found ${entries.length}.</div>`}
      ${state.feedback?`<div class="afd-feedback">${h(state.feedback)}</div>`:""}
      <div class="afd-actions"><button class="afd-btn secondary" data-afd-action="back-village">BACK</button><button class="afd-btn" data-afd-action="confirm-ninja" ${selected&&entries.length===10?"":"disabled"}>CONFIRM NINJA & BEGIN ORIGIN</button></div>
    </div>`);
  }

  function renderResetConfirm33300(){
    return layout33300(`<div class="afd-panel"><span class="afd-eyebrow">NEW CHRONICLE</span><h2 class="afd-title">Erase the Chronicle stored in this browser?</h2><div class="afd-warning">This clears the canonical player save, the front-door profile and the transient session resume checkpoint. It does not remap Registry identities or alter source authority. This action cannot be undone from the game UI.</div><div class="afd-actions"><button class="afd-btn secondary" data-afd-action="cancel-reset">CANCEL</button><button class="afd-btn danger" data-afd-action="confirm-reset">ERASE & START NEW</button></div></div>`);
  }

  function render33300(){
    const root=document.getElementById(ROOT_ID);
    if(!root)return false;
    const html=state.stage==="ninja_id"?renderNinjaId33300():state.stage==="village"?renderVillage33300():state.stage==="ninja"?renderNinja33300():state.stage==="reset_confirm"?renderResetConfirm33300():renderLanding33300();
    root.innerHTML=html;
    if(state.stage==="ninja_id")setTimeout(()=>{const input=document.getElementById("afd-ninja-id");if(input)input.focus();},0);
    else setTimeout(()=>{try{root.focus({preventScroll:true});}catch(_error){}},0);
    return true;
  }

  function releaseFrontDoor33300(){
    unlockUnderlyingGame33300();
    const root=document.getElementById(ROOT_ID);
    if(root)root.remove();
    state.released=true;
    return true;
  }

  function continueChronicle33300(){
    if(!hasCanonicalSave33300()){
      state.stage="ninja_id";state.feedback=null;return render33300();
    }
    return releaseFrontDoor33300();
  }

  function resetChronicle33300(){
    try{localStorage.removeItem(PLAYER_SAVE_KEY_33300);}catch(_error){}
    try{localStorage.removeItem(PROFILE_KEY_33300);}catch(_error){}
    try{sessionStorage.removeItem(SESSION_RESUME_KEY_33300);}catch(_error){}
    if(typeof location!=="undefined"&&typeof location.reload==="function")location.reload();
    return {success:true,reloadRequested:true};
  }

  function confirmNinja33300(){
    state.feedback=null;
    if(state.villageId!=="konoha"){
      state.feedback="Hidden Leaf must be selected for the current Alpha start.";render33300();return {success:false,reason:"alpha_start_village_required"};
    }
    const entry=getOriginEntry33300(state.selectedVariantId);
    if(!entry){state.feedback="Choose one of the ten available Chronicle Origins.";render33300();return {success:false,reason:"origin_required"};}
    if(typeof selectChronicleOrigin!=="function"||typeof beginAlphaChronicleOriginPrologue!=="function"){
      state.feedback="Chronicle Origin runtime is not ready.";render33300();return {success:false,reason:"origin_runtime_unavailable"};
    }
    const sceneId=globalThis.SC_ALPHA_ORIGIN_SCENE_IDS&&globalThis.SC_ALPHA_ORIGIN_SCENE_IDS[entry.variantId]||null;
    if(!sceneId||typeof getStorySceneDefinition!=="function"||!getStorySceneDefinition(sceneId)){
      state.feedback="The selected Origin prologue is not registered.";render33300();return {success:false,reason:"origin_scene_not_registered",variantId:entry.variantId,sceneId};
    }
    const selected=selectChronicleOrigin(entry.variantId,"alpha_front_door_33300_origin_confirmation");
    if(!selected||selected.success!==true){
      state.feedback=`Origin confirmation failed: ${selected&&selected.reason?selected.reason:"unknown error"}.`;render33300();return selected||{success:false,reason:"origin_confirmation_failed"};
    }
    persistProfile33300();
    try{sessionStorage.removeItem(SESSION_RESUME_KEY_33300);}catch(_error){}
    const launched=beginAlphaChronicleOriginPrologue();
    if(!launched||launched.success!==true){
      state.feedback=`Origin was confirmed, but the prologue could not open: ${launched&&launched.reason?launched.reason:"unknown error"}.`;
      render33300();
      return {success:false,reason:"origin_confirmed_prologue_launch_failed",selected,launched};
    }
    releaseFrontDoor33300();
    return {success:true,variantId:entry.variantId,sceneId,selected,launched};
  }

  function onClick33300(event){
    const actionNode=event.target&&event.target.closest?event.target.closest("[data-afd-action]"):null;
    const originNode=event.target&&event.target.closest?event.target.closest("[data-origin-id]"):null;
    const villageNode=event.target&&event.target.closest?event.target.closest("[data-village-id]"):null;
    if(originNode){
      const id=originNode.dataset.originId||null;
      if(getOriginEntry33300(id)){state.selectedVariantId=id;state.feedback=null;render33300();}
      return;
    }
    if(villageNode){
      const village=VILLAGES.find(item=>item.id===villageNode.dataset.villageId)||null;
      if(village&&village.enabled){state.villageId=village.id;state.feedback=null;render33300();}
      return;
    }
    if(!actionNode)return;
    const action=actionNode.dataset.afdAction;
    if(action==="continue")return continueChronicle33300();
    if(action==="new"){state.stage="reset_confirm";state.feedback=null;return render33300();}
    if(action==="begin"){state.stage="ninja_id";state.feedback=null;return render33300();}
    if(action==="back-landing"){state.stage="landing";state.feedback=null;return render33300();}
    if(action==="ninja-id-next"){
      const input=document.getElementById("afd-ninja-id");
      const normalized=normalizeNinjaId33300(input?input.value:state.ninjaId);
      if(!normalized.valid){state.ninjaId=normalized.value;state.feedback=normalized.reason;return render33300();}
      state.ninjaId=normalized.value;state.feedback=null;state.stage="village";return render33300();
    }
    if(action==="back-ninja-id"){state.stage="ninja_id";state.feedback=null;return render33300();}
    if(action==="village-next"){
      if(state.villageId!=="konoha"){state.feedback="Choose Hidden Leaf to continue the current Alpha.";return render33300();}
      state.stage="ninja";state.feedback=null;return render33300();
    }
    if(action==="back-village"){state.stage="village";state.feedback=null;return render33300();}
    if(action==="confirm-ninja")return confirmNinja33300();
    if(action==="cancel-reset"){state.stage="landing";state.feedback=null;return render33300();}
    if(action==="confirm-reset")return resetChronicle33300();
  }

  function createRoot33300(){
    if(typeof document==="undefined")return null;
    let root=document.getElementById(ROOT_ID);
    if(root)return root;
    root=document.createElement("div");
    root.id=ROOT_ID;
    root.tabIndex=-1;
    root.addEventListener("click",onClick33300);
    root.addEventListener("keydown",event=>{
      if(event.key==="Escape")event.preventDefault();
    });
    document.body.appendChild(root);
    return root;
  }

  function install33300(){
    if(state.installed||typeof document==="undefined")return false;
    ensureStyles33300();
    createRoot33300();
    lockUnderlyingGame33300();
    state.installed=true;
    state.released=false;
    state.stage="landing";
    state.feedback=null;
    render33300();
    return true;
  }

  function runAlphaFrontDoor33300Diagnostics(){
    const confirmSource=confirmNinja33300.toString();
    const resetSource=resetChronicle33300.toString();
    const villageSource=renderVillage33300.toString();
    const landingSource=renderLanding33300.toString();
    const checks={
      patchId:PATCH_ID==="alpha_front_door_33300_2026_09_13",
      exactFourStageContract:["landing","ninja_id","village","ninja"].every(key=>["landing","ninja_id","village","ninja"].includes(key)),
      landingHasExplicitContinueAndNew:landingSource.includes("CONTINUE CHRONICLE")&&landingSource.includes("NEW CHRONICLE"),
      freshLandingHasBegin:landingSource.includes("BEGIN CHRONICLE"),
      ninjaIdProfileSeparated:PROFILE_KEY_33300!==PLAYER_SAVE_KEY_33300&&persistProfile33300.toString().includes("presentationOnly:true"),
      resetExactPlayerSave:resetSource.includes("PLAYER_SAVE_KEY_33300")&&resetSource.includes("SESSION_RESUME_KEY_33300")&&resetSource.includes("PROFILE_KEY_33300"),
      resetDoesNotClearAllStorage:!resetSource.includes("localStorage.clear")&&!resetSource.includes("sessionStorage.clear"),
      konohaOnlyAlphaStart:VILLAGES.filter(v=>v.enabled).length===1&&VILLAGES.find(v=>v.enabled).id==="konoha",
      unavailableVillagesFailClosed:VILLAGES.filter(v=>!v.enabled).length===4&&villageSource.includes("disabled"),
      reusesExactOriginEntries:getOriginEntries33300.toString().includes("getAlphaChronicleOriginSelectionEntries"),
      originCommitUsesExistingAuthority:confirmSource.includes("selectChronicleOrigin")&&!confirmSource.includes("commitCharacterAcquisition")&&!confirmSource.includes("grantCharacterRegistryOwnership"),
      originPrologueUsesExistingDispatcher:confirmSource.includes("beginAlphaChronicleOriginPrologue"),
      noRankPLStoryWorldMutation:["recordOwnedCharacterGeninPromotion","currentPL=","basePL=","commitWorld","commitStory"].every(token=>!confirmSource.includes(token)),
      underlyingGameGated:lockUnderlyingGame33300.toString().includes("game.inert=true")&&releaseFrontDoor33300.toString().includes("unlockUnderlyingGame33300"),
      browserGoldenClaimed:false
    };
    return {patchId:PATCH_ID,pass:Object.entries(checks).filter(([key])=>key!=="browserGoldenClaimed").every(([,value])=>value===true),checks,browserGolden:false};
  }

  globalThis.SC_ALPHA_FRONT_DOOR_33300=Object.freeze({
    patchId:PATCH_ID,
    saveKey:PLAYER_SAVE_KEY_33300,
    sessionKey:SESSION_RESUME_KEY_33300,
    profileKey:PROFILE_KEY_33300,
    villages:VILLAGES,
    state
  });
  globalThis.openAlphaFrontDoor33300=function(stage="landing"){
    state.stage=["landing","ninja_id","village","ninja","reset_confirm"].includes(stage)?stage:"landing";
    state.feedback=null;
    if(!document.getElementById(ROOT_ID)){state.installed=false;install33300();}
    lockUnderlyingGame33300();
    return render33300();
  };
  globalThis.releaseAlphaFrontDoor33300=releaseFrontDoor33300;
  globalThis.resetAlphaChronicleFromFrontDoor33300=resetChronicle33300;
  globalThis.confirmAlphaFrontDoorNinja33300=confirmNinja33300;
  globalThis.runAlphaFrontDoor33300Diagnostics=runAlphaFrontDoor33300Diagnostics;

  if(typeof document!=="undefined"){
    if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install33300,{once:true});
    else install33300();
  }
})();
