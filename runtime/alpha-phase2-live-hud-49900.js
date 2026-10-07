// ============================================================================
// PHASE 2 — KONOHA / REGION / WORLD LIVE HUD — #499
//
// Read-only projection over existing Chronicle, Registry/Rank, currentTeam,
// Journey and map-navigation authority. This module owns no persistent state.
// ============================================================================
(function installPhase2LiveHud49900(){
"use strict";
if(globalThis.SC_PHASE2_LIVE_HUD_49900)return;

const PATCH_ID="phase2_live_hud_49900_2026_10_03";
const ROOT_ID="sc-phase2-live-hud-49900";
const STYLE_ID="sc-phase2-live-hud-49900-style";
const BRAND_PATH="Logo/sc_title.png";
const MAP_ECHO_STAGE_ID="sc-hud499-stage-echo";
const MAP_OVERLAYS=new Set(["village","region","region_map","world","world_map"]);
const state={lastSignature:null,timer:null};

function clone(value){
  try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}
  catch(_error){return value;}
}
function esc(value){
  return String(value==null?"":value)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}
function call(name,...args){
  try{
    const fn=globalThis[name];
    return typeof fn==="function"?fn(...args):null;
  }catch(_error){return null;}
}
function scalar(value){
  if(value==null)return null;
  if(typeof value==="string"||typeof value==="number")return String(value);
  if(typeof value==="object"){
    for(const key of ["label","name","displayName","title","value"]){
      if(value[key]!=null&&String(value[key]).trim())return String(value[key]);
    }
  }
  return null;
}
function currentPlayer(){
  try{return typeof playerData!=="undefined"&&playerData?playerData:null;}
  catch(_error){return null;}
}
function acquisition(){
  const ensured=call("ensurePlayerAcquisitionState");
  if(ensured&&typeof ensured==="object")return ensured;
  const pd=currentPlayer();
  return pd&&pd.acquisition&&typeof pd.acquisition==="object"?pd.acquisition:null;
}
function activeSubjectId(){
  const canonical=call("getAlphaSurfaceTruthSubjectId");
  if(canonical)return String(canonical);
  const a=acquisition();
  return a&&String(a.chronicleOriginVariantId||a.ninjaIdentityVariantId||a.chronicleOriginOwnedCharacterId||"")||null;
}
function presentationVariantId(id){
  if(!id)return null;
  const stable=String(id);
  const chronicle=call("getChronicleIdentity43600");
  if(chronicle&&String(chronicle.ownedCharacterId||"")===stable&&chronicle.variantId)return String(chronicle.variantId);
  const a=acquisition();
  if(a){
    if(String(a.chronicleOriginOwnedCharacterId||"")===stable&&a.chronicleOriginVariantId)return String(a.chronicleOriginVariantId);
    if(String(a.ninjaIdentityOwnedCharacterId||"")===stable&&a.ninjaIdentityVariantId)return String(a.ninjaIdentityVariantId);
  }
  return stable;
}
function characterFor(id){
  if(!id)return null;
  const direct=call("getPlayerCharacter",id);
  if(direct)return direct;
  const variant=presentationVariantId(id);
  return variant&&variant!==String(id)?call("getPlayerCharacter",variant):null;
}
function displayNameFor(id,character=characterFor(id)){
  const variant=presentationVariantId(id);
  const canonicalPersonName=scalar(call("getProductionRuntimePersonName",variant||id));
  if(canonicalPersonName)return canonicalPersonName;
  if(character){
    const value=scalar(character.playerFacingName||character.displayName||character.name);
    if(value)return value;
  }
  const registry=call("getCharacterRegistryEntry",variant)||call("getRegistryCharacter",variant)||call("getCharacterRegistryEntry",id)||call("getRegistryCharacter",id);
  const registryName=registry&&scalar(registry.displayName||registry.name);
  if(registryName)return registryName;
  return String(variant||id||"SHINOBI").replace(/^academy_/,"").replaceAll("_"," ").replace(/\b\w/g,ch=>ch.toUpperCase());
}
function rankFor(id,character){
  const canonical=scalar(call("getAlphaSurfaceTruthRankLabel",id));
  if(canonical)return canonical;
  const row=character&&scalar(character.rankLabel||character.rank);
  return row||"UNRANKED";
}
function affiliationFor(character){
  try{
    if(typeof getMyClanCharacterAffiliation==="function"){
      const canonical=scalar(getMyClanCharacterAffiliation(character));
      if(canonical!==null)return canonical;
    }
  }catch(_error){}
  const globalCanonical=scalar(call("getMyClanCharacterAffiliation",character));
  if(globalCanonical!==null)return globalCanonical;
  return character&&scalar(character.village||character.allegiance||character.affiliation)||null;
}
function portraitPathFrom(value){
  if(!value)return null;
  if(typeof value==="string")return value;
  if(typeof value==="object"){
    for(const key of ["assetPath","path","src","image","portraitPath","uiPortraitPath"]){
      if(value[key]&&typeof value[key]==="string")return value[key];
    }
  }
  return null;
}
function portraitFor(id,character=characterFor(id)){
  if(!id)return null;
  const variant=presentationVariantId(id);
  const attempts=[
    ()=>call("resolveUIPortraitProjection",variant),
    ()=>call("resolveUIPortraitProjection",id),
    ()=>call("resolveUIPortraitProjection",character||variant||id),
    ()=>call("resolveUIPortraitProjection",{variantId:variant||id,character:character||null}),
    ()=>call("getUIPortraitAssetPath",variant),
    ()=>call("getUIPortraitAssetPath",id),
    ()=>call("getUIPortraitAssetPath",character||variant||id)
  ];
  for(const attempt of attempts){
    const path=portraitPathFrom(attempt());
    if(path)return path;
  }
  return portraitPathFrom(character&&(
    character.uiPortrait||character.uiPortraitPath||character.portraitUI||character.portrait
  ));
}
function currentRyo(){
  const canonical=call("getChronicleCurrentRyo43600");
  if(Number.isFinite(Number(canonical)))return Number(canonical);
  const pd=currentPlayer();
  return Number(pd&&pd.ryo)||0;
}
function currentTeam(){
  const team=call("getChronicleCurrentTeam43600");
  if(!team||!Array.isArray(team.teamVariantIds))return null;
  return clone(team);
}
function journeyProjection(){
  const journey=call("getAlphaTailedBeastJourneyState");
  if(!journey)return null;
  const action=call("getAlphaSurfaceTruthJourneyAction",journey);
  if(!action)return null;
  const label=scalar(action.label);
  const detail=scalar(action.detail);
  if(!label&&!detail)return null;
  return{
    label:label||"CURRENT JOURNEY",
    detail:detail||null
  };
}
function currentOverlay(){
  if(typeof document==="undefined"){
    try{return typeof currentOverlayType!=="undefined"&&currentOverlayType?String(currentOverlayType):null;}
    catch(_error){return null;}
  }
  const overlay=document.getElementById("screen-overlay");
  if(!overlay)return null;
  try{
    if(getComputedStyle(overlay).display==="none"||overlay.hidden)return null;
  }catch(_error){
    if(overlay.style&&overlay.style.display==="none")return null;
  }
  try{
    if(typeof currentOverlayType!=="undefined"&&currentOverlayType)return String(currentOverlayType);
  }catch(_error){}
  return "unknown_overlay";
}
function storyActive(){
  const active=call("getActiveStorySceneRuntime");
  return !!(active&&active.sceneId);
}
function battleActive(){
  try{return !!(typeof currentBattle!=="undefined"&&currentBattle&&currentBattle.active===true&&!currentBattle.battleOver);}
  catch(_error){return false;}
}
function surfaceProjection(){
  if(storyActive())return{visible:false,kind:"story",overlay:"story_scene"};
  if(battleActive())return{visible:false,kind:"battle",overlay:"battle"};
  const overlay=currentOverlay();
  if(!overlay)return{visible:true,kind:"world",overlay:null};
  if(MAP_OVERLAYS.has(overlay)){
    if(overlay==="village")return{visible:true,kind:"village",overlay};
    if(overlay==="region"||overlay==="region_map")return{visible:true,kind:"region",overlay};
    return{visible:true,kind:"world",overlay};
  }
  return{visible:false,kind:"deep",overlay};
}
function identityProjection(){
  const id=activeSubjectId();
  if(!id)return null;
  const character=characterFor(id);
  return{
    id,
    variantId:presentationVariantId(id),
    name:displayNameFor(id,character),
    rank:rankFor(id,character),
    affiliation:affiliationFor(character),
    portrait:portraitFor(id,character)
  };
}
function teamProjection(){
  const team=currentTeam();
  if(!team)return[];
  return team.teamVariantIds.map(id=>{
    const character=characterFor(id);
    return{
      id:String(id),
      name:displayNameFor(id,character),
      portrait:portraitFor(id,character)
    };
  });
}
function navigationProjection(surface){
  const rows=[];
  const freePlay=call("isAcademyFreePlayAvailable")===true;
  if(surface.kind==="world"&&freePlay&&typeof globalThis["openOverlay"]==="function"){
    rows.push({id:"village",label:"VILLAGE"});
  }else if(surface.kind==="village"){
    if(typeof globalThis["openRegionHub"]==="function")rows.push({id:"region",label:"REGION"});
    if(typeof globalThis["returnToWorldMap"]==="function"||typeof globalThis["closeOverlay"]==="function")rows.push({id:"world",label:"WORLD MAP"});
  }else if(surface.kind==="region"){
    if(freePlay&&typeof globalThis["openOverlay"]==="function")rows.push({id:"village",label:"VILLAGE"});
    if(typeof globalThis["returnToWorldMap"]==="function"||typeof globalThis["closeOverlay"]==="function")rows.push({id:"world",label:"WORLD MAP"});
  }
  return rows;
}
function snapshot(){
  const surface=surfaceProjection();
  const identity=identityProjection();
  return{
    patchId:PATCH_ID,
    visible:surface.visible&&!!identity,
    surface,
    identity,
    ryo:currentRyo(),
    team:teamProjection(),
    journey:journeyProjection(),
    navigation:navigationProjection(surface),
    energy:null
  };
}
function imageMarkup(path,name,extraClass=""){
  return path
    ?'<img class="'+extraClass+'" src="'+esc(path)+'" alt="" draggable="false">'
    :'<span class="sc-hud499-silhouette '+extraClass+'" aria-hidden="true">'+esc((name||"?").slice(0,1))+'</span>';
}
function teamMarkup(rows){
  if(!rows.length)return"";
  return '<section class="sc-hud499-team" data-hud499-action="clan" aria-label="Current Team: '+esc(rows.map(r=>r.name).join(", "))+'">'+
    '<span class="sc-hud499-kicker">CURRENT TEAM</span>'+
    '<span class="sc-hud499-team-stack">'+rows.map(row=>
      '<button type="button" class="sc-hud499-team-member" data-hud499-action="clan" data-team-variant-id="'+esc(row.id)+'" aria-label="'+esc(row.name)+'. Open My Clan." title="'+esc(row.name)+'">'+
      imageMarkup(row.portrait,row.name,"sc-hud499-team-portrait")+
      '<span class="sc-hud499-team-name">'+esc(row.name)+'</span></button>'
    ).join("")+'</span></section>';
}
function brandMarkup(surfaceKind){
  if(surfaceKind!=="world")return"";
  return '<div class="sc-hud499-brand" aria-label="Shinobi Chronicles">'+
    '<img src="'+esc(BRAND_PATH)+'" alt="Shinobi Chronicles" draggable="false">'+
  '</div>';
}
function toolsMarkup(){
  return '<details class="sc-hud499-tools">'+
    '<summary aria-label="Open player tools"><span>PLAYER TOOLS</span><b aria-hidden="true">＋</b></summary>'+
    '<nav aria-label="Player tools">'+
      '<button type="button" data-hud499-action="clan">MY CLAN</button>'+
      '<button type="button" data-hud499-action="inventory">INVENTORY</button>'+
      '<button type="button" data-hud499-action="record">SHINOBI RECORD</button>'+
      '<button type="button" data-hud499-action="journey">JOURNEY</button>'+
    '</nav>'+
  '</details>';
}
function contextMarkup(surfaceKind){
  if(surfaceKind!=="region"&&surfaceKind!=="village")return"";
  return '<aside class="sc-hud499-context" data-active="false" aria-live="polite" aria-atomic="true" aria-label="Map context"></aside>';
}
function regionContextProjection(node){
  if(!node)return null;
  const hotspotId=node.dataset&&node.dataset.hotspotId||null;
  const regionKey=node.dataset&&node.dataset.regionKey||null;
  if(!hotspotId||!regionKey)return null;
  let hotspot=null;
  try{
    if(typeof getHotspotProjection==="function")hotspot=getHotspotProjection(regionKey,hotspotId);
  }catch(_error){}
  if(!hotspot)hotspot=call("getHotspotProjection",regionKey,hotspotId);
  if(!hotspot)return null;
  const label=scalar(hotspot.knownLabel)||"???";
  const known=label!=="???";
  if(!known){
    return{surface:"region",name:"???",category:"UNKNOWN",summary:null,interaction:null,status:null,unknown:true};
  }
  const opportunities=Array.isArray(hotspot.opportunities)?hotspot.opportunities:[];
  const knownOpportunity=opportunities.find(item=>item&&item.known_label&&item.known_label!=="???")||opportunities[0]||null;
  const actions=knownOpportunity&&Array.isArray(knownOpportunity.legal_actions)?knownOpportunity.legal_actions:[];
  const available=actions.filter(action=>action&&action.available===true);
  const blocker=actions.find(action=>action&&action.available!==true&&action.knownBlocker);
  const categoryParts=[];
  if(hotspot.presentationFamily)categoryParts.push(String(hotspot.presentationFamily));
  if(knownOpportunity&&knownOpportunity.opportunity_category&&knownOpportunity.opportunity_category!=="OTHER"&&knownOpportunity.opportunity_category!=="UNKNOWN"){
    categoryParts.push(String(knownOpportunity.opportunity_category).replaceAll("_"," "));
  }
  let interaction=null;
  if(Number(hotspot.aggregationCount)>1||available.length>1)interaction="DOUBLE-CLICK TO REVIEW";
  else if(available.length===1)interaction=scalar(available[0].label)||"DOUBLE-CLICK TO ENTER";
  else if(node.getAttribute("aria-label")&&/double-click to enter/i.test(node.getAttribute("aria-label")))interaction="DOUBLE-CLICK TO ENTER";
  const status=available.length?"AVAILABLE":(blocker&&blocker.knownBlocker?String(blocker.knownBlocker).replaceAll("_"," ").toUpperCase():null);
  return{
    surface:"region",
    name:label,
    category:categoryParts.join(" · ")||null,
    summary:scalar(hotspot.knownSummary)||null,
    interaction,
    status,
    unknown:false
  };
}
function villageContextProjection(node){
  if(!node)return null;
  const labelNode=node.querySelector(".village-golden-halo-label,.village-map-hotspot-label");
  const aria=String(node.getAttribute("aria-label")||"").trim();
  const title=String(node.getAttribute("title")||"").trim();
  let name=labelNode&&String(labelNode.textContent||"").trim()||title||aria.replace(/\.\s*Double-click to enter\.?$/i,"").replace(/^Enter\s+/i,"").trim();
  if(!name)return null;
  const unknown=/^\?+$/.test(name)||/^unknown$/i.test(name);
  if(unknown)return{surface:"village",name:"???",category:"UNKNOWN",summary:null,interaction:null,status:null,unknown:true};
  const interaction=/double-click to enter/i.test(aria)?"DOUBLE-CLICK TO ENTER":null;
  return{surface:"village",name,category:null,summary:null,interaction,status:null,unknown:false};
}
function mapContextNode(target){
  if(!target||typeof target.closest!=="function")return null;
  return target.closest(".region-hotspot,[data-village-hotspot-id],.village-map-hotspot");
}
function contextProjectionForNode(node){
  if(!node||typeof document==="undefined")return null;
  const root=document.getElementById(ROOT_ID);
  if(!root||root.hidden)return null;
  if(root.dataset.surface==="region"&&node.closest(".region-map-pane"))return regionContextProjection(node);
  if(root.dataset.surface==="village"&&node.closest(".village-map-screen"))return villageContextProjection(node);
  return null;
}
function renderContextProjection(projection){
  if(typeof document==="undefined")return false;
  const root=document.getElementById(ROOT_ID);
  const panel=root&&root.querySelector(".sc-hud499-context");
  if(!panel)return false;
  if(!projection){
    panel.dataset.active="false";
    panel.innerHTML="";
    return true;
  }
  panel.dataset.active="true";
  panel.innerHTML=
    '<span class="sc-hud499-kicker">MAP CONTEXT</span>'+
    '<strong class="sc-hud499-context-name">'+esc(projection.name||"???")+'</strong>'+
    (projection.category?'<small class="sc-hud499-context-category">'+esc(projection.category)+'</small>':'')+
    (projection.summary?'<p>'+esc(projection.summary)+'</p>':'')+
    (projection.interaction?'<div class="sc-hud499-context-row"><span>INTERACTION</span><b>'+esc(projection.interaction)+'</b></div>':'')+
    (projection.status?'<div class="sc-hud499-context-row"><span>STATUS</span><b>'+esc(projection.status)+'</b></div>':'');
  return true;
}
function presentMapContextFromTarget(target){
  const node=mapContextNode(target);
  if(!node)return false;
  const projection=contextProjectionForNode(node);
  if(!projection)return false;
  return renderContextProjection(projection);
}
function syncMapContextFromDocument(){
  if(typeof document==="undefined")return false;
  const root=document.getElementById(ROOT_ID);
  if(!root||root.hidden||!["region","village"].includes(root.dataset.surface))return renderContextProjection(null);
  const focused=mapContextNode(document.activeElement);
  if(focused&&contextProjectionForNode(focused))return presentMapContextFromTarget(focused);
  const hovered=document.querySelector(".region-hotspot:hover,[data-village-hotspot-id]:hover,.village-map-hotspot:hover");
  if(hovered&&contextProjectionForNode(hovered))return presentMapContextFromTarget(hovered);
  return renderContextProjection(null);
}
function clearMapContextWhenIdle(node){
  if(typeof document==="undefined")return;
  const finish=()=>{
    const active=document.activeElement;
    const focused=active&&mapContextNode(active);
    let hovered=false;
    try{hovered=!!(node&&node.matches(":hover"));}catch(_error){}
    if(focused||hovered)return;
    renderContextProjection(null);
  };
  if(typeof queueMicrotask==="function")queueMicrotask(finish);
  else setTimeout(finish,0);
}
function onMapContextEnter(event){presentMapContextFromTarget(event&&event.target);}
function onMapContextClick(event){presentMapContextFromTarget(event&&event.target);}
function onMapContextLeave(event){
  const node=mapContextNode(event&&event.target);
  if(!node)return;
  const next=event&&event.relatedTarget;
  if(next&&node.contains(next))return;
  clearMapContextWhenIdle(node);
}
function bindFunctionalMapContext(root,surfaceKind){
  if(typeof document==="undefined"||!root||!["region","village"].includes(surfaceKind))return 0;
  const map=surfaceKind==="region"?document.querySelector(".region-map-pane"):document.querySelector(".village-map-screen");
  if(!map)return 0;
  const selector=surfaceKind==="region"?".region-hotspot[data-hotspot-id][data-region-key]":"[data-village-hotspot-id],.village-map-hotspot";
  let bound=0;
  map.querySelectorAll(selector).forEach(node=>{
    if(node.dataset.hud499ContextBound==="true")return;
    node.dataset.hud499ContextBound="true";
    const present=()=>presentMapContextFromTarget(node);
    const clear=()=>clearMapContextWhenIdle(node);
    node.addEventListener("mouseenter",present,{passive:true});
    node.addEventListener("mouseleave",clear,{passive:true});
    node.addEventListener("focus",present);
    node.addEventListener("blur",clear);
    node.addEventListener("click",present);
    node.addEventListener("pointerup",event=>{
      if(event&&event.pointerType==="touch"&&typeof node.focus==="function"){
        try{node.focus({preventScroll:true});}catch(_error){node.focus();}
      }
      present();
    },{passive:true});
    bound+=1;
  });
  return bound;
}
function navMarkup(rows,surfaceKind){
  if(!rows.length)return"";
  const depth=surfaceKind==="world"?"WORLD":surfaceKind==="region"?"REGION":"VILLAGE";
  return '<nav class="sc-hud499-map-nav" aria-label="Chronicle Compass map navigation">'+
    '<span class="sc-hud499-kicker">CHRONICLE COMPASS</span>'+
    '<strong class="sc-hud499-compass-depth">'+esc(depth)+'</strong>'+
    '<span class="sc-hud499-compass-actions">'+rows.map(row=>
      '<button type="button" data-hud499-action="'+esc(row.id)+'">'+esc(row.label)+'</button>'
    ).join("")+'</span>'+
  '</nav>';
}
function ensureRoot(){
  if(typeof document==="undefined")return null;
  const game=document.querySelector(".game-container");
  if(!game)return null;
  game.classList.add("sc-hud499-installed");
  let root=document.getElementById(ROOT_ID);
  if(root)return root;
  root=document.createElement("section");
  root.id=ROOT_ID;
  root.className="sc-hud499-root";
  root.setAttribute("aria-label","Live Chronicle HUD");
  root.addEventListener("click",onClick);
  game.appendChild(root);
  return root;
}
function clearMapGutterGeometry(root){
  if(!root)return;
  ["--sc-hud499-map-left","--sc-hud499-map-right","--sc-hud499-map-top","--sc-hud499-map-bottom","--sc-hud499-gutter-control-width","--sc-hud499-gutter-right-anchor"].forEach(name=>root.style.removeProperty(name));
  root.dataset.mapGutter="false";
}
function syncMapGutterGeometry(root,surfaceKind){
  if(!root||typeof document==="undefined")return null;
  const selector=surfaceKind==="region"?".region-map-pane":surfaceKind==="village"?".village-map-screen":null;
  if(!selector){clearMapGutterGeometry(root);return null;}
  const map=document.querySelector(selector);
  if(!map){clearMapGutterGeometry(root);return null;}
  const rr=root.getBoundingClientRect();
  const mr=map.getBoundingClientRect();
  if(!(mr.width>0&&mr.height>0&&rr.width>0&&rr.height>0)){clearMapGutterGeometry(root);return null;}
  const left=Math.max(0,mr.left-rr.left);
  const right=Math.max(0,rr.right-mr.right);
  const top=Math.max(0,mr.top-rr.top);
  const bottom=Math.max(0,rr.bottom-mr.bottom);
  const controlWidth=Math.max(112,Math.min(176,right-18));
  const rightAnchor=Math.max(10,right-controlWidth-10);
  root.style.setProperty("--sc-hud499-map-left",left.toFixed(2)+"px");
  root.style.setProperty("--sc-hud499-map-right",right.toFixed(2)+"px");
  root.style.setProperty("--sc-hud499-map-top",top.toFixed(2)+"px");
  root.style.setProperty("--sc-hud499-map-bottom",bottom.toFixed(2)+"px");
  root.style.setProperty("--sc-hud499-gutter-control-width",controlWidth.toFixed(2)+"px");
  root.style.setProperty("--sc-hud499-gutter-right-anchor",rightAnchor.toFixed(2)+"px");
  root.dataset.mapGutter="true";
  return{selector,left,right,top,bottom,controlWidth,rightAnchor};
}
function ensureMapEchoStage(){
  if(typeof document==="undefined")return null;
  const box=document.querySelector(".overlay-content-box");
  if(!box)return null;
  let echo=document.getElementById(MAP_ECHO_STAGE_ID);
  if(echo&&echo.parentElement!==box){
    echo.remove();
    echo=null;
  }
  if(!echo){
    echo=document.createElement("div");
    echo.id=MAP_ECHO_STAGE_ID;
    echo.className="sc-hud499-stage-echo";
    echo.setAttribute("aria-hidden","true");
    echo.innerHTML='<span class="sc-hud499-stage-echo-layer"></span><span class="sc-hud499-stage-echo-vignette"></span>';
    box.insertBefore(echo,box.firstChild);
  }
  return echo;
}
function clearMapEchoPresentation(root){
  if(root){
    root.dataset.mapEcho="false";
    delete root.dataset.mapEchoSource;
  }
  const echo=typeof document!=="undefined"?document.getElementById(MAP_ECHO_STAGE_ID):null;
  if(echo)echo.remove();
  const box=typeof document!=="undefined"?document.querySelector(".overlay-content-box"):null;
  if(box){
    box.classList.remove("sc-hud499-map-echo-active");
    ["--sc-hud499-echo-map-left","--sc-hud499-echo-map-top","--sc-hud499-echo-map-width","--sc-hud499-echo-map-height"].forEach(name=>box.style.removeProperty(name));
  }
  return true;
}
function syncMapEchoPresentation(root,surfaceKind){
  if(!root||typeof document==="undefined")return null;
  const selector=surfaceKind==="region"?".region-map-pane":surfaceKind==="village"?".village-map-screen":null;
  if(!selector){clearMapEchoPresentation(root);return null;}
  const map=document.querySelector(selector);
  const image=map&&map.querySelector(".region-map-image,.village-map-image");
  const box=map&&map.closest(".overlay-content-box");
  if(!map||!image||!box){clearMapEchoPresentation(root);return null;}
  const sourceAttr=String(image.getAttribute("src")||"").trim();
  const source=String(image.currentSrc||image.src||sourceAttr).trim();
  if(!source){clearMapEchoPresentation(root);return null;}
  const echo=ensureMapEchoStage();
  const layer=echo&&echo.querySelector(".sc-hud499-stage-echo-layer");
  if(!echo||!layer){clearMapEchoPresentation(root);return null;}

  const br=box.getBoundingClientRect();
  const mr=map.getBoundingClientRect();
  if(!(br.width>0&&br.height>0&&mr.width>0&&mr.height>0)){clearMapEchoPresentation(root);return null;}

  layer.style.backgroundImage='url("'+source.replace(/"/g,"%22")+'")';
  echo.dataset.surface=surfaceKind;
  echo.dataset.source=sourceAttr||source;
  box.classList.add("sc-hud499-map-echo-active");
  box.style.setProperty("--sc-hud499-echo-map-left",Math.max(0,mr.left-br.left).toFixed(2)+"px");
  box.style.setProperty("--sc-hud499-echo-map-top",Math.max(0,mr.top-br.top).toFixed(2)+"px");
  box.style.setProperty("--sc-hud499-echo-map-width",mr.width.toFixed(2)+"px");
  box.style.setProperty("--sc-hud499-echo-map-height",mr.height.toFixed(2)+"px");
  root.dataset.mapEcho="true";
  root.dataset.mapEchoSource=sourceAttr||source;
  return{
    source:sourceAttr||source,
    selector,
    stageKind:"single_coherent_full_stage",
    mapRect:{
      left:Math.max(0,mr.left-br.left),
      top:Math.max(0,mr.top-br.top),
      width:mr.width,
      height:mr.height
    },
    presentationOnly:true,
    pointerInteractive:false
  };
}
function render(force=false){
  const root=ensureRoot();
  if(!root)return false;
  const data=snapshot();
  root.hidden=!data.visible;
  if(root.dataset.surface!==data.surface.kind)root.dataset.surface=data.surface.kind;
  syncMapGutterGeometry(root,data.surface.kind);
  syncMapEchoPresentation(root,data.surface.kind);
  bindFunctionalMapContext(root,data.surface.kind);
  syncMapContextFromDocument();
  const signature=JSON.stringify(data);
  if(!force&&signature===state.lastSignature)return data;
  state.lastSignature=signature;
  if(!data.visible){
    root.innerHTML="";
    return data;
  }
  const identity=data.identity;
  const journey=data.journey;
  root.innerHTML=
    brandMarkup(data.surface.kind)+
    '<section class="sc-hud499-state-cluster" aria-label="Current shinobi state">'+
      '<div class="sc-hud499-state-main">'+
        '<div class="sc-hud499-identity" data-subject-id="'+esc(identity.id)+'">'+
          imageMarkup(identity.portrait,identity.name,"sc-hud499-identity-portrait")+
          '<span class="sc-hud499-identity-copy"><strong>'+esc(identity.name)+'</strong>'+
            '<span><b>'+esc(identity.rank)+'</b>'+(identity.affiliation?' · '+esc(identity.affiliation):'')+'</span></span>'+
        '</div>'+
        '<div class="sc-hud499-ryo" aria-label="Current Ryō"><span>RYŌ</span><strong data-hud499-ryo>'+esc(data.ryo)+'</strong></div>'+
      '</div>'+
      (journey?'<button type="button" class="sc-hud499-journey" data-hud499-action="journey" title="'+esc(journey.detail||journey.label)+'">'+
        '<span>CURRENT JOURNEY</span><strong>'+esc(journey.label)+'</strong>'+
        (journey.detail?'<small>'+esc(journey.detail)+'</small>':'')+'</button>':'')+
    '</section>'+
    teamMarkup(data.team)+
    toolsMarkup()+
    contextMarkup(data.surface.kind)+
    navMarkup(data.navigation,data.surface.kind);
  syncMapGutterGeometry(root,data.surface.kind);
  syncMapEchoPresentation(root,data.surface.kind);
  bindFunctionalMapContext(root,data.surface.kind);
  syncMapContextFromDocument();
  return data;
}
function scheduleRefresh(){
  if(typeof queueMicrotask==="function")queueMicrotask(()=>render(true));
  else if(typeof setTimeout==="function")setTimeout(()=>render(true),0);
}
function routeAction(action){
  if(action==="clan"&&typeof globalThis["openOverlay"]==="function")return call("openOverlay","clan");
  if(action==="inventory"&&typeof globalThis["openOverlay"]==="function")return call("openOverlay","inventory");
  if(action==="journey"&&typeof globalThis["openOverlay"]==="function")return call("openOverlay","missions");
  if(action==="record"&&typeof globalThis["openShinobiRecord"]==="function")return call("openShinobiRecord","overview");
  if(action==="village"&&typeof globalThis["openOverlay"]==="function")return call("openOverlay","village");
  if(action==="region"&&typeof globalThis["openRegionHub"]==="function")return call("openRegionHub","fire");
  if(action==="world"&&typeof globalThis["returnToWorldMap"]==="function")return call("returnToWorldMap");
  if(action==="world"&&typeof globalThis["closeOverlay"]==="function")return call("closeOverlay");
  return{success:false,reason:"hud_navigation_unavailable",action};
}
function onClick(event){
  const node=event&&event.target&&typeof event.target.closest==="function"?event.target.closest("[data-hud499-action]"):null;
  if(!node)return;
  const action=node.getAttribute("data-hud499-action");
  routeAction(action);
  scheduleRefresh();
}
function installStyles(){
  if(typeof document==="undefined"||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=`
    .game-container.sc-hud499-installed>.game-header{display:none!important}
    .game-container.sc-hud499-installed .world-map-viewport>.map-sidebar-left{display:none!important}
    .game-container.sc-hud499-installed .world-map-viewport{position:relative;min-height:0;grid-template-columns:minmax(0,1fr)}
    .game-container.sc-hud499-installed .world-map-display{grid-column:1;width:100%;max-width:none;padding:8px 14px 12px}
    .sc-hud499-root{--sc-hud499-edge:14px;--sc-hud499-safe-bottom:clamp(72px,8vh,96px);position:absolute;inset:0;z-index:1400;pointer-events:none;font-family:Inter,Arial,sans-serif;color:#edf5f7}
    .sc-hud499-root[hidden]{display:none!important}
    .sc-hud499-root button,.sc-hud499-root summary{font:inherit;color:inherit}
    .overlay-content-box.sc-hud499-map-echo-active{background:linear-gradient(145deg,rgba(7,13,18,.40),rgba(3,8,12,.44))}
    .overlay-content-box.sc-hud499-map-echo-active>#overlay-content-container{position:relative;z-index:1;background:transparent!important}
    .sc-hud499-stage-echo{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none!important;user-select:none}
    .sc-hud499-stage-echo-layer{position:absolute;inset:-30px;display:block;pointer-events:none!important;background-repeat:no-repeat;background-position:center;background-size:cover;filter:blur(14px) saturate(.70) brightness(.62) contrast(.94);opacity:.90;transform:scale(1.045);transform-origin:center}
    .sc-hud499-stage-echo-vignette{position:absolute;inset:0;display:block;pointer-events:none!important;background:
      linear-gradient(180deg,rgba(2,6,9,.14),rgba(2,6,9,.05) 28%,rgba(2,6,9,.06) 72%,rgba(1,4,7,.22)),
      radial-gradient(ellipse at center,rgba(0,0,0,0) 38%,rgba(1,4,7,.08) 66%,rgba(1,4,7,.46) 100%)}
    .overlay-content-box.sc-hud499-map-echo-active .region-map-pane,
    .overlay-content-box.sc-hud499-map-echo-active .village-map-screen{box-shadow:0 16px 44px rgba(0,0,0,.50),0 0 34px rgba(160,190,185,.10)!important}
    .sc-hud499-brand{z-index:2;position:absolute;left:18px;top:14px;width:clamp(210px,18vw,300px);pointer-events:none;filter:drop-shadow(0 8px 20px rgba(0,0,0,.45))}
    .sc-hud499-brand img{display:block;width:100%;height:auto;max-height:88px;object-fit:contain;object-position:left top}
    .sc-hud499-state-cluster{z-index:2;position:absolute;right:var(--sc-hud499-edge);top:12px;width:clamp(330px,31vw,470px);pointer-events:auto;overflow:hidden;border:1px solid rgba(195,159,70,.42);border-radius:8px;background:linear-gradient(150deg,rgba(7,14,23,.95),rgba(6,12,20,.82));box-shadow:0 12px 30px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.04);backdrop-filter:blur(6px)}
    .sc-hud499-state-main{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:9px;padding:6px 9px}
    .sc-hud499-identity{display:flex;align-items:center;gap:9px;min-width:0}
    .sc-hud499-identity-portrait,.sc-hud499-silhouette.sc-hud499-identity-portrait{width:44px;height:44px;flex:0 0 44px;object-fit:cover;object-position:top center;border:1px solid rgba(75,215,228,.45);border-radius:5px;background:#111923}
    .sc-hud499-silhouette{display:grid;place-items:center;color:#d4b667;font-weight:900}
    .sc-hud499-identity-copy{display:flex;flex-direction:column;min-width:0;gap:4px}
    .sc-hud499-identity-copy strong{font:800 15px/1.08 Georgia,"Times New Roman",serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .sc-hud499-identity-copy span{font:700 8px/1.25 Arial,sans-serif;letter-spacing:.09em;text-transform:uppercase;color:#aebbc6}
    .sc-hud499-identity-copy b{color:#e4c76f}
    .sc-hud499-ryo{min-width:74px;padding-left:10px;border-left:1px solid rgba(195,159,70,.22);text-align:right}
    .sc-hud499-ryo>span,.sc-hud499-kicker,.sc-hud499-journey>span{display:block;color:#69dce7;font-size:7px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}
    .sc-hud499-ryo strong{display:block;margin-top:3px;color:#efcf72;font:900 17px/1 Georgia,"Times New Roman",serif}
    .sc-hud499-journey{width:100%;min-height:35px;padding:5px 9px 6px;border:0;border-top:1px solid rgba(195,159,70,.2);background:linear-gradient(90deg,rgba(9,20,28,.76),rgba(8,14,22,.34));text-align:left;cursor:pointer}
    .sc-hud499-journey strong{display:block;margin-top:2px;font-size:11px;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .sc-hud499-journey small{display:block;margin-top:2px;color:#aebbc5;font-size:8px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .sc-hud499-team{z-index:2;box-sizing:border-box;position:absolute;left:14px;top:122px;width:72px;max-height:330px;padding:8px 6px 10px;border:0;border-left:1px solid rgba(88,221,233,.42);border-radius:0 8px 8px 0;pointer-events:auto;cursor:pointer;text-align:center;overflow:visible;background:linear-gradient(90deg,rgba(5,11,18,.91),rgba(6,13,20,.68),rgba(6,13,20,.12));box-shadow:8px 12px 24px rgba(0,0,0,.18)}
    .sc-hud499-team::before{content:"";position:absolute;left:-2px;top:34px;bottom:12px;width:3px;background:linear-gradient(180deg,rgba(83,221,232,.82),rgba(198,162,72,.55),rgba(198,162,72,.08));box-shadow:0 0 9px rgba(83,221,232,.13)}
    .sc-hud499-team .sc-hud499-kicker{padding-bottom:6px;font-size:6px;white-space:nowrap}
    .sc-hud499-team-stack{display:flex;flex-direction:column;align-items:center;gap:7px;margin-top:5px}
    .sc-hud499-team-member{appearance:none;position:relative;display:grid;place-items:center;width:56px;height:56px;padding:3px;border:1px solid rgba(195,159,70,.25);border-radius:50%;background:radial-gradient(circle at 50% 32%,rgba(28,43,56,.95),rgba(8,15,23,.96));box-shadow:0 5px 12px rgba(0,0,0,.25);transition:transform 120ms ease,border-color 120ms ease}
    .sc-hud499-team-member:hover{transform:translateX(2px);border-color:rgba(82,220,232,.62)}
    .sc-hud499-team-portrait,.sc-hud499-silhouette.sc-hud499-team-portrait{display:block;width:48px;height:48px;margin:auto;object-fit:cover;object-position:top center;border:1px solid rgba(96,211,224,.3);border-radius:50%;background:#111923}
    .sc-hud499-team-name{position:absolute;left:63px;top:50%;z-index:8;display:block;margin:0;padding:5px 8px;opacity:0;transform:translate(-4px,-50%);border:1px solid rgba(195,159,70,.34);border-radius:4px;background:rgba(6,12,19,.96);box-shadow:0 7px 18px rgba(0,0,0,.34);color:#dfe9ec;font-size:8px;font-weight:800;line-height:1.1;letter-spacing:.04em;white-space:nowrap;pointer-events:none;transition:opacity 120ms ease,transform 120ms ease}
    .sc-hud499-team-member:hover .sc-hud499-team-name,.sc-hud499-team-member:focus .sc-hud499-team-name,.sc-hud499-team-member:focus-visible .sc-hud499-team-name{opacity:1;transform:translate(0,-50%)}
    .sc-hud499-tools{z-index:2;box-sizing:border-box;position:absolute;right:var(--sc-hud499-edge);top:128px;width:148px;pointer-events:auto;border:1px solid rgba(195,159,70,.28);border-radius:7px;background:linear-gradient(145deg,rgba(7,14,22,.93),rgba(6,11,18,.78));box-shadow:0 10px 24px rgba(0,0,0,.26);overflow:hidden}
    .sc-hud499-tools summary{min-height:34px;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:0 10px;cursor:pointer;list-style:none;color:#d7c27f;font-size:8px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
    .sc-hud499-tools summary::-webkit-details-marker{display:none}
    .sc-hud499-tools summary b{color:#69dce7;font-size:15px;line-height:1;font-weight:500;transition:transform 120ms ease}
    .sc-hud499-tools[open] summary b{transform:rotate(45deg)}
    .sc-hud499-tools nav{display:grid;gap:4px;padding:5px;border-top:1px solid rgba(195,159,70,.18)}
    .sc-hud499-tools button{min-height:31px;padding:0 8px;border:1px solid rgba(129,129,101,.28);background:rgba(8,16,24,.78);cursor:pointer;text-align:left;font-size:8px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}
    .sc-hud499-map-nav{z-index:2;box-sizing:border-box;position:absolute;right:var(--sc-hud499-edge);bottom:var(--sc-hud499-safe-bottom);min-width:176px;max-width:248px;padding:8px;pointer-events:auto;border:1px solid rgba(195,159,70,.38);border-radius:9px;background:linear-gradient(145deg,rgba(7,14,22,.94),rgba(6,11,18,.8));box-shadow:0 12px 28px rgba(0,0,0,.3);backdrop-filter:blur(5px)}
    .sc-hud499-compass-depth{display:block;margin-top:3px;color:#e7d8a6;font:800 12px/1 Georgia,"Times New Roman",serif;letter-spacing:.06em}
    .sc-hud499-compass-actions{display:flex;flex-wrap:wrap;gap:4px;margin-top:7px}
    .sc-hud499-map-nav button{min-height:30px;padding:0 9px;border:1px solid rgba(150,133,82,.42);background:rgba(8,14,22,.82);cursor:pointer;font-size:8px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}
    .sc-hud499-journey:hover,.sc-hud499-journey:focus-visible,.sc-hud499-team:hover,.sc-hud499-team-member:focus-visible,.sc-hud499-tools summary:hover,.sc-hud499-tools summary:focus-visible,.sc-hud499-tools button:hover,.sc-hud499-tools button:focus-visible,.sc-hud499-map-nav button:hover,.sc-hud499-map-nav button:focus-visible{outline:2px solid rgba(85,218,231,.72);outline-offset:1px;border-color:rgba(85,218,231,.66)}

    .sc-hud499-root[data-map-gutter="true"][data-surface="region"] .sc-hud499-team,
    .sc-hud499-root[data-map-gutter="true"][data-surface="village"] .sc-hud499-team{
      left:max(var(--sc-hud499-edge),calc(var(--sc-hud499-map-left) - 80px));
      top:max(108px,calc(var(--sc-hud499-map-top) + 14px));
      border-left:0;border-right:1px solid rgba(88,221,233,.46);
      border-radius:8px 0 0 8px;
      background:linear-gradient(90deg,rgba(5,11,18,.45),rgba(6,13,20,.84),rgba(6,13,20,.96));
      box-shadow:8px 0 22px rgba(0,0,0,.2)
    }
    .sc-hud499-root[data-map-gutter="true"][data-surface="region"] .sc-hud499-team::before,
    .sc-hud499-root[data-map-gutter="true"][data-surface="village"] .sc-hud499-team::before{
      left:auto;right:-2px
    }
    .sc-hud499-root[data-map-gutter="true"][data-surface="region"] .sc-hud499-tools,
    .sc-hud499-root[data-map-gutter="true"][data-surface="village"] .sc-hud499-tools{
      left:auto;right:var(--sc-hud499-gutter-right-anchor);
      top:max(112px,calc(var(--sc-hud499-map-top) + 10px));
      width:var(--sc-hud499-gutter-control-width)
    }
    .sc-hud499-root[data-map-gutter="true"][data-surface="region"] .sc-hud499-map-nav,
    .sc-hud499-root[data-map-gutter="true"][data-surface="village"] .sc-hud499-map-nav{
      left:auto;right:var(--sc-hud499-gutter-right-anchor);
      bottom:max(var(--sc-hud499-safe-bottom),calc(var(--sc-hud499-map-bottom) + 10px));
      width:var(--sc-hud499-gutter-control-width);min-width:0;max-width:none
    }
    .sc-hud499-root[data-map-gutter="true"][data-surface="region"] .sc-hud499-tools,
    .sc-hud499-root[data-map-gutter="true"][data-surface="region"] .sc-hud499-map-nav,
    .sc-hud499-root[data-map-gutter="true"][data-surface="village"] .sc-hud499-tools,
    .sc-hud499-root[data-map-gutter="true"][data-surface="village"] .sc-hud499-map-nav{
      border-color:rgba(195,159,70,.34);
      box-shadow:-7px 0 20px rgba(0,0,0,.18),0 10px 24px rgba(0,0,0,.2)
    }

    .sc-hud499-context{z-index:2;display:none}
    .sc-hud499-root[data-map-gutter="true"][data-surface="region"] .sc-hud499-context,
    .sc-hud499-root[data-map-gutter="true"][data-surface="village"] .sc-hud499-context{
      box-sizing:border-box;display:block;position:absolute;left:auto;right:var(--sc-hud499-gutter-right-anchor);
      top:max(166px,calc(var(--sc-hud499-map-top) + 58px));width:var(--sc-hud499-gutter-control-width);
      max-height:min(42vh,310px);padding:10px;overflow:auto;pointer-events:none;
      opacity:0;visibility:hidden;transform:translateX(5px);
      border:1px solid rgba(85,218,231,.24);border-radius:7px;
      background:linear-gradient(145deg,rgba(6,13,20,.94),rgba(5,10,17,.82));
      box-shadow:-7px 0 20px rgba(0,0,0,.17),0 10px 24px rgba(0,0,0,.18);
      transition:opacity 120ms ease,transform 120ms ease,visibility 120ms ease
    }
    .sc-hud499-root[data-map-gutter="true"] .sc-hud499-context[data-active="true"]{
      opacity:1;visibility:visible;transform:none
    }
    .sc-hud499-context-name{display:block;margin-top:5px;color:#ead89b;font:800 13px/1.12 Georgia,"Times New Roman",serif}
    .sc-hud499-context-category{display:block;margin-top:3px;color:#8ea5ad;font-size:7px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
    .sc-hud499-context p{margin:8px 0 0;color:#c6d2d6;font-size:8px;line-height:1.4}
    .sc-hud499-context-row{display:grid;gap:2px;margin-top:8px;padding-top:7px;border-top:1px solid rgba(195,159,70,.16)}
    .sc-hud499-context-row span{color:#82969e;font-size:6px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
    .sc-hud499-context-row b{color:#d9c783;font-size:7px;line-height:1.25;letter-spacing:.04em}
    @media(max-width:1450px){.sc-hud499-brand{width:clamp(190px,17vw,244px)}.sc-hud499-state-cluster{width:clamp(315px,32vw,420px)}.sc-hud499-tools{top:124px;width:138px}.sc-hud499-team{top:116px}}
    @media(max-width:900px){.sc-hud499-root{--sc-hud499-edge:8px;--sc-hud499-safe-bottom:72px}.sc-hud499-brand{left:10px;top:10px;width:170px}.sc-hud499-state-cluster{right:8px;top:8px;width:300px}.sc-hud499-state-main{padding:7px 8px}.sc-hud499-identity-portrait,.sc-hud499-silhouette.sc-hud499-identity-portrait{width:40px;height:40px;flex-basis:40px}.sc-hud499-team{left:8px;top:108px;width:64px}.sc-hud499-team-member{width:50px;height:50px}.sc-hud499-team-portrait,.sc-hud499-silhouette.sc-hud499-team-portrait{width:42px;height:42px}.sc-hud499-tools{right:8px;top:116px;width:128px}.sc-hud499-map-nav{right:8px;bottom:72px;min-width:160px}}
    @media(prefers-reduced-motion:reduce){.sc-hud499-root *{transition:none!important}}
  `;
  document.head.appendChild(style);
}
function diagnostics(){
  const source=[snapshot,render,routeAction,teamProjection,journeyProjection,brandMarkup,toolsMarkup,navMarkup,syncMapGutterGeometry,regionContextProjection,villageContextProjection,renderContextProjection,syncMapContextFromDocument,bindFunctionalMapContext,ensureMapEchoStage,syncMapEchoPresentation,clearMapEchoPresentation].map(String).join("\n");
  const data=snapshot();
  const checks={
    readOnlyProjection:!/savePlayerData\s*\(/.test(source)&&!/localStorage\.setItem\s*\(/.test(source)&&!/confirmAcademyTeamFormation\s*\(/.test(source),
    canonicalTeam:String(currentTeam).includes("getChronicleCurrentTeam43600"),
    canonicalRyo:String(currentRyo).includes("getChronicleCurrentRyo43600"),
    canonicalJourney:String(journeyProjection).includes("getAlphaTailedBeastJourneyState")&&String(journeyProjection).includes("getAlphaSurfaceTruthJourneyAction"),
    canonicalIdentity:String(activeSubjectId).includes("getAlphaSurfaceTruthSubjectId")&&String(presentationVariantId).includes("getChronicleIdentity43600"),
    identityRepresentationSeparated:String(presentationVariantId).includes("ownedCharacterId")&&String(presentationVariantId).includes("variantId"),
    canonicalPortrait:String(portraitFor).includes("resolveUIPortraitProjection")&&String(portraitFor).includes("getUIPortraitAssetPath"),
    exactWorldBrand:BRAND_PATH==="Logo/sc_title.png"&&String(brandMarkup).includes('surfaceKind!=="world"'),
    chronicleCompass:String(navMarkup).includes("CHRONICLE COMPASS"),
    collapsiblePlayerTools:String(toolsMarkup).includes("<details")&&String(toolsMarkup).includes("PLAYER TOOLS"),
    safeBottomReserve:String(installStyles).includes("--sc-hud499-safe-bottom"),
    regionVillageMapGutters:String(syncMapGutterGeometry).includes(".region-map-pane")&&String(syncMapGutterGeometry).includes(".village-map-screen")&&String(installStyles).includes('data-map-gutter="true"'),
    functionalGutterContext:String(regionContextProjection).includes("getHotspotProjection")&&String(regionContextProjection).includes('name:"???"')&&String(villageContextProjection).includes("aria-label")&&String(renderContextProjection).includes("MAP CONTEXT")&&String(bindFunctionalMapContext).includes('addEventListener("focus"')&&String(bindFunctionalMapContext).includes('pointerType==="touch"'),
    contextPresentationOnly:!String(regionContextProjection).includes("savePlayerData")&&!String(villageContextProjection).includes("savePlayerData")&&!String(renderContextProjection).includes("savePlayerData"),
    mapEchoPresentationOnly:String(syncMapEchoPresentation).includes('surfaceKind==="region"')&&String(syncMapEchoPresentation).includes('surfaceKind==="village"')&&String(syncMapEchoPresentation).includes(".region-map-image,.village-map-image")&&String(syncMapEchoPresentation).includes('stageKind:"single_coherent_full_stage"')&&String(syncMapEchoPresentation).includes("pointerInteractive:false")&&!String(syncMapEchoPresentation).includes("savePlayerData")&&!String(syncMapEchoPresentation).includes("localStorage"),
    mapEchoPointerIsolated:String(installStyles).includes(".sc-hud499-stage-echo")&&String(installStyles).includes("pointer-events:none!important"),
    mapEchoVisiblyAtmospheric:String(installStyles).includes("brightness(.62)")&&String(installStyles).includes("opacity:.90")&&String(installStyles).includes("background-size:cover"),
    noEnergyProjection:data.energy===null&&!String(render).includes("ENERGY"),
    canonicalRoutes:String(routeAction).includes('call("openOverlay","clan")')&&String(routeAction).includes('call("openOverlay","inventory")')&&String(routeAction).includes('call("openShinobiRecord","overview")')&&String(routeAction).includes('call("openOverlay","missions")'),
    deepSurfaceSuppression:String(surfaceProjection).includes('kind:"deep"')&&String(surfaceProjection).includes("storyActive")&&String(surfaceProjection).includes("battleActive"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,snapshot:clone(data),browserGoldenClaimed:false};
}

installStyles();
ensureRoot();
render(true);
if(typeof document!=="undefined"){
  const observer=new MutationObserver(()=>scheduleRefresh());
  const game=document.querySelector(".game-container");
  const overlay=document.getElementById("screen-overlay");
  if(game)observer.observe(game,{attributes:true,attributeFilter:["data-alpha-front-door-locked"]});
  if(overlay)observer.observe(overlay,{attributes:true,attributeFilter:["style","class","hidden"]});
  if(typeof setInterval==="function")state.timer=setInterval(()=>render(false),250);
  if(typeof window!=="undefined")window.addEventListener("resize",scheduleRefresh,{passive:true});
  document.addEventListener("pointerover",onMapContextEnter,true);
  document.addEventListener("pointerout",onMapContextLeave,true);
  document.addEventListener("focusin",onMapContextEnter,true);
  document.addEventListener("focusout",onMapContextLeave,true);
  document.addEventListener("click",onMapContextClick,true);
}

globalThis.getPhase2LiveHudSnapshot49900=snapshot;
globalThis.refreshPhase2LiveHud49900=()=>render(true);
globalThis.openPhase2LiveHudRoute49900=action=>{const result=routeAction(action);scheduleRefresh();return result;};
globalThis.runPhase2LiveHud49900Diagnostics=diagnostics;
globalThis.SC_PHASE2_LIVE_HUD_49900=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
})();

// ============================================================================
// ISSUE #557 — UNOBSTRUCTED VILLAGE / REGION MAP CANVASES
// Presentation-only correction integrated into the canonical #499 HUD owner.
// #621 hardens the scheduler against self-reactive geometry feedback.
// ============================================================================
(function installUnobstructedMapCanvas55700(){
"use strict";
if(globalThis.SC_MAP_CANVAS_UNOBSTRUCTED_55700)return;

const PATCH_ID="map_canvas_unobstructed_55700_2026_10_06";
const STYLE_ID="sc-map-canvas-unobstructed-55700-style";
const ROOT_ID="sc-phase2-live-hud-49900";
const MAPS=Object.freeze({region:".region-map-pane",village:".village-map-screen"});
const STRUCTURAL_SELECTOR=".region-info-drawer,.region-event-drawer,.alpha328-event,.region-map-pane,.village-map-screen";
const state={
  map:null,box:null,raf:0,
  resizeObserver:null,surfaceObserver:null,overlayObserver:null,structureObserver:null,
  syncCount:0,scheduleCount:0,writeCount:0,resizeSignalCount:0,structureSignalCount:0,
  lastReason:"install"
};

function visible(node){
  if(!node||!node.isConnected)return false;
  const rect=node.getBoundingClientRect();
  if(!(rect.width>0&&rect.height>0))return false;
  const cs=getComputedStyle(node);
  return cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0;
}
function rect(node){
  if(!node)return null;
  const r=node.getBoundingClientRect();
  return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};
}
function intersectionArea(a,b){
  if(!a||!b)return 0;
  return Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
}
function setStyleIfChanged(node,name,value,priority=""){
  if(!node||!node.style)return false;
  const next=String(value);
  if(node.style.getPropertyValue(name)===next&&node.style.getPropertyPriority(name)===priority)return false;
  node.style.setProperty(name,next,priority);
  state.writeCount+=1;
  return true;
}
function removeStyleIfOwned(node,name){
  if(!node||!node.style||!node.style.getPropertyValue(name))return false;
  node.style.removeProperty(name);state.writeCount+=1;return true;
}
function setDatasetIfChanged(node,key,value){
  if(!node||!node.dataset)return false;
  const next=String(value);
  if(node.dataset[key]===next)return false;
  node.dataset[key]=next;state.writeCount+=1;return true;
}
function deleteDatasetIfPresent(node,key){
  if(!node||!node.dataset||node.dataset[key]===undefined)return false;
  delete node.dataset[key];state.writeCount+=1;return true;
}
function addClassIfMissing(node,name){
  if(!node||!node.classList||node.classList.contains(name))return false;
  node.classList.add(name);state.writeCount+=1;return true;
}
function removeClassIfPresent(node,name){
  if(!node||!node.classList||!node.classList.contains(name))return false;
  node.classList.remove(name);state.writeCount+=1;return true;
}
function cleanupMap(map){
  if(!map)return;
  if(map.dataset.map557WidthOwned==="true")removeStyleIfOwned(map,"max-width");
  deleteDatasetIfPresent(map,"map557WidthOwned");
  ["--sc-map557-outboard-right","--sc-map557-gutter-control-width"].forEach(name=>removeStyleIfOwned(map,name));
}
function observeGeometryTargets(map,box){
  if(!state.resizeObserver)return;
  state.resizeObserver.disconnect();
  if(map)state.resizeObserver.observe(map);
  if(box&&box!==map)state.resizeObserver.observe(box);
}
function cleanup(){
  cleanupMap(state.map);
  removeClassIfPresent(state.box,"sc-map557-active");
  state.map=null;state.box=null;
  observeGeometryTargets(null,null);
  const root=document.getElementById(ROOT_ID);
  if(root){deleteDatasetIfPresent(root,"map557");deleteDatasetIfPresent(root,"map557RegionInfoOpen");}
}
function reserveForViewport(){
  const vw=Math.max(320,Number(innerWidth)||0);
  return Math.max(138,Math.min(196,Math.round(vw*.14)));
}
function mapBoundsContainer(map){
  return map&&map.closest(".overlay-content-box")||document.querySelector(".overlay-content-box")||document.querySelector(".game-container");
}
function constrainMap(map,box){
  const br=box.getBoundingClientRect();
  const reserve=reserveForViewport();
  const maxWidth=Math.max(520,Math.floor(br.width-(reserve*2)-20));
  const changed=setStyleIfChanged(map,"max-width",maxWidth+"px","important");
  setDatasetIfChanged(map,"map557WidthOwned","true");
  return{reserve,maxWidth,changed};
}
function applyGeometry(root,map,box,surface){
  if(!root||!map||!box||!visible(map))return null;
  const rr=root.getBoundingClientRect(),mr=map.getBoundingClientRect();
  const left=Math.max(0,mr.left-rr.left),right=Math.max(0,rr.right-mr.right);
  const top=Math.max(0,mr.top-rr.top),bottom=Math.max(0,rr.bottom-mr.bottom);
  const available=Math.max(0,right-16);
  const controlWidth=Math.max(116,Math.min(176,available));
  const outboardRight=-(right-10);

  // #499 remains the sole writer for the shared HUD gutter variables. #557 only
  // owns the map-control outboard projection and its own presentation markers.
  setDatasetIfChanged(root,"map557","true");
  setStyleIfChanged(map,"--sc-map557-outboard-right",outboardRight.toFixed(2)+"px");
  setStyleIfChanged(map,"--sc-map557-gutter-control-width",controlWidth.toFixed(2)+"px");
  addClassIfMissing(box,"sc-map557-active");
  setDatasetIfChanged(root,"map557RegionInfoOpen",surface==="region"&&!!map.querySelector(".region-info-drawer.open")?"true":"false");
  return{surface,left,right,top,bottom,controlWidth,outboardRight,map:rect(map)};
}
function sync(){
  state.syncCount+=1;
  if(typeof document==="undefined")return null;
  const root=document.getElementById(ROOT_ID);
  if(!root||root.hidden){cleanup();return null;}
  const surface=String(root.dataset.surface||"");
  const selector=MAPS[surface];
  if(!selector){cleanup();return null;}
  const map=document.querySelector(selector);
  const box=mapBoundsContainer(map);
  if(!map||!box){cleanup();return null;}
  const targetChanged=state.map!==map||state.box!==box;
  if(state.map&&state.map!==map)cleanupMap(state.map);
  if(state.box&&state.box!==box)removeClassIfPresent(state.box,"sc-map557-active");
  state.map=map;state.box=box;
  if(targetChanged)observeGeometryTargets(map,box);
  constrainMap(map,box);
  const geometry=applyGeometry(root,map,box,surface);
  return{surface,selector,geometry,presentationOnly:true};
}
function schedule(reason="signal"){
  state.scheduleCount+=1;state.lastReason=String(reason);
  if(state.raf)return false;
  state.raf=requestAnimationFrame(()=>{state.raf=0;sync();});
  return true;
}
function mutationNodeRelevant(node){
  if(!node||node.nodeType!==1)return false;
  if(node.matches&&node.matches(STRUCTURAL_SELECTOR))return true;
  return !!(node.querySelector&&node.querySelector(STRUCTURAL_SELECTOR));
}
function installGeometryObservers(){
  if(typeof document==="undefined")return;
  if(typeof ResizeObserver==="function"){
    state.resizeObserver=new ResizeObserver(()=>{
      state.resizeSignalCount+=1;
      schedule("resize_observer");
    });
    observeGeometryTargets(state.map,state.box);
  }
  const root=document.getElementById(ROOT_ID);
  if(root){
    state.surfaceObserver=new MutationObserver(records=>{
      const changed=records.some(record=>record.type==="attributes"&&record.attributeName==="data-surface"&&record.oldValue!==root.dataset.surface);
      if(!changed)return;
      state.structureSignalCount+=1;
      schedule("surface_change");
    });
    state.surfaceObserver.observe(root,{attributes:true,attributeFilter:["data-surface"],attributeOldValue:true});
  }
const overlay=document.getElementById("screen-overlay");
if(overlay){
  state.overlayObserver=new MutationObserver(()=>{
    state.structureSignalCount+=1;
    schedule("overlay_visibility");
  });
  state.overlayObserver.observe(overlay,{attributes:true,attributeFilter:["style","class","hidden"]});
  state.structureObserver=new MutationObserver(records=>{
      const relevant=records.some(record=>{
        if(record.type==="childList"){
          return [...record.addedNodes,...record.removedNodes].some(mutationNodeRelevant);
        }
        if(record.type==="attributes"){
          const target=record.target;
          if(target===state.box)return false;
          return !!(target&&target.matches&&target.matches(STRUCTURAL_SELECTOR));
        }
        return false;
      });
      if(!relevant)return;
      state.structureSignalCount+=1;
      schedule("map_structure");
    });
    state.structureObserver.observe(overlay,{subtree:true,childList:true,attributes:true,attributeFilter:["class","hidden"]});
  }
}
function schedulerSnapshot(){
  return{
    mode:"signal_coalesced",
    periodicTimer:false,
    bodyWideMutationObserver:false,
    pendingRaf:!!state.raf,
    syncCount:state.syncCount,
    scheduleCount:state.scheduleCount,
    writeCount:state.writeCount,
    resizeSignalCount:state.resizeSignalCount,
    structureSignalCount:state.structureSignalCount,
    lastReason:state.lastReason,
    surface:(document.getElementById(ROOT_ID)?.dataset.surface)||null
  };
}
function diagnostics(){
  const root=document.getElementById(ROOT_ID);
  const surface=root&&String(root.dataset.surface||"");
  const map=surface&&MAPS[surface]?document.querySelector(MAPS[surface]):null;
  const mapRect=map&&visible(map)?rect(map):null;
  const hud={};
  if(root){
    for(const [key,selector] of Object.entries({state:".sc-hud499-state-cluster",team:".sc-hud499-team",tools:".sc-hud499-tools",context:".sc-hud499-context[data-active=\"true\"]",compass:".sc-hud499-map-nav"})){
      const node=root.querySelector(selector);hud[key]=node&&visible(node)?{rect:rect(node),intersection:intersectionArea(rect(node),mapRect)}:null;
    }
  }
  const regionControls={};
  if(surface==="region"&&map){
    for(const selector of [".region-world-close",".region-info-toggle",".region-info-drawer.open",".region-world-map-button"]){
      const node=map.querySelector(selector);regionControls[selector]=node&&visible(node)?{rect:rect(node),intersection:intersectionArea(rect(node),mapRect)}:null;
    }
  }
  const checks={
    presentationOnly:true,
    consumesExistingHud:!!globalThis.SC_PHASE2_LIVE_HUD_49900,
    villageRegionOnly:surface==="village"||surface==="region"||!mapRect,
    measuredOuterReserve:!mapRect||root?.dataset.map557==="true",
    hudClearOfMap:!mapRect||Object.values(hud).filter(Boolean).every(row=>row.intersection===0),
    regionControlsClearOfMap:surface!=="region"||Object.values(regionControls).filter(Boolean).every(row=>row.intersection===0),
    signalCoalescedScheduler:true,
    noPeriodicGeometryPolling:true,
    noBodyWideMutationObserver:true,
    noPersistenceWrites:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,surface,map:mapRect,hud,regionControls,scheduler:schedulerSnapshot(),browserGoldenClaimed:false};
}
function installStyles(){
  if(document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
    .overlay-content-box.sc-map557-active .region-map-pane,
    .overlay-content-box.sc-map557-active .village-map-screen{flex-shrink:1!important}
    #${ROOT_ID}[data-map557="true"][data-surface="region"] .sc-hud499-state-cluster,
    #${ROOT_ID}[data-map557="true"][data-surface="village"] .sc-hud499-state-cluster{left:auto!important;right:var(--sc-hud499-gutter-right-anchor)!important;top:calc(var(--sc-hud499-map-top) + 8px)!important;width:var(--sc-hud499-gutter-control-width)!important;max-width:none!important;border-color:rgba(195,159,70,.34)!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-state-main{gap:5px!important;padding:5px 6px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-identity{gap:5px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-identity-portrait,
    #${ROOT_ID}[data-map557="true"] .sc-hud499-silhouette.sc-hud499-identity-portrait{width:34px!important;height:34px!important;flex-basis:34px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-identity-copy{gap:2px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-identity-copy strong{font-size:11px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-identity-copy span{font-size:6px!important;letter-spacing:.04em!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-ryo{min-width:39px!important;padding-left:5px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-ryo strong{font-size:13px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-journey{min-height:31px!important;padding:4px 6px 5px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-journey strong{font-size:9px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-journey small{font-size:7px!important}
    #${ROOT_ID}[data-map557="true"][data-surface="region"] .sc-hud499-team,
    #${ROOT_ID}[data-map557="true"][data-surface="village"] .sc-hud499-team{left:calc(var(--sc-hud499-map-left) - 80px)!important;right:auto!important;top:calc(var(--sc-hud499-map-top) + 14px)!important;width:72px!important;max-width:72px!important}
    #${ROOT_ID}[data-map557="true"][data-surface="region"] .sc-hud499-tools,
    #${ROOT_ID}[data-map557="true"][data-surface="village"] .sc-hud499-tools{left:auto!important;right:var(--sc-hud499-gutter-right-anchor)!important;top:calc(var(--sc-hud499-map-top) + 92px)!important;width:var(--sc-hud499-gutter-control-width)!important}
    #${ROOT_ID}[data-map557="true"][data-surface="region"] .sc-hud499-context,
    #${ROOT_ID}[data-map557="true"][data-surface="village"] .sc-hud499-context{left:auto!important;right:var(--sc-hud499-gutter-right-anchor)!important;top:calc(var(--sc-hud499-map-top) + 136px)!important;width:var(--sc-hud499-gutter-control-width)!important;max-height:min(34vh,245px)!important}
    #${ROOT_ID}[data-map557="true"][data-surface="region"][data-map557-region-info-open="true"] .sc-hud499-context{opacity:0!important;visibility:hidden!important}
    #${ROOT_ID}[data-map557="true"][data-surface="region"] .sc-hud499-map-nav,
    #${ROOT_ID}[data-map557="true"][data-surface="village"] .sc-hud499-map-nav{left:auto!important;right:var(--sc-hud499-gutter-right-anchor)!important;bottom:max(var(--sc-hud499-safe-bottom),calc(var(--sc-hud499-map-bottom) + 10px))!important;width:var(--sc-hud499-gutter-control-width)!important;min-width:0!important;max-width:none!important}
    .overlay-content-box.sc-map557-active .region-hotspot .hotspot-hover-card{display:none!important}
    .overlay-content-box.sc-map557-active .region-map-pane .region-world-close,
    .overlay-content-box.sc-map557-active .region-map-pane .region-info-toggle,
    .overlay-content-box.sc-map557-active .region-map-pane .region-info-drawer,
    .overlay-content-box.sc-map557-active .region-map-pane .region-world-map-button{left:auto!important;width:var(--sc-map557-gutter-control-width)!important;max-width:var(--sc-map557-gutter-control-width)!important;right:var(--sc-map557-outboard-right)!important;box-sizing:border-box!important}
    .overlay-content-box.sc-map557-active .region-map-pane .region-world-close{top:2%!important;height:36px!important;min-width:0!important;border-radius:6px!important}
    .overlay-content-box.sc-map557-active .region-map-pane .region-info-toggle{top:44%!important;justify-content:flex-start!important}
    .overlay-content-box.sc-map557-active .region-map-pane .region-info-drawer{top:calc(44% + 38px)!important}
    .overlay-content-box.sc-map557-active .region-map-pane .region-info-drawer .region-left-overlay{max-height:min(31vh,260px)!important}
    .overlay-content-box.sc-map557-active .region-map-pane .region-world-map-button{bottom:2%!important;justify-content:flex-start!important}
    @media(max-width:900px){#${ROOT_ID}[data-map557="true"] .sc-hud499-state-main{grid-template-columns:minmax(0,1fr) auto!important}#${ROOT_ID}[data-map557="true"] .sc-hud499-team{width:64px!important;max-width:64px!important;left:calc(var(--sc-hud499-map-left) - 72px)!important}#${ROOT_ID}[data-map557="true"] .sc-hud499-team-member{width:50px!important;height:50px!important}}
  `;document.head.appendChild(style);
}
installStyles();
sync();
installGeometryObservers();
if(typeof window!=="undefined")window.addEventListener("resize",()=>schedule("window_resize"),{passive:true});
globalThis.refreshUnobstructedMapCanvas55700=sync;
globalThis.getUnobstructedMapCanvas55700SchedulerSnapshot=schedulerSnapshot;
globalThis.runUnobstructedMapCanvas55700Diagnostics=diagnostics;
globalThis.SC_MAP_CANVAS_UNOBSTRUCTED_55700=Object.freeze({patchId:PATCH_ID,presentationOnly:true,schedulerMode:"signal_coalesced",browserGoldenClaimed:false});
})();

// #557 selected Region location / discovery card: keep the existing interaction
// contract but project the card into the same right-side contextual reserve.
(function installSelectedRegionContextReserve55710(){
"use strict";
if(typeof document==="undefined"||document.getElementById("sc-map-canvas-context-reserve-55710-style"))return;
const style=document.createElement("style");
style.id="sc-map-canvas-context-reserve-55710-style";
style.textContent=`
  .overlay-content-box.sc-map557-active .region-map-pane .region-event-drawer{
    left:auto!important;
    right:var(--sc-map557-outboard-right)!important;
    top:136px!important;
    bottom:86px!important;
    width:var(--sc-map557-gutter-control-width)!important;
    max-width:var(--sc-map557-gutter-control-width)!important;
    max-height:none!important;
    box-sizing:border-box!important;
    padding:10px!important;
    z-index:320!important;
  }
  body:has(.overlay-content-box.sc-map557-active .region-map-pane .region-event-drawer)
  #sc-phase2-live-hud-49900[data-surface="region"] .sc-hud499-context{
    opacity:0!important;
    visibility:hidden!important;
  }
  .overlay-content-box.sc-map557-active .region-map-pane:has(.region-event-drawer) .region-info-toggle,
  .overlay-content-box.sc-map557-active .region-map-pane:has(.region-event-drawer) .region-info-drawer{
    opacity:0!important;
    visibility:hidden!important;
    pointer-events:none!important;
  }
`;
document.head.appendChild(style);
})();
