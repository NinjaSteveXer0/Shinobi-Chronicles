#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const read=rel=>fs.readFileSync(path.join(ROOT,rel),"utf8");
const GAME=read("game.js");
const STATE=read("runtime/alpha-chronicle-state-manifest-43600.js");
const HUD=read("runtime/alpha-phase2-live-hud-49900.js");
const SHOP=read("runtime/alpha-phase2-character-card-shop-52400.js");
const FP=read("runtime/alpha-runtime-build-fingerprint-303.js");
const CONTRACT=read("Documentation/Coordination/Chronicle_Protagonist_Lineage_Promotion_and_Team_Separation_Contract_2026-10-05.md");

assert(GAME.includes("function commitClanTeamAssignment("),"#532 canonical assignment writer missing");
assert(GAME.includes("function validateClanTeamAssignmentCandidate("),"#532 assignment validator missing");
assert(GAME.includes("currentTeamAssignment"),"#532 current assignment receipt missing");
assert(GAME.includes("teamLineageIds"),"#532 exact owned-lineage assignment identity missing");
assert(GAME.includes('reason:"duplicate_exact_owned_lineage_assignment"'),"#532 exact duplicate lineage fail-closed gate missing");
assert(GAME.includes('reason:"chronicle_protagonist_required_until_opening_restriction_complete"'),"#532 opening protagonist restriction missing");
assert(GAME.includes('source:"my_clan_save_formation"'),"#532 explicit My Clan save source missing");
assert(GAME.includes('source:"academy_team_formation"'),"#532 opening formation not routed through canonical writer");
const staged=GAME.slice(GAME.indexOf("function saveMyClanStagedFormation"),GAME.indexOf("function getMyClanPersonName"));
assert(staged.includes("commitClanTeamAssignment"),"#532 Save Formation bypasses canonical assignment writer");
assert(!staged.includes("playerData.clan=normalizeClanManagementState"),"#532 Save Formation still directly writes clan state");
assert(SHOP.includes("assignmentCommitted:false")&&SHOP.includes("retailDoesNotAssign:true"),"#532 retail ownership/assignment separation regressed");
assert(STATE.indexOf("clanAssignmentFrom(save)")<STATE.indexOf("validCommittedTeamReceipt(receipt)"),"#532 State Manifest does not prefer current clan assignment");
assert(STATE.includes('sourcePath:"playerData.clan.currentTeamAssignment"'),"#532 canonical currentTeam source path missing");
assert(STATE.includes("protagonistPresent"),"#532 protagonist/team separation projection missing");
assert(STATE.includes("teamLineageIds"),"#532 State Manifest lineage projection missing");
assert(HUD.includes('call("getProductionRuntimePersonName",variant||id)'),"#532 HUD person-name projection missing");
assert(GAME.includes("function getProductionRuntimePersonName("),"#532 person name helper missing");
assert(FP.includes("phase2-deliberate-team-assignment-532"),"#532 runtime fingerprint generation missing");
assert(FP.includes("current-team-exact-owned-lineage-532"),"#532 lineage fingerprint feature missing");
assert(CONTRACT.includes("Current Team")&&CONTRACT.includes("Formal Rank"),"#522 durable contract unavailable");

console.log(JSON.stringify({
  pass:true,
  issue:532,
  canonicalAssignmentWriter:true,
  exactOwnedLineageIdentity:true,
  purchaseOwnershipOnly:true,
  openingRestrictionPreserved:true,
  protagonistCurrentTeamSeparated:true,
  academyReceiptPreservedAsFallback:true,
  personNameCardTitleFormalRankSeparated:true,
  browserGoldenClaimed:false
},null,2));
