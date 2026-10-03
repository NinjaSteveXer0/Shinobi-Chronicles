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
  if(character){
    const value=scalar(character.name||character.displayName||character.playerFacingName);
    if(value)return value;
  }
  const variant=presentationVariantId(id);
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
  try{
    if(typeof currentOverlayType!=="undefined"&&currentOverlayType)return String(currentOverlayType);
  }catch(_error){}
  if(typeof document==="undefined")return null;
  const overlay=document.getElementById("screen-overlay");
  if(!overlay)return null;
  try{
    if(getComputedStyle(overlay).display==="none"||overlay.hidden)return null;
  }catch(_error){
    if(overlay.style&&overlay.style.display==="none")return null;
  }
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
    if(typeof globalThis["closeOverlay"]==="function")rows.push({id:"world",label:"WORLD MAP"});
  }else if(surface.kind==="region"){
    if(freePlay&&typeof globalThis["openOverlay"]==="function")rows.push({id:"village",label:"VILLAGE"});
    if(typeof globalThis["closeOverlay"]==="function")rows.push({id:"world",label:"WORLD MAP"});
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
  return '<button type="button" class="sc-hud499-team" data-hud499-action="clan" aria-label="Open My Clan. Current team: '+esc(rows.map(r=>r.name).join(", "))+'">'+
    '<span class="sc-hud499-kicker">CURRENT TEAM</span>'+
    '<span class="sc-hud499-team-stack">'+rows.map(row=>
      '<span class="sc-hud499-team-member" data-team-variant-id="'+esc(row.id)+'" title="'+esc(row.name)+'">'+
      imageMarkup(row.portrait,row.name,"sc-hud499-team-portrait")+
      '<span class="sc-hud499-team-name">'+esc(row.name)+'</span></span>'
    ).join("")+'</span></button>';
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
function render(force=false){
  const root=ensureRoot();
  if(!root)return false;
  const data=snapshot();
  const signature=JSON.stringify(data);
  if(!force&&signature===state.lastSignature)return data;
  state.lastSignature=signature;
  root.hidden=!data.visible;
  root.dataset.surface=data.surface.kind;
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
    navMarkup(data.navigation,data.surface.kind);
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
  style.textContent=\`
    .game-container.sc-hud499-installed>.game-header{display:none!important}
    .game-container.sc-hud499-installed .world-map-viewport>.map-sidebar-left{display:none!important}
    .game-container.sc-hud499-installed .world-map-viewport{position:relative;min-height:0;grid-template-columns:minmax(0,1fr)}
    .game-container.sc-hud499-installed .world-map-display{grid-column:1;width:100%;max-width:none;padding:8px 14px 12px}
    .sc-hud499-root{--sc-hud499-edge:14px;--sc-hud499-safe-bottom:clamp(72px,8vh,96px);position:absolute;inset:0;z-index:1400;pointer-events:none;font-family:Inter,Arial,sans-serif;color:#edf5f7}
    .sc-hud499-root[hidden]{display:none!important}
    .sc-hud499-root button,.sc-hud499-root summary{font:inherit;color:inherit}
    .sc-hud499-brand{position:absolute;left:18px;top:14px;width:clamp(210px,18vw,300px);pointer-events:none;filter:drop-shadow(0 8px 20px rgba(0,0,0,.45))}
    .sc-hud499-brand img{display:block;width:100%;height:auto;max-height:88px;object-fit:contain;object-position:left top}
    .sc-hud499-state-cluster{position:absolute;right:var(--sc-hud499-edge);top:12px;width:clamp(330px,31vw,470px);pointer-events:auto;overflow:hidden;border:1px solid rgba(195,159,70,.42);border-radius:8px;background:linear-gradient(150deg,rgba(7,14,23,.95),rgba(6,12,20,.82));box-shadow:0 12px 30px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.04);backdrop-filter:blur(6px)}
    .sc-hud499-state-main{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:10px;padding:8px 10px}
    .sc-hud499-identity{display:flex;align-items:center;gap:9px;min-width:0}
    .sc-hud499-identity-portrait,.sc-hud499-silhouette.sc-hud499-identity-portrait{width:46px;height:46px;flex:0 0 46px;object-fit:cover;object-position:top center;border:1px solid rgba(75,215,228,.45);border-radius:5px;background:#111923}
    .sc-hud499-silhouette{display:grid;place-items:center;color:#d4b667;font-weight:900}
    .sc-hud499-identity-copy{display:flex;flex-direction:column;min-width:0;gap:4px}
    .sc-hud499-identity-copy strong{font:800 15px/1.08 Georgia,"Times New Roman",serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .sc-hud499-identity-copy span{font:700 8px/1.25 Arial,sans-serif;letter-spacing:.09em;text-transform:uppercase;color:#aebbc6}
    .sc-hud499-identity-copy b{color:#e4c76f}
    .sc-hud499-ryo{min-width:74px;padding-left:10px;border-left:1px solid rgba(195,159,70,.22);text-align:right}
    .sc-hud499-ryo>span,.sc-hud499-kicker,.sc-hud499-journey>span{display:block;color:#69dce7;font-size:7px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}
    .sc-hud499-ryo strong{display:block;margin-top:3px;color:#efcf72;font:900 17px/1 Georgia,"Times New Roman",serif}
    .sc-hud499-journey{width:100%;min-height:39px;padding:7px 10px 8px;border:0;border-top:1px solid rgba(195,159,70,.2);background:linear-gradient(90deg,rgba(9,20,28,.76),rgba(8,14,22,.34));text-align:left;cursor:pointer}
    .sc-hud499-journey strong{display:block;margin-top:2px;font-size:11px;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .sc-hud499-journey small{display:block;margin-top:2px;color:#aebbc5;font-size:8px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .sc-hud499-team{position:absolute;left:14px;top:122px;width:72px;max-height:330px;padding:8px 6px 10px;border:0;border-left:1px solid rgba(88,221,233,.42);border-radius:0 8px 8px 0;pointer-events:auto;cursor:pointer;text-align:center;overflow:visible;background:linear-gradient(90deg,rgba(5,11,18,.91),rgba(6,13,20,.68),rgba(6,13,20,.12));box-shadow:8px 12px 24px rgba(0,0,0,.18)}
    .sc-hud499-team::before{content:"";position:absolute;left:-2px;top:34px;bottom:12px;width:3px;background:linear-gradient(180deg,rgba(83,221,232,.82),rgba(198,162,72,.55),rgba(198,162,72,.08));box-shadow:0 0 9px rgba(83,221,232,.13)}
    .sc-hud499-team .sc-hud499-kicker{padding-bottom:6px;font-size:6px;white-space:nowrap}
    .sc-hud499-team-stack{display:flex;flex-direction:column;align-items:center;gap:7px;margin-top:5px}
    .sc-hud499-team-member{position:relative;display:grid;place-items:center;width:56px;height:56px;padding:3px;border:1px solid rgba(195,159,70,.25);border-radius:50%;background:radial-gradient(circle at 50% 32%,rgba(28,43,56,.95),rgba(8,15,23,.96));box-shadow:0 5px 12px rgba(0,0,0,.25);transition:transform 120ms ease,border-color 120ms ease}
    .sc-hud499-team-member:hover{transform:translateX(2px);border-color:rgba(82,220,232,.62)}
    .sc-hud499-team-portrait,.sc-hud499-silhouette.sc-hud499-team-portrait{display:block;width:48px;height:48px;margin:auto;object-fit:cover;object-position:top center;border:1px solid rgba(96,211,224,.3);border-radius:50%;background:#111923}
    .sc-hud499-team-name{position:absolute;left:63px;top:50%;z-index:8;display:block;margin:0;padding:5px 8px;opacity:0;transform:translate(-4px,-50%);border:1px solid rgba(195,159,70,.34);border-radius:4px;background:rgba(6,12,19,.96);box-shadow:0 7px 18px rgba(0,0,0,.34);color:#dfe9ec;font-size:8px;font-weight:800;line-height:1.1;letter-spacing:.04em;white-space:nowrap;pointer-events:none;transition:opacity 120ms ease,transform 120ms ease}
    .sc-hud499-team-member:hover .sc-hud499-team-name,.sc-hud499-team:focus-visible .sc-hud499-team-name{opacity:1;transform:translate(0,-50%)}
    .sc-hud499-tools{position:absolute;right:var(--sc-hud499-edge);top:128px;width:148px;pointer-events:auto;border:1px solid rgba(195,159,70,.28);border-radius:7px;background:linear-gradient(145deg,rgba(7,14,22,.93),rgba(6,11,18,.78));box-shadow:0 10px 24px rgba(0,0,0,.26);overflow:hidden}
    .sc-hud499-tools summary{min-height:34px;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:0 10px;cursor:pointer;list-style:none;color:#d7c27f;font-size:8px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
    .sc-hud499-tools summary::-webkit-details-marker{display:none}
    .sc-hud499-tools summary b{color:#69dce7;font-size:15px;line-height:1;font-weight:500;transition:transform 120ms ease}
    .sc-hud499-tools[open] summary b{transform:rotate(45deg)}
    .sc-hud499-tools nav{display:grid;gap:4px;padding:5px;border-top:1px solid rgba(195,159,70,.18)}
    .sc-hud499-tools button{min-height:31px;padding:0 8px;border:1px solid rgba(129,129,101,.28);background:rgba(8,16,24,.78);cursor:pointer;text-align:left;font-size:8px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}
    .sc-hud499-map-nav{position:absolute;right:var(--sc-hud499-edge);bottom:var(--sc-hud499-safe-bottom);min-width:176px;max-width:248px;padding:8px;pointer-events:auto;border:1px solid rgba(195,159,70,.38);border-radius:9px;background:linear-gradient(145deg,rgba(7,14,22,.94),rgba(6,11,18,.8));box-shadow:0 12px 28px rgba(0,0,0,.3);backdrop-filter:blur(5px)}
    .sc-hud499-compass-depth{display:block;margin-top:3px;color:#e7d8a6;font:800 12px/1 Georgia,"Times New Roman",serif;letter-spacing:.06em}
    .sc-hud499-compass-actions{display:flex;flex-wrap:wrap;gap:4px;margin-top:7px}
    .sc-hud499-map-nav button{min-height:30px;padding:0 9px;border:1px solid rgba(150,133,82,.42);background:rgba(8,14,22,.82);cursor:pointer;font-size:8px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}
    .sc-hud499-journey:hover,.sc-hud499-journey:focus-visible,.sc-hud499-team:hover,.sc-hud499-team:focus-visible,.sc-hud499-tools summary:hover,.sc-hud499-tools summary:focus-visible,.sc-hud499-tools button:hover,.sc-hud499-tools button:focus-visible,.sc-hud499-map-nav button:hover,.sc-hud499-map-nav button:focus-visible{outline:2px solid rgba(85,218,231,.72);outline-offset:1px;border-color:rgba(85,218,231,.66)}
    @media(max-width:1450px){.sc-hud499-brand{width:clamp(190px,17vw,244px)}.sc-hud499-state-cluster{width:clamp(315px,32vw,420px)}.sc-hud499-tools{top:124px;width:138px}.sc-hud499-team{top:116px}}
    @media(max-width:900px){.sc-hud499-root{--sc-hud499-edge:8px;--sc-hud499-safe-bottom:72px}.sc-hud499-brand{left:10px;top:10px;width:170px}.sc-hud499-state-cluster{right:8px;top:8px;width:300px}.sc-hud499-state-main{padding:7px 8px}.sc-hud499-identity-portrait,.sc-hud499-silhouette.sc-hud499-identity-portrait{width:40px;height:40px;flex-basis:40px}.sc-hud499-team{left:8px;top:108px;width:64px}.sc-hud499-team-member{width:50px;height:50px}.sc-hud499-team-portrait,.sc-hud499-silhouette.sc-hud499-team-portrait{width:42px;height:42px}.sc-hud499-tools{right:8px;top:116px;width:128px}.sc-hud499-map-nav{right:8px;bottom:72px;min-width:160px}}
    @media(prefers-reduced-motion:reduce){.sc-hud499-root *{transition:none!important}}
  \`;
  document.head.appendChild(style);
}
function diagnostics(){
  const source=[snapshot,render,routeAction,teamProjection,journeyProjection,brandMarkup,toolsMarkup,navMarkup].map(String).join("\n");
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
}

globalThis.getPhase2LiveHudSnapshot49900=snapshot;
globalThis.refreshPhase2LiveHud49900=()=>render(true);
globalThis.openPhase2LiveHudRoute49900=action=>{const result=routeAction(action);scheduleRefresh();return result;};
globalThis.runPhase2LiveHud49900Diagnostics=diagnostics;
globalThis.SC_PHASE2_LIVE_HUD_49900=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
})();
