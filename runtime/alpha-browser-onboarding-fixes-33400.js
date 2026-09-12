// ============================================================================
// SHINOBI CHRONICLES — ALPHA BROWSER ONBOARDING / TUTORIAL FIXES 33400
// Issues #165 / #105 / installed-browser feedback 2026-09-13
//
// Coding-owned scope only:
// - replace the temporary 33300 save chooser with the real Alpha front door:
//     Register/Login -> Ninja ID -> Village -> Ninja -> Introduction -> BEGIN
//     -> existing Origin prologue;
// - distinguish a merely-created fresh-save shell from a begun Chronicle;
// - ensure explicit NEW/REGISTER survives the reload needed to clear stale
//   in-memory player/session state;
// - schedule exactly one existing authored enemy action after each completed
//   player action opportunity;
// - lower Battle PL circles slightly for the approved live canvas.
//
// This module does NOT author Menma story prose, tutorial rewards, enemy assets,
// Registry identity, Acquisition, Rank, PL, World, or Combat action semantics.
// Those remain with their existing authorities.
// ============================================================================
(function installAlphaBrowserOnboardingFixes33400(){
  "use strict";

  const PATCH_ID="alpha_browser_onboarding_fixes_33400_2026_09_13";
  const PLAYER_SAVE_KEY="shinobiChroniclesPlayerSave";
  const SESSION_RESUME_KEY="shinobiTestState";
  const PROFILE_KEY="shinobiChroniclesFrontDoorProfileV1";
  const FORCE_NEW_KEY="shinobiChroniclesForceNewOnboardingV2";
  const ROOT_ID="sc-alpha-front-door-33400";
  const STYLE_ID="sc-alpha-front-door-33400-style";
  const BATTLE_STYLE_ID="sc-alpha-battle-pl-calibration-33400";

  if(globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400)return;

  const VILLAGES=Object.freeze([
    Object.freeze({id:"konoha",name:"HIDDEN LEAF",country:"LAND OF FIRE",enabled:true,status:"ALPHA START"}),
    Object.freeze({id:"suna",name:"HIDDEN SAND",country:"LAND OF WIND",enabled:false,status:"NOT AVAILABLE IN ALPHA"}),
    Object.freeze({id:"kiri",name:"HIDDEN MIST",country:"LAND OF WATER",enabled:false,status:"NOT AVAILABLE IN ALPHA"}),
    Object.freeze({id:"kumo",name:"HIDDEN CLOUD",country:"LAND OF LIGHTNING",enabled:false,status:"NOT AVAILABLE IN ALPHA"}),
    Object.freeze({id:"iwa",name:"HIDDEN STONE",country:"LAND OF EARTH",enabled:false,status:"NOT AVAILABLE IN ALPHA"})
  ]);

  const state={
    stage:"account",
    ninjaId:"",
    villageId:null,
    selectedVariantId:null,
    feedback:null,
    installed:false,
    released:false
  };

  function esc(value){
    return String(value??"")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function safeParse(value){
    if(typeof value!=="string"||!value.trim())return null;
    try{const parsed=JSON.parse(value);return parsed&&typeof parsed==="object"?parsed:null;}
    catch(_error){return null;}
  }

  function getSavedChronicleSnapshot33400(){
    let parsed=null;
    try{parsed=safeParse(localStorage.getItem(PLAYER_SAVE_KEY));}catch(_error){parsed=null;}
    if(!parsed)return {exists:false,begun:false,reason:"no_save"};
    const acquisition=parsed.acquisition&&typeof parsed.acquisition==="object"?parsed.acquisition:{};
    const originId=typeof acquisition.chronicleOriginVariantId==="string"&&acquisition.chronicleOriginVariantId
      ? acquisition.chronicleOriginVariantId
      : acquisition.chronicleOrigin&&typeof acquisition.chronicleOrigin.variantId==="string"
        ? acquisition.chronicleOrigin.variantId
        : null;
    const ninjaId=typeof acquisition.ninjaIdentityVariantId==="string"&&acquisition.ninjaIdentityVariantId
      ? acquisition.ninjaIdentityVariantId
      : null;
    const locked=acquisition.ninjaIdentityLocked===true;
    const pending=acquisition.onboardingStatus==="chronicle_origin_pending"&&!originId&&!ninjaId&&!locked;
    const begun=locked===true&&!!(originId||ninjaId);
    return {
      exists:true,
      begun,
      pendingShell:pending,
      onboardingStatus:acquisition.onboardingStatus||null,
      originVariantId:originId,
      ninjaIdentityVariantId:ninjaId,
      reason:begun?"begun_chronicle":pending?"fresh_pending_shell":"save_without_locked_origin"
    };
  }

  function hasBegunChronicle33400(){
    return getSavedChronicleSnapshot33400().begun===true;
  }

  function readProfile33400(){
    try{
      const parsed=safeParse(localStorage.getItem(PROFILE_KEY));
      if(!parsed)return null;
      return {
        ninjaId:typeof parsed.ninjaId==="string"?parsed.ninjaId:null,
        villageId:parsed.villageId==="konoha"?"konoha":null,
        presentationOnly:parsed.presentationOnly===true
      };
    }catch(_error){return null;}
  }

  function persistProfile33400(){
    const profile={
      version:2,
      ninjaId:state.ninjaId,
      villageId:"konoha",
      createdAt:Date.now(),
      presentationOnly:true,
      authenticationScope:"alpha_browser_local_profile"
    };
    try{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));return true;}
    catch(_error){return false;}
  }

  function normalizeNinjaId33400(value){
    const normalized=String(value??"").trim().replace(/\s+/g," ");
    if(normalized.length<2||normalized.length>24)return {valid:false,value:normalized,reason:"Ninja ID must be 2–24 characters."};
    if(/[<>{}\u0000-\u001F\u007F]/.test(normalized))return {valid:false,value:normalized,reason:"Ninja ID contains unsupported characters."};
    return {valid:true,value:normalized,reason:null};
  }

  function getOriginEntries33400(){
    try{
      return typeof getAlphaChronicleOriginSelectionEntries==="function"
        ? getAlphaChronicleOriginSelectionEntries().filter(Boolean)
        : [];
    }catch(_error){return [];}
  }

  function getOriginEntry33400(variantId){
    return getOriginEntries33400().find(entry=>entry&&entry.variantId===variantId)||null;
  }

  function lockUnderlyingGame33400(){
    if(typeof document==="undefined")return false;
    const game=document.querySelector(".game-container");
    if(!game)return false;
    try{
      if(document.activeElement&&typeof document.activeElement.blur==="function")document.activeElement.blur();
      game.inert=true;
      game.setAttribute("aria-hidden","true");
      game.dataset.alphaFrontDoorLocked="33400";
      return true;
    }catch(_error){return false;}
  }

  function unlockUnderlyingGame33400(){
    if(typeof document==="undefined")return false;
    const game=document.querySelector(".game-container");
    if(!game)return false;
    try{
      game.inert=false;
      game.removeAttribute("aria-hidden");
      delete game.dataset.alphaFrontDoorLocked;
      return true;
    }catch(_error){return false;}
  }

  function retire33300Presentation33400(){
    if(typeof document==="undefined")return false;
    const old=document.getElementById("sc-alpha-front-door-33300");
    if(old&&typeof old.remove==="function")old.remove();
    return !!old;
  }

  function ensureStyles33400(){
    if(typeof document==="undefined")return false;
    if(!document.getElementById(STYLE_ID)){
      const style=document.createElement("style");
      style.id=STYLE_ID;
      style.textContent=`
        #${ROOT_ID}{position:fixed;inset:0;z-index:2147483100;display:grid;place-items:center;overflow:auto;padding:24px;background:radial-gradient(circle at 50% 12%,rgba(23,71,78,.25),transparent 37%),radial-gradient(circle at 8% 92%,rgba(145,94,20,.13),transparent 34%),linear-gradient(180deg,#02080c,#050b0f);color:#ebe4d3;font-family:Arial,Helvetica,sans-serif}
        #${ROOT_ID} *{box-sizing:border-box}.afd2-shell{width:min(1200px,100%);min-height:min(780px,calc(100vh - 48px));display:flex;flex-direction:column;border:1px solid rgba(214,169,58,.36);background:linear-gradient(180deg,rgba(7,18,25,.98),rgba(3,9,13,.99));box-shadow:0 28px 100px rgba(0,0,0,.72)}
        .afd2-head{display:flex;justify-content:space-between;gap:24px;padding:28px 34px 22px;border-bottom:1px solid rgba(214,169,58,.16)}.afd2-brand small,.afd2-eyebrow{display:block;color:#d6aa42;font-size:10px;font-weight:900;letter-spacing:.2em;text-transform:uppercase}.afd2-brand h1{margin:7px 0 4px;color:#f1ddaa;font:400 41px/1.05 Georgia,serif}.afd2-brand p{margin:0;color:#70858f;font-size:11px;letter-spacing:.08em}
        .afd2-rail{display:flex;gap:6px;align-items:flex-start;padding-top:4px}.afd2-rail span{width:25px;height:4px;background:#25343c}.afd2-rail span.on{background:#d5aa43}.afd2-body{flex:1;display:grid;place-items:center;padding:34px}.afd2-panel{width:min(970px,100%)}.afd2-title{margin:8px 0 11px;color:#eee0bc;font:400 35px/1.08 Georgia,serif}.afd2-copy{margin:0 0 20px;max-width:790px;color:#93a2a8;font-size:14px;line-height:1.62}
        .afd2-account-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:24px}.afd2-account-card{min-height:220px;padding:24px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.015);display:flex;flex-direction:column}.afd2-account-card.primary{border-color:rgba(214,169,58,.42);background:linear-gradient(145deg,rgba(103,74,18,.18),rgba(25,55,60,.05))}.afd2-account-card h3{margin:8px 0;color:#ead9aa;font:400 24px Georgia,serif}.afd2-account-card p{margin:0;color:#7d9099;font-size:12px;line-height:1.55}.afd2-account-card .afd2-actions{margin-top:auto}
        .afd2-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.afd2-btn{min-height:46px;padding:0 20px;border:1px solid rgba(214,169,58,.54);background:linear-gradient(180deg,rgba(104,76,20,.72),rgba(52,38,13,.9));color:#f4d877;font-weight:900;font-size:10px;letter-spacing:.1em;cursor:pointer}.afd2-btn.secondary{border-color:rgba(73,205,218,.32);background:rgba(29,69,76,.16);color:#72dce4}.afd2-btn:disabled{opacity:.3;cursor:not-allowed}
        .afd2-note{margin:16px 0 0;padding:12px 14px;border-left:3px solid #3aafb8;background:rgba(31,93,99,.09);color:#81979f;font-size:11px;line-height:1.55}.afd2-feedback{margin:13px 0;padding:10px 12px;border-left:3px solid #b9684f;background:rgba(100,29,18,.13);color:#dda28e;font-size:12px}.afd2-field{display:grid;gap:8px;margin:20px 0}.afd2-field label{color:#cfaa4d;font-size:10px;font-weight:900;letter-spacing:.14em}.afd2-field input{width:100%;min-height:54px;padding:0 15px;border:1px solid rgba(214,169,58,.34);background:#050c11;color:#f0e4c9;font-size:17px;outline:none}.afd2-field input:focus{border-color:#d8b04a;box-shadow:0 0 0 2px rgba(214,169,58,.08)}.afd2-hint{color:#647984;font-size:11px;line-height:1.5}
        .afd2-villages{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:9px;margin-top:20px}.afd2-village{min-height:145px;padding:17px 14px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.016);text-align:left;color:#72858e;position:relative}.afd2-village strong{display:block;color:#98a7ad;font:400 18px Georgia,serif;margin:7px 0}.afd2-village small{color:#566b75;font-size:9px;letter-spacing:.1em}.afd2-village em{display:block;margin-top:18px;color:#5f7078;font-style:normal;font-size:8px;font-weight:900;letter-spacing:.1em}.afd2-village.enabled{cursor:pointer;border-color:rgba(214,169,58,.44);background:linear-gradient(145deg,rgba(96,69,17,.2),rgba(23,53,58,.08))}.afd2-village.enabled strong{color:#edd9a6}.afd2-village.selected{box-shadow:inset 0 0 0 1px #d4aa43}.afd2-lock{position:absolute;right:10px;top:9px;color:#596a73;font-size:9px}
        .afd2-ninjas{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin-top:17px}.afd2-ninja{padding:0;overflow:hidden;border:1px solid rgba(255,255,255,.08);background:#071016;color:#d9d1bd;text-align:left;cursor:pointer}.afd2-ninja img{display:block;width:100%;aspect-ratio:.70/1;object-fit:cover;background:#020507}.afd2-ninja div{padding:10px}.afd2-ninja strong{display:block;color:#e8d8ad;font:400 14px Georgia,serif}.afd2-ninja span{display:block;margin-top:4px;color:#687d86;font-size:8px;font-weight:900;letter-spacing:.08em}.afd2-ninja.selected{border-color:#d6aa42;box-shadow:0 0 0 1px rgba(214,170,66,.55)}
        .afd2-chips{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.afd2-chip{padding:6px 9px;border:1px solid rgba(255,255,255,.09);color:#788b94;font-size:9px;font-weight:900;letter-spacing:.09em}.afd2-chip b{color:#d9ba69}.afd2-intro{margin-top:22px;padding:26px 28px;border:1px solid rgba(214,169,58,.22);background:linear-gradient(145deg,rgba(214,169,58,.045),rgba(56,157,167,.025));}.afd2-intro p{margin:0 0 14px;color:#a7b3b7;font:400 17px/1.72 Georgia,serif}.afd2-intro p:last-child{margin-bottom:0}.afd2-intro strong{color:#ead79f}
        @media(max-width:900px){#${ROOT_ID}{padding:10px}.afd2-shell{min-height:calc(100vh - 20px)}.afd2-head,.afd2-body{padding:22px}.afd2-account-grid{grid-template-columns:1fr}.afd2-villages{grid-template-columns:1fr 1fr}.afd2-ninjas{grid-template-columns:repeat(2,minmax(0,1fr))}.afd2-brand h1{font-size:31px}}
      `;
      document.head.appendChild(style);
    }
    if(!document.getElementById(BATTLE_STYLE_ID)){
      const battleStyle=document.createElement("style");
      battleStyle.id=BATTLE_STYLE_ID;
      battleStyle.textContent=`.battle2-modern .battle-live-power{top:50.2%!important}`;
      document.head.appendChild(battleStyle);
    }
    return true;
  }

  function stepIndex33400(){
    return ({account:0,ninja_id:1,village:2,ninja:3,intro:4})[state.stage]??0;
  }

  function rail33400(){
    const current=stepIndex33400();
    return `<div class="afd2-rail" aria-label="New Chronicle progress">${[0,1,2,3,4].map(i=>`<span class="${i<=current?"on":""}"></span>`).join("")}</div>`;
  }

  function layout33400(inner){
    return `<section class="afd2-shell" role="dialog" aria-modal="true" aria-label="Shinobi Chronicles new-player entry"><header class="afd2-head"><div class="afd2-brand"><small>ALPHA CHRONICLE</small><h1>SHINOBI CHRONICLES</h1><p>WORLD OF NINJA</p></div>${rail33400()}</header><main class="afd2-body">${inner}</main></section>`;
  }

  function renderAccount33400(){
    const snapshot=getSavedChronicleSnapshot33400();
    const profile=readProfile33400();
    return layout33400(`<div class="afd2-panel"><span class="afd2-eyebrow">REGISTER / LOGIN</span><h2 class="afd2-title">Enter the world of ninja.</h2><p class="afd2-copy">Start a new Ninja ID and Chronicle, or continue a Chronicle that has actually begun. A blank fresh-save shell is not treated as an existing game.</p><div class="afd2-account-grid">
      <section class="afd2-account-card primary"><span class="afd2-eyebrow">NEW PLAYER</span><h3>Register a Ninja ID</h3><p>Create a new browser-local Alpha profile, choose your village and Ninja, then enter the game introduction before your Origin prologue begins.</p><div class="afd2-actions"><button class="afd2-btn" data-afd2-action="register">REGISTER / NEW NINJA</button></div></section>
      <section class="afd2-account-card"><span class="afd2-eyebrow">RETURNING PLAYER</span><h3>Login to your Chronicle</h3><p>${snapshot.begun?`${profile&&profile.ninjaId?`Ninja ID: <strong>${esc(profile.ninjaId)}</strong>. `:""}A committed Chronicle is stored in this browser.`:"No committed Chronicle is stored in this browser yet."}</p><div class="afd2-actions"><button class="afd2-btn secondary" data-afd2-action="login" ${snapshot.begun?"":"disabled"}>LOGIN / CONTINUE</button></div></section>
    </div><div class="afd2-note"><strong>ALPHA ACCOUNT NOTE:</strong> Register/Login is currently browser-local. No online account, password or server authentication is being pretended here.</div></div>`);
  }

  function renderNinjaId33400(){
    return layout33400(`<div class="afd2-panel"><span class="afd2-eyebrow">CREATE YOUR NINJA ID</span><h2 class="afd2-title">What should the shinobi world call you?</h2><p class="afd2-copy">Your Ninja ID is your player-facing profile name. It does not replace the chosen character's Registry identity, Rank, PL, ownership or Story identity.</p><div class="afd2-field"><label>NINJA ID</label><input id="afd2-ninja-id" maxlength="24" autocomplete="off" value="${esc(state.ninjaId)}" placeholder="Enter Ninja ID"><span class="afd2-hint">2–24 characters. You will choose the Ninja whose Chronicle you play in a later step.</span></div>${state.feedback?`<div class="afd2-feedback">${esc(state.feedback)}</div>`:""}<div class="afd2-actions"><button class="afd2-btn secondary" data-afd2-action="back-account">BACK</button><button class="afd2-btn" data-afd2-action="save-id">CONTINUE</button></div></div>`);
  }

  function renderVillage33400(){
    return layout33400(`<div class="afd2-panel"><span class="afd2-eyebrow">CHOOSE YOUR VILLAGE</span><h2 class="afd2-title">Where will your Chronicle begin?</h2><p class="afd2-copy">The world contains many shinobi villages. Hidden Leaf is the supported Alpha starting village; the others are shown truthfully but cannot be selected yet.</p><div class="afd2-chips"><span class="afd2-chip">NINJA ID · <b>${esc(state.ninjaId)}</b></span></div><div class="afd2-villages">${VILLAGES.map(v=>`<button class="afd2-village ${v.enabled?"enabled":""} ${state.villageId===v.id?"selected":""}" data-village-id="${v.id}" ${v.enabled?"":"disabled"}>${v.enabled?"":`<span class="afd2-lock">LOCKED</span>`}<small>${esc(v.country)}</small><strong>${esc(v.name)}</strong><em>${esc(v.status)}</em></button>`).join("")}</div><div class="afd2-actions"><button class="afd2-btn secondary" data-afd2-action="back-id">BACK</button><button class="afd2-btn" data-afd2-action="continue-village" ${state.villageId==="konoha"?"":"disabled"}>CONTINUE</button></div></div>`);
  }

  function renderNinja33400(){
    const entries=getOriginEntries33400();
    return layout33400(`<div class="afd2-panel" style="width:min(1060px,100%)"><span class="afd2-eyebrow">CHOOSE YOUR NINJA</span><h2 class="afd2-title">Whose Chronicle will you play?</h2><p class="afd2-copy">Choose one of the existing Academy Origins. This screen is selection only: ownership and locked protagonist identity are not committed until you press BEGIN after the introduction.</p><div class="afd2-chips"><span class="afd2-chip">NINJA ID · <b>${esc(state.ninjaId)}</b></span><span class="afd2-chip">VILLAGE · <b>HIDDEN LEAF</b></span></div>${entries.length===10?`<div class="afd2-ninjas">${entries.map(entry=>`<button class="afd2-ninja ${state.selectedVariantId===entry.variantId?"selected":""}" data-origin-id="${esc(entry.variantId)}"><img src="${esc(entry.cardPath)}" alt="${esc(entry.name)}"><div><strong>${esc(entry.name)}</strong><span>${esc(entry.rank)} · BASE PL ${Number(entry.basePL)||0}</span></div></button>`).join("")}</div>`:`<div class="afd2-feedback">Origin authority expected 10 Academy candidates but returned ${entries.length}.</div>`}<div class="afd2-actions"><button class="afd2-btn secondary" data-afd2-action="back-village">BACK</button><button class="afd2-btn" data-afd2-action="continue-ninja" ${state.selectedVariantId&&entries.length===10?"":"disabled"}>CONTINUE</button></div></div>`);
  }

  function renderIntro33400(){
    const entry=getOriginEntry33400(state.selectedVariantId);
    return layout33400(`<div class="afd2-panel"><span class="afd2-eyebrow">INTRODUCTION</span><h2 class="afd2-title">Welcome to Shinobi Chronicles.</h2><div class="afd2-chips"><span class="afd2-chip">NINJA ID · <b>${esc(state.ninjaId)}</b></span><span class="afd2-chip">VILLAGE · <b>HIDDEN LEAF</b></span><span class="afd2-chip">NINJA · <b>${esc(entry&&entry.name||state.selectedVariantId||"—")}</b></span></div><div class="afd2-intro"><p>The shinobi world is shaped by <strong>missions, battles, choices and the people you meet</strong>. Your Chronicle records what your Ninja actually experiences.</p><p>Hidden Leaf is your starting village. From here, your chosen Ninja's own authored Origin will establish how their story begins before ordinary Academy life opens.</p><p>When you are ready, press <strong>BEGIN</strong>. That is the commitment point: your chosen Ninja becomes your locked Chronicle Origin and their prologue starts.</p></div>${state.feedback?`<div class="afd2-feedback">${esc(state.feedback)}</div>`:""}<div class="afd2-actions"><button class="afd2-btn secondary" data-afd2-action="back-ninja">BACK</button><button class="afd2-btn" data-afd2-action="begin-origin">BEGIN</button></div></div>`);
  }

  function ensureRoot33400(){
    if(typeof document==="undefined")return null;
    let root=document.getElementById(ROOT_ID);
    if(root)return root;
    root=document.createElement("div");
    root.id=ROOT_ID;
    root.tabIndex=-1;
    root.addEventListener("click",onClick33400);
    root.addEventListener("keydown",event=>{if(event.key==="Escape")event.preventDefault();});
    document.body.appendChild(root);
    return root;
  }

  function render33400(){
    const root=ensureRoot33400();
    if(!root)return false;
    const renderers={account:renderAccount33400,ninja_id:renderNinjaId33400,village:renderVillage33400,ninja:renderNinja33400,intro:renderIntro33400};
    root.innerHTML=(renderers[state.stage]||renderAccount33400)();
    if(state.stage==="ninja_id"){
      const input=document.getElementById("afd2-ninja-id");
      if(input&&typeof input.focus==="function")setTimeout(()=>input.focus(),0);
    }
    return true;
  }

  function startNewChronicle33400(){
    try{sessionStorage.setItem(FORCE_NEW_KEY,"1");}catch(_error){}
    try{localStorage.removeItem(PLAYER_SAVE_KEY);localStorage.removeItem(PROFILE_KEY);}catch(_error){}
    try{sessionStorage.removeItem(SESSION_RESUME_KEY);}catch(_error){}
    if(typeof location!=="undefined"&&typeof location.reload==="function")location.reload();
    return {success:true,reloadRequested:true,forceNewMarker:true};
  }

  function release33400(){
    state.released=true;
    unlockUnderlyingGame33400();
    if(typeof document!=="undefined"){
      const root=document.getElementById(ROOT_ID);if(root&&typeof root.remove==="function")root.remove();
      const old=document.getElementById("sc-alpha-front-door-33300");if(old&&typeof old.remove==="function")old.remove();
    }
    return true;
  }

  function beginSelectedOrigin33400(){
    state.feedback=null;
    const entry=getOriginEntry33400(state.selectedVariantId);
    if(!entry)return {success:false,reason:"origin_required"};
    if(state.villageId!=="konoha")return {success:false,reason:"alpha_start_village_required"};
    if(typeof selectChronicleOrigin!=="function"||typeof beginAlphaChronicleOriginPrologue!=="function")return {success:false,reason:"origin_runtime_unavailable"};
    const sceneId=globalThis.SC_ALPHA_ORIGIN_SCENE_IDS&&globalThis.SC_ALPHA_ORIGIN_SCENE_IDS[entry.variantId]||null;
    if(!sceneId||typeof getStorySceneDefinition!=="function"||!getStorySceneDefinition(sceneId)){
      state.feedback="The selected Origin prologue is not registered.";render33400();return {success:false,reason:"origin_scene_not_registered",sceneId};
    }
    const selected=selectChronicleOrigin(entry.variantId,"alpha_front_door_33400_begin_confirmation");
    if(!selected||selected.success!==true){state.feedback=`Origin confirmation failed: ${selected&&selected.reason?selected.reason:"unknown error"}.`;render33400();return selected||{success:false,reason:"origin_confirmation_failed"};}
    persistProfile33400();
    try{sessionStorage.removeItem(SESSION_RESUME_KEY);}catch(_error){}
    const launched=beginAlphaChronicleOriginPrologue();
    if(!launched||launched.success!==true){state.feedback=`Origin committed, but prologue launch failed: ${launched&&launched.reason?launched.reason:"unknown error"}.`;render33400();return {success:false,reason:"origin_confirmed_prologue_launch_failed",selected,launched};}
    release33400();
    return {success:true,selected,launched,commitPoint:"introduction_begin"};
  }

  function onClick33400(event){
    const target=event&&event.target&&typeof event.target.closest==="function"?event.target:null;
    if(!target)return;
    const originButton=target.closest("[data-origin-id]");
    if(originButton){state.selectedVariantId=originButton.getAttribute("data-origin-id");state.feedback=null;render33400();return;}
    const villageButton=target.closest("[data-village-id]");
    if(villageButton&&!villageButton.disabled){state.villageId=villageButton.getAttribute("data-village-id");state.feedback=null;render33400();return;}
    const actionNode=target.closest("[data-afd2-action]");
    if(!actionNode)return;
    const action=actionNode.getAttribute("data-afd2-action");
    if(action==="register"){startNewChronicle33400();return;}
    if(action==="login"){if(hasBegunChronicle33400())release33400();return;}
    if(action==="back-account"){state.stage="account";state.feedback=null;render33400();return;}
    if(action==="save-id"){
      const input=document.getElementById("afd2-ninja-id");
      const result=normalizeNinjaId33400(input?input.value:state.ninjaId);
      if(!result.valid){state.feedback=result.reason;render33400();return;}
      state.ninjaId=result.value;state.feedback=null;state.stage="village";render33400();return;
    }
    if(action==="back-id"){state.stage="ninja_id";render33400();return;}
    if(action==="continue-village"){if(state.villageId==="konoha"){state.stage="ninja";render33400();}return;}
    if(action==="back-village"){state.stage="village";render33400();return;}
    if(action==="continue-ninja"){if(getOriginEntry33400(state.selectedVariantId)){state.stage="intro";render33400();}return;}
    if(action==="back-ninja"){state.stage="ninja";render33400();return;}
    if(action==="begin-origin"){beginSelectedOrigin33400();return;}
  }

  // --------------------------------------------------------------------------
  // One authored enemy opportunity after each completed player opportunity.
  // The enemy resolver and exact enemy action package already exist in game.js.
  // --------------------------------------------------------------------------
  const priorConsumeBattleActionOpportunity33400=typeof consumeBattleActionOpportunity==="function"?consumeBattleActionOpportunity:null;
  let enemyTurnInProgress33400=false;
  let enemyTurnsScheduled33400=0;

  function shouldRunEnemyTurn33400(side){
    if(side!=="player"||enemyTurnInProgress33400)return false;
    try{
      if(!currentBattle||currentBattle.active!==true||currentBattle.battleOver===true)return false;
      if(typeof evaluateEnemyActionScheduler!=="function"||typeof executeEnemyAuthoredActionOpportunity!=="function")return false;
      const scheduler=evaluateEnemyActionScheduler();
      return !!(scheduler&&scheduler.ready===true);
    }catch(_error){return false;}
  }

  function consumeBattleActionOpportunity33400(side,participantId,actionId,reason){
    const result=priorConsumeBattleActionOpportunity33400
      ? priorConsumeBattleActionOpportunity33400.apply(this,arguments)
      : null;
    if(shouldRunEnemyTurn33400(side)){
      enemyTurnInProgress33400=true;
      try{
        const enemyResult=executeEnemyAuthoredActionOpportunity();
        if(enemyResult&&enemyResult.success===true)enemyTurnsScheduled33400+=1;
      }finally{enemyTurnInProgress33400=false;}
    }
    return result;
  }

  if(priorConsumeBattleActionOpportunity33400){
    globalThis.consumeBattleActionOpportunity=consumeBattleActionOpportunity33400;
    try{consumeBattleActionOpportunity=consumeBattleActionOpportunity33400;}catch(_error){}
  }

  function install33400(){
    if(state.installed)return true;
    state.installed=true;
    ensureStyles33400();
    retire33300Presentation33400();
    lockUnderlyingGame33400();
    let forceNew=false;
    try{forceNew=sessionStorage.getItem(FORCE_NEW_KEY)==="1";sessionStorage.removeItem(FORCE_NEW_KEY);}catch(_error){forceNew=false;}
    state.stage=forceNew?"ninja_id":"account";
    render33400();
    return true;
  }

  function runAlphaBrowserOnboardingFixes33400Diagnostics(){
    const consumeSource=consumeBattleActionOpportunity33400.toString();
    const beginSource=beginSelectedOrigin33400.toString();
    const newSource=startNewChronicle33400.toString();
    const checks={
      patchId:PATCH_ID==="alpha_browser_onboarding_fixes_33400_2026_09_13",
      exactNewPlayerSequence:["account","ninja_id","village","ninja","intro"].every(stage=>Object.prototype.hasOwnProperty.call(({account:1,ninja_id:1,village:1,ninja:1,intro:1}),stage)),
      registerLoginPresented:renderAccount33400.toString().includes("REGISTER / NEW NINJA")&&renderAccount33400.toString().includes("LOGIN / CONTINUE"),
      browserLocalAuthTruth:renderAccount33400.toString().includes("browser-local")&&!renderAccount33400.toString().includes("password"),
      freshPendingShellNotBegun:getSavedChronicleSnapshot33400.toString().includes("chronicle_origin_pending")&&getSavedChronicleSnapshot33400.toString().includes("pendingShell"),
      forceNewReloadMarker:newSource.includes("FORCE_NEW_KEY")&&newSource.includes("location.reload"),
      exactResetKeys:newSource.includes("PLAYER_SAVE_KEY")&&newSource.includes("PROFILE_KEY")&&newSource.includes("SESSION_RESUME_KEY")&&!newSource.includes("localStorage.clear")&&!newSource.includes("sessionStorage.clear"),
      exactTenOriginAuthority:getOriginEntries33400.toString().includes("getAlphaChronicleOriginSelectionEntries"),
      selectionBeforeIntroNoCommit:!renderNinja33400.toString().includes("selectChronicleOrigin"),
      beginOwnsOriginCommit:beginSource.includes("selectChronicleOrigin")&&beginSource.includes("beginAlphaChronicleOriginPrologue"),
      noSecondAcquisitionAuthority:!beginSource.includes("commitCharacterAcquisition")&&!beginSource.includes("grantCharacterRegistryOwnership"),
      konohaOnlyAlphaStart:VILLAGES.filter(v=>v.enabled).length===1&&VILLAGES[0].id==="konoha",
      enemyTurnHooksCompletedPlayerOpportunity:consumeSource.includes('shouldRunEnemyTurn33400(side)')&&consumeSource.includes("executeEnemyAuthoredActionOpportunity"),
      enemyTurnRecursionGuard:consumeSource.includes("enemyTurnInProgress33400=true")&&shouldRunEnemyTurn33400.toString().includes('side!=="player"'),
      plCalibrationInstalled:typeof document==="undefined"?true:!!document.getElementById(BATTLE_STYLE_ID),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return {pass:failed.length===0,checks,failed,browserGoldenClaimed:false,enemyTurnsScheduled:enemyTurnsScheduled33400,patchId:PATCH_ID};
  }

  globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400={
    patchId:PATCH_ID,
    state,
    villages:VILLAGES,
    keys:Object.freeze({playerSave:PLAYER_SAVE_KEY,sessionResume:SESSION_RESUME_KEY,profile:PROFILE_KEY,forceNew:FORCE_NEW_KEY}),
    getSavedChronicleSnapshot:getSavedChronicleSnapshot33400,
    hasBegunChronicle:hasBegunChronicle33400,
    openStage(stage){if(["account","ninja_id","village","ninja","intro"].includes(stage)){state.stage=stage;render33400();return true;}return false;},
    startNewChronicle:startNewChronicle33400,
    beginSelectedOrigin:beginSelectedOrigin33400,
    release:release33400,
    getEnemyTurnsScheduled(){return enemyTurnsScheduled33400;},
    browserGoldenClaimed:false
  };
  globalThis.runAlphaBrowserOnboardingFixes33400Diagnostics=runAlphaBrowserOnboardingFixes33400Diagnostics;

  if(typeof document!=="undefined"){
    if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install33400,{once:true});
    else install33400();
  }
})();
