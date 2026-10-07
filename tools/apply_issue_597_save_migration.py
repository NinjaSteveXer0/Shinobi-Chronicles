#!/usr/bin/env python3
from pathlib import Path

GAME = Path("game.js")
BROWSER_QA = Path("tools/qa_issue_597_academy_origin_registry_recalibration_browser.js")

text = GAME.read_text(encoding="utf-8")

revision_block = r'''// =========================================================
// BRICK 1327 — #582 ACADEMY-ORIGIN BASE AUTHORITY SAVE MIGRATION
// =========================================================
// Pre-#582 saves persisted absolute Current Stats against the former Base rows.
// Rebase only the three recalibrated Origins by preserving their non-negative
// Current-over-Base development delta. This is a pure load-time compatibility
// transform: no storage writes, no reward grants, no history synthesis.
// =========================================================

const ACADEMY_ORIGIN_BASE_AUTHORITY_REVISION_582 =
  "academy_origin_base_stats_582_v1";

const ACADEMY_ORIGIN_BASE_SAVE_PACKAGES_582 = Object.freeze({
  academy_hinata: Object.freeze({
    oldBase: Object.freeze({ nin:6,tai:9,buki:5,fuin:5,kin:5,gen:5,stamina:7 }),
    newBase: Object.freeze({ nin:8,tai:13,buki:6,fuin:5,kin:5,gen:6,stamina:10 })
  }),
  academy_mirai: Object.freeze({
    oldBase: Object.freeze({ nin:8,tai:8,buki:9,fuin:5,kin:6,gen:7,stamina:8 }),
    newBase: Object.freeze({ nin:9,tai:9,buki:12,fuin:6,kin:6,gen:13,stamina:10 })
  }),
  academy_menma: Object.freeze({
    oldBase: Object.freeze({ nin:10,tai:8,buki:6,fuin:5,kin:9,gen:7,stamina:11 }),
    newBase: Object.freeze({ nin:10,tai:8,buki:6,fuin:5,kin:13,gen:7,stamina:11 })
  })
});

function migrateAcademyOriginBaseSave582(savedPlayerData) {
  if (!savedPlayerData || typeof savedPlayerData !== "object") return savedPlayerData;
  if (savedPlayerData.academyOriginBaseAuthorityRevision === ACADEMY_ORIGIN_BASE_AUTHORITY_REVISION_582) {
    return savedPlayerData;
  }

  const savedCharacters = savedPlayerData.characters;
  if (savedCharacters && typeof savedCharacters === "object") {
    Object.entries(ACADEMY_ORIGIN_BASE_SAVE_PACKAGES_582).forEach(([characterId, packageRow]) => {
      const savedCharacter = savedCharacters[characterId];
      if (!savedCharacter || typeof savedCharacter !== "object" || !savedCharacter.stats || typeof savedCharacter.stats !== "object") {
        return;
      }

      Object.keys(packageRow.newBase).forEach(stat => {
        const numericSavedCurrent = Number(savedCharacter.stats[stat]);
        const savedCurrent = Number.isFinite(numericSavedCurrent)
          ? numericSavedCurrent
          : Number(packageRow.oldBase[stat]);
        const delta = Math.max(0, savedCurrent - Number(packageRow.oldBase[stat]));
        savedCharacter.stats[stat] = Number(packageRow.newBase[stat]) + delta;
      });
    });
  }

  savedPlayerData.academyOriginBaseAuthorityRevision = ACADEMY_ORIGIN_BASE_AUTHORITY_REVISION_582;
  return savedPlayerData;
}

'''

if "const ACADEMY_ORIGIN_BASE_AUTHORITY_REVISION_582 =" not in text:
    marker = 'const PLAYER_SAVE_KEY =\n  "shinobiChroniclesPlayerSave";\n\n\n'
    if marker not in text:
        marker = 'const PLAYER_SAVE_KEY =\n  "shinobiChroniclesPlayerSave";\n\n'
    if marker not in text:
        raise SystemExit("PLAYER_SAVE_KEY insertion marker missing")
    text = text.replace(marker, marker + revision_block, 1)

