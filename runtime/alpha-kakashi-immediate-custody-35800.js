// ============================================================================
// ISSUE #246 — ACADEMY KAKASHI IMMEDIATE MI CUSTODY BRANCHES — 35800
// Immediate transfer branches only. Field-secured RESTRAIN AND CONTINUE stays
// fail-closed pending CE / Codex / Coordination issue #244.
// ============================================================================
(function installAcademyKakashiImmediateCustody35800(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_IMMEDIATE_CUSTODY_35800)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const TERMINAL=globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100;
if(!A||!CORE||!TERMINAL)throw new Error("kakashi_immediate_custody_35800_dependencies_missing");

const PATCH_ID="alpha_kakashi_immediate_custody_35800_v2_2026_09_19";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const SOURCE_BEAT="kak_scene05a_w_choice";
const CHOICE_ANBU="scene05aw_take_her_back_to_anbu";
const CHOICE_POLICE="scene05aw_take_her_to_uchiha_police";
const MI="academy_kakashi_origin_masked_interceptor";
const ANBU="konoha_anbu_contact";
const AMT="anbu_marked_target";
const PS="package_smuggler";
const MINATO="kage_minato";
const POLICE_A="uchiha_police_officer_mi_a";
const POLICE_B="uchiha_police_officer_mi_b";
const PACKAGE_REF="kakashi_origin_outer_route_packet";

const D06="kak_scene06a_w2d_take_mi_anbu";
const D07="kak_scene07a_w2d_anbu_handoff";
const D08="kak_scene08a_w2d_hokage_office";
const E06="kak_scene06a_w2e_take_mi_police";
const E07="kak_scene07a_w2e_police_handoff";
const E08="kak_scene08a_w2e_anbu_report";
const E09="kak_scene09a_w2e_hokage_office";
const RECEIPT="kak_w2de_chronicle_receipt_35800";
const EXIT="kak_w2de_origin_exit_35800";

const SAKURA_BG="Kakashi Origin Backdrop/fight_at_sakura_tree.png";
const ROOFTOP_BG="Kakashi Origin Backdrop/rooftop_night.png";
const POLICE_BG="Kakashi Origin Backdrop/uchiha_police_exterior_night.png";
const OFFICE_BG="Kakashi Origin Backdrop/hokage_administration_interior_night.png";
const POLICE_A_IMG="NPC/uchiha_police_force_member_female.png";
const POLICE_B_IMG="NPC/uchiha_police_force_male_alt_1.png";

const CURSOR_KEY="__kakashiImmediateCustody35800Cursor";
const ROUTE_KEY="kakashiImmediateCustodyRoute35800";
const STYLE_ID="sc-kakashi-immediate-custody-35800-style";
const BOARD_CLASS="sc-kakashi-immediate-custody-35800-board";
const RECEIPT_ID="sc-kakashi-immediate-custody-receipt-35800";
const REQUEST_ANBU="kakashi_immediate_custody_anbu_35800";
const REQUEST_POLICE="kakashi_immediate_custody_police_35800";

const AUTH=Object.freeze({
  choice:"36454a31e9f61ffdaa528589ac11552d446ad3bc",
  d06:"24b7956781d2da6d3d1f70ce18d1ef0de348cfae",
  d07:"4942f95277e55eaf78a9b2a5ea7b75bc22c2a4e4",
  d08:"e135e9c6dff4f0e5235bf96aab1aa0e90a985bc4",
  e06:"7593d4fbcdabce9fab3a137f369bb1c524f3c41b",
  e07:"6cb1f7e59ce05e75e35d3cc1f0d59cbf1722d0c4",
  e08:"2878edb2696456e1d7998c506714488efe8bb0a0",
  e09:"0dafcca4f13afe437b7b81d9ef6ec09569d36efc"
});
const CUES={"d06":[{"kind":"narration","text":"Masked Interceptor remains on the stone beneath the Sakura tree."},{"kind":"narration","text":"Kakashi looks once toward the route the package took."},{"kind":"narration","text":"Then back to her."},{"kind":"narration","text":"He does not move after it."},{"kind":"narration","text":"Instead, he steps closer."},{"kind":"narration","text":"Masked Interceptor shifts."},{"kind":"narration","text":"Kakashi’s kunai comes up immediately."},{"kind":"narration","text":"She stops."},{"kind":"narration","text":"Kakashi kicks her weapon out of reach."},{"kind":"narration","text":"Then he secures her hands."},{"kind":"narration","text":"The street stays quiet around them."},{"kind":"narration","text":"Whatever distance the others had before is only growing now."},{"kind":"narration","text":"Masked Interceptor looks down at the restraints."},{"kind":"narration","text":"Then at Kakashi."},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"You’re taking me somewhere."},{"kind":"dialogue","speaker":"KAKASHI","text":"Yes."},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"Where?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Back to ANBU."},{"kind":"narration","text":"She watches him for a moment."},{"kind":"narration","text":"Whatever she thinks of that answer stays behind the mask."},{"kind":"narration","text":"Kakashi takes hold of the restraint line."}],"d07":[{"kind":"narration","text":"Kakashi steps onto the rooftop."},{"kind":"narration","text":"Masked Interceptor follows under restraint."},{"kind":"narration","text":"The ANBU operative is already waiting."},{"kind":"narration","text":"His attention moves from Kakashi to the prisoner beside him."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"Report."},{"kind":"dialogue","speaker":"KAKASHI","text":"The target made the handoff."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"To whom?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Another man."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"The package?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Gone with him."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"The original target?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Gone."},{"kind":"narration","text":"The operative looks toward Masked Interceptor."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"And her?"},{"kind":"dialogue","speaker":"KAKASHI","text":"She went after the man with the package."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"You intervened."},{"kind":"dialogue","speaker":"KAKASHI","text":"Yes."},{"kind":"narration","text":"A short silence."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"You brought her back."},{"kind":"dialogue","speaker":"KAKASHI","text":"Yes."},{"kind":"narration","text":"The operative steps forward."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"Transfer custody."},{"kind":"narration","text":"Kakashi releases the restraint line into his hand."},{"kind":"narration","text":"Masked Interceptor moves to the operative’s side."},{"kind":"narration","text":"Before she does, she looks at Kakashi once."},{"kind":"narration","text":"He gives her nothing back."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"Very well, you may go."},{"kind":"dialogue","speaker":"KAKASHI","text":"Understood."}],"d08":[{"kind":"narration","text":"The recovered package rests on Minato’s desk."},{"kind":"narration","text":"ANBU Marked Target stands near the window."},{"kind":"narration","text":"Package Smuggler is beside him."},{"kind":"narration","text":"Masked Interceptor stands with the ANBU operative."},{"kind":"narration","text":"The restraints are gone."},{"kind":"narration","text":"Minato looks toward her."},{"kind":"dialogue","speaker":"MINATO","text":"He brought you back himself."},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"Yes."},{"kind":"narration","text":"Package Smuggler glances toward her."},{"kind":"dialogue","speaker":"PACKAGE SMUGGLER","text":"After stopping you."},{"kind":"narration","text":"Masked Interceptor turns her head toward him."},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"He didn’t know what I was doing."},{"kind":"dialogue","speaker":"ANBU MARKED TARGET","text":"He didn’t know what any of us were doing."},{"kind":"narration","text":"Masked Interceptor looks back toward Minato."},{"kind":"dialogue","speaker":"MINATO","text":"Did he ask who you were?"},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"No."},{"kind":"dialogue","speaker":"MINATO","text":"Did he question why you were there?"},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"No."},{"kind":"narration","text":"Minato looks toward the ANBU operative."},{"kind":"dialogue","speaker":"MINATO","text":"And when he returned?"},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"He reported what happened."},{"kind":"dialogue","speaker":"MINATO","text":"Nothing else?"},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"No."},{"kind":"narration","text":"The room stays quiet."},{"kind":"narration","text":"Package Smuggler looks toward Masked Interceptor."},{"kind":"dialogue","speaker":"PACKAGE SMUGGLER","text":"He could have left you there."},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"He could have done worse than that."},{"kind":"narration","text":"No one answers immediately."},{"kind":"narration","text":"Minato’s eyes move to Kakashi’s report."},{"kind":"dialogue","speaker":"MINATO","text":"He decided where his part ended."},{"kind":"narration","text":"Masked Interceptor watches him."},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"And gave the rest back to you."},{"kind":"dialogue","speaker":"MINATO","text":"Yes."},{"kind":"narration","text":"ANBU Marked Target looks toward the recovered package."},{"kind":"dialogue","speaker":"ANBU MARKED TARGET","text":"He still thinks he lost the mission."},{"kind":"dialogue","speaker":"MINATO","text":"He did."},{"kind":"narration","text":"Masked Interceptor looks at Kakashi’s report again."},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"But he brought me back."},{"kind":"dialogue","speaker":"MINATO","text":"Yes."},{"kind":"narration","text":"She is quiet."},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"I’ll remember that."}],"e06":[{"kind":"narration","text":"Masked Interceptor remains beneath the Sakura tree."},{"kind":"narration","text":"Kakashi looks toward the rooftops."},{"kind":"narration","text":"The package is somewhere beyond them."},{"kind":"narration","text":"So is the original target."},{"kind":"narration","text":"He looks back at the shinobi in front of him."},{"kind":"narration","text":"Then makes his decision."},{"kind":"narration","text":"Kakashi approaches."},{"kind":"narration","text":"Masked Interceptor starts to move."},{"kind":"narration","text":"His kunai stops her."},{"kind":"narration","text":"Kakashi takes her weapon and secures her hands."},{"kind":"narration","text":"She looks down at the restraints."},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"Where are you taking me?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Uchiha Police Force."},{"kind":"narration","text":"For the first time since the fight ended, she says nothing immediately."},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"The Police."},{"kind":"dialogue","speaker":"KAKASHI","text":"You attacked someone inside the village."},{"kind":"narration","text":"She studies him."},{"kind":"narration","text":"Kakashi takes hold of the restraint line."}],"e07":[{"kind":"narration","text":"The Uchiha Police Force entrance is still lit."},{"kind":"narration","text":"Two officers move toward Kakashi as he approaches."},{"kind":"narration","text":"Their attention goes immediately to the restrained shinobi beside him."},{"kind":"narration","text":"One of them raises a hand."},{"kind":"dialogue","speaker":"UCHIHA POLICE OFFICER","text":"Hold there."},{"kind":"narration","text":"Kakashi stops."},{"kind":"narration","text":"The officer looks at Masked Interceptor."},{"kind":"narration","text":"Then at Kakashi."},{"kind":"dialogue","speaker":"UCHIHA POLICE OFFICER","text":"What happened?"},{"kind":"dialogue","speaker":"KAKASHI","text":"She attacked a man near the Sakura tree."},{"kind":"dialogue","speaker":"UCHIHA POLICE OFFICER","text":"You stopped her?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Yes."},{"kind":"narration","text":"The second officer moves closer to Masked Interceptor."},{"kind":"dialogue","speaker":"UCHIHA POLICE OFFICER","text":"Name?"},{"kind":"narration","text":"Masked Interceptor says nothing."},{"kind":"narration","text":"The officer waits."},{"kind":"narration","text":"Nothing changes."},{"kind":"narration","text":"He looks back to Kakashi."},{"kind":"dialogue","speaker":"UCHIHA POLICE OFFICER","text":"You know who she is?"},{"kind":"dialogue","speaker":"KAKASHI","text":"No."},{"kind":"dialogue","speaker":"UCHIHA POLICE OFFICER","text":"Affiliation?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Unknown."},{"kind":"narration","text":"The officer looks at the restraints."},{"kind":"dialogue","speaker":"UCHIHA POLICE OFFICER","text":"And the man she attacked?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Gone."},{"kind":"dialogue","speaker":"UCHIHA POLICE OFFICER","text":"Was anything taken?"},{"kind":"dialogue","speaker":"KAKASHI","text":"A package."},{"kind":"dialogue","speaker":"UCHIHA POLICE OFFICER","text":"Where is it?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Gone with another man."},{"kind":"narration","text":"The officer studies Kakashi for a moment."},{"kind":"narration","text":"Then nods to his partner."},{"kind":"dialogue","speaker":"UCHIHA POLICE OFFICER","text":"We’ll take her."},{"kind":"narration","text":"Kakashi transfers the restraint line."},{"kind":"narration","text":"The second officer secures Masked Interceptor."},{"kind":"narration","text":"She passes Kakashi without resistance."},{"kind":"narration","text":"Then stops."},{"kind":"narration","text":"Looks at him."},{"kind":"dialogue","speaker":"MASKED INTERCEPTOR","text":"Interesting choice."},{"kind":"narration","text":"Kakashi’s expression does not change."},{"kind":"narration","text":"The officers lead her toward the entrance."},{"kind":"dialogue","speaker":"UCHIHA POLICE OFFICER","text":"You should report this to whoever sent you."},{"kind":"dialogue","speaker":"KAKASHI","text":"I know."}],"e08":[{"kind":"narration","text":"Kakashi returns to the rooftop alone."},{"kind":"narration","text":"The ANBU operative is waiting."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"Report."},{"kind":"dialogue","speaker":"KAKASHI","text":"The target made the handoff."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"To whom?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Another man."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"The package?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Gone with him."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"The original target?"},{"kind":"dialogue","speaker":"KAKASHI","text":"Gone."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"The masked shinobi?"},{"kind":"dialogue","speaker":"KAKASHI","text":"I stopped her."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"And?"},{"kind":"dialogue","speaker":"KAKASHI","text":"I took her to the Uchiha Police Force."},{"kind":"narration","text":"The operative looks at him."},{"kind":"narration","text":"Nothing in his posture changes."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"You transferred her to the Police."},{"kind":"dialogue","speaker":"KAKASHI","text":"Yes."},{"kind":"narration","text":"A short silence."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"Very well, you may go."},{"kind":"dialogue","speaker":"KAKASHI","text":"Understood."}],"e09":[{"kind":"narration","text":"The recovered package rests on Minato’s desk."},{"kind":"narration","text":"ANBU Marked Target and Package Smuggler stand nearby."},{"kind":"narration","text":"The ANBU operative faces Minato."},{"kind":"narration","text":"There is one obvious absence from the room."},{"kind":"narration","text":"Masked Interceptor is still in Uchiha Police custody."},{"kind":"dialogue","speaker":"PACKAGE SMUGGLER","text":"He actually took her to the Police?"},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"Yes."},{"kind":"narration","text":"ANBU Marked Target looks toward Minato."},{"kind":"dialogue","speaker":"ANBU MARKED TARGET","text":"Does he know who she is?"},{"kind":"dialogue","speaker":"MINATO","text":"No."},{"kind":"dialogue","speaker":"PACKAGE SMUGGLER","text":"Then why the Police?"},{"kind":"narration","text":"Minato looks toward him."},{"kind":"dialogue","speaker":"MINATO","text":"He saw a masked shinobi attack someone inside Konoha."},{"kind":"narration","text":"Minato’s eyes move briefly toward the recovered package."},{"kind":"dialogue","speaker":"MINATO","text":"He acted on what he knew."},{"kind":"narration","text":"The ANBU operative remains still."},{"kind":"dialogue","speaker":"ANBU OPERATIVE","text":"He could have brought her back to me."},{"kind":"dialogue","speaker":"MINATO","text":"He didn’t know she belonged with you."},{"kind":"narration","text":"Silence settles over the office."},{"kind":"narration","text":"ANBU Marked Target looks toward the empty place where Masked Interceptor would normally be standing."},{"kind":"dialogue","speaker":"ANBU MARKED TARGET","text":"What happens to her?"},{"kind":"dialogue","speaker":"MINATO","text":"She remains in Police custody until that custody is properly resolved."},{"kind":"narration","text":"Package Smuggler looks less than pleased."},{"kind":"dialogue","speaker":"PACKAGE SMUGGLER","text":"She’s going to remember this."},{"kind":"narration","text":"Minato looks down at Kakashi’s report."},{"kind":"dialogue","speaker":"MINATO","text":"She should."}]};

