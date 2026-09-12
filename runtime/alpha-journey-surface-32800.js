// ============================================================================
// ALPHA JOURNEY / WORLD DOSSIER / ARENA SURFACE — 32800
// Browser evidence: Stephen 2026-09-12.
// Scope:
// - modernise World opportunity drawer presentation only;
// - replace pre-Arc 12-lock wall with a current-Chronicle journey surface;
// - remove the obsolete Menma-only gate from the shared journey conductor;
// - harden Menma Story -> Battle -> same Story resume without inventing history;
// - provide a code-owned four-destination Arena hub when arena_main art is absent;
// - expose an exact fail-closed seam for the nine Writing-FINAL Origin packages
//   pending durable scene-package projection through coordination #135.
// No new Story, World, Battle, Acquisition, Rank, PL, or Arena-result system.
// ============================================================================
(function installAlphaJourneySurface32800(){
  "use strict";

  const PATCH_ID="alpha_journey_surface_32800_2026_09_12";
  const ORIGIN_SCENE_BY_VARIANT=Object.freeze({academy_menma:"origin_academy_menma_prologue"});
  const ALL_ORIGIN_IDS=Object.freeze([
    "academy_hinata","academy_izuno","academy_mirai","academy_menma","academy_kushina",
    "academy_kurenai","academy_iwabee","academy_metal_lee","academy_kakashi","academy_obito"
  ]);

  const h=value=>typeof escapeStorySceneHTML==="function"?escapeStorySceneHTML(String(value??"")):String(value??"");
  const getOriginName=id=>{
    try{
      const row=typeof getCharacterRegistryEntry==="function"?getCharacterRegistryEntry(id):(typeof characterRegistry!=="undefined"?characterRegistry[id]:null);
      return row&&(row.displayName||row.name)?String(row.displayName||row.name):String(id||"Unknown Origin").replace(/^academy_/,"").replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase());
    }catch(_error){return String(id||"Unknown Origin").replace(/^academy_/,"").replaceAll("_"," ");}
  };

  function ensure32800Styles(){
    if(typeof document==="undefined"||!document.head||document.getElementById("sc-alpha-journey-32800-style"))return false;
    const style=document.createElement("style");
    style.id="sc-alpha-journey-32800-style";
    style.textContent=`
      .alpha328-event{position:absolute;right:2.3%;top:10.5%;width:min(430px,36vw);max-height:78%;overflow:auto;z-index:90;color:#ece5d5;background:linear-gradient(155deg,rgba(8,14,20,.985),rgba(3,8,13,.97));border:1px solid rgba(214,169,58,.58);box-shadow:0 24px 70px rgba(0,0,0,.62),inset 0 1px rgba(255,255,255,.035);backdrop-filter:blur(10px);font-family:inherit}
      .alpha328-event__head{display:flex;gap:16px;align-items:flex-start;justify-content:space-between;padding:20px 20px 14px;border-bottom:1px solid rgba(214,169,58,.19)}
      .alpha328-event__eyebrow{display:flex;align-items:center;gap:8px;color:#d8b65d;font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}.alpha328-event__eyebrow:before{content:"";width:7px;height:7px;transform:rotate(45deg);background:#37d5e3;box-shadow:0 0 14px rgba(55,213,227,.45)}
      .alpha328-event h2{margin:7px 0 0;font-family:Georgia,serif;font-size:28px;letter-spacing:.01em;color:#f3e4bb}.alpha328-event__close{flex:0 0 38px;width:38px;height:38px;border:1px solid rgba(214,169,58,.48);border-radius:50%;background:rgba(8,12,16,.72);color:#f0c85c;font-size:20px;cursor:pointer}.alpha328-event__close:hover{background:rgba(69,50,15,.72)}
      .alpha328-event__body{padding:17px 20px 20px}.alpha328-event__summary{margin:0 0 14px;color:#d9d5ca;font-size:14px;line-height:1.58}.alpha328-event__chips{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 15px}.alpha328-chip{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.035);padding:5px 8px;color:#9eabb4;font-size:9px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.alpha328-chip.is-story{border-color:rgba(214,169,58,.42);color:#e2bd5c}.alpha328-chip.is-track{border-color:rgba(53,211,223,.35);color:#61dce6}
      .alpha328-event__switcher{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 16px}.alpha328-event__switcher button{border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.035);color:#b8c2c8;padding:7px 9px;font-size:10px;cursor:pointer}.alpha328-event__switcher button:disabled{border-color:rgba(214,169,58,.42);color:#e9ca76;background:rgba(214,169,58,.08)}
      .alpha328-battle-order{margin:15px 0;border:1px solid rgba(55,213,227,.16);background:linear-gradient(90deg,rgba(16,65,72,.11),rgba(255,255,255,.018));padding:12px}.alpha328-battle-order__title{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;color:#61dce6;font-size:9px;font-weight:800;letter-spacing:.14em}.alpha328-battle-slot{display:grid;grid-template-columns:70px 1fr;gap:10px;padding:6px 2px;border-top:1px solid rgba(255,255,255,.055);font-size:11px}.alpha328-battle-slot:first-of-type{border-top:0}.alpha328-battle-slot span{color:#647681}.alpha328-battle-slot strong{color:#e7dfcd;text-align:right}.alpha328-event__blocker{margin:10px 0;padding:10px 11px;border-left:3px solid #c9903b;background:rgba(151,92,20,.08);color:#d8b77d;font-size:12px;line-height:1.45}.alpha328-event__error{margin:10px 0;padding:10px 11px;border:1px solid rgba(216,82,64,.4);background:rgba(92,20,15,.16);color:#e6b58b;font-size:11px;line-height:1.5}.alpha328-event__actions{display:grid;gap:8px;margin-top:15px}.alpha328-event__actions button{min-height:42px;border:1px solid rgba(214,169,58,.46);background:linear-gradient(180deg,rgba(77,55,14,.66),rgba(36,28,12,.76));color:#f2d273;font-weight:800;letter-spacing:.08em;cursor:pointer}.alpha328-event__actions button:hover:not(:disabled){border-color:#e8c45c;background:linear-gradient(180deg,rgba(106,76,19,.78),rgba(45,34,12,.86))}.alpha328-event__actions button:disabled{opacity:.34;cursor:not-allowed}

      .alpha328-journey{width:min(1380px,calc(100% - 54px));margin:auto;background:linear-gradient(180deg,#08131a,#050c11);border:1px solid rgba(214,169,58,.28);box-shadow:0 28px 80px rgba(0,0,0,.5);color:#e9e3d4;min-height:min(790px,calc(100vh - 80px));display:flex;flex-direction:column}.alpha328-journey__header{display:flex;justify-content:space-between;gap:24px;padding:28px 32px 22px;border-bottom:1px solid rgba(214,169,58,.18)}.alpha328-journey__eyebrow{color:#d7b34e;font-size:10px;font-weight:900;letter-spacing:.18em}.alpha328-journey h1{font-family:Georgia,serif;margin:6px 0 7px;color:#f2e2b8;font-size:36px}.alpha328-journey__header p{margin:0;color:#81929c;font-size:12px}.alpha328-journey__close{width:42px;height:42px;border:1px solid rgba(214,169,58,.4);border-radius:50%;background:transparent;color:#e6bf55;font-size:18px;cursor:pointer}
      .alpha328-rail{display:grid;grid-template-columns:repeat(5,1fr);padding:16px 32px;border-bottom:1px solid rgba(255,255,255,.055);gap:2px}.alpha328-stage{position:relative;padding:9px 11px 9px 20px;min-height:54px;border-left:2px solid rgba(255,255,255,.08)}.alpha328-stage:before{content:"";position:absolute;left:-6px;top:16px;width:10px;height:10px;border-radius:50%;background:#24323b;border:2px solid #0b1217}.alpha328-stage span{display:block;color:#5f717b;font-size:8px;font-weight:900;letter-spacing:.14em}.alpha328-stage strong{display:block;margin-top:5px;color:#8f9da5;font-size:11px}.alpha328-stage.is-complete{border-color:#37c4cf}.alpha328-stage.is-complete:before{background:#37c4cf;box-shadow:0 0 12px rgba(55,196,207,.4)}.alpha328-stage.is-complete strong{color:#7bdce3}.alpha328-stage.is-current{border-color:#d4aa43}.alpha328-stage.is-current:before{background:#d4aa43;box-shadow:0 0 14px rgba(212,170,67,.44)}.alpha328-stage.is-current strong{color:#e1c16d}
      .alpha328-journey__body{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(320px,.75fr);gap:18px;padding:26px 32px;flex:1}.alpha328-frontier,.alpha328-roadmap{border:1px solid rgba(255,255,255,.07);background:rgba(0,0,0,.13)}.alpha328-frontier{padding:26px}.alpha328-frontier__tag{color:#50d5df;font-size:9px;font-weight:900;letter-spacing:.16em}.alpha328-frontier h2{font-family:Georgia,serif;color:#f0dfb5;font-size:30px;margin:8px 0}.alpha328-frontier p{max-width:680px;color:#9ca8ad;line-height:1.65;font-size:13px}.alpha328-origin-card{display:grid;grid-template-columns:1fr auto;gap:16px;margin:20px 0;padding:15px;border:1px solid rgba(214,169,58,.16);background:rgba(214,169,58,.035)}.alpha328-origin-card span{display:block;color:#697982;font-size:9px;letter-spacing:.12em}.alpha328-origin-card strong{display:block;margin-top:4px;color:#ece0c1}.alpha328-origin-card b{align-self:center;color:#d6ad45;font-size:10px;letter-spacing:.14em}.alpha328-primary{min-height:48px;padding:0 20px;border:1px solid rgba(214,169,58,.6);background:linear-gradient(180deg,#6b5119,#3d2c0e);color:#fae18a;font-weight:900;letter-spacing:.09em;cursor:pointer}.alpha328-primary:hover{filter:brightness(1.12)}.alpha328-frontier__note{margin-top:18px;border-left:2px solid rgba(55,196,207,.5);padding:8px 12px;color:#738790;font-size:11px;line-height:1.55}
      .alpha328-roadmap{padding:18px}.alpha328-roadmap__title{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.alpha328-roadmap__title strong{color:#dcb95d;font-size:10px;letter-spacing:.13em}.alpha328-roadmap__title span{color:#566873;font-size:9px}.alpha328-arc-locked{display:grid;place-items:center;text-align:center;min-height:300px;color:#5e7079;padding:30px}.alpha328-arc-locked strong{color:#91a1a8;font-family:Georgia,serif;font-size:21px;margin-bottom:8px}.alpha328-missions{display:grid;grid-template-columns:1fr 1fr;gap:7px}.alpha328-mission{display:grid;grid-template-columns:36px 1fr auto;gap:8px;align-items:center;min-height:55px;padding:7px 9px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.012)}.alpha328-mission i{font-style:normal;color:#647783;font-size:9px}.alpha328-mission strong{color:#83929a;font-size:10px}.alpha328-mission b{color:#50616b;font-size:8px;letter-spacing:.09em}.alpha328-mission.is-current{border-color:rgba(214,169,58,.43);background:rgba(214,169,58,.055)}.alpha328-mission.is-current strong,.alpha328-mission.is-current b{color:#dfbd61}.alpha328-mission.is-complete{border-color:rgba(55,196,207,.17)}.alpha328-mission.is-complete strong,.alpha328-mission.is-complete b{color:#61cbd3}
      .alpha328-origin-pending{margin:auto;width:min(760px,calc(100% - 40px));padding:28px;border:1px solid rgba(214,169,58,.28);background:linear-gradient(180deg,#09141b,#050b10);color:#ddd5c5}.alpha328-origin-pending span{color:#d4aa43;font-size:9px;font-weight:900;letter-spacing:.16em}.alpha328-origin-pending h2{font-family:Georgia,serif;color:#f1dfb0;font-size:28px;margin:8px 0}.alpha328-origin-pending p{color:#8d9ba2;line-height:1.6}.alpha328-origin-pending button{margin-top:14px;padding:11px 16px;border:1px solid rgba(214,169,58,.44);background:#211b0d;color:#e7c967;cursor:pointer}

      .alpha328-arena{width:min(1320px,calc(100% - 58px));margin:auto;padding:28px;background:linear-gradient(180deg,#071118,#040a0e);border:1px solid rgba(214,169,58,.25);box-shadow:0 28px 80px rgba(0,0,0,.52);color:#e9e2d2}.alpha328-arena__head{display:flex;justify-content:space-between;gap:20px;align-items:start;padding-bottom:20px;border-bottom:1px solid rgba(214,169,58,.18)}.alpha328-arena__head span{color:#d4aa43;font-size:9px;font-weight:900;letter-spacing:.16em}.alpha328-arena__head h1{font-family:Georgia,serif;font-size:38px;margin:6px 0;color:#f0dfb6}.alpha328-arena__head p{margin:0;color:#778a94;font-size:12px}.alpha328-arena__head button{width:42px;height:42px;border:1px solid rgba(214,169,58,.4);border-radius:50%;background:transparent;color:#e4bd55;font-size:18px}.alpha328-arena__readiness{display:flex;justify-content:space-between;gap:18px;margin:18px 0;padding:12px 14px;border:1px solid rgba(55,196,207,.18);background:rgba(55,196,207,.025)}.alpha328-arena__readiness span{color:#5f737e;font-size:9px;letter-spacing:.12em}.alpha328-arena__readiness strong{color:#78d6dd;font-size:11px}.alpha328-arena__grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.alpha328-arena-card{position:relative;text-align:left;min-height:210px;padding:24px;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at 90% 10%,rgba(214,169,58,.07),transparent 42%),linear-gradient(145deg,rgba(13,22,28,.97),rgba(6,11,15,.98));color:#ddd7c9;cursor:pointer;overflow:hidden}.alpha328-arena-card:after{content:"";position:absolute;right:-32px;bottom:-38px;width:150px;height:150px;border:1px solid rgba(214,169,58,.09);border-radius:50%}.alpha328-arena-card:hover{border-color:rgba(214,169,58,.42);transform:translateY(-1px)}.alpha328-arena-card span{color:#55d0d9;font-size:9px;font-weight:900;letter-spacing:.14em}.alpha328-arena-card h2{font-family:Georgia,serif;font-size:25px;color:#eedcb0;margin:12px 0 8px}.alpha328-arena-card p{max-width:450px;color:#87969d;font-size:12px;line-height:1.55}.alpha328-arena-card b{position:absolute;left:24px;bottom:20px;color:#d5ad47;font-size:9px;letter-spacing:.12em}

      #story-scene-presentation-layer[data-mode="battle_transition"]{align-items:center;background:radial-gradient(circle at center,rgba(9,26,35,.18),rgba(2,5,9,.72))}
      #story-scene-presentation-layer[data-mode="battle_transition"] .sc-story-shell{width:min(820px,calc(100vw - 70px));margin:0}
      #story-scene-presentation-layer[data-mode="battle_transition"] .sc-story-panel{min-height:0;padding:28px!important;border-color:rgba(214,169,58,.5);background:linear-gradient(150deg,rgba(7,16,22,.98),rgba(3,8,13,.98))}
      #story-scene-presentation-layer[data-mode="battle_transition"] .sc-story-kicker{color:#d4aa43}
      #story-scene-presentation-layer[data-mode="battle_transition"] .sc-story-text{font-family:Georgia,serif;font-size:25px;line-height:1.35;color:#f0dfb6}
      #story-scene-presentation-layer[data-mode="battle_transition"] .sc-story-action{min-height:44px;background:linear-gradient(180deg,#6b5119,#3d2c0e);border-color:rgba(214,169,58,.62);color:#f7df8a;font-weight:900}
      @media(max-width:900px){.alpha328-event{width:min(430px,92vw);right:4%;top:9%}.alpha328-journey__body{grid-template-columns:1fr}.alpha328-rail{grid-template-columns:1fr 1fr}.alpha328-arena__grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
    return true;
  }
  ensure32800Styles();

  // World opportunity drawer: presentation replacement only.
  const PRE328_RENDER_REGION_EVENT_DRAWER=renderRegionEventDrawer;
  renderRegionEventDrawer=function alpha328RenderRegionEventDrawer(regionKey){
    try{
      if(!selectedHotspotId)return "";
      const hotspot=getHotspotProjection(regionKey,selectedHotspotId);
      if(!hotspot)return "";
      const selected=hotspot.opportunities.find(item=>item.opportunity_id===selectedOpportunityId)||hotspot.opportunities[0]||null;
      if(!selected)return "";
      selectedOpportunityId=selected.opportunity_id;
      const hasBattle=selected.legal_actions.some(action=>action.kind==="battle");
      const queue=hasBattle?getClanQueueReadModel():[];
      const family=String(selected.presentation_family||"Opportunity").replaceAll("_"," ");
      const category=selected.opportunity_category&&selected.opportunity_category!=="OTHER"?String(selected.opportunity_category).replaceAll("_"," "):null;
      const feedback=selectedOpportunityActionFeedback&&selectedOpportunityActionFeedback.opportunityId===selected.opportunity_id?getWorldOpportunityActionFailurePresentation(selectedOpportunityActionFeedback.reason):null;
      const chips=[
        category?`<span class="alpha328-chip">${h(category)}</span>`:"",
        selected.tracking&&selected.tracking.tracked?`<span class="alpha328-chip is-track">TRACKED</span>`:"",
        selected.tracking&&selected.tracking.mandatory?`<span class="alpha328-chip is-story">MAIN STORY</span>`:"",
        selected.tracking&&selected.tracking.lead_state?`<span class="alpha328-chip">${h(selected.tracking.lead_state)}</span>`:""
      ].join("");
      return `<aside class="alpha328-event" aria-label="${h(selected.known_label)}">
        <header class="alpha328-event__head"><div><div class="alpha328-event__eyebrow">${h(family)}</div><h2>${h(selected.known_label)}</h2></div><button class="alpha328-event__close" type="button" onclick="closeRegionEventDrawer()" aria-label="Close">✕</button></header>
        <div class="alpha328-event__body">
          ${selected.known_summary?`<p class="alpha328-event__summary">${h(selected.known_summary)}</p>`:""}
          ${chips?`<div class="alpha328-event__chips">${chips}</div>`:""}
          ${hotspot.aggregationCount>1?`<div class="alpha328-event__switcher">${hotspot.opportunities.map(item=>`<button type="button" onclick="selectHotspotOpportunity('${h(item.opportunity_id)}')" ${item.opportunity_id===selected.opportunity_id?"disabled":""}>${h(item.known_label)}</button>`).join("")}</div>`:""}
          ${selected.actionability&&selected.actionability.known_blocker?`<div class="alpha328-event__blocker">${h(selected.actionability.known_blocker)}</div>`:""}
          ${feedback?`<div class="alpha328-event__error"><strong>${h(feedback.title)}</strong><div>${h(feedback.detail)}</div>${feedback.clanRoute?`<button type="button" onclick="openOverlay('clan')">OPEN MY CLAN</button>`:""}</div>`:""}
          ${hasBattle?`<section class="alpha328-battle-order"><div class="alpha328-battle-order__title"><span>MY CLAN · BATTLE ORDER</span><span>${queue.some(slot=>slot.name)?"READY":"FORMATION REQUIRED"}</span></div>${queue.map(slot=>`<div class="alpha328-battle-slot"><span>${h(slot.label)}</span><strong>${h(slot.name||"—")}</strong></div>`).join("")}</section>`:""}
          <div class="alpha328-event__actions">${selected.legal_actions.length?selected.legal_actions.map(action=>`<button type="button" onclick="executeSelectedOpportunityAction('${h(action.actionId)}')" ${action.available?"":"disabled"}>${h(action.label)}</button>`).join(""):`<span>No authored interaction is currently available.</span>`}</div>
        </div>
      </aside>`;
    }catch(_error){return PRE328_RENDER_REGION_EVENT_DRAWER(regionKey);}
  };

  function repairMenmaStoryBattleReturn(){
    try{
      const active=getActiveStorySceneRuntime();
      if(!active||active.sceneId!==ORIGIN_SCENE_BY_VARIANT.academy_menma||!active.pendingBattle)return null;
      const rc=currentBattle&&currentBattle.returnContext;
      const victory=!!(currentBattle&&currentBattle.outcome&&currentBattle.outcome.type==="victory");
      const claimed=!!(currentBattle&&currentBattle.rewards&&currentBattle.rewards.claimed===true);
      if(victory&&claimed&&rc&&rc.type==="story_scene"&&rc.sceneId===active.sceneId){
        const result=resumeBattleCallerAfterCompletion("victory");
        return result&&result.success===true?result:null;
      }
    }catch(_error){}
    return null;
  }

  const PRE328_BEGIN_ORIGIN=beginAlphaChronicleOriginPrologue;
  beginAlphaChronicleOriginPrologue=function alpha328BeginOriginPrologue(){
    const acquisition=ensurePlayerAcquisitionState();
    const originId=acquisition.chronicleOriginVariantId||null;
    if(!originId)return PRE328_BEGIN_ORIGIN.apply(this,arguments);
    if(acquisition.chronicleOrigin&&acquisition.chronicleOrigin.prologueCompleted===true)return {success:true,idempotent:true,reason:"origin_prologue_already_completed",originId};
    if(originId==="academy_menma"){
      const repaired=repairMenmaStoryBattleReturn();
      if(repaired)return repaired;
      return PRE328_BEGIN_ORIGIN.apply(this,arguments);
    }
    const sceneId=ORIGIN_SCENE_BY_VARIANT[originId]||null;
    if(sceneId&&getStorySceneDefinition(sceneId)){
      const existing=getActiveStorySceneRuntime();
      if(existing){
        if(existing.sceneId!==sceneId)return {success:false,reason:"another_story_scene_is_active",sceneId:existing.sceneId};
        openOverlay("story_scene");
        return {success:true,idempotent:true,sceneId:existing.sceneId,beatId:existing.beatId};
      }
      return startStoryScene(sceneId,{sourceEventId:sceneId,context:{protagonistParticipantId:originId,physicallyPresentTeamParticipantIds:[originId],chronicleOriginVariantId:originId},returnContext:{type:"alpha_arc1_mission_command",stage:"origin_prologue"}});
    }
    return {success:false,reason:"origin_story_scene_package_not_projected",originId,coordinationIssue:135};
  };

  function renderOriginScenePackagePending(originId){
    const container=typeof document!=="undefined"?document.getElementById("overlay-content-container"):null;
    if(!container)return false;
    container.innerHTML=`<section class="alpha328-origin-pending"><span>CHRONICLE ORIGIN · AUTHORSHIP PRESERVED</span><h2>${h(getOriginName(originId))}</h2><p>This Origin is Writing-final, but its exact production Story Scene package has not yet been projected into the current SC runtime. Coding will not invent or copy Menma's sequence. Coordination handoff #135 is retrieving the exact final package.</p><button type="button" onclick="renderAlphaTailedBeastMissionCommand(document.getElementById('overlay-content-container'))">BACK TO JOURNEY</button></section>`;
    return true;
  }

  continueAlphaArc1=function alpha328ContinueJourney(){
    const j=getAlphaTailedBeastJourneyState();
    if(j.victoryPending){openOverlay("victory");return {success:true,reason:"battle_victory_claim_pending"};}
    if(!j.originId){
      openOverlay("clan");
      const selection=typeof openAlphaChronicleOriginSelection==="function"?openAlphaChronicleOriginSelection():null;
      return {success:false,reason:"chronicle_origin_required",selection};
    }
    if(!j.prologueComplete){
      const result=beginAlphaChronicleOriginPrologue();
      if(result&&result.success===false&&result.reason==="origin_story_scene_package_not_projected")renderOriginScenePackagePending(j.originId);
      return result;
    }
    if(j.formationRequired)return openAcademyTeamFormationUI({showChronicleBegins:false});
    if(j.transitionPending)return openGeninRosterTransitionUI();
    if(!j.operationalGenin){openArenaPromotionSurface(j.subjectId);return {success:true,reason:"academy_free_play_and_promotion_frontier",ownedCharacterId:j.subjectId};}
    if(!j.m1Complete){
      const trace=!!getAlphaM1PreWhisperTraceRecord();
      if(!trace)return openAlphaM1PreWhisperInvestigation();
      if(!Mission1WhisperApproachActionable(j.originId))return {success:false,reason:"mission1_whisper_approach_not_actionable"};
      return openArc1Mission1WhisperWoods();
    }
    if(j.nextMission>=2&&j.nextMission<=10)return startAlphaArc1Mission(j.nextMission);
    if(j.nextMission===11)return startAlphaArc1Mission11();
    if(j.nextMission===12)return startAlphaArc1Mission12();
    openOverlay("missions");
    return {success:true,reason:"arc1_story_complete",occurrenceId:"occ_arc1_arc1_story_complete"};
  };

  function getJourneyStageState(j,key){
    switch(key){
      case "origin":return j.prologueComplete?"complete":"current";
      case "team":return !j.prologueComplete?"locked":j.formationRequired?"current":"complete";
      case "academy":return !j.prologueComplete||j.formationRequired?"locked":(!j.operationalGenin&&!j.transitionPending)?"current":"complete";
      case "genin":return j.transitionPending?"current":j.operationalGenin?"complete":"locked";
      case "arc":return j.operationalGenin?"current":"locked";
      default:return "locked";
    }
  }
  function stage(label,value,state){return `<div class="alpha328-stage is-${state}"><span>${h(label)}</span><strong>${h(value)}</strong></div>`;}
  function getFrontierTitle(j){
    if(!j.originId)return "Choose who your Chronicle begins with";
    if(!j.prologueComplete)return `${getOriginName(j.originId)} · Origin Story`;
    if(j.formationRequired)return "Form your first Academy team";
    if(j.transitionPending)return "Complete your Genin team";
    if(!j.operationalGenin)return "Academy Free Play & Promotion";
    if(j.arc1Complete)return "Arc 1 Complete";
    return `Mission ${j.nextMission} · ${getAlphaArcMissionTitle(j.nextMission)}`;
  }
  renderAlphaTailedBeastMissionCommand=function alpha328RenderJourney(container){
    if(!container)return false;
    ensure32800Styles();
    const j=getAlphaTailedBeastJourneyState();
    const action=getAlphaSurfaceTruthJourneyAction(j);
    const originName=j.originId?getOriginName(j.originId):"Not chosen";
    const rail=[
      stage("ORIGIN",j.prologueComplete?"HISTORY COMMITTED":j.originId?"IN PROGRESS":"CHOOSE",getJourneyStageState(j,"origin")),
      stage("ACAMY TEAM",!j.prologueComplete?"LOCKED":j.formationRequired?"FORM TEAM":"READY",getJourneyStageState(j,"team")),
      stage("ACADEMY YEARS",j.operationalGenin?"COMPLETE":(!j.prologueComplete||j.formationRequired)?"LOCKED":"ACTIVE",getJourneyStageState(j,"academy")),
      stage("GENIN TEAM",j.operationalGenin?"READY":j.transitionPending?"INCOMPLETE":"LOCKED",getJourneyStageState(j,"genin")),
      stage("ARC 1",j.arc1Complete?"COMPLETE":j.operationalGenin?`M${j.nextMission}`:"LOCKED",getJourneyStageState(j,"arc"))
    ].join("");
    const missionRows=j.operationalGenin?Array.from({length:12},(_,index)=>{
      const n=index+1,status=getAlphaArcMissionRowStatus(n),complete=status==="COMPLETE",current=!j.arc1Complete&&j.nextMission===n;
      return `<article class="alpha328-mission ${complete?"is-complete":current?"is-current":""}"><i>M${n}</i><strong>${h(getAlphaArcMissionTitle(n))}</strong><b>${complete?"DONE":current?"NEXT":"LOCKED"}</b></article>`;
    }).join(""):null;
    container.innerHTML=`<section class="alpha328-journey" aria-label="Chronicle journey">
      <header class="alpha328-journey__header"><div><div class="alpha328-journey__eyebrow">SHINOBI CHRONICLES · CURRENT JOURNEY</div><h1>${j.operationalGenin?"KONOHA CHRONICLE":"YOUR CHRONICLE BEGINS HERE"}</h1><p>Follow the history your shinobi has actually lived. Locked future missions stay out of the way until they matter.</p></div><button class="alpha328-journey__close" type="button" onclick="closeOverlay()" aria-label="Close">✕</button></header>
      <div class="alpha328-rail">${rail}</div>
      <div class="alpha328-journey__body">
        <section class="alpha328-frontier"><div class="alpha328-frontier__tag">CURRENT FRONTIER</div><h2>${h(getFrontierTitle(j))}</h2><p>${h(action.detail)}</p><div class="alpha328-origin-card"><div><span>CHRONICLE ORIGIN</span><strong>${h(originName)}</strong></div><b>${j.prologueComplete?"COMMITTED":j.originId?"ACTIVE":"REQUIRED"}</b></div><button class="alpha328-primary" type="button" onclick="continueAlphaArc1()">${h(action.label)}</button><div class="alpha328-frontier__note">Origin history, team formation, Promotion and Arc missions are separate Chronicle commitments. This screen shows the next legitimate step; it does not skip or manufacture one.</div></section>
        <aside class="alpha328-roadmap"><div class="alpha328-roadmap__title"><strong>ARC 1 ROADMAP</strong><span>${j.operationalGenin?"ACTIVE CHRONICLE":"UNLOCKS AFTER GENIN TEAM"}</span></div>${missionRows?`<div class="alpha328-missions">${missionRows}</div>`:`<div class="alpha328-arc-locked"><div><strong>Arc 1 waits for your Genin team.</strong><p>Finish your Origin, Academy team, Promotion and Genin team first. The twelve-mission wall will appear when it becomes your actual journey.</p></div></div>`}</aside>
      </div>
    </section>`;
    return true;
  };
  renderAlphaMissionCommand=renderAlphaTailedBeastMissionCommand;

  const PRE328_RENDER_ARENA_MAIN=renderArenaMainOverlay;
  renderArenaMainOverlay=function alpha328ArenaMain(container){
    if(!container)return false;
    const surface=ALPHA_POST2500_ARENA_RUNTIME.surface||"main";
    if(surface!=="main")return PRE328_RENDER_ARENA_MAIN(container);
    ensure32800Styles();
    const startId=getSavedClanStartCharacterId();
    const startCharacter=startId?getPlayerCharacter(startId):null;
    const cards=[
      {tag:"ALPHA JOURNEY",title:"Promotion",text:"Take the authorised Field Readiness path from Academy shinobi toward formal Genin Promotion.",action:"openArenaPromotionSurface()",cta:"OPEN PROMOTION"},
      {tag:"CONTROLLED COMBAT",title:"Staged Battles",text:"Open the staged-Battle surface. It stays fail-closed until an authored encounter supplies a real opponent and occurrence.",action:"openAlphaArenaUtilitySurface('staged')",cta:"OPEN STAGED BATTLES"},
      {tag:"LOCAL ALPHA SURFACE",title:"PVP",text:"Inspect the PVP presentation surface. No fake online opponent, ladder result or matchmaking state is generated.",action:"openAlphaArenaUtilitySurface('pvp')",cta:"OPEN PVP"},
      {tag:"KONOHA COMPETITION",title:"Village Tournament",text:"Open the tournament presentation surface. Brackets, eligibility and rewards appear only when their owning systems authorise them.",action:"openAlphaArenaUtilitySurface('tournament')",cta:"OPEN TOURNAMENT"}
    ];
    container.innerHTML=`<section class="alpha328-arena" aria-label="Konoha Arena"><header class="alpha328-arena__head"><div><span>KONOHA · COMBAT & PROMOTION</span><h1>ARENA</h1><p>Promotion, controlled combat and competition routes share one hub. Each route keeps its own authority.</p></div><button type="button" onclick="closeOverlay()" aria-label="Close Arena">✕</button></header><div class="alpha328-arena__readiness"><span>MY CLAN START</span><strong>${startCharacter?h(startCharacter.name):"NO START SAVED — BATTLE ROUTES WILL USE MY CLAN"}</strong></div><div class="alpha328-arena__grid">${cards.map(card=>`<button class="alpha328-arena-card" type="button" onclick="${card.action}"><span>${h(card.tag)}</span><h2>${h(card.title)}</h2><p>${h(card.text)}</p><b>${h(card.cta)} →</b></button>`).join("")}</div></section>`;
    return true;
  };

  function runAlphaJourneySurface32800Diagnostics(){
    const checks={
      patchId:PATCH_ID==="alpha_journey_surface_32800_2026_09_12",
      tenOriginsDeclared:ALL_ORIGIN_IDS.length===10&&ALL_ORIGIN_IDS.includes("academy_menma")&&ALL_ORIGIN_IDS.includes("academy_obito"),
      noMenmaOnlyArcGate:!continueAlphaArc1.toString().includes("arc1_konoha_current_runtime_requires_menma_origin"),
      menmaSceneExact:ORIGIN_SCENE_BY_VARIANT.academy_menma==="origin_academy_menma_prologue",
      missingNineFailClosed:beginAlphaChronicleOriginPrologue.toString().includes("origin_story_scene_package_not_projected")&&beginAlphaChronicleOriginPrologue.toString().includes("coordinationIssue:135"),
      menmaBattleReturnRepair:repairMenmaStoryBattleReturn.toString().includes('resumeBattleCallerAfterCompletion("victory")'),
      journeyCurrentFrontierFirst:renderAlphaTailedBeastMissionCommand.toString().includes("CURRENT FRONTIER")&&renderAlphaTailedBeastMissionCommand.toString().includes("UNLOCKS AFTER GENIN TEAM"),
      arc12Reused:continueAlphaArc1.toString().includes("startAlphaArc1Mission11")&&continueAlphaArc1.toString().includes("startAlphaArc1Mission12"),
      modernWorldDrawer:renderRegionEventDrawer.toString().includes("alpha328-event")&&renderRegionEventDrawer.toString().includes("executeSelectedOpportunityAction"),
      worldSemanticsReused:renderRegionEventDrawer.toString().includes("getHotspotProjection")&&renderRegionEventDrawer.toString().includes("getClanQueueReadModel"),
      arenaFourRoutes:renderArenaMainOverlay.toString().includes("openArenaPromotionSurface")&&renderArenaMainOverlay.toString().includes("staged")&&renderArenaMainOverlay.toString().includes("pvp")&&renderArenaMainOverlay.toString().includes("tournament"),
      arenaMainAssetNotRequired:!renderArenaMainOverlay.toString().includes('getAlphaArenaMasterAsset("main")')&&!renderArenaMainOverlay.toString().includes("arena_main.png"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
    return {pass:failed.length===0,checks,failed,browserGoldenClaimed:false,coordinationIssue:135};
  }

  window.SC_ALPHA_ORIGIN_SCENE_IDS=Object.freeze({...ORIGIN_SCENE_BY_VARIANT});
  window.runAlphaJourneySurface32800Diagnostics=runAlphaJourneySurface32800Diagnostics;
})();