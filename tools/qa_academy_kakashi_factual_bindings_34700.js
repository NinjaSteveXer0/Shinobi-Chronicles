const fs=require('fs');
const vm=require('vm');
const path=require('path');

function load(rel){const abs=path.resolve(process.cwd(),rel);vm.runInThisContext(fs.readFileSync(abs,'utf8'),{filename:rel});}
function assert(condition,message){if(!condition)throw new Error(message);}

globalThis.playerData={};
globalThis.savePlayerData=()=>true;

load('runtime/alpha-story-factual-resolver-34600.js');
load('runtime/alpha-kakashi-factual-bindings-34700.js');

const api=globalThis.SC_ALPHA_KAKASHI_FACTUAL_BINDINGS_34700;
assert(api,'34700 API missing');
const diag=globalThis.runAcademyKakashiFactualBindings34700Diagnostics();
assert(diag&&diag.pass===true,`34700 diagnostics failed: ${JSON.stringify(diag&&diag.failed||[])}`);

const provider=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
const bindings=provider.getRegisteredStoryFactualBindings();
const byRef=new Map(bindings.map(row=>[row.bindingRef,row]));
assert(byRef.size===11,`expected 11 Kakashi factual bindings, got ${byRef.size}`);
assert(!byRef.has('academy_kakashi.resolver.secure_package_before_assassin'),'unclosed exact envelope must stay fail-closed');
assert(!byRef.has('academy_kakashi.resolver.pursue_original_target'),'unclosed exact envelope must stay fail-closed');
assert(byRef.has('academy_kakashi.resolver.secure_package_amt_pursuit'),'secure-package AMT pursuit envelope missing');

function resolve(bindingRef,eligibleOutcomeRefs,key){
  return provider.resolveStoryFactualAction({storyDecisionReceiptId:`decision:${key}`,bindingRef,actorRef:'academy_kakashi',intentCommitRef:`intent:${key}`,attemptOrdinal:1,idempotenceKey:`idem:${key}`,eligibleOutcomeRefs,authorityVersionRefs:['qa-kakashi-34700'],committedAtOccurrenceRef:'occ_origin_kakashi_qa'});
}

const handoff=resolve('academy_kakashi.story_fixed.let_handoff_happen',null,'get-closer-handoff');
assert(handoff.success===true,'Get Closer handoff did not resolve');
assert(handoff.receipt.resolutionMode==='deterministic_single','Get Closer handoff must be deterministic');
assert(handoff.receipt.selectedOutcomeRef==='GET_CLOSER_SUCCESS_HANDOFF_COMPLETED','wrong Get Closer handoff outcome');
assert(handoff.result.handoffCompleted===true,'Get Closer handoff did not complete transfer');
assert(handoff.result.packageCustody==='PACKAGE_SMUGGLER','Get Closer handoff did not move package to Package Smuggler');
assert(handoff.result.retainsGetCloserKnowledge===true,'Get Closer handoff lost fuller Knowledge');
assert(handoff.result.maskedInterceptorVisible===true,'MI should become visible only after completed transfer');
assert(handoff.result.battleRequired===false,'Get Closer handoff invented Battle');
assert(handoff.result.nextDecisionPointRef==='OBSERVE_ESCALATION','Get Closer handoff did not reach Observe escalation');

const directFail=resolve('academy_kakashi.resolver.pickpocket_direct',['PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1'],'direct-fail');
assert(directFail.success===true,'direct Pickpocket failure did not resolve');
assert(directFail.receipt.selectedOutcomeRef==='PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1','wrong direct failure outcome');
assert(directFail.result.battleConfigId==='academy_kakashi_origin_battle_amt_ps_mi_3v1','direct failure must use exact 3v1 Combat config');
assert(directFail.result.pakkunPresent===false,'direct failure must not create Pakkun');
assert(directFail.result.maskedInterceptorVisible===true,'direct failure branch-specific MI appearance missing');

const replay=resolve('academy_kakashi.resolver.pickpocket_direct',['PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION'],'direct-fail');
assert(replay.success===true&&replay.idempotent===true,'same idempotence key must replay');
assert(replay.receipt.selectedOutcomeRef==='PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1','replay rerolled factual outcome');

const improvedFail=resolve('academy_kakashi.resolver.pickpocket_improved',['PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1'],'improved-fail');
assert(improvedFail.success===true,'improved Pickpocket failure did not resolve');
assert(improvedFail.result.battleConfigId==='academy_kakashi_origin_battle_amt_ps_2v1','improved failure must use exact 2v1 Combat config');
assert(improvedFail.result.maskedInterceptorVisible===false,'MI leaked into improved-position failure');
assert(improvedFail.result.pakkunPresent===false,'Pakkun leaked into improved-position failure');

