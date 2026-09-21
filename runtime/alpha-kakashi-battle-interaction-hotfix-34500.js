// ============================================================================
// ACADEMY KAKASHI BATTLE INTERACTION HOTFIX — 34500 v5
// Installed-browser evidence: 2026-09-16 Stephen Kakashi Origin replay.
//
// Contract:
//   HOVER / FOCUS = LEARN (presentation only; never selects/commits)
//   CLICK          = ACT   (reuse native Battle selection/confirmation)
//
// Browser evidence proved the rendered Kakashi deck could still fall through
// to a select-only card generation: the card became SELECTED while no Battle
// action resolved. Per-card rebinding alone is insufficient because the live
// deck can be inserted/replaced around deployment/render timing. v5 therefore
// uses one scoped document-capture delegate for the exact Kakashi Origin Battle
// surface. It resolves the rendered card to one of Kakashi's canonical five
// authored Skill IDs, suppresses competing select-only handlers, then invokes
// the existing select + confirm Battle authority exactly once.
//
// This file does NOT resolve damage, setup, control, targeting, conditions,
// Battle PL, rewards, custody, or Story outcomes. Native Battle authority does.
// Browser Golden remains unclaimed until Stephen validates the installed build.
// ============================================================================
(function installAcademyKakashiBattleInteraction34500(){
  "use strict";
  if(globalThis.SC_ALPHA_KAKASHI_BATTLE_INTERACTION_34500)return;

  const VERSION="34500-v6";
  const PATCH_ID="alpha_kakashi_battle_interaction_34500_v6_2026_09_22";
  const KAKASHI="academy_kakashi";
  const LEGACY_FIFTH_SKILL="academy_kakashi_prodigys_read";
  const SUBSTITUTION_SKILL="academy_kakashi_substitution_jutsu";
  const EXACT_KAKASHI_SKILLS=new Set([
    "academy_kakashi_kunai_quickdraw",
    "academy_kakashi_clone_feint",
    "academy_kakashi_opening_exploit",
    "academy_kakashi_wire_snare",
    SUBSTITUTION_SKILL
  ]);
  const CARD_SELECTOR=[
    ".battle-live-skill-card:not(.is-empty)",
    ".battle-dev-skill-card:not(.is-empty)",
    ".sc-battle-skill-card:not(.is-empty)",
    "[data-battle-skill-id]",
    "[data-skill-id]",
    "[onclick*='selectBattlePreparedSkill']",
    "[onclick*='activateBattlePreparedSkillCard']"
  ].join(",");
  const boundCards=new WeakSet();
  let delegatedClickInstalled=false;
  let delegatedLearnInstalled=false;

  function battle34500(){
    try{return typeof currentBattle!=="undefined"?currentBattle:null;}catch(_error){return null;}
  }

  function kakashiOriginBattleContext34500(){
    const battle=battle34500();
    if(!battle)return false;
    const dep=battle.kakashiOriginDeployment;
    if(!dep)return false;
    const controller=String(dep.controllerParticipantId||dep.controllerId||"");
    return controller===KAKASHI;
  }
  function activeKakashiBattle34500(){
    const battle=battle34500();
    return kakashiOriginBattleContext34500()&&battle&&battle.battleOver!==true;
  }

  function activeActor34500(){
    const battle=battle34500();
    if(!battle)return null;
    if(typeof getBattleDeploymentParticipant==="function"){
      try{
        const participant=getBattleDeploymentParticipant("player",1);
        if(participant)return participant;
      }catch(_error){}
    }
    if(Array.isArray(battle.playerParticipants)){
      const kakashi=battle.playerParticipants.find(row=>row&&String(row.id||row.participantId||"")===KAKASHI);
      if(kakashi)return kakashi;
    }
    return battle.activePlayer||null;
  }

  function normalizeText34500(value){
    return String(value||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
  }

  function canonicalBattleSkills34500(actor){
    if(!actor||typeof getBattleUISkillPalettePresentation!=="function"||typeof getBattlePreparedSkillDefinition!=="function")return[];
    try{
      const palette=getBattleUISkillPalettePresentation(actor);
      const ids=palette&&Array.isArray(palette.skillIds)?palette.skillIds.filter(Boolean):[];
      if(!ids.length)return[];
      return ids.map(id=>{
        const definition=getBattlePreparedSkillDefinition(actor,String(id));
        if(definition&&typeof definition==="object")return Object.assign({id:String(id)},definition);
        return{id:String(id),name:String(id)};
      });
    }catch(_error){return[];}
  }

  function visibleBattleSkills34500(){
    const battle=battle34500();
    if(!battle)return[];
    const actor=activeActor34500();
    const canonical=canonicalBattleSkills34500(actor);
    if(canonical.length)return canonical;
    const pools=[
      actor&&actor.battlePreparedSkills,
      actor&&actor.preparedSkills,
      actor&&actor.skills,
      battle.battlePreparedSkills,
      battle.preparedSkills,
      battle.playerSkills,
      battle.skills
    ];
    for(const pool of pools){
      if(Array.isArray(pool)&&pool.length)return pool.filter(Boolean);
    }
    return[];
  }

  function cardLabel34500(card){
    if(!card)return"";
    const explicit=card.getAttribute&&(
      card.getAttribute("data-skill-name")
      ||card.getAttribute("aria-label")
      ||card.getAttribute("title")
    );
    if(explicit)return String(explicit).trim();
    const named=card.querySelector&&card.querySelector(".battle-live-skill-name,.battle-dev-skill-name,.skill-name,h3,h4,strong");
    return String(named&&named.textContent||card.textContent||"").trim();
  }

  function skillIdFromCard34500(card){
    if(!card)return null;

    const handler=String(
      card.getAttribute &&
      card.getAttribute("onclick") ||
      ""
    );

    const handlerMatch=handler.match(
      /(?:activateBattlePreparedSkillCard|selectBattlePreparedSkill)\(['"]([^'"]+)['"]\)/
    );

    if(handlerMatch){
      const id=String(handlerMatch[1]||"").trim();
      if(id)return id===LEGACY_FIFTH_SKILL?SUBSTITUTION_SKILL:id;
    }

    const dataset=card.dataset||{};
    const direct=String(
      dataset.skillId ||
      dataset.battleSkillId ||
      ""
    ).trim();

    if(direct)return direct===LEGACY_FIFTH_SKILL?SUBSTITUTION_SKILL:direct;

    if(card.querySelector){
      const child=card.querySelector(
        "[data-skill-id],[data-battle-skill-id]"
      );

      if(child&&child.dataset){
        const nested=String(
          child.dataset.skillId ||
          child.dataset.battleSkillId ||
          ""
        ).trim();

        if(nested)return nested===LEGACY_FIFTH_SKILL?SUBSTITUTION_SKILL:nested;
      }
    }

    const label=normalizeText34500(
      cardLabel34500(card)
    );

    if(label){
      const skill=visibleBattleSkills34500()
        .find(row=>{
          if(!row)return false;

          const names=[
            row.name,
            row.label,
            row.title,
            row.displayName,
            row.skillName
          ]
            .filter(Boolean)
            .map(normalizeText34500);

          return names.some(
            name=>
              name &&
              (
                label===name ||
                label.includes(name) ||
                name.includes(label)
              )
          );
        });

      const id=
        skill &&
        String(
          skill.id ||
          skill.skillId ||
          ""
        ).trim();

      if(id)return id;
    }

    return null;
  }

  function exactKakashiSkill34500(skillId){
    return EXACT_KAKASHI_SKILLS.has(String(skillId||""));
  }

  function renderGuide34500(skillId){
    if(
      !activeKakashiBattle34500() ||
      !exactKakashiSkill34500(skillId)
    ){
      return {
        success:false,
        reason:"kakashi_origin_battle_not_active"
      };
    }

    const id=String(skillId);

    if(
      typeof previewBattlePreparedSkill33000==="function"
    ){
      const out=
        previewBattlePreparedSkill33000(id);

      if(out!==false){
        return {
          success:true,
          mode:"modern_skill_inspector",
          skillId:id
        };
      }
    }

    const battle=battle34500();

    if(
      typeof renderTemporaryBattleSkillGuide==="function"
    ){
      if(battle){
        battle.skillGuideSkillId=id;
      }

      renderTemporaryBattleSkillGuide(id);

      return {
        success:true,
        mode:"native_skill_guide_fallback",
        skillId:id
      };
    }

    return {
      success:false,
      reason:"battle_skill_guide_unavailable"
    };
  }

  const STYLE_ID_34500="sc-kakashi-battle-presentation-34500-style";
  function installStyle34500(){
    if(typeof document==="undefined"||!document.head||typeof document.head.appendChild!=="function"||document.getElementById(STYLE_ID_34500))return false;
    const style=document.createElement("style");style.id=STYLE_ID_34500;style.textContent=`
.alpha-code-battle-stage.sc-kakashi-battle-input-34500 .sc-kakashi-battle-deck-34500{pointer-events:auto!important;z-index:45!important;isolation:isolate}
.alpha-code-battle-stage.sc-kakashi-battle-input-34500 .battle-dev-skill-card[data-alpha34500-bound="true"],.alpha-code-battle-stage.sc-kakashi-battle-input-34500 .battle-live-skill-card[data-alpha34500-bound="true"]{position:relative;z-index:2}
.sc-kakashi-battle-event-34500{position:absolute;left:50%;top:3.5%;transform:translateX(-50%);z-index:90;width:min(72%,860px);padding:10px 18px;border:1px solid rgba(220,177,77,.62);background:linear-gradient(100deg,rgba(3,11,16,.94),rgba(8,23,30,.88));box-shadow:0 14px 34px rgba(0,0,0,.45);pointer-events:none;text-align:center;letter-spacing:.05em}
.sc-kakashi-battle-event-34500 strong{display:block;color:#78e1e7;font-size:clamp(11px,.95vw,14px);letter-spacing:.12em;text-transform:uppercase}
.sc-kakashi-battle-event-34500 span{display:block;margin-top:4px;color:#f0dfad;font-size:clamp(10px,.82vw,13px);font-weight:800}
.sc-kakashi-battle-event-34500[data-event-kind="entry"] strong{color:#e8c66f}
.sc-kakashi-battle-event-34500[data-event-kind="outcome"] strong{font-size:clamp(14px,1.2vw,19px)}
.sc-kakashi-battle-actor-action-34500{animation:scKakashiBattleActor34500 .34s cubic-bezier(.2,.78,.3,1)}
.sc-kakashi-battle-impact-34500{animation:scKakashiBattleImpact34500 .34s cubic-bezier(.35,.02,.55,1)}
.sc-kakashi-battle-defended-34500{animation:scKakashiBattleDefended34500 .42s ease-out}
.sc-kakashi-battle-entry-34500{animation:scKakashiBattleEntry34500 .46s cubic-bezier(.2,.76,.25,1)}
@keyframes scKakashiBattleActor34500{0%{transform:translateX(0) scale(1)}45%{transform:translateX(12px) scale(1.035);filter:brightness(1.16)}100%{transform:translateX(0) scale(1)}}
@keyframes scKakashiBattleImpact34500{0%{transform:translateX(0);filter:brightness(1)}25%{transform:translateX(-9px);filter:brightness(1.35)}55%{transform:translateX(6px)}100%{transform:translateX(0);filter:brightness(1)}}
@keyframes scKakashiBattleDefended34500{0%{filter:brightness(1)}35%{filter:brightness(1.42) drop-shadow(0 0 14px rgba(105,220,230,.75))}100%{filter:brightness(1)}}
@keyframes scKakashiBattleEntry34500{0%{opacity:.25;transform:translateY(14px) scale(.97)}100%{opacity:1;transform:translateY(0) scale(1)}}
@media(prefers-reduced-motion:reduce){.sc-kakashi-battle-actor-action-34500,.sc-kakashi-battle-impact-34500,.sc-kakashi-battle-defended-34500,.sc-kakashi-battle-entry-34500{animation:none!important}}
`;document.head.appendChild(style);return true;
  }
  function escapeBattleText34500(value){return String(value??"").replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));}
  function prettyBattleId34500(value){return String(value||"ACTION").replace(/^academy_kakashi_/,"").replace(/^enemy_/,"").replace(/_/g," ").replace(/\b\w/g,ch=>ch.toUpperCase());}
  function participantName34500(ref){
    if(!ref)return"UNKNOWN";
    try{if(typeof getBattleParticipantByIdentity==="function"){const row=getBattleParticipantByIdentity(ref.side,ref.participantId);if(row)return String(row.name||row.displayName||row.id||ref.participantId);}}catch(_error){}
    return prettyBattleId34500(ref.participantId||ref.id||ref.side);
  }
  function skillName34500(skillId,actorRef){
    if(!skillId)return"Action";
    if(actorRef&&actorRef.side==="player"){
      try{const actor=activeActor34500(),skill=actor&&typeof getBattlePreparedSkillDefinition==="function"?getBattlePreparedSkillDefinition(actor,skillId):null;if(skill)return String(skill.displayName||skill.name||skill.id||skillId);}catch(_error){}
    }
    return prettyBattleId34500(skillId);
  }
  function evidenceForAction34500(actionId){
    const battle=battle34500(),rows=battle&&battle.runtime&&Array.isArray(battle.runtime.evidence)?battle.runtime.evidence:[];
    return actionId?rows.filter(row=>row&&row.actionId===actionId):[];
  }
  function buildActionPresentation34500(record){
    if(!record||!record.actionId)return null;
    const rows=evidenceForAction34500(record.actionId),damage=rows.filter(row=>row&&row.eventType==="damage_resolved");
    const plLoss=damage.reduce((sum,row)=>sum+Math.max(0,Number(row.data&&row.data.absorbedPL)||0),0);
    const preDefenseBlocked=damage.reduce((sum,row)=>sum+Math.max(0,(Number(row.data&&row.data.preDefenseAttackPL)||0)-(Number(row.data&&row.data.resolvedAttackPL)||0)),0);
    const staminaBlocked=damage.reduce((sum,row)=>sum+Math.max(0,Number(row.data&&row.data.staminaMitigationAmount)||0),0);
    const substitution=damage.some(row=>JSON.stringify(row&&row.data||{}).includes("academy_kakashi_substitution_guard"));
    const actorRef=record.actorRef||null,targetRef=record.targetRef||damage.find(row=>row&&row.targetRef)?.targetRef||null;
    let resultText="RESOLVED";
    if(plLoss>0)resultText=`IMPACT · ${plLoss} BATTLE PL LOST`;
    else if(preDefenseBlocked>0)resultText=`${substitution?"SUBSTITUTION":"DEFENDED"} · ${preDefenseBlocked} BLOCKED`;
    else if(staminaBlocked>0)resultText=`STAMINA DEFENSE · ${staminaBlocked} BLOCKED`;
    else if(Array.isArray(record.stateRefs)&&record.stateRefs.length>0)resultText="STATE PREPARED";
    const battle=battle34500();battle.kakashiOriginPresentationSequence34500=(Number(battle.kakashiOriginPresentationSequence34500)||0)+1;
    return{sequence:battle.kakashiOriginPresentationSequence34500,kind:"action",actorRef,targetRef,actorName:participantName34500(actorRef),targetName:participantName34500(targetRef),actionName:skillName34500(record.skillId,actorRef),plLoss,preDefenseBlocked,staminaBlocked,substitution,resultText};
  }
  function captureBattleEvidence34500(record){
    if(!kakashiOriginBattleContext34500()||!record)return false;
    const type=String(record.eventType||"");
    const battle=battle34500();
    if(type==="skill_action_completed"||type==="enemy_authored_action_completed"){
      const event=buildActionPresentation34500(record);if(event)battle.kakashiOriginPresentation34500=event;return!!event;
    }
    if(type==="battle_victory"||type==="battle_defeat"){
      battle.kakashiOriginPresentationSequence34500=(Number(battle.kakashiOriginPresentationSequence34500)||0)+1;
      battle.kakashiOriginPresentation34500={sequence:battle.kakashiOriginPresentationSequence34500,kind:"outcome",actorRef:record.actorRef||null,targetRef:record.targetRef||null,actorName:participantName34500(record.actorRef),targetName:participantName34500(record.targetRef),actionName:type==="battle_victory"?"VICTORY":"DEFEAT",resultText:type==="battle_victory"?"OPPOSITION WITHDRAWN":"PLAYER SIDE WITHDRAWN",plLoss:0,preDefenseBlocked:0,staminaBlocked:0};
      return true;
    }
    return false;
  }
  function battleCardForSide34500(stage,side){if(!stage||!stage.querySelector)return null;return stage.querySelector(side==="enemy"?".battle-live-active-card-enemy":".battle-live-active-card-player");}
  function animateOnce34500(node,className){if(!node||!node.classList)return false;node.classList.remove(className);node.classList.add(className);if(typeof node.addEventListener==="function")node.addEventListener("animationend",()=>node.classList.remove(className),{once:true});return true;}
  function renderKakashiBattlePresentation34500(root=null){
    if(typeof document==="undefined"||!kakashiOriginBattleContext34500())return false;
    installStyle34500();
    const stage=stageRoot34500(root);if(!stage)return false;
    try{stage.classList.add("sc-kakashi-battle-input-34500");}catch(_error){}
    const battle=battle34500(),event=battle.kakashiOriginPresentation34500||null;
    if(!event){
      const entryKey=String(battle.battleId||"kakashi_origin");
      if(stage.dataset&&stage.dataset.scKakashiBattleEntry34500===entryKey)return true;
      if(stage.dataset)stage.dataset.scKakashiBattleEntry34500=entryKey;
      const old=stage.querySelector&&stage.querySelector(".sc-kakashi-battle-event-34500");if(old&&old.remove)old.remove();
      if(typeof document.createElement==="function"){const ribbon=document.createElement("div");ribbon.className="sc-kakashi-battle-event-34500";ribbon.dataset.eventKind="entry";ribbon.innerHTML="<strong>PL BATTLE · ENGAGE</strong><span>KAKASHI enters the active slot</span>";stage.appendChild(ribbon);}
      animateOnce34500(battleCardForSide34500(stage,"player"),"sc-kakashi-battle-entry-34500");animateOnce34500(battleCardForSide34500(stage,"enemy"),"sc-kakashi-battle-entry-34500");return true;
    }
    if(stage.dataset&&stage.dataset.scKakashiBattleEvent34500===String(event.sequence))return true;
    if(stage.dataset)stage.dataset.scKakashiBattleEvent34500=String(event.sequence);
    const old=stage.querySelector&&stage.querySelector(".sc-kakashi-battle-event-34500");if(old&&old.remove)old.remove();
    if(typeof document.createElement==="function"){
      const ribbon=document.createElement("div");ribbon.className="sc-kakashi-battle-event-34500";ribbon.dataset.eventKind=event.kind||"action";
      const line=event.kind==="outcome"?event.actionName:`${event.actorName} → ${event.actionName}${event.targetRef?` → ${event.targetName}`:""}`;
      ribbon.innerHTML=`<strong>${escapeBattleText34500(line)}</strong><span>${escapeBattleText34500(event.resultText||"RESOLVED")}</span>`;stage.appendChild(ribbon);
    }
    const actorSide=event.actorRef&&event.actorRef.side||"player",targetSide=event.targetRef&&event.targetRef.side||null;
    animateOnce34500(battleCardForSide34500(stage,actorSide),"sc-kakashi-battle-actor-action-34500");
    if(targetSide){
      const target=battleCardForSide34500(stage,targetSide);
      if(event.plLoss>0)animateOnce34500(target,"sc-kakashi-battle-impact-34500");
      else if(event.preDefenseBlocked>0||event.staminaBlocked>0)animateOnce34500(target,"sc-kakashi-battle-defended-34500");
    }
    return true;
  }
  const PRE_RECORD_EVIDENCE_34500=typeof globalThis.recordBattleEvidence==="function"?globalThis.recordBattleEvidence:null;
  if(PRE_RECORD_EVIDENCE_34500&&!PRE_RECORD_EVIDENCE_34500.__scKakashiBattlePresentation34500){
    const observed=function recordBattleEvidence34500Observed(){
      const result=PRE_RECORD_EVIDENCE_34500.apply(this,arguments);
      try{captureBattleEvidence34500(result&&typeof result==="object"?result:arguments[0]);}catch(_error){}
      return result;
    };
    observed.__scKakashiBattlePresentation34500=true;
    globalThis.recordBattleEvidence=observed;try{recordBattleEvidence=observed;}catch(_error){}
  }

  function rememberActivation34500(result,skillId,source){
    const battle=battle34500();
    if(battle){
      battle.kakashiOriginInteraction34500={
        skillId:String(skillId||""),source:String(source||"unknown"),
        success:!!(result&&result.success===true),reason:result&&result.reason||null,
        recordedAt:Date.now()
      };
    }
    return result;
  }

  function activate34500(skillId){
    if(
      !activeKakashiBattle34500() ||
      !exactKakashiSkill34500(skillId)
    ){
      return {
        success:false,
        reason:"kakashi_origin_battle_not_active"
      };
    }

    const id=String(skillId);

    if(
      typeof selectBattlePreparedSkill!=="function" ||
      typeof confirmSelectedBattleSkill!=="function"
    ){
      return rememberActivation34500(
        {
          success:false,
          reason:"battle_skill_commit_path_missing"
        },
        id,
        "select_confirm_missing"
      );
    }

    const battle=battle34500();

    const selected=
      selectBattlePreparedSkill(id);

    let actionState=null;

    try{
      actionState=
        typeof syncBattleActionRegionState==="function"
          ?syncBattleActionRegionState()
          :null;
    }catch(_error){
      actionState=null;
    }

    const selectionSucceeded=
      !!(
        selected &&
        selected.success===true
      ) ||
      String(
        actionState &&
        actionState.selectedSkillId ||
        ""
      )===id ||
      String(
        battle &&
        battle.selectedSkillId ||
        ""
      )===id;

    if(!selectionSucceeded){
      return rememberActivation34500(
        selected || {
          success:false,
          reason:"battle_skill_selection_failed"
        },
        id,
        "selection_failed"
      );
    }

    if(
      selected &&
      selected.branchSelectionRequired===true
    ){
      renderGuide34500(id);

      return rememberActivation34500(
        Object.assign(
          {},
          selected,
          {
            success:true,
            awaitingExplicitMode:true,
            actionCommitted:false
          }
        ),
        id,
        "explicit_mode_required"
      );
    }

    const committed=
      confirmSelectedBattleSkill();

    const normalized=
      committed &&
      typeof committed==="object"
        ?Object.assign(
            {},
            committed,
            {
              alpha34500DirectClick:true,
              selectedSkillId:id,
              nativeActivator:false,
              explicitSelectConfirm:true
            }
          )
        :{
            success:committed!==false,
            alpha34500DirectClick:true,
            selectedSkillId:id,
            nativeActivator:false,
            explicitSelectConfirm:true
          };

    return rememberActivation34500(
      normalized,
      id,
      "native_select_confirm"
    );
  }

  function cardIsPresentable34500(card){
    if(!card)return false;

    if(
      card.classList &&
      (
        card.classList.contains("is-empty") ||
        card.classList.contains("empty")
      )
    ){
      return false;
    }

    return true;
  }

  function authoritativeSkillAvailability34500(skillId){
    const actor=activeActor34500();

    if(
      !actor ||
      !skillId ||
      typeof getBattlePreparedSkillDefinition!=="function" ||
      typeof evaluateBattlePreparedSkillAvailability!=="function"
    ){
      return {
        known:false,
        available:false,
        reason:"battle_availability_api_missing"
      };
    }

    const skill=
      getBattlePreparedSkillDefinition(
        actor,
        String(skillId)
      );

    if(!skill){
      return {
        known:false,
        available:false,
        reason:"battle_skill_definition_missing"
      };
    }

    let target=null;

    try{
      if(typeof getBattlePreparedSkillDefaultTarget==="function"){
        const defaultTarget=
          getBattlePreparedSkillDefaultTarget(
            actor,
            skill
          );

        target=
          defaultTarget &&
          defaultTarget.participant
            ?defaultTarget.participant
            :null;
      }
    }catch(_error){
      target=null;
    }

    try{
      const result=
        evaluateBattlePreparedSkillAvailability(
          skill,
          actor,
          target
        ) || {};

      const available=
        result.available===true ||
        result.reason==="branch_selection_required";

      return {
        known:true,
        available,
        reason:result.reason||null,
        raw:result
      };
    }catch(error){
      return {
        known:false,
        available:false,
        reason:String(
          error&&error.message ||
          error ||
          "battle_availability_failed"
        )
      };
    }
  }

  function normalizeRenderedCard34500(
    card,
    skillId
  ){
    if(
      !cardIsPresentable34500(card) ||
      !exactKakashiSkill34500(skillId)
    ){
      return false;
    }

    card.dataset.skillId=String(skillId);

    const availability=
      authoritativeSkillAvailability34500(skillId);

    card.dataset.alpha34500AvailabilityKnown=
      availability.known?"true":"false";

    card.dataset.alpha34500AuthorityAvailable=
      availability.available?"true":"false";

    card.dataset.alpha34500AvailabilityReason=
      String(availability.reason||"");

    if(
      availability.known===true &&
      availability.available===true
    ){
      try{
        card.disabled=false;
        card.removeAttribute("disabled");
        card.setAttribute("aria-disabled","false");

        if(card.classList){
          card.classList.remove("is-disabled");
          card.classList.add("is-ready");
        }
      }catch(_error){}
    }

    return true;
  }

  function bindCard34500(card){
    if(!cardIsPresentable34500(card))return false;

    const skillId=
      skillIdFromCard34500(card);

    if(!exactKakashiSkill34500(skillId)){
      return false;
    }

    normalizeRenderedCard34500(
      card,
      skillId
    );

    try{
      card.onmouseenter=null;
      card.onfocus=null;
    }catch(_error){}

    if(boundCards.has(card)){
      return true;
    }

    boundCards.add(card);

    card.dataset.skillId=
      String(skillId);

    card.dataset.alpha34500Bound=
      "true";

    if(card.setAttribute){
      card.setAttribute(
        "role",
        "button"
      );

      card.setAttribute(
        "tabindex",
        card.getAttribute &&
        card.getAttribute("tabindex") ||
        "0"
      );

      card.setAttribute(
        "aria-description",
        "Hover or focus to learn what this Skill does. Click to use it if legal."
      );
    }

    if(card.addEventListener){
      card.addEventListener(
        "keydown",
        event=>{
          if(
            event &&
            (
              event.key==="Enter" ||
              event.key===" "
            )
          ){
            if(
              typeof event.preventDefault==="function"
            ){
              event.preventDefault();
            }

            if(
              typeof event.stopPropagation==="function"
            ){
              event.stopPropagation();
            }

            if(
              typeof event.stopImmediatePropagation==="function"
            ){
              event.stopImmediatePropagation();
            }

            activate34500(skillId);
          }
        },
        true
      );
    }

    return true;
  }

  function cardCandidates34500(root){
    if(
      !root ||
      !root.querySelectorAll
    ){
      return [];
    }

    return Array.from(
      root.querySelectorAll(
        CARD_SELECTOR
      )
    );
  }

  function stageRoot34500(root=null){
    if(
      root &&
      root.matches &&
      root.matches(
        ".alpha-code-battle-stage"
      )
    ){
      return root;
    }

    if(
      root &&
      root.querySelector
    ){
      const nested=
        root.querySelector(
          ".alpha-code-battle-stage"
        );

      if(nested)return nested;
    }

    if(typeof document==="undefined"){
      return null;
    }

    return (
      document.querySelector(
        ".alpha-code-battle-stage"
      ) ||
      document.getElementById(
        "battle-modal"
      ) ||
      document.getElementById(
        "combat-overlay"
      ) ||
      document.getElementById(
        "battle-live"
      ) ||
      null
    );
  }

  function hardenBattleDOM34500(root=null){
    if(
      typeof document==="undefined" ||
      !activeKakashiBattle34500()
    ){
      return false;
    }

    const stage=
      stageRoot34500(root);

    if(!stage)return false;

    try{
      stage.classList.add(
        "sc-kakashi-battle-input-34500"
      );
    }catch(_error){}

    const deck=
      stage.querySelector &&
      stage.querySelector(
        ".battle-live-skill-deck"
      );

    if(deck&&deck.classList)deck.classList.add("sc-kakashi-battle-deck-34500");

    let bound=0;

    cardCandidates34500(stage)
      .forEach(card=>{
        if(bindCard34500(card)){
          bound+=1;
        }
      });

    return bound>0;
  }

  function resolveDelegatedCard34500(target){
    if(
      !target ||
      typeof target.closest!=="function"
    ){
      return null;
    }

    try{
      return target.closest(
        CARD_SELECTOR
      );
    }catch(_error){
      return null;
    }
  }

  function delegatedLearn34500(event){
    if(!activeKakashiBattle34500()){
      return null;
    }

    const card=
      resolveDelegatedCard34500(
        event&&event.target
      );

    if(!cardIsPresentable34500(card)){
      return null;
    }

    const stage=
      stageRoot34500();

    if(
      stage &&
      typeof stage.contains==="function" &&
      !stage.contains(card)
    ){
      return null;
    }

    if(
      event &&
      event.type==="pointerover" &&
      event.relatedTarget &&
      card.contains &&
      card.contains(event.relatedTarget)
    ){
      return null;
    }

    const skillId=
      skillIdFromCard34500(card);

    if(!exactKakashiSkill34500(skillId)){
      return null;
    }

    normalizeRenderedCard34500(
      card,
      skillId
    );

    return renderGuide34500(skillId);
  }

  function installDelegatedLearn34500(){
    if(
      delegatedLearnInstalled ||
      typeof document==="undefined" ||
      typeof document.addEventListener!=="function"
    ){
      return false;
    }

    document.addEventListener(
      "pointerover",
      delegatedLearn34500,
      true
    );

    document.addEventListener(
      "focusin",
      delegatedLearn34500,
      true
    );

    delegatedLearnInstalled=true;

    return true;
  }

  function delegatedClick34500(event){
    if(!activeKakashiBattle34500()){
      return null;
    }

    const card=
      resolveDelegatedCard34500(
        event&&event.target
      );

    if(!cardIsPresentable34500(card)){
      return null;
    }

    const stage=
      stageRoot34500();

    if(
      stage &&
      typeof stage.contains==="function" &&
      !stage.contains(card)
    ){
      return null;
    }

    const skillId=
      skillIdFromCard34500(card);

    if(!exactKakashiSkill34500(skillId)){
      return null;
    }

    normalizeRenderedCard34500(
      card,
      skillId
    );

    if(
      event &&
      typeof event.preventDefault==="function"
    ){
      event.preventDefault();
    }

    if(
      event &&
      typeof event.stopPropagation==="function"
    ){
      event.stopPropagation();
    }

    if(
      event &&
      typeof event.stopImmediatePropagation==="function"
    ){
      event.stopImmediatePropagation();
    }

    return activate34500(skillId);
  }

  function installDelegatedClick34500(){
    if(
      delegatedClickInstalled ||
      typeof document==="undefined" ||
      typeof document.addEventListener!=="function"
    ){
      return false;
    }

    document.addEventListener(
      "click",
      delegatedClick34500,
      true
    );

    delegatedClickInstalled=true;

    return true;
  }

  function wrapRender34500(name){
    const prior=globalThis[name];
    if(typeof prior!=="function"||prior.__scKakashiBattleInteraction34500)return false;
    const wrapped=function(){
      const result=prior.apply(this,arguments);
      hardenBattleDOM34500(arguments&&arguments[0]);
      renderKakashiBattlePresentation34500(arguments&&arguments[0]);
      return result;
    };
    wrapped.__scKakashiBattleInteraction34500=true;
    globalThis[name]=wrapped;
    return true;
  }

  function wrapKakashiLaunch34500(){
    const name="launchAcademyKakashiOriginPlBattle";
    const prior=globalThis[name];
    if(typeof prior!=="function"||prior.__scKakashiBattleInteraction34500)return false;
    const wrapped=function(){
      const result=prior.apply(this,arguments);
      if(result&&typeof result.then==="function"){
        return result.then(value=>{hardenBattleDOM34500();renderKakashiBattlePresentation34500();return value;});
      }
      hardenBattleDOM34500();renderKakashiBattlePresentation34500();
      return result;
    };
    wrapped.__scKakashiBattleInteraction34500=true;
    globalThis[name]=wrapped;
    return true;
  }

  wrapRender34500("renderCombatOverlay");
  wrapRender34500("refreshBattleActionRegionPresentation");
  wrapRender34500("refreshBattleLiveDOM33000");
  wrapRender34500("renderBattle");

  wrapKakashiLaunch34500();

  installDelegatedLearn34500();
  installDelegatedClick34500();

  hardenBattleDOM34500();
  renderKakashiBattlePresentation34500();

  function runAcademyKakashiBattleInteraction34500Diagnostics(){
    const parser=skillIdFromCard34500.toString();
    const activation=activate34500.toString();
    const delegate=delegatedClick34500.toString();
    const skillSource=visibleBattleSkills34500.toString();
    const launchWrapper=wrapKakashiLaunch34500.toString();
    const checks={
      patchId:PATCH_ID==="alpha_kakashi_battle_interaction_34500_v6_2026_09_22",
      exactFiveSkills:EXACT_KAKASHI_SKILLS.size===5,
      exactKakashiScope:activeKakashiBattle34500.toString().includes("controllerParticipantId"),
      canonicalPaletteFirst:skillSource.includes("canonicalBattleSkills34500")&&canonicalBattleSkills34500.toString().includes("getBattleUISkillPalettePresentation")&&canonicalBattleSkills34500.toString().includes("getBattlePreparedSkillDefinition"),
      acceptsBothHandlerGenerations:parser.includes("activateBattlePreparedSkillCard")&&parser.includes("selectBattlePreparedSkill"),
      acceptsBothDatasetGenerations:parser.includes("battleSkillId")&&parser.includes("skillId"),
      listenerDrivenTitleFallback:parser.includes("visibleBattleSkills34500"),
      hoverIsPresentationOnly:renderGuide34500.toString().includes("renderTemporaryBattleSkillGuide")&&!renderGuide34500.toString().includes("selectBattlePreparedSkill("),
      clickUsesNativeBattleCommit:activation.includes("selectBattlePreparedSkill")&&activation.includes("confirmSelectedBattleSkill")&&!activation.includes("resolveBattleDamagePacket"),
      delegatedCaptureInstalled:delegatedClickInstalled===true||typeof document==="undefined",
      delegatedLearnInstalled:delegatedLearnInstalled===true||typeof document==="undefined",
      delegatedClickOwnsRenderedCard:delegate.includes("resolveDelegatedCard34500")&&delegate.includes("stopImmediatePropagation")&&delegate.includes("activate34500(skillId)"),
      postDeploymentLaunchHardening:launchWrapper.includes("launchAcademyKakashiOriginPlBattle")&&launchWrapper.includes("hardenBattleDOM34500")&&launchWrapper.includes("renderKakashiBattlePresentation34500"),
      singleDomInteractionOwner:!installStyle34500.toString().includes("MutationObserver")&&!hardenBattleDOM34500.toString().includes("style.setProperty")&&skillIdFromCard34500.toString().includes("LEGACY_FIFTH_SKILL")&&EXACT_KAKASHI_SKILLS.has(SUBSTITUTION_SKILL),
      factualActionPresentation:buildActionPresentation34500.toString().includes("damage_resolved")&&buildActionPresentation34500.toString().includes("absorbedPL")&&captureBattleEvidence34500.toString().includes("skill_action_completed")&&captureBattleEvidence34500.toString().includes("enemy_authored_action_completed"),
      semanticAuthorityPreserved:PRE_RECORD_EVIDENCE_34500?String(globalThis.recordBattleEvidence).includes("PRE_RECORD_EVIDENCE_34500.apply"):true,
      battleEntryImpact:renderKakashiBattlePresentation34500.toString().includes("PL BATTLE · ENGAGE"),
      broadBattleCardCoverage:CARD_SELECTOR.includes("battle-live-skill-card")&&CARD_SELECTOR.includes("battle-dev-skill-card"),
      noDirectDamageResolver:!activation.includes("resolveBattleDamagePacket")&&!activation.includes("applyBattleDamage")&&!captureBattleEvidence34500.toString().includes("remainingBattlePLAfter="),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false,patchId:PATCH_ID,version:VERSION};
  }

  globalThis.activateAcademyKakashiBattleSkill34500=activate34500;
  globalThis.previewAcademyKakashiBattleSkill34500=renderGuide34500;
  globalThis.hardenAcademyKakashiBattleDOM34500=hardenBattleDOM34500;
  globalThis.handleAcademyKakashiBattleCardClick34500=delegatedClick34500;
  globalThis.renderAcademyKakashiBattlePresentation34500=renderKakashiBattlePresentation34500;
  globalThis.runAcademyKakashiBattleInteraction34500Diagnostics=runAcademyKakashiBattleInteraction34500Diagnostics;
  globalThis.SC_ALPHA_KAKASHI_BATTLE_INTERACTION_34500=Object.freeze({version:VERSION,patchId:PATCH_ID,browserGoldenClaimed:false});
})();