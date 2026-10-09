from pathlib import Path
import re


def read(path):
    return Path(path).read_text(encoding="utf-8")


def write(path, text):
    Path(path).write_text(text, encoding="utf-8")


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 exact match, found {count}")
    return text.replace(old, new, 1)


# game.js — canonical Battle caller dispatch + canonical enemy action opportunity.
p = "game.js"
s = read(p)
s = replace_once(
    s,
    '  if (returnContext.type==="field_readiness_assessment") return resumeFieldReadinessAssessmentFromBattle(returnContext);',
    '''  if (returnContext.type==="field_readiness_assessment") {\n    if (returnContext.assessmentScenarioId==="academy_genin_missing_courier_dispatch_v1") {\n      const courier=globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310;\n      if (!courier||typeof courier.resumeFromCurrentBattle!=="function") return {success:false,reason:"promotion_courier_return_authority_missing"};\n      return courier.resumeFromCurrentBattle(returnContext);\n    }\n    return resumeFieldReadinessAssessmentFromBattle(returnContext);\n  }''',
    "canonical field-readiness dispatch",
)
needle = "  const scheduler=evaluateEnemyActionScheduler();"
start = s.find("function executeEnemyAuthoredActionOpportunity()")
pos = s.find(needle, start)
if start < 0 or pos < 0:
    raise SystemExit("canonical enemy action opportunity boundary not found")
insert = '''  if (globalThis.currentBattle&&currentBattle.promotionCourier60310&&globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310&&typeof globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.expireRogueFeintAtActionOpportunity==="function") {\n    globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.expireRogueFeintAtActionOpportunity();\n  }\n'''
s = s[:pos] + insert + s[pos:]
write(p, s)

# #436 — canonical scoped Promotion persistence.
p = "runtime/alpha-chronicle-state-manifest-43600.js"
s = read(p)
s = replace_once(
    s,
    '    privateOriginHistories:normalizePrivateOriginHistories(existing.privateOriginHistories)\n  };',
    '''    privateOriginHistories:normalizePrivateOriginHistories(existing.privateOriginHistories),\n    promotionState:existing.promotionState&&typeof existing.promotionState==="object"&&!Array.isArray(existing.promotionState)?clone(existing.promotionState):null\n  };''',
    "promotionState migration preservation",
)
marker = "const DOMAINS=Object.freeze([\n"
domain = '''  Object.freeze({\n    stateDomainId:"promotionState",\n    semanticOwner:"PL / Registry / Rank + Coding #603",\n    canonicalWritePath:"SC_PROMOTION_INSTALLED_60330 scoped persistence adapter",\n    stableIdentityKey:"immutable Chronicle root + stableCharacterId + academy_to_genin",\n    savePath:"playerData.phase2ChronicleState.promotionState",\n    schemaVersion:1,\n    sourceOccurrenceIdFormat:"occ_academy_genin_missing_courier_dispatch_v1::<assessmentAttemptId>",\n    idempotenceKeyFormat:"assessmentAttemptId / academy_to_genin_promotion::<assessmentAttemptId>",\n    derivedFields:["observer-safe Assessment Record / Receipt projection"],\n    projectionConsumers:["Arena Promotion","Assessment Record","Promotion Chronicle Receipt"],\n    migrationRule:"preserve committed state verbatim; absent state remains null",\n    resetRule:"new Chronicle/New Game root only",\n    difficultyScope:"none",\n    inheritanceRule:"same Chronicle + stable Character + transition keeps fixed package",\n    devOverridePolicy:"no ordinary-player override",\n    qaRefs:["#603","#608","#609"]\n  }),\n'''
if 'stateDomainId:"promotionState"' not in s:
    s = replace_once(s, marker, marker + domain, "promotionState manifest domain")
write(p, s)

# #33100 — retire only Promotion ownership; preserve unrelated World/Arena duties.
p = "runtime/alpha-alpha-sprint-33100.js"
s = read(p)
start = s.find("  const priorPromotion33100=")
end = s.find("  function arenaUtilityBody33100", start)
if start < 0 or end < 0:
    raise SystemExit("#33100 Promotion owner block not found")
