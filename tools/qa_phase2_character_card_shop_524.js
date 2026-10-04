#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const read=rel=>fs.readFileSync(path.join(ROOT,rel),"utf8");
const RUNTIME=read("runtime/alpha-phase2-character-card-shop-52400.js");
const INDEX=read("index.html");
const AUTH=read("Documentation/Acquisition/Alpha Konoha Character Card Shop Retail Acquisition Contract 2026-10-04.md");
const FP=read("runtime/alpha-runtime-build-fingerprint-303.js");

const exactIds=[
  "academy_hinata","academy_izuno","academy_kushina","academy_menma","academy_mirai",
  "academy_kurenai","academy_iwabee","academy_metal_lee","academy_kakashi","academy_obito"
];
for(const id of exactIds){
  assert(RUNTIME.includes('"'+id+'"'),"missing exact catalogue id "+id);
}
assert(!RUNTIME.includes("Object.keys(characterRegistry)"),"catalogue expanded by Registry scan");
assert(!RUNTIME.includes("ALPHA_PRODUCTION_CHARACTER_IDS"),"catalogue expanded by production Registry universe");
assert(RUNTIME.includes("const PRICE_RYO=100"),"fixed 100-Ryo price missing");
assert(RUNTIME.includes('const ROUTE="retail_character_card_shop"'),"retail acquisition route missing");
assert(RUNTIME.includes('const CATALOGUE_ID="alpha_konoha_character_card_shop_v1"'),"catalogue policy id missing");
assert(RUNTIME.includes('const LOCATION_ID="KON-P09"'),"commercial district location missing");
assert(RUNTIME.includes("commitCharacterAcquisition"),"generic Character acquisition authority not reused");
assert(RUNTIME.includes("purchaseReceiptByIntent(stableIntent)"),"same-intent idempotence receipt gate missing");
assert(RUNTIME.indexOf("purchaseReceiptByIntent(stableIntent)")<RUNTIME.indexOf("if(isOwned(variantId))"),"same-intent gate must precede already-owned");
assert(RUNTIME.indexOf("if(isOwned(variantId))")<RUNTIME.indexOf("pd.ryo=beforeRyo-PRICE_RYO"),"already-owned validation occurs after debit");
assert(RUNTIME.indexOf("beforeRyo<PRICE_RYO")<RUNTIME.indexOf("pd.ryo=beforeRyo-PRICE_RYO"),"insufficient funds validated after debit");
assert(RUNTIME.includes("assignmentCommitted:false"),"assignment=false provenance missing");
assert(RUNTIME.includes("retailDoesNotAssign:true"),"retail no-assignment provenance missing");
assert(!RUNTIME.includes("confirmAcademyTeamFormation("),"retail module calls Team Formation commit");
assert(!RUNTIME.includes("selectAcademyTeamFormation"),"retail module mutates Team Formation");
assert(!RUNTIME.includes("geninRosterTransition="),"retail module mutates Genin transition");
assert(!RUNTIME.includes("sharedHistory="),"retail module mutates Shared History");
assert(INDEX.includes("runtime/alpha-phase2-character-card-shop-52400.js"),"production loader missing");
assert(FP.includes("phase2-character-card-shop-retail-acquisition-524"),"runtime fingerprint feature missing");
assert(AUTH.includes("100 Ryō")&&AUTH.includes("retail_character_card_shop"),"durable Acquisition authority missing expected lock");

console.log(JSON.stringify({
  pass:true,
  issue:524,
  exactCatalogueIds:exactIds,
  priceRyo:100,
  genericAcquisitionAuthorityReused:true,
  assignmentSeparated:true,
  registryScanForbidden:true,
  browserGoldenClaimed:false
},null,2));