# Fresh saves are born at the new Base authority revision.
default_start = text.find("function createDefaultPlayerData() {")
default_end = text.find("function normalizeSavedCharacterProgression", default_start)
if default_start < 0 or default_end < 0:
    raise SystemExit("createDefaultPlayerData boundaries missing")
default_segment = text[default_start:default_end]
if "academyOriginBaseAuthorityRevision: ACADEMY_ORIGIN_BASE_AUTHORITY_REVISION_582" not in default_segment:
    return_marker = "  return {\n"
    return_pos = text.find(return_marker, default_start, default_end)
    if return_pos < 0:
        raise SystemExit("createDefaultPlayerData return object missing")
    insert_pos = return_pos + len(return_marker)
    text = text[:insert_pos] + "    academyOriginBaseAuthorityRevision: ACADEMY_ORIGIN_BASE_AUTHORITY_REVISION_582,\n" + text[insert_pos:]

# Legacy JSON is migrated before any save normalization consumes Current Stats.
load_start = text.find("function loadPlayerData() {")
load_end = text.find("// =========================================================\n// SAVE PLAYER DATA", load_start)
if load_start < 0 or load_end < 0:
    raise SystemExit("loadPlayerData boundaries missing")
load_segment = text[load_start:load_end]
if "migrateAcademyOriginBaseSave582(parsedData);" not in load_segment:
    parse_marker = "    const parsedData = JSON.parse(savedData);\n"
    parse_pos = text.find(parse_marker, load_start, load_end)
    if parse_pos < 0:
        raise SystemExit("loadPlayerData parse marker missing")
    insert_pos = parse_pos + len(parse_marker)
    text = text[:insert_pos] + "    migrateAcademyOriginBaseSave582(parsedData);\n" + text[insert_pos:]
    load_end += len("    migrateAcademyOriginBaseSave582(parsedData);\n")

load_segment = text[load_start:load_end]
if "academyOriginBaseAuthorityRevision: ACADEMY_ORIGIN_BASE_AUTHORITY_REVISION_582" not in load_segment:
    history_marker = "    const normalizedActivityHistory = normalizeActivityHistoryForChronicleContinuity"
    history_pos = text.find(history_marker, load_start, load_end)
    if history_pos < 0:
        raise SystemExit("loadPlayerData normalized history marker missing")
    return_pos = text.find("    return {\n", history_pos, load_end)
    if return_pos < 0:
        raise SystemExit("loadPlayerData normalized return object missing")
    insert_pos = return_pos + len("    return {\n")
    text = text[:insert_pos] + "      academyOriginBaseAuthorityRevision: ACADEMY_ORIGIN_BASE_AUTHORITY_REVISION_582,\n" + text[insert_pos:]

GAME.write_text(text, encoding="utf-8")

