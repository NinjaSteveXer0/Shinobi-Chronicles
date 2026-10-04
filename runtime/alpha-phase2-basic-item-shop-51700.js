// ============================================================================
// PHASE 2 — BOUNDED KONOHA BASIC ITEM SHOP — #517 / MASTER #449 STEP 5
//
// First real Alpha spending loop.
// canonical playerData.ryo -> deliberate purchase intent -> atomic commit ->
// existing addItemToInventory() -> canonical Inventory projection.
//
// This module owns only the bounded retail transaction and Shop presentation.
// It does not own Inventory, character acquisition, team assignment, Crafting,
// Forge, Fūin Craft, selling, Energy, or dynamic pricing.
// ============================================================================
(function installPhase2BasicItemShop51700(){
"use strict";
if(globalThis.SC_PHASE2_BASIC_ITEM_SHOP_51700)return;

const PATCH_ID="phase2_basic_item_shop_51700_2026_10_04";
const SHOP_ID="konoha_central_commercial_basic_item_shop";
const LOCATION_ID="KON-P09";
const STYLE_ID="sc-phase2-basic-item-shop-51700-style";
const RARITY_ORDER=Object.freeze(["Common","Uncommon","Rare","Legendary"]);
const CATALOGUE=Object.freeze([
  Object.freeze({itemId:"field_recovery_pill",price:25}),
  Object.freeze({itemId:"standard_antidote",price:20}),
  Object.freeze({itemId:"basic_scroll",price:40}),
  Object.freeze({itemId:"weapon_materials",price:60})
]);
let intentCounter=0;
const uiState={feedback:null};

function clone(value){
  try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}
  catch(_error){return value;}
}
function currentPlayer(){
  try{return typeof playerData!=="undefined"&&playerData?playerData:null;}
  catch(_error){return null;}
}
function esc(value){
  return String(value==null?"":value)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}
function itemDefinition(itemId){
  try{return typeof globalThis.getItemDefinition==="function"?globalThis.getItemDefinition(itemId):null;}
  catch(_error){return null;}
}
function catalogueRow(itemId){
  return CATALOGUE.find(row=>row.itemId===String(itemId||""))||null;
}
function currentRyo(){
  try{
    if(typeof globalThis.getChronicleCurrentRyo43600==="function"){
      const value=Number(globalThis.getChronicleCurrentRyo43600());
      if(Number.isFinite(value))return Math.max(0,value);
    }
  }catch(_error){}
  const pd=currentPlayer();
  return Math.max(0,Number(pd&&pd.ryo)||0);
}
function history(){
  const pd=currentPlayer();
  if(!pd)return null;
  if(!Array.isArray(pd.activityHistory))pd.activityHistory=[];
  return pd.activityHistory;
}
function ownedQuantity(itemId){
  const pd=currentPlayer();
  const rows=pd&&Array.isArray(pd.inventory)?pd.inventory:[];
  return rows.filter(row=>row&&String(row.id||row.itemId||"")===itemId).reduce((sum,row)=>{
    if(row.instanceId)return sum+1;
    return sum+Math.max(0,Math.floor(Number(row.quantity)||0));
  },0);
}
function purchaseReceipt(intentId){
  const rows=history();
  if(!rows)return null;
  return rows.find(row=>row&&row.type==="item_shop_purchase"&&row.shopId===SHOP_ID&&row.purchaseIntentId===intentId)||null;
}
function exactPurchaseOccurrenceId(intentId){
  return "konoha_item_shop_purchase::"+String(intentId);
}
function normalizeIntentId(intentId){
  const value=String(intentId||"").trim();
  return /^[A-Za-z0-9:_-]{6,160}$/.test(value)?value:null;
}
function createPurchaseIntentId(itemId){
  intentCounter+=1;
  let entropy="";
  try{
    if(globalThis.crypto&&typeof globalThis.crypto.randomUUID==="function")entropy=globalThis.crypto.randomUUID();
  }catch(_error){}
  if(!entropy)entropy=String(Date.now())+"-"+String(intentCounter);
  return "shop517:"+String(itemId||"item")+":"+entropy;
}
function attachPurchaseSourceToInventory(itemId,receiptId){
  const pd=currentPlayer();
  const rows=pd&&Array.isArray(pd.inventory)?pd.inventory:[];
  const row=rows.find(entry=>entry&&!entry.instanceId&&String(entry.id||entry.itemId||"")===itemId);
  if(!row)return false;
  if(!Array.isArray(row.sourceRefs))row.sourceRefs=[];
  if(!row.sourceRefs.includes(receiptId))row.sourceRefs.push(receiptId);
  return true;
}
function refreshConsumers(){
  try{globalThis.refreshPhase2LiveHud49900?.();}catch(_error){}
  try{
    if(typeof currentOverlayType!=="undefined"&&currentOverlayType==="shop"){
      const container=document.getElementById("overlay-content-container");
      if(container)renderShop(container);
    }
  }catch(_error){}
}
function commitPurchase(itemId,intentId){
  const pd=currentPlayer();
  if(!pd)return{success:false,reason:"player_state_missing"};
  const row=catalogueRow(itemId);
  if(!row)return{success:false,reason:"item_not_in_alpha_shop_catalogue"};
  const definition=itemDefinition(row.itemId);
  if(!definition)return{success:false,reason:"canonical_item_definition_missing"};
  if(definition.stackable!==true)return{success:false,reason:"durable_item_out_of_scope"};
  if(!RARITY_ORDER.includes(String(definition.rarity||"")))return{success:false,reason:"rarity_not_canonical"};
  const stableIntent=normalizeIntentId(intentId);
  if(!stableIntent)return{success:false,reason:"purchase_intent_id_required"};

  const existing=purchaseReceipt(stableIntent);
  if(existing){
    return{
      success:true,idempotent:true,receipt:clone(existing),
      ryoBefore:Number(existing.ryoBefore)||0,ryoAfter:Number(existing.ryoAfter)||0,
      quantityBefore:Number(existing.quantityBefore)||0,quantityAfter:Number(existing.quantityAfter)||0
    };
  }

  const price=Math.max(0,Math.floor(Number(row.price)||0));
  const beforeRyo=currentRyo();
  const beforeQuantity=ownedQuantity(row.itemId);
  if(beforeRyo<price){
    return{success:false,reason:"insufficient_ryo",required:price,available:beforeRyo,itemId:row.itemId};
  }

  const rows=history();
  if(!rows)return{success:false,reason:"history_state_missing"};
  const inventoryBefore=clone(Array.isArray(pd.inventory)?pd.inventory:[]);
  const historyLength=rows.length;
  const occurrenceId=exactPurchaseOccurrenceId(stableIntent);

  try{
    pd.ryo=beforeRyo-price;

    if(typeof globalThis.addItemToInventory!=="function")throw new Error("inventory_commit_authority_missing");
    globalThis.addItemToInventory({id:row.itemId,name:definition.name,rarity:definition.rarity});

    const afterQuantity=ownedQuantity(row.itemId);
    if(afterQuantity!==beforeQuantity+1)throw new Error("inventory_quantity_commit_mismatch");
    if(!attachPurchaseSourceToInventory(row.itemId,occurrenceId))throw new Error("inventory_purchase_source_attach_failed");

    const receipt={
      id:occurrenceId,
      occurrenceId,
      sourceOccurrenceId:occurrenceId,
      type:"item_shop_purchase",
      activity:"commercial_purchase",
      completed:true,
      committed:true,
      success:true,
      shopId:SHOP_ID,
      locationId:LOCATION_ID,
      purchaseIntentId:stableIntent,
      itemId:row.itemId,
      itemName:String(definition.name||row.itemId),
      rarity:String(definition.rarity||"Common"),
      quantity:1,
      unitPriceRyo:price,
      totalPriceRyo:price,
      ryoBefore:beforeRyo,
      ryoAfter:pd.ryo,
      quantityBefore:beforeQuantity,
      quantityAfter:afterQuantity,
      sourceRefs:[
        {type:"location",id:LOCATION_ID,role:"retail_host"},
        {type:"shop",id:SHOP_ID,role:"retail_transaction"},
        {type:"item_definition",id:row.itemId,role:"purchased_definition"}
      ],
      timestamp:Date.now()
    };
    rows.push(receipt);
    try{activityHistory=pd.activityHistory;}catch(_error){}
    if(typeof globalThis.savePlayerData!=="function")throw new Error("save_authority_missing");
    globalThis.savePlayerData();
    refreshConsumers();
    return{
      success:true,idempotent:false,receipt:clone(receipt),
      ryoBefore:beforeRyo,ryoAfter:pd.ryo,
      quantityBefore:beforeQuantity,quantityAfter:afterQuantity
    };
  }catch(error){
    pd.ryo=beforeRyo;
    pd.inventory=inventoryBefore;
    while(rows.length>historyLength)rows.pop();
    try{activityHistory=pd.activityHistory;}catch(_error){}
    return{success:false,reason:"purchase_commit_failed",error:String(error&&error.message||error)};
  }
}
function purchaseFromUI(itemId){
  const intentId=createPurchaseIntentId(itemId);
  const result=commitPurchase(itemId,intentId);
  uiState.feedback=result.success
    ? {tone:"success",text:result.idempotent?"Purchase already committed.":"Purchase committed to Inventory."}
    : {tone:"error",text:result.reason==="insufficient_ryo"?"Insufficient Ryō. No money or ownership changed.":"Purchase failed. No transaction committed."};
  refreshConsumers();
  return result;
}
function catalogueSnapshot(){
  return{
    patchId:PATCH_ID,
    shopId:SHOP_ID,
    locationId:LOCATION_ID,
    ryo:currentRyo(),
    rarityOrder:[...RARITY_ORDER],
    catalogue:CATALOGUE.map(row=>{
      const definition=itemDefinition(row.itemId);
      return{
        itemId:row.itemId,
        name:String(definition&&definition.name||row.itemId),
        type:String(definition&&definition.type||"unknown"),
        rarity:String(definition&&definition.rarity||""),
        stackable:!!(definition&&definition.stackable===true),
        description:String(definition&&definition.description||""),
        price:row.price,
        ownedQuantity:ownedQuantity(row.itemId)
      };
    })
  };
}
function ensureStyles(){
  if(typeof document==="undefined"||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=[
    ".sc-shop517{width:min(980px,94vw);max-height:88vh;overflow:auto;color:#dce8e7;background:linear-gradient(145deg,#08121a,#0b1720);border:1px solid rgba(200,164,76,.34);box-shadow:0 26px 80px rgba(0,0,0,.58)}",
    ".sc-shop517 *{box-sizing:border-box}",
    ".sc-shop517-head{display:flex;justify-content:space-between;gap:20px;padding:22px 24px;border-bottom:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,rgba(83,63,25,.22),transparent)}",
    ".sc-shop517-kicker{font-size:10px;letter-spacing:.15em;color:#d7bd76}.sc-shop517 h2{margin:4px 0 6px;font-size:26px}.sc-shop517 p{margin:0;color:#94a6a8;font-size:12px;line-height:1.5}",
    ".sc-shop517-balance{min-width:150px;text-align:right}.sc-shop517-balance span{display:block;font-size:9px;letter-spacing:.13em;color:#83979a}.sc-shop517-balance strong{font-size:24px;color:#e1c36d}",
    ".sc-shop517-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:18px 24px}",
    ".sc-shop517-card{padding:14px;border:1px solid rgba(255,255,255,.08);background:rgba(7,16,22,.72)}",
    ".sc-shop517-card header{display:flex;justify-content:space-between;gap:12px}.sc-shop517-card h3{margin:0;font-size:14px}.sc-shop517-rarity{font-size:9px;letter-spacing:.1em;color:#d6b765}",
    ".sc-shop517-meta{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.sc-shop517-chip{font-size:9px;padding:3px 6px;border:1px solid rgba(112,183,192,.28);color:#9bc4c8}",
    ".sc-shop517-buy{width:100%;margin-top:12px;padding:9px 10px;border:1px solid rgba(214,169,58,.52);background:rgba(214,169,58,.09);color:#ead79c;font-weight:700;cursor:pointer}.sc-shop517-buy:disabled{opacity:.45;cursor:not-allowed}",
    ".sc-shop517-foot{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:14px 24px;border-top:1px solid rgba(255,255,255,.08)}",
    ".sc-shop517-actions{display:flex;gap:8px}.sc-shop517-actions button{padding:8px 11px;background:#0b1820;border:1px solid rgba(112,183,192,.25);color:#b8d3d4;cursor:pointer}",
    ".sc-shop517-feedback{font-size:11px;color:#9ccf9a}.sc-shop517-feedback.is-error{color:#e5aa84}",
    ".sc-shop517-hotspot{z-index:8}",
    "@media(max-width:800px){.sc-shop517-grid{grid-template-columns:1fr}.sc-shop517-head{align-items:flex-start}.sc-shop517-foot{align-items:flex-start;flex-direction:column}}"
  ].join("");
  document.head.appendChild(style);
}
function renderShop(container){
  if(!container)return false;
  ensureStyles();
  const data=catalogueSnapshot();
  const cards=data.catalogue.map(row=>{
    const affordable=data.ryo>=row.price;
    return '<article class="sc-shop517-card" data-shop517-item="'+esc(row.itemId)+'">'+
      '<header><h3>'+esc(row.name)+'</h3><span class="sc-shop517-rarity">'+esc(row.rarity.toUpperCase())+'</span></header>'+
      '<div class="sc-shop517-meta"><span class="sc-shop517-chip">'+esc(row.type.toUpperCase())+'</span><span class="sc-shop517-chip">OWNED ×'+row.ownedQuantity+'</span><span class="sc-shop517-chip">'+row.price+' RYŌ</span></div>'+
      (row.description?'<p>'+esc(row.description)+'</p>':"")+
      '<button type="button" class="sc-shop517-buy" data-shop517-buy="'+esc(row.itemId)+'" onclick="purchasePhase2BasicShopItem51700(\''+esc(row.itemId)+'\')" '+(affordable?"":'aria-disabled="true"')+'>BUY · '+row.price+' RYŌ</button>'+
    '</article>';
  }).join("");
  const feedback=uiState.feedback?'<span class="sc-shop517-feedback '+(uiState.feedback.tone==="error"?"is-error":"")+'">'+esc(uiState.feedback.text)+'</span>':'<span class="sc-shop517-feedback">Purchase commits only after the transaction succeeds.</span>';
  container.innerHTML='<section class="sc-shop517" aria-label="Konoha Basic Item Shop">'+
    '<header class="sc-shop517-head"><div><span class="sc-shop517-kicker">CENTRAL COMMERCIAL DISTRICT · BASIC ITEM SHOP</span><h2>FIELD SUPPLIES</h2><p>Small Alpha catalogue. Prices are fixed by this Shop authority; Inventory remains the owner of purchased goods.</p></div><div class="sc-shop517-balance"><span>CANONICAL BALANCE</span><strong>'+data.ryo+' RYŌ</strong></div></header>'+
    '<main class="sc-shop517-grid">'+cards+'</main>'+
    '<footer class="sc-shop517-foot">'+feedback+'<div class="sc-shop517-actions"><button type="button" onclick="openOverlay(\'inventory\')">VIEW INVENTORY</button><button type="button" onclick="returnPhase2BasicShopToVillage51700()">BACK TO KONOHA</button></div></footer>'+
  '</section>';
  return true;
}
function openShop(){
  if(typeof globalThis.openOverlay!=="function")return{success:false,reason:"overlay_runtime_missing"};
  uiState.feedback=null;
  const prior=globalThis.openOverlay("shop");
  const container=typeof document!=="undefined"?document.getElementById("overlay-content-container"):null;
  if(!container)return{success:false,reason:"overlay_container_missing"};
  renderShop(container);
  try{globalThis.setAlphaSurfaceTruthActiveRoute?.("shop");}catch(_error){}
  return{success:true,type:"shop",shopId:SHOP_ID,priorResult:prior||null};
}
function returnToVillage(){
  if(typeof globalThis.openOverlay!=="function")return{success:false,reason:"overlay_runtime_missing"};
  return globalThis.openOverlay("village")||{success:true,type:"village"};
}
function bindCommercialDistrictAction(node){
  if(!node)return false;
  node.dataset.shop517Location=LOCATION_ID;
  node.classList.add("sc-shop517-hotspot");
  node.setAttribute("aria-label","Central Commercial District. Double-click to enter Basic Item Shop.");
  if(node.dataset.shop517Bound==="true")return true;
  node.dataset.shop517Bound="true";
  node.addEventListener("dblclick",event=>{
    event.preventDefault();
    event.stopImmediatePropagation();
    openShop();
  },true);
  node.addEventListener("keydown",event=>{
    if(event.key==="Enter"||event.key===" "){
      event.preventDefault();
      event.stopImmediatePropagation();
      openShop();
    }
  },true);
  return true;
}
function commercialDistrictHost(screen){
  if(!screen)return null;
  const candidates=[...screen.querySelectorAll("[data-village-hotspot-id],.village-map-hotspot,.konoha-v3-anchor")];
  return candidates.find(node=>{
    const label=node.querySelector(".village-golden-halo-label,.village-map-hotspot-label");
    const visibleName=String(label&&label.textContent||"").trim();
    const aria=String(node.getAttribute("aria-label")||"").trim()
      .replace(/\.\s*Double-click to enter(?: Basic Item Shop)?\.?$/i,"")
      .trim();
    const title=String(node.getAttribute("title")||"").trim();
    return visibleName==="Central Commercial District"||aria==="Central Commercial District"||title==="Central Commercial District";
  })||null;
}
function injectCommercialDistrictAction(){
  if(typeof document==="undefined")return false;
  const screen=document.querySelector('.village-map-screen[data-village-id="konohagakure"]');
  if(!screen)return false;
  const authoritative=commercialDistrictHost(screen);
  if(!authoritative)return false;
  return bindCommercialDistrictAction(authoritative);
}
function diagnostics(){
  const data=catalogueSnapshot();
  const source=String(commitPurchase);
  const checks={
    exactLocation:LOCATION_ID==="KON-P09",
    canonicalHotspotUpgradeOnly:!String(injectCommercialDistrictAction).includes("createElement")&&!String(injectCommercialDistrictAction).includes(".hidden=")&&String(injectCommercialDistrictAction).includes("data-village-hotspot-id"),
    smallCatalogue:data.catalogue.length===4,
    fixedCanonicalPrices:data.catalogue.every(row=>Number.isInteger(row.price)&&row.price>0),
    onlyExistingDefinitions:data.catalogue.every(row=>!!itemDefinition(row.itemId)),
    stackablesOnly:data.catalogue.every(row=>row.stackable===true),
    rarityAuthorityExact:JSON.stringify(data.rarityOrder)===JSON.stringify(["Common","Uncommon","Rare","Legendary"]),
    noObsoleteNormalRarity:!data.catalogue.some(row=>String(row.rarity).toLowerCase()==="normal"),
    canonicalRyoWrite:source.includes("pd.ryo=beforeRyo-price"),
    canonicalInventoryCommit:source.includes("addItemToInventory"),
    stableIntentIdempotence:source.includes("purchaseReceipt(stableIntent)"),
    insufficientFundsBeforeMutation:source.indexOf("beforeRyo<price")<source.indexOf("pd.ryo=beforeRyo-price"),
    rollbackOnFailure:source.includes("pd.inventory=inventoryBefore")&&source.includes("pd.ryo=beforeRyo"),
    noCharacterOwnershipMutation:!source.includes("ownedCharactersByVariantId")&&!source.includes("selectAcademyTeamFormation"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,catalogue:data.catalogue,browserGoldenClaimed:false};
}

ensureStyles();
if(typeof document!=="undefined"){
  const observer=new MutationObserver(()=>injectCommercialDistrictAction());
  const container=document.getElementById("overlay-content-container");
  if(container)observer.observe(container,{childList:true,subtree:true});
  injectCommercialDistrictAction();
}

globalThis.getPhase2BasicItemShopSnapshot51700=catalogueSnapshot;
globalThis.renderPhase2BasicItemShop51700=renderShop;
globalThis.commitPhase2BasicItemShopPurchase51700=commitPurchase;
globalThis.purchasePhase2BasicShopItem51700=purchaseFromUI;
globalThis.openPhase2BasicItemShop51700=openShop;
globalThis.returnPhase2BasicShopToVillage51700=returnToVillage;
globalThis.injectPhase2CommercialDistrictShop51700=injectCommercialDistrictAction;
globalThis.runPhase2BasicItemShop51700Diagnostics=diagnostics;
globalThis.SC_PHASE2_BASIC_ITEM_SHOP_51700=Object.freeze({
  patchId:PATCH_ID,shopId:SHOP_ID,locationId:LOCATION_ID,rarityOrder:RARITY_ORDER,catalogue:CATALOGUE,browserGoldenClaimed:false
});
})();