s = s[:start] + '''  // Promotion presentation/entry ownership retired to canonical Step-7 #603 integration.\n  // #33100 retains only its unrelated World dossier and Arena utility duties.\n\n''' + s[end:]
old = '''    const promotionSrc=openArenaPromotionSurface33100.toString();\n    const utilitySrc=openAlphaArenaUtilitySurface33100.toString();\n    const checks={\n      terminalResultOwnerRetiredTo544:true,\n      promotionReusesExistingAuthority:promotionSrc.includes("priorPromotion33100")&&promotionSrc.includes("semanticAction"),\n      promotionFailClosedWithoutAction:promotionSrc.includes("No exact Promotion launch action")&&promotionSrc.includes("disabled"),'''
new = '''    const utilitySrc=openAlphaArenaUtilitySurface33100.toString();\n    const checks={\n      terminalResultOwnerRetiredTo544:true,\n      promotionOwnerRetiredTo603:true,'''
s = replace_once(s, old, new, "#33100 diagnostics retirement")
write(p, s)

# #33200 — preserve factual incomplete-roster gate, delegate normal Promotion to #603.
p = "runtime/alpha-traversal-bridge-33200.js"
s = read(p)
s = replace_once(
    s,
    '  const priorPromotion33200=typeof openArenaPromotionSurface==="function"?openArenaPromotionSurface:null;\n  const priorRosterOpen33200=typeof openGeninRosterTransitionUI==="function"?openGeninRosterTransitionUI:null;',
    '  const priorRosterOpen33200=typeof openGeninRosterTransitionUI==="function"?openGeninRosterTransitionUI:null;',
    "#33200 prior Promotion retirement",
)
pattern = re.compile(r"  function openArenaPromotionSurface33200\(subjectId\)\{.*?\n  \}\n\n  globalThis\.openGeninRosterTransitionUI=", re.S)
replacement = '''  function openArenaPromotionSurface33200(subjectId){\n    const state=getTransition33200();\n    if(isIncompleteTransition33200(state)){\n      const result=openGeninRosterTransitionUI33200();\n      return result&&typeof result==="object"?{...result,alpha33200PromotionResume:true}:result;\n    }\n    if(typeof globalThis.openInstalledPromotion60330!=="function")return{success:false,reason:"promotion_step7_integration_authority_missing"};\n    return globalThis.openInstalledPromotion60330(subjectId);\n  }\n\n  globalThis.openGeninRosterTransitionUI='''
s, n = pattern.subn(replacement, s, count=1)
if n != 1:
    raise SystemExit(f"#33200 Promotion function replacement count={n}")
write(p, s)

# Production loader — #603 after canonical Chronicle state and before #33100/#33200.
p = "index.html"
s = read(p)
needle = '  <script src="runtime/alpha-chronicle-state-manifest-43600.js"></script>\n'
block = '''  <script src="runtime/alpha-chronicle-state-manifest-43600.js"></script>\n  <script src="runtime/alpha-promotion-core-60300.js"></script>\n  <script src="runtime/alpha-promotion-courier-assessment-60310.js"></script>\n  <script src="runtime/alpha-promotion-arena-ui-60320.js"></script>\n  <script src="runtime/alpha-promotion-installed-integration-60330.js"></script>\n'''
s = replace_once(s, needle, block, "#603 production loader")
write(p, s)

# Existing #141 traversal QA: preserve gate test while supplying canonical #603 delegate.
p = "tools/qa_issue_141_traversal_runtime.js"
s = read(p)
needle = 'context.openArenaPromotionSurface = function(subjectId){ return { success: true, destination: "promotion", subjectId: subjectId || null }; };\nrun(bridge, "runtime/alpha-traversal-bridge-33200.js");'
replacement = 'context.openArenaPromotionSurface = function(subjectId){ return { success: true, destination: "legacy_promotion", subjectId: subjectId || null }; };\ncontext.openInstalledPromotion60330 = function(subjectId){ return { success: true, destination: "promotion", subjectId: subjectId || null, alpha60330:true }; };\nrun(bridge, "runtime/alpha-traversal-bridge-33200.js");'
s = replace_once(s, needle, replacement, "#141 #603 delegate fixture")
write(p, s)

print("Issue #603 bounded integration patch applied")
