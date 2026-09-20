(function installAcademyKakashiDynamicTerminal35940(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_DYNAMIC_TERMINAL_35940)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const TERMINAL=globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100;
if(!A||!CORE||!TERMINAL)throw new Error("kakashi_dynamic_terminal_35940_dependencies_missing");

const PATCH_ID="alpha_kakashi_dynamic_terminal_35940_v1_2026_09_20";
const ORIGIN="academy_kakashi",SCENE="origin_academy_kakashi_anbu_retrieval";
const PACKAGE="kakashi_origin_outer_route_packet";
const KAK="academy_kakashi",MI="academy_kakashi_origin_masked_interceptor",PS="academy_kakashi_origin_package_smuggler",AMT="academy_kakashi_origin_amt",PAKKUN="pakkun_origin_unfamiliar_ninken";
const AUTH=Object.freeze({
 writing100:"21e0407a0c371310ff06096905fd1fce4107ece8",
 dynamicTerminal:"a3cad415ea74a4fe8b3965b1136522aceab81047",
 mixedLethal:"dea066c9ea7de249d20734b5569a0a84a422ba28"
});
const BEAT=Object.freeze({
 pending:"kak_seq_debrief_pending",
 report:"kak_terminal_debrief_report_35100",
 summary:"kak_terminal_debrief_summary_35100",
 pakkun1:"kak_terminal_pakkun_departure_1_35100",
 pakkun2:"kak_terminal_pakkun_departure_2_35100",
 pakkun3:"kak_terminal_pakkun_departure_3_35100",
 pakkunExit:"kak_terminal_pakkun_departure_exit_35100",
 minato:"kak_terminal_minato_private_evaluation_35100",
 receipt:"kak_terminal_chronicle_receipt_35100"
});
const CONFIG_LABEL=Object.freeze({
 academy_kakashi_origin_battle_mi_1v1:"Kakashi vs Masked Interceptor",
 academy_kakashi_origin_battle_ps_1v1:"Kakashi vs Package Smuggler",
 academy_kakashi_origin_battle_amt_ps_2v1:"Kakashi vs ANBU Marked Target + Package Smuggler",
 academy_kakashi_origin_battle_ps_mi_2v1:"Kakashi vs Package Smuggler + Masked Interceptor",
 academy_kakashi_origin_battle_amt_ps_mi_3v1:"Kakashi vs ANBU Marked Target + Package Smuggler + Masked Interceptor",
 academy_kakashi_origin_battle_seq_mi:"Kakashi vs Masked Interceptor",
 academy_kakashi_origin_battle_seq_ps:"Kakashi vs Package Smuggler",
 academy_kakashi_origin_battle_seq_amt_pakkun:"Kakashi + temporary ninken support vs ANBU Marked Target",
 academy_kakashi_origin_battle_kakashi_pakkun_vs_amt:"Kakashi + temporary ninken support vs ANBU Marked Target"
});
const ROLE=Object.freeze({
 [MI]:{receipt:"Masked Interceptor",report:"the masked shinobi"},
 [PS]:{receipt:"Package Smuggler",report:"the receiver"},
 [AMT]:{receipt:"ANBU Marked Target",report:"the original target"}
});

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE):null;}catch(_e){return null;}}
function occurrence(id){try{return id?A.findOccurrence(String(id)):null;}catch(_e){return null;}}
function factOf(row){return row&&(row.fact||row.data)||{};}
function clone(v){try{return CORE.clone(v);}catch(_e){try{return JSON.parse(JSON.stringify(v));}catch(_e2){return v;}}}
function local(){const rt=active();return rt&&rt.sceneId===SCENE&&rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};}
function currentHistory(){
 const rt=active(),instance=String(rt&&rt.instanceId||"");
 if(!instance||typeof playerData!=="object"||!playerData||!Array.isArray(playerData.activityHistory))return[];
 return playerData.activityHistory.filter(row=>{if(!row)return false;const f=factOf(row);return String(row.storySceneInstanceId||f.storySceneInstanceId||"")===instance;}).map(clone);
}
function participantDetail(ref,snapshot,history){
 const row=snapshot&&snapshot.participantStates&&snapshot.participantStates[ref]||null;
 const stateClass=String(row&&row.stateClass||"");
 const resultRef=String(row&&row.resultRef||"");
 let source=resultRef?occurrence(resultRef):null;
 if(!source&&resultRef)source=(history||[]).find(x=>String(x&&x.occurrenceId||"")===resultRef)||null;
 const f=factOf(source),ps=f&&f.participantState||{};
 return{participantRef:ref,stateClass,resultRef,sourceFact:f,securedAtLocationRef:String(ps.securedAtLocationRef||f.securedAtLocationRef||""),institutionalCustodyHolderRef:String(ps.institutionalCustodyHolderRef||f.institutionalCustodyHolderRef||"")};
}
function normalizePackage(snapshot,terminalFacts){
 const material=snapshot&&snapshot.materialStates&&snapshot.materialStates[PACKAGE]||null,value=material&&material.value||{};
 const holder=String(value.currentHolderClass||value.custodyClass||terminalFacts&&terminalFacts.packageState&&terminalFacts.packageState.holderClass||"UNRESOLVED");
 const recovered=terminalFacts&&terminalFacts.packageRecovered===true||["KAKASHI","ANBU","KONOHA","KONOHA_AUTHORITY"].includes(holder);
 let classRef="NOT_RECOVERED";
 if(recovered)classRef="RECOVERED";
 else if(holder==="PACKAGE_SMUGGLER")classRef="LOST_PS";
 else if(holder==="ANBU_MARKED_TARGET")classRef="LOST_AMT";
 else if(holder==="MASKED_INTERCEPTOR")classRef="TAKEN_MI";
 else if(holder==="UNRESOLVED"||holder==="UNKNOWN"||holder==="NEUTRAL_CONTESTED")classRef="UNKNOWN";
 return{holderClass:holder,classRef,recovered,materialStateRef:String(material&&material.stateRef||terminalFacts&&terminalFacts.packageState&&terminalFacts.packageState.stateRef||""),value:clone(value)};
}
function firstAction(snapshot,l){
 const direct=String(l&&l.kakashiOriginalAction||"");
 const map={observe:"WATCH THE EXCHANGE",get_closer:"MOVE IN CLOSER",attack:"STRIKE BEFORE THE HANDOFF",attempt_pickpocket:"SLIP IN FOR THE PACKAGE"};
 if(map[direct])return map[direct];
 const receipts=Object.values(snapshot&&snapshot.decisionReceipts||{}).filter(Boolean).sort((a,b)=>(Number(a.createdAt)||0)-(Number(b.createdAt)||0));
 const root=receipts.find(r=>["observe","get_closer","attack","attempt_pickpocket"].includes(String(r.selectedChoiceId||"")));
 return map[String(root&&root.selectedChoiceId||"")]||"UNRESOLVED";
}
function historyFacts(history){return(history||[]).map(row=>({row,fact:factOf(row)}));}
function lethalEvidence(history,participants){
 const facts=historyFacts(history),confirmed=new Set(),failed=[];
 for(const entry of facts){
  const fact=entry.fact;if(!fact)continue;
  const target=String(fact.targetRef||fact.participantRef||"");
  if(fact.targetDeathConfirmed===true&&ROLE[target])confirmed.add(target);
  if(String(fact.selectedDisposition||"")==="KILL"&&fact.participantStateByRef&&typeof fact.participantStateByRef==="object")for(const ref of Object.keys(fact.participantStateByRef))if(fact.participantStateByRef[ref]&&String(fact.participantStateByRef[ref].stateClass||"")==="DEAD")confirmed.add(ref);
  if(fact.deterministicPostBattleKills&&fact.participantStateByRef)for(const ref of Object.keys(fact.participantStateByRef))if(String(fact.participantStateByRef[ref]&&fact.participantStateByRef[ref].stateClass||"")==="DEAD")confirmed.add(ref);
  const n=Math.max(0,Number(fact.failedLethalAttemptCountDelta)||0);for(let i=0;i<n;i++)failed.push(target||"UNKNOWN");
  if(fact.failedLethalAttempt===true||fact.lethalAttemptFailed===true)failed.push(target||"UNKNOWN");
 }
 for(const ref of [MI,PS,AMT])if(participants[ref]&&participants[ref].stateClass==="DEAD")confirmed.add(ref);
 return{confirmedKillRefs:[...confirmed],failedAttemptRefs:failed,confirmedKillCount:confirmed.size,failedAttemptCount:failed.length};
}
function knowledge(history,l){
 const facts=historyFacts(history).map(x=>x.fact);
 const getCloserSuccess=!!(l&&l.kakashiMoveCloserKnowledgeStateRef)||facts.some(f=>String(f&&f.selectedOutcomeRef||"")==="GET_CLOSER_SUCCESS"||f&&f.knowledgeStateByObserver&&f.knowledgeStateByObserver[KAK]&&f.knowledgeStateByObserver[KAK].getCloserSuccessKnowledgeRetained===true||f&&f.worldFacts&&f.worldFacts.retainsGetCloserKnowledge===true);
 const askDestination=facts.some(f=>String(f&&f.factClass||"").includes("ask")&&String(f&&f.factClass||"").includes("package")||f&&f.worldFacts&&f.worldFacts.originalCarrierRoleEndedAtHandoff===true);
 return{getCloserSuccess,askDestination};
}
function specificReport(history){
 return historyFacts(history).some(entry=>{const fact=entry.fact,cls=String(fact&&fact.factClass||"");return cls&&cls!=="academy_kakashi_terminal_anbu_debrief"&&(cls.includes("anbu_report")||fact&&fact.truthfulReport===true);});
}
function involvedPakkun(snapshot,terminalFacts,history,l){
 const ps=snapshot&&snapshot.participantStates&&snapshot.participantStates[PAKKUN]||null,state=String(ps&&ps.stateClass||"");
 const facts=historyFacts(history).map(x=>x.fact);
 const involved=terminalFacts&&terminalFacts.pakkunPresentAtDebrief===true||state!==""||!!(l&&l.kakashiKonohaPakkunPresent)||facts.some(f=>f&&f.worldFacts&&f.worldFacts.pakkunPresent===true||f&&f.participantStateByRef&&f.participantStateByRef[PAKKUN]);
 const present=terminalFacts&&terminalFacts.pakkunPresentAtDebrief===true||involved&&state!=="DEPARTED"&&!(l&&l.kakashiKonohaPakkunPresent===false);
 return{involved,present,stateClass:state};
}
function buildProjectionState35940(input={}){
 const snapshot=input.snapshot||CORE.getStoryUnitSnapshot(ORIGIN)||{},l=input.localContext||local(),history=input.history||currentHistory();
 let terminalFacts=input.terminalFacts||null;
 if(!terminalFacts){try{terminalFacts=TERMINAL.deriveTerminalFacts();}catch(_e){terminalFacts={success:false};}}
 const participants={};for(const ref of [MI,PS,AMT])participants[ref]=participantDetail(ref,snapshot,history);
 const pkg=normalizePackage(snapshot,terminalFacts&&terminalFacts.success===true?terminalFacts:null);
 const lethal=lethalEvidence(history,participants),intel=knowledge(history,l),pakkun=involvedPakkun(snapshot,terminalFacts,history,l);
 const battles=Array.isArray(terminalFacts&&terminalFacts.battleFacts)?terminalFacts.battleFacts.map(clone).sort((a,b)=>(Number(a.capturedAt)||0)-(Number(b.capturedAt)||0)):[];
 return{snapshot,l,history,terminalFacts,package:pkg,participants,lethal,knowledge:intel,pakkun,battles,firstAction:firstAction(snapshot,l),specificReportAlreadyCommitted:specificReport(history)};
}
function statePhrase(detail){
 const state=String(detail&&detail.stateClass||"");
 if(state==="DEAD")return"dead";
 if(state==="ANBU_INSTITUTIONAL_CUSTODY")return"in ANBU custody";
 if(state==="UCHIHA_POLICE_INSTITUTIONAL_CUSTODY")return"in Uchiha Police custody";
 if(state==="FIELD_SECURED_PENDING_COLLECTION")return detail.securedAtLocationRef?("field-secured alive at "+detail.securedAtLocationRef):"field-secured alive";
 if(state==="COLLECTED_ACTIVE_ESCORT")return"collected alive under escort";
 if(state==="DELIBERATELY_RELEASED"||state==="RELEASED")return"deliberately released";
 if(state==="ESCAPED")return"escaped";
 if(state==="LEFT_KAKASHI_SIGHT")return"left Kakashi's sight";
 if(state==="BATTLE_DEFEATED_UNRESOLVED")return"defeated; left alive and unrestrained";
 return state?state.toLowerCase().replace(/_/g," "):"not materially resolved";
}
function packageReportLines(state){
 const cls=state.package.classRef;
 if(cls==="RECOVERED")return["Kakashi produces the recovered package.","KAKASHI: “Recovered.”"];
 if(cls==="LOST_PS")return["ANBU OPERATIVE: “The package?”","KAKASHI: “The receiver got away with it.”","ANBU OPERATIVE: “You saw him leave with it.”","KAKASHI: “Yes.”"];
 if(cls==="LOST_AMT")return["ANBU OPERATIVE: “The package?”","KAKASHI: “The original target still had it when he escaped.”"];
 if(cls==="TAKEN_MI")return["ANBU OPERATIVE: “The package?”","KAKASHI: “The masked shinobi took it.”"];
 if(cls==="UNKNOWN")return["ANBU OPERATIVE: “The package?”","KAKASHI: “Lost.”","ANBU OPERATIVE: “To whom?”","KAKASHI: “I can't say.”"];
 return["ANBU OPERATIVE: “The package?”","KAKASHI: “Not recovered.”"];
}
function participantReportLines(ref,detail){
 const role=ROLE[ref]&&ROLE[ref].report||ref,state=String(detail&&detail.stateClass||""),cap=role.charAt(0).toUpperCase()+role.slice(1);
 if(state==="DEAD")return["ANBU OPERATIVE: “"+cap+"?”","KAKASHI: “Dead.”"];
 if(state==="ANBU_INSTITUTIONAL_CUSTODY")return["KAKASHI: “"+cap+" is in ANBU custody.”"];
 if(state==="UCHIHA_POLICE_INSTITUTIONAL_CUSTODY")return["KAKASHI: “I turned "+role+" over to the Uchiha Police Force.”","ANBU OPERATIVE: “Alive?”","KAKASHI: “Yes.”"];
 if(state==="FIELD_SECURED_PENDING_COLLECTION")return["KAKASHI: “"+cap+" is restrained.”","ANBU OPERATIVE: “Where?”","KAKASHI: “"+(detail.securedAtLocationRef||"At the committed field location")+".”","ANBU OPERATIVE: “Alive?”","KAKASHI: “Yes.”"];
 if(state==="DELIBERATELY_RELEASED"||state==="RELEASED")return["ANBU OPERATIVE: “You had "+role+".”","KAKASHI: “Yes.”","ANBU OPERATIVE: “And let "+role+" go.”","KAKASHI: “Yes.”"];
 if(state==="ESCAPED")return["KAKASHI: “"+cap+" escaped.”"];
 if(state==="BATTLE_DEFEATED_UNRESOLVED")return["ANBU OPERATIVE: “You beat "+role+".”","KAKASHI: “Yes.”","ANBU OPERATIVE: “Custody?”","KAKASHI: “No.”","ANBU OPERATIVE: “Alive when you left.”","KAKASHI: “Yes.”"];
 return[];
}
function reportText35940(state=buildProjectionState35940()){
 if(state.specificReportAlreadyCommitted)return"The branch-specific ANBU report already completed from committed facts. That report remains authoritative; no second version is invented here.";
 const lines=["Kakashi returns to the rooftop.","ANBU OPERATIVE: “Report.”"].concat(packageReportLines(state));
 const kills=state.lethal.confirmedKillCount;
 if(kills===3){
  lines.push("ANBU OPERATIVE: “The masked shinobi?”","KAKASHI: “Dead.”","ANBU OPERATIVE: “The receiver?”","KAKASHI: “Dead.”","ANBU OPERATIVE: “And the original target?”","KAKASHI: “Dead.”","ANBU OPERATIVE: “All three by you.”","KAKASHI: “Yes.”","ANBU OPERATIVE: “After the fights?”","KAKASHI: “Yes.”");
 }else{
  for(const ref of [MI,PS,AMT])lines.push.apply(lines,participantReportLines(ref,state.participants[ref]));
  if(kills===2)lines.push("ANBU OPERATIVE: “So two died.”","KAKASHI: “Yes.”");
  else if(kills===1)lines.push("ANBU OPERATIVE: “One death.”","KAKASHI: “Yes.”");
 }
 if(state.knowledge.getCloserSuccess)lines.push("ANBU OPERATIVE: “You heard them before you moved.”","KAKASHI: “Yes.”","ANBU OPERATIVE: “What did you learn?”","KAKASHI: “If the street stayed clear, the original carrier was supposed to hand the package over.”","ANBU OPERATIVE: “And if it didn't?”","KAKASHI: “He kept moving with it.”","ANBU OPERATIVE: “Destination?”","KAKASHI: “They didn't say.”");
 if(state.knowledge.askDestination)lines.push("ANBU OPERATIVE: “What did the original target tell you?”","KAKASHI: “His job ended at the handoff. The receiver was supposed to take it onward.”","ANBU OPERATIVE: “Where?”","KAKASHI: “He didn't know.”");
 if(state.pakkun.present)lines.push("ANBU OPERATIVE: “And the ninken?”","PAKKUN: “Temporary.”","PAKKUN: “I was there when it mattered.”","KAKASHI: “He helped.”","PAKKUN: “Better.”");
 return lines.join("\\n\\n");
}
function packageReceiptLine(state){
 if(state.package.classRef==="RECOVERED")return"Package — Recovered by Kakashi and returned to ANBU.";
 if(state.package.classRef==="LOST_PS")return"Package — Lost with Package Smuggler.";
 if(state.package.classRef==="LOST_AMT")return"Package — Lost with ANBU Marked Target.";
 if(state.package.classRef==="TAKEN_MI")return"Package — Taken from Kakashi by Masked Interceptor.";
 return"Package — Not recovered by Kakashi.";
}
function participantReceiptLine(ref,detail){
 const name=ROLE[ref]&&ROLE[ref].receipt||ref,state=String(detail&&detail.stateClass||"");
 if(!state)return null;
 if(state==="DEAD")return name+" — Killed by Kakashi after defeat.";
 if(state==="FIELD_SECURED_PENDING_COLLECTION")return name+" — Field-secured alive.";
 if(state==="ANBU_INSTITUTIONAL_CUSTODY")return name+" — Transferred to ANBU custody.";
 if(state==="UCHIHA_POLICE_INSTITUTIONAL_CUSTODY")return name+" — Transferred to Uchiha Police custody.";
 if(state==="DELIBERATELY_RELEASED"||state==="RELEASED")return name+" — Deliberately released.";
 if(state==="BATTLE_DEFEATED_UNRESOLVED")return name+" — Defeated; left alive and unrestrained.";
 if(state==="ESCAPED")return name+" — Escaped.";
 if(state==="LEFT_KAKASHI_SIGHT")return name+" — Left Kakashi's sight; later state unknown.";
 return name+" — "+statePhrase(detail)+".";
}
function battleReceiptLines(state){
 return state.battles.map(row=>{const label=CONFIG_LABEL[String(row.battleConfigId||"")]||String(row.battleConfigId||"PL Battle");const result=String(row.resultState||"")==="player_side_victory"?"Victory":String(row.resultState||"")==="opposition_side_victory"?"Defeat":"Unresolved";return label+" — "+result+".";});
}
function receiptText35940(state=buildProjectionState35940()){
 const lines=["CHRONICLE RECEIPT","","ASSIGNMENT","Hokage-authorised limited retrieval operation.","","FIRST ACTION",state.firstAction,"","PACKAGE",packageReceiptLine(state),"","PARTICIPANTS"];
 const participantLines=[MI,PS,AMT].map(ref=>participantReceiptLine(ref,state.participants[ref])).filter(Boolean);lines.push.apply(lines,participantLines.length?participantLines:["No participant outcome line was materially committed."]);
 lines.push("","BATTLES");lines.push.apply(lines,state.battles.length?battleReceiptLines(state):["No PL Battle materially resolved."]);
 const custody=participantLines.filter(line=>/custody|Field-secured|released/i.test(line));if(custody.length){lines.push("","CUSTODY / RELEASE");lines.push.apply(lines,custody);}
 if(state.lethal.confirmedKillCount||state.lethal.failedAttemptCount){
  lines.push("","LETHAL HISTORY");
  for(const ref of state.lethal.confirmedKillRefs)lines.push((ROLE[ref]&&ROLE[ref].receipt||ref)+" — Killed by Kakashi after defeat.");
  lines.push("Confirmed kills: "+state.lethal.confirmedKillCount,"Failed lethal attempts: "+state.lethal.failedAttemptCount);
 }
 if(state.knowledge.getCloserSuccess)lines.push("","INTELLIGENCE","Handoff contingency overheard.","Downstream package destination — Unknown.");
 if(state.knowledge.askDestination)lines.push("","INTELLIGENCE","Original carrier's role ended at handoff.","Downstream destination — Unknown to original carrier.");
 if(state.pakkun.involved){
  lines.push("","PAKKUN","Temporary ninken intervention — Involved.");
  lines.push(state.pakkun.present?"Status at ANBU report — Present.":"Status at ANBU report — Explicitly departed.");
  lines.push("Permanent Summon ownership — None.");
 }
 lines.push("","REPORT","ANBU report — completed from Kakashi-observed facts.");
 return lines.join("\\n");
}
function survivorSummary(state){
 return[MI,PS,AMT].filter(ref=>state.participants[ref].stateClass!=="DEAD"&&state.participants[ref].stateClass).map(ref=>ROLE[ref].receipt+": "+statePhrase(state.participants[ref])).join("; ");
}
function minatoText35940(state=buildProjectionState35940()){
 const lines=["Later, in private, Minato reviews the sealed field record."],kills=state.lethal.confirmedKillCount;
 if(kills===3)lines.push("MINATO: “Three confirmed deaths.”","ANBU OPERATIVE: “Yes.”","MINATO: “Battle casualties?”","ANBU OPERATIVE: “No.”","MINATO: “He won the fights first.”","ANBU OPERATIVE: “Yes.”","MINATO: “And then chose the ending afterward.”");
 else if(kills===2)lines.push("MINATO: “Two confirmed deaths.”","ANBU OPERATIVE: “Yes.”","The surviving result remains separate: "+(survivorSummary(state)||"no survivor state was materially committed")+".","MINATO: “Keep the decisions separate from the count.”");
 else if(kills===1)lines.push("MINATO: “One confirmed death.”","ANBU OPERATIVE: “Yes.”","The other participant states remain separate: "+(survivorSummary(state)||"no additional participant state was materially committed")+".","MINATO: “One death doesn't tell me much by itself. When he chose it does.”");
 if(state.package.recovered)lines.push("MINATO: “He brought the package back.”","ANBU OPERATIVE: “Yes.”");
 else lines.push("MINATO: “He didn't recover the package.”","ANBU OPERATIVE: “No.”");
 const states=[MI,PS,AMT].map(ref=>state.participants[ref].stateClass);
 if(states.includes("FIELD_SECURED_PENDING_COLLECTION"))lines.push("MINATO: “He left them secured and kept moving.”","ANBU OPERATIVE: “Yes.”","MINATO: “Then he treated custody like part of the mission. Not the end of it.”");
 if(states.includes("UCHIHA_POLICE_INSTITUTIONAL_CUSTODY"))lines.push("MINATO: “He chose the Police.”","ANBU OPERATIVE: “Yes.”","MINATO: “Instead of bringing them here.”","ANBU OPERATIVE: “Yes.”");
 if(states.includes("ANBU_INSTITUTIONAL_CUSTODY"))lines.push("MINATO: “He brought a target back alive.”","ANBU OPERATIVE: “Yes.”","MINATO: “Then custody was a decision.”");
 if(states.includes("DELIBERATELY_RELEASED")||states.includes("RELEASED"))lines.push("MINATO: “He had control and released it deliberately.”");
 const anyLoss=state.battles.some(b=>String(b.resultState||"")==="opposition_side_victory");
 if(anyLoss&&state.package.recovered)lines.push("MINATO: “He lost a fight and still returned the package.”","ANBU OPERATIVE: “Yes.”","MINATO: “Good. Not because he lost. Because the mission didn't become the fight.”");
 if(state.knowledge.getCloserSuccess)lines.push("MINATO: “He stayed long enough to understand the contingency.”","ANBU OPERATIVE: “Yes.”","MINATO: “And not long enough to invent the part they never said.”");
 if(state.knowledge.askDestination)lines.push("MINATO: “He learned where the original carrier's Knowledge ended.”");
 return lines.join("\\n\\n");
}
function pakkunLine35940(index,state=buildProjectionState35940()){
 if(state.lethal.confirmedKillCount===3){
  if(index===1)return"That's my part done.";
  if(index===2)return"Thanks.";
  if(index===3)return"Don't make me regret helping.";
  return"Pakkun leaves. No names are exchanged.";
 }
 if(index===1)return"That's me done.";
 if(index===2)return"Thanks.";
 if(index===3)return"Try not to make the next one this complicated.";
 return"Pakkun gives Kakashi one last look, then leaves. No names are exchanged.";
}
function captureHook(map,beatId,config){
 const beat=map&&map.get(beatId);if(!beat)return false;
 beat.onEnterConsequences=Array.isArray(beat.onEnterConsequences)?beat.onEnterConsequences:[];
 const requestId="kakashi_terminal_capture_35940::"+beatId;
 if(!beat.onEnterConsequences.some(x=>x&&x.requestId===requestId))beat.onEnterConsequences.push({requestId,kind:"domain",resolve:()=>TERMINAL.captureBattleResult(config)});
 return true;
}
function install(){
 const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;if(!m)return{success:false,reason:"dynamic_terminal_scene_missing"};
 const route=globalThis.SC_ALPHA_KAKASHI_KONOHA_ROUTE_CLOSURE_35910,move=globalThis.SC_ALPHA_KAKASHI_MOVE_CLOSER_CLOSURE_35930,post=globalThis.SC_ALPHA_KAKASHI_POST_MI_DEATH_PURSUIT_35830;
 if(route&&route.beats){
  captureHook(m,route.beats.directReturn,"academy_kakashi_origin_battle_amt_ps_2v1");
  captureHook(m,route.beats.directMiReturn,"academy_kakashi_origin_battle_mi_1v1");
  captureHook(m,route.beats.originalReturn,"academy_kakashi_origin_battle_seq_amt_pakkun");
 }
 if(move&&move.beats){
  captureHook(m,move.beats.improvedReturn,"academy_kakashi_origin_battle_amt_ps_2v1");
  captureHook(m,move.beats.psReturn,"academy_kakashi_origin_battle_ps_1v1");
  captureHook(m,move.beats.cutReturn,"academy_kakashi_origin_battle_amt_ps_2v1");
 }
 if(post&&post.beats){
  if(post.beats.psReturn)captureHook(m,post.beats.psReturn,"academy_kakashi_origin_battle_ps_1v1");
  if(post.beats.amtReturn)captureHook(m,post.beats.amtReturn,"academy_kakashi_origin_battle_seq_amt_pakkun");
 }
 const report=m.get(BEAT.report),summary=m.get(BEAT.summary),minato=m.get(BEAT.minato),receipt=m.get(BEAT.receipt),p1=m.get(BEAT.pakkun1),p2=m.get(BEAT.pakkun2),p3=m.get(BEAT.pakkun3),pexit=m.get(BEAT.pakkunExit);
 if(!report||!summary||!minato||!receipt)return{success:false,reason:"dynamic_terminal_35100_beats_missing"};
 report.presentationResolver=()=>{const s=buildProjectionState35940();return{text:s.specificReportAlreadyCommitted?"The completed field report is already on record.":"Report."};};
 summary.presentationResolver=()=>({text:reportText35940()});
 minato.presentationResolver=()=>({text:minatoText35940()});
 receipt.presentationResolver=()=>({text:receiptText35940()});
 if(p1)p1.presentationResolver=()=>({text:pakkunLine35940(1)});
 if(p2)p2.presentationResolver=()=>({text:pakkunLine35940(2)});
 if(p3)p3.presentationResolver=()=>({text:pakkunLine35940(3)});
 if(pexit)pexit.presentationResolver=()=>({text:pakkunLine35940(4)});
 return{success:true,projectionBeats:[BEAT.report,BEAT.summary,BEAT.minato,BEAT.receipt],captureHooksInstalled:true};
}
const installed=install();if(!installed||installed.success!==true)throw new Error("kakashi_dynamic_terminal_35940_install_failed:"+(installed&&installed.reason||"unknown"));
function diagnostics(){
 const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;
 const checks={
  patchId:PATCH_ID==="alpha_kakashi_dynamic_terminal_35940_v1_2026_09_20",
  authoritiesPinned:AUTH.writing100==="21e0407a0c371310ff06096905fd1fce4107ece8"&&AUTH.dynamicTerminal==="a3cad415ea74a4fe8b3965b1136522aceab81047"&&AUTH.mixedLethal==="dea066c9ea7de249d20734b5569a0a84a422ba28",
  projectionOnly:![reportText35940,minatoText35940,receiptText35940,buildProjectionState35940].some(fn=>/commitOccurrence|recordParticipantClassification|recordMaterialState|savePlayerData/.test(fn.toString())),
  terminalOwnerPreserved:TERMINAL.patchId==="alpha_kakashi_terminal_debrief_35100_v8_2026_09_20"&&typeof TERMINAL.commitChronicleReceiptAndRewards==="function"&&typeof TERMINAL.guardedOriginCompletion==="function",
  dynamicSummaryInstalled:!!m&&typeof m.get(BEAT.summary).presentationResolver==="function",
  dynamicMinatoInstalled:!!m&&typeof m.get(BEAT.minato).presentationResolver==="function",
  dynamicReceiptInstalled:!!m&&typeof m.get(BEAT.receipt).presentationResolver==="function",
  packageModules:packageReportLines.toString().includes("The receiver got away with it")&&packageReportLines.toString().includes("original target still had it")&&packageReportLines.toString().includes("masked shinobi took it"),
  mixedLethalIdentityAware:reportText35940.toString().includes("All three by you")&&receiptText35940.toString().includes("LETHAL HISTORY")&&minatoText35940.toString().includes("survivorSummary"),
  knowledgeModules:reportText35940.toString().includes("If the street stayed clear")&&receiptText35940.toString().includes("Handoff contingency overheard"),
pakkunReceiptStateAware:receiptText35940.toString().includes("Status at ANBU report — Present.")&&receiptText35940.toString().includes("Status at ANBU report — Explicitly departed."),
  noAlignmentLabels:![reportText35940,minatoText35940,receiptText35940].some(fn=>/merciless|ruthless|alignment/i.test(fn.toString())),
  browserGoldenClaimed:false
 };
 const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
 return{pass:failed.length===0,checks,failed,installed,browserGoldenClaimed:false};
}
globalThis.SC_ALPHA_KAKASHI_DYNAMIC_TERMINAL_35940=Object.freeze({patchId:PATCH_ID,authority:AUTH,beats:BEAT,installed,buildProjectionState:buildProjectionState35940,reportText:reportText35940,minatoText:minatoText35940,receiptText:receiptText35940,diagnostics,browserGoldenClaimed:false});
globalThis.runAcademyKakashiDynamicTerminal35940Diagnostics=diagnostics;
})();