const ROUTES=Object.freeze({
  ANBU:Object.freeze({
    key:"ANBU",choiceId:CHOICE_ANBU,firstBeat:D06,sceneBeats:Object.freeze([D06,D07,D08]),
    scenes:Object.freeze({
      [D06]:Object.freeze({stage:"sakura",bg:SAKURA_BG,objective:"Retrieve the package.",nextObjective:"Bring the masked shinobi back to ANBU.",authority:AUTH.d06,cues:Object.freeze(CUES.d06)}),
      [D07]:Object.freeze({stage:"rooftop_custody",bg:ROOFTOP_BG,objective:"Bring the masked shinobi back to ANBU.",nextObjective:null,authority:AUTH.d07,cues:Object.freeze(CUES.d07)}),
      [D08]:Object.freeze({stage:"office_anbu",bg:OFFICE_BG,objective:null,nextObjective:null,authority:AUTH.d08,cues:Object.freeze(CUES.d08)})
    })
  }),
  POLICE:Object.freeze({
    key:"POLICE",choiceId:CHOICE_POLICE,firstBeat:E06,sceneBeats:Object.freeze([E06,E07,E08,E09]),
    scenes:Object.freeze({
      [E06]:Object.freeze({stage:"sakura",bg:SAKURA_BG,objective:"Retrieve the package.",nextObjective:"Take the masked shinobi to the Uchiha Police Force.",authority:AUTH.e06,cues:Object.freeze(CUES.e06)}),
      [E07]:Object.freeze({stage:"police",bg:POLICE_BG,objective:"Take the masked shinobi to the Uchiha Police Force.",nextObjective:"Report to ANBU.",authority:AUTH.e07,cues:Object.freeze(CUES.e07)}),
      [E08]:Object.freeze({stage:"rooftop_report",bg:ROOFTOP_BG,objective:"Report to ANBU.",nextObjective:null,authority:AUTH.e08,cues:Object.freeze(CUES.e08)}),
      [E09]:Object.freeze({stage:"office_police",bg:OFFICE_BG,objective:null,nextObjective:null,authority:AUTH.e09,cues:Object.freeze(CUES.e09)})
    })
  })
});

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function occurrence(id){try{return id?A.findOccurrence(String(id)):null;}catch(_error){return null;}}
function stable(prefix,payload){try{return CORE.stableRef(prefix,payload);}catch(_error){return prefix+":"+JSON.stringify(payload);}}
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(ch){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch];});}
function currentMiState(){try{const s=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{},r=s.participantStates&&s.participantStates[MI];return String(r&&r.stateClass||"");}catch(_error){return"";}}
function routeForBeat(beatId){for(const route of Object.values(ROUTES))if(route.sceneBeats.includes(String(beatId||"")))return route;return null;}
function currentRoute(rt){rt=rt||active();return ROUTES[String(rt&&rt.localContext&&rt.localContext[ROUTE_KEY]||"")]||routeForBeat(rt&&rt.beatId)||null;}
function eligibleSource(rt){rt=rt||active();return !!rt&&rt.sceneId===SCENE_ID&&rt.beatId===SOURCE_BEAT&&rt.localContext&&rt.localContext.kakashiScene05AWEntered===true&&currentMiState()!=="DEAD";}
function instance(rt){rt=rt||active();return String(rt&&rt.instanceId||"");}
function sourceRef(rt){rt=rt||active();return String(rt&&rt.localContext&&rt.localContext.kakashiScene05AWBattleOccurrenceId||"");}

