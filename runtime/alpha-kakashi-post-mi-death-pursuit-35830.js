// ============================================================================
// ISSUE #252 — KAKASHI STOP THE ASSASSIN POST-MI-DEATH PURSUITS — 35830
//
// Writing authorities:
// - PS successor: bf30ca7dfff9f850bebe978acdd8830f16758042
// - direct AMT successor: e18729844922461c654481745e48a6eac20649cd
//
// This owner consumes the already-committed MI death from either deterministic
// KILL or resolver-successful ATTEMPT. It never rerolls MI death.
// ============================================================================
(function installAcademyKakashiPostMiDeathPursuit35830(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_POST_MI_DEATH_PURSUIT_35830)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const BATTLE=globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300;
if(!A||!CORE||!BATTLE)throw new Error("kakashi_post_mi_pursuit_35830_dependencies_missing");

const PATCH_ID="alpha_kakashi_post_mi_death_pursuit_35830_v10_2026_09_19";
const AUTH_PS="bf30ca7dfff9f850bebe978acdd8830f16758042";
const AUTH_AMT="e18729844922461c654481745e48a6eac20649cd";
const AUTH_LIVE="bf16ebe0f677994878fbe60e30e7b546da899eb8";
const POST_BATTLE_AGENCY_AUTHORITY="1ff3876e9b367ec518c254b612e4def14db8eaba";
const FIELD_SECURED_AUTHORITY="77d351e6f8d4eefaea0f8a6db82dec686391e1c0";
const ORIGIN_ID="academy_kakashi",SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const MI="academy_kakashi_origin_masked_interceptor",PS="academy_kakashi_origin_package_smuggler",AMT="academy_kakashi_origin_amt",PAKKUN="pakkun_origin_unfamiliar_ninken",KAK="academy_kakashi";
const PACKAGE="kakashi_origin_outer_route_packet";
const LIVE_SOURCE="kak_scene05a_w_choice",RESOLVER_SOURCE="kak_scene06a_w2c_scene7_pending",DETERMINISTIC_SOURCE="kak_scene06a_w2c_deterministic_kill_pursuit_35810";
const ENTRY_IDS=Object.freeze({
 ps:Object.freeze(["scene05aw_go_after_package_smuggler","scene06aw2c_postlethal_go_after_package_smuggler","scene06aw2c_dkill_go_after_package_smuggler"]),
 amt:Object.freeze(["scene05aw_go_after_anbu_marked_target","scene06aw2c_postlethal_go_after_anbu_marked_target","scene06aw2c_dkill_go_after_anbu_marked_target"])
});
const PS_CONFIG="academy_kakashi_origin_battle_seq_ps",AMT_CONFIG="academy_kakashi_origin_battle_seq_amt_pakkun";
const AMT_ALLEY_ASSET_ID="kakashi_origin_pakkun_interception_alley";
const PS_BINDING="academy_kakashi.battle.stop_assassin_post_mi_ps",AMT_BINDING="academy_kakashi.battle.stop_assassin_post_mi_amt";
const BEAT=Object.freeze({
 psChase:"kak_stop_postmi_ps_chase_35830",psFail:"kak_stop_postmi_ps_fail_35830",psCatch:"kak_stop_postmi_ps_catch_35830",psBattle:"kak_stop_postmi_ps_battle_35830",psReturn:"kak_stop_postmi_ps_return_35830",psWin:"kak_stop_postmi_ps_win_35830",psLoss:"kak_stop_postmi_ps_loss_35830",psDecision:"kak_stop_postmi_ps_decision_35830",psReport:"kak_stop_postmi_ps_report_boundary_35830",
 amtChase:"kak_stop_postmi_amt_chase_35830",amtFail:"kak_stop_postmi_amt_fail_35830",amtCatch:"kak_stop_postmi_amt_catch_35830",psToAmt:"kak_stop_postmi_ps_to_amt_35830",amtBattle:"kak_stop_postmi_amt_battle_35830",amtReturn:"kak_stop_postmi_amt_return_35830",amtWin:"kak_stop_postmi_amt_win_35830",amtDecision:"kak_stop_postmi_amt_decision_35830",amtLiveReturn:"kak_stop_postmi_amt_live_return_35830",amtKill:"kak_stop_postmi_amt_kill_35830",amtReport:"kak_stop_postmi_amt_report_boundary_35830"
});
const CUES={"psChase":[{"kind":"narration","text":"Kakashi moves before Package Smuggler disappears completely."},{"kind":"narration","text":"The Sakura tree drops behind him."},{"kind":"narration","text":"A turn."},{"kind":"narration","text":"A narrow street."},{"kind":"narration","text":"Another roofline."},{"kind":"narration","text":"Package Smuggler is already well ahead."},{"kind":"narration","text":"But Kakashi can still see him."},{"kind":"narration","text":"The package is tucked close against the man's side."},{"kind":"narration","text":"He is running hard now."},{"kind":"narration","text":"Not looking for somewhere to hide."},{"kind":"narration","text":"Looking for enough distance that he will not need to."},{"kind":"narration","text":"Kakashi increases his pace."}],"psFail":[{"kind":"narration","text":"Kakashi clears the next junction."},{"kind":"narration","text":"Nothing."},{"kind":"narration","text":"He takes the roofline instead."},{"kind":"narration","text":"Still nothing."},{"kind":"narration","text":"The trail has stretched too far."},{"kind":"narration","text":"Package Smuggler is gone."},{"kind":"narration","text":"And the package has gone with him."},{"kind":"narration","text":"Whatever lead Kakashi had on ANBU Marked Target is gone with the time he spent here."},{"kind":"narration","text":"There is no second pursuit left to take."}],"psCatch":[{"kind":"narration","text":"Package Smuggler turns into the next street."},{"kind":"narration","text":"Kakashi lands ahead of him."},{"kind":"narration","text":"The man stops sharply."},{"kind":"narration","text":"His eyes go first to Kakashi."},{"kind":"narration","text":"Then back the way he came."},{"kind":"narration","text":"Masked Interceptor is not coming."},{"kind":"narration","text":"His grip tightens around the package."},{"kind":"dialogue","speaker":"PACKAGE SMUGGLER","text":"You should've stayed with the woman you put down."},{"kind":"dialogue","speaker":"KAKASHI","text":"That was what you were counting on. She bought you distance. She just didn't buy you enough."},{"kind":"narration","text":"Package Smuggler glances toward the nearest side street."},{"kind":"narration","text":"Kakashi shifts with him before he can commit to it."},{"kind":"dialogue","speaker":"PACKAGE SMUGGLER","text":"You don't even know what you're carrying."},{"kind":"dialogue","speaker":"KAKASHI","text":"Maybe not. But I know it was handed over in the middle of the night by a man ANBU sent me to follow. That's enough reason to take it back."},{"kind":"dialogue","speaker":"PACKAGE SMUGGLER","text":"You think taking it back fixes this?"},{"kind":"dialogue","speaker":"KAKASHI","text":"No. It fixes the part in your hands."},{"kind":"narration","text":"The man's free hand drops toward his weapon."},{"kind":"narration","text":"Kakashi's posture changes with it."}],"psLoss":[{"kind":"narration","text":"Package Smuggler finds the opening first."},{"kind":"narration","text":"Kakashi tries to close it."},{"kind":"narration","text":"Too late."},{"kind":"narration","text":"The man breaks past him."},{"kind":"narration","text":"The package remains with its last factual holder."},{"kind":"narration","text":"By the time Kakashi can move after him again, the street ahead is empty."}],"psWin":[{"kind":"narration","text":"Package Smuggler goes down."},{"kind":"narration","text":"For a moment, Kakashi stays on him."},{"kind":"narration","text":"Makes sure he is not getting straight back up."},{"kind":"narration","text":"Then his attention moves."},{"kind":"narration","text":"To the package."},{"kind":"narration","text":"Package Smuggler is down."},{"kind":"narration","text":"Kakashi's eye goes to the package."},{"kind":"narration","text":"He takes it from the defeated man's reach, checks it once, and secures it against his body."},{"kind":"narration","text":"Only then does he look toward the route ANBU Marked Target took."}],"psToAmt":[{"kind":"narration","text":"Kakashi leaves Package Smuggler behind."},{"kind":"narration","text":"The recovered package is secured against him."},{"kind":"narration","text":"The other trail is thinner now."},{"kind":"narration","text":"Not gone."},{"kind":"narration","text":"He takes the roofs."},{"kind":"narration","text":"Cuts across a side street."},{"kind":"narration","text":"Drops to ground level again."},{"kind":"narration","text":"Movement ahead."},{"kind":"narration","text":"ANBU Marked Target."},{"kind":"narration","text":"Still running."},{"kind":"narration","text":"Kakashi closes."},{"kind":"narration","text":"The man reaches the next street—"},{"kind":"narration","text":"and stops."},{"kind":"narration","text":"A small ninken is already standing in the route ahead."},{"kind":"narration","text":"Pakkun looks past him."},{"kind":"narration","text":"At Kakashi."},{"kind":"dialogue","speaker":"PAKKUN","text":"This yours?"},{"kind":"narration","text":"Kakashi slows beside the far end of the street."},{"kind":"narration","text":"His eye stays on ANBU Marked Target."},{"kind":"dialogue","speaker":"KAKASHI","text":"Apparently."},{"kind":"narration","text":"ANBU Marked Target looks between them."},{"kind":"narration","text":"Then at the package secured against Kakashi."},{"kind":"dialogue","speaker":"ANBU MARKED TARGET","text":"You recovered it."},{"kind":"dialogue","speaker":"KAKASHI","text":"I did."},{"kind":"narration","text":"His eyes return to the man in front of him."},{"kind":"dialogue","speaker":"KAKASHI","text":"And you're still coming back with me."},{"kind":"narration","text":"ANBU Marked Target's expression hardens."},{"kind":"dialogue","speaker":"ANBU MARKED TARGET","text":"You think carrying that package means you understand what happened?"},{"kind":"dialogue","speaker":"KAKASHI","text":"No. It means I recovered what I was sent to recover. You're a separate problem."},{"kind":"narration","text":"Pakkun shifts off the centreline without waiting for an instruction."},{"kind":"dialogue","speaker":"ANBU MARKED TARGET","text":"And what exactly are you planning to do with me?"},{"kind":"narration","text":"Kakashi watches his stance."},{"kind":"dialogue","speaker":"KAKASHI","text":"That depends on how difficult you make the next few seconds."}],"psAmtWin":[{"kind":"narration","text":"ANBU Marked Target hits the ground hard enough to stay there."},{"kind":"narration","text":"Kakashi does not immediately move away."},{"kind":"narration","text":"Neither does Pakkun."},{"kind":"narration","text":"The package remains secured."},{"kind":"narration","text":"The man does not."},{"kind":"narration","text":"Not yet."}],"amtChase":[{"kind":"narration","text":"Kakashi looks once toward the route Package Smuggler took."},{"kind":"narration","text":"The package is moving farther away."},{"kind":"narration","text":"He turns in the other direction."},{"kind":"narration","text":"After the man who brought it here."},{"kind":"narration","text":"It is not the obvious choice."},{"kind":"narration","text":"And the cost is immediate."},{"kind":"narration","text":"Every second Kakashi spends on this trail belongs to Package Smuggler too."},{"kind":"narration","text":"There will be no going back for both."},{"kind":"narration","text":"Kakashi takes the roofline."},{"kind":"narration","text":"ANBU Marked Target is still ahead."},{"kind":"narration","text":"Barely."}],"amtFail":[{"kind":"narration","text":"Kakashi follows the trail across two rooftops."},{"kind":"narration","text":"Then three."},{"kind":"narration","text":"The spacing changes."},{"kind":"narration","text":"One landing mark becomes several."},{"kind":"narration","text":"Then none."},{"kind":"narration","text":"He drops into the street below and checks the exits."},{"kind":"narration","text":"Too many."},{"kind":"narration","text":"ANBU Marked Target has broken the pursuit."},{"kind":"narration","text":"The package trail is already gone in the opposite direction."},{"kind":"narration","text":"Kakashi has lost both."}],"amtCatch":[{"kind":"narration","text":"ANBU Marked Target rounds the next corner."},{"kind":"narration","text":"Then stops."},{"kind":"narration","text":"A small ninken is sitting in the street ahead of him."},{"kind":"narration","text":"He looks at it."},{"kind":"narration","text":"The ninken looks past him."},{"kind":"narration","text":"Kakashi lands behind."},{"kind":"narration","text":"Pakkun's ears lift."},{"kind":"dialogue","speaker":"PAKKUN","text":"This yours?"},{"kind":"narration","text":"Kakashi keeps his attention on the man between them."},{"kind":"dialogue","speaker":"KAKASHI","text":"Apparently."},{"kind":"narration","text":"ANBU Marked Target turns enough to see Kakashi clearly."},{"kind":"dialogue","speaker":"ANBU MARKED TARGET","text":"You know I don't have the package anymore."},{"kind":"dialogue","speaker":"KAKASHI","text":"I know. I watched you hand it off."},{"kind":"narration","text":"The man's expression shifts."},{"kind":"narration","text":"He had expected that fact to matter more."},{"kind":"dialogue","speaker":"ANBU MARKED TARGET","text":"Then why are you still following me?"},{"kind":"narration","text":"Kakashi glances once toward the route behind them."},{"kind":"narration","text":"Then back to him."},{"kind":"dialogue","speaker":"KAKASHI","text":"Because I had time to chase one of you."},{"kind":"narration","text":"He settles his stance."},{"kind":"dialogue","speaker":"KAKASHI","text":"I chose you."},{"kind":"narration","text":"ANBU Marked Target's shoulders tighten."},{"kind":"dialogue","speaker":"ANBU MARKED TARGET","text":"Bad choice."},{"kind":"dialogue","speaker":"KAKASHI","text":"We'll know in a minute."},{"kind":"narration","text":"Pakkun rises."},{"kind":"narration","text":"Not because Kakashi tells him to."},{"kind":"narration","text":"Because ANBU Marked Target has already shifted his weight toward an exit."},{"kind":"dialogue","speaker":"PAKKUN","text":"He's going to run."},{"kind":"narration","text":"Kakashi's eye follows the same movement."},{"kind":"dialogue","speaker":"KAKASHI","text":"I know."}],"amtWin":[{"kind":"narration","text":"The fight ends with ANBU Marked Target on the ground."},{"kind":"narration","text":"The package is still a separate problem."},{"kind":"narration","text":"Package Smuggler is somewhere else in the village."},{"kind":"narration","text":"Kakashi made that trade when he chose this pursuit."},{"kind":"narration","text":"But the man he followed is no longer running."}],"amtReturn":[{"kind":"narration","text":"Kakashi secures the defeated man for the return journey."},{"kind":"narration","text":"Pakkun stays with them."},{"kind":"narration","text":"For now."},{"kind":"narration","text":"The package is still missing."},{"kind":"narration","text":"That fact has not changed."},{"kind":"narration","text":"Neither has the fact that Kakashi chose the person over the objective when there was only time for one pursuit."}],"amtKill":[{"kind":"narration","text":"Kakashi looks down at the man he chased across the village."},{"kind":"narration","text":"The missing package is still missing."},{"kind":"narration","text":"Killing him will not change that."},{"kind":"narration","text":"Kakashi knows it."},{"kind":"narration","text":"The decision is about the man in front of him now."},{"kind":"narration","text":"Not the objective already gone."}]};
const CURSOR="__kakashiPostMiPursuit35830Cursor",STYLE_ID="sc-kakashi-post-mi-pursuit-35830-style",BOARD_CLASS="sc-kakashi-post-mi-pursuit-35830-board";
const BG=Object.freeze({sakura:"Kakashi Origin Backdrop/fight_at_sakura_tree.png",rooftop:"Kakashi Origin Backdrop/rooftop_night.png",psStreet:"Kakashi Origin Backdrop/konoha_alleyway.png",amtStreet:"Kakashi Origin Backdrop/alleyway_konoha_night.png"});
const OBJECTIVE=Object.freeze({ps:"Recover the package.",amt:"Catch ANBU Marked Target.",secureAmt:"Secure ANBU Marked Target.",report:"Return to ANBU."});

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_e){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_e){}}
function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(_e){return v;}}
function factOf(row){return row&&(row.fact||row.data)||{};}
function occurrence(id){try{return id?A.findOccurrence(String(id)):null;}catch(_e){return null;}}
function stable(prefix,payload){return typeof CORE.stableRef==="function"?CORE.stableRef(prefix,payload):prefix+"::"+JSON.stringify(payload||{});}
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function latestResult(){
 const rt=active(),resume=rt&&rt.battleResume&&typeof rt.battleResume==="object"?rt.battleResume:null;
 const candidates=resume?[resume.authored,resume.projected,resume.result,resume.battleResult]:[];
 for(const row of candidates)if(row&&typeof row==="object"&&row.battleConfigId&&row.bindingRef)return row;
 try{const row=projector();if(row&&typeof row==="object"&&row.battleConfigId&&row.bindingRef)return row;}catch(_e){}
 return null;
}
function participantState(ref){try{const s=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{},r=s.participantStates&&s.participantStates[ref];return String(r&&r.stateClass||"");}catch(_e){return"";}}
function postBattleDefeatedLiving(ref){return ["CONTROLLED_DEFEATED","DEFEATED_BUT_NOT_CONTROLLED"].includes(participantState(ref));}
function deathOccurrenceId(rt=active()){return String(rt&&rt.localContext&&(rt.localContext.kakashiDeterministicKillOccurrenceId||rt.localContext.kakashiScene06AW2CResolutionOccurrenceId)||"");}
function deathOccurrence(rt=active()){const id=deathOccurrenceId(rt),row=occurrence(id),f=factOf(row);if(!row||participantState(MI)!=="DEAD")return null;if(!(f.targetDeathConfirmed===true||String(f.selectedOutcomeRef||"")==="LETHAL_ATTEMPT_KILLED"||String(f.semanticClass||"")==="KILL — GUARANTEED"))return null;return{id,row,fact:f,provenance:String(f.semanticClass||"").includes("KILL")?"deterministic_kill":"resolver_successful_attempt"};}
function miResolution(rt=active()){
 const dead=deathOccurrence(rt);if(dead)return{kind:"DEAD",occurrenceId:dead.id,provenance:dead.provenance,deathCommitted:true};
 const state=participantState(MI),battleId=String(rt&&rt.localContext&&rt.localContext.kakashiScene05AWBattleOccurrenceId||"");
 if(rt&&rt.localContext&&rt.localContext.kakashiScene05AWEntered===true&&battleId&&["CONTROLLED_DEFEATED","DEFEATED_BUT_NOT_CONTROLLED"].includes(state))return{kind:state,occurrenceId:battleId,provenance:"battle_defeat",deathCommitted:false};
 return null;
}
function packageOccurrenceId(rt=active()){const mi=miResolution(rt);return String(rt&&rt.localContext&&(rt.localContext.kakashiPostMiPackageOccurrenceId||rt.localContext.kakashiSequentialPackageOccurrenceId35100||rt.localContext.kakashiSequentialPackageOccurrenceId)||(mi&&mi.occurrenceId)||"");}
function packageState(rt=active()){const row=occurrence(packageOccurrenceId(rt)),f=factOf(row);return clone(f.packageState||{objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PS_PERSON"});}
function packageRecoveryParentOccurrenceId35830(rt=active(),preferredId=""){
 const local=rt&&rt.localContext||{};
 const candidates=[preferredId,local.kakashiPostMiPsBattleOccurrenceId,local.kakashiPostMiPursuitResolutionOccurrenceId,local.kakashiPostMiPursuitSelectionOccurrenceId,local.kakashiPostMiPackageOccurrenceId,local.kakashiSequentialPackageOccurrenceId35100,local.kakashiSequentialPackageOccurrenceId]
   .map(value=>String(value||"")).filter((value,index,rows)=>value&&rows.indexOf(value)===index);
 for(const id of candidates){
   const row=occurrence(id),pkg=factOf(row).packageState||{};
   if(row&&String(pkg.objectRef||"")===PACKAGE&&String(pkg.currentHolderClass||pkg.custodyClass||"")==="PACKAGE_SMUGGLER")return id;
 }
 return"";
}
function sourceAvailable(target,rt=active()){
 const mi=miResolution(rt);if(!rt||!mi)return false;
 if(mi.deathCommitted){
  if(target==="ps")return rt.localContext.kakashiDeterministicKillOccurrenceId?rt.localContext.kakashiDeterministicKillPackageAvailable===true:rt.localContext.kakashiScene06AW2CPackageAvailable===true;
  return rt.localContext.kakashiDeterministicKillOccurrenceId?rt.localContext.kakashiDeterministicKillAmtAvailable===true:rt.localContext.kakashiScene06AW2CAMTAvailable===true;
 }
 if(target==="ps")return rt.localContext.kakashiScene05AWPackagePursuitEligible===true;
 return rt.localContext.kakashiScene05AWAmtPursuitEligible===true;
}
function commitOnce(id,fact,outcome,participants,sourceRefs){
 const old=occurrence(id);if(old)return{success:true,idempotent:true,occurrenceId:id,record:old};
 const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_factual_occurrence",outcome,participantRefs:participants,sourceRefs});
 return out&&out.success===true?{success:true,occurrenceId:id,record:out.record}:out||{success:false,reason:"post_mi_pursuit_occurrence_commit_failed"};
}
function commitPursuitSelection(target){
 const rt=active(),mi=miResolution(rt);if(!rt||!mi)return{success:false,reason:"committed_mi_resolution_required"};
 if(!sourceAvailable(target,rt))return{success:false,reason:target+"_pursuit_not_available"};
 const id=stable("occ_origin_kakashi_post_mi_pursuit_choice",{instance:String(rt.instanceId||""),miResolution:mi.occurrenceId,miKind:mi.kind,target});
 const pkg=packageState(rt),successorAuthority=target==="ps"?AUTH_PS:AUTH_AMT;
 const fact={factClass:"academy_kakashi_stop_assassin_post_mi_pursuit_choice",authorityCommit:mi.deathCommitted?successorAuthority:AUTH_LIVE,successorAuthorityCommit:successorAuthority,storySceneInstanceId:String(rt.instanceId||""),sourceMiResolutionOccurrenceId:mi.occurrenceId,sourceMiResolutionState:mi.kind,sourceMiResolutionProvenance:mi.provenance,selectedPursuitTarget:target==="ps"?"PACKAGE_SMUGGLER":"ANBU_MARKED_TARGET",selectionIsNotPursuitSuccess:true,miDeathAlreadyCommitted:mi.deathCommitted,miDeathRerolled:false,miBattleTurns:Number(rt.localContext.kakashiScene05AWTurnCount||0),packageState:pkg,packageSmugglerPursuitAvailableAtSelection:sourceAvailable("ps",rt),anbuMarkedTargetPursuitAvailableAtSelection:sourceAvailable("amt",rt),pakkunPresent:false};
 const out=commitOnce(id,fact,target==="ps"?"PURSUE_PACKAGE_SMUGGLER":"PURSUE_ANBU_MARKED_TARGET",[ORIGIN_ID,MI,target==="ps"?PS:AMT],[{type:"origin_occurrence",id:mi.occurrenceId,role:mi.deathCommitted?"committed_mi_death":"committed_mi_battle_defeat"},{type:"world_object",id:PACKAGE},{type:"writing_authority",id:successorAuthority}]);if(!out.success)return out;
 const patch={kakashiPostMiPursuitSelectionOccurrenceId:id,kakashiPostMiPursuitTarget:target,kakashiPostMiPackageOccurrenceId:id,kakashiPostMiAmtEligibleAtSelection:sourceAvailable("amt",rt),kakashiPostMiSourceState:mi.kind,[CURSOR]:0};
 if(target==="amt"){patch.kakashiScene05AWPackagePursuitEligible=false;patch.kakashiScene06AW2CPackageAvailable=false;patch.kakashiDeterministicKillPackageAvailable=false;patch.kakashiPostMiPsPursuitClosedPermanently=true;}
 rt.localContext={...(rt.localContext||{}),...patch};save();return{success:true,occurrenceId:id,target,miState:mi.kind};
}
function resolveSelectedPursuit(target){
 const rt=active(),sel=occurrence(rt&&rt.localContext&&rt.localContext.kakashiPostMiPursuitSelectionOccurrenceId),sf=factOf(sel);if(!rt||!sel||sf.selectedPursuitTarget!==(target==="ps"?"PACKAGE_SMUGGLER":"ANBU_MARKED_TARGET"))return{success:false,reason:"post_mi_pursuit_selection_missing"};
 const eligible=target==="ps"?sf.packageSmugglerPursuitAvailableAtSelection===true:sf.anbuMarkedTargetPursuitAvailableAtSelection===true;
 const id=stable("occ_origin_kakashi_post_mi_pursuit_resolution",{selection:String(rt.localContext.kakashiPostMiPursuitSelectionOccurrenceId),target,eligible});
 const fact={factClass:"academy_kakashi_stop_assassin_post_mi_pursuit_resolution",authorityCommit:target==="ps"?AUTH_PS:AUTH_AMT,storySceneInstanceId:String(rt.instanceId||""),parentSelectionOccurrenceId:String(rt.localContext.kakashiPostMiPursuitSelectionOccurrenceId),targetRef:target==="ps"?PS:AMT,selectedOutcomeRef:eligible?"PURSUIT_SUCCESS_REACHED":"PURSUIT_FAILURE_ESCAPED",sourceMiResolutionState:String(sf.sourceMiResolutionState||"DEAD"),packageState:packageState(rt),pakkunPresent:false};
 const out=commitOnce(id,fact,fact.selectedOutcomeRef,[ORIGIN_ID,target==="ps"?PS:AMT],[{type:"origin_occurrence",id:String(rt.localContext.kakashiPostMiPursuitSelectionOccurrenceId),role:"pursuit_selection"}]);if(!out.success)return out;
 rt.localContext={...(rt.localContext||{}),kakashiPostMiPursuitResolutionOccurrenceId:id,kakashiPostMiPackageOccurrenceId:id,kakashiPostMiPursuitReached:eligible};save();return{success:true,reached:eligible,occurrenceId:id};
}
function launchPs({active:rt,returnContext}={}){if(!rt)return{success:false,reason:"post_mi_ps_story_missing"};return BATTLE.launchAcademyKakashiOriginPlBattle({storyOccurrenceId:String(rt.instanceId),sourceAnchorRef:"AK_SA_022",bindingRef:PS_BINDING,battleConfigId:PS_CONFIG,returnToken:String(rt.instanceId)+":stop-post-mi:ps",returnContext,pakkunAuthorized:false});}
function launchAmt({active:rt,returnContext}={}){if(!rt)return{success:false,reason:"post_mi_amt_story_missing"};if(rt.localContext&&rt.localContext.kakashiPostMiPakkunPresent!==true)return{success:false,reason:"post_mi_amt_pakkun_reach_not_committed"};return BATTLE.launchAcademyKakashiOriginPlBattle({storyOccurrenceId:String(rt.instanceId),sourceAnchorRef:"AK_SA_022",bindingRef:AMT_BINDING,battleConfigId:AMT_CONFIG,returnToken:String(rt.instanceId)+":stop-post-mi:amt:"+String(rt.localContext.kakashiPostMiAmtRoute||"direct"),returnContext,pakkunAuthorized:true});}
function projector(){return typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult():null;}

function commitPakkunReach(route){
 const rt=active();if(!rt)return{success:false,reason:"post_mi_amt_story_missing"};const id=stable("occ_origin_kakashi_post_mi_amt_pakkun_reach",{instance:String(rt.instanceId||""),route,package:packageOccurrenceId(rt)});
 const fact={factClass:"academy_kakashi_stop_assassin_amt_reached_with_pakkun",authorityCommit:route==="ps_amt"?AUTH_PS:AUTH_AMT,storySceneInstanceId:String(rt.instanceId||""),route,packageState:packageState(rt),participantStateByRef:{[PAKKUN]:{presenceState:"PRESENT",temporaryParticipationOnly:true,ownershipGranted:false,nameKnowledgeGranted:false}},worldFacts:{pakkunPresent:true,pakkunAutonomous:true,packageCustodyUnchanged:true}};
 const out=commitOnce(id,fact,"AMT_REACHED_PAKKUN_PRESENT",[ORIGIN_ID,AMT,PAKKUN],[{type:"origin_occurrence",id:String(rt.localContext.kakashiPostMiPursuitResolutionOccurrenceId||rt.localContext.kakashiPostMiPsBattleOccurrenceId||""),role:"reach_context"},{type:"writing_authority",id:route==="ps_amt"?AUTH_PS:AUTH_AMT}].filter(x=>x.id));if(!out.success)return out;
 rt.localContext={...(rt.localContext||{}),kakashiPostMiPakkunReachOccurrenceId:id,kakashiPostMiPakkunPresent:true,kakashiPostMiAmtRoute:route};save();return{success:true,occurrenceId:id};
}
function consumePsReturn(){
 const rt=active(),r=latestResult();if(!rt||rt.beatId!==BEAT.psReturn)return{success:false,reason:"post_mi_ps_return_context_required"};if(rt.localContext&&rt.localContext.kakashiPostMiPsReturnProcessed===true)return{success:true,idempotent:true};
 if(!r||String(r.battleConfigId||"")!==PS_CONFIG||String(r.bindingRef||"")!==PS_BINDING)return{success:false,reason:"post_mi_ps_battle_receipt_mismatch"};
 const victory=String(r.resultState||"")==="player_side_victory",turns=Number(r.playerActionOpportunityCount||0),id=stable("occ_origin_kakashi_post_mi_ps_battle_return",{battle:String(r.battleOccurrenceId||""),result:String(r.resultState||"")});
 const mi=miResolution(rt),fact={factClass:"academy_kakashi_stop_assassin_post_mi_ps_battle_return",authorityCommit:AUTH_PS,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),battleConfigId:PS_CONFIG,battleResultState:String(r.resultState||""),playerActionOpportunityCount:turns,packageState:packageState(rt),miResolutionOccurrenceId:mi&&mi.occurrenceId||"",miResolutionState:mi&&mi.kind||"",miDeathRerolled:false};
 const committed=commitOnce(id,fact,victory?"PS_BATTLE_VICTORY":"PS_BATTLE_DEFEAT",[ORIGIN_ID,PS],[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"origin_occurrence",id:mi&&mi.occurrenceId||"",role:mi&&mi.deathCommitted?"mi_death":"mi_battle_defeat"}].filter(x=>x.id));if(!committed.success)return committed;
 if(victory){
   const recoveryParent=packageRecoveryParentOccurrenceId35830(rt,id);
   if(!recoveryParent)return{success:false,reason:"post_mi_ps_package_recovery_parent_missing",battleReturnOccurrenceId:id};
   rt.localContext={...(rt.localContext||{}),kakashiPostMiPsBattleOccurrenceId:id,kakashiPostMiPackageOccurrenceId:recoveryParent,kakashiSequentialPackageOccurrenceId:recoveryParent,kakashiSequentialPackageOccurrenceId35100:recoveryParent};save();
   if(typeof resolveAcademyKakashiSequentialPostPsPackageRecovery35600!=="function")return{success:false,reason:"ak_sa_033_package_recovery_owner_missing"};
   const recovered=resolveAcademyKakashiSequentialPostPsPackageRecovery35600();if(!recovered||recovered.success!==true)return recovered||{success:false,reason:"ak_sa_033_package_recovery_failed"};
   const pkgId=String(recovered.packageOccurrenceId||rt.localContext.kakashiSequentialPackageOccurrenceId35100||rt.localContext.kakashiSequentialPackageOccurrenceId||"");
   const selection=factOf(occurrence(rt.localContext&&rt.localContext.kakashiPostMiPursuitSelectionOccurrenceId));
   const amtEligibleAtSelection=selection.anbuMarkedTargetPursuitAvailableAtSelection===true;
   rt.localContext={...(rt.localContext||{}),kakashiPostMiPackageOccurrenceId:pkgId,kakashiPostMiPsBattleOccurrenceId:id,kakashiPostMiPsBattleTurns:turns,kakashiPostMiAmtEligibleAtSelection:amtEligibleAtSelection,kakashiPostMiAmtEligible:turns>=1&&turns<=3&&amtEligibleAtSelection,kakashiPostMiPsReturnProcessed:true,[CURSOR]:0};rt.beatId=BEAT.psWin;save();return{success:true,victory:true,packageOccurrenceId:pkgId,amtEligible:rt.localContext.kakashiPostMiAmtEligible};
 }
 rt.localContext={...(rt.localContext||{}),kakashiPostMiPsBattleOccurrenceId:id,kakashiPostMiPsBattleTurns:turns,kakashiPostMiAmtEligible:false,kakashiPostMiPsReturnProcessed:true,[CURSOR]:0};rt.beatId=BEAT.psLoss;save();return{success:true,victory:false};
}
function consumeAmtReturn(){
 const rt=active(),r=latestResult();if(!rt||rt.beatId!==BEAT.amtReturn)return{success:false,reason:"post_mi_amt_return_context_required"};if(rt.localContext&&rt.localContext.kakashiPostMiAmtReturnProcessed===true)return{success:true,idempotent:true};
 if(!r||String(r.battleConfigId||"")!==AMT_CONFIG||String(r.bindingRef||"")!==AMT_BINDING)return{success:false,reason:"post_mi_amt_battle_receipt_mismatch"};
 const victory=String(r.resultState||"")==="player_side_victory",id=stable("occ_origin_kakashi_post_mi_amt_battle_return",{battle:String(r.battleOccurrenceId||""),result:String(r.resultState||""),route:String(rt.localContext.kakashiPostMiAmtRoute||"")}),pkg=packageState(rt);
 if(!victory)return{success:false,reason:"post_mi_amt_defeat_requires_package_and_pakkun_autonomy_resolution",packageState:pkg,pakkunPresent:true};
 const resultRef=stable("sc35830-amt-controlled",{battle:String(r.battleOccurrenceId||"")});
 const classified=CORE.recordParticipantClassification({storyUnitRef:ORIGIN_ID,participantRef:AMT,stateClass:"CONTROLLED_DEFEATED",resultRef});if(!classified||classified.success!==true)return classified||{success:false,reason:"amt_post_battle_classification_failed"};
 const fact={factClass:"academy_kakashi_stop_assassin_post_mi_amt_battle_return",authorityCommit:rt.localContext.kakashiPostMiAmtRoute==="ps_amt"?AUTH_PS:AUTH_AMT,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),battleConfigId:AMT_CONFIG,battleResultState:"player_side_victory",packageState:pkg,participantStateByRef:{[AMT]:{stateClass:"CONTROLLED_DEFEATED"},[PAKKUN]:{presenceState:"PRESENT",temporaryParticipationOnly:true,ownershipGranted:false,nameKnowledgeGranted:false}},worldFacts:{packageCustodyUnchanged:true,pakkunPresent:true,packageSmugglerPursuitClosed:true}};
 const out=commitOnce(id,fact,"AMT_BATTLE_VICTORY",[ORIGIN_ID,AMT,PAKKUN],[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"origin_occurrence",id:String(rt.localContext.kakashiPostMiPakkunReachOccurrenceId||""),role:"pakkun_reach"}].filter(x=>x.id));if(!out.success)return out;
 rt.localContext={...(rt.localContext||{}),kakashiPostMiAmtBattleOccurrenceId:id,kakashiPostMiAmtReturnProcessed:true,[CURSOR]:0};rt.beatId=BEAT.amtWin;save();return{success:true,victory:true};
}
function consumeReturnOnEnter35830(kind){
 const rt=active();if(!rt)return{success:false,reason:"post_mi_battle_return_story_missing"};
 if(!latestResult())return{success:true,pending:true,reason:"post_mi_battle_result_projection_pending",beatId:rt.beatId};
 return kind==="ps"?consumePsReturn():consumeAmtReturn();
}
let returnRetryTimer35830=null,returnRetryCount35830=0;
function scheduleReturnRetry35830(beatId){
 if(typeof setTimeout!=="function"||returnRetryTimer35830||returnRetryCount35830>=80)return false;
 returnRetryTimer35830=setTimeout(()=>{
  returnRetryTimer35830=null;
  const rt=active();if(!rt||rt.beatId!==beatId){returnRetryCount35830=0;return;}
  const kind=beatId===BEAT.psReturn?"ps":beatId===BEAT.amtReturn?"amt":null;if(!kind){returnRetryCount35830=0;return;}
  const out=consumeReturnOnEnter35830(kind);
  if(out&&out.success===true&&out.pending!==true){returnRetryCount35830=0;try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_e){}return;}
  if(out&&out.success===true&&out.pending===true){returnRetryCount35830+=1;scheduleReturnRetry35830(beatId);}
 },25);
 return true;
}