const pursuitFail=resolve('academy_kakashi.resolver.stay_on_package_pursuit',['PURSUIT_FAILURE_AMT_ESCAPES_WITH_PACKAGE'],'pursuit-fail');
assert(pursuitFail.success===true,'pursuit failure did not resolve');
assert(pursuitFail.result.amtReached===false&&pursuitFail.result.pakkunPresent===false,'Pakkun must require legitimate downstream reach');
const pursuitSuccess=resolve('academy_kakashi.resolver.stay_on_package_pursuit',['PURSUIT_SUCCESS_AMT_REACHED'],'pursuit-success');
assert(pursuitSuccess.success===true,'pursuit success did not resolve');
assert(pursuitSuccess.result.amtReached===true&&pursuitSuccess.result.pakkunPresent===true,'legitimate AMT reach must carry Pakkun presence');

const securePursuitFail=resolve('academy_kakashi.resolver.secure_package_amt_pursuit',['SECURE_PACKAGE_AMT_PURSUIT_FAILURE_ESCAPED'],'secure-pursuit-fail');
assert(securePursuitFail.success===true,'secure-package pursuit failure did not resolve');
assert(securePursuitFail.result.packageCustody==='KAKASHI','secure-package pursuit failure lost package custody');
assert(securePursuitFail.result.amtReached===false&&securePursuitFail.result.amtEscaped===true&&securePursuitFail.result.pakkunPresent===false,'secure-package pursuit failure facts wrong');
assert(securePursuitFail.result.battleRequired===false,'secure-package pursuit failure invented Battle');
const securePursuitSuccess=resolve('academy_kakashi.resolver.secure_package_amt_pursuit',['SECURE_PACKAGE_AMT_PURSUIT_SUCCESS_REACHED'],'secure-pursuit-success');
assert(securePursuitSuccess.success===true,'secure-package pursuit success did not resolve');
assert(securePursuitSuccess.result.packageCustody==='KAKASHI','secure-package pursuit success lost package custody');
assert(securePursuitSuccess.result.amtReached===true&&securePursuitSuccess.result.pakkunPresent===true,'secure-package pursuit success must commit legitimate AMT reach + Pakkun');
assert(securePursuitSuccess.result.battleConfigId==='academy_kakashi_origin_battle_kakashi_pakkun_vs_amt','secure-package pursuit success must publish exact Pakkun-vs-AMT config');

for(const [bindingRef,outcomeRef] of [['academy_kakashi.resolver.disposition_police','DISPOSITION_POLICE'],['academy_kakashi.resolver.disposition_release','DISPOSITION_RELEASE'],['academy_kakashi.resolver.disposition_return_anbu','DISPOSITION_RETURN_ANBU']]){
  const row=resolve(bindingRef,[outcomeRef],outcomeRef.toLowerCase());
  assert(row.success===true&&row.receipt.resolutionMode==='deterministic_single',`${bindingRef} must be deterministic once state-eligible`);
}

const stableA=resolve('academy_kakashi.resolver.get_closer',null,'stable-get-closer');
const stableB=resolve('academy_kakashi.resolver.get_closer',null,'stable-get-closer');
assert(stableA.success===true&&stableB.success===true,'stable Get Closer draw failed');
assert(stableA.receipt.selectedOutcomeRef===stableB.receipt.selectedOutcomeRef,'stable occurrence-scoped draw rerolled');
assert(stableB.idempotent===true,'stable draw replay was not idempotent');

const loader=fs.readFileSync(path.resolve(process.cwd(),'runtime/alpha-kakashi-final-origin-adapter-34100.js'),'utf8');
assert(loader.includes('alpha-story-factual-resolver-34600.js'),'browser loader does not include 34600 provider');
assert(loader.includes('alpha-kakashi-factual-bindings-34700.js'),'browser loader does not include 34700 Kakashi bindings');
assert(loader.indexOf('loadFactualProvider')<loader.indexOf('function loadBattleInteraction')||loader.includes('loadFactualProvider();return;'),'factual loader seam missing');
assert(loader.includes('const BUILD="kakashi-final-20260917-17"'),'guarded tranche must track current Kakashi child cache identity');

console.log(JSON.stringify({pass:true,registeredBindingCount:byRef.size,handoffOutcome:handoff.receipt.selectedOutcomeRef,directFailureConfig:directFail.result.battleConfigId,improvedFailureConfig:improvedFail.result.battleConfigId,securePackagePursuitSuccess:securePursuitSuccess.receipt.selectedOutcomeRef,securePackagePursuitFailure:securePursuitFail.receipt.selectedOutcomeRef,stableGetCloserOutcome:stableA.receipt.selectedOutcomeRef,deferredExactEnvelopeBindings:api.deferredExactEnvelopeBindings,kakashiChildCacheIdentity:'kakashi-final-20260917-17',browserGoldenClaimed:false},null,2));
