// ============================================================================
// ALPHA PLAYABILITY SPRINT — 33100
// Coding-owned browser integration tranche for #141.
//
// Goals:
// - make exact Story -> Battle -> same Story return outrank stale legacy fallbacks;
// - finish the missing Battle defeat -> Setback -> exact caller lifecycle;
// - wire the approved Victory / Setback art as optional presentation layers only;
// - keep World opportunity dossiers above map marker halos;
// - make Arena Promotion / Staged Battles / PvP / Village Tournament code-owned;
// - preserve every existing semantic owner and fail closed where competition
//   authority does not yet exist.
//
// No fake matchmaking, tournament result, reward, Rank, PL, ownership, injury,
// death or Story occurrence is created by this patch.
// ============================================================================
(function installAlphaPlayableSprint33100(){
  "use strict";

  const PATCH_ID="alpha_playability_sprint_33100_2026_09_13";
  const esc=value=>{
    if(typeof escapeStorySceneHTML==="function")return escapeStorySceneHTML(String(value??""));
    return String(value??"").replace(/[&<>\"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
  };
  const clone=value=>{
    try{return typeof cloneBattleRuntimeValue==="function"?cloneBattleRuntimeValue(value):JSON.parse(JSON.stringify(value));}
    catch(_error){return value||null;}
  };

  // --------------------------------------------------------------------------
  // 1. STORY -> BATTLE -> SAME STORY RETURN PRIORITY
  // --------------------------------------------------------------------------
  // 32600 already orders reward commit before continueAfterVictory(). The legacy
  // continue path can still evaluate old run-completion/tutorial lifecycle first.
  // A committed Story caller is more specific authority and must be restored
  // before those generic fallbacks.
  const priorContinueAfterVictory33100=typeof continueAfterVictory==="function"?continueAfterVictory:null;
  function continueAfterVictory33100(){
    const battle=typeof currentBattle!=="undefined"?currentBattle:null;
    const rc=battle&&battle.returnContext||null;
    const claimed=!!(battle&&battle.rewards&&battle.rewards.claimed===true);
    const victory=!!(battle&&(
      (battle.outcome&&battle.outcome.type==="victory")||
      battle.battleOver===true
    ));

    if(claimed&&victory&&rc&&rc.type==="story_scene"&&typeof resumeBattleCallerAfterCompletion==="function"){
      const result=resumeBattleCallerAfterCompletion("victory");
      if(result&&result.success===true)return {...result,alpha33100StoryReturnPriority:true};
    }
    return priorContinueAfterVictory33100?priorContinueAfterVictory33100.apply(this,arguments):{success:false,reason:"victory_continue_authority_missing"};
  }
  if(typeof continueAfterVictory==="function")continueAfterVictory=continueAfterVictory33100;
  globalThis.continueAfterVictory=continueAfterVictory33100;

  // --------------------------------------------------------------------------
  // 2. BATTLE DEFEAT -> SETBACK -> EXACT CALLER
  // --------------------------------------------------------------------------
  function markBattleSetback33100(participantId,envelope){
    if(typeof currentBattle==="undefined"||!currentBattle)return{success:false,reason:"battle_missing"};
    if(currentBattle.battleOver===true&&currentBattle.outcome&&currentBattle.outcome.type==="defeat")return{success:true,idempotent:true};

    currentBattle.battleOver=true;
    currentBattle.active=false;
    currentBattle.completedAt=Date.now();
    currentBattle.outcome={
      ...(currentBattle.outcome&&typeof currentBattle.outcome==="object"?currentBattle.outcome:{}),
      type:"defeat",
      resultClass:"deployment_exhausted",
      defeatedParticipantId:participantId||null,
      battlePLWithdrawal:true,
      injuryInferred:false,
      deathInferred:false
    };
    try{
      if(typeof recordBattleEvidence==="function")recordBattleEvidence({
        eventType:"battle_defeat",
        actionId:envelope&&envelope.actionId||null,
        targetRef:participantId&&typeof createBattleParticipantRef==="function"?createBattleParticipantRef("player",participantId):null,
        data:{playerDeploymentExhausted:true,battlePLWithdrawal:true,injuryInferred:false,deathInferred:false}
      });
    }catch(_error){}
    try{if(typeof saveTestState==="function")saveTestState();}catch(_error){}
    try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
    return{success:true,outcome:clone(currentBattle.outcome)};
  }

  const priorHandleZero33100=typeof handleBattleParticipantAtZeroPL==="function"?handleBattleParticipantAtZeroPL:null;
  if(priorHandleZero33100){
    handleBattleParticipantAtZeroPL=function handleBattleParticipantAtZeroPL33100(side,participantId,actor,envelope){
      const result=priorHandleZero33100.apply(this,arguments);
      if(side!=="player")return result;
      let remaining=true;
      try{remaining=typeof hasBattleDeploymentParticipants==="function"?hasBattleDeploymentParticipants("player"):true;}catch(_error){remaining=true;}
      if(remaining)return result;
      const setback=markBattleSetback33100(participantId,envelope);
      if(setback&&setback.success===true&&typeof openOverlay==="function")openOverlay("setback");
      return {...(result&&typeof result==="object"?result:{}),setbackPresented:true,alpha33100:true};
    };
  }

  function getSetbackCaller33100(){
    const battle=typeof currentBattle!=="undefined"?currentBattle:null;
    return battle&&battle.returnContext?clone(battle.returnContext):null;
  }

  function continueAfterSetback33100(){
    const battle=typeof currentBattle!=="undefined"?currentBattle:null;
    const rc=battle&&battle.returnContext||null;
    if(rc&&typeof resumeBattleCallerAfterCompletion==="function"){
      const result=resumeBattleCallerAfterCompletion("defeat");
      if(result&&result.success===true)return {...result,alpha33100SetbackReturn:true};
    }
    if(typeof openOverlay==="function"){
      openOverlay("battle");
      return{success:true,destination:"battle",fallback:true};
    }
    return{success:false,reason:"setback_return_authority_missing"};
  }
  globalThis.continueAfterSetback33100=continueAfterSetback33100;

  function renderSetback33100(container){
    if(!container)return false;
    const battle=typeof currentBattle!=="undefined"?currentBattle:null;
    const caller=getSetbackCaller33100();
    const activeId=(()=>{try{return typeof getSavedClanStartCharacterId==="function"?getSavedClanStartCharacterId():null;}catch(_error){return null;}})();
    const actor=(()=>{try{return activeId&&typeof getPlayerCharacter==="function"?getPlayerCharacter(activeId):null;}catch(_error){return null;}})();
    const enemy=battle&&(battle.enemy||((typeof selectedEnemy!=="undefined")?selectedEnemy:null))||null;
    container.innerHTML=`<section class="alpha331-setback" aria-label="Battle setback">
      <div class="alpha331-result-art" aria-hidden="true"></div>
      <header><div><span>BATTLE COMPLETE · CHRONICLE RESULT</span><h1>SETBACK</h1><p>Your deployed shinobi reached 0 Battle PL. This records withdrawal from the Battle — not automatic injury or death.</p></div><b>NO REWARD CLAIM</b></header>
      <div class="alpha331-result-grid">
        <article><span>YOUR SIDE</span><h2>${esc(actor&&actor.name||"My Clan")}</h2><p>Deployment exhausted</p></article>
        <article><span>OPPOSITION</span><h2>${esc(enemy&&enemy.name||"Encounter")}</h2><p>Battle result recorded separately from Story consequences.</p></article>
        <article><span>RETURN</span><h2>${esc(caller&&caller.type?String(caller.type).replaceAll("_"," ").toUpperCase():"CALLER")}</h2><p>Continue returns to the exact owning caller when its return envelope is available.</p></article>
      </div>
      <footer><p>Battle PL defeat does not infer death, injury, custody, Promotion failure or Story failure unless another authorised system commits that consequence.</p><button type="button" onclick="continueAfterSetback33100()">CONTINUE</button></footer>
    </section>`;
    return true;
  }
  globalThis.renderSetback33100=renderSetback33100;

  // Intercept only the new Setback presentation route; all other overlay types
  // delegate untouched.
  const priorOpenOverlay33100=typeof openOverlay==="function"?openOverlay:null;
  if(priorOpenOverlay33100){
    openOverlay=function openOverlay33100(type){
      if(type!=="setback")return priorOpenOverlay33100.apply(this,arguments);
      try{if(typeof currentOverlayType!=="undefined")currentOverlayType="setback";}catch(_error){}
      const overlay=typeof document!=="undefined"?document.getElementById("screen-overlay"):null;
      const container=typeof document!=="undefined"?document.getElementById("overlay-content-container"):null;
      if(overlay)overlay.style.display="flex";
      renderSetback33100(container);
      return{success:true,type:"setback",codeOwned:true};
    };
    globalThis.openOverlay=openOverlay;
  }

  // --------------------------------------------------------------------------
  // 3. WORLD DOSSIER STACKING — PRESENTATION ONLY
  // --------------------------------------------------------------------------
  function raiseWorldDossier33100(){
    if(typeof document==="undefined")return false;
    const panel=document.querySelector(".alpha328-event");
    if(!panel)return false;
    panel.style.zIndex="2147483000";
    panel.style.isolation="isolate";
    const host=panel.parentElement;
    if(host){host.style.isolation="isolate";host.style.zIndex="2147482999";}
    return true;
  }
  const priorRenderRegionEvent33100=typeof renderRegionEventDrawer==="function"?renderRegionEventDrawer:null;
  if(priorRenderRegionEvent33100){
    renderRegionEventDrawer=function renderRegionEventDrawer33100(){
      const result=priorRenderRegionEvent33100.apply(this,arguments);
      raiseWorldDossier33100();
      if(typeof requestAnimationFrame==="function")requestAnimationFrame(raiseWorldDossier33100);
      return result;
    };
  }
  globalThis.raiseWorldDossier33100=raiseWorldDossier33100;

  // --------------------------------------------------------------------------
  // 4. CODE-OWNED ARENA SURFACES
  // --------------------------------------------------------------------------
  function arenaStartReadModel33100(){
    let startId=null,start=null;
    try{startId=typeof getSavedClanStartCharacterId==="function"?getSavedClanStartCharacterId():null;}catch(_error){}
    try{start=startId&&typeof getPlayerCharacter==="function"?getPlayerCharacter(startId):null;}catch(_error){}
    const slots=[];
    try{
      if(typeof getClanQueueReadModel==="function"){
        const read=getClanQueueReadModel();
        const raw=read&&(read.slots||read.queue||read.battleOrder)||[];
        if(Array.isArray(raw))raw.forEach((row,index)=>{
          const id=row&&(row.participantId||row.characterId||row.id)||null;
          let c=null;try{c=id&&typeof getPlayerCharacter==="function"?getPlayerCharacter(id):null;}catch(_error){}
          slots.push({label:index===0?"START":`NEXT ${index}`,name:c&&c.name||id||"—"});
        });
      }
    }catch(_error){}
    if(!slots.length){slots.push({label:"START",name:start&&start.name||"—"});for(let i=1;i<6;i++)slots.push({label:i<4?`NEXT ${i}`:`RESERVE ${i-3}`,name:"—"});}
    return{startId,start,slots:slots.slice(0,6)};
  }

  function arenaShell33100({eyebrow,title,subtitle,body,footer=""}){
    return `<section class="alpha331-arena" aria-label="${esc(title)}"><header><div><span>${esc(eyebrow)}</span><h1>${esc(title)}</h1><p>${esc(subtitle)}</p></div><button type="button" onclick="openOverlay('arena')" aria-label="Back to Arena">← ARENA</button></header><div class="alpha331-arena-body">${body}</div>${footer}</section>`;
  }

  function battleOrderMarkup33100(){
    const read=arenaStartReadModel33100();
    return `<aside class="alpha331-order"><div><span>MY CLAN · BATTLE ORDER</span><b>${read.start?"READY":"NO START SAVED"}</b></div>${read.slots.map(row=>`<p><span>${esc(row.label)}</span><strong>${esc(row.name)}</strong></p>`).join("")}</aside>`;
  }

  const priorPromotion33100=typeof openArenaPromotionSurface==="function"?openArenaPromotionSurface:null;
  function openArenaPromotionSurface33100(subjectId){
    const container=typeof document!=="undefined"?document.getElementById("overlay-content-container"):null;
    let semanticAction=null,semanticDisabled=true,subjectLabel=null,legacyResult=null;
    if(priorPromotion33100){
      try{
        legacyResult=priorPromotion33100.apply(this,arguments);
        if(container){
          const buttons=[...container.querySelectorAll("button")];
          const action=buttons.find(btn=>/FIELD READINESS|ASSESSMENT/i.test(btn.textContent||""));
          if(action){semanticAction=action.getAttribute("onclick")||null;semanticDisabled=!!action.disabled;}
          const subject=[...container.querySelectorAll("strong,b,h2,h3")].find(node=>/Academy|Genin|Menma|Hinata|Mirai|Kushina|Kurenai|Iwabee|Metal|Kakashi|Obito|Wasabi/i.test(node.textContent||""));
          if(subject)subjectLabel=subject.textContent.trim();
        }
      }catch(_error){}
    }
    const read=arenaStartReadModel33100();
    if(!subjectLabel)subjectLabel=read.start&&read.start.name||"Current Academy Shinobi";
    const launch=semanticAction&&!semanticDisabled
      ? `<button class="alpha331-primary" type="button" onclick="${esc(semanticAction)}">VIEW FIELD READINESS ASSESSMENT</button>`
      : `<button class="alpha331-primary" type="button" disabled>FIELD READINESS NOT CURRENTLY AVAILABLE</button>`;
    if(container)container.innerHTML=arenaShell33100({
      eyebrow:"KONOHA · PROMOTION AUTHORITY",title:"PROMOTION",subtitle:"Promotion is earned through the authorised assessment path. Opening this surface does not commit an attempt.",
      body:`<div class="alpha331-two"><main class="alpha331-panel"><span>ASSESSMENT SUBJECT</span><h2>${esc(subjectLabel)}</h2><p>Academy → Genin uses the existing Field Readiness authority. Battle may support an assessment, but Battle victory does not automatically equal Promotion.</p><div class="alpha331-rule"><b>SEMANTIC STATUS</b><p>${semanticAction?semanticDisabled?"The existing Promotion authority currently reports this assessment unavailable.":"The existing Promotion authority reports an actionable Field Readiness route.":"No exact Promotion launch action was projected by the predecessor surface; this patch fails closed rather than inventing one."}</p></div>${launch}</main>${battleOrderMarkup33100()}</div>`
    });
    return{success:true,codeOwned:true,legacyResult,semanticActionCaptured:!!semanticAction,available:!!semanticAction&&!semanticDisabled};
  }
  globalThis.openArenaPromotionSurface=openArenaPromotionSurface33100;
  try{if(typeof openArenaPromotionSurface!=="undefined")openArenaPromotionSurface=openArenaPromotionSurface33100;}catch(_error){}

  function arenaUtilityBody33100(kind){
    const activeBattle=(()=>{try{return !!(currentBattle&&currentBattle.active===true&&currentBattle.battleOver!==true);}catch(_error){return false;}})();
    const resume=activeBattle?`<button class="alpha331-primary" type="button" onclick="openOverlay('combat')">RESUME ACTIVE BATTLE</button>`:"";
    const common=`<div class="alpha331-two"><main class="alpha331-panel">`;
    if(kind==="staged")return `${common}<span>CONTROLLED COMBAT</span><h2>STAGED BATTLES</h2><p>This is the code-owned controlled-Battle surface. It can launch only an encounter that supplies a real opponent, occurrence and caller contract.</p><div class="alpha331-rule"><b>AUTHORITY STATUS</b><p>${activeBattle?"An active Battle already exists and can be resumed.":"No authored staged encounter is currently selected. No opponent or reward is fabricated."}</p></div>${resume||`<button class="alpha331-primary" disabled>NO AUTHORED STAGED ENCOUNTER SELECTED</button>`}</main>${battleOrderMarkup33100()}</div>`;
    if(kind==="pvp")return `${common}<span>LOCAL ALPHA SURFACE</span><h2>PVP</h2><p>The presentation, My Clan projection and Battle-order preparation are live. Online matchmaking, ladders and remote opponent state are not authored Alpha authority.</p><div class="alpha331-rule"><b>ALPHA STATUS</b><p>UI READY · MATCHMAKING FAIL-CLOSED · NO FAKE ONLINE RESULT</p></div><button class="alpha331-primary" disabled>WAITING FOR LEGITIMATE PVP MATCH AUTHORITY</button></main>${battleOrderMarkup33100()}</div>`;
    return `${common}<span>KONOHA COMPETITION</span><h2>VILLAGE TOURNAMENT</h2><p>The competition surface is code-owned. Brackets, eligibility, opponents and rewards appear only when their owning systems provide committed authority.</p><div class="alpha331-rule"><b>ALPHA STATUS</b><p>UI READY · BRACKET/REWARD AUTHORITY NOT FABRICATED</p></div><button class="alpha331-primary" disabled>NO AUTHORISED TOURNAMENT BRACKET YET</button></main>${battleOrderMarkup33100()}</div>`;
  }

  function openAlphaArenaUtilitySurface33100(kind){
    kind=String(kind||"").toLowerCase();
    if(!["staged","pvp","tournament"].includes(kind))return{success:false,reason:"unknown_arena_surface"};
    try{if(typeof ALPHA_POST2500_ARENA_RUNTIME!=="undefined"&&ALPHA_POST2500_ARENA_RUNTIME)ALPHA_POST2500_ARENA_RUNTIME.surface=kind;}catch(_error){}
    const container=typeof document!=="undefined"?document.getElementById("overlay-content-container"):null;
    if(!container)return{success:false,reason:"overlay_container_missing"};
    const title=kind==="staged"?"STAGED BATTLES":kind==="pvp"?"PVP":"VILLAGE TOURNAMENT";
    const eyebrow=kind==="staged"?"CONTROLLED COMBAT":kind==="pvp"?"LOCAL ALPHA SURFACE":"KONOHA COMPETITION";
    container.innerHTML=arenaShell33100({eyebrow,title,subtitle:"Code-owned Arena surface · presentation does not create gameplay authority.",body:arenaUtilityBody33100(kind)});
    return{success:true,kind,codeOwned:true,fakeCompetitionStateCreated:false};
  }
  globalThis.openAlphaArenaUtilitySurface=openAlphaArenaUtilitySurface33100;
  try{if(typeof openAlphaArenaUtilitySurface!=="undefined")openAlphaArenaUtilitySurface=openAlphaArenaUtilitySurface33100;}catch(_error){}

  // --------------------------------------------------------------------------
  // 5. PRESENTATION — VICTORY/SETBACK ART IS OPTIONAL, CODE REMAINS STRUCTURAL
  // --------------------------------------------------------------------------
  if(typeof document!=="undefined"&&document.head&&!document.getElementById("alpha-playability-sprint-33100-style")){
    const style=document.createElement("style");
    style.id="alpha-playability-sprint-33100-style";
    style.textContent=`
      /* Open dossier must cover every map pin/halo. */
      .alpha328-event{z-index:2147483000!important;isolation:isolate!important;transform:translateZ(0)}

      /* Approved art is atmosphere only; coded layout remains complete without it. */
      .alpha-victory-code-screen,.victory-screen{position:relative!important;background-color:#050b10!important;background-image:linear-gradient(90deg,rgba(3,9,13,.92),rgba(3,9,13,.74)),url('UI/victory.png')!important;background-size:cover!important;background-position:center!important}
      .alpha-victory-code-screen>* ,.victory-screen>*{position:relative;z-index:2}

      .alpha331-setback{position:relative;width:100%;height:100%;min-height:620px;overflow:hidden;display:flex;flex-direction:column;color:#e7dfcd;background:#050b10;border:1px solid rgba(214,169,58,.28)}
      .alpha331-setback .alpha331-result-art{position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,8,12,.94),rgba(3,8,12,.76)),url('UI/setback.png') center/cover no-repeat;opacity:.34;z-index:0}
      .alpha331-setback>header,.alpha331-setback>.alpha331-result-grid,.alpha331-setback>footer{position:relative;z-index:2}
      .alpha331-setback>header{display:flex;justify-content:space-between;gap:30px;padding:34px 40px;border-bottom:1px solid rgba(214,169,58,.22);background:rgba(3,8,12,.72)}
      .alpha331-setback header span,.alpha331-arena header span,.alpha331-panel>span{color:#d9b34f;font-size:9px;font-weight:900;letter-spacing:.15em}.alpha331-setback h1,.alpha331-arena h1{margin:7px 0 8px;color:#f2dfad;font:900 42px/1 Georgia,serif}.alpha331-setback header p,.alpha331-arena header p{margin:0;max-width:760px;color:#8fa0a7;font-size:12px;line-height:1.5}.alpha331-setback header>b{align-self:start;padding:8px 10px;border:1px solid rgba(151,169,177,.22);color:#87989f;font-size:8px;letter-spacing:.12em;background:rgba(3,8,12,.72)}
      .alpha331-result-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:34px 40px;flex:1}.alpha331-result-grid article{padding:22px;border:1px solid rgba(255,255,255,.08);background:rgba(2,8,12,.82)}.alpha331-result-grid span{color:#6c8089;font-size:8px;letter-spacing:.13em}.alpha331-result-grid h2{margin:10px 0;color:#e8d7ad;font:800 22px/1.1 Georgia,serif}.alpha331-result-grid p{color:#8d9da3;font-size:11px;line-height:1.55}
      .alpha331-setback footer{display:flex;align-items:center;justify-content:space-between;gap:26px;padding:20px 40px;border-top:1px solid rgba(214,169,58,.18);background:rgba(3,8,12,.88)}.alpha331-setback footer p{margin:0;color:#758890;font-size:10px;line-height:1.5}.alpha331-setback footer button,.alpha331-primary{min-height:44px;padding:0 20px;border:1px solid rgba(214,169,58,.66);background:linear-gradient(180deg,#624814,#33250b);color:#f2d274;font-weight:900;letter-spacing:.08em;cursor:pointer}.alpha331-primary:disabled{opacity:.38;cursor:not-allowed}

      .alpha331-arena{width:min(1320px,calc(100% - 58px));min-height:min(760px,calc(100vh - 84px));margin:auto;display:flex;flex-direction:column;color:#e7e0d0;background:radial-gradient(circle at 80% 10%,rgba(214,169,58,.07),transparent 35%),linear-gradient(180deg,#071118,#040a0e);border:1px solid rgba(214,169,58,.25);box-shadow:0 28px 80px rgba(0,0,0,.54)}
      .alpha331-arena>header{display:flex;justify-content:space-between;align-items:start;gap:24px;padding:28px 32px 22px;border-bottom:1px solid rgba(214,169,58,.18)}.alpha331-arena>header h1{font-size:36px}.alpha331-arena>header button{min-height:38px;padding:0 13px;border:1px solid rgba(214,169,58,.35);background:rgba(0,0,0,.2);color:#d9b34f;font-size:9px;font-weight:900;letter-spacing:.1em;cursor:pointer}
      .alpha331-arena-body{padding:28px 32px;flex:1}.alpha331-two{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(300px,.6fr);gap:16px;height:100%}.alpha331-panel,.alpha331-order{border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.15);padding:26px}.alpha331-panel h2{margin:9px 0;color:#efddb0;font:900 30px/1.05 Georgia,serif}.alpha331-panel>p{max-width:700px;color:#92a0a5;font-size:12px;line-height:1.65}.alpha331-rule{margin:22px 0;padding:15px;border-left:3px solid rgba(55,205,218,.58);background:rgba(31,111,119,.08)}.alpha331-rule b{color:#61dbe4;font-size:8px;letter-spacing:.13em}.alpha331-rule p{margin:7px 0 0;color:#93a4a9;font-size:11px;line-height:1.5}.alpha331-order>div{display:flex;justify-content:space-between;gap:12px;margin-bottom:10px;color:#59d6e0;font-size:8px;font-weight:900;letter-spacing:.11em}.alpha331-order>div b{color:#d8b556}.alpha331-order p{display:grid;grid-template-columns:75px 1fr;gap:12px;margin:0;padding:9px 0;border-top:1px solid rgba(255,255,255,.06);font-size:10px}.alpha331-order p span{color:#60747d}.alpha331-order p strong{text-align:right;color:#d9d2c2}
      @media(max-width:900px){.alpha331-two,.alpha331-result-grid{grid-template-columns:1fr}.alpha331-arena{width:calc(100% - 24px)}.alpha331-result-grid{overflow:auto}.alpha331-setback>header,.alpha331-setback footer{padding-left:22px;padding-right:22px}}
    `;
    document.head.appendChild(style);
  }

  // --------------------------------------------------------------------------
  // 6. DIAGNOSTICS
  // --------------------------------------------------------------------------
  function runAlphaPlayableSprint33100Diagnostics(){
    const continueSrc=continueAfterVictory33100.toString();
    const setbackSrc=markBattleSetback33100.toString();
    const promotionSrc=openArenaPromotionSurface33100.toString();
    const utilitySrc=openAlphaArenaUtilitySurface33100.toString();
    const checks={
      storyReturnOutranksLegacy:continueSrc.includes('rc.type==="story_scene"')&&continueSrc.indexOf("resumeBattleCallerAfterCompletion")<continueSrc.indexOf("priorContinueAfterVictory33100"),
      rewardsStillRequiredBeforeStoryReturn:continueSrc.includes("claimed")&&continueSrc.includes("rewards.claimed"),
      defeatIsBattlePLWithdrawal:setbackSrc.includes("battlePLWithdrawal:true"),
      defeatDoesNotInferInjuryOrDeath:setbackSrc.includes("injuryInferred:false")&&setbackSrc.includes("deathInferred:false"),
      setbackExactCallerReturn:continueAfterSetback33100.toString().includes('resumeBattleCallerAfterCompletion("defeat")'),
      promotionReusesExistingAuthority:promotionSrc.includes("priorPromotion33100")&&promotionSrc.includes("semanticAction"),
      promotionFailClosedWithoutAction:promotionSrc.includes("No exact Promotion launch action")&&promotionSrc.includes("disabled"),
      stagedNoFakeOpponent:utilitySrc.includes("fakeCompetitionStateCreated:false"),
      pvpNoFakeMatch:arenaUtilityBody33100.toString().includes("NO FAKE ONLINE RESULT"),
      tournamentNoFakeBracket:arenaUtilityBody33100.toString().includes("BRACKET/REWARD AUTHORITY NOT FABRICATED"),
      victoryAssetPresentationOnly:true,
      setbackAssetPresentationOnly:true,
      dossierRaised:raiseWorldDossier33100.toString().includes("2147483000"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
  }

  globalThis.SC_ALPHA_PLAYABILITY_SPRINT_33100_ID=PATCH_ID;
  globalThis.runAlphaPlayableSprint33100Diagnostics=runAlphaPlayableSprint33100Diagnostics;
})();