function deterministicKillTarget(ref,kind){
 const rt=active();if(!rt||!postBattleDefeatedLiving(ref))return{success:false,reason:"post_battle_defeated_living_target_required"};
 const pkg=packageState(rt),parent=kind==="ps"?String(rt.localContext.kakashiPostMiPsBattleOccurrenceId||""):String(rt.localContext.kakashiPostMiAmtBattleOccurrenceId||"");
 const id=stable("occ_origin_kakashi_post_mi_deterministic_kill",{instance:String(rt.instanceId||""),target:ref,parent,package:packageOccurrenceId(rt)});
 const mi=miResolution(rt),fact={factClass:"academy_kakashi_stop_assassin_post_mi_deterministic_kill",authorityCommit:kind==="ps"?AUTH_PS:AUTH_AMT,storySceneInstanceId:String(rt.instanceId||""),semanticClass:"KILL — GUARANTEED",outcomeMode:"deterministic",targetRef:ref,targetDeathConfirmed:true,parentBattleOccurrenceRef:parent,packageState:pkg,packageCustodyChanged:false,pakkunPresent:kind==="amt",miDeathAlreadyCommitted:!!(mi&&mi.deathCommitted),miResolutionState:mi&&mi.kind||"",miDeathRerolled:false};
 const out=commitOnce(id,fact,"CONFIRMED_KILL",[ORIGIN_ID,ref].concat(kind==="amt"?[PAKKUN]:[]),[{type:"origin_occurrence",id:parent,role:"post_battle_state"},{type:"world_object",id:PACKAGE}].filter(x=>x.id));if(!out.success)return out;
 const classified=CORE.recordParticipantClassification({storyUnitRef:ORIGIN_ID,participantRef:ref,stateClass:"DEAD",resultRef:id});if(!classified||classified.success!==true)return classified||{success:false,reason:"post_mi_kill_classification_failed"};
 if(kind==="ps")rt.localContext={...(rt.localContext||{}),kakashiPostMiPsKillOccurrenceId:id,kakashiPostMiPsDead:true};
 else rt.localContext={...(rt.localContext||{}),kakashiPostMiAmtKillOccurrenceId:id,kakashiPostMiAmtDead:true};
 save();return{success:true,occurrenceId:id};
}
function commitAmtRelease(){
 const rt=active();if(!rt||!postBattleDefeatedLiving(AMT))return{success:false,reason:"amt_post_battle_defeated_living_target_required"};const id=stable("occ_origin_kakashi_post_mi_amt_release",{battle:String(rt.localContext.kakashiPostMiAmtBattleOccurrenceId||""),package:packageOccurrenceId(rt)});
 const fact={factClass:"academy_kakashi_amt_deliberate_release",authorityCommit:AUTH_AMT,storySceneInstanceId:String(rt.instanceId||""),participantRef:AMT,participantAlive:true,releaseState:"DELIBERATE_RELEASE",custodyCommitted:false,escapeState:"RELEASED_BY_KAKASHI",packageState:packageState(rt),packageCustodyChanged:false,pakkunPresent:true};
 const out=commitOnce(id,fact,"AMT_RELEASED",[ORIGIN_ID,AMT,PAKKUN],[{type:"origin_occurrence",id:String(rt.localContext.kakashiPostMiAmtBattleOccurrenceId||""),role:"controlled_amt"}]);if(out.success){rt.localContext={...(rt.localContext||{}),kakashiPostMiAmtReleaseOccurrenceId:id};save();}return out;
}
function commitAmtAnbuReturn(){
 const rt=active();if(!rt||!postBattleDefeatedLiving(AMT))return{success:false,reason:"amt_post_battle_defeated_living_target_required"};const id=stable("occ_origin_kakashi_post_mi_amt_anbu_return",{battle:String(rt.localContext.kakashiPostMiAmtBattleOccurrenceId||""),package:packageOccurrenceId(rt)});
 const fact={factClass:"academy_kakashi_amt_live_return_to_anbu",authorityCommit:AUTH_AMT,storySceneInstanceId:String(rt.instanceId||""),participantRef:AMT,participantAlive:true,custodyState:"KAKASHI_RETURNING_TO_ANBU",institutionalDestination:"ANBU",packageState:packageState(rt),packageCustodyChanged:false,pakkunPresent:true};
 const out=commitOnce(id,fact,"AMT_RETURN_TO_ANBU",[ORIGIN_ID,AMT,PAKKUN],[{type:"origin_occurrence",id:String(rt.localContext.kakashiPostMiAmtBattleOccurrenceId||""),role:"controlled_amt"}]);if(out.success){rt.localContext={...(rt.localContext||{}),kakashiPostMiAmtAnbuReturnOccurrenceId:id};save();}return out;
}