function commitStart(route){
  const rt=active();if(!route||!eligibleSource(rt))return{success:false,reason:"kakashi_immediate_custody_source_state_required"};
  const key=route.key==="ANBU"?"kakashiScene06W2DCustodyOccurrenceId":"kakashiScene06W2ECustodyOccurrenceId";
  const old=rt.localContext&&rt.localContext[key];if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const id=stable("occ_origin_kakashi_immediate_custody",{instance:instance(rt),route:route.key,battle:sourceRef(rt)});
  const fact={
    factClass:route.key==="ANBU"?"academy_kakashi_scene06_w2d_immediate_anbu_custody":"academy_kakashi_scene06_w2e_immediate_police_custody",
    storySceneInstanceId:instance(rt),sceneId:route.key==="ANBU"?"SCENE_06A_W2D":"SCENE_06A_W2E",
    authorityCommit:route.scenes[route.firstBeat].authority,stopAssassin:true,playerIntentCommitted:true,immediateTransferChosen:true,
    participantAlive:true,participantRef:MI,maskedInterceptorState:"ALIVE",custodyDisposition:"KAKASHI",
    custodyTransferPending:route.key==="ANBU"?"ANBU":"UCHIHA_POLICE",
    packageState:{objectRef:PACKAGE_REF,currentHolderClass:"PACKAGE_SMUGGLER",recovered:false,available:false},
    packageSmugglerEscapedWithPackage:true,anbuMarkedTargetEscaped:true,packagePursuitAvailable:false,anbuMarkedTargetPursuitAvailable:false,
    pursuitClosedByImmediateTransfer:true,pakkunPresent:false
  };
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_immediate_custody_choice",outcome:route.key==="ANBU"?"masked_interceptor_kakashi_custody_for_anbu":"masked_interceptor_kakashi_custody_for_police",participantRefs:[ORIGIN_ID,MI],sourceRefs:[{type:"battle_occurrence",id:sourceRef(rt)}]});
  if(!out||out.success!==true)return out||{success:false,reason:"kakashi_immediate_custody_commit_failed"};
  rt.localContext=Object.assign({},rt.localContext||{},{[ROUTE_KEY]:route.key,[key]:id,kakashiScene05AWPursuitEligible:false,kakashiScene05AWPackagePursuitEligible:false,kakashiScene05AWAmtPursuitEligible:false,[CURSOR_KEY]:0});
  save();return{success:true,occurrenceId:id,route:route.key};
}

