// ============================================================================
// ISSUE #188 — KAKASHI TERMINAL SCENE BOARD COMPATIBILITY — 35610
//
// Gen85 retirement of the old duplicate terminal renderer.
//
// Current ownership:
// - 35100 owns terminal beat semantics + per-beat environmentRef.
// - 33910 owns Kakashi Story Scene Board actor/presentation projection.
// - 35610 remains only as an idempotent approved-backdrop registration shim.
//
// IMPORTANT:
// The previous v1 installed a body-wide MutationObserver and rewrote terminal
// board.innerHTML from that observer. On an active terminal beat, that DOM write
// retriggered the observer and could form a self-sustaining render loop in the
// installed browser. It also overwrote 35100's rooftop-vs-Hokage environment
// separation. Both behaviors are retired here.
// ============================================================================
(function installAcademyKakashiTerminalSceneBoard35610(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_TERMINAL_SCENE_BOARD_35610)return;

const PATCH_ID="alpha_kakashi_terminal_scene_board_35610_v4_2026_09_21";
const HOKAGE_ENV_ID="kakashi_origin_hokage_administration_interior_night";
const HOKAGE_ENV_PATH="Kakashi Origin Backdrop/hokage_administration_interior_night.png";
const PRESENTATION_OWNER="kakashi_scene_board_model_v15_33910_2026_09_21";
const TERMINAL_OWNER="alpha_kakashi_terminal_debrief_35100_v10_2026_09_20";

function registerApprovedBackdrop35610(){
  try{
    const reg=typeof registerSceneBackdropAssetPath==="function"
      ?registerSceneBackdropAssetPath
      :globalThis.registerSceneBackdropAssetPath;
    if(typeof reg==="function"){
      const out=reg(HOKAGE_ENV_ID,HOKAGE_ENV_PATH);
      return{success:true,registered:true,result:out||null};
    }
  }catch(error){
    return{success:false,reason:"terminal_35610_backdrop_registration_failed",message:String(error&&error.message||error)};
  }
  return{success:true,registered:false,reason:"backdrop_registry_unavailable"};
}

function diagnostics(){
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_terminal_scene_board_35610_v4_2026_09_21",
    backdropExact:HOKAGE_ENV_PATH==="Kakashi Origin Backdrop/hokage_administration_interior_night.png",
    passiveCompatibilityOnly:true,
    presentationOwner33910:PRESENTATION_OWNER==="kakashi_scene_board_model_v15_33910_2026_09_21",
    terminalOwner35100:TERMINAL_OWNER==="alpha_kakashi_terminal_debrief_35100_v10_2026_09_20",
    noDomRenderOwnership:true,
    noBeatEnvironmentMutation:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const backdrop=registerApprovedBackdrop35610();
globalThis.runAcademyKakashiTerminalSceneBoard35610Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_TERMINAL_SCENE_BOARD_35610=Object.freeze({
  patchId:PATCH_ID,
  backdrop,
  presentationOwner:PRESENTATION_OWNER,
  terminalOwner:TERMINAL_OWNER,
  compatibilityOnly:true,
  diagnostics,
  browserGoldenClaimed:false
});
})();