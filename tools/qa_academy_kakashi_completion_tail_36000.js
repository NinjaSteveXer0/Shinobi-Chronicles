#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const storage=new Map(),session=new Map();
const store=map=>({getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k),clear:()=>map.clear()});
const dummy=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},insertBefore(){},remove(){},setAttribute(){},getAttribute(){return null;},querySelector(){return null;},querySelectorAll(){return[];},addEventListener(){},removeEventListener(){},focus(){},click(){},innerHTML:"",textContent:"",value:"",checked:false,disabled:false,firstChild:null,firstElementChild:null});
const context={
 console:{log(){},info(){},warn(){},error(){},table(){}},
 localStorage:store(storage),sessionStorage:store(session),
 document:{readyState:"complete",getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return[];},createElement(){return dummy();},body:dummy(),head:dummy(),addEventListener(){},removeEventListener(){}},
 requestAnimationFrame(){return 0;},cancelAnimationFrame(){},alert(){},confirm(){return true;},prompt(){return null;},Image:function(){return dummy();},
 navigator:{userAgent:"node-kakashi-completion-tail-36000"},location:{reload(){},href:"http://localhost/"},addEventListener(){},removeEventListener(){},
 setTimeout,clearTimeout,setInterval,clearInterval,Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,Infinity,NaN
};
context.window=context;context.globalThis=context;vm.createContext(context);
const run=(src,file)=>vm.runInContext(src,context,{filename:file});
const plain=(expr,file="qa-kakashi-tail-expression.js")=>JSON.parse(JSON.stringify(run(expr,file)));

run(read("game.js"),"game.js");
run(read("runtime/alpha-world-konoha-112-core.js"),"runtime/alpha-world-konoha-112-core.js");
run(read("runtime/alpha-world-konoha-112-fix.js"),"runtime/alpha-world-konoha-112-fix.js");
run(read("runtime/alpha-first-konoha-tutorial-35000.js"),"runtime/alpha-first-konoha-tutorial-35000.js");

function reload(label){
 return plain(`(()=>{savePlayerData();playerData=loadPlayerData();if(typeof setCharacterOwnershipRuntimeAuthority==="function")setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);if(typeof hydrateOwnedProductionRuntimeCharacters==="function")hydrateOwnedProductionRuntimeCharacters(playerData.characterOwnership);const s=ensurePlayerAcquisitionState(),f=s.academyTeamFormation||{},r=f.confirmationReceipt||null;return{label:${JSON.stringify(label)},origin:s.chronicleOriginVariantId,status:s.onboardingStatus,formationCompleted:f.completed===true,continuationCompleted:f.continuationCompleted===true,team:r&&Array.isArray(r.teamVariantIds)?[...r.teamVariantIds]:[],tutorial:typeof getFirstKonohaTutorialSnapshot35000==="function"?getFirstKonohaTutorialSnapshot35000():null,freePlay:typeof isAcademyFreePlayAvailable==="function"?isAcademyFreePlayAvailable():false,owned:[...(playerData.characterOwnership&&playerData.characterOwnership.ownedRegistryIds||[])].sort(),clan:[...(playerData.clan&&playerData.clan.teamSlots||[])]};})()`,label+".js");
}
function completionHistoryCount(){
 return run(`(playerData.activityHistory||[]).filter(x=>x&&x.committed===true&&String(x.id||"").startsWith("konoha_onboarding_first_team_orientation_completed_v1::")).length`);
}

run(`playerData=createDefaultPlayerData();setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);savePlayerData();`,"fresh-kakashi.js");
let out=plain(`selectChronicleOrigin("academy_kakashi","qa36000_kakashi_origin_selection")`,"select-kakashi.js");
assert.strictEqual(out.success,true,"Academy Kakashi Origin selection failed");

out=plain(`completeChronicleOriginPrologue("academy_kakashi",["qa36000_kakashi_terminal_receipt"])`,"complete-kakashi-origin.js");
assert.strictEqual(out.success,true,"Kakashi terminal continuation did not enter canonical Origin completion");
assert.strictEqual(out.academyTeamFormationRequired,true,"Kakashi completion did not require Academy Team Formation");

const candidates=plain(`getAcademyTeamFormationSnapshot().eligibleCandidateVariantIds.slice(0,2)`);
assert.strictEqual(candidates.length,2,"Kakashi did not receive two legitimate teammate candidates");
assert.strictEqual(new Set(candidates).size,2,"Kakashi teammate candidates duplicated");
assert(!candidates.includes("academy_kakashi"),"Kakashi appeared as his own teammate");

