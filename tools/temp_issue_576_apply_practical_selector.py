#!/usr/bin/env python3
from pathlib import Path
import re
import subprocess

BASE = "aa488f77c8333182578fdea62dc27a42390d38db"
ORIGINAL_WORKFLOW_COMMIT = "0b6020f48cc8824d32db39502f8690f49cba6349"
WORKFLOW = ".github/workflows/issue-576-expert-master-curriculum.yml"
SELF = "tools/temp_issue_576_apply_practical_selector.py"

# Before touching production, require the branch delta since the adopted #598 head
# to contain only this temporary script + the temporary workflow bootstrap.
pre = set(subprocess.check_output(["git", "diff", "--name-only", f"{BASE}..HEAD"], text=True).splitlines())
allowed_pre = {WORKFLOW, SELF}
if pre != allowed_pre:
    raise SystemExit(f"unexpected pre-bootstrap tree delta: {sorted(pre)}")

game_path = Path("game.js")
game = game_path.read_text(encoding="utf-8")
owners = [
    "getKonohaPracticalSelectedDisciplineId",
    "selectKonohaPracticalDiscipline",
    "validateKonohaPracticalFinalReadiness",
]
old = re.compile(r'const\s+validDisciplines\s*=\s*\[\s*"tai"\s*,\s*"buki"\s*,\s*"stamina"\s*\]\s*;', re.S)
new = '''const validDisciplines = [
    "tai",
    "buki",
    "stamina",
    "nin",
    "gen",
    "fuin"
  ];'''
expected = ["tai", "buki", "stamina", "nin", "gen", "fuin"]
profile_ids = [
    "discipline_curriculum_nin_expert_v1", "discipline_curriculum_nin_master_v1",
    "discipline_curriculum_gen_expert_v1", "discipline_curriculum_gen_master_v1",
    "discipline_curriculum_fuin_expert_v1", "discipline_curriculum_fuin_master_v1",
]

def section(src, name):
    start = src.find("function " + name)
    if start < 0:
        raise SystemExit("missing transferred owner: " + name)
    end = src.find("// =========================================================", start + len(name) + 9)
    if end < 0:
        raise SystemExit("missing owner boundary: " + name)
    return start, end, src[start:end]

for name in owners:
    start, end, src = section(game, name)
    hits = list(old.finditer(src))
    if len(hits) != 1:
        raise SystemExit(f"{name}: expected one legacy allowlist, got {len(hits)}")
    src = old.sub(new, src, count=1)
    game = game[:start] + src + game[end:]

for name in owners:
    _, _, src = section(game, name)
    m = re.search(r'const\s+validDisciplines\s*=\s*\[(.*?)\]\s*;', src, re.S)
    ids = re.findall(r'"([^"]+)"', m.group(1)) if m else []
    if ids != expected:
        raise SystemExit(f"{name}: wrong selector domain {ids!r}")
    if any(pid in src for pid in profile_ids):
        raise SystemExit(name + ": activityProfileId leaked into selector identity")

game_path.write_text(game, encoding="utf-8")

qa_path = Path("tools/qa_issue_576_expert_master_curriculum_profiles.js")
qa = qa_path.read_text(encoding="utf-8")
game_decl = 'const GAME=fs.readFileSync(path.join(ROOT,"game.js"),"utf8");'
if game_decl not in qa:
    anchor = 'const SRC576=fs.readFileSync(path.join(ROOT,"runtime/alpha-discipline-curriculum-profiles-57600.js"),"utf8");\n'
    if qa.count(anchor) != 1:
        raise SystemExit("#576 QA source anchor drifted")
    qa = qa.replace(anchor, anchor + game_decl + '\n', 1)
    guard = r'''
function practicalOwnerSource576(name){
  const marker="function "+name;
  const start=GAME.indexOf(marker);
  assert(start>=0,"missing Practical root owner "+name);
  const next=GAME.indexOf("// =========================================================",start+marker.length);
  return GAME.slice(start,next>start?next:GAME.length);
}
{
  const selectorIds=["tai","buki","stamina","nin","gen","fuin"];
  const owners=["getKonohaPracticalSelectedDisciplineId","selectKonohaPracticalDiscipline","validateKonohaPracticalFinalReadiness"];
  for(const name of owners){
    const src=practicalOwnerSource576(name);
    const match=src.match(/const\s+validDisciplines\s*=\s*\[([\s\S]*?)\]\s*;/);
    assert(match,name+" missing Practical selector allowlist");
    const ids=[...match[1].matchAll(/"([^"]+)"/g)].map(m=>m[1]);
    assert.deepStrictEqual(ids,selectorIds,name+" selector domain drifted");
    for(const profileId of EXACT_IDS)assert(!src.includes(profileId),name+" collapsed activityProfileId into selector identity");
    assert(!ids.includes("kin"),name+" admitted unrelated Kin selector");
  }
  const rowStart=SRC576.indexOf("function advancedRow");
  assert(rowStart>=0,"advanced row builder missing");
  const rowBuilder=SRC576.slice(rowStart,rowStart+2400);
  assert(/id\s*:\s*disciplineId/.test(rowBuilder),"advanced Practical rows must submit discipline selector IDs");
  assert(/activityProfileId\s*:\s*resolved\.activityProfileId/.test(rowBuilder),"advanced rows must preserve separate curriculum profile provenance");
}
'''
    insertion = 'for(const id of EXACT_IDS)assert(SRC576.includes(id),"missing exact curriculum profile: "+id);\n'
    if qa.count(insertion) != 1:
        raise SystemExit("#576 QA guard anchor drifted")
    qa = qa.replace(insertion, insertion + guard, 1)
qa_path.write_text(qa, encoding="utf-8")

# Validate before any commit/push.
for cmd in [
    ["node", "--check", "game.js"],
    ["node", "--check", "runtime/alpha-discipline-curriculum-profiles-57600.js"],
    ["node", "--check", "tools/qa_issue_576_expert_master_curriculum_profiles.js"],
    ["node", "tools/qa_issue_576_expert_master_curriculum_profiles.js"],
    ["git", "diff", "--check"],
]:
    subprocess.run(cmd, check=True)

changed = set(subprocess.check_output(["git", "diff", "--name-only"], text=True).splitlines())
if changed != {"game.js", "tools/qa_issue_576_expert_master_curriculum_profiles.js"}:
    raise SystemExit(f"unexpected bounded writes: {sorted(changed)}")

# Restore the proven lane workflow byte-for-byte and remove this bootstrap.
original = subprocess.check_output(["git", "show", f"{ORIGINAL_WORKFLOW_COMMIT}:{WORKFLOW}"])
Path(WORKFLOW).write_bytes(original)
subprocess.run(["git", "rm", SELF], check=True)
subprocess.run(["git", "config", "user.name", "github-actions[bot]"], check=True)
subprocess.run(["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], check=True)
subprocess.run(["git", "add", "game.js", "tools/qa_issue_576_expert_master_curriculum_profiles.js", WORKFLOW], check=True)
subprocess.run(["git", "commit", "-m", "[CODING][#576] Fix Practical advanced discipline selection"], check=True)
subprocess.run(["git", "push", "origin", "HEAD:coding/576-expert-master-curriculum-profiles"], check=True)
