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
    D("kus_protect_student_23","KUSHINA","Yeah.","kus_protect_student_25"),
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

// Kurenai — 2026-09-30 final staged Bell Test. Three visible decisions resolve one Bell-Test occurrence.
(()=>{
  const bell="occ_origin_kurenai_bell_test_resolution",scene=A.sceneByVariant.academy_kurenai;
  const courtyard=Object.freeze({environmentId:"konoha_academy_courtyard_day"});
  const courtyardBackdrop="Scene backdrops/academy_training_ground_courtyard.png";
  try{
    const registerBackdrop=typeof registerSceneBackdropAssetPath==="function"
      ?registerSceneBackdropAssetPath
      :(typeof globalThis.registerSceneBackdropAssetPath==="function"?globalThis.registerSceneBackdropAssetPath:null);
    if(registerBackdrop)registerBackdrop(courtyard.environmentId,courtyardBackdrop);
  }catch(_error){}

  const result=R("kurenai_bell_result_32900","academy_kurenai",bell,
    ctx=>({
      bellTestOutcomeClass:ctx.kurenaiOutcome||"complete_loss",
      kurenaiStage1:ctx.kurenaiStage1||null,
      kurenaiStage2:ctx.kurenaiStage2||null,
      kurenaiStage3:ctx.kurenaiStage3||null,
      deceptionRoute:ctx.kurenaiStage1||null
    }),
    ctx=>(ctx.kurenaiOutcome||"complete_loss")==="complete_loss"?["KUR-01"]:["KUR-02"]);
  const N=(beatId,text,nextBeatId,extra={})=>({beatId,mode:"narration",environmentRef:courtyard,text,...(nextBeatId?{nextBeatId}:{}),...extra});
  const D=(beatId,speakerName,text,nextBeatId,extra={})=>({beatId,mode:"dialogue",speakerName,environmentRef:courtyard,text,...(nextBeatId?{nextBeatId}:{}),...extra});
  const Q=(beatId,text,choices)=>({beatId,mode:"choice",environmentRef:courtyard,text,choices});
  const hidden=predicate=>()=>({available:!!predicate(),knownBlocker:null});

  const stage3Choices=(prefix,outcomes)=>[
    C("take_bell_now","Take the bell now",prefix+"_take",{kurenaiStage3:"take_bell_now",kurenaiOutcome:outcomes.take}),
    C("pretend_withdraw","Pretend to withdraw",prefix+"_withdraw",{kurenaiStage3:"pretend_withdraw",kurenaiOutcome:outcomes.withdraw}),
    C("let_instructor_think_caught","Let her think she caught me",prefix+"_caught",{kurenaiStage3:"let_instructor_think_caught",kurenaiOutcome:outcomes.caught})
  ];
  const resultNext=outcome=>({
    complete_loss:"kur_result_complete_loss_01",
    partial_loss:"kur_result_partial_loss_01",
    partial_win:"kur_result_partial_win_01",
    complete_win:"kur_result_complete_win_01"
  })[outcome];

  A.register({sceneId:scene,eventId:scene,title:"ACADEMY KURENAI",entryBeatId:"kur_pre_01",participants:[],beats:[
    // Scene 1 — After Class
    N("kur_pre_01","Most of the Academy has emptied out.\n\nKurenai is still in the practical yard.\n\nHer instructor is putting away training markers near the wall.\n\nA small bell hangs from one hand.\n\nKurenai notices it before the instructor says anything.","kur_pre_02"),
    D("kur_pre_02","INSTRUCTOR","You can go home.","kur_pre_03"),
    D("kur_pre_03","KURENAI","You said there might be another exercise.","kur_pre_04"),
    N("kur_pre_04","The instructor keeps stacking the markers.","kur_pre_05"),
    D("kur_pre_05","INSTRUCTOR","I said there might be.","kur_pre_06"),
    N("kur_pre_06","Kurenai looks at the bell.","kur_pre_07"),
    D("kur_pre_07","KURENAI","Then what's that for?","kur_pre_08"),
    N("kur_pre_08","The instructor turns.\n\nShe raises the bell between two fingers.","kur_pre_09"),
    D("kur_pre_09","INSTRUCTOR","Come and find out.","kur_pre_10"),
    N("kur_pre_10","Kurenai leaves her bag by the edge of the yard and walks over.\n\nThe bell barely moves.\n\nHer eyes go from the bell, to the instructor's hand, to her feet.","kur_pre_11"),
    D("kur_pre_11","INSTRUCTOR","Take it.","kur_pre_12"),
    N("kur_pre_12","Kurenai looks up.","kur_pre_13"),
    D("kur_pre_13","KURENAI","That's all?","kur_pre_14"),
    D("kur_pre_14","INSTRUCTOR","If that's not enough, you're already in trouble.","kur_pre_15"),
    N("kur_pre_15","Kurenai's attention returns to the bell.","kur_approach"),

    // Scene 2 — Battle of Illusions / Stage 1
    Q("kur_approach","How does Kurenai begin?",[
      C("false_kurenai","Send a false Kurenai","kur_stage1_false_01",{kurenaiStage1:"false_kurenai",kurenaiRoute:"false_kurenai"}),
      C("conceal_movement","Hide my real movement","kur_stage1_conceal_01",{kurenaiStage1:"conceal_movement",kurenaiRoute:"conceal_movement"}),
      C("distort_position","Distort her sense of distance","kur_stage1_distort_01",{kurenaiStage1:"distort_position",kurenaiRoute:"distort_position"}),
      C("fake_direct","Make the direct approach look real","kur_stage1_direct_01",{kurenaiStage1:"fake_direct",kurenaiRoute:"fake_direct"})
    ]),

    N("kur_stage1_false_01","A second Kurenai breaks toward the bell.\n\nThe real Kurenai stays out of sight behind the movement.\n\nThe instructor's eyes follow the false approach for half a second.\n\nThen stop.\n\nShe has not committed yet.","kur_stage2_false"),
    N("kur_stage1_conceal_01","Kurenai gives the instructor something obvious to track.\n\nFootsteps.\n\nA shoulder turning.\n\nA clean line toward the bell.\n\nHer real movement slips the other way.\n\nThe instructor turns with the visible approach.\n\nKurenai is already somewhere else.","kur_stage2_conceal"),
    N("kur_stage1_distort_01","Kurenai leaves the direction alone.\n\nOnly the distance changes.\n\nThe instructor steps toward her.\n\nThe ground seems to take less of that step than it should.\n\nShe notices.\n\nNot enough to stop.","kur_stage2_distort"),
    N("kur_stage1_direct_01","Kurenai rushes her.\n\nNo careful angle.\n\nNo visible setup.\n\nThe sort of approach the instructor should dismiss immediately.\n\nInstead, the instructor moves to meet it.\n\nThat is what Kurenai wanted.","kur_stage2_direct"),

    // Stage 2 — every Stage 1 route visibly receives the same two decisions.
    Q("kur_stage2_false","The instructor has reacted. What does Kurenai do with it?",[
      C("rush_bell","Rush the bell","kur_stage2_false_rush_01",{kurenaiStage2:"rush_bell"}),
      C("draw_attention","Draw her attention away","kur_stage2_false_draw_01",{kurenaiStage2:"draw_attention"})
    ]),
    Q("kur_stage2_conceal","The instructor has reacted. What does Kurenai do with it?",[
      C("rush_bell","Rush the bell","kur_stage2_conceal_rush_01",{kurenaiStage2:"rush_bell"}),
      C("draw_attention","Draw her attention away","kur_stage2_conceal_draw_01",{kurenaiStage2:"draw_attention"})
    ]),
    Q("kur_stage2_distort","The instructor has reacted. What does Kurenai do with it?",[
      C("rush_bell","Rush the bell","kur_stage2_distort_rush_01",{kurenaiStage2:"rush_bell"}),
      C("draw_attention","Draw her attention away","kur_stage2_distort_draw_01",{kurenaiStage2:"draw_attention"})
    ]),
    Q("kur_stage2_direct","The instructor has reacted. What does Kurenai do with it?",[
      C("rush_bell","Rush the bell","kur_stage2_direct_rush_01",{kurenaiStage2:"rush_bell"}),
      C("draw_attention","Draw her attention away","kur_stage2_direct_draw_01",{kurenaiStage2:"draw_attention"})
    ]),

    N("kur_stage2_false_rush_01","The false Kurenai commits straight for the bell.\n\nThe instructor does not chase it.\n\nHer attention snaps toward the space the real Kurenai is using.\n\nKurenai has to decide whether to force the attempt or change the layer.","kur_stage3_false_rush"),
    N("kur_stage2_false_draw_01","The false Kurenai reaches past the bell instead of for it.\n\nThe instructor turns with the movement.\n\nFor the first time, her focus leaves the real approach.\n\nKurenai gets a narrow opening.","kur_stage3_false_draw"),
    N("kur_stage2_conceal_rush_01","Kurenai uses the concealed angle immediately.\n\nShe closes on the bell before the instructor finishes turning.\n\nThe opening is real.\n\nSo is the risk of committing too soon.","kur_stage3_conceal_rush"),
    N("kur_stage2_conceal_draw_01","Kurenai lets the visible movement keep travelling.\n\nThe instructor follows it.\n\nThe real Kurenai circles farther behind her.\n\nThe bell is close enough now that Kurenai can hear it move.","kur_stage3_conceal_draw"),
    N("kur_stage2_distort_rush_01","Kurenai attacks the false distance she created.\n\nThe instructor reaches for a Kurenai who is not quite where she appears to be.\n\nKurenai gets inside her guard.\n\nHer fingers brush the bell cord.","kur_stage3_distort_rush"),
    N("kur_stage2_distort_draw_01","Kurenai shifts the apparent distance again and lets another movement pull the instructor's eyes aside.\n\nThe instructor does not fully follow it.\n\nBut she has to check.\n\nThat costs her time.","kur_stage3_distort_draw"),
    N("kur_stage2_direct_rush_01","Kurenai doubles down.\n\nShe makes the obvious attack look even more obvious.\n\nThe instructor commits to stopping it.\n\nHer hand closes toward Kurenai's wrist.","kur_stage3_direct_rush"),
    N("kur_stage2_direct_draw_01","At the last instant, Kurenai gives the instructor another movement to watch.\n\nThe instructor hesitates.\n\nThe direct attack is no longer quite as convincing.\n\nKurenai still has an opening, but it is smaller than she wanted.","kur_stage3_direct_draw"),

    // Stage 3 — exact deterministic matrix.
    Q("kur_stage3_false_rush","The bell is finally within reach. How does Kurenai finish the deception?",stage3Choices("kur_resolve_false_rush",{take:"complete_loss",withdraw:"partial_loss",caught:"partial_loss"})),
    Q("kur_stage3_false_draw","The bell is finally within reach. How does Kurenai finish the deception?",stage3Choices("kur_resolve_false_draw",{take:"partial_loss",withdraw:"partial_win",caught:"partial_win"})),
    Q("kur_stage3_conceal_rush","The bell is finally within reach. How does Kurenai finish the deception?",stage3Choices("kur_resolve_conceal_rush",{take:"partial_loss",withdraw:"partial_win",caught:"partial_loss"})),
    Q("kur_stage3_conceal_draw","The bell is finally within reach. How does Kurenai finish the deception?",stage3Choices("kur_resolve_conceal_draw",{take:"partial_loss",withdraw:"partial_win",caught:"partial_win"})),
    Q("kur_stage3_distort_rush","The bell is finally within reach. How does Kurenai finish the deception?",stage3Choices("kur_resolve_distort_rush",{take:"partial_loss",withdraw:"partial_win",caught:"partial_win"})),
    Q("kur_stage3_distort_draw","The bell is finally within reach. How does Kurenai finish the deception?",stage3Choices("kur_resolve_distort_draw",{take:"partial_loss",withdraw:"partial_win",caught:"complete_win"})),
    Q("kur_stage3_direct_rush","The bell is finally within reach. How does Kurenai finish the deception?",stage3Choices("kur_resolve_direct_rush",{take:"partial_win",withdraw:"partial_win",caught:"complete_win"})),
    Q("kur_stage3_direct_draw","The bell is finally within reach. How does Kurenai finish the deception?",stage3Choices("kur_resolve_direct_draw",{take:"partial_loss",withdraw:"partial_win",caught:"partial_win"})),

    // Stage 3 performance routes. Outcome is already known, but commits only on the result beat.
    ...[
      ["kur_resolve_false_rush_take","complete_loss"],["kur_resolve_false_rush_withdraw","partial_loss"],["kur_resolve_false_rush_caught","partial_loss"],
      ["kur_resolve_false_draw_take","partial_loss"],["kur_resolve_false_draw_withdraw","partial_win"],["kur_resolve_false_draw_caught","partial_win"],
      ["kur_resolve_conceal_rush_take","partial_loss"],["kur_resolve_conceal_rush_withdraw","partial_win"],["kur_resolve_conceal_rush_caught","partial_loss"],
      ["kur_resolve_conceal_draw_take","partial_loss"],["kur_resolve_conceal_draw_withdraw","partial_win"],["kur_resolve_conceal_draw_caught","partial_win"],
      ["kur_resolve_distort_rush_take","partial_loss"],["kur_resolve_distort_rush_withdraw","partial_win"],["kur_resolve_distort_rush_caught","partial_win"],
      ["kur_resolve_distort_draw_take","partial_loss"],["kur_resolve_distort_draw_withdraw","partial_win"],["kur_resolve_distort_draw_caught","complete_win"],
      ["kur_resolve_direct_rush_take","partial_win"],["kur_resolve_direct_rush_withdraw","partial_win"],["kur_resolve_direct_rush_caught","complete_win"],
      ["kur_resolve_direct_draw_take","partial_loss"],["kur_resolve_direct_draw_withdraw","partial_win"],["kur_resolve_direct_draw_caught","partial_win"]
    ].map(([beatId,outcome])=>{
      const stage3=beatId.endsWith("_take")?"take":beatId.endsWith("_withdraw")?"withdraw":"caught";
      const copy=stage3==="take"
        ?"Kurenai commits.\n\nNo extra feint.\n\nNo delay.\n\nHer hand goes straight for the bell.\n\nThe question is whether the earlier layers left the real bell where she thinks it is."
        :stage3==="withdraw"
          ?"Kurenai gives ground.\n\nJust enough to make the attempt look finished.\n\nShe watches to see whether the instructor believes her.\n\nThen turns the retreat into one more approach."
          :"Kurenai leaves the instructor exactly one answer.\n\nCatch her.\n\nEnd the attempt.\n\nThe instructor takes it.\n\nKurenai waits until she is certain the instructor believes the exchange is over.\n\nThen the last layer moves.";
      return N(beatId,copy,resultNext(outcome));
    }),

    // Scene 3 — exact outcome classes. This is the single Bell-Test commit boundary.
    N("kur_result_complete_loss_01","Kurenai's hand closes on empty air.\n\nThe false bell vanishes with it.\n\nThe instructor is still standing where Kurenai last expected her to be.\n\nThe real bell hangs from two fingers.","kur_result_complete_loss_02",{onEnterConsequences:[result]}),
    D("kur_result_complete_loss_02","INSTRUCTOR","Too early.","kur_result_complete_loss_03"),
    N("kur_result_complete_loss_03","Kurenai looks at the failed layer.\n\nThen at the bell.","kur_result_complete_loss_04"),
    D("kur_result_complete_loss_04","KURENAI","I showed you where to look.","kur_result_complete_loss_05"),
    D("kur_result_complete_loss_05","INSTRUCTOR","You did.","kur_result_complete_loss_06"),
    N("kur_result_complete_loss_06","Kurenai's expression tightens.\n\nShe already wants the attempt back.","kur_eval_complete_loss_01"),

    N("kur_result_partial_loss_01","The bell jingles in Kurenai's hand.\n\nThe instructor turns.\n\nKurenai lets herself enjoy it for exactly one second.\n\nThe sound stops.\n\nHer fingers are empty.\n\nThe real bell is still with the instructor.","kur_result_partial_loss_02",{onEnterConsequences:[result]}),
    D("kur_result_partial_loss_02","KURENAI","I had it.","kur_result_partial_loss_03"),
    D("kur_result_partial_loss_03","INSTRUCTOR","You believed you had it.","kur_result_partial_loss_04"),
    N("kur_result_partial_loss_04","Kurenai looks at her empty hand.\n\nThat answer irritates her because it is accurate.","kur_eval_partial_loss_01"),

    N("kur_result_partial_win_01","Kurenai gets the bell.\n\nThe instructor's expression changes.\n\nOnly slightly.\n\nEnough for Kurenai to know one of the layers worked.\n\nThen the instructor is behind her.\n\nTwo fingers lift the bell away before Kurenai can turn.","kur_result_partial_win_02",{onEnterConsequences:[result]}),
    D("kur_result_partial_win_02","INSTRUCTOR","Better.","kur_result_partial_win_03"),
    N("kur_result_partial_win_03","Kurenai looks over her shoulder.","kur_result_partial_win_04"),
    D("kur_result_partial_win_04","KURENAI","I took it.","kur_result_partial_win_05"),
    D("kur_result_partial_win_05","INSTRUCTOR","You did.","kur_result_partial_win_06"),
    D("kur_result_partial_win_06","KURENAI","Next time I keep it.","kur_eval_partial_win_01"),

    N("kur_result_complete_win_01","The instructor catches Kurenai before she reaches the bell.\n\nHer hand closes around Kurenai's wrist.","kur_result_complete_win_02",{onEnterConsequences:[result]}),
    D("kur_result_complete_win_02","INSTRUCTOR","Got you.","kur_result_complete_win_03"),
    N("kur_result_complete_win_03","The yard bends.\n\nKurenai is behind her with the bell between two fingers.","kur_result_complete_win_04"),
    D("kur_result_complete_win_04","KURENAI","Have you?","kur_result_complete_win_05"),
    N("kur_result_complete_win_05","The yard bends again.\n\nThe instructor is behind Kurenai.\n\nThe bell is back in her hand.","kur_result_complete_win_06"),
    D("kur_result_complete_win_06","INSTRUCTOR","Yes.","kur_result_complete_win_07"),
    N("kur_result_complete_win_07","The yard folds one final time.\n\nThey are both standing exactly where the exercise began.\n\nSame distance.\n\nSame quiet courtyard.\n\nExcept Kurenai is holding the real bell.\n\nShe looks down at it.\n\nThen up at the instructor.","kur_result_complete_win_08"),
    D("kur_result_complete_win_08","KURENAI","You were saying?","kur_result_complete_win_09"),
    N("kur_result_complete_win_09","The instructor almost smiles.","kur_eval_complete_win_01"),

    // Scene 4 — Evaluation
    N("kur_eval_complete_loss_01","The instructor takes down one of the remaining practice markers.","kur_eval_complete_loss_02"),
    D("kur_eval_complete_loss_02","INSTRUCTOR","Your first lie arrived before I had any reason to believe it.","kur_eval_complete_loss_03"),
    N("kur_eval_complete_loss_03","Kurenai watches her put the marker away.","kur_eval_complete_loss_04"),
    D("kur_eval_complete_loss_04","KURENAI","Tomorrow.","kur_eval_complete_loss_05"),
    D("kur_eval_complete_loss_05","INSTRUCTOR","You're assuming you get the same test.","kur_eval_complete_loss_06"),
    D("kur_eval_complete_loss_06","KURENAI","I'm assuming I get another one.","kur_eval_core_01"),

    N("kur_eval_partial_loss_01","The instructor rolls the bell cord between two fingers.","kur_eval_partial_loss_02"),
    D("kur_eval_partial_loss_02","INSTRUCTOR","You fooled me.","kur_eval_partial_loss_03"),
    N("kur_eval_partial_loss_03","Kurenai looks at the bell.","kur_eval_partial_loss_04"),
    D("kur_eval_partial_loss_04","KURENAI","Not enough.","kur_eval_partial_loss_05"),
    D("kur_eval_partial_loss_05","INSTRUCTOR","No.","kur_eval_partial_loss_06"),
    N("kur_eval_partial_loss_06","Kurenai accepts that faster than she likes.","kur_eval_core_01"),

    N("kur_eval_partial_win_01","The instructor holds the bell up.","kur_eval_partial_win_02"),
    D("kur_eval_partial_win_02","INSTRUCTOR","You broke the first answer I had.","kur_eval_partial_win_03"),
    D("kur_eval_partial_win_03","KURENAI","Then you found another one.","kur_eval_partial_win_04"),
    D("kur_eval_partial_win_04","INSTRUCTOR","That's the exercise.","kur_eval_partial_win_05"),
    N("kur_eval_partial_win_05","Kurenai watches the bell.","kur_eval_partial_win_06"),
    D("kur_eval_partial_win_06","KURENAI","Next time I make you find three.","kur_eval_core_01"),

    N("kur_eval_complete_win_01","The instructor holds out her hand.\n\nKurenai gives the bell back.","kur_eval_complete_win_02"),
    D("kur_eval_complete_win_02","INSTRUCTOR","You kept track of the real one.","kur_eval_complete_win_03"),
    D("kur_eval_complete_win_03","KURENAI","So did you.","kur_eval_complete_win_04"),
    D("kur_eval_complete_win_04","INSTRUCTOR","Eventually.","kur_eval_complete_win_05"),
    N("kur_eval_complete_win_05","Kurenai smiles.\n\nShe does not need to say anything else.","kur_eval_core_01"),

    D("kur_eval_core_01","INSTRUCTOR","Making somebody see something false is the easy part.","kur_eval_core_02"),
    N("kur_eval_core_02","Kurenai watches the bell settle.","kur_eval_core_03"),
    D("kur_eval_core_03","INSTRUCTOR","The harder part is knowing what's still true while both of you are trying to change the answer.","kur_eval_core_04"),
    N("kur_eval_core_04","Kurenai looks from the bell to her instructor.","kur_eval_core_05"),
    D("kur_eval_core_05","KURENAI","Again tomorrow?","kur_eval_core_06"),
    D("kur_eval_core_06","INSTRUCTOR","Go home, Kurenai.","kur_eval_core_07"),
    N("kur_eval_core_07","Kurenai picks up her bag.","kur_leave_router"),

    // Scene 5 — Leaving. Keep the router ID so retired legacy presentation shims stand down.
    {beatId:"kur_leave_router",mode:"resolver",machineResolved:true,text:"",environmentRef:courtyard,choices:[
      C("loss","RESOLVE COMPLETE LOSS LEAVING","kur_leave_loss_01",null,{availability:hidden(()=>A.local().kurenaiOutcome==="complete_loss")}),
      C("partial_loss","RESOLVE PARTIAL LOSS LEAVING","kur_leave_partial_loss_01",null,{availability:hidden(()=>A.local().kurenaiOutcome==="partial_loss")}),
      C("partial_win","RESOLVE PARTIAL WIN LEAVING","kur_leave_partial_win_01",null,{availability:hidden(()=>A.local().kurenaiOutcome==="partial_win")}),
      C("win","RESOLVE COMPLETE WIN LEAVING","kur_leave_win_01",null,{availability:hidden(()=>A.local().kurenaiOutcome==="complete_win")})
    ]},

    N("kur_leave_loss_01","Kurenai reaches the courtyard gate.\n\nShe looks back at the practice rack.\n\nThe instructor is already putting the last marker away.","kur_leave_loss_02"),
    D("kur_leave_loss_02","KURENAI","Don't make it easier.","kur_leave_loss_03"),
    D("kur_leave_loss_03","INSTRUCTOR","Wasn't planning to.","kur_leave_loss_04"),
    N("kur_leave_loss_04","Kurenai leaves.","kur_receipt"),

    N("kur_leave_partial_loss_01","Kurenai reaches the courtyard gate.\n\nShe looks back at the practice rack.\n\nThe instructor is already putting the last marker away.","kur_leave_partial_loss_02"),
    D("kur_leave_partial_loss_02","KURENAI","I'm checking the bell twice next time.","kur_leave_partial_loss_03"),
    D("kur_leave_partial_loss_03","INSTRUCTOR","Only twice?","kur_leave_partial_loss_04"),
    N("kur_leave_partial_loss_04","Kurenai looks back.\n\nThe instructor has already turned away.\n\nKurenai leaves.","kur_receipt"),

    N("kur_leave_partial_win_01","Kurenai reaches the courtyard gate.\n\nShe looks back at the practice rack.","kur_leave_partial_win_02"),
    D("kur_leave_partial_win_02","INSTRUCTOR","Still thinking about the second layer?","kur_leave_partial_win_03"),
    D("kur_leave_partial_win_03","KURENAI","The third.","kur_leave_partial_win_04"),
    N("kur_leave_partial_win_04","She leaves before the instructor can answer.","kur_receipt"),

    N("kur_leave_win_01","Kurenai reaches the courtyard gate.\n\nShe looks back at the practice rack.","kur_leave_win_02"),
    D("kur_leave_win_02","INSTRUCTOR","Kurenai.","kur_leave_win_03"),
    N("kur_leave_win_03","Kurenai looks back.","kur_leave_win_04"),
    D("kur_leave_win_04","INSTRUCTOR","Tomorrow.","kur_leave_win_05"),
    N("kur_leave_win_05","Kurenai glances at the bell.","kur_leave_win_06"),
    D("kur_leave_win_06","KURENAI","Change the trick.","kur_leave_win_07"),
    N("kur_leave_win_07","Then she leaves.","kur_receipt"),

    {beatId:"kur_receipt",mode:"record",environmentRef:courtyard,text:"",exitScene:true}
  ],onCompleteConsequences:[X("academy_kurenai",[bell])]});
})();

