// ============================================================================
// ACADEMY KAKASHI — KONOHA ROUTE CLOSURE — 35910
//
// Consumes Writing/Story 100% closure for route families that were still
// selectable-but-blocked after gen68:
// - direct STRIKE BEFORE THE HANDOFF fixed 2v1 -> MI 1v1 chain;
// - OBSERVE -> SECURE THE PACKAGE BEFORE THE ASSASSIN factual resolver;
// - OBSERVE -> GO AFTER THE ORIGINAL TARGET factual resolver;
// - MOVE IN CLOSER -> LET THE HANDOFF HAPPEN reconvergence.
//
// Battle owns win/loss only. Story owns package, participant disposition,
// Knowledge, Pakkun continuity, and terminal projection.
// ============================================================================
(function installAcademyKakashiKonohaRouteClosure35910(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_KONOHA_ROUTE_CLOSURE_35910)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
const BATTLE=globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300;
const SEQ=globalThis.SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410;
const CLOSURE=globalThis.SC_ALPHA_KAKASHI_KONOHA_CLOSURE_35900;
if(!A||!CORE||!KAK||!PROVIDER||!BATTLE||!SEQ||!CLOSURE)throw new Error("kakashi_konoha_route_closure_35910_dependencies_missing");

const PATCH_ID="alpha_kakashi_konoha_route_closure_35910_v6_2026_09_21";
const ORIGIN="academy_kakashi";
const SCENE="origin_academy_kakashi_anbu_retrieval";
const KAKASHI="academy_kakashi";
const AMT="academy_kakashi_origin_amt";
const PS="academy_kakashi_origin_package_smuggler";
const MI="academy_kakashi_origin_masked_interceptor";
const PAKKUN="pakkun_origin_unfamiliar_ninken";
const PACKAGE="kakashi_origin_outer_route_packet";
const ACTION_BEAT="kak_original_action";
const OBSERVE_BEAT="kak_original_major_choice";
const TERMINAL="kak_seq_debrief_pending";
const SAKURA={assetId:"kakashi_origin_sakura_tree_night"};
const ALLEY={assetId:"kakashi_origin_pakkun_interception_alley"};
const ROOFTOP={assetId:"kakashi_origin_rooftop_night"};
const POLICE={assetId:"kakashi_origin_uchiha_police_exterior_night"};

const AUTH=Object.freeze({
 writing100:"21e0407a0c371310ff06096905fd1fce4107ece8",
 directStrike:"4de4e7d0d4e26e71510db635a75d6d867bdaffb7",
 secureBefore:"3b68732b4d4a8a4ca589470174441ca1dcf370ef",
 originalTarget:"64e25dc6d53c2e88e9e27b671db7e0e148051289",
 factualProvider:"f2291162085cb3a35fc2a8e49df7ed905c214c85",
 ce256:"09db8ff4efc28ee608d41c828af48efc023d324f",
 fieldSecured:"77d351e6f8d4eefaea0f8a6db82dec686391e1c0"
});

const DIRECT_BINDING="academy_kakashi.resolver.attack";
const SECURE_BEFORE_BINDING="academy_kakashi.resolver.secure_package_before_assassin";
const ORIGINAL_TARGET_BINDING="academy_kakashi.resolver.pursue_original_target";
const DIRECT_2V1="academy_kakashi_origin_battle_amt_ps_2v1";
const DIRECT_MI="academy_kakashi_origin_battle_mi_1v1";
const SECURE_2V1="academy_kakashi_origin_battle_ps_mi_2v1";
const AMT_PAKKUN="academy_kakashi_origin_battle_seq_amt_pakkun";

const D=Object.freeze({
 directIntro:"kak_konoha_direct_strike_intro_35910",
 directBattle:"kak_konoha_direct_strike_2v1_battle_35910",
 directReturn:"kak_konoha_direct_strike_2v1_return_35910",
 directMiArrival:"kak_konoha_direct_strike_mi_arrival_35910",
 directMiBattle:"kak_konoha_direct_strike_mi_battle_35910",
 directMiReturn:"kak_konoha_direct_strike_mi_return_35910",
 directGroup:"kak_konoha_direct_strike_group_disposition_35910",
 directPoliceEscort:"kak_konoha_direct_strike_police_escort_35910",
 directPoliceHandoff:"kak_konoha_direct_strike_police_handoff_35910",
 directAnbuEscort:"kak_konoha_direct_strike_anbu_escort_35910",
 directAnbuHandoff:"kak_konoha_direct_strike_anbu_handoff_35910",
 directKill:"kak_konoha_direct_strike_kill_all_35910",
 directRelease:"kak_konoha_direct_strike_release_all_35910",
 secureBeforeIntro:"kak_konoha_secure_before_intro_35910",
 secureBeforeBattle:"kak_konoha_secure_before_2v1_battle_35910",
 secureBeforeReturn:"kak_konoha_secure_before_2v1_return_35910",
 originalIntro:"kak_konoha_original_target_intro_35910",
 originalFailure:"kak_konoha_original_target_failure_35910",
 originalPakkun:"kak_konoha_original_target_pakkun_35910",
 originalBattle:"kak_konoha_original_target_amt_battle_35910",
 originalReturn:"kak_konoha_original_target_amt_return_35910",
 originalDisposition:"kak_konoha_original_target_disposition_35910",
 originalKill:"kak_konoha_original_target_kill_35910",
 originalRestrain:"kak_konoha_original_target_restrain_35910",
 originalAnbuEscort:"kak_konoha_original_target_anbu_escort_35910",
 originalAnbuHandoff:"kak_konoha_original_target_anbu_handoff_35910",
 originalPoliceEscort:"kak_konoha_original_target_police_escort_35910",
 originalPoliceHandoff:"kak_konoha_original_target_police_handoff_35910",
 getCloserHandoff:"kak_move_closer_success_handoff_performance_35910"
});
const PERFORMANCE_CURSOR="__kakashiKonohaRoutePerformance35910";
const PRELUDE_DONE="__kakashiKonohaRoutePreludeDone35910";
const DIRECT_INTRO_CUES=Object.freeze([{"cueId":"direct_intro_01","kind":"narration","text":"ANBU Marked Target reaches for the package.","branch":null},{"cueId":"direct_intro_02","kind":"narration","text":"Package Smuggler shifts forward to receive it.","branch":null},{"cueId":"direct_intro_03","kind":"narration","text":"Kakashi moves before either man can finish.","branch":null},{"cueId":"direct_intro_04","kind":"narration","text":"No waiting.","branch":null},{"cueId":"direct_intro_05","kind":"narration","text":"No attempt to learn more.","branch":null},{"cueId":"direct_intro_06","kind":"narration","text":"He drops directly into the space between them.","branch":null},{"cueId":"direct_intro_07","kind":"narration","text":"ANBU Marked Target pulls the package back.","branch":null},{"cueId":"direct_intro_08","kind":"narration","text":"Package Smuggler turns toward Kakashi instead.","branch":null},{"cueId":"direct_intro_09","kind":"narration","text":"The quiet handoff is over before it can happen.","branch":null},{"cueId":"direct_intro_10","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"You could've kept watching.","branch":null},{"cueId":"direct_intro_11","kind":"dialogue","speakerName":"KAKASHI","text":"I saw enough.","branch":null},{"cueId":"direct_intro_12","kind":"narration","text":"ANBU Marked Target shifts the package away from Kakashi.","branch":null},{"cueId":"direct_intro_13","kind":"narration","text":"Package Smuggler moves to the other side.","branch":null},{"cueId":"direct_intro_14","kind":"narration","text":"Two angles.","branch":null},{"cueId":"direct_intro_15","kind":"narration","text":"One objective.","branch":null},{"cueId":"direct_intro_16","kind":"narration","text":"Kakashi settles into stance.","branch":null},{"cueId":"direct_intro_17","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You're alone.","branch":null},{"cueId":"direct_intro_18","kind":"dialogue","speakerName":"KAKASHI","text":"For now.","branch":null},{"cueId":"direct_intro_19","kind":"narration","text":"Neither man gives him time to explain what he means.","branch":null}].map(row=>Object.freeze(row)));
const DIRECT_LOSS1_CUES=Object.freeze([{"cueId":"direct_loss1_01","kind":"narration","text":"Kakashi loses the fight before he ever gets control of the package.","branch":null},{"cueId":"direct_loss1_02","kind":"narration","text":"ANBU Marked Target does not wait for a second chance.","branch":null},{"cueId":"direct_loss1_03","kind":"narration","text":"Package Smuggler pulls back with him.","branch":null},{"cueId":"direct_loss1_04","kind":"narration","text":"The interrupted handoff never becomes clean.","branch":null},{"cueId":"direct_loss1_05","kind":"narration","text":"It no longer needs to.","branch":null},{"cueId":"direct_loss1_06","kind":"narration","text":"They already know Kakashi is there.","branch":null},{"cueId":"direct_loss1_07","kind":"narration","text":"ANBU Marked Target keeps the package and both men withdraw together.","branch":null},{"cueId":"direct_loss1_08","kind":"narration","text":"Kakashi forces himself back to his feet.","branch":null},{"cueId":"direct_loss1_09","kind":"narration","text":"The street is empty.","branch":null},{"cueId":"direct_loss1_10","kind":"narration","text":"No masked shinobi appears.","branch":null},{"cueId":"direct_loss1_11","kind":"narration","text":"There is nothing left here for her to take from Kakashi.","branch":null},{"cueId":"direct_loss1_12","kind":"narration","text":"He never had the package.","branch":null}].map(row=>Object.freeze(row)));
const DIRECT_WIN1_CUES=Object.freeze([{"cueId":"direct_win1_01","kind":"narration","text":"Package Smuggler goes down first.","branch":null},{"cueId":"direct_win1_02","kind":"narration","text":"ANBU Marked Target lasts longer.","branch":null},{"cueId":"direct_win1_03","kind":"narration","text":"Not long enough.","branch":null},{"cueId":"direct_win1_04","kind":"narration","text":"When the fight ends, both men are on the ground.","branch":null},{"cueId":"direct_win1_05","kind":"narration","text":"Kakashi's attention goes straight to the package.","branch":null},{"cueId":"direct_win1_06","kind":"narration","text":"ANBU Marked Target still has it.","branch":null},{"cueId":"direct_win1_07","kind":"narration","text":"Kakashi takes it.","branch":null},{"cueId":"direct_win1_08","kind":"narration","text":"Checks the seal.","branch":null},{"cueId":"direct_win1_09","kind":"narration","text":"Secures it against himself.","branch":null},{"cueId":"direct_win1_10","kind":"narration","text":"The handoff is stopped.","branch":null},{"cueId":"direct_win1_11","kind":"narration","text":"The objective is finally in his control.","branch":null},{"cueId":"direct_win1_12","kind":"narration","text":"Then the street changes.","branch":null}].map(row=>Object.freeze(row)));
const DIRECT_MI_ARRIVAL_CUES=Object.freeze([{"cueId":"direct_mi_arrival_01","kind":"narration","text":"Movement cuts across the far side of the Sakura tree.","branch":null},{"cueId":"direct_mi_arrival_02","kind":"narration","text":"Fast.","branch":null},{"cueId":"direct_mi_arrival_03","kind":"narration","text":"Direct.","branch":null},{"cueId":"direct_mi_arrival_04","kind":"narration","text":"A masked shinobi lands between Kakashi and the open street.","branch":null},{"cueId":"direct_mi_arrival_05","kind":"narration","text":"Her attention does not go to either defeated man.","branch":null},{"cueId":"direct_mi_arrival_06","kind":"narration","text":"It goes to the package secured against Kakashi.","branch":null},{"cueId":"direct_mi_arrival_07","kind":"narration","text":"Kakashi notices.","branch":null},{"cueId":"direct_mi_arrival_08","kind":"dialogue","speakerName":"KAKASHI","text":"You're late.","branch":null},{"cueId":"direct_mi_arrival_09","kind":"dialogue","speakerName":"MASKED INTERCEPTOR","text":"Not for what I came for.","branch":null},{"cueId":"direct_mi_arrival_10","kind":"narration","text":"Her eyes stay on the package.","branch":null},{"cueId":"direct_mi_arrival_11","kind":"narration","text":"Kakashi shifts his weight.","branch":null},{"cueId":"direct_mi_arrival_12","kind":"dialogue","speakerName":"KAKASHI","text":"You want this.","branch":null},{"cueId":"direct_mi_arrival_13","kind":"dialogue","speakerName":"MASKED INTERCEPTOR","text":"I want you to put it down.","branch":null},{"cueId":"direct_mi_arrival_14","kind":"dialogue","speakerName":"KAKASHI","text":"No.","branch":null},{"cueId":"direct_mi_arrival_15","kind":"narration","text":"Masked Interceptor moves.","branch":null},{"cueId":"direct_mi_arrival_16","kind":"narration","text":"So does Kakashi.","branch":null}].map(row=>Object.freeze(row)));
const DIRECT_MI_LOSS_CUES=Object.freeze([{"cueId":"direct_mi_loss_01","kind":"narration","text":"Masked Interceptor breaks through Kakashi's defence.","branch":null},{"cueId":"direct_mi_loss_02","kind":"narration","text":"He keeps one hand near the package.","branch":null},{"cueId":"direct_mi_loss_03","kind":"narration","text":"She notices.","branch":null},{"cueId":"direct_mi_loss_04","kind":"narration","text":"The next exchange is about that hand.","branch":null},{"cueId":"direct_mi_loss_05","kind":"narration","text":"Kakashi loses it.","branch":null},{"cueId":"direct_mi_loss_06","kind":"narration","text":"The package comes free.","branch":null},{"cueId":"direct_mi_loss_07","kind":"narration","text":"Masked Interceptor catches it before it hits the ground.","branch":null},{"cueId":"direct_mi_loss_08","kind":"narration","text":"For half a second, she looks down at the seal.","branch":null},{"cueId":"direct_mi_loss_09","kind":"narration","text":"Then back at Kakashi.","branch":null},{"cueId":"direct_mi_loss_10","kind":"dialogue","speakerName":"MASKED INTERCEPTOR","text":"You should've left after the first fight.","branch":null},{"cueId":"direct_mi_loss_11","kind":"dialogue","speakerName":"KAKASHI","text":"You would've followed.","branch":null},{"cueId":"direct_mi_loss_12","kind":"narration","text":"A small pause.","branch":null},{"cueId":"direct_mi_loss_13","kind":"dialogue","speakerName":"MASKED INTERCEPTOR","text":"Probably.","branch":null},{"cueId":"direct_mi_loss_14","kind":"narration","text":"She disappears with the package.","branch":null},{"cueId":"direct_mi_loss_15","kind":"narration","text":"Kakashi looks toward the two men he defeated earlier.","branch":null},{"cueId":"direct_mi_loss_16","kind":"narration","text":"Still alive.","branch":null},{"cueId":"direct_mi_loss_17","kind":"narration","text":"Still where the fights left them.","branch":null},{"cueId":"direct_mi_loss_18","kind":"narration","text":"But Kakashi no longer controls the objective, and he is in no condition to turn the street into a third confrontation.","branch":null}].map(row=>Object.freeze(row)));
const DIRECT_MI_WIN_CUES=Object.freeze([{"cueId":"direct_mi_win_01","kind":"narration","text":"Masked Interceptor hits the ground.","branch":null},{"cueId":"direct_mi_win_02","kind":"narration","text":"Kakashi stays between her and the package until he is certain she is not getting another attempt.","branch":null},{"cueId":"direct_mi_win_03","kind":"narration","text":"Then he looks across the street.","branch":null},{"cueId":"direct_mi_win_04","kind":"narration","text":"ANBU Marked Target.","branch":null},{"cueId":"direct_mi_win_05","kind":"narration","text":"Package Smuggler.","branch":null},{"cueId":"direct_mi_win_06","kind":"narration","text":"Masked Interceptor.","branch":null},{"cueId":"direct_mi_win_07","kind":"narration","text":"All three defeated.","branch":null},{"cueId":"direct_mi_win_08","kind":"narration","text":"The package is still secured against Kakashi.","branch":null},{"cueId":"direct_mi_win_09","kind":"narration","text":"This time, nothing else arrives.","branch":null},{"cueId":"direct_mi_win_10","kind":"narration","text":"The next decision is his.","branch":null}].map(row=>Object.freeze(row)));
const DIRECT_POLICE_ESCORT_CUES=Object.freeze([{"cueId":"direct_police_escort_01","kind":"narration","text":"Kakashi draws the ninja wire.","branch":null},{"cueId":"direct_police_escort_02","kind":"narration","text":"Package Smuggler sees it and closes his eyes for a moment.","branch":null},{"cueId":"direct_police_escort_03","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"I knew the night was getting worse.","branch":null},{"cueId":"direct_police_escort_04","kind":"dialogue","speakerName":"MASKED INTERCEPTOR","text":"You talk too much.","branch":null},{"cueId":"direct_police_escort_05","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"I've had a difficult evening.","branch":null},{"cueId":"direct_police_escort_06","kind":"narration","text":"Kakashi restrains them individually.","branch":null},{"cueId":"direct_police_escort_07","kind":"narration","text":"ANBU Marked Target.","branch":null},{"cueId":"direct_police_escort_08","kind":"narration","text":"Package Smuggler.","branch":null},{"cueId":"direct_police_escort_09","kind":"narration","text":"Masked Interceptor.","branch":null},{"cueId":"direct_police_escort_10","kind":"narration","text":"The package remains secured against him.","branch":null},{"cueId":"direct_police_escort_11","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"Where are you taking us?","branch":null},{"cueId":"direct_police_escort_12","kind":"dialogue","speakerName":"KAKASHI","text":"Uchiha Police Force.","branch":null},{"cueId":"direct_police_escort_13","kind":"narration","text":"Package Smuggler looks at the others.","branch":null},{"cueId":"direct_police_escort_14","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"Anyone want to try him again?","branch":null},{"cueId":"direct_police_escort_15","kind":"narration","text":"Nobody answers.","branch":null}].map(row=>Object.freeze(row)));
const DIRECT_POLICE_HANDOFF_CUES=Object.freeze([{"cueId":"direct_police_handoff_01","kind":"narration","text":"Two officers meet Kakashi outside.","branch":null},{"cueId":"direct_police_handoff_02","kind":"narration","text":"One looks at the three prisoners.","branch":null},{"cueId":"direct_police_handoff_03","kind":"narration","text":"Then at Kakashi.","branch":null},{"cueId":"direct_police_handoff_04","kind":"narration","text":"Then at the package.","branch":null},{"cueId":"direct_police_handoff_05","kind":"dialogue","speakerName":"UCHIHA POLICE OFFICER","text":"Start talking.","branch":null},{"cueId":"direct_police_handoff_06","kind":"narration","text":"Kakashi gives the chronology exactly as it happened.","branch":null},{"cueId":"direct_police_handoff_07","kind":"narration","text":"He interrupted the handoff.","branch":null},{"cueId":"direct_police_handoff_08","kind":"narration","text":"The two men fought him.","branch":null},{"cueId":"direct_police_handoff_09","kind":"narration","text":"He recovered the package.","branch":null},{"cueId":"direct_police_handoff_10","kind":"narration","text":"The masked shinobi arrived afterward and tried to take it.","branch":null},{"cueId":"direct_police_handoff_11","kind":"narration","text":"He defeated her too.","branch":null},{"cueId":"direct_police_handoff_12","kind":"narration","text":"The officer looks at the three prisoners.","branch":null},{"cueId":"direct_police_handoff_13","kind":"dialogue","speakerName":"UCHIHA POLICE OFFICER","text":"All three?","branch":null},{"cueId":"direct_police_handoff_14","kind":"dialogue","speakerName":"KAKASHI","text":"Yes.","branch":null},{"cueId":"direct_police_handoff_15","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"He's very concise about it.","branch":null},{"cueId":"direct_police_handoff_16","kind":"narration","text":"The officers accept custody one person at a time.","branch":null},{"cueId":"direct_police_handoff_17","kind":"narration","text":"No aggregate prisoner state replaces the three individual transfers.","branch":null}].map(row=>Object.freeze(row)));
const DIRECT_ANBU_ESCORT_CUES=Object.freeze([{"cueId":"direct_anbu_escort_01","kind":"narration","text":"Kakashi restrains all three with ninja wire.","branch":null},{"cueId":"direct_anbu_escort_02","kind":"narration","text":"Package Smuggler watches the last line tighten.","branch":null},{"cueId":"direct_anbu_escort_03","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"ANBU?","branch":null},{"cueId":"direct_anbu_escort_04","kind":"dialogue","speakerName":"KAKASHI","text":"Yes.","branch":null},{"cueId":"direct_anbu_escort_05","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"I preferred not knowing.","branch":null},{"cueId":"direct_anbu_escort_06","kind":"narration","text":"Masked Interceptor looks at him.","branch":null},{"cueId":"direct_anbu_escort_07","kind":"dialogue","speakerName":"MASKED INTERCEPTOR","text":"You still don't.","branch":null}].map(row=>Object.freeze(row)));
const DIRECT_ANBU_HANDOFF_CUES=Object.freeze([{"cueId":"direct_anbu_handoff_01","kind":"narration","text":"The ANBU operative turns.","branch":null},{"cueId":"direct_anbu_handoff_02","kind":"narration","text":"His gaze goes to the package.","branch":null},{"cueId":"direct_anbu_handoff_03","kind":"narration","text":"Then to the three restrained shinobi Kakashi brought with it.","branch":null},{"cueId":"direct_anbu_handoff_04","kind":"dialogue","speakerName":"ANBU OPERATIVE","text":"Report.","branch":null},{"cueId":"direct_anbu_handoff_05","kind":"narration","text":"Kakashi hands over the package first.","branch":null},{"cueId":"direct_anbu_handoff_06","kind":"narration","text":"Then gives the sequence.","branch":null},{"cueId":"direct_anbu_handoff_07","kind":"narration","text":"The interrupted handoff.","branch":null},{"cueId":"direct_anbu_handoff_08","kind":"narration","text":"The first fight.","branch":null},{"cueId":"direct_anbu_handoff_09","kind":"narration","text":"The package recovery.","branch":null},{"cueId":"direct_anbu_handoff_10","kind":"narration","text":"Masked Interceptor's arrival.","branch":null},{"cueId":"direct_anbu_handoff_11","kind":"narration","text":"The second fight.","branch":null},{"cueId":"direct_anbu_handoff_12","kind":"narration","text":"Three live prisoners.","branch":null},{"cueId":"direct_anbu_handoff_13","kind":"narration","text":"The operative waits until Kakashi finishes.","branch":null},{"cueId":"direct_anbu_handoff_14","kind":"dialogue","speakerName":"ANBU OPERATIVE","text":"You brought everyone.","branch":null},{"cueId":"direct_anbu_handoff_15","kind":"dialogue","speakerName":"KAKASHI","text":"They were all still there.","branch":null},{"cueId":"direct_anbu_handoff_16","kind":"narration","text":"Package Smuggler makes a small sound.","branch":null},{"cueId":"direct_anbu_handoff_17","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"That's one way to describe it.","branch":null},{"cueId":"direct_anbu_handoff_18","kind":"narration","text":"The operative steps forward.","branch":null},{"cueId":"direct_anbu_handoff_19","kind":"dialogue","speakerName":"ANBU OPERATIVE","text":"We'll take custody.","branch":null}].map(row=>Object.freeze(row)));
const DIRECT_KILL_CUES=Object.freeze([{"cueId":"direct_kill_01","kind":"narration","text":"Kakashi looks at all three defeated shinobi.","branch":null},{"cueId":"direct_kill_02","kind":"narration","text":"The package is secure.","branch":null},{"cueId":"direct_kill_03","kind":"narration","text":"No one is still fighting him for it.","branch":null},{"cueId":"direct_kill_04","kind":"narration","text":"He makes one decision.","branch":null},{"cueId":"direct_kill_05","kind":"narration","text":"The result is three separate deaths.","branch":null},{"cueId":"direct_kill_06","kind":"narration","text":"There is no celebration.","branch":null},{"cueId":"direct_kill_07","kind":"narration","text":"No speech.","branch":null},{"cueId":"direct_kill_08","kind":"narration","text":"No attempt to make the choice sound lighter afterward.","branch":null},{"cueId":"direct_kill_09","kind":"narration","text":"When it is finished, Kakashi is the only shinobi still standing beneath the Sakura tree.","branch":null},{"cueId":"direct_kill_10","kind":"narration","text":"The package remains with him.","branch":null}].map(row=>Object.freeze(row)));
const DIRECT_RELEASE_CUES=Object.freeze([{"cueId":"direct_release_01","kind":"narration","text":"Kakashi checks the package.","branch":null},{"cueId":"direct_release_02","kind":"narration","text":"Still secure.","branch":null},{"cueId":"direct_release_03","kind":"narration","text":"Then he looks at the three defeated shinobi.","branch":null},{"cueId":"direct_release_04","kind":"narration","text":"He does not reach for wire.","branch":null},{"cueId":"direct_release_05","kind":"narration","text":"Package Smuggler notices.","branch":null},{"cueId":"direct_release_06","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"We're leaving?","branch":null},{"cueId":"direct_release_07","kind":"dialogue","speakerName":"KAKASHI","text":"Yes.","branch":null},{"cueId":"direct_release_08","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"With nothing.","branch":null},{"cueId":"direct_release_09","kind":"narration","text":"Kakashi looks at him.","branch":null},{"cueId":"direct_release_10","kind":"dialogue","speakerName":"KAKASHI","text":"That's the idea.","branch":null},{"cueId":"direct_release_11","kind":"narration","text":"ANBU Marked Target gets to his feet slowly.","branch":null},{"cueId":"direct_release_12","kind":"narration","text":"Masked Interceptor follows.","branch":null},{"cueId":"direct_release_13","kind":"narration","text":"She looks once at the package.","branch":null},{"cueId":"direct_release_14","kind":"narration","text":"Then at Kakashi.","branch":null},{"cueId":"direct_release_15","kind":"dialogue","speakerName":"MASKED INTERCEPTOR","text":"You think that's finished?","branch":null},{"cueId":"direct_release_16","kind":"dialogue","speakerName":"KAKASHI","text":"For tonight.","branch":null},{"cueId":"direct_release_17","kind":"narration","text":"She holds his gaze for a moment.","branch":null},{"cueId":"direct_release_18","kind":"narration","text":"Then leaves.","branch":null},{"cueId":"direct_release_19","kind":"narration","text":"The other two go with their own reasons for not trying again.","branch":null},{"cueId":"direct_release_20","kind":"narration","text":"Kakashi keeps the package.","branch":null}].map(row=>Object.freeze(row)));
const ORIGINAL_INTRO_CUES=Object.freeze([{"cueId":"original_intro_01","kind":"narration","text":"Kakashi watches the package leave in Package Smuggler's hands.","branch":null},{"cueId":"original_intro_02","kind":"narration","text":"Masked Interceptor enters the street.","branch":null},{"cueId":"original_intro_03","kind":"narration","text":"ANBU Marked Target keeps moving.","branch":null},{"cueId":"original_intro_04","kind":"narration","text":"The obvious choice is the package.","branch":null},{"cueId":"original_intro_05","kind":"narration","text":"Kakashi chooses the man who carried it here.","branch":null},{"cueId":"original_intro_06","kind":"narration","text":"He turns away from the objective and goes after ANBU Marked Target.","branch":null},{"cueId":"original_intro_07","kind":"narration","text":"That choice costs him immediately.","branch":null},{"cueId":"original_intro_08","kind":"narration","text":"Package Smuggler disappears in the opposite direction with the package.","branch":null},{"cueId":"original_intro_09","kind":"narration","text":"Masked Interceptor remains behind with him.","branch":null},{"cueId":"original_intro_10","kind":"narration","text":"Kakashi does not look back.","branch":null}].map(row=>Object.freeze(row)));
const ORIGINAL_FAILURE_CUES=Object.freeze([{"cueId":"original_failure_01","kind":"narration","text":"ANBU Marked Target clears the next street before Kakashi can close the distance.","branch":null},{"cueId":"original_failure_02","kind":"narration","text":"Kakashi follows.","branch":null},{"cueId":"original_failure_03","kind":"narration","text":"One turn.","branch":null},{"cueId":"original_failure_04","kind":"narration","text":"Then another.","branch":null},{"cueId":"original_failure_05","kind":"narration","text":"The trail thins.","branch":null},{"cueId":"original_failure_06","kind":"narration","text":"A roof tile shifted here.","branch":null},{"cueId":"original_failure_07","kind":"narration","text":"A landing there.","branch":null},{"cueId":"original_failure_08","kind":"narration","text":"Then nothing.","branch":null},{"cueId":"original_failure_09","kind":"narration","text":"Kakashi stops.","branch":null},{"cueId":"original_failure_10","kind":"narration","text":"Not because he wants to.","branch":null},{"cueId":"original_failure_11","kind":"narration","text":"Because chasing a guess is no longer tracking.","branch":null},{"cueId":"original_failure_12","kind":"narration","text":"The package is gone in the other direction.","branch":null},{"cueId":"original_failure_13","kind":"narration","text":"The man is gone ahead.","branch":null},{"cueId":"original_failure_14","kind":"narration","text":"Kakashi chose one.","branch":null},{"cueId":"original_failure_15","kind":"narration","text":"And lost him too.","branch":null}].map(row=>Object.freeze(row)));
const ORIGINAL_PAKKUN_CUES=Object.freeze([{"cueId":"original_pakkun_01","kind":"narration","text":"ANBU Marked Target rounds the next corner.","branch":null},{"cueId":"original_pakkun_02","kind":"narration","text":"Then stops.","branch":null},{"cueId":"original_pakkun_03","kind":"narration","text":"A small ninken is sitting in the street ahead of him.","branch":null},{"cueId":"original_pakkun_04","kind":"narration","text":"He stares down at it.","branch":null},{"cueId":"original_pakkun_05","kind":"narration","text":"The ninken looks past him.","branch":null},{"cueId":"original_pakkun_06","kind":"narration","text":"Kakashi lands behind.","branch":null},{"cueId":"original_pakkun_07","kind":"narration","text":"Pakkun's ears lift.","branch":null},{"cueId":"original_pakkun_08","kind":"dialogue","speakerName":"PAKKUN","text":"This yours?","branch":null},{"cueId":"original_pakkun_09","kind":"narration","text":"Kakashi looks at ANBU Marked Target.","branch":null},{"cueId":"original_pakkun_10","kind":"dialogue","speakerName":"KAKASHI","text":"Apparently.","branch":null},{"cueId":"original_pakkun_11","kind":"narration","text":"ANBU Marked Target looks between them.","branch":null},{"cueId":"original_pakkun_12","kind":"narration","text":"Then at Kakashi.","branch":null},{"cueId":"original_pakkun_13","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You know I don't have the package anymore.","branch":null},{"cueId":"original_pakkun_14","kind":"dialogue","speakerName":"KAKASHI","text":"I know.","branch":null},{"cueId":"original_pakkun_15","kind":"narration","text":"That answer bothers him more than an accusation would have.","branch":null},{"cueId":"original_pakkun_16","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"Then why are you still following me?","branch":null},{"cueId":"original_pakkun_17","kind":"dialogue","speakerName":"KAKASHI","text":"You were the one I started with.","branch":null},{"cueId":"original_pakkun_18","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"And the package?","branch":null},{"cueId":"original_pakkun_19","kind":"dialogue","speakerName":"KAKASHI","text":"Gone.","branch":null},{"cueId":"original_pakkun_20","kind":"narration","text":"Kakashi settles his stance.","branch":null},{"cueId":"original_pakkun_21","kind":"dialogue","speakerName":"KAKASHI","text":"You aren't.","branch":null},{"cueId":"original_pakkun_22","kind":"narration","text":"Pakkun rises.","branch":null},{"cueId":"original_pakkun_23","kind":"narration","text":"ANBU Marked Target glances toward the alley mouth.","branch":null},{"cueId":"original_pakkun_24","kind":"narration","text":"Pakkun notices.","branch":null},{"cueId":"original_pakkun_25","kind":"dialogue","speakerName":"PAKKUN","text":"He's thinking about running.","branch":null},{"cueId":"original_pakkun_26","kind":"dialogue","speakerName":"KAKASHI","text":"I know.","branch":null},{"cueId":"original_pakkun_27","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You two always this helpful?","branch":null},{"cueId":"original_pakkun_28","kind":"dialogue","speakerName":"PAKKUN","text":"We just met.","branch":null}].map(row=>Object.freeze(row)));
const ORIGINAL_LOSS_CUES=Object.freeze([{"cueId":"original_loss_01","kind":"narration","text":"ANBU Marked Target finds the opening first.","branch":null},{"cueId":"original_loss_02","kind":"narration","text":"Kakashi loses the fight.","branch":null},{"cueId":"original_loss_03","kind":"narration","text":"The man does not stay to explain it.","branch":null},{"cueId":"original_loss_04","kind":"narration","text":"He runs.","branch":null},{"cueId":"original_loss_05","kind":"narration","text":"The package does not magically return to him because he won.","branch":null},{"cueId":"original_loss_06","kind":"narration","text":"It is still wherever the package state says it is.","branch":null},{"cueId":"original_loss_07","kind":"narration","text":"Pakkun remains nearby long enough to watch the alley empty.","branch":null},{"cueId":"original_loss_08","kind":"dialogue","speakerName":"PAKKUN","text":"You chased the man without the package.","branch":null},{"cueId":"original_loss_09","kind":"dialogue","speakerName":"KAKASHI","text":"I noticed.","branch":null},{"cueId":"original_loss_10","kind":"dialogue","speakerName":"PAKKUN","text":"Good.","branch":null},{"cueId":"original_loss_11","kind":"narration","text":"Kakashi looks at him.","branch":null},{"cueId":"original_loss_12","kind":"dialogue","speakerName":"PAKKUN","text":"Saves me explaining it.","branch":null}].map(row=>Object.freeze(row)));
const ORIGINAL_WIN_CUES=Object.freeze([{"cueId":"original_win_01","kind":"narration","text":"ANBU Marked Target goes down.","branch":null},{"cueId":"original_win_02","kind":"narration","text":"Kakashi stays on him until the fight is finished.","branch":null},{"cueId":"original_win_03","kind":"narration","text":"Pakkun watches from a few steps away.","branch":null},{"cueId":"original_win_04","kind":"narration","text":"The package is still missing.","branch":null},{"cueId":"original_win_05","kind":"narration","text":"That problem has not become smaller because this one is on the ground.","branch":null},{"cueId":"original_win_06","kind":"narration","text":"But ANBU Marked Target is no longer running.","branch":null},{"cueId":"original_win_07","kind":"narration","text":"Kakashi looks at him.","branch":null},{"cueId":"original_win_08","kind":"narration","text":"Then decides what happens next.","branch":null}].map(row=>Object.freeze(row)));
const ORIGINAL_KILL_CUES=Object.freeze([{"cueId":"original_kill_01","kind":"narration","text":"Kakashi looks down at the man he chose over the package.","branch":null},{"cueId":"original_kill_02","kind":"narration","text":"The package is still gone.","branch":null},{"cueId":"original_kill_03","kind":"narration","text":"Killing him will not bring it back.","branch":null},{"cueId":"original_kill_04","kind":"narration","text":"Kakashi knows that.","branch":null},{"cueId":"original_kill_05","kind":"narration","text":"The decision is about the man in front of him now.","branch":null},{"cueId":"original_kill_06","kind":"narration","text":"Not the objective already lost.","branch":null},{"cueId":"original_kill_07","kind":"narration","text":"Pakkun watches Kakashi's face.","branch":null},{"cueId":"original_kill_08","kind":"narration","text":"Not his hand.","branch":null},{"cueId":"original_kill_09","kind":"narration","text":"Kakashi makes the choice.","branch":null},{"cueId":"original_kill_10","kind":"narration","text":"The end is quick.","branch":null},{"cueId":"original_kill_11","kind":"narration","text":"Deliberate.","branch":null},{"cueId":"original_kill_12","kind":"narration","text":"Final.","branch":null},{"cueId":"original_kill_13","kind":"dialogue","speakerName":"PAKKUN","text":"You decided fast.","branch":null},{"cueId":"original_kill_14","kind":"narration","text":"Kakashi looks toward the street Package Smuggler used earlier.","branch":null},{"cueId":"original_kill_15","kind":"dialogue","speakerName":"KAKASHI","text":"I decided before I moved.","branch":null},{"cueId":"original_kill_16","kind":"narration","text":"Pakkun studies him for a moment.","branch":null},{"cueId":"original_kill_17","kind":"dialogue","speakerName":"PAKKUN","text":"That doesn't make it lighter.","branch":null},{"cueId":"original_kill_18","kind":"dialogue","speakerName":"KAKASHI","text":"No.","branch":null}].map(row=>Object.freeze(row)));
const ORIGINAL_RESTRAIN_CUES=Object.freeze([{"cueId":"original_restrain_01","kind":"narration","text":"Kakashi draws the ninja wire from his kit.","branch":null},{"cueId":"original_restrain_02","kind":"narration","text":"ANBU Marked Target watches him.","branch":null},{"cueId":"original_restrain_03","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You're leaving me here.","branch":null},{"cueId":"original_restrain_04","kind":"dialogue","speakerName":"KAKASHI","text":"For now.","branch":null},{"cueId":"original_restrain_05","kind":"narration","text":"Kakashi brings his wrists behind him and secures them with Wire Snare.","branch":null},{"cueId":"original_restrain_06","kind":"narration","text":"A second line fixes the restraint to a solid anchor in the alley.","branch":null},{"cueId":"original_restrain_07","kind":"narration","text":"Kakashi checks the tension once.","branch":null},{"cueId":"original_restrain_08","kind":"narration","text":"Then again.","branch":null},{"cueId":"original_restrain_09","kind":"narration","text":"Pakkun watches the second check.","branch":null},{"cueId":"original_restrain_10","kind":"dialogue","speakerName":"PAKKUN","text":"You trust your knots that little?","branch":null},{"cueId":"original_restrain_11","kind":"dialogue","speakerName":"KAKASHI","text":"I trust them enough to check.","branch":null},{"cueId":"original_restrain_12","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"Comforting.","branch":null},{"cueId":"original_restrain_13","kind":"narration","text":"Kakashi rises.","branch":null},{"cueId":"original_restrain_14","kind":"dialogue","speakerName":"KAKASHI","text":"Someone will come for you.","branch":null},{"cueId":"original_restrain_15","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"ANBU?","branch":null},{"cueId":"original_restrain_16","kind":"dialogue","speakerName":"KAKASHI","text":"They'll decide.","branch":null}].map(row=>Object.freeze(row)));
const ORIGINAL_ANBU_ESCORT_CUES=Object.freeze([{"cueId":"original_anbu_escort_01","kind":"narration","text":"Kakashi pulls out the ninja wire.","branch":null},{"cueId":"original_anbu_escort_02","kind":"narration","text":"ANBU Marked Target looks at it.","branch":null},{"cueId":"original_anbu_escort_03","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You're taking me back.","branch":null},{"cueId":"original_anbu_escort_04","kind":"dialogue","speakerName":"KAKASHI","text":"Yes.","branch":null},{"cueId":"original_anbu_escort_05","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"Without the package.","branch":null},{"cueId":"original_anbu_escort_06","kind":"dialogue","speakerName":"KAKASHI","text":"Yes.","branch":null},{"cueId":"original_anbu_escort_07","kind":"narration","text":"The answer does not change because the second fact sounds worse.","branch":null},{"cueId":"original_anbu_escort_08","kind":"narration","text":"Kakashi secures his wrists and takes hold of the restraint line.","branch":null},{"cueId":"original_anbu_escort_09","kind":"narration","text":"Pakkun falls into step.","branch":null},{"cueId":"original_anbu_escort_10","kind":"dialogue","speakerName":"PAKKUN","text":"You always collect the part you didn't lose?","branch":null},{"cueId":"original_anbu_escort_11","kind":"dialogue","speakerName":"KAKASHI","text":"Only when it stops running.","branch":null}].map(row=>Object.freeze(row)));
const ORIGINAL_POLICE_ESCORT_CUES=Object.freeze([{"cueId":"original_police_escort_01","kind":"narration","text":"Kakashi draws the ninja wire.","branch":null},{"cueId":"original_police_escort_02","kind":"narration","text":"ANBU Marked Target notices where his attention goes.","branch":null},{"cueId":"original_police_escort_03","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"ANBU?","branch":null},{"cueId":"original_police_escort_04","kind":"dialogue","speakerName":"KAKASHI","text":"No.","branch":null},{"cueId":"original_police_escort_05","kind":"narration","text":"Kakashi secures his wrists.","branch":null},{"cueId":"original_police_escort_06","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"Then where?","branch":null},{"cueId":"original_police_escort_07","kind":"dialogue","speakerName":"KAKASHI","text":"Uchiha Police Force.","branch":null},{"cueId":"original_police_escort_08","kind":"narration","text":"The man looks at him for a moment longer than expected.","branch":null},{"cueId":"original_police_escort_09","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You lost the package and decided to make this official.","branch":null},{"cueId":"original_police_escort_10","kind":"dialogue","speakerName":"KAKASHI","text":"You were involved in the exchange.","branch":null},{"cueId":"original_police_escort_11","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"So were you.","branch":null},{"cueId":"original_police_escort_12","kind":"narration","text":"Pakkun starts walking.","branch":null},{"cueId":"original_police_escort_13","kind":"dialogue","speakerName":"PAKKUN","text":"He has a point.","branch":null},{"cueId":"original_police_escort_14","kind":"narration","text":"Kakashi looks at him.","branch":null},{"cueId":"original_police_escort_15","kind":"dialogue","speakerName":"PAKKUN","text":"Doesn't mean I like him.","branch":null},{"cueId":"original_police_escort_16","kind":"dialogue","speakerName":"KAKASHI","text":"Keep moving.","branch":null},{"cueId":"original_police_escort_17","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"Which one of us?","branch":null},{"cueId":"original_police_escort_18","kind":"dialogue","speakerName":"PAKKUN","text":"Yes.","branch":null}].map(row=>Object.freeze(row)));
const ORIGINAL_POLICE_HANDOFF_CUES=Object.freeze([{"cueId":"original_police_handoff_01","kind":"narration","text":"The Police entrance is still lit.","branch":null},{"cueId":"original_police_handoff_02","kind":"narration","text":"Two officers step forward as Kakashi approaches with the restrained man.","branch":null},{"cueId":"original_police_handoff_03","kind":"narration","text":"Pakkun stops beside him.","branch":null},{"cueId":"original_police_handoff_04","kind":"narration","text":"One officer raises a hand.","branch":null},{"cueId":"original_police_handoff_05","kind":"dialogue","speakerName":"UCHIHA POLICE OFFICER","text":"Hold there.","branch":null},{"cueId":"original_police_handoff_06","kind":"narration","text":"Kakashi stops.","branch":null},{"cueId":"original_police_handoff_07","kind":"narration","text":"The officer looks at ANBU Marked Target.","branch":null},{"cueId":"original_police_handoff_08","kind":"narration","text":"Then at the wire around his wrists.","branch":null},{"cueId":"original_police_handoff_09","kind":"dialogue","speakerName":"UCHIHA POLICE OFFICER","text":"What happened?","branch":null},{"cueId":"original_police_handoff_10","kind":"dialogue","speakerName":"KAKASHI","text":"He was carrying a package for a handoff.","branch":null},{"cueId":"original_police_handoff_11","kind":"dialogue","speakerName":"UCHIHA POLICE OFFICER","text":"Was?","branch":null},{"cueId":"original_police_handoff_12","kind":"dialogue","speakerName":"KAKASHI","text":"He gave it to another man.","branch":null},{"cueId":"original_police_handoff_13","kind":"dialogue","speakerName":"UCHIHA POLICE OFFICER","text":"Where is the package now?","branch":null},{"cueId":"original_police_handoff_14","kind":"dialogue","speakerName":"KAKASHI","text":"Gone.","branch":null},{"cueId":"original_police_handoff_15","kind":"narration","text":"The officer's expression tightens.","branch":null},{"cueId":"original_police_handoff_16","kind":"dialogue","speakerName":"UCHIHA POLICE OFFICER","text":"And you're bringing us him.","branch":null},{"cueId":"original_police_handoff_17","kind":"dialogue","speakerName":"KAKASHI","text":"Yes.","branch":null},{"cueId":"original_police_handoff_18","kind":"dialogue","speakerName":"UCHIHA POLICE OFFICER","text":"You know his name?","branch":null},{"cueId":"original_police_handoff_19","kind":"dialogue","speakerName":"KAKASHI","text":"No.","branch":null},{"cueId":"original_police_handoff_20","kind":"dialogue","speakerName":"UCHIHA POLICE OFFICER","text":"Affiliation?","branch":null},{"cueId":"original_police_handoff_21","kind":"dialogue","speakerName":"KAKASHI","text":"Unknown.","branch":null},{"cueId":"original_police_handoff_22","kind":"narration","text":"ANBU Marked Target looks at Kakashi.","branch":null},{"cueId":"original_police_handoff_23","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You're very informative.","branch":null},{"cueId":"original_police_handoff_24","kind":"dialogue","speakerName":"KAKASHI","text":"I tell people what I know.","branch":null},{"cueId":"original_police_handoff_25","kind":"dialogue","speakerName":"PAKKUN","text":"Short meetings.","branch":null},{"cueId":"original_police_handoff_26","kind":"narration","text":"The second officer steps toward the restraint line.","branch":null},{"cueId":"original_police_handoff_27","kind":"dialogue","speakerName":"UCHIHA POLICE OFFICER","text":"We'll take him.","branch":null},{"cueId":"original_police_handoff_28","kind":"narration","text":"Kakashi transfers control only after the officer has him secured.","branch":null},{"cueId":"original_police_handoff_29","kind":"narration","text":"ANBU Marked Target passes Kakashi.","branch":null},{"cueId":"original_police_handoff_30","kind":"narration","text":"Then stops.","branch":null},{"cueId":"original_police_handoff_31","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You still don't have the package.","branch":null},{"cueId":"original_police_handoff_32","kind":"dialogue","speakerName":"KAKASHI","text":"I know.","branch":null},{"cueId":"original_police_handoff_33","kind":"narration","text":"The officers lead him toward the entrance.","branch":null},{"cueId":"original_police_handoff_34","kind":"narration","text":"The first officer looks back at Kakashi.","branch":null},{"cueId":"original_police_handoff_35","kind":"dialogue","speakerName":"UCHIHA POLICE OFFICER","text":"Report this to whoever sent you.","branch":null},{"cueId":"original_police_handoff_36","kind":"dialogue","speakerName":"KAKASHI","text":"I will.","branch":null},{"cueId":"original_police_handoff_37","kind":"narration","text":"Pakkun gets to his feet.","branch":null},{"cueId":"original_police_handoff_38","kind":"dialogue","speakerName":"PAKKUN","text":"That's probably my part done.","branch":null},{"cueId":"original_police_handoff_39","kind":"dialogue","speakerName":"KAKASHI","text":"Probably?","branch":null},{"cueId":"original_police_handoff_40","kind":"dialogue","speakerName":"PAKKUN","text":"I like options.","branch":null},{"cueId":"original_police_handoff_41","kind":"narration","text":"He turns away.","branch":null}].map(row=>Object.freeze(row)));
const GET_CLOSER_HANDOFF_CUES=Object.freeze([{"cueId":"getcloser_handoff_01","kind":"narration","text":"Kakashi stays where the shadows still cover him.","branch":null},{"cueId":"getcloser_handoff_02","kind":"narration","text":"He has already heard enough to know what the two men expect to happen.","branch":null},{"cueId":"getcloser_handoff_03","kind":"narration","text":"That makes waiting easier to understand.","branch":null},{"cueId":"getcloser_handoff_04","kind":"narration","text":"Not safer.","branch":null},{"cueId":"getcloser_handoff_05","kind":"narration","text":"ANBU Marked Target takes the package from beneath his clothing.","branch":null},{"cueId":"getcloser_handoff_06","kind":"narration","text":"Package Smuggler's hand is still waiting.","branch":null},{"cueId":"getcloser_handoff_07","kind":"narration","text":"The transfer completes.","branch":null},{"cueId":"getcloser_handoff_08","kind":"narration","text":"The instant it does, Kakashi's earlier information becomes fact.","branch":null},{"cueId":"getcloser_handoff_09","kind":"narration","text":"ANBU Marked Target starts to leave.","branch":null},{"cueId":"getcloser_handoff_10","kind":"narration","text":"Package Smuggler turns with the objective.","branch":null},{"cueId":"getcloser_handoff_11","kind":"narration","text":"Then the darkness beside the street moves.","branch":null},{"cueId":"getcloser_handoff_12","kind":"narration","text":"Fast.","branch":null},{"cueId":"getcloser_handoff_13","kind":"narration","text":"A masked figure tears into the exchange line toward Package Smuggler.","branch":null},{"cueId":"getcloser_handoff_14","kind":"narration","text":"Kakashi's eye snaps to her.","branch":null},{"cueId":"getcloser_handoff_15","kind":"narration","text":"He had moved closer to learn more.","branch":null},{"cueId":"getcloser_handoff_16","kind":"narration","text":"Now he has more information—","branch":null},{"cueId":"getcloser_handoff_17","kind":"narration","text":"and one more person.","branch":null}].map(row=>Object.freeze(row)));
const ORIGINAL_ANBU_HANDOFF_CUES=Object.freeze([{"cueId":"original_anbu_handoff_01","kind":"narration","text":"The ANBU operative turns as they arrive.","branch":null},{"cueId":"original_anbu_handoff_02","kind":"narration","text":"His attention settles on the restrained man.","branch":null},{"cueId":"original_anbu_handoff_03","kind":"narration","text":"Then on Pakkun.","branch":null},{"cueId":"original_anbu_handoff_04","kind":"narration","text":"Then back to Kakashi.","branch":null},{"cueId":"original_anbu_handoff_05","kind":"dialogue","speakerName":"ANBU OPERATIVE","text":"You brought the original target back.","branch":null},{"cueId":"original_anbu_handoff_06","kind":"dialogue","speakerName":"KAKASHI","text":"Yes.","branch":null},{"cueId":"original_anbu_handoff_07","kind":"narration","text":"The operative's gaze shifts.","branch":null},{"cueId":"original_anbu_handoff_08","kind":"dialogue","speakerName":"ANBU OPERATIVE","text":"The package?","branch":"recovered"},{"cueId":"original_anbu_handoff_09","kind":"narration","text":"Kakashi produces it.","branch":"recovered"},{"cueId":"original_anbu_handoff_10","kind":"dialogue","speakerName":"KAKASHI","text":"Recovered.","branch":"recovered"},{"cueId":"original_anbu_handoff_11","kind":"narration","text":"The operative accepts it.","branch":"recovered"},{"cueId":"original_anbu_handoff_12","kind":"dialogue","speakerName":"ANBU OPERATIVE","text":"The package?","branch":"missing"},{"cueId":"original_anbu_handoff_13","kind":"dialogue","speakerName":"KAKASHI","text":"Still missing.","branch":"missing"},{"cueId":"original_anbu_handoff_14","kind":"narration","text":"No accusation.","branch":"missing"},{"cueId":"original_anbu_handoff_15","kind":"narration","text":"No reassurance.","branch":"missing"},{"cueId":"original_anbu_handoff_16","kind":"narration","text":"The operative simply absorbs the fact.","branch":"missing"},{"cueId":"original_anbu_handoff_17","kind":"narration","text":"Then his attention moves to Pakkun.","branch":"missing"},{"cueId":"original_anbu_handoff_18","kind":"dialogue","speakerName":"ANBU OPERATIVE","text":"And the ninken?","branch":"missing"},{"cueId":"original_anbu_handoff_19","kind":"narration","text":"Pakkun answers before Kakashi does.","branch":"missing"},{"cueId":"original_anbu_handoff_20","kind":"dialogue","speakerName":"PAKKUN","text":"Temporary.","branch":"missing"},{"cueId":"original_anbu_handoff_21","kind":"narration","text":"ANBU Marked Target looks at him.","branch":"missing"},{"cueId":"original_anbu_handoff_22","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You weren't very temporary during the fight.","branch":"missing"},{"cueId":"original_anbu_handoff_23","kind":"dialogue","speakerName":"PAKKUN","text":"You noticed.","branch":"missing"},{"cueId":"original_anbu_handoff_24","kind":"narration","text":"The operative lets that sit.","branch":"missing"},{"cueId":"original_anbu_handoff_25","kind":"dialogue","speakerName":"ANBU OPERATIVE","text":"Report.","branch":"missing"},{"cueId":"original_anbu_handoff_26","kind":"narration","text":"Kakashi gives him what happened.","branch":"missing"},{"cueId":"original_anbu_handoff_27","kind":"narration","text":"What he saw.","branch":"missing"},{"cueId":"original_anbu_handoff_28","kind":"narration","text":"What he chose.","branch":"missing"},{"cueId":"original_anbu_handoff_29","kind":"narration","text":"Where the package went according to the actual committed state.","branch":"missing"},{"cueId":"original_anbu_handoff_30","kind":"narration","text":"How he reached the target.","branch":"missing"},{"cueId":"original_anbu_handoff_31","kind":"narration","text":"How Pakkun became involved.","branch":"missing"},{"cueId":"original_anbu_handoff_32","kind":"narration","text":"And how the fight ended.","branch":"missing"},{"cueId":"original_anbu_handoff_33","kind":"narration","text":"When the report is finished, ANBU Marked Target looks at Kakashi.","branch":"missing"},{"cueId":"original_anbu_handoff_34","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You still don't know what you stepped into.","branch":"missing"},{"cueId":"original_anbu_handoff_35","kind":"narration","text":"Kakashi meets his eyes.","branch":"missing"},{"cueId":"original_anbu_handoff_36","kind":"dialogue","speakerName":"KAKASHI","text":"Then you can explain it to them.","branch":"missing"},{"cueId":"original_anbu_handoff_37","kind":"narration","text":"For the smallest moment, the operative's attention shifts.","branch":"missing"},{"cueId":"original_anbu_handoff_38","kind":"narration","text":"He says nothing.","branch":"missing"},{"cueId":"original_anbu_handoff_39","kind":"narration","text":"Kakashi notices the movement.","branch":"missing"},{"cueId":"original_anbu_handoff_40","kind":"narration","text":"Not its meaning.","branch":"missing"},{"cueId":"original_anbu_handoff_41","kind":"dialogue","speakerName":"ANBU OPERATIVE","text":"Transfer custody.","branch":"missing"},{"cueId":"original_anbu_handoff_42","kind":"narration","text":"Kakashi hands him the restraint line.","branch":"missing"},{"cueId":"original_anbu_handoff_43","kind":"narration","text":"The operative takes secure control.","branch":"missing"},{"cueId":"original_anbu_handoff_44","kind":"narration","text":"Only then does Kakashi release it.","branch":"missing"},{"cueId":"original_anbu_handoff_45","kind":"narration","text":"ANBU Marked Target moves to his side.","branch":"missing"},{"cueId":"original_anbu_handoff_46","kind":"narration","text":"Pakkun watches the transfer finish.","branch":"missing"},{"cueId":"original_anbu_handoff_47","kind":"narration","text":"Then looks up at Kakashi.","branch":"missing"},{"cueId":"original_anbu_handoff_48","kind":"dialogue","speakerName":"PAKKUN","text":"That's me done.","branch":"missing"},{"cueId":"original_anbu_handoff_49","kind":"narration","text":"Kakashi looks at him.","branch":"missing"},{"cueId":"original_anbu_handoff_50","kind":"dialogue","speakerName":"KAKASHI","text":"You were helpful.","branch":"missing"},{"cueId":"original_anbu_handoff_51","kind":"narration","text":"Pakkun's ears shift.","branch":"missing"},{"cueId":"original_anbu_handoff_52","kind":"dialogue","speakerName":"PAKKUN","text":"Don't sound surprised.","branch":"missing"},{"cueId":"original_anbu_handoff_53","kind":"dialogue","speakerName":"KAKASHI","text":"I wasn't.","branch":"missing"},{"cueId":"original_anbu_handoff_54","kind":"narration","text":"Pakkun studies him for a moment.","branch":"missing"},{"cueId":"original_anbu_handoff_55","kind":"dialogue","speakerName":"PAKKUN","text":"Good answer.","branch":"missing"},{"cueId":"original_anbu_handoff_56","kind":"narration","text":"He turns and leaves across the rooftop.","branch":"missing"},{"cueId":"original_anbu_handoff_57","kind":"narration","text":"Kakashi watches him go.","branch":"missing"},{"cueId":"original_anbu_handoff_58","kind":"narration","text":"Only for a second.","branch":"missing"}].map(row=>Object.freeze(row)));

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE):null;}catch(_e){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_e){}}
function clone(v){return CORE.clone(v);}
function occurrence(id){try{return id?A.findOccurrence(String(id)):null;}catch(_e){return null;}}
function factOf(row){return row&&(row.fact||row.data)||{};}
function stable(prefix,payload){return PROVIDER.stableRef(prefix,payload);}
function normalized(def,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(def,index):def;}
function available(v=true,blocker=null){return()=>({available:v===true,knownBlocker:v===true?null:blocker});}
function latestResult(expectedConfigId=null,expectedBindingRef=null){
 const rt=active(),resume=rt&&rt.battleResume&&typeof rt.battleResume==="object"?rt.battleResume:null,rows=[];
 for(const row of resume?[resume.authored,resume.projected,resume.result,resume.battleResult]:[])if(row&&row.battleConfigId&&row.bindingRef)rows.push(row);
 try{const row=typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult():null;if(row&&row.battleConfigId&&row.bindingRef)rows.push(row);}catch(_e){}
 if(expectedConfigId||expectedBindingRef){
  const exact=rows.find(row=>(!expectedConfigId||String(row.battleConfigId||"")===String(expectedConfigId))&&(!expectedBindingRef||String(row.bindingRef||"")===String(expectedBindingRef)));
  return exact||null;
 }
 return rows[0]||null;
}
function material(pkg,stateRef,anchorRef){
 return CORE.recordMaterialState({storyUnitRef:ORIGIN,materialRef:PACKAGE,resolved:true,stateRef,value:{
  custodyClass:String(pkg.currentHolderClass||pkg.custodyClass||""),custodianRef:pkg.custodianRef||null,locationClass:pkg.locationClass||null,sourceAnchorRef:anchorRef||null
 }});
}
function commitOnce(id,fact,outcome,participants=[],sourceRefs=[]){
 const prior=occurrence(id);if(prior)return{success:true,idempotent:true,occurrenceId:id,record:prior};
 const out=A.commitOccurrence(ORIGIN,id,fact,[],{type:"origin_story_factual_occurrence",outcome,participantRefs:participants,sourceRefs});
 return out&&out.success===true?{success:true,occurrenceId:id,record:out.record}:out||{success:false,reason:"kakashi_konoha_route_occurrence_commit_failed"};
}
function classify(participantRef,stateClass,resultRef){
 return CORE.recordParticipantClassification({storyUnitRef:ORIGIN,participantRef,stateClass,resultRef});
}
function bridge(occurrenceId,result,successorSituationRef=null,stateDeltaRefs=[]){
 return{success:true,resolverResultRef:occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs,knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],successorSituationRef,result:clone(result)};
}
function dispatch(receipt,bindingRef,bridgeResult){
 return CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN,receiptId:receipt.storyDecisionReceiptId,state:{resolverResults:{[bindingRef]:bridgeResult}},context:{sceneRef:SCENE,originId:ORIGIN,storySceneInstanceId:String(active()&&active().instanceId||"")}});
}
function rootContext(rt){return stable("sc34120-kakashi-get-closer-entry",{sceneId:SCENE,storySceneInstanceId:String(rt&&rt.instanceId||""),beatId:ACTION_BEAT});}
function existingReceipt(contextStateRef,choiceId,bindingRef){
 const snap=CORE.getStoryUnitSnapshot(ORIGIN)||{};
 return Object.values(snap.decisionReceipts||{}).find(row=>row&&row.storyDecisionContextId===contextStateRef&&row.selectedChoiceId===choiceId&&row.resolverBindingRef===bindingRef)||null;
}
function ensureDecisionIntent({decisionPointRef,choiceId,bindingRef,contextStateRef,beatRef,choiceSetId=null,sourceOccurrenceRefs=[]}){
 let receipt=existingReceipt(contextStateRef,choiceId,bindingRef);
 if(receipt)return{success:true,idempotent:true,receipt,contextStateRef};
 let setId=String(choiceSetId||"");
 if(!setId){
  const opened=KAK.openDecisionPoint(decisionPointRef,{committedStateRef:contextStateRef,beatRef,sourceOccurrenceRefs});
  if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_konoha_route_choice_set_open_failed"};
  setId=opened.choiceSet.choiceSetId;
 }
 const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN,choiceSetId:setId,choiceId});
 if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_konoha_route_intent_commit_failed"};
 return{success:true,receipt:committed.receipt,contextStateRef,choiceSetId:setId};
}
function observeIntent(choiceId,bindingRef){
 const rt=active();if(!rt||rt.sceneId!==SCENE||rt.beatId!==OBSERVE_BEAT)return{success:false,reason:"kakashi_observe_route_context_required"};
 const stateRef=String(rt.localContext&&rt.localContext.kakashiObserveScene03AOccurrenceId||rt.localContext&&rt.localContext.kakashiGetCloserHandoffOccurrenceId||"");
 const choiceSetId=String(rt.localContext&&rt.localContext.kakashiObserveEscalationChoiceSetId||"");
 if(!stateRef||!choiceSetId)return{success:false,reason:"kakashi_observe_route_semantic_context_missing"};
 return ensureDecisionIntent({decisionPointRef:"OBSERVE_ESCALATION",choiceId,bindingRef,contextStateRef:stateRef,beatRef:OBSERVE_BEAT,choiceSetId,sourceOccurrenceRefs:[stateRef]});
}
function beginSharedObserveBattleChoice35910(choiceId,bindingRef,receiptKey,intentKey,nextBeatId){
 const rt=active(),intent=observeIntent(choiceId,bindingRef);
 if(!intent||intent.success!==true)return intent||{success:false,reason:"kakashi_shared_observe_intent_failed"};
 rt.localContext={...(rt.localContext||{}),[receiptKey]:String(intent.receipt&&intent.receipt.storyDecisionReceiptId||""),[intentKey]:String(intent.receipt&&intent.receipt.intentCommitRef||"")};
 save();
 return{success:true,choiceId,bindingRef,storyDecisionReceiptId:rt.localContext[receiptKey],intentCommitRef:rt.localContext[intentKey],nextBeatId};
}
function launch(config,binding,anchor,storyOccurrenceId,returnBeat,token,ctx={}){
 const rt=active(),cfg=BATTLE.configs&&BATTLE.configs[config]||null;
 const supplied=ctx&&ctx.returnContext&&typeof ctx.returnContext==="object"?ctx.returnContext:null;
 const returnContext={...(supplied||{}),type:"story_scene",sceneId:SCENE,sceneInstanceId:String(rt&&rt.instanceId||""),postBattleBeatId:returnBeat};
 return BATTLE.launchAcademyKakashiOriginPlBattle({
  battleConfigId:config,
  storyOccurrenceId:String(storyOccurrenceId||rt&&rt.instanceId||""),
  sourceAnchorRef:anchor,
  bindingRef:binding,
  returnToken:token,
  returnContext,
  pakkunAuthorized:!!(cfg&&cfg.pakkun===true)
 });
}
function participant(result,ref){return Array.isArray(result&&result.participants)?result.participants.find(row=>row&&row.participantRef===ref)||null:null;}
function defeatedUnresolved(result,refs){
 return refs.every(ref=>{const row=participant(result,ref);return !!row&&row.battleStatus==="defeated"&&row.lifeState==="unresolved"&&row.custodyState==="unresolved";});
}
function setNext(beatId,nextBeatId){const d=scene(),b=d&&d.beatMap instanceof Map?d.beatMap.get(beatId):null;if(b)b.nextBeatId=nextBeatId;return !!b;}
function directChainBinding(rt=active()){return String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeBindingRef||DIRECT_BINDING);}
function directChainAnchor(rt=active()){return String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeAnchorRef||"AK_SA_003");}
function directChainAuthority(rt=active()){return String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeAuthorityCommit||AUTH.directStrike);}
function directChainRoute(rt=active()){return String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeRouteRef||"direct_root");}
function beginReusedDirectStrikePhysical35910({receipt,bindingRef=DIRECT_BINDING,parentOccurrenceId="",routeRef="direct_root",anchorRef="AK_SA_003",authorityCommit=AUTH.directStrike,knowledgeStateRef=null}={}){
 const rt=active();if(!rt||rt.sceneId!==SCENE)return{success:false,reason:"direct_strike_reuse_story_context_required"};
 if(!receipt||!receipt.storyDecisionReceiptId)return{success:false,reason:"direct_strike_reuse_decision_receipt_required"};
 const binding=String(bindingRef||DIRECT_BINDING),anchor=String(anchorRef||"AK_SA_003"),authority=String(authorityCommit||AUTH.directStrike);
 const id=stable("occ_origin_kakashi_direct_strike_entry",{instance:String(rt.instanceId||""),receipt:String(receipt.storyDecisionReceiptId),binding,routeRef:String(routeRef||"")});
 const fact={factClass:"academy_kakashi_direct_strike_entry",anchorRef:anchor,authorityCommit:authority,storySceneInstanceId:String(rt.instanceId||""),storyDecisionReceiptId:String(receipt.storyDecisionReceiptId),parentOccurrenceRef:String(parentOccurrenceId||"")||null,routeRef:String(routeRef||"direct_root"),knowledgeStateRef:knowledgeStateRef?String(knowledgeStateRef):null,
  packageState:{objectRef:PACKAGE,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_PERSON",handoffCompleted:false},
  participantStateByRef:{[AMT]:{presenceState:"PRESENT"},[PS]:{presenceState:"PRESENT"},[MI]:{presenceState:"UNSEEN"},[PAKKUN]:{presenceState:"NOT_PRESENT"}},
  worldFacts:{handoffInterrupted:true,maskedInterceptorVisible:false,pakkunPresent:false,battleRequired:true,battleConfigId:DIRECT_2V1,retainsGetCloserKnowledge:!!knowledgeStateRef}};
 const committed=commitOnce(id,fact,"DIRECT_STRIKE_ENTRY",[ORIGIN,AMT,PS],[{type:"story_decision_receipt",id:String(receipt.storyDecisionReceiptId)},{type:"world_object",id:PACKAGE},{type:"writing_authority",id:authority}].concat(parentOccurrenceId?[{type:"origin_occurrence",id:String(parentOccurrenceId),role:"route_parent"}]:[]));if(!committed.success)return committed;
 const mat=material(fact.packageState,id,anchor);if(!mat||mat.success!==true)return mat;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaDirectStrikeOccurrenceId:id,kakashiKonohaDirectStrikeReceiptId:String(receipt.storyDecisionReceiptId),kakashiKonohaDirectStrikeBindingRef:binding,kakashiKonohaDirectStrikeAnchorRef:anchor,kakashiKonohaDirectStrikeAuthorityCommit:authority,kakashiKonohaDirectStrikeRouteRef:String(routeRef||"direct_root"),kakashiKonohaDirectStrikeKnowledgeStateRef:knowledgeStateRef?String(knowledgeStateRef):null,kakashiKonohaPackageOccurrenceId:id};save();
 return{success:true,occurrenceId:id,nextBeatId:D.directIntro,bindingRef:binding,anchorRef:anchor,routeRef:String(routeRef||"direct_root")};
}

// ---------------------------------------------------------------------------
// DIRECT STRIKE BEFORE THE HANDOFF
// ---------------------------------------------------------------------------
function resolveDirectStrikeEntry(choice){
 const rt=active();if(!rt||rt.sceneId!==SCENE||rt.beatId!==ACTION_BEAT)return{success:false,reason:"direct_strike_context_required"};
 const contextStateRef=rootContext(rt);
 const intent=ensureDecisionIntent({decisionPointRef:"AK_SA_001",choiceId:"attack",bindingRef:DIRECT_BINDING,contextStateRef,beatRef:ACTION_BEAT});
 if(!intent||intent.success!==true)return intent;
 const begun=beginReusedDirectStrikePhysical35910({receipt:intent.receipt,bindingRef:DIRECT_BINDING,parentOccurrenceId:"",routeRef:"direct_root",anchorRef:"AK_SA_003",authorityCommit:AUTH.directStrike});
 if(!begun||begun.success!==true)return begun||{success:false,reason:"direct_strike_physical_chain_begin_failed"};
 choice.nextBeatId=D.directIntro;return begun;
}
function launchDirect2v1(ctx={}){
 const rt=active(),source=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeOccurrenceId||"");
 if(!source)return{success:false,reason:"direct_strike_entry_occurrence_missing"};
 return launch(DIRECT_2V1,directChainBinding(rt),directChainAnchor(rt),source,D.directReturn,"direct_strike_2v1",ctx);
}
function consumeDirect2v1(){
 const rt=active(),r=latestResult();if(!rt||rt.beatId!==D.directReturn)return{success:false,reason:"direct_strike_return_context_required"};
 const binding=directChainBinding(rt),anchor=directChainAnchor(rt),authority=directChainAuthority(rt),routeRef=directChainRoute(rt);
 if(!r||String(r.battleConfigId||"")!==DIRECT_2V1||String(r.bindingRef||"")!==binding)return{success:false,reason:"direct_strike_battle_receipt_mismatch"};
 const receiptId=String(rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeReceiptId||"");const snap=CORE.getStoryUnitSnapshot(ORIGIN)||{},receipt=snap.decisionReceipts&&snap.decisionReceipts[receiptId];if(!receipt)return{success:false,reason:"direct_strike_story_receipt_missing"};
 const win=String(r.resultState||"")==="player_side_victory";
 const id=stable("occ_origin_kakashi_direct_strike_2v1_return",{instance:String(rt.instanceId||""),battle:String(r.battleOccurrenceId||""),win});
 let fact;
 if(win){
  if(!defeatedUnresolved(r,[AMT,PS]))return{success:false,reason:"direct_strike_2v1_victory_participant_state_invalid"};
  fact={factClass:"academy_kakashi_direct_strike_2v1_victory",anchorRef:anchor,authorityCommit:authority,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),
   packageState:{objectRef:PACKAGE,previousHolderClass:"ANBU_MARKED_TARGET",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",handoffCompleted:false},
   participantStateByRef:{[AMT]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[PS]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[MI]:{presenceState:"UNSEEN"}},
   worldFacts:{handoffInterrupted:true,packageRecovered:true,maskedInterceptorVisible:false,pakkunPresent:false,participantDeathCommitted:false,participantCustodyCommitted:false}};
 }else{
  fact={factClass:"academy_kakashi_direct_strike_2v1_defeat",anchorRef:anchor,authorityCommit:authority,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),
   packageState:{objectRef:PACKAGE,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_ESCAPED_WITH_PACKAGE",handoffCompleted:false},
   participantStateByRef:{[AMT]:{presenceState:"ESCAPED",controlState:"FREE"},[PS]:{presenceState:"ESCAPED",controlState:"FREE"},[MI]:{presenceState:"UNSEEN"}},
   worldFacts:{handoffInterrupted:true,amtEscaped:true,packageSmugglerEscaped:true,maskedInterceptorVisible:false,pakkunPresent:false,participantDeathCommitted:false,participantCustodyCommitted:false}};
 }
 const committed=commitOnce(id,fact,win?"DIRECT_STRIKE_2V1_VICTORY":"DIRECT_STRIKE_2V1_DEFEAT",[ORIGIN,AMT,PS],[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"writing_authority",id:authority}]);if(!committed.success)return committed;
 const mat=material(fact.packageState,id,anchor);if(!mat||mat.success!==true)return mat;
 if(win){for(const ref of [AMT,PS]){const cl=classify(ref,"BATTLE_DEFEATED_UNRESOLVED",stable("sc35910-direct-defeated",{id,ref}));if(!cl.success)return cl;}}
 else{for(const ref of [AMT,PS]){const cl=classify(ref,"ESCAPED",stable("sc35910-direct-escaped",{id,ref}));if(!cl.success)return cl;}}
 const dispatched=dispatch(receipt,binding,bridge(id,{outcomeClass:win?"DIRECT_STRIKE_2V1_VICTORY_PACKAGE_SECURED":"DIRECT_STRIKE_2V1_DEFEAT_AMT_PS_ESCAPE",packageState:fact.packageState,battleResultState:r.resultState,routeRef},win?"academy_kakashi.direct_strike.mi_arrival":"academy_kakashi.debrief"));
 if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"direct_strike_semantic_dispatch_failed"};
 rt.localContext={...(rt.localContext||{}),kakashiKonohaDirectStrike2v1OccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};setNext(D.directReturn,win?D.directMiArrival:TERMINAL);save();
 return{success:true,victory:win,occurrenceId:id,nextBeatId:win?D.directMiArrival:TERMINAL};
}
function launchDirectMi(ctx={}){
 const rt=active(),source=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrike2v1OccurrenceId||"");if(!source)return{success:false,reason:"direct_strike_mi_parent_missing"};
 return launch(DIRECT_MI,"academy_kakashi.battle.direct_strike_mi",directChainAnchor(rt),source,D.directMiReturn,"direct_strike_mi_1v1",ctx);
}
function consumeDirectMi(){
 const rt=active(),expectedBinding="academy_kakashi.battle.direct_strike_mi",r=latestResult(DIRECT_MI,expectedBinding);if(!rt||rt.beatId!==D.directMiReturn)return{success:false,reason:"direct_strike_mi_return_context_required"};
 if(!r)return{success:false,reason:"direct_strike_mi_receipt_mismatch",expectedBattleConfigId:DIRECT_MI,expectedBindingRef:expectedBinding};
 const win=String(r.resultState||"")==="player_side_victory",anchor=directChainAnchor(rt),authority=directChainAuthority(rt),routeRef=directChainRoute(rt);
 const id=stable("occ_origin_kakashi_direct_strike_mi_return",{instance:String(rt.instanceId||""),battle:String(r.battleOccurrenceId||""),win,routeRef});
 const pkg=win
  ?{objectRef:PACKAGE,currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON"}
  :{objectRef:PACKAGE,previousHolderClass:"KAKASHI",currentHolderClass:"MASKED_INTERCEPTOR",custodyClass:"MASKED_INTERCEPTOR",locationClass:"MI_ESCAPED_WITH_PACKAGE"};
 const fact={factClass:win?"academy_kakashi_direct_strike_mi_victory":"academy_kakashi_direct_strike_mi_defeat",anchorRef:anchor,authorityCommit:authority,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),packageState:pkg,
  participantStateByRef:{[AMT]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[PS]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[MI]:win?{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}:{presenceState:"ESCAPED",controlState:"FREE"}},
  worldFacts:{packageCustody:pkg.currentHolderClass,maskedInterceptorEscaped:!win,pakkunPresent:false,participantDeathCommitted:false,participantCustodyCommitted:false}};
 const committed=commitOnce(id,fact,win?"DIRECT_STRIKE_MI_VICTORY":"DIRECT_STRIKE_MI_DEFEAT",[ORIGIN,AMT,PS,MI],[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"writing_authority",id:authority}]);if(!committed.success)return committed;
 const mat=material(pkg,id,anchor);if(!mat||mat.success!==true)return mat;
 const cl=classify(MI,win?"BATTLE_DEFEATED_UNRESOLVED":"ESCAPED",stable("sc35910-direct-mi",{id,win}));if(!cl.success)return cl;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaDirectStrikeMiOccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};setNext(D.directMiReturn,win?D.directGroup:TERMINAL);save();
 return{success:true,victory:win,occurrenceId:id,nextBeatId:win?D.directGroup:TERMINAL};
}
function commitDirectGroupDisposition(kind){
 const rt=active(),parent=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeMiOccurrenceId||"");
 const expected={POLICE:D.directPoliceHandoff,ANBU:D.directAnbuHandoff,KILL:D.directKill,RELEASE:D.directRelease}[kind];
 if(!rt||rt.beatId!==expected||!parent)return{success:false,reason:"direct_strike_group_context_required"};
 const authority=directChainAuthority(rt),anchor=directChainAnchor(rt);
 const stateByKind={POLICE:"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY",ANBU:"ANBU_INSTITUTIONAL_CUSTODY",KILL:"DEAD",RELEASE:"DELIBERATELY_RELEASED"};
 const stateClass=stateByKind[kind];if(!stateClass)return{success:false,reason:"direct_strike_group_disposition_unknown"};
 const id=stable("occ_origin_kakashi_direct_strike_group_disposition",{instance:String(rt.instanceId||""),parent,kind});
 const participantStateByRef={};const participantStateDeltaRefs=[];
 for(const ref of [AMT,PS,MI])participantStateByRef[ref]={stateClass,lifeState:kind==="KILL"?"DEAD":"ALIVE",custodyDestination:kind==="POLICE"?"UCHIHA_POLICE":kind==="ANBU"?"ANBU":null};
 const pkg=kind==="ANBU"?{objectRef:PACKAGE,previousHolderClass:"KAKASHI",currentHolderClass:"ANBU",custodyClass:"ANBU",locationClass:"ANBU_ROOFTOP"}:{objectRef:PACKAGE,currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON"};
 const fact={factClass:"academy_kakashi_direct_strike_group_disposition",authorityCommit:authority,anchorRef:anchor,storySceneInstanceId:String(rt.instanceId||""),parentOccurrenceRef:parent,routeRef:directChainRoute(rt),selectedDisposition:kind,packageState:pkg,participantStateByRef,
  worldFacts:{deterministicPostBattleKills:kind==="KILL"?3:0,groupReleased:kind==="RELEASE",groupInstitutionalTransfer:kind==="POLICE"||kind==="ANBU",pakkunPresent:false}};
 const committed=commitOnce(id,fact,"DIRECT_STRIKE_GROUP_"+kind,[ORIGIN,AMT,PS,MI],[{type:"origin_occurrence",id:parent},{type:"writing_authority",id:authority}]);if(!committed.success)return committed;
 if(kind==="POLICE"||kind==="ANBU"){
  const transfer=globalThis.commitAcademyKakashiSingleTransfer35920;if(typeof transfer!=="function")return{success:false,reason:"field_secured_35920_transfer_owner_missing"};
  const dest=kind==="ANBU"?"ANBU":"UCHIHA_POLICE";
  for(const ref of [AMT,PS,MI]){const tr=transfer(ref,dest,{sourceOccurrenceId:id});if(!tr||tr.success!==true)return tr||{success:false,reason:"direct_group_transfer_failed"};participantStateDeltaRefs.push(String(tr.occurrenceId||""));}
 }else{
  for(const ref of [AMT,PS,MI]){const resultRef=stable("sc35910-direct-group-state",{id,ref,stateClass});const cl=classify(ref,stateClass,resultRef);if(!cl.success)return cl;participantStateDeltaRefs.push(resultRef);}
 }
 const mat=material(pkg,id,anchor);if(!mat||mat.success!==true)return mat;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaDirectStrikeDispositionOccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};save();
 return{success:true,occurrenceId:id,nextBeatId:TERMINAL,participantStateDeltaRefs};
}

