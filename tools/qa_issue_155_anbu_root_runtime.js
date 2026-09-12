#!/usr/bin/env node
"use strict";
const fs=require("fs");
const path=require("path");
const vm=require("vm");
const root=path.resolve(__dirname,"..");
const source=fs.readFileSync(path.join(root,"runtime","alpha-anbu-root-contained-155.js"),"utf8");

global.playerData={};
let saveCount=0;
global.savePlayerData=()=>{saveCount++;};
global.cloneProgressionData=v=>v==null?v:JSON.parse(JSON.stringify(v));
const areas=new Map(), opportunities=new Map();
global.registerLocalMissionArea=def=>{areas.set(def.areaId,def);return{success:true,area:def};};
global.getLocalMissionAreaDefinition=id=>areas.get(String(id))||null;
global.registerWorldEventOpportunity=def=>{opportunities.set(def.opportunityId,def);return{success:true,opportunity:def};};
global.getRegisteredWorldEventOpportunity=id=>opportunities.get(String(id))||null;
global.getMissionAreaHotspotProjections=areaId=>[...opportunities.values()]
  .filter(def=>def.missionAreaId===areaId&&(!def.revealPredicate||def.revealPredicate()))
  .map(def=>({hotspotId:def.hotspotId,opportunity_id:def.opportunityId}));
global.openLocalMissionArea=(areaId,{returnContext=null,hotspotId=null,restoring=false}={})=>{
  const area=areas.get(areaId);if(!area)return{success:false,reason:"mission_area_missing"};
  if(!restoring&&area.evaluateEntry){const e=area.evaluateEntry({area,returnContext,playerData,runtime:{}});if(e===false||(e&&e.available===false))return{success:false,reason:e.reason||"entry_denied"};}
  if(!restoring&&area.onEnter){const entered=area.onEnter({area,returnContext,playerData,runtime:{}});if(entered&&entered.success===false)return entered;}
  return{success:true,areaId,hotspotId,returnContext};
};
global.resumeStorySceneReturnContext=ctx=>({success:true,resumed:ctx});
global.leaveLocalMissionArea=function leaveLocalMissionArea(){const returnContext={};return resumeStorySceneReturnContext(returnContext);};

vm.runInThisContext(source,{filename:"alpha-anbu-root-contained-155.js"});
const checks={};
function check(name,value){checks[name]=value===true;}
check("registeredTwoAreas",areas.size===2);
check("registeredSixteenProjectionRows",opportunities.size===16);
check("noAccessNoAnbuProjection",getMissionAreaHotspotProjections("konoha_anbu_hq").length===0);
check("noAccessNoRootProjection",getMissionAreaHotspotProjections("konoha_root_hq").length===0);
const caller={type:"story_scene",sceneId:"scene_test",beatId:"beat_test"};
const env={missionAreaId:"konoha_anbu_hq",worldInstanceRef:"inst_1",entryRouteRef:"anbu_hq_hotspot_secure_threshold",storyAuthorizedHotspotIds:["anbu_hq_hotspot_secure_threshold","anbu_hq_hotspot_briefing_chamber"],accessState:"ESCORTED_TEMPORARY",localActionability:"STORY_ONLY",returnCallerRef:caller,authorityOccurrenceId:"occ_test_access"};
const opened=openStoryContainedLocalArea155(env);
check("storyEntrySucceeds",opened.success===true);
check("strictTwoHotspotSubset",getMissionAreaHotspotProjections("konoha_anbu_hq").length===2);
check("rootRemainsIndependent",getMissionAreaHotspotProjections("konoha_root_hq").length===0);
let read=getIssue155ContainedAreaReadModel("konoha_anbu_hq");
check("escortedStaysEscorted",read.accessState==="ESCORTED_TEMPORARY");
check("exteriorRemainsFalse",read.exteriorLocationConfirmed===false);
check("productionEntrySavedExactlyOnce",saveCount===1);
const reopened=openStoryContainedLocalArea155(env);
check("sameEnvelopeReopenSucceeds",reopened.success===true);
check("idempotentReopenNoExtraSave",saveCount===1);
const bad=openStoryContainedLocalArea155({...env,storyAuthorizedHotspotIds:["anbu_hq_hotspot_briefing_chamber","bogus_hidden"]});
check("invalidSubsetFailsClosed",bad.success===false&&bad.reason==="contained_area_authorised_hotspot_subset_invalid");
const expired=expireStoryContainedLocalAreaAccess155({missionAreaId:"konoha_anbu_hq",worldInstanceRef:"inst_1",sourceOccurrenceId:"occ_access_ended"});
check("causalExpirySucceeds",expired.success===true);
check("expiryHidesAll",getMissionAreaHotspotProjections("konoha_anbu_hq").length===0);
check("expiryPersisted",saveCount===2);
const beforeDiag=saveCount,diag=runIssue155ContainedLocalAreaDiagnostics();
check("internalDiagnosticPass",diag.pass===true);
check("diagnosticNoSaveMutation",saveCount===beforeDiag);
const failed=Object.entries(checks).filter(([,v])=>!v).map(([k])=>k);
const result={pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
console.log(JSON.stringify(result,null,2));
process.exit(result.pass?0:1);