function commitTransfer(route){
  const rt=active();if(!rt||!route)return{success:false,reason:"kakashi_immediate_custody_route_required"};
  const sourceKey=route.key==="ANBU"?"kakashiScene06W2DCustodyOccurrenceId":"kakashiScene06W2ECustodyOccurrenceId";
  const destKey=route.key==="ANBU"?"kakashiScene07W2DTransferOccurrenceId":"kakashiScene07W2ETransferOccurrenceId";
  const source=occurrence(rt.localContext&&rt.localContext[sourceKey]);if(!source)return{success:false,reason:"kakashi_immediate_custody_source_occurrence_required"};
  const old=rt.localContext&&rt.localContext[destKey];if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const destination=route.key==="ANBU"?"ANBU":"UCHIHA_POLICE";
  const sceneId=route.key==="ANBU"?"SCENE_07A_W2D":"SCENE_07A_W2E";
  const authority=route.key==="ANBU"?AUTH.d07:AUTH.e07;
  const id=stable("occ_origin_kakashi_immediate_custody_transfer",{source:String(source.occurrenceId||""),destination});
  const fact={factClass:route.key==="ANBU"?"academy_kakashi_scene07_w2d_anbu_custody_transfer":"academy_kakashi_scene07_w2e_police_custody_transfer",
    storySceneInstanceId:instance(rt),sceneId,authorityCommit:authority,participantRef:MI,participantAlive:true,liveCustodyEstablished:true,
    custodyDisposition:destination,custodyTransferredFrom:"KAKASHI",custodyTransferredTo:destination,hiddenOperationRevealedToKakashi:false,
    packageState:{objectRef:PACKAGE_REF,currentHolderClass:"PACKAGE_SMUGGLER",recovered:false,available:false},packageSmugglerEscapedWithPackage:true,anbuMarkedTargetEscaped:true,pakkunPresent:false};
  const participants=route.key==="ANBU"?[ORIGIN_ID,MI,ANBU]:[ORIGIN_ID,MI,POLICE_A,POLICE_B];
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_custody_transfer",outcome:route.key==="ANBU"?"masked_interceptor_transferred_to_anbu":"masked_interceptor_transferred_to_uchiha_police",participantRefs:participants,sourceRefs:[{type:"origin_occurrence",id:String(source.occurrenceId||""),role:"kakashi_custody"}]});
  if(!out||out.success!==true)return out||{success:false,reason:"kakashi_custody_transfer_commit_failed"};
  rt.localContext=Object.assign({},rt.localContext||{},{[destKey]:id});save();return{success:true,occurrenceId:id};
}

function commitReport(route){
  const rt=active(),transfer=commitTransfer(route);if(!rt||!transfer||transfer.success!==true)return transfer||{success:false,reason:"kakashi_custody_transfer_required"};
  const key=route.key==="ANBU"?"kakashiScene07W2DReportOccurrenceId":"kakashiScene08W2EReportOccurrenceId";
  const old=rt.localContext&&rt.localContext[key];if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const authority=route.key==="ANBU"?AUTH.d07:AUTH.e08;
  const sceneId=route.key==="ANBU"?"SCENE_07A_W2D":"SCENE_08A_W2E";
  const id=stable("occ_origin_kakashi_immediate_custody_report",{transfer:transfer.occurrenceId,route:route.key});
  const fact={factClass:route.key==="ANBU"?"academy_kakashi_scene07_w2d_anbu_report":"academy_kakashi_scene08_w2e_anbu_report",
    storySceneInstanceId:instance(rt),sceneId,authorityCommit:authority,packageHandoffOccurred:true,packageSmugglerEscapedWithPackage:true,anbuMarkedTargetEscaped:true,
    kakashiIntervenedAgainstMaskedInterceptor:true,kakashiDefeatedMaskedInterceptor:true,maskedInterceptorSurvived:true,
    maskedInterceptorCustody:route.key==="ANBU"?"ANBU":"UCHIHA_POLICE",truthfulReport:true,hiddenOperationRevealed:false,pakkunPresent:false};
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_anbu_report",outcome:route.key==="ANBU"?"w2d_live_anbu_custody_reported":"w2e_police_custody_reported",participantRefs:[ORIGIN_ID,ANBU,MI],sourceRefs:[{type:"origin_occurrence",id:transfer.occurrenceId,role:"custody_transfer"}]});
  if(!out||out.success!==true)return out||{success:false,reason:"kakashi_immediate_custody_report_commit_failed"};
  rt.localContext=Object.assign({},rt.localContext||{},{[key]:id});save();
  const terminal=TERMINAL.commitTerminalDebrief();if(!terminal||terminal.success!==true)return terminal||{success:false,reason:"terminal_debrief_commit_failed"};
  return{success:true,occurrenceId:id};
}

