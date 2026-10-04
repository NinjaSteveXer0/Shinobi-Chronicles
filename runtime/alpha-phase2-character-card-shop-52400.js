// ============================================================================
// PHASE 2 — KONOHA CHARACTER CARD SHOP RETAIL ACQUISITION — #524 / #449 STEP 5
//
// Acquisition-owned contract:
// Documentation/Acquisition/Alpha Konoha Character Card Shop Retail Acquisition Contract 2026-10-04.md
//
// This module owns only the bounded v1 retail transaction + presentation.
// Canonical Ryō remains playerData.ryo.
// Canonical Character ownership/acquisition remains commitCharacterAcquisition().
// Purchase ownership != assignment != deployment.
// ============================================================================
(function installPhase2CharacterCardShop52400(){
"use strict";
if(globalThis.SC_PHASE2_CHARACTER_CARD_SHOP_52400)return;

const PATCH_ID="phase2_character_card_shop_52400_2026_10_04";
const SHOP_ID="konoha_character_card_shop";
const CATALOGUE_ID="alpha_konoha_character_card_shop_v1";
const ROUTE="retail_character_card_shop";
const LOCATION_ID="KON-P09";
const PRICE_RYO=100;
const STYLE_ID="sc-character-shop-52400-style";
const CATALOGUE=Object.freeze([
  "academy_hinata",
  "academy_izuno",
  "academy_kushina",
  "academy_menma",
  "academy_mirai",
  "academy_kurenai",
  "academy_iwabee",
  "academy_metal_lee",
  "academy_kakashi",
  "academy_obito"
]);
const uiState={feedback:null};
let intentCounter=0;

function clone(value){
  try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}
  catch(_error){return value;}
}
function currentPlayer(){
  try{return typeof playerData!=="undefined"&&playerData?playerData:null;}
  catch(_error){return null;}
}
function currentRyo(){
  try{
    const value=Number(globalThis.getChronicleCurrentRyo43600?.());
    if(Number.isFinite(value))return Math.max(0,value);
  }catch(_error){}
  const pd=currentPlayer();
  return Math.max(0,Number(pd&&pd.ryo)||0);
}
function acquisitionState(){
  const pd=currentPlayer();
  return pd&&pd.acquisition&&typeof pd.acquisition==="object"?pd.acquisition:null;
}
function accessSnapshot(){
  const state=acquisitionState();
  const origin=state&&state.chronicleOrigin;
  const formation=state&&state.academyTeamFormation;
  const checks={
    originSealed:!!(origin&&origin.prologueCompleted===true),
    activeKonohaEntered:!!(origin&&origin.activeKonohaEntered===true),
    academyTeamFormationComplete:!!(formation&&formation.completed===true&&formation.confirmationReceipt)
  };
  const available=Object.values(checks).every(Boolean);
  return{
    available,
    checks,
    reason:available?null:(!checks.originSealed?"origin_not_complete":(!checks.activeKonohaEntered?"active_konoha_not_entered":"academy_team_formation_not_complete"))
  };
}
function registryEntry(variantId){
  try{return typeof getCharacterRegistryEntry==="function"?getCharacterRegistryEntry(variantId):null;}
  catch(_error){return null;}
}
function displayName(variantId){
  try{
    if(typeof getProductionRuntimeDisplayName==="function"){
      const name=getProductionRuntimeDisplayName(variantId);
      if(name)return String(name);
    }
  }catch(_error){}
  const row=registryEntry(variantId);
  return String(row&&(row.displayName||row.name)||variantId);
}
function cardPath(variantId){
  try{return typeof getCharacterCardAssetPath==="function"?String(getCharacterCardAssetPath(variantId)||""):"";}
  catch(_error){return"";}
}
function isOwned(variantId){
  try{return typeof isCharacterRegistryOwned==="function"&&isCharacterRegistryOwned(variantId)===true;}
  catch(_error){return false;}
}
function history(){
  const pd=currentPlayer();
  if(!pd)return null;
  if(!Array.isArray(pd.activityHistory))pd.activityHistory=[];
  return pd.activityHistory;
}
function normalizeIntentId(intentId){
  const value=String(intentId||"").trim();
  return /^[A-Za-z0-9:_-]{6,180}$/.test(value)?value:null;
}
function createPurchaseIntentId(variantId){
  intentCounter+=1;
  let entropy="";
  try{if(globalThis.crypto&&typeof globalThis.crypto.randomUUID==="function")entropy=globalThis.crypto.randomUUID();}catch(_error){}
  if(!entropy)entropy=String(Date.now())+"-"+String(intentCounter);
  return "charshop524:"+String(variantId||"character")+":"+entropy;
}
function occurrenceIdForIntent(intentId){
  return "konoha_character_card_shop_purchase::"+String(intentId);
}
function purchaseReceiptByIntent(intentId){
  const rows=history();
  if(!rows)return null;
  return rows.find(row=>row&&row.type==="character_card_shop_purchase"&&row.shopId===SHOP_ID&&row.purchaseIntentId===intentId)||null;
}
function restoreTransactionSnapshot(snapshot){
  try{
    playerData=snapshot;
    if(typeof setCharacterOwnershipRuntimeAuthority==="function"){
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    }
    if(typeof hydrateOwnedProductionRuntimeCharacters==="function"){
      hydrateOwnedProductionRuntimeCharacters(playerData.characterOwnership);
    }
    if(typeof savePlayerData==="function")savePlayerData();
    return true;
  }catch(_error){return false;}
}
function commitPurchase(variantId,intentId){
  const pd=currentPlayer();
  if(!pd)return{success:false,reason:"player_state_missing"};

  const stableIntent=normalizeIntentId(intentId);
  if(!stableIntent)return{success:false,reason:"purchase_intent_id_required"};

  const existingReceipt=purchaseReceiptByIntent(stableIntent);
  if(existingReceipt){
    if(existingReceipt.variantId!==variantId){
      return{success:false,reason:"purchase_intent_variant_mismatch",receipt:clone(existingReceipt)};
    }
    return{
      success:true,idempotent:true,receipt:clone(existingReceipt),
      variantId,ryoBefore:Number(existingReceipt.ryoBefore)||0,ryoAfter:Number(existingReceipt.ryoAfter)||0
    };
  }

  const access=accessSnapshot();
  if(!access.available)return{success:false,reason:access.reason,access};

  if(!CATALOGUE.includes(variantId))return{success:false,reason:"character_not_in_alpha_shop_catalogue"};
  if(!registryEntry(variantId))return{success:false,reason:"character_registry_missing"};
  if(isOwned(variantId))return{success:false,reason:"already_owned",variantId};

  const beforeRyo=currentRyo();
  if(beforeRyo<PRICE_RYO)return{success:false,reason:"insufficient_ryo",required:PRICE_RYO,available:beforeRyo,variantId};

  const rows=history();
  if(!rows)return{success:false,reason:"history_state_missing"};

  const snapshot=clone(pd);
  const occurrenceId=occurrenceIdForIntent(stableIntent);
  try{
    pd.ryo=beforeRyo-PRICE_RYO;

    if(typeof commitCharacterAcquisition!=="function")throw new Error("character_acquisition_authority_missing");
    const acquisition=commitCharacterAcquisition({
      variantId,
      route:ROUTE,
      sourceEventId:occurrenceId,
      context:{
        shopId:SHOP_ID,
        locationId:LOCATION_ID,
        catalogueId:CATALOGUE_ID,
        purchaseIntentId:stableIntent,
        priceRyo:PRICE_RYO,
        assignmentCommitted:false
      },
      provenance:{
        authority:"deliberate_retail_character_purchase",
        retailDoesNotAssign:true,
        catalogueId:CATALOGUE_ID
      }
    });
    if(!acquisition||acquisition.success!==true)throw new Error(acquisition&&acquisition.reason||"character_acquisition_failed");
    if(acquisition.duplicate===true)throw new Error("unexpected_duplicate_acquisition");

    const afterRyo=currentRyo();
    if(afterRyo!==beforeRyo-PRICE_RYO)throw new Error("canonical_ryo_debit_mismatch");
    if(!isOwned(variantId))throw new Error("character_ownership_commit_missing");

    const receipt={
      id:occurrenceId,
      occurrenceId,
      sourceEventId:occurrenceId,
      type:"character_card_shop_purchase",
      activity:"commercial_character_purchase",
      completed:true,
      committed:true,
      success:true,
      shopId:SHOP_ID,
      locationId:LOCATION_ID,
      catalogueId:CATALOGUE_ID,
      purchaseIntentId:stableIntent,
      variantId,
      route:ROUTE,
      unitPriceRyo:PRICE_RYO,
      totalPriceRyo:PRICE_RYO,
      ryoBefore:beforeRyo,
      ryoAfter:afterRyo,
      acquisitionRecordId:acquisition.record&&acquisition.record.recordId||null,
      ownedCharacterId:acquisition.ownedCharacter&&acquisition.ownedCharacter.ownedCharacterId||null,
      assignmentCommitted:false,
      retailDoesNotAssign:true,
      authority:"deliberate_retail_character_purchase",
      sourceRefs:[
        {type:"location",id:LOCATION_ID,role:"retail_host"},
        {type:"shop",id:SHOP_ID,role:"retail_transaction"},
        {type:"catalogue",id:CATALOGUE_ID,role:"retail_policy"},
        {type:"character_representation",id:variantId,role:"purchased_representation"}
      ],
      timestamp:Date.now()
    };
    rows.push(receipt);

    if(typeof savePlayerData!=="function")throw new Error("save_authority_missing");
    savePlayerData();
    refreshConsumers();
    return{
      success:true,idempotent:false,variantId,
      ryoBefore:beforeRyo,ryoAfter:afterRyo,
      acquisition:clone(acquisition),receipt:clone(receipt)
    };
  }catch(error){
    restoreTransactionSnapshot(snapshot);
    return{success:false,reason:"character_purchase_rolled_back",error:String(error&&error.message||error),variantId};
  }
}
function esc(value){
  return String(value==null?"":value)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}
function catalogueSnapshot(){
  const access=accessSnapshot();
  const ryo=currentRyo();
  return{
    patchId:PATCH_ID,shopId:SHOP_ID,catalogueId:CATALOGUE_ID,route:ROUTE,locationId:LOCATION_ID,
    priceRyo:PRICE_RYO,ryo,access,
    catalogue:CATALOGUE.map(variantId=>{
      const registry=registryEntry(variantId);
      const owned=isOwned(variantId);
      return{
        variantId,
        name:displayName(variantId),
        cardPath:cardPath(variantId),
        registryValid:!!registry,
        owned,
        priceRyo:PRICE_RYO,
        purchasable:access.available&&!!registry&&!owned&&ryo>=PRICE_RYO
      };
    })
  };
}
function refreshConsumers(){
  try{globalThis.refreshPhase2LiveHud49900?.();}catch(_error){}
  try{
    if(typeof currentOverlayType!=="undefined"&&currentOverlayType==="character_shop"){
      const container=document.getElementById("overlay-content-container");
      if(container)renderShop(container);
    }
  }catch(_error){}
  try{injectItemShopCharacterCardsAction();}catch(_error){}
}
function purchaseFromUI(variantId){
  const result=commitPurchase(variantId,createPurchaseIntentId(variantId));
  uiState.feedback=result.success
    ? {tone:"success",text:"Character ownership committed to My Clan. Team assignment did not change."}
    : {tone:"error",text:result.reason==="already_owned"?"That exact representation is already owned.":(result.reason==="insufficient_ryo"?"Insufficient Ryō. No money or ownership changed.":"Purchase failed. No transaction committed.")};
  refreshConsumers();
  return result;
}
function ensureStyles(){
  if(typeof document==="undefined"||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=[
    ".sc-charshop524{width:min(1120px,95vw);max-height:89vh;overflow:auto;color:#dce8e7;background:linear-gradient(145deg,#08121a,#0b1720);border:1px solid rgba(200,164,76,.34);box-shadow:0 26px 80px rgba(0,0,0,.58)}",
    ".sc-charshop524 *{box-sizing:border-box}.sc-charshop524-head{display:flex;justify-content:space-between;gap:20px;padding:22px 24px;border-bottom:1px solid rgba(255,255,255,.08)}",
    ".sc-charshop524-kicker{font-size:10px;letter-spacing:.15em;color:#d7bd76}.sc-charshop524 h2{margin:4px 0 6px;font-size:26px}.sc-charshop524 p{margin:0;color:#94a6a8;font-size:12px;line-height:1.5}",
    ".sc-charshop524-balance{min-width:150px;text-align:right}.sc-charshop524-balance span{display:block;font-size:9px;letter-spacing:.13em;color:#83979a}.sc-charshop524-balance strong{font-size:24px;color:#e1c36d}",
    ".sc-charshop524-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;padding:18px 24px}.sc-charshop524-card{position:relative;padding:10px;border:1px solid rgba(255,255,255,.08);background:rgba(7,16,22,.72)}",
    ".sc-charshop524-card img{display:block;width:100%;aspect-ratio:.7/1;object-fit:cover;object-position:center top;background:#05090c;border:1px solid rgba(200,164,76,.2)}",
    ".sc-charshop524-card h3{margin:8px 0 2px;font-size:12px}.sc-charshop524-meta{font-size:9px;letter-spacing:.08em;color:#93a9ad}.sc-charshop524-owned{position:absolute;top:16px;right:16px;padding:5px 7px;background:rgba(7,15,20,.9);border:1px solid rgba(197,164,83,.48);font-size:9px;letter-spacing:.12em;color:#ead79c}",
    ".sc-charshop524-buy{width:100%;margin-top:9px;padding:8px;border:1px solid rgba(214,169,58,.52);background:rgba(214,169,58,.09);color:#ead79c;font-weight:700;cursor:pointer}.sc-charshop524-buy[disabled]{opacity:.42;cursor:not-allowed}",
    ".sc-charshop524-foot{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:14px 24px;border-top:1px solid rgba(255,255,255,.08)}.sc-charshop524-actions{display:flex;gap:8px}.sc-charshop524-actions button,.sc-shop524-entry{padding:8px 11px;background:#0b1820;border:1px solid rgba(112,183,192,.25);color:#b8d3d4;cursor:pointer}",
    ".sc-charshop524-feedback{font-size:11px;color:#9ccf9a}.sc-charshop524-feedback.is-error{color:#e5aa84}.sc-charshop524-lock{padding:28px 24px;color:#c5d3d4}",
    "@media(max-width:980px){.sc-charshop524-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:650px){.sc-charshop524-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.sc-charshop524-head,.sc-charshop524-foot{flex-direction:column;align-items:flex-start}}"
  ].join("");
  document.head.appendChild(style);
}
function renderShop(container){
  if(!container)return false;
  ensureStyles();
  const data=catalogueSnapshot();
  if(!data.access.available){
    container.innerHTML='<section class="sc-charshop524" aria-label="Konoha Character Card Shop"><header class="sc-charshop524-head"><div><span class="sc-charshop524-kicker">CENTRAL COMMERCIAL DISTRICT · CHARACTER CARDS</span><h2>MY CLAN ACQUISITION</h2></div></header><div class="sc-charshop524-lock">Character Card retail unlocks after the Origin is complete, Active Konoha is entered, and mandatory Academy Team Formation is complete.</div><footer class="sc-charshop524-foot"><span class="sc-charshop524-feedback is-error">Retail access locked. No ownership or Ryō changed.</span><div class="sc-charshop524-actions"><button type="button" onclick="openPhase2BasicItemShop51700()">BACK TO FIELD SUPPLIES</button></div></footer></section>';
    return true;
  }
  const cards=data.catalogue.map(row=>{
    const disabled=row.owned||!row.registryValid||data.ryo<PRICE_RYO;
    const status=row.owned?"OWNED":(data.ryo<PRICE_RYO?"100 RYŌ":"AVAILABLE");
    return '<article class="sc-charshop524-card" data-charshop524-row="'+esc(row.variantId)+'">'+
      (row.cardPath?'<img src="'+esc(row.cardPath)+'" alt="'+esc(row.name)+'">':'')+
      (row.owned?'<span class="sc-charshop524-owned">OWNED</span>':'')+
      '<h3>'+esc(row.name)+'</h3><div class="sc-charshop524-meta">'+esc(status)+' · 100 RYŌ</div>'+
      '<button type="button" class="sc-charshop524-buy" data-charshop524-buy="'+esc(row.variantId)+'" onclick="purchasePhase2CharacterCard52400(\''+esc(row.variantId)+'\')" '+(disabled?'disabled aria-disabled="true"':'')+'>'+(row.owned?'OWNED':'BUY · 100 RYŌ')+'</button>'+
      '</article>';
  }).join("");
  const feedback=uiState.feedback?'<span class="sc-charshop524-feedback '+(uiState.feedback.tone==="error"?"is-error":"")+'">'+esc(uiState.feedback.text)+'</span>':'<span class="sc-charshop524-feedback">Purchase grants My Clan ownership only. It does not assign or deploy the Character.</span>';
  container.innerHTML='<section class="sc-charshop524" aria-label="Konoha Character Card Shop">'+
    '<header class="sc-charshop524-head"><div><span class="sc-charshop524-kicker">CENTRAL COMMERCIAL DISTRICT · CHARACTER CARDS</span><h2>MY CLAN ACQUISITION</h2><p>Fixed Alpha starter-cohort catalogue. Every listed Academy representation is exactly 100 Ryō.</p></div><div class="sc-charshop524-balance"><span>CANONICAL BALANCE</span><strong>'+data.ryo+' RYŌ</strong></div></header>'+
    '<main class="sc-charshop524-grid">'+cards+'</main>'+
    '<footer class="sc-charshop524-foot">'+feedback+'<div class="sc-charshop524-actions"><button type="button" onclick="openOverlay(\'clan\')">VIEW MY CLAN</button><button type="button" onclick="openPhase2BasicItemShop51700()">FIELD SUPPLIES</button><button type="button" onclick="returnPhase2BasicShopToVillage51700()">BACK TO KONOHA</button></div></footer>'+
    '</section>';
  return true;
}
function openShop(){
  if(typeof globalThis.openOverlay!=="function")return{success:false,reason:"overlay_runtime_missing"};
  const access=accessSnapshot();
  if(!access.available)return{success:false,reason:access.reason,access};
  uiState.feedback=null;
  globalThis.openOverlay("character_shop");
  const container=typeof document!=="undefined"?document.getElementById("overlay-content-container"):null;
  if(!container)return{success:false,reason:"overlay_container_missing"};
  renderShop(container);
  try{globalThis.setAlphaSurfaceTruthActiveRoute?.("shop");}catch(_error){}
  return{success:true,type:"character_shop",shopId:SHOP_ID,catalogueId:CATALOGUE_ID};
}
function injectItemShopCharacterCardsAction(){
  if(typeof document==="undefined")return false;
  const actions=document.querySelector(".sc-shop517 .sc-shop517-actions");
  if(!actions)return false;
  if(actions.querySelector("[data-charshop524-entry]"))return true;
  const button=document.createElement("button");
  button.type="button";
  button.className="sc-shop524-entry";
  button.dataset.charshop524Entry="true";
  button.textContent="CHARACTER CARDS";
  const access=accessSnapshot();
  button.disabled=!access.available;
  button.setAttribute("aria-disabled",access.available?"false":"true");
  button.title=access.available?"Open Character Card Shop":"Complete Academy Team Formation to unlock Character Card retail.";
  button.addEventListener("click",()=>{if(accessSnapshot().available)openShop();});
  const backButton=actions.lastElementChild;\n  if(backButton)actions.insertBefore(button,backButton);\n  else actions.appendChild(button);
  return true;
}
function diagnostics(){
  const snap=catalogueSnapshot();
  const source=String(commitPurchase);
  const checks={
    exactTenRows:snap.catalogue.length===10&&JSON.stringify(snap.catalogue.map(r=>r.variantId))===JSON.stringify(CATALOGUE),
    fixedAuthoredPrice:snap.catalogue.every(r=>r.priceRyo===100)&&PRICE_RYO===100,
    noRegistryScan:!String(catalogueSnapshot).includes("Object.keys(characterRegistry)")&&!String(catalogueSnapshot).includes("ALPHA_PRODUCTION_CHARACTER_IDS"),
    existingAcquisitionAuthority:source.includes("commitCharacterAcquisition"),
    sameIntentFirst:source.indexOf("purchaseReceiptByIntent(stableIntent)")<source.indexOf("isOwned(variantId)"),
    alreadyOwnedBeforeDebit:source.indexOf("isOwned(variantId)")<source.indexOf("pd.ryo=beforeRyo-PRICE_RYO"),
    insufficientBeforeDebit:source.indexOf("beforeRyo<PRICE_RYO")<source.indexOf("pd.ryo=beforeRyo-PRICE_RYO"),
    exactRetailRoute:ROUTE==="retail_character_card_shop",
    assignmentFalse:source.includes("assignmentCommitted:false")&&source.includes("retailDoesNotAssign:true"),
    rollbackFullPlayerState:source.includes("restoreTransactionSnapshot(snapshot)"),
    noTeamWriter:!source.includes("confirmAcademyTeamFormation")&&!source.includes("teamSlots="),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,snapshot:snap,browserGoldenClaimed:false};
}

ensureStyles();
if(typeof document!=="undefined"){
  const observer=new MutationObserver(()=>injectItemShopCharacterCardsAction());
  const container=document.getElementById("overlay-content-container");
  if(container)observer.observe(container,{childList:true,subtree:true});
  injectItemShopCharacterCardsAction();
}

globalThis.getPhase2CharacterCardShopSnapshot52400=catalogueSnapshot;
globalThis.getPhase2CharacterCardShopAccess52400=accessSnapshot;
globalThis.commitPhase2CharacterCardShopPurchase52400=commitPurchase;
globalThis.purchasePhase2CharacterCard52400=purchaseFromUI;
globalThis.openPhase2CharacterCardShop52400=openShop;
globalThis.renderPhase2CharacterCardShop52400=renderShop;
globalThis.injectPhase2CharacterCardShopEntry52400=injectItemShopCharacterCardsAction;
globalThis.runPhase2CharacterCardShop52400Diagnostics=diagnostics;
globalThis.SC_PHASE2_CHARACTER_CARD_SHOP_52400=Object.freeze({
  patchId:PATCH_ID,shopId:SHOP_ID,catalogueId:CATALOGUE_ID,route:ROUTE,locationId:LOCATION_ID,
  priceRyo:PRICE_RYO,catalogue:CATALOGUE,browserGoldenClaimed:false
});
})();
