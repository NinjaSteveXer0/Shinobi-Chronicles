#!/usr/bin/env node
"use strict";

const fs=require("fs");
const assert=require("assert");

const required=[
  "Assets/Academy Student/academy_kakashi.png",
  "NPC/konoha_anbu.png",
  "NPC/anbu_marked_target.png",
  "NPC/package_smuggler.png",
  "NPC/masked_interceptor.png",
  "NPC/uchiha_police_force_member_male.png",
  "NPC/uchiha_police_force_member_female.png",
  "NPC/uchiha_police_force_male_alt_1.png",
  "NPC/uchiha_police_force_female_alt_1.png",
  "NPC/uchiha_police_force_male_alt_2.png",
  "NPC/uchiha_police_force_female_alt_2.png",
  "Assets/Summons/pakkun.png",
  "Assets/Kage/kage_minato.png",
  "NPC portrait/anbu_marked_target.png",
  "NPC portrait/package_smuggler.png",
  "NPC portrait/masked_interceptor.png",
  "Kakashi Origin Backdrop/rooftop_night.png",
  "Kakashi Origin Backdrop/konoha_alleyway.png",
  "Kakashi Origin Backdrop/konoha_alleyway_alt_night.png",
  "Kakashi Origin Backdrop/end_of_alleyway.png",
  "Kakashi Origin Backdrop/sakura_tree_night.png",
  "Kakashi Origin Backdrop/fight_at_sakura_tree.png",
  "Kakashi Origin Backdrop/alleyway_konoha_night.png",
  "Kakashi Origin Backdrop/uchiha_police_exterior_night.png",
  "Kakashi Origin Backdrop/hokage_administration_interior_night.png"
];

const missing=required.filter(p=>!fs.existsSync(p));
assert.deepStrictEqual(missing,[],"Kakashi V2 references missing assets");

const core=fs.readFileSync("runtime/alpha-kakashi-v2-core-36020.js","utf8");
const battle=fs.readFileSync("runtime/alpha-kakashi-v2-battle-36010.js","utf8");
for(const p of required){
  if(p.startsWith("NPC portrait/"))assert(battle.includes(p),`battle portrait is not consumed: ${p}`);
  else assert(core.includes(p),`Story asset/backdrop is not consumed: ${p}`);
}

console.log(JSON.stringify({
  pass:true,
  requiredAssetCount:required.length,
  missingAssetCount:0,
  browserGoldenClaimed:false
},null,2));
