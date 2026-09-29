// ALPHA ORIGIN 32900 — Kushina / Kurenai / Iwabee / Metal Lee.
(function installAlphaOrigin32900B(){
"use strict";
const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)throw new Error("alpha_origin_32900_core_required");
const C=A.choice.bind(A),R=A.commitRequest.bind(A),X=A.completionRequest.bind(A);

// Kushina — natural-voice preview rewrite; sealing semantics preserved.
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
    N("kus_practical_01","The practice scroll lies open on the courtyard stone.\n\nKushina is already staring at the same line for the third time.\n\nThe classmate beside her notices.","kus_practical_02"),
    D("kus_practical_02","CLASSMATE","Still checking it?","kus_practical_03"),
    D("kus_practical_03","KUSHINA","Because he made us redraw it.","kus_practical_04"),
    N("kus_practical_04","The instructor looks over from the next station.","kus_practical_05"),
    D("kus_practical_05","INSTRUCTOR","Because it was wrong.","kus_practical_06"),
    N("kus_practical_06","Kushina points at the line.","kus_practical_07"),
    D("kus_practical_07","KUSHINA","It was barely wrong.","kus_practical_08"),
    D("kus_practical_08","INSTRUCTOR","Still wrong.","kus_practical_09"),
    N("kus_practical_09","Kushina mutters under her breath.\n\nThe classmate smiles.","kus_practical_10"),
    D("kus_practical_10","CLASSMATE","You know he can hear you.","kus_practical_11"),
    D("kus_practical_11","KUSHINA","Good.","kus_practical_12"),
    N("kus_practical_12","The instructor shakes his head and keeps walking.\n\nKushina goes back to the seal.\n\nShe likes this part more than she wants to admit.\n\nA line goes somewhere.\n\nA mark connects to something.\n\nIf it fails, there is a reason.\n\nShe places the next mark.\n\nThe classmate adds theirs.\n\nThe formula settles.\n\nThen one line twitches.\n\nKushina's expression changes.","kus_practical_13"),
    D("kus_practical_13","KUSHINA","Wait.","kus_practical_14"),
    N("kus_practical_14","The classmate looks down.\n\nThe seal flashes.","kus_break_01"),
    N("kus_break_01","Chakra spits through the damaged line.\n\nThe scroll jumps off the stone.\n\nThe classmate freezes beside it.\n\nThe instructor turns.\n\nKushina is closer.\n\nAnother pulse is already building.","kus_crisis"),
    Q("kus_crisis","",[
      C("protect_student","GET THE STUDENT CLEAR","kus_protect_student_01",{kushinaCrisisChoice:"protect_student"}),
      C("contain_damaged_seal","CONTAIN THE DAMAGED SEAL","kus_contain_seal_01",{kushinaCrisisChoice:"contain_damaged_seal"}),
      C("move_unstable_object","MOVE THE SCROLL TO THE SAFETY LANE","kus_move_object_01",{kushinaCrisisChoice:"move_unstable_object"}),
      C("correct_formula","CORRECT THE FORMULA","kus_reverse_01",{kushinaCrisisChoice:"correct_formula"})
    ]),

    N("kus_protect_student_01","Kushina grabs the classmate by the arm.","kus_protect_student_02"),
    D("kus_protect_student_02","CLASSMATE","Kushina—","kus_protect_student_03"),
    N("kus_protect_student_03","She yanks them backward.\n\nThe next burst of chakra cuts across the spot where they were kneeling.\n\nThey hit the ground together.\n\nThe instructor moves in and secures the scroll.\n\nThe classmate sits up.","kus_protect_student_04"),
    D("kus_protect_student_04","CLASSMATE","You could've warned me.","kus_protect_student_05"),
    N("kus_protect_student_05","Kushina points at the scorched stone.","kus_protect_student_06"),
    D("kus_protect_student_06","KUSHINA","There wasn't time.","kus_protect_student_07"),
    N("kus_protect_student_07","The classmate looks at it.\n\nThen at her.","kus_protect_student_08"),
    D("kus_protect_student_08","CLASSMATE","Okay.","kus_protect_student_09"),
    N("kus_protect_student_09","Kushina gets up first and offers a hand.\n\nThe classmate takes it.\n\nThe instructor finishes locking down the damaged seal.","kus_protect_student_10"),
    D("kus_protect_student_10","INSTRUCTOR","Why didn't you try to fix it?","kus_protect_student_11"),
    N("kus_protect_student_11","Kushina looks at him.","kus_protect_student_12"),
    D("kus_protect_student_12","KUSHINA","They were right next to it.","kus_protect_student_13"),
    N("kus_protect_student_13","The answer is immediate.\n\nThe instructor nods.","kus_protect_student_14"),
    D("kus_protect_student_14","INSTRUCTOR","Fair.","kus_protect_student_15"),
    N("kus_protect_student_15","Kushina looks at the scroll.","kus_protect_student_16"),
    D("kus_protect_student_16","KUSHINA","Can I see what broke?","kus_protect_student_17"),
    D("kus_protect_student_17","INSTRUCTOR","After I make sure it isn't going to spit chakra at you again.","kus_protect_student_18"),
    N("kus_protect_student_18","Kushina folds her arms.","kus_protect_student_19"),
    D("kus_protect_student_19","KUSHINA","Fine.","kus_protect_student_20"),
    N("kus_protect_student_20","The classmate brushes dust from their clothes.","kus_protect_student_21"),
    D("kus_protect_student_21","CLASSMATE","Thanks.","kus_protect_student_22"),
    N("kus_protect_student_22","Kushina looks away.","kus_protect_student_23"),
    D("kus_protect_student_23","KUSHINA","Yeah.","kus_protect_student_24"),
    N("kus_protect_student_24","A beat.","kus_protect_student_25"),
    D("kus_protect_student_25","KUSHINA","Next time move when I yell.","kus_protect_student_26"),
    N("kus_protect_student_26","The classmate laughs.","kus_protect_close_01"),
    N("kus_protect_close_01","At the courtyard gate, the classmate catches up with her.","kus_protect_close_02"),
    D("kus_protect_close_02","CLASSMATE","You really would've dragged me out again, wouldn't you?","kus_protect_close_03"),
    N("kus_protect_close_03","Kushina looks at them.","kus_protect_close_04"),
    D("kus_protect_close_04","KUSHINA","If you froze again.","kus_protect_close_05"),
    D("kus_protect_close_05","CLASSMATE","I didn't freeze.","kus_protect_close_06"),
    N("kus_protect_close_06","Kushina gives them a look.\n\nThe classmate sighs.","kus_protect_close_07"),
    D("kus_protect_close_07","CLASSMATE","Fine. Maybe a little.","kus_protect_close_08"),
    N("kus_protect_close_08","Kushina grins.\n\nThey leave the courtyard.","kus_receipt",{onEnterConsequences:[sealCommit]}),

    N("kus_contain_seal_01","Kushina drops beside the scroll.\n\nThe original line is already too damaged to repair cleanly before the next pulse.\n\nShe stops trying to copy it.\n\nInstead, she draws a tighter boundary around the break.\n\nThe chakra pushes against it.\n\nKushina holds the line.\n\nThe classmate backs away.\n\nThe leak stops.\n\nThe instructor reaches them and looks down.","kus_contain_seal_02"),
    D("kus_contain_seal_02","INSTRUCTOR","That's not the formula I gave you.","kus_contain_seal_03"),
    D("kus_contain_seal_03","KUSHINA","I know.","kus_contain_seal_04"),
    D("kus_contain_seal_04","INSTRUCTOR","You changed it.","kus_contain_seal_05"),
    D("kus_contain_seal_05","KUSHINA","The other one was leaking.","kus_contain_seal_06"),
    N("kus_contain_seal_06","The instructor crouches.\n\nChecks the new boundary.","kus_contain_seal_07"),
    D("kus_contain_seal_07","INSTRUCTOR","It's contained.","kus_contain_seal_08"),
    N("kus_contain_seal_08","Kushina looks satisfied.","kus_contain_seal_09"),
    D("kus_contain_seal_09","KUSHINA","Exactly.","kus_contain_seal_10"),
    N("kus_contain_seal_10","The classmate leans in.","kus_contain_seal_11"),
    D("kus_contain_seal_11","CLASSMATE","It looks awful.","kus_contain_seal_12"),
    N("kus_contain_seal_12","Kushina turns.","kus_contain_seal_13"),
    D("kus_contain_seal_13","KUSHINA","It's holding.","kus_contain_seal_14"),
    D("kus_contain_seal_14","CLASSMATE","I said it looks awful.","kus_contain_seal_15"),
    N("kus_contain_seal_15","Kushina stares at them.\n\nThe classmate smiles.\n\nKushina gives up and looks back at the seal.\n\nThe instructor almost smiles too.","kus_contain_close_01"),
    N("kus_contain_close_01","The instructor hands Kushina a fresh sheet.\n\nShe looks at it.\n\nThen at him.","kus_contain_close_02"),
    D("kus_contain_close_02","KUSHINA","You want me to do another one?","kus_contain_close_03"),
    D("kus_contain_close_03","INSTRUCTOR","Yes.","kus_contain_close_04"),
    D("kus_contain_close_04","KUSHINA","Right now?","kus_contain_close_05"),
    D("kus_contain_close_05","INSTRUCTOR","Tomorrow.","kus_contain_close_06"),
    N("kus_contain_close_06","Kushina looks back at the contained seal.","kus_contain_close_07"),
    D("kus_contain_close_07","KUSHINA","Mine still worked.","kus_contain_close_08"),
    D("kus_contain_close_08","INSTRUCTOR","Tomorrow, Kushina.","kus_contain_close_09"),
    N("kus_contain_close_09","She tucks the sheet under her arm.","kus_contain_close_10"),
    D("kus_contain_close_10","KUSHINA","I'm still counting it.","kus_contain_close_11"),
    N("kus_contain_close_11","She leaves.","kus_receipt",{onEnterConsequences:[sealCommit]}),

    N("kus_move_object_01","The scroll jumps again.\n\nKushina grabs it.\n\nThe instructor sees her.","kus_move_object_02"),
    D("kus_move_object_02","INSTRUCTOR","Don't—","kus_move_object_03"),
    N("kus_move_object_03","Kushina throws the scroll into the empty safety lane.\n\nThe next pulse erupts there instead of beside the classmate.\n\nEveryone stares at the smoking scroll.\n\nThe instructor looks at Kushina.","kus_move_object_04"),
    D("kus_move_object_04","INSTRUCTOR","You threw it.","kus_move_object_05"),
    D("kus_move_object_05","KUSHINA","Nobody was over there.","kus_move_object_06"),
    N("kus_move_object_06","The instructor moves to secure it.\n\nThe classmate looks at Kushina.","kus_move_object_07"),
    D("kus_move_object_07","CLASSMATE","You didn't know what it would do when it landed.","kus_move_object_08"),
    N("kus_move_object_08","Kushina looks at the empty safety lane.\n\nThen back at them.","kus_move_object_09"),
    D("kus_move_object_09","KUSHINA","I knew you weren't standing there.","kus_move_object_10"),
    N("kus_move_object_10","The instructor finishes locking down the scroll.","kus_move_object_11"),
    D("kus_move_object_11","INSTRUCTOR","Next time, tell me before you throw an unstable seal across the courtyard.","kus_move_object_12"),
    N("kus_move_object_12","Kushina opens her mouth.\n\nThe instructor raises a hand.","kus_move_object_13"),
    D("kus_move_object_13","INSTRUCTOR","Before.","kus_move_object_14"),
    N("kus_move_object_14","Kushina closes her mouth.\n\nThen:","kus_move_object_15"),
    D("kus_move_object_15","KUSHINA","Fine.","kus_move_object_16"),
    N("kus_move_object_16","The classmate laughs.","kus_move_close_01"),
    N("kus_move_close_01","They walk toward the gate together.\n\nThe classmate glances back at the safety lane.","kus_move_close_02"),
    D("kus_move_close_02","CLASSMATE","You scared me.","kus_move_close_03"),
    N("kus_move_close_03","Kushina looks surprised.","kus_move_close_04"),
    D("kus_move_close_04","KUSHINA","The seal scared you.","kus_move_close_05"),
    D("kus_move_close_05","CLASSMATE","You throwing it didn't help.","kus_move_close_06"),
    N("kus_move_close_06","Kushina thinks about that.","kus_move_close_07"),
    D("kus_move_close_07","KUSHINA","...Okay.","kus_move_close_08"),
    N("kus_move_close_08","The classmate looks at her.\n\nKushina points ahead.","kus_move_close_09"),
    D("kus_move_close_09","KUSHINA","Don't make a big deal out of it.","kus_move_close_10"),
    N("kus_move_close_10","They keep walking.","kus_receipt",{onEnterConsequences:[sealCommit]}),

    N("kus_reverse_01","Kushina drops beside the scroll.\n\nThe damage is narrow.\n\nOne connection failed to close.\n\nShe can see it.\n\nShe knows where it should go.","kus_reverse_02",{onEnterConsequences:[sealCommit]}),
    D("kus_reverse_02","INSTRUCTOR","Kushina, wait.","kus_reverse_03"),
    D("kus_reverse_03","KUSHINA","I see it.","kus_reverse_04"),
    N("kus_reverse_04","She redraws the line.\n\nThe formula settles.\n\nKushina smiles.\n\nThen the seal flashes white.\n\nThe courtyard seems to fold inward.\n\nKushina throws an arm over her face.\n\nThe classmate yells.\n\nThe light disappears.","kus_gero_01"),
    N("kus_gero_01","Something lands beside the scroll.\n\nA toad.\n\nNobody speaks for a second.\n\nThe toad looks around.\n\nThen at Kushina.","kus_gero_02",{onEnterConsequences:[firstContactCommit]}),
    D("kus_gero_02","TOAD","Where am I?","kus_gero_03"),
    N("kus_gero_03","Kushina stares.","kus_gero_04"),
    D("kus_gero_04","KUSHINA","The Academy.","kus_gero_05"),
    N("kus_gero_05","The toad looks at the broken seal.","kus_gero_06"),
    D("kus_gero_06","TOAD","How did I get here?","kus_gero_07"),
    N("kus_gero_07","Kushina looks at the seal too.","kus_gero_08"),
    D("kus_gero_08","KUSHINA","I was hoping you knew.","kus_gero_09"),
    N("kus_gero_09","The instructor steps closer.","kus_gero_10"),
    D("kus_gero_10","INSTRUCTOR","Nobody touch anything.","kus_gero_11"),
    N("kus_gero_11","Kushina lifts both hands.","kus_gero_12"),
    D("kus_gero_12","KUSHINA","I'm not.","kus_gero_13"),
    N("kus_gero_13","The toad looks at her fingers.","kus_gero_14"),
    D("kus_gero_14","TOAD","Keep it that way.","kus_gero_15"),
    N("kus_gero_15","Kushina frowns.\n\nThe connection beneath the scroll is still trembling.\n\nThe instructor keeps the classmate back.\n\nKushina stays near the edge of the seal.\n\nThe toad watches the damaged line.","kus_contact_choice"),
    Q("kus_contact_choice","",[
      C("ask_what_happened","“WHAT HAPPENED?”","kus_ask_what_01",{kushinaGerotoraChoice:"ask_what_happened"}),
      C("ask_who","“WHO ARE YOU?”","kus_ask_who_01",{kushinaGerotoraChoice:"ask_who"}),
      C("help_close","HELP CLOSE THE CONNECTION","kus_help_close_01",{kushinaGerotoraChoice:"help_close"}),
      C("send_back","“CAN YOU GO BACK?”","kus_send_back_01",{kushinaGerotoraChoice:"send_back"})
    ]),

    N("kus_ask_what_01","Kushina points at the formula.","kus_ask_what_02"),
    D("kus_ask_what_02","KUSHINA","What happened?","kus_ask_what_03"),
    N("kus_ask_what_03","The toad studies the line.","kus_ask_what_04"),
    D("kus_ask_what_04","TOAD","You closed the break.","kus_ask_what_05"),
    N("kus_ask_what_05","Kushina nods.","kus_ask_what_06"),
    D("kus_ask_what_06","TOAD","And opened something else.","kus_ask_what_07"),
    N("kus_ask_what_07","Kushina's eyes narrow.","kus_ask_what_08"),
    D("kus_ask_what_08","KUSHINA","Where?","kus_ask_what_09"),
    D("kus_ask_what_09","TOAD","If I knew that, I wouldn't be sitting in your Academy.","kus_ask_what_10"),
    N("kus_ask_what_10","Kushina looks back at the seal.\n\nThe instructor crouches beside the outer edge.","kus_ask_what_11"),
    D("kus_ask_what_11","INSTRUCTOR","Is it still open?","kus_ask_what_12"),
    N("kus_ask_what_12","The toad presses one hand against the stone.","kus_ask_what_13"),
    D("kus_ask_what_13","TOAD","Yes.","kus_ask_what_14"),
    N("kus_ask_what_14","Kushina immediately leans closer.","kus_ask_what_15"),
    D("kus_ask_what_15","KUSHINA","Then tell me how to close it.","kus_closure_method_router",{onEnterConsequences:contactKnowledgeCommits}),

    N("kus_ask_who_01","Kushina looks at the toad.","kus_ask_who_02"),
    D("kus_ask_who_02","KUSHINA","Who are you?","kus_ask_who_03"),
    D("kus_ask_who_03","TOAD","Gerotora.","kus_ask_who_04"),
    N("kus_ask_who_04","Kushina repeats the name once.","kus_ask_who_05"),
    D("kus_ask_who_05","KUSHINA","Gerotora.","kus_ask_who_06"),
    N("kus_ask_who_06","He nods.","kus_ask_who_07"),
    D("kus_ask_who_07","KUSHINA","Do you know how to get back?","kus_ask_who_08"),
    N("kus_ask_who_08","Gerotora looks down at the connection.","kus_ask_who_09"),
    D("kus_ask_who_09","GEROTORA","If you stop touching things for a moment, probably.","kus_ask_who_10"),
    N("kus_ask_who_10","Kushina scowls.","kus_ask_who_11"),
    D("kus_ask_who_11","KUSHINA","I touched one thing.","kus_ask_who_12"),
    N("kus_ask_who_12","The classmate coughs into one hand.\n\nKushina looks back.","kus_ask_who_13"),
    D("kus_ask_who_13","CLASSMATE","Nothing.","kus_closure_method_router",{onEnterConsequences:contactKnowledgeCommits}),

    N("kus_help_close_01","Kushina kneels beside the line.","kus_help_close_02"),
    D("kus_help_close_02","KUSHINA","Tell me what to do.","kus_help_close_03"),
    N("kus_help_close_03","The toad moves to the opposite side.\n\nThe instructor looks at Kushina.","kus_help_close_04"),
    D("kus_help_close_04","INSTRUCTOR","Listen first.","kus_help_close_05"),
    N("kus_help_close_05","Kushina nods.\n\nThis time she actually waits.\n\nThe toad points to the unstable edge.","kus_help_close_06"),
    D("kus_help_close_06","TOAD","Hold that line. Don't change it.","kus_help_close_07"),
    N("kus_help_close_07","Kushina places her fingers where he indicates.\n\nThe connection narrows.\n\nThe pressure pushes back.\n\nKushina holds it.","kus_help_close_08"),
    D("kus_help_close_08","CLASSMATE","Is that good?","kus_help_close_09"),
    D("kus_help_close_09","KUSHINA","It's closing.","kus_help_close_10"),
    N("kus_help_close_10","The toad adjusts his side.","kus_help_close_11"),
    D("kus_help_close_11","TOAD","Keep it there.","kus_help_close_12"),
    N("kus_help_close_12","Kushina does.\n\nThe opening shrinks.\n\nThen stops moving.","kus_closure_method_router",{onEnterConsequences:contactKnowledgeCommits}),

    N("kus_send_back_01","Kushina looks at the toad.","kus_send_back_02"),
    D("kus_send_back_02","KUSHINA","Can you go back?","kus_send_back_03"),
    N("kus_send_back_03","He looks down at the unstable connection.","kus_send_back_04"),
    D("kus_send_back_04","TOAD","Yes.","kus_send_back_05"),
    N("kus_send_back_05","Kushina reaches toward it.\n\nThe toad immediately stops her.","kus_send_back_06"),
    D("kus_send_back_06","TOAD","Not yet.","kus_send_back_07"),
    N("kus_send_back_07","Kushina pulls her hand back.","kus_send_back_08"),
    D("kus_send_back_08","KUSHINA","I wasn't doing anything.","kus_send_back_09"),
    N("kus_send_back_09","The classmate looks at her.\n\nThe instructor looks at her.\n\nThe toad looks at her.\n\nKushina sighs.","kus_send_back_10"),
    D("kus_send_back_10","KUSHINA","Fine. I was going to.","kus_send_back_11"),
    N("kus_send_back_11","The toad points at the line.","kus_send_back_12"),
    D("kus_send_back_12","TOAD","Then listen.","kus_send_back_13"),
    N("kus_send_back_13","Kushina does.","kus_closure_method_router",{onEnterConsequences:contactKnowledgeCommits}),

    {beatId:"kus_closure_method_router",mode:"resolver",machineResolved:true,text:"",environmentRef:courtyard,choices:[
      C("joint","RESOLVE JOINT CLOSURE","kus_closure_joint_01",null,{availability:hidden(()=>A.local().kushinaGerotoraChoice==="help_close")}),
      C("guided","RESOLVE GUIDED CLOSURE","kus_closure_guided_01",null,{availability:hidden(()=>A.local().kushinaGerotoraChoice!=="help_close")})
    ]},
    N("kus_closure_joint_01","Kushina works directly with the toad while he controls the opposite edge.\n\nThe opening gets smaller.\n\nThe last tremor runs through the line.\n\nThen the connection closes.\n\nThe courtyard goes still.","kus_closure_label_router"),
    N("kus_closure_guided_01","The toad controls his side and tells Kushina only what she needs to do safely.\n\nThe opening gets smaller.\n\nThe last tremor runs through the line.\n\nThen the connection closes.\n\nThe courtyard goes still.","kus_closure_label_router"),
    {beatId:"kus_closure_label_router",mode:"resolver",machineResolved:true,text:"",environmentRef:courtyard,choices:[
      C("named","RESOLVE NAMED TOAD","kus_closure_named_01",null,{availability:hidden(()=>A.local().kushinaGerotoraChoice==="ask_who")}),
      C("unnamed","RESOLVE UNNAMED TOAD","kus_closure_toad_01",null,{availability:hidden(()=>A.local().kushinaGerotoraChoice!=="ask_who")})
    ]},
    N("kus_closure_named_01","Gerotora looks down at the seal.\n\nThen at Kushina.","kus_closure_named_02"),
    D("kus_closure_named_02","GEROTORA","Next time, don't redraw a seal unless you know where the line goes.","kus_closure_named_03"),
    N("kus_closure_named_03","Kushina bristles.","kus_closure_named_04"),
    D("kus_closure_named_04","KUSHINA","I knew where it was supposed to go.","kus_closure_named_05"),
    D("kus_closure_named_05","GEROTORA","Then you guessed wrong.","kus_closure_named_06"),
    N("kus_closure_named_06","Kushina opens her mouth.\n\nThe instructor speaks first.","kus_closure_named_07"),
    D("kus_closure_named_07","INSTRUCTOR","He's got you there.","kus_closure_named_08"),
    N("kus_closure_named_08","Kushina looks betrayed.","kus_after_gero_01"),
    N("kus_closure_toad_01","The toad looks down at the seal.\n\nThen at Kushina.","kus_closure_toad_02"),
    D("kus_closure_toad_02","TOAD","Next time, don't redraw a seal unless you know where the line goes.","kus_closure_toad_03"),
    N("kus_closure_toad_03","Kushina bristles.","kus_closure_toad_04"),
    D("kus_closure_toad_04","KUSHINA","I knew where it was supposed to go.","kus_closure_toad_05"),
    D("kus_closure_toad_05","TOAD","Then you guessed wrong.","kus_closure_toad_06"),
    N("kus_closure_toad_06","Kushina crosses her arms.\n\nThe classmate starts smiling.","kus_closure_toad_07"),
    D("kus_closure_toad_07","KUSHINA","Don't.","kus_closure_toad_08"),
    N("kus_closure_toad_08","The classmate stops.\n\nMostly.","kus_after_gero_01"),

    N("kus_after_gero_01","The connection closes completely.\n\nGerotora disappears.\n\nThe classmate stares at the empty spot.","kus_after_gero_02"),
    D("kus_after_gero_02","CLASSMATE","Is he coming back?","kus_after_gero_03"),
    N("kus_after_gero_03","Kushina looks at the instructor.","kus_after_gero_04"),
    D("kus_after_gero_04","KUSHINA","Is he?","kus_after_gero_05"),
    D("kus_after_gero_05","INSTRUCTOR","Not today.","kus_after_gero_06"),
    N("kus_after_gero_06","Kushina looks down at the scroll.","kus_after_gero_07"),
    D("kus_after_gero_07","KUSHINA","I still want to know what I connected to.","kus_after_gero_08"),
    N("kus_after_gero_08","The instructor picks up the damaged sheet.","kus_after_gero_09"),
    D("kus_after_gero_09","INSTRUCTOR","Tomorrow.","kus_after_gero_10"),
    D("kus_after_gero_10","KUSHINA","You keep saying that.","kus_after_gero_11"),
    D("kus_after_gero_11","INSTRUCTOR","Because class is over.","kus_after_gero_12"),
    N("kus_after_gero_12","Kushina looks around.\n\nOnly now does she notice everyone else has started packing up.\n\nThe classmate shoulders their bag.","kus_after_gero_13"),
    D("kus_after_gero_13","CLASSMATE","Come on.","kus_after_gero_14"),
    N("kus_after_gero_14","Kushina stays where she is for another second.\n\nThen gets up.","kus_route_d_close_01"),
    N("kus_route_d_close_01","At the gate, Kushina looks back at the courtyard.\n\nThe instructor is still holding the damaged scroll.\n\nShe points at him.","kus_route_d_close_02"),
    D("kus_route_d_close_02","KUSHINA","Don't throw that away.","kus_route_d_close_03"),
    D("kus_route_d_close_03","INSTRUCTOR","Go home.","kus_route_d_close_04"),
    D("kus_route_d_close_04","KUSHINA","I'm serious.","kus_route_d_close_05"),
    D("kus_route_d_close_05","INSTRUCTOR","I know.","kus_route_d_close_06"),
    N("kus_route_d_close_06","Kushina starts walking.\n\nThe classmate catches up.","kus_route_d_close_07"),
    D("kus_route_d_close_07","CLASSMATE","You're going to ask about it tomorrow, aren't you?","kus_route_d_close_08"),
    N("kus_route_d_close_08","Kushina looks at them.","kus_route_d_close_09"),
    D("kus_route_d_close_09","KUSHINA","Obviously.","kus_route_d_close_10"),
    N("kus_route_d_close_10","They leave together.","kus_receipt"),
    {beatId:"kus_receipt",mode:"record",environmentRef:courtyard,text:"",exitScene:true}
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

// Iwabee — natural-voice preview rewrite; terrain / Battle / World disposition preserved.
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
    {beatId:"iwa_open_01",mode:"narration",environmentRef:courtyard,text:"Iwabee drops the written exercise onto the bench.\n\nA red mark sits across the top.\n\nHe stares at it.\n\nThen pushes the paper away.\n\nThe instructor picks it up.",nextBeatId:"iwa_open_02"},
    {beatId:"iwa_open_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Bad one?",nextBeatId:"iwa_open_03"},
    {beatId:"iwa_open_03",mode:"narration",environmentRef:courtyard,text:"Iwabee looks at him.",nextBeatId:"iwa_open_04"},
    {beatId:"iwa_open_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"What do you think?",nextBeatId:"iwa_open_05"},
    {beatId:"iwa_open_05",mode:"narration",environmentRef:courtyard,text:"The instructor looks at the mark again.",nextBeatId:"iwa_open_06"},
    {beatId:"iwa_open_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"I think you're done with paper for now.",nextBeatId:"iwa_open_07"},
    {beatId:"iwa_open_07",mode:"narration",environmentRef:courtyard,text:"Iwabee straightens.",nextBeatId:"iwa_open_08"},
    {beatId:"iwa_open_08",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Good.",nextBeatId:"iwa_open_09"},
    {beatId:"iwa_open_09",mode:"narration",environmentRef:courtyard,text:"The instructor leads him to a damaged section of the practical ground.\n\nBroken ridges.\n\nLoose stone.\n\nOne side has sunk lower than the rest.",nextBeatId:"iwa_open_10"},
    {beatId:"iwa_open_10",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Fix it.",nextBeatId:"iwa_open_11"},
    {beatId:"iwa_open_11",mode:"narration",environmentRef:courtyard,text:"Iwabee looks over the ground.\n\nThen back at him.",nextBeatId:"iwa_open_12"},
    {beatId:"iwa_open_12",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"That's the whole exercise?",nextBeatId:"iwa_open_13"},
    {beatId:"iwa_open_13",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"For now.",nextBeatId:"iwa_open_14"},
    {beatId:"iwa_open_14",mode:"narration",environmentRef:courtyard,text:"Iwabee rolls one shoulder.\n\nHis mood has already improved.",nextBeatId:"iwa_open_15"},
    {beatId:"iwa_open_15",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Finally.",nextBeatId:"iwa_reshape"},

    {beatId:"iwa_reshape",mode:"choice",environmentRef:courtyard,text:"",choices:[
      C("raise_collapsed","RAISE THE COLLAPSED SECTION","iwa_raise_01",{iwabeeTerrainChoice:"raise_collapsed"}),
      C("flatten_ground","FLATTEN THE DAMAGED GROUND","iwa_flatten_01",{iwabeeTerrainChoice:"flatten_ground"}),
      C("build_path","BUILD A STABLE PATH THROUGH IT","iwa_path_01",{iwabeeTerrainChoice:"build_path"}),
      C("reinforce_weakest","REINFORCE THE WEAKEST SECTION","iwa_reinforce_01",{iwabeeTerrainChoice:"reinforce_weakest"})]},
    {beatId:"iwa_raise_01",mode:"narration",environmentRef:courtyard,text:"Iwabee plants his feet beside the sunken ground.\n\nEarth lifts beneath his hands.\n\nThe collapsed section rises in one rough slab until it sits level with the yard.\n\nLoose stone slides from the edge.\n\nSomething moves underneath it.\n\nIwabee stops.\n\nA person was hiding there.",nextBeatId:"iwa_expose_01"},
    {beatId:"iwa_flatten_01",mode:"narration",environmentRef:courtyard,text:"Iwabee lowers the broken ridges instead of rebuilding them.\n\nThe ground settles.\n\nRubble spreads away from one side.\n\nA crouched figure suddenly loses the cover they were using.\n\nIwabee sees him immediately.",nextBeatId:"iwa_expose_01"},
    {beatId:"iwa_path_01",mode:"narration",environmentRef:courtyard,text:"Iwabee leaves the deepest collapse alone.\n\nHe raises a solid strip of earth through the damaged section.\n\nThe path locks into place.\n\nA pair of feet is standing beside it.\n\nIwabee follows them upward.\n\nSomeone is hiding in the yard.",nextBeatId:"iwa_expose_01"},
    {beatId:"iwa_reinforce_01",mode:"narration",environmentRef:courtyard,text:"Iwabee checks the damaged ground before he moves anything.\n\nOne edge is ready to collapse again.\n\nHe packs earth beneath it until it holds.\n\nA broken sheet of timber shifts aside.\n\nA young shinobi is crouched behind it.",nextBeatId:"iwa_expose_01"},

    {beatId:"iwa_expose_01",mode:"narration",environmentRef:courtyard,text:"The stranger is wearing shinobi gear.\n\nNot Academy gear.\n\nHe looks at Iwabee.\n\nThen the instructor.\n\nThen the open side of the yard.",onEnterConsequences:[reshapeCommit],nextBeatId:"iwa_expose_02"},
    {beatId:"iwa_expose_02",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Move.",nextBeatId:"iwa_expose_03"},
    {beatId:"iwa_expose_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"No.",nextBeatId:"iwa_response"},
    {beatId:"iwa_response",mode:"choice",environmentRef:courtyard,text:"",choices:[
      C("confront","CONFRONT HIM","iwa_confront_01",{iwabeeRogueResponse:"confront"}),
      C("block_escape","BLOCK HIS ESCAPE WITH EARTH RELEASE","iwa_block_01",{iwabeeRogueResponse:"block_escape"}),
      C("call_instructor","CALL THE INSTRUCTOR","iwa_call_01",{iwabeeRogueResponse:"call_instructor"}),
      C("finish_practical","FINISH THE PRACTICAL","iwa_finish_01",{iwabeeRogueResponse:"finish_practical"})]},

    {beatId:"iwa_confront_01",mode:"narration",environmentRef:courtyard,text:"Iwabee steps into the open route.\n\nThe Rogue Genin stops.",nextBeatId:"iwa_confront_02"},
    {beatId:"iwa_confront_02",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Get out of the way, kid.",nextBeatId:"iwa_confront_03"},
    {beatId:"iwa_confront_03",mode:"narration",environmentRef:courtyard,text:"Iwabee sets his feet.",nextBeatId:"iwa_confront_04"},
    {beatId:"iwa_confront_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Make me.",nextBeatId:"iwa_confront_05"},
    {beatId:"iwa_confront_05",mode:"narration",environmentRef:courtyard,text:"The Rogue's attention leaves the exit.\n\nNow it is on Iwabee.",nextBeatId:"iwa_confront_battle"},
    {beatId:"iwa_confront_battle",mode:"battle_transition",environmentRef:courtyard,text:"Iwabee confronts the Rogue Genin.",battle:{
      encounterId:"origin_academy_iwabee:rogue_genin_confrontation",launchResolver:battleLaunch,
      victoryBeatId:"iwa_confront_return_01",defeatBeatId:"iwa_confront_loss_01",resultProjector:battleProject,actionLabel:"Start PL Battle"}},

    {beatId:"iwa_confront_return_01",mode:"narration",environmentRef:courtyard,text:"The Rogue Genin is the first one forced out of the fight.\n\nIwabee is still standing.\n\nThe instructor moves in before either of them can start again.",onEnterConsequences:[confrontVictory],nextBeatId:"iwa_confront_return_02"},
    {beatId:"iwa_confront_return_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"That's enough.",nextBeatId:"iwa_confront_return_03"},
    {beatId:"iwa_confront_return_03",mode:"narration",environmentRef:courtyard,text:"Iwabee looks at the Rogue.",nextBeatId:"iwa_confront_return_04"},
    {beatId:"iwa_confront_return_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"He was leaving.",nextBeatId:"iwa_confront_return_05"},
    {beatId:"iwa_confront_return_05",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"He's not now.",nextBeatId:"iwa_confront_return_06"},
    {beatId:"iwa_confront_return_06",mode:"narration",environmentRef:courtyard,text:"The instructor takes control.\n\nIwabee looks back at the section of ground he repaired before the fight.\n\nIt is still fixed.",nextBeatId:"iwa_eval_route_confront"},

    {beatId:"iwa_confront_loss_01",mode:"narration",environmentRef:courtyard,text:"Iwabee's stance breaks first.\n\nHe catches himself and starts to rise again.\n\nThe Rogue is still ready to fight.\n\nThe instructor steps between them.",nextBeatId:"iwa_confront_loss_02"},
    {beatId:"iwa_confront_loss_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Stop.",nextBeatId:"iwa_confront_loss_03"},
    {beatId:"iwa_confront_loss_03",mode:"narration",environmentRef:courtyard,text:"Iwabee looks past him.",nextBeatId:"iwa_confront_loss_04"},
    {beatId:"iwa_confront_loss_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I can still stand.",nextBeatId:"iwa_confront_loss_05"},
    {beatId:"iwa_confront_loss_05",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"That's not the same as being able to keep fighting.",nextBeatId:"iwa_confront_loss_world_result"},
    {beatId:"iwa_confront_loss_world_result",mode:"narration",environmentRef:courtyard,text:"Iwabee hates that answer.\n\nHe also knows it is true.\n\nThe Rogue looks toward the open edge of the yard.\n\nThe instructor stays between him and Iwabee.\n\nThe Rogue takes the chance and runs.",onEnterConsequences:[confrontDefeat],nextBeatId:"iwa_confront_loss_world_result_02"},
    {beatId:"iwa_confront_loss_world_result_02",mode:"narration",environmentRef:courtyard,text:"Iwabee watches him go.\n\nDoes not chase.\n\nA few seconds later, he looks back at the ground he repaired.\n\nStill fixed.",nextBeatId:"iwa_eval_route_confront_loss_01"},

    {beatId:"iwa_block_01",mode:"narration",environmentRef:courtyard,text:"Iwabee does not run after him.\n\nHe watches the Rogue's eyes.\n\nThe moment the Rogue turns toward the open side of the yard, Iwabee moves the earth.\n\nA wall rises across the exit.\n\nThe Rogue stops short.",nextBeatId:"iwa_block_02"},
    {beatId:"iwa_block_02",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Seriously?",nextBeatId:"iwa_block_03"},
    {beatId:"iwa_block_03",mode:"narration",environmentRef:courtyard,text:"Iwabee looks at the wall.\n\nThen at him.",nextBeatId:"iwa_block_04"},
    {beatId:"iwa_block_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Try somewhere else.",nextBeatId:"iwa_block_return_01"},
    {beatId:"iwa_block_return_01",mode:"narration",environmentRef:courtyard,text:"The Rogue checks the yard again.\n\nInstructor on one side.\n\nEarth wall on the other.\n\nHe raises his hands.\n\nThe instructor moves in and takes control.\n\nIwabee looks at the wall.\n\nThen at the section he repaired first.\n\nBoth are still standing.",onEnterConsequences:[blockCommit],nextBeatId:"iwa_eval_route_block"},

    {beatId:"iwa_call_01",mode:"narration",environmentRef:courtyard,text:"Iwabee keeps his eyes on the Rogue.",nextBeatId:"iwa_call_02"},
    {beatId:"iwa_call_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Sensei.",nextBeatId:"iwa_call_03"},
    {beatId:"iwa_call_03",mode:"narration",environmentRef:courtyard,text:"The instructor is already moving.",nextBeatId:"iwa_call_04"},
    {beatId:"iwa_call_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Back up.",nextBeatId:"iwa_call_05"},
    {beatId:"iwa_call_05",mode:"narration",environmentRef:courtyard,text:"Iwabee does.\n\nSlowly.\n\nThe instructor puts himself between the students and the Rogue.\n\nThe Rogue sees the open side of the yard.\n\nRuns.\n\nIwabee takes one step after him.\n\nThe instructor puts out an arm.",onEnterConsequences:[callCommit],nextBeatId:"iwa_call_06"},
    {beatId:"iwa_call_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Leave it.",nextBeatId:"iwa_call_07"},
    {beatId:"iwa_call_07",mode:"narration",environmentRef:courtyard,text:"Iwabee watches the Rogue disappear.\n\nHe does not like it.\n\nBut he stops.",nextBeatId:"iwa_eval_route_call"},

    {beatId:"iwa_finish_01",mode:"narration",environmentRef:courtyard,text:"Iwabee looks at the Rogue.\n\nThen at the ground he was told to repair.",nextBeatId:"iwa_finish_02"},
    {beatId:"iwa_finish_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Not my job.",nextBeatId:"iwa_finish_03"},
    {beatId:"iwa_finish_03",mode:"narration",environmentRef:courtyard,text:"He turns back to the practical.\n\nBehind him, the Rogue runs for the open side of the yard.\n\nIwabee keeps working.",nextBeatId:"iwa_finish_04"},
    {beatId:"iwa_finish_04",mode:"narration",environmentRef:courtyard,text:"By the time he finishes the last section, the Rogue is gone.\n\nThe ground is usable again.\n\nThat was the assignment.\n\nIwabee completed it.",onEnterConsequences:[finishCommit],nextBeatId:"iwa_eval_route_finish"},

    {beatId:"iwa_eval_route_confront",mode:"narration",environmentRef:courtyard,text:"The instructor checks the repaired ground first.\n\nHe presses one heel into the raised section.\n\nTests the edge.\n\nLooks over the path.\n\nThen he looks at Iwabee.",nextBeatId:"iwa_eval_route_confront_02"},
    {beatId:"iwa_eval_route_confront_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You really went straight for him.",nextBeatId:"iwa_eval_route_confront_03"},
    {beatId:"iwa_eval_route_confront_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"He was right there.",nextBeatId:"iwa_eval_route_confront_04"},
    {beatId:"iwa_eval_route_confront_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Yeah.",nextBeatId:"iwa_eval_route_confront_05"},
    {beatId:"iwa_eval_route_confront_05",mode:"narration",environmentRef:courtyard,text:"The instructor looks toward the repaired ground.",nextBeatId:"iwa_eval_route_confront_06"},
    {beatId:"iwa_eval_route_confront_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"So was your work.",nextBeatId:"iwa_eval_route_confront_07"},
    {beatId:"iwa_eval_route_confront_07",mode:"narration",environmentRef:courtyard,text:"Iwabee looks too.",nextBeatId:"iwa_eval_core_01"},

    {beatId:"iwa_eval_route_confront_loss_01",mode:"narration",environmentRef:courtyard,text:"The instructor checks the repaired ground first.\n\nThen he looks at Iwabee.",nextBeatId:"iwa_eval_route_confront_loss_02"},
    {beatId:"iwa_eval_route_confront_loss_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You picked a fight you couldn't finish.",nextBeatId:"iwa_eval_route_confront_loss_03"},
    {beatId:"iwa_eval_route_confront_loss_03",mode:"narration",environmentRef:courtyard,text:"Iwabee's jaw tightens.",nextBeatId:"iwa_eval_route_confront_loss_04"},
    {beatId:"iwa_eval_route_confront_loss_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I know.",nextBeatId:"iwa_eval_route_confront_loss_05"},
    {beatId:"iwa_eval_route_confront_loss_05",mode:"narration",environmentRef:courtyard,text:"The instructor points toward the repaired ground.",nextBeatId:"iwa_eval_route_confront_loss_06"},
    {beatId:"iwa_eval_route_confront_loss_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You finished that.",nextBeatId:"iwa_eval_route_confront_loss_07"},
    {beatId:"iwa_eval_route_confront_loss_07",mode:"narration",environmentRef:courtyard,text:"Iwabee looks over.",nextBeatId:"iwa_eval_route_confront_loss_08"},
    {beatId:"iwa_eval_route_confront_loss_08",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Yeah.",nextBeatId:"iwa_eval_route_confront_loss_09"},
    {beatId:"iwa_eval_route_confront_loss_09",mode:"narration",environmentRef:courtyard,text:"No speech about it follows.",nextBeatId:"iwa_eval_core_01"},

    {beatId:"iwa_eval_route_block",mode:"narration",environmentRef:courtyard,text:"The instructor checks the repaired ground first.\n\nThen he looks at the earth wall.",nextBeatId:"iwa_eval_route_block_02"},
    {beatId:"iwa_eval_route_block_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"That wasn't part of the exercise.",nextBeatId:"iwa_eval_route_block_03"},
    {beatId:"iwa_eval_route_block_03",mode:"narration",environmentRef:courtyard,text:"Iwabee shrugs.",nextBeatId:"iwa_eval_route_block_04"},
    {beatId:"iwa_eval_route_block_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Needed a wall.",nextBeatId:"iwa_eval_route_block_05"},
    {beatId:"iwa_eval_route_block_05",mode:"narration",environmentRef:courtyard,text:"The instructor looks at him.\n\nThen back at the wall.",nextBeatId:"iwa_eval_route_block_06"},
    {beatId:"iwa_eval_route_block_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Worked.",nextBeatId:"iwa_eval_route_block_07"},
    {beatId:"iwa_eval_route_block_07",mode:"narration",environmentRef:courtyard,text:"Iwabee almost smiles.",nextBeatId:"iwa_eval_core_01"},

    {beatId:"iwa_eval_route_call",mode:"narration",environmentRef:courtyard,text:"The instructor checks the repaired ground first.\n\nThen he looks at Iwabee.",nextBeatId:"iwa_eval_route_call_02"},
    {beatId:"iwa_eval_route_call_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You called me fast.",nextBeatId:"iwa_eval_route_call_03"},
    {beatId:"iwa_eval_route_call_03",mode:"narration",environmentRef:courtyard,text:"Iwabee gives him a flat look.",nextBeatId:"iwa_eval_route_call_04"},
    {beatId:"iwa_eval_route_call_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You were standing there.",nextBeatId:"iwa_eval_route_call_05"},
    {beatId:"iwa_eval_route_call_05",mode:"narration",environmentRef:courtyard,text:"The instructor nods.",nextBeatId:"iwa_eval_route_call_06"},
    {beatId:"iwa_eval_route_call_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Good.",nextBeatId:"iwa_eval_route_call_07"},
    {beatId:"iwa_eval_route_call_07",mode:"narration",environmentRef:courtyard,text:"Iwabee still does not know why that needed saying.",nextBeatId:"iwa_eval_core_01"},

    {beatId:"iwa_eval_route_finish",mode:"narration",environmentRef:courtyard,text:"The instructor checks the last repaired section.",nextBeatId:"iwa_eval_route_finish_02"},
    {beatId:"iwa_eval_route_finish_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You didn't go after him.",nextBeatId:"iwa_eval_route_finish_03"},
    {beatId:"iwa_eval_route_finish_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You told me to fix the yard.",nextBeatId:"iwa_eval_route_finish_04"},
    {beatId:"iwa_eval_route_finish_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"And you did.",nextBeatId:"iwa_eval_route_finish_05"},
    {beatId:"iwa_eval_route_finish_05",mode:"narration",environmentRef:courtyard,text:"Iwabee nods once.\n\nThat answer is enough.",nextBeatId:"iwa_eval_core_01"},

    {beatId:"iwa_eval_core_01",mode:"narration",environmentRef:courtyard,text:"The instructor picks up the written exercise from the bench.\n\nIwabee immediately looks annoyed again.",nextBeatId:"iwa_eval_core_02"},
    {beatId:"iwa_eval_core_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"We were doing fine until you picked that up.",nextBeatId:"iwa_eval_core_03"},
    {beatId:"iwa_eval_core_03",mode:"narration",environmentRef:courtyard,text:"The instructor holds it out.\n\nIwabee does not take it.",nextBeatId:"iwa_eval_core_04"},
    {beatId:"iwa_eval_core_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You're good at this.",nextBeatId:"iwa_eval_core_05"},
    {beatId:"iwa_eval_core_05",mode:"narration",environmentRef:courtyard,text:"He gestures toward the repaired ground.",nextBeatId:"iwa_eval_core_06"},
    {beatId:"iwa_eval_core_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You're bad at this.",nextBeatId:"iwa_eval_core_07"},
    {beatId:"iwa_eval_core_07",mode:"narration",environmentRef:courtyard,text:"He taps the paper.\n\nIwabee folds his arms.",nextBeatId:"iwa_eval_core_08"},
    {beatId:"iwa_eval_core_08",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I know.",nextBeatId:"iwa_eval_core_09"},
    {beatId:"iwa_eval_core_09",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Then work on the bad part without pretending the good part doesn't matter.",nextBeatId:"iwa_eval_core_10"},
    {beatId:"iwa_eval_core_10",mode:"narration",environmentRef:courtyard,text:"Iwabee looks at the paper.\n\nThen the yard.\n\nThat sounds irritatingly reasonable.\n\nHe takes the sheet.",nextBeatId:"iwa_reflect"},

    {beatId:"iwa_reflect",mode:"choice",environmentRef:courtyard,text:"",choices:[
      C("know_good_at","I KNOW WHAT I'M GOOD AT.","iwa_reflect_good_01"),
      C("better_rest","I STILL NEED TO GET BETTER AT THE REST.","iwa_reflect_rest_01"),
      C("academy_tests_wrong","THE ACADEMY CARES TOO MUCH ABOUT TESTS.","iwa_reflect_tests_01"),
      C("prove_my_way","I'LL PROVE I CAN DO IT MY WAY.","iwa_reflect_way_01")]},
    {beatId:"iwa_reflect_good_01",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I know what I'm good at.",nextBeatId:"iwa_reflect_good_02"},
    {beatId:"iwa_reflect_good_02",mode:"narration",environmentRef:courtyard,text:"The instructor nods toward the paper in his hand.",nextBeatId:"iwa_reflect_good_03"},
    {beatId:"iwa_reflect_good_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Good. Don't lose that while you fix the rest.",nextBeatId:"iwa_reflect_good_04"},
    {beatId:"iwa_reflect_good_04",mode:"narration",environmentRef:courtyard,text:"Iwabee looks down at the red mark.",nextBeatId:"iwa_reflect_good_05"},
    {beatId:"iwa_reflect_good_05",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Still hate this.",nextBeatId:"iwa_reflect_good_06"},
    {beatId:"iwa_reflect_good_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"I know.",nextBeatId:"iwa_close_01"},

    {beatId:"iwa_reflect_rest_01",mode:"narration",environmentRef:courtyard,text:"Iwabee looks at the paper.",nextBeatId:"iwa_reflect_rest_02"},
    {beatId:"iwa_reflect_rest_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I still need to get better at this stuff.",nextBeatId:"iwa_reflect_rest_03"},
    {beatId:"iwa_reflect_rest_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Yeah.",nextBeatId:"iwa_reflect_rest_04"},
    {beatId:"iwa_reflect_rest_04",mode:"narration",environmentRef:courtyard,text:"Iwabee looks up.",nextBeatId:"iwa_reflect_rest_05"},
    {beatId:"iwa_reflect_rest_05",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You could pretend that was harder to admit.",nextBeatId:"iwa_reflect_rest_06"},
    {beatId:"iwa_reflect_rest_06",mode:"narration",environmentRef:courtyard,text:"The instructor smiles.\n\nIwabee rolls his eyes.",nextBeatId:"iwa_close_01"},

    {beatId:"iwa_reflect_tests_01",mode:"narration",environmentRef:courtyard,text:"Iwabee holds up the page.",nextBeatId:"iwa_reflect_tests_02"},
    {beatId:"iwa_reflect_tests_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"The Academy cares too much about this.",nextBeatId:"iwa_reflect_tests_03"},
    {beatId:"iwa_reflect_tests_03",mode:"narration",environmentRef:courtyard,text:"The instructor shrugs.",nextBeatId:"iwa_reflect_tests_04"},
    {beatId:"iwa_reflect_tests_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Maybe.",nextBeatId:"iwa_reflect_tests_05"},
    {beatId:"iwa_reflect_tests_05",mode:"narration",environmentRef:courtyard,text:"Iwabee waits.",nextBeatId:"iwa_reflect_tests_06"},
    {beatId:"iwa_reflect_tests_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Still have to pass it.",nextBeatId:"iwa_reflect_tests_07"},
    {beatId:"iwa_reflect_tests_07",mode:"narration",environmentRef:courtyard,text:"Iwabee clicks his tongue.",nextBeatId:"iwa_reflect_tests_08"},
    {beatId:"iwa_reflect_tests_08",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I know.",nextBeatId:"iwa_reflect_tests_09"},
    {beatId:"iwa_reflect_tests_09",mode:"narration",environmentRef:courtyard,text:"That is the annoying part.",nextBeatId:"iwa_close_01"},

    {beatId:"iwa_reflect_way_01",mode:"narration",environmentRef:courtyard,text:"Iwabee folds the paper once.",nextBeatId:"iwa_reflect_way_02"},
    {beatId:"iwa_reflect_way_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I'll prove I can do it my way.",nextBeatId:"iwa_reflect_way_03"},
    {beatId:"iwa_reflect_way_03",mode:"narration",environmentRef:courtyard,text:"The instructor looks at the fold.\n\nThen at him.",nextBeatId:"iwa_reflect_way_04"},
    {beatId:"iwa_reflect_way_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Pass the written test first.",nextBeatId:"iwa_reflect_way_05"},
    {beatId:"iwa_reflect_way_05",mode:"narration",environmentRef:courtyard,text:"Iwabee groans.",nextBeatId:"iwa_reflect_way_06"},
    {beatId:"iwa_reflect_way_06",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You ruin everything.",nextBeatId:"iwa_close_01"},

    {beatId:"iwa_close_01",mode:"narration",environmentRef:courtyard,text:"Iwabee heads for the gate.\n\nStops.\n\nLooks at the paper in his hand.\n\nFor a second it looks like he might throw it away.\n\nHe does not.\n\nHe stuffs it into his bag.\n\nBehind him, the repaired training ground is still standing.\n\nIwabee looks back once.\n\nThen leaves.",nextBeatId:"iwa_close_02"},
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
