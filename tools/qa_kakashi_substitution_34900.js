#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const patchPath=path.join(root,"runtime","alpha-kakashi-substitution-34900.js");
const gamePath=path.join(root,"game.js");
const src=fs.readFileSync(patchPath,"utf8");
const gameSrc=fs.readFileSync(gamePath,"utf8");
const OLD="academy_kakashi_prodigys_read";
const NEW="academy_kakashi_substitution_jutsu";

assert(src.includes('resolutionKind:"ratio_guard_state"'),"Substitution must reuse generic ratio guard machinery");
assert(src.includes('requiresDirectAttackPLPacket:true'),"Substitution must require a direct Attack PL packet");
assert(src.includes('preventionRatio:0.50'),"Substitution prevention ratio must be 50%");
assert(src.includes('staminaOrder:"pre_stamina"'),"Substitution must resolve before Stamina");
assert(src.includes('repeatUseRule:"no_repeat_same_battle"'),"Substitution must be once per Battle");
assert(src.includes('targetMode:"self"'),"Substitution must self-target");
assert(!src.includes("resolveBattleDamagePacket("),"34900 must not create a Kakashi-only damage resolver");
assert(gameSrc.includes("resolveBattlePreStaminaDefense"),"generic pre-Stamina defense authority missing");
assert(gameSrc.includes("qualifyingDirectAttackPLPacket"),"generic direct-packet qualifier missing");

function classList(){const set=new Set();return{add:x=>set.add(x),remove:x=>set.delete(x),contains:x=>set.has(x)};}
function projectionContext(){
  const listeners={};
  const actor={id:"academy_kakashi",name:"Academy Kakashi"};
  const legacy={id:OLD,displayName:"Analyze Opponent",ownerRegistryId:"academy_kakashi",resolutionKind:"categorical_evidence"};
  const firstFour=["academy_kakashi_kunai_quickdraw","academy_kakashi_clone_feint","academy_kakashi_opening_exploit","academy_kakashi_wire_snare"];
  const panel={classList:classList(),dataset:{},innerHTML:""};
  const card={
    dataset:{skillId:OLD},classList:classList(),disabled:false,style:{setProperty(){}},
    getAttribute(name){return name==="onclick"?`selectBattlePreparedSkill('${OLD}')`:null;},
    setAttribute(){},removeAttribute(){},querySelector(){return null;},querySelectorAll(){return[];},
    closest(){return card;}
  };
  let selected=null,selectCalls=0,confirmCalls=0,priorPreviewCalls=0;
  const document={
    body:{},
    addEventListener(type,fn,capture){(listeners[type]||(listeners[type]=[])).push({fn,capture});},
    querySelector(selector){return selector===".alpha-code-battle-stage .battle-live-skill-details"?panel:null;},
    querySelectorAll(){return[card];}
  };
  const context={
    console,window:null,globalThis:null,document,MutationObserver:undefined,Date,Math,JSON,Object,Array,String,Number,Boolean,RegExp,Set,Map,WeakSet,Error,
    currentBattle:{active:true,battleOver:false,kakashiOriginDeployment:{controllerParticipantId:"academy_kakashi"},selectedSkillId:null,activePlayer:actor},
    getBattleDeploymentParticipant(side,slot){return side==="player"&&slot===1?actor:null;},
    getBattleUISkillPalettePresentation(row){assert.strictEqual(row,actor);return{skillIds:[...firstFour,OLD],source:"legacy"};},
    getBattlePreparedSkillDefinition(row,id){assert.strictEqual(row,actor);return id===OLD?legacy:firstFour.includes(id)?{id,ownerRegistryId:"academy_kakashi"}:null;},
    getBattleSkillYouthSummary33000(skill){return{title:skill&&skill.displayName||"legacy",summary:"legacy",details:[],kind:"INFO",attackPL:null,tags:["INFO"]};},
    getBattleSkillPlainLanguageSummary(){return"legacy plain";},
    previewBattlePreparedSkill33000(){priorPreviewCalls+=1;return true;},
    selectBattlePreparedSkill(id){selectCalls+=1;selected=id;context.currentBattle.selectedSkillId=id;return{success:true,skillId:id};},
    syncBattleActionRegionState(){return{selectedSkillId:selected};},
    confirmSelectedBattleSkill(){confirmCalls+=1;const id=selected;selected=null;context.currentBattle.selectedSkillId=null;return{success:true,skillId:id};}
  };
  context.window=context;context.globalThis=context;vm.createContext(context);
  vm.runInContext(src,context,{filename:"runtime/alpha-kakashi-substitution-34900.js"});
  function dispatch(type){
    const event={target:card,prevented:0,stopped:0,immediate:0,preventDefault(){this.prevented+=1;},stopPropagation(){this.stopped+=1;},stopImmediatePropagation(){this.immediate+=1;}};
    let last;
    for(const row of listeners[type]||[])last=row.fn(event);
    return{event,last};
  }
  return{context,actor,legacy,firstFour,panel,card,listeners,dispatch,counts:()=>({selectCalls,confirmCalls,priorPreviewCalls})};
}