// ---------------------------------------------------------------------------
// SECURE THE PACKAGE BEFORE THE ASSASSIN
// ---------------------------------------------------------------------------
function commitSecureBefore({receipt,request,result}){
 const rt=active();if(!rt||rt.sceneId!==SCENE)return{success:false,reason:"secure_before_story_context_missing"};
 const selected=String(receipt&&receipt.selectedOutcomeRef||"");const success=selected==="SECURE_BEFORE_SUCCESS_CLEAN_EXTRACTION",failure=selected==="SECURE_BEFORE_FAILURE_COLLAPSE_TO_2V1";if(!success&&!failure)return{success:false,reason:"secure_before_outcome_unknown"};
 const id=String(request&&request.committedAtOccurrenceRef||stable("occ_origin_kakashi_secure_before",{instance:String(rt.instanceId||""),receipt:String(receipt&&receipt.storyDecisionReceiptId||""),selected}));
 const pkg=success?{objectRef:PACKAGE,previousHolderClass:"PACKAGE_SMUGGLER",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",handoffCompleted:true}:{objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PS_PERSON",handoffCompleted:true};
 const fact={factClass:"academy_kakashi_secure_package_before_assassin_factual_state",anchorRef:"AK_SA_020",authorityCommit:AUTH.secureBefore,storySceneInstanceId:String(rt.instanceId||""),storyDecisionReceiptId:String(receipt&&receipt.storyDecisionReceiptId||""),storyFactualResolverReceiptId:String(receipt&&receipt.storyFactualResolverReceiptId||""),selectedOutcomeRef:selected,packageState:pkg,
  participantStateByRef:{[AMT]:{presenceState:"ESCAPED"},[PS]:{presenceState:"PRESENT"},[MI]:{presenceState:"PRESENT"},[PAKKUN]:{presenceState:"NOT_PRESENT"}},
  knowledgeStateByObserver:{[KAKASHI]:{laterPsMiOutcomeKnown:false}},worldFacts:{cleanExtractionSucceeded:success,battleRequired:failure,pakkunPresent:false,participantCustodyCommitted:false,participantDeathCommitted:false}};
 const committed=commitOnce(id,fact,selected,[ORIGIN,AMT,PS,MI],[{type:"story_decision_receipt",id:String(receipt&&receipt.storyDecisionReceiptId||"")},{type:"writing_authority",id:AUTH.secureBefore},{type:"world_object",id:PACKAGE}]);if(!committed.success)return committed;
 const mat=material(pkg,id,"AK_SA_020");if(!mat||mat.success!==true)return mat;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaSecureBeforeOccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};save();
 return{success:true,occurrenceId:id,consequenceRefs:[id],stateDeltaRefs:[id],objectCustodyDeltaRefs:success?[id]:[],participantStateDeltaRefs:[],successorSituationRef:success?"academy_kakashi.debrief":"battle_transition"};
}
const secureBeforeRegistration=PROVIDER.registerStoryFactualResolverBinding(SECURE_BEFORE_BINDING,{ownerRef:"academy_kakashi.konoha_route_closure.secure_before",authorityVersionRefs:[AUTH.secureBefore,AUTH.writing100,AUTH.factualProvider],outcomes:[
 {outcomeRef:"SECURE_BEFORE_SUCCESS_CLEAN_EXTRACTION",authoredOrder:0,resultPayloadTemplate:{outcomeClass:"SECURE_BEFORE_SUCCESS_CLEAN_EXTRACTION",cleanExtractionSucceeded:true,battleRequired:false}},
 {outcomeRef:"SECURE_BEFORE_FAILURE_COLLAPSE_TO_2V1",authoredOrder:1,resultPayloadTemplate:{outcomeClass:"SECURE_BEFORE_FAILURE_COLLAPSE_TO_2V1",cleanExtractionSucceeded:false,battleRequired:true,battleConfigId:SECURE_2V1}}
],commitResult:commitSecureBefore,metadata:{storyUnitRef:ORIGIN,anchorRef:"AK_SA_020",failureReconvergesToSharedBattle:true}});
if(!secureBeforeRegistration.success)throw new Error("secure_before_binding_registration_failed");

