// ALPHA ORIGIN 32900 — Kushina / Kurenai / Iwabee / Metal Lee.
(function installAlphaOrigin32900B(){
"use strict";
const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)throw new Error("alpha_origin_32900_core_required");
const C=A.choice.bind(A),R=A.commitRequest.bind(A),X=A.completionRequest.bind(A);

// Kushina — sealing crisis and optional accidental Gerotora first contact.
(()=>{
  const seal="occ_origin_kushina_residual_seal_work_resolution";
  const identity="occ_origin_kushina_gerotora_identity_disclosure";
  const cause="occ_origin_kushina_gerotora_causal_explanation";
  const joint="occ_origin_kushina_joint_residual_seal_closure";
  const contact="occ_origin_kushina_gerotora_first_contact";
  const scene=A.sceneByVariant.academy_kushina;
  const courtyard=Object.freeze({environmentId:"konoha_academy_courtyard_day"});
  const courtyardBackdrop="Scene backdrops/academy_training_ground_courtyard.png";
  try{
    const registerBackdrop=typeof registerSceneBackdropAssetPath==="function"
      ?registerSceneBackdropAssetPath
      :(typeof globalThis.registerSceneBackdropAssetPath==="function"?globalThis.registerSceneBackdropAssetPath:null);
    if(registerBackdrop)registerBackdrop(courtyard.environmentId,courtyardBackdrop);
  }catch(_error){}
  const sealCommit=R("kushina_seal_resolution_32900","academy_kushina",seal,
    ctx=>({qualifyingFuinjutsuWorkCompleted:["correct_formula","contain_damaged_seal"].includes(ctx.kushinaCrisisChoice),crisisChoice:ctx.kushinaCrisisChoice||null}),
    ctx=>["correct_formula","contain_damaged_seal"].includes(ctx.kushinaCrisisChoice)?["KUS-01"]:[]);
  const firstContactCommit=R("kushina_first_contact_32900","academy_kushina",contact,{gerotoraFirstContactOccurred:true},["KUS-05"],{participantRefs:["key_gero"]});
  const identityCommit=R("kushina_identity_32900","academy_kushina",identity,ctx=>({gerotoraCommunicatedOwnIdentity:ctx.kushinaGerotoraChoice==="ask_who"}),ctx=>ctx.kushinaGerotoraChoice==="ask_who"?["KUS-02"]:[],{participantRefs:["key_gero"]});
  const causeCommit=R("kushina_cause_32900","academy_kushina",cause,ctx=>({gerotoraExplainedResidualFormulaInference:ctx.kushinaGerotoraChoice==="ask_what_happened"}),ctx=>ctx.kushinaGerotoraChoice==="ask_what_happened"?["KUS-03"]:[],{participantRefs:["key_gero"]});
  const jointCommit=R("kushina_joint_32900","academy_kushina",joint,ctx=>({jointResidualSealClosureWithGerotora:ctx.kushinaGerotoraChoice==="help_close"}),ctx=>ctx.kushinaGerotoraChoice==="help_close"?["KUS-04"]:[],{participantRefs:["key_gero"]});
  const contactKnowledgeCommits=[identityCommit,causeCommit,jointCommit];
  const N=(beatId,text,nextBeatId,extra={})=>({beatId,mode:"narration",environmentRef:courtyard,text,...(nextBeatId?{nextBeatId}:{}),...extra});
  const D=(beatId,speakerName,text,nextBeatId,extra={})=>({beatId,mode:"dialogue",speakerName,environmentRef:courtyard,text,...(nextBeatId?{nextBeatId}:{}),...extra});
  const Q=(beatId,text,choices)=>({beatId,mode:"choice",environmentRef:courtyard,text,choices});
  const hidden=predicate=>()=>({available:!!predicate(),knownBlocker:null});
  A.register({sceneId:scene,eventId:scene,title:"ACADEMY KUSHINA",entryBeatId:"kus_practical_01",participants:[],beats:[
    N("kus_practical_01","The practice scroll lies open between Kushina and another Academy student.\n\nThe instructor has already made them redraw the outer ring twice.\n\nKushina stares at the line in front of her.","kus_practical_02"),
    D("kus_practical_02","KUSHINA","It was fine the first time.","kus_practical_03"),
    D("kus_practical_03","CLASSMATE","You said that about the second one too.","kus_practical_04"),
    D("kus_practical_04","KUSHINA","Because it was.","kus_practical_05"),
    N("kus_practical_05","The instructor walks past.\n\nDoes not stop.","kus_practical_06"),
    D("kus_practical_06","INSTRUCTOR","If you're both finished arguing with the ink, finish the seal.","kus_practical_07"),
    D("kus_practical_07","KUSHINA","I wasn't arguing.","kus_practical_08"),
    N("kus_practical_08","The classmate looks at her.\n\nKushina looks back.","kus_practical_09"),
    D("kus_practical_09","KUSHINA","I was right.","kus_practical_10"),
    N("kus_practical_10","The classmate laughs.\n\nKushina returns to the scroll.\n\nThis part she likes.\n\nLines have reasons. Connections either close or they do not. If something is wrong, there is somewhere to look.\n\nShe places the next mark. The classmate adds theirs.\n\nFor one breath, the pattern settles.\n\nThen an inked line shivers.\n\nKushina's expression changes.","kus_practical_11"),
    D("kus_practical_11","KUSHINA","Wait.","kus_break_01"),
    N("kus_break_01","The classmate's hand stops.\n\nToo late.\n\nChakra spits through the damaged line. The scroll bucks against the courtyard stone. The classmate freezes with both hands still hovering over it.\n\nA second pulse gathers under the ink.\n\nThe instructor turns from across the yard.\n\nKushina is closer. She has time to do one thing first.","kus_crisis"),
    Q("kus_crisis","",[
      C("protect_student","GET THE STUDENT CLEAR","kus_protect_student_01",{kushinaCrisisChoice:"protect_student"}),
      C("contain_damaged_seal","CONTAIN THE DAMAGED SEAL","kus_contain_seal_01",{kushinaCrisisChoice:"contain_damaged_seal"}),
      C("move_unstable_object","MOVE THE SCROLL TO THE SAFETY LANE","kus_move_object_01",{kushinaCrisisChoice:"move_unstable_object"}),
      C("correct_formula","CORRECT THE FORMULA","kus_reverse_01",{kushinaCrisisChoice:"correct_formula"})
    ]),

    N("kus_protect_student_01","Kushina does not touch the formula.\n\nShe grabs the classmate instead.\n\nThe next pulse tears across the stone as she yanks them backward. Both hit the ground outside the marked practice area.\n\nThe classmate jerks their arm free.","kus_protect_student_02"),
    D("kus_protect_student_02","CLASSMATE","I could've moved.","kus_protect_student_03"),
    N("kus_protect_student_03","Kushina sits up.","kus_protect_student_04"),
    D("kus_protect_student_04","KUSHINA","You were still staring at it.","kus_protect_student_05"),
    N("kus_protect_student_05","The classmate opens their mouth. Looks at the scorched mark where their knees had been. Closes it again.\n\nThe instructor reaches the scroll and seals the leaking edge from outside the exercise. The courtyard goes quiet.\n\nKushina gets to her feet. The classmate brushes dust from one sleeve.","kus_protect_student_06"),
    D("kus_protect_student_06","CLASSMATE","You didn't have to throw me.","kus_protect_student_07"),
    D("kus_protect_student_07","KUSHINA","You want me to put you back?","kus_protect_student_08"),
    D("kus_protect_student_08","CLASSMATE","No.","kus_protect_student_09"),
    D("kus_protect_student_09","KUSHINA","Then we're done.","kus_protect_student_10"),
    N("kus_protect_student_10","The classmate fights a smile.\n\nThe instructor hears all of it.","kus_protect_student_11"),
    D("kus_protect_student_11","INSTRUCTOR","The exercise isn't.","kus_protect_student_12"),
    N("kus_protect_student_12","Kushina looks at the ruined scroll.","kus_protect_student_13"),
    D("kus_protect_student_13","KUSHINA","That one is.","kus_protect_student_14"),
    N("kus_protect_student_14","The instructor checks the secured formula. Then looks at her.","kus_protect_student_15"),
    D("kus_protect_student_15","INSTRUCTOR","Why the student?","kus_protect_student_16"),
    N("kus_protect_student_16","Kushina looks genuinely confused by the question.","kus_protect_student_17"),
    D("kus_protect_student_17","KUSHINA","Because they were closer to exploding than I was.","kus_protect_student_18"),
    D("kus_protect_student_18","CLASSMATE","That is not how that sentence works.","kus_protect_student_19"),
    D("kus_protect_student_19","KUSHINA","You know what I mean.","kus_protect_student_20"),
    N("kus_protect_student_20","The instructor does. He marks something on the exercise sheet. Kushina immediately leans to see it. He moves the sheet out of reach.","kus_protect_student_21"),
    D("kus_protect_student_21","KUSHINA","Hey.","kus_protect_student_22"),
    D("kus_protect_student_22","INSTRUCTOR","Next practical.","kus_protect_student_23"),
    N("kus_protect_student_23","Kushina folds her arms. The classmate bumps her shoulder on the way past.","kus_protect_student_24"),
    D("kus_protect_student_24","CLASSMATE","Thanks.","kus_protect_student_25"),
    N("kus_protect_student_25","Kushina looks at them. A beat.","kus_protect_student_26"),
    D("kus_protect_student_26","KUSHINA","Move faster next time.","kus_protect_close_01"),
    N("kus_protect_close_01","At the courtyard gate, Kushina looks back at the replaced practice scroll.\n\nThe classmate is already arguing with the next formula. Kushina calls across the yard.","kus_protect_close_02"),
    D("kus_protect_close_02","KUSHINA","Don't stare at it this time!","kus_protect_close_03"),
    D("kus_protect_close_03","CLASSMATE","Go home!","kus_protect_close_04"),
    N("kus_protect_close_04","Kushina laughs and leaves.",null,{onEnterConsequences:[sealCommit],exitScene:true}),

    N("kus_contain_seal_01","Kushina drops beside the scroll.\n\nThe original pattern is already torn too badly to restore before the next pulse. She stops trying.\n\nHer fingers move to the damaged edge instead. New line. New boundary. Close the leak first.\n\nThe chakra hits the replacement boundary and pushes. Kushina pushes back. The classmate scrambles clear without being told.\n\nThe line seals. The loose chakra folds back inside it.\n\nStillness.\n\nThe instructor reaches them a moment later. He looks at the formula. Then at Kushina.","kus_contain_seal_02"),
    D("kus_contain_seal_02","INSTRUCTOR","That's not the original formula.","kus_contain_seal_03"),
    D("kus_contain_seal_03","KUSHINA","It doesn't need to be pretty. It needs to stop leaking.","kus_contain_seal_04"),
    N("kus_contain_seal_04","The classmate peers over her shoulder.","kus_contain_seal_05"),
    D("kus_contain_seal_05","CLASSMATE","It is definitely not pretty.","kus_contain_seal_06"),
    N("kus_contain_seal_06","Kushina turns her head slowly.","kus_contain_seal_07"),
    D("kus_contain_seal_07","CLASSMATE","But it stopped leaking.","kus_contain_seal_08"),
    D("kus_contain_seal_08","KUSHINA","Exactly.","kus_contain_seal_09"),
    N("kus_contain_seal_09","The instructor traces one finger above the new boundary without touching it.","kus_contain_seal_10"),
    D("kus_contain_seal_10","INSTRUCTOR","Why change the exercise?","kus_contain_seal_11"),
    D("kus_contain_seal_11","KUSHINA","Because the exercise broke.","kus_contain_seal_12"),
    D("kus_contain_seal_12","INSTRUCTOR","And if I wanted the original restored?","kus_contain_seal_13"),
    N("kus_contain_seal_13","Kushina points at the contained scroll.","kus_contain_seal_14"),
    D("kus_contain_seal_14","KUSHINA","Then now you have time.","kus_contain_seal_15"),
    N("kus_contain_seal_15","The instructor looks at her. Kushina waits for the argument. It does not come.","kus_contain_seal_16"),
    D("kus_contain_seal_16","INSTRUCTOR","Good.","kus_contain_seal_17"),
    D("kus_contain_seal_17","KUSHINA","That's it?","kus_contain_seal_18"),
    D("kus_contain_seal_18","INSTRUCTOR","Would you prefer I complain?","kus_contain_seal_19"),
    N("kus_contain_seal_19","Kushina looks at the ugly containment line. Then at him.","kus_contain_seal_20"),
    D("kus_contain_seal_20","KUSHINA","I can think of a few things.","kus_contain_close_01"),
    N("kus_contain_close_01","The classmate laughs.\n\nThe instructor gives Kushina a clean practice sheet before she leaves. She takes one look at it.","kus_contain_close_02"),
    D("kus_contain_close_02","KUSHINA","Again?","kus_contain_close_03"),
    D("kus_contain_close_03","INSTRUCTOR","The original formula this time.","kus_contain_close_04"),
    N("kus_contain_close_04","Kushina tucks it under her arm.","kus_contain_close_05"),
    D("kus_contain_close_05","KUSHINA","Fine.","kus_contain_close_06"),
    N("kus_contain_close_06","She takes two steps. Looks back.","kus_contain_close_07"),
    D("kus_contain_close_07","KUSHINA","Mine worked.","kus_contain_close_08"),
    D("kus_contain_close_08","INSTRUCTOR","Go home, Kushina.","kus_contain_close_09"),
    N("kus_contain_close_09","She grins and does.",null,{onEnterConsequences:[sealCommit],exitScene:true}),

    N("kus_move_object_01","The scroll jumps again. Kushina grabs it.\n\nThe instructor sees what she is doing.","kus_move_object_02"),
    D("kus_move_object_02","INSTRUCTOR","Kushina—","kus_move_object_03"),
    N("kus_move_object_03","Too late.\n\nShe hurls the unstable scroll into the cleared safety lane. It lands on empty stone. The pulse detonates across the marked space with nobody inside it.\n\nThe classmate flinches. Kushina does not. Much.\n\nThe instructor is already moving.","kus_move_object_04"),
    D("kus_move_object_04","INSTRUCTOR","That was not the assignment.","kus_move_object_05"),
    N("kus_move_object_05","Kushina points at the smoking safety lane.","kus_move_object_06"),
    D("kus_move_object_06","KUSHINA","Neither was exploding.","kus_move_object_07"),
    N("kus_move_object_07","The classmate looks from Kushina to the scroll.","kus_move_object_08"),
    D("kus_move_object_08","CLASSMATE","You just threw a seal.","kus_move_object_09"),
    D("kus_move_object_09","KUSHINA","I threw a scroll.","kus_move_object_10"),
    D("kus_move_object_10","CLASSMATE","With a seal on it.","kus_move_object_11"),
    D("kus_move_object_11","KUSHINA","Into the place labelled safe.","kus_move_object_12"),
    N("kus_move_object_12","The instructor reaches the object and locks the remaining chakra down. Only after it is secured does he turn around.","kus_move_object_13"),
    D("kus_move_object_13","INSTRUCTOR","Why there?","kus_move_object_14"),
    N("kus_move_object_14","She points at the painted lane.","kus_move_object_15"),
    D("kus_move_object_15","KUSHINA","Because nobody was standing in it.","kus_move_object_16"),
    D("kus_move_object_16","INSTRUCTOR","And if the impact had made the break worse?","kus_move_object_17"),
    N("kus_move_object_17","Kushina looks at the student beside her. Then at the empty lane.","kus_move_object_18"),
    D("kus_move_object_18","KUSHINA","Then it would've been worse over there.","kus_move_object_19"),
    N("kus_move_object_19","The instructor studies her. Not approval. Not disapproval. Thinking.\n\nThe classmate nudges Kushina.","kus_move_object_20"),
    D("kus_move_object_20","CLASSMATE","He hates that answer.","kus_move_object_21"),
    N("kus_move_object_21","Kushina keeps her eyes on the instructor.","kus_move_object_22"),
    D("kus_move_object_22","KUSHINA","He can hate it after he tells me I'm wrong.","kus_move_object_23"),
    N("kus_move_object_23","The instructor exhales.","kus_move_object_24"),
    D("kus_move_object_24","INSTRUCTOR","Next time, warn me before you throw the assignment across the courtyard.","kus_move_object_25"),
    N("kus_move_object_25","Kushina smiles.","kus_move_object_26"),
    D("kus_move_object_26","KUSHINA","So there is a next time.","kus_move_close_01"),
    N("kus_move_close_01","The instructor immediately regrets his wording.\n\nAs Kushina heads for the gate, the classmate catches up.","kus_move_close_02"),
    D("kus_move_close_02","CLASSMATE","Were you actually sure that would work?","kus_move_close_03"),
    N("kus_move_close_03","Kushina keeps walking.","kus_move_close_04"),
    D("kus_move_close_04","KUSHINA","I was sure you weren't standing in the safety lane.","kus_move_close_05"),
    D("kus_move_close_05","CLASSMATE","That's not what I asked.","kus_move_close_06"),
    N("kus_move_close_06","Kushina glances sideways.","kus_move_close_07"),
    D("kus_move_close_07","KUSHINA","It was enough.","kus_move_close_08"),
    N("kus_move_close_08","The classmate thinks about that. Then nods.\n\nThey leave the courtyard together.",null,{onEnterConsequences:[sealCommit],exitScene:true}),

    N("kus_reverse_01","Kushina drops beside the scroll.\n\nThe formula did not fail everywhere. One connection stopped closing where it should have. That is different. That is fixable.\n\nThe classmate backs away. Kushina redraws the damaged line.","kus_reverse_02",{onEnterConsequences:[sealCommit]}),
    D("kus_reverse_02","INSTRUCTOR","Careful.","kus_reverse_03"),
    D("kus_reverse_03","KUSHINA","I know.","kus_reverse_04"),
    N("kus_reverse_04","The connection closes. For half a heartbeat, the entire pattern settles perfectly. Kushina smiles.\n\nThen the scroll flashes white. Her smile disappears.\n\nThe formula folds inward. Not like paper. Like the courtyard has suddenly opened somewhere deeper than the stone beneath it.\n\nKushina throws one arm across her eyes. The classmate yelps. The instructor moves toward them.\n\nThe light vanishes. Something lands beside the scroll with a soft thump.\n\nSilence.\n\nKushina lowers her arm. A toad is sitting in the middle of the Academy courtyard. The toad looks around. At the scroll. At Kushina. At the instructor. Back to Kushina.","kus_gero_01",{onEnterConsequences:[firstContactCommit]}),
    D("kus_gero_01","TOAD","...That is not where I was.","kus_gero_02"),
    N("kus_gero_02","Kushina stares.","kus_gero_03"),
    D("kus_gero_03","KUSHINA","You're a toad.","kus_gero_04"),
    D("kus_gero_04","TOAD","Excellent observation.","kus_gero_05"),
    N("kus_gero_05","Behind Kushina—","kus_gero_06"),
    D("kus_gero_06","CLASSMATE","Did you do that?","kus_gero_07"),
    N("kus_gero_07","Kushina looks over her shoulder.","kus_gero_08"),
    D("kus_gero_08","KUSHINA","Obviously not on purpose!","kus_gero_09"),
    N("kus_gero_09","The instructor holds one hand out toward both students.","kus_gero_10"),
    D("kus_gero_10","INSTRUCTOR","Nobody touch the formula.","kus_gero_11"),
    N("kus_gero_11","The toad looks down at the formula beneath him.","kus_gero_12"),
    D("kus_gero_12","TOAD","That advice arrived late.","kus_gero_13"),
    N("kus_gero_13","Kushina's eyes narrow.","kus_gero_14"),
    D("kus_gero_14","KUSHINA","I fixed that.","kus_gero_15"),
    N("kus_gero_15","The toad leans closer to the line.","kus_gero_16"),
    D("kus_gero_16","TOAD","You fixed one problem.","kus_gero_17"),
    N("kus_gero_17","He taps beside the connection.","kus_gero_18"),
    D("kus_gero_18","TOAD","You made another.","kus_gero_19"),
    N("kus_gero_19","Kushina drops back into a crouch opposite him. The instructor says her name. She raises one hand without looking away from the toad.","kus_gero_20"),
    D("kus_gero_20","KUSHINA","I'm not touching it.","kus_gero_21"),
    N("kus_gero_21","A beat.","kus_gero_22"),
    D("kus_gero_22","KUSHINA","Yet.","kus_gero_23"),
    N("kus_gero_23","The instructor closes his eyes for one second.\n\nThe residual connection trembles between Kushina and the toad. The classmate stays back. The instructor watches both the formula and the unexpected visitor. Kushina looks at the toad.","kus_contact_choice"),
    Q("kus_contact_choice","",[
      C("ask_what_happened","“WHAT JUST HAPPENED?”","kus_ask_what_01",{kushinaGerotoraChoice:"ask_what_happened"}),
      C("ask_who","“WHO ARE YOU?”","kus_ask_who_01",{kushinaGerotoraChoice:"ask_who"}),
      C("help_close","HELP CLOSE THE RESIDUAL CONNECTION","kus_help_close_01",{kushinaGerotoraChoice:"help_close"}),
      C("send_back","“THEN GO BACK BEFORE THIS GETS WORSE.”","kus_send_back_01",{kushinaGerotoraChoice:"send_back"})
    ]),

    N("kus_ask_what_01","Kushina points at the scroll.","kus_ask_what_02"),
    D("kus_ask_what_02","KUSHINA","What just happened?","kus_ask_what_03"),
    N("kus_ask_what_03","The toad taps one webbed finger beside the line she corrected.","kus_ask_what_04"),
    D("kus_ask_what_04","TOAD","You fixed the seal.","kus_ask_what_05"),
    N("kus_ask_what_05","Kushina waits.","kus_ask_what_06"),
    D("kus_ask_what_06","TOAD","You also connected it somewhere it had no business reaching.","kus_ask_what_07"),
    N("kus_ask_what_07","Kushina looks down. Then back at him.","kus_ask_what_08"),
    D("kus_ask_what_08","KUSHINA","That's not an explanation.","kus_ask_what_09"),
    D("kus_ask_what_09","TOAD","It's the part I know.","kus_ask_what_10"),
    N("kus_ask_what_10","That stops her.\n\nThe instructor crouches far enough away not to disturb the pattern.","kus_ask_what_11"),
    D("kus_ask_what_11","INSTRUCTOR","And the connection now?","kus_ask_what_12"),
    N("kus_ask_what_12","The toad presses one hand to the stone.","kus_ask_what_13"),
    D("kus_ask_what_13","TOAD","Still open.","kus_ask_what_14"),
    N("kus_ask_what_14","Kushina immediately turns back to the scroll.","kus_ask_what_15"),
    D("kus_ask_what_15","KUSHINA","Then we close it.","kus_ask_what_16"),
    D("kus_ask_what_16","TOAD","Preferably without collecting anyone else.","kus_closure_method_router",{onEnterConsequences:contactKnowledgeCommits}),

    N("kus_ask_who_01","Kushina folds her arms.","kus_ask_who_02"),
    D("kus_ask_who_02","KUSHINA","Who are you?","kus_ask_who_03"),
    N("kus_ask_who_03","The toad looks almost relieved to receive a simpler question.","kus_ask_who_04"),
    D("kus_ask_who_04","TOAD","Gerotora.","kus_ask_who_05"),
    N("kus_ask_who_05","The classmate repeats it quietly. Kushina looks him over again.","kus_ask_who_06"),
    D("kus_ask_who_06","KUSHINA","That didn't make this less strange.","kus_ask_who_07"),
    D("kus_ask_who_07","GEROTORA","I wasn't trying to.","kus_ask_who_08"),
    N("kus_ask_who_08","The instructor watches the exchange.","kus_ask_who_09"),
    D("kus_ask_who_09","INSTRUCTOR","Gerotora. Do you know what connection brought you here?","kus_ask_who_10"),
    N("kus_ask_who_10","Gerotora looks at the formula.","kus_ask_who_11"),
    D("kus_ask_who_11","GEROTORA","I know enough to want it closed.","kus_ask_who_12"),
    N("kus_ask_who_12","Kushina crouches beside him.","kus_ask_who_13"),
    D("kus_ask_who_13","KUSHINA","Good. We agree on something.","kus_ask_who_14"),
    N("kus_ask_who_14","Gerotora looks at her.","kus_ask_who_15"),
    D("kus_ask_who_15","GEROTORA","I'm thrilled.","kus_closure_method_router",{onEnterConsequences:contactKnowledgeCommits}),

    N("kus_help_close_01","Kushina drops back to the scroll.","kus_help_close_02"),
    D("kus_help_close_02","KUSHINA","Tell me what you need.","kus_help_close_03"),
    N("kus_help_close_03","The toad moves to the far side of the trembling line. That gets the instructor's attention.","kus_help_close_04"),
    D("kus_help_close_04","INSTRUCTOR","Kushina.","kus_help_close_05"),
    N("kus_help_close_05","She looks up.","kus_help_close_06"),
    D("kus_help_close_06","INSTRUCTOR","Listen before you move.","kus_help_close_07"),
    N("kus_help_close_07","Kushina glances at the toad. Then back at the formula.","kus_help_close_08"),
    D("kus_help_close_08","KUSHINA","Fine.","kus_help_close_09"),
    N("kus_help_close_09","The toad braces the connection from his side. Kushina follows the pressure through the line instead of fighting it. For once, she does exactly what someone tells her the first time.\n\nThe opening narrows. The classmate watches from several steps back.","kus_help_close_10"),
    D("kus_help_close_10","CLASSMATE","Is it working?","kus_help_close_11"),
    N("kus_help_close_11","Kushina's teeth are clenched.","kus_help_close_12"),
    D("kus_help_close_12","KUSHINA","Yes.","kus_help_close_13"),
    N("kus_help_close_13","The toad looks across at her.","kus_help_close_14"),
    D("kus_help_close_14","TOAD","Less talking.","kus_help_close_15"),
    N("kus_help_close_15","Kushina looks offended. But she stops talking.\n\nThe connection closes.","kus_closure_method_router",{onEnterConsequences:contactKnowledgeCommits}),

    N("kus_send_back_01","Kushina reaches toward the line.","kus_send_back_02"),
    D("kus_send_back_02","KUSHINA","Then go back before this gets worse.","kus_send_back_03"),
    N("kus_send_back_03","The toad's hand lands beside hers.","kus_send_back_04"),
    D("kus_send_back_04","TOAD","Not like that.","kus_send_back_05"),
    N("kus_send_back_05","Kushina stops.","kus_send_back_06"),
    D("kus_send_back_06","TOAD","Unless you'd like to bring something else through.","kus_send_back_07"),
    N("kus_send_back_07","Kushina very carefully takes her hand away. The classmate takes one more step backward.","kus_send_back_08"),
    D("kus_send_back_08","CLASSMATE","Please don't.","kus_send_back_09"),
    N("kus_send_back_09","Kushina looks at them.","kus_send_back_10"),
    D("kus_send_back_10","KUSHINA","I wasn't going to.","kus_send_back_11"),
    N("kus_send_back_11","Three people look at her. Kushina's expression changes.","kus_send_back_12"),
    D("kus_send_back_12","KUSHINA","I wasn't.","kus_send_back_13"),
    N("kus_send_back_13","The toad studies the formula.","kus_send_back_14"),
    D("kus_send_back_14","TOAD","Good. Then listen.","kus_send_back_15"),
    N("kus_send_back_15","Kushina hates the tone. She listens anyway.","kus_closure_method_router",{onEnterConsequences:contactKnowledgeCommits}),

    {beatId:"kus_closure_method_router",mode:"resolver",machineResolved:true,text:"",environmentRef:courtyard,choices:[
      C("joint","RESOLVE JOINT CLOSURE","kus_closure_joint_01",null,{availability:hidden(()=>A.local().kushinaGerotoraChoice==="help_close")}),
      C("guided","RESOLVE GUIDED CLOSURE","kus_closure_guided_01",null,{availability:hidden(()=>A.local().kushinaGerotoraChoice!=="help_close")})
    ]},
    N("kus_closure_joint_01","Kushina and the toad finish the closure together. The last tremor disappears from the line.\n\nThe courtyard feels ordinary again. Almost.\n\nThere is still a toad sitting in it.","kus_closure_label_router"),
    N("kus_closure_guided_01","Gerotora controls his side while Kushina follows only the safe correction needed to let the opening collapse.\n\nThe last tremor disappears from the line.\n\nThe courtyard feels ordinary again. Almost.\n\nThere is still a toad sitting in it.","kus_closure_label_router"),
    {beatId:"kus_closure_label_router",mode:"resolver",machineResolved:true,text:"",environmentRef:courtyard,choices:[
      C("named","RESOLVE NAMED TOAD","kus_closure_named_01",null,{availability:hidden(()=>A.local().kushinaGerotoraChoice==="ask_who")}),
      C("unnamed","RESOLVE UNNAMED TOAD","kus_closure_toad_01",null,{availability:hidden(()=>A.local().kushinaGerotoraChoice!=="ask_who")})
    ]},
    N("kus_closure_named_01","Gerotora looks at Kushina.","kus_closure_named_02"),
    D("kus_closure_named_02","GEROTORA","Next time you touch a formula you don't understand, try not to drag somebody through it.","kus_closure_named_03"),
    N("kus_closure_named_03","Kushina's head comes up.","kus_closure_named_04"),
    D("kus_closure_named_04","KUSHINA","I understood it.","kus_closure_named_05"),
    D("kus_closure_named_05","GEROTORA","That's what worries me.","kus_after_gero_01"),
    N("kus_closure_toad_01","The toad looks at Kushina.","kus_closure_toad_02"),
    D("kus_closure_toad_02","TOAD","Next time you touch a formula you don't understand, try not to drag somebody through it.","kus_closure_toad_03"),
    N("kus_closure_toad_03","Kushina's head comes up.","kus_closure_toad_04"),
    D("kus_closure_toad_04","KUSHINA","I understood it.","kus_closure_toad_05"),
    D("kus_closure_toad_05","TOAD","That's what worries me.","kus_after_gero_01"),

    N("kus_after_gero_01","The residual connection folds shut.\n\nGerotora disappears with it.\n\nFor several seconds, nobody says anything.\n\nThe classmate looks at the empty stone. Then at Kushina.","kus_after_gero_02"),
    D("kus_after_gero_02","CLASSMATE","Does that normally happen in sealing practice?","kus_after_gero_03"),
    N("kus_after_gero_03","Kushina looks at the instructor. The instructor looks at the ruined formula.","kus_after_gero_04"),
    D("kus_after_gero_04","INSTRUCTOR","No.","kus_after_gero_05"),
    N("kus_after_gero_05","Kushina exhales.","kus_after_gero_06"),
    D("kus_after_gero_06","KUSHINA","Good.","kus_after_gero_07"),
    N("kus_after_gero_07","The instructor looks at her.","kus_after_gero_08"),
    D("kus_after_gero_08","INSTRUCTOR","Why is that good?","kus_after_gero_09"),
    N("kus_after_gero_09","Kushina points at the scroll.","kus_after_gero_10"),
    D("kus_after_gero_10","KUSHINA","Because if that was normal, this class would be ridiculous.","kus_after_gero_11"),
    N("kus_after_gero_11","The classmate laughs. Even the instructor almost does. Almost.\n\nHe kneels beside the ruined formula. Kushina joins him. Not because he asks. Because she wants to see the line again.\n\nThe instructor notices.","kus_after_gero_12"),
    D("kus_after_gero_12","INSTRUCTOR","You are not fixing it again.","kus_after_gero_13"),
    N("kus_after_gero_13","Kushina looks offended.","kus_after_gero_14"),
    D("kus_after_gero_14","KUSHINA","I was looking.","kus_after_gero_15"),
    D("kus_after_gero_15","INSTRUCTOR","With your hands?","kus_after_gero_16"),
    N("kus_after_gero_16","Kushina slowly moves both hands behind her back.\n\nThe classmate laughs harder.\n\nAt the gate, Kushina stops. Looks back at the courtyard. At the place the connection opened. At the instructor still collecting the damaged scroll. At the classmate still watching her like another toad might appear if she blinks wrong.\n\nKushina points at them.","kus_route_d_close_01"),
    D("kus_route_d_close_01","KUSHINA","Tomorrow.","kus_route_d_close_02"),
    D("kus_route_d_close_02","CLASSMATE","What about tomorrow?","kus_route_d_close_03"),
    N("kus_route_d_close_03","Kushina grins.","kus_route_d_close_04"),
    D("kus_route_d_close_04","KUSHINA","We're doing it right.","kus_route_d_close_05"),
    N("kus_route_d_close_05","The instructor answers without looking up.","kus_route_d_close_06"),
    D("kus_route_d_close_06","INSTRUCTOR","You are doing the assigned exercise.","kus_route_d_close_07"),
    N("kus_route_d_close_07","Kushina starts walking.","kus_route_d_close_08"),
    D("kus_route_d_close_08","KUSHINA","That's what I said.","kus_route_d_close_09"),
    N("kus_route_d_close_09","Kushina leaves the courtyard.",null,{exitScene:true})
  ],onCompleteConsequences:[X("academy_kushina",[seal,identity,cause,joint,contact])]});
})();

// Kurenai — text-choice Bell Test / Battle of Illusions. No Battle runtime.
(()=>{
  const bell="occ_origin_kurenai_bell_test_resolution",scene=A.sceneByVariant.academy_kurenai;
  const result=R("kurenai_bell_result_32900","academy_kurenai",bell,
    ctx=>({bellTestOutcomeClass:ctx.kurenaiOutcome||"complete_loss",deceptionRoute:ctx.kurenaiRoute||null}),
    ctx=>(ctx.kurenaiOutcome||"complete_loss")==="complete_loss"?["KUR-01"]:["KUR-02"]);
  A.register({sceneId:scene,eventId:scene,title:"ACADEMY KURENAI",entryBeatId:"kur_bell",participants:[],beats:[
    {beatId:"kur_bell",mode:"dialogue",speakerName:"INSTRUCTOR",text:"Take the bell.",nextBeatId:"kur_layer1"},
    {beatId:"kur_layer1",mode:"choice",text:"Choose the first deception layer.",choices:[
      C("false_kurenai","False Kurenai","kur_loss_attack",{kurenaiRoute:"false_kurenai"}),
      C("conceal_movement","Conceal real movement","kur_partial_loss_2",{kurenaiRoute:"conceal_movement"}),
      C("distort_position","Distort distance / position","kur_partial_win_2",{kurenaiRoute:"distort_position"}),
      C("fake_clumsy","Fake a clumsy / direct approach","kur_complete_2",{kurenaiRoute:"fake_clumsy"})]},
    {beatId:"kur_loss_attack",mode:"choice",text:"The instructor reacts to the false image.",choices:[C("rush_bell","Rush the bell","kur_result",{kurenaiOutcome:"complete_loss"})]},
    {beatId:"kur_partial_loss_2",mode:"choice",text:"The real movement stays concealed.",choices:[C("draw_attention","Draw attention away","kur_partial_loss_3")]},
    {beatId:"kur_partial_loss_3",mode:"choice",text:"A bell appears reachable.",choices:[C("take_bell_now","Take the bell now","kur_result",{kurenaiOutcome:"partial_loss"})]},
    {beatId:"kur_partial_win_2",mode:"choice",text:"Distance itself becomes unreliable.",choices:[C("rush_bell","Rush the bell","kur_partial_win_3")]},
    {beatId:"kur_partial_win_3",mode:"choice",text:"The instructor begins to dismiss the attempt.",choices:[C("pretend_withdraw","Pretend to withdraw","kur_result",{kurenaiOutcome:"partial_win"})]},
    {beatId:"kur_complete_2",mode:"choice",text:"The instructor believes the clumsy approach is real.",choices:[C("rush_bell","Rush the bell","kur_complete_3")]},
    {beatId:"kur_complete_3",mode:"choice",text:"He believes he has caught Kurenai.",choices:[C("let_him_think_caught","Let the instructor think he caught you","kur_result",{kurenaiOutcome:"complete_win"})]},
    {beatId:"kur_result",mode:"narration",text:"The illusion layers resolve from the committed deception sequence. No personality or alignment label is assigned.",onEnterConsequences:[result],nextBeatId:"kur_lesson"},
    {beatId:"kur_lesson",mode:"dialogue",speakerName:"INSTRUCTOR",text:"I was assessing what you believed in, to separate the reality from illusion and the truth from fiction.",exitScene:true}
  ],onCompleteConsequences:[X("academy_kurenai",[bell])]});
})();

// Iwabee — WRITING_GOLDEN terrain / Rogue confrontation / World disposition.
(()=>{
  const reshape="occ_origin_iwabee_training_ground_reshape_resolution",rogue="occ_origin_iwabee_rogue_genin_response_resolution",scene=A.sceneByVariant.academy_iwabee;
  const courtyard=Object.freeze({environmentId:"konoha_academy_courtyard_day"});
  const ROGUE="iwabee_origin_rogue_genin_01",INSTRUCTOR="iwabee_origin_practical_instructor_01";
  const reshapeCommit=R("iwabee_reshape_32900","academy_iwabee",reshape,
    ctx=>({trainingGroundReshapeObjectiveCompletedByIwabee:true,terrainChoice:ctx.iwabeeTerrainChoice||null}),["IWA-01"]);
  const worldFact=(route,extra={})=>({
    rogueGeninParticipantRef:ROGUE,responseRoute:route,
    earthReleaseUsedToConstrainRogueGenin:false,battleOccurrenceId:null,battleResult:null,
    iwabeeBattleWithdrawn:false,rogueBattleWithdrawn:false,
    rogueDisposition:null,custodyState:"NONE",custodyActorRef:null,
    instructorIntervened:false,instructorIntervention:"NONE",
    alternateEscapeRouteAvailable:null,followupBattleOccurred:false,academyInstructorRef:INSTRUCTOR,
    trainingGroundReshapeObjectiveCompletedByIwabee:true,originFailure:false,injuryInferred:false,deathInferred:false,
    ...extra
  });
  const confrontVictory=R("iwabee_rogue_confront_victory_399","academy_iwabee",rogue,ctx=>worldFact("CONFRONT_HIM",{
    battleOccurrenceId:ctx.iwabeeRogueBattleOccurrenceId||null,battleResult:"victory",
    iwabeeBattleWithdrawn:ctx.iwabeeBattleWithdrawn===true,rogueBattleWithdrawn:true,
    rogueDisposition:"DETAINED_AFTER_ROGUE_BATTLE_WITHDRAWAL",
    custodyState:"TEMPORARY_INSTRUCTOR_DETENTION",custodyActorRef:INSTRUCTOR,
    instructorIntervened:true,instructorIntervention:"SECURE_WITHDRAWN_ROGUE"
  }),[],{participantRefs:[ROGUE,INSTRUCTOR]});
  const confrontDefeat=R("iwabee_rogue_confront_defeat_399","academy_iwabee",rogue,ctx=>worldFact("CONFRONT_HIM",{
    battleOccurrenceId:ctx.iwabeeRogueBattleOccurrenceId||null,battleResult:"defeat",
    iwabeeBattleWithdrawn:true,rogueBattleWithdrawn:ctx.iwabeeRogueBattleWithdrawn===true,
    rogueDisposition:"ESCAPED_AFTER_IWABEE_WITHDRAWAL",
    custodyState:"NONE",custodyActorRef:null,
    instructorIntervened:true,instructorIntervention:"PROTECT_WITHDRAWN_STUDENT_NO_PURSUIT"
  }),[],{participantRefs:[ROGUE,INSTRUCTOR]});
  const blockCommit=R("iwabee_rogue_block_399","academy_iwabee",rogue,worldFact("BLOCK_ESCAPE_WITH_EARTH_RELEASE",{
    earthReleaseUsedToConstrainRogueGenin:true,
    rogueDisposition:"SURRENDERED_AFTER_EARTH_ROUTE_CONSTRAINT",
    custodyState:"TEMPORARY_INSTRUCTOR_DETENTION",custodyActorRef:INSTRUCTOR,
    instructorIntervened:true,instructorIntervention:"ACCEPT_SURRENDER_AND_SECURE",
    alternateEscapeRouteAvailable:false,followupBattleOccurred:false
  }),["IWA-02"],{participantRefs:[ROGUE,INSTRUCTOR]});
  const callCommit=R("iwabee_rogue_call_399","academy_iwabee",rogue,worldFact("CALL_INSTRUCTOR",{
    rogueDisposition:"ESCAPED_AFTER_INSTRUCTOR_ESCALATION",
    instructorIntervened:true,instructorIntervention:"SHIELD_STUDENTS_NO_PURSUIT"
  }),[],{participantRefs:[ROGUE,INSTRUCTOR]});
  const finishCommit=R("iwabee_rogue_finish_399","academy_iwabee",rogue,worldFact("FINISH_PRACTICAL",{
    rogueDisposition:"ESCAPED_WHILE_IWABEE_FINISHED_PRACTICAL",
    instructorIntervened:false,instructorIntervention:"NONE"
  }),[],{participantRefs:[ROGUE]});
  const battleLaunch=spec=>typeof globalThis.launchAcademyIwabeeRogueConfrontation399==="function"
    ?globalThis.launchAcademyIwabeeRogueConfrontation399(spec)
    :{success:false,reason:"iwabee_399_runtime_missing"};
  const battleProject=()=>typeof globalThis.projectAcademyIwabeeRogueConfrontation399==="function"
    ?globalThis.projectAcademyIwabeeRogueConfrontation399():null;

  A.register({sceneId:scene,eventId:scene,title:"ACADEMY IWABEE",entryBeatId:"iwa_open_01",environmentRef:courtyard,participants:[],beats:[
    {beatId:"iwa_open_01",mode:"narration",environmentRef:courtyard,text:"Iwabee drops the written exercise onto the bench harder than he needs to. Another red mark. Another page full of things he is supposed to prove before anybody lets him do the part he is actually good at.",nextBeatId:"iwa_open_02"},
    {beatId:"iwa_open_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Finished being angry at the paper?",nextBeatId:"iwa_open_03"},
    {beatId:"iwa_open_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"No.",nextBeatId:"iwa_open_04"},
    {beatId:"iwa_open_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Good. You can be angry outside.",nextBeatId:"iwa_open_05"},
    {beatId:"iwa_open_05",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Make the area usable again.",nextBeatId:"iwa_open_06"},
    {beatId:"iwa_open_06",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"That's it?",nextBeatId:"iwa_open_07"},
    {beatId:"iwa_open_07",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You wanted practical.",nextBeatId:"iwa_open_08"},
    {beatId:"iwa_open_08",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Finally.",nextBeatId:"iwa_reshape"},
    {beatId:"iwa_reshape",mode:"choice",environmentRef:courtyard,text:"Choose how Iwabee reshapes the damaged ground.",choices:[
      C("raise_collapsed","RAISE THE COLLAPSED SECTION","iwa_raise_01",{iwabeeTerrainChoice:"raise_collapsed"}),
      C("flatten_ground","FLATTEN THE DAMAGED GROUND","iwa_flatten_01",{iwabeeTerrainChoice:"flatten_ground"}),
      C("build_path","BUILD A STABLE PATH THROUGH IT","iwa_path_01",{iwabeeTerrainChoice:"build_path"}),
      C("reinforce_weakest","REINFORCE THE WEAKEST SECTION","iwa_reinforce_01",{iwabeeTerrainChoice:"reinforce_weakest"})]},
    {beatId:"iwa_raise_01",mode:"narration",environmentRef:courtyard,text:"Iwabee plants himself beside the sunken section and draws the earth upward. The collapsed ground rises in a rough slab until it sits level with the rest of the yard. Loose stone slides from the lifted edge. Something underneath it moves.",nextBeatId:"iwa_raise_02"},
    {beatId:"iwa_raise_02",mode:"narration",environmentRef:courtyard,text:"Not something. Someone.",nextBeatId:"iwa_expose_01"},
    {beatId:"iwa_flatten_01",mode:"narration",environmentRef:courtyard,text:"Iwabee drives the broken ridges down rather than rebuilding them. The surface settles beneath his control, spreading the rubble that had been piled along one side. A figure behind it suddenly has nowhere to hide.",nextBeatId:"iwa_expose_01"},
    {beatId:"iwa_path_01",mode:"narration",environmentRef:courtyard,text:"Iwabee leaves the worst of the collapse alone and raises a solid strip of earth straight through it. The new path cuts cleanly through the debris. A pair of feet that absolutely should not be there are standing beside it. Iwabee looks up.",nextBeatId:"iwa_expose_01"},
    {beatId:"iwa_reinforce_01",mode:"narration",environmentRef:courtyard,text:"Iwabee studies the damaged section long enough to find the point most likely to collapse again. He packs earth beneath it until the weakened edge locks into place. The shift pushes aside broken timber somebody had been using as cover. A young shinobi is crouched behind it.",nextBeatId:"iwa_expose_01"},
    {beatId:"iwa_expose_01",mode:"narration",environmentRef:courtyard,text:"The stranger is wearing shinobi gear. Not Academy gear. His eyes go from Iwabee to the instructor, then immediately to the clearest route out of the yard.",onEnterConsequences:[reshapeCommit],nextBeatId:"iwa_expose_02"},
    {beatId:"iwa_expose_02",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Move.",nextBeatId:"iwa_expose_03"},
    {beatId:"iwa_expose_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"No.",nextBeatId:"iwa_response"},
    {beatId:"iwa_response",mode:"choice",environmentRef:courtyard,text:"Choose Iwabee's response.",choices:[
      C("confront","CONFRONT HIM","iwa_confront_01",{iwabeeRogueResponse:"confront"}),
      C("block_escape","BLOCK HIS ESCAPE WITH EARTH RELEASE","iwa_block_01",{iwabeeRogueResponse:"block_escape"}),
      C("call_instructor","CALL THE INSTRUCTOR","iwa_call_01",{iwabeeRogueResponse:"call_instructor"}),
      C("finish_practical","FINISH THE PRACTICAL","iwa_finish_01",{iwabeeRogueResponse:"finish_practical"})]},
    {beatId:"iwa_confront_01",mode:"narration",environmentRef:courtyard,text:"Iwabee steps between the Rogue Genin and the open side of the yard.",nextBeatId:"iwa_confront_02"},
    {beatId:"iwa_confront_02",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"You an Academy kid or a guard?",nextBeatId:"iwa_confront_03"},
    {beatId:"iwa_confront_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Right now?",nextBeatId:"iwa_confront_04"},
    {beatId:"iwa_confront_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I'm the one in your way.",nextBeatId:"iwa_confront_05"},
    {beatId:"iwa_confront_05",mode:"narration",environmentRef:courtyard,text:"The Rogue Genin stops looking for a way around him.",nextBeatId:"iwa_confront_battle"},
    {beatId:"iwa_confront_battle",mode:"battle_transition",environmentRef:courtyard,text:"Iwabee confronts the Rogue Genin.",battle:{
      encounterId:"origin_academy_iwabee:rogue_genin_confrontation",launchResolver:battleLaunch,
      victoryBeatId:"iwa_confront_return_01",defeatBeatId:"iwa_confront_loss_01",resultProjector:battleProject,actionLabel:"Start PL Battle"}},
    {beatId:"iwa_confront_return_01",mode:"narration",environmentRef:courtyard,text:"When the confrontation is over, the repaired section of training ground is still where Iwabee put it. Whatever became of the Rogue Genin is a second fact the instructor now has to deal with.",onEnterConsequences:[confrontVictory],nextBeatId:"iwa_eval_route_confront"},
    {beatId:"iwa_confront_loss_01",mode:"narration",environmentRef:courtyard,text:"Iwabee's stance gives before the Rogue Genin's does. Not because the ground shifted. Not because somebody interrupted. This one is his.",nextBeatId:"iwa_confront_loss_02"},
    {beatId:"iwa_confront_loss_02",mode:"narration",environmentRef:courtyard,text:"He forces himself upright again anyway. The Rogue is still standing. Another exchange is not happening.",nextBeatId:"iwa_confront_loss_03"},
    {beatId:"iwa_confront_loss_03",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Stay down.",nextBeatId:"iwa_confront_loss_04"},
    {beatId:"iwa_confront_loss_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Wasn't planning to.",nextBeatId:"iwa_confront_loss_05"},
    {beatId:"iwa_confront_loss_05",mode:"narration",environmentRef:courtyard,text:"Iwabee does not step forward. That is not the same thing as agreeing.",nextBeatId:"iwa_confront_loss_world_result"},
    {beatId:"iwa_confront_loss_world_result",mode:"narration",environmentRef:courtyard,text:"The Rogue Genin's eyes flick toward the open edge of the yard. The instructor moves before Iwabee can. Not toward the Rogue. Between the Rogue and the student who has already been forced out of the fight.",onEnterConsequences:[confrontDefeat],nextBeatId:"iwa_confront_loss_world_result_02"},
    {beatId:"iwa_confront_loss_world_result_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Enough.",nextBeatId:"iwa_confront_loss_world_result_03"},
    {beatId:"iwa_confront_loss_world_result_03",mode:"narration",environmentRef:courtyard,text:"The Rogue does not argue. He takes the opening and runs. The instructor lets him go long enough to make sure Iwabee stays standing. No one calls it a victory. No one needs to.",nextBeatId:"iwa_eval_route_confront_loss_01"},
    {beatId:"iwa_block_01",mode:"narration",environmentRef:courtyard,text:"Iwabee does not chase him. He watches where the Rogue is looking. The moment the man commits to the open side of the yard, earth rises across it. Not an attack. A wall where there was an exit a second ago.",nextBeatId:"iwa_block_02"},
    {beatId:"iwa_block_02",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Seriously?",nextBeatId:"iwa_block_03"},
    {beatId:"iwa_block_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You said move.",nextBeatId:"iwa_block_04"},
    {beatId:"iwa_block_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Try another direction.",nextBeatId:"iwa_block_return_01"},
    {beatId:"iwa_block_return_01",mode:"narration",environmentRef:courtyard,text:"The Rogue looks at the new wall. Then at the instructor. Whatever calculation he makes ends there. He raises his hands. The instructor takes control of the situation while Iwabee looks from the barrier to the first section of ground he repaired. Two changes. One assignment.",onEnterConsequences:[blockCommit],nextBeatId:"iwa_eval_route_block"},
    {beatId:"iwa_call_01",mode:"narration",environmentRef:courtyard,text:"Iwabee keeps his eyes on the Rogue Genin.",nextBeatId:"iwa_call_02"},
    {beatId:"iwa_call_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Sensei.",nextBeatId:"iwa_call_03"},
    {beatId:"iwa_call_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"I see him.",nextBeatId:"iwa_call_04"},
    {beatId:"iwa_call_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Back up.",nextBeatId:"iwa_call_05"},
    {beatId:"iwa_call_05",mode:"narration",environmentRef:courtyard,text:"The Rogue sees the instructor commit to shielding the students and takes the open route instead. By the time the instructor can safely move after him, he is gone.",onEnterConsequences:[callCommit],nextBeatId:"iwa_eval_route_call"},
    {beatId:"iwa_finish_01",mode:"narration",environmentRef:courtyard,text:"Iwabee looks at the Rogue Genin. Then at the ground he was actually told to fix.",nextBeatId:"iwa_finish_02"},
    {beatId:"iwa_finish_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Not my assignment.",nextBeatId:"iwa_finish_03"},
    {beatId:"iwa_finish_03",mode:"narration",environmentRef:courtyard,text:"Whatever happens behind him, the training ground is usable when he is finished. That part is not ambiguous.",nextBeatId:"iwa_finish_04"},
    {beatId:"iwa_finish_04",mode:"narration",environmentRef:courtyard,text:"Behind him, footsteps break toward the open side of the yard. The Rogue is gone before Iwabee finishes the last section.",onEnterConsequences:[finishCommit],nextBeatId:"iwa_eval_route_finish"},
    {beatId:"iwa_eval_route_confront",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You saw another problem and went straight at it.",nextBeatId:"iwa_eval_route_confront_02"},
    {beatId:"iwa_eval_route_confront_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"It was standing right there.",nextBeatId:"iwa_eval_route_confront_03"},
    {beatId:"iwa_eval_route_confront_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"So was that.",nextBeatId:"iwa_eval_core_01"},
    {beatId:"iwa_eval_route_confront_loss_01",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You went straight at him.",nextBeatId:"iwa_eval_route_confront_loss_02"},
    {beatId:"iwa_eval_route_confront_loss_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"And lost.",nextBeatId:"iwa_eval_route_confront_loss_03"},
    {beatId:"iwa_eval_route_confront_loss_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Yeah.",nextBeatId:"iwa_eval_route_confront_loss_04"},
    {beatId:"iwa_eval_route_confront_loss_04",mode:"narration",environmentRef:courtyard,text:"The instructor looks past him at the section of training ground Iwabee repaired before any of this started.",nextBeatId:"iwa_eval_route_confront_loss_05"},
    {beatId:"iwa_eval_route_confront_loss_05",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Ground's still fixed.",nextBeatId:"iwa_eval_core_01"},
    {beatId:"iwa_eval_route_block",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You changed the ground twice.",nextBeatId:"iwa_eval_route_block_02"},
    {beatId:"iwa_eval_route_block_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Second one wasn't on the worksheet.",nextBeatId:"iwa_eval_route_block_03"},
    {beatId:"iwa_eval_route_block_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"No.",nextBeatId:"iwa_eval_route_block_04"},
    {beatId:"iwa_eval_route_block_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Still useful.",nextBeatId:"iwa_eval_core_01"},
    {beatId:"iwa_eval_route_call",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You called me.",nextBeatId:"iwa_eval_route_call_02"},
    {beatId:"iwa_eval_route_call_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You're the instructor.",nextBeatId:"iwa_eval_route_call_03"},
    {beatId:"iwa_eval_route_call_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Good. You noticed.",nextBeatId:"iwa_eval_core_01"},
    {beatId:"iwa_eval_route_finish",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You finished the assignment.",nextBeatId:"iwa_eval_route_finish_02"},
    {beatId:"iwa_eval_route_finish_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"That was the point.",nextBeatId:"iwa_eval_route_finish_03"},
    {beatId:"iwa_eval_route_finish_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"It was one point.",nextBeatId:"iwa_eval_core_01"},
    {beatId:"iwa_eval_core_01",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You know what your problem is, Iwabee?",nextBeatId:"iwa_eval_core_02"},
    {beatId:"iwa_eval_core_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Yeah. Written tests.",nextBeatId:"iwa_eval_core_03"},
    {beatId:"iwa_eval_core_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"No. You keep acting like the only things that count are the things you're bad at.",nextBeatId:"iwa_eval_core_04"},
    {beatId:"iwa_eval_core_04",mode:"narration",environmentRef:courtyard,text:"Iwabee looks across the ground he reshaped. Nobody has to tell him whether that part worked.",nextBeatId:"iwa_reflect"},
    {beatId:"iwa_reflect",mode:"choice",environmentRef:courtyard,text:"What does Iwabee make of it?",choices:[
      C("know_good_at","I KNOW WHAT I'M GOOD AT.","iwa_reflect_good_01"),
      C("better_rest","I STILL NEED TO GET BETTER AT THE REST.","iwa_reflect_rest_01"),
      C("academy_tests_wrong","MAYBE THE ACADEMY TESTS THE WRONG THINGS.","iwa_reflect_tests_01"),
      C("dont_care","I DON'T CARE WHAT THEY THINK.","iwa_reflect_care_01")]},
    {beatId:"iwa_reflect_good_01",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I know what I'm good at.",nextBeatId:"iwa_reflect_good_02"},
    {beatId:"iwa_reflect_good_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Then stop treating it like it doesn't count.",nextBeatId:"iwa_close_01"},
    {beatId:"iwa_reflect_rest_01",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I still need to get better at the rest.",nextBeatId:"iwa_reflect_rest_02"},
    {beatId:"iwa_reflect_rest_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Yeah.",nextBeatId:"iwa_reflect_rest_03"},
    {beatId:"iwa_reflect_rest_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Don't sound so happy about it.",nextBeatId:"iwa_close_01"},
    {beatId:"iwa_reflect_tests_01",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Maybe the Academy tests the wrong things.",nextBeatId:"iwa_reflect_tests_02"},
    {beatId:"iwa_reflect_tests_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Sometimes.",nextBeatId:"iwa_reflect_tests_03"},
    {beatId:"iwa_reflect_tests_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Doesn't make the other things disappear.",nextBeatId:"iwa_close_01"},
    {beatId:"iwa_reflect_care_01",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I don't care what they think.",nextBeatId:"iwa_reflect_care_02"},
    {beatId:"iwa_reflect_care_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Then make sure that's true.",nextBeatId:"iwa_close_01"},
    {beatId:"iwa_close_01",mode:"narration",environmentRef:courtyard,text:"The written exercise is still waiting on the bench. The training ground is usable again. Both are true. Iwabee picks up the paper on his way out.",nextBeatId:"iwa_close_02"},
    {beatId:"iwa_close_02",mode:"narration",environmentRef:courtyard,text:"YOUR CHRONICLE BEGINS",exitScene:true}
  ],onCompleteConsequences:[X("academy_iwabee",[reshape,rogue])]});
})();

// Metal Lee — WRITING_GOLDEN private capability / spar / protective response.
(()=>{
  const priv="occ_origin_metal_private_training_resolution",perf="occ_origin_metal_pressured_performance_resolution",protect="occ_origin_metal_protective_response_resolution",contact="occ_origin_metal_inviting_genin_prior_contact",scene=A.sceneByVariant.academy_metal_lee;
  const courtyard=Object.freeze({environmentId:"konoha_academy_courtyard_day"}),GENIN="metal_origin_inviting_genin";
  const privateCommit=R("metal_private_32900","academy_metal_lee",priv,ctx=>({qualifyingPrivateTaijutsuOrConditioningWorkCompleted:true,privateTrainingChoice:ctx.metalPrivateChoice||null,observerDiscoveryOccurredAfterQualifyingPrivateWork:true}),["MET-01"]);
  const contactCommit=R("metal_contact_32900","academy_metal_lee",contact,{invitingGeninEncounterOccurred:true,invitingGeninParticipantRef:GENIN},["MET-04"],{participantRefs:[GENIN]});
  const demoPerf=R("metal_demo_perf_32900","academy_metal_lee",perf,{pressuredPerformanceClass:"rough",context:"audience_pressure_demonstration",battleOccurrenceId:null},["MET-02"]);
  const sparPerf=R("metal_spar_perf_396","academy_metal_lee",perf,ctx=>({pressuredPerformanceClass:ctx.metalSparPerformanceClass||"rough",context:"controlled_spar",battleOccurrenceId:ctx.metalSparBattleOccurrenceId||null,finalRemainingBattlePL:Number(ctx.metalSparFinalRemainingBattlePL)||0,startingUnderlyingMaximum:Number(ctx.metalSparStartingMaximum)||13}),["MET-02"]);
  const battleLaunch=spec=>typeof globalThis.launchAcademyMetalControlledSpar396==="function"
    ?globalThis.launchAcademyMetalControlledSpar396(spec)
    :{success:false,reason:"metal_396_runtime_missing"};
  const battleProject=()=>typeof globalThis.projectAcademyMetalControlledSpar396==="function"
    ?globalThis.projectAcademyMetalControlledSpar396():null;
  const protectiveResolver=(requestId,kind)=>({requestId,kind:"domain",resolve:()=>{
    if(typeof globalThis.resolveAcademyMetalProtectiveResponse396!=="function")return{success:false,reason:"metal_396_protective_resolver_missing"};
    const resolved=globalThis.resolveAcademyMetalProtectiveResponse396(kind);if(!resolved||resolved.success!==true)return resolved||{success:false,reason:"metal_protective_resolution_failed"};
    const active=A.active();if(!active)return{success:false,reason:"metal_story_not_active"};
    active.localContext={...(active.localContext||{}),
      metalProtectiveResponse:kind,metalProtectiveOutcome:resolved.protectiveResponseOutcome,
      metalProtectiveResolverStatKey:resolved.resolverStatKey,metalProtectiveResolverStatValue:resolved.resolverStatValue,
      metalProtectiveInterventionRequired:resolved.interventionRequired,metalProtectiveInterventionParticipantRef:resolved.interventionParticipantRef};
    const committed=A.commitOccurrence("academy_metal_lee",protect,{
      attempted:true,protectiveResponseAttempted:true,protectiveResponseKind:kind,protectiveResponseOutcome:resolved.protectiveResponseOutcome,
      resolverId:resolved.resolverId,hazardId:resolved.hazardId,
      effectiveStatKey:resolved.resolverStatKey,effectiveStatValue:resolved.resolverStatValue,
      successThreshold:resolved.successThreshold,partialThreshold:resolved.partialThreshold,
      interventionRequired:resolved.interventionRequired,interventionParticipantRef:resolved.interventionParticipantRef,
      injuryInferred:false,deathInferred:false
    },["MET-03"],{participantRefs:resolved.interventionParticipantRef?[GENIN]:[]});
    if(!committed||committed.success!==true)return committed||{success:false,reason:"metal_met03_commit_failed"};
    const prefix=kind==="redirect_dummy"?"met_redirect":kind==="take_impact"?"met_impact":"met_destroy";
    const target=prefix+"_"+resolved.protectiveResponseOutcome+"_01";
    return{success:true,type:"metal_protective_response_resolved",resolved,targetBeatId:target};
  }});

  A.register({sceneId:scene,eventId:scene,title:"ACADEMY METAL LEE",entryBeatId:"met_open_01",environmentRef:courtyard,participants:[],beats:[
    {beatId:"met_open_01",mode:"narration",environmentRef:courtyard,text:"The training courtyard is quiet enough for Metal to hear the dummy frame creak before it turns. Good. Quiet is easier.",nextBeatId:"met_private_choice"},
    {beatId:"met_private_choice",mode:"choice",environmentRef:courtyard,text:"Choose Metal's private training.",choices:[
      C("spinning_kick","SPINNING KICK","met_private_spin_01",{metalPrivateChoice:"spinning_kick"}),
      C("full_force_fist","FULL-FORCE FIST","met_private_fist_01",{metalPrivateChoice:"full_force_fist"}),
      C("conditioned_endurance","CONDITIONED ENDURANCE","met_private_endurance_01",{metalPrivateChoice:"conditioned_endurance"})]},
    {beatId:"met_private_spin_01",mode:"narration",environmentRef:courtyard,text:"Metal waits for the moving pad to cross his line, pivots with it, and drives a spinning kick through the centre. The pad snaps back on its rail. Metal lands exactly where he started.",nextBeatId:"met_watchers_01"},
    {beatId:"met_private_fist_01",mode:"narration",environmentRef:courtyard,text:"Metal plants his feet and lets the dummy roll toward him. At the last moment he steps through the timing and drives a Full-Force Fist into the reinforced centre pad. The whole frame shudders. His stance does not.",nextBeatId:"met_watchers_01"},
    {beatId:"met_private_endurance_01",mode:"narration",environmentRef:courtyard,text:"Metal starts the moving-dummy cycle again. Then again. Then faster. He keeps pace through every turn, breathing harder while the movement stays clean. When the mechanism finally slows, Metal is still moving.",nextBeatId:"met_watchers_01"},
    {beatId:"met_watchers_01",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Nice.",onEnterConsequences:[privateCommit,contactCommit],nextBeatId:"met_watchers_02"},
    {beatId:"met_watchers_02",mode:"narration",environmentRef:courtyard,text:"There are people at the edge of the courtyard. More than one. They have been there long enough to know what he was doing. Metal straightens too quickly and nearly catches his heel on the training mark. He fixes it before anybody comments.",nextBeatId:"met_watchers_03"},
    {beatId:"met_watchers_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"How long have you been standing there?",nextBeatId:"met_watchers_04"},
    {beatId:"met_watchers_04",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Long enough.",nextBeatId:"met_invite_01"},
    {beatId:"met_invite_01",mode:"narration",environmentRef:courtyard,text:"The Genin steps away from the others, giving Metal space without leaving him alone.",nextBeatId:"met_invite_02"},
    {beatId:"met_invite_02",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Want to spar?",nextBeatId:"met_invite"},
    {beatId:"met_invite",mode:"choice",environmentRef:courtyard,text:"Metal looks at the Genin. Then at everyone behind them.",choices:[
      C("spar","SPAR","met_spar_01",{metalBranch:"spar"}),
      C("demonstrate","KEEP WORKING THE DUMMY","met_dummy_01",{metalBranch:"demonstrate"}),
      C("back_out","BACK OUT","met_backout_01",{metalBranch:"back_out"})]},
    {beatId:"met_spar_01",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"Fine.",nextBeatId:"met_spar_02"},
    {beatId:"met_spar_02",mode:"narration",environmentRef:courtyard,text:"Metal steps away from the apparatus. The Genin gives him room and settles opposite him.",nextBeatId:"met_spar_03"},
    {beatId:"met_spar_03",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Ready?",nextBeatId:"met_spar_04"},
    {beatId:"met_spar_04",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"Obviously.",nextBeatId:"met_spar_05"},
    {beatId:"met_spar_05",mode:"narration",environmentRef:courtyard,text:"Somebody behind the Genin shifts for a better view. Metal hears it. He wishes he hadn't.",nextBeatId:"met_spar_battle"},
    {beatId:"met_spar_battle",mode:"battle_transition",environmentRef:courtyard,text:"Metal and the Genin begin the controlled spar.",battle:{
      encounterId:"origin_academy_metal_lee:inviting_genin_spar",launchResolver:battleLaunch,
      victoryBeatId:"met_spar_dispatch",defeatBeatId:"met_spar_dispatch",postBattleBeatId:"met_spar_dispatch",resultProjector:battleProject,actionLabel:"Start PL Battle"}},
    {beatId:"met_spar_dispatch",mode:"choice",environmentRef:courtyard,text:"",choices:[
      C("route_strong","CONTINUE","met_spar_strong_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalSparPerformanceClass==="strong",knownBlocker:null})}),
      C("route_mixed","CONTINUE","met_spar_mixed_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalSparPerformanceClass==="mixed",knownBlocker:null})}),
      C("route_rough","CONTINUE","met_spar_rough_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalSparPerformanceClass==="rough",knownBlocker:null})})]},
    {beatId:"met_spar_strong_01",mode:"narration",environmentRef:courtyard,text:"When the spar ends, Metal is breathing hard but still standing cleanly enough that nobody can pretend the audience ruined him. Metal notices them anyway.",onEnterConsequences:[sparPerf],nextBeatId:"met_spar_strong_02"},
    {beatId:"met_spar_strong_02",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"For somebody who looked like he wanted all of us to disappear, you did pretty well.",nextBeatId:"met_spar_strong_03"},
    {beatId:"met_spar_strong_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"I did not want you to disappear.",nextBeatId:"met_spar_strong_04"},
    {beatId:"met_spar_strong_04",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Right.",nextBeatId:"met_close_01"},
    {beatId:"met_spar_mixed_01",mode:"narration",environmentRef:courtyard,text:"The spar ends messier than Metal wanted. His breathing takes longer to settle, and he avoids looking at the people behind the Genin until avoiding them becomes obvious too.",onEnterConsequences:[sparPerf],nextBeatId:"met_spar_mixed_02"},
    {beatId:"met_spar_mixed_02",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"You were fighting me and everybody behind me.",nextBeatId:"met_spar_mixed_03"},
    {beatId:"met_spar_mixed_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"They were distracting.",nextBeatId:"met_spar_mixed_04"},
    {beatId:"met_spar_mixed_04",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Nobody said anything.",nextBeatId:"met_spar_mixed_05"},
    {beatId:"met_spar_mixed_05",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"That was worse.",nextBeatId:"met_close_01"},
    {beatId:"met_spar_rough_01",mode:"narration",environmentRef:courtyard,text:"By the end, Metal's movements barely resemble the ones he was making before he knew anyone was watching. That is the worst part. He remembers exactly how good they felt before.",onEnterConsequences:[sparPerf],nextBeatId:"met_spar_rough_02"},
    {beatId:"met_spar_rough_02",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"You were better before you saw us.",nextBeatId:"met_spar_rough_03"},
    {beatId:"met_spar_rough_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"You think I'm bad.",nextBeatId:"met_spar_rough_04"},
    {beatId:"met_spar_rough_04",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"No.",nextBeatId:"met_spar_rough_05"},
    {beatId:"met_spar_rough_05",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"I think you noticed us.",nextBeatId:"met_close_01"},
    {beatId:"met_dummy_01",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"I don't need a spar. I can do it here.",nextBeatId:"met_dummy_02"},
    {beatId:"met_dummy_02",mode:"narration",environmentRef:courtyard,text:"He turns back to the apparatus and starts the mechanism. One cycle goes cleanly. The next goes almost cleanly. Somebody whispers behind him.",nextBeatId:"met_dummy_03"},
    {beatId:"met_dummy_03",mode:"narration",environmentRef:courtyard,text:"Metal's next step lands too far left. He corrects harder than he needs to, the dummy swings wider, and when he tries to catch the rhythm again the frame jumps its guide.",onEnterConsequences:[demoPerf],nextBeatId:"met_dummy_04"},
    {beatId:"met_dummy_04",mode:"narration",environmentRef:courtyard,text:"The training dummy tears sideways toward another student. For the first time since he noticed the audience, Metal forgets they are there.",nextBeatId:"met_protect"},
    {beatId:"met_protect",mode:"choice",environmentRef:courtyard,text:"The dummy hazard is real. Choose Metal's response.",choices:[
      C("redirect_dummy","REDIRECT THE DUMMY","met_resolve_redirect",{metalProtectiveResponse:"redirect_dummy"}),
      C("take_impact","TAKE THE IMPACT","met_resolve_impact",{metalProtectiveResponse:"take_impact"}),
      C("destroy_dummy","DESTROY THE DUMMY","met_resolve_destroy",{metalProtectiveResponse:"destroy_dummy"})]},
    {beatId:"met_resolve_redirect",mode:"narration",environmentRef:courtyard,text:"Metal moves.",onEnterConsequences:[protectiveResolver("metal_protect_redirect_396","redirect_dummy")],nextBeatId:"met_redirect_dispatch"},
    {beatId:"met_resolve_impact",mode:"narration",environmentRef:courtyard,text:"Metal moves.",onEnterConsequences:[protectiveResolver("metal_protect_impact_396","take_impact")],nextBeatId:"met_impact_dispatch"},
    {beatId:"met_resolve_destroy",mode:"narration",environmentRef:courtyard,text:"Metal moves.",onEnterConsequences:[protectiveResolver("metal_protect_destroy_396","destroy_dummy")],nextBeatId:"met_destroy_dispatch"},
    {beatId:"met_redirect_dispatch",mode:"choice",environmentRef:courtyard,text:"",choices:[
      C("route_success","CONTINUE","met_redirect_success_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalProtectiveOutcome==="success",knownBlocker:null})}),
      C("route_partial","CONTINUE","met_redirect_partial_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalProtectiveOutcome==="partial",knownBlocker:null})}),
      C("route_failure","CONTINUE","met_redirect_failure_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalProtectiveOutcome==="failure",knownBlocker:null})})]},
    {beatId:"met_impact_dispatch",mode:"choice",environmentRef:courtyard,text:"",choices:[
      C("route_success","CONTINUE","met_impact_success_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalProtectiveOutcome==="success",knownBlocker:null})}),
      C("route_partial","CONTINUE","met_impact_partial_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalProtectiveOutcome==="partial",knownBlocker:null})}),
      C("route_failure","CONTINUE","met_impact_failure_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalProtectiveOutcome==="failure",knownBlocker:null})})]},
    {beatId:"met_destroy_dispatch",mode:"choice",environmentRef:courtyard,text:"",choices:[
      C("route_success","CONTINUE","met_destroy_success_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalProtectiveOutcome==="success",knownBlocker:null})}),
      C("route_partial","CONTINUE","met_destroy_partial_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalProtectiveOutcome==="partial",knownBlocker:null})}),
      C("route_failure","CONTINUE","met_destroy_failure_01",null,{availability:ctx=>({available:(ctx&&ctx.localContext||A.local()).metalProtectiveOutcome==="failure",knownBlocker:null})})]},
    {beatId:"met_redirect_success_01",mode:"narration",environmentRef:courtyard,text:"Metal reaches the dummy on the turn and kicks across its line instead of against it. The frame whips past the student and crashes into empty ground.",nextBeatId:"met_redirect_success_02"},
    {beatId:"met_redirect_success_02",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Nice save.",nextBeatId:"met_redirect_success_03"},
    {beatId:"met_redirect_success_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"You okay?",nextBeatId:"met_hazard_after_success_01"},
    {beatId:"met_redirect_partial_01",mode:"narration",environmentRef:courtyard,text:"Metal catches the frame badly but changes its path enough that the direct hit is gone. The Genin grabs the student and pulls them clear of the new line.",nextBeatId:"met_redirect_partial_02"},
    {beatId:"met_redirect_partial_02",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Close.",nextBeatId:"met_redirect_partial_03"},
    {beatId:"met_redirect_partial_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"Too close.",nextBeatId:"met_hazard_after_partial_01"},
    {beatId:"met_redirect_failure_01",mode:"narration",environmentRef:courtyard,text:"Metal hits the frame at the wrong angle. It barely moves. The Genin gets there first and drags the student clear before the dummy smashes through the empty marker behind them.",nextBeatId:"met_redirect_failure_02"},
    {beatId:"met_redirect_failure_02",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"Are you hurt?",nextBeatId:"met_redirect_failure_03"},
    {beatId:"met_redirect_failure_03",mode:"dialogue",speakerName:"STUDENT",environmentRef:courtyard,text:"No.",nextBeatId:"met_hazard_after_failure_01"},
    {beatId:"met_impact_success_01",mode:"narration",environmentRef:courtyard,text:"Metal steps into the dummy's path and braces. The moving frame drives into him and stops short of the student behind him.",nextBeatId:"met_impact_success_02"},
    {beatId:"met_impact_success_02",mode:"dialogue",speakerName:"STUDENT",environmentRef:courtyard,text:"Metal?",nextBeatId:"met_impact_success_03"},
    {beatId:"met_impact_success_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"You okay?",nextBeatId:"met_hazard_after_success_01"},
    {beatId:"met_impact_partial_01",mode:"narration",environmentRef:courtyard,text:"Metal gets between the dummy and the student, but the frame keeps driving him backward. The Genin catches the other side. Together they stop it.",nextBeatId:"met_impact_partial_02"},
    {beatId:"met_impact_partial_02",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Got it.",nextBeatId:"met_impact_partial_03"},
    {beatId:"met_impact_partial_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"I had it.",nextBeatId:"met_impact_partial_04"},
    {beatId:"met_impact_partial_04",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Sure.",nextBeatId:"met_hazard_after_partial_01"},
    {beatId:"met_impact_failure_01",mode:"narration",environmentRef:courtyard,text:"Metal moves to put himself in the path and comes up one step short. The Genin pulls the student sideways as the dummy tears through the space they were standing in.",nextBeatId:"met_impact_failure_02"},
    {beatId:"met_impact_failure_02",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"You good?",nextBeatId:"met_impact_failure_03"},
    {beatId:"met_impact_failure_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"Ask them.",nextBeatId:"met_hazard_after_failure_01"},
    {beatId:"met_destroy_success_01",mode:"narration",environmentRef:courtyard,text:"Metal does not chase the whole frame. He targets the joint carrying its momentum and drives his strike through it. The dummy folds sideways and drops before it reaches the student.",nextBeatId:"met_destroy_success_02"},
    {beatId:"met_destroy_success_02",mode:"narration",environmentRef:courtyard,text:"For a second, the courtyard is silent. Metal looks around at everybody staring.",nextBeatId:"met_destroy_success_03"},
    {beatId:"met_destroy_success_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"What?",nextBeatId:"met_hazard_after_success_01"},
    {beatId:"met_destroy_partial_01",mode:"narration",environmentRef:courtyard,text:"Metal's strike breaks one side of the moving frame. The rest keeps coming. The Genin drives into the damaged section and knocks it down before it reaches the student.",nextBeatId:"met_destroy_partial_02"},
    {beatId:"met_destroy_partial_02",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"I weakened it.",nextBeatId:"met_destroy_partial_03"},
    {beatId:"met_destroy_partial_03",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"I noticed.",nextBeatId:"met_hazard_after_partial_01"},
    {beatId:"met_destroy_failure_01",mode:"narration",environmentRef:courtyard,text:"Metal commits to the strike. The joint slips past the point he aimed for. The Genin shoves the student clear and the dummy crashes into the empty rack behind them.",nextBeatId:"met_destroy_failure_02"},
    {beatId:"met_destroy_failure_02",mode:"narration",environmentRef:courtyard,text:"Metal stares at the mark his fist left on the wrong part of the frame.",nextBeatId:"met_destroy_failure_03"},
    {beatId:"met_destroy_failure_03",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"They're okay.",nextBeatId:"met_destroy_failure_04"},
    {beatId:"met_destroy_failure_04",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"I know.",nextBeatId:"met_hazard_after_failure_01"},
    {beatId:"met_hazard_after_success_01",mode:"narration",environmentRef:courtyard,text:"The courtyard is much quieter now. Metal checks the student once more before he remembers the audience exists.",nextBeatId:"met_hazard_after_success_02"},
    {beatId:"met_hazard_after_success_02",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"You moved fast.",nextBeatId:"met_hazard_after_success_03"},
    {beatId:"met_hazard_after_success_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"Had to.",nextBeatId:"met_close_01"},
    {beatId:"met_hazard_after_partial_01",mode:"narration",environmentRef:courtyard,text:"The student is safe. The Genin is still standing beside Metal, one hand on whatever part of the dummy they had to stop together.",nextBeatId:"met_hazard_after_partial_02"},
    {beatId:"met_hazard_after_partial_02",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"You didn't freeze.",nextBeatId:"met_hazard_after_partial_03"},
    {beatId:"met_hazard_after_partial_03",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"Wasn't time.",nextBeatId:"met_close_01"},
    {beatId:"met_hazard_after_failure_01",mode:"narration",environmentRef:courtyard,text:"The student is safe because somebody else finished what Metal tried to do. The Genin does not tell him it was fine. Metal does not ask them to.",nextBeatId:"met_hazard_after_failure_02"},
    {beatId:"met_hazard_after_failure_02",mode:"dialogue",speakerName:"STUDENT",environmentRef:courtyard,text:"I'm okay.",nextBeatId:"met_close_01"},
    {beatId:"met_backout_01",mode:"narration",environmentRef:courtyard,text:"Metal looks at the Genin, then at everybody behind them.",nextBeatId:"met_backout_02"},
    {beatId:"met_backout_02",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"No.",nextBeatId:"met_backout_03"},
    {beatId:"met_backout_03",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Okay.",nextBeatId:"met_backout_04"},
    {beatId:"met_backout_04",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"I didn't say I couldn't.",nextBeatId:"met_backout_05"},
    {beatId:"met_backout_05",mode:"dialogue",speakerName:"GENIN",environmentRef:courtyard,text:"Didn't say you did.",nextBeatId:"met_close_01"},
    {beatId:"met_close_01",mode:"narration",environmentRef:courtyard,text:"Eventually the courtyard starts to empty. The clean marks from Metal's private training are still there. So are the later ones. He looks at both before tightening his hand wraps.",nextBeatId:"met_close_02"},
    {beatId:"met_close_02",mode:"dialogue",speakerName:"METAL",environmentRef:courtyard,text:"Again.",nextBeatId:"met_close_03"},
    {beatId:"met_close_03",mode:"narration",environmentRef:courtyard,text:"YOUR CHRONICLE BEGINS",exitScene:true}
  ],onCompleteConsequences:[X("academy_metal_lee",[priv,perf,protect,contact])]});
})();
})();
