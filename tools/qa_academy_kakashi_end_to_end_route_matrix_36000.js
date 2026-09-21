#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert"),cp=require("child_process");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const exists=p=>fs.existsSync(path.join(root,p));
const manifest=JSON.parse(read("tools/fixtures/academy_kakashi_end_to_end_route_manifest_36000.json"));

assert.strictEqual(manifest.schema,"shinobi-chronicles.academy-kakashi.end-to-end-route-manifest.v1");
assert.strictEqual(manifest.browserGoldenClaimed,false);
assert(Array.isArray(manifest.routes)&&manifest.routes.length===13,"route manifest must contain the 13 current root/subroute families");
assert.deepStrictEqual([...new Set(manifest.routes.map(r=>r.family))].sort(),["DIRECT ROOT","MOVE IN CLOSER","WATCH THE EXCHANGE"]);
assert.deepStrictEqual(manifest.routes.filter(r=>r.family==="WATCH THE EXCHANGE").map(r=>r.id),[
 "watch.stop_assassin",
 "watch.secure_package",
 "watch.secure_package_before_assassin",
 "watch.defeat_assassin_then_secure",
 "watch.go_after_original_target"
]);
assert.deepStrictEqual(manifest.routes.filter(r=>r.family==="MOVE IN CLOSER").map(r=>r.id),[
 "move_closer.success.let_handoff_happen",
 "move_closer.success.strike_before_handoff",
 "move_closer.success.attempt_pickpocket",
 "move_closer.failure.stay_on_package",
 "move_closer.failure.stop_package_smuggler",
 "move_closer.failure.cut_off_sakura"
]);
assert.deepStrictEqual(manifest.routes.filter(r=>r.family==="DIRECT ROOT").map(r=>r.id),[
 "direct.strike_before_handoff",
 "direct.slip_in_for_package"
]);

for(const [ownerClass,files] of Object.entries(manifest.canonicalOwners)){
 assert(Array.isArray(files)&&files.length>0,"canonical owner class empty: "+ownerClass);
 for(const file of files)assert(exists(file),"canonical owner missing: "+ownerClass+" -> "+file);
}
for(const route of manifest.routes){
 assert(route.id&&route.family&&Array.isArray(route.entry)&&route.entry.length>0,"route identity incomplete");
 assert(Array.isArray(route.owners)&&route.owners.length>0,"route owner missing: "+route.id);
 assert(Array.isArray(route.variations)&&route.variations.length>0,"route variations missing: "+route.id);
 assert(Array.isArray(route.qa)&&route.qa.length>0,"route QA missing: "+route.id);
 assert.strictEqual(route.completionTail,"COMMON_TERMINAL_TAIL","route does not explicitly converge to common completion tail: "+route.id);
 assert.strictEqual(route.saveLoadRequired,true,"route is missing save/load requirement: "+route.id);
 for(const file of [...route.owners,...route.qa])assert(exists(file),"route file missing for "+route.id+": "+file);
}

const expectedAxes=["resolver","pursuit","battle","package","participant","institution","pakkun","knowledge","reward"];
assert.deepStrictEqual(Object.keys(manifest.coverageAxes),expectedAxes);
for(const key of expectedAxes)assert(Array.isArray(manifest.coverageAxes[key])&&manifest.coverageAxes[key].length>0,"coverage axis empty: "+key);
for(const boundary of [
 "ACTIVE_STORY_CHOICE","BATTLE_CALLER_CONTEXT","POST_CLAIM_PRE_RETURN","POST_BATTLE_FACTUAL_RETURN",
 "FIELD_SECURED_COLLECTION","TERMINAL_DEBRIEF_PRE_RECEIPT","REWARD_RECEIPT_COMMITTED",
 "TEAM_FORMATION_COMMITTED","FIRST_KONOHA_PENDING","ACADEMY_FREE_PLAY"
])assert(manifest.saveLoadBoundaries.includes(boundary),"save/load boundary missing: "+boundary);

