'use strict';
const fs=require('fs');
const vm=require('vm');
const assert=require('assert');

const overlayPath='runtime/alpha-origin-reward-spectrum-440.js';
const overlaySource=fs.readFileSync(overlayPath,'utf8');
const indexSource=fs.readFileSync('index.html','utf8');
const purseSource=fs.readFileSync('runtime/alpha-origin-starting-purse-409.js','utf8');
const iwabeeSource=fs.readFileSync('runtime/alpha-iwabee-origin-runtime-399.js','utf8');
const metalSource=fs.readFileSync('runtime/alpha-metal-origin-runtime-396.js','utf8');
const binderSource=fs.readFileSync('runtime/alpha-origin-scene-board-bindings-105.js','utf8');
const obitoSource=fs.readFileSync('runtime/alpha-origin-scenes-32900-c.js','utf8');

function boot(seed={}){
  const playerData={activityHistory:JSON.parse(JSON.stringify(seed.history||[])),ryo:0};
  const chars={};
  const active={sceneId:'test',instanceId:'test:1',localContext:{}};
  const evidence=[];
  let runtimeCtx=null;
  const A={
    sceneByVariant:{},
    clone:v=>v&&typeof v==='object'?JSON.parse(JSON.stringify(v)):v,
    active:()=>active,
    local:()=>active.localContext,
    history(){return playerData.activityHistory;},
    findOccurrence(id){return playerData.activityHistory.find(r=>r&&r.occurrenceId===id&&r.sourceOccurrenceId===id)||null;},
    commitOccurrence(originId,occurrenceId,fact={}){
      let row=this.findOccurrence(occurrenceId);
      if(!row){
        row={type:'origin_story_occurrence',activity:'story_scene',completed:true,committed:true,success:true,
          occurrenceId,sourceOccurrenceId:occurrenceId,actorVariantId:originId,subjectVariantId:originId,
          fact:this.clone(fact),data:this.clone(fact),timestamp:Date.now()};
        playerData.activityHistory.push(row);
      }
      const rewardSpectrum440=runtimeCtx&&typeof runtimeCtx.projectAcademyOriginRewardOccurrence440==='function'
        ?runtimeCtx.projectAcademyOriginRewardOccurrence440(originId,occurrenceId,this.clone(row),this.clone(this.local()))
        :null;
      return{success:true,occurrenceId,record:this.clone(row),receipts:[],rewardSpectrum440};
    }
  };
  const getChar=id=>{
    if(!chars[id])chars[id]={id,stats:{},disciplineProgression:{}};
    return chars[id];
  };
  const ctx={
    console,playerData,SC_ALPHA_ORIGIN_32900:A,
    savePlayerData(){},
    getPlayerCharacter:getChar,
    getCharacterDisciplineProgression(id,discipline){
      const c=getChar(id);c.disciplineProgression[discipline]=c.disciplineProgression[discipline]||{level:0,exp:0};return c.disciplineProgression[discipline];
    },
    processDisciplineLevelUps(id,discipline){return{success:true,id,discipline};},
    projectSpecialJoninContextualEvidence34700(input){
      const key=[input.subjectVariantId,input.qualificationId,input.causalRootOccurrenceId].join('|');
      let row=evidence.find(x=>x.key===key);
      if(!row){row={key,...JSON.parse(JSON.stringify(input))};evidence.push(row);}
      else row.tags=[...new Set([...(row.tags||[]),...(input.tags||[])])];
      return{success:true,idempotent:!!evidence.find((x,i)=>x.key===key&&i<evidence.indexOf(row)),evidence:JSON.parse(JSON.stringify(row))};
    }
  };
  ctx.globalThis=ctx;runtimeCtx=ctx;vm.createContext(ctx);vm.runInContext(overlaySource,ctx,{filename:overlayPath});
  return{ctx,A,playerData,chars,evidence,active};
}
function exp(state,id,discipline){return Number(state.chars[id]?.disciplineProgression?.[discipline]?.exp)||0;}
function receipts(state,id){return state.playerData.activityHistory.filter(r=>r&&r.type==='discipline_development'&&r.subjectVariantId===id);}
function evidenceTags(state,id){return state.evidence.filter(r=>r.subjectVariantId===id).flatMap(r=>r.tags||[]);}

