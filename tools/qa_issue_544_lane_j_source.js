#!/usr/bin/env node
"use strict";
const fs=require('fs'),assert=require('assert');
const target=process.env.ISSUE_544_TARGET_SHA||null;
const read=p=>fs.readFileSync(p,'utf8');
const term=read('runtime/alpha-battle-terminal-result-54400.js');
const old=read('runtime/alpha-alpha-sprint-33100.js');
const kakashiRewards=read('runtime/alpha-kakashi-v2-rewards-36015.js');
const index=read('index.html');
const count=(s,re)=>(s.match(re)||[]).length;

// #544 successor shape / retired predecessor slice.
assert(term.includes('continueAfterSetback54400'),'#544 Setback continuation missing');
assert(term.includes('presentCommittedBattleTerminalResult54400'),'#544 terminal presenter missing');
assert(term.includes('.alpha544-setback'),'#544-owned Setback surface missing');
assert(term.includes("UI/victory.png"),'approved Victory asset missing');
assert(term.includes("UI/setback.png"),'approved Setback asset missing');
assert(term.includes('PRIOR_COMPLETE_VICTORY'),'Victory completion predecessor capture missing');
assert(term.includes('PRIOR_COMPLETE_DEFEAT'),'defeat completion predecessor capture missing');
assert(term.includes('PRIOR_RESUME_CALLER'),'caller-resume predecessor capture missing');
assert(!old.includes('continueAfterSetback33100'),'retired #33100 Setback continuation reactivated');
assert(!old.includes('.alpha331-setback'),'retired #33100 Setback surface reactivated');

// #601/#624 reserved-authority rule: independent exact-head proof comes first.
assert(!/CANONICAL BATTLE TERMINAL-RESULT PRESENTATION OWNER/i.test(term),'#544 source prematurely claims CANONICAL owner before independent exact-head proof');
assert(!/Canonical responsibility/i.test(term),'#544 source prematurely claims Canonical responsibility before independent exact-head proof');
assert(!/this module replaces the retired #33100/i.test(term),'#544 source prematurely claims replacement before independent exact-head proof');

// Lane-D/Overseer return: 36015 may preserve Kakashi reward projection, but may not remain a broad openOverlay writer/wrapper.
assert(kakashiRewards.includes('ensureKakashiV2BattleRewardProjection36015'),'36015 Kakashi reward projection seam missing');
assert(kakashiRewards.includes('generateBattleRewards36015'),'36015 bounded reward-generation hook missing');
assert(kakashiRewards.includes('renderVictoryOverlay36015'),'36015 bounded Victory projection hook missing');
assert(!/globalThis\.openOverlay\s*=/.test(kakashiRewards),'36015 still assigns broad globalThis.openOverlay');
assert(!/(^|[^.\w])openOverlay\s*=\s*globalThis\.openOverlay/m.test(kakashiRewards),'36015 still writes broad openOverlay binding');
assert(!/function\s+openOverlay36015\b/.test(kakashiRewards),'36015 broad openOverlay wrapper remains');

// Exact loader shape.
assert(count(index,/runtime\/alpha-battle-terminal-result-54400\.js/g)===1,'#544 loader must appear exactly once');
assert(index.indexOf('runtime/alpha-alpha-sprint-33100.js')>=0,'#33100 loader missing');
assert(index.indexOf('runtime/alpha-battle-terminal-result-54400.js')>index.indexOf('runtime/alpha-alpha-sprint-33100.js'),'#544 successor must load after #33100');

console.log(JSON.stringify({pass:true,issue:544,lane:'J',target,terminalCandidate:'54400',retired331TerminalSlice:true,kakashi36015BroadOpenOverlayOwner:false,loaderCount:1,browserGoldenClaimed:false},null,2));