const integrator=read("runtime/alpha-origin-scenes-32900-integrator.js");
const storyDecision=read("runtime/alpha-story-decision-realisation-34000.js");
const loader=read("runtime/alpha-kakashi-final-origin-adapter-34100.js");
const restoration=read("runtime/alpha-kakashi-original-origin-restoration-33800.js");
const traversal=read("runtime/alpha-traversal-bridge-33200.js");
assert(/script\.src="runtime\/alpha-story-decision-realisation-34000\.js\?sc=story-decision-20260922-23";/.test(integrator),"active root Story delivery is not generation 22");
assert(/script\.src="runtime\/alpha-kakashi-final-origin-adapter-34100\.js\?sc=kakashi-final-20260922-95";/.test(storyDecision),"active Kakashi parent delivery is not gen94");
assert(/^const BUILD="kakashi-final-20260922-95";$/m.test(loader),"active Kakashi loader is not gen94");
assert(/^\s*const BUILD="scene-board-20260922-20";$/m.test(restoration),"active Scene Board restoration delivery is not generation 19");
assert(/^const SCENE_BOARD_BUILD="scene-board-20260922-20";$/m.test(traversal),"active traversal Scene Board delivery is not generation 19");
assert(!restoration.includes("alpha-kakashi-story-presentation-compat-33920.js"),"retired 33920 returned to production load path");
const sceneBoardSource=read("runtime/alpha-story-scene-board-33900.js");
assert(sceneBoardSource.includes('#story-scene-presentation-layer[data-sc-scene-board="true"]{background:#020508!important;}'),"Story Scene Board can fail open onto World UI");
assert(!sceneBoardSource.includes('#story-scene-presentation-layer[data-sc-scene-board="true"]{background:transparent!important;}'),"transparent Story Scene Board root reintroduced");
assert(sceneBoardSource.includes('layer.dataset.scSceneBoardBackdrop=path?"dedicated":"fallback"')&&sceneBoardSource.includes('layer.style.setProperty("--sc-scene-board-backdrop",cssUrlValue(path))'),"full-screen Story backdrop ownership missing");

const terminal=read("runtime/alpha-kakashi-terminal-debrief-35100.js");
for(const marker of [
 'const PENDING_BEAT="kak_seq_debrief_pending"',
 'const MINATO_BEAT="kak_terminal_minato_private_evaluation_35100"',
 'const RECEIPT_BEAT="kak_terminal_chronicle_receipt_35100"',
 'const FINAL_BEAT="kak_terminal_chronicle_begins_35100"',
 'text:"YOUR CHRONICLE BEGINS"',
 "commitChronicleReceiptAndRewards35100",
 "guardedOriginCompletion35100",
 "completeChronicleOriginPrologue(ORIGIN_ID,ids)"
])assert(terminal.includes(marker),"terminal completion marker missing: "+marker);

const reward=read("runtime/alpha-kakashi-origin-rewards-34800.js");
const development=read("runtime/alpha-kakashi-battle-development-35740.js");
for(const marker of [
 'academy_kakashi_origin_battle_seq_ps:Object.freeze',
 'academy_kakashi_origin_battle_seq_amt_pakkun:Object.freeze',
 'ryo:50',
 'ACTION_DERIVED_DISCIPLINE_SOURCE="action_derived_development"'
])assert(reward.includes(marker),"reward owner marker missing: "+marker);
assert(development.includes("THREE_V_ONE_DEFERRED_RYO")&&development.includes('THREE_V_ONE_TANTO_ID="academy_training_tanto"'),"3v1 deferred reward contract missing");
assert(development.includes("requiresExplicitPostClaimContinue"),"explicit reward-claim/Story-return boundary missing");

const firstKonoha=read("runtime/alpha-first-konoha-tutorial-35000.js");
assert(firstKonoha.includes('const FREE_PLAY_STATUS="academy_free_play"'));
assert(firstKonoha.includes('COMPLETION_RECEIPT_ID="konoha_onboarding_first_team_orientation_completed_v1"'));
assert(firstKonoha.includes('freePlayAfterReceipt:reportReady.toString().indexOf("row.completionReceipt=completion")<reportReady.toString().indexOf("state.onboardingStatus=FREE_PLAY_STATUS")'),"35000 must diagnose receipt-before-free-play inside reportReady");