function resolveSecureBeforeChoice(choice){
 const rt=active(),intent=observeIntent("secure_package_before_assassin",SECURE_BEFORE_BINDING);if(!intent||intent.success!==true)return intent;
 const occurrenceId=stable("occ_origin_kakashi_secure_before",{instance:String(rt.instanceId||""),receipt:intent.receipt.storyDecisionReceiptId});
 const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef:SECURE_BEFORE_BINDING,actorRef:KAKASHI,intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:stable("sc35910-secure-before",{instance:String(rt.instanceId||""),receipt:intent.receipt.storyDecisionReceiptId}),authorityVersionRefs:[AUTH.secureBefore,AUTH.writing100],inputStateRefs:[intent.contextStateRef],continuityLineageRef:String(rt.instanceId||""),committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:String(rt.instanceId||""),sceneId:SCENE,beatId:rt.beatId}});
 if(!factual||factual.success!==true)return factual||{success:false,reason:"secure_before_factual_resolution_failed"};
 const dispatched=dispatch(intent.receipt,SECURE_BEFORE_BINDING,{success:true,resolverResultRef:factual.receipt.storyFactualResolverReceiptId,consequenceRefs:factual.receipt.consequenceRefs||[],stateDeltaRefs:factual.receipt.stateDeltaRefs||[],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],successorSituationRef:factual.receipt.successorSituationRef,result:clone(factual.result)});if(!dispatched.success)return dispatched;
 const success=String(factual.receipt.selectedOutcomeRef||"")==="SECURE_BEFORE_SUCCESS_CLEAN_EXTRACTION";
 choice.nextBeatId=success?TERMINAL:D.secureBeforeIntro;save();
 return{success:true,selectedOutcomeRef:factual.receipt.selectedOutcomeRef,nextBeatId:choice.nextBeatId};
}
function ensureSecureBeforeSharedBattleIntent35910(){
 const rt=active(),stateRef=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaSecureBeforeOccurrenceId||"");
 if(!rt||!stateRef)return{success:false,reason:"secure_before_shared_battle_parent_missing"};
 const existingId=String(rt.localContext&&rt.localContext.kakashiObserveSecurePackageStoryDecisionReceiptId||"");
 if(existingId){const snap=CORE.getStoryUnitSnapshot(ORIGIN)||{},row=snap.decisionReceipts&&snap.decisionReceipts[existingId];if(row&&row.resolverBindingRef==="academy_kakashi.battle.secure_package")return{success:true,idempotent:true,receipt:row};}
 const opened=CORE.openSemanticChoiceSet({storyUnitRef:ORIGIN,storyUnitType:"origin",decisionPointRef:"AK_SA_020_FAILURE_RECONVERGENCE",contextStateRef:stateRef,sceneRef:SCENE,beatRef:D.secureBeforeBattle,sourceOccurrenceRefs:[stateRef],choices:[{choiceId:"secure_package",intentType:"secure_package",intentPayload:{reconvergedFrom:"secure_package_before_assassin_failure"},eligibilityBasisRefs:[stateRef],resolverBindingRef:"academy_kakashi.battle.secure_package",presentationLabel:"SECURE THE PACKAGE"}]});
 if(!opened||opened.success!==true)return opened||{success:false,reason:"secure_before_shared_battle_choice_set_failed"};
 const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN,choiceSetId:opened.choiceSet.choiceSetId,choiceId:"secure_package"});
 if(!committed||committed.success!==true)return committed||{success:false,reason:"secure_before_shared_battle_intent_failed"};
 rt.localContext={...(rt.localContext||{}),kakashiGetCloserHandoffOccurrenceId:stateRef,kakashiObserveSecurePackageStoryDecisionReceiptId:committed.receipt.storyDecisionReceiptId,kakashiObserveSecurePackageIntentCommitRef:committed.receipt.intentCommitRef,kakashiObserveSecurePackageReconvergedFromSecureBefore:true};save();
 return{success:true,receipt:committed.receipt};
}
function launchSecureBeforeBattle(ctx={}){
 const rt=active(),source=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaSecureBeforeOccurrenceId||"");if(!source)return{success:false,reason:"secure_before_resolver_occurrence_missing"};
 const intent=ensureSecureBeforeSharedBattleIntent35910();if(!intent||intent.success!==true)return intent;
 return launch(SECURE_2V1,"academy_kakashi.battle.secure_package","AK_SA_014",source,"kak_observe_secure_package_return","secure_before_shared_2v1",ctx);
}
function consumeSecureBeforeBattle(){
 const rt=active(),r=latestResult();if(!rt||rt.beatId!==D.secureBeforeReturn)return{success:false,reason:"secure_before_return_context_required"};
 if(!r||String(r.battleConfigId||"")!==SECURE_2V1||String(r.bindingRef||"")!==SECURE_BEFORE_BINDING)return{success:false,reason:"secure_before_battle_receipt_mismatch"};
 const win=String(r.resultState||"")==="player_side_victory";const id=stable("occ_origin_kakashi_secure_before_battle_return",{instance:String(rt.instanceId||""),battle:String(r.battleOccurrenceId||""),win});
 const pkg=win?{objectRef:PACKAGE,previousHolderClass:"PACKAGE_SMUGGLER",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",handoffCompleted:true}:{objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PS_ESCAPED_WITH_PACKAGE",handoffCompleted:true};
 const fact={factClass:win?"academy_kakashi_secure_before_shared_2v1_victory":"academy_kakashi_secure_before_shared_2v1_defeat",anchorRef:"AK_SA_025",authorityCommit:AUTH.secureBefore,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),packageState:pkg,
  participantStateByRef:win?{[PS]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[MI]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[AMT]:{presenceState:"ESCAPED"}}:{[PS]:{presenceState:"ESCAPED"},[MI]:{presenceState:"LEFT_IN_APPARENT_PURSUIT"},[AMT]:{presenceState:"ESCAPED"}},
  knowledgeStateByObserver:{[KAKASHI]:{laterPsMiOutcomeKnown:false}},worldFacts:{packageCustody:pkg.currentHolderClass,pakkunPresent:false,participantDeathCommitted:false,participantCustodyCommitted:false}};
 const committed=commitOnce(id,fact,win?"SECURE_BEFORE_2V1_VICTORY":"SECURE_BEFORE_2V1_DEFEAT",[ORIGIN,AMT,PS,MI],[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"writing_authority",id:AUTH.secureBefore}]);if(!committed.success)return committed;
 const mat=material(pkg,id,"AK_SA_025");if(!mat||mat.success!==true)return mat;
 if(win){
  for(const ref of [PS,MI]){const cl=classify(ref,"BATTLE_DEFEATED_UNRESOLVED",stable("sc35910-secure-before-defeated",{id,ref}));if(!cl.success)return cl;}
  rt.localContext={...(rt.localContext||{}),kakashiObserveSecurePackagePostBattleOutcome:"player_side_victory",kakashiObserveSecurePackagePostResolutionCommitted:true,kakashiObserveSecurePackageOccurrenceId:id,kakashiObserveSecurePackageContinuationStateRef:id,kakashiObserveSecurePackageContinuationReady:true,kakashiObserveSecurePackageDueAutonomyClear:true,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};
  setNext(D.secureBeforeReturn,"kak_observe_secure_package_return");
 }else{
  classify(PS,"ESCAPED",stable("sc35910-secure-before-ps-escaped",{id}));classify(MI,"LEFT_KAKASHI_SIGHT",stable("sc35910-secure-before-mi-left",{id}));classify(AMT,"ESCAPED",stable("sc35910-secure-before-amt-escaped",{id}));
  rt.localContext={...(rt.localContext||{}),kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};setNext(D.secureBeforeReturn,TERMINAL);
 }
 save();return{success:true,victory:win,occurrenceId:id,nextBeatId:win?"kak_observe_secure_package_return":TERMINAL};
}

