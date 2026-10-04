#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const SRC=fs.readFileSync(path.join(ROOT,"runtime/alpha-chronicle-state-manifest-43600.js"),"utf8");
const INDEX=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");
let qaUuidCounter=0;
function qaUuid(){
  qaUuidCounter+=1;
  return "00000000-0000-4000-8000-"+String(qaUuidCounter).padStart(12,"0");
}

function boot(seed){
  const context={
    console:{log(){},info(){},warn(){},error(){}},
    playerData:JSON.parse(JSON.stringify(seed||{})),
    saveCount:0,
    savePlayerData(){context.saveCount+=1;},
    crypto:{randomUUID:qaUuid},
    Uint8Array,
    cloneProgressionData(v){return v==null?v:JSON.parse(JSON.stringify(v));}
  };
  context.globalThis=context;context.window=context;vm.createContext(context);
  vm.runInContext(SRC,context,{filename:"runtime/alpha-chronicle-state-manifest-43600.js"});
  return context;
}
function plain(v){return JSON.parse(JSON.stringify(v));}

assert(INDEX.includes('<script src="runtime/alpha-chronicle-state-manifest-43600.js"></script>'),"#436 manifest not production-loaded");
assert(INDEX.indexOf('src="game.js"')<INDEX.indexOf('src="runtime/alpha-chronicle-state-manifest-43600.js"'),"#436 manifest must load after canonical save runtime");