function commitHidden(route){
  const rt=active();if(!rt||!route)return{success:false,reason:"kakashi_immediate_custody_route_required"};
  const reportKey=route.key==="ANBU"?"kakashiScene07W2DReportOccurrenceId":"kakashiScene08W2EReportOccurrenceId";
  const report=occurrence(rt.localContext&&rt.localContext[reportKey]);if(!report)return{success:false,reason:"kakashi_immediate_custody_report_required"};
  const key=route.key==="ANBU"?"kakashiScene08W2DHiddenOccurrenceId":"kakashiScene09W2EHiddenOccurrenceId";
  const old=rt.localContext&&rt.localContext[key];if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const id=stable("occ_origin_kakashi_immediate_custody_hidden_review",{report:String(report.occurrenceId||""),route:route.key});
  const fact={factClass:route.key==="ANBU"?"academy_kakashi_scene08_w2d_hidden_review":"academy_kakashi_scene09_w2e_hidden_review",
    storySceneInstanceId:instance(rt),sceneId:route.key==="ANBU"?"SCENE_08A_W2D":"SCENE_09A_W2E",authorityCommit:route.key==="ANBU"?AUTH.d08:AUTH.e09,
    stopAssassin:true,maskedInterceptorState:"ALIVE",maskedInterceptorPresent:route.key==="ANBU",maskedInterceptorCustody:route.key==="ANBU"?"ANBU":"UCHIHA_POLICE",
    anbuMarkedTargetSurvived:true,packageSmugglerSurvived:true,hiddenOperationPackageRecoveredAfterward:true,kakashiMissionPackageRecovered:false,
    kakashiPresent:false,kakashiKnowledgeGranted:false,kakashiLearnsHiddenOperationTruth:false};
  const participants=route.key==="ANBU"?[MINATO,ANBU,AMT,PS,MI]:[MINATO,ANBU,AMT,PS];
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_hidden_operation_review",outcome:route.key==="ANBU"?"w2d_hidden_review_committed":"w2e_hidden_review_committed",participantRefs:participants,sourceRefs:[{type:"origin_occurrence",id:String(report.occurrenceId||""),role:"anbu_report"}]});
  if(!out||out.success!==true)return out||{success:false,reason:"kakashi_immediate_custody_hidden_review_commit_failed"};
  rt.localContext=Object.assign({},rt.localContext||{},{[key]:id});save();return{success:true,occurrenceId:id};
}