// ---------------------------------------------------------------------------
// GO AFTER THE ORIGINAL TARGET
// ---------------------------------------------------------------------------
function commitOriginalTarget({receipt,request,result}){
 const rt=active();if(!rt||rt.sceneId!==SCENE)return{success:false,reason:"original_target_story_context_missing"};
 const selected=String(receipt&&receipt.selectedOutcomeRef||"");const reached=selected==="ORIGINAL_TARGET_PURSUIT_SUCCESS_REACHED",escaped=selected==="ORIGINAL_TARGET_PURSUIT_FAILURE_ESCAPED";if(!reached&&!escaped)return{success:false,reason:"original_target_outcome_unknown"};
 const id=String(request&&request.committedAtOccurrenceRef||stable("occ_origin_kakashi_original_target",{instance:String(rt.instanceId||""),receipt:String(receipt&&receipt.storyDecisionReceiptId||""),selected}));
 const pkg={objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PS_ESCAPED_WITH_PACKAGE",handoffCompleted:true};
 const fact={factClass:"academy_kakashi_original_target_pursuit_factual_state",anchorRef:"AK_SA_021",authorityCommit:AUTH.originalTarget,storySceneInstanceId:String(rt.instanceId||""),storyDecisionReceiptId:String(receipt&&receipt.storyDecisionReceiptId||""),storyFactualResolverReceiptId:String(receipt&&receipt.storyFactualResolverReceiptId||""),selectedOutcomeRef:selected,packageState:pkg,
  participantStateByRef:{[AMT]:{reachState:reached?"REACHED":"ESCAPED"},[PS]:{presenceState:"ESCAPED_WITH_PACKAGE"},[MI]:{laterState:"UNKNOWN_TO_KAKASHI"},[PAKKUN]:{presenceState:reached?"PRESENT":"NOT_PRESENT"}},
  knowledgeStateByObserver:{[KAKASHI]:{packageHolderKnown:"PACKAGE_SMUGGLER",laterPsMiOutcomeKnown:false}},worldFacts:{packageSmugglerPursuitClosed:true,amtReached:reached,amtEscaped:escaped,pakkunPresent:reached,packageCustody:"PACKAGE_SMUGGLER"}};
 const committed=commitOnce(id,fact,selected,[ORIGIN,AMT,PS].concat(reached?[PAKKUN]:[]),[{type:"story_decision_receipt",id:String(receipt&&receipt.storyDecisionReceiptId||"")},{type:"writing_authority",id:AUTH.originalTarget},{type:"world_object",id:PACKAGE}]);if(!committed.success)return committed;
 const mat=material(pkg,id,"AK_SA_021");if(!mat||mat.success!==true)return mat;
 const psClass=classify(PS,"ESCAPED",stable("sc35910-original-ps-escaped",{id}));if(!psClass||psClass.success!==true)return psClass;
 const participantStateDeltaRefs=[String(psClass.resultRef||"")];
 if(escaped){const amtClass=classify(AMT,"ESCAPED",stable("sc35910-original-amt-escaped",{id}));if(!amtClass||amtClass.success!==true)return amtClass;participantStateDeltaRefs.push(String(amtClass.resultRef||""));}
 rt.localContext={...(rt.localContext||{}),kakashiKonohaOriginalTargetOccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id,kakashiKonohaPakkunPresent:reached,kakashiPostMiPakkunPresent:reached};save();
 return{success:true,occurrenceId:id,consequenceRefs:[id],stateDeltaRefs:[id],participantStateDeltaRefs,objectCustodyDeltaRefs:[],successorSituationRef:reached?"academy_kakashi.pakkun_intercept":"academy_kakashi.debrief"};
}
const originalRegistration=PROVIDER.registerStoryFactualResolverBinding(ORIGINAL_TARGET_BINDING,{ownerRef:"academy_kakashi.konoha_route_closure.original_target",authorityVersionRefs:[AUTH.originalTarget,AUTH.writing100,AUTH.factualProvider],outcomes:[
 {outcomeRef:"ORIGINAL_TARGET_PURSUIT_SUCCESS_REACHED",authoredOrder:0,resultPayloadTemplate:{outcomeClass:"ORIGINAL_TARGET_PURSUIT_SUCCESS_REACHED",amtReached:true,pakkunPresent:true,packageCustody:"PACKAGE_SMUGGLER"}},
 {outcomeRef:"ORIGINAL_TARGET_PURSUIT_FAILURE_ESCAPED",authoredOrder:1,resultPayloadTemplate:{outcomeClass:"ORIGINAL_TARGET_PURSUIT_FAILURE_ESCAPED",amtReached:false,pakkunPresent:false,packageCustody:"PACKAGE_SMUGGLER"}}
],commitResult:commitOriginalTarget,metadata:{storyUnitRef:ORIGIN,anchorRef:"AK_SA_021",packagePursuitClosedOnCommit:true}});
if(!originalRegistration.success)throw new Error("original_target_binding_registration_failed");

function resolveOriginalTargetChoice(choice){
 const rt=active(),intent=observeIntent("go_after_original_target",ORIGINAL_TARGET_BINDING);if(!intent||intent.success!==true)return intent;
 const occurrenceId=stable("occ_origin_kakashi_original_target",{instance:String(rt.instanceId||""),receipt:intent.receipt.storyDecisionReceiptId});
 const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef:ORIGINAL_TARGET_BINDING,actorRef:KAKASHI,intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:stable("sc35910-original-target",{instance:String(rt.instanceId||""),receipt:intent.receipt.storyDecisionReceiptId}),authorityVersionRefs:[AUTH.originalTarget,AUTH.writing100],inputStateRefs:[intent.contextStateRef],continuityLineageRef:String(rt.instanceId||""),committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:String(rt.instanceId||""),sceneId:SCENE,beatId:rt.beatId}});
 if(!factual||factual.success!==true)return factual||{success:false,reason:"original_target_factual_resolution_failed"};
 const dispatched=dispatch(intent.receipt,ORIGINAL_TARGET_BINDING,{success:true,resolverResultRef:factual.receipt.storyFactualResolverReceiptId,consequenceRefs:factual.receipt.consequenceRefs||[],stateDeltaRefs:factual.receipt.stateDeltaRefs||[],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],successorSituationRef:factual.receipt.successorSituationRef,result:clone(factual.result)});if(!dispatched.success)return dispatched;
 const reached=String(factual.receipt.selectedOutcomeRef||"")==="ORIGINAL_TARGET_PURSUIT_SUCCESS_REACHED";choice.nextBeatId=reached?D.originalIntro:D.originalFailure;save();
 return{success:true,selectedOutcomeRef:factual.receipt.selectedOutcomeRef,nextBeatId:choice.nextBeatId};
}
function launchOriginalAmt(ctx={}){
 const rt=active(),source=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaOriginalTargetOccurrenceId||"");if(!source)return{success:false,reason:"original_target_pursuit_occurrence_missing"};
 return launch(AMT_PAKKUN,"academy_kakashi.battle.original_target_amt","AK_SA_021",source,D.originalReturn,"original_target_amt_pakkun",ctx);
}
function consumeOriginalAmt(){
 const rt=active(),r=latestResult();if(!rt||rt.beatId!==D.originalReturn)return{success:false,reason:"original_target_amt_return_context_required"};
 if(!r||String(r.battleConfigId||"")!==AMT_PAKKUN||String(r.bindingRef||"")!=="academy_kakashi.battle.original_target_amt")return{success:false,reason:"original_target_amt_battle_receipt_mismatch"};
 const win=String(r.resultState||"")==="player_side_victory";
 if(!win){
  const resolved=CLOSURE.resolveAmtDefeatFacts({battleResult:r,packageOccurrenceId:String(rt.localContext&&rt.localContext.kakashiKonohaPackageOccurrenceId||""),parentRef:String(rt.localContext&&rt.localContext.kakashiKonohaOriginalTargetOccurrenceId||""),routeRef:"observe_original_target",returnBeatId:D.originalReturn,successorSituationRef:TERMINAL});
  if(!resolved||resolved.success!==true)return resolved||{success:false,reason:"original_target_ce256_resolution_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiKonohaOriginalTargetAmtDefeatOccurrenceId:resolved.occurrenceId};setNext(D.originalReturn,TERMINAL);save();return{success:true,victory:false,occurrenceId:resolved.occurrenceId,nextBeatId:TERMINAL};
 }
 if(!defeatedUnresolved(r,[AMT]))return{success:false,reason:"original_target_amt_victory_participant_state_invalid"};
 const id=stable("occ_origin_kakashi_original_target_amt_victory",{instance:String(rt.instanceId||""),battle:String(r.battleOccurrenceId||"")});
 const parentPkg=factOf(occurrence(rt.localContext&&rt.localContext.kakashiKonohaPackageOccurrenceId)).packageState||{objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER"};
 const fact={factClass:"academy_kakashi_original_target_amt_battle_victory",anchorRef:"AK_SA_021",authorityCommit:AUTH.originalTarget,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),packageState:clone(parentPkg),
  participantStateByRef:{[AMT]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[PAKKUN]:{presenceState:"PRESENT",temporaryParticipationOnly:true,ownershipGranted:false}},
  worldFacts:{packageStillMissing:true,pakkunPresent:true,participantDeathCommitted:false,participantCustodyCommitted:false}};
 const committed=commitOnce(id,fact,"ORIGINAL_TARGET_AMT_BATTLE_VICTORY",[ORIGIN,AMT,PAKKUN],[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"writing_authority",id:AUTH.originalTarget}]);if(!committed.success)return committed;
 const cl=classify(AMT,"BATTLE_DEFEATED_UNRESOLVED",stable("sc35910-original-amt-defeated",{id}));if(!cl.success)return cl;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaOriginalTargetAmtVictoryOccurrenceId:id,kakashiKonohaPakkunPresent:true,kakashiPostMiPakkunPresent:true};setNext(D.originalReturn,D.originalDisposition);save();
 return{success:true,victory:true,occurrenceId:id,nextBeatId:D.originalDisposition};
}
function commitOriginalPakkunDeparture35910(parentId,routeRef){
 const rt=active(),id=stable("occ_origin_kakashi_original_target_pakkun_departure",{instance:String(rt&&rt.instanceId||""),parentId:String(parentId||""),routeRef:String(routeRef||"")});
 const fact={factClass:"academy_kakashi_pakkun_explicit_departure",authorityCommit:AUTH.originalTarget,storySceneInstanceId:String(rt&&rt.instanceId||""),participantRef:PAKKUN,parentOccurrenceRef:String(parentId||""),routeRef:String(routeRef||""),participantState:{presenceState:"DEPARTED",ownershipGranted:false,nameKnowledgeGranted:false}};
 const out=commitOnce(id,fact,"PAKKUN_DEPARTED",[ORIGIN,PAKKUN],[{type:"origin_occurrence",id:String(parentId||"")}]);if(!out.success)return out;
 const cl=classify(PAKKUN,"DEPARTED",id);if(!cl||cl.success!==true)return cl||{success:false,reason:"original_target_pakkun_departure_classification_failed"};
 rt.localContext={...(rt.localContext||{}),kakashiKonohaPakkunPresent:false,kakashiPostMiPakkunPresent:false,kakashiKonohaPakkunDepartureOccurrenceId:id};save();return{success:true,occurrenceId:id};
}
function commitOriginalDisposition(kind){
 const rt=active(),parent=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaOriginalTargetAmtVictoryOccurrenceId||"");
 const expected={KILL:D.originalKill,RESTRAIN:D.originalRestrain,ANBU:D.originalAnbuHandoff,POLICE:D.originalPoliceHandoff}[kind];
 if(!rt||rt.beatId!==expected||!parent)return{success:false,reason:"original_target_disposition_context_required"};
 const pkg=factOf(occurrence(rt.localContext&&rt.localContext.kakashiKonohaPackageOccurrenceId)).packageState||{objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER"};
 let id,out,stateClass;
 if(kind==="RESTRAIN"){
  const field=globalThis.commitAcademyKakashiFieldSecured35920;if(typeof field!=="function")return{success:false,reason:"field_secured_35920_owner_missing"};
  out=field(AMT,{sourceOccurrenceId:parent,locationRef:"KAKASHI_AMT_ALLEY",routeRef:"observe_original_target"});if(!out||out.success!==true)return out||{success:false,reason:"original_target_field_secure_failed"};
  id=String(out.occurrenceId||"");stateClass="FIELD_SECURED_PENDING_COLLECTION";
 }else if(kind==="ANBU"||kind==="POLICE"){
  const transfer=globalThis.commitAcademyKakashiSingleTransfer35920;if(typeof transfer!=="function")return{success:false,reason:"field_secured_35920_transfer_owner_missing"};
  const dest=kind==="ANBU"?"ANBU":"UCHIHA_POLICE";
  out=transfer(AMT,dest,{sourceOccurrenceId:parent});if(!out||out.success!==true)return out||{success:false,reason:"original_target_transfer_failed"};
  id=String(out.occurrenceId||"");stateClass=kind==="ANBU"?"ANBU_INSTITUTIONAL_CUSTODY":"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY";
  const dep=commitOriginalPakkunDeparture35910(id,"original_target_"+kind.toLowerCase());if(!dep||dep.success!==true)return dep||{success:false,reason:"original_target_pakkun_departure_failed"};
 }else if(kind==="KILL"){
  stateClass="DEAD";id=stable("occ_origin_kakashi_original_target_disposition",{instance:String(rt.instanceId||""),parent,kind});
  const fact={factClass:"academy_kakashi_original_target_post_battle_disposition",anchorRef:"AK_SA_021",authorityCommit:AUTH.originalTarget,storySceneInstanceId:String(rt.instanceId||""),parentOccurrenceRef:parent,selectedDisposition:kind,packageState:clone(pkg),participantStateByRef:{[AMT]:{stateClass,alive:false}},worldFacts:{packageStillMissing:true,pakkunPresent:true,deterministicPostBattleKill:true,fieldSecured:false}};
  out=commitOnce(id,fact,"ORIGINAL_TARGET_KILL",[ORIGIN,AMT,PAKKUN],[{type:"origin_occurrence",id:parent},{type:"writing_authority",id:AUTH.originalTarget}]);if(!out.success)return out;
  const cl=classify(AMT,stateClass,stable("sc35910-original-disposition",{id,stateClass}));if(!cl.success)return cl;
 }else return{success:false,reason:"original_target_disposition_unknown"};
 rt.localContext={...(rt.localContext||{}),kakashiKonohaOriginalTargetDispositionOccurrenceId:id};save();return{success:true,occurrenceId:id,stateClass,nextBeatId:TERMINAL};
}