const teamSave={
  ryo:237,
  acquisition:{
    chronicleOriginVariantId:"academy_menma",
    chronicleOriginOwnedCharacterId:"owned_character_academy_menma",
    ninjaIdentityVariantId:"academy_menma",
    ninjaIdentityOwnedCharacterId:"owned_character_academy_menma",
    ninjaIdentityLocked:true,
    onboardingStatus:"academy_free_play",
    academyTeamFormation:{
      completed:true,
      continuationCompleted:true,
      confirmationReceipt:{
        commitId:"team_commit_436_a",
        originVariantId:"academy_menma",
        teamVariantIds:["academy_menma","academy_hinata","academy_kushina"]
      }
    }
  }
};
{
  const c=boot(teamSave);
  const manifest=plain(c.getChronicleStateManifest43600());
  assert.strictEqual(manifest.manifestId,"sc.phase2.chronicle_state_manifest.v1");
  assert.deepStrictEqual(manifest.domains.map(x=>x.stateDomainId),["currentTeam","tutorialProgress","chronicleIdentity","chronicleRunIdentity","currentRyo","disciplineDevelopment","characterStats","originParticipantContinuity","privateOriginHistory","shinobiRecordProjection"]);
  for(const row of manifest.domains){
    for(const key of ["stateDomainId","semanticOwner","canonicalWritePath","stableIdentityKey","savePath","schemaVersion","sourceOccurrenceIdFormat","idempotenceKeyFormat","derivedFields","projectionConsumers","migrationRule","resetRule","difficultyScope","inheritanceRule","devOverridePolicy","qaRefs"]){
      assert(Object.prototype.hasOwnProperty.call(row,key),"domain "+row.stateDomainId+" missing "+key);
    }
  }
  const team=plain(c.getChronicleCurrentTeam43600());
  assert.deepStrictEqual(team.teamVariantIds,["academy_menma","academy_hinata","academy_kushina"]);
  assert.strictEqual(team.assignmentId,"team_commit_436_a");
  assert.strictEqual(c.getChronicleCurrentRyo43600(),237);
  assert.strictEqual(plain(c.getChronicleIdentity43600()).variantId,"academy_menma");
  const runDomain=manifest.domains.find(row=>row.stateDomainId==="chronicleRunIdentity");
  assert(runDomain,"chronicleRunIdentity domain missing");
  assert.strictEqual(runDomain.semanticOwner,"CE / Historical Scope + Meta-History");
  assert.strictEqual(runDomain.stableIdentityKey,"playerData.phase2ChronicleState.chronicleRunIdentity.runId");
  assert.strictEqual(runDomain.savePath,"playerData.phase2ChronicleState.chronicleRunIdentity");

  const privateOriginDomain=manifest.domains.find(row=>row.stateDomainId==="privateOriginHistory");
  assert(privateOriginDomain,"privateOriginHistory domain missing");
  assert.strictEqual(privateOriginDomain.semanticOwner,"Chronicle Engine / subject-private Origin convergence");
  assert.strictEqual(privateOriginDomain.savePath,"playerData.phase2ChronicleState.privateOriginHistories.bySubject[subjectStableId]");
  assert(privateOriginDomain.projectionConsumers.includes("participant autonomy"));
  assert(privateOriginDomain.devOverridePolicy.includes("never becomes protagonist Knowledge"));
  const disciplineDomain=manifest.domains.find(row=>row.stateDomainId==="disciplineDevelopment");
  const statsDomain=manifest.domains.find(row=>row.stateDomainId==="characterStats");
  assert.strictEqual(disciplineDomain.semanticOwner,"Progression / Development");
  assert.strictEqual(disciplineDomain.savePath,"playerData.characters[progressionCharacterId].disciplineProgression[disciplineId]");
  assert.strictEqual(statsDomain.semanticOwner,"PL / Registry / Rank");
  assert.strictEqual(statsDomain.savePath,"playerData.characters[progressionCharacterId].stats[statId]");
  assert.strictEqual(manifest.domains.some(row=>row.stateDomainId==="mastery"),false,"#448 fabricated a universal mastery domain");
  const continuityDomain=manifest.domains.find(row=>row.stateDomainId==="originParticipantContinuity");
  assert(continuityDomain,"#469 participant continuity domain missing");
  assert.strictEqual(continuityDomain.savePath,"playerData.phase2ChronicleState.originParticipantContinuity.byKey[originId::stableParticipantId]");


  const before=JSON.stringify(c.playerData);
  const migrated1=plain(c.migratePhase2ChronicleState43600(c.playerData));
  assert.strictEqual(JSON.stringify(c.playerData),before,"pure migration mutated live save");
  const migrated2=plain(c.migratePhase2ChronicleState43600(migrated1));
  assert.deepStrictEqual(migrated2,migrated1,"migration is not deterministic/idempotent");
  assert.strictEqual(Object.prototype.hasOwnProperty.call(migrated1.phase2ChronicleState,"chronicleRunIdentity"),false,"pure migration minted Chronicle run identity");

  assert.strictEqual(c.getChronicleTutorialProgress43600(),null,"read-only tutorial getter fabricated state");
  assert.strictEqual(c.getPrivateOriginHistoryStore43600({create:false}),null,"read-only private Origin getter fabricated state");
  const root=c.ensurePhase2ChronicleState43600({save:true});
  assert(root&&root.schemaVersion===1);
  assert.strictEqual(c.saveCount,1,"first scaffold write must save exactly once");
  const privateStore=plain(c.getPrivateOriginHistoryStore43600({create:true}));
  assert.deepStrictEqual(privateStore,{schemaVersion:1,bySubject:{}});
  const continuity=c.getOriginParticipantContinuityStore43600({create:true});
  continuity.byKey["academy_kakashi::academy_kakashi_origin_masked_interceptor"]={schemaVersion:1,originId:"academy_kakashi",stableParticipantId:"academy_kakashi_origin_masked_interceptor",survivedOrigin:true};
  c.savePlayerData();
  const withContinuity=plain(c.migratePhase2ChronicleState43600(c.playerData));
  assert.strictEqual(withContinuity.phase2ChronicleState.originParticipantContinuity.byKey["academy_kakashi::academy_kakashi_origin_masked_interceptor"].survivedOrigin,true,"#436 migration dropped participant continuity");

  const saved=JSON.stringify(c.playerData.phase2ChronicleState);
  c.ensurePhase2ChronicleState43600({save:true});
  assert.strictEqual(JSON.stringify(c.playerData.phase2ChronicleState),saved);
  assert.strictEqual(c.saveCount,2,"repeat ensure rewrote identical state");

  c.updateChronicleTutorialProgress43600({sandboxPopupSeen:true,recommendedRouteEnabled:true,openingChoice:"show_me_around"},{save:true});
  assert.strictEqual(c.saveCount,3);
  const progress=plain(c.getChronicleTutorialProgress43600());
  assert.strictEqual(progress.sandboxPopupSeen,true);
  assert.strictEqual(progress.recommendedRouteEnabled,true);
  assert.strictEqual(progress.openingChoice,"show_me_around");
  assert.deepStrictEqual(plain(c.getChronicleCurrentTeam43600()).teamVariantIds,team.teamVariantIds,"tutorial write mutated current team");
  assert.strictEqual(c.playerData.ryo,237,"tutorial write mutated Ryō");
}

