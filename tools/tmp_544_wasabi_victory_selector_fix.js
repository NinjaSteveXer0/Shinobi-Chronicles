#!/usr/bin/env node
"use strict";
const fs=require("fs");
const path="tools/qa_issue_343_wasabi_browser.js";
let src=fs.readFileSync(path,"utf8");
const before='const victoryNode=document.querySelector(".alpha544-victory");';
const after='const victoryNode=document.querySelector(".alpha-victory-code-screen,.victory-screen");';
const n=src.split(before).length-1;
if(n!==1)throw new Error(`expected one stale Victory selector, found ${n}`);
src=src.replace(before,after);
fs.writeFileSync(path,src);
console.log("UPDATED Wasabi Victory selector to actual #544 delegated Victory surface");