// Shared material laws remain in their existing owners.
assert(purseSource.includes('const AMOUNT=100;'),'Origin starting purse is not fixed at 100 Ryō');
assert(iwabeeSource.includes('const FIXED_VICTORY_RYO=50;'),'Iwabee Battle victory is not 50 Ryō');
assert(iwabeeSource.includes('const REWARD_SOURCE_ID="iwabee_origin_rogue_genin_battle_victory_ryo_01";'),'Iwabee Battle reward source drift');
assert(!iwabeeSource.includes('iwabee399NoReward:true'),'stale Iwabee zero-reward runtime flag remains');
assert(!iwabeeSource.includes('noReward:true'),'stale Iwabee zero-reward launch evidence remains');
assert(metalSource.includes('const REWARD_SOURCE_ID="metal_origin_controlled_spar_victory_ryo_01";'),'Metal canonical reward source drift');
assert(metalSource.includes('const LEGACY_REWARD_SOURCE_ID="metal_origin_controlled_spar_battle_victory_ryo_01";'),'Metal legacy source dedupe alias missing');

// Load order: overlay observes the final Origin definitions and precedes Receipt projection.
assert(indexSource.indexOf('alpha-origin-writing-golden-105.js')<indexSource.indexOf('alpha-origin-reward-spectrum-440.js'));
assert(indexSource.indexOf('alpha-origin-reward-spectrum-440.js')<indexSource.indexOf('alpha-origin-scene-board-bindings-105.js'));
assert(binderSource.includes('appendAcademyOriginRewardReceipt440'),'shared Origin Receipt projection is not wired');
assert(obitoSource.includes('appendAcademyOriginRewardReceipt440(lines,ORIGIN_ID)'),'Obito Receipt reward projection is not wired');

// Hinata: three materially executed spar exchanges pay once, capped at 3; younger source remains independent.
{
  const s=boot();
  s.A.commitOccurrence('academy_hinata','occ_origin_hinata_controlled_hyuga_spar_resolution',{
    controlledSparCompleted:true,demonstratedResponses:['wait_for_opening','wait_hold_ground','answer_with_form']
  });
  assert.equal(exp(s,'academy_hinata','taijutsu'),3);
  assert.equal(receipts(s,'academy_hinata').filter(r=>r.sourceOccurrenceId==='occ_origin_hinata_controlled_hyuga_spar_resolution').length,3);
  s.A.commitOccurrence('academy_hinata','occ_origin_hinata_controlled_hyuga_spar_resolution',{
    controlledSparCompleted:true,demonstratedResponses:['wait_for_opening','wait_hold_ground','answer_with_form']
  });
  assert.equal(exp(s,'academy_hinata','taijutsu'),3,'Hinata spar replay duplicated development');
  s.A.commitOccurrence('academy_hinata','occ_origin_hinata_younger_student_practice_resolution',{youngerStudentChoice:'stay_and_watch',selfTaijutsuLearningOccurred:true});
  assert.equal(exp(s,'academy_hinata','taijutsu'),4,'Hinata younger-student source was incorrectly merged into spar cap');
}

// Mirai: self-derived verification qualifies; Battle-only reveal does not. Changed chakra projects signal discrimination only.
{
  const s=boot();
  s.active.localContext={mirVerificationBasis:'conversation_continuity'};
  s.A.commitOccurrence('academy_mirai','occ_origin_mirai_substitution_verification_resolution',{substitutionVerifiedBeforeCheckpoint:true,verificationBasis:'runtime_local_context'});
  assert(evidenceTags(s,'academy_mirai').includes('intelligence.counter_intelligence_analyst:deception_detection'));
  s.A.commitOccurrence('academy_mirai','occ_origin_mirai_changed_chakra_observation',{changedOrUnfamiliarChakraObserved:true});
  const tags=evidenceTags(s,'academy_mirai');
  assert(tags.includes('reconnaissance.sensor_nin:signal_discrimination'));
  assert(!tags.some(x=>String(x).includes('sensor_application')));
}
{
  const s=boot();
  s.active.localContext={mirVerificationBasis:'battle_triggered_instructor_reveal'};
  s.A.commitOccurrence('academy_mirai','occ_origin_mirai_substitution_verification_resolution',{substitutionVerifiedBeforeCheckpoint:true,verificationBasis:'battle_triggered_instructor_reveal'});
  assert(!evidenceTags(s,'academy_mirai').includes('intelligence.counter_intelligence_analyst:deception_detection'),'Battle reveal incorrectly granted deception detection');
}