function choice(id,label,next,resolve,available=true,blocker=null){return{choiceId:id,label,nextBeatId:next,availability:()=>({available:available===true,knownBlocker:available?null:blocker}),knownBlocker:available?null:blocker,consequenceRequests:resolve?[{requestId:"postmi_35830_"+id,kind:"domain",resolve}]:[]};}
function wireEntryChoices(){
 const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;if(!m)return false;
 const wire=(beatId,ids,target,next)=>{const beat=m.get(beatId);if(!beat||!Array.isArray(beat.choices))return false;const row=beat.choices.find(x=>x&&ids.includes(x.choiceId));if(!row)return false;row.nextBeatId=next;row.availability=()=>({available:sourceAvailable(target),knownBlocker:sourceAvailable(target)?null:"PURSUIT NO LONGER AVAILABLE"});row.knownBlocker=null;row.consequenceRequests=[{requestId:"postmi_35830_"+target+"_"+beatId,kind:"domain",resolve:()=>commitPursuitSelection(target)}];return true;};
 wire(LIVE_SOURCE,ENTRY_IDS.ps,"ps",BEAT.psChase);wire(LIVE_SOURCE,ENTRY_IDS.amt,"amt",BEAT.amtChase);
 wire(RESOLVER_SOURCE,ENTRY_IDS.ps,"ps",BEAT.psChase);wire(DETERMINISTIC_SOURCE,ENTRY_IDS.ps,"ps",BEAT.psChase);wire(RESOLVER_SOURCE,ENTRY_IDS.amt,"amt",BEAT.amtChase);wire(DETERMINISTIC_SOURCE,ENTRY_IDS.amt,"amt",BEAT.amtChase);return true;
}
function entryTargetForChoice(choiceId){
 const id=String(choiceId||"");if(ENTRY_IDS.ps.includes(id))return"ps";if(ENTRY_IDS.amt.includes(id))return"amt";return null;
}
function beginPostMiPursuitChoice35830(choiceId){
 const rt=active(),target=entryTargetForChoice(choiceId);if(!rt||rt.sceneId!==SCENE_ID||!target||![LIVE_SOURCE,RESOLVER_SOURCE,DETERMINISTIC_SOURCE].includes(rt.beatId))return{success:false,reason:"post_mi_pursuit_entry_context_missing"};
 if(!sourceAvailable(target,rt))return{success:false,reason:target+"_pursuit_not_available"};
 const committed=commitPursuitSelection(target);if(!committed||committed.success!==true)return committed||{success:false,reason:"post_mi_pursuit_selection_commit_failed"};
 rt.beatId=target==="ps"?BEAT.psChase:BEAT.amtChase;rt.localContext={...(rt.localContext||{}),[CURSOR]:0};save();
 try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_e){}
 return{success:true,beatId:rt.beatId,target,miState:committed.miState||null};
}
function materializePsDecision(){
 const d=scene(),b=d&&d.beatMap instanceof Map?d.beatMap.get(BEAT.psDecision):null,rt=active();if(!b||!rt)return false;
 const rows=[],amt=rt.localContext&&rt.localContext.kakashiPostMiAmtEligible===true,psState=participantState(PS);
 if(amt)rows.push(choice("postmi_ps_go_amt","GO AFTER ANBU MARKED TARGET",BEAT.psToAmt,()=>{rt.localContext={...(rt.localContext||{}),kakashiPostMiAmtRoute:"ps_amt",[CURSOR]:0};save();const p=commitPakkunReach("ps_amt");return p&&p.success===true?{success:true,pakkunReachOccurrenceId:p.occurrenceId}:p;}));
 if(psState!=="DEAD")rows.push(choice("postmi_ps_kill","KILL HIM",BEAT.psDecision,()=>deterministicKillTarget(PS,"ps")));
 rows.push(choice("postmi_ps_return_anbu","RETURN TO ANBU",BEAT.psReport,()=>({success:true})));
 if(amt&&psState!=="DEAD")rows.push(choice("postmi_ps_restrain_continue","RESTRAIN HIM AND CONTINUE",BEAT.psDecision,()=>({success:false,reason:"field_secured_continuation_requires_writing_281",issue:281,fieldSecuredAuthority:FIELD_SECURED_AUTHORITY}),false,"WAITING ON WRITING #281"));
 b.choices=rows;return true;
}
function materializeAmtDecision(){
 const d=scene(),b=d&&d.beatMap instanceof Map?d.beatMap.get(BEAT.amtDecision):null,rt=active();if(!b||!rt)return false;const state=participantState(AMT),direct=rt.localContext.kakashiPostMiAmtRoute==="direct_amt";
 const rows=[
  choice("postmi_amt_police","BRING HIM TO THE UCHIHA POLICE FORCE",BEAT.amtDecision,()=>({success:false,reason:"amt_police_handoff_scene_not_yet_locked"})),
  choice("postmi_amt_release","LET HIM GO",BEAT.amtReport,()=>commitAmtRelease()),
  choice("postmi_amt_kill","KILL HIM",direct?BEAT.amtKill:BEAT.amtReport,direct?()=>({success:true}):()=>deterministicKillTarget(AMT,"amt")),
  choice("postmi_amt_return_anbu","TAKE HIM BACK TO THE ANBU",direct?BEAT.amtLiveReturn:BEAT.amtReport,()=>commitAmtAnbuReturn()),
  choice("postmi_amt_restrain_anbu","RESTRAIN HIM AND TURN HIM INTO ANBU",BEAT.amtDecision,()=>({success:false,reason:"field_secured_continuation_requires_writing_281",issue:281,fieldSecuredAuthority:FIELD_SECURED_AUTHORITY}),false,"WAITING ON WRITING #281"),
  choice("postmi_amt_restrain_police","RESTRAIN HIM AND TURN HIM INTO THE UCHIHA POLICE FORCE",BEAT.amtDecision,()=>({success:false,reason:"field_secured_continuation_requires_writing_281",issue:281,fieldSecuredAuthority:FIELD_SECURED_AUTHORITY}),false,"WAITING ON WRITING #281")
 ];
 b.choices=rows;return true;
}
function installBeats(){
 const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;if(!m)return false;
 const narr=(id,bg,obj)=>m.set(id,{beatId:id,mode:"narration",environmentRef:{assetId:bg},objectiveText:obj||null,text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[]});
 narr(BEAT.psChase,"kakashi_origin_konoha_alleyway",OBJECTIVE.ps);narr(BEAT.psFail,"kakashi_origin_konoha_alleyway",OBJECTIVE.report);narr(BEAT.psCatch,"kakashi_origin_konoha_alleyway",OBJECTIVE.ps);
 m.set(BEAT.psBattle,{beatId:BEAT.psBattle,mode:"battle_transition",environmentRef:{assetId:"kakashi_origin_konoha_alleyway"},text:"",battle:{encounterId:PS_CONFIG,launchResolver:ctx=>launchPs(ctx),postBattleBeatId:BEAT.psReturn,resultProjector:projector,actionLabel:"STOP THE PACKAGE SMUGGLER"},exitScene:false,allowPresentationClose:false,choices:[]});
 narr(BEAT.psReturn,"kakashi_origin_konoha_alleyway",OBJECTIVE.ps);m.get(BEAT.psReturn).onEnterConsequences=[{requestId:"postmi_35830_ps_return_consume",kind:"domain",resolve:()=>consumeReturnOnEnter35830("ps")}];narr(BEAT.psWin,"kakashi_origin_konoha_alleyway",OBJECTIVE.ps);narr(BEAT.psLoss,"kakashi_origin_konoha_alleyway",OBJECTIVE.report);
 m.set(BEAT.psDecision,{beatId:BEAT.psDecision,mode:"choice",environmentRef:{assetId:"kakashi_origin_konoha_alleyway"},objectiveText:OBJECTIVE.ps,text:"Package Smuggler is down. The package is secure. Kakashi decides what remains worth pursuing.",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[]});
 narr(BEAT.psReport,"kakashi_origin_konoha_alleyway",OBJECTIVE.report);
 narr(BEAT.amtChase,"kakashi_origin_rooftop_night",OBJECTIVE.amt);narr(BEAT.amtFail,"kakashi_origin_rooftop_night",OBJECTIVE.report);narr(BEAT.amtCatch,AMT_ALLEY_ASSET_ID,OBJECTIVE.secureAmt);narr(BEAT.psToAmt,"kakashi_origin_rooftop_night",OBJECTIVE.secureAmt);
 m.set(BEAT.amtBattle,{beatId:BEAT.amtBattle,mode:"battle_transition",environmentRef:{assetId:AMT_ALLEY_ASSET_ID},text:"",battle:{encounterId:AMT_CONFIG,launchResolver:ctx=>launchAmt(ctx),postBattleBeatId:BEAT.amtReturn,resultProjector:projector,actionLabel:"SECURE ANBU MARKED TARGET"},exitScene:false,allowPresentationClose:false,choices:[]});
 narr(BEAT.amtReturn,AMT_ALLEY_ASSET_ID,OBJECTIVE.secureAmt);m.get(BEAT.amtReturn).onEnterConsequences=[{requestId:"postmi_35830_amt_return_consume",kind:"domain",resolve:()=>consumeReturnOnEnter35830("amt")}];narr(BEAT.amtWin,AMT_ALLEY_ASSET_ID,OBJECTIVE.secureAmt);
 m.set(BEAT.amtDecision,{beatId:BEAT.amtDecision,mode:"choice",environmentRef:{assetId:AMT_ALLEY_ASSET_ID},objectiveText:null,text:"ANBU Marked Target is defeated. Package state remains separate from his disposition.",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[]});
 narr(BEAT.amtLiveReturn,AMT_ALLEY_ASSET_ID,OBJECTIVE.report);narr(BEAT.amtKill,AMT_ALLEY_ASSET_ID,null);narr(BEAT.amtReport,AMT_ALLEY_ASSET_ID,OBJECTIVE.report);
 return true;
}
function sequenceFor(rt=active()){
 if(!rt)return null;const route=String(rt.localContext&&rt.localContext.kakashiPostMiAmtRoute||"");
 const map={
  [BEAT.psChase]:CUES.psChase,[BEAT.psFail]:CUES.psFail,[BEAT.psCatch]:CUES.psCatch,[BEAT.psWin]:CUES.psWin,[BEAT.psLoss]:CUES.psLoss,[BEAT.psToAmt]:CUES.psToAmt,
  [BEAT.amtChase]:CUES.amtChase,[BEAT.amtFail]:CUES.amtFail,[BEAT.amtCatch]:CUES.amtCatch,[BEAT.amtWin]:route==="ps_amt"?CUES.psAmtWin:CUES.amtWin,[BEAT.amtLiveReturn]:CUES.amtReturn,[BEAT.amtKill]:route==="direct_amt"?CUES.amtKill:[]
 };
 return map[rt.beatId]||null;
}
function performance(rt=active()){const s=sequenceFor(rt);if(!s||!s.length)return null;const raw=Number(rt.localContext&&rt.localContext[CURSOR]||0),i=Number.isInteger(raw)?Math.max(0,Math.min(s.length-1,raw)):0;return{sequence:s,index:i,cue:s[i],atEnd:i>=s.length-1};}
function launchCurrentBattleTransition35830(rt,transition){
 if(!rt||![BEAT.psBattle,BEAT.amtBattle].includes(rt.beatId))return transition||{success:false,reason:"post_mi_battle_transition_context_missing"};
 const launcher=typeof globalThis.launchStorySceneBattle==="function"?globalThis.launchStorySceneBattle:(typeof launchStorySceneBattle==="function"?launchStorySceneBattle:null);
 if(typeof launcher!=="function"){
  try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_e){}
  return{...(transition||{}),success:false,battleLaunchPending:true,battleLaunchReason:"story_battle_launcher_missing",beatId:rt.beatId};
 }
 const launched=launcher.call(globalThis);
 if(launched&&launched.success===true)return{...launched,autoLaunchedFromPostMiPursuit:true,storyTransition:transition||null};
 try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_e){}
 return launched||{success:false,reason:"post_mi_story_battle_launch_failed",beatId:rt.beatId,storyTransition:transition||null};
}
function transitionNarrative(rt){
 let launchBattle=false;
 if(rt.beatId===BEAT.psChase){const r=resolveSelectedPursuit("ps");if(!r.success)return r;rt.beatId=r.reached?BEAT.psCatch:BEAT.psFail;}
 else if(rt.beatId===BEAT.psCatch){rt.beatId=BEAT.psBattle;launchBattle=true;}
 else if(rt.beatId===BEAT.psWin)rt.beatId=BEAT.psDecision;
 else if(rt.beatId===BEAT.psLoss||rt.beatId===BEAT.psFail)rt.beatId=BEAT.psReport;
 else if(rt.beatId===BEAT.amtChase){const r=resolveSelectedPursuit("amt");if(!r.success)return r;if(r.reached){const p=commitPakkunReach("direct_amt");if(!p.success)return p;rt.beatId=BEAT.amtCatch;}else rt.beatId=BEAT.amtFail;}
 else if(rt.beatId===BEAT.amtCatch){if(!(rt.localContext&&rt.localContext.kakashiPostMiPakkunPresent===true)){const p=commitPakkunReach("direct_amt");if(!p.success)return p;}rt.beatId=BEAT.amtBattle;launchBattle=true;}
 else if(rt.beatId===BEAT.psToAmt){if(!(rt.localContext&&rt.localContext.kakashiPostMiPakkunPresent===true)){const p=commitPakkunReach("ps_amt");if(!p.success)return p;}rt.beatId=BEAT.amtBattle;launchBattle=true;}
 else if(rt.beatId===BEAT.amtFail)rt.beatId=BEAT.amtReport;
 else if(rt.beatId===BEAT.amtWin)rt.beatId=BEAT.amtDecision;
 else if(rt.beatId===BEAT.amtLiveReturn)rt.beatId=BEAT.amtReport;
 else if(rt.beatId===BEAT.amtKill){const k=deterministicKillTarget(AMT,"amt");if(!k.success)return k;rt.beatId=BEAT.amtReport;}
 else return{success:false,reason:"post_mi_narrative_transition_missing"};
 rt.localContext={...(rt.localContext||{}),[CURSOR]:0};save();try{renderStoryScenePresentationLayer();}catch(_e){}
 const transition={success:true,beatId:rt.beatId};
 return launchBattle?launchCurrentBattleTransition35830(rt,transition):transition;
}
function installStyle(){
 if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;const s=document.createElement("style");s.id=STYLE_ID;s.textContent=
 "."+BOARD_CLASS+"{position:absolute;inset:0;z-index:6;pointer-events:none;overflow:hidden}." +BOARD_CLASS+" .sc-scene-board-33900__actors{left:3%!important;right:3%!important;top:10%!important;bottom:19%!important;display:flex!important;justify-content:space-between!important;align-items:flex-end!important;padding:0 5%!important}." +BOARD_CLASS+" .sc-scene-board-33900__actor{width:min(21vw,292px)!important;max-height:470px!important;aspect-ratio:7/10!important}." +BOARD_CLASS+" .sc-postmi-summon-35830{position:relative;width:min(14vw,190px)!important;max-height:235px!important;align-self:flex-end!important;display:flex!important;align-items:flex-end!important;justify-content:center!important;overflow:visible!important;opacity:.88;transform:translateY(2px) scale(.98);filter:none!important;margin-bottom:2%!important}." +BOARD_CLASS+" .sc-postmi-summon-35830.is-focus{opacity:1;transform:translateY(0) scale(1.03)}." +BOARD_CLASS+" .sc-postmi-summon-35830 img{display:block;width:100%!important;height:auto!important;max-height:235px!important;object-fit:contain!important;object-position:center bottom!important;filter:drop-shadow(0 12px 14px rgba(0,0,0,.52))!important}#story-scene-presentation-layer[data-sc-postmi-35830='true'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-previous{display:none!important}#story-scene-presentation-layer[data-sc-postmi-35830='true'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-current{left:50%!important;right:auto!important;top:4%!important;bottom:auto!important;transform:translateX(-50%)!important;width:min(31%,430px)!important}#story-scene-presentation-layer[data-sc-postmi-35830='true'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-current[data-speaker-id='pakkun']{left:auto!important;right:6%!important;top:17%!important;bottom:auto!important;transform:none!important;width:min(27%,380px)!important}";
 document.head.appendChild(s);return true;
}
const PAKKUN_SCENE_ASSET="Assets/Summons/pakkun.png";
function image(ref){return ref===KAK?"Assets/Academy Student/academy_kakashi.png":ref===PS?"NPC/package_smuggler.png":ref===AMT?"NPC/anbu_marked_target.png":PAKKUN_SCENE_ASSET;}
function label(ref){return ref===KAK?"KAKASHI":ref===PS?"PACKAGE SMUGGLER":ref===AMT?"ANBU MARKED TARGET":"NINKEN";}
function card(ref,state,focus){if(ref===PAKKUN)return'<figure class="sc-postmi-summon-35830 '+(focus?"is-focus":"")+'" data-actor-id="'+esc(ref)+'"><img src="'+esc(PAKKUN_SCENE_ASSET)+'" alt=""></figure>';return'<figure class="sc-scene-board-33900__actor '+(focus?"is-focus":"")+'" data-actor-id="'+esc(ref)+'"><div class="sc-scene-board-33900__actor-frame"></div><img src="'+esc(image(ref))+'" alt=""><figcaption class="sc-scene-board-33900__actor-tag"><strong>'+esc(label(ref))+'</strong><small>'+esc(state)+'</small></figcaption></figure>';}
function stageBg(rt,p=null){
 if(rt.beatId===BEAT.amtChase||rt.beatId===BEAT.psToAmt)return BG.rooftop;
 if([BEAT.amtCatch,BEAT.amtBattle,BEAT.amtReturn,BEAT.amtWin,BEAT.amtDecision,BEAT.amtLiveReturn,BEAT.amtKill,BEAT.amtReport].includes(rt.beatId))return BG.amtStreet;
 return BG.psStreet;
}
function pakkunVisible35830(rt,p){
 if(!(rt&&rt.localContext&&rt.localContext.kakashiPostMiPakkunPresent===true))return false;
 if(rt.beatId===BEAT.amtCatch)return !!p&&p.index>=2;
 if(rt.beatId===BEAT.psToAmt)return !!p&&p.index>=13;
 return [BEAT.amtBattle,BEAT.amtReturn,BEAT.amtWin,BEAT.amtDecision,BEAT.amtLiveReturn,BEAT.amtKill,BEAT.amtReport].includes(rt.beatId);
}
function actorState35830(ref,rt){
 if(ref===KAK)return"ACTIVE";
 if(ref===PAKKUN)return"PRESENT";
 if(ref===PS){const pkg=packageState(rt);if(String(pkg.currentHolderClass||"")==="PACKAGE_SMUGGLER")return"HAS PACKAGE";}
 return participantState(ref)||"PRESENT";
}
function render(){
 wireEntryChoices();materializePsDecision();materializeAmtDecision();
 if(typeof document==="undefined")return false;const rt=active(),layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
 if(rt&&rt.beatId===BEAT.psReturn&&!(rt.localContext&&rt.localContext.kakashiPostMiPsReturnProcessed)){const x=consumeReturnOnEnter35830("ps");if(x&&x.success===true&&x.pending!==true){try{return render();}catch(_e){}}if(x&&x.success===true&&x.pending===true)scheduleReturnRetry35830(BEAT.psReturn);}
 if(rt&&rt.beatId===BEAT.amtReturn&&!(rt.localContext&&rt.localContext.kakashiPostMiAmtReturnProcessed)){const x=consumeReturnOnEnter35830("amt");if(x&&x.success===true&&x.pending!==true){try{return render();}catch(_e){}}if(x&&x.success===true&&x.pending===true)scheduleReturnRetry35830(BEAT.amtReturn);}
 const ours=rt&&Object.values(BEAT).includes(rt.beatId);layer.dataset.scPostmi35830=ours?"true":"false";const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer;
 for(const old of stage.querySelectorAll?stage.querySelectorAll("."+BOARD_CLASS):[])if(!ours)old.remove();if(!ours)return false;installStyle();stage.style.backgroundImage='linear-gradient(180deg,rgba(2,5,8,.03),rgba(2,5,8,.08) 55%,rgba(2,5,8,.62)),url("'+stageBg(rt,performance(rt)).replace(/"/g,"%22")+'")';stage.style.backgroundSize="cover";stage.style.backgroundPosition="center";
 let b=stage.querySelector("."+BOARD_CLASS);if(!b){b=document.createElement("section");b.className=BOARD_CLASS;stage.appendChild(b);}
 const p=performance(rt),focus=p&&p.cue&&(p.cue.speaker==="KAKASHI"?KAK:p.cue.speaker==="PACKAGE SMUGGLER"?PS:p.cue.speaker==="ANBU MARKED TARGET"?AMT:p.cue.speaker==="PAKKUN"?PAKKUN:null)||KAK;
 let refs=[KAK];if([BEAT.psChase,BEAT.psCatch,BEAT.psWin,BEAT.psDecision].includes(rt.beatId)&&participantState(PS)!=="DEAD")refs.push(PS);if([BEAT.amtChase,BEAT.amtCatch,BEAT.psToAmt,BEAT.amtWin,BEAT.amtDecision,BEAT.amtLiveReturn,BEAT.amtKill].includes(rt.beatId)){refs.push(AMT);if(pakkunVisible35830(rt,p))refs.push(PAKKUN);}
 const amtAlley=[BEAT.amtCatch,BEAT.amtBattle,BEAT.amtReturn,BEAT.amtWin,BEAT.amtDecision,BEAT.amtLiveReturn,BEAT.amtKill,BEAT.amtReport].includes(rt.beatId);
 b.innerHTML='<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">'+(amtAlley?"KONOHA ALLEY · NIGHT":[BEAT.amtChase,BEAT.psToAmt].includes(rt.beatId)?"KONOHA ROOFTOPS · NIGHT":"KONOHA STREET · NIGHT")+'</div></div><div class="sc-scene-board-33900__actors" data-count="'+refs.length+'">'+refs.map(ref=>card(ref,actorState35830(ref,rt),focus===ref)).join("")+'</div>';
 if(p){const t=layer.querySelector(".sc-story-text");if(t)t.textContent=p.cue.text;const n=layer.querySelector(".sc-story-name");if(n){n.textContent=p.cue.kind==="dialogue"?p.cue.speaker:"NARRATION";n.style.display="block";}}
 return true;
}

