// ============================================================================
// PHASE 2 — INVENTORY CORE + DURABLE OBJECT PROVENANCE — #461 / #148 / #545
//
// Inventory ownership/custody remains owned by the existing playerData.inventory
// writer in game.js. This module projects that truth and owns only the bounded
// durable-object identity/provenance layer required by #148.
//
// It does NOT become a second Inventory, Equipment, Battle Pouch, reward, Shop
// or Crafting owner. Durable acquisition commits consume addItemToInventory().
// ============================================================================
(function installPhase2InventoryCore46100(){
"use strict";
if(globalThis.SC_PHASE2_INVENTORY_CORE_46100)return;

const PATCH_ID="phase2_inventory_core_46100_2026_10_05_provenance_545";
const STYLE_ID="sc-phase2-inventory-core-46100";
const PROVENANCE_ROOT_KEY="durableObjectProvenance14800";
const PROVENANCE_SCHEMA_VERSION=1;
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
function isDurableDefinition(definition,row=null){
  const type=String((definition&&definition.type)||(row&&row.type)||"").toLowerCase();
  if(definition&&definition.stackable===false)return true;
  return type==="weapon"||type==="gear"||type==="equipment"||type==="tool"||!!(row&&row.instanceId);
}
function readProvenanceState(){
  const pd=currentPlayerData(),state=pd&&pd[PROVENANCE_ROOT_KEY];
  if(!state||typeof state!=="object"||Array.isArray(state))return null;
  const objectsByInstanceId=state.objectsByInstanceId&&typeof state.objectsByInstanceId==="object"&&!Array.isArray(state.objectsByInstanceId)?state.objectsByInstanceId:{};
  const acquisitionReceipts=state.acquisitionReceipts&&typeof state.acquisitionReceipts==="object"&&!Array.isArray(state.acquisitionReceipts)?state.acquisitionReceipts:{};
  return{schemaVersion:Number(state.schemaVersion)||PROVENANCE_SCHEMA_VERSION,objectsByInstanceId,acquisitionReceipts};
}
function ensureProvenanceState(){
  const pd=currentPlayerData();
  if(!pd)return null;
  const existing=pd[PROVENANCE_ROOT_KEY];
  if(!existing||typeof existing!=="object"||Array.isArray(existing)){
    pd[PROVENANCE_ROOT_KEY]={schemaVersion:PROVENANCE_SCHEMA_VERSION,objectsByInstanceId:{},acquisitionReceipts:{}};
  }
  const state=pd[PROVENANCE_ROOT_KEY];
  state.schemaVersion=PROVENANCE_SCHEMA_VERSION;
  if(!state.objectsByInstanceId||typeof state.objectsByInstanceId!=="object"||Array.isArray(state.objectsByInstanceId))state.objectsByInstanceId={};
  if(!state.acquisitionReceipts||typeof state.acquisitionReceipts!=="object"||Array.isArray(state.acquisitionReceipts))state.acquisitionReceipts={};
  return state;
}
function acquisitionAddress({sourceOccurrenceId,sourceId,itemId,acquisitionKind="acquisition"}){
  return ["durable_acquisition_v1",String(sourceOccurrenceId||""),String(sourceId||""),String(itemId||""),String(acquisitionKind||"acquisition")].join("|");
}
function provenanceEventId({instanceId,eventType,sourceOccurrenceId,sourceId}){
  return ["durable_provenance_v1",String(instanceId||""),String(eventType||"event"),String(sourceOccurrenceId||""),String(sourceId||"")].join("|");
}
function inventoryRowsForItem(itemId){
  const pd=currentPlayerData(),rows=pd&&Array.isArray(pd.inventory)?pd.inventory:[];
  return rows.filter(row=>row&&String(row.id||row.itemId||"")===String(itemId||""));
}
function inventoryRowByInstance(instanceId){
  if(!instanceId)return null;
  const pd=currentPlayerData(),rows=pd&&Array.isArray(pd.inventory)?pd.inventory:[];
  return rows.find(row=>row&&String(row.instanceId||"")===String(instanceId))||null;
}
function getDurableObjectRecord54500(instanceId){
  const state=readProvenanceState();
  const row=state&&state.objectsByInstanceId&&state.objectsByInstanceId[String(instanceId||"")];
  return row?clone(row):null;
}
function getDurableAcquisitionReceipt54500(addressOrSpec){
  const state=readProvenanceState();
  if(!state)return null;
  const address=typeof addressOrSpec==="string"?addressOrSpec:acquisitionAddress(addressOrSpec||{});
  const row=state.acquisitionReceipts[address];
  return row?clone(row):null;
}
function appendProvenanceEvent54500({instanceId,itemId,eventType,sourceOccurrenceId,sourceId,sourceRefs=[],metadata={},timestamp=null,deferSave=false}){
  const id=String(instanceId||"").trim(),definitionId=String(itemId||"").trim();
  if(!id||!definitionId||!eventType||!sourceOccurrenceId||!sourceId)return{success:false,reason:"provenance_event_identity_incomplete"};
  const state=ensureProvenanceState();
  if(!state)return{success:false,reason:"player_state_unavailable"};
  const existing=state.objectsByInstanceId[id];
  if(existing&&String(existing.itemId||"")!==definitionId)return{success:false,reason:"durable_object_definition_conflict",instanceId:id,itemId:definitionId};
  const object=existing||{
    schemaVersion:PROVENANCE_SCHEMA_VERSION,
    instanceId:id,
    itemId:definitionId,
    identityOrigin:"preexisting_authority",
    identityCommittedAt:Number(timestamp)||Date.now(),
    events:[]
  };
  if(!Array.isArray(object.events))object.events=[];
  const eventId=provenanceEventId({instanceId:id,eventType,sourceOccurrenceId,sourceId});
  const prior=object.events.find(row=>row&&row.eventId===eventId);
  if(prior){
    state.objectsByInstanceId[id]=object;
    return{success:true,idempotent:true,event:clone(prior),object:clone(object)};
  }
  const event={
    eventId,
    eventType:String(eventType),
    instanceId:id,
    itemId:definitionId,
    sourceOccurrenceId:String(sourceOccurrenceId),
    sourceId:String(sourceId),
    sourceRefs:[...new Set([String(sourceOccurrenceId),String(sourceId),...(Array.isArray(sourceRefs)?sourceRefs.map(String):[])].filter(Boolean))],
    metadata:clone(metadata||{}),
    provenanceWorthy:true,
    committedAt:Number(timestamp)||Date.now()
  };
  object.events.push(event);
  state.objectsByInstanceId[id]=object;
  if(!deferSave&&typeof globalThis.savePlayerData==="function")globalThis.savePlayerData();
  return{success:true,idempotent:false,event:clone(event),object:clone(object)};
}
function registerPreexistingDurableObject54500({instanceId,itemId,sourceOccurrenceId,sourceId,eventType="creation",sourceRefs=[],metadata={},timestamp=null,deferSave=false}={}){
  const definition=definitionFor(itemId);
  if(!definition)return{success:false,reason:"item_definition_missing",itemId:itemId||null};
  if(!isDurableDefinition(definition))return{success:false,reason:"item_not_durable",itemId:String(itemId||"")};
  if(inventoryRowByInstance(instanceId))return{success:false,reason:"preexisting_object_already_in_inventory",instanceId:String(instanceId||"")};
  return appendProvenanceEvent54500({instanceId,itemId,eventType,sourceOccurrenceId,sourceId,sourceRefs,metadata,timestamp,deferSave});
}
function commitDurableInventoryAcquisition54500({
  itemId,
  sourceOccurrenceId,
  sourceId,
  acquisitionKind="acquisition",
  eventType=null,
  existingInstanceId=null,
  sourceRefs=[],
  metadata={},
  deferSave=false
}={}){
  const pd=currentPlayerData();
  if(!pd)return{success:false,reason:"player_state_unavailable"};
  if(!Array.isArray(pd.inventory))pd.inventory=[];
  const definition=definitionFor(itemId);
  if(!definition)return{success:false,reason:"item_definition_missing",itemId:itemId||null};
  if(!isDurableDefinition(definition))return{success:false,reason:"item_not_durable",itemId:String(itemId||"")};
  if(!sourceOccurrenceId||!sourceId)return{success:false,reason:"durable_acquisition_source_incomplete"};
  if(typeof globalThis.addItemToInventory!=="function")return{success:false,reason:"inventory_ownership_writer_missing"};
  const address=acquisitionAddress({sourceOccurrenceId,sourceId,itemId,acquisitionKind});
  const state=readProvenanceState();
  const existingReceipt=state&&state.acquisitionReceipts&&state.acquisitionReceipts[address];
  if(existingReceipt&&existingReceipt.committed===true){
    const object=state.objectsByInstanceId[String(existingReceipt.instanceId||"")];
    if(!object)return{success:false,reason:"durable_acquisition_receipt_object_missing",receipt:clone(existingReceipt)};
    return{
      success:true,idempotent:true,address,instanceId:String(existingReceipt.instanceId),
      receipt:clone(existingReceipt),object:clone(object),
      currentlyInInventory:!!inventoryRowByInstance(existingReceipt.instanceId)
    };
  }
  const requestedExisting=existingInstanceId?String(existingInstanceId):null;
  if(requestedExisting&&inventoryRowByInstance(requestedExisting))return{success:false,reason:"exact_object_already_owned_without_source_receipt",instanceId:requestedExisting};
  if(requestedExisting){
    const preexisting=state&&state.objectsByInstanceId&&state.objectsByInstanceId[requestedExisting];
    if(!preexisting)return{success:false,reason:"preexisting_object_record_missing",instanceId:requestedExisting};
    if(String(preexisting.itemId||"")!==String(itemId))return{success:false,reason:"preexisting_object_definition_conflict",instanceId:requestedExisting};
  }
  const inventoryBefore=clone(pd.inventory);
  const hadProvenanceRoot=Object.prototype.hasOwnProperty.call(pd,PROVENANCE_ROOT_KEY);
  const provenanceBefore=hadProvenanceRoot?clone(pd[PROVENANCE_ROOT_KEY]):null;
  const beforeIds=new Set(pd.inventory.filter(row=>row&&row.instanceId).map(row=>String(row.instanceId)));
  try{
    const refreshed=ensureProvenanceState();
    if(!refreshed)throw new Error("provenance_state_unavailable");
    globalThis.addItemToInventory({id:String(itemId),name:String(definition.name||itemId)});
    const newRows=inventoryRowsForItem(itemId).filter(row=>row&&row.instanceId&&!beforeIds.has(String(row.instanceId)));
    if(newRows.length!==1)throw new Error("canonical_inventory_writer_did_not_create_one_durable_instance");
    const inventoryRow=newRows[0];
    const mintedInstanceId=String(inventoryRow.instanceId||"");
    if(!mintedInstanceId)throw new Error("canonical_inventory_instance_missing");
    let instanceId=mintedInstanceId;
    if(requestedExisting){
      inventoryRow.instanceId=requestedExisting;
      instanceId=requestedExisting;
    }
    let object=refreshed.objectsByInstanceId[instanceId];
    if(object&&String(object.itemId||"")!==String(itemId))throw new Error("durable_object_definition_conflict");
    if(!object){
      object={
        schemaVersion:PROVENANCE_SCHEMA_VERSION,
        instanceId,
        itemId:String(itemId),
        identityOrigin:requestedExisting?"preexisting_authority":"ownership_commit",
        identityCommittedAt:Date.now(),
        events:[]
      };
      refreshed.objectsByInstanceId[instanceId]=object;
    }
    const eventResult=appendProvenanceEvent54500({
      instanceId,itemId,eventType:eventType||String(acquisitionKind||"acquisition"),
      sourceOccurrenceId,sourceId,sourceRefs,metadata,deferSave:true
    });
    if(!eventResult.success)throw new Error(eventResult.reason||"provenance_event_commit_failed");
    const receipt={
      schemaVersion:PROVENANCE_SCHEMA_VERSION,
      address,
      instanceId,
      itemId:String(itemId),
      acquisitionKind:String(acquisitionKind||"acquisition"),
      sourceOccurrenceId:String(sourceOccurrenceId),
      sourceId:String(sourceId),
      provenanceEventId:eventResult.event.eventId,
      committed:true,
      committedAt:Date.now()
    };
    refreshed.acquisitionReceipts[address]=receipt;
    inventoryRow.provenanceObjectId=instanceId;
    inventoryRow.acquisitionReceiptId=address;
    inventoryRow.sourceOccurrenceId=String(sourceOccurrenceId);
    inventoryRow.rewardSourceId=String(sourceId);
    inventoryRow.provenanceRefs=[...new Set([eventResult.event.eventId,String(sourceOccurrenceId),String(sourceId),...(Array.isArray(sourceRefs)?sourceRefs.map(String):[])].filter(Boolean))];
    inventoryRow.provenance={
      receiptId:address,
      sourceOccurrenceId:String(sourceOccurrenceId),
      sourceRefs:[...inventoryRow.provenanceRefs]
    };
    if(!deferSave&&typeof globalThis.savePlayerData==="function")globalThis.savePlayerData();
    return{
      success:true,idempotent:false,address,instanceId,
      receipt:clone(receipt),object:getDurableObjectRecord54500(instanceId),inventoryRow:clone(inventoryRow),
      currentlyInInventory:true
    };
  }catch(error){
    pd.inventory=inventoryBefore;
    if(hadProvenanceRoot)pd[PROVENANCE_ROOT_KEY]=provenanceBefore;
    else delete pd[PROVENANCE_ROOT_KEY];
    return{success:false,reason:"durable_acquisition_commit_failed",error:String(error&&error.message||error)};
  }
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
    add(row.sourceOccurrenceId);add(row.rewardSourceId);add(row.acquisitionReceiptId);add(row.provenanceReceiptId);add(row.sourceRefs);add(row.provenanceRefs);
    if(row.provenance&&typeof row.provenance==="object"){
      add(row.provenance.sourceOccurrenceId);add(row.provenance.receiptId);add(row.provenance.sourceRefs);
    }
    const object=row.instanceId?getDurableObjectRecord54500(row.instanceId):null;
    if(object&&Array.isArray(object.events))object.events.forEach(event=>{add(event.eventId);add(event.sourceOccurrenceId);add(event.sourceId);add(event.sourceRefs);});
  }
  return [...new Set(refs.filter(Boolean))];
}
function equipmentProjection(row){
  if(!row||!row.instanceId||!row.equippedBy)return{equipped:false,equippedBy:null,equippedByLabel:null,verified:true};
  const equippedBy=String(row.equippedBy);let verified=false;
  try{
    const character=typeof globalThis.getPlayerCharacter==="function"?globalThis.getPlayerCharacter(equippedBy):null;
    verified=!!(character&&Array.isArray(character.equipment)&&character.equipment.some(entry=>entry&&entry.instanceId===row.instanceId&&entry.itemId===row.id));
  }catch(_error){verified=false;}
  return{equipped:true,equippedBy,equippedByLabel:characterLabel(equippedBy),verified};
}
function categoryFor(type,definition,row){
  const raw=String((definition&&definition.type)||(row&&row.type)||"misc").toLowerCase();
  if(raw==="weapon"||raw==="gear"||raw==="equipment"||raw==="tool"||row&&row.instanceId)return "durable";
  return "stack";
}
function rowProjection(row,index,preparedSet){
  if(!row||typeof row!=="object")return null;
  const itemId=String(row.id||row.itemId||"").trim();if(!itemId)return null;
  const definition=definitionFor(itemId),category=categoryFor((definition&&definition.type)||row.type,definition,row);
  const instanceId=row.instanceId?String(row.instanceId):null,quantity=category==="stack"?Math.max(0,Math.floor(Number(row.quantity)||0)):1;
  if(category==="stack"&&quantity<=0)return null;
  const equipment=equipmentProjection({...row,id:itemId}),sourceRefs=exactSourceProjection(row);
  return{
    inventoryPosition:index+1,itemId,name:String((definition&&definition.name)||row.name||itemId),
    type:String((definition&&definition.type)||row.type||"misc"),rarity:String((definition&&definition.rarity)||row.rarity||"Common"),
    description:String((definition&&definition.description)||row.description||""),category,stackable:category==="stack",quantity,instanceId,
    prepared:category==="stack"&&preparedSet.has(itemId),equipment,sourceRefs,
    provenanceObject:instanceId?getDurableObjectRecord54500(instanceId):null,
    sourceStatus:sourceRefs.length?"exact_refs_exposed":"not_exposed_on_inventory_record"
  };
}
function snapshot(){
  const pd=currentPlayerData(),inventory=pd&&Array.isArray(pd.inventory)?pd.inventory:[];
  const preparedIds=preparedItemIds(),preparedSet=new Set(preparedIds);
  const entries=inventory.map((row,index)=>rowProjection(row,index,preparedSet)).filter(Boolean);
  const stacks=entries.filter(row=>row.category==="stack"),durable=entries.filter(row=>row.category==="durable");
  return{
    patchId:PATCH_ID,entries,stacks,durable,preparedItemIds:preparedIds,
    summary:{
      stackIdentities:stacks.length,stackUnits:stacks.reduce((sum,row)=>sum+row.quantity,0),durableInstances:durable.length,
      equippedInstances:durable.filter(row=>row.equipment.equipped===true&&row.equipment.verified===true).length,
      preparedStacks:stacks.filter(row=>row.prepared===true).length,
      provenanceTrackedInstances:durable.filter(row=>!!row.provenanceObject).length
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
    ".sc-inventory-head h2{margin:4px 0 6px;font-size:26px;letter-spacing:.05em}.sc-inventory-head p{margin:0;max-width:720px;color:#95a8aa;font-size:12px;line-height:1.55}",
    ".sc-inventory-close{border:0;background:transparent;color:#b7c8ca;font-size:20px;cursor:pointer;padding:4px 8px}",
    ".sc-inventory-summary{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;padding:14px 26px;border-bottom:1px solid rgba(255,255,255,.07)}",
    ".sc-inventory-summary div{padding:10px 12px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.06)}",
    ".sc-inventory-summary strong{display:block;font-size:18px;color:#e7c66d}.sc-inventory-summary span{font-size:9px;letter-spacing:.1em;color:#7f9296}",
    ".sc-inventory-body{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:18px 26px 26px}",
    ".sc-inventory-section{min-width:0}.sc-inventory-section>header{display:flex;justify-content:space-between;gap:12px;align-items:end;margin-bottom:8px}.sc-inventory-section h3{margin:3px 0 0;font-size:14px;letter-spacing:.08em}",
    ".sc-inventory-list{display:flex;flex-direction:column;gap:8px}.sc-inventory-row{padding:12px 13px;border:1px solid rgba(255,255,255,.08);background:rgba(8,21,29,.82)}",
    ".sc-inventory-row-top{display:flex;justify-content:space-between;gap:12px}.sc-inventory-row h4{margin:0;font-size:13px}.sc-inventory-row .rarity{font-size:9px;letter-spacing:.1em;color:#d7b969}",
    ".sc-inventory-row-meta{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}.sc-inventory-chip{padding:3px 6px;border:1px solid rgba(117,190,197,.24);font-size:9px;letter-spacing:.07em;color:#9fc8cc}",
    ".sc-inventory-chip.is-equipped,.sc-inventory-chip.is-prepared{color:#bde8bb;border-color:rgba(113,192,113,.35)}.sc-inventory-chip.is-warning{color:#edc28c;border-color:rgba(224,157,79,.4)}",
    ".sc-inventory-row p{margin:8px 0 0;color:#8fa1a4;font-size:11px;line-height:1.45}.sc-inventory-source{margin-top:8px;padding-top:7px;border-top:1px solid rgba(255,255,255,.055);font-size:10px;color:#829498;word-break:break-word}",
    ".sc-inventory-source b{color:#9fb4b6;font-weight:600}.sc-inventory-empty{padding:24px 16px;text-align:center;border:1px dashed rgba(255,255,255,.1);color:#7f9296;font-size:11px}",
    ".sc-inventory-foot{padding:12px 26px 18px;border-top:1px solid rgba(255,255,255,.07);color:#72878b;font-size:10px;line-height:1.5}@media(max-width:900px){.sc-inventory-summary{grid-template-columns:repeat(2,minmax(0,1fr))}.sc-inventory-body{grid-template-columns:1fr}}"
  ].join("");
  document.head.appendChild(style);
}
function sourceHTML(entry){
  if(entry.sourceRefs.length)return '<div class="sc-inventory-source"><b>SOURCE RECORD</b> · '+entry.sourceRefs.map(escapeHTML).join(" · ")+"</div>";
  return '<div class="sc-inventory-source"><b>SOURCE RECORD</b> · Not exposed on this current Inventory record.</div>';
}
function stackHTML(entry){
  return '<article class="sc-inventory-row" data-inventory-item-id="'+escapeHTML(entry.itemId)+'">'+
    '<div class="sc-inventory-row-top"><h4>'+escapeHTML(entry.name)+'</h4><span class="rarity">'+escapeHTML(entry.rarity.toUpperCase())+'</span></div>'+
    '<div class="sc-inventory-row-meta"><span class="sc-inventory-chip">OWNED ×'+entry.quantity+'</span>'+
    (entry.prepared?'<span class="sc-inventory-chip is-prepared">BATTLE POUCH · PREPARED</span>':'<span class="sc-inventory-chip">NOT PREPARED</span>')+
    '<span class="sc-inventory-chip">'+escapeHTML(entry.type.toUpperCase())+'</span></div>'+
    (entry.description?'<p>'+escapeHTML(entry.description)+'</p>':"")+sourceHTML(entry)+"</article>";
}
function durableHTML(entry){
  const equipment=entry.equipment;
  const state=!equipment.equipped?'<span class="sc-inventory-chip">UNEQUIPPED</span>':equipment.verified
    ?'<span class="sc-inventory-chip is-equipped">EQUIPPED · '+escapeHTML(equipment.equippedByLabel||equipment.equippedBy)+'</span>'
    :'<span class="sc-inventory-chip is-warning">EQUIPMENT LINK UNVERIFIED · '+escapeHTML(equipment.equippedByLabel||equipment.equippedBy)+'</span>';
  return '<article class="sc-inventory-row" data-inventory-instance-id="'+escapeHTML(entry.instanceId||"")+'">'+
    '<div class="sc-inventory-row-top"><h4>'+escapeHTML(entry.name)+'</h4><span class="rarity">'+escapeHTML(entry.rarity.toUpperCase())+'</span></div>'+
    '<div class="sc-inventory-row-meta"><span class="sc-inventory-chip">OWNED INSTANCE</span>'+state+'<span class="sc-inventory-chip">'+escapeHTML(entry.type.toUpperCase())+'</span></div>'+
    '<p>INSTANCE · '+escapeHTML(entry.instanceId||"UNAVAILABLE")+'</p>'+(entry.description?'<p>'+escapeHTML(entry.description)+'</p>':"")+sourceHTML(entry)+"</article>";
}
function render(container){
  if(!container)return false;ensureStyles();
  const data=snapshot(),s=data.summary;
  container.innerHTML='<section class="sc-inventory-core" aria-label="Inventory">'+
    '<header class="sc-inventory-head"><div><span>PERSISTENT OWNERSHIP · READ ONLY</span><h2>INVENTORY</h2><p>Owned quantities and durable instances are projected from committed Inventory state. Battle Pouch preparation and equipment are shown separately; opening this screen grants nothing.</p></div><button type="button" class="sc-inventory-close" onclick="closeOverlay()" aria-label="Close Inventory">✕</button></header>'+
    '<div class="sc-inventory-summary"><div><strong>'+s.stackIdentities+'</strong><span>STACKS</span></div><div><strong>'+s.stackUnits+'</strong><span>STACK UNITS</span></div><div><strong>'+s.durableInstances+'</strong><span>DURABLE INSTANCES</span></div><div><strong>'+s.equippedInstances+'</strong><span>EQUIPPED</span></div><div><strong>'+s.preparedStacks+'</strong><span>PREPARED STACKS</span></div></div>'+
    '<main class="sc-inventory-body"><section class="sc-inventory-section"><header><div><span>FUNGIBLE OWNERSHIP</span><h3>ITEMS & MATERIALS</h3></div><small>'+s.stackUnits+' OWNED UNITS</small></header><div class="sc-inventory-list">'+
    (data.stacks.length?data.stacks.map(stackHTML).join(""):'<div class="sc-inventory-empty">No owned stackable Items or materials are currently recorded.</div>')+
    '</div></section><section class="sc-inventory-section"><header><div><span>EXACT PERSISTENT OBJECTS</span><h3>DURABLE EQUIPMENT & TOOLS</h3></div><small>'+s.durableInstances+' INSTANCES</small></header><div class="sc-inventory-list">'+
    (data.durable.length?data.durable.map(durableHTML).join(""):'<div class="sc-inventory-empty">No durable Inventory instances are currently recorded.</div>')+
    '</div></section></main><footer class="sc-inventory-foot">Owned ≠ equipped. Owned Item quantity ≠ Battle Pouch preparation. Source history is displayed only when an exact committed reference exists. Loadout, Shop and Crafting remain separate systems.</footer></section>';
  return true;
}
function open(){
  if(!priorOpenOverlay)return{success:false,reason:"overlay_runtime_missing"};
  const result=priorOpenOverlay("inventory"),container=typeof document!=="undefined"?document.getElementById("overlay-content-container"):null;
  if(!container)return{success:false,reason:"overlay_container_missing"};
  render(container);
  try{if(typeof globalThis.setAlphaSurfaceTruthActiveRoute==="function")globalThis.setAlphaSurfaceTruthActiveRoute("inventory");}catch(_error){}
  return{success:true,type:"inventory",priorResult:result||null};
}
function inventoryOpenOverlay(type){if(type==="inventory")return open();return priorOpenOverlay?priorOpenOverlay.apply(this,arguments):undefined;}
function diagnostics(){
  const source=String(snapshot)+"\n"+String(render)+"\n"+String(open),data=snapshot();
  const checks={
    readsCanonicalInventory:source.includes("pd.inventory")||String(snapshot).includes("pd.inventory"),
    projectsBattlePouchSeparately:String(preparedItemIds).includes("battlePouch"),
    projectsEquipmentSeparately:String(equipmentProjection).includes("character.equipment"),
    noOwnershipWriterInPresentation:!source.includes("inventory.push")&&!source.includes("addItemToInventory")&&!source.includes("equipItemToCharacter"),
    noPersistenceWriterInPresentation:!source.includes("savePlayerData")&&!source.includes("localStorage"),
    noShopOrCraftingMutation:!source.includes("commitPurchase")&&!source.includes("craftOperation"),
    noUICreatedProvenance:String(exactSourceProjection).includes("sourceRefs")&&!String(render).includes("appendProvenanceEvent"),
    distinctDurableIdentity:data.durable.every(row=>!!row.instanceId),browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,summary:clone(data.summary),browserGoldenClaimed:false};
}
function provenanceDiagnostics54500(){
  const state=readProvenanceState();
  const objects=state?Object.values(state.objectsByInstanceId):[],receipts=state?Object.values(state.acquisitionReceipts):[];
  const checks={
    canonicalInventoryWriterConsumed:String(commitDurableInventoryAcquisition54500).includes("globalThis.addItemToInventory"),
    noSecondOwnershipArray:!String(commitDurableInventoryAcquisition54500).includes("ownedObjects")&&!String(ensureProvenanceState).includes("ownedObjects"),
    objectsDoNotOwnEquipment:objects.every(row=>row&&!Object.prototype.hasOwnProperty.call(row,"equippedBy")&&!Object.prototype.hasOwnProperty.call(row,"owned")),
    receiptsAddressExactInstances:receipts.every(row=>row&&row.instanceId&&row.itemId&&row.sourceOccurrenceId&&row.sourceId&&row.committed===true),
    historyHasNoPowerScore:objects.every(row=>!Object.prototype.hasOwnProperty.call(row,"power")&&!Object.prototype.hasOwnProperty.call(row,"plBonus")&&!Object.prototype.hasOwnProperty.call(row,"provenanceScore")),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,objectCount:objects.length,receiptCount:receipts.length,browserGoldenClaimed:false};
}

if(priorOpenOverlay){globalThis.openOverlay=inventoryOpenOverlay;try{openOverlay=inventoryOpenOverlay;}catch(_error){}}
globalThis.getPhase2InventorySnapshot46100=snapshot;
globalThis.renderPhase2InventoryCore46100=render;
globalThis.openPhase2InventoryCore46100=open;
globalThis.runPhase2InventoryCore46100Diagnostics=diagnostics;
globalThis.getDurableObjectRecord54500=getDurableObjectRecord54500;
globalThis.getDurableAcquisitionReceipt54500=getDurableAcquisitionReceipt54500;
globalThis.appendDurableObjectProvenanceEvent54500=appendProvenanceEvent54500;
globalThis.registerPreexistingDurableObject54500=registerPreexistingDurableObject54500;
globalThis.commitDurableInventoryAcquisition54500=commitDurableInventoryAcquisition54500;
globalThis.runDurableObjectProvenance54500Diagnostics=provenanceDiagnostics54500;
globalThis.SC_PHASE2_INVENTORY_CORE_46100=Object.freeze({patchId:PATCH_ID,provenanceAuthority:"#148/#545",browserGoldenClaimed:false});
})();