browser = BROWSER_QA.read_text(encoding="utf-8")
if "legacyMigrationRevision" not in browser:
    marker = "  const developed=await page.evaluate(()=>{\n"
    if marker not in browser:
        raise SystemExit("browser QA development marker missing")
    legacy_block = r'''  // Prove a real pre-#582 save is rebased exactly once: canonical new Base plus
  // the already-earned non-negative Current-over-old-Base development delta.
  await page.evaluate(()=>{
    const legacy=createDefaultPlayerData();
    legacy.academyOriginBaseAuthorityRevision=null;
    legacy.characters.academy_hinata.stats={nin:8,tai:10,buki:5,fuin:5,kin:5,gen:5,stamina:7};
    legacy.characters.academy_mirai.stats={nin:8,tai:8,buki:9,fuin:5,kin:6,gen:10,stamina:8};
    legacy.characters.academy_menma.stats={nin:10,tai:8,buki:6,fuin:5,kin:10,gen:7,stamina:11};
    localStorage.setItem("shinobiChroniclesPlayerSave",JSON.stringify(legacy));
  });
  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>typeof window.commitDisciplineDevelopment448==="function",null,{timeout:15000});

  const legacyMigrated=await page.evaluate(()=>{
    const statsOf=row=>Object.fromEntries(["nin","tai","buki","fuin","kin","gen","stamina"].map(id=>[id,Number(row&&row[id])||0]));
    const row=id=>playerTeam.find(character=>character&&character.id===id);
    return{
      legacyMigrationRevision:playerData.academyOriginBaseAuthorityRevision||null,
      hinata:{baseStats:statsOf(row("academy_hinata")?.baseStats),currentStats:statsOf(row("academy_hinata")?.stats)},
      mirai:{baseStats:statsOf(row("academy_mirai")?.baseStats),currentStats:statsOf(row("academy_mirai")?.stats)},
      menma:{baseStats:statsOf(row("academy_menma")?.baseStats),currentStats:statsOf(row("academy_menma")?.stats)}
    };
  });
  assert.equal(legacyMigrated.legacyMigrationRevision,"academy_origin_base_stats_582_v1","legacy save did not acquire #582 Base authority revision");
  assert.deepStrictEqual(legacyMigrated.hinata.baseStats,EXPECTED.academy_hinata.stats,"legacy migration mutated canonical Hinata Base");
  assert.deepStrictEqual(legacyMigrated.hinata.currentStats,{nin:10,tai:14,buki:6,fuin:5,kin:5,gen:6,stamina:10},"legacy Hinata Current development delta was not rebased onto new Base");
  assert.deepStrictEqual(legacyMigrated.mirai.baseStats,EXPECTED.academy_mirai.stats,"legacy migration mutated canonical Mirai Base");
  assert.deepStrictEqual(legacyMigrated.mirai.currentStats,{nin:9,tai:9,buki:12,fuin:6,kin:6,gen:16,stamina:10},"legacy Mirai Current development delta was not rebased onto new Base");
  assert.deepStrictEqual(legacyMigrated.menma.baseStats,EXPECTED.academy_menma.stats,"legacy migration mutated canonical Menma Base");
  assert.deepStrictEqual(legacyMigrated.menma.currentStats,{nin:10,tai:8,buki:6,fuin:5,kin:14,gen:7,stamina:11},"legacy Menma Current development delta was not rebased onto new Base");

  // A second reload must be idempotent because the compatibility revision is now stamped.
  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>typeof window.commitDisciplineDevelopment448==="function",null,{timeout:15000});
  const legacyReloaded=await page.evaluate(()=>{
    const statsOf=row=>Object.fromEntries(["nin","tai","buki","fuin","kin","gen","stamina"].map(id=>[id,Number(row&&row[id])||0]));
    const row=id=>playerTeam.find(character=>character&&character.id===id);
    return{
      revision:playerData.academyOriginBaseAuthorityRevision||null,
      hinata:statsOf(row("academy_hinata")?.stats),
      mirai:statsOf(row("academy_mirai")?.stats),
      menma:statsOf(row("academy_menma")?.stats)
    };
  });
  assert.equal(legacyReloaded.revision,"academy_origin_base_stats_582_v1","#582 save revision did not persist across reload");
  assert.deepStrictEqual(legacyReloaded.hinata,legacyMigrated.hinata.currentStats,"legacy Hinata migration reran on second load");
  assert.deepStrictEqual(legacyReloaded.mirai,legacyMigrated.mirai.currentStats,"legacy Mirai migration reran on second load");
  assert.deepStrictEqual(legacyReloaded.menma,legacyMigrated.menma.currentStats,"legacy Menma migration reran on second load");

  await page.evaluate(()=>localStorage.clear());
  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>typeof window.commitDisciplineDevelopment448==="function",null,{timeout:15000});

'''
    browser = browser.replace(marker, legacy_block + marker, 1)
    BROWSER_QA.write_text(browser, encoding="utf-8")

print("#597 save migration updater applied")
