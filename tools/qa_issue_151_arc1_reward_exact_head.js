'use strict';

const fs=require('fs');
const assert=require('assert');

// Exact-head bridge for Issue #151.
// Keep the focused authority harness in one source file while also matching the
// global Issue #141 `tools/qa_*.js` trigger so both gates certify one commit.
// Browser wiring is part of the implementation contract: a green semantic
// module that is never loaded by the live shell is not runtime-complete.
// The #141 production closure now composes this same harness as a Coding subgate.
const html=fs.readFileSync('index.html','utf8');
const activation='<script src="runtime/alpha-arc1-reward-evaluation-35400.js"></script>';
const activationCount=html.split(activation).length-1;
assert.strictEqual(activationCount,1,'Issue #151 Arc-1 reward evaluator must be loaded exactly once by index.html');

require('./qa_arc1_reward_evaluation_35400.js');