// ---------------------------------------------------------------------------
// MOVE IN CLOSER SUCCESS -> LET HANDOFF HAPPEN reconvergence.
// ---------------------------------------------------------------------------
function patchGetCloserHandoff(){
 const d=scene(),beat=d&&d.beatMap instanceof Map?d.beatMap.get("kak_get_closer_success"):null;if(!beat||!Array.isArray(beat.choices))return false;
 const choice=beat.choices.find(row=>row&&row.choiceId==="let_handoff_happen");if(!choice||!Array.isArray(choice.consequenceRequests)||!choice.consequenceRequests[0]||typeof choice.consequenceRequests[0].resolve!=="function")return false;
 if(choice.__konoha35910Wrapped===true)return true;
 const prior=choice.consequenceRequests[0].resolve;
 choice.consequenceRequests[0].resolve=function reconvergeGetCloserHandoff35910(){
  const out=prior.apply(this,arguments);if(!out||out.success!==true)return out;
  const rt=active(),occurrenceId=String(out.occurrenceId||rt&&rt.localContext&&rt.localContext.kakashiGetCloserHandoffOccurrenceId||"");if(!rt||!occurrenceId)return{success:false,reason:"get_closer_handoff_reconvergence_occurrence_missing"};
  rt.localContext={...(rt.localContext||{}),kakashiOriginalAction:"observe",kakashiObserveScene03AOccurrenceId:occurrenceId,kakashiObserveEscalationChoiceSetId:String(out.successorChoiceSetId||rt.localContext&&rt.localContext.kakashiObserveEscalationChoiceSetId||"")};
  choice.nextBeatId=D.getCloserHandoff;save();
  return{...out,nextBeatId:D.getCloserHandoff,reconvergesToObserveAfterPerformance:true};
 };
 choice.nextBeatId=D.getCloserHandoff;choice.__konoha35910Wrapped=true;return true;
}

