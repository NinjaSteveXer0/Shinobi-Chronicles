// ============================================================================
// ISSUE #151 — ARC-1 DECISION-SENSITIVE REWARD SNAPSHOT EVALUATOR — 35400
//
// World / Rewards authority:
// Documentation/World/Decision Sensitive Mission Arc Debrief Reward Evaluation
// and Arc 1 Calibration 2026-09-13.md
// commit d2a09e751f8e117801c3b51dd445517b0cc50d03
//
// One immutable entitlement snapshot per Chronicle. Evaluation consumes only
// explicit committed facts; presentation/prose/Rank/PL/current stats are never
// reward authority. Action-time progression/evidence is read-only here.
// ============================================================================
(function installArc1RewardEvaluation35400(){
"use strict";
if(globalThis.SC_ARC1_REWARD_EVALUATION_35400)return;

const PATCH_ID="alpha_arc1_reward_evaluation_35400_v1_2026_09_17";
const EVALUATION_SCHEMA="sc.rewardEvaluation.v1";
const SNAPSHOT_SCHEMA="sc.rewardEntitlementSnapshot.v1";
const EVALUATOR_ID="reward_eval_arc1_completion_debrief_v1";
const AUTHORITY_COMMIT="d2a09e751f8e117801c3b51dd445517b0cc50d03";
const ARC_REF="arc_1";
const ITEM_OWNER="Combat/Items";
const VALUE_KINDS=new Set(["PERSON","EVIDENCE","KNOWLEDGE","CUSTODY","LEAD","SPECIALIST_WORK","FUTURE_CHAIN"]);
const METHOD_PRIORITY=Object.freeze([
  "ARC1_METHOD_INVESTIGATION_EVIDENCE",
  "ARC1_METHOD_SPECIALIST_APPLICATION",
  "ARC1_METHOD_LIVE_CUSTODY_PROTECTION",
  "ARC1_METHOD_NONCOMBAT_RESOLUTION"
]);
const COMPONENTS=Object.freeze({
  exceptional:Object.freeze({id:"ARC1_PERF_EXCEPTIONAL_BATTLE_RECORD",poolRef:"reward_pool_alpha_high_quality_equipment_v1",fallbackRyo:700}),
  adaptive:Object.freeze({id:"ARC1_PERF_ADAPTIVE_RECOVERY",baseRyo:400,poolRef:"reward_pool_alpha_recovery_resupply_v1",fallbackRyo:200}),
  reliability:Object.freeze({id:"ARC1_PERF_FIELD_RELIABILITY",baseRyo:250}),
  investigation:Object.freeze({id:"ARC1_METHOD_INVESTIGATION_EVIDENCE",baseRyo:300,poolRef:"reward_pool_alpha_investigation_utility_v1",fallbackRyo:200}),
  specialist:Object.freeze({id:"ARC1_METHOD_SPECIALIST_APPLICATION",baseRyo:250,poolRef:"reward_pool_alpha_technical_materials_v1",fallbackRyo:200}),
  custody:Object.freeze({id:"ARC1_METHOD_LIVE_CUSTODY_PROTECTION",baseRyo:250,poolRef:"reward_pool_alpha_medical_containment_resupply_v1",fallbackRyo:200}),
  noncombat:Object.freeze({id:"ARC1_METHOD_NONCOMBAT_RESOLUTION",baseRyo:300,poolRef:"reward_pool_alpha_field_utility_v1",fallbackRyo:150})
});
let poolResolver=null;

function clone(value){try{return JSON.parse(JSON.stringify(value));}catch(_error){return value;}}
function freezeClone(value){const row=clone(value);return row&&typeof row==="object"?Object.freeze(row):row;}
function isObject(value){return !!value&&typeof value==="object"&&!Array.isArray(value);}
function nonEmpty(value){return typeof value==="string"&&value.trim().length>0;}
function save(){try{if(typeof globalThis.savePlayerData==="function")globalThis.savePlayerData();}catch(_error){}try{if(typeof globalThis.saveTestState==="function")globalThis.saveTestState();}catch(_error){}}
function ensurePersistence(){
  const pd=globalThis.playerData;if(!isObject(pd))return null;
  pd.chronicleRewardEntitlements=isObject(pd.chronicleRewardEntitlements)?pd.chronicleRewardEntitlements:{};
  const root=pd.chronicleRewardEntitlements;
  root.schema=EVALUATION_SCHEMA;
  root.arc1=isObject(root.arc1)?root.arc1:{};
  root.arc1.snapshots=isObject(root.arc1.snapshots)?root.arc1.snapshots:{};
  root.arc1.grants=isObject(root.arc1.grants)?root.arc1.grants:{};
  root.arc1.entitlementGrants=isObject(root.arc1.entitlementGrants)?root.arc1.entitlementGrants:{};
  return root.arc1;
}
function arrayOrEmpty(facts,key){if(facts[key]==null)return{success:true,rows:[]};if(!Array.isArray(facts[key]))return{success:false,reason:`${key}_must_be_array`};return{success:true,rows:facts[key]};}
function uniqueRows(rows,key){const seen=new Set();for(const row of rows){if(!isObject(row)||!nonEmpty(row[key]))return{success:false,reason:`${key}_required`};const ref=String(row[key]);if(seen.has(ref))return{success:false,reason:`duplicate_${key}`,ref};seen.add(ref);}return{success:true};}
function boolField(row,key){return typeof row[key]==="boolean";}
function validateFacts(facts){
  if(!isObject(facts))return{success:false,reason:"committed_facts_object_required"};
  const keys=["battles","objectiveResults","preservedValueOccurrences","investigationEvidenceOccurrences","specialistApplicationOccurrences","liveCustodyProtectionOccurrences","noncombatResolutionOccurrences","alreadyGrantedMaterialEntitlementRefs"];
  const out={};
  for(const key of keys){const got=arrayOrEmpty(facts,key);if(!got.success)return got;out[key]=got.rows;}
  for(const key of keys.slice(0,-1)){const distinct=uniqueRows(out[key],"occurrenceRef");if(!distinct.success)return{...distinct,collection:key};}
  if(out.alreadyGrantedMaterialEntitlementRefs.some(ref=>!nonEmpty(ref)))return{success:false,reason:"already_granted_material_ref_invalid"};
  for(const row of out.battles){if(!boolField(row,"protagonistEntered")||!boolField(row,"defeated")||!boolField(row,"withdrew")||!boolField(row,"adverseResult")||!boolField(row,"materiallyDangerousStoryBattle"))return{success:false,reason:"battle_fact_booleans_required",occurrenceRef:row.occurrenceRef};}
  for(const row of out.objectiveResults){if(!boolField(row,"adverseResult"))return{success:false,reason:"objective_adverse_fact_required",occurrenceRef:row.occurrenceRef};}
  for(const row of out.preservedValueOccurrences){if(!nonEmpty(row.sourceAdverseOccurrenceRef)||!boolField(row,"material")||!VALUE_KINDS.has(String(row.valueKind||"").toUpperCase()))return{success:false,reason:"preserved_value_fact_invalid",occurrenceRef:row.occurrenceRef};}
  for(const row of out.investigationEvidenceOccurrences){if(!nonEmpty(row.missionRef)||!boolField(row,"material")||!boolField(row,"preservedOrConfirmedBeyondUncorroboratedTestimony"))return{success:false,reason:"investigation_fact_invalid",occurrenceRef:row.occurrenceRef};}
  for(const row of out.specialistApplicationOccurrences){if(!nonEmpty(row.missionRef)||!boolField(row,"material")||!boolField(row,"authorised")||!boolField(row,"outsideOrdinaryDirectBattleDamage"))return{success:false,reason:"specialist_fact_invalid",occurrenceRef:row.occurrenceRef};}
  for(const row of out.liveCustodyProtectionOccurrences){if(!nonEmpty(row.missionRef)||!boolField(row,"material"))return{success:false,reason:"custody_fact_invalid",occurrenceRef:row.occurrenceRef};}
  for(const row of out.noncombatResolutionOccurrences){if(!nonEmpty(row.missionRef)||!boolField(row,"material")||!boolField(row,"resolvedWithoutBattle")||!boolField(row,"escalationGenuinelyPossible"))return{success:false,reason:"noncombat_fact_invalid",occurrenceRef:row.occurrenceRef};}
  return{success:true,facts:out};
}
function registerRewardPoolResolver(ownerRef,resolver){
  if(String(ownerRef||"")!==ITEM_OWNER||typeof resolver!=="function")return{success:false,reason:"combat_items_owner_resolver_required"};
  poolResolver=resolver;return{success:true,ownerRef:ITEM_OWNER};
}
function resolvePool(poolRef,context){
  if(typeof poolResolver!=="function")return{success:false,reason:"reward_pool_resolver_unavailable",poolRef};
  let result;try{result=poolResolver(poolRef,clone(context));}catch(error){return{success:false,reason:"reward_pool_resolver_threw",poolRef,detail:String(error&&error.message||error)};}
  if(!isObject(result)||result.success!==true||!nonEmpty(result.itemId)||result.legal!==true||result.alphaActive!==true||String(result.authorityOwner||"")!==ITEM_OWNER)return{success:false,reason:"reward_pool_selection_not_authorised",poolRef};
  if(context.excludedMaterialEntitlementRefs.includes(String(result.itemId)))return{success:false,reason:"reward_pool_selection_already_granted_from_source_facts",poolRef,itemId:String(result.itemId)};
  return{success:true,poolRef,itemId:String(result.itemId),selectionRef:nonEmpty(result.selectionRef)?String(result.selectionRef):null};
}
function addRyo(entitlements,entitlementId,amount,componentId){if(Number(amount)>0)entitlements.push({entitlementId,type:"RYO",amount:Number(amount),componentId});}
function addPoolOrFallback(entitlements,component,context){
  const selected=resolvePool(component.poolRef,context);
  if(selected.success){entitlements.push({entitlementId:`${component.id}:item`,type:"ITEM",itemId:selected.itemId,poolRef:component.poolRef,selectionRef:selected.selectionRef,componentId:component.id});return{resolvedItem:selected.itemId,fallbackUsed:false};}
  addRyo(entitlements,`${component.id}:pool_fallback`,component.fallbackRyo,component.id);
  return{resolvedItem:null,fallbackUsed:true,fallbackReason:selected.reason};
}
function sourceRefs(rows){return rows.filter(row=>row&&row.material!==false).map(row=>String(row.occurrenceRef));}
function evaluateArc1Entitlement(input={}){
  if(!isObject(input)||!nonEmpty(input.chronicleRef))return{success:false,reason:"chronicle_ref_required"};
  if(!nonEmpty(input.committedStateRef))return{success:false,reason:"committed_state_ref_required"};
  if(input.arcCompleted!==true)return{success:false,reason:"arc1_completion_required"};
  const checked=validateFacts(input.facts);if(!checked.success)return checked;
  const f=checked.facts,entered=f.battles.filter(row=>row.protagonistEntered===true);
  const dangerous=entered.some(row=>row.materiallyDangerousStoryBattle===true);
  const exceptional=dangerous&&entered.every(row=>row.defeated===false&&row.withdrew===false);
  const adverseRefs=new Set([
    ...entered.filter(row=>row.adverseResult===true).map(row=>String(row.occurrenceRef)),
    ...f.objectiveResults.filter(row=>row.adverseResult===true).map(row=>String(row.occurrenceRef))
  ]);
  const preserved=f.preservedValueOccurrences.filter(row=>row.material===true&&adverseRefs.has(String(row.sourceAdverseOccurrenceRef)));
  const adaptive=adverseRefs.size>0&&preserved.length>0;
  const entitlements=[];addRyo(entitlements,"ARC1_BASE_COMPLETION:ryo",1200,null);
  let performanceComponentId,performanceSources=[],performancePool=null;
  const poolContext={chronicleRef:String(input.chronicleRef),committedStateRef:String(input.committedStateRef),excludedMaterialEntitlementRefs:[...new Set(f.alreadyGrantedMaterialEntitlementRefs.map(String))]};
  if(exceptional){performanceComponentId=COMPONENTS.exceptional.id;performanceSources=entered.map(row=>String(row.occurrenceRef));performancePool=addPoolOrFallback(entitlements,COMPONENTS.exceptional,poolContext);}
  else if(adaptive){performanceComponentId=COMPONENTS.adaptive.id;performanceSources=[...adverseRefs,...sourceRefs(preserved)];addRyo(entitlements,`${COMPONENTS.adaptive.id}:ryo`,COMPONENTS.adaptive.baseRyo,COMPONENTS.adaptive.id);performancePool=addPoolOrFallback(entitlements,COMPONENTS.adaptive,poolContext);}
  else{performanceComponentId=COMPONENTS.reliability.id;performanceSources=[];addRyo(entitlements,`${COMPONENTS.reliability.id}:ryo`,COMPONENTS.reliability.baseRyo,COMPONENTS.reliability.id);}

  const investigation=f.investigationEvidenceOccurrences.filter(row=>row.material===true);
  const investigationQualifies=investigation.length>=4&&new Set(investigation.map(row=>String(row.missionRef))).size>=3&&investigation.some(row=>row.preservedOrConfirmedBeyondUncorroboratedTestimony===true);
  const specialist=f.specialistApplicationOccurrences.filter(row=>row.material===true&&row.authorised===true);
  const specialistQualifies=specialist.length>=3&&specialist.some(row=>row.outsideOrdinaryDirectBattleDamage===true);
  const custody=f.liveCustodyProtectionOccurrences.filter(row=>row.material===true);
  const custodyQualifies=custody.length>=2;
  const noncombat=f.noncombatResolutionOccurrences.filter(row=>row.material===true&&row.resolvedWithoutBattle===true&&row.escalationGenuinelyPossible===true);
  const noncombatQualifies=noncombat.length>=2;
  const candidates=[
    {component:COMPONENTS.investigation,qualifies:investigationQualifies,rows:investigation},
    {component:COMPONENTS.specialist,qualifies:specialistQualifies,rows:specialist},
    {component:COMPONENTS.custody,qualifies:custodyQualifies,rows:custody},
    {component:COMPONENTS.noncombat,qualifies:noncombatQualifies,rows:noncombat}
  ].filter(row=>row.qualifies);
  candidates.sort((a,b)=>b.rows.length-a.rows.length||METHOD_PRIORITY.indexOf(a.component.id)-METHOD_PRIORITY.indexOf(b.component.id));
  const method=candidates[0]||null;let methodComponentId=null,methodSources=[],methodPool=null;
  if(method){methodComponentId=method.component.id;methodSources=sourceRefs(method.rows);addRyo(entitlements,`${method.component.id}:ryo`,method.component.baseRyo,method.component.id);methodPool=addPoolOrFallback(entitlements,method.component,poolContext);}
  const totalRyo=entitlements.filter(row=>row.type==="RYO").reduce((sum,row)=>sum+Number(row.amount||0),0);
  const selectedComponentIds=[performanceComponentId,...(methodComponentId?[methodComponentId]:[])];
  const snapshot={
    schema:SNAPSHOT_SCHEMA,evaluationSchema:EVALUATION_SCHEMA,evaluatorId:EVALUATOR_ID,authorityCommit:AUTHORITY_COMMIT,
    snapshotRef:`arc1_debrief_reward:${String(input.chronicleRef)}`,chronicleRef:String(input.chronicleRef),arcRef:ARC_REF,committedStateRef:String(input.committedStateRef),
    selectedComponentIds,performanceComponentId,methodComponentId,totalRyo,entitlements,
    supportingSourceOccurrenceRefs:[...new Set([...performanceSources,...methodSources])],
    resolution:Object.freeze({performancePool:performancePool?clone(performancePool):null,methodPool:methodPool?clone(methodPool):null})
  };
  return{success:true,snapshot:freezeClone(snapshot)};
}
function getCommittedSnapshot(chronicleRef){const root=ensurePersistence();if(!root||!nonEmpty(chronicleRef))return null;return root.snapshots[String(chronicleRef)]?freezeClone(root.snapshots[String(chronicleRef)]):null;}
function commitArc1EntitlementSnapshot(input={}){
  const root=ensurePersistence();if(!root)return{success:false,reason:"player_data_missing"};
  const key=String(input&&input.chronicleRef||"");if(!nonEmpty(key))return{success:false,reason:"chronicle_ref_required"};
  if(root.snapshots[key])return{success:true,idempotent:true,snapshot:freezeClone(root.snapshots[key])};
  const evaluated=evaluateArc1Entitlement(input);if(!evaluated.success)return evaluated;
  root.snapshots[key]=clone(evaluated.snapshot);save();return{success:true,idempotent:false,snapshot:freezeClone(root.snapshots[key])};
}
function inventoryQuantity(itemId){const pd=globalThis.playerData;if(!pd||!Array.isArray(pd.inventory))return 0;return pd.inventory.filter(row=>row&&String(row.id||"")===String(itemId)).reduce((sum,row)=>sum+Math.max(1,Number(row.quantity)||1),0);}
function grantItem(itemId){
  if(typeof globalThis.getItemDefinition!=="function"||typeof globalThis.addItemToInventory!=="function")return{success:false,reason:"canonical_inventory_api_missing",itemId};
  const definition=globalThis.getItemDefinition(itemId);if(!definition)return{success:false,reason:"reward_catalogue_definition_missing",itemId};
  const before=inventoryQuantity(itemId);try{globalThis.addItemToInventory(clone(definition));}catch(error){return{success:false,reason:"canonical_inventory_commit_threw",itemId,detail:String(error&&error.message||error)};}
  const after=inventoryQuantity(itemId);if(after<=before)return{success:false,reason:"canonical_inventory_commit_failed",itemId,before,after};return{success:true,itemId,quantityAdded:after-before,total:after};
}
function grantArc1Entitlement(chronicleRef){
  const root=ensurePersistence();if(!root)return{success:false,reason:"player_data_missing"};
  const key=String(chronicleRef||"");const snapshot=root.snapshots[key];if(!snapshot)return{success:false,reason:"arc1_entitlement_snapshot_missing",chronicleRef:key};
  if(root.grants[key])return{success:true,idempotent:true,receipt:freezeClone(root.grants[key])};
  let ryoGranted=0;const itemGrants=[];
  for(const entitlement of snapshot.entitlements||[]){
    const grantKey=`${key}::${String(entitlement.entitlementId||"")}`;
    if(root.entitlementGrants[grantKey])continue;
    if(entitlement.type==="RYO"){
      const amount=Number(entitlement.amount||0);if(!(amount>=0))return{success:false,reason:"snapshot_ryo_entitlement_invalid",entitlementId:entitlement.entitlementId};
      globalThis.playerData.ryo=Number(globalThis.playerData.ryo||0)+amount;ryoGranted+=amount;
      root.entitlementGrants[grantKey]={type:"RYO",amount,committed:true};save();continue;
    }
    if(entitlement.type==="ITEM"){
      const granted=grantItem(entitlement.itemId);if(!granted.success){save();return{success:false,reason:granted.reason,detail:granted,pendingEntitlementId:entitlement.entitlementId,ryoGranted};}
      root.entitlementGrants[grantKey]={type:"ITEM",itemId:entitlement.itemId,grant:clone(granted),committed:true};itemGrants.push(clone(granted));save();continue;
    }
    return{success:false,reason:"snapshot_entitlement_type_invalid",entitlementId:entitlement.entitlementId};
  }
  const receipt={schema:SNAPSHOT_SCHEMA,grantRef:`arc1_debrief_reward_grant:${key}`,snapshotRef:snapshot.snapshotRef,chronicleRef:key,totalRyo:Number(snapshot.totalRyo||0),itemIds:(snapshot.entitlements||[]).filter(row=>row.type==="ITEM").map(row=>String(row.itemId)),committed:true};
  root.grants[key]=receipt;save();return{success:true,idempotent:false,ryoGranted,itemGrants,receipt:freezeClone(receipt)};
}
function projectArc1Debrief(chronicleRef){
  const root=ensurePersistence();if(!root)return{success:false,reason:"player_data_missing"};
  const key=String(chronicleRef||""),snapshot=root.snapshots[key];if(!snapshot)return{success:false,reason:"arc1_entitlement_snapshot_missing",chronicleRef:key};
  return{success:true,snapshot:freezeClone(snapshot),grantReceipt:root.grants[key]?freezeClone(root.grants[key]):null};
}
function diagnostics(){
  const checks={schemaExact:EVALUATION_SCHEMA==="sc.rewardEvaluation.v1"&&SNAPSHOT_SCHEMA==="sc.rewardEntitlementSnapshot.v1",evaluatorExact:EVALUATOR_ID==="reward_eval_arc1_completion_debrief_v1",authorityExact:AUTHORITY_COMMIT==="d2a09e751f8e117801c3b51dd445517b0cc50d03",perChroniclePersistence:commitArc1EntitlementSnapshot.toString().includes("root.snapshots[key]"),canonicalInventory:grantItem.toString().includes("getItemDefinition")&&grantItem.toString().includes("addItemToInventory"),noProgressionMutation:!["addDisciplineExp","specialisation","Special Jōnin","mastery","rank","powerLevel"].some(token=>grantArc1Entitlement.toString().includes(token)),browserGoldenClaimed:false};
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.SC_ARC1_REWARD_EVALUATION_35400=Object.freeze({
  patchId:PATCH_ID,evaluationSchema:EVALUATION_SCHEMA,snapshotSchema:SNAPSHOT_SCHEMA,evaluatorId:EVALUATOR_ID,authorityCommit:AUTHORITY_COMMIT,
  evaluateArc1Entitlement,commitArc1EntitlementSnapshot,getCommittedSnapshot,grantArc1Entitlement,projectArc1Debrief,registerRewardPoolResolver,diagnostics
});
})();