function installBeats(){
  const def=scene(),m=def&&def.beatMap instanceof Map?def.beatMap:null;if(!m)return false;
  for(const id of [D06,D07,D08,E06,E07,E08,E09]){
    const route=routeForBeat(id),cfg=route&&route.scenes[id];
    m.set(id,{beatId:id,mode:"narration",environmentRef:{assetId:cfg.stage==="police"?"kakashi_origin_uchiha_police_exterior_night":cfg.stage.indexOf("office")===0?"kakashi_origin_hokage_administration_interior_night":cfg.stage.indexOf("rooftop")===0?"kakashi_origin_rooftop_night":"kakashi_origin_fight_at_sakura_tree"},text:"",exitScene:false,allowPresentationClose:false,choices:[]});
  }
  m.set(RECEIPT,{beatId:RECEIPT,mode:"narration",text:"",exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(EXIT,{beatId:EXIT,mode:"narration",text:"YOUR CHRONICLE BEGINS",exitScene:true,allowPresentationClose:true,choices:[]});
  return true;
}
function sceneCfg(rt){const route=currentRoute(rt);return route&&route.scenes[String(rt&&rt.beatId||"")]||null;}
function sequence(rt){rt=rt||active();const cfg=sceneCfg(rt);if(!rt||!cfg||!cfg.cues.length)return null;const raw=Number(rt.localContext&&rt.localContext[CURSOR_KEY]||0),i=Number.isInteger(raw)?Math.max(0,Math.min(cfg.cues.length-1,raw)):0;return{route:currentRoute(rt),cfg,index:i,cue:cfg.cues[i],atEnd:i===cfg.cues.length-1};}
function focusForCue(cue,fallback){
  if(!cue)return fallback;const s=String(cue.speaker||"");
  if(s==="KAKASHI")return"academy_kakashi";if(s==="ANBU OPERATIVE")return ANBU;if(s==="MASKED INTERCEPTOR")return MI;if(s==="ANBU MARKED TARGET")return AMT;if(s==="PACKAGE SMUGGLER")return PS;if(s==="MINATO")return MINATO;if(s==="UCHIHA POLICE OFFICER")return POLICE_A;
  const t=String(cue.text||"");if(t.includes("Masked Interceptor"))return MI;if(t.includes("ANBU Marked Target"))return AMT;if(t.includes("Package Smuggler"))return PS;if(t.includes("ANBU operative"))return ANBU;if(t.includes("Minato"))return MINATO;if(t.includes("Kakashi"))return"academy_kakashi";return fallback;
}
function card(id,label,img,state,isFocus){return'<figure class="sc-scene-board-33900__actor '+(isFocus?"is-focus":"")+'" data-actor-id="'+esc(id)+'"><div class="sc-scene-board-33900__actor-frame"></div><img src="'+esc(img)+'" alt=""><figcaption class="sc-scene-board-33900__actor-tag"><strong>'+esc(label)+'</strong><small>'+esc(state)+'</small></figcaption></figure>';}
function objectiveMarkup(p){let o=p.cfg.objective;if(p.atEnd&&p.cfg.nextObjective!==undefined)o=p.cfg.nextObjective;return o?'<div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>'+esc(o)+'</div>':"";}
function board(rt,p){
  const f=focusForCue(p.cue,"academy_kakashi"),stage=p.cfg.stage;
  if(stage==="sakura")return'<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">SAKURA TREE · MAIN STREET</div>'+objectiveMarkup(p)+'</div><div class="sc-scene-board-33900__actors" data-count="2">'+card("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png","PRESENT",f==="academy_kakashi")+card(MI,"MASKED INTERCEPTOR","NPC/masked_interceptor.png","RESTRAINED",f===MI)+'</div>';
  if(stage==="rooftop_custody")return'<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">KONOHA ROOFTOP · NIGHT</div>'+objectiveMarkup(p)+'</div><div class="sc-scene-board-33900__actors" data-count="3">'+card("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png","REPORTING",f==="academy_kakashi")+card(MI,"MASKED INTERCEPTOR","NPC/masked_interceptor.png","KAKASHI CUSTODY",f===MI)+card(ANBU,"ANBU OPERATIVE","NPC/konoha_anbu.png","RECEIVING CUSTODY",f===ANBU)+'</div>';
  if(stage==="police")return'<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">UCHIHA POLICE FORCE · NIGHT</div>'+objectiveMarkup(p)+'</div><div class="sc-scene-board-33900__actors" data-count="4">'+card("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png","TRANSFER",f==="academy_kakashi")+card(MI,"MASKED INTERCEPTOR","NPC/masked_interceptor.png","RESTRAINED",f===MI)+card(POLICE_A,"UCHIHA POLICE OFFICER",POLICE_A_IMG,"ON DUTY",f===POLICE_A)+card(POLICE_B,"UCHIHA POLICE OFFICER",POLICE_B_IMG,"ON DUTY",f===POLICE_B)+'</div>';
  if(stage==="rooftop_report")return'<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">KONOHA ROOFTOP · NIGHT</div>'+objectiveMarkup(p)+'</div><div class="sc-scene-board-33900__actors" data-count="2">'+card("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png","REPORTING",f==="academy_kakashi")+card(ANBU,"ANBU OPERATIVE","NPC/konoha_anbu.png","RECEIVING REPORT",f===ANBU)+'</div>';
  const miPresent=stage==="office_anbu";
  const actors=[card(MINATO,"MINATO","Assets/Kage/kage_minato.png","PACKAGE RECOVERED · HIDDEN OPERATION",f===MINATO),card(AMT,"ANBU MARKED TARGET","NPC/anbu_marked_target.png","ALIVE",f===AMT),miPresent?card(MI,"MASKED INTERCEPTOR","NPC/masked_interceptor.png","ANBU CUSTODY",f===MI):"",card(ANBU,"ANBU OPERATIVE","NPC/konoha_anbu.png","PRESENT",f===ANBU),card(PS,"PACKAGE SMUGGLER","NPC/package_smuggler.png","ALIVE",f===PS)].join("");
  return'<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">HOKAGE ADMINISTRATION · NIGHT</div></div><div class="sc-scene-board-33900__actors" data-count="'+(miPresent?5:4)+'">'+actors+'</div>';
}
function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;const s=document.createElement("style");s.id=STYLE_ID;
  s.textContent="."+BOARD_CLASS+"{position:absolute;inset:0;z-index:6;pointer-events:none;overflow:hidden}"+
  "."+BOARD_CLASS+" .sc-scene-board-33900__actors{left:2.5%!important;right:2.5%!important;top:8%!important;bottom:20%!important;display:flex!important;justify-content:space-between!important;align-items:flex-end!important;gap:2%!important;padding:0 4%!important}"+
  "."+BOARD_CLASS+" .sc-scene-board-33900__actor{width:min(21vw,292px)!important;max-height:475px!important;aspect-ratio:7/10!important}"+
  "."+BOARD_CLASS+"[data-stage='police'] .sc-scene-board-33900__actor{width:min(18vw,250px)!important;max-height:410px!important}"+
  "."+BOARD_CLASS+"[data-stage^='office'] .sc-scene-board-33900__actors{left:0!important;right:0!important;top:0!important;bottom:0!important;display:block!important;padding:0!important}"+
  "."+BOARD_CLASS+"[data-stage^='office'] .sc-scene-board-33900__actor{position:absolute!important;width:min(11.5vw,158px)!important;max-height:286px!important;bottom:23.5%!important}"+
  "."+BOARD_CLASS+"[data-stage^='office'] .sc-scene-board-33900__actor[data-actor-id='"+MINATO+"']{left:41%!important;top:1%!important;bottom:auto!important;width:min(18vw,252px)!important;max-height:430px!important;z-index:6}"+
  "."+BOARD_CLASS+"[data-stage^='office'] .sc-scene-board-33900__actor[data-actor-id='"+AMT+"']{left:28%!important}." + BOARD_CLASS+"[data-stage^='office'] .sc-scene-board-33900__actor[data-actor-id='"+MI+"']{left:41%!important;z-index:5}." + BOARD_CLASS+"[data-stage^='office'] .sc-scene-board-33900__actor[data-actor-id='"+ANBU+"']{left:54%!important}." + BOARD_CLASS+"[data-stage^='office'] .sc-scene-board-33900__actor[data-actor-id='"+PS+"']{left:67%!important}"+
  "#story-scene-presentation-layer[data-sc-kakashi-custody-stage='rooftop_custody'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-previous,#story-scene-presentation-layer[data-sc-kakashi-custody-stage='rooftop_report'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-previous,#story-scene-presentation-layer[data-sc-kakashi-custody-stage='police'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-previous{display:none!important}"+
  "#story-scene-presentation-layer[data-sc-kakashi-custody-stage='rooftop_custody'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-current,#story-scene-presentation-layer[data-sc-kakashi-custody-stage='rooftop_report'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-current,#story-scene-presentation-layer[data-sc-kakashi-custody-stage='police'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-current{left:50%!important;right:auto!important;top:22%!important;bottom:auto!important;transform:translateX(-50%)!important;width:min(31%,430px)!important}"+
  "#story-scene-presentation-layer[data-sc-kakashi-custody-stage^='office'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-previous{display:none!important}"+
  "#story-scene-presentation-layer[data-sc-kakashi-custody-stage^='office'][data-sc-board-ui-mode='performance_narration'] .sc-dialogue-panel-33910{display:none!important}"+
  "#story-scene-presentation-layer[data-sc-kakashi-custody-stage^='office'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-current{left:auto!important;right:7.5%!important;top:14.5%!important;bottom:auto!important;transform:none!important;width:min(25.5%,390px)!important}"+
  "#"+RECEIPT_ID+"{position:fixed;inset:0;z-index:120000;display:grid;place-items:center;padding:32px;background:rgba(2,6,10,.98);color:#eee6d2}#"+RECEIPT_ID+" .card{width:min(980px,94vw);max-height:90vh;overflow:auto;padding:32px;border:1px solid rgba(214,169,58,.55);background:#091016}#"+RECEIPT_ID+" .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:25px 0}#"+RECEIPT_ID+" button{min-height:46px;padding:0 22px}";
  document.head.appendChild(s);return true;
}
function setBackdrop(stage,path){stage.style.backgroundImage='linear-gradient(180deg,rgba(2,5,8,.03),rgba(2,5,8,.08) 55%,rgba(2,5,8,.62)),url("'+String(path).replace(/"/g,"%22")+'")';stage.style.backgroundPosition="center";stage.style.backgroundSize="cover";stage.style.backgroundRepeat="no-repeat";}
function render(){
  if(typeof document==="undefined")return false;const rt=active(),p=sequence(rt);if(!rt||!p)return false;const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer;
  installStyle();layer.dataset.scKakashiCustodyStage=p.cfg.stage;setBackdrop(stage,p.cfg.bg);let b=stage.querySelector("."+BOARD_CLASS);if(!b){b=document.createElement("section");b.className=BOARD_CLASS;b.setAttribute("aria-hidden","true");stage.appendChild(b);}b.dataset.stage=p.cfg.stage;b.innerHTML=board(rt,p);
  const text=layer.querySelector(".sc-story-text");if(text)text.textContent=p.cue.text;const name=layer.querySelector(".sc-story-name");if(name){name.textContent=p.cue.kind==="dialogue"?p.cue.speaker:"NARRATION";name.style.display="block";}
  const kicker=layer.querySelector(".sc-story-kicker");if(kicker)kicker.textContent=p.cfg.stage.indexOf("office")===0?"HOKAGE'S OFFICE · HIDDEN OPERATION":p.cfg.stage==="police"?"UCHIHA POLICE FORCE · ACADEMY KAKASHI":p.cfg.stage.indexOf("rooftop")===0?"ANBU REPORT · ACADEMY KAKASHI":"NARRATION · ACADEMY KAKASHI";return true;
}
function wipe(next){if(typeof document==="undefined")return next();const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return next();const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer,n=document.createElement("div");n.style.cssText="position:absolute;inset:0;z-index:99;background:#000;opacity:0;transition:opacity 260ms ease;pointer-events:none";stage.appendChild(n);if(typeof requestAnimationFrame==="function")requestAnimationFrame(function(){n.style.opacity="1";});else n.style.opacity="1";setTimeout(function(){next();n.style.opacity="0";setTimeout(function(){try{n.remove();}catch(_error){}},280);},280);return{success:true,pending:true};}
function enterBeat(id,route){const rt=active();if(!rt)return{success:false,reason:"kakashi_immediate_custody_runtime_missing"};rt.beatId=id;rt.localContext=Object.assign({},rt.localContext||{},{[ROUTE_KEY]:route.key,[CURSOR_KEY]:0});save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:id};}
function transitionAfter(route,beatId){
  if(route.key==="ANBU"){if(beatId===D06)return enterBeat(D07,route);if(beatId===D07){const r=commitReport(route);if(!r||r.success!==true)return r;const h=commitHidden(route);if(!h||h.success!==true)return h;return enterBeat(D08,route);}return openReceipt(route);}
  if(beatId===E06)return enterBeat(E07,route);if(beatId===E07){const t=commitTransfer(route);if(!t||t.success!==true)return t;return enterBeat(E08,route);}if(beatId===E08){const r=commitReport(route);if(!r||r.success!==true)return r;const h=commitHidden(route);if(!h||h.success!==true)return h;return enterBeat(E09,route);}return openReceipt(route);
}
function receiptRows(route){return route.key==="ANBU"?{decisions:["Stopped Masked Interceptor after the package handoff.","Chose to end pursuit and return Masked Interceptor alive to ANBU."],outcomes:["Package Smuggler escaped with the package.","ANBU Marked Target escaped.","Kakashi defeated Masked Interceptor in PL Battle.","Masked Interceptor was transferred alive to ANBU.","Kakashi truthfully reported the failed package objective."],history:["Masked Interceptor will remember that Kakashi brought her back alive.","No Pakkun involvement was created on this route.","Kakashi did not learn the hidden operation behind the assignment."]}:{decisions:["Stopped Masked Interceptor after the package handoff.","Chose to end pursuit and transfer Masked Interceptor to the Uchiha Police Force."],outcomes:["Package Smuggler escaped with the package.","ANBU Marked Target escaped.","Kakashi defeated Masked Interceptor in PL Battle.","Masked Interceptor entered Uchiha Police Force custody.","Kakashi then truthfully reported that custody to ANBU."],history:["Masked Interceptor remained in Police custody at Origin closure.","No Pakkun involvement was created on this route.","Kakashi acted on the facts available to him and did not learn the hidden operation."]};}
function openReceipt(route){
  const rt=active(),h=commitHidden(route);if(!rt||!h||h.success!==true)return h||{success:false,reason:"kakashi_immediate_custody_hidden_review_required"};const receipt=TERMINAL.commitChronicleReceiptAndRewards();if(!receipt||receipt.success!==true)return receipt||{success:false,reason:"chronicle_receipt_commit_failed"};rt.beatId=RECEIPT;rt.localContext=Object.assign({},rt.localContext||{},{[ROUTE_KEY]:route.key});save();
  if(typeof document==="undefined")return{success:true,headless:true};installStyle();const old=document.getElementById(RECEIPT_ID);if(old)old.remove();const rows=receiptRows(route),li=function(a){return a.map(function(x){return"<li>"+esc(x)+"</li>";}).join("");},node=document.createElement("div");node.id=RECEIPT_ID;node.innerHTML='<div class="card"><div class="eye">YOUR ORIGIN</div><h1>ACADEMY KAKASHI</h1><div class="sub">RECORDED IN YOUR CHRONICLE</div><div class="grid"><section><h2>YOUR DECISIONS</h2><ul>'+li(rows.decisions)+'</ul></section><section><h2>WHAT HAPPENED</h2><ul>'+li(rows.outcomes)+'</ul></section><section><h2>HISTORY CREATED</h2><ul>'+li(rows.history)+'</ul></section></div><button type="button">ENTER KONOHA</button><div class="err" hidden></div></div>';document.body.appendChild(node);const b=node.querySelector("button"),e=node.querySelector(".err");b.addEventListener("click",function(){b.disabled=true;const out=completeToKonoha();if(!out||out.success!==true){b.disabled=false;e.hidden=false;e.textContent=String(out&&out.reason||"Origin completion is not ready.");}});return{success:true};
}
function completeToKonoha(){const rt=active();if(!rt||rt.beatId!==RECEIPT)return{success:false,reason:"chronicle_receipt_not_active"};const done=TERMINAL.guardedOriginCompletion();if(!done||done.success!==true)return done||{success:false,reason:"origin_completion_failed"};if(typeof document!=="undefined"){const n=document.getElementById(RECEIPT_ID);if(n)n.remove();}rt.beatId=EXIT;save();let adv={success:true};try{adv=globalThis.advanceStoryScene();}catch(_error){}const open=function(){try{if(typeof openOverlay==="function")return openOverlay("village");if(typeof globalThis.openOverlay==="function")return globalThis.openOverlay("village");}catch(_error){}return null;};if(typeof setTimeout==="function")setTimeout(open,40);else open();return{success:adv&&adv.success!==false,destination:"konoha_village",completion:done};}
function wireChoices(){const def=scene(),m=def&&def.beatMap instanceof Map?def.beatMap:null,beat=m&&m.get(SOURCE_BEAT);if(!beat||!Array.isArray(beat.choices))return false;const wire=function(route,requestId){const row=beat.choices.find(function(x){return x&&x.choiceId===route.choiceId;});if(!row)return false;row.nextBeatId=route.firstBeat;row.consequenceRequests=[{requestId,kind:"domain",resolve:function(){return commitStart(route);}}];return true;};return wire(ROUTES.ANBU,REQUEST_ANBU)&&wire(ROUTES.POLICE,REQUEST_POLICE);}
function routeForChoice35800(choiceId){return choiceId===CHOICE_ANBU?ROUTES.ANBU:choiceId===CHOICE_POLICE?ROUTES.POLICE:null;}
function beginImmediateCustodyChoice35800(choiceId){
  const route=routeForChoice35800(choiceId),rt=active();if(!route||!eligibleSource(rt))return{success:false,reason:"kakashi_immediate_custody_source_state_required"};
  const start=commitStart(route);if(!start||start.success!==true)return start||{success:false,reason:"kakashi_immediate_custody_commit_failed"};
  rt.beatId=route.firstBeat;rt.localContext=Object.assign({},rt.localContext||{},{[ROUTE_KEY]:route.key,[CURSOR_KEY]:0});save();
  try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}
  return{success:true,beatId:route.firstBeat,route:route.key,occurrenceId:start.occurrenceId};
}
function installBrowserChoiceCapture(){if(typeof document==="undefined"||document.__scKakashiImmediateCustody35800)return false;document.__scKakashiImmediateCustody35800=true;document.addEventListener("click",function(event){const target=event&&event.target&&typeof event.target.closest==="function"?event.target.closest(".sc-story-choice"):null;if(!target||!eligibleSource())return;const label=String(target.textContent||"").replace(/\s+/g," ").trim().toUpperCase();let choice=null;if(label.includes("TAKE HER BACK TO ANBU"))choice=CHOICE_ANBU;else if(label.includes("TAKE HER TO THE UCHIHA POLICE FORCE"))choice=CHOICE_POLICE;else return;if(event&&typeof event.preventDefault==="function")event.preventDefault();if(event&&typeof event.stopImmediatePropagation==="function")event.stopImmediatePropagation();wireChoices();beginImmediateCustodyChoice35800(choice);},true);return true;}

