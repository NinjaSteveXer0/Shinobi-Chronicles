"use strict";
// Academy Kakashi Origin V2 — declarative authority projection only.
// No DOM, no Story mutation, no Battle mutation.
(function installAcademyKakashiV2Data36000(){
if(globalThis.SC_KAKASHI_V2_DATA_36000)return;
const D={
 patchId:"academy_kakashi_v2_data_36000_2026_09_22",
 sceneId:"origin_academy_kakashi_prologue",
 originId:"academy_kakashi",
 actors:Object.freeze({
  kakashi:Object.freeze({id:"academy_kakashi",label:"ACADEMY KAKASHI",image:"Assets/Academy Student/academy_kakashi.png"}),
  anbu:Object.freeze({id:"konoha_anbu_contact",label:"ANBU",image:null}),
  minato:Object.freeze({id:"kage_minato",label:"HOKAGE · MINATO",image:"Assets/Kage/kage_minato.png"}),
  amt:Object.freeze({id:"academy_kakashi_origin_amt",label:"ANBU MARKED TARGET",image:"NPC/anbu_marked_target.png"}),
  ps:Object.freeze({id:"academy_kakashi_origin_package_smuggler",label:"PACKAGE SMUGGLER",image:"NPC/package_smuggler.png"}),
  mi:Object.freeze({id:"academy_kakashi_origin_masked_interceptor",label:"MASKED INTERCEPTOR",image:"NPC/masked_interceptor.png"}),
  pakkun:Object.freeze({id:"pakkun",label:"PAKKUN",image:"Assets/Summons/pakkun.png"})
 }),
 backdrops:Object.freeze({
  rooftop:"Kakashi Origin Backdrop/rooftop_night.png",
  alley:"Kakashi Origin Backdrop/alleyway_konoha_night.png",
  alleyAlt:"Kakashi Origin Backdrop/konoha_alleyway_alt_night.png",
  alleyEnd:"Kakashi Origin Backdrop/end_of_alleyway.png",
  sakura:"Kakashi Origin Backdrop/sakura_tree_night.png",
  sakuraFight:"Kakashi Origin Backdrop/fight_at_sakura_tree.png",
  police:"Kakashi Origin Backdrop/uchiha_police_exterior_night.png",
  hokage:"Kakashi Origin Backdrop/hokage_administration_interior_night.png"
 }),
 configs:Object.freeze({
  MI:"academy_kakashi_origin_battle_mi_1v1",
  PS:"academy_kakashi_origin_battle_ps_1v1",
  AMT:"academy_kakashi_origin_battle_amt_1v1",
  AMT_PS:"academy_kakashi_origin_battle_amt_ps_2v1",
  PS_MI:"academy_kakashi_origin_battle_ps_mi_2v1",
  THREE:"academy_kakashi_origin_battle_amt_ps_mi_3v1",
  PAKKUN_AMT:"academy_kakashi_origin_battle_kakashi_pakkun_vs_amt",
  SEQ_MI:"academy_kakashi_origin_battle_seq_mi",
  SEQ_PS:"academy_kakashi_origin_battle_seq_ps",
  SEQ_AMT:"academy_kakashi_origin_battle_seq_amt_pakkun"
 }),
 rootChoices:Object.freeze([
  Object.freeze({id:"watch_exchange",label:"WATCH THE EXCHANGE"}),
  Object.freeze({id:"move_closer",label:"MOVE IN CLOSER"}),
  Object.freeze({id:"strike_before_handoff",label:"STRIKE BEFORE THE HANDOFF"}),
  Object.freeze({id:"slip_for_package",label:"SLIP IN FOR THE PACKAGE"})
 ]),
 watchChoices:Object.freeze([
  Object.freeze({id:"stop_assassin",label:"STOP THE ASSASSIN"}),
  Object.freeze({id:"secure_package",label:"SECURE THE PACKAGE"}),
  Object.freeze({id:"secure_before_assassin",label:"SECURE THE PACKAGE BEFORE THE ASSASSIN"}),
  Object.freeze({id:"defeat_then_secure",label:"DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE"}),
  Object.freeze({id:"go_after_original_target",label:"GO AFTER THE ORIGINAL TARGET"})
 ]),
 groupChoices:Object.freeze([
  Object.freeze({id:"group_police",label:"TAKE THEM TO THE UCHIHA POLICE FORCE"}),
  Object.freeze({id:"group_anbu",label:"TAKE THEM TO THE ANBU"}),
  Object.freeze({id:"group_kill",label:"KILL THEM"}),
  Object.freeze({id:"group_release",label:"TAKE THE PACKAGE AND LET THEM GO"})
 ]),
 rooftopCues:Object.freeze([
  Object.freeze({kind:"narration",text:"Kakashi stands alone on a Konoha rooftop, the village lights spread out below him. A masked ANBU operative lands behind him without warning."}),
  Object.freeze({kind:"dialogue",speakerName:"ANBU",text:"Kakashi Hatake."}),
  Object.freeze({kind:"narration",text:"Kakashi turns to face him."}),
  Object.freeze({kind:"dialogue",speakerName:"ANBU",text:"You have orders. Stop this package from falling into the wrong hands."}),
  Object.freeze({kind:"narration",text:"The operative holds out a sealed envelope."}),
  Object.freeze({kind:"narration",text:"Kakashi crosses the rooftop and takes it."}),
  Object.freeze({kind:"dialogue",speakerName:"KAKASHI",text:"Why are you coming to me with this?"}),
  Object.freeze({kind:"dialogue",speakerName:"ANBU",text:"Hokage's orders."}),
  Object.freeze({kind:"narration",text:"Kakashi looks down at the seal."}),
  Object.freeze({kind:"narration",text:"He breaks it. A target photograph waits inside."})
 ]),
 tailCues:Object.freeze([
  "Kakashi did not need long to find the man from the envelope.",
  "The difficult part was making sure the man never realised he had been found.",
  "Konoha changed shape when Kakashi followed someone through it. Streets stopped being streets and became sightlines. Crowds became cover. Roof edges became distances to clear before the person below could turn his head.",
  "ANBU Marked Target moved without the nervous scanning of someone who expected immediate pursuit.",
  "Kakashi kept it that way.",
  "He followed from above until the route tightened into older streets and narrower angles, then dropped lower when the rooftops would have made him too obvious.",
  "The target never looked directly at him.",
  "Not once.",
  "That did not make Kakashi relax.",
  "It made him wonder who the man expected to meet.",
  "By the time the route bent toward the Sakura tree and the alley beyond it, Kakashi had his answer.",
  "Someone was waiting."
 ].map(text=>Object.freeze({kind:"narration",text}))),
 watchCues:Object.freeze([
  "Kakashi stays where he is.","Not passive.","Watching.",
  "ANBU Marked Target shifts the package from beneath his clothing and places it into Package Smuggler's hand.",
  "The moment custody changes, the whole problem changes with it.","Kakashi's eye follows the package.",
  "ANBU Marked Target is already moving away.","Package Smuggler turns in the opposite direction.",
  "Kakashi has one additional fact now—who received the package—and less control over the situation than he had a few seconds earlier.",
  "The trade was information for escalation.","Then the darkness beside the alley moved.","Not slowly.",
  "A figure tore out of it like a lightning streak.",
  "Masked Interceptor hit the new situation at speed, driving straight toward Package Smuggler and forcing him to react before he had properly cleared the exchange.",
  "ANBU Marked Target broke away.","Package Smuggler tightened around the package.","Masked Interceptor cut across his escape line.",
  "And Kakashi, still unseen for one more heartbeat, had to choose what mattered most now."
 ].map(text=>Object.freeze({kind:"narration",text}))),
 stopCues:Object.freeze([
  "Kakashi moves.","Not toward ANBU Marked Target.","Not toward the package.","Toward Masked Interceptor.",
  "She is already closing on Package Smuggler when Kakashi drops between them.","Package Smuggler sees the opening immediately.",
  "He turns and runs.","The package goes with him.","Kakashi does not follow.","Masked Interceptor changes direction without hesitation.",
  "Her attention settles on Kakashi.","He has made himself the obstacle now.","She comes straight through him.","Kakashi meets her head-on."
 ].map(text=>Object.freeze({kind:"narration",text}))),
 receiptLabels:Object.freeze({
  assignment:"Hokage-authorised limited retrieval operation.",
  report:"ANBU report — completed from Kakashi-observed facts.",
  recovered:"Package — Recovered by Kakashi and returned to ANBU.",
  lostPs:"Package — Lost with Package Smuggler.",
  lostAmt:"Package — Lost with ANBU Marked Target.",
  lostMi:"Package — Taken from Kakashi by Masked Interceptor.",
  notRecovered:"Package — Not recovered by Kakashi."
 })
};
globalThis.SC_KAKASHI_V2_DATA_36000=Object.freeze(D);
})();
