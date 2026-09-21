#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const cp=require("child_process");
const assert=require("assert");
const root=path.resolve(__dirname,"..");
const read=rel=>fs.readFileSync(path.join(root,rel),"utf8");
const exists=rel=>fs.existsSync(path.join(root,rel));
const manifest=JSON.parse(read("tools/fixtures/academy_kakashi_end_to_end_route_manifest_36000.json"));

const REQUIRED_ROUTE_IDS=[
  "watch.stop_assassin",
  "watch.secure_package",
  "watch.secure_package_before_assassin",
  "watch.defeat_assassin_then_secure",
  "watch.go_after_original_target",
  "move_closer.success.let_handoff_happen",
  "move_closer.success.strike_before_handoff",
  "move_closer.success.attempt_pickpocket",
  "move_closer.failure.stay_on_package",
  "move_closer.failure.stop_package_smuggler",
  "move_closer.failure.cut_off_sakura",
  "direct.strike_before_handoff",
  "direct.slip_in_for_package"
];
const REQUIRED_BOUNDARIES=[
  "currentBeat",
  "availableChoices",
  "resolverOutcome",
  "battleCallerConfig",
  "battleClaim",
  "storyReturn",
  "packageHolder",
  "miState",
  "psState",
  "amtState",
  "pakkunState",
  "custodyState",
  "rewardState",
  "receiptFacts",
  "completionState"
];
const REQUIRED_SAVELOAD_KEYS=[
  "beforeDecisionAfterResolver",
  "beforeBattleAfterClaimBeforeStoryReturn",
  "afterRestraintDuringCaptiveCollection",
  "rewardIdempotence",
  "beforeReportAfterRewardAtReceipt",
  "afterOriginCompletionAndOnboarding"
];

assert.strictEqual(manifest.schema,"shinobi-chronicles.academy-kakashi.end-to-end-route-manifest.v1");
assert.deepStrictEqual(manifest.routes.map(r=>r.id),REQUIRED_ROUTE_IDS,"Kakashi route manifest drifted");
assert.strictEqual(manifest.browserGoldenClaimed,false);

const proofFiles=new Set();
for(const route of manifest.routes){
  assert.strictEqual(route.completionTail,"COMMON_TERMINAL_TAIL","route lost common terminal convergence: "+route.id);
  assert.strictEqual(route.saveLoadRequired,true,"route lost save/load requirement: "+route.id);
  assert(route.boundaryProofs&&typeof route.boundaryProofs==="object","route boundary proof map missing: "+route.id);
  for(const boundary of REQUIRED_BOUNDARIES){
    const refs=route.boundaryProofs[boundary];
    assert(Array.isArray(refs)&&refs.length>0,route.id+" missing boundary proof: "+boundary);
    for(const ref of refs){
      assert(exists(ref),route.id+" boundary proof file missing: "+ref);
      proofFiles.add(ref);
    }
  }
}
for(const key of REQUIRED_SAVELOAD_KEYS){
  const ref=manifest.saveLoadProofs&&manifest.saveLoadProofs[key];
  assert(typeof ref==="string"&&exists(ref),"save/load proof missing: "+key);
  proofFiles.add(ref);
}

function sourceHas(rel,...markers){
  const src=read(rel);
  for(const marker of markers)assert(src.includes(marker),rel+" missing deterministic force marker: "+marker);
  return src;
}

// Resolver SUCCESS / FAILURE and pursuit reached / lost are explicit, committed, and replay-stable.
sourceHas("tools/qa_academy_kakashi_get_closer_factual_commit.js",
  'forceOutcome("GET_CLOSER_SUCCESS"',
  'forceOutcome("GET_CLOSER_FAILURE"',
  'assertStayPackageCommittedOutcome("PURSUIT_SUCCESS_AMT_REACHED"',
  'assertStayPackageCommittedOutcome("PURSUIT_FAILURE_AMT_ESCAPES_WITH_PACKAGE"',
  '"save/load rerolled Get Closer outcome"'
);

// Battle victory / defeat and exact turn windows are forced in the Stop-Assassin branch.
sourceHas("tools/qa_academy_kakashi_scene05a_w_35730.js",
  'battleResult("opposition_side_victory",3)',
  'battleResult("player_side_victory",3)',
  'battleResult("player_side_victory",4)',
  'battleResult("player_side_victory",5)'
);

// Post-MI PS/AMT chain forces exact Battle return outcomes, package state, Pakkun state and institutional custody timing.
sourceHas("tools/qa_academy_kakashi_post_mi_death_pursuit_35830.js",
  'resultState:"player_side_victory"',
  'resultState:"opposition_side_victory"',
  'pakkunAuthorized,true',
  'currentHolderClass:"KAKASHI"',
  'currentHolderClass:"PACKAGE_SMUGGLER"',
  'ANBU_INSTITUTIONAL_CUSTODY',
  'UCHIHA_POLICE_INSTITUTIONAL_CUSTODY'
);

// Direct and Original-Target routes force exact Battle configurations and both win/loss outcomes.
sourceHas("tools/qa_academy_kakashi_konoha_route_closure_35910.js",
  'academy_kakashi_origin_battle_amt_ps_2v1',
  'academy_kakashi_origin_battle_mi_1v1',
  'resultState:"player_side_victory"',
  'resultState:"opposition_side_victory"',
  'pakkunAuthorized,true',
  'pakkunAuthorized,false'
);