if(!installBeats())throw new Error("kakashi_immediate_custody_35800_beats_missing");
let hooked=false,tries=0;
function hooks(){
  if(hooked)return true;if(typeof globalThis.advanceStoryScene!=="function"||typeof globalThis.getStoryScenePerformance33900!=="function")return false;
  const PA=globalThis.advanceStoryScene,PG=globalThis.getStoryScenePerformance33900,PR=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
  globalThis.getStoryScenePerformance33900=function(){const p=sequence(active());return p||PG.apply(this,arguments);};
  globalThis.advanceStoryScene=function(choiceId){if(arguments.length===0)choiceId=null;const rt=active(),p=sequence(rt);if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===SOURCE_BEAT&&(choiceId===CHOICE_ANBU||choiceId===CHOICE_POLICE))return beginImmediateCustodyChoice35800(choiceId);if(p&&(choiceId===null||choiceId===undefined)){if(!p.atEnd){rt.localContext=Object.assign({},rt.localContext||{},{[CURSOR_KEY]:p.index+1});save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:rt.beatId,cueIndex:p.index+1};}return wipe(function(){return transitionAfter(p.route,rt.beatId);});}const out=PA.apply(this,arguments),after=active();if(after&&routeForBeat(after.beatId)){after.localContext=Object.assign({},after.localContext||{},{[CURSOR_KEY]:0});save();try{renderStoryScenePresentationLayer();}catch(_error){}}return out;};
  try{advanceStoryScene=globalThis.advanceStoryScene;getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;}catch(_error){}
  if(PR){globalThis.renderStoryScenePresentationLayer=function(){const out=PR.apply(this,arguments),settle=function(){wireChoices();render();};if(typeof queueMicrotask==="function")queueMicrotask(settle);else if(typeof setTimeout==="function")setTimeout(settle,0);else settle();return out;};try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}}
  hooked=true;wireChoices();installBrowserChoiceCapture();return true;
}
function ensure(){if(hooks())return;if(typeof setTimeout==="function"&&tries++<120)setTimeout(ensure,25);}ensure();

