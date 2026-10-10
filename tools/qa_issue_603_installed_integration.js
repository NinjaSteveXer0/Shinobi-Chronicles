#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const game=read("game.js");
const state=read("runtime/alpha-chronicle-state-manifest-43600.js");
const sprint=read("runtime/alpha-alpha-sprint-33100.js");
const bridge=read("runtime/alpha-traversal-bridge-33200.js");
const installed=read("runtime/alpha-promotion-installed-integration-60330.js");
const html=read("index.html");
const enemyFn=(game.match(/function executeEnemyAuthoredActionOpportunity\(\) \{[\s\S]*?\n\}/)||[""])[0];
const checks={
  promotionStateRegistered:state.includes('stateDomainId:"promotionState"')&&state.includes('promotionState:existing.promotionState'),
  canonicalCourierCallerDispatch:game.includes('returnContext.assessmentScenarioId==="academy_genin_missing_courier_dispatch_v1"')&&game.includes('courier.resumeFromCurrentBattle(returnContext)'),
  courierFeintAtCanonicalOpportunity:enemyFn.indexOf('expireRogueFeintAtActionOpportunity')>=0&&enemyFn.indexOf('expireRogueFeintAtActionOpportunity')<enemyFn.indexOf('const scheduler=evaluateEnemyActionScheduler();'),
  courierMidBattleRestore:read('runtime/alpha-promotion-courier-assessment-60310.js').includes('PRE_SAVE_TEST_STATE_60310')&&read('runtime/alpha-promotion-courier-assessment-60310.js').includes('PRE_RESTORE_TEST_STATE_60310'),
  no603GlobalChooserWrapper:!installed.includes('chooseEnemyAuthoredBattleAction=')&&!installed.includes('resumeBattleCallerAfterCompletion='),
  sprintPromotionRetired:!sprint.includes('openArenaPromotionSurface33100')&&sprint.includes('promotionOwnerRetiredTo603:true'),
  traversalKeepsRosterGate:bridge.includes('isIncompleteTransition33200(state)')&&bridge.includes('openInstalledPromotion60330(subjectId)')&&!bridge.includes('priorPromotion33200'),
  authorisedGeninAdapter:installed.includes('recordOwnedCharacterGeninPromotion(payload.stableCharacterId'),
  immutableChronicleSeedRef:installed.includes('chronicle_seed_ref_v1::${identity.runId}'),
  scopedPersistence:installed.includes('const existing=root.promotionState')&&installed.includes('root.promotionState[COURIER_STATE_KEY]')&&installed.includes('merged[COURIER_STATE_KEY]=clone(existing)')&&installed.includes('root.promotionState=merged')&&installed.includes('ensurePhase2ChronicleState43600({save:false})'),
  workerModulesLoaded:["alpha-promotion-core-60300.js","alpha-promotion-courier-assessment-60310.js","alpha-promotion-arena-ui-60320.js","alpha-promotion-installed-integration-60330.js"].every(x=>html.includes(x)),
  loaderBeforeTraversal:html.indexOf('alpha-promotion-installed-integration-60330.js')<html.indexOf('alpha-traversal-bridge-33200.js'),
  browserGoldenClaimedFalse:installed.includes('browserGoldenClaimed:false')
};
const failed=Object.entries(checks).filter(([,v])=>v!==true).map(([k])=>k);
console.log(JSON.stringify({pass:failed.length===0,checks,failed,browserGoldenClaimed:false},null,2));
if(failed.length)process.exit(1);
