// ALPHA ORIGIN CHOICE REACTION 33510
// Completes the player-visible choice-response pass begun by 33500 for the
// remaining 32900 Origins: Kushina, Kakashi and Obito.
(function installAlphaOriginChoiceReaction33510(){
"use strict";
if(globalThis.SC_ALPHA_ORIGIN_CHOICE_REACTION_33510)return;
const PATCH_ID="alpha_origin_choice_reaction_33510_2026_09_13";
const patched=[];

function definition(sceneId){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(sceneId):null;}catch(_error){return null;}}
function editable(sceneId){const def=definition(sceneId);if(!def)return null;const beats=Array.isArray(def.beats)?def.beats.map(b=>({...b,choices:Array.isArray(b.choices)?b.choices.map(c=>({...c})):b.choices})):def.beatMap instanceof Map?Array.from(def.beatMap.values()).map(b=>({...b,choices:Array.isArray(b.choices)?b.choices.map(c=>({...c})):b.choices})):[];if(!beats.length)return null;const copy={...def,beats};delete copy.beatMap;return copy;}
function beat(def,id){return def&&def.beats?def.beats.find(b=>b&&b.beatId===id)||null:null;}
function add(def,row){const old=beat(def,row.beatId);if(old)Object.assign(old,row);else def.beats.push(row);}
function commit(def){if(!def||typeof registerStoryScene!=="function")return false;try{if(typeof unregisterStoryScene==="function")unregisterStoryScene(def.sceneId);}catch(_error){}const out=registerStoryScene(def);if(out&&out.success===false)return false;patched.push(def.sceneId);return true;}

function patchKushina(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;
  const def=editable(A.sceneByVariant.academy_kushina);if(!def)return false;
  const contact=beat(def,"kus_contact_choice"),close=beat(def,"kus_close");if(!contact||!close)return false;
  for(const choice of contact.choices||[])choice.nextBeatId="kus_contact_result";
  add(def,{beatId:"kus_contact_result",mode:"narration",environmentRef:contact.environmentRef||close.environmentRef,
    presentationResolver:()=>{
      const selected=A.local().kushinaGerotoraChoice;
      return{text:{
        ask_what_happened:"Gerotora studies the residual formula and explains only what it supports: Kushina corrected the seal, but the correction connected somewhere it was never meant to reach.",
        ask_who:"Gerotora gives his name: Gerotora. Kushina now has that identity because he actually communicated it to her in this first contact.",
        help_close:"Kushina and Gerotora work together to stabilise and close the residual connection. The cooperation happened; it does not turn his sealing knowledge into hers.",
        send_back:"Kushina moves to terminate the unintended connection. Gerotora corrects and assists the return where his own seal knowledge is needed, and the first contact stays brief and irritated."
      }[selected]||"The first contact resolves according to what Kushina actually chose to do."};
    },nextBeatId:"kus_close"});
  return commit(def);
}

function patchKakashi(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;
  const def=editable(A.sceneByVariant.academy_kakashi);if(!def)return false;
  const debrief=beat(def,"kak_debrief"),reflect=beat(def,"kak_reflect");if(!debrief||!reflect)return false;
  debrief.presentationResolver=()=>{
    const ctx=A.local();
    const intel=ctx.kakashiFirstChoice==="shadow_the_clerk"?"HIGH":ctx.kakashiFirstChoice==="question_the_clerk"?"MIXED":"LOW";
    const disposition=ctx.kakashiRetrievalChoice==="secure_package"?"SECURED":"LOST";
    const route=ctx.kakashiRetrievalChoice==="secure_package"
      ?"Kakashi stayed with the confirmed packet and secured it from the broker."
      :"Kakashi left the confirmed packet position to pursue the apparent carrier; the real packet was lost while he was away.";
    return{text:`${route} The Academy debrief records the two truths separately: PACKAGE ${disposition}; RETRIEVAL INTELLIGENCE ${intel}.`};
  };
  for(const c of reflect.choices||[])c.nextBeatId="kak_reflection_result";
  add(def,{beatId:"kak_reflection_result",mode:"dialogue",speakerName:"KAKASHI",presentationResolver:()=>{
    const value=A.local().kakashiReflection;
    return{text:{objective:"Recovering the objective.",proof:"Knowing what I could prove.",responsibility:"Knowing which responsibility was mine."}[value]||"Kakashi keeps his own interpretation of the assessment."};
  },nextBeatId:"kak_sakumo"});
  return commit(def);
}

function obitoResponse(key,value){
  const rows={
    furniture:{
      furniture_carry_full:"Obito stops and carries the furniture through properly before running on. He materially resolves the problem and the stop costs real journey time.",
      furniture_stabilize:"Obito braces the furniture, gets it unstuck and keeps moving. His contribution is bounded and the delay is brief.",
      furniture_continue:"Obito keeps moving toward training and leaves the furniture problem behind."
    },
    vegetables:{
      vegetables_collect_all:"Obito stops to gather the scattered vegetables before they are crushed. He materially resolves the immediate problem and spends real journey time doing it.",
      vegetables_clear_lane:"Obito clears the nearest vegetables out of the busy lane and keeps moving. The contribution is bounded and the delay is brief.",
      vegetables_continue:"Obito keeps running and leaves the scattered vegetables behind."
    },
    equipment:{
      equipment_search_full:"Obito joins the search until the missing practice equipment is found, materially contributing and spending real journey time.",
      equipment_check_likely_route:"Obito checks the likely drop points on his way and reports what he can establish before moving on.",
      equipment_continue:"Obito leaves the equipment search to Academy staff and keeps moving."
    },
    delivery:{
      delivery_right_and_reload:"Obito helps right the handcart and rebuild the overturned load before moving on. The contribution is material and so is the delay.",
      delivery_clear_passage:"Obito clears the dangerous obstruction from the route and leaves the rest of the delivery to the worker.",
      delivery_continue:"Obito takes another way around and keeps moving toward training."
    },
    cart:{
      cart_intercept:"Obito stops the runaway cart himself. The intervention is a real causal contribution and it costs real journey time.",
      cart_warn_and_redirect:"Obito clears people from the cart's path and redirects the danger before moving on.",
      cart_continue:"Obito keeps moving toward training while the runaway-cart occurrence continues without his participation."
    }
  };
  return rows[key]&&rows[key][value]||null;
}

function patchObito(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;
  const def=editable(A.sceneByVariant.academy_obito);if(!def)return false;
  const mapping=[
    ["obi_vegetables","furniture","A dropped basket has scattered vegetables into a busy lane."],
    ["obi_equipment","vegetables","An Academy equipment custodian searches for missing practice equipment along the route."],
    ["obi_delivery","equipment","A delivery handcart has overturned and blocked part of the route."],
    ["obi_cart","delivery","A runaway cart creates a real danger in the lane."]
  ];
  for(const [beatId,previous,currentText] of mapping){const row=beat(def,beatId);if(!row)continue;row.presentationResolver=()=>{const prior=obitoResponse(previous,A.local()[`obito_${previous}`]);return{text:prior?`${prior} ${currentText}`:currentText};};}
  const arrival=beat(def,"obi_arrival");if(arrival){const priorResolver=arrival.presentationResolver;arrival.presentationResolver=()=>{const prior=obitoResponse("cart",A.local().obito_cart);const base=typeof priorResolver==="function"?(priorResolver()||{}).text:arrival.text;return{text:prior?`${prior} ${base}`:base};};}
  const reflect=beat(def,"obi_reflect"),end=beat(def,"obi_end");if(reflect&&end){for(const c of reflect.choices||[])c.nextBeatId="obi_reflection_result";add(def,{beatId:"obi_reflection_result",mode:"dialogue",speakerName:"OBITO",presentationResolver:()=>{const value=A.local().obitoReflection;return{text:{hokage_still:"I'm still going to be Hokage.",faster_next:"Next time I'll get there faster.",people_mattered:"Those people mattered too.",prove_it:"I'll prove it next time."}[value]||"Obito looks back over the journey he actually had."};},nextBeatId:"obi_end"});end.text="Training ends with the journey's actual stops, delays and training entitlement preserved as part of Obito's Chronicle.";}
  return commit(def);
}

const result={kushina:patchKushina(),kakashi:patchKakashi(),obito:patchObito()};
function runAlphaOriginChoiceReaction33510Diagnostics(){const A=globalThis.SC_ALPHA_ORIGIN_32900;const kush=A&&definition(A.sceneByVariant.academy_kushina),kak=A&&definition(A.sceneByVariant.academy_kakashi),obi=A&&definition(A.sceneByVariant.academy_obito);const checks={patchId:PATCH_ID==="alpha_origin_choice_reaction_33510_2026_09_13",allThreePatched:Object.values(result).every(Boolean),kushinaChoiceResult:!!(kush&&kush.beatMap&&kush.beatMap.has("kus_contact_result")),kakashiDecisionDebrief:!!(kak&&kak.beatMap&&typeof kak.beatMap.get("kak_debrief")?.presentationResolver==="function"),obitoChoiceReaction:!!(obi&&obi.beatMap&&typeof obi.beatMap.get("obi_vegetables")?.presentationResolver==="function"),browserGoldenClaimed:false};const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,patched:[...patched],browserGoldenClaimed:false};}
globalThis.SC_ALPHA_ORIGIN_CHOICE_REACTION_33510=Object.freeze({patchId:PATCH_ID,result:{...result},browserGoldenClaimed:false});
globalThis.runAlphaOriginChoiceReaction33510Diagnostics=runAlphaOriginChoiceReaction33510Diagnostics;
})();
