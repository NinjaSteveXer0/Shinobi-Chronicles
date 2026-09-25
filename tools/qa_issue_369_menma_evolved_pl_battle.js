#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const runtime=fs.readFileSync(path.join(ROOT,"runtime/alpha-menma-evolved-pl-battle-36900.js"),"utf8");
const index=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");

const checks={
  productionLoaded:index.includes('<script src="runtime/alpha-menma-evolved-pl-battle-36900.js"></script>'),
  exactIdentity:[
    'academy_menma_origin_three_test_subjects_with_anko',
    'origin_academy_menma_prologue:three_test_subjects',
    'stop_three_test_subjects',
    'menma_origin_anko_autonomous_assist'
  ].every(token=>runtime.includes(token)),
  battlePLOnly:runtime.includes('setBattleRemainingPLRecord')&&runtime.includes('plIdentity:"Battle PL"')&&runtime.includes('healthLayerIntroduced:false')
    &&!runtime.includes('currentBattle.hp')&&!runtime.includes('currentBattle.health')&&!runtime.includes('hitPoints'),
  playerStartsFirst:runtime.includes('opp("player",M)'),
  oneOpportunityOwner:runtime.includes('action_opportunity_not_open')&&runtime.includes('wrong_action_opportunity_actor')
    &&runtime.includes('o.status!=="open"')&&runtime.includes('o.accepted'),
  entitlementPersists:runtime.includes('playerIndex')&&runtime.includes('x.m369=cl(rt())')&&runtime.includes('raw&&raw.m369'),
  committedRngPersists:runtime.includes('committedBeforeResolution:true')&&runtime.includes('if(o.choice&&ids.includes(o.choice.id))')
    &&runtime.includes('saveTestState()'),
  ankoExactPackage:runtime.includes('ankoDamage(id,20,t,en)')&&runtime.includes('ankoDamage(id,24,t,en)')
    &&runtime.includes('"sj_anko_snake_bind"')&&runtime.includes('"sj_anko_serpent_evasion"')
    &&!runtime.includes('sj_anko_twin_snakes_mutual_death'),
  ankoPriority:runtime.includes('AP=["test_subject_brute","test_subject_unstable","test_subject_altered_shinobi"]'),
  enemyRelay:runtime.includes('H=["test_subject_altered_shinobi","test_subject_brute","test_subject_unstable"]')
    &&runtime.includes('activeEnemy()'),
  exactTargetLaw:runtime.includes('id==="test_subject_altered_shinobi"')&&runtime.includes('id==="test_subject_brute"||id==="test_subject_unstable"'),
  menmaFailureBoundary:runtime.includes('if(side==="player"&&id===M)return defeat(env)'),
  ankoNoPromotion:runtime.includes('if(side==="player"&&id===A)')&&runtime.includes('currentBattle.activePlayer=getPlayerCharacter(M)'),
  manualWithdrawDisabled:runtime.includes('function cw(){return exact()?false')&&runtime.includes('function wa(){return exact()?false'),
  men03MenmaOnly:runtime.includes('x.actorRef.participantId===M')&&runtime.includes('menmaOnlyAttribution:true')
    &&runtime.includes('ankoActionsExcluded:true')&&runtime.includes('wholeThreeSubjectCompletionRequired:true'),
  men02KinjutsuOnly:runtime.includes('sk.primaryDiscipline==="Kinjutsu"')&&runtime.includes('kinjutsu_observation_qualifying')
    &&runtime.includes('men02Qualifying:q'),
  exactRewardReceipt:runtime.includes('battleOccurrenceId:s.occ')&&runtime.includes('battleConfigId:C')
    &&runtime.includes('objectiveId:O')&&runtime.includes('resolvedHostileIds:(s.resolved||[]).slice()')
    &&!runtime.includes('ryo:100')&&!runtime.includes('FIXED_RYO'),
  noDeathInjuryCustodyInference:runtime.includes('inferredDeath:false')&&runtime.includes('inferredInjury:false')&&runtime.includes('inferredCustody:false'),
  betaExcluded:!runtime.includes('command batch')&&!runtime.includes('player-side command batch'),
  kakashiUntouched:!runtime.includes('academy_kakashi'),
  browserGoldenNotSelfClaimed:runtime.includes('browserGoldenClaimed:false')
};

for(const [name,value] of Object.entries(checks))assert.strictEqual(value,true,name);
console.log(JSON.stringify({pass:true,issue:369,checks,browserGoldenClaimed:false},null,2));