{
  const c=boot(teamSave);
  assert.strictEqual(c.getChronicleRunIdentity43600(),null,"read-only run identity getter fabricated identity");
  const first=plain(c.ensureChronicleRunIdentity43600({creationKind:"LEGACY_SAVE_MIGRATION"}));
  assert.strictEqual(first.success,true,JSON.stringify(first));
  assert.strictEqual(first.idempotent,false);
  assert(/^sc_run_v1_/.test(first.identity.runId),"legacy run ID namespace invalid");
  assert.strictEqual(first.identity.creationKind,"LEGACY_SAVE_MIGRATION");
  assert(first.identity.migrationSourceRefs.includes("chronicle_origin::academy_menma"),"migration provenance missing Origin");
  assert.strictEqual(c.saveCount,1,"legacy run identity must persist exactly once");
  const second=plain(c.ensureChronicleRunIdentity43600({creationKind:"LEGACY_SAVE_MIGRATION"}));
  assert.strictEqual(second.success,true);
  assert.strictEqual(second.idempotent,true);
  assert.strictEqual(second.identity.runId,first.identity.runId,"repeat ensure rerolled run ID");
  assert.strictEqual(c.saveCount,1,"repeat ensure rewrote run ID");

  const reloaded=boot(plain(c.playerData));
  assert.strictEqual(reloaded.getChronicleRunIdentity43600().runId,first.identity.runId,"save/load changed run ID");
  assert.strictEqual(plain(reloaded.getChronicleIdentity43600()).variantId,"academy_menma","run identity replaced protagonist identity");
}
{
  const a=boot(teamSave),b=boot(teamSave);
  const ra=plain(a.ensureChronicleRunIdentity43600({creationKind:"NEW_START"}));
  const rb=plain(b.ensureChronicleRunIdentity43600({creationKind:"NEW_START"}));
  assert.strictEqual(ra.success,true);assert.strictEqual(rb.success,true);
  assert.notStrictEqual(ra.identity.runId,rb.identity.runId,"two fresh identical Menma Chronicles collapsed onto one run ID");
  assert.strictEqual(plain(a.getChronicleIdentity43600()).variantId,plain(b.getChronicleIdentity43600()).variantId,"run instance test changed protagonist identity");
}
{
  const pending=boot({acquisition:{chronicleOriginVariantId:null,ninjaIdentityLocked:false,onboardingStatus:"chronicle_origin_pending"}});
  const result=plain(pending.ensureChronicleRunIdentity43600({creationKind:"NEW_START"}));
  assert.strictEqual(result.success,false);
  assert.strictEqual(result.reason,"chronicle_not_begun");
  assert.strictEqual(pending.getChronicleRunIdentity43600(),null,"pending onboarding minted run ID");
}
{
  const sealed=JSON.parse(JSON.stringify(teamSave));
  sealed.phase2ChronicleState={
    schemaVersion:1,
    tutorialProgress:{schemaVersion:1},
    originParticipantContinuity:{schemaVersion:1,byKey:{}},
    privateOriginHistories:{schemaVersion:1,bySubject:{
      academy_kakashi:{schemaVersion:1,privateOriginHistoryId:"private_origin::academy_kakashi::sealed",committed:true,miContinuity:{fieldDispositionState:"UNSEEN"}}
    }}
  };
  const before=JSON.stringify(sealed.phase2ChronicleState.privateOriginHistories);
  const c=boot(sealed);
  const migrated=plain(c.ensureChronicleRunIdentity43600({creationKind:"LEGACY_SAVE_MIGRATION"}));
  assert.strictEqual(migrated.success,true);
  assert.strictEqual(JSON.stringify(c.playerData.phase2ChronicleState.privateOriginHistories),before,"run identity migration rewrote sealed private history");
}