const p=projectionContext();
const projected=p.context.getBattleUISkillPalettePresentation(p.actor);
assert.deepStrictEqual(Array.from(projected.skillIds),[...p.firstFour,NEW],"unresolved Kakashi palette must project Analyze -> Substitution deterministically");
const newDef=p.context.getBattlePreparedSkillDefinition(p.actor,NEW);
assert.strictEqual(newDef.displayName,"Substitution Jutsu");
assert.strictEqual(newDef.resolutionKind,"ratio_guard_state");
assert.strictEqual(newDef.targetMode,"self");
assert.strictEqual(newDef.repeatUseRule,"no_repeat_same_battle");
assert.strictEqual(newDef.guard.preventionRatio,0.5);
assert.strictEqual(newDef.guard.oneUse,true);
assert.strictEqual(newDef.guard.requiresDirectAttackPLPacket,true);
assert.strictEqual(newDef.guard.staminaOrder,"pre_stamina");
assert.strictEqual(p.context.getBattlePreparedSkillDefinition(p.actor,OLD),p.legacy,"legacy Analyze definition must remain historical and must not be rewritten");
const info=p.context.getBattleSkillYouthSummary33000(newDef);
assert.strictEqual(info.title,"Substitution Jutsu");
assert.strictEqual(info.summary,"Cut the damage of the next direct attack against Kakashi by 50%.");
assert.strictEqual(info.kind,"DEFENSE");
assert(info.tags.includes("NEXT DIRECT HIT -50%"));
assert(!JSON.stringify(info).includes("ratio_guard_state"),"player copy must not expose resolver vocabulary");

// A stale unresolved DOM card still carrying the retired ID must be intercepted
// by 34900 before legacy 34500 / inline select-only handling can commit Analyze.
p.card.dataset.skillId=OLD;
const click=p.dispatch("click");
assert.strictEqual(click.event.prevented,1);
assert.strictEqual(click.event.immediate,1);
assert.strictEqual(p.counts().selectCalls,1);
assert.strictEqual(p.counts().confirmCalls,1);
assert.strictEqual(p.card.dataset.skillId,NEW);

// Hover is exact player guidance only; no Battle action is committed.
p.card.dataset.skillId=NEW;
const beforeHover=p.counts();
p.dispatch("pointerover");
const afterHover=p.counts();
assert.strictEqual(afterHover.selectCalls,beforeHover.selectCalls);
assert.strictEqual(afterHover.confirmCalls,beforeHover.confirmCalls);
assert.strictEqual(p.panel.dataset.previewSkillId,NEW);
assert(p.panel.innerHTML.includes("NEXT DIRECT HIT -50%"));

// Exercise the shipped generic Battle resolver inside a canonical Battle
// occurrence that the engine itself creates. 34900 owns the exact Kakashi Skill
// definition; game.js remains the sole owner of transient-state packet
// qualification/consumption. Reusing the existing Mission-5 diagnostic Battle
// avoids inventing an invalid ad-hoc currentBattle shape in this harness.
const storage=new Map(),session=new Map();
const store=map=>({getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k),clear:()=>map.clear()});
const dummy=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},remove(){},setAttribute(){},getAttribute(){return null;},querySelector(){return null;},querySelectorAll(){return[];},addEventListener(){},removeEventListener(){},focus(){},click(){},innerHTML:"",textContent:"",value:"",checked:false,disabled:false});
const native={console:{log(){},info(){},warn(){},error(){},table(){}},localStorage:store(storage),sessionStorage:store(session),document:{getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return[];},createElement(){return dummy();},body:dummy(),head:dummy(),addEventListener(){},removeEventListener(){}},requestAnimationFrame(){return 0;},cancelAnimationFrame(){},alert(){},confirm(){return true;},prompt(){return null;},Image:function(){return dummy();},navigator:{userAgent:"node-kakashi-substitution"},location:{reload(){},href:"http://localhost/"},addEventListener(){},removeEventListener(){},setTimeout,clearTimeout,setInterval,clearInterval,Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,Infinity,NaN};
native.window=native;native.globalThis=native;vm.createContext(native);
function run(code,file="native-probe.js"){return vm.runInContext(code,native,{filename:file});}
run(gameSrc,"game.js");
const apis=run(`({
  find:typeof findBattleTransientState,
  pre:typeof resolveBattlePreStaminaDefense,
  createDiagnostic:typeof createArc1M5FemaleOperatorDiagnosticBattleState,
  attemptM5:typeof attemptArc1M5FemaleOperatorAction,
  authority:typeof ARC1_M5_FEMALE_OPERATOR_AUTHORITY
})`);
assert.deepStrictEqual(JSON.parse(JSON.stringify(apis)),{find:"function",pre:"function",createDiagnostic:"function",attemptM5:"function",authority:"object"},"canonical generic guard diagnostic APIs missing");