function filteredCues35910(rows){return(rows||[]).filter(row=>!row.branch||row.branch==="missing");}
function preludeDone35910(rt,beatId){return !!(rt&&rt.localContext&&rt.localContext[PRELUDE_DONE]&&rt.localContext[PRELUDE_DONE][beatId]);}
function markPreludeDone35910(rt,beatId){rt.localContext={...(rt.localContext||{}),[PRELUDE_DONE]:{...(rt.localContext&&rt.localContext[PRELUDE_DONE]||{}),[beatId]:true}};save();}
function performanceSequence35910(rt=active()){
 if(!rt||rt.sceneId!==SCENE)return null;
 if(rt.beatId===D.directIntro)return DIRECT_INTRO_CUES;
 if(rt.beatId===D.directReturn){const f=factOf(occurrence(rt.localContext&&rt.localContext.kakashiKonohaDirectStrike2v1OccurrenceId));return f.factClass==="academy_kakashi_direct_strike_2v1_victory"?DIRECT_WIN1_CUES:DIRECT_LOSS1_CUES;}
 if(rt.beatId===D.directMiArrival)return DIRECT_MI_ARRIVAL_CUES;
 if(rt.beatId===D.directMiReturn){const f=factOf(occurrence(rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeMiOccurrenceId));return f.factClass==="academy_kakashi_direct_strike_mi_victory"?DIRECT_MI_WIN_CUES:DIRECT_MI_LOSS_CUES;}
 if(rt.beatId===D.directPoliceEscort)return DIRECT_POLICE_ESCORT_CUES;
 if(rt.beatId===D.directPoliceHandoff)return DIRECT_POLICE_HANDOFF_CUES;
 if(rt.beatId===D.directAnbuEscort)return DIRECT_ANBU_ESCORT_CUES;
 if(rt.beatId===D.directAnbuHandoff)return DIRECT_ANBU_HANDOFF_CUES;
 if(rt.beatId===D.directKill)return DIRECT_KILL_CUES;
 if(rt.beatId===D.directRelease)return DIRECT_RELEASE_CUES;
 if(rt.beatId===D.originalIntro)return ORIGINAL_INTRO_CUES;
 if(rt.beatId===D.originalFailure)return ORIGINAL_FAILURE_CUES;
 if(rt.beatId===D.originalPakkun)return ORIGINAL_PAKKUN_CUES;
 if(rt.beatId===D.originalReturn){const f=factOf(occurrence(rt.localContext&&rt.localContext.kakashiKonohaOriginalTargetAmtVictoryOccurrenceId));return f.factClass==="academy_kakashi_original_target_amt_battle_victory"?ORIGINAL_WIN_CUES:ORIGINAL_LOSS_CUES;}
 if(rt.beatId===D.originalKill)return ORIGINAL_KILL_CUES;
 if(rt.beatId===D.originalRestrain)return ORIGINAL_RESTRAIN_CUES;
 if(rt.beatId===D.originalAnbuEscort)return ORIGINAL_ANBU_ESCORT_CUES;
 if(rt.beatId===D.originalAnbuHandoff)return filteredCues35910(ORIGINAL_ANBU_HANDOFF_CUES);
 if(rt.beatId===D.originalPoliceEscort)return ORIGINAL_POLICE_ESCORT_CUES;
 if(rt.beatId===D.originalPoliceHandoff)return ORIGINAL_POLICE_HANDOFF_CUES;
 if(rt.beatId===D.getCloserHandoff)return GET_CLOSER_HANDOFF_CUES;
 return null;
}
function performance35910(rt=active()){const seq=performanceSequence35910(rt);if(!seq||!seq.length)return null;const row=rt.localContext&&rt.localContext[PERFORMANCE_CURSOR],index=row&&row.beatId===rt.beatId&&Number.isInteger(row.index)?Math.max(0,Math.min(seq.length-1,row.index)):0;return{sequence:seq,index,cue:seq[index],atEnd:index>=seq.length-1};}
function persistPerformance35910(rt,index){rt.localContext={...(rt.localContext||{}),[PERFORMANCE_CURSOR]:{beatId:rt.beatId,index}};save();}
function clearPerformance35910(rt){if(rt&&rt.localContext&&Object.prototype.hasOwnProperty.call(rt.localContext,PERFORMANCE_CURSOR))delete rt.localContext[PERFORMANCE_CURSOR];}
function pendingDisposition35910(kind){return()=>({success:true,selectedDisposition:kind,factualCommitDeferred:true});}