if(!installBeats())throw new Error("post_mi_pursuit_35830_beats_missing");
let hooked=false,tries=0;
function hooks(){
 if(hooked)return true;if(typeof globalThis.advanceStoryScene!=="function"||typeof globalThis.getStoryScenePerformance33900!=="function")return false;
 const PA=globalThis.advanceStoryScene,PG=globalThis.getStoryScenePerformance33900,PR=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
 globalThis.getStoryScenePerformance33900=function(){const p=performance(active());return p||PG.apply(this,arguments);};
 globalThis.advanceStoryScene=function(choiceId=null){const rt=active(),p=performance(rt);
  if(rt&&choiceId!=null&&[LIVE_SOURCE,RESOLVER_SOURCE,DETERMINISTIC_SOURCE].includes(rt.beatId)&&entryTargetForChoice(choiceId))return beginPostMiPursuitChoice35830(choiceId);
  if(p&&choiceId==null){if(!p.atEnd){rt.localContext={...(rt.localContext||{}),[CURSOR]:p.index+1};save();try{renderStoryScenePresentationLayer();}catch(_e){}return{success:true,beatId:rt.beatId,cueIndex:p.index+1};}return transitionNarrative(rt);}
  if(rt&&rt.beatId===BEAT.psDecision){materializePsDecision();return PA.apply(this,arguments);}
  if(rt&&rt.beatId===BEAT.amtDecision){materializeAmtDecision();return PA.apply(this,arguments);}
  if(rt&&[BEAT.psReport,BEAT.amtReport].includes(rt.beatId))return{success:false,reason:"post_mi_later_anbu_report_scene_not_yet_locked",boundaryPreserved:true};
  if(rt&&rt.beatId===BEAT.amtReturn){return consumeAmtReturn();}
  return PA.apply(this,arguments);
 };
 try{advanceStoryScene=globalThis.advanceStoryScene;getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;}catch(_e){}
 if(PR){globalThis.renderStoryScenePresentationLayer=function(){wireEntryChoices();const out=PR.apply(this,arguments);const settle=()=>{wireEntryChoices();materializePsDecision();materializeAmtDecision();render();};if(typeof queueMicrotask==="function")queueMicrotask(settle);else setTimeout(settle,0);return out;};try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_e){}}
 hooked=true;wireEntryChoices();render();return true;
}
function ensure(){if(hooks())return;if(typeof setTimeout==="function"&&tries++<120)setTimeout(ensure,25);}ensure();
function browserCapture(){
 if(typeof document==="undefined"||document.__scPostMiPursuit35830)return false;document.__scPostMiPursuit35830=true;
 document.addEventListener("click",function(event){const t=event&&event.target&&typeof event.target.closest==="function"?event.target.closest(".sc-story-choice"):null,rt=active();if(!t||!rt||![LIVE_SOURCE,RESOLVER_SOURCE,DETERMINISTIC_SOURCE].includes(rt.beatId))return;const label=String(t.textContent||"").replace(/\s+/g," ").trim().toUpperCase();let id=null;if(label==="GO AFTER PACKAGE SMUGGLER"){wireEntryChoices();id=(scene().beatMap.get(rt.beatId).choices.find(x=>ENTRY_IDS.ps.includes(x.choiceId))||{}).choiceId;}else if(label==="GO AFTER ANBU MARKED TARGET"){wireEntryChoices();id=(scene().beatMap.get(rt.beatId).choices.find(x=>ENTRY_IDS.amt.includes(x.choiceId))||{}).choiceId;}if(!id)return;if(event.preventDefault)event.preventDefault();if(event.stopImmediatePropagation)event.stopImmediatePropagation();const out=beginPostMiPursuitChoice35830(id);if(out&&out.success===true)try{renderStoryScenePresentationLayer();}catch(_e){}},true);return true;
}browserCapture();