// Iwabee — 2026-09-30 full Story rewrite; seven scenes / actors / IWA semantics / Battle preserved.
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
    // Scene 1 — Another Red Mark
    {beatId:"iwa_open_01",mode:"narration",environmentRef:courtyard,text:"Iwabee drops a marked worksheet onto the bench harder than he needs to.\n\nThe page slides into the instructor's hand.\n\nA thick red score sits across the top.",nextBeatId:"iwa_open_02"},
    {beatId:"iwa_open_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You planning to argue with the paper?",nextBeatId:"iwa_open_03"},
    {beatId:"iwa_open_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Wouldn't listen.",nextBeatId:"iwa_open_04"},
    {beatId:"iwa_open_04",mode:"narration",environmentRef:courtyard,text:"The instructor turns the page over.",nextBeatId:"iwa_open_05"},
    {beatId:"iwa_open_05",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Neither did you, apparently.",nextBeatId:"iwa_open_06"},
    {beatId:"iwa_open_06",mode:"narration",environmentRef:courtyard,text:"Iwabee's eyes narrow.",nextBeatId:"iwa_open_07"},
    {beatId:"iwa_open_07",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"If this is another lecture, I'm leaving.",nextBeatId:"iwa_open_08"},
    {beatId:"iwa_open_08",mode:"narration",environmentRef:courtyard,text:"The instructor puts the paper down and walks toward a damaged section of the practical ground.\n\nBroken ridges cut across the yard.\n\nLoose stone has collected in a shallow collapse near one edge.\n\nIwabee follows despite himself.",nextBeatId:"iwa_open_09"},
    {beatId:"iwa_open_09",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Make that usable.",nextBeatId:"iwa_open_10"},
    {beatId:"iwa_open_10",mode:"narration",environmentRef:courtyard,text:"Iwabee looks over the damage.\n\nHis shoulders loosen.",nextBeatId:"iwa_open_11"},
    {beatId:"iwa_open_11",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"That's it?",nextBeatId:"iwa_open_12"},
    {beatId:"iwa_open_12",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"That's it.",nextBeatId:"iwa_open_13"},
    {beatId:"iwa_open_13",mode:"narration",environmentRef:courtyard,text:"Iwabee steps off the path and plants his feet in the dirt.",nextBeatId:"iwa_open_14"},
    {beatId:"iwa_open_14",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Should've started with this.",nextBeatId:"iwa_reshape_intro"},

    // Scene 2 — Earth Release
    {beatId:"iwa_reshape_intro",mode:"narration",environmentRef:courtyard,text:"Iwabee studies the damage instead of rushing it.\n\nThe ground is uneven in four different ways.\n\nAny one of them can be fixed.",nextBeatId:"iwa_reshape"},
    {beatId:"iwa_reshape",mode:"choice",environmentRef:courtyard,text:"",choices:[
      C("raise_collapsed","Raise the collapsed section","iwa_raise_01",{iwabeeTerrainChoice:"raise_collapsed"}),
      C("flatten_ground","Flatten the damaged ground","iwa_flatten_01",{iwabeeTerrainChoice:"flatten_ground"}),
      C("build_path","Build a stable path through it","iwa_path_01",{iwabeeTerrainChoice:"build_path"}),
      C("reinforce_weakest","Reinforce the weakest section","iwa_reinforce_01",{iwabeeTerrainChoice:"reinforce_weakest"})]},
    {beatId:"iwa_raise_01",mode:"narration",environmentRef:courtyard,text:"Iwabee drives chakra into the sunken section.\n\nThe earth rises in one heavy slab.\n\nStone grinds against stone until the collapsed ground sits level with the rest of the yard.\n\nLoose rubble slides from underneath it.\n\nA boot moves behind the falling stone.\n\nIwabee stops.\n\nSomeone was hiding there.",nextBeatId:"iwa_expose_01"},
    {beatId:"iwa_flatten_01",mode:"narration",environmentRef:courtyard,text:"Iwabee lowers the broken ridges instead of rebuilding them.\n\nThe high points sink.\n\nThe loose earth spreads.\n\nA strip of cover disappears with it.\n\nA crouched shinobi is suddenly left in the open.\n\nIwabee sees him at the same moment the stranger realises he has been exposed.",nextBeatId:"iwa_expose_01"},
    {beatId:"iwa_path_01",mode:"narration",environmentRef:courtyard,text:"Iwabee leaves the deepest damage alone.\n\nHe raises a firm strip of earth straight through the broken section.\n\nThe path locks into place.\n\nA pair of boots stands beside the new edge.\n\nIwabee follows them upward.\n\nSomeone is tucked behind the remaining rubble.",nextBeatId:"iwa_expose_01"},
    {beatId:"iwa_reinforce_01",mode:"narration",environmentRef:courtyard,text:"Iwabee crouches and presses one palm to the ground.\n\nThe outer edge is ready to give way again.\n\nHe packs earth beneath it until the section stops shifting.\n\nA loose timber frame is pushed aside by the rising ground.\n\nA young shinobi is crouched behind it.",nextBeatId:"iwa_expose_01"},

    // Scene 3 — The Rogue Genin
    {beatId:"iwa_expose_01",mode:"narration",environmentRef:courtyard,text:"The stranger wears shinobi gear.\n\nNot Academy gear.\n\nHe looks at Iwabee.\n\nThen at the instructor.\n\nThen at the open side of the yard.",onEnterConsequences:[reshapeCommit],nextBeatId:"iwa_expose_02"},
    {beatId:"iwa_expose_02",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Move.",nextBeatId:"iwa_expose_03"},
    {beatId:"iwa_expose_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"No.",nextBeatId:"iwa_expose_04"},
    {beatId:"iwa_expose_04",mode:"narration",environmentRef:courtyard,text:"The Rogue's attention sharpens.",nextBeatId:"iwa_expose_05"},
    {beatId:"iwa_expose_05",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Wasn't asking twice.",nextBeatId:"iwa_expose_06"},
    {beatId:"iwa_expose_06",mode:"narration",environmentRef:courtyard,text:"Iwabee glances at the route behind him.\n\nThen back at the Rogue.",nextBeatId:"iwa_response"},
    {beatId:"iwa_response",mode:"choice",environmentRef:courtyard,text:"",choices:[
      C("confront","Confront him","iwa_confront_01",{iwabeeRogueResponse:"confront"}),
      C("block_escape","Block his escape","iwa_block_01",{iwabeeRogueResponse:"block_escape"}),
      C("call_instructor","Call the instructor","iwa_call_01",{iwabeeRogueResponse:"call_instructor"}),
      C("finish_practical","Finish the practical","iwa_finish_01",{iwabeeRogueResponse:"finish_practical"})]},

    {beatId:"iwa_confront_01",mode:"narration",environmentRef:courtyard,text:"Iwabee steps directly into the open route.\n\nThe Rogue stops.",nextBeatId:"iwa_confront_02"},
    {beatId:"iwa_confront_02",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Kid.",nextBeatId:"iwa_confront_03"},
    {beatId:"iwa_confront_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You keep saying things like that's supposed to move me.",nextBeatId:"iwa_confront_04"},
    {beatId:"iwa_confront_04",mode:"narration",environmentRef:courtyard,text:"The Rogue shifts his weight.\n\nIwabee sees it.\n\nSo does the instructor.",nextBeatId:"iwa_confront_05"},
    {beatId:"iwa_confront_05",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Last chance.",nextBeatId:"iwa_confront_06"},
    {beatId:"iwa_confront_06",mode:"narration",environmentRef:courtyard,text:"Iwabee sets his feet.",nextBeatId:"iwa_confront_07"},
    {beatId:"iwa_confront_07",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Take yours.",nextBeatId:"iwa_confront_battle"},
    {beatId:"iwa_confront_battle",mode:"battle_transition",environmentRef:courtyard,text:"Iwabee confronts the Rogue Genin.",battle:{
      encounterId:"origin_academy_iwabee:rogue_genin_confrontation",launchResolver:battleLaunch,
      victoryBeatId:"iwa_confront_return_01",defeatBeatId:"iwa_confront_loss_01",resultProjector:battleProject,actionLabel:"Start PL Battle"}},

    {beatId:"iwa_confront_return_01",mode:"narration",environmentRef:courtyard,text:"The Rogue Genin is forced out of the fight first.\n\nIwabee stays upright, breathing hard.\n\nThe Rogue tries to square himself again.\n\nThe instructor steps between them.",onEnterConsequences:[confrontVictory],nextBeatId:"iwa_confront_return_02"},
    {beatId:"iwa_confront_return_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Enough.",nextBeatId:"iwa_confront_return_03"},
    {beatId:"iwa_confront_return_03",mode:"narration",environmentRef:courtyard,text:"Iwabee keeps his eyes on the Rogue.",nextBeatId:"iwa_confront_return_04"},
    {beatId:"iwa_confront_return_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"He was running.",nextBeatId:"iwa_confront_return_05"},
    {beatId:"iwa_confront_return_05",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"He's not now.",nextBeatId:"iwa_confront_return_06"},
    {beatId:"iwa_confront_return_06",mode:"narration",environmentRef:courtyard,text:"The instructor takes control of the Rogue before the exchange can restart.\n\nIwabee looks past them at the ground he repaired before the fight.\n\nStill level.\n\nStill holding.\n\nHe wipes dirt from one hand onto his trousers.",nextBeatId:"iwa_eval_route_confront"},

    {beatId:"iwa_confront_loss_01",mode:"narration",environmentRef:courtyard,text:"Iwabee's stance breaks first.\n\nOne knee hits the dirt.\n\nHe starts to push himself back up.\n\nThe instructor moves in front of him.",nextBeatId:"iwa_confront_loss_02"},
    {beatId:"iwa_confront_loss_02",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Stay down.",nextBeatId:"iwa_confront_loss_03"},
    {beatId:"iwa_confront_loss_03",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I'm not done.",nextBeatId:"iwa_confront_loss_04"},
    {beatId:"iwa_confront_loss_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You are with him.",nextBeatId:"iwa_confront_loss_05"},
    {beatId:"iwa_confront_loss_05",mode:"narration",environmentRef:courtyard,text:"Iwabee looks around the instructor at the Rogue.\n\nThe Rogue is already backing toward the open side of the yard.\n\nIwabee gets one foot under himself.\n\nThe instructor blocks him with an arm.",nextBeatId:"iwa_confront_loss_06"},
    {beatId:"iwa_confront_loss_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"No.",nextBeatId:"iwa_confront_loss_world_result"},
    {beatId:"iwa_confront_loss_world_result",mode:"narration",environmentRef:courtyard,text:"The Rogue runs.\n\nIwabee watches until he disappears beyond the yard.\n\nHis jaw works once.\n\nThen he looks at the section of ground he fixed.\n\nIt did not collapse because he lost the fight.",onEnterConsequences:[confrontDefeat],nextBeatId:"iwa_eval_route_confront_loss_01"},

    {beatId:"iwa_block_01",mode:"narration",environmentRef:courtyard,text:"Iwabee does not chase.\n\nHe watches where the Rogue keeps looking.\n\nThe open side of the yard.\n\nThe Rogue commits to it.\n\nIwabee moves first.\n\nEarth tears upward across the route.\n\nThe Rogue stops so sharply that one heel skids through the dirt.",nextBeatId:"iwa_block_02"},
    {beatId:"iwa_block_02",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Seriously?",nextBeatId:"iwa_block_03"},
    {beatId:"iwa_block_03",mode:"narration",environmentRef:courtyard,text:"Iwabee looks at the wall.",nextBeatId:"iwa_block_04"},
    {beatId:"iwa_block_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You wanted out.",nextBeatId:"iwa_block_05"},
    {beatId:"iwa_block_05",mode:"narration",environmentRef:courtyard,text:"He looks back at the Rogue.",nextBeatId:"iwa_block_06"},
    {beatId:"iwa_block_06",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Pick another way.",nextBeatId:"iwa_block_07"},
    {beatId:"iwa_block_07",mode:"narration",environmentRef:courtyard,text:"The Rogue checks the yard.\n\nInstructor on one side.\n\nEarth wall on the other.\n\nIwabee between him and the easiest gap.\n\nThe Rogue lifts both hands.",nextBeatId:"iwa_block_08"},
    {beatId:"iwa_block_08",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Fine.",nextBeatId:"iwa_block_return_01"},
    {beatId:"iwa_block_return_01",mode:"narration",environmentRef:courtyard,text:"The instructor moves in and takes control.\n\nIwabee looks from the wall to the ground he repaired first.\n\nBoth are still standing.",onEnterConsequences:[blockCommit],nextBeatId:"iwa_eval_route_block"},

    {beatId:"iwa_call_01",mode:"narration",environmentRef:courtyard,text:"Iwabee keeps his eyes on the Rogue.",nextBeatId:"iwa_call_02"},
    {beatId:"iwa_call_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Sensei.",nextBeatId:"iwa_call_03"},
    {beatId:"iwa_call_03",mode:"narration",environmentRef:courtyard,text:"The instructor is already moving.",nextBeatId:"iwa_call_04"},
    {beatId:"iwa_call_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Back up.",nextBeatId:"iwa_call_05"},
    {beatId:"iwa_call_05",mode:"narration",environmentRef:courtyard,text:"Iwabee takes one step back.\n\nNo more.\n\nThe instructor puts himself between the students and the Rogue.\n\nThe Rogue spots the open side of the yard.\n\nRuns.\n\nIwabee starts after him.\n\nThe instructor catches his shoulder.",onEnterConsequences:[callCommit],nextBeatId:"iwa_call_06"},
    {beatId:"iwa_call_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Leave him.",nextBeatId:"iwa_call_07"},
    {beatId:"iwa_call_07",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"He's getting away.",nextBeatId:"iwa_call_08"},
    {beatId:"iwa_call_08",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"And you're staying here.",nextBeatId:"iwa_call_09"},
    {beatId:"iwa_call_09",mode:"narration",environmentRef:courtyard,text:"Iwabee watches the Rogue disappear past the fence.\n\nHe looks like he wants to argue.\n\nHe doesn't.",nextBeatId:"iwa_eval_route_call"},

    {beatId:"iwa_finish_01",mode:"narration",environmentRef:courtyard,text:"Iwabee looks at the Rogue.\n\nThen at the unfinished ground.",nextBeatId:"iwa_finish_02"},
    {beatId:"iwa_finish_02",mode:"dialogue",speakerName:"ROGUE GENIN",environmentRef:courtyard,text:"Smart kid.",nextBeatId:"iwa_finish_03"},
    {beatId:"iwa_finish_03",mode:"narration",environmentRef:courtyard,text:"Iwabee turns back toward the practical.",nextBeatId:"iwa_finish_04"},
    {beatId:"iwa_finish_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Wasn't talking to you.",nextBeatId:"iwa_finish_05"},
    {beatId:"iwa_finish_05",mode:"narration",environmentRef:courtyard,text:"Behind him, the Rogue breaks for the open side of the yard.\n\nIwabee keeps working.\n\nEarth settles under his hands.\n\nThe last damaged section locks into place.\n\nBy the time Iwabee stands, the Rogue is gone.\n\nThe ground is usable.\n\nThat is what Iwabee was told to do.\n\nHe did it.",onEnterConsequences:[finishCommit],nextBeatId:"iwa_eval_route_finish"},

    // Scene 4 — The Instructor
    {beatId:"iwa_eval_route_confront",mode:"narration",environmentRef:courtyard,text:"The instructor checks the repaired ground before he says anything about the Rogue.\n\nHe puts his weight onto the raised section.\n\nWalks the edge.\n\nPresses one heel into the new path.\n\nIwabee watches him test every part.",nextBeatId:"iwa_eval_route_confront_02"},
    {beatId:"iwa_eval_route_confront_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"It's not going anywhere.",nextBeatId:"iwa_eval_route_confront_03"},
    {beatId:"iwa_eval_route_confront_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"I'm checking.",nextBeatId:"iwa_eval_route_confront_04"},
    {beatId:"iwa_eval_route_confront_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You're taking your time checking.",nextBeatId:"iwa_eval_route_confront_05"},
    {beatId:"iwa_eval_route_confront_05",mode:"narration",environmentRef:courtyard,text:"The instructor looks at him.",nextBeatId:"iwa_eval_route_confront_06"},
    {beatId:"iwa_eval_route_confront_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You really went straight at him.",nextBeatId:"iwa_eval_route_confront_07"},
    {beatId:"iwa_eval_route_confront_07",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"He was right there.",nextBeatId:"iwa_eval_route_confront_08"},
    {beatId:"iwa_eval_route_confront_08",mode:"narration",environmentRef:courtyard,text:"The instructor glances toward the Rogue now in his control.",nextBeatId:"iwa_eval_route_confront_09"},
    {beatId:"iwa_eval_route_confront_09",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"So was I.",nextBeatId:"iwa_eval_route_confront_10"},
    {beatId:"iwa_eval_route_confront_10",mode:"narration",environmentRef:courtyard,text:"Iwabee knows exactly what he means.",nextBeatId:"iwa_eval_route_confront_11"},
    {beatId:"iwa_eval_route_confront_11",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Didn't need you.",nextBeatId:"iwa_eval_route_confront_12"},
    {beatId:"iwa_eval_route_confront_12",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"This time.",nextBeatId:"iwa_eval_route_confront_13"},
    {beatId:"iwa_eval_route_confront_13",mode:"narration",environmentRef:courtyard,text:"Iwabee looks back at the repaired ground.\n\nHe does not answer.",nextBeatId:"iwa_paper_01"},

    {beatId:"iwa_eval_route_confront_loss_01",mode:"narration",environmentRef:courtyard,text:"The instructor checks the repaired ground before he says anything about the Rogue.\n\nHe puts his weight onto the raised section.\n\nWalks the edge.\n\nPresses one heel into the new path.\n\nIwabee watches him test every part.",nextBeatId:"iwa_eval_route_confront_loss_02"},
    {beatId:"iwa_eval_route_confront_loss_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"It's not going anywhere.",nextBeatId:"iwa_eval_route_confront_loss_03"},
    {beatId:"iwa_eval_route_confront_loss_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"I'm checking.",nextBeatId:"iwa_eval_route_confront_loss_04"},
    {beatId:"iwa_eval_route_confront_loss_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You're taking your time checking.",nextBeatId:"iwa_eval_route_confront_loss_05"},
    {beatId:"iwa_eval_route_confront_loss_05",mode:"narration",environmentRef:courtyard,text:"The instructor looks at him.",nextBeatId:"iwa_eval_route_confront_loss_06"},
    {beatId:"iwa_eval_route_confront_loss_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Still want to tell me you had him?",nextBeatId:"iwa_eval_route_confront_loss_07"},
    {beatId:"iwa_eval_route_confront_loss_07",mode:"narration",environmentRef:courtyard,text:"Iwabee looks toward the route the Rogue escaped through.",nextBeatId:"iwa_eval_route_confront_loss_08"},
    {beatId:"iwa_eval_route_confront_loss_08",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"No.",nextBeatId:"iwa_eval_route_confront_loss_09"},
    {beatId:"iwa_eval_route_confront_loss_09",mode:"narration",environmentRef:courtyard,text:"The answer comes out rougher than he wanted.\n\nThe instructor taps the repaired section with his heel.",nextBeatId:"iwa_eval_route_confront_loss_10"},
    {beatId:"iwa_eval_route_confront_loss_10",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"This held.",nextBeatId:"iwa_eval_route_confront_loss_11"},
    {beatId:"iwa_eval_route_confront_loss_11",mode:"narration",environmentRef:courtyard,text:"Iwabee looks down at it.",nextBeatId:"iwa_eval_route_confront_loss_12"},
    {beatId:"iwa_eval_route_confront_loss_12",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Yeah.",nextBeatId:"iwa_eval_route_confront_loss_13"},
    {beatId:"iwa_eval_route_confront_loss_13",mode:"narration",environmentRef:courtyard,text:"That is all either of them says about it.",nextBeatId:"iwa_paper_01"},

    {beatId:"iwa_eval_route_block",mode:"narration",environmentRef:courtyard,text:"The instructor checks the repaired ground before he says anything about the Rogue.\n\nHe puts his weight onto the raised section.\n\nWalks the edge.\n\nPresses one heel into the new path.\n\nIwabee watches him test every part.",nextBeatId:"iwa_eval_route_block_02"},
    {beatId:"iwa_eval_route_block_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"It's not going anywhere.",nextBeatId:"iwa_eval_route_block_03"},
    {beatId:"iwa_eval_route_block_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"I'm checking.",nextBeatId:"iwa_eval_route_block_04"},
    {beatId:"iwa_eval_route_block_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You're taking your time checking.",nextBeatId:"iwa_eval_route_block_05"},
    {beatId:"iwa_eval_route_block_05",mode:"narration",environmentRef:courtyard,text:"The instructor looks at him.\n\nThe instructor looks at the earth wall.",nextBeatId:"iwa_eval_route_block_06"},
    {beatId:"iwa_eval_route_block_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"That wasn't on the worksheet.",nextBeatId:"iwa_eval_route_block_07"},
    {beatId:"iwa_eval_route_block_07",mode:"narration",environmentRef:courtyard,text:"Iwabee folds his arms.",nextBeatId:"iwa_eval_route_block_08"},
    {beatId:"iwa_eval_route_block_08",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Neither was he.",nextBeatId:"iwa_eval_route_block_09"},
    {beatId:"iwa_eval_route_block_09",mode:"narration",environmentRef:courtyard,text:"The instructor looks at the detained Rogue.\n\nThen back at the wall.",nextBeatId:"iwa_eval_route_block_10"},
    {beatId:"iwa_eval_route_block_10",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Fair.",nextBeatId:"iwa_eval_route_block_11"},
    {beatId:"iwa_eval_route_block_11",mode:"narration",environmentRef:courtyard,text:"Iwabee's mouth pulls at one corner.\n\nBarely.",nextBeatId:"iwa_paper_01"},

    {beatId:"iwa_eval_route_call",mode:"narration",environmentRef:courtyard,text:"The instructor checks the repaired ground before he says anything about the Rogue.\n\nHe puts his weight onto the raised section.\n\nWalks the edge.\n\nPresses one heel into the new path.\n\nIwabee watches him test every part.",nextBeatId:"iwa_eval_route_call_02"},
    {beatId:"iwa_eval_route_call_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"It's not going anywhere.",nextBeatId:"iwa_eval_route_call_03"},
    {beatId:"iwa_eval_route_call_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"I'm checking.",nextBeatId:"iwa_eval_route_call_04"},
    {beatId:"iwa_eval_route_call_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You're taking your time checking.",nextBeatId:"iwa_eval_route_call_05"},
    {beatId:"iwa_eval_route_call_05",mode:"narration",environmentRef:courtyard,text:"The instructor looks at him.",nextBeatId:"iwa_eval_route_call_06"},
    {beatId:"iwa_eval_route_call_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You called me fast.",nextBeatId:"iwa_eval_route_call_07"},
    {beatId:"iwa_eval_route_call_07",mode:"narration",environmentRef:courtyard,text:"Iwabee stares at him.",nextBeatId:"iwa_eval_route_call_08"},
    {beatId:"iwa_eval_route_call_08",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You were standing right there.",nextBeatId:"iwa_eval_route_call_09"},
    {beatId:"iwa_eval_route_call_09",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Exactly.",nextBeatId:"iwa_eval_route_call_10"},
    {beatId:"iwa_eval_route_call_10",mode:"narration",environmentRef:courtyard,text:"Iwabee frowns.",nextBeatId:"iwa_eval_route_call_11"},
    {beatId:"iwa_eval_route_call_11",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Don't make that sound clever.",nextBeatId:"iwa_eval_route_call_12"},
    {beatId:"iwa_eval_route_call_12",mode:"narration",environmentRef:courtyard,text:"The instructor moves on to the repaired ground.\n\nIwabee follows, still irritated.",nextBeatId:"iwa_paper_01"},

    {beatId:"iwa_eval_route_finish",mode:"narration",environmentRef:courtyard,text:"The instructor checks the repaired ground before he says anything about the Rogue.\n\nHe puts his weight onto the raised section.\n\nWalks the edge.\n\nPresses one heel into the new path.\n\nIwabee watches him test every part.",nextBeatId:"iwa_eval_route_finish_02"},
    {beatId:"iwa_eval_route_finish_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"It's not going anywhere.",nextBeatId:"iwa_eval_route_finish_03"},
    {beatId:"iwa_eval_route_finish_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"I'm checking.",nextBeatId:"iwa_eval_route_finish_04"},
    {beatId:"iwa_eval_route_finish_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You're taking your time checking.",nextBeatId:"iwa_eval_route_finish_05"},
    {beatId:"iwa_eval_route_finish_05",mode:"narration",environmentRef:courtyard,text:"The instructor looks at him.\n\nThe instructor checks the last section.",nextBeatId:"iwa_eval_route_finish_06"},
    {beatId:"iwa_eval_route_finish_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You let him run.",nextBeatId:"iwa_eval_route_finish_07"},
    {beatId:"iwa_eval_route_finish_07",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You gave me an assignment.",nextBeatId:"iwa_eval_route_finish_08"},
    {beatId:"iwa_eval_route_finish_08",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"I did.",nextBeatId:"iwa_eval_route_finish_09"},
    {beatId:"iwa_eval_route_finish_09",mode:"narration",environmentRef:courtyard,text:"Iwabee points at the finished ground.",nextBeatId:"iwa_eval_route_finish_10"},
    {beatId:"iwa_eval_route_finish_10",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Then check it.",nextBeatId:"iwa_eval_route_finish_11"},
    {beatId:"iwa_eval_route_finish_11",mode:"narration",environmentRef:courtyard,text:"The instructor does.\n\nNo lecture follows.",nextBeatId:"iwa_paper_01"},

    // Scene 5 — The Paper
    {beatId:"iwa_paper_01",mode:"narration",environmentRef:courtyard,text:"The instructor goes back to the bench.\n\nIwabee sees the worksheet in his hand and immediately looks annoyed.",nextBeatId:"iwa_paper_02"},
    {beatId:"iwa_paper_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Don't.",nextBeatId:"iwa_paper_03"},
    {beatId:"iwa_paper_03",mode:"narration",environmentRef:courtyard,text:"The instructor holds the page out anyway.\n\nIwabee does not take it.",nextBeatId:"iwa_paper_04"},
    {beatId:"iwa_paper_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You still have to fix this.",nextBeatId:"iwa_paper_05"},
    {beatId:"iwa_paper_05",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I just fixed half the yard.",nextBeatId:"iwa_paper_06"},
    {beatId:"iwa_paper_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"I noticed.",nextBeatId:"iwa_paper_07"},
    {beatId:"iwa_paper_07",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Then why are we back to the paper?",nextBeatId:"iwa_paper_08"},
    {beatId:"iwa_paper_08",mode:"narration",environmentRef:courtyard,text:"The instructor turns the sheet so Iwabee can see one of the marked answers.",nextBeatId:"iwa_paper_09"},
    {beatId:"iwa_paper_09",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Because this answer is still wrong.",nextBeatId:"iwa_paper_10"},
    {beatId:"iwa_paper_10",mode:"narration",environmentRef:courtyard,text:"Iwabee takes the page from him.",nextBeatId:"iwa_paper_11"},
    {beatId:"iwa_paper_11",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I hate written tests.",nextBeatId:"iwa_paper_12"},
    {beatId:"iwa_paper_12",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You can hate them tomorrow too.",nextBeatId:"iwa_paper_13"},
    {beatId:"iwa_paper_13",mode:"narration",environmentRef:courtyard,text:"Iwabee looks at the page.",nextBeatId:"iwa_paper_14"},
    {beatId:"iwa_paper_14",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Bring it back corrected.",nextBeatId:"iwa_paper_15"},
    {beatId:"iwa_paper_15",mode:"narration",environmentRef:courtyard,text:"Iwabee looks toward the repaired yard.\n\nThen folds the paper once and tucks it under his arm.",nextBeatId:"iwa_paper_16"},
    {beatId:"iwa_paper_16",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Fine.",nextBeatId:"iwa_reflect_intro"},

    // Scene 6 — Iwabee's Answer
    {beatId:"iwa_reflect_intro",mode:"narration",environmentRef:courtyard,text:"The instructor starts putting the practice markers away.\n\nIwabee stays by the bench with the marked paper.\n\nHe has one last thing to say before he leaves.",nextBeatId:"iwa_reflect"},
    {beatId:"iwa_reflect",mode:"choice",environmentRef:courtyard,text:"",choices:[
      C("know_good_at","“I know what I can do.”","iwa_reflect_good_01",{iwabeeReflection:"know_good_at"}),
      C("better_rest","“I need to get better at the rest.”","iwa_reflect_rest_01",{iwabeeReflection:"better_rest"}),
      C("academy_tests_wrong","“The Academy leans too hard on written tests.”","iwa_reflect_tests_01",{iwabeeReflection:"academy_tests_wrong"}),
      C("prove_my_way","“I'll prove I can do it my way.”","iwa_reflect_way_01",{iwabeeReflection:"prove_my_way"})]},
    {beatId:"iwa_reflect_good_01",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I know what I can do.",nextBeatId:"iwa_reflect_good_02"},
    {beatId:"iwa_reflect_good_02",mode:"narration",environmentRef:courtyard,text:"The instructor keeps stacking markers.",nextBeatId:"iwa_reflect_good_03"},
    {beatId:"iwa_reflect_good_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Good.",nextBeatId:"iwa_reflect_good_04"},
    {beatId:"iwa_reflect_good_04",mode:"narration",environmentRef:courtyard,text:"Iwabee waits for more.\n\nNothing comes.\n\nHe looks at the red mark again.",nextBeatId:"iwa_reflect_good_05"},
    {beatId:"iwa_reflect_good_05",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Still fixing this.",nextBeatId:"iwa_reflect_good_06"},
    {beatId:"iwa_reflect_good_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Tomorrow.",nextBeatId:"iwa_reflect_good_07"},
    {beatId:"iwa_reflect_good_07",mode:"narration",environmentRef:courtyard,text:"Iwabee grunts and folds the page smaller.",nextBeatId:"iwa_close_01"},

    {beatId:"iwa_reflect_rest_01",mode:"narration",environmentRef:courtyard,text:"Iwabee turns the worksheet over.",nextBeatId:"iwa_reflect_rest_02"},
    {beatId:"iwa_reflect_rest_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I need to get better at the rest.",nextBeatId:"iwa_reflect_rest_03"},
    {beatId:"iwa_reflect_rest_03",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Probably.",nextBeatId:"iwa_reflect_rest_04"},
    {beatId:"iwa_reflect_rest_04",mode:"narration",environmentRef:courtyard,text:"Iwabee gives him a hard look.",nextBeatId:"iwa_reflect_rest_05"},
    {beatId:"iwa_reflect_rest_05",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"You could've taken one second before agreeing.",nextBeatId:"iwa_reflect_rest_06"},
    {beatId:"iwa_reflect_rest_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Wouldn't have changed the answer.",nextBeatId:"iwa_reflect_rest_07"},
    {beatId:"iwa_reflect_rest_07",mode:"narration",environmentRef:courtyard,text:"Iwabee mutters something under his breath and shoves the page into his bag.",nextBeatId:"iwa_close_01"},

    {beatId:"iwa_reflect_tests_01",mode:"narration",environmentRef:courtyard,text:"Iwabee holds up the worksheet.",nextBeatId:"iwa_reflect_tests_02"},
    {beatId:"iwa_reflect_tests_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"The Academy leans too hard on these.",nextBeatId:"iwa_reflect_tests_03"},
    {beatId:"iwa_reflect_tests_03",mode:"narration",environmentRef:courtyard,text:"The instructor shoulders a box of practice markers.",nextBeatId:"iwa_reflect_tests_04"},
    {beatId:"iwa_reflect_tests_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Maybe.",nextBeatId:"iwa_reflect_tests_05"},
    {beatId:"iwa_reflect_tests_05",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"That's it?",nextBeatId:"iwa_reflect_tests_06"},
    {beatId:"iwa_reflect_tests_06",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"You want me to cancel written tests?",nextBeatId:"iwa_reflect_tests_07"},
    {beatId:"iwa_reflect_tests_07",mode:"narration",environmentRef:courtyard,text:"Iwabee considers it.",nextBeatId:"iwa_reflect_tests_08"},
    {beatId:"iwa_reflect_tests_08",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Could.",nextBeatId:"iwa_reflect_tests_09"},
    {beatId:"iwa_reflect_tests_09",mode:"narration",environmentRef:courtyard,text:"The instructor walks past him.",nextBeatId:"iwa_reflect_tests_10"},
    {beatId:"iwa_reflect_tests_10",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Correct the page.",nextBeatId:"iwa_reflect_tests_11"},
    {beatId:"iwa_reflect_tests_11",mode:"narration",environmentRef:courtyard,text:"Iwabee clicks his tongue and follows.",nextBeatId:"iwa_close_01"},

    {beatId:"iwa_reflect_way_01",mode:"narration",environmentRef:courtyard,text:"Iwabee folds the paper and points it toward the repaired yard.",nextBeatId:"iwa_reflect_way_02"},
    {beatId:"iwa_reflect_way_02",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"I'll prove I can do it my way.",nextBeatId:"iwa_reflect_way_03"},
    {beatId:"iwa_reflect_way_03",mode:"narration",environmentRef:courtyard,text:"The instructor looks at the ground.\n\nThen at the paper.",nextBeatId:"iwa_reflect_way_04"},
    {beatId:"iwa_reflect_way_04",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Do both.",nextBeatId:"iwa_reflect_way_05"},
    {beatId:"iwa_reflect_way_05",mode:"narration",environmentRef:courtyard,text:"Iwabee's face tightens.",nextBeatId:"iwa_reflect_way_06"},
    {beatId:"iwa_reflect_way_06",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"That's more work.",nextBeatId:"iwa_reflect_way_07"},
    {beatId:"iwa_reflect_way_07",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Yeah.",nextBeatId:"iwa_reflect_way_08"},
    {beatId:"iwa_reflect_way_08",mode:"narration",environmentRef:courtyard,text:"Iwabee looks annoyed.\n\nHe also keeps the paper.",nextBeatId:"iwa_close_01"},

    // Scene 7 — Close
    {beatId:"iwa_close_01",mode:"narration",environmentRef:courtyard,text:"Iwabee heads toward the gate.\n\nThe marked worksheet is sticking out of his bag.\n\nHe notices.\n\nPulls it free.\n\nLooks at the red score.",nextBeatId:"iwa_close_02"},
    {beatId:"iwa_close_02",mode:"narration",environmentRef:courtyard,text:"For an instant, his hand moves toward the nearest bin.\n\nHe stops himself before the page leaves his fingers.\n\nIwabee folds it properly and puts it back in the bag.",nextBeatId:"iwa_close_03"},
    {beatId:"iwa_close_03",mode:"narration",environmentRef:courtyard,text:"Behind him, the practical ground is still level.\n\nThe instructor is already putting the last marker away.\n\nIwabee looks over his shoulder.",nextBeatId:"iwa_close_04"},
    {beatId:"iwa_close_04",mode:"dialogue",speakerName:"IWABEE",environmentRef:courtyard,text:"Tomorrow.",nextBeatId:"iwa_close_05"},
    {beatId:"iwa_close_05",mode:"dialogue",speakerName:"INSTRUCTOR",environmentRef:courtyard,text:"Tomorrow.",nextBeatId:"iwa_close_06"},
    {beatId:"iwa_close_06",mode:"narration",environmentRef:courtyard,text:"Iwabee leaves the yard.",nextBeatId:"iwa_receipt"},
    {beatId:"iwa_receipt",mode:"record",environmentRef:courtyard,text:"",exitScene:true}
  ],onCompleteConsequences:[X("academy_iwabee",[reshape,rogue])]});
})();

// Metal Lee — 2026-09-30 final browser-repair rewrite. Machine facts / #396 Battle preserved.
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
    return{success:true,type:"metal_protective_response_resolved",resolved,targetBeatId:prefix+"_"+resolved.protectiveResponseOutcome+"_01"};
  }});
  const N=(beatId,text,nextBeatId,extra={})=>({beatId,mode:"narration",environmentRef:courtyard,text,...(nextBeatId?{nextBeatId}:{}),...extra});
  const D=(beatId,speakerName,text,nextBeatId,extra={})=>({beatId,mode:"dialogue",speakerName,environmentRef:courtyard,text,...(nextBeatId?{nextBeatId}:{}),...extra});
  const Q=(beatId,text,choices,extra={})=>({beatId,mode:"choice",environmentRef:courtyard,text,choices,...extra});
  const hidden=predicate=>ctx=>({available:!!predicate((ctx&&ctx.localContext)||A.local()),knownBlocker:null});

  A.register({sceneId:scene,eventId:scene,title:"ACADEMY METAL LEE",entryBeatId:"met_open_01",environmentRef:courtyard,participants:[],beats:[
    // Scene 1 — Early Training
    N("met_open_01","The Academy courtyard is almost empty.\n\nMetal likes it that way.\n\nThe training dummy rolls along its rail.\n\nHe watches the timing.\n\nOne turn.\n\nTwo.\n\nThree.\n\nMetal tightens his hand wraps.","met_open_02"),
    D("met_open_02","METAL","Again.","met_open_03"),
    N("met_open_03","The dummy starts another cycle.\n\nThis time Metal chooses how he trains.","met_private_choice"),
    Q("met_private_choice","How does Metal train?",[
      C("spinning_kick","Spinning kick","met_private_spin_01",{metalPrivateChoice:"spinning_kick"}),
      C("full_force_fist","Full-force fist","met_private_fist_01",{metalPrivateChoice:"full_force_fist"}),
      C("conditioned_endurance","Conditioned endurance","met_private_endurance_01",{metalPrivateChoice:"conditioned_endurance"})
    ]),

    N("met_private_spin_01","Metal waits until the moving pad crosses in front of him.\n\nHe steps.\n\nTurns.\n\nHis heel drives through the centre of the target.\n\nThe pad snaps back.\n\nMetal lands cleanly.\n\nHe checks his footing.\n\nThen the mark on the pad.\n\nA small smile.","met_private_spin_02"),
    D("met_private_spin_02","METAL","Better.","met_private_spin_03"),
    N("met_private_spin_03","He resets the dummy himself.","met_watchers_01"),

    N("met_private_fist_01","Metal lets the dummy roll toward him.\n\nHe does not swing early.\n\nOne more step.\n\nThen he drives his fist into the reinforced centre pad.\n\nThe whole frame shakes.\n\nMetal's feet stay planted.\n\nHe looks at the target.","met_private_fist_02"),
    D("met_private_fist_02","METAL","Good.","met_private_fist_03"),
    N("met_private_fist_03","Then he notices his back foot.\n\nA little too wide.\n\nMetal resets his stance.","met_private_fist_04"),
    D("met_private_fist_04","METAL","Again.","met_watchers_01"),

    N("met_private_endurance_01","Metal starts the moving cycle.\n\nHe stays with it.\n\nTurn.\n\nStep.\n\nDuck.\n\nReset.\n\nAgain.\n\nThe dummy speeds up.\n\nMetal keeps going.\n\nHis breathing gets louder.\n\nHis movements do not fall apart.\n\nWhen the mechanism finally slows, Metal puts both hands on his knees.\n\nHe is smiling.","met_private_endurance_02"),
    D("met_private_endurance_02","METAL","One more.","met_private_endurance_03"),
    N("met_private_endurance_03","He reaches for the control.\n\nA voice behind him stops him.","met_watchers_01"),

    // Scene 2 — Someone Was Watching
    D("met_watchers_01","GENIN","That was good.","met_watchers_02",{onEnterConsequences:[privateCommit,contactCommit]}),
    N("met_watchers_02","Metal freezes.\n\nNot in his stance.\n\nEverywhere else.\n\nHe turns.\n\nA Genin is standing near the edge of the courtyard.\n\nTwo Academy students are with them.\n\nMetal looks from one face to the next.\n\nThen back to the dummy.","met_watchers_03"),
    D("met_watchers_03","METAL","How long were you there?","met_watchers_04"),
    D("met_watchers_04","GENIN","Long enough to see the last few rounds.","met_watchers_05"),
    N("met_watchers_05","Metal straightens.\n\nToo fast.\n\nHis heel catches the edge of the training mark.\n\nHe recovers before he falls.\n\nEveryone sees that too.\n\nMetal looks down at his foot.\n\nThen up.","met_watchers_06"),
    D("met_watchers_06","METAL","That was not part of the exercise.","met_watchers_07"),
    N("met_watchers_07","One of the students smiles.\n\nMetal's ears start turning red.\n\nHe immediately faces the dummy again.","met_invite_01"),

    // Scene 3 — Invitation
    N("met_invite_01","The Genin walks closer.\n\nNot too close.","met_invite_02"),
    D("met_invite_02","GENIN","Do you want to spar?","met_invite_03"),
    N("met_invite_03","Metal looks over his shoulder.\n\nAt the Genin.\n\nThen at the two students.\n\nOne of them notices and steps back.\n\nThat does not make Metal feel better.\n\nHe rubs one thumb across the edge of his hand wrap.","met_invite"),
    Q("met_invite","What does Metal do?",[
      C("spar","Spar","met_spar_01",{metalBranch:"spar"}),
      C("demonstrate","Keep working the dummy","met_dummy_01",{metalBranch:"demonstrate"}),
      C("back_out","Back out","met_backout_01",{metalBranch:"back_out"})
    ]),

    // Branch A — Spar
    N("met_spar_01","Metal faces the Genin.","met_spar_02"),
    D("met_spar_02","METAL","Yes.","met_spar_03"),
    N("met_spar_03","The answer comes quickly.\n\nMetal takes a breath.\n\nThen adds:","met_spar_04"),
    D("met_spar_04","METAL","A real spar.","met_spar_05"),
    D("met_spar_05","GENIN","A real spar.","met_spar_06"),
    N("met_spar_06","The watching students move farther from the training line.\n\nMetal steps into position.\n\nHe checks the Genin's stance.\n\nThen catches one of the students looking at him.\n\nMetal immediately checks his own stance again.\n\nIt was fine.\n\nNow he is thinking about it.\n\nThe Genin raises one hand.","met_spar_07"),
    D("met_spar_07","GENIN","Ready?","met_spar_08"),
    N("met_spar_08","Metal nods.","met_spar_09"),
    D("met_spar_09","METAL","Ready.","met_spar_battle"),
    {beatId:"met_spar_battle",mode:"battle_transition",environmentRef:courtyard,text:"Metal and the Genin begin the controlled spar.",battle:{
      encounterId:"origin_academy_metal_lee:inviting_genin_spar",launchResolver:battleLaunch,
      victoryBeatId:"met_spar_dispatch",defeatBeatId:"met_spar_dispatch",postBattleBeatId:"met_spar_dispatch",resultProjector:battleProject,actionLabel:"Start PL Battle"}},
    {beatId:"met_spar_dispatch",mode:"resolver",machineResolved:true,environmentRef:courtyard,text:"",choices:[
      C("route_strong","RESOLVE STRONG","met_spar_strong_01",null,{availability:hidden(ctx=>ctx.metalSparPerformanceClass==="strong")}),
      C("route_mixed","RESOLVE MIXED","met_spar_mixed_01",null,{availability:hidden(ctx=>ctx.metalSparPerformanceClass==="mixed")}),
      C("route_rough","RESOLVE ROUGH","met_spar_rough_01",null,{availability:hidden(ctx=>ctx.metalSparPerformanceClass==="rough")})
    ]},

    N("met_spar_strong_01","The spar ends.\n\nMetal is breathing hard.\n\nHis guard is still up.\n\nThe Genin lowers theirs first.\n\nMetal realises the watching students are quiet.\n\nHe looks at them.\n\nThen instantly wishes he had not.\n\nThe Genin offers a hand.","met_spar_strong_02",{onEnterConsequences:[sparPerf]}),
    D("met_spar_strong_02","GENIN","Good match.","met_spar_strong_03"),
    N("met_spar_strong_03","Metal takes it.","met_spar_strong_04"),
    D("met_spar_strong_04","METAL","Thank you.","met_spar_strong_05"),
    N("met_spar_strong_05","The Genin looks at the training dummy.\n\nThen at Metal.","met_spar_strong_06"),
    D("met_spar_strong_06","GENIN","You looked more comfortable before we started.","met_spar_strong_07"),
    N("met_spar_strong_07","Metal's shoulders tighten.\n\nHe almost denies it.\n\nThen stops.","met_spar_strong_08"),
    D("met_spar_strong_08","METAL","I knew the dummy was not watching me.","met_spar_strong_09"),
    N("met_spar_strong_09","The Genin laughs once.\n\nThen looks back at the sparring line instead of the students.","met_spar_strong_10"),
    D("met_spar_strong_10","GENIN","Fair.","met_spar_strong_11"),
    N("met_spar_strong_11","Metal looks back at the sparring line.","met_spar_strong_12"),
    D("met_spar_strong_12","METAL","I still did better than I thought I would.","met_spar_strong_13"),
    D("met_spar_strong_13","GENIN","You did.","met_spar_strong_close_01"),
    N("met_spar_strong_close_01","The other students start gathering their things.\n\nThe Genin turns to leave.\n\nMetal calls after them.","met_spar_strong_close_02"),
    D("met_spar_strong_close_02","METAL","Can we spar again another day?","met_spar_strong_close_03"),
    N("met_spar_strong_close_03","The Genin looks back.","met_spar_strong_close_04"),
    D("met_spar_strong_close_04","GENIN","Yeah. Ask me tomorrow.","met_spar_strong_close_05"),
    N("met_spar_strong_close_05","Metal nods like this was a completely ordinary question.\n\nThen he notices the students still nearby.\n\nHis posture stiffens again.\n\nMetal sighs.","met_spar_strong_close_06"),
    D("met_spar_strong_close_06","METAL","I was doing fine.","met_spar_strong_close_07"),
    N("met_spar_strong_close_07","One of the students smiles.\n\nMetal shakes his head and starts retightening his wraps.","met_receipt"),

    N("met_spar_mixed_01","The spar ends.\n\nMetal steps back too quickly and nearly loses his balance.\n\nHe catches himself.\n\nThe Genin lowers their guard.\n\nMetal keeps his up for another second.\n\nThen drops it.\n\nNobody behind the Genin says anything.\n\nMetal can still feel them there.","met_spar_mixed_02",{onEnterConsequences:[sparPerf]}),
    D("met_spar_mixed_02","GENIN","You all right?","met_spar_mixed_03"),
    D("met_spar_mixed_03","METAL","Yes.","met_spar_mixed_04"),
    N("met_spar_mixed_04","Metal looks down at the sparring line.","met_spar_mixed_05"),
    D("met_spar_mixed_05","METAL","I kept looking past you.","met_spar_mixed_06"),
    N("met_spar_mixed_06","The Genin glances over one shoulder.","met_spar_mixed_07"),
    D("met_spar_mixed_07","GENIN","At them?","met_spar_mixed_08"),
    N("met_spar_mixed_08","Metal looks away.","met_spar_mixed_09"),
    D("met_spar_mixed_09","METAL","I knew they were there.","met_spar_mixed_10"),
    D("met_spar_mixed_10","GENIN","Yeah.","met_spar_mixed_11"),
    N("met_spar_mixed_11","Metal looks back at the sparring line.","met_spar_mixed_12"),
    D("met_spar_mixed_12","METAL","I can do better than that.","met_spar_mixed_13"),
    D("met_spar_mixed_13","GENIN","Then do better next time.","met_spar_mixed_14"),
    N("met_spar_mixed_14","Metal looks at them.\n\nHis shoulders ease.","met_spar_mixed_close_01"),
    N("met_spar_mixed_close_01","The Genin starts toward the others.\n\nMetal stays beside the sparring line.\n\nHe moves through the first step of the exchange again.\n\nSlowly.\n\nNo opponent.\n\nNo audience needed.\n\nJust the part where his foot went wrong.\n\nMetal corrects it.\n\nThen stops.\n\nThe Genin notices.","met_spar_mixed_close_02"),
    D("met_spar_mixed_close_02","GENIN","Tomorrow?","met_spar_mixed_close_03"),
    N("met_spar_mixed_close_03","Metal looks over.","met_spar_mixed_close_04"),
    D("met_spar_mixed_close_04","METAL","Tomorrow.","met_spar_mixed_close_05"),
    N("met_spar_mixed_close_05","This time he says it without checking who heard.","met_receipt"),

    N("met_spar_rough_01","The spar ends with Metal on the wrong side of almost every exchange he wanted back.\n\nHe steps away.\n\nHis breathing is too fast.\n\nHe knows it.\n\nThat makes it worse.\n\nOne of the Academy students behind the Genin shifts.\n\nMetal looks over.\n\nThen back.\n\nHis hand closes around the end of his wrap.","met_spar_rough_02",{onEnterConsequences:[sparPerf]}),
    D("met_spar_rough_02","GENIN","Metal.","met_spar_rough_03"),
    N("met_spar_rough_03","Metal looks up.","met_spar_rough_04"),
    D("met_spar_rough_04","GENIN","You good?","met_spar_rough_05"),
    N("met_spar_rough_05","Metal wants to say yes.\n\nInstead:","met_spar_rough_06"),
    D("met_spar_rough_06","METAL","No.","met_spar_rough_07"),
    N("met_spar_rough_07","That surprises both of them.\n\nMetal looks toward the dummy.","met_spar_rough_08"),
    D("met_spar_rough_08","METAL","I was doing that fine before.","met_spar_rough_09"),
    N("met_spar_rough_09","The Genin follows his eyes.","met_spar_rough_10"),
    D("met_spar_rough_10","GENIN","I saw.","met_spar_rough_11"),
    N("met_spar_rough_11","Metal swallows.","met_spar_rough_12"),
    D("met_spar_rough_12","METAL","Then everybody looked at me.","met_spar_rough_13"),
    D("met_spar_rough_13","METAL","And I knew everybody was looking, so I tried not to think about everybody looking, and then I was thinking about it anyway.","met_spar_rough_14"),
    N("met_spar_rough_14","He stops.\n\nRealises how much he just said.\n\nMetal closes his eyes.","met_spar_rough_15"),
    D("met_spar_rough_15","METAL","That sounded worse out loud.","met_spar_rough_16"),
    N("met_spar_rough_16","The Genin shakes their head.","met_spar_rough_17"),
    D("met_spar_rough_17","GENIN","Sounded accurate.","met_spar_rough_18"),
    N("met_spar_rough_18","Metal opens one eye.\n\nNo teasing.\n\nNo lecture.\n\nMetal looks back at the training line.","met_spar_rough_19"),
    D("met_spar_rough_19","METAL","I still want another try.","met_spar_rough_close_01"),
    N("met_spar_rough_close_01","The courtyard begins to empty.\n\nMetal waits.\n\nNot because he is hiding.\n\nBecause he wants the space.\n\nWhen the last group reaches the gate, Metal steps back onto the sparring line.\n\nHe takes his stance.\n\nHis first breath shakes a little.\n\nThe second does not.\n\nMetal moves through the opening step again.\n\nThen again.\n\nHis foot lands cleaner the second time.\n\nMetal resets and starts once more.","met_receipt"),

    // Branch B — Keep Working the Dummy
    N("met_dummy_01","Metal looks at the Genin.\n\nThen the dummy.","met_dummy_02"),
    D("met_dummy_02","METAL","I am going to finish this first.","met_dummy_03"),
    D("met_dummy_03","GENIN","Okay.","met_dummy_04"),
    N("met_dummy_04","Metal turns back to the mechanism.\n\nHe resets it.\n\nHis fingers take two tries to catch the switch.\n\nMetal notices.\n\nSo does everyone else.\n\nHe starts the cycle.\n\nThe first turn is clean.\n\nThe second is not.\n\nMetal lands too far left.\n\nHe corrects too hard.\n\nThe dummy frame jumps its guide.","met_dummy_05",{onEnterConsequences:[demoPerf]}),
    N("met_dummy_05","Metal's eyes widen.\n\nThe whole apparatus tears sideways.\n\nToward one of the Academy students.\n\nMetal stops thinking about who is watching.","met_protect"),
    Q("met_protect","What does Metal do?",[
      C("redirect_dummy","Redirect the dummy","met_resolve_redirect",{metalProtectiveResponse:"redirect_dummy"}),
      C("take_impact","Take the impact","met_resolve_impact",{metalProtectiveResponse:"take_impact"}),
      C("destroy_dummy","Destroy the dummy","met_resolve_destroy",{metalProtectiveResponse:"destroy_dummy"})
    ]),
    N("met_resolve_redirect","Metal moves.","met_redirect_dispatch",{onEnterConsequences:[protectiveResolver("metal_protect_redirect_396","redirect_dummy")]}),
    N("met_resolve_impact","Metal moves.","met_impact_dispatch",{onEnterConsequences:[protectiveResolver("metal_protect_impact_396","take_impact")]}),
    N("met_resolve_destroy","Metal moves.","met_destroy_dispatch",{onEnterConsequences:[protectiveResolver("metal_protect_destroy_396","destroy_dummy")]}),

    {beatId:"met_redirect_dispatch",mode:"resolver",machineResolved:true,environmentRef:courtyard,text:"",choices:[
      C("route_success","RESOLVE SUCCESS","met_redirect_success_01",null,{availability:hidden(ctx=>ctx.metalProtectiveOutcome==="success")}),
      C("route_partial","RESOLVE PARTIAL","met_redirect_partial_01",null,{availability:hidden(ctx=>ctx.metalProtectiveOutcome==="partial")}),
      C("route_failure","RESOLVE FAILURE","met_redirect_failure_01",null,{availability:hidden(ctx=>ctx.metalProtectiveOutcome==="failure")})
    ]},
    {beatId:"met_impact_dispatch",mode:"resolver",machineResolved:true,environmentRef:courtyard,text:"",choices:[
      C("route_success","RESOLVE SUCCESS","met_impact_success_01",null,{availability:hidden(ctx=>ctx.metalProtectiveOutcome==="success")}),
      C("route_partial","RESOLVE PARTIAL","met_impact_partial_01",null,{availability:hidden(ctx=>ctx.metalProtectiveOutcome==="partial")}),
      C("route_failure","RESOLVE FAILURE","met_impact_failure_01",null,{availability:hidden(ctx=>ctx.metalProtectiveOutcome==="failure")})
    ]},
    {beatId:"met_destroy_dispatch",mode:"resolver",machineResolved:true,environmentRef:courtyard,text:"",choices:[
      C("route_success","RESOLVE SUCCESS","met_destroy_success_01",null,{availability:hidden(ctx=>ctx.metalProtectiveOutcome==="success")}),
      C("route_partial","RESOLVE PARTIAL","met_destroy_partial_01",null,{availability:hidden(ctx=>ctx.metalProtectiveOutcome==="partial")}),
      C("route_failure","RESOLVE FAILURE","met_destroy_failure_01",null,{availability:hidden(ctx=>ctx.metalProtectiveOutcome==="failure")})
    ]},

    // Redirect outcomes
    N("met_redirect_success_01","Metal runs with the swing instead of straight at it.\n\nAt the turn, he kicks across the frame's path.\n\nThe dummy whips away from the student.\n\nIt crashes into empty ground.\n\nMetal lands beside the student.","met_redirect_success_02"),
    D("met_redirect_success_02","METAL","Are you hurt?","met_redirect_success_03"),
    D("met_redirect_success_03","STUDENT","No.","met_redirect_success_04"),
    N("met_redirect_success_04","Metal checks anyway.\n\nHands.\n\nFace.\n\nFeet.\n\nThen he finally looks at the broken dummy.","met_redirect_success_05"),
    D("met_redirect_success_05","METAL","Okay.","met_redirect_success_06"),
    N("met_redirect_success_06","The Genin walks over.","met_redirect_success_07"),
    D("met_redirect_success_07","GENIN","Nice redirect.","met_redirect_success_08"),
    N("met_redirect_success_08","Metal looks at the student again.","met_redirect_success_09"),
    D("met_redirect_success_09","METAL","They were too close.","met_redirect_success_close_01"),
    N("met_redirect_success_close_01","The student picks up their bag.\n\nBefore leaving, they stop beside Metal.","met_redirect_success_close_02"),
    D("met_redirect_success_close_02","STUDENT","Thanks.","met_redirect_success_close_03"),
    N("met_redirect_success_close_03","Metal straightens.","met_redirect_success_close_04"),
    D("met_redirect_success_close_04","METAL","You are welcome.","met_redirect_success_close_05"),
    N("met_redirect_success_close_05","Too formal.\n\nHe knows it immediately.\n\nThe student smiles.\n\nMetal looks at the ruined rail.","met_redirect_success_close_06"),
    D("met_redirect_success_close_06","METAL","I should probably fix that.","met_redirect_success_close_07"),
    N("met_redirect_success_close_07","The Genin looks at the frame.","met_redirect_success_close_08"),
    D("met_redirect_success_close_08","GENIN","Probably.","met_redirect_success_close_09"),
    N("met_redirect_success_close_09","Metal kneels beside it.\n\nThis time the smile is his too.","met_receipt"),

    N("met_redirect_partial_01","Metal reaches the frame.\n\nHis kick changes the angle.\n\nNot enough.\n\nThe Genin grabs the student and pulls them clear.\n\nThe dummy crashes past both of them.\n\nMetal turns immediately.","met_redirect_partial_02"),
    D("met_redirect_partial_02","METAL","Are you okay?","met_redirect_partial_03"),
    D("met_redirect_partial_03","STUDENT","Yes.","met_redirect_partial_04"),
    N("met_redirect_partial_04","Metal exhales.\n\nThen looks at the Genin.","met_redirect_partial_05"),
    D("met_redirect_partial_05","METAL","I almost had it.","met_redirect_partial_06"),
    D("met_redirect_partial_06","GENIN","You changed it enough for me to move them.","met_redirect_partial_close_01"),
    N("met_redirect_partial_close_01","The Genin and Metal drag the broken frame away from the training line.\n\nMetal keeps glancing at the student.\n\nThe third time, the student notices.","met_redirect_partial_close_02"),
    D("met_redirect_partial_close_02","STUDENT","I am fine.","met_redirect_partial_close_03"),
    N("met_redirect_partial_close_03","Metal looks embarrassed.","met_redirect_partial_close_04"),
    D("met_redirect_partial_close_04","METAL","I know.","met_redirect_partial_close_05"),
    D("met_redirect_partial_close_05","METAL","I just wanted to make sure.","met_redirect_partial_close_06"),
    N("met_redirect_partial_close_06","The student nods.\n\nMetal goes back to the frame.\n\nHe does not look at the audience again.","met_receipt"),

    N("met_redirect_failure_01","Metal strikes the frame at the wrong angle.\n\nIt barely changes direction.\n\nThe Genin gets to the student first and pulls them clear.\n\nThe dummy smashes through an empty marker.\n\nMetal is beside the student a second later.","met_redirect_failure_02"),
    D("met_redirect_failure_02","METAL","Are you hurt?","met_redirect_failure_03"),
    D("met_redirect_failure_03","STUDENT","No.","met_redirect_failure_04"),
    N("met_redirect_failure_04","Metal looks at the Genin.","met_redirect_failure_05"),
    D("met_redirect_failure_05","METAL","Thank you.","met_redirect_failure_06"),
    N("met_redirect_failure_06","The Genin nods.\n\nMetal looks back at the dummy.\n\nNo excuse comes out.","met_redirect_failure_close_01"),
    N("met_redirect_failure_close_01","The student leaves with the others.\n\nMetal remains near the damaged marker.\n\nThe Genin starts lifting part of the frame.\n\nMetal takes the other side.\n\nThey carry it together.","met_redirect_failure_close_02"),
    D("met_redirect_failure_close_02","METAL","I missed the angle.","met_redirect_failure_close_03"),
    D("met_redirect_failure_close_03","GENIN","Yeah.","met_redirect_failure_close_04"),
    N("met_redirect_failure_close_04","Metal looks at the broken rail.","met_redirect_failure_close_05"),
    D("met_redirect_failure_close_05","METAL","I want to try that movement again later.","met_redirect_failure_close_06"),
    D("met_redirect_failure_close_06","GENIN","Use a dummy that is attached to something.","met_redirect_failure_close_07"),
    N("met_redirect_failure_close_07","Metal nods very seriously.","met_redirect_failure_close_08"),
    D("met_redirect_failure_close_08","METAL","That would be better.","met_redirect_failure_close_09"),
    N("met_redirect_failure_close_09","The Genin laughs.\n\nMetal only realises why after a second.","met_receipt"),

    // Impact outcomes
    N("met_impact_success_01","Metal steps between the dummy and the student.\n\nHe braces.\n\nThe frame slams into him.\n\nMetal slides backward.\n\nStops.\n\nThe student is untouched.\n\nMetal keeps both hands on the frame.","met_impact_success_02"),
    D("met_impact_success_02","METAL","Move back.","met_impact_success_03"),
    N("met_impact_success_03","The student does.\n\nOnly then does Metal let go.","met_impact_success_04"),
    D("met_impact_success_04","STUDENT","Are you okay?","met_impact_success_05"),
    N("met_impact_success_05","Metal rolls one shoulder.","met_impact_success_06"),
    D("met_impact_success_06","METAL","Yes.","met_impact_success_07"),
    N("met_impact_success_07","The Genin reaches them.\n\nMetal points at the student.","met_impact_success_08"),
    D("met_impact_success_08","METAL","They are fine.","met_impact_success_09"),
    N("met_impact_success_09","The student stares at him.","met_impact_success_10"),
    D("met_impact_success_10","STUDENT","I asked about you.","met_impact_success_11"),
    N("met_impact_success_11","Metal pauses.","met_impact_success_12"),
    D("met_impact_success_12","METAL","Oh.","met_impact_success_close_01"),
    N("met_impact_success_close_01","Metal sits on the edge of the training ground while the instructor checks the dummy.\n\nThe student sits beside him.","met_impact_success_close_02"),
    D("met_impact_success_close_02","STUDENT","You really did not have to stand there.","met_impact_success_close_03"),
    N("met_impact_success_close_03","Metal looks at them.","met_impact_success_close_04"),
    D("met_impact_success_close_04","METAL","You were behind me.","met_impact_success_close_05"),
    N("met_impact_success_close_05","Metal goes back to rewrapping his hand.\n\nThe student watches him for a second.","met_impact_success_close_06"),
    D("met_impact_success_close_06","STUDENT","Right.","met_impact_success_close_07"),
    N("met_impact_success_close_07","Metal starts rewrapping one hand.","met_impact_success_close_08"),
    D("met_impact_success_close_08","METAL","I should have stopped it sooner.","met_impact_success_close_09"),
    N("met_impact_success_close_09","The student shakes their head.","met_impact_success_close_10"),
    D("met_impact_success_close_10","STUDENT","You stopped it.","met_impact_success_close_11"),
    N("met_impact_success_close_11","Metal considers that.\n\nThen keeps wrapping.","met_receipt"),

    N("met_impact_partial_01","Metal gets between the dummy and the student.\n\nThe frame keeps driving him backward.\n\nThe Genin reaches the other side.\n\nTogether they force it down.\n\nMetal stays bent over it for a second.","met_impact_partial_02"),
    D("met_impact_partial_02","GENIN","Got it.","met_impact_partial_03"),
    N("met_impact_partial_03","Metal breathes.\n\nThen looks at the student.","met_impact_partial_04"),
    D("met_impact_partial_04","METAL","Are you hurt?","met_impact_partial_05"),
    D("met_impact_partial_05","STUDENT","No.","met_impact_partial_06"),
    N("met_impact_partial_06","Metal nods.\n\nThe Genin lets go of the frame.\n\nMetal does too.","met_impact_partial_close_01"),
    N("met_impact_partial_close_01","The Genin checks the bent rail.\n\nMetal checks it with them.","met_impact_partial_close_02"),
    D("met_impact_partial_close_02","METAL","I thought I could stop it.","met_impact_partial_close_03"),
    D("met_impact_partial_close_03","GENIN","You stopped most of it.","met_impact_partial_close_04"),
    N("met_impact_partial_close_04","Metal looks at the bend.\n\nThen at them.","met_impact_partial_close_05"),
    D("met_impact_partial_close_05","METAL","You stopped the rest.","met_impact_partial_close_06"),
    D("met_impact_partial_close_06","GENIN","That is what was needed.","met_impact_partial_close_07"),
    N("met_impact_partial_close_07","Metal nods once and looks back at the bent rail.","met_receipt"),

    N("met_impact_failure_01","Metal moves into the dummy's path.\n\nHe is one step late.\n\nThe Genin grabs the student and pulls them away.\n\nThe dummy crashes through the space they were standing in.\n\nMetal reaches them.","met_impact_failure_02"),
    D("met_impact_failure_02","GENIN","You okay?","met_impact_failure_03"),
    N("met_impact_failure_03","Metal points at the student.","met_impact_failure_04"),
    D("met_impact_failure_04","METAL","Them first.","met_impact_failure_05"),
    N("met_impact_failure_05","The student nods quickly.","met_impact_failure_06"),
    D("met_impact_failure_06","STUDENT","I am okay.","met_impact_failure_07"),
    N("met_impact_failure_07","Metal finally breathes.\n\nThen looks at the Genin.","met_impact_failure_08"),
    D("met_impact_failure_08","METAL","Thank you.","met_impact_failure_close_01"),
    N("met_impact_failure_close_01","The audience is gone before Metal finishes helping move the broken equipment.\n\nThe Genin stays.\n\nMetal wipes his hands on his trousers.","met_impact_failure_close_02"),
    D("met_impact_failure_close_02","METAL","I was too late.","met_impact_failure_close_03"),
    D("met_impact_failure_close_03","GENIN","This time.","met_impact_failure_close_04"),
    N("met_impact_failure_close_04","Metal looks at them.\n\nThe Genin does not add anything.\n\nMetal nods.","met_impact_failure_close_05"),
    D("met_impact_failure_close_05","METAL","Then I need to be faster next time.","met_receipt"),

    // Destroy outcomes
    N("met_destroy_success_01","Metal does not strike the whole frame.\n\nHe targets the joint carrying the motion.\n\nOne hit.\n\nThe joint breaks.\n\nThe dummy folds sideways and drops before it reaches the student.\n\nSilence.\n\nMetal looks at the fallen frame.\n\nThen at the student.","met_destroy_success_02"),
    D("met_destroy_success_02","METAL","Are you all right?","met_destroy_success_03"),
    N("met_destroy_success_03","The student nods.\n\nOnly then does Metal notice everyone staring again.\n\nMetal's shoulders climb.","met_destroy_success_04"),
    D("met_destroy_success_04","METAL","I meant to do that.","met_destroy_success_05"),
    N("met_destroy_success_05","The Genin looks at the broken joint.","met_destroy_success_06"),
    D("met_destroy_success_06","GENIN","I know.","met_destroy_success_close_01"),
    N("met_destroy_success_close_01","Metal kneels beside the broken mechanism.\n\nThe student stands nearby.","met_destroy_success_close_02"),
    D("met_destroy_success_close_02","STUDENT","That was amazing.","met_destroy_success_close_03"),
    N("met_destroy_success_close_03","Metal's face goes red immediately.","met_destroy_success_close_04"),
    D("met_destroy_success_close_04","METAL","The joint was already under too much force.","met_destroy_success_close_05"),
    D("met_destroy_success_close_05","STUDENT","Still amazing.","met_destroy_success_close_06"),
    N("met_destroy_success_close_06","Metal suddenly becomes very interested in the broken bolt.\n\nThe Genin smiles and walks away.\n\nMetal stays there until his face cools down.","met_receipt"),

    N("met_destroy_partial_01","Metal's strike breaks one side of the moving frame.\n\nThe rest keeps coming.\n\nThe Genin drives into the damaged section and knocks it down.\n\nThe student gets clear.\n\nMetal stares at the broken joint.","met_destroy_partial_02"),
    D("met_destroy_partial_02","METAL","I hit it.","met_destroy_partial_03"),
    D("met_destroy_partial_03","GENIN","You did.","met_destroy_partial_04"),
    N("met_destroy_partial_04","Metal looks at the rest of the frame.","met_destroy_partial_05"),
    D("met_destroy_partial_05","METAL","Not enough.","met_destroy_partial_06"),
    N("met_destroy_partial_06","The Genin looks at the student.\n\nSafe.\n\nThen at Metal.","met_destroy_partial_07"),
    D("met_destroy_partial_07","GENIN","Enough to help.","met_destroy_partial_close_01"),
    N("met_destroy_partial_close_01","Metal helps gather the broken pieces.\n\nThe Genin hands him one of the snapped joints.","met_destroy_partial_close_02"),
    D("met_destroy_partial_close_02","GENIN","You keeping that?","met_destroy_partial_close_03"),
    N("met_destroy_partial_close_03","Metal looks at it.","met_destroy_partial_close_04"),
    D("met_destroy_partial_close_04","METAL","Why would I keep it?","met_destroy_partial_close_05"),
    N("met_destroy_partial_close_05","The Genin shrugs.","met_destroy_partial_close_06"),
    D("met_destroy_partial_close_06","GENIN","You have been staring at it for five minutes.","met_destroy_partial_close_07"),
    N("met_destroy_partial_close_07","Metal looks down.\n\nHe has.\n\nMetal puts the piece beside the others.","met_destroy_partial_close_08"),
    D("met_destroy_partial_close_08","METAL","I was studying it.","met_destroy_partial_close_09"),
    N("met_destroy_partial_close_09","The Genin nods.","met_destroy_partial_close_10"),
    D("met_destroy_partial_close_10","GENIN","Of course.","met_destroy_partial_close_11"),
    N("met_destroy_partial_close_11","Metal cannot tell whether that was a joke.\n\nHe decides not to ask.","met_receipt"),

    N("met_destroy_failure_01","Metal commits to the strike.\n\nThe joint slips past the point he aimed for.\n\nThe Genin shoves the student clear.\n\nThe dummy crashes into an empty rack.\n\nMetal stares at the mark his fist left on the wrong part of the frame.\n\nThen he turns.","met_destroy_failure_02"),
    D("met_destroy_failure_02","METAL","Are they hurt?","met_destroy_failure_03"),
    D("met_destroy_failure_03","GENIN","No.","met_destroy_failure_04"),
    N("met_destroy_failure_04","Metal looks at the student.\n\nThey nod.\n\nThe relief reaches his face first.\n\nThe embarrassment comes after.","met_destroy_failure_close_01"),
    N("met_destroy_failure_close_01","Metal stands beside the damaged rack after everyone starts leaving.\n\nHe puts his fist against the mark he made.\n\nToo high.\n\nToo late.\n\nThe Genin walks past.\n\nStops.","met_destroy_failure_close_02"),
    D("met_destroy_failure_close_02","GENIN","Coming?","met_destroy_failure_close_03"),
    N("met_destroy_failure_close_03","Metal looks at the mark once more.","met_destroy_failure_close_04"),
    D("met_destroy_failure_close_04","METAL","In a minute.","met_destroy_failure_close_05"),
    N("met_destroy_failure_close_05","The Genin nods and leaves.\n\nMetal stays long enough to remember exactly where he missed.\n\nThen he follows.","met_receipt"),

    // Branch C — Back Out
    N("met_backout_01","Metal looks at the Genin.\n\nThen at the watching students.\n\nHis hands tighten once.","met_backout_02"),
    D("met_backout_02","METAL","Not today.","met_backout_03"),
    D("met_backout_03","GENIN","Okay.","met_backout_04"),
    N("met_backout_04","Metal blinks.\n\nHe had prepared for an argument.\n\nThere is not one.","met_backout_05"),
    D("met_backout_05","METAL","That is all?","met_backout_06"),
    D("met_backout_06","GENIN","You said no.","met_backout_07"),
    N("met_backout_07","Metal looks at the ground.","met_backout_08"),
    D("met_backout_08","METAL","I can spar.","met_backout_09"),
    D("met_backout_09","GENIN","I believe you.","met_backout_10"),
    N("met_backout_10","Metal looks up.\n\nThe answer catches him off guard.\n\nThe Genin steps away.\n\nNo challenge.\n\nNo lecture.\n\nMetal is left with his own decision.","met_backout_close_01"),
    N("met_backout_close_01","The other students leave first.\n\nMetal stays with the dummy.\n\nHe resets it.\n\nThe courtyard gets quieter.\n\nMetal takes his stance.\n\nThen stops.\n\nLooks toward the gate.\n\nNobody is watching now.\n\nMetal breathes out.\n\nStarts the cycle.\n\nHis first movement is clean.\n\nMetal does not smile.\n\nNot yet.\n\nHe keeps training.","met_receipt"),

    {beatId:"met_receipt",mode:"record",environmentRef:courtyard,text:"",exitScene:true}
  ],onCompleteConsequences:[X("academy_metal_lee",[priv,perf,protect,contact])]});
})();

})();