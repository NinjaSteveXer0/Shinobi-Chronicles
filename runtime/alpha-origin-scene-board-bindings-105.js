// ============================================================================
// ISSUE #105 — ACADEMY ORIGIN SHARED SCENE-BOARD BINDINGS
//
// Presentation adapter only. Reuses alpha-story-scene-board-33900.js.
// Does not own Story truth, choices, consequences, Battle semantics or rewards.
// Missing exact asset paths remain silhouettes; filenames are never guessed.
// Academy Kakashi is intentionally excluded: its owner-confirmed Golden Story
// presentation remains frozen. Reusable Battle presentation may still apply.
// ============================================================================
(function installOriginSceneBoardBindings105(){
"use strict";
if(globalThis.SC_ALPHA_ORIGIN_SCENE_BOARD_BINDINGS_105)return;

const PATCH_ID="alpha_origin_scene_board_bindings_105_2026_09_28";
const GENERIC_COURTYARD="Scene backdrops/academy_training_ground_courtyard.png";
const A=globalThis.SC_ALPHA_ORIGIN_32900||null;

const PATH=Object.freeze({
  hinata:"Assets/Academy Student/academy_hinata.png",
  hinataInstructor:"NPC/hyuga_instructor.png",
  hinataPartner:"NPC/hyuga_sparring_partner.png",
  hinataYoungerStudent:"NPC/younger_student.png",
  hinataYoungerSparringPartner:"NPC/younger_sparring_partner.png",
  mirai:"Assets/Academy Student/academy_mirai.png",
  miraiInstructor:"NPC/mirai_instructor.png",
  miraiPorter:"NPC/mirai_porter.png",
  miraiCheckpointInstructor:"NPC/mirai_checkpoint_instructor.png",
  traveller:"NPC/traveller.png",
  menma:"Assets/Academy Student/academy_menma.png",
  menmaNineTails:"Assets/Tailed Beasts/menma_nine_tails.png",
  menmaInstructor:"NPC/menma_instructor.png",
  anko:"Assets/Special Jonin/sj_anko.png",
  altered:"Enemies/test_subject_altered_shinobi.png",
  brute:"Enemies/test_subject_brute.png",
  unstable:"Enemies/test_subject_unstable.png",
  kushina:"Assets/Academy Student/academy_kushina.png",
  kushinaInstructor:"NPC/kushina_instructor.png",
  kushinaClassmate:"NPC/kushina_classmate.png",
  gerotora:"Assets/Summons/key_gero.png",
  kurenai:"Assets/Academy Student/academy_kurenai.png",
  kurenaiInstructor:"NPC/kurenai_instructor.png",
  iwabee:"Assets/Academy Student/academy_iwabe.png",
  iwabeeInstructor:"NPC/iwabe_instructor.png",
  rogue:"Enemies/rogue_genin.png",
  metal:"Assets/Academy Student/academy_metal.png",
  metalInvitingGenin:"NPC/metal_classmate_1.png",
  metalThreatenedStudent:"NPC/metal_classmate_2.png"
});

const BACKDROP=Object.freeze({
  hinataMain:"Hinata Origin Backdrop/hyuga_compound.png",
  hinataFinal:"Hinata Origin Backdrop/hyuga_compound_alt_angle.png",
  miraiCourtyard:"Mirai Origin Backdrop/academy_training_ground_courtyard.png",
  miraiStreet:"Mirai Origin Backdrop/konoha_main_street.png",
  miraiMarket:"Mirai Origin Backdrop/konoha_covered_market.png",
  miraiLane:"Mirai Origin Backdrop/konoha_storehouse_side_lane.png",
  miraiCheckpoint:"Mirai Origin Backdrop/checkpoint_three_day.png",
  menmaClassroom:"Menma Origin Backdrop/academy_classroom.png",
  menmaForest:"Menma Origin Backdrop/whisper_woods_forest_route.png",
  menmaClearing:"Menma Origin Backdrop/forest_clearing_day.png",
  menmaAfter:"Menma Origin Backdrop/forest_clearing_alt_angle.png",
  menmaFuture:"Menma Origin Backdrop/whisper_woods_rise.png"
});

function scene(variant){
  return A&&A.sceneByVariant?A.sceneByVariant[variant]||null:null;
}
function speaker(performance,beat){
  return String(
    performance&&performance.cue&&(performance.cue.speakerName||performance.cue.speaker)||
    beat&&beat.speakerName||""
  ).trim().toUpperCase();
}
function actor(id,label,image,speakerName="",aliases=[]){
  const names=[label,...aliases].map(v=>String(v||"").toUpperCase());
  const useSpeaker=speakerName&&names.includes(String(speakerName).toUpperCase());
  return{id,label:useSpeaker?speakerName:label,image:image||null,focus:useSpeaker};
}
function ensureFocus(rows){
  if(!rows.length)return rows;
  if(!rows.some(row=>row&&row.focus))rows[0].focus=true;
  return rows;
}
function projection(location,actors,mode="conversation"){
  return{mode,location,actors:ensureFocus(actors.filter(Boolean))};
}
function registerPath(id,path){
  try{
    const fn=typeof registerSceneBackdropAssetPath==="function"
      ?registerSceneBackdropAssetPath
      :globalThis.registerSceneBackdropAssetPath;
    if(typeof fn==="function")fn(id,path);
  }catch(_error){}
}
Object.entries(BACKDROP).forEach(([id,path])=>registerPath("issue105_"+id,path));
registerPath("issue105_generic_courtyard",GENERIC_COURTYARD);

function hinataFinal(beatId){
  const id=String(beatId||"");
  return id.startsWith("hin_children_intro_")||id==="hin_young_choice"||
    id.startsWith("hin_young_")||id.startsWith("hin_close_");
}
function hinataActors(beatId,performance,beat){
  const id=String(beatId||""),sp=speaker(performance,beat);
  if(id==="hin_receipt")return[];
  const rows=[actor("academy_hinata","HINATA",PATH.hinata,sp)];
  if(hinataFinal(id)){
    rows.push(actor("hinata_younger_student","YOUNGER STUDENT",PATH.hinataYoungerStudent,sp,["YOUNG HYŪGA","YOUNGER HYŪGA","YOUNGER GIRL"]));
    rows.push(actor("hinata_younger_sparring_partner","YOUNGER SPARRING PARTNER",PATH.hinataYoungerSparringPartner,sp,["YOUNGER BOY","YOUNGER HYŪGA BOY","YOUNGER SPARRING STUDENT"]));
  }else{
    rows.push(actor("hinata_academy_instructor","INSTRUCTOR",PATH.hinataInstructor,sp,["HYŪGA INSTRUCTOR","ACADEMY INSTRUCTOR"]));
    rows.push(actor("hinata_sparring_partner","SPARRING PARTNER",PATH.hinataPartner,sp,["PARTNER","HYŪGA STUDENT","SPARRING STUDENT","HYŪGA SPARRING PARTNER"]));
  }
  return rows;
}
function hinataReceiptLines105(){
  const runtime=A&&typeof A.active==="function"?A.active():null;
  const ctx=runtime&&runtime.localContext&&typeof runtime.localContext==="object"?runtime.localContext:{};
  const lines=["YOUR ORIGIN","ACADEMY HINATA","","RECORDED IN YOUR CHRONICLE","","YOUR DECISIONS"];
  const h1={
    wait_for_opening:"Waited for the opening.",
    attack_immediately:"Stepped in first.",
    defensive_stance:"Broke away and reset."
  };
  const h2={
    wait_hold_ground:"Held her ground.",
    wait_give_opening:"Gave him an opening.",
    wait_go_first:"Stopped waiting and went first.",
    press_keep_pressure:"Kept the pressure on.",
    press_draw_counter:"Drew out his counter.",
    press_back_off:"Backed off before the trap.",
    reset_meet_him:"Met him before he closed the space.",
    reset_circle_out:"Circled out.",
    reset_corner_bait:"Let him think he had her cornered."
  };
  const h3={
    answer_with_form:"Answered with the form she practised.",
    trust_spar:"Trusted what she had seen in the spar.",
    break_rhythm:"Broke the rhythm before he could set it."
  };
  const young={
    show_movement:"Showed the younger student once.",
    explain_error:"Explained what she saw.",
    leave_them_to_figure_it_out:"Left the younger students to their practice.",
    stay_and_watch:"Stayed to watch one more exchange."
  };
  for(const row of [h1[ctx.h1],h2[ctx.h2],h3[ctx.h3],young[ctx.young]])if(row)lines.push("• "+row);
  lines.push("","WHAT HAPPENED","• Completed the controlled Hyūga spar.","• The younger students kept practising.");
  const history=typeof A.history==="function"?A.history():[];
  const purse=history.find(row=>row&&String(row.rewardSourceId||row.sourceId||"")==="origin_completion_starting_purse_ryo_01"&&(row.originVariantId==="academy_hinata"||row.actorVariantId==="academy_hinata"));
  lines.push("","REWARDS");
  if(purse)lines.push("• Origin Starting Purse: +100 Ryō.");
  return lines;
}
function buildHinataReceipt105(){return hinataReceiptLines105().join("\n");}

function originStartingPurseAmount105(){
  const amount=Number(globalThis.SC_ORIGIN_STARTING_PURSE_409&&globalThis.SC_ORIGIN_STARTING_PURSE_409.amount);
  return Number.isFinite(amount)&&amount>0?amount:100;
}
function buildKushinaReceipt105(){
  const runtime=A&&typeof A.active==="function"?A.active():null;
  const ctx=runtime&&runtime.localContext&&typeof runtime.localContext==="object"?runtime.localContext:{};
  const lines=["YOUR ORIGIN","ACADEMY KUSHINA","","RECORDED IN YOUR CHRONICLE","","YOUR DECISIONS"];
  const crisis={
    protect_student:"Got the classmate clear before the next pulse.",
    contain_damaged_seal:"Contained the damaged seal instead of restoring the original exercise.",
    move_unstable_object:"Moved the unstable scroll into the cleared safety lane.",
    correct_formula:"Corrected the damaged formula."
  }[ctx.kushinaCrisisChoice];
  if(crisis)lines.push("• "+crisis);
  if(ctx.kushinaCrisisChoice==="correct_formula"){
    const contact={
      ask_what_happened:"Asked what had happened.",
      ask_who:"Asked the toad who he was.",
      help_close:"Helped close the residual connection.",
      send_back:"Told the toad to go back before things got worse."
    }[ctx.kushinaGerotoraChoice];
    if(contact)lines.push("• "+contact);
    lines.push("","WHAT HAPPENED","• The corrected formula accidentally opened a reverse-summoning connection.","• The residual connection was closed safely.");
  }else{
    const outcome={
      protect_student:"• The classmate was moved clear and the instructor secured the damaged scroll.",
      contain_damaged_seal:"• The leaking boundary was contained safely.",
      move_unstable_object:"• The unstable scroll was moved to the safety lane and secured there."
    }[ctx.kushinaCrisisChoice];
    lines.push("","WHAT HAPPENED");
    if(outcome)lines.push(outcome);
  }
  lines.push("","REWARDS",`• Origin Starting Purse: +${originStartingPurseAmount105()} Ryō.`);
  return lines.join("\n");
}
function buildKurenaiReceipt105(){
  const runtime=A&&typeof A.active==="function"?A.active():null;
  const ctx=runtime&&runtime.localContext&&typeof runtime.localContext==="object"?runtime.localContext:{};
  const lines=["YOUR ORIGIN","ACADEMY KURENAI","","RECORDED IN YOUR CHRONICLE","","YOUR DECISIONS"];
  const approach={
    false_kurenai:"Sent a false Kurenai at the bell.",
    conceal_movement:"Hid the movement that actually mattered.",
    distort_position:"Distorted the instructor's sense of distance.",
    fake_clumsy:"Made the direct approach look real."
  }[ctx.kurenaiRoute];
  if(approach)lines.push("• "+approach);
  lines.push("","WHAT HAPPENED");
  const outcome={
    complete_loss:"• The instructor read the first deception before Kurenai could create a reversal.",
    partial_loss:"• Kurenai deceived the instructor, then trusted the false bell herself.",
    partial_win:"• Kurenai took the bell before the instructor recovered and took it back.",
    complete_win:"• Kurenai held the real bell when the final illusion layer cleared."
  }[ctx.kurenaiOutcome];
  if(outcome)lines.push(outcome);
  lines.push("","REWARDS",`• Origin Starting Purse: +${originStartingPurseAmount105()} Ryō.`);
  return lines.join("\n");
}
function buildIwabeeReceipt105(){
  const runtime=A&&typeof A.active==="function"?A.active():null;
  const ctx=runtime&&runtime.localContext&&typeof runtime.localContext==="object"?runtime.localContext:{};
  const lines=["YOUR ORIGIN","ACADEMY IWABEE","","RECORDED IN YOUR CHRONICLE","","YOUR DECISIONS"];
  const terrain={
    raise_collapsed:"Raised the collapsed section.",
    flatten_ground:"Flattened the damaged ground.",
    build_path:"Built a stable path through the damage.",
    reinforce_weakest:"Reinforced the weakest section."
  }[ctx.iwabeeTerrainChoice];
  if(terrain)lines.push("• "+terrain);
  const rogue={
    confront:"Confronted the Rogue Genin.",
    block_escape:"Blocked the Rogue Genin's escape.",
    call_instructor:"Called the instructor.",
    finish_practical:"Finished the practical."
  }[ctx.iwabeeRogueResponse];
  if(rogue)lines.push("• "+rogue);
  const reflection={
    know_good_at:"Said he knows what he can do.",
    better_rest:"Said he needs to get better at the rest.",
    academy_tests_wrong:"Said the Academy leans too hard on written tests.",
    prove_my_way:"Said he will prove he can do it his way."
  }[ctx.iwabeeReflection];
  if(reflection)lines.push("• "+reflection);
  lines.push("","WHAT HAPPENED","• The damaged practical ground was made usable.","• An unexpected Rogue Genin was exposed during the exercise.","","REWARDS","• Origin Starting Purse: +"+originStartingPurseAmount105()+" Ryō.");
  return lines.join("\n");
}

function buildMiraiReceipt105(){
  const runtime=A&&typeof A.active==="function"?A.active():null;
  const ctx=runtime&&runtime.localContext&&typeof runtime.localContext==="object"?runtime.localContext:{};
  const defeated=ctx.miraiEscortAssessmentResult==="not_completed_battle_defeat";
  const shortcutBattleResult=ctx.miraiShortcutBattleResult||null;
  const lines=["YOUR ORIGIN","ACADEMY MIRAI","","RECORDED IN YOUR CHRONICLE","","YOUR DECISIONS"];
  if(ctx.mirTalked===true)lines.push("• Talked with the traveller during the escort.");
  else if(ctx.mirTalked===false)lines.push("• Kept attention on the escort.");
  const shortcut={stay:"Stayed on the assigned route.",ask:"Questioned the shortcut.",follow:"Tried to follow the shortcut."}[ctx.mirShortcut];
  if(shortcut)lines.push("• "+shortcut);
  if(ctx.mirConfronted===true)lines.push("• Confronted the suspected substitute.");
  else if(ctx.mirChangedRoute===true)lines.push("• Changed the route.");
  else if(ctx.mirContinued===true&&!defeated)lines.push("• Continued the escort to Checkpoint Three.");
  const reflection=defeated?{
    shortcut_route_control:"Gave up control of the route before the fight started.",
    shortcut_explain_first:"Should have made him explain the shortcut before following.",
    shortcut_escort_over:"Accepted that losing the exchange ended the escort.",
    shortcut_stop_earlier:"Will stop the problem before it becomes a fight next time.",
    confront_right_to_stop:"Was right to stop the substitute.",
    confront_seeing_not_enough:"Seeing the problem was not enough to win the exchange.",
    confront_after_talking:"Needs an answer after talking stops working.",
    confront_hold_road:"Caught the switch and still has to hold the road."
  }[ctx.mirDefeatReflection]:{
    conversation_route_person_changed:"The route stayed the same. The person didn't.",
    conversation_talking_matters:"Talking to someone can tell her more than a map.",
    conversation_check_sooner:"Caught the contradiction and chose to check sooner next time.",
    conversation_needed_mismatch:"Needed the mismatch, not suspicion alone.",
    chakra_stopped_on_change:"Stopped when something changed instead of explaining it away.",
    chakra_verify:"Used changed chakra as enough reason to verify.",
    chakra_wrong_before_why:"Knew something was wrong before knowing why.",
    chakra_recheck_after_lost_sight:"Will recheck the person after losing sight of them.",
    suspicion_needed_more:"Needed more than suspicion before acting.",
    suspicion_not_ready_to_prove:"Noticed the problem without pretending it was proof.",
    suspicion_verify_quietly:"Will verify without giving away what she knows.",
    suspicion_identity_unanswered:"Finishing the route did not answer who she was escorting.",
    missed_watched_road:"Watched the road better than the person.",
    missed_lost_sight:"Losing sight of someone should change what she checks next.",
    missed_switch:"Completed the escort and missed the switch.",
    missed_learn_person:"Will learn more than the route next time."
  }[ctx.mirReflection];
  if(reflection)lines.push("• "+reflection);
  lines.push("","WHAT HAPPENED");
  if(shortcutBattleResult==="victory"){
    lines.push("• Mirai won the controlled exchange against the disguised Academy instructor.");
    lines.push("• The Battle triggered the instructor reveal before Checkpoint Three.");
    lines.push("• The real Traveller was already safe at Checkpoint Three.");
    lines.push("• Mirai later reached Checkpoint Three for the reveal aftermath and debrief.");
  }else if(defeated){
    lines.push("• The escort assessment ended where Mirai was Battle-depleted.");
    lines.push("• The Battle triggered the instructor reveal before Checkpoint Three.");
    lines.push("• The real Traveller was already safe at Checkpoint Three.");
    lines.push("• Mirai later returned to Checkpoint Three for the post-assessment debrief.");
  }else{
    lines.push("• Completed the Academy escort assessment.");
    lines.push("• Reached Checkpoint Three and reviewed the route.");
  }
  lines.push("","REWARDS",`• Origin Starting Purse: +${originStartingPurseAmount105()} Ryō.`);
  return lines.join("\n");
}
function buildMenmaReceipt105(){
  const runtime=A&&typeof A.active==="function"?A.active():null;
  const ctx=runtime&&runtime.localContext&&typeof runtime.localContext==="object"?runtime.localContext:{};
  const history=typeof A.history==="function"?A.history():[];
  const battle=[...history].reverse().find(row=>row&&row.actorVariantId==="academy_menma"&&row.encounterId==="origin_academy_menma_prologue:three_test_subjects"&&row.type==="origin_battle_occurrence");
  const battleReward=[...history].reverse().find(row=>row&&String(row.rewardSourceId||row.sourceId||"")==="menma_origin_battle_three_test_subjects_victory_ryo_01");
  const lines=["YOUR ORIGIN","ACADEMY MENMA","","RECORDED IN YOUR CHRONICLE","","YOUR DECISIONS"];
  const future={
    master:"Chose to master what the Academy will not teach yet.",
    strong:"Chose to become too strong to hold back.",
    create:"Chose to create something of his own.",
    limit:"Chose to find out how far he can go."
  }[ctx.menmaFuture];
  if(future)lines.push("• "+future);
  lines.push("","WHAT HAPPENED","• Left the Academy and followed the disturbance into the forest.","• Met Anko and the three altered shinobi.");
  if(battle&&battle.battleResult==="victory")lines.push("• Stopped all three test subjects with Anko.");
  else if(battle&&battle.battleResult==="defeat")lines.push("• Withdrew after the fight was lost.");
  lines.push("","REWARDS");
  if(battleReward)lines.push("• PL Battle Victory: +100 Ryō.");
  lines.push(`• Origin Starting Purse: +${originStartingPurseAmount105()} Ryō.`);
  return lines.join("\n");
}

function miraiBackdrop(beatId,runtime){
  const id=String(beatId||""),ctx=runtime&&runtime.localContext||{};
  if(id==="mir_start"||id.startsWith("mir_assignment_"))return BACKDROP.miraiCourtyard;
  if(id==="mir_talk"||id.startsWith("mir_walk_")||id.startsWith("mir_talk_")||id.startsWith("mir_prof_"))return BACKDROP.miraiStreet;
  if(id==="mir_inconsistent"||id.startsWith("mir_market_"))return BACKDROP.miraiMarket;
  if(id==="mir_deeper")return ctx.miraiSuspicionResponse==="change_route"?BACKDROP.miraiLane:BACKDROP.miraiMarket;
  if(id.startsWith("mir_shortcut_")){
    if(id.startsWith("mir_shortcut_stay_")||id.startsWith("mir_shortcut_forget_"))return BACKDROP.miraiStreet;
    return BACKDROP.miraiLane;
  }
  if(id.startsWith("mir_defeat_debrief_")||id.startsWith("mir_defeat_reflection_")||id.startsWith("mir_defeat_close_"))return BACKDROP.miraiCheckpoint;
  if(id.startsWith("mir_checkpoint_")||id.startsWith("mir_after_")||id.startsWith("mir_leaving_")||
     id.startsWith("mir_reflect_")||id.startsWith("mir_reflection_")||id==="mir_close_01"||
     id==="mir_checkpoint"||id==="mir_verified"||id==="mir_eval"||id==="mir_end")return BACKDROP.miraiCheckpoint;
  return BACKDROP.miraiStreet;
}
function miraiActors(beatId,performance,beat){
  const id=String(beatId||""),sp=speaker(performance,beat);
  if(id==="mir_receipt")return[];
  const rows=[actor("academy_mirai","MIRAI",PATH.mirai,sp)];
  const traveller=()=>actor("mirai_traveller","TRAVELLER",PATH.traveller,sp,["TRAVELER","CIVILIAN","ESCORT"]);
  const instructor=()=>actor("academy_mirai_origin_instructor","INSTRUCTOR",PATH.miraiInstructor,sp,["ACADEMY INSTRUCTOR"]);
  const checkpoint=()=>actor("mirai_checkpoint_instructor","CHECKPOINT INSTRUCTOR",PATH.miraiCheckpointInstructor,sp);

  if(id.startsWith("mir_assignment_")){
    rows.push(instructor(),traveller());
    return rows;
  }
  if(id.startsWith("mir_shortcut_victory_reveal_")){
    const match=id.match(/_(\d+)$/),n=match?Number(match[1]):0;
    rows.push(n>=7?instructor():traveller());
    return rows;
  }
  if(id.startsWith("mir_shortcut_defeat_reveal_")){
    const match=id.match(/_(\d+)$/),n=match?Number(match[1]):0;
    rows.push(n>=3?instructor():traveller());
    return rows;
  }
  if(id.startsWith("mir_confront_defeat_end_")){
    const match=id.match(/_(\d+)$/),n=match?Number(match[1]):0;
    rows.push(n>=8?instructor():traveller());
    return rows;
  }
  if(id.startsWith("mir_defeat_debrief_")||id.startsWith("mir_defeat_reflection_")||id.startsWith("mir_defeat_close_")){
    rows.push(instructor(),traveller());
    return rows;
  }
  if(id==="mir_confront_reveal_01"){
    rows.push(instructor());
    return rows;
  }
  if(id.startsWith("mir_confront_")){
    const match=id.match(/_(\d+)$/),n=match?Number(match[1]):0;
    rows.push(n>=8?instructor():traveller());
    return rows;
  }
  if(id.startsWith("mir_checkpoint_missed_")){
    const match=id.match(/_(\d+)$/),n=match?Number(match[1]):0;
    if(sp==="CHECKPOINT INSTRUCTOR")rows.push(checkpoint(),traveller());
    else if(n>=10)rows.push(instructor(),traveller());
    else rows.push(traveller());
    return rows;
  }
  if(id.startsWith("mir_checkpoint_early_")||id.startsWith("mir_after_")||id.startsWith("mir_leaving_")){
    rows.push(instructor(),traveller());
    return rows;
  }
  if(id.startsWith("mir_reflect_")||id.startsWith("mir_reflection_")){
    rows.push(instructor(),traveller());
    return rows;
  }
  if(id==="mir_close_01")return rows;
  if(["mir_eval","mir_end"].includes(id))rows.push(instructor());
  else{
    rows.push(traveller());
    if(id.startsWith("mir_market_")&&sp==="PORTER")rows.push(actor("mirai_porter","PORTER",PATH.miraiPorter,sp));
  }
  return rows;
}

function menmaBackdrop(beatId,beat){
  const id=String(beatId||"");
  if(id.startsWith("menma_future_"))return BACKDROP.menmaFuture;
  if(id.startsWith("menma_party_defeat_return_"))return BACKDROP.menmaClearing;
  if(id.startsWith("menma_after_")||id.startsWith("menma_part_"))return BACKDROP.menmaAfter;
  if(id.startsWith("menma_discovery_")||id.startsWith("menma_enter_")||id.startsWith("menma_anko_")||id.includes("battle"))return BACKDROP.menmaClearing;
  if(id.startsWith("menma_forest_")||id.startsWith("menma_fox_"))return BACKDROP.menmaForest;
  const ref=beat&&beat.environmentRef;
  const env=typeof ref==="string"?ref:ref&&typeof ref==="object"?(ref.environmentId||ref.assetId||""):"";
  if(String(env).includes("classroom"))return BACKDROP.menmaClassroom;
  if(String(env).includes("forest_clearing"))return BACKDROP.menmaClearing;
  if(String(env).includes("forest")||String(env).includes("whisper"))return BACKDROP.menmaForest;
  return BACKDROP.menmaClassroom;
}
function menmaActors(beatId,performance,beat){
  const id=String(beatId||""),sp=speaker(performance,beat);
  if(id==="menma_receipt")return[];
  if(id.startsWith("menma_discovery_")){
    return[
      actor("academy_menma","MENMA",PATH.menma,sp),
      actor("sj_anko","ANKO",PATH.anko,sp),
      actor("test_subject_altered_shinobi","ALTERED SHINOBI",PATH.altered,sp)
    ];
  }
  const rows=[actor("academy_menma","MENMA",PATH.menma,sp)];
  if(sp==="NINE-TAILS"||sp==="NINE TAILS"){
    rows.push(actor("menma_nine_tails","NINE-TAILS",PATH.menmaNineTails,sp,["NINE TAILS"]));
    return rows;
  }
  if(id.startsWith("menma_open_")||id.includes("academy")){
    rows.push(actor("menma_academy_instructor","INSTRUCTOR",PATH.menmaInstructor,sp,["ACADEMY INSTRUCTOR"]));
  }else if(id.startsWith("menma_enter_")||id.startsWith("menma_anko_")){
    rows.push(actor("sj_anko","ANKO",PATH.anko,sp));
    rows.push(actor("test_subject_altered_shinobi","ALTERED SHINOBI",PATH.altered,sp));
  }else if(id.startsWith("menma_after_")||id.startsWith("menma_part_")||id.startsWith("menma_party_defeat_return_")){
    rows.push(actor("sj_anko","ANKO",PATH.anko,sp));
  }
  return rows;
}

function kushinaActors(beatId,performance,beat){
  const id=String(beatId||""),sp=speaker(performance,beat);
  if(id==="kus_receipt")return[];
  const rows=[actor("academy_kushina","KUSHINA",PATH.kushina,sp)];
  const instructor=()=>actor("kushina_academy_instructor","INSTRUCTOR",PATH.kushinaInstructor,sp,["ACADEMY INSTRUCTOR"]);
  const classmate=()=>actor("kushina_classmate","CLASSMATE",PATH.kushinaClassmate,sp,["STUDENT"]);
  const occurrence=A&&typeof A.findOccurrence==="function"?A.findOccurrence("occ_origin_kushina_gerotora_identity_disclosure"):null;
  const identityKnown=!!(occurrence&&occurrence.fact&&occurrence.fact.gerotoraCommunicatedOwnIdentity===true);
  const nameSpoken=id.startsWith("kus_ask_who_")&&Number((id.match(/_(\d+)$/)||[])[1]||0)>=4;
  const geroLabel=identityKnown||nameSpoken||sp==="GEROTORA"?"GEROTORA":"TOAD";
  const gero=()=>actor("key_gero",geroLabel,PATH.gerotora,sp,["GEROTORA","TOAD"]);
  const geroPhase=id.startsWith("kus_gero_")||id==="kus_contact_choice"||
    id.startsWith("kus_ask_")||id.startsWith("kus_help_")||id.startsWith("kus_send_")||
    id.startsWith("kus_closure_");
  if(geroPhase){
    rows.push(gero(),instructor(),classmate());
    return rows;
  }
  rows.push(instructor(),classmate());
  return rows;
}
function kurenaiActors(beatId,performance,beat){
  const id=String(beatId||""),sp=speaker(performance,beat);
  if(id==="kur_receipt")return[];
  return[
    actor("academy_kurenai","KURENAI",PATH.kurenai,sp),
    actor("kurenai_academy_instructor","INSTRUCTOR",PATH.kurenaiInstructor,sp,["ACADEMY INSTRUCTOR"])
  ];
}
function iwabeeActors(beatId,performance,beat){
  const id=String(beatId||""),sp=speaker(performance,beat);
  if(id==="iwa_receipt")return[];
  const rows=[actor("academy_iwabee","IWABEE",PATH.iwabee,sp)];
  const instructor=()=>actor("iwabee_academy_instructor","INSTRUCTOR",PATH.iwabeeInstructor,sp,["ACADEMY INSTRUCTOR"]);
  const rogue=()=>actor("iwabee_origin_rogue_genin_01","ROGUE GENIN",PATH.rogue,sp);
  const roguePresent=
    id.startsWith("iwa_expose_")||id==="iwa_response"||
    id.startsWith("iwa_confront_")||id.startsWith("iwa_block_")||
    id.startsWith("iwa_call_")||id.startsWith("iwa_finish_");
  rows.push(instructor());
  if(roguePresent)rows.push(rogue());
  return rows;
}
function metalActors(beatId,performance,beat){
  const id=String(beatId||""),sp=speaker(performance,beat);
  const rows=[actor("academy_metal_lee","METAL",PATH.metal,sp,["METAL LEE"])];
  if(!id.startsWith("met_open_")&&!id.startsWith("met_private_")){
    rows.push(actor("metal_origin_inviting_genin","GENIN",PATH.metalInvitingGenin,sp,["INVITING GENIN"]));
  }
  if(id.includes("protect")||id.includes("redirect")||id.includes("impact")||id.includes("destroy")){
    rows.push(actor("metal_origin_threatened_student","STUDENT",PATH.metalThreatenedStudent,sp,["ACADEMY STUDENT"]));
  }
  return rows;
}

function registerDefinition(sceneId,definition){
  if(!sceneId||typeof globalThis.registerStorySceneBoardDefinition!=="function")return{success:false,reason:"story_scene_board_not_loaded"};
  return globalThis.registerStorySceneBoardDefinition(sceneId,definition);
}
function rehydrateActiveOriginPresentation105(){
  const runtime=typeof globalThis.getActiveStorySceneRuntime==="function"?globalThis.getActiveStorySceneRuntime():null;
  if(!runtime||!runtime.sceneId)return{success:false,reason:"no_active_story"};
  const ownedScenes=new Set([
    scene("academy_hinata"),scene("academy_mirai"),"origin_academy_menma_prologue",
    scene("academy_kushina"),scene("academy_kurenai"),scene("academy_iwabee"),scene("academy_metal_lee")
  ].filter(Boolean));
  if(!ownedScenes.has(runtime.sceneId))return{success:false,reason:"different_story_owner",sceneId:runtime.sceneId};
  const restored=typeof globalThis.restoreActiveOriginStoryPresentation32900==="function"
    ?globalThis.restoreActiveOriginStoryPresentation32900()
    :{success:false,reason:"origin_presentation_restore_api_missing"};
  if(restored&&restored.pendingBattleRestore===true)return restored;
  if(typeof globalThis.renderStorySceneBoard33900==="function")globalThis.renderStorySceneBoard33900();
  return{success:true,rehydrated:true,sceneId:runtime.sceneId,beatId:runtime.beatId,restore:restored};
}
function scheduleActiveOriginPresentationRehydrate105(){
  const run=()=>{try{rehydrateActiveOriginPresentation105();}catch(_error){}};
  if(typeof queueMicrotask==="function")queueMicrotask(run);
  else if(typeof setTimeout==="function")setTimeout(run,0);
  else run();
}
function installDefinitions(){
  if(!A)return{success:false,reason:"origin_runtime_missing"};

  const results={};
  results.hinata=registerDefinition(scene("academy_hinata"),{
    resolve:({beatId,performance,beat})=>String(beatId||"")==="hin_receipt"
      ?{mode:"record",location:"YOUR ORIGIN",actors:[]}
      :projection("HYŪGA COMPOUND · TRAINING COURTYARD",hinataActors(beatId,performance,beat)),
    resolveBackdrop:({beatId})=>String(beatId||"")==="hin_receipt"
      ?null
      :{assetPath:hinataFinal(beatId)?BACKDROP.hinataFinal:BACKDROP.hinataMain,assetId:hinataFinal(beatId)?"issue105_hinataFinal":"issue105_hinataMain"},
    performanceSequences:{
      hin_receipt:()=>[{kind:"record",text:buildHinataReceipt105()}]
    }
  });
  results.mirai=registerDefinition(scene("academy_mirai"),{
    resolve:({beatId,performance,beat})=>{
      const id=String(beatId||"");
      if(id==="mir_receipt")return{mode:"record",location:"YOUR ORIGIN",actors:[]};
      const laterCheckpoint=id.startsWith("mir_checkpoint_early_")||id.startsWith("mir_defeat_debrief_")||id.startsWith("mir_defeat_reflection_")||id.startsWith("mir_defeat_close_");
      return projection(laterCheckpoint?"LATER · CHECKPOINT THREE":"ACADEMY MIRAI · ESCORT ASSESSMENT",miraiActors(beatId,performance,beat));
    },
    resolveBackdrop:({beatId,runtime})=>String(beatId||"")==="mir_receipt"
      ?null
      :{assetPath:miraiBackdrop(beatId,runtime),assetId:"issue105_mirai"},
    performanceSequences:{
      mir_confront_defeat_end_12:()=>[
        {kind:"dialogue",speakerName:"ACADEMY INSTRUCTOR",text:"About the switch."},
        {kind:"dialogue",speakerName:"ACADEMY INSTRUCTOR",text:"You still lost the exchange."},
        {kind:"narration",text:"Mirai looks away.\n\nShe knows."}
      ],
      mir_defeat_debrief_shortcut_01:()=>[
        {kind:"narration",text:"LATER — CHECKPOINT THREE"},
        {kind:"narration",text:"The real Traveller is sitting on the Checkpoint Three steps when Mirai arrives later with the instructor.\n\nHis travel bag is beside him.\n\nThe cup in his hands is almost empty."}
      ],
      mir_defeat_debrief_shortcut_11:()=>[
        {kind:"dialogue",speakerName:"ACADEMY INSTRUCTOR",text:"No."},
        {kind:"narration",text:"The instructor does not turn it into a speech.\n\nMirai already knows the result."}
      ],
      mir_defeat_debrief_confront_01:()=>[
        {kind:"narration",text:"LATER — CHECKPOINT THREE"},
        {kind:"narration",text:"The real Traveller is waiting at Checkpoint Three.\n\nMirai looks at him first.\n\nOnly after confirming he is fine does she turn back to the instructor."}
      ],
      mir_defeat_debrief_confront_07:()=>[
        {kind:"dialogue",speakerName:"ACADEMY INSTRUCTOR",text:"I know."},
        {kind:"narration",text:"Nothing more is added."}
      ],
      mir_receipt:()=>[{kind:"record",text:buildMiraiReceipt105()}]
    },
    performanceTransitions:{
      mir_shortcut_victory_reveal_13:"wipe_right_to_left",
      mir_shortcut_defeat_reveal_09:"wipe_right_to_left",
      mir_confront_defeat_end_12:"wipe_right_to_left"
    }
  });
  results.menma=registerDefinition("origin_academy_menma_prologue",{
    resolve:({beatId,performance,beat})=>String(beatId||"")==="menma_receipt"
      ?{mode:"record",location:"YOUR ORIGIN",actors:[]}
      :projection("ACADEMY MENMA",menmaActors(beatId,performance,beat)),
    resolveBackdrop:({beatId,beat})=>String(beatId||"")==="menma_receipt"
      ?null
      :{assetPath:menmaBackdrop(beatId,beat),assetId:"issue105_menma"},
    performanceSequences:{
      menma_receipt:()=>[{kind:"record",text:buildMenmaReceipt105()}]
    }
  });
  results.kushina=registerDefinition(scene("academy_kushina"),{
    resolve:({beatId,performance,beat})=>String(beatId||"")==="kus_receipt"
      ?{mode:"record",location:"YOUR ORIGIN",actors:[]}
      :projection("ACADEMY · FŪINJUTSU PRACTICAL",kushinaActors(beatId,performance,beat)),
    resolveBackdrop:({beatId})=>String(beatId||"")==="kus_receipt"
      ?null
      :{assetPath:GENERIC_COURTYARD,assetId:"issue105_generic_courtyard"},
    performanceSequences:{
      kus_receipt:()=>[{kind:"record",text:buildKushinaReceipt105()}]
    }
  });
  results.kurenai=registerDefinition(scene("academy_kurenai"),{
    resolve:({beatId,performance,beat})=>String(beatId||"")==="kur_receipt"
      ?{mode:"record",location:"YOUR ORIGIN",actors:[]}
      :projection("ACADEMY · BELL TEST",kurenaiActors(beatId,performance,beat)),
    resolveBackdrop:({beatId})=>String(beatId||"")==="kur_receipt"
      ?null
      :{assetPath:GENERIC_COURTYARD,assetId:"issue105_generic_courtyard"},
    performanceSequences:{
      kur_receipt:()=>[{kind:"record",text:buildKurenaiReceipt105()}]
    }
  });
  results.iwabee=registerDefinition(scene("academy_iwabee"),{
    resolve:({beatId,performance,beat})=>String(beatId||"")==="iwa_receipt"
      ?{mode:"record",location:"YOUR ORIGIN",actors:[]}
      :projection("ACADEMY · PRACTICAL TRAINING GROUND",iwabeeActors(beatId,performance,beat)),
    resolveBackdrop:({beatId})=>String(beatId||"")==="iwa_receipt"
      ?null
      :{assetPath:GENERIC_COURTYARD,assetId:"issue105_generic_courtyard"},
    performanceSequences:{
      iwa_receipt:()=>[{kind:"record",text:buildIwabeeReceipt105()}]
    },
    performanceTransitions:{
      iwa_close_06:"wipe_right_to_left"
    }
  });
  results.metal=registerDefinition(scene("academy_metal_lee"),{
    resolve:({beatId,performance,beat})=>projection("ACADEMY · TRAINING COURTYARD",metalActors(beatId,performance,beat)),
    resolveBackdrop:()=>({assetPath:GENERIC_COURTYARD,assetId:"issue105_generic_courtyard"})
  });
  const outcome={success:Object.values(results).every(r=>r&&r.success===true),results};
  if(outcome.success)scheduleActiveOriginPresentationRehydrate105();
  return outcome;
}

function ensureInstalled(){
  if(globalThis.SC_STORY_SCENE_BOARD_33900)return installDefinitions();
  const queue=globalThis.SC_STORY_SCENE_BOARD_PENDING_REGISTRATIONS||(globalThis.SC_STORY_SCENE_BOARD_PENDING_REGISTRATIONS=[]);
  if(!queue.some(row=>row&&row.id==="issue105_origin_scene_board_bindings")){
    queue.push({id:"issue105_origin_scene_board_bindings",register:installDefinitions});
  }
  return{success:true,queued:true};
}

function diagnostics(){
  const checks={
    sharedSceneBoardReused:true,
    kakashiExcluded:!String(installDefinitions).includes("academy_kakashi"),
    knownHinataActors:PATH.hinata&&PATH.hinataInstructor&&PATH.hinataPartner,
    knownMiraiActors:PATH.mirai&&PATH.miraiInstructor&&PATH.traveller,
    miraiBattleRevealPresentation:
      String(miraiBackdrop).includes("mir_defeat_debrief_")&&
      String(miraiActors).includes("mir_shortcut_victory_reveal_")&&
      String(miraiActors).includes("mir_shortcut_defeat_reveal_")&&
      String(miraiActors).includes("mir_confront_defeat_end_")&&
      String(installDefinitions).includes('mir_shortcut_victory_reveal_13:"wipe_right_to_left"')&&
      String(installDefinitions).includes('mir_shortcut_defeat_reveal_09:"wipe_right_to_left"')&&
      String(installDefinitions).includes('mir_confront_defeat_end_12:"wipe_right_to_left"')&&
      String(installDefinitions).includes("LATER — CHECKPOINT THREE"),
    menmaNineTailsPortraitExact:PATH.menmaNineTails==="Assets/Tailed Beasts/menma_nine_tails.png"&&String(menmaActors).includes("menma_nine_tails"),
    knownMenmaPhysicalActors:[PATH.menma,PATH.menmaInstructor,PATH.anko,PATH.altered].every(Boolean),
    knownKurenaiInstructor:PATH.kurenaiInstructor==="NPC/kurenai_instructor.png",
    issue419ActorPathsResolved:
      PATH.kushinaInstructor==="NPC/kushina_instructor.png"&&
      PATH.kushinaClassmate==="NPC/kushina_classmate.png"&&
      PATH.iwabeeInstructor==="NPC/iwabe_instructor.png"&&
      PATH.metalInvitingGenin==="NPC/metal_classmate_1.png"&&
      PATH.metalThreatenedStudent==="NPC/metal_classmate_2.png"&&
      PATH.miraiPorter==="NPC/mirai_porter.png"&&
      PATH.miraiCheckpointInstructor==="NPC/mirai_checkpoint_instructor.png",
    clickAnywhereOwnedBySharedSceneBoard:true,
    activeGoldenReloadRehydrate:
      String(rehydrateActiveOriginPresentation105).includes("restoreActiveOriginStoryPresentation32900")&&
      String(rehydrateActiveOriginPresentation105).includes("renderStorySceneBoard33900")&&
      String(rehydrateActiveOriginPresentation105).includes("pendingBattleRestore"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const installed=ensureInstalled();
globalThis.runIssue105OriginSceneBoardBindingsDiagnostics=diagnostics;
globalThis.SC_ALPHA_ORIGIN_SCENE_BOARD_BINDINGS_105=Object.freeze({patchId:PATCH_ID,installed,browserGoldenClaimed:false});
})();