function diagnostics(){const m=scene()&&scene().beatMap instanceof Map?scene().beatMap:null;const checks={
  patchId:PATCH_ID==="alpha_kakashi_immediate_custody_35800_v2_2026_09_19",
  raisedRouteDialogueBand:installStyle.toString().includes("data-sc-kakashi-custody-stage=\'rooftop_custody\'")&&installStyle.toString().includes("top:22%!important")&&installStyle.toString().includes("transform:translateX(-50%)!important"),
  officeDialogueSafeAnchor:installStyle.toString().includes("right:7.5%!important")&&installStyle.toString().includes("top:14.5%!important")&&installStyle.toString().includes("width:min(25.5%,390px)!important"),
  authorities:AUTH.d06==="24b7956781d2da6d3d1f70ce18d1ef0de348cfae"&&AUTH.d08==="e135e9c6dff4f0e5235bf96aab1aa0e90a985bc4"&&AUTH.e07==="6cb1f7e59ce05e75e35d3cc1f0d59cbf1722d0c4"&&AUTH.e09==="0dafcca4f13afe437b7b81d9ef6ec09569d36efc",
  exactCueCounts:CUES.d06.length===21&&CUES.d07.length===28&&CUES.d08.length===41&&CUES.e06.length===18&&CUES.e07.length===42&&CUES.e08.length===21&&CUES.e09.length===26,
  beats:!!m&&[D06,D07,D08,E06,E07,E08,E09,RECEIPT,EXIT].every(function(id){return m.has(id);}),
  policeAssets:POLICE_A_IMG==="NPC/uchiha_police_force_member_female.png"&&POLICE_B_IMG==="NPC/uchiha_police_force_male_alt_1.png",
  pursuitsClose:commitStart.toString().includes("kakashiScene05AWPackagePursuitEligible:false")&&commitStart.toString().includes("kakashiScene05AWAmtPursuitEligible:false"),
  policeNotAnbu:commitTransfer.toString().includes('destination=route.key==="ANBU"?"ANBU":"UCHIHA_POLICE"'),
  hiddenKnowledgeBoundary:commitHidden.toString().includes("kakashiKnowledgeGranted:false")&&commitHidden.toString().includes("kakashiLearnsHiddenOperationTruth:false"),
  receiptSeparate:openReceipt.toString().includes("document.body.appendChild"),directCustodyEntrypoint:beginImmediateCustodyChoice35800.toString().includes("rt.beatId=route.firstBeat")&&globalThis.advanceStoryScene.toString().includes("beginImmediateCustodyChoice35800"),browserCapture:installBrowserChoiceCapture.toString().includes("beginImmediateCustodyChoice35800")&&installBrowserChoiceCapture.toString().includes("stopImmediatePropagation"),browserGoldenClaimed:false
};const failed=Object.entries(checks).filter(function(x){return x[0]!=="browserGoldenClaimed"&&x[1]!==true;}).map(function(x){return x[0];});return{pass:failed.length===0,checks,failed,authorities:AUTH,browserGoldenClaimed:false};}
globalThis.runAcademyKakashiImmediateCustody35800Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_IMMEDIATE_CUSTODY_35800=Object.freeze({patchId:PATCH_ID,authorities:AUTH,anbuFirstBeat:D06,policeFirstBeat:E06,receiptBeatId:RECEIPT,exitBeatId:EXIT,wireChoices,beginImmediateCustodyChoice:beginImmediateCustodyChoice35800,commitStart,commitTransfer,commitReport,commitHidden,diagnostics,browserGoldenClaimed:false});
})();