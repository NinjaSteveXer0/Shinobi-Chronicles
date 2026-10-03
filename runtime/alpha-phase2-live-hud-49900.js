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
function navMarkup(rows){
  if(!rows.length)return"";
  return '<nav class="sc-hud499-map-nav" aria-label="Map navigation">'+rows.map(row=>
    '<button type="button" data-hud499-action="'+esc(row.id)+'">'+esc(row.label)+'</button>'
  ).join("")+'</nav>';
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
    '<div class="sc-hud499-top">'+
      '<div class="sc-hud499-identity" data-subject-id="'+esc(identity.id)+'">'+
        imageMarkup(identity.portrait,identity.name,"sc-hud499-identity-portrait")+
        '<span class="sc-hud499-identity-copy"><strong>'+esc(identity.name)+'</strong>'+
          '<span><b>'+esc(identity.rank)+'</b>'+(identity.affiliation?' · '+esc(identity.affiliation):'')+'</span></span>'+
      '</div>'+
      (journey?'<button type="button" class="sc-hud499-journey" data-hud499-action="journey" title="'+esc(journey.detail||journey.label)+'">'+
        '<span>CURRENT JOURNEY</span><strong>'+esc(journey.label)+'</strong>'+
        (journey.detail?'<small>'+esc(journey.detail)+'</small>':'')+'</button>':'')+
      '<div class="sc-hud499-ryo" aria-label="Current Ryō"><span>RYŌ</span><strong data-hud499-ryo>'+esc(data.ryo)+'</strong></div>'+
    '</div>'+
    teamMarkup(data.team)+
    '<nav class="sc-hud499-actions" aria-label="Chronicle quick actions">'+
      '<button type="button" data-hud499-action="clan">MY CLAN</button>'+
      '<button type="button" data-hud499-action="inventory">INVENTORY</button>'+
      '<button type="button" data-hud499-action="record">SHINOBI RECORD</button>'+
      '<button type="button" data-hud499-action="journey">JOURNEY</button>'+
    '</nav>'+
    navMarkup(data.navigation);
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
  style.textContent=`
    .game-container.sc-hud499-installed>.game-header{display:none!important}
    .game-container.sc-hud499-installed .world-map-viewport>.map-sidebar-left{display:none!important}
    .game-container.sc-hud499-installed .world-map-viewport{position:relative;min-height:0;grid-template-columns:minmax(0,1fr)}
    .game-container.sc-hud499-installed .world-map-display{grid-column:1;width:100%;max-width:none;padding:8px 14px 12px}
    .sc-hud499-root{position:absolute;inset:0;z-index:1400;pointer-events:none;font-family:Inter,Arial,sans-serif;color:#edf5f7}
    .sc-hud499-root[hidden]{display:none!important}
    .sc-hud499-root button{font:inherit;color:inherit}
    .sc-hud499-top{position:absolute;left:14px;right:14px;top:10px;height:78px;display:grid;grid-template-columns:minmax(220px,330px) minmax(220px,560px) minmax(95px,150px);justify-content:space-between;align-items:start;gap:18px;pointer-events:none}
    .sc-hud499-identity,.sc-hud499-journey,.sc-hud499-ryo,.sc-hud499-team,.sc-hud499-actions,.sc-hud499-map-nav{background:linear-gradient(180deg,rgba(7,13,22,.94),rgba(7,13,22,.78));border:1px solid rgba(195,159,70,.48);box-shadow:0 8px 22px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.035);backdrop-filter:blur(5px)}
    .sc-hud499-identity{pointer-events:auto;display:flex;align-items:center;gap:10px;min-width:0;padding:7px 10px;border-radius:4px}
    .sc-hud499-identity-portrait,.sc-hud499-silhouette.sc-hud499-identity-portrait{width:54px;height:54px;flex:0 0 54px;object-fit:cover;object-position:top center;border:1px solid rgba(74,216,229,.5);background:#111923}
    .sc-hud499-silhouette{display:grid;place-items:center;color:#d4b667;font-weight:900}
    .sc-hud499-identity-copy{display:flex;flex-direction:column;min-width:0;gap:4px}
    .sc-hud499-identity-copy strong{font:800 15px/1.1 Georgia,"Times New Roman",serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .sc-hud499-identity-copy span{font:700 9px/1.25 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#aebbc6}
    .sc-hud499-identity-copy b{color:#e2c46e}
    .sc-hud499-journey{pointer-events:auto;justify-self:center;width:min(100%,560px);min-height:56px;padding:7px 14px;border-radius:4px;text-align:left;cursor:pointer;overflow:hidden}
    .sc-hud499-journey>span,.sc-hud499-kicker,.sc-hud499-ryo>span{display:block;color:#6ed9e4;font-size:8px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
    .sc-hud499-journey strong{display:block;margin-top:2px;font-size:12px;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .sc-hud499-journey small{display:-webkit-box;margin-top:2px;color:#b8c5ce;font-size:9px;line-height:1.2;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .sc-hud499-ryo{pointer-events:auto;justify-self:end;min-width:96px;padding:9px 12px;border-radius:4px;text-align:right}
    .sc-hud499-ryo strong{display:block;margin-top:2px;color:#efcf72;font:900 18px/1 Georgia,"Times New Roman",serif}
    .sc-hud499-team{position:absolute;left:14px;top:102px;width:78px;max-height:330px;padding:9px 7px 10px;border-radius:8px;pointer-events:auto;cursor:pointer;text-align:center;overflow:visible;background:linear-gradient(180deg,rgba(7,14,23,.94),rgba(5,10,17,.76));border-color:rgba(195,159,70,.36);box-shadow:0 12px 28px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.04)}
    .sc-hud499-team::before{content:"";position:absolute;left:8px;top:38px;bottom:13px;width:1px;background:linear-gradient(180deg,rgba(88,221,233,.78),rgba(195,159,70,.58),rgba(195,159,70,.08));box-shadow:0 0 8px rgba(88,221,233,.12)}
    .sc-hud499-team::after{content:"";position:absolute;left:5.5px;top:36px;width:5px;height:5px;transform:rotate(45deg);border:1px solid rgba(93,218,230,.68);background:#08121a;box-shadow:0 0 7px rgba(93,218,230,.18)}
    .sc-hud499-team .sc-hud499-kicker{padding:0 0 7px;margin:0 1px 1px;border-bottom:1px solid rgba(195,159,70,.2);font-size:7px;letter-spacing:.16em;white-space:nowrap}
    .sc-hud499-team-stack{display:flex;flex-direction:column;align-items:flex-end;gap:8px;margin-top:8px}
    .sc-hud499-team-member{position:relative;display:grid;place-items:center;width:58px;height:58px;padding:3px;border:1px solid rgba(195,159,70,.24);border-radius:7px;background:linear-gradient(145deg,rgba(19,31,42,.94),rgba(8,15,23,.94));box-shadow:inset 0 1px 0 rgba(255,255,255,.035),0 5px 12px rgba(0,0,0,.2);transition:border-color 120ms ease,transform 120ms ease,box-shadow 120ms ease}
    .sc-hud499-team-member:hover{transform:translateX(2px);border-color:rgba(87,218,230,.58);box-shadow:inset 0 1px 0 rgba(255,255,255,.045),0 6px 15px rgba(0,0,0,.26),0 0 0 1px rgba(87,218,230,.08)}
    .sc-hud499-team-portrait,.sc-hud499-silhouette.sc-hud499-team-portrait{display:block;width:50px;height:50px;margin:auto;object-fit:cover;object-position:top center;border:1px solid rgba(98,211,224,.28);border-radius:5px;background:#111923;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025)}
    .sc-hud499-team-name{position:absolute;left:66px;top:50%;z-index:8;display:block;max-height:none;margin:0;padding:5px 8px;overflow:visible;opacity:0;transform:translate(-4px,-50%);border:1px solid rgba(195,159,70,.34);border-radius:4px;background:rgba(6,12,19,.96);box-shadow:0 7px 18px rgba(0,0,0,.34);color:#dfe9ec;font-size:8px;font-weight:800;line-height:1.1;letter-spacing:.04em;white-space:nowrap;pointer-events:none;transition:opacity 120ms ease,transform 120ms ease}
    .sc-hud499-team-member:hover .sc-hud499-team-name,.sc-hud499-team:focus-visible .sc-hud499-team-name{opacity:1;transform:translate(0,-50%)}
    .sc-hud499-actions{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);height:46px;display:flex;align-items:center;gap:5px;padding:5px;border-radius:4px;pointer-events:auto}
    .sc-hud499-actions button,.sc-hud499-map-nav button{min-height:34px;padding:0 12px;border:1px solid rgba(150,133,82,.45);background:rgba(8,14,22,.82);cursor:pointer;font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
    .sc-hud499-actions button:hover,.sc-hud499-actions button:focus-visible,.sc-hud499-map-nav button:hover,.sc-hud499-map-nav button:focus-visible,.sc-hud499-journey:hover,.sc-hud499-journey:focus-visible,.sc-hud499-team:hover,.sc-hud499-team:focus-visible{outline:2px solid rgba(85,218,231,.75);outline-offset:1px;border-color:rgba(85,218,231,.7)}
    .sc-hud499-map-nav{position:absolute;right:12px;bottom:10px;display:flex;gap:5px;padding:5px;border-radius:4px;pointer-events:auto}
    @media(max-width:1050px){
      .sc-hud499-top{grid-template-columns:minmax(180px,270px) minmax(160px,1fr) 90px;gap:8px}
      .sc-hud499-identity-portrait,.sc-hud499-silhouette.sc-hud499-identity-portrait{width:46px;height:46px;flex-basis:46px}
      .sc-hud499-actions button{padding:0 8px;font-size:8px}
      .sc-hud499-team{width:70px;padding-left:6px;padding-right:6px}
      .sc-hud499-team-member{width:52px;height:52px}
      .sc-hud499-team-portrait,.sc-hud499-silhouette.sc-hud499-team-portrait{width:44px;height:44px}
    }
    @media(max-width:760px){
      .sc-hud499-top{left:8px;right:8px;top:6px;height:auto;grid-template-columns:minmax(170px,1fr) 84px}
      .sc-hud499-journey{position:absolute;left:0;top:66px;width:min(72vw,420px);min-height:42px}
      .sc-hud499-team{top:122px;left:7px;width:62px}
      .sc-hud499-actions{left:8px;right:8px;bottom:7px;transform:none;justify-content:center;height:44px}
      .sc-hud499-actions button{flex:1;padding:0 4px;font-size:7px}
      .sc-hud499-map-nav{right:7px;bottom:58px}
    }
    @media(prefers-reduced-motion:reduce){.sc-hud499-root *{transition:none!important}}
  `;
  document.head.appendChild(style);
}
function diagnostics(){
  const source=[snapshot,render,routeAction,teamProjection,journeyProjection].map(String).join("\n");
  const data=snapshot();
  const checks={
    readOnlyProjection:!/savePlayerData\s*\(/.test(source)&&!/localStorage\.setItem\s*\(/.test(source)&&!/confirmAcademyTeamFormation\s*\(/.test(source),
    canonicalTeam:String(currentTeam).includes("getChronicleCurrentTeam43600"),
    canonicalRyo:String(currentRyo).includes("getChronicleCurrentRyo43600"),
    canonicalJourney:String(journeyProjection).includes("getAlphaTailedBeastJourneyState")&&String(journeyProjection).includes("getAlphaSurfaceTruthJourneyAction"),
    canonicalIdentity:String(activeSubjectId).includes("getAlphaSurfaceTruthSubjectId")&&String(presentationVariantId).includes("getChronicleIdentity43600"),
    identityRepresentationSeparated:String(presentationVariantId).includes("ownedCharacterId")&&String(presentationVariantId).includes("variantId"),
    canonicalPortrait:String(portraitFor).includes("resolveUIPortraitProjection")&&String(portraitFor).includes("getUIPortraitAssetPath"),
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
