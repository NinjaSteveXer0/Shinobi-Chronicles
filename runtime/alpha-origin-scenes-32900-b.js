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
  const sealCommit=R("kushina_seal_resolution_32900","academy_kushina",seal,
    ctx=>({qualifyingFuinjutsuWorkCompleted:["correct_formula","contain_damaged_seal"].includes(ctx.kushinaCrisisChoice),crisisChoice:ctx.kushinaCrisisChoice||null}),
    ctx=>["correct_formula","contain_damaged_seal"].includes(ctx.kushinaCrisisChoice)?["KUS-01"]:[]);
  A.register({sceneId:scene,eventId:scene,title:"ACADEMY KUSHINA",entryBeatId:"kus_crisis",participants:[],beats:[
    {beatId:"kus_crisis",mode:"choice",text:"An Academy sealing exercise destabilises around another student. Choose a response to the unstable formula.",choices:[
      C("correct_formula","Correct the sealing formula through Fūinjutsu","kus_reverse",{kushinaCrisisChoice:"correct_formula"}),
      C("protect_student","Physically remove / protect the endangered student","kus_ordinary_end",{kushinaCrisisChoice:"protect_student"}),
      C("contain_damaged_seal","Complete / contain the damaged seal","kus_ordinary_end",{kushinaCrisisChoice:"contain_damaged_seal"}),
      C("move_unstable_object","Move the unstable object to a safer place","kus_ordinary_end",{kushinaCrisisChoice:"move_unstable_object"})]},
    {beatId:"kus_ordinary_end",mode:"narration",text:"The immediate crisis is resolved by the action Kushina actually took. No unchosen summon history is fabricated.",onEnterConsequences:[sealCommit],exitScene:true},
    {beatId:"kus_reverse",mode:"narration",text:"The corrected formula flashes and folds inward through a connection it was never meant to reach. A genuine accidental reverse-summoning occurrence opens.",onEnterConsequences:[
      sealCommit,
      R("kushina_first_contact_32900","academy_kushina",contact,{gerotoraFirstContactOccurred:true},["KUS-05"],{participantRefs:["key_gero"]})],nextBeatId:"kus_gero_1"},
    {beatId:"kus_gero_1",mode:"dialogue",speakerName:"GEROTORA",text:"...That is not where I was.",nextBeatId:"kus_gero_2"},
    {beatId:"kus_gero_2",mode:"dialogue",speakerName:"KUSHINA",text:"You're a toad.",nextBeatId:"kus_gero_3"},
    {beatId:"kus_gero_3",mode:"dialogue",speakerName:"GEROTORA",text:"Excellent observation.",nextBeatId:"kus_contact_choice"},
    {beatId:"kus_contact_choice",mode:"choice",text:"Gerotora studies the residual seal. What does Kushina do?",choices:[
      C("ask_what_happened","Ask what happened.","kus_close",{kushinaGerotoraChoice:"ask_what_happened"}),
      C("ask_who","Ask who he is.","kus_close",{kushinaGerotoraChoice:"ask_who"}),
      C("help_close","Help stabilise / close the residual seal.","kus_close",{kushinaGerotoraChoice:"help_close"}),
      C("send_back","Try to send him back / tell him to go back.","kus_close",{kushinaGerotoraChoice:"send_back"})]},
    {beatId:"kus_close",mode:"dialogue",speakerName:"GEROTORA",text:"Next time you touch a formula you don't understand, try not to drag somebody through it.",onEnterConsequences:[
      R("kushina_identity_32900","academy_kushina",identity,ctx=>({gerotoraCommunicatedOwnIdentity:ctx.kushinaGerotoraChoice==="ask_who"}),ctx=>ctx.kushinaGerotoraChoice==="ask_who"?["KUS-02"]:[],{participantRefs:["key_gero"]}),
      R("kushina_cause_32900","academy_kushina",cause,ctx=>({gerotoraExplainedResidualFormulaInference:ctx.kushinaGerotoraChoice==="ask_what_happened"}),ctx=>ctx.kushinaGerotoraChoice==="ask_what_happened"?["KUS-03"]:[],{participantRefs:["key_gero"]}),
      R("kushina_joint_32900","academy_kushina",joint,ctx=>({jointResidualSealClosureWithGerotora:ctx.kushinaGerotoraChoice==="help_close"}),ctx=>ctx.kushinaGerotoraChoice==="help_close"?["KUS-04"]:[],{participantRefs:["key_gero"]})],nextBeatId:"kus_answer"},
    {beatId:"kus_answer",mode:"dialogue",speakerName:"KUSHINA",text:"I understood it.",nextBeatId:"kus_last"},
    {beatId:"kus_last",mode:"dialogue",speakerName:"GEROTORA",text:"That's what worries me.",exitScene:true}
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

// Iwabee — practical terrain reshaping and a genuine secondary Rogue occurrence.
(()=>{
  const reshape="occ_origin_iwabee_training_ground_reshape_resolution",rogue="occ_origin_iwabee_rogue_genin_response_resolution",scene=A.sceneByVariant.academy_iwabee;
  A.register({sceneId:scene,eventId:scene,title:"ACADEMY IWABEE",entryBeatId:"iwa_task",participants:[],beats:[
    {beatId:"iwa_task",mode:"dialogue",speakerName:"INSTRUCTOR",text:"Make the area usable again.",nextBeatId:"iwa_reshape"},
    {beatId:"iwa_reshape",mode:"choice",text:"Choose how Iwabee reshapes the damaged ground.",choices:[
      C("raise_collapsed","Raise the collapsed section","iwa_expose",{iwabeeTerrainChoice:"raise_collapsed"}),
      C("flatten_ground","Flatten the damaged ground","iwa_expose",{iwabeeTerrainChoice:"flatten_ground"}),
      C("build_path","Build a stable path through it","iwa_expose",{iwabeeTerrainChoice:"build_path"}),
      C("reinforce_weakest","Reinforce the weakest section","iwa_expose",{iwabeeTerrainChoice:"reinforce_weakest"})]},
    {beatId:"iwa_expose",mode:"narration",text:"The factual terrain change exposes a Rogue Genin who was using the damaged area as concealment. The Rogue was not part of the Academy exercise.",onEnterConsequences:[
      R("iwabee_reshape_32900","academy_iwabee",reshape,ctx=>({trainingGroundReshapeObjectiveCompletedByIwabee:true,terrainChoice:ctx.iwabeeTerrainChoice||null}),["IWA-01"])],nextBeatId:"iwa_response"},
    {beatId:"iwa_response",mode:"choice",text:"Choose Iwabee's response to the secondary occurrence.",choices:[
      C("confront_immediately","Confront him immediately","iwa_response",null,{availability:A.unavailableBattle(scene,"Direct Rogue Genin Battle requires its exact current Combat caller; this branch remains fail-closed.")}),
      C("block_escape","Block his escape route with Earth Release","iwa_response",null,{availability:A.unavailableBattle(scene,"This route may surrender/capture or become a controlled Battle. Its exact World resolution is not guessed.")}),
      C("call_instructor","Call the instructor","iwa_eval",{iwabeeRogueResponse:"call_instructor"}),
      C("ignore_finish","Ignore him and finish the training objective","iwa_eval",{iwabeeRogueResponse:"ignore_finish"})]},
    {beatId:"iwa_eval",mode:"dialogue",speakerName:"INSTRUCTOR",text:"You know what your problem is, Iwabee?",onEnterConsequences:[
      R("iwabee_rogue_response_32900","academy_iwabee",rogue,ctx=>({rogueGeninParticipantRef:"iwabee_origin_rogue_genin_01",earthReleaseUsedToConstrainRogueGenin:false,response:ctx.iwabeeRogueResponse||null}),[],{participantRefs:["iwabee_origin_rogue_genin_01"]})],nextBeatId:"iwa_reply"},
    {beatId:"iwa_reply",mode:"dialogue",speakerName:"IWABEE",text:"Yeah. Written tests.",nextBeatId:"iwa_truth"},
    {beatId:"iwa_truth",mode:"dialogue",speakerName:"INSTRUCTOR",text:"No. You keep acting like the only things that count are the things you're bad at.",nextBeatId:"iwa_reflect"},
    {beatId:"iwa_reflect",mode:"choice",text:"What does Iwabee make of the assessment?",choices:[
      C("know_good_at","I know what I'm good at.","iwa_end"),C("better_rest","I still need to get better at the rest.","iwa_end"),
      C("academy_tests_wrong","Maybe the Academy tests the wrong things.","iwa_end"),C("dont_care","I don't care what they think.","iwa_end")]},
    {beatId:"iwa_end",mode:"narration",text:"The practical objective and the secondary occurrence remain separate facts. No personality lock follows.",exitScene:true}
  ],onCompleteConsequences:[X("academy_iwabee",[reshape,rogue])]});
})();

// Metal Lee — private capability first; pressured performance and protection stay distinct.
(()=>{
  const priv="occ_origin_metal_private_training_resolution",perf="occ_origin_metal_pressured_performance_resolution",protect="occ_origin_metal_protective_response_resolution",contact="occ_origin_metal_inviting_genin_prior_contact",scene=A.sceneByVariant.academy_metal_lee;
  A.register({sceneId:scene,eventId:scene,title:"ACADEMY METAL LEE",entryBeatId:"met_private",participants:[],beats:[
    {beatId:"met_private",mode:"narration",text:"Metal trains alone and legitimately demonstrates Taijutsu and Stamina capability before discovering he is being watched. Later public performance cannot erase that earlier evidence.",onEnterConsequences:[
      R("metal_private_32900","academy_metal_lee",priv,{qualifyingPrivateTaijutsuOrConditioningWorkCompleted:true,observerDiscoveryOccurredAfterQualifyingPrivateWork:true},["MET-01"])],nextBeatId:"met_invite"},
    {beatId:"met_invite",mode:"choice",speakerName:"GENIN",text:"An inviting Genin notices him. The performance context changes once Metal knows he is being watched.",onEnterConsequences:[
      R("metal_contact_32900","academy_metal_lee",contact,{invitingGeninEncounterOccurred:true,invitingGeninParticipantRef:"metal_origin_inviting_genin"},["MET-04"],{participantRefs:["metal_origin_inviting_genin"]})],choices:[
      C("spar","Spar","met_invite",null,{availability:A.unavailableBattle(scene,"The optional Metal spar needs its exact current controlled-Battle opponent/caller; it remains fail-closed rather than fabricating a Rogue Genin Battle.")}),
      C("demonstrate","Demonstrate further on the training dummy","met_dummy",{metalBranch:"demonstrate"}),
      C("back_out","Back out","met_backout",{metalBranch:"back_out"})]},
    {beatId:"met_dummy",mode:"narration",text:"Under the audience's attention, the demonstration becomes rougher and an accidental training-dummy hazard threatens another student. Contextual performance is not underlying capability.",onEnterConsequences:[
      R("metal_perf_32900","academy_metal_lee",perf,{pressuredPerformanceClass:"rough",context:"audience_pressure_demonstration"},["MET-02"])],nextBeatId:"met_protect"},
    {beatId:"met_protect",mode:"choice",text:"The dummy hazard is real. Choose Metal's protective response.",choices:[
      C("redirect_dummy","Redirect the dummy","met_end",{metalProtectiveResponse:"redirect_dummy"}),
      C("take_impact","Take the impact","met_end",{metalProtectiveResponse:"take_impact"}),
      C("destroy_dummy","Destroy the dummy","met_end",{metalProtectiveResponse:"destroy_dummy"})]},
    {beatId:"met_backout",mode:"narration",text:"Backing out is one committed historical decision. It is not cowardice, incompetence, or a permanent anxiety state.",nextBeatId:"met_end"},
    {beatId:"met_end",mode:"narration",text:"Private capability, pressured performance, protective response and observer interpretation remain separate facts.",onEnterConsequences:[
      R("metal_protect_32900","academy_metal_lee",protect,ctx=>({protectiveResponseAttempted:!!ctx.metalProtectiveResponse,protectiveResponseKind:ctx.metalProtectiveResponse||null,protectiveResponseOutcome:"attempt_committed"}),ctx=>ctx.metalProtectiveResponse?["MET-03"]:[])],exitScene:true}
  ],onCompleteConsequences:[X("academy_metal_lee",[priv,perf,protect,contact])]});
})();
})();