function diagnostics(){
 const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;
 const checks={
  patchId:PATCH_ID==="alpha_kakashi_post_mi_death_pursuit_35830_v10_2026_09_19",
  authorities:AUTH_PS==="bf30ca7dfff9f850bebe978acdd8830f16758042"&&AUTH_AMT==="e18729844922461c654481745e48a6eac20649cd"&&AUTH_LIVE==="bf16ebe0f677994878fbe60e30e7b546da899eb8",
  liveFastWinEntry:wireEntryChoices.toString().includes("LIVE_SOURCE")&&beginPostMiPursuitChoice35830.toString().includes("LIVE_SOURCE"),
  directBrowserEntry:browserCapture.toString().includes("beginPostMiPursuitChoice35830")&&globalThis.advanceStoryScene.toString().includes("beginPostMiPursuitChoice35830"),
  exactPsChase:CUES.psChase.length===12&&CUES.psChase[0].text==="Kakashi moves before Package Smuggler disappears completely."&&CUES.psChase[11].text==="Kakashi increases his pace.",
  exactPsCatch:CUES.psCatch.some(x=>x.kind==="dialogue"&&x.speaker==="KAKASHI"&&x.text==="No. It fixes the part in your hands."),
  exactPakkunCorrection:CUES.amtCatch.some(x=>x.speaker==="PAKKUN"&&x.text==="This yours?")&&CUES.amtCatch.some(x=>x.speaker==="KAKASHI"&&x.text==="Apparently.")&&CUES.psToAmt.some(x=>x.speaker==="KAKASHI"&&x.text==="Apparently."),
  exactBattleConfigs:PS_CONFIG==="academy_kakashi_origin_battle_seq_ps"&&AMT_CONFIG==="academy_kakashi_origin_battle_seq_amt_pakkun",
   battleTransitionsAutoLaunch:transitionNarrative.toString().includes("launchCurrentBattleTransition35830")&&launchCurrentBattleTransition35830.toString().includes("launchStorySceneBattle"),
   postBattleReturnOwnersInstalled:!!(m&&m.get(BEAT.psReturn)&&Array.isArray(m.get(BEAT.psReturn).onEnterConsequences)&&m.get(BEAT.psReturn).onEnterConsequences.some(x=>x&&x.requestId==="postmi_35830_ps_return_consume"))&&!!(m&&m.get(BEAT.amtReturn)&&Array.isArray(m.get(BEAT.amtReturn).onEnterConsequences)&&m.get(BEAT.amtReturn).onEnterConsequences.some(x=>x&&x.requestId==="postmi_35830_amt_return_consume"))&&latestResult.toString().includes("resume.projected")&&render.toString().includes("scheduleReturnRetry35830"),
   amtBackdropExact:BG.amtStreet==="Kakashi Origin Backdrop/alleyway_konoha_night.png"&&AMT_ALLEY_ASSET_ID==="kakashi_origin_pakkun_interception_alley",
   pakkunSceneRevealBounded:pakkunVisible35830.toString().includes("BEAT.amtCatch")&&pakkunVisible35830.toString().includes("p.index>=2")&&PAKKUN_SCENE_ASSET==="Assets/Summons/pakkun.png"&&image(PAKKUN)===PAKKUN_SCENE_ASSET,
   pakkunUsesPlainSceneMarkup:card(PAKKUN,"PRESENT",true).includes("sc-postmi-summon-35830")&&!card(PAKKUN,"PRESENT",true).includes("sc-scene-board-33900__actor-frame")&&!card(PAKKUN,"PRESENT",true).includes("sc-scene-board-33900__actor-tag"),
   pakkunDialogueUsesRightSafeLane:installStyle.toString().includes("data-speaker-id='pakkun'")&&installStyle.toString().includes("right:6%!important")&&installStyle.toString().includes("transform:none!important"),
   postMiDialogueClearsActorCards:installStyle.toString().includes("top:4%!important"),
   directPostBattleDispositions:!materializePsDecision.toString().includes(["ATTEMPT"," TO KILL HIM"].join(""))&&!materializeAmtDecision.toString().includes(["ATTEMPT"," TO KILL HIM"].join(""))&&deterministicKillTarget.toString().includes("postBattleDefeatedLiving"),
  miDeathNeverRerolled:commitPursuitSelection.toString().includes("miDeathRerolled:false")&&consumePsReturn.toString().includes("miDeathRerolled:false"),
  selectionNotPursuitSuccess:commitPursuitSelection.toString().includes("selectionIsNotPursuitSuccess:true")&&resolveSelectedPursuit.toString().includes("PURSUIT_SUCCESS_REACHED"),
  directAmtClosesPs:commitPursuitSelection.toString().includes("kakashiPostMiPsPursuitClosedPermanently=true"),
  psRecoveryUsesAkSa033:consumePsReturn.toString().includes("resolveAcademyKakashiSequentialPostPsPackageRecovery35600"),
  psRecoveryUsesOriginOwnedParent:packageRecoveryParentOccurrenceId35830.toString().includes("kakashiPostMiPursuitResolutionOccurrenceId")&&packageRecoveryParentOccurrenceId35830.toString().includes("PACKAGE_SMUGGLER")&&commitPursuitSelection.toString().includes("kakashiPostMiPackageOccurrenceId:id")&&resolveSelectedPursuit.toString().includes("kakashiPostMiPackageOccurrenceId:id")&&consumePsReturn.toString().includes("packageRecoveryParentOccurrenceId35830(rt,id)"),
  psThreeTurnAmtGate:consumePsReturn.toString().includes("turns>=1&&turns<=3")&&consumePsReturn.toString().includes("anbuMarkedTargetPursuitAvailableAtSelection"),
  pakkunOnlyOnAmtReach:commitPakkunReach.toString().includes("pakkunPresent:true")&&launchAmt.toString().includes("kakashiPostMiPakkunPresent!==true"),
  amtVictoryDoesNotChangePackage:consumeAmtReturn.toString().includes("packageCustodyUnchanged:true"),
  amtDefeatFailClosedUntilObjectAndAutonomy:consumeAmtReturn.toString().includes("post_mi_amt_defeat_requires_package_and_pakkun_autonomy_resolution"),
  fieldSecuredSemanticsClosedContentPending:FIELD_SECURED_AUTHORITY==="77d351e6f8d4eefaea0f8a6db82dec686391e1c0"&&materializePsDecision.toString().includes("field_secured_continuation_requires_writing_281")&&materializeAmtDecision.toString().includes("field_secured_continuation_requires_writing_281"),
  laterDebriefBoundary:globalThis.advanceStoryScene.toString().includes("post_mi_later_anbu_report_scene_not_yet_locked"),
  beats:!!m&&Object.values(BEAT).every(id=>m.has(id)),
  browserGoldenClaimed:false
 };
 const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.runAcademyKakashiPostMiDeathPursuit35830Diagnostics=diagnostics;
globalThis.beginAcademyKakashiPostMiPursuitChoice35830=beginPostMiPursuitChoice35830;
globalThis.SC_ALPHA_KAKASHI_POST_MI_DEATH_PURSUIT_35830=Object.freeze({patchId:PATCH_ID,authorities:Object.freeze({live:AUTH_LIVE,ps:AUTH_PS,amt:AUTH_AMT}),beats:BEAT,psConfig:PS_CONFIG,amtConfig:AMT_CONFIG,wireEntryChoices,beginPursuitChoice:beginPostMiPursuitChoice35830,commitPursuitSelection,resolveSelectedPursuit,consumePsReturn,consumeAmtReturn,commitPakkunReach,deterministicKillTarget,diagnostics,browserGoldenClaimed:false});
})();