#!/usr/bin/env node
"use strict";
const assert=require("assert");
const {validateAllowlist}=require("./browser_runtime_error_gate_311.js");

validateAllowlist([]);
assert.throws(
  ()=>validateAllowlist([{kind:"console.error",match:"known"}]),
  /requires reason|incomplete/
);
assert.throws(
  ()=>validateAllowlist([{kind:"console.error",match:"known",reason:"third-party warning"}]),
  /retirement\/review condition/
);
validateAllowlist([{
  kind:"console.error",
  match:"intentional-fixture",
  reason:"negative QA fixture only",
  retirementCondition:"remove with this fixture"
}]);

console.log(JSON.stringify({
  pass:true,
  issue:311,
  emptyAllowlistAllowed:true,
  undocumentedAllowlistRejected:true,
  allowlistWithoutRetirementRejected:true,
  documentedBoundedAllowlistAccepted:true,
  browserGoldenClaimed:false
},null,2));