assert.strictEqual(plain(`selectAcademyTeamFormationTeammate(1,${JSON.stringify(candidates[0])})`).success,true);
assert.strictEqual(plain(`selectAcademyTeamFormationTeammate(2,${JSON.stringify(candidates[1])})`).success,true);
out=plain(`confirmAcademyTeamFormation("qa36000_kakashi_team_commit",${JSON.stringify(candidates)})`,"commit-kakashi-team.js");
assert.strictEqual(out.success,true);
assert.strictEqual(out.idempotent,false);

let state=reload("reload-after-kakashi-team");
assert.strictEqual(state.origin,"academy_kakashi");
assert.strictEqual(state.formationCompleted,true);
assert.deepStrictEqual(state.team,["academy_kakashi",...candidates],"Kakashi completion did not preserve exactly origin + two teammates");
assert.strictEqual(new Set(state.team).size,3);
assert.strictEqual(state.clan.filter(Boolean).length,3);
assert.strictEqual(state.freePlay,false,"Kakashi reached free play before first-Konoha boundary");

out=plain(`confirmAcademyTeamFormation("qa36000_kakashi_team_commit_repeat",${JSON.stringify(candidates)})`,"repeat-kakashi-team.js");
assert.strictEqual(out.success,true);
assert.strictEqual(out.idempotent,true,"Kakashi Team Formation retry duplicated commitment");

out=plain(`continueAcademyTeamFormationJourney()`,"kakashi-first-konoha.js");
assert.strictEqual(out.success,true);
assert.strictEqual(out.freePlayAuthorized,false);
assert.strictEqual(out.trackedDestination,"KON-P07");
state=reload("reload-kakashi-first-konoha-pending");
assert.strictEqual(state.status,"academy_first_konoha_tutorial_pending");
assert.strictEqual(state.tutorial.phase,"pending");
assert.deepStrictEqual(state.tutorial.squadMemberRefs,["academy_kakashi",...candidates]);
assert.strictEqual(state.freePlay,false);

assert.strictEqual(plain(`focusFirstKonohaTutorialHost35000("KON-P07")`).success,true);
assert.strictEqual(plain(`enterFirstKonohaTutorialCompound35000("KON-A02")`).success,true);
assert.strictEqual(plain(`beginFirstKonohaTutorialOrientation35000()`).success,true);
state=reload("reload-kakashi-orientation-started");
assert.strictEqual(state.tutorial.phase,"orientation_started");
assert.strictEqual(state.freePlay,false);

assert.strictEqual(plain(`resolveFirstKonohaTutorialObservation35000()`).success,true);
out=plain(`reportFirstKonohaTutorialReady35000()`,"kakashi-report-ready.js");
assert.strictEqual(out.success,true);
assert.strictEqual(out.idempotent,false);
assert.strictEqual(out.freePlayAuthorized,true);
assert.strictEqual(out.completionReceipt.receiptId,"konoha_onboarding_first_team_orientation_completed_v1");
assert.deepStrictEqual(out.completionReceipt.squadMemberRefs,["academy_kakashi",...candidates]);
assert.strictEqual(out.battleStarted,false);
assert.strictEqual(out.rewardGranted,false);
assert.strictEqual(completionHistoryCount(),1);

const after=reload("reload-kakashi-free-play");
assert.strictEqual(after.status,"academy_free_play");
assert.strictEqual(after.continuationCompleted,true);
assert.strictEqual(after.freePlay,true);
assert.strictEqual(after.tutorial.completed,true);
assert.deepStrictEqual(after.team,["academy_kakashi",...candidates]);
assert.strictEqual(completionHistoryCount(),1);

const readyAgain=plain(`reportFirstKonohaTutorialReady35000()`,"kakashi-report-ready-repeat.js");
assert.strictEqual(readyAgain.success,true);
assert.strictEqual(readyAgain.idempotent,true);
assert.strictEqual(completionHistoryCount(),1,"Kakashi first-Konoha completion duplicated on retry");

const continueAgain=plain(`continueAcademyTeamFormationJourney()`,"kakashi-free-play-repeat.js");
assert.strictEqual(continueAgain.success,true);
assert.strictEqual(continueAgain.idempotent,true);
assert.strictEqual(continueAgain.freePlayAuthorized,true);
assert.strictEqual(completionHistoryCount(),1);

console.log(JSON.stringify({
 pass:true,
 origin:"academy_kakashi",
 exactlyTwoTeammates:true,
 exactThreePersonSquad:true,
 reloadAfterTeam:true,
 firstKonohaPendingBeforeFreePlay:true,
 reloadDuringFirstKonoha:true,
 firstKonohaCompletionReceipt:"konoha_onboarding_first_team_orientation_completed_v1",
 completionHistoryExactlyOnce:true,
 reloadAfterFreePlay:true,
 academyFreePlay:true,
 browserGoldenClaimed:false
},null,2));