{
  const legacy=JSON.parse(JSON.stringify(teamSave));
  legacy.acquisition.academyTeamFormation.confirmationReceipt.firstKonohaTutorial={
    tutorialId:"konoha_onboarding_first_team_orientation_v1",
    completed:true,
    completionReceipt:{receiptId:"konoha_onboarding_first_team_orientation_completed_v1"}
  };
  const c=boot(legacy);
  const migrated=plain(c.migratePhase2ChronicleState43600(c.playerData));
  const p=migrated.phase2ChronicleState.tutorialProgress;
  assert.strictEqual(p.sandboxPopupSeen,true,"completed #209 save was rewound to opening popup");
  assert.strictEqual(p.trainingTipSeen,true,"proven legacy Training orientation was lost");
  assert.strictEqual(p.practicalTipSeen,true,"proven legacy Practical orientation was lost");
  assert.strictEqual(p.examsTipSeen,false,"migration fabricated Exams tutorial history");
  assert.strictEqual(p.arenaTipSeen,false,"migration fabricated Arena tutorial history");
  assert.strictEqual(p.shinobiRecordTipSeen,false,"migration fabricated Shinobi Record tutorial history");
}

{
  const reassigned=JSON.parse(JSON.stringify(teamSave));
  reassigned.acquisition.ownedCharactersByVariantId={
    academy_menma:{ownedCharacterId:"owned_character_academy_menma"},
    academy_hinata:{ownedCharacterId:"owned_character_academy_hinata"},
    academy_kushina:{ownedCharacterId:"owned_character_academy_kushina"},
    academy_izuno:{ownedCharacterId:"owned_character_academy_izuno"}
  };
  reassigned.clan={
    teamSlots:["academy_izuno","academy_hinata","academy_kushina",null,null,null],
    assignmentSequence:2,
    currentTeamAssignment:{
      schemaVersion:1,
      assignmentId:"clan_team_assignment:2:owned_character_academy_izuno+owned_character_academy_hinata+owned_character_academy_kushina",
      sequence:2,
      source:"my_clan_save_formation",
      sourceEventId:"qa436_reassignment",
      teamRuntimeIds:["academy_izuno","academy_hinata","academy_kushina",null,null,null],
      teamVariantIds:["academy_izuno","academy_hinata","academy_kushina",null,null,null],
      teamLineageIds:["owned_character_academy_izuno","owned_character_academy_hinata","owned_character_academy_kushina",null,null,null],
      committedAt:456
    }
  };
  const team=plain(boot(reassigned).getChronicleCurrentTeam43600());
  assert.deepStrictEqual(team.teamVariantIds,["academy_izuno","academy_hinata","academy_kushina"],"#532 current assignment did not supersede opening-team projection");
  assert.deepStrictEqual(team.teamLineageIds,["owned_character_academy_izuno","owned_character_academy_hinata","owned_character_academy_kushina"],"#532 exact owned-lineage order drifted");
  assert.strictEqual(team.originVariantId,"academy_menma","#532 reassignment rewrote Chronicle protagonist identity");
  assert.strictEqual(team.protagonistLineageId,"owned_character_academy_menma","#532 reassignment rewrote Chronicle protagonist lineage");
  assert.strictEqual(team.protagonistPresent,false,"#532 protagonist absence was not represented independently from identity");
  assert.strictEqual(team.sourcePath,"playerData.clan.currentTeamAssignment");
}

{
  const invalid=JSON.parse(JSON.stringify(teamSave));
  invalid.acquisition.academyTeamFormation.confirmationReceipt.teamVariantIds=["academy_menma","academy_hinata"];
  const c=boot(invalid);
  assert.strictEqual(c.getChronicleCurrentTeam43600(),null,"invalid two-person receipt became currentTeam");
}

const d=plain(boot(teamSave).runChronicleStateManifest43600Diagnostics());
assert.strictEqual(d.pass,true,JSON.stringify(d,null,2));

console.log(JSON.stringify({
  pass:true,
  issue:436,
  manifest:"sc.phase2.chronicle_state_manifest.v1",
  initialDomains:["currentTeam","tutorialProgress","chronicleIdentity","chronicleRunIdentity","currentRyo","disciplineDevelopment","characterStats","originParticipantContinuity","shinobiRecordProjection"],
  chronicleRunIdentity:true,
  twoFreshRunsDiffer:true,
  sameRunReloadStable:true,
  pureMigrationDoesNotMintRunId:true,
  sealedPrivateHistoryPreserved:true,
  disciplineDevelopmentRegistered:true,
  characterStatsExistingOwnerPreserved:true,
  noMasteryDomain:true,
  pureMigration:true,
  deterministicMigration:true,
  currentTeamDerivedFromCanonicalAssignment:true,
  ryoExistingOwnerPreserved:true,
  legacy209MigrationBounded:true,
  noFabricatedRetroactiveTips:true,
  browserGoldenClaimed:false
},null,2));