function resetNativeGuard(){
  const result=JSON.parse(JSON.stringify(run(`
    createArc1M5FemaleOperatorDiagnosticBattleState({withRecognitionRoute:true,withCalibrationContext:true});
    (()=>{
      const A=ARC1_M5_FEMALE_OPERATOR_AUTHORITY;
      const attempt=attemptArc1M5FemaleOperatorAction(A.actionIds.countersealGuard,{});
      const state=findBattleTransientState({stateKey:"mission5_female_operator_counterseal_guard",targetSide:"enemy",targetParticipantId:A.stableParticipantId});
      if(!attempt||attempt.success!==true||!state)return{success:false,attempt,stateFound:!!state};
      state.stateKey="academy_kakashi_substitution_guard";
      state.data={...(state.data||{}),sourceSkillId:"academy_kakashi_substitution_jutsu",attackMultiplier:0.50,preventionRatio:0.50,oneUse:true,requiresDirectAttackPLPacket:true,preStamina:true,staminaOrder:"pre_stamina"};
      return{success:true,targetParticipantId:A.stableParticipantId};
    })()
  `)));
  assert.strictEqual(result.success,true,"canonical Battle state must establish a reusable one-use guard state");
  return result.targetParticipantId;
}
function guardExists(){return !!run(`findBattleTransientState({stateKey:"academy_kakashi_substitution_guard",targetSide:"enemy",targetParticipantId:ARC1_M5_FEMALE_OPERATOR_AUTHORITY.stableParticipantId})`);}
function pre(attackPL,qualifying,actionId){
  return JSON.parse(JSON.stringify(run(`resolveBattlePreStaminaDefense({attackPL:${attackPL},mitigable:true,targetSide:"enemy",targetParticipantId:ARC1_M5_FEMALE_OPERATOR_AUTHORITY.stableParticipantId,primaryDiscipline:"Taijutsu",skillId:"diag_direct",actionId:${JSON.stringify(actionId)},sourceSide:"player",sourceParticipantId:"academy_menma",qualifyingDirectAttackPLPacket:${qualifying?"true":"false"}})`)));
}

resetNativeGuard();
assert.strictEqual(guardExists(),true);
const nonQualifying=pre(7,false,"diag_setup_or_control");
assert.strictEqual(nonQualifying.resolvedAttackPL,7,"non-direct/non-qualifying packet must not be reduced");
assert.strictEqual(guardExists(),true,"non-qualifying packet must not consume Substitution");

// The unresolved guard is ordinary occurrence-scoped Battle state and must
// survive JSON save/load reprojection without a render-owned reset.
run(`currentBattle=JSON.parse(JSON.stringify(currentBattle));`);
assert.strictEqual(guardExists(),true,"Substitution guard must survive serialized unresolved Battle state");
const qualifying=pre(7,true,"diag_direct_1");
assert.strictEqual(qualifying.resolvedAttackPL,4,"ATK 7 must prevent floor(7*0.5)=3 before Stamina");
assert(qualifying.ratioGuards.some(row=>row.stateKey==="academy_kakashi_substitution_guard"&&row.actualReduction===3),"native resolver must report exact 3 PL prevention");
assert.strictEqual(guardExists(),false,"qualifying direct packet must consume one-use Substitution");
const second=pre(7,true,"diag_direct_2");
assert.strictEqual(second.resolvedAttackPL,7,"consumed Substitution must not fire twice");

for(const [incoming,expected] of [[5,3],[6,3],[7,4],[8,4]]){
  resetNativeGuard();
  const out=pre(incoming,true,`diag_${incoming}`);
  assert.strictEqual(out.resolvedAttackPL,expected,`incoming ATK ${incoming} must resolve pre-Stamina as ${expected}`);
}

console.log(JSON.stringify({
  pass:true,
  patch:"34900-v1",
  authorityCommit:"c08ecd2271a49eebbd28fc8dae2c737b6acc3037",
  paletteSupersession:true,
  legacyAnalyzeHistoryPreserved:true,
  staleRenderedAnalyzeIntercepted:true,
  exactYouthCopy:true,
  canonicalBattleStateUsed:true,
  genericRatioGuardReused:true,
  nonQualifyingPacketDoesNotConsume:true,
  serializedUnresolvedGuardPersists:true,
  qualifyingDirectPacketConsumesOnce:true,
  oddAttackPLFlooring:true,
  cannotFireTwice:true,
  browserGoldenClaimed:false
},null,2));