// ---------------------------------------------------------------------------
// Beat/choice install.
// ---------------------------------------------------------------------------
function install(){
 const d=scene();if(!d||!(d.beatMap instanceof Map))return{success:false,reason:"kakashi_route_scene_missing"};
 const beats=[
  {beatId:D.directIntro,mode:"narration",environmentRef:SAKURA,objectiveText:"Stop the handoff.",text:DIRECT_INTRO_CUES[0].text,nextBeatId:D.directBattle},
  {beatId:D.directBattle,mode:"battle_transition",environmentRef:SAKURA,text:"Kakashi faces ANBU Marked Target and Package Smuggler before the handoff can complete.",battle:{encounterId:DIRECT_2V1,launchResolver:launchDirect2v1,postBattleBeatId:D.directReturn,resultProjector:()=>latestResult(),actionLabel:"STRIKE BEFORE THE HANDOFF"}},
  {beatId:D.directReturn,mode:"narration",environmentRef:SAKURA,onEnterConsequences:[{requestId:"kakashi_direct_strike_2v1_return_35910",kind:"domain",resolve:consumeDirect2v1}],text:"The first fight returns to Story.",nextBeatId:D.directMiArrival},
  {beatId:D.directMiArrival,mode:"narration",environmentRef:SAKURA,objectiveText:"Protect the package.",text:DIRECT_MI_ARRIVAL_CUES[0].text,nextBeatId:D.directMiBattle},
  {beatId:D.directMiBattle,mode:"battle_transition",environmentRef:SAKURA,text:"Masked Interceptor arrives specifically for the package now held by Kakashi.",battle:{encounterId:DIRECT_MI,launchResolver:launchDirectMi,postBattleBeatId:D.directMiReturn,resultProjector:()=>latestResult(),actionLabel:"PROTECT THE PACKAGE"}},
  {beatId:D.directMiReturn,mode:"narration",environmentRef:SAKURA,onEnterConsequences:[{requestId:"kakashi_direct_strike_mi_return_35910",kind:"domain",resolve:consumeDirectMi}],text:"The second fight returns to Story.",nextBeatId:D.directGroup},
  {beatId:D.directGroup,mode:"choice",environmentRef:SAKURA,text:"All three shinobi are defeated. The package is secure. Kakashi decides what happens next.",choices:[
   {choiceId:"direct_group_police",label:"TAKE THEM TO THE UCHIHA POLICE FORCE",nextBeatId:D.directPoliceEscort,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"direct_group_police_35910",kind:"domain",resolve:pendingDisposition35910("POLICE")}]},
   {choiceId:"direct_group_anbu",label:"TAKE THEM TO THE ANBU",nextBeatId:D.directAnbuEscort,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"direct_group_anbu_35910",kind:"domain",resolve:pendingDisposition35910("ANBU")}]},
   {choiceId:"direct_group_kill",label:"KILL THEM",nextBeatId:D.directKill,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"direct_group_kill_35910",kind:"domain",resolve:pendingDisposition35910("KILL")}]},
   {choiceId:"direct_group_release",label:"TAKE THE PACKAGE AND LET THEM GO",nextBeatId:D.directRelease,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"direct_group_release_35910",kind:"domain",resolve:pendingDisposition35910("RELEASE")}]}
  ]},
  {beatId:D.directPoliceEscort,mode:"narration",environmentRef:SAKURA,text:DIRECT_POLICE_ESCORT_CUES[0].text,nextBeatId:D.directPoliceHandoff},
  {beatId:D.directPoliceHandoff,mode:"narration",environmentRef:POLICE,text:DIRECT_POLICE_HANDOFF_CUES[0].text,nextBeatId:TERMINAL},
  {beatId:D.directAnbuEscort,mode:"narration",environmentRef:SAKURA,text:DIRECT_ANBU_ESCORT_CUES[0].text,nextBeatId:D.directAnbuHandoff},
  {beatId:D.directAnbuHandoff,mode:"narration",environmentRef:ROOFTOP,text:DIRECT_ANBU_HANDOFF_CUES[0].text,nextBeatId:TERMINAL},
  {beatId:D.directKill,mode:"narration",environmentRef:SAKURA,text:DIRECT_KILL_CUES[0].text,nextBeatId:TERMINAL},
  {beatId:D.directRelease,mode:"narration",environmentRef:SAKURA,text:DIRECT_RELEASE_CUES[0].text,nextBeatId:TERMINAL},
  {beatId:D.secureBeforeIntro,mode:"narration",environmentRef:SAKURA,objectiveText:"Retrieve the package.",text:"Kakashi is half a step late. There is no clean extraction anymore. The race collapses into the existing Package Smuggler + Masked Interceptor fight.",nextBeatId:D.secureBeforeBattle},
  {beatId:D.secureBeforeBattle,mode:"battle_transition",environmentRef:SAKURA,text:"Resolver failure reconverges into the shared PS + MI 2-v-1 without replaying branch setup.",battle:{encounterId:SECURE_2V1,launchResolver:launchSecureBeforeBattle,postBattleBeatId:"kak_observe_secure_package_return",resultProjector:()=>latestResult(),actionLabel:"SECURE THE PACKAGE"}},
  {beatId:D.originalIntro,mode:"narration",environmentRef:ALLEY,objectiveText:"Catch the original target.",text:ORIGINAL_INTRO_CUES[0].text,nextBeatId:D.originalPakkun},
  {beatId:D.originalFailure,mode:"narration",environmentRef:ALLEY,objectiveText:"Return to ANBU.",text:ORIGINAL_FAILURE_CUES[0].text,nextBeatId:TERMINAL},
  {beatId:D.originalPakkun,mode:"narration",environmentRef:ALLEY,text:ORIGINAL_PAKKUN_CUES[0].text,nextBeatId:D.originalBattle},
  {beatId:D.originalBattle,mode:"battle_transition",environmentRef:ALLEY,text:"Kakashi and temporary Story-authorised Pakkun confront ANBU Marked Target. The package remains elsewhere.",battle:{encounterId:AMT_PAKKUN,launchResolver:launchOriginalAmt,postBattleBeatId:D.originalReturn,resultProjector:()=>latestResult(),actionLabel:"CONFRONT THE ORIGINAL TARGET"}},
  {beatId:D.originalReturn,mode:"narration",environmentRef:ALLEY,onEnterConsequences:[{requestId:"kakashi_original_target_amt_return_35910",kind:"domain",resolve:consumeOriginalAmt}],text:"The AMT confrontation returns to Story. Battle never grants package custody.",nextBeatId:D.originalDisposition},
  {beatId:D.originalDisposition,mode:"choice",environmentRef:ALLEY,text:"ANBU Marked Target is Battle-defeated. The package is still missing.",choices:[
   {choiceId:"original_kill",label:"KILL HIM",nextBeatId:D.originalKill,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"original_kill_35910",kind:"domain",resolve:pendingDisposition35910("KILL")}]},
   {choiceId:"original_restrain",label:"RESTRAIN HIM",nextBeatId:D.originalRestrain,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"original_restrain_35910",kind:"domain",resolve:pendingDisposition35910("RESTRAIN")}]},
   {choiceId:"original_anbu",label:"BRING HIM TO THE ANBU",nextBeatId:D.originalAnbuEscort,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"original_anbu_35910",kind:"domain",resolve:pendingDisposition35910("ANBU")}]},
   {choiceId:"original_police",label:"TAKE HIM TO THE UCHIHA POLICE FORCE",nextBeatId:D.originalPoliceEscort,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"original_police_35910",kind:"domain",resolve:pendingDisposition35910("POLICE")}]}
  ]},
  {beatId:D.originalKill,mode:"narration",environmentRef:ALLEY,text:ORIGINAL_KILL_CUES[0].text,nextBeatId:TERMINAL},
  {beatId:D.originalRestrain,mode:"narration",environmentRef:ALLEY,text:ORIGINAL_RESTRAIN_CUES[0].text,nextBeatId:TERMINAL},
  {beatId:D.originalAnbuEscort,mode:"narration",environmentRef:ALLEY,text:ORIGINAL_ANBU_ESCORT_CUES[0].text,nextBeatId:D.originalAnbuHandoff},
  {beatId:D.originalAnbuHandoff,mode:"narration",environmentRef:ROOFTOP,text:ORIGINAL_ANBU_HANDOFF_CUES[0].text,nextBeatId:TERMINAL},
  {beatId:D.originalPoliceEscort,mode:"narration",environmentRef:ALLEY,text:ORIGINAL_POLICE_ESCORT_CUES[0].text,nextBeatId:D.originalPoliceHandoff},
  {beatId:D.originalPoliceHandoff,mode:"narration",environmentRef:POLICE,text:ORIGINAL_POLICE_HANDOFF_CUES[0].text,nextBeatId:TERMINAL},
  {beatId:D.getCloserHandoff,mode:"narration",environmentRef:SAKURA,text:GET_CLOSER_HANDOFF_CUES[0].text,nextBeatId:OBSERVE_BEAT}
 ];
 beats.forEach((b,i)=>{const n=normalized(b,35910+i);if(n)d.beatMap.set(n.beatId,n);});

 const action=d.beatMap.get(ACTION_BEAT),attack=action&&Array.isArray(action.choices)?action.choices.find(row=>row&&row.choiceId==="attack"):null;
 if(!attack)return{success:false,reason:"direct_strike_source_choice_missing"};
 attack.label="STRIKE BEFORE THE HANDOFF";attack.nextBeatId=D.directIntro;attack.availability=available(true);attack.knownBlocker=null;attack.consequenceRequests=[{requestId:"kakashi_direct_strike_entry_35910",kind:"domain",resolve:()=>resolveDirectStrikeEntry(attack)}];

 const observe=d.beatMap.get(OBSERVE_BEAT);
 const securePackage=observe&&Array.isArray(observe.choices)?observe.choices.find(row=>row&&row.choiceId==="secure_package"):null;
 const sequential=observe&&Array.isArray(observe.choices)?observe.choices.find(row=>row&&row.choiceId==="defeat_assassin_then_secure"):null;
 const secure=observe&&Array.isArray(observe.choices)?observe.choices.find(row=>row&&row.choiceId==="secure_package_before_assassin"):null;
 const original=observe&&Array.isArray(observe.choices)?observe.choices.find(row=>row&&row.choiceId==="go_after_original_target"):null;
 if(!securePackage||!sequential||!secure||!original)return{success:false,reason:"observe_route_choices_missing"};
 securePackage.label="SECURE THE PACKAGE";securePackage.nextBeatId="kak_observe_secure_package_battle";securePackage.availability=available(true);securePackage.knownBlocker=null;
 securePackage.consequenceRequests=[{requestId:"kakashi_observe_secure_package_bridge_35910",kind:"domain",resolve:()=>beginSharedObserveBattleChoice35910("secure_package","academy_kakashi.battle.secure_package","kakashiObserveSecurePackageStoryDecisionReceiptId","kakashiObserveSecurePackageIntentCommitRef",securePackage.nextBeatId)}];
 sequential.label="DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE";sequential.nextBeatId="kak_seq_mi_battle";sequential.availability=available(true);sequential.knownBlocker=null;
 sequential.consequenceRequests=[{requestId:"kakashi_observe_sequential_bridge_35910",kind:"domain",resolve:()=>beginSharedObserveBattleChoice35910("defeat_assassin_then_secure","academy_kakashi.battle.defeat_assassin_then_secure","kakashiObserveSequentialStoryDecisionReceiptId","kakashiObserveSequentialIntentCommitRef",sequential.nextBeatId)}];
 secure.label="SECURE THE PACKAGE BEFORE THE ASSASSIN";secure.nextBeatId=D.secureBeforeIntro;secure.availability=available(true);secure.knownBlocker=null;secure.consequenceRequests=[{requestId:"kakashi_secure_before_resolve_35910",kind:"domain",resolve:()=>resolveSecureBeforeChoice(secure)}];
 original.label="GO AFTER THE ORIGINAL TARGET";original.nextBeatId=D.originalIntro;original.availability=available(true);original.knownBlocker=null;original.consequenceRequests=[{requestId:"kakashi_original_target_resolve_35910",kind:"domain",resolve:()=>resolveOriginalTargetChoice(original)}];
 patchGetCloserHandoff();
 return{success:true};
}
let presentationHooksInstalled35910=false,presentationHookAttempts35910=0;
function installPresentationHooks35910(){
 if(presentationHooksInstalled35910)return true;
 if(typeof globalThis.getStoryScenePerformance33900!=="function"||typeof globalThis.advanceStoryScene!=="function")return false;
 const PRE_GET=globalThis.getStoryScenePerformance33900,PRE_ADVANCE=globalThis.advanceStoryScene;
 globalThis.getStoryScenePerformance33900=function getStoryScenePerformance35910(){const p=performance35910(active());return p||PRE_GET.apply(this,arguments);};
 globalThis.advanceStoryScene=function advanceStoryScene35910(choiceId=null){
  const rt=active(),p=performance35910(rt);
  if(!rt||rt.sceneId!==SCENE||!Object.values(D).includes(rt.beatId)||choiceId!==null&&choiceId!==undefined)return PRE_ADVANCE.apply(this,arguments);
  if(p&&!p.atEnd){persistPerformance35910(rt,p.index+1);try{renderStoryScenePresentationLayer();}catch(_e){}return{success:true,type:"kakashi_konoha_route_performance_advanced",beatId:rt.beatId,cueIndex:p.index+1,semanticBeatUnchanged:true};}
  let commit=null;
  if(rt.beatId===D.directPoliceHandoff)commit=commitDirectGroupDisposition("POLICE");
  else if(rt.beatId===D.directAnbuHandoff)commit=commitDirectGroupDisposition("ANBU");
  else if(rt.beatId===D.directKill)commit=commitDirectGroupDisposition("KILL");
  else if(rt.beatId===D.directRelease)commit=commitDirectGroupDisposition("RELEASE");
  else if(rt.beatId===D.originalKill)commit=commitOriginalDisposition("KILL");
  else if(rt.beatId===D.originalRestrain)commit=commitOriginalDisposition("RESTRAIN");
  else if(rt.beatId===D.originalAnbuHandoff)commit=commitOriginalDisposition("ANBU");
  else if(rt.beatId===D.originalPoliceHandoff)commit=commitOriginalDisposition("POLICE");
  if(commit&&commit.success!==true)return commit;
  clearPerformance35910(rt);save();return PRE_ADVANCE.apply(this,arguments);
 };
 try{getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;advanceStoryScene=globalThis.advanceStoryScene;}catch(_e){}
 presentationHooksInstalled35910=true;return true;
}
function ensurePresentationHooks35910(){if(installPresentationHooks35910())return;if(typeof setTimeout==="function"&&presentationHookAttempts35910++<100)setTimeout(ensurePresentationHooks35910,25);}
const installed=install();if(!installed||installed.success!==true)throw new Error("kakashi_konoha_route_closure_35910_install_failed:"+(installed&&installed.reason||"unknown"));ensurePresentationHooks35910();

