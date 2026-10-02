#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const SRC=fs.readFileSync(path.join(ROOT,"runtime/alpha-chronicle-state-manifest-43600.js"),"utf8");
const INDEX=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");

function boot(seed){
  const context={
    console:{log(){},info(){},warn(){},error(){}},
    playerData:JSON.parse(JSON.stringify(seed||{})),
    saveCount:0,
    savePlayerData(){context.saveCount+=1;},
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
  assert.deepStrictEqual(manifest.domains.map(x=>x.stateDomainId),["currentTeam","tutorialProgress","chronicleIdentity","currentRyo","disciplineDevelopment","characterStats","shinobiRecordProjection"]);
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

  const disciplineDomain=manifest.domains.find(row=>row.stateDomainId==="disciplineDevelopment");
  const statsDomain=manifest.domains.find(row=>row.stateDomainId==="characterStats");
  assert.strictEqual(disciplineDomain.semanticOwner,"Progression / Development");
  assert.strictEqual(disciplineDomain.savePath,"playerData.characters[progressionCharacterId].disciplineProgression[disciplineId]");
  assert.strictEqual(statsDomain.semanticOwner,"PL / Registry / Rank");
  assert.strictEqual(statsDomain.savePath,"playerData.characters[progressionCharacterId].stats[statId]");
  assert.strictEqual(manifest.domains.some(row=>row.stateDomainId==="mastery"),false,"#448 fabricated a universal mastery domain");

  const before=JSON.stringify(c.playerData);
  const migrated1=plain(c.migratePhase2ChronicleState43600(c.playerData));
  assert.strictEqual(JSON.stringify(c.playerData),before,"pure migration mutated live save");
  const migrated2=plain(c.migratePhase2ChronicleState43600(migrated1));
  assert.deepStrictEqual(migrated2,migrated1,"migration is not deterministic/idempotent");

  assert.strictEqual(c.getChronicleTutorialProgress43600(),null,"read-only tutorial getter fabricated state");
  const root=c.ensurePhase2ChronicleState43600({save:true});
  assert(root&&root.schemaVersion===1);
  assert.strictEqual(c.saveCount,1,"first scaffold write must save exactly once");
  const saved=JSON.stringify(c.playerData.phase2ChronicleState);
  c.ensurePhase2ChronicleState43600({save:true});
  assert.strictEqual(JSON.stringify(c.playerData.phase2ChronicleState),saved);
  assert.strictEqual(c.saveCount,1,"repeat ensure rewrote identical state");

  c.updateChronicleTutorialProgress43600({sandboxPopupSeen:true,recommendedRouteEnabled:true,openingChoice:"show_me_around"},{save:true});
  assert.strictEqual(c.saveCount,2);
  const progress=plain(c.getChronicleTutorialProgress43600());
  assert.strictEqual(progress.sandboxPopupSeen,true);
  assert.strictEqual(progress.recommendedRouteEnabled,true);
  assert.strictEqual(progress.openingChoice,"show_me_around");
  assert.deepStrictEqual(plain(c.getChronicleCurrentTeam43600()).teamVariantIds,team.teamVariantIds,"tutorial write mutated current team");
  assert.strictEqual(c.playerData.ryo,237,"tutorial write mutated Ryō");
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
  initialDomains:["currentTeam","tutorialProgress","chronicleIdentity","currentRyo","disciplineDevelopment","characterStats","shinobiRecordProjection"],
  disciplineDevelopmentRegistered:true,
  characterStatsExistingOwnerPreserved:true,
  noMasteryDomain:true,
  pureMigration:true,
  deterministicMigration:true,
  currentTeamDerivedFromCommittedFormation:true,
  ryoExistingOwnerPreserved:true,
  legacy209MigrationBounded:true,
  noFabricatedRetroactiveTips:true,
  browserGoldenClaimed:false
},null,2));