// Repaired Secure-Package continuation is part of the executable graph, including
// STAY ON THE FIRST MAN -> Pakkun -> AMT Battle -> shared CE #256 loss handling.
sourceHas("runtime/alpha-kakashi-final-sequential-consumer-34410.js",
  '"STAY ON THE FIRST MAN"',
  'academy_kakashi_origin_battle_kakashi_pakkun_vs_amt',
  'resolveAmtReturnFacts34410("secure_package")',
  '"BATTLE_DEFEATED_UNRESOLVED"',
  '"ESCAPED"'
);
sourceHas("runtime/alpha-kakashi-konoha-writing-closure-35900.js",
  'resolveAmtDefeatFacts35900',
  'stateClass:"ESCAPED"'
);

// Direct failed Pickpocket 3-v-1 victory must expose all four locked dispositions;
// defeat must expose only RETURN TO ANBU and classify all three escaped.
sourceHas("runtime/alpha-kakashi-direct-opening-consumer-34710.js",
  '"TAKE THEM TO THE UCHIHA POLICE FORCE"',
  '"TAKE THEM TO THE ANBU"',
  '"KILL THEM"',
  '"TAKE THE PACKAGE AND LET THEM GO"',
  '"RETURN TO ANBU"',
  'BATTLE_DEFEATED_UNRESOLVED',
  '"ESCAPED"'
);
sourceHas("tools/qa_academy_kakashi_scene02_direct_choices_34710.js",
  '"3-v-1 victory choice surface does not exactly match locked Writing"',
  '"3-v-1 defeat exposed victory dispositions or lost RETURN TO ANBU"'
);

// Move-In-Closer failures and improved Pickpocket explicitly force resolver/Battle variants.
sourceHas("tools/qa_academy_kakashi_move_closer_closure_35930.js",
  'PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1',
  'academy_kakashi_origin_battle_amt_ps_2v1',
  'academy_kakashi_origin_battle_ps_1v1',
  'resultState:"player_side_victory"',
  'pakkunBattleActionAuthorized,false'
);

// Field-secured collection forces both institutional destinations and explicit Pakkun departure.
sourceHas("tools/qa_academy_kakashi_field_secured_35920.js",
  'ANBU_INSTITUTIONAL_CUSTODY',
  'UCHIHA_POLICE_INSTITUTIONAL_CUSTODY',
  'stateClass,"DEPARTED"',
  'custodyClass,"ANBU"'
);

// Terminal save/load and idempotence are executable, not documentation-only.
sourceHas("tools/qa_kakashi_terminal_debrief_35100.js",
  'reloadQaState("before-terminal-report")',
  'reloadQaState("after-terminal-report-before-reward")',
  'reloadQaState("after-reward-at-receipt")',
  'commitChronicleReceiptAndRewards()',
  'guardedOriginCompletion()'
);
sourceHas("tools/qa_academy_kakashi_completion_tail_36000.js",
  'selectChronicleOrigin("academy_kakashi"',
  'completeChronicleOriginPrologue("academy_kakashi"',
  'academy_first_konoha_tutorial_pending',
  'academy_free_play'
);

function run(rel){
  const proc=cp.spawnSync(process.execPath,[path.join(root,rel)],{
    cwd:root,
    encoding:"utf8",
    timeout:180000,
    maxBuffer:24*1024*1024,
    env:{...process.env,SC_KAKASHI_DETERMINISTIC_TRAVERSAL:"1"}
  });
  if(proc.status!==0){
    process.stderr.write("\n[KAKASHI DETERMINISTIC TRAVERSAL FAILURE] "+rel+"\n");
    process.stderr.write(proc.stdout||"");
    process.stderr.write(proc.stderr||"");
    throw new Error("deterministic Kakashi proof failed: "+rel);
  }
  return {file:rel,pass:true};
}

// The matrix executes every route-owned focused harness. The seam harnesses below
// are then executed explicitly so the traversal entry point owns persistence and
// terminal/free-play proof instead of merely trusting matrix metadata.
const results=[];
results.push(run("tools/qa_academy_kakashi_end_to_end_route_matrix_36000.js"));
for(const rel of [...new Set(Object.values(manifest.saveLoadProofs||{}))])results.push(run(rel));
results.push(run("tools/qa_kakashi_terminal_debrief_35100.js"));
results.push(run("tools/qa_academy_kakashi_completion_tail_36000.js"));
results.push(run("tools/qa_academy_kakashi_runtime_owner_map_36100.js"));

const routeReport=manifest.routes.map(route=>({
  id:route.id,
  family:route.family,
  forcedVariations:route.variations.length,
  boundaryCount:REQUIRED_BOUNDARIES.length,
  boundaryProofs:Object.fromEntries(REQUIRED_BOUNDARIES.map(key=>[key,route.boundaryProofs[key]])),
  completionTail:route.completionTail,
  saveLoadRequired:route.saveLoadRequired,
  pass:true
}));

console.log(JSON.stringify({
  pass:true,
  kind:"academy_kakashi_deterministic_full_route_traversal_36200",
  routeCount:routeReport.length,
  variationCount:routeReport.reduce((n,row)=>n+row.forcedVariations,0),
  requiredBoundaryCount:REQUIRED_BOUNDARIES.length,
  resolverForcing:{success:true,failure:true},
  pursuitForcing:{success:true,failure:true},
  battleForcing:{victory:true,defeat:true},
  turnWindowForcing:{three:true,four:true,five:true},
  packageStateForcing:true,
  participantDispositionForcing:true,
  pakkunStateForcing:true,
  institutionalCustodyForcing:{anbu:true,uchihaPolice:true},
  saveLoadSeams:REQUIRED_SAVELOAD_KEYS,
  commonTerminalTail:true,
  academyFreePlay:true,
  routeReport,
  executed:results,
  browserGoldenClaimed:false
},null,2));
