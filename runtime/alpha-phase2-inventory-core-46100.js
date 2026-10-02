// ============================================================================
// PHASE 2 — BOUNDED ALPHA INVENTORY CORE SURFACE — #461
//
// Read-only projection over existing Inventory / Equipment / Battle Pouch truth.
// This module does not mint ownership, equip, prepare, consume, reward, or save.
// ============================================================================
(function installPhase2InventoryCore46100(){
"use strict";
if(globalThis.SC_PHASE2_INVENTORY_CORE_46100)return;

const PATCH_ID="phase2_inventory_core_46100_2026_10_02";
const STYLE_ID="sc-phase2-inventory-core-46100";
const priorOpenOverlay=typeof globalThis.openOverlay==="function"?globalThis.openOverlay:null;

function clone(value){
  try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}
  catch(_error){return value;}
}
function currentPlayerData(){
  return typeof playerData!=="undefined"&&playerData?playerData:null;
}
function escapeHTML(value){
  return String(value==null?"":value)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#39;");
}
function definitionFor(itemId){
  try{return typeof globalThis.getItemDefinition==="function"?globalThis.getItemDefinition(itemId):null;}
  catch(_error){return null;}
}
function preparedItemIds(){
  const pd=currentPlayerData(),pouch=pd&&pd.battlePouch;
  const raw=Array.isArray(pouch)?pouch:(pouch&&Array.isArray(pouch.itemIds)?pouch.itemIds:[]);
  return [...new Set(raw.filter(id=>typeof id==="string"&&id))];
}
function characterLabel(characterId){
  if(!characterId)return null;
  try{
    const character=typeof globalThis.getPlayerCharacter==="function"?globalThis.getPlayerCharacter(characterId):null;
    return character&&character.name?String(character.name):String(characterId);
  }catch(_error){return String(characterId);}
}
function exactSourceProjection(row){
  const refs=[];
  const add=value=>{
    if(value==null||value==="")return;
    if(Array.isArray(value)){value.forEach(add);return;}
    if(typeof value==="object"){
      if(value.id)add(value.id);
      else if(value.receiptId)add(value.receiptId);
      else if(value.sourceOccurrenceId)add(value.sourceOccurrenceId);
      return;
    }
    refs.push(String(value));
  };
  if(row&&typeof row==="object"){
    add(row.sourceOccurrenceId);
    add(row.rewardSourceId);
    add(row.acquisitionReceiptId);
    add(row.provenanceReceiptId);
    add(row.sourceRefs);
    add(row.provenanceRefs);
    if(row.provenance&&typeof row.provenance==="object"){
      add(row.provenance.sourceOccurrenceId);
      add(row.provenance.receiptId);
      add(row.provenance.sourceRefs);
    }
  }
  return [...new Set(refs.filter(Boolean))];
}
function equipmentProjection(row){
  if(!row||!row.instanceId||!row.equippedBy)return{
    equipped:false,
    equippedBy:null,
    equippedByLabel:null,
    verified:true
  };
  const equippedBy=String(row.equippedBy);
  let verified=false;
  try{
    const character=typeof globalThis.getPlayerCharacter==="function"?globalThis.getPlayerCharacter(equippedBy):null;
    verified=!!(character&&Array.isArray(character.equipment)&&character.equipment.some(entry=>
      entry&&entry.instanceId===row.instanceId&&entry.itemId===row.id
    ));
  }catch(_error){verified=false;}
  return{
    equipped:true,
    equippedBy,
    equippedByLabel:characterLabel(equippedBy),
    verified
  };
}
function categoryFor(type,definition,row){
  const raw=String((definition&&definition.type)||(row&&row.type)||"misc").toLowerCase();
  if(raw==="weapon"||raw==="gear"||raw==="equipment"||raw==="tool"||row&&row.instanceId)return "durable";
  return "stack";
}
function rowProjection(row,index,preparedSet){
  if(!row||typeof row!=="object")return null;
  const itemId=String(row.id||row.itemId||"").trim();
  if(!itemId)return null;
  const definition=definitionFor(itemId);
  const category=categoryFor((definition&&definition.type)||row.type,definition,row);
  const instanceId=row.instanceId?String(row.instanceId):null;
  const quantity=category==="stack"?Math.max(0,Math.floor(Number(row.quantity)||0)):1;
  if(category==="stack"&&quantity<=0)return null;
  const equipment=equipmentProjection({...row,id:itemId});
  const sourceRefs=exactSourceProjection(row);
  return{
    inventoryPosition:index+1,
    itemId,
    name:String((definition&&definition.name)||row.name||itemId),
    type:String((definition&&definition.type)||row.type||"misc"),
    rarity:String((definition&&definition.rarity)||row.rarity||"Common"),
    description:String((definition&&definition.description)||row.description||""),
    category,
    stackable:category==="stack",
    quantity,
    instanceId,
    prepared:category==="stack"&&preparedSet.has(itemId),
    equipment,
    sourceRefs,
    sourceStatus:sourceRefs.length?"exact_refs_exposed":"not_exposed_on_inventory_record"
  };
}
function snapshot(){
  const pd=currentPlayerData();
  const inventory=pd&&Array.isArray(pd.inventory)?pd.inventory:[];
  const preparedIds=preparedItemIds(),preparedSet=new Set(preparedIds);
  const entries=inventory.map((row,index)=>rowProjection(row,index,preparedSet)).filter(Boolean);
  const stacks=entries.filter(row=>row.category==="stack");
  const durable=entries.filter(row=>row.category==="durable");
  return{
    patchId:PATCH_ID,
    entries,
    stacks,
    durable,
    preparedItemIds:preparedIds,
    summary:{
      stackIdentities:stacks.length,
      stackUnits:stacks.reduce((sum,row)=>sum+row.quantity,0),
      durableInstances:durable.length,
      equippedInstances:durable.filter(row=>row.equipment.equipped===true&&row.equipment.verified===true).length,
      preparedStacks:stacks.filter(row=>row.prepared===true).length
    }
  };
}
function ensureStyles(){
  if(typeof document==="undefined"||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");style.id=STYLE_ID;
  style.textContent=[
    ".sc-inventory-core{width:min(1120px,94vw);max-height:88vh;overflow:auto;background:#071018;border:1px solid rgba(116,182,190,.36);box-shadow:0 24px 80px rgba(0,0,0,.55);color:#dbe8e7}",
    ".sc-inventory-core *{box-sizing:border-box}",
    ".sc-inventory-head{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding:24px 26px;border-bottom:1px solid rgba(255,255,255,.09);background:linear-gradient(180deg,rgba(22,55,64,.48),rgba(7,16,24,.1))}",
    ".sc-inventory-head span,.sc-inventory-section>header span{font-size:10px;letter-spacing:.16em;color:#75bec5}",
    ".sc-inventory-head h2{margin:4px 0 6px;font-size:26px;letter-spacing:.05em}",
    ".sc-inventory-head p{margin:0;max-width:720px;color:#95a8aa;font-size:12px;line-height:1.55}",
    ".sc-inventory-close{border:0;background:transparent;color:#b7c8ca;font-size:20px;cursor:pointer;padding:4px 8px}",
    ".sc-inventory-summary{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;padding:14px 26px;border-bottom:1px solid rgba(255,255,255,.07)}",
    ".sc-inventory-summary div{padding:10px 12px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.06)}",
    ".sc-inventory-summary strong{display:block;font-size:18px;color:#e7c66d}.sc-inventory-summary span{font-size:9px;letter-spacing:.1em;color:#7f9296}",
    ".sc-inventory-body{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:18px 26px 26px}",
    ".sc-inventory-section{min-width:0}.sc-inventory-section>header{display:flex;justify-content:space-between;gap:12px;align-items:end;margin-bottom:8px}",
    ".sc-inventory-section h3{margin:3px 0 0;font-size:14px;letter-spacing:.08em}",
    ".sc-inventory-list{display:flex;flex-direction:column;gap:8px}",
    ".sc-inventory-row{padding:12px 13px;border:1px solid rgba(255,255,255,.08);background:rgba(8,21,29,.82)}",
    ".sc-inventory-row-top{display:flex;justify-content:space-between;gap:12px}.sc-inventory-row h4{margin:0;font-size:13px}.sc-inventory-row .rarity{font-size:9px;letter-spacing:.1em;color:#d7b969}",
    ".sc-inventory-row-meta{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}.sc-inventory-chip{padding:3px 6px;border:1px solid rgba(117,190,197,.24);font-size:9px;letter-spacing:.07em;color:#9fc8cc}",
    ".sc-inventory-chip.is-equipped,.sc-inventory-chip.is-prepared{color:#bde8bb;border-color:rgba(113,192,113,.35)}",
    ".sc-inventory-chip.is-warning{color:#edc28c;border-color:rgba(224,157,79,.4)}",
    ".sc-inventory-row p{margin:8px 0 0;color:#8fa1a4;font-size:11px;line-height:1.45}",
    ".sc-inventory-source{margin-top:8px;padding-top:7px;border-top:1px solid rgba(255,255,255,.055);font-size:10px;color:#829498;word-break:break-word}",
    ".sc-inventory-source b{color:#9fb4b6;font-weight:600}",
    ".sc-inventory-empty{padding:24px 16px;text-align:center;border:1px dashed rgba(255,255,255,.1);color:#7f9296;font-size:11px}",
    ".sc-inventory-foot{padding:12px 26px 18px;border-top:1px solid rgba(255,255,255,.07);color:#72878b;font-size:10px;line-height:1.5}",
    "@media(max-width:900px){.sc-inventory-summary{grid-template-columns:repeat(2,minmax(0,1fr))}.sc-inventory-body{grid-template-columns:1fr}}"
  ].join("");
  document.head.appendChild(style);
}
function sourceHTML(entry){
  if(entry.sourceRefs.length){
    return '<div class="sc-inventory-source"><b>SOURCE RECORD</b> · '+entry.sourceRefs.map(escapeHTML).join(" · ")+"</div>";
  }
  return '<div class="sc-inventory-source"><b>SOURCE RECORD</b> · Not exposed on this current Inventory record.</div>';
}
function stackHTML(entry){
  return '<article class="sc-inventory-row" data-inventory-item-id="'+escapeHTML(entry.itemId)+'">'+
    '<div class="sc-inventory-row-top"><h4>'+escapeHTML(entry.name)+'</h4><span class="rarity">'+escapeHTML(entry.rarity.toUpperCase())+'</span></div>'+
    '<div class="sc-inventory-row-meta">'+
      '<span class="sc-inventory-chip">OWNED ×'+entry.quantity+'</span>'+
      (entry.prepared?'<span class="sc-inventory-chip is-prepared">BATTLE POUCH · PREPARED</span>':'<span class="sc-inventory-chip">NOT PREPARED</span>')+
      '<span class="sc-inventory-chip">'+escapeHTML(entry.type.toUpperCase())+'</span>'+
    '</div>'+
    (entry.description?'<p>'+escapeHTML(entry.description)+'</p>':"")+
    sourceHTML(entry)+
  "</article>";
}
function durableHTML(entry){
  const equipment=entry.equipment;
  const state=!equipment.equipped
    ?'<span class="sc-inventory-chip">UNEQUIPPED</span>'
    :equipment.verified
      ?'<span class="sc-inventory-chip is-equipped">EQUIPPED · '+escapeHTML(equipment.equippedByLabel||equipment.equippedBy)+'</span>'
      :'<span class="sc-inventory-chip is-warning">EQUIPMENT LINK UNVERIFIED · '+escapeHTML(equipment.equippedByLabel||equipment.equippedBy)+'</span>';
  return '<article class="sc-inventory-row" data-inventory-instance-id="'+escapeHTML(entry.instanceId||"")+'">'+
    '<div class="sc-inventory-row-top"><h4>'+escapeHTML(entry.name)+'</h4><span class="rarity">'+escapeHTML(entry.rarity.toUpperCase())+'</span></div>'+
    '<div class="sc-inventory-row-meta">'+
      '<span class="sc-inventory-chip">OWNED INSTANCE</span>'+state+
      '<span class="sc-inventory-chip">'+escapeHTML(entry.type.toUpperCase())+'</span>'+
    '</div>'+
    '<p>INSTANCE · '+escapeHTML(entry.instanceId||"UNAVAILABLE")+'</p>'+
    (entry.description?'<p>'+escapeHTML(entry.description)+'</p>':"")+
    sourceHTML(entry)+
  "</article>";
}
function render(container){
  if(!container)return false;
  ensureStyles();
  const data=snapshot(),s=data.summary;
  container.innerHTML='<section class="sc-inventory-core" aria-label="Inventory">'+
    '<header class="sc-inventory-head"><div><span>PERSISTENT OWNERSHIP · READ ONLY</span><h2>INVENTORY</h2><p>Owned quantities and durable instances are projected from committed Inventory state. Battle Pouch preparation and equipment are shown separately; opening this screen grants nothing.</p></div><button type="button" class="sc-inventory-close" onclick="closeOverlay()" aria-label="Close Inventory">✕</button></header>'+
    '<div class="sc-inventory-summary">'+
      '<div><strong>'+s.stackIdentities+'</strong><span>STACKS</span></div>'+
      '<div><strong>'+s.stackUnits+'</strong><span>STACK UNITS</span></div>'+
      '<div><strong>'+s.durableInstances+'</strong><span>DURABLE INSTANCES</span></div>'+
      '<div><strong>'+s.equippedInstances+'</strong><span>EQUIPPED</span></div>'+
      '<div><strong>'+s.preparedStacks+'</strong><span>PREPARED STACKS</span></div>'+
    '</div>'+
    '<main class="sc-inventory-body">'+
      '<section class="sc-inventory-section"><header><div><span>FUNGIBLE OWNERSHIP</span><h3>ITEMS & MATERIALS</h3></div><small>'+s.stackUnits+' OWNED UNITS</small></header><div class="sc-inventory-list">'+
        (data.stacks.length?data.stacks.map(stackHTML).join(""):'<div class="sc-inventory-empty">No owned stackable Items or materials are currently recorded.</div>')+
      '</div></section>'+
      '<section class="sc-inventory-section"><header><div><span>EXACT PERSISTENT OBJECTS</span><h3>DURABLE EQUIPMENT & TOOLS</h3></div><small>'+s.durableInstances+' INSTANCES</small></header><div class="sc-inventory-list">'+
        (data.durable.length?data.durable.map(durableHTML).join(""):'<div class="sc-inventory-empty">No durable Inventory instances are currently recorded.</div>')+
      '</div></section>'+
    '</main>'+
    '<footer class="sc-inventory-foot">Owned ≠ equipped. Owned Item quantity ≠ Battle Pouch preparation. Source history is displayed only when an exact reference is present on the current Inventory record. Loadout, Shop and Crafting remain separate systems.</footer>'+
  '</section>';
  return true;
}
function open(){
  if(!priorOpenOverlay)return{success:false,reason:"overlay_runtime_missing"};
  const result=priorOpenOverlay("inventory");
  const container=typeof document!=="undefined"?document.getElementById("overlay-content-container"):null;
  if(!container)return{success:false,reason:"overlay_container_missing"};
  render(container);
  try{
    if(typeof globalThis.setAlphaSurfaceTruthActiveRoute==="function")globalThis.setAlphaSurfaceTruthActiveRoute("inventory");
  }catch(_error){}
  return{success:true,type:"inventory",priorResult:result||null};
}
function inventoryOpenOverlay(type){
  if(type==="inventory")return open();
  return priorOpenOverlay?priorOpenOverlay.apply(this,arguments):undefined;
}
function diagnostics(){
  const source=String(snapshot)+"\n"+String(render)+"\n"+String(open);
  const data=snapshot();
  const checks={
    readsCanonicalInventory:source.includes("pd.inventory")||String(snapshot).includes("pd.inventory"),
    projectsBattlePouchSeparately:String(preparedItemIds).includes("battlePouch"),
    projectsEquipmentSeparately:String(equipmentProjection).includes("character.equipment"),
    noOwnershipWriter:!source.includes("inventory.push")&&!source.includes("addItemToInventory")&&!source.includes("equipItemToCharacter"),
    noPersistenceWriter:!source.includes("savePlayerData")&&!source.includes("localStorage"),
    noShopOrCraftingMutation:!source.includes("commitPurchase")&&!source.includes("craftOperation"),
    noUICreatedProvenance:String(exactSourceProjection).includes("sourceRefs")&&!String(exactSourceProjection).includes("activityHistory"),
    distinctDurableIdentity:data.durable.every(row=>!!row.instanceId),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,summary:clone(data.summary),browserGoldenClaimed:false};
}

if(priorOpenOverlay){
  globalThis.openOverlay=inventoryOpenOverlay;
  try{openOverlay=inventoryOpenOverlay;}catch(_error){}
}
globalThis.getPhase2InventorySnapshot46100=snapshot;
globalThis.renderPhase2InventoryCore46100=render;
globalThis.openPhase2InventoryCore46100=open;
globalThis.runPhase2InventoryCore46100Diagnostics=diagnostics;
globalThis.SC_PHASE2_INVENTORY_CORE_46100=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
})();