function diagnostics(){
 const d=scene(),action=d&&d.beatMap.get(ACTION_BEAT),attack=action&&action.choices&&action.choices.find(x=>x.choiceId==="attack"),observe=d&&d.beatMap.get(OBSERVE_BEAT),securePackage=observe&&observe.choices&&observe.choices.find(x=>x.choiceId==="secure_package"),sequential=observe&&observe.choices&&observe.choices.find(x=>x.choiceId==="defeat_assassin_then_secure"),secure=observe&&observe.choices&&observe.choices.find(x=>x.choiceId==="secure_package_before_assassin"),original=observe&&observe.choices&&observe.choices.find(x=>x.choiceId==="go_after_original_target");
 const regs=PROVIDER.getRegisteredStoryFactualBindings();
 const checks={
  patchId:PATCH_ID==="alpha_kakashi_konoha_route_closure_35910_v6_2026_09_21",
  writing100Pinned:AUTH.writing100==="21e0407a0c371310ff06096905fd1fce4107ece8",
  directStrikeFixedChain:!!attack&&attack.label==="STRIKE BEFORE THE HANDOFF"&&attack.nextBeatId===D.directIntro&&d.beatMap.has(D.directBattle)&&d.beatMap.has(D.directMiBattle)&&d.beatMap.has(D.directGroup),
  directStrikeExactConfigs:!!(BATTLE.configs&&BATTLE.configs[DIRECT_2V1]&&BATTLE.configs[DIRECT_MI]),
  directGroupChoicesExact:JSON.stringify(d.beatMap.get(D.directGroup).choices.map(x=>x.label))===JSON.stringify(["TAKE THEM TO THE UCHIHA POLICE FORCE","TAKE THEM TO THE ANBU","KILL THEM","TAKE THE PACKAGE AND LET THEM GO"]),
  directVerbatimPerformances:DIRECT_INTRO_CUES.some(x=>x.text==="I saw enough.")&&DIRECT_MI_ARRIVAL_CUES.some(x=>x.text==="Not for what I came for.")&&DIRECT_RELEASE_CUES.length>0,
  directDispositionCommitsAtAction:commitDirectGroupDisposition.toString().includes("D.directPoliceHandoff")&&commitDirectGroupDisposition.toString().includes("D.directKill"),
  canonicalObserveBattleBindings:!!securePackage&&securePackage.nextBeatId==="kak_observe_secure_package_battle"&&!!sequential&&sequential.nextBeatId==="kak_seq_mi_battle"&&securePackage.consequenceRequests.some(x=>x&&x.requestId==="kakashi_observe_secure_package_bridge_35910")&&sequential.consequenceRequests.some(x=>x&&x.requestId==="kakashi_observe_sequential_bridge_35910"),
  secureBeforeLive:!!secure&&secure.knownBlocker===null&&regs.some(x=>x.bindingRef===SECURE_BEFORE_BINDING),
  secureBeforeFailureUsesSharedBattleOwner:launchSecureBeforeBattle.toString().includes('"academy_kakashi.battle.secure_package"')&&launchSecureBeforeBattle.toString().includes('"kak_observe_secure_package_return"')&&ensureSecureBeforeSharedBattleIntent35910.toString().includes("AK_SA_020_FAILURE_RECONVERGENCE"),
  originalTargetLive:!!original&&original.knownBlocker===null&&regs.some(x=>x.bindingRef===ORIGINAL_TARGET_BINDING),
  originalDispositionExact:JSON.stringify(d.beatMap.get(D.originalDisposition).choices.map(x=>x.label))===JSON.stringify(["KILL HIM","RESTRAIN HIM","BRING HIM TO THE ANBU","TAKE HIM TO THE UCHIHA POLICE FORCE"]),
  originalFailureAuthored:resolveOriginalTargetChoice.toString().includes("D.originalFailure")&&ORIGINAL_FAILURE_CUES.length>0,
  originalDispositionPerformances:ORIGINAL_KILL_CUES.length>0&&ORIGINAL_RESTRAIN_CUES.length>0&&ORIGINAL_ANBU_HANDOFF_CUES.some(x=>x.text==="You brought the original target back.")&&ORIGINAL_POLICE_HANDOFF_CUES.length>0,
  originalCustodyAtPhysicalHandoff:commitOriginalDisposition.toString().includes("commitAcademyKakashiSingleTransfer35920")&&commitOriginalDisposition.toString().includes("commitAcademyKakashiFieldSecured35920"),
  getCloserHandoffPerformance:GET_CLOSER_HANDOFF_CUES.length>0&&patchGetCloserHandoff.toString().includes("D.getCloserHandoff"),
  ce256SharedOwnerUsed:consumeOriginalAmt.toString().includes("CLOSURE.resolveAmtDefeatFacts"),
  getCloserHandoffReconvergence:patchGetCloserHandoff()===true,
  battleDoesNotOwnDisposition:consumeDirectMi.toString().includes("participantDeathCommitted:false")&&consumeDirectMi.toString().includes("participantCustodyCommitted:false"),
  battleLaunchContractExact:launch.toString().includes('type:"story_scene"')&&launch.toString().includes("pakkunAuthorized")&&launch.toString().includes("cfg.pakkun===true"),
  directPhysicalChainReusable:beginReusedDirectStrikePhysical35910.toString().includes("bindingRef")&&launchDirect2v1.toString().includes("directChainBinding")&&consumeDirect2v1.toString().includes("directChainBinding"),
  browserGoldenClaimed:false
 };
 const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
 return{pass:failed.length===0,checks,failed,beats:D,browserGoldenClaimed:false};
}

globalThis.SC_ALPHA_KAKASHI_KONOHA_ROUTE_CLOSURE_35910=Object.freeze({
 patchId:PATCH_ID,authority:AUTH,beats:D,
 resolveDirectStrikeEntry,beginReusedDirectStrikePhysical:beginReusedDirectStrikePhysical35910,consumeDirect2v1,consumeDirectMi,commitDirectGroupDisposition,
 resolveSecureBeforeChoice,consumeSecureBeforeBattle,resolveOriginalTargetChoice,consumeOriginalAmt,commitOriginalDisposition,
 beginSharedObserveBattleChoice:beginSharedObserveBattleChoice35910,patchGetCloserHandoff,diagnostics,browserGoldenClaimed:false
});
globalThis.runAcademyKakashiKonohaRouteClosure35910Diagnostics=diagnostics;
})();