// Kushina: branch-specific Fūinjutsu + specialist evidence; reverse-summoning qualification is explicitly rejected.
{
  const contain=boot();
  contain.A.commitOccurrence('academy_kushina','occ_origin_kushina_residual_seal_work_resolution',{qualifyingFuinjutsuWorkCompleted:true,crisisChoice:'contain_damaged_seal'});
  assert.equal(exp(contain,'academy_kushina','fuinjutsu'),2);
  assert(evidenceTags(contain,'academy_kushina').includes('fuinjutsu_operations.sealing_specialist:seal_execution'));

  const correct=boot();
  correct.A.commitOccurrence('academy_kushina','occ_origin_kushina_residual_seal_work_resolution',{qualifyingFuinjutsuWorkCompleted:true,crisisChoice:'correct_formula'});
  assert.equal(exp(correct,'academy_kushina','fuinjutsu'),2);
  const ct=evidenceTags(correct,'academy_kushina');
  assert(ct.includes('fuinjutsu_operations.sealing_specialist:seal_analysis'));
  assert(ct.includes('fuinjutsu_operations.sealing_specialist:seal_execution'));

  const protect=boot();
  protect.A.commitOccurrence('academy_kushina','occ_origin_kushina_residual_seal_work_resolution',{qualifyingFuinjutsuWorkCompleted:false,crisisChoice:'protect_student'});
  assert.equal(exp(protect,'academy_kushina','fuinjutsu'),0);
  assert(evidenceTags(protect,'academy_kushina').includes('covert_operations.extraction_specialist:subject_recovery'));

  const joint=boot();
  joint.A.commitOccurrence('academy_kushina','occ_origin_kushina_joint_residual_seal_closure',{jointResidualSealClosureWithGerotora:true});
  assert.equal(exp(joint,'academy_kushina','fuinjutsu'),2);
  const jt=evidenceTags(joint,'academy_kushina');
  assert(jt.includes('fuinjutsu_operations.sealing_specialist:seal_execution'));
  assert(!jt.some(x=>String(x).includes('reverse_summoning')),'Kushina joint closure incorrectly granted reverse-summoning qualification');
}

// Kurenai: three material stages are source-scoped and obey the exact root cap of 3.
{
  const s=boot();
  s.A.commitOccurrence('academy_kurenai','occ_origin_kurenai_bell_test_resolution',{
    kurenaiStage1:'false_kurenai',kurenaiStage2:'rush_bell',kurenaiStage3:'take_bell_now',bellTestOutcomeClass:'complete_loss'
  });
  assert.equal(exp(s,'academy_kurenai','genjutsu'),3);
  assert.equal(receipts(s,'academy_kurenai').length,3);
}

// Metal: exact private development; MET-03 technical branches only; taking impact gives no invented Stamina/technical EXP.
{
  const s=boot();
  s.A.commitOccurrence('academy_metal_lee','occ_origin_metal_private_training_resolution',{qualifyingPrivateTaijutsuOrConditioningWorkCompleted:true,privateTrainingChoice:'spinning_kick'});
  assert.equal(exp(s,'academy_metal_lee','taijutsu'),2);
  s.A.commitOccurrence('academy_metal_lee','occ_origin_metal_protective_response_resolution',{protectiveResponseKind:'redirect_dummy',protectiveResponseOutcome:'partial'});
  assert.equal(exp(s,'academy_metal_lee','taijutsu'),4);
}
{
  const s=boot();
  s.A.commitOccurrence('academy_metal_lee','occ_origin_metal_private_training_resolution',{qualifyingPrivateTaijutsuOrConditioningWorkCompleted:true,privateTrainingChoice:'conditioned_endurance'});
  assert.equal(exp(s,'academy_metal_lee','stamina'),1);
  s.A.commitOccurrence('academy_metal_lee','occ_origin_metal_protective_response_resolution',{protectiveResponseKind:'take_impact',protectiveResponseOutcome:'success'});
  assert.equal(exp(s,'academy_metal_lee','stamina'),1);
  assert.equal(exp(s,'academy_metal_lee','taijutsu'),0);
}

