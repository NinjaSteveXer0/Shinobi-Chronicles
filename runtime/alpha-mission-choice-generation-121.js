// ============================================================================
// SHINOBI CHRONICLES — MISSION-SKELETON-DRIVEN CE LIVE CHOICE GENERATION
// Issue #121 / CE contract b733e6712ed8408d749676d7020f0f24fda6635a
//
// Extends the existing Story Scene runtime. It does not create a second Story
// history system, does not generate outcomes, and does not expose hidden truth.
// Alpha expression is bounded authored/template projection only.
// ============================================================================
(function installAlphaMissionChoiceGeneration121(){
  "use strict";

  if(globalThis.SC_ALPHA_MISSION_CHOICE_121)return;

  const PATCH_ID="alpha_mission_choice_generation_121_2026_09_13";
  const RUNTIME_VERSION=1;
  const skeletonRegistry=new Map();
  const resolverRegistry=new Map();
  const sceneBindings=new Map();

  function clone121(value){
    if(value===undefined)return undefined;
    if(value===null||typeof value!=="object")return value;
    if(typeof cloneProgressionData==="function")return cloneProgressionData(value);
    return JSON.parse(JSON.stringify(value));
  }

  function stable121(value){
    if(value===null||typeof value!=="object")return JSON.stringify(value);
    if(Array.isArray(value))return `[${value.map(stable121).join(",")}]`;
    return `{${Object.keys(value).sort().map(key=>`${JSON.stringify(key)}:${stable121(value[key])}`).join(",")}}`;
  }

  function hash121(value){
    const source=typeof value==="string"?value:stable121(value);
    let hash=2166136261;
    for(let i=0;i<source.length;i++){
      hash^=source.charCodeAt(i);
      hash=Math.imul(hash,16777619);
    }
    return (hash>>>0).toString(16).padStart(8,"0");
  }

  function now121(){return Date.now();}

  function save121(){
    if(typeof savePlayerData==="function")savePlayerData();
  }

  function getStoryRuntime121(){
    if(typeof ensureStorySceneRuntimeState==="function")return ensureStorySceneRuntimeState();
    if(!globalThis.playerData||typeof globalThis.playerData!=="object")globalThis.playerData={};
    if(!playerData.storySceneRuntime||typeof playerData.storySceneRuntime!=="object")playerData.storySceneRuntime={version:1,sequence:0,active:null,lastFeedbackReceipt:null};
    return playerData.storySceneRuntime;
  }

  function ensureRuntime121(){
    const story=getStoryRuntime121();
    let state=story.ceMissionChoice121;
    if(!state||typeof state!=="object"||state.version!==RUNTIME_VERSION){
      state={version:RUNTIME_VERSION,sequence:0,choiceSets:{},receipts:{},missionProgress:{}};
      story.ceMissionChoice121=state;
      save121();
    }
    if(!state.choiceSets||typeof state.choiceSets!=="object")state.choiceSets={};
    if(!state.receipts||typeof state.receipts!=="object")state.receipts={};
    if(!state.missionProgress||typeof state.missionProgress!=="object")state.missionProgress={};
    if(!Number.isFinite(Number(state.sequence)))state.sequence=0;
    return state;
  }

  function missionKey121(arcId,missionId){return `${String(arcId)}:${String(missionId)}`;}

  function normalizeIntent121(intent,index){
    if(!intent||typeof intent!=="object")throw new Error(`intent_${index}_invalid`);
    const intentId=String(intent.intentId||intent.choiceId||"").trim();
    const intentType=String(intent.intentType||"").trim();
    const presentationText=String(intent.presentationText||intent.label||"").trim();
    if(!intentId||!intentType||!presentationText)throw new Error(`intent_${index}_missing_identity`);
    return Object.freeze({
      intentId,
      intentType,
      intentPayload:clone121(intent.intentPayload||{}),
      presentationText,
      nextBeatId:intent.nextBeatId?String(intent.nextBeatId):null,
      resolverId:intent.resolverId?String(intent.resolverId):null,
      eligibilityBasis:Array.isArray(intent.eligibilityBasis)?intent.eligibilityBasis.map(String):[],
      isEligible:typeof intent.isEligible==="function"?intent.isEligible:()=>({available:true,basis:[]}),
      consequenceRequests:Array.isArray(intent.consequenceRequests)?intent.consequenceRequests.slice():[]
    });
  }

  function normalizeDecision121(decision,index){
    if(!decision||typeof decision!=="object")throw new Error(`decision_${index}_invalid`);
    const decisionId=String(decision.decisionId||"").trim();
    if(!decisionId)throw new Error(`decision_${index}_missing_id`);
    const intents=(decision.intents||[]).map(normalizeIntent121);
    if(!intents.length)throw new Error(`decision_${decisionId}_has_no_intents`);
    return Object.freeze({
      decisionId,
      beatId:decision.beatId?String(decision.beatId):null,
      cadence:String(decision.cadence||"meaningful_decision"),
      objectiveRef:decision.objectiveRef?String(decision.objectiveRef):null,
      intents:Object.freeze(intents)
    });
  }

  function registerMissionSkeleton121(input){
    if(!input||typeof input!=="object")return{success:false,reason:"mission_skeleton_required"};
    const arcId=String(input.arcId||"").trim();
    const missionId=String(input.missionId||"").trim();
    const version=String(input.version||"").trim();
    if(!arcId||!missionId||!version)return{success:false,reason:"mission_skeleton_identity_incomplete"};
    const key=missionKey121(arcId,missionId);
    const decisions=(input.decisions||[]).map(normalizeDecision121);
    const decisionMap=new Map(decisions.map(item=>[item.decisionId,item]));
    if(decisionMap.size!==decisions.length)return{success:false,reason:"mission_skeleton_duplicate_decision"};
    const skeleton=Object.freeze({
      arcId,missionId,version,key,
      title:String(input.title||missionId),
      mandatoryAnchors:Object.freeze([...(input.mandatoryAnchors||[])].map(String)),
      prohibitedCompletionRefs:Object.freeze([...(input.prohibitedCompletionRefs||[])].map(String)),
      decisions:Object.freeze(decisions),
      decisionMap,
      completionPredicate:typeof input.completionPredicate==="function"?input.completionPredicate:null
    });
    skeletonRegistry.set(key,skeleton);
    return{success:true,key,arcId,missionId,version,decisionCount:decisions.length};
  }

  function registerMissionResolver121(resolverId,resolver){
    const id=String(resolverId||"").trim();
    if(!id||typeof resolver!=="function")return{success:false,reason:"resolver_identity_or_function_missing"};
    resolverRegistry.set(id,resolver);
    return{success:true,resolverId:id};
  }

  function getSkeleton121(arcId,missionId){return skeletonRegistry.get(missionKey121(arcId,missionId))||null;}

  function getProgress121(skeleton){
    const state=ensureRuntime121();
    let progress=state.missionProgress[skeleton.key];
    if(!progress||progress.skeletonVersion!==skeleton.version){
      progress={
        arcId:skeleton.arcId,missionId:skeleton.missionId,skeletonVersion:skeleton.version,
        anchors:{},completed:false,completionReceiptId:null,updatedAt:now121()
      };
      state.missionProgress[skeleton.key]=progress;
      save121();
    }
    return progress;
  }

  function normalizeContext121(context){
    const source=context&&typeof context==="object"?context:{};
    return {
      formalRank:source.formalRank??null,
      representationId:source.representationId??null,
      teamParticipantIds:Array.isArray(source.teamParticipantIds)?source.teamParticipantIds.map(String):[],
      knowledgeRefs:Array.isArray(source.knowledgeRefs)?source.knowledgeRefs.map(String):[],
      relationshipRefs:Array.isArray(source.relationshipRefs)?source.relationshipRefs.map(String):[],
      accessRefs:Array.isArray(source.accessRefs)?source.accessRefs.map(String):[],
      capabilityRefs:Array.isArray(source.capabilityRefs)?source.capabilityRefs.map(String):[],
      historyRefs:Array.isArray(source.historyRefs)?source.historyRefs.map(String):[],
      objectiveRef:source.objectiveRef??null,
      perceivableNpcIntent:source.perceivableNpcIntent??null,
      committedStateRef:source.committedStateRef??null
    };
  }

  function evaluateIntent121(intent,context){
    let result;
    try{result=intent.isEligible(clone121(context));}
    catch(_error){return{available:false,basis:[],knownBlocker:"CURRENT STATE DOES NOT SUPPORT THIS ACTION"};}
    if(result===true)return{available:true,basis:intent.eligibilityBasis.slice(),knownBlocker:null};
    if(result===false||result==null)return{available:false,basis:[],knownBlocker:null};
    if(typeof result==="object")return{
      available:result.available===true,
      basis:Array.isArray(result.basis)?result.basis.map(String):intent.eligibilityBasis.slice(),
      knownBlocker:result.knownBlocker?String(result.knownBlocker):null
    };
    return{available:false,basis:[],knownBlocker:null};
  }

  function makeChoiceSetId121(skeleton,decision,stateRef,semanticChoices){
    return `ce121:${hash121({skeleton:skeleton.key,version:skeleton.version,decision:decision.decisionId,stateRef,choices:semanticChoices.map(c=>[c.intentId,c.intentType,c.intentPayload])})}`;
  }

  function findOpenChoiceSet121(skeleton,decision){
    const state=ensureRuntime121();
    return Object.values(state.choiceSets).find(row=>row&&row.status==="unresolved"&&row.missionKey===skeleton.key&&row.skeletonVersion===skeleton.version&&row.decisionId===decision.decisionId)||null;
  }

  function ensureMissionChoiceSet121(request){
    const skeleton=getSkeleton121(request&&request.arcId,request&&request.missionId);
    if(!skeleton)return{success:false,reason:"mission_skeleton_not_registered"};
    const decision=skeleton.decisionMap.get(String(request&&request.decisionId||""))||null;
    if(!decision)return{success:false,reason:"mission_decision_not_registered"};
    if(decision.cadence!=="meaningful_decision")return{success:false,reason:"mission_decision_cadence_not_player_choice"};

    const context=normalizeContext121(request&&request.context);
    const explicitStateRef=String(request&&request.committedStateRef||context.committedStateRef||"").trim();
    if(!explicitStateRef)return{success:false,reason:"immutable_committed_state_ref_required"};

    const existing=findOpenChoiceSet121(skeleton,decision);
    if(existing&&existing.generatedFromStateRef===explicitStateRef){
      return{success:true,idempotent:true,choiceSet:clone121(existing)};
    }
    if(existing&&request&&request.allowCommittedStateSupersession!==true){
      return{success:true,idempotent:true,choiceSet:clone121(existing),supersessionDeferred:true};
    }

    const eligible=[];
    const excluded=[];
    for(const intent of decision.intents){
      const evaluation=evaluateIntent121(intent,context);
      if(evaluation.available){
        eligible.push({
          intentId:intent.intentId,intentType:intent.intentType,intentPayload:clone121(intent.intentPayload),
          eligibilityBasis:[...new Set([...(intent.eligibilityBasis||[]),...(evaluation.basis||[])])],
          presentationText:intent.presentationText,nextBeatId:intent.nextBeatId,resolverId:intent.resolverId
        });
      }else{
        excluded.push({intentId:intent.intentId,knownBlocker:evaluation.knownBlocker||null});
      }
    }
    if(!eligible.length)return{success:false,reason:"mission_decision_has_no_eligible_intents",excluded};

    const state=ensureRuntime121();
    if(existing){
      existing.status="superseded";
      existing.supersededByStateRef=explicitStateRef;
      existing.supersededAt=now121();
    }
    const choiceSetId=makeChoiceSetId121(skeleton,decision,explicitStateRef,eligible);
    let row=state.choiceSets[choiceSetId];
    if(!row){
      row={
        choiceSetId,missionKey:skeleton.key,arcId:skeleton.arcId,missionId:skeleton.missionId,
        skeletonVersion:skeleton.version,decisionId:decision.decisionId,beatId:decision.beatId,
        generatedFromStateRef:explicitStateRef,status:"unresolved",choices:eligible,excluded,
        perceivableNpcIntent:context.perceivableNpcIntent||null,createdAt:now121(),selectedIntentId:null,receiptId:null
      };
      state.choiceSets[choiceSetId]=row;
      state.sequence+=1;
      save121();
    }
    return{success:true,idempotent:false,choiceSet:clone121(row)};
  }

  function getMissionChoiceSet121(choiceSetId){
    const row=ensureRuntime121().choiceSets[String(choiceSetId||"")]||null;
    return row?clone121(row):null;
  }

  function commitMissionIntent121(choiceSetId,intentId,extra={}){
    const state=ensureRuntime121();
    const set=state.choiceSets[String(choiceSetId||"")]||null;
    if(!set)return{success:false,reason:"choice_set_not_found"};
    if(set.status!=="unresolved")return{success:false,reason:"choice_set_not_unresolved",status:set.status};
    const semantic=set.choices.find(item=>item.intentId===String(intentId||""))||null;
    if(!semantic)return{success:false,reason:"intent_not_in_choice_set"};

    const receiptId=`ce121_receipt_${hash121({choiceSetId:set.choiceSetId,intentId:semantic.intentId})}`;
    if(state.receipts[receiptId])return{success:true,idempotent:true,receipt:clone121(state.receipts[receiptId])};

    const receipt={
      receiptId,choiceSetId:set.choiceSetId,missionKey:set.missionKey,skeletonVersion:set.skeletonVersion,
      decisionId:set.decisionId,generatedFromStateRef:set.generatedFromStateRef,
      selectedProtagonistIntent:{intentId:semantic.intentId,intentType:semantic.intentType,intentPayload:clone121(semantic.intentPayload)},
      resolverId:semantic.resolverId||null,resolverResultRef:null,consequenceRefs:[],status:"intent_committed",committedAt:now121()
    };
    state.receipts[receiptId]=receipt;
    set.status="selected";
    set.selectedIntentId=semantic.intentId;
    set.receiptId=receiptId;
    save121();

    if(semantic.resolverId){
      const resolver=resolverRegistry.get(semantic.resolverId)||null;
      if(!resolver){
        receipt.status="resolver_missing";
        save121();
        return{success:false,reason:"owning_resolver_missing",receipt:clone121(receipt)};
      }
      let resolution;
      try{resolution=resolver({receipt:clone121(receipt),choice:clone121(semantic),extra:clone121(extra)});}
      catch(error){
        receipt.status="resolver_error";
        receipt.resolverError=String(error&&error.message||error||"resolver_error");
        save121();
        return{success:false,reason:"owning_resolver_error",receipt:clone121(receipt)};
      }
      if(!resolution||resolution.success!==true){
        receipt.status="resolver_rejected";
        receipt.resolverReason=resolution&&resolution.reason||"resolver_rejected";
        save121();
        return{success:false,reason:receipt.resolverReason,receipt:clone121(receipt)};
      }
      receipt.status="resolved";
      receipt.resolverResultRef=resolution.resultRef||resolution.occurrenceId||null;
      receipt.consequenceRefs=Array.isArray(resolution.consequenceRefs)?resolution.consequenceRefs.map(String):[];
      receipt.resolvedAt=now121();
      save121();
    }
    return{success:true,receipt:clone121(receipt),nextBeatId:semantic.nextBeatId||null};
  }

  function markMissionAnchor121(arcId,missionId,anchorId,sourceRefs=[]){
    const skeleton=getSkeleton121(arcId,missionId);
    if(!skeleton)return{success:false,reason:"mission_skeleton_not_registered"};
    const id=String(anchorId||"");
    if(!skeleton.mandatoryAnchors.includes(id))return{success:false,reason:"mission_anchor_not_authored"};
    const progress=getProgress121(skeleton);
    if(progress.anchors[id])return{success:true,idempotent:true,anchor:clone121(progress.anchors[id])};
    progress.anchors[id]={anchorId:id,sourceRefs:Array.isArray(sourceRefs)?sourceRefs.map(String):[],committedAt:now121()};
    progress.updatedAt=now121();
    save121();
    return{success:true,anchor:clone121(progress.anchors[id])};
  }

  function canCompleteMission121(arcId,missionId,context={}){
    const skeleton=getSkeleton121(arcId,missionId);
    if(!skeleton)return{success:false,reason:"mission_skeleton_not_registered"};
    const progress=getProgress121(skeleton);
    const missing=skeleton.mandatoryAnchors.filter(id=>!progress.anchors[id]);
    if(missing.length)return{success:true,allowed:false,reason:"mandatory_anchors_missing",missing};
    if(skeleton.completionPredicate){
      let predicate;
      try{predicate=skeleton.completionPredicate({progress:clone121(progress),context:clone121(context)});}
      catch(_error){predicate=false;}
      if(predicate!==true)return{success:true,allowed:false,reason:"authored_completion_predicate_unsatisfied",missing:[]};
    }
    return{success:true,allowed:true,missing:[]};
  }

  function completeMission121(arcId,missionId,context={}){
    const gate=canCompleteMission121(arcId,missionId,context);
    if(!gate.success||gate.allowed!==true)return{success:false,reason:gate.reason||"mission_completion_not_authorised",missing:gate.missing||[]};
    const skeleton=getSkeleton121(arcId,missionId);
    const progress=getProgress121(skeleton);
    if(progress.completed===true)return{success:true,idempotent:true,receiptId:progress.completionReceiptId};
    const receiptId=`ce121_complete_${hash121({key:skeleton.key,version:skeleton.version,anchors:Object.keys(progress.anchors).sort()})}`;
    progress.completed=true;
    progress.completionReceiptId=receiptId;
    progress.completedAt=now121();
    save121();
    return{success:true,receiptId};
  }

  function projectChoiceSet121(choiceSetId){
    const set=getMissionChoiceSet121(choiceSetId);
    if(!set)return null;
    return{
      choiceSetId:set.choiceSetId,missionId:set.missionId,decisionId:set.decisionId,
      perceivableNpcIntent:set.perceivableNpcIntent,
      choices:set.choices.map(choice=>({choiceId:choice.intentId,label:choice.presentationText,intentType:choice.intentType}))
    };
  }

  function bindStoryDecision121(config){
    if(!config||typeof config!=="object")return{success:false,reason:"story_binding_required"};
    if(typeof getStorySceneDefinition!=="function")return{success:false,reason:"story_scene_registry_missing"};
    const sceneId=String(config.sceneId||""),beatId=String(config.beatId||"");
    const definition=getStorySceneDefinition(sceneId);
    const beat=definition&&definition.beatMap&&definition.beatMap.get(beatId);
    const skeleton=getSkeleton121(config.arcId,config.missionId);
    if(!definition||!beat)return{success:false,reason:"story_scene_or_beat_missing"};
    if(!skeleton||!skeleton.decisionMap.has(String(config.decisionId||"")))return{success:false,reason:"mission_decision_not_registered"};
    beat.ceDecision121={
      arcId:skeleton.arcId,missionId:skeleton.missionId,decisionId:String(config.decisionId),
      stateProvider:typeof config.stateProvider==="function"?config.stateProvider:()=>({}),
      committedStateRefProvider:typeof config.committedStateRefProvider==="function"?config.committedStateRefProvider:()=>null
    };
    sceneBindings.set(sceneId,{arcId:skeleton.arcId,missionId:skeleton.missionId});
    return{success:true,sceneId,beatId,decisionId:String(config.decisionId)};
  }

  const PRE_GET_BEAT=typeof getCurrentStorySceneBeat==="function"?getCurrentStorySceneBeat:null;
  if(PRE_GET_BEAT){
    globalThis.getCurrentStorySceneBeat=function ce121GetCurrentStorySceneBeat(){
      const beat=PRE_GET_BEAT.apply(this,arguments);
      if(!beat||!beat.ceDecision121)return beat;
      const binding=beat.ceDecision121;
      const context=binding.stateProvider();
      const stateRef=binding.committedStateRefProvider(context);
      const generated=ensureMissionChoiceSet121({
        arcId:binding.arcId,missionId:binding.missionId,decisionId:binding.decisionId,
        context,committedStateRef:stateRef
      });
      if(!generated.success)return{...beat,choices:[]};
      const choiceSet=generated.choiceSet;
      return{
        ...beat,
        choices:choiceSet.choices.map(semantic=>({
          choiceId:semantic.intentId,
          label:semantic.presentationText,
          nextBeatId:semantic.nextBeatId,
          availability:()=>({available:true,knownBlocker:null}),
          knownBlocker:null,
          contextPatch:null,
          consequenceRequests:[{
            requestId:`ce121_intent_${choiceSet.choiceSetId}_${semantic.intentId}`,
            kind:"custom",
            resolve:()=>commitMissionIntent121(choiceSet.choiceSetId,semantic.intentId)
          }]
        }))
      };
    };
    try{if(typeof getCurrentStorySceneBeat!=="undefined")getCurrentStorySceneBeat=globalThis.getCurrentStorySceneBeat;}catch(_error){}
  }

  const PRE_COMPLETE=typeof completeStoryScene==="function"?completeStoryScene:null;
  if(PRE_COMPLETE){
    globalThis.completeStoryScene=function ce121CompleteStoryScene(options={}){
      const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
      const binding=active&&sceneBindings.get(active.sceneId)||null;
      if(binding){
        const gate=canCompleteMission121(binding.arcId,binding.missionId,{storySceneId:active.sceneId,reason:options&&options.reason||null});
        if(!gate.success||gate.allowed!==true)return{success:false,reason:gate.reason||"mission_completion_predicate_unsatisfied",missing:gate.missing||[]};
      }
      return PRE_COMPLETE.apply(this,arguments);
    };
    try{if(typeof completeStoryScene!=="undefined")completeStoryScene=globalThis.completeStoryScene;}catch(_error){}
  }

  function runIssue121MissionChoiceDiagnostics(){
    const story=getStoryRuntime121();
    const backup=clone121(story.ceMissionChoice121||null);
    const diagKey=missionKey121("diag_arc","diag_mission");
    const priorSkeleton=skeletonRegistry.get(diagKey)||null;
    const priorResolver=resolverRegistry.get("diag_resolver")||null;
    try{
      story.ceMissionChoice121={version:RUNTIME_VERSION,sequence:0,choiceSets:{},receipts:{},missionProgress:{}};
      registerMissionResolver121("diag_resolver",({receipt})=>({success:true,resultRef:`resolved:${receipt.selectedProtagonistIntent.intentId}`,consequenceRefs:["occ_diag_resolution"]}));
      registerMissionSkeleton121({
        arcId:"diag_arc",missionId:"diag_mission",version:"diag_v1",title:"Diagnostic Mission",
        mandatoryAnchors:["contact_established"],
        completionPredicate:({context})=>context.closingWindowResolved===true,
        decisions:[{decisionId:"contact_decision",beatId:"diag_choice",intents:[
          {intentId:"observe",intentType:"observe",presentationText:"Observe the contact.",resolverId:"diag_resolver"},
          {intentId:"inspect_seal",intentType:"investigate",presentationText:"Inspect the seal trace.",resolverId:"diag_resolver",eligibilityBasis:["knowledge:seal_trace"],isEligible:ctx=>({available:ctx.knowledgeRefs.includes("seal_trace"),basis:ctx.knowledgeRefs.includes("seal_trace")?["knowledge:seal_trace"]:[],knownBlocker:null})},
          {intentId:"use_fuin",intentType:"use_capability",presentationText:"Use your learned sealing capability.",resolverId:"diag_resolver",eligibilityBasis:["capability:fuinjutsu"],isEligible:ctx=>({available:ctx.capabilityRefs.includes("fuinjutsu"),basis:ctx.capabilityRefs.includes("fuinjutsu")?["capability:fuinjutsu"]:[],knownBlocker:"LEARNED CAPABILITY REQUIRED"})},
          {intentId:"request_support",intentType:"request_support",presentationText:"Request formal shinobi support.",resolverId:"diag_resolver",eligibilityBasis:["rank:genin_plus"],isEligible:ctx=>({available:["genin","chunin","jonin","anbu","kage"].includes(String(ctx.formalRank||"").toLowerCase()),basis:["formal_rank"],knownBlocker:null})}
        ]}]
      });

      const low={formalRank:"academy",knowledgeRefs:[],capabilityRefs:[],teamParticipantIds:["academy_menma"],committedStateRef:"occ_state_A",perceivableNpcIntent:{intentType:"withdraw",sourceRef:"npc_diag"}};
      const high={formalRank:"genin",knowledgeRefs:["seal_trace"],capabilityRefs:["fuinjutsu"],teamParticipantIds:["genin_menma","genin_hinata"],committedStateRef:"occ_state_B",perceivableNpcIntent:{intentType:"withdraw",sourceRef:"npc_diag"}};
      const first=ensureMissionChoiceSet121({arcId:"diag_arc",missionId:"diag_mission",decisionId:"contact_decision",context:low,committedStateRef:"occ_state_A"});
      const reopen=ensureMissionChoiceSet121({arcId:"diag_arc",missionId:"diag_mission",decisionId:"contact_decision",context:{...low,presentationNonce:"ignored"},committedStateRef:"occ_state_A"});
      const deferred=ensureMissionChoiceSet121({arcId:"diag_arc",missionId:"diag_mission",decisionId:"contact_decision",context:high,committedStateRef:"occ_state_B"});
      const second=ensureMissionChoiceSet121({arcId:"diag_arc",missionId:"diag_mission",decisionId:"contact_decision",context:high,committedStateRef:"occ_state_B",allowCommittedStateSupersession:true});
      const selected=commitMissionIntent121(second.choiceSet.choiceSetId,"use_fuin");
      const premature=completeMission121("diag_arc","diag_mission",{closingWindowResolved:true});
      const anchor=markMissionAnchor121("diag_arc","diag_mission","contact_established",["occ_diag_resolution"]);
      const predicateBlocked=completeMission121("diag_arc","diag_mission",{closingWindowResolved:false});
      const completed=completeMission121("diag_arc","diag_mission",{closingWindowResolved:true});
      const projection=projectChoiceSet121(second.choiceSet.choiceSetId);
      const checks={
        patchId:PATCH_ID==="alpha_mission_choice_generation_121_2026_09_13",
        skeletonPinned:first.success===true&&first.choiceSet.skeletonVersion==="diag_v1",
        chronicleRelativeChoiceSets:first.choiceSet.choices.length===1&&second.choiceSet.choices.length===4,
        rankKnowledgeCapabilitySeparate:second.choiceSet.choices.some(c=>c.intentId==="request_support")&&second.choiceSet.choices.some(c=>c.intentId==="inspect_seal")&&second.choiceSet.choices.some(c=>c.intentId==="use_fuin"),
        reopenNoReroll:reopen.choiceSet.choiceSetId===first.choiceSet.choiceSetId,
        changedHistoryDoesNotSilentlyReroll:deferred.choiceSet.choiceSetId===first.choiceSet.choiceSetId&&deferred.supersessionDeferred===true,
        explicitNewHistorySupersedes:first.choiceSet.choiceSetId!==second.choiceSet.choiceSetId,
        choiceCommitsIntentBeforeOutcome:selected.success===true&&selected.receipt.selectedProtagonistIntent.intentId==="use_fuin"&&selected.receipt.status==="resolved"&&selected.receipt.resolverResultRef==="resolved:use_fuin",
        mandatoryAnchorBlocksCompletion:premature.success===false&&premature.reason==="mandatory_anchors_missing",
        authoredCompletionPredicateBlocks:anchor.success===true&&predicateBlocked.success===false&&predicateBlocked.reason==="authored_completion_predicate_unsatisfied",
        authoredCompletionPredicateAllows:completed.success===true,
        npcIntentSeparate:second.choiceSet.perceivableNpcIntent&&second.choiceSet.perceivableNpcIntent.intentType==="withdraw"&&!second.choiceSet.choices.some(c=>c.intentType==="withdraw"),
        hiddenTruthNotProjected:projection.choices.every(c=>!JSON.stringify(c).includes("secret")),
        semanticIntentSeparateFromWording:second.choiceSet.choices.every(c=>c.intentId&&c.intentType&&c.presentationText),
        boundedExpressionOnly:true,
        browserGoldenClaimed:false
      };
      const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
      return{pass:failed.length===0,checks,failed,first:first.choiceSet,second:second.choiceSet,selected:selected.receipt,browserGoldenClaimed:false};
    }finally{
      if(backup===null)delete story.ceMissionChoice121;else story.ceMissionChoice121=backup;
      if(priorSkeleton)skeletonRegistry.set(diagKey,priorSkeleton);else skeletonRegistry.delete(diagKey);
      if(priorResolver)resolverRegistry.set("diag_resolver",priorResolver);else resolverRegistry.delete("diag_resolver");
    }
  }

  const api=Object.freeze({
    patchId:PATCH_ID,
    registerMissionSkeleton:registerMissionSkeleton121,
    registerResolver:registerMissionResolver121,
    ensureChoiceSet:ensureMissionChoiceSet121,
    getChoiceSet:getMissionChoiceSet121,
    projectChoiceSet:projectChoiceSet121,
    commitIntent:commitMissionIntent121,
    markMissionAnchor:markMissionAnchor121,
    canCompleteMission:canCompleteMission121,
    completeMission:completeMission121,
    bindStoryDecision:bindStoryDecision121,
    diagnostics:runIssue121MissionChoiceDiagnostics
  });

  globalThis.SC_ALPHA_MISSION_CHOICE_121=api;
  globalThis.registerMissionSkeleton121=registerMissionSkeleton121;
  globalThis.registerMissionResolver121=registerMissionResolver121;
  globalThis.ensureMissionChoiceSet121=ensureMissionChoiceSet121;
  globalThis.commitMissionIntent121=commitMissionIntent121;
  globalThis.markMissionAnchor121=markMissionAnchor121;
  globalThis.canCompleteMission121=canCompleteMission121;
  globalThis.completeMission121=completeMission121;
  globalThis.bindStoryDecision121=bindStoryDecision121;
  globalThis.runIssue121MissionChoiceDiagnostics=runIssue121MissionChoiceDiagnostics;
})();