const routeSource={
 stopAssassin:read("runtime/alpha-kakashi-post-mi-death-pursuit-35830.js"),
 routeClosure:read("runtime/alpha-kakashi-konoha-route-closure-35910.js"),
 moveCloser:read("runtime/alpha-kakashi-move-closer-closure-35930.js"),
 direct:read("runtime/alpha-kakashi-direct-opening-consumer-34710.js"),
 field:read("runtime/alpha-kakashi-field-secured-35920.js"),
 pakkun:read("runtime/alpha-kakashi-pakkun-interception-35300.js")
};
for(const marker of ["scene05aw_go_after_package_smuggler","scene05aw_go_after_anbu_marked_target","academy_kakashi_origin_battle_seq_ps","academy_kakashi_origin_battle_seq_amt_pakkun","RESTRAIN HIM AND COLLECT THE OTHERS"])assert(routeSource.stopAssassin.includes(marker),"post-MI route marker missing: "+marker);
for(const marker of ["academy_kakashi_origin_battle_amt_ps_2v1","academy_kakashi_origin_battle_mi_1v1","TAKE THEM TO THE UCHIHA POLICE FORCE","TAKE THE PACKAGE AND LET THEM GO","SECURE_BEFORE_SUCCESS_CLEAN_EXTRACTION","GO AFTER THE ORIGINAL TARGET"])assert(routeSource.routeClosure.includes(marker),"route-closure marker missing: "+marker);
for(const marker of ["LET THE HANDOFF HAPPEN","ATTEMPT THE PICKPOCKET","STOP PACKAGE SMUGGLER","CUT THEM OFF AT THE SAKURA TREE","PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1"])assert(routeSource.moveCloser.includes(marker),"move-closer marker missing: "+marker);
for(const marker of ["PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION","PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1","academy_kakashi_origin_battle_amt_ps_mi_3v1"])assert(routeSource.direct.includes(marker),"direct Pickpocket marker missing: "+marker);
for(const marker of ["FIELD_SECURED_PENDING_COLLECTION","COLLECTED_ACTIVE_ESCORT","TAKE THEM ALL BACK TO ANBU"])assert(routeSource.field.includes(marker),"field-secured marker missing: "+marker);
for(const marker of ["DEMAND THE PACKAGE","TAKE HIM DOWN","BRING HIM TO THE UCHIHA POLICE FORCE","LET HIM GO","KILL HIM","TAKE HIM BACK TO THE ANBU"])assert(routeSource.pakkun.includes(marker),"Pakkun route marker missing: "+marker);

const qaFiles=[...new Set([
 ...manifest.routes.flatMap(r=>r.qa),
 ...manifest.globalQa,
 "tools/qa_academy_kakashi_scene03a_35700.js",
 "tools/qa_academy_kakashi_field_secured_35920.js",
 "tools/qa_kakashi_terminal_debrief_35100.js"
])];

const results=[];
for(const rel of qaFiles){
 assert(exists(rel),"matrix QA target missing: "+rel);
 const run=cp.spawnSync(process.execPath,[path.join(root,rel)],{
   cwd:root,encoding:"utf8",timeout:120000,maxBuffer:16*1024*1024,
   env:{...process.env,SC_KAKASHI_ONE_SWOOP_MATRIX:"1"}
 });
 if(run.status!==0){
   process.stderr.write("\n[KAKASHI MATRIX FAILURE] "+rel+"\n");
   process.stderr.write(run.stdout||"");
   process.stderr.write(run.stderr||"");
   throw new Error("Kakashi one-swoop QA failed: "+rel);
 }
 results.push({file:rel,pass:true});
}

const passed=new Set(results.map(r=>r.file));
const routeRows=manifest.routes.map(route=>({
 id:route.id,
 family:route.family,
 variationCount:route.variations.length,
 battles:(route.battles||[]).length,
 qa:route.qa,
 pass:route.qa.every(file=>passed.has(file))
}));
assert(routeRows.every(row=>row.pass),"not every manifest route has executable GREEN QA");
for(const proof of manifest.commonTerminalTail.compatibilityProofs||[])assert(passed.has(proof),"common terminal-tail compatibility proof did not run: "+proof);
assert(passed.has("tools/qa_academy_kakashi_completion_tail_36000.js"),"Kakashi-specific completion tail did not run");

console.log(JSON.stringify({
 pass:true,
 campaign:"Kakashi one-swoop end-to-end completion",
 campaignBaselineHead:manifest.campaignBaselineHead,
 routeCount:routeRows.length,
 variationCount:routeRows.reduce((n,row)=>n+row.variationCount,0),
 qaHarnessCount:results.length,
 routeMatrix:routeRows,
 deliveryParity:{
   storyDecision:"story-decision-20260922-23",
   kakashiFinal:"kakashi-final-20260922-95",
   sceneBoard:"scene-board-20260922-20"
 },
 terminalTail:manifest.commonTerminalTail.required,
 saveLoadBoundaries:manifest.saveLoadBoundaries,
 browserGoldenClaimed:false
},null,2));