// Iwabee: two separate Earth Release causal roots can each pay +2 Ninjutsu.
{
  const s=boot();
  s.A.commitOccurrence('academy_iwabee','occ_origin_iwabee_training_ground_reshape_resolution',{trainingGroundReshapeObjectiveCompletedByIwabee:true});
  s.A.commitOccurrence('academy_iwabee','occ_origin_iwabee_rogue_genin_response_resolution',{earthReleaseUsedToConstrainRogueGenin:true});
  assert.equal(exp(s,'academy_iwabee','ninjutsu'),4);
  assert.equal(receipts(s,'academy_iwabee').filter(r=>r.disciplineId==='ninjutsu').length,2);
}

// Obito: only the existing static Current-Stat package is projected; no second Discipline EXP grant is created.
{
  const s=boot();
  s.A.commitOccurrence('academy_obito','occ_origin_obito_formal_training_entitlement_resolution',{formalTrainingEntitlement:'FULL'});
  assert.equal(receipts(s,'academy_obito').length,0,'Obito received duplicate Discipline development');
  const lines=['REWARDS'];
  s.ctx.appendAcademyOriginRewardReceipt440(lines,'academy_obito');
  assert(lines.some(x=>x.includes('+1 Ninjutsu')&&x.includes('+1 Taijutsu')&&x.includes('+1 Bukijutsu')&&x.includes('+1 Stamina')),'Obito Current-Stat package missing from Receipt projection');
}

// Receipt projection shows battle cash/development but never raw CE qualification/significance internals.
{
  const s=boot();
  s.playerData.activityHistory.push({type:'origin_battle_reward',rewardSourceId:'iwabee_origin_rogue_genin_battle_victory_ryo_01',battleOccurrenceId:'b1',actorVariantId:'academy_iwabee',ryo:50});
  s.A.commitOccurrence('academy_iwabee','occ_origin_iwabee_training_ground_reshape_resolution',{trainingGroundReshapeObjectiveCompletedByIwabee:true});
  const lines=['REWARDS'];
  s.ctx.appendAcademyOriginRewardReceipt440(lines,'academy_iwabee');
  const text=lines.join('\n');
  assert(text.includes('PL Battle Victory: +50 Ryō.'));
  assert(text.includes('Ninjutsu Development: +2'));
  assert(!/qualificationId|significance|sourceOccurrenceId|progressionSlotId/.test(text));
}

// Save/load/reconcile: committed source facts deterministically project once; rerun is idempotent.
{
  const source={type:'origin_story_occurrence',activity:'story_scene',completed:true,committed:true,success:true,
    occurrenceId:'occ_origin_iwabee_training_ground_reshape_resolution',sourceOccurrenceId:'occ_origin_iwabee_training_ground_reshape_resolution',
    actorVariantId:'academy_iwabee',fact:{trainingGroundReshapeObjectiveCompletedByIwabee:true}};
  const s=boot({history:[source]});
  assert.equal(exp(s,'academy_iwabee','ninjutsu'),2);
  const before=s.playerData.activityHistory.length;
  s.ctx.reconcileAcademyOriginRewardSpectrum440();
  assert.equal(exp(s,'academy_iwabee','ninjutsu'),2);
  assert.equal(s.playerData.activityHistory.length,before,'reconcile duplicated reward receipt');
}

const d=boot().ctx.runAcademyOriginRewardSpectrum440Diagnostics();
assert.equal(d.pass,true,JSON.stringify(d,null,2));

console.log(JSON.stringify({
  pass:true,
  kind:'issue_440_origin_reward_spectrum',
  checks:{
    startingPurse100:true,
    iwabeeBattleVictory50:true,
    metalCanonicalSourceWithLegacyDedupe:true,
    developmentSourceScopedAndIdempotent:true,
    specialJoninMappingsBounded:true,
    kushinaReverseSummoningRejected:true,
    obitoNoDoubleDevelopment:true,
    receiptProjectionHidesCeInternals:true,
    saveLoadReconcileIdempotent:true
  }
},null,2));
