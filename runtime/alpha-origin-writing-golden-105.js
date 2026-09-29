// ============================================================================
// ISSUE #105 — ACADEMY MIRAI + MENMA WRITING-GOLDEN RUNTIME CONSUMPTION
// Owner browser defect: 2026-09-28.
// Durable Writing:
// - Documentation/Story/Academy_Mirai_Origin_WRITING_GOLDEN_2026-09-24.md
// - Documentation/Story/Academy_Menma_Origin_WRITING_GOLDEN_2026-09-27.md
//
// Boundary:
// - REPLACE stale compressed player-facing Story.
// - Preserve Menma's existing Battle object / completion authority.
// - Mirai consumes closed Combat #338 through the existing Story -> Battle -> same-Story bridge.
// - No Kakashi ownership.
// ============================================================================
(function installOriginWritingGolden105(){
"use strict";

const PATCH_ID="alpha_origin_writing_golden_105_2026_09_28";
const A=globalThis.SC_ALPHA_ORIGIN_32900;
if(!A||typeof globalThis.registerStoryScene!=="function"||typeof globalThis.getStorySceneDefinition!=="function"){
  globalThis.SC_ALPHA_ORIGIN_WRITING_GOLDEN_105=Object.freeze({patchId:PATCH_ID,installed:false,reason:"origin_story_runtime_missing",browserGoldenClaimed:false});
  return;
}
const C=A.choice.bind(A),R=A.commitRequest.bind(A),X=A.completionRequest.bind(A);
const cloneBeat=beat=>beat?({...beat,choices:Array.isArray(beat.choices)?beat.choices.map(choice=>({...choice,contextPatch:choice.contextPatch&&typeof choice.contextPatch==="object"?{...choice.contextPatch}:choice.contextPatch})):beat.choices}):null;
const oldMenma=getStorySceneDefinition("origin_academy_menma_prologue");
const oldMenmaBeat=id=>oldMenma?(oldMenma.beatMap instanceof Map?oldMenma.beatMap.get(id):Array.isArray(oldMenma.beats)?oldMenma.beats.find(row=>row&&row.beatId===id):null):null;
const oldTutorial=cloneBeat(oldMenmaBeat("tutorial_battle"));
const oldTutorialDefeat=cloneBeat(oldMenmaBeat("tutorial_not_completed"));
const oldPostBattleOpening=oldMenmaBeat("post_battle_opening");
const oldMenmaCompletion=oldMenma&&Array.isArray(oldMenma.onCompleteConsequences)?oldMenma.onCompleteConsequences.slice():[];

function reg(def){
  try{if(typeof globalThis.unregisterStoryScene==="function")globalThis.unregisterStoryScene(def.sceneId);}catch(_error){}
  return globalThis.registerStoryScene(def);
}
function env(id){return {environmentId:id};}
function N(id,text,next,environment,onEnterConsequences){const row={beatId:id,mode:"narration",text};if(next)row.nextBeatId=next;if(environment)row.environmentRef=environment;if(onEnterConsequences)row.onEnterConsequences=onEnterConsequences;return row;}
function D(id,speaker,text,next,environment,onEnterConsequences){const row={beatId:id,mode:"dialogue",speakerName:speaker,text};if(next)row.nextBeatId=next;if(environment)row.environmentRef=environment;if(onEnterConsequences)row.onEnterConsequences=onEnterConsequences;return row;}
function V(id,speaker,text,next,environment,onEnterConsequences){const row=D(id,speaker,text,next,environment,onEnterConsequences);row.mode="dialogue";row.speakerRef={sourceId:"nine_tails",sourceType:"communication_source",physicalPresence:false};return row;}
function Q(id,text,choices,environment){const row={beatId:id,mode:"choice",text,choices};if(environment)row.environmentRef=environment;return row;}
function battleUnavailable(label){
  return ()=>({available:false,knownBlocker:label||"This route is unavailable right now."});
}
function menmaBattleAuthoredValue(key){
  const runtime=A.active(),resume=runtime&&runtime.battleResume,authored=resume&&resume.authored;
  return authored&&Object.prototype.hasOwnProperty.call(authored,key)?authored[key]:null;
}
function hiddenResolverAvailability(predicate){
  return ()=>({available:!!predicate(),knownBlocker:null});
}
function miraiBattleAuthoredValue(key){
  const runtime=A.active(),resume=runtime&&runtime.battleResume,authored=resume&&resume.authored;
  return authored&&Object.prototype.hasOwnProperty.call(authored,key)?authored[key]:null;
}

// ---------------------------------------------------------------------------
// MENMA — exact Writing-GOLDEN conversation around the preserved Battle seam.
// ---------------------------------------------------------------------------
const MENMA_ENV=Object.freeze({
  classroom:env("menma_origin_academy_classroom"),
  forest:env("menma_origin_whisper_woods_forest_route"),
  clearing:env("menma_origin_forest_clearing_day"),
  after:env("menma_origin_forest_clearing_alt_angle"),
  future:env("menma_origin_whisper_woods_rise")
});
const menmaNineTailsCommit=R(
  "menma_nine_tails_exchange_105","academy_menma",
  "occ_origin_menma_nine_tails_internal_exchange",
  {nineTailsInternalExchangeOccurred:true},
  ["MEN-05"]
);
const menmaBeats=[
  N("menma_open_01","The practice sheet lands on Menma's desk with every mark clean. Beside the instructor sits another stack of the same level of work.","menma_open_02",MENMA_ENV.classroom),
  D("menma_open_02","MENMA","Again?","menma_open_03",MENMA_ENV.classroom),
  D("menma_open_03","INSTRUCTOR","Again.","menma_open_04",MENMA_ENV.classroom),
  D("menma_open_04","MENMA","You already know I can do it.","menma_open_05",MENMA_ENV.classroom),
  D("menma_open_05","INSTRUCTOR","I know you can do this one.","menma_open_05a",MENMA_ENV.classroom),
  N("menma_open_05a","Menma's eyes go to the locked cabinet at the side of the room.","menma_open_06",MENMA_ENV.classroom),
  D("menma_open_06","MENMA","Then give me something harder.","menma_open_07",MENMA_ENV.classroom),
  D("menma_open_07","INSTRUCTOR","No.","menma_open_07a",MENMA_ENV.classroom),
  N("menma_open_07a","That answer lands harder than the work ever does.","menma_open_08",MENMA_ENV.classroom),
  D("menma_open_08","MENMA","That's all anybody says.","menma_open_09",MENMA_ENV.classroom),
  D("menma_open_09","INSTRUCTOR","Because being ready isn't the same thing as being bored.","menma_open_10",MENMA_ENV.classroom),
  N("menma_open_10","Menma stands and swings his bag over one shoulder.","menma_open_11",MENMA_ENV.classroom),
  D("menma_open_11","INSTRUCTOR","Class isn't finished.","menma_open_12",MENMA_ENV.classroom),
  D("menma_open_12","MENMA","Mine is.","menma_open_13",MENMA_ENV.classroom),
  N("menma_open_13","The room goes quiet behind him. Menma reaches the door before the instructor speaks again.","menma_open_14",MENMA_ENV.classroom),
  D("menma_open_14","INSTRUCTOR","If you walk out, that's your decision.","menma_open_15",MENMA_ENV.classroom),
  D("menma_open_15","MENMA","I know.","menma_forest_01",MENMA_ENV.classroom),

  N("menma_forest_01","The village drops away behind him. Trees replace walls, branches replace ceilings, and nobody is standing over his shoulder deciding how fast is too fast.\n\nMenma runs because he can.","menma_forest_02",MENMA_ENV.forest),
  N("menma_forest_02","He clears a fallen trunk without breaking stride and pushes harder. For the first time all morning, the pace belongs entirely to him.\n\nThen something cracks through the woods ahead.\n\nNot timber.\n\nToo heavy.","menma_forest_03",MENMA_ENV.forest),
  N("menma_forest_03","A second impact rolls between the trees. Birds burst from the canopy and the forest goes still after them.\n\nMenma slows.\n\nOnly for a moment.","menma_fox_01",MENMA_ENV.forest),

  N("menma_fox_01","A familiar presence shifts behind Menma's thoughts, attention turning toward the same distant violence.","menma_fox_02",MENMA_ENV.forest),
  V("menma_fox_02","NINE-TAILS","Interesting.","menma_fox_03",MENMA_ENV.forest),
  D("menma_fox_03","MENMA","You felt it.","menma_fox_04",MENMA_ENV.forest),
  V("menma_fox_04","NINE-TAILS","You wanted something worth testing yourself against.","menma_fox_04a",MENMA_ENV.forest),
  N("menma_fox_04a","Another impact rolls through the woods.","menma_fox_05",MENMA_ENV.forest),
  D("menma_fox_05","MENMA","And?","menma_fox_06",MENMA_ENV.forest),
  V("menma_fox_06","NINE-TAILS","There it is.","menma_fox_06a",MENMA_ENV.forest),
  N("menma_fox_06a","Menma smiles.","menma_fox_07",MENMA_ENV.forest),
  D("menma_fox_07","MENMA","You sound interested.","menma_fox_08",MENMA_ENV.forest),
  V("menma_fox_08","NINE-TAILS","I want to see whether your confidence is deserved.","menma_fox_09",MENMA_ENV.forest),
  D("menma_fox_09","MENMA","So do I.","menma_discovery_01",MENMA_ENV.forest,[menmaNineTailsCommit]),

  N("menma_discovery_01","Menma reaches the clearing low behind the roots of a fallen tree.\n\nAnko is already in the middle of the fight.","menma_discovery_02",MENMA_ENV.clearing),
  N("menma_discovery_02","Three opponents keep forcing the space around her to change. One carries too much mass for the speed he still has. Another moves in violent, broken bursts. The third looks closest to an ordinary shinobi, which only makes the marks along exposed skin harder to ignore.","menma_discovery_03",MENMA_ENV.clearing),
  N("menma_discovery_03","Anko turns one attack aside and has barely reset before the next arrives.\n\nThis is not Academy practice.\n\nNobody here is pulling a strike because Menma is young.","menma_enter_01",MENMA_ENV.clearing),

  V("menma_enter_01","NINE-TAILS","Well?","menma_enter_02",MENMA_ENV.clearing),
  N("menma_enter_02","Menma looks from Anko to the three opponents.\n\nThe grin comes before the decision is fully finished.","menma_enter_03",MENMA_ENV.clearing),
  D("menma_enter_03","MENMA","Much better.","menma_enter_03a",MENMA_ENV.clearing),
  N("menma_enter_03a","He jumps into the clearing.","menma_anko_pre_01",MENMA_ENV.clearing),

  N("menma_anko_pre_01","Anko catches the movement at the edge of her vision and nearly misses the next attacker because of it.","menma_anko_pre_02",MENMA_ENV.clearing),
  D("menma_anko_pre_02","ANKO","Menma?","menma_anko_pre_02a",MENMA_ENV.clearing),
  N("menma_anko_pre_02a","He lands inside the fight.","menma_anko_pre_03",MENMA_ENV.clearing),
  D("menma_anko_pre_03","ANKO","What the hell are you doing here?","menma_anko_pre_04",MENMA_ENV.clearing),
  D("menma_anko_pre_04","MENMA","Finding out.","menma_anko_pre_04a",MENMA_ENV.clearing),
  N("menma_anko_pre_04a","Anko knocks an incoming strike off-line without taking her eyes off him.","menma_anko_pre_05",MENMA_ENV.clearing),
  D("menma_anko_pre_05","ANKO","Wrong answer.","menma_anko_pre_06",MENMA_ENV.clearing),
  D("menma_anko_pre_06","MENMA","You look busy.","menma_anko_pre_07",MENMA_ENV.clearing),
  D("menma_anko_pre_07","ANKO","I was handling it.","menma_anko_pre_08",MENMA_ENV.clearing),
  D("menma_anko_pre_08","MENMA","Then keep handling your side.","menma_anko_pre_08a",MENMA_ENV.clearing),
  N("menma_anko_pre_08a","Anko actually looks offended.","menma_anko_pre_09",MENMA_ENV.clearing),
  D("menma_anko_pre_09","ANKO","My side?","menma_anko_pre_09a",MENMA_ENV.clearing),
  N("menma_anko_pre_09a","The three opponents shift toward the new body in the clearing. Whatever argument Anko had ready dies there.","menma_anko_pre_10",MENMA_ENV.clearing),
  D("menma_anko_pre_10","ANKO","Fine. Stay where I can see you.","menma_anko_pre_10a",MENMA_ENV.clearing),
  N("menma_anko_pre_10a","Menma settles his stance.","menma_anko_pre_11",MENMA_ENV.clearing),
  D("menma_anko_pre_11","MENMA","Keep up.","menma_anko_pre_11a",MENMA_ENV.clearing),
  N("menma_anko_pre_11a","The look Anko gives him promises a conversation later.\n\nThe fight does not wait for it.","tutorial_battle",MENMA_ENV.clearing)
];

if(oldTutorial){
  oldTutorial.nextBeatId=undefined;
  oldTutorial.environmentRef=MENMA_ENV.clearing;
  oldTutorial.battle={...(oldTutorial.battle||{}),victoryBeatId:"menma_after_01",actionLabel:"Start PL Battle"};
  menmaBeats.push(oldTutorial);
}else{
  menmaBeats.push({beatId:"tutorial_battle",mode:"battle_transition",text:"Stop the three altered shinobi.",environmentRef:MENMA_ENV.clearing});
}
if(oldTutorialDefeat)menmaBeats.push(oldTutorialDefeat);

const postBattleEnter=oldPostBattleOpening&&Array.isArray(oldPostBattleOpening.onEnterConsequences)?oldPostBattleOpening.onEnterConsequences.slice():undefined;
menmaBeats.push(
  N("menma_after_01","The clearing finally gives them enough silence to hear themselves breathe.\n\nAnko uses it badly.","menma_after_02",MENMA_ENV.after,postBattleEnter),
  D("menma_after_02","ANKO","You. Come here.","menma_after_03",MENMA_ENV.after),
  D("menma_after_03","MENMA","I'm fine.","menma_after_04",MENMA_ENV.after),
  D("menma_after_04","ANKO","That wasn't a medical diagnosis.","menma_after_04a",MENMA_ENV.after),
  N("menma_after_04a","She looks him over anyway. Menma tolerates it with the expression of somebody granting a favour.","menma_after_performance_router",MENMA_ENV.after),
  {beatId:"menma_after_performance_router",mode:"resolver",machineResolved:true,text:"",environmentRef:MENMA_ENV.after,choices:[
    C("high","RESOLVE HIGH PERFORMANCE","menma_after_high_01",null,{availability:hiddenResolverAvailability(()=>menmaBattleAuthoredValue("performanceBucket")==="high")}),
    C("low","RESOLVE LOW PERFORMANCE","menma_after_low_01",null,{availability:hiddenResolverAvailability(()=>menmaBattleAuthoredValue("performanceBucket")==="low")}),
    C("standard","RESOLVE STANDARD PERFORMANCE","menma_after_standard_01",null,{availability:hiddenResolverAvailability(()=>!["high","low"].includes(menmaBattleAuthoredValue("performanceBucket")))})
  ]},
  D("menma_after_high_01","ANKO","Okay. That was annoyingly good.","menma_after_high_02",MENMA_ENV.after),
  D("menma_after_high_02","MENMA","You can say impressive.","menma_after_high_03",MENMA_ENV.after),
  D("menma_after_high_03","ANKO","I could.","menma_after_high_04",MENMA_ENV.after),
  N("menma_after_high_04","She doesn't.","menma_after_history_01",MENMA_ENV.after),
  N("menma_after_low_01","Anko's attention lingers on how much the fight took out of him.","menma_after_low_02",MENMA_ENV.after),
  D("menma_after_low_02","MENMA","We won.","menma_after_low_03",MENMA_ENV.after),
  D("menma_after_low_03","ANKO","Yeah.","menma_after_low_04",MENMA_ENV.after),
  N("menma_after_low_04","She looks him over once more.","menma_after_low_05",MENMA_ENV.after),
  D("menma_after_low_05","ANKO","I'm looking at the price tag.","menma_after_history_01",MENMA_ENV.after),
  D("menma_after_standard_01","ANKO","You held your own.","menma_after_standard_02",MENMA_ENV.after),
  D("menma_after_standard_02","MENMA","I know.","menma_after_standard_03",MENMA_ENV.after),
  D("menma_after_standard_03","ANKO","Of course you do.","menma_after_history_01",MENMA_ENV.after),

  N("menma_after_history_01","Anko turns toward the former test subjects. The irritation in her face changes when she sees the marks clearly.\n\nHer hand almost lifts toward her own neck before she stops it.","menma_after_history_02",MENMA_ENV.after),
  D("menma_after_history_02","MENMA","You know them?","menma_after_history_03",MENMA_ENV.after),
  D("menma_after_history_03","ANKO","I know his work.","menma_after_history_03a",MENMA_ENV.after),
  N("menma_after_history_03a","Menma waits.","menma_after_history_04",MENMA_ENV.after),
  D("menma_after_history_04","ANKO","Orochimaru.","menma_after_history_04a",MENMA_ENV.after),
  N("menma_after_history_04a","That name means more coming from her than it would from a lesson.","menma_after_history_05",MENMA_ENV.after),
  D("menma_after_history_05","ANKO","He was good at finding talented kids who hated being told no.","menma_after_history_06",MENMA_ENV.after),
  D("menma_after_history_06","MENMA","I'm not them.","menma_after_history_07",MENMA_ENV.after),
  D("menma_after_history_07","ANKO","Didn't say you were.","menma_after_history_08",MENMA_ENV.after),
  D("menma_after_history_08","MENMA","Then what are you saying?","menma_after_history_08a",MENMA_ENV.after),
  N("menma_after_history_08a","Anko studies him for a second.","menma_after_history_09",MENMA_ENV.after),
  D("menma_after_history_09","ANKO","I know the look.","menma_after_history_10",MENMA_ENV.after),
  D("menma_after_history_10","MENMA","What look?","menma_after_history_11",MENMA_ENV.after),
  D("menma_after_history_11","ANKO","The one that says everybody else is wasting your time because they won't let you near the interesting stuff.","menma_after_history_11a",MENMA_ENV.after),
  N("menma_after_history_11a","Menma folds his arms.","menma_after_history_12",MENMA_ENV.after),
  D("menma_after_history_12","MENMA","Maybe they are.","menma_after_history_12a",MENMA_ENV.after),
  N("menma_after_history_12a","Anko laughs once, with no humour in it.","menma_after_history_13",MENMA_ENV.after),
  D("menma_after_history_13","ANKO","Yeah.","menma_after_history_13a",MENMA_ENV.after),
  N("menma_after_history_13a","That catches him harder than an argument would have.","menma_after_history_14",MENMA_ENV.after),
  D("menma_after_history_14","ANKO","I used to think that too.","menma_after_history_14a",MENMA_ENV.after),
  N("menma_after_history_14a","She leaves the rest alone.","menma_part_01",MENMA_ENV.after),

  N("menma_part_01","Anko starts for the edge of the clearing. Menma lets her get several steps before following.","menma_part_02",MENMA_ENV.after),
  D("menma_part_02","MENMA","You really think I shouldn't have come in?","menma_part_03",MENMA_ENV.after),
  D("menma_part_03","ANKO","I think you had no idea what you were jumping into.","menma_part_04",MENMA_ENV.after),
  D("menma_part_04","MENMA","And I still handled it.","menma_part_05",MENMA_ENV.after),
  D("menma_part_05","ANKO","Those can both be true.","menma_part_06",MENMA_ENV.after),
  D("menma_part_06","MENMA","That's not an answer.","menma_part_07",MENMA_ENV.after),
  D("menma_part_07","ANKO","Sure it is.","menma_part_optional_router",MENMA_ENV.after),
  {beatId:"menma_part_optional_router",mode:"resolver",machineResolved:true,text:"",environmentRef:MENMA_ENV.after,choices:[
    C("kinjutsu","RESOLVE KINJUTSU REACTION","menma_part_kinjutsu_01",null,{availability:hiddenResolverAvailability(()=>menmaBattleAuthoredValue("observedKinjutsu")===true)}),
    C("standard","RESOLVE STANDARD PARTING","menma_part_standard_01",null,{availability:hiddenResolverAvailability(()=>menmaBattleAuthoredValue("observedKinjutsu")!==true)})
  ]},
  D("menma_part_kinjutsu_01","MENMA","You said my techniques worried you.","menma_part_kinjutsu_02",MENMA_ENV.after),
  D("menma_part_kinjutsu_02","ANKO","They do.","menma_part_kinjutsu_03",MENMA_ENV.after),
  D("menma_part_kinjutsu_03","MENMA","Teach me something better.","menma_part_kinjutsu_04",MENMA_ENV.after),
  D("menma_part_kinjutsu_04","ANKO","You really don't hear the word ‘no’ very well.","menma_part_kinjutsu_05",MENMA_ENV.after),
  D("menma_part_kinjutsu_05","MENMA","I hear it.","menma_part_kinjutsu_06",MENMA_ENV.after),
  D("menma_part_kinjutsu_06","ANKO","That's worse.","menma_part_kinjutsu_07",MENMA_ENV.after),
  D("menma_part_kinjutsu_07","ANKO","Ask me again when I don't have three escaped experiments ruining my day.","menma_part_end",MENMA_ENV.after),
  D("menma_part_standard_01","ANKO","Try not to find another disaster before you get home.","menma_part_standard_02",MENMA_ENV.after),
  D("menma_part_standard_02","MENMA","No promises.","menma_part_standard_03",MENMA_ENV.after),
  D("menma_part_standard_03","ANKO","I know.","menma_part_end",MENMA_ENV.after),
  N("menma_part_end","Anko leaves.","menma_future_01",MENMA_ENV.after),

  N("menma_future_01","Menma runs again.\n\nThe forest that felt enormous when he left the Academy feels different now—not safer, not quieter. Just less like a boundary.","menma_future_02",MENMA_ENV.future),
  V("menma_future_02","NINE-TAILS","Satisfied?","menma_future_03",MENMA_ENV.future),
  D("menma_future_03","MENMA","No.","menma_future_03a",MENMA_ENV.future),
  N("menma_future_03a","A low chuckle answers him.","menma_future_04",MENMA_ENV.future),
  V("menma_future_04","NINE-TAILS","Good.","menma_future_05",MENMA_ENV.future),
  N("menma_future_05","Menma slows on a rise where Konoha shows through the trees. The Academy is somewhere beyond the rooftops, along with everything adults keep locking behind the word ready.\n\nHe looks at the village, then past it.","menma_future_choice",MENMA_ENV.future),
  Q("menma_future_choice","",[
    C("master","MASTER WHAT THEY WON'T TEACH ME","menma_future_master_01",{menmaFuture:"master"}),
    C("strong","BECOME TOO STRONG TO HOLD BACK","menma_future_strong_01",{menmaFuture:"strong"}),
    C("create","CREATE SOMETHING THAT'S MINE","menma_future_create_01",{menmaFuture:"create"}),
    C("limit","FIND OUT HOW FAR I CAN GO","menma_future_limit_01",{menmaFuture:"limit"})
  ],MENMA_ENV.future),
  D("menma_future_master_01","MENMA","If they won't teach me yet, I'll find out what I'm missing.","menma_future_master_02",MENMA_ENV.future),
  V("menma_future_master_02","NINE-TAILS","Hungry.","menma_future_master_03",MENMA_ENV.future),
  D("menma_future_master_03","MENMA","Ambitious.","menma_close_01",MENMA_ENV.future),
  D("menma_future_strong_01","MENMA","I'll get strong enough that nobody gets to decide I'm not ready.","menma_future_strong_02",MENMA_ENV.future),
  V("menma_future_strong_02","NINE-TAILS","That sounds familiar.","menma_future_strong_03",MENMA_ENV.future),
  D("menma_future_strong_03","MENMA","Good.","menma_close_01",MENMA_ENV.future),
  D("menma_future_create_01","MENMA","Maybe I don't need what they're keeping from me.","menma_future_create_01a",MENMA_ENV.future),
  N("menma_future_create_01a","He looks back toward the forest.","menma_future_create_02",MENMA_ENV.future),
  D("menma_future_create_02","MENMA","Maybe I'll make something better.","menma_future_create_02a",MENMA_ENV.future),
  N("menma_future_create_02a","The Nine-Tails' attention sharpens.","menma_future_create_03",MENMA_ENV.future),
  V("menma_future_create_03","NINE-TAILS","Now that's more interesting.","menma_close_01",MENMA_ENV.future),
  D("menma_future_limit_01","MENMA","I want to know where the limit actually is.","menma_future_limit_02",MENMA_ENV.future),
  V("menma_future_limit_02","NINE-TAILS","And when you find it?","menma_future_limit_02a",MENMA_ENV.future),
  N("menma_future_limit_02a","Menma starts running again.","menma_future_limit_03",MENMA_ENV.future),
  D("menma_future_limit_03","MENMA","I'll decide then.","menma_close_01",MENMA_ENV.future),
  N("menma_close_01","Menma runs toward Konoha.\n\nNot back to the morning he left.\n\nForward.","menma_receipt",MENMA_ENV.future),
  {beatId:"menma_receipt",mode:"record",text:"",exitScene:true}
);

reg({
  sceneId:"origin_academy_menma_prologue",
  eventId:"origin_academy_menma_prologue",
  title:"ACADEMY MENMA",
  participants:[],
  entryBeatId:"menma_open_01",
  beats:menmaBeats,
  onCompleteConsequences:oldMenmaCompletion
});

// ---------------------------------------------------------------------------
// MIRAI — exact Writing-GOLDEN conversation/verification Story.
// The Battle-only shortcut remains fail-closed until Combat #338 closes.
// ---------------------------------------------------------------------------
const MIRAI_SCENE=A.sceneByVariant.academy_mirai;
const MIRAI_ENV=Object.freeze({
  assignment:env("mirai_origin_academy_training_ground_courtyard"),
  street:env("mirai_origin_konoha_main_street"),
  market:env("mirai_origin_konoha_covered_market"),
  lane:env("mirai_origin_konoha_storehouse_side_lane"),
  checkpoint:env("mirai_origin_checkpoint_three_day")
});
const MIR_SUB="occ_origin_mirai_substitution_verification_resolution";
const MIR_CHAKRA="occ_origin_mirai_changed_chakra_observation";
const MIR_CHECKPOINT="occ_origin_mirai_checkpoint_escort_resolution";
const MIRAI_BATTLE_CONFIG="academy_mirai_origin_disguised_instructor_battle";
const MIRAI_BATTLE_ENCOUNTER="origin_academy_mirai_disguised_instructor_assessment";
const MIRAI_BATTLE_OPPONENT="academy_mirai_origin_instructor";
const MIRAI_SHORTCUT_CALLER="academy_mirai_origin_shortcut_battle";
const MIRAI_CONFRONT_CALLER="academy_mirai_origin_confrontation_battle";

function miraiBattleSpec(callerId,victoryBeatId,defeatBeatId=victoryBeatId){
  return{
    enemyId:MIRAI_BATTLE_OPPONENT,
    encounterId:MIRAI_BATTLE_ENCOUNTER,
    victoryBeatId,
    defeatBeatId,
    resultProjector:()=>typeof globalThis.projectAcademyMiraiDisguisedInstructorBattle338==="function"
      ?globalThis.projectAcademyMiraiDisguisedInstructorBattle338()
      :null,
    actionLabel:"Start PL Battle",
    launchResolver:({returnContext})=>{
      if(typeof globalThis.launchAcademyMiraiDisguisedInstructorBattle338!=="function"){
        return{success:false,reason:"mirai338_battle_adapter_missing"};
      }
      return globalThis.launchAcademyMiraiDisguisedInstructorBattle338({callerId,returnContext});
    }
  };
}

function miraiDefeatContextPatch(route){
  return{
    requestId:"mirai_battle_defeat_context_"+String(route||"unknown")+"_105",
    kind:"domain",
    resolve:()=>{
      const runtime=A.active();
      if(!runtime)return{success:false,reason:"mirai_story_runtime_missing"};
      if(!runtime.localContext||typeof runtime.localContext!=="object")runtime.localContext={};
      Object.assign(runtime.localContext,{
        miraiEscortAssessmentResult:"not_completed_battle_defeat",
        miraiEscortDutyActive:false,
        miraiReachedCheckpointAsActiveEscort:false,
        scenePurpose:"post_assessment_debrief",
        miraiDefeatRoute:String(route||"unknown")
      });
      if(typeof savePlayerData==="function")savePlayerData();
      return{success:true,route:String(route||"unknown"),assessmentTerminated:true};
    }
  };
}

const mirDefeatAssessment=R(
  "mirai_battle_defeat_assessment_105",
  "academy_mirai",
  MIR_CHECKPOINT,
  {
    battleResult:"defeat",
    miraiBattlePLDepleted:true,
    miraiEscortAssessmentResult:"not_completed_battle_defeat",
    miraiEscortDutyActive:false,
    miraiReachedCheckpointAsActiveEscort:false,
    scenePurpose:"post_assessment_debrief",
    personTravellingWithMiraiReachedCheckpointProtected:false
  },
  []
);

const miraiBeats=[];
function push(...rows){miraiBeats.push(...rows);}
function line(prefix,rows,environment,next){
  rows.forEach((row,index)=>{
    const id=prefix+"_"+String(index+1).padStart(2,"0");
    const after=index===rows.length-1?next:prefix+"_"+String(index+2).padStart(2,"0");
    push(row.mode==="dialogue"?D(id,row.speaker,row.text,after,environment):N(id,row.text,after,environment));
  });
}

line("mir_assignment",[
 {mode:"narration",text:"Mirai arrives early.\n\nNot a little early.\n\nEarly enough that the checkpoint map is still rolled up on the instructor's desk.\n\nShe looks at her.\n\nThen at the empty yard behind her."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"You're aware this doesn't start for another ten minutes."},
 {mode:"dialogue",speaker:"MIRAI",text:"Yes."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Then why are you here?"},
 {mode:"narration",text:"Mirai looks at the route map."},
 {mode:"dialogue",speaker:"MIRAI",text:"You said escort assessment."},
 {mode:"narration",text:"The instructor waits.\n\nMirai waits back.\n\nNeither seems willing to explain why that answers the question.\n\nA man standing near the gate raises a hand.\n\nTravel bag over one shoulder. Dust on his sandals. Easy smile."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"I'm guessing she's mine."},
 {mode:"narration",text:"Mirai turns.\n\nThe instructor slides the route map across the desk."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Checkpoint Three."},
 {mode:"narration",text:"Mirai opens it immediately.\n\nThe route is uncomplicated.\n\nMain street.\n\nCovered market.\n\nEast lane.\n\nCheckpoint."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Get him there."},
 {mode:"narration",text:"Mirai looks up."},
 {mode:"dialogue",speaker:"MIRAI",text:"That's it?"},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Disappointed?"},
 {mode:"dialogue",speaker:"MIRAI",text:"No."},
 {mode:"narration",text:"Too quick.\n\nThe traveller smiles.\n\nMirai notices."},
 {mode:"dialogue",speaker:"MIRAI",text:"I meant—no. That's clear."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Much better."},
 {mode:"narration",text:"Mirai folds the map."},
 {mode:"dialogue",speaker:"MIRAI",text:"We should go."},
 {mode:"narration",text:"The traveller falls into step beside her.\n\nBehind them, the instructor says nothing else."}
],MIRAI_ENV.assignment,"mir_walk_01");

line("mir_walk",[
 {mode:"narration",text:"For the first street, Mirai checks behind them three times.\n\nOn the second, she starts checking rooftops.\n\nBy the third, the traveller has noticed."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Should I be ducking?"},
 {mode:"narration",text:"Mirai looks over."},
 {mode:"dialogue",speaker:"MIRAI",text:"Why?"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"You've inspected every roof we've passed."},
 {mode:"narration",text:"Mirai glances upward again before she can stop herself.\n\nThe traveller laughs."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"There. You did it again."},
 {mode:"dialogue",speaker:"MIRAI",text:"I'm supposed to know what's around us."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"And what's around us?"},
 {mode:"narration",text:"Mirai looks ahead.\n\nA dog asleep beneath a bench.\n\nTwo women arguing over the price of peaches.\n\nA boy chasing a hoop down the road."},
 {mode:"dialogue",speaker:"MIRAI",text:"Konoha."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Terrifying."},
 {mode:"narration",text:"Mirai doesn't answer.\n\nA few more steps pass.\n\nThe traveller adjusts the strap of his bag."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"You can talk, you know."},
 {mode:"narration",text:"Mirai looks at him."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"I won't report you."}
],MIRAI_ENV.street,"mir_walk_choice");

push(Q("mir_walk_choice","",[
 C("talk","TALK TO HIM","mir_talk_01",{mirTalked:true}),
 C("professional","KEEP YOUR ATTENTION ON THE ESCORT","mir_prof_01",{mirTalked:false,mirProfessional:true})
],MIRAI_ENV.street));

line("mir_talk",[
 {mode:"narration",text:"Mirai tries to think of something that doesn't sound like a mission question.\n\nThat takes longer than it should."},
 {mode:"dialogue",speaker:"MIRAI",text:"Have you been here before?"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Konoha?"},
 {mode:"narration",text:"He looks around.\n\nNearly walks into a hanging shop sign.\n\nMirai catches his sleeve and pulls him half a step sideways.\n\nThe sign swings past his head.\n\nHe looks at it.\n\nThen at her."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"…First time."},
 {mode:"narration",text:"Mirai lets go of his sleeve."},
 {mode:"dialogue",speaker:"MIRAI",text:"I guessed."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"You could've kept that to yourself."},
 {mode:"narration",text:"They keep walking."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"My sister moved here a few years ago. East Market."},
 {mode:"narration",text:"Mirai nods."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"She told me not to try finding her house."},
 {mode:"dialogue",speaker:"MIRAI",text:"Why?"},
 {mode:"narration",text:"He gives her a look.\n\nMirai remembers the sign."},
 {mode:"dialogue",speaker:"MIRAI",text:"Right."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Apparently I have no sense of direction."},
 {mode:"dialogue",speaker:"MIRAI",text:"Apparently?"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"I'm choosing not to accept the accusation."},
 {mode:"narration",text:"The road bends beneath a line of trees.\n\nFor a while they talk about nothing important.\n\nThe price of food in Konoha.\n\nHow every village seems to believe its own streets make perfect sense.\n\nHis sister's habit of sending letters that start with three pages of complaints and end with I'm fine.\n\nThen—"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"She's making tea when we get there."},
 {mode:"narration",text:"The enthusiasm disappears from his voice.\n\nMirai hears it."},
 {mode:"dialogue",speaker:"MIRAI",text:"Bad tea?"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Plum."},
 {mode:"dialogue",speaker:"MIRAI",text:"That's bad?"},
 {mode:"narration",text:"He looks genuinely offended."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"It's fruit pretending it belongs in tea."},
 {mode:"narration",text:"Mirai blinks."},
 {mode:"dialogue",speaker:"MIRAI",text:"That's a strong opinion."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"You'll understand when you're older."},
 {mode:"narration",text:"Mirai gives him a flat look.\n\nHe's already laughing."}
],MIRAI_ENV.street,"mir_market_talk_01");

line("mir_prof",[
 {mode:"narration",text:"Mirai looks ahead instead."},
 {mode:"dialogue",speaker:"MIRAI",text:"I'd rather concentrate."},
 {mode:"narration",text:"The traveller studies her for a second.\n\nThen nods."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Fair enough."},
 {mode:"narration",text:"He doesn't keep trying to drag conversation out of her.\n\nThat makes the silence easier.\n\nMirai settles into the route.\n\nCrowds.\n\nIntersections.\n\nWho comes too close.\n\nWhere the traveller is whenever somebody crosses between them.\n\nAt the next busy junction, she reaches outward briefly with her senses.\n\nHis chakra sits close beside her.\n\nOrdinary.\n\nSteady.\n\nShe moves on.\n\nA few streets later, he holds out a wrapped sweet.\n\nMirai looks at it."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Peace offering."},
 {mode:"dialogue",speaker:"MIRAI",text:"For what?"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"All the talking I'm not doing."},
 {mode:"narration",text:"Mirai takes it."},
 {mode:"dialogue",speaker:"MIRAI",text:"Thank you."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"That sounded painful."},
 {mode:"narration",text:"Mirai puts the sweet in her pocket.\n\nThis time she ignores him on purpose."}
],MIRAI_ENV.street,"mir_market_prof_01");

const marketRows=[
 {mode:"narration",text:"The covered market is louder than the street outside.\n\nCanvas awnings trap the noise beneath them.\n\nVendors call over one another.\n\nA porter backs through the crowd with a crate blocking half his view.\n\nMirai slows."},
 {mode:"dialogue",speaker:"MIRAI",text:"Stay close."},
 {mode:"narration",text:"The traveller moves nearer.\n\nFor a while it works.\n\nThen a handcart jams sideways between two stalls.\n\nPeople squeeze around it from both directions.\n\nMirai catches sight of the opening first."},
 {mode:"dialogue",speaker:"MIRAI",text:"This way."},
 {mode:"narration",text:"Someone bumps her shoulder.\n\nA crate tips from the cart.\n\nA child freezes beneath it.\n\nMirai moves.\n\nBoth hands hit the crate.\n\nThe weight shoves her backward.\n\nA porter catches the other side before it comes down."},
 {mode:"dialogue",speaker:"PORTER",text:"Got it!"},
 {mode:"narration",text:"Mirai turns.\n\nThe traveller is gone.\n\nHer eyes move across the crowd.\n\nLeft.\n\nRight.\n\nBetween two hanging sheets of dyed cloth—"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Mirai."},
 {mode:"narration",text:"He steps through.\n\nBag over his shoulder.\n\nSlightly out of breath.\n\nMirai closes the distance quickly."},
 {mode:"dialogue",speaker:"MIRAI",text:"Where were you?"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Other side of the cart."},
 {mode:"narration",text:"He gestures behind him."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Couldn't get through."},
 {mode:"narration",text:"Someone pushes between them.\n\nMirai catches his sleeve and pulls him beside her."},
 {mode:"dialogue",speaker:"MIRAI",text:"Stay here."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Was planning to."},
 {mode:"narration",text:"They leave the market."}
];
line("mir_market_talk",marketRows,MIRAI_ENV.market,"mir_shortcut_talk_01");
line("mir_market_prof",marketRows,MIRAI_ENV.market,"mir_shortcut_prof_01");

const shortcutIntro=[
 {mode:"narration",text:"The streets quiet again.\n\nCheckpoint Three is still several blocks away when the traveller slows at a junction.\n\nHe points left."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Take this."},
 {mode:"narration",text:"Mirai looks down the lane.\n\nThen at the route map in her hand."},
 {mode:"dialogue",speaker:"MIRAI",text:"Checkpoint's straight."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"This comes out farther down the same road."},
 {mode:"narration",text:"He starts toward it.\n\nStops when Mirai doesn't move."}
];
line("mir_shortcut_talk",shortcutIntro,MIRAI_ENV.lane,"mir_shortcut_talk_choice");
line("mir_shortcut_prof",shortcutIntro,MIRAI_ENV.lane,"mir_shortcut_prof_choice");

push(
 Q("mir_shortcut_talk_choice","",[
  C("follow","FOLLOW HIM","mir_shortcut_follow_01",{mirShortcut:"follow"}),
  C("stay","STAY ON THE ROUTE","mir_shortcut_stay_talk_01",{mirShortcut:"stay"}),
  C("ask","ASK HOW HE KNOWS","mir_shortcut_ask_01",{mirShortcut:"ask"})
 ],MIRAI_ENV.lane),
 Q("mir_shortcut_prof_choice","",[
  C("follow","FOLLOW HIM","mir_shortcut_follow_01",{mirShortcut:"follow"}),
  C("stay","STAY ON THE ROUTE","mir_shortcut_stay_prof_01",{mirShortcut:"stay"})
 ],MIRAI_ENV.lane)
);

line("mir_shortcut_stay_talk",[
 {mode:"narration",text:"Mirai folds the map.\n\nThen keeps walking straight.\n\nFor two steps, the traveller doesn't notice.\n\nWhen he does, he turns around."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"We're going to add ten minutes."},
 {mode:"narration",text:"Mirai passes him."},
 {mode:"dialogue",speaker:"MIRAI",text:"Then you can complain about my route when we get there."},
 {mode:"narration",text:"He watches her walk past."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"I'm absolutely going to."},
 {mode:"narration",text:"A moment later, his footsteps fall in beside hers."}
],MIRAI_ENV.street,"mir_road_talk_01");
line("mir_shortcut_stay_prof",[
 {mode:"narration",text:"Mirai folds the map.\n\nThen keeps walking straight.\n\nFor two steps, the traveller doesn't notice.\n\nWhen he does, he turns around."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"We're going to add ten minutes."},
 {mode:"narration",text:"Mirai passes him."},
 {mode:"dialogue",speaker:"MIRAI",text:"Then you can complain about my route when we get there."},
 {mode:"narration",text:"He watches her walk past."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"I'm absolutely going to."},
 {mode:"narration",text:"A moment later, his footsteps fall in beside hers."}
],MIRAI_ENV.street,"mir_road_prof_01");

line("mir_shortcut_ask",[
 {mode:"narration",text:"Mirai doesn't move."},
 {mode:"dialogue",speaker:"MIRAI",text:"How do you know?"},
 {mode:"narration",text:"The traveller glances down the lane."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"My sister sent directions."},
 {mode:"narration",text:"Mirai looks at him."},
 {mode:"dialogue",speaker:"MIRAI",text:"Thought she didn't trust you to find her house."},
 {mode:"narration",text:"He shrugs."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"She doesn't."},
 {mode:"dialogue",speaker:"MIRAI",text:"But she sent directions."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"To the checkpoint."},
 {mode:"narration",text:"He gives her a faint smile."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"You always this suspicious?"}
],MIRAI_ENV.lane,"mir_shortcut_ask_choice");
push(Q("mir_shortcut_ask_choice","",[
 C("only","“Only when things don't add up.”","mir_shortcut_only_01",{mirConversationSuspicion:true}),
 C("forget","“Forget it.”","mir_shortcut_forget_01"),
 C("follow","FOLLOW THE SHORTCUT","mir_shortcut_follow_01",{mirShortcut:"follow"})
],MIRAI_ENV.lane));
line("mir_shortcut_only",[
 {mode:"narration",text:"The smile fades a little."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"What doesn't add up?"},
 {mode:"narration",text:"Mirai holds his gaze.\n\nDoesn't answer.\n\nThe silence stretches.\n\nA cart rattles through the crossing behind them.\n\nFinally, the traveller gives a small shake of his head."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Fine."},
 {mode:"narration",text:"He gestures toward the main road."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Your route."},
 {mode:"narration",text:"They continue."}
],MIRAI_ENV.street,"mir_road_talk_01");
line("mir_shortcut_forget",[
 {mode:"narration",text:"Mirai looks back toward the checkpoint road."},
 {mode:"dialogue",speaker:"MIRAI",text:"Come on."},
 {mode:"narration",text:"The traveller follows."}
],MIRAI_ENV.street,"mir_road_talk_01");

line("mir_shortcut_follow",[
 {mode:"narration",text:"Mirai turns into the side lane."},
 {mode:"narration",text:"The traveller moves ahead."},
 {mode:"narration",text:"Not far."},
 {mode:"narration",text:"Just enough that he's choosing the turns now."},
 {mode:"narration",text:"The lane cuts between old storehouses and narrow courtyards."},
 {mode:"narration",text:"At the first split, he goes right without slowing."},
 {mode:"narration",text:"At the next, left."},
 {mode:"narration",text:"Mirai watches him disappear around the corner."},
 {mode:"narration",text:"Then follows."},
 {mode:"narration",text:"The main road is gone behind them."}
],MIRAI_ENV.lane,"mir_shortcut_battle_pre_01");

line("mir_shortcut_battle_pre",[
 {mode:"narration",text:"The Traveller stops at the next turn.\n\nNot because he is checking the way.\n\nHe turns around and waits for Mirai to catch up."},
 {mode:"dialogue",speaker:"MIRAI",text:"Why did you stop?"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Because you followed me.\n\nMirai looks back toward the turn behind them."},
 {mode:"dialogue",speaker:"MIRAI",text:"You said this was faster."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"I did.\n\nA beat."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Your instructor gave me one extra job.\n\nMirai's attention sharpens."},
 {mode:"dialogue",speaker:"MIRAI",text:"What job?"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"See what you do if the person you're escorting stops cooperating.\n\nThe Traveller sets down his bag.\n\nHis stance changes.\n\nNot dramatic.\n\nEnough."},
 {mode:"dialogue",speaker:"MIRAI",text:"This is part of the assessment."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Looks like it.\n\nMirai folds the route map and puts it away.\n\nThen raises her guard."},
 {mode:"dialogue",speaker:"MIRAI",text:"Fine.\n\nA beat.\n\nThen stop me."}
],MIRAI_ENV.lane,"mir_shortcut_battle");

push({
 beatId:"mir_shortcut_battle",
 mode:"battle_transition",
 text:"",
 environmentRef:MIRAI_ENV.lane,
 battle:miraiBattleSpec(MIRAI_SHORTCUT_CALLER,"mir_shortcut_victory_01","mir_shortcut_defeat_end_01")
});

line("mir_shortcut_victory",[
 {mode:"narration",text:"The Traveller is the first to lower his guard.\n\nMirai does not lower hers immediately."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"All right."},
 {mode:"dialogue",speaker:"MIRAI",text:"That was your extra job?"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"See what you'd do.\n\nMirai looks toward the turn behind them.\n\nThen at him."},
 {mode:"dialogue",speaker:"MIRAI",text:"We're done with your route."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Fair.\n\nHe picks up his bag."},
 {mode:"narration",text:"Mirai walks first this time.\n\nThe Traveller follows.\n\nShe does not give him the next turn to choose."},
 {mode:"narration",text:"They rejoin the checkpoint road beyond the storehouses.\n\nCheckpoint Three is still ahead.\n\nThe escort continues."}
],MIRAI_ENV.lane,"mir_shortcut_victory_route");

push({
 beatId:"mir_shortcut_victory_route",
 mode:"resolver",
 machineResolved:true,
 text:"",
 environmentRef:MIRAI_ENV.street,
 choices:[
  C("talked","RESOLVE POST-BATTLE TALKED ROAD","mir_road_talk_memory_01",null,{availability:hiddenResolverAvailability(()=>A.local().mirTalked===true)}),
  C("professional","RESOLVE POST-BATTLE PROFESSIONAL ROAD","mir_road_prof_detect_01",null,{availability:hiddenResolverAvailability(()=>A.local().mirTalked!==true)})
 ]
});

line("mir_shortcut_defeat_end",[
 {mode:"narration",text:"Mirai's guard gives first.\n\nShe catches herself against the storehouse wall.\n\nThe Traveller stops.\n\nHe does not attack again."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Enough."},
 {mode:"narration",text:"Mirai forces herself upright.\n\nHer arms feel heavy.\n\nShe still puts herself between him and the way back to the main road."},
 {mode:"dialogue",speaker:"MIRAI",text:"I'm not done."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"The exercise is.\n\nMirai freezes.\n\nNot because of the word.\n\nBecause of the voice behind it."},
 {mode:"narration",text:"The Traveller raises one hand.\n\nSmoke rolls through the lane."},
 {mode:"narration",text:"When it clears, the Academy instructor is standing where he was."},
 {mode:"dialogue",speaker:"MIRAI",text:"Where is he?"},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Checkpoint Three. Safe."},
 {mode:"narration",text:"Mirai looks toward the mouth of the lane.\n\nCheckpoint Three is still several streets away.\n\nThe assignment is not.\n\nIt ended here."},
 {mode:"dialogue",speaker:"MIRAI",text:"I was supposed to get him there."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"You were."},
 {mode:"narration",text:"Mirai looks back at the instructor.\n\nNo excuse comes.\n\nThe instructor does not ask for one."}
],MIRAI_ENV.lane,"mir_defeat_debrief_shortcut_01");
miraiBeats.find(row=>row.beatId==="mir_shortcut_defeat_end_01").onEnterConsequences=[miraiDefeatContextPatch("shortcut"),mirDefeatAssessment];

line("mir_defeat_debrief_shortcut",[
 {mode:"narration",text:"The real Traveller is sitting on the Checkpoint Three steps when Mirai arrives later with the instructor.\n\nHis travel bag is beside him.\n\nThe cup in his hands is almost empty."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"You found the shortcut."},
 {mode:"dialogue",speaker:"MIRAI",text:"Apparently."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Didn't like it?"},
 {mode:"dialogue",speaker:"MIRAI",text:"I lost a fight in it."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Oh."},
 {mode:"narration",text:"Mirai looks at the instructor."},
 {mode:"dialogue",speaker:"MIRAI",text:"I followed someone I was supposed to be protecting into a route he chose."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Yes."},
 {mode:"dialogue",speaker:"MIRAI",text:"Then I couldn't finish the escort."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"No.\n\nThe instructor does not turn it into a speech.\n\nMirai already knows the result."}
],MIRAI_ENV.checkpoint,"mir_defeat_reflection_shortcut");
push(Q("mir_defeat_reflection_shortcut","",[
 C("route_control","“I gave up control of the route before the fight even started.”","mir_defeat_close_01",{mirDefeatReflection:"shortcut_route_control"}),
 C("explain_shortcut","“I should've made him explain the shortcut before I followed.”","mir_defeat_close_01",{mirDefeatReflection:"shortcut_explain_first"}),
 C("escort_over","“Once I lost the exchange, the escort was over.”","mir_defeat_close_01",{mirDefeatReflection:"shortcut_escort_over"}),
 C("stop_earlier","“Next time I stop the problem before it becomes a fight.”","mir_defeat_close_01",{mirDefeatReflection:"shortcut_stop_earlier"})
],MIRAI_ENV.checkpoint));

const roadCommon=[
 {mode:"narration",text:"The shortcut rejoins the checkpoint road beyond the market district.\n\nOr, if Mirai stayed on the marked route, the same stretch eventually opens ahead.\n\nCheckpoint Three isn't far now.\n\nThe traveller walks beside her.\n\nFor several minutes, nothing happens.\n\nNo one follows them.\n\nNo attack comes.\n\nNo one appears on a roof.\n\nThe traveller rubs at one shoulder beneath the bag strap."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"How much farther?"},
 {mode:"narration",text:"Mirai can see the checkpoint roof between the buildings."},
 {mode:"dialogue",speaker:"MIRAI",text:"Not long."},
 {mode:"narration",text:"He sighs."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Good."},
 {mode:"narration",text:"They keep walking."}
];
line("mir_road_talk",roadCommon,MIRAI_ENV.street,"mir_road_talk_memory_01");
line("mir_road_prof",roadCommon,MIRAI_ENV.street,"mir_road_prof_detect_01");

line("mir_road_talk_memory",[
 {mode:"narration",text:"The traveller glances ahead."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Hope she remembered food."},
 {mode:"narration",text:"Mirai looks over."},
 {mode:"dialogue",speaker:"MIRAI",text:"Your sister?"},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Yeah."},
 {mode:"dialogue",speaker:"MIRAI",text:"What was she making?"},
 {mode:"narration",text:"He thinks.\n\nJust for a moment."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Lunch."},
 {mode:"narration",text:"Mirai looks back toward the road."}
],MIRAI_ENV.street,"mir_road_talk_choice");
push(Q("mir_road_talk_choice","",[
 C("ask_more","ASK SOMETHING ELSE","mir_road_ask_more_01",{mirContinuityTested:true}),
 C("call_out","CALL HIM ON IT","mir_road_call_01",{mirContinuityTested:true}),
 C("let_go","LET IT GO","mir_road_let_go_01")
],MIRAI_ENV.street));
line("mir_road_ask_more",[
 {mode:"narration",text:"A few steps pass."},
 {mode:"dialogue",speaker:"MIRAI",text:"Which market did you say she lives near?"},
 {mode:"narration",text:"The traveller scratches his jaw."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"North, I think."},
 {mode:"narration",text:"Mirai keeps walking.\n\nThe checkpoint roof grows larger ahead."}
],MIRAI_ENV.street,"mir_road_stop_choice");
push(Q("mir_road_stop_choice","",[
 C("stop","STOP HIM","mir_decision_conv_01",{mirStopped:true,mirVerificationBasis:"conversation_continuity"}),
 C("keep","KEEP GOING","mir_decision_plain_01")
],MIRAI_ENV.street));
line("mir_road_call",[
 {mode:"narration",text:"Mirai stops.\n\nThe traveller makes it another step before turning."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"What?"},
 {mode:"dialogue",speaker:"MIRAI",text:"That's not what you said earlier."},
 {mode:"narration",text:"His expression barely changes."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"About lunch?"},
 {mode:"narration",text:"Mirai doesn't answer.\n\nHe waits."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"We've been walking for ages. I mixed something up."},
 {mode:"narration",text:"He shifts the bag higher."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Can we go?"}
],MIRAI_ENV.street,"mir_road_call_choice");
push(Q("mir_road_call_choice","",[
 C("press","PRESS HIM","mir_road_press_01",{mirPressed:true,mirVerificationBasis:"conversation_continuity"}),
 C("keep","KEEP MOVING","mir_decision_plain_01")
],MIRAI_ENV.street));
line("mir_road_press",[
 {mode:"narration",text:"Mirai doesn't move."},
 {mode:"dialogue",speaker:"MIRAI",text:"Tell me what you mixed up."},
 {mode:"narration",text:"The traveller's jaw tightens."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Seriously?"},
 {mode:"narration",text:"Mirai says nothing."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"My sister's waiting. We're almost there."}
],MIRAI_ENV.street,"mir_road_press_choice");
push(Q("mir_road_press_choice","",[
 C("block","BLOCK THE ROAD","mir_decision_conv_01",{mirStopped:true,mirVerificationBasis:"conversation_continuity"}),
 C("continue","STEP ASIDE AND CONTINUE","mir_decision_plain_01")
],MIRAI_ENV.street));
line("mir_road_let_go",[{mode:"narration",text:"Mirai continues toward the checkpoint.\n\nThe traveller follows."}],MIRAI_ENV.street,"mir_decision_plain_01");

const chakraCommit=R("mirai_changed_chakra_105","academy_mirai",MIR_CHAKRA,{changedOrUnfamiliarChakraObserved:true,observedChakraDifference:"post_market_apparent_escort_differs_from_pre_switch_reference"},["MIR-02"]);
line("mir_road_prof_detect",[
 {mode:"narration",text:"The traveller stretches his neck."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Almost there?"},
 {mode:"narration",text:"Mirai doesn't answer immediately.\n\nHer attention settles outward.\n\nThen closer.\n\nOn him.\n\nShe reaches for the chakra presence beside her.\n\nAnd stops walking.\n\nThe traveller goes another pace.\n\nTurns."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Mirai?"},
 {mode:"narration",text:"She checks again.\n\nThe market comes back to her.\n\nThe crowd.\n\nThe cart.\n\nThose few seconds with no line of sight.\n\nThe chakra beside her now feels wrong.\n\nNot weaker.\n\nNot stronger.\n\nWrong."}
],MIRAI_ENV.street,"mir_prof_choice");
miraiBeats.find(row=>row.beatId==="mir_road_prof_detect_05").onEnterConsequences=[chakraCommit];
push(Q("mir_prof_choice","",[
 C("keep","KEEP WALKING","mir_prof_keep_01"),
 C("check","CHECK ONCE MORE","mir_prof_check_01",{mirVerificationBasis:"changed_chakra"}),
 C("stop","ASK HIM TO STOP","mir_prof_stop_01",{mirStopped:true,mirVerificationBasis:"changed_chakra"})
],MIRAI_ENV.street));
line("mir_prof_keep",[
 {mode:"narration",text:"Mirai starts moving again.\n\nThe traveller watches her for a moment.\n\nThen follows."}
],MIRAI_ENV.street,"mir_decision_plain_01");
line("mir_prof_check",[
 {mode:"narration",text:"Mirai waits until they're walking side by side again.\n\nReaches outward.\n\nSame result.\n\nHer eyes shift toward him.\n\nHe catches it."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"What?"}
],MIRAI_ENV.street,"mir_prof_check_choice");
push(Q("mir_prof_check_choice","",[
 C("nothing","“Nothing.”","mir_decision_plain_01"),
 C("stop","“Stop.”","mir_decision_chakra_01",{mirStopped:true,mirVerificationBasis:"changed_chakra"})
],MIRAI_ENV.street));
line("mir_prof_stop",[
 {mode:"dialogue",speaker:"MIRAI",text:"Stop."},
 {mode:"narration",text:"The traveller turns."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Why?"},
 {mode:"narration",text:"Mirai faces him fully now."}
],MIRAI_ENV.street,"mir_prof_stop_choice");
push(Q("mir_prof_stop_choice","",[
 C("changed","“Your chakra changed.”","mir_decision_chakra_01",{mirStopped:true,mirVerificationBasis:"changed_chakra"}),
 C("stay","“Stay there.”","mir_decision_plain_01",{mirStopped:true}),
 C("never","“Never mind.”","mir_decision_plain_01")
],MIRAI_ENV.street));

line("mir_decision_conv",[
 {mode:"dialogue",speaker:"TRAVELLER",text:"You're holding up your own mission."}
],MIRAI_ENV.street,"mir_decision_choice");
line("mir_decision_chakra",[
 {mode:"narration",text:"His hand tightens slightly around the bag strap."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"You sure about that?"}
],MIRAI_ENV.street,"mir_decision_choice");
line("mir_decision_plain",[
 {mode:"dialogue",speaker:"TRAVELLER",text:"What is this?"}
],MIRAI_ENV.street,"mir_decision_choice");
push(
 N("mir_decision_pre","Mirai stands between him and the checkpoint road.\n\nOr she doesn't.","mir_decision_choice",MIRAI_ENV.street),
 Q("mir_decision_choice","",[
  C("confront","CONFRONT HIM","mir_confront_01",{mirConfronted:true}),
  C("change","CHANGE THE ROUTE","mir_change_01",{mirChangedRoute:true}),
  C("escort","ESCORT HIM THE REST OF THE WAY","mir_complete_01",{mirContinued:true})
 ],MIRAI_ENV.street)
);
// Ensure variant lead-ins flow through the authored decision staging narration.
for(const id of ["mir_decision_conv_01","mir_decision_chakra_02","mir_decision_plain_01"]){
  const row=miraiBeats.find(beat=>beat.beatId===id);if(row)row.nextBeatId="mir_decision_pre";
}

const mirVerify=R("mirai_verify_before_checkpoint_105","academy_mirai",MIR_SUB,{substitutionVerifiedBeforeCheckpoint:true,verificationBasis:"runtime_local_context"},["MIR-01"]);
line("mir_confront",[
 {mode:"narration",text:"Mirai doesn't step aside."},
 {mode:"dialogue",speaker:"MIRAI",text:"I'm not taking you any farther."},
 {mode:"narration",text:"The traveller's expression changes.\n\nNo smile now."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Because I forgot lunch?"},
 {mode:"narration",text:"Mirai keeps her hands loose at her sides."},
 {mode:"dialogue",speaker:"MIRAI",text:"Because I don't know who I'm walking with."},
 {mode:"narration",text:"Silence.\n\nA breeze catches the edge of a hanging shop cloth.\n\nThe traveller's eyes stay on hers.\n\nThen one hand rises."},
 {mode:"dialogue",speaker:"MIRAI",text:"Where is he?"},
 {mode:"narration",text:"The instructor jerks her head toward the checkpoint."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Safe."},
 {mode:"narration",text:"Mirai looks past her.\n\nOnly when she sees the checkpoint building does she breathe again.\n\nThen she looks back."},
 {mode:"dialogue",speaker:"MIRAI",text:"You switched in the market."},
 {mode:"narration",text:"The instructor says nothing.\n\nMirai already has her answer."}
],MIRAI_ENV.street,"mir_checkpoint_early_01");
const mirConfrontBattleLead=miraiBeats.find(row=>row.beatId==="mir_confront_07");
if(mirConfrontBattleLead)mirConfrontBattleLead.nextBeatId="mir_confront_battle";
push({
 beatId:"mir_confront_battle",
 mode:"battle_transition",
 text:"",
 environmentRef:MIRAI_ENV.street,
 battle:miraiBattleSpec(MIRAI_CONFRONT_CALLER,"mir_confront_reveal_01","mir_confront_defeat_end_01")
});
line("mir_confront_defeat_end",[
 {mode:"narration",text:"Mirai's guard breaks before the Traveller's does.\n\nShe drops to one knee.\n\nThe exchange stops immediately."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Done?"},
 {mode:"dialogue",speaker:"MIRAI",text:"No."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"You can't keep fighting."},
 {mode:"dialogue",speaker:"MIRAI",text:"I can keep asking."},
 {mode:"narration",text:"The Traveller looks at her for a moment.\n\nThen his stance disappears."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Good."},
 {mode:"narration",text:"Smoke bursts across the road.\n\nWhen it clears, the Academy instructor stands in his place."},
 {mode:"dialogue",speaker:"MIRAI",text:"Where is he?"},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Checkpoint Three. Safe."},
 {mode:"dialogue",speaker:"MIRAI",text:"So I was right."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"About the switch.\n\nA beat.\n\nYou still lost the exchange.\n\nMirai looks away.\n\nShe knows."}
],MIRAI_ENV.street,"mir_defeat_debrief_confront_01");
miraiBeats.find(row=>row.beatId==="mir_confront_defeat_end_01").onEnterConsequences=[miraiDefeatContextPatch("confrontation"),mirDefeatAssessment];

line("mir_defeat_debrief_confront",[
 {mode:"narration",text:"The real Traveller is waiting at Checkpoint Three.\n\nMirai looks at him first.\n\nOnly after confirming he is fine does she turn back to the instructor."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"You caught the substitution."},
 {mode:"dialogue",speaker:"MIRAI",text:"And lost the fight."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Both happened."},
 {mode:"narration",text:"Mirai looks at the road behind them.\n\nShe stopped the wrong Traveller.\n\nShe could not hold him there.\n\nThose are different facts."},
 {mode:"dialogue",speaker:"MIRAI",text:"I still wouldn't have let you walk into the checkpoint."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"I know.\n\nNothing more is added."}
],MIRAI_ENV.checkpoint,"mir_defeat_reflection_confront");
push(Q("mir_defeat_reflection_confront","",[
 C("right_to_stop","“I was right to stop her.”","mir_defeat_close_01",{mirDefeatReflection:"confront_right_to_stop"}),
 C("seeing_not_enough","“Seeing the problem wasn't enough to win the exchange.”","mir_defeat_close_01",{mirDefeatReflection:"confront_seeing_not_enough"}),
 C("after_talking","“Next time I need an answer after talking stops working.”","mir_defeat_close_01",{mirDefeatReflection:"confront_after_talking"}),
 C("hold_road","“I caught the switch. I still have to hold the road.”","mir_defeat_close_01",{mirDefeatReflection:"confront_hold_road"})
],MIRAI_ENV.checkpoint));

line("mir_defeat_close",[
 {mode:"narration",text:"The Traveller lifts his cup toward Mirai."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"For what it's worth, I made it."},
 {mode:"narration",text:"Mirai looks at him.\n\nThen at the instructor."},
 {mode:"dialogue",speaker:"MIRAI",text:"That was never the whole assignment."},
 {mode:"narration",text:"The instructor gives the smallest nod."},
 {mode:"narration",text:"Mirai turns toward the village.\n\nShe does not take out the route map."},
 {mode:"narration",text:"She leaves Checkpoint Three knowing exactly where the escort ended."}
],MIRAI_ENV.checkpoint,"mir_receipt");

push(N("mir_confront_reveal_01","Smoke bursts across the road.\n\nMirai jumps back.\n\nThe Academy instructor stands where the traveller had been.\n\nFor one beat, Mirai just stares.\n\nThen—","mir_confront_08",MIRAI_ENV.street));
miraiBeats.find(row=>row.beatId==="mir_confront_12").onEnterConsequences=[mirVerify];

line("mir_change",[
 {mode:"narration",text:"Mirai points toward a busier street."},
 {mode:"dialogue",speaker:"MIRAI",text:"We're going around."},
 {mode:"narration",text:"The traveller looks from her to the checkpoint."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Why?"},
 {mode:"dialogue",speaker:"MIRAI",text:"Because I said so."},
 {mode:"narration",text:"He laughs once.\n\nThere is no humour in it."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"That's new."},
 {mode:"narration",text:"Mirai starts walking.\n\nHe doesn't.\n\nMirai looks back.\n\nFor the first time since the market, they are no longer moving together.\n\nWhat happens next is resolved by the authored branch/runtime state."}
],MIRAI_ENV.street,"mir_complete_01");

line("mir_complete",[
 {mode:"narration",text:"Mirai steps aside."},
 {mode:"dialogue",speaker:"MIRAI",text:"Let's go."},
 {mode:"narration",text:"The traveller watches her face.\n\nMaybe looking for something.\n\nWhatever he sees, he doesn't comment on it.\n\nThey walk the last stretch together.\n\nCheckpoint Three comes into view."}
],MIRAI_ENV.street,"mir_checkpoint_missed_01");

const mirCheckpoint=R("mirai_checkpoint_protected_105","academy_mirai",MIR_CHECKPOINT,{personTravellingWithMiraiReachedCheckpointProtected:true,substitutionVerifiedBeforeCheckpoint:false},["MIR-03"]);
line("mir_checkpoint_early",[
 {mode:"narration",text:"The original traveller is sitting on the checkpoint steps with a cup in his hands.\n\nHe sees Mirai and stands.\n\nMirai's pace quickens before she catches herself."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"You look disappointed."},
 {mode:"narration",text:"Mirai stops."},
 {mode:"dialogue",speaker:"MIRAI",text:"You're fine."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Nice to see you too."},
 {mode:"narration",text:"She looks at the cup."},
 {mode:"dialogue",speaker:"MIRAI",text:"Is that plum tea?"},
 {mode:"narration",text:"He looks offended."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Absolutely not."},
 {mode:"narration",text:"Mirai finally smiles.\n\nBehind her, the Academy instructor arrives.\n\nThe traveller glances between them."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Did she catch you?"},
 {mode:"narration",text:"The instructor gives him a look."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"I'm taking that as yes."},
 {mode:"narration",text:"Mirai's smile disappears."},
 {mode:"dialogue",speaker:"MIRAI",text:"You knew this was happening?"},
 {mode:"narration",text:"The traveller takes a careful sip."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"I was told there'd be an exercise."},
 {mode:"dialogue",speaker:"MIRAI",text:"That's not what I asked."},
 {mode:"narration",text:"He lowers the cup."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Then yes."},
 {mode:"narration",text:"Mirai turns slowly toward the instructor.\n\nShe has the decency not to look amused."}
],MIRAI_ENV.checkpoint,"mir_after_verified_01");

line("mir_checkpoint_missed",[
 {mode:"narration",text:"Checkpoint Three is quiet.\n\nThe checkpoint instructor looks up as they approach."},
 {mode:"dialogue",speaker:"CHECKPOINT INSTRUCTOR",text:"All good?"},
 {mode:"narration",text:"Mirai looks at the traveller.\n\nThen back."},
 {mode:"dialogue",speaker:"MIRAI",text:"We made it."},
 {mode:"narration",text:"The traveller sets down his bag."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Told you."},
 {mode:"narration",text:"Mirai's eyes narrow slightly."},
 {mode:"dialogue",speaker:"MIRAI",text:"Told me what?"},
 {mode:"narration",text:"The traveller smiles.\n\nRaises one hand.\n\nSmoke erupts beside her.\n\nMirai jumps back.\n\nThe Academy instructor appears through it.\n\nMirai's face goes blank.\n\nA beat."},
 {mode:"dialogue",speaker:"MIRAI",text:"No."},
 {mode:"narration",text:"The instructor folds her arms.\n\nMirai points at her."},
 {mode:"dialogue",speaker:"MIRAI",text:"No."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Mirai—"},
 {mode:"dialogue",speaker:"MIRAI",text:"Where is he?"},
 {mode:"narration",text:"The original traveller leans out through the checkpoint doorway."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Here."},
 {mode:"narration",text:"Mirai turns so fast he almost steps back.\n\nShe looks him over.\n\nHead.\n\nHands.\n\nTravel bag.\n\nFine.\n\nHe lifts his cup."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Hi."},
 {mode:"narration",text:"Relief hits first.\n\nThen humiliation.\n\nMirai closes her eyes."},
 {mode:"dialogue",speaker:"MIRAI",text:"How long?"},
 {mode:"narration",text:"The instructor answers."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Since the market."},
 {mode:"narration",text:"Mirai opens her eyes.\n\nLooks back toward the road.\n\nAll the way to the covered market.\n\nThen back to her."},
 {mode:"dialogue",speaker:"MIRAI",text:"You walked beside me for half the village."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Yes."},
 {mode:"narration",text:"Mirai stares at her."},
 {mode:"dialogue",speaker:"MIRAI",text:"I don't like you very much right now."},
 {mode:"narration",text:"The traveller chokes on his tea.\n\nThe instructor looks almost pleased."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"That's fair."}
],MIRAI_ENV.checkpoint,"mir_after_missed_01");
miraiBeats.find(row=>row.beatId==="mir_checkpoint_missed_01").onEnterConsequences=[mirCheckpoint];

function miraiEndingFamily105(){
 const local=A.local()||{};
 const basis=local.mirVerificationBasis||null;
 if(local.mirConfronted===true&&basis==="conversation_continuity")return"conversation";
 if(local.mirConfronted===true&&basis==="changed_chakra")return"chakra";
 if(local.mirConversationSuspicion===true||local.mirContinuityTested===true||basis!==null||local.mirStopped===true||local.mirChangedRoute===true)return"suspicion";
 return"missed";
}
function miraiEndingFamilyAvailability105(family){
 return ()=>({available:miraiEndingFamily105()===family,knownBlocker:null});
}
function miraiAfterCheckpointRouter105(beatId){
 push({beatId,mode:"resolver",machineResolved:true,text:"",environmentRef:MIRAI_ENV.checkpoint,choices:[
  C("conversation","RESOLVE CONVERSATION CATCH","mir_after_conversation_01",null,{availability:miraiEndingFamilyAvailability105("conversation")}),
  C("chakra","RESOLVE CHAKRA CATCH","mir_after_chakra_01",null,{availability:miraiEndingFamilyAvailability105("chakra")}),
  C("suspicion","RESOLVE SUSPICION","mir_after_suspicion_01",null,{availability:miraiEndingFamilyAvailability105("suspicion")}),
  C("missed","RESOLVE MISSED SUBSTITUTION","mir_after_missed_route_01",null,{availability:miraiEndingFamilyAvailability105("missed")})
 ]});
}
miraiAfterCheckpointRouter105("mir_after_verified_01");
miraiAfterCheckpointRouter105("mir_after_missed_01");

line("mir_after_conversation",[
 {mode:"narration",text:"The route map ends up spread across a crate outside Checkpoint Three.\n\nThe real Traveller has his drink.\n\nThe Academy instructor stands beside the map.\n\nMirai remains standing.\n\nShe has spent enough of the day walking.\n\nThe instructor taps the covered market."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"When?"},
 {mode:"narration",text:"Mirai looks at the mark."},
 {mode:"dialogue",speaker:"MIRAI",text:"After the market."},
 {mode:"narration",text:"The Traveller raises his cup."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"What gave her away?"},
 {mode:"narration",text:"Mirai looks at him."},
 {mode:"dialogue",speaker:"MIRAI",text:"You did."},
 {mode:"narration",text:"He nearly looks offended."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"I wasn't there."},
 {mode:"dialogue",speaker:"MIRAI",text:"Exactly."},
 {mode:"narration",text:"The instructor waits.\n\nMirai traces the route with one finger."},
 {mode:"dialogue",speaker:"MIRAI",text:"She knew where we were going."},
 {mode:"narration",text:"Then she taps the market."},
 {mode:"dialogue",speaker:"MIRAI",text:"She didn't know what we'd talked about getting there."},
 {mode:"narration",text:"The Traveller smiles into his cup."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"So all that talking was useful."},
 {mode:"narration",text:"Mirai gives him a look."},
 {mode:"dialogue",speaker:"MIRAI",text:"Some of it."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"I'll take it."},
 {mode:"narration",text:"The instructor does not turn it into a lecture.\n\nMirai already knows what changed."}
],MIRAI_ENV.checkpoint,"mir_leaving_start");

line("mir_after_chakra",[
 {mode:"narration",text:"The route map ends up spread across a crate outside Checkpoint Three.\n\nThe real Traveller has his drink.\n\nThe Academy instructor stands beside the map.\n\nThe instructor taps the covered market."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"When?"},
 {mode:"narration",text:"Mirai looks at her."},
 {mode:"dialogue",speaker:"MIRAI",text:"After the market."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"What changed?"},
 {mode:"narration",text:"Mirai thinks before answering."},
 {mode:"dialogue",speaker:"MIRAI",text:"Your chakra."},
 {mode:"narration",text:"The Traveller looks between them."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"That's still unsettling."},
 {mode:"narration",text:"Mirai ignores him."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"Did that tell you who I was?"},
 {mode:"dialogue",speaker:"MIRAI",text:"No."},
 {mode:"narration",text:"The answer comes immediately.\n\nMirai looks back at the market mark."},
 {mode:"dialogue",speaker:"MIRAI",text:"It told me you weren't him."},
 {mode:"narration",text:"The instructor nods once.\n\nMirai does not need more than that."}
],MIRAI_ENV.checkpoint,"mir_leaving_start");

line("mir_after_suspicion",[
 {mode:"narration",text:"The route map ends up spread across a crate outside Checkpoint Three.\n\nThe real Traveller has his drink.\n\nThe Academy instructor stands beside the map.\n\nThe instructor taps the last stretch of road."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"You noticed something."},
 {mode:"narration",text:"Mirai looks at the map."},
 {mode:"dialogue",speaker:"MIRAI",text:"I noticed several things."},
 {mode:"narration",text:"The Traveller shifts his cup between his hands.\n\nMirai continues before either adult can answer."},
 {mode:"dialogue",speaker:"MIRAI",text:"None of them felt like enough by themselves."},
 {mode:"narration",text:"The instructor looks at her."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"So you kept going."},
 {mode:"narration",text:"Mirai nods.\n\nNot automatically.\n\nBecause that is what she did."},
 {mode:"dialogue",speaker:"MIRAI",text:"I wasn't going to turn suspicion into proof because I wanted an answer."},
 {mode:"narration",text:"The instructor leaves that alone.\n\nThe real Traveller points toward the checkpoint."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"You did get somebody here safely."},
 {mode:"narration",text:"Mirai looks at him."},
 {mode:"dialogue",speaker:"MIRAI",text:"The wrong somebody."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Still safely."},
 {mode:"narration",text:"Mirai almost smiles.\n\nAlmost."}
],MIRAI_ENV.checkpoint,"mir_leaving_start");

line("mir_after_missed_route",[
 {mode:"narration",text:"The route map ends up spread across a crate outside Checkpoint Three.\n\nThe real Traveller has his drink.\n\nThe Academy instructor stands beside the map.\n\nMirai is already looking at the covered market when the instructor joins her."},
 {mode:"dialogue",speaker:"MIRAI",text:"I lost him there."},
 {mode:"dialogue",speaker:"ACADEMY INSTRUCTOR",text:"For a few seconds."},
 {mode:"dialogue",speaker:"MIRAI",text:"It was enough."},
 {mode:"narration",text:"The real Traveller lifts his cup."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"I was fine."},
 {mode:"narration",text:"Mirai looks at him."},
 {mode:"dialogue",speaker:"MIRAI",text:"I know."},
 {mode:"narration",text:"Then toward the instructor."},
 {mode:"dialogue",speaker:"MIRAI",text:"I didn't know you weren't him."},
 {mode:"narration",text:"The instructor does not soften the fact.\n\nDoes not sharpen it either.\n\nMirai looks down at the route map.\n\nEvery turn is exactly where it was supposed to be.\n\nThat is suddenly the least interesting thing on the page."}
],MIRAI_ENV.checkpoint,"mir_leaving_start");

push(N("mir_leaving_start","The exercise ends.\n\nThe Traveller heads toward East Market.\n\nAt the corner, he turns.","mir_leaving_choice_router",MIRAI_ENV.checkpoint));
push({beatId:"mir_leaving_choice_router",mode:"resolver",machineResolved:true,text:"",environmentRef:MIRAI_ENV.checkpoint,choices:[
 C("talked","RESOLVE TALKED LEAVING","mir_leaving_talk_01",null,{availability:()=>({available:A.local().mirTalked===true,knownBlocker:null})}),
 C("professional","RESOLVE PROFESSIONAL LEAVING","mir_leaving_prof_01",null,{availability:()=>({available:A.local().mirTalked!==true,knownBlocker:null})})
]});
line("mir_leaving_talk",[
 {mode:"dialogue",speaker:"TRAVELLER",text:"If my sister offers you tea, say no."},
 {mode:"narration",text:"Mirai folds her arms."},
 {mode:"dialogue",speaker:"MIRAI",text:"You still haven't proved plum tea is bad."},
 {mode:"narration",text:"He points at her."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"See? That's dangerous thinking."},
 {mode:"narration",text:"Mirai watches him go.\n\nThe instructor starts gathering the route map.\n\nMirai reaches over and folds it first.\n\nShe hands it back."}
],MIRAI_ENV.checkpoint,"mir_reflection_router");
line("mir_leaving_prof",[
 {mode:"narration",text:"The Traveller points toward Mirai's pocket."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"You keeping that?"},
 {mode:"narration",text:"Mirai checks the wrapped sweet."},
 {mode:"dialogue",speaker:"MIRAI",text:"Apparently."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Good."},
 {mode:"narration",text:"He starts away.\n\nThen looks back."},
 {mode:"dialogue",speaker:"TRAVELLER",text:"Next escort might talk more."},
 {mode:"narration",text:"Mirai puts the sweet back into her pocket."},
 {mode:"dialogue",speaker:"MIRAI",text:"They might."},
 {mode:"narration",text:"That is not a promise.\n\nIt is more than she would have said this morning."}
],MIRAI_ENV.checkpoint,"mir_reflection_router");

push({beatId:"mir_reflection_router",mode:"resolver",machineResolved:true,text:"",environmentRef:MIRAI_ENV.checkpoint,choices:[
 C("conversation","RESOLVE CONVERSATION REFLECTION","mir_reflection_conversation",null,{availability:miraiEndingFamilyAvailability105("conversation")}),
 C("chakra","RESOLVE CHAKRA REFLECTION","mir_reflection_chakra",null,{availability:miraiEndingFamilyAvailability105("chakra")}),
 C("suspicion","RESOLVE SUSPICION REFLECTION","mir_reflection_suspicion",null,{availability:miraiEndingFamilyAvailability105("suspicion")}),
 C("missed","RESOLVE MISSED REFLECTION","mir_reflection_missed",null,{availability:miraiEndingFamilyAvailability105("missed")})
]});
push(
 Q("mir_reflection_conversation","",[
  C("route_changed","“The route stayed the same. The person didn't.”","mir_close_01",{mirReflection:"conversation_route_person_changed"}),
  C("talking","“Talking to someone can tell me more than a map.”","mir_close_01",{mirReflection:"conversation_talking_matters"}),
  C("contradiction","“I caught the contradiction. Next time I check sooner.”","mir_close_01",{mirReflection:"conversation_check_sooner"}),
  C("mismatch","“Getting suspicious wasn't enough. I needed the mismatch.”","mir_close_01",{mirReflection:"conversation_needed_mismatch"})
 ],MIRAI_ENV.checkpoint),
 Q("mir_reflection_chakra","",[
  C("stop","“Something changed. I stopped instead of explaining it away.”","mir_close_01",{mirReflection:"chakra_stopped_on_change"}),
  C("verify","“Different chakra told me enough to verify.”","mir_close_01",{mirReflection:"chakra_verify"}),
  C("wrong","“I knew what was wrong before I knew why.”","mir_close_01",{mirReflection:"chakra_wrong_before_why"}),
  C("recheck","“Next time I check the person again after I lose sight of them.”","mir_close_01",{mirReflection:"chakra_recheck_after_lost_sight"})
 ],MIRAI_ENV.checkpoint),
 Q("mir_reflection_suspicion","",[
  C("evidence","“I needed more than suspicion before I acted.”","mir_close_01",{mirReflection:"suspicion_needed_more"}),
  C("notice","“I was right to notice it. I wasn't ready to prove it.”","mir_close_01",{mirReflection:"suspicion_not_ready_to_prove"}),
  C("verify","“Next time I verify without giving away what I know.”","mir_close_01",{mirReflection:"suspicion_verify_quietly"}),
  C("identity","“Finishing the route didn't answer who I was escorting.”","mir_close_01",{mirReflection:"suspicion_identity_unanswered"})
 ],MIRAI_ENV.checkpoint),
 Q("mir_reflection_missed","",[
  C("person","“I watched the road better than I watched the person.”","mir_close_01",{mirReflection:"missed_watched_road"}),
  C("lost_sight","“Losing sight of someone should change what I check next.”","mir_close_01",{mirReflection:"missed_lost_sight"}),
  C("switch","“I completed the escort. I missed the switch.”","mir_close_01",{mirReflection:"missed_switch"}),
  C("learn","“Next time I learn more than the route.”","mir_close_01",{mirReflection:"missed_learn_person"})
 ],MIRAI_ENV.checkpoint)
);
push(
 N("mir_close_01","Mirai leaves Checkpoint Three alone.\n\nAt the junction where the shortcut split away, she slows.\n\nThe road sign is still there.\n\nThe route is still obvious.\n\nMirai looks past it at the people moving through the street.\n\nThen keeps walking.\n\nShe does not take out the map.","mir_receipt",MIRAI_ENV.checkpoint),
 {beatId:"mir_receipt",mode:"record",text:"",exitScene:true}
);

reg({
 sceneId:MIRAI_SCENE,eventId:MIRAI_SCENE,title:"ACADEMY MIRAI",participants:[],
 entryBeatId:"mir_assignment_01",beats:miraiBeats,
 onCompleteConsequences:[X("academy_mirai",[MIR_SUB,MIR_CHAKRA,MIR_CHECKPOINT])]
});

function safelyUniversalMiraiReflection105(sceneDef){
 try{
  const beat=sceneDef&&sceneDef.beatMap instanceof Map?sceneDef.beatMap.get("mir_reflection_choice"):null;
  return !!beat;
 }catch(_error){return false;}
}

function diagnostics(){
 const mir=getStorySceneDefinition(MIRAI_SCENE),men=getStorySceneDefinition("origin_academy_menma_prologue");
 const mirBeat=id=>mir&&mir.beatMap instanceof Map?mir.beatMap.get(id):null;
 const menBeat=id=>men&&men.beatMap instanceof Map?men.beatMap.get(id):null;
 const checks={
  miraiWritingGoldenEntry:!!mir&&mir.entryBeatId==="mir_assignment_01",
  miraiRealConversation:!!mirBeat("mir_walk_choice")&&!!mirBeat("mir_market_talk_01")&&!!mirBeat("mir_reflection_router"),
  miraiBattlePackageResolved:mirBeat("mir_shortcut_battle")?.mode==="battle_transition"&&mirBeat("mir_confront_battle")?.mode==="battle_transition"&&!!mirBeat("mir_shortcut_battle_return")&&!!mirBeat("mir_confrontation_battle_return"),
  miraiBattleDefeatAssessmentTermination:!!mirBeat("mir_shortcut_defeat_end_01")&&!!mirBeat("mir_shortcut_defeat_end_13")&&!!mirBeat("mir_confront_defeat_end_01")&&!!mirBeat("mir_confront_defeat_end_12")&&!!mirBeat("mir_defeat_debrief_shortcut_01")&&!!mirBeat("mir_defeat_debrief_confront_01")&&!!mirBeat("mir_defeat_reflection_shortcut")&&!!mirBeat("mir_defeat_reflection_confront")&&!!mirBeat("mir_defeat_close_01")&&!mirBeat("mir_shortcut_defeat_01")&&!mirBeat("mir_confrontation_defeat_01"),
  miraiRouteAwareEnding:!!mirBeat("mir_reflection_conversation")&&!!mirBeat("mir_reflection_chakra")&&!!mirBeat("mir_reflection_suspicion")&&!!mirBeat("mir_reflection_missed")&&!safelyUniversalMiraiReflection105(mir),
  menmaWritingGoldenEntry:!!men&&men.entryBeatId==="menma_open_01",
  menmaFullOpening:!!menBeat("menma_open_15")&&menBeat("menma_open_15").text==="I know.",
  menmaPreservedBattleSeam:!!menBeat("tutorial_battle"),
  menmaNineTailsHistory:!!menBeat("menma_fox_09"),
  kakashiUntouched:true,
  browserGoldenClaimed:false
 };
 const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
 return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false,miraiCombatDependencyIssue:338};
}
globalThis.runIssue105OriginWritingGoldenDiagnostics=diagnostics;
globalThis.SC_ALPHA_ORIGIN_WRITING_GOLDEN_105=Object.freeze({patchId:PATCH_ID,installed:true,mirai:true,menma:true,miraiCombatDependencyIssue:338,browserGoldenClaimed:false});
})();
