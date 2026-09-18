// ============================================================================
// ISSUE #188 / #226 — ACADEMY KAKASHI W2C NON-KILL ENDINGS — 35780
//
// Consumes Stephen-approved Writing locks for:
// - LETHAL_ATTEMPT_SURVIVED
// - LETHAL_ATTEMPT_INTERRUPTED
// - LETHAL_ATTEMPT_ESCAPED
//
// The confirmed-kill chain remains owned by 35770.
// No patrol card path is hard-coded until approved binaries have repo authority.
// ============================================================================
(function installAcademyKakashiW2CNonKillEnding35780(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_W2C_NONKILL_35780)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const TERMINAL=globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100;
if(!A||!CORE||!TERMINAL)throw new Error("kakashi_w2c_nonkill_35780_dependencies_missing");

const PATCH_ID="alpha_kakashi_w2c_nonkill_35780_v3_2026_09_18";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const SOURCE_HOLD="kak_scene06a_w2c_scene7_pending";
const AFTERMATH="kak_scene06a_w2c_nonkill_aftermath_35780";
const SCENE07="kak_scene07a_w2c_nonkill_anbu_report_35780";
const SCENE08="kak_scene08a_w2c_nonkill_hokage_office_35780";
const RECEIPT="kak_w2c_nonkill_chronicle_receipt_hold_35780";
const EXIT="kak_w2c_nonkill_origin_exit_35780";
const REPORT_OBJECTIVE="Report to ANBU.";
const CURSOR_A="__kakashiW2CNonKillAftermath35780";
const CURSOR_7="__kakashiW2CNonKillScene0735780";
const CURSOR_8="__kakashiW2CNonKillScene0835780";
const STYLE_ID="sc-kakashi-w2c-nonkill-35780-style";
const BOARD_CLASS="sc-kakashi-w2c-nonkill-35780-board";
const RECEIPT_ID="sc-kakashi-origin-nonkill-receipt-35780";
const MI="academy_kakashi_origin_masked_interceptor";
const ANBU="konoha_anbu_contact";
const AMT="anbu_marked_target";
const PS="package_smuggler";
const MINATO="kage_minato";
const SAKURA_BG="Kakashi Origin Backdrop/fight_at_sakura_tree.png";
const ROOFTOP_BG="Kakashi Origin Backdrop/rooftop_night.png";
const OFFICE_BG="Kakashi Origin Backdrop/hokage_administration_interior_night.png";
const PATROL_ASSET_PATHS=Object.freeze([]);
const DATA=Object.freeze({
  "LETHAL_ATTEMPT_SURVIVED": {
    "code": "S",
    "authorities": {
      "scene06": "14c091f1620eef0275b5e713f782b6c99c8a9abc",
      "scene07": "84894e148e55b57ec74707690ca0b067b6b1e366",
      "scene08": "ecf8f813232d9d72e5c7c08ec544a20dbc2fa2a7"
    },
    "aftermath": [
      {
        "kind": "narration",
        "text": "Kakashi reappears at her side."
      },
      {
        "kind": "narration",
        "text": "The kunai flashes."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor turns—"
      },
      {
        "kind": "narration",
        "text": "Too late."
      },
      {
        "kind": "narration",
        "text": "The strike connects."
      },
      {
        "kind": "narration",
        "text": "She stumbles across the stone and drops to one knee."
      },
      {
        "kind": "narration",
        "text": "For a moment, neither of them moves."
      },
      {
        "kind": "narration",
        "text": "Then she draws breath."
      },
      {
        "kind": "narration",
        "text": "Kakashi sees it."
      },
      {
        "kind": "narration",
        "text": "She is still alive."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor presses one hand against the wound and looks up at him."
      },
      {
        "kind": "narration",
        "text": "There is no confusion in her eyes now."
      },
      {
        "kind": "narration",
        "text": "She knows exactly what he just tried to do."
      },
      {
        "kind": "narration",
        "text": "Kakashi tightens his grip on the kunai."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor’s free hand snaps downward."
      },
      {
        "kind": "narration",
        "text": "Smoke erupts between them."
      },
      {
        "kind": "narration",
        "text": "Kakashi cuts through it."
      },
      {
        "kind": "narration",
        "text": "Nothing."
      },
      {
        "kind": "narration",
        "text": "By the time the smoke tears apart in the night air, she is gone."
      },
      {
        "kind": "narration",
        "text": "Kakashi listens."
      },
      {
        "kind": "narration",
        "text": "No footsteps."
      },
      {
        "kind": "narration",
        "text": "No movement across the roofs."
      },
      {
        "kind": "narration",
        "text": "Only Sakura petals settling back onto the street."
      },
      {
        "kind": "narration",
        "text": "The package is gone."
      },
      {
        "kind": "narration",
        "text": "The original target is gone."
      },
      {
        "kind": "narration",
        "text": "Now Masked Interceptor is gone too."
      },
      {
        "kind": "narration",
        "text": "Kakashi lowers the kunai."
      },
      {
        "kind": "record",
        "text": "Masked Interceptor survived Kakashi’s attempt on her life.\n\nShe will remember that.",
        "objective": "Report to ANBU."
      },
      {
        "kind": "narration",
        "text": "Kakashi leaves the Sakura tree behind.",
        "objective": "Report to ANBU."
      }
    ],
    "report": [
      {
        "kind": "narration",
        "text": "Kakashi returns to the rooftop."
      },
      {
        "kind": "narration",
        "text": "The ANBU operative is already waiting."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Report."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "The target made the handoff."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "To whom?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Another man. He left with the package."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "You let him go?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "A masked shinobi went after him."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "And you intervened."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Yes."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "The original target?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Gone."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "The package?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Gone with the receiver."
      },
      {
        "kind": "narration",
        "text": "A short silence."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "The masked shinobi?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "I tried to kill her."
      },
      {
        "kind": "narration",
        "text": "The operative watches him."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Tried?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "She survived."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "And then?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "She got away."
      },
      {
        "kind": "narration",
        "text": "A short silence."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Those weren’t your orders."
      },
      {
        "kind": "narration",
        "text": "Kakashi looks at him."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "That was my choice."
      },
      {
        "kind": "narration",
        "text": "The operative gives nothing away."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Very well, you may go."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Understood."
      }
    ],
    "office": [
      {
        "kind": "narration",
        "text": "The recovered package rests on Minato’s desk."
      },
      {
        "kind": "narration",
        "text": "ANBU Marked Target stands near the window."
      },
      {
        "kind": "narration",
        "text": "Package Smuggler is beside him."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor stands apart from both."
      },
      {
        "kind": "narration",
        "text": "One hand remains pressed against the fresh dressing beneath her clothing."
      },
      {
        "kind": "narration",
        "text": "The ANBU operative enters."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor looks toward him first."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "He reported it?"
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "All of it."
      },
      {
        "kind": "narration",
        "text": "Her eyes narrow slightly."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Including me?"
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Yes."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "What did he say?"
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "That he tried to kill you."
      },
      {
        "kind": "narration",
        "text": "A pause."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "That you survived."
      },
      {
        "kind": "narration",
        "text": "Package Smuggler glances toward her injury."
      },
      {
        "kind": "narration",
        "text": "She notices."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Barely."
      },
      {
        "kind": "narration",
        "text": "Package Smuggler’s expression changes."
      },
      {
        "kind": "dialogue",
        "speaker": "PACKAGE SMUGGLER",
        "text": "He actually landed it."
      },
      {
        "kind": "narration",
        "text": "She looks at him."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "He meant to."
      },
      {
        "kind": "narration",
        "text": "ANBU Marked Target studies her."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU MARKED TARGET",
        "text": "Did he know you were alive?"
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "He saw me breathe."
      },
      {
        "kind": "narration",
        "text": "Silence."
      },
      {
        "kind": "narration",
        "text": "Minato finally speaks."
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "Did he hesitate after that?"
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor thinks about it."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "No."
      },
      {
        "kind": "narration",
        "text": "She looks toward the recovered package."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "I left before he got another chance."
      },
      {
        "kind": "narration",
        "text": "Minato’s eyes move to the ANBU operative."
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "Did he explain himself?"
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "I asked."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor watches him."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "He said, ‘That was my choice.’"
      },
      {
        "kind": "narration",
        "text": "She is quiet for a moment."
      },
      {
        "kind": "narration",
        "text": "Then:"
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Good."
      },
      {
        "kind": "narration",
        "text": "Package Smuggler looks at her."
      },
      {
        "kind": "dialogue",
        "speaker": "PACKAGE SMUGGLER",
        "text": "Good?"
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor meets his eyes."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Now I know."
      },
      {
        "kind": "narration",
        "text": "No one asks her to explain."
      },
      {
        "kind": "narration",
        "text": "ANBU Marked Target looks toward Minato."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU MARKED TARGET",
        "text": "Does Kakashi know she made it back?"
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "No."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor’s gaze settles on Kakashi’s report."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Leave it that way."
      },
      {
        "kind": "narration",
        "text": "Minato studies her."
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "For now."
      },
      {
        "kind": "narration",
        "text": "She accepts that."
      },
      {
        "kind": "narration",
        "text": "Not forgiveness."
      },
      {
        "kind": "narration",
        "text": "Not closure."
      },
      {
        "kind": "narration",
        "text": "Just an answer."
      }
    ],
    "aftermathExitText": "By the time the smoke tears apart in the night air, she is gone.",
    "officeExitText": null,
    "stateLabel": "ALIVE · INJURED",
    "facts": {
      "lethalStrikeConnected": true,
      "attemptInterrupted": false,
      "konohaPatrolInterruption": false,
      "lethalStrikeEvaded": false,
      "briefMaskedInterceptorPursuit": false,
      "maskedInterceptorInjured": true,
      "maskedInterceptorWithdrew": true,
      "escapedThroughInterruption": false
    }
  },
  "LETHAL_ATTEMPT_INTERRUPTED": {
    "code": "I",
    "authorities": {
      "scene06": "f0a4f162f976093a334be9f034067bf1a542bae8",
      "scene07": "896b8fcc9d5c5dd6b019d2f51a5fbccdaee66a25",
      "scene08": "851244e7b5a0911ee7faddd44923115294a0e4a7"
    },
    "aftermath": [
      {
        "kind": "narration",
        "text": "Kakashi moves."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor braces—"
      },
      {
        "kind": "narration",
        "text": "Then light spills across the far end of the street."
      },
      {
        "kind": "narration",
        "text": "Voices."
      },
      {
        "kind": "narration",
        "text": "A Konoha patrol is turning into the junction."
      },
      {
        "kind": "narration",
        "text": "Kakashi’s kunai stops short."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor sees the hesitation."
      },
      {
        "kind": "narration",
        "text": "That is all she needs."
      },
      {
        "kind": "narration",
        "text": "She kicks loose a broken piece of stone beneath her heel."
      },
      {
        "kind": "narration",
        "text": "It strikes the ground between them."
      },
      {
        "kind": "narration",
        "text": "Dust bursts upward."
      },
      {
        "kind": "narration",
        "text": "Kakashi moves through it immediately."
      },
      {
        "kind": "narration",
        "text": "But the moment is already gone."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor clears the wall and disappears onto the rooftops beyond."
      },
      {
        "kind": "narration",
        "text": "The patrol voices grow closer."
      },
      {
        "kind": "narration",
        "text": "Kakashi remains beneath the Sakura tree."
      },
      {
        "kind": "narration",
        "text": "Kunai still in hand."
      },
      {
        "kind": "narration",
        "text": "The strike never landed."
      },
      {
        "kind": "narration",
        "text": "Not because he changed his mind."
      },
      {
        "kind": "narration",
        "text": "Because the opportunity was taken away from him."
      },
      {
        "kind": "narration",
        "text": "He puts the kunai away before the patrol reaches the street."
      },
      {
        "kind": "record",
        "text": "Kakashi tried to kill Masked Interceptor.\n\nSomething stopped him.\n\nShe will remember that.",
        "objective": "Report to ANBU."
      },
      {
        "kind": "narration",
        "text": "Kakashi leaves before the patrol reaches the Sakura tree.",
        "objective": "Report to ANBU."
      }
    ],
    "report": [
      {
        "kind": "narration",
        "text": "Kakashi returns to the rooftop."
      },
      {
        "kind": "narration",
        "text": "The ANBU operative is already waiting."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Report."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "The target made the handoff."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "To whom?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Another man. He left with the package."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "You let him go?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "A masked shinobi went after him."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "And you intervened."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Yes."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "The original target?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Gone."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "The package?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Gone with the receiver."
      },
      {
        "kind": "narration",
        "text": "A short silence."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "The masked shinobi?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "I tried to kill her."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "What happened?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "A patrol came through."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "And?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "She used it to get away."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Did you stop the attack?"
      },
      {
        "kind": "narration",
        "text": "Kakashi looks at him."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "No."
      },
      {
        "kind": "narration",
        "text": "A short silence."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Those weren’t your orders."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "That was my choice."
      },
      {
        "kind": "narration",
        "text": "The operative gives nothing away."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Very well, you may go."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Understood."
      }
    ],
    "office": [
      {
        "kind": "narration",
        "text": "The recovered package sits on Minato’s desk."
      },
      {
        "kind": "narration",
        "text": "ANBU Marked Target and Package Smuggler wait nearby."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor stands with them."
      },
      {
        "kind": "narration",
        "text": "Uninjured."
      },
      {
        "kind": "narration",
        "text": "Alert."
      },
      {
        "kind": "narration",
        "text": "The ANBU operative enters."
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "He reported the patrol?"
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Yes."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor gives a small shake of her head."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "They picked a useful corner."
      },
      {
        "kind": "narration",
        "text": "Package Smuggler looks toward her."
      },
      {
        "kind": "dialogue",
        "speaker": "PACKAGE SMUGGLER",
        "text": "That close?"
      },
      {
        "kind": "narration",
        "text": "She looks back at him."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Close enough."
      },
      {
        "kind": "narration",
        "text": "ANBU Marked Target watches her carefully."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU MARKED TARGET",
        "text": "Did Kakashi stop when he saw them?"
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor answers immediately."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "No."
      },
      {
        "kind": "narration",
        "text": "The room quiets."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "He lost the opening."
      },
      {
        "kind": "narration",
        "text": "That distinction lands."
      },
      {
        "kind": "narration",
        "text": "Package Smuggler looks toward Minato."
      },
      {
        "kind": "dialogue",
        "speaker": "PACKAGE SMUGGLER",
        "text": "So if the patrol hadn’t turned up—"
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "I know."
      },
      {
        "kind": "narration",
        "text": "She does not let him finish."
      },
      {
        "kind": "narration",
        "text": "Minato turns to the ANBU operative."
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "What did Kakashi say?"
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "That he tried to kill her."
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "Why?"
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "He said, ‘That was my choice.’"
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor looks toward Minato."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "He didn’t change his mind."
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "No."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Someone changed the moment for him."
      },
      {
        "kind": "narration",
        "text": "Minato holds her gaze."
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "Yes."
      },
      {
        "kind": "narration",
        "text": "She turns toward the window."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "That’s different."
      },
      {
        "kind": "narration",
        "text": "ANBU Marked Target looks at her."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU MARKED TARGET",
        "text": "You going to remember the difference?"
      },
      {
        "kind": "narration",
        "text": "She looks back."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "I’m going to remember all of it."
      },
      {
        "kind": "narration",
        "text": "Silence."
      },
      {
        "kind": "narration",
        "text": "Minato looks down at Kakashi’s report."
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "He doesn’t know you returned."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Good."
      }
    ],
    "aftermathExitText": "Masked Interceptor clears the wall and disappears onto the rooftops beyond.",
    "officeExitText": null,
    "stateLabel": "ALIVE · INTERRUPTION ESCAPE",
    "facts": {
      "lethalStrikeConnected": false,
      "attemptInterrupted": true,
      "konohaPatrolInterruption": true,
      "lethalStrikeEvaded": false,
      "briefMaskedInterceptorPursuit": false,
      "maskedInterceptorInjured": false,
      "maskedInterceptorWithdrew": true,
      "escapedThroughInterruption": true
    }
  },
  "LETHAL_ATTEMPT_ESCAPED": {
    "code": "E",
    "authorities": {
      "scene06": "5c6389d8c4bc53f27bf55cf269a2b66ee5e3848c",
      "scene07": "b52ed9670ddc369fb115d3a61147c496fc75155f",
      "scene08": "4e679e92e6c97968bcf970a83b9ba88e19d96355"
    },
    "aftermath": [
      {
        "kind": "narration",
        "text": "Kakashi disappears."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor moves at the same instant."
      },
      {
        "kind": "narration",
        "text": "His kunai cuts through empty air."
      },
      {
        "kind": "narration",
        "text": "A burst of smoke tears across the street."
      },
      {
        "kind": "narration",
        "text": "Kakashi lands inside it."
      },
      {
        "kind": "narration",
        "text": "Nothing."
      },
      {
        "kind": "narration",
        "text": "He turns toward the rooftops."
      },
      {
        "kind": "narration",
        "text": "A shadow clears the nearest wall."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor."
      },
      {
        "kind": "narration",
        "text": "Kakashi launches after her."
      },
      {
        "kind": "narration",
        "text": "She crosses one roof."
      },
      {
        "kind": "narration",
        "text": "Then another."
      },
      {
        "kind": "narration",
        "text": "Kakashi gains ground."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor glances back once."
      },
      {
        "kind": "narration",
        "text": "She knows he is still coming."
      },
      {
        "kind": "narration",
        "text": "Then she drops between two buildings."
      },
      {
        "kind": "narration",
        "text": "Kakashi reaches the edge a heartbeat later."
      },
      {
        "kind": "narration",
        "text": "The alley below is empty."
      },
      {
        "kind": "narration",
        "text": "He scans the windows."
      },
      {
        "kind": "narration",
        "text": "The adjoining roofs."
      },
      {
        "kind": "narration",
        "text": "The streets beyond them."
      },
      {
        "kind": "narration",
        "text": "No movement."
      },
      {
        "kind": "narration",
        "text": "No trail."
      },
      {
        "kind": "narration",
        "text": "She is gone."
      },
      {
        "kind": "narration",
        "text": "Kakashi remains on the roof for another moment."
      },
      {
        "kind": "narration",
        "text": "The kunai is still in his hand."
      },
      {
        "kind": "narration",
        "text": "He came here intending to kill her."
      },
      {
        "kind": "narration",
        "text": "She escaped him."
      },
      {
        "kind": "record",
        "text": "Masked Interceptor escaped Kakashi’s attempt on her life.\n\nShe will remember that.",
        "objective": "Report to ANBU."
      },
      {
        "kind": "narration",
        "text": "Kakashi puts the kunai away.",
        "objective": "Report to ANBU."
      },
      {
        "kind": "narration",
        "text": "He turns back toward the village.",
        "objective": "Report to ANBU."
      }
    ],
    "report": [
      {
        "kind": "narration",
        "text": "Kakashi returns to the rooftop."
      },
      {
        "kind": "narration",
        "text": "The ANBU operative is already waiting."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Report."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "The target made the handoff."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "To whom?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Another man. He left with the package."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "You let him go?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "A masked shinobi went after him."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "And you intervened."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Yes."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "The original target?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Gone."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "The package?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Gone with the receiver."
      },
      {
        "kind": "narration",
        "text": "A short silence."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "The masked shinobi?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "I tried to kill her."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "And?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "She got away."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "You pursued?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Yes."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "How far?"
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Not far enough."
      },
      {
        "kind": "narration",
        "text": "A short silence."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Those weren’t your orders."
      },
      {
        "kind": "narration",
        "text": "Kakashi looks at him."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "That was my choice."
      },
      {
        "kind": "narration",
        "text": "The operative gives nothing away."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Very well, you may go."
      },
      {
        "kind": "dialogue",
        "speaker": "KAKASHI",
        "text": "Understood."
      }
    ],
    "office": [
      {
        "kind": "narration",
        "text": "The recovered package rests on Minato’s desk."
      },
      {
        "kind": "narration",
        "text": "ANBU Marked Target stands near the window."
      },
      {
        "kind": "narration",
        "text": "Package Smuggler waits beside him."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor leans against the far wall."
      },
      {
        "kind": "narration",
        "text": "The ANBU operative enters."
      },
      {
        "kind": "narration",
        "text": "She looks almost amused."
      },
      {
        "kind": "narration",
        "text": "Almost."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Did he mention the rooftops?"
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Yes."
      },
      {
        "kind": "narration",
        "text": "Package Smuggler looks at her."
      },
      {
        "kind": "dialogue",
        "speaker": "PACKAGE SMUGGLER",
        "text": "He chased you?"
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "He tried."
      },
      {
        "kind": "narration",
        "text": "ANBU Marked Target catches the wording."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU MARKED TARGET",
        "text": "And the first strike?"
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Missed."
      },
      {
        "kind": "narration",
        "text": "A faint smile."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "So did the rest."
      },
      {
        "kind": "narration",
        "text": "Package Smuggler exhales."
      },
      {
        "kind": "dialogue",
        "speaker": "PACKAGE SMUGGLER",
        "text": "You sound pleased."
      },
      {
        "kind": "narration",
        "text": "The smile disappears."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "I’m alive."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "I’m allowed to enjoy that."
      },
      {
        "kind": "narration",
        "text": "Even Package Smuggler has no answer."
      },
      {
        "kind": "narration",
        "text": "Minato turns toward the ANBU operative."
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "Did Kakashi explain why?"
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "I asked."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor watches him."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "He said, ‘That was my choice.’"
      },
      {
        "kind": "narration",
        "text": "She goes still."
      },
      {
        "kind": "narration",
        "text": "The amusement is gone now."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "He really said that?"
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU OPERATIVE",
        "text": "Yes."
      },
      {
        "kind": "narration",
        "text": "She looks toward the window."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Good."
      },
      {
        "kind": "narration",
        "text": "ANBU Marked Target raises an eyebrow."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU MARKED TARGET",
        "text": "You keep saying things like that."
      },
      {
        "kind": "narration",
        "text": "She looks at him."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "I’d rather know what someone is."
      },
      {
        "kind": "narration",
        "text": "Minato’s eyes move to her."
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "You think one decision tells you that?"
      },
      {
        "kind": "narration",
        "text": "She considers him."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "No."
      },
      {
        "kind": "narration",
        "text": "A pause."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "But it tells me what he was willing to do to me."
      },
      {
        "kind": "narration",
        "text": "Minato accepts that."
      },
      {
        "kind": "narration",
        "text": "Package Smuggler looks toward Kakashi’s report."
      },
      {
        "kind": "dialogue",
        "speaker": "PACKAGE SMUGGLER",
        "text": "Does he know she’s here?"
      },
      {
        "kind": "dialogue",
        "speaker": "MINATO",
        "text": "No."
      },
      {
        "kind": "narration",
        "text": "Masked Interceptor pushes away from the wall."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "Then let him wonder."
      },
      {
        "kind": "narration",
        "text": "ANBU Marked Target looks toward her."
      },
      {
        "kind": "dialogue",
        "speaker": "ANBU MARKED TARGET",
        "text": "Planning something?"
      },
      {
        "kind": "narration",
        "text": "She walks toward the door."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "No."
      },
      {
        "kind": "narration",
        "text": "She stops beside him."
      },
      {
        "kind": "dialogue",
        "speaker": "MASKED INTERCEPTOR",
        "text": "I’m remembering."
      },
      {
        "kind": "narration",
        "text": "Then she leaves."
      }
    ],
    "aftermathExitText": "Then she drops between two buildings.",
    "officeExitText": "Then she leaves.",
    "stateLabel": "ALIVE · ESCAPED",
    "facts": {
      "lethalStrikeConnected": false,
      "attemptInterrupted": false,
      "konohaPatrolInterruption": false,
      "lethalStrikeEvaded": true,
      "briefMaskedInterceptorPursuit": true,
      "maskedInterceptorInjured": false,
      "maskedInterceptorWithdrew": true,
      "escapedThroughInterruption": false
    }
  }
});

function clone(v){try{return CORE.clone(v);}catch(_error){try{return JSON.parse(JSON.stringify(v));}catch(_e){return v;}}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function occurrence(id){return id?A.findOccurrence(String(id)):null;}
function factOf(row){return row&&(row.fact||row.data)||{};}
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(ch){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch];});}
function stable(prefix,extra){const rt=active(),raw=JSON.stringify(Object.assign({prefix:prefix,instanceId:String(rt&&rt.instanceId||"")},extra||{}));let h=2166136261;for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619);}return prefix+"::"+(h>>>0).toString(16);}
function resolverOccurrence(){const rt=active();return occurrence(rt&&rt.localContext&&rt.localContext.kakashiScene06AW2CResolutionOccurrenceId);}
function selectedOutcome(){const rt=active(),f=factOf(resolverOccurrence());return String(rt&&rt.localContext&&rt.localContext.kakashiScene06AW2COutcomeRef||f.selectedOutcomeRef||"");}
function cfg(outcome){return DATA[String(outcome||selectedOutcome())]||null;}
function nonKillOutcome(outcome){return !!cfg(outcome);}
function cursor(key,length){const rt=active(),n=Number(rt&&rt.localContext&&rt.localContext[key]||0);return Number.isInteger(n)?Math.max(0,Math.min(length-1,n)):0;}
function sequence(rt){
  rt=rt||active();if(!rt)return null;const d=cfg();if(!d)return null;
  let rows=null,key=null;
  if(rt.beatId===AFTERMATH){rows=d.aftermath;key=CURSOR_A;}
  else if(rt.beatId===SCENE07){rows=d.report;key=CURSOR_7;}
  else if(rt.beatId===SCENE08){rows=d.office;key=CURSOR_8;}
  else return null;
  const i=cursor(key,rows.length);return{rows:rows,index:i,cue:rows[i],atEnd:i===rows.length-1,key:key,data:d};
}
function focusForCue(cue,fallback){
  if(!cue)return fallback;
  const speaker=String(cue.speaker||"");
  if(speaker==="KAKASHI")return"academy_kakashi";
  if(speaker==="ANBU OPERATIVE")return ANBU;
  if(speaker==="MASKED INTERCEPTOR")return MI;
  if(speaker==="ANBU MARKED TARGET")return AMT;
  if(speaker==="PACKAGE SMUGGLER")return PS;
  if(speaker==="MINATO")return MINATO;
  const t=String(cue.text||"");
  if(t.includes("Masked Interceptor"))return MI;
  if(t.includes("ANBU Marked Target"))return AMT;
  if(t.includes("Package Smuggler"))return PS;
  if(t.includes("ANBU operative"))return ANBU;
  if(t.includes("Minato"))return MINATO;
  if(t.includes("Kakashi"))return"academy_kakashi";
  return fallback;
}
function commitOutcomeLedger(){
  const rt=active(),source=resolverOccurrence(),outcome=selectedOutcome(),d=cfg(outcome);
  if(!rt||!source||!d)return{success:false,reason:"nonkill_resolver_fact_required"};
  const sourceFact=factOf(source);if(String(sourceFact.selectedOutcomeRef||"")!==outcome)return{success:false,reason:"nonkill_resolver_outcome_mismatch"};
  const old=rt.localContext&&rt.localContext.kakashiScene06W2CNonKillLedgerOccurrenceId;if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const id=stable("occ_origin_kakashi_scene06_w2c_nonkill",{resolver:String(source.occurrenceId||""),outcome:outcome});
  const f=d.facts;
  const fact={
    factClass:"academy_kakashi_scene06_w2c_nonkill_outcome",sceneId:"SCENE_06A_W2C_"+d.code,authorityCommit:d.authorities.scene06,
    selectedOutcomeRef:outcome,maskedInterceptorState:"ALIVE",lethalIntentCommitted:true,failedLethalAttempt:true,mercyOutcome:false,
    lethalStrikeConnected:f.lethalStrikeConnected===true,attemptInterrupted:f.attemptInterrupted===true,konohaPatrolInterruption:f.konohaPatrolInterruption===true,
    lethalStrikeEvaded:f.lethalStrikeEvaded===true,briefMaskedInterceptorPursuit:f.briefMaskedInterceptorPursuit===true,
    maskedInterceptorInjured:f.maskedInterceptorInjured===true,maskedInterceptorWithdrew:f.maskedInterceptorWithdrew===true,
    escapedThroughInterruption:f.escapedThroughInterruption===true,sharedHistoryPersists:true,guaranteedRetaliation:false,
    packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"PACKAGE_SMUGGLER",recovered:false,available:false},
    packageSmugglerEscapedWithPackage:true,anbuMarkedTargetEscaped:true,packagePursuitReopened:false,anbuMarkedTargetPursuitReopened:false,
    pakkunPresent:false,sourceResolverOccurrenceId:String(source.occurrenceId||"")
  };
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_nonkill_lethal_attempt_ledger",outcome:outcome,participantRefs:[ORIGIN_ID,MI],sourceRefs:[{type:"origin_occurrence",id:String(source.occurrenceId||""),role:"factual_resolver"}]});
  if(!out||out.success!==true)return out||{success:false,reason:"nonkill_ledger_commit_failed"};
  rt.localContext=Object.assign({},rt.localContext||{},{kakashiScene06W2CNonKillLedgerOccurrenceId:id});save();return{success:true,occurrenceId:id};
}
function commitReport(){
  const rt=active(),outcome=selectedOutcome(),d=cfg(outcome),ledger=commitOutcomeLedger();
  if(!rt||!d||!ledger||ledger.success!==true)return ledger||{success:false,reason:"nonkill_ledger_required"};
  const old=rt.localContext&&rt.localContext.kakashiScene07W2CNonKillReportOccurrenceId;if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const id=stable("occ_origin_kakashi_scene07_w2c_nonkill_report",{ledger:ledger.occurrenceId,outcome:outcome}),f=d.facts;
  const fact={
    factClass:"academy_kakashi_scene07_w2c_"+d.code.toLowerCase()+"_anbu_report",sceneId:"SCENE_07A_W2C_"+d.code,authorityCommit:d.authorities.scene07,
    selectedOutcomeRef:outcome,packageHandoffOccurred:true,packageSmugglerEscapedWithPackage:true,anbuMarkedTargetEscaped:true,
    kakashiIntervenedAgainstMaskedInterceptor:true,kakashiDefeatedMaskedInterceptor:true,kakashiCommittedLethalIntent:true,
    failedLethalAttemptTruthfullyReported:true,lethalDecisionExplanation:"That was my choice.",noMercyRewrite:true,
    lethalStrikeConnected:f.lethalStrikeConnected===true,attemptInterrupted:f.attemptInterrupted===true,konohaPatrolInterruption:f.konohaPatrolInterruption===true,
    lethalStrikeEvaded:f.lethalStrikeEvaded===true,briefMaskedInterceptorPursuit:f.briefMaskedInterceptorPursuit===true,
    maskedInterceptorSurvived:true,maskedInterceptorEscaped:true,pakkunPresent:false,objectiveRemovedAtSceneEnd:true
  };
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_anbu_report",outcome:"w2c_"+d.code.toLowerCase()+"_nonkill_reported",participantRefs:[ORIGIN_ID,ANBU,MI],sourceRefs:[{type:"origin_occurrence",id:ledger.occurrenceId,role:"nonkill_lethal_attempt"}]});
  if(!out||out.success!==true)return out||{success:false,reason:"nonkill_anbu_report_commit_failed"};
  rt.localContext=Object.assign({},rt.localContext||{},{kakashiScene07W2CNonKillReportOccurrenceId:id});save();
  const terminal=TERMINAL.commitTerminalDebrief();if(!terminal||terminal.success!==true)return terminal||{success:false,reason:"terminal_debrief_commit_failed"};
  return{success:true,occurrenceId:id};
}
function commitHiddenReview(){
  const rt=active(),outcome=selectedOutcome(),d=cfg(outcome);if(!rt||!d)return{success:false,reason:"nonkill_outcome_required"};
  const report=occurrence(rt.localContext&&rt.localContext.kakashiScene07W2CNonKillReportOccurrenceId);if(!report)return{success:false,reason:"nonkill_anbu_report_required"};
  const old=rt.localContext&&rt.localContext.kakashiScene08W2CNonKillOccurrenceId;if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const id=stable("occ_origin_kakashi_scene08_w2c_nonkill",{report:String(report.occurrenceId||""),outcome:outcome}),f=d.facts;
  const fact={
    factClass:"academy_kakashi_scene08_w2c_"+d.code.toLowerCase()+"_hidden_review",sceneId:"SCENE_08A_W2C_"+d.code,authorityCommit:d.authorities.scene08,
    selectedOutcomeRef:outcome,stopAssassin:true,maskedInterceptorState:"ALIVE",maskedInterceptorPresent:true,
    maskedInterceptorInjured:f.maskedInterceptorInjured===true,konohaPatrolInterruption:f.konohaPatrolInterruption===true,
    briefMaskedInterceptorPursuit:f.briefMaskedInterceptorPursuit===true,sharedHistoryPersists:true,guaranteedRetaliation:false,
    anbuMarkedTargetSurvived:true,packageSmugglerSurvived:true,hiddenOperationPackageRecoveredAfterward:true,kakashiMissionPackageRecovered:false,
    kakashiPostBattlePackagePursuitAvailable:false,kakashiPostBattleAnbuMarkedTargetPursuitAvailable:false,
    kakashiPresent:false,kakashiKnowledgeGranted:false,kakashiLearnsMaskedInterceptorReturned:false,kakashiLearnsHiddenOperationTruth:false
  };
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_hidden_operation_review",outcome:"w2c_"+d.code.toLowerCase()+"_hidden_review_committed",participantRefs:[MINATO,ANBU,AMT,PS,MI],sourceRefs:[{type:"origin_occurrence",id:String(report.occurrenceId||""),role:"anbu_report"}]});
  if(!out||out.success!==true)return out||{success:false,reason:"nonkill_hidden_review_commit_failed"};
  rt.localContext=Object.assign({},rt.localContext||{},{kakashiScene08W2CNonKillOccurrenceId:id});save();return{success:true,occurrenceId:id};
}
function installBeats(){
  const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;if(!m)return false;
  m.set(AFTERMATH,{beatId:AFTERMATH,mode:"narration",text:"",exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(SCENE07,{beatId:SCENE07,mode:"narration",environmentRef:{assetId:"kakashi_origin_rooftop_night"},text:"",exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(SCENE08,{beatId:SCENE08,mode:"narration",environmentRef:{assetId:"kakashi_origin_hokage_administration_interior_night"},text:"",exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(RECEIPT,{beatId:RECEIPT,mode:"narration",text:"",exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(EXIT,{beatId:EXIT,mode:"narration",text:"YOUR CHRONICLE BEGINS",exitScene:true,allowPresentationClose:true,choices:[]});
  return true;
}
function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const s=document.createElement("style");s.id=STYLE_ID;s.textContent=
  "."+BOARD_CLASS+"{position:absolute;inset:0;z-index:5;pointer-events:none;overflow:hidden}"+
  "."+BOARD_CLASS+" .sc-scene-board-33900__actors{left:2.5%!important;right:2.5%!important;top:8%!important;bottom:20%!important;display:flex!important;justify-content:space-between!important;align-items:flex-end!important;gap:2%!important;padding:0 5.4%!important}"+
  "."+BOARD_CLASS+" .sc-scene-board-33900__actor{width:min(22vw,310px)!important;max-height:490px!important;aspect-ratio:7/10!important}"+
  "."+BOARD_CLASS+" .sc-w2c-nonkill-exit-right{animation:w2cNonKillExitRight35780 560ms cubic-bezier(.36,.08,.76,.3) both!important}"+
  "@keyframes w2cNonKillExitRight35780{0%{opacity:.82;transform:translateX(0) scale(.96)}100%{opacity:0;transform:translateX(70vw) rotate(4deg) scale(.93)}}"+
  "#story-scene-presentation-layer[data-sc-kakashi-w2c-nonkill-stage='office'] .sc-chronicle-layout{position:absolute!important;left:3.4%!important;top:13%!important;width:min(33%,430px)!important;margin:0!important;align-self:start!important}"+
  "#story-scene-presentation-layer[data-sc-kakashi-w2c-nonkill-stage='office'] .sc-story-panel{max-height:36vh!important}"+
  "."+BOARD_CLASS+"[data-stage='office'] .sc-scene-board-33900__actors{left:0!important;right:0!important;top:0!important;bottom:0!important;display:block!important;padding:0!important}"+
  "."+BOARD_CLASS+"[data-stage='office'] .sc-scene-board-33900__actor{position:absolute!important;width:min(12.5vw,168px)!important;max-height:300px!important}"+
  "."+BOARD_CLASS+"[data-stage='office'] .sc-scene-board-33900__actor[data-actor-id='"+MINATO+"']{left:42%!important;top:1.5%!important;width:min(16.5vw,232px)!important;max-height:400px!important;z-index:6}"+
  "."+BOARD_CLASS+"[data-stage='office'] .sc-scene-board-33900__actor[data-actor-id='"+ANBU+"']{left:20.5%!important;bottom:30.5%!important;z-index:4}"+
  "."+BOARD_CLASS+"[data-stage='office'] .sc-scene-board-33900__actor[data-actor-id='"+MI+"']{left:33.5%!important;bottom:30.5%!important;z-index:5}"+
  "."+BOARD_CLASS+"[data-stage='office'] .sc-scene-board-33900__actor[data-actor-id='"+AMT+"']{left:57.5%!important;bottom:30.5%!important;z-index:3}"+
  "."+BOARD_CLASS+"[data-stage='office'] .sc-scene-board-33900__actor[data-actor-id='"+PS+"']{left:69.5%!important;bottom:30.5%!important;z-index:3}"+
  "#story-scene-presentation-layer[data-sc-kakashi-w2c-nonkill-stage='office'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-previous{display:none!important}"+
  "#story-scene-presentation-layer[data-sc-kakashi-w2c-nonkill-stage='office'][data-sc-board-ui-mode='performance_narration'] .sc-dialogue-panel-33910{display:none!important}"+
  "#story-scene-presentation-layer[data-sc-kakashi-w2c-nonkill-stage='office'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-current{left:3.5%!important;right:auto!important;top:18%!important;bottom:auto!important;width:min(28%,400px)!important}"+
  "#story-scene-presentation-layer[data-sc-kakashi-w2c-nonkill-stage='office'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-current[data-speaker-id='konoha_anbu_contact'],#story-scene-presentation-layer[data-sc-kakashi-w2c-nonkill-stage='office'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-current[data-speaker-id='masked_interceptor']{left:auto!important;right:3.5%!important}"+
  "."+BOARD_CLASS+" .sc-w2c-nonkill-enter-left{animation:w2cNonKillEnterLeft35780 500ms cubic-bezier(.18,.76,.24,1) both!important}"+
  "@keyframes w2cNonKillEnterLeft35780{0%{opacity:0;transform:translateX(-18vw) scale(.94);filter:brightness(.38) blur(2px)}100%{opacity:.72;transform:translateX(0) scale(.95);filter:saturate(.78) brightness(.88)}}"+
  "."+BOARD_CLASS+" .sc-w2c-nonkill-enter-left.is-focus{animation-name:w2cNonKillEnterLeftFocus35780}@keyframes w2cNonKillEnterLeftFocus35780{0%{opacity:0;transform:translateX(-18vw) scale(.95)}100%{opacity:1;transform:translateX(0) scale(1)}}"+
  ".sc-kakashi-w2c-nonkill-package{position:absolute;left:50%;right:auto;bottom:13.2%;transform:translateX(-50%);padding:8px 12px;border:1px solid rgba(214,169,58,.55);background:rgba(4,8,12,.9);color:#e6c65e;font-size:10px;font-weight:900;letter-spacing:.12em;z-index:7;white-space:nowrap}"+
  "#"+RECEIPT_ID+"{position:fixed;inset:0;z-index:120000;display:grid;place-items:center;padding:32px;background:radial-gradient(circle at 50% 12%,rgba(35,56,70,.42),rgba(2,6,10,.98) 60%);color:#eee6d2}"+
  "#"+RECEIPT_ID+" .card{width:min(980px,94vw);max-height:90vh;overflow:auto;padding:32px;border:1px solid rgba(214,169,58,.55);background:linear-gradient(155deg,rgba(9,16,22,.99),rgba(3,7,11,.99));box-shadow:0 30px 100px #000}"+
  "#"+RECEIPT_ID+" h1{font:400 38px Georgia,serif;color:#efdba4;margin:8px 0 4px}#"+RECEIPT_ID+" .eye{color:#60d7e1;font-size:10px;font-weight:900;letter-spacing:.2em}#"+RECEIPT_ID+" .sub{color:#ae9654;font-size:11px;letter-spacing:.16em}"+
  "#"+RECEIPT_ID+" .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:25px 0}#"+RECEIPT_ID+" section{padding:15px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.025)}#"+RECEIPT_ID+" h2{margin:0 0 10px;color:#e0bf63;font-size:11px;letter-spacing:.12em}#"+RECEIPT_ID+" li{margin-bottom:8px;color:#cfd4d2;line-height:1.45;font-size:13px}#"+RECEIPT_ID+" button{min-height:46px;padding:0 22px;border:1px solid rgba(214,169,58,.65);background:#48370f;color:#f5d877;font-weight:900;letter-spacing:.1em;cursor:pointer}"+
  "@media(prefers-reduced-motion:reduce){."+BOARD_CLASS+" .sc-w2c-nonkill-exit-right{animation:none!important;opacity:0!important;transform:translateX(70vw)!important}."+BOARD_CLASS+" .sc-w2c-nonkill-enter-left{animation:none!important}}@media(max-width:900px){#"+RECEIPT_ID+" .grid{grid-template-columns:1fr}}";
  document.head.appendChild(s);return true;
}
function card(id,label,img,state,focus,extra){
  return'<figure class="sc-scene-board-33900__actor '+(focus?"is-focus ":"")+(extra||"")+'" data-actor-id="'+esc(id)+'"><div class="sc-scene-board-33900__actor-frame"></div><img src="'+esc(img)+'" alt=""><figcaption class="sc-scene-board-33900__actor-tag"><strong>'+esc(label)+'</strong><small>'+esc(state)+'</small></figcaption></figure>';
}
function miVisibleAftermath(p){
  const exitText=String(p.data.aftermathExitText||"");if(!exitText)return{visible:true,extra:""};
  const exitIndex=p.rows.findIndex(function(row){return row&&row.text===exitText;});
  if(exitIndex<0)return{visible:true,extra:""};
  if(p.index>exitIndex)return{visible:false,extra:""};
  return{visible:true,extra:p.index===exitIndex?"sc-w2c-nonkill-exit-right":""};
}
function board(rt,p){
  const d=p.data,cue=p.cue;
  if(rt.beatId===AFTERMATH){
    const focus=focusForCue(cue,"academy_kakashi"),vis=miVisibleAftermath(p),actors=[
      card("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png","PRESENT",focus==="academy_kakashi","")
    ];
    if(vis.visible)actors.push(card(MI,"MASKED INTERCEPTOR","NPC/masked_interceptor.png",d.stateLabel,focus===MI,vis.extra));
    const objective=cue&&cue.objective||"Retrieve the package.";
    return'<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">SAKURA TREE · MAIN STREET</div><div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>'+esc(objective)+'</div></div><div class="sc-scene-board-33900__actors" data-count="'+actors.length+'">'+actors.join("")+'</div>';
  }
  if(rt.beatId===SCENE07){
    const focus=focusForCue(cue,ANBU);
    return'<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">KONOHA ROOFTOP · NIGHT</div><div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>'+REPORT_OBJECTIVE+'</div></div><div class="sc-scene-board-33900__actors" data-count="2">'+card("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png","REPORTING",focus==="academy_kakashi","")+card(ANBU,"ANBU OPERATIVE","NPC/konoha_anbu.png","RECEIVING REPORT",focus===ANBU,"")+'</div>';
  }
  const focus=focusForCue(cue,MI),officeExit=d.officeExitText&&cue&&cue.text===d.officeExitText?"sc-w2c-nonkill-exit-right":"";
  const entryIndex=p.rows.findIndex(function(row){return row&&row.text==="The ANBU operative enters.";});
  const anbuVisible=entryIndex<0||p.index>=entryIndex,anbuExtra=entryIndex>=0&&p.index===entryIndex?"sc-w2c-nonkill-enter-left":"";
  const officeActors=[
    card(MINATO,"MINATO","Assets/Kage/kage_minato.png","HOKAGE",focus===MINATO,""),
    anbuVisible?card(ANBU,"ANBU OPERATIVE","NPC/konoha_anbu.png","PRESENT",focus===ANBU,anbuExtra):"",
    card(MI,"MASKED INTERCEPTOR","NPC/masked_interceptor.png",d.stateLabel,focus===MI,officeExit),
    card(AMT,"ANBU MARKED TARGET","NPC/anbu_marked_target.png","ALIVE",focus===AMT,""),
    card(PS,"PACKAGE SMUGGLER","NPC/package_smuggler.png","ALIVE",focus===PS,"")
  ].join("");
  return'<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">HOKAGE ADMINISTRATION · NIGHT</div></div><div class="sc-scene-board-33900__actors" data-count="'+(anbuVisible?5:4)+'">'+officeActors+'</div><div class="sc-kakashi-w2c-nonkill-package">RECOVERED PACKAGE · HIDDEN OPERATION</div>';
}
function setBackdrop(stage,path){stage.style.backgroundImage='linear-gradient(180deg,rgba(2,5,8,.03),rgba(2,5,8,.08) 55%,rgba(2,5,8,.62)),url("'+String(path).replace(/"/g,"%22")+'")';stage.style.backgroundPosition="center";stage.style.backgroundSize="cover";stage.style.backgroundRepeat="no-repeat";}
function render(){
  if(typeof document==="undefined")return false;const rt=active(),p=sequence(rt);if(!rt||!p)return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer;installStyle();
  const key=rt.beatId===SCENE08?"office":rt.beatId===SCENE07?"report":"aftermath";layer.dataset.scKakashiW2cNonkillStage=key;
  setBackdrop(stage,rt.beatId===AFTERMATH?SAKURA_BG:rt.beatId===SCENE07?ROOFTOP_BG:OFFICE_BG);
  let b=stage.querySelector("."+BOARD_CLASS);if(!b){b=document.createElement("section");b.className=BOARD_CLASS;b.setAttribute("aria-hidden","true");stage.appendChild(b);}b.dataset.stage=key;b.innerHTML=board(rt,p);
  const text=layer.querySelector(".sc-story-text");if(text)text.textContent=p.cue.text;
  const name=layer.querySelector(".sc-story-name");if(name){name.textContent=p.cue.kind==="dialogue"?p.cue.speaker||"":p.cue.kind==="record"?"SHINOBI RECORD":"NARRATION";name.style.display="block";}
  const kicker=layer.querySelector(".sc-story-kicker");if(kicker)kicker.textContent=p.cue.kind==="record"?"SHINOBI RECORD UPDATED":rt.beatId===SCENE07?"ANBU REPORT · ACADEMY KAKASHI":rt.beatId===SCENE08?"HOKAGE'S OFFICE · HIDDEN OPERATION":"NARRATION · ACADEMY KAKASHI";
  return true;
}
function wipe(next){
  if(typeof document==="undefined")return next();const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return next();const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer,n=document.createElement("div");
  n.style.cssText="position:absolute;inset:0;z-index:99;background:#000;opacity:0;transition:opacity 260ms ease;pointer-events:none";stage.appendChild(n);if(typeof requestAnimationFrame==="function")requestAnimationFrame(function(){n.style.opacity="1";});else n.style.opacity="1";
  setTimeout(function(){next();n.style.opacity="0";setTimeout(function(){try{n.remove();}catch(_error){}},280);},280);return{success:true,pending:true};
}
function beginOutcome(outcome){
  outcome=String(outcome||selectedOutcome());
  if(outcome==="LETHAL_ATTEMPT_KILLED"){const fn=globalThis.beginAcademyKakashiConfirmedKill35770;return typeof fn==="function"?fn():false;}
  const rt=active(),d=cfg(outcome),source=resolverOccurrence();if(!rt||rt.beatId!==SOURCE_HOLD||!d||!source)return false;
  if(String(factOf(source).selectedOutcomeRef||"")!==outcome)return false;
  const ledger=commitOutcomeLedger();if(!ledger||ledger.success!==true)return false;
  rt.localContext=Object.assign({},rt.localContext||{},{[CURSOR_A]:0});save();
  const enterAfterAttempt=function(){rt.beatId=AFTERMATH;save();try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}};
  if(typeof document==="undefined"){enterAfterAttempt();return true;}
  const animate=globalThis.playAcademyKakashiLethalAttemptAnimation35770;
  if(typeof animate==="function")return animate(function(){enterAfterAttempt();});
  enterAfterAttempt();return true;
}
function enter07(){const rt=active(),d=cfg();if(!rt||!d)return{success:false,reason:"nonkill_outcome_required"};rt.beatId=SCENE07;rt.localContext=Object.assign({},rt.localContext||{},{[CURSOR_7]:0});save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:SCENE07};}
function enter08(){const rt=active(),r=commitReport();if(!r||r.success!==true)return r;const h=commitHiddenReview();if(!h||h.success!==true)return h;rt.beatId=SCENE08;rt.localContext=Object.assign({},rt.localContext||{},{[CURSOR_8]:0});save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:SCENE08};}
function receiptRows(){
  const outcome=selectedOutcome(),d=cfg(outcome);
  const common=["Package Smuggler escaped with the package.","ANBU Marked Target escaped.","Kakashi defeated Masked Interceptor in PL Battle."];
  const byOutcome={
    LETHAL_ATTEMPT_SURVIVED:{outcome:"Masked Interceptor survived Kakashi’s lethal attempt and escaped.",history:["Masked Interceptor survived Kakashi’s attempt on her life.","She will remember that."]},
    LETHAL_ATTEMPT_INTERRUPTED:{outcome:"A Konoha patrol interrupted Kakashi’s lethal-action window; Masked Interceptor escaped.",history:["Kakashi tried to kill Masked Interceptor.","Something stopped him.","She will remember that."]},
    LETHAL_ATTEMPT_ESCAPED:{outcome:"Masked Interceptor evaded Kakashi’s lethal attempt and escaped his brief pursuit.",history:["Masked Interceptor escaped Kakashi’s attempt on her life.","She will remember that."]}
  }[outcome];
  return{decisions:["Stopped Masked Interceptor after the package handoff.","Chose to attempt to kill Masked Interceptor."],outcomes:common.concat([byOutcome.outcome,"Kakashi truthfully reported the failed lethal attempt to ANBU."]),history:byOutcome.history.concat(["No Pakkun involvement was created on this route."])};
}
function openReceipt(){
  const rt=active(),h=commitHiddenReview();if(!rt||!h||h.success!==true)return h||{success:false,reason:"hidden_review_required"};
  const receipt=TERMINAL.commitChronicleReceiptAndRewards();if(!receipt||receipt.success!==true)return receipt||{success:false,reason:"chronicle_receipt_commit_failed"};rt.beatId=RECEIPT;save();
  if(typeof document==="undefined")return{success:true,headless:true};installStyle();const old=document.getElementById(RECEIPT_ID);if(old)old.remove();const rows=receiptRows(),li=function(a){return a.map(function(x){return"<li>"+esc(x)+"</li>";}).join("");},n=document.createElement("div");
  n.id=RECEIPT_ID;n.innerHTML='<div class="card"><div class="eye">YOUR ORIGIN</div><h1>ACADEMY KAKASHI</h1><div class="sub">RECORDED IN YOUR CHRONICLE</div><div class="grid"><section><h2>YOUR DECISIONS</h2><ul>'+li(rows.decisions)+'</ul></section><section><h2>WHAT HAPPENED</h2><ul>'+li(rows.outcomes)+'</ul></section><section><h2>HISTORY CREATED</h2><ul>'+li(rows.history)+'</ul></section></div><button type="button">ENTER KONOHA</button><div class="err" hidden></div></div>';document.body.appendChild(n);
  const b=n.querySelector("button"),e=n.querySelector(".err");b.addEventListener("click",function(){b.disabled=true;const out=completeToKonoha();if(!out||out.success!==true){b.disabled=false;e.hidden=false;e.textContent=String(out&&out.reason||"Origin completion is not ready.");}});return{success:true};
}
function completeToKonoha(){
  const rt=active();if(!rt||rt.beatId!==RECEIPT)return{success:false,reason:"chronicle_receipt_not_active"};const done=TERMINAL.guardedOriginCompletion();if(!done||done.success!==true)return done||{success:false,reason:"origin_completion_failed"};
  if(typeof document!=="undefined"){const n=document.getElementById(RECEIPT_ID);if(n)n.remove();}rt.beatId=EXIT;save();let adv={success:true};try{adv=globalThis.advanceStoryScene();}catch(_error){}
  const open=function(){try{if(typeof openOverlay==="function")return openOverlay("village");if(typeof globalThis.openOverlay==="function")return globalThis.openOverlay("village");}catch(_error){}return null;};if(typeof setTimeout==="function")setTimeout(open,40);else open();return{success:adv&&adv.success!==false,destination:"konoha_village",completion:clone(done)};
}
if(!installBeats())throw new Error("kakashi_w2c_nonkill_35780_beats_missing");
let hooked=false,tries=0;
function hooks(){
  if(hooked)return true;if(typeof globalThis.advanceStoryScene!=="function"||typeof globalThis.getStoryScenePerformance33900!=="function")return false;
  const PA=globalThis.advanceStoryScene,PG=globalThis.getStoryScenePerformance33900,PR=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
  globalThis.getStoryScenePerformance33900=function(){const p=sequence(active());return p||PG.apply(this,arguments);};
  globalThis.advanceStoryScene=function(choiceId){
    if(arguments.length===0)choiceId=null;const rt=active(),selected=selectedOutcome();
    if(rt&&rt.beatId===SOURCE_HOLD&&nonKillOutcome(selected)){const started=beginOutcome(selected);return started?{success:true,type:"nonkill_outcome_presentation_started",selectedOutcomeRef:selected}:{success:false,reason:"nonkill_outcome_presentation_start_failed"};}
    if(rt&&[AFTERMATH,SCENE07,SCENE08].includes(rt.beatId)&&(choiceId===null||choiceId===undefined)){
      const p=sequence(rt);if(!p)return{success:false,reason:"w2c_nonkill_sequence_missing"};
      if(!p.atEnd){rt.localContext=Object.assign({},rt.localContext||{},{[p.key]:p.index+1});save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:rt.beatId,cueIndex:p.index+1};}
      if(rt.beatId===AFTERMATH)return wipe(enter07);if(rt.beatId===SCENE07)return wipe(enter08);return wipe(openReceipt);
    }
    const delegated=PA.apply(this,arguments),after=active(),afterSelected=selectedOutcome();
    if(after&&after.beatId===SOURCE_HOLD&&nonKillOutcome(afterSelected)){const started=beginOutcome(afterSelected);if(started)return Object.assign({},delegated&&typeof delegated==="object"?delegated:{success:true},{success:true,nonKillOutcomePresentationStarted:true,selectedOutcomeRef:afterSelected});}
    return delegated;
  };
  try{advanceStoryScene=globalThis.advanceStoryScene;getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;}catch(_error){}
  if(PR){globalThis.renderStoryScenePresentationLayer=function(){const out=PR.apply(this,arguments);if(typeof queueMicrotask==="function")queueMicrotask(render);else if(typeof setTimeout==="function")setTimeout(render,0);return out;};try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}}
  hooked=true;return true;
}
function ensure(){if(hooks())return;if(typeof setTimeout==="function"&&tries++<120)setTimeout(ensure,25);}ensure();
function diagnostics(){
  const m=scene()&&scene().beatMap instanceof Map?scene().beatMap:null;
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_w2c_nonkill_35780_v3_2026_09_18",
    allAuthorities:DATA.LETHAL_ATTEMPT_SURVIVED.authorities.scene07==="84894e148e55b57ec74707690ca0b067b6b1e366"&&DATA.LETHAL_ATTEMPT_INTERRUPTED.authorities.scene07==="896b8fcc9d5c5dd6b019d2f51a5fbccdaee66a25"&&DATA.LETHAL_ATTEMPT_ESCAPED.authorities.scene07==="b52ed9670ddc369fb115d3a61147c496fc75155f"&&DATA.LETHAL_ATTEMPT_ESCAPED.authorities.scene08==="4e679e92e6c97968bcf970a83b9ba88e19d96355",
    exactCueCounts:DATA.LETHAL_ATTEMPT_SURVIVED.aftermath.length===29&&DATA.LETHAL_ATTEMPT_INTERRUPTED.aftermath.length===23&&DATA.LETHAL_ATTEMPT_ESCAPED.aftermath.length===31&&DATA.LETHAL_ATTEMPT_SURVIVED.report.length===29&&DATA.LETHAL_ATTEMPT_INTERRUPTED.report.length===30&&DATA.LETHAL_ATTEMPT_ESCAPED.report.length===30&&DATA.LETHAL_ATTEMPT_SURVIVED.office.length===57&&DATA.LETHAL_ATTEMPT_INTERRUPTED.office.length===46&&DATA.LETHAL_ATTEMPT_ESCAPED.office.length===57,
    approvedChallenge:[DATA.LETHAL_ATTEMPT_SURVIVED,DATA.LETHAL_ATTEMPT_INTERRUPTED,DATA.LETHAL_ATTEMPT_ESCAPED].every(function(d){return d.report.some(function(c){return c.text==="Those weren’t your orders.";})&&d.report.some(function(c){return c.text==="That was my choice.";});}),
    failedLethalNotMercy:commitOutcomeLedger.toString().includes("mercyOutcome:false")&&commitReport.toString().includes("noMercyRewrite:true"),
    pursuitsStayClosed:commitOutcomeLedger.toString().includes("packagePursuitReopened:false")&&commitOutcomeLedger.toString().includes("anbuMarkedTargetPursuitReopened:false"),
    hiddenKnowledgeBoundary:commitHiddenReview.toString().includes("kakashiKnowledgeGranted:false")&&commitHiddenReview.toString().includes("kakashiLearnsHiddenOperationTruth:false"),
    sharedHistoryPersisted:commitOutcomeLedger.toString().includes("sharedHistoryPersists:true"),allAttemptsAnimate:beginOutcome.toString().includes("playAcademyKakashiLethalAttemptAnimation35770")&&!beginOutcome.toString().includes("removeDeadMiCardAfterKill"),officeChairStaging:installStyle.toString().includes("left:20.5%!important")&&installStyle.toString().includes("left:33.5%!important")&&installStyle.toString().includes("left:57.5%!important")&&installStyle.toString().includes("left:69.5%!important")&&installStyle.toString().includes("bottom:30.5%!important")&&installStyle.toString().includes("left:50%;right:auto;bottom:13.2%")&&installStyle.toString().includes("sc-dialogue-panel-33910.is-current"),speakerQuickRead:render.toString().includes('name.style.display="block"')&&render.toString().includes('"NARRATION"'),officeEntryMotion:board.toString().includes("The ANBU operative enters.")&&installStyle.toString().includes("w2cNonKillEnterLeft35780"),escapedOfficeRevision:!DATA.LETHAL_ATTEMPT_ESCAPED.office.some(function(row){return row&&row.text==="A beat.";})&&DATA.LETHAL_ATTEMPT_ESCAPED.authorities.scene08==="4e679e92e6c97968bcf970a83b9ba88e19d96355",
    noPatrolPathInvented:PATROL_ASSET_PATHS.length===0,
    beats:!!m&&[AFTERMATH,SCENE07,SCENE08,RECEIPT,EXIT].every(function(x){return m.has(x);}),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(function(row){return row[0]!=="browserGoldenClaimed"&&row[1]!==true;}).map(function(row){return row[0];});
  return{pass:failed.length===0,checks:checks,failed:failed,browserGoldenClaimed:false};
}
globalThis.beginAcademyKakashiResolvedOutcome35780=beginOutcome;
globalThis.runAcademyKakashiW2CNonKill35780Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_W2C_NONKILL_35780=Object.freeze({patchId:PATCH_ID,aftermathBeatId:AFTERMATH,scene07BeatId:SCENE07,scene08BeatId:SCENE08,receiptBeatId:RECEIPT,exitBeatId:EXIT,outcomeRefs:Object.freeze(Object.keys(DATA)),data:DATA,beginOutcome:beginOutcome,commitReport:commitReport,commitHiddenReview:commitHiddenReview,completeToKonoha:completeToKonoha,diagnostics:diagnostics,browserGoldenClaimed:false});
})();