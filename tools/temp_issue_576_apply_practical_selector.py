#!/usr/bin/env python3
from pathlib import Path
import re
import subprocess

BASE = "aa488f77c8333182578fdea62dc27a42390d38db"
WORKFLOW = ".github/workflows/issue-576-expert-master-curriculum.yml"
SELF = "tools/temp_issue_576_apply_practical_selector.py"
GAME = "game.js"
QA = "tools/qa_issue_576_expert_master_curriculum_profiles.js"

owners = ["getKonohaPracticalSelectedDisciplineId","selectKonohaPracticalDiscipline","validateKonohaPracticalFinalReadiness"]
legacy = re.compile(r'const\s+validDisciplines\s*=\s*\[\s*"tai"\s*,\s*"buki"\s*,\s*"stamina"\s*\]\s*;', re.S)
replacement = '''const validDisciplines = [
    "tai",
    "buki",
    "stamina",
    "nin",
    "gen",
    "fuin"
  ];'''
expected = ["tai","buki","stamina","nin","gen","fuin"]
profile_ids = ["discipline_curriculum_nin_expert_v1","discipline_curriculum_nin_master_v1","discipline_curriculum_gen_expert_v1","discipline_curriculum_gen_master_v1","discipline_curriculum_fuin_expert_v1","discipline_curriculum_fuin_master_v1"]

def section(src,name):
    start=src.find("function "+name)
    if start<0: raise SystemExit("missing transferred owner: "+name)
    end=src.find("// =========================================================",start+len(name)+9)
    if end<0: raise SystemExit("missing owner boundary: "+name)
    return start,end,src[start:end]

def current_domain(src,name):
    _,_,block=section(src,name)
    m=re.search(r'const\s+validDisciplines\s*=\s*\[(.*?)\]\s*;',block,re.S)
    return re.findall(r'"([^"]+)"',m.group(1)) if m else []

# Idempotent second-run gate: once the exact production patch exists, this
# bootstrap becomes a no-op while connector cleanup removes temporary files.
game=Path(GAME).read_text(encoding="utf-8")
if all(current_domain(game,name)==expected for name in owners):
    print("#576 bounded Practical selector correction already applied; bootstrap no-op")
    raise SystemExit(0)

# Before first write, fail closed if anything outside the two temporary bootstrap
# files drifted from the adopted #598 production tree.
pre=set(subprocess.check_output(["git","diff","--name-only",f"{BASE}..HEAD"],text=True).splitlines())
if pre != {WORKFLOW,SELF}:
    raise SystemExit(f"unexpected pre-bootstrap tree delta: {sorted(pre)}")

for name in owners:
    start,end,block=section(game,name)
    hits=list(legacy.finditer(block))
    if len(hits)!=1: raise SystemExit(f"{name}: expected one legacy allowlist, got {len(hits)}")
    block=legacy.sub(replacement,block,count=1)
    game=game[:start]+block+game[end:]

for name in owners:
    _,_,block=section(game,name)
    ids=current_domain(game,name)
    if ids!=expected: raise SystemExit(f"{name}: wrong selector domain {ids!r}")
    if any(pid in block for pid in profile_ids): raise SystemExit(name+": activityProfileId leaked into selector identity")
Path(GAME).write_text(game,encoding="utf-8")

qa_path=Path(QA)
qa=qa_path.read_text(encoding="utf-8")
game_decl='const GAME=fs.readFileSync(path.join(ROOT,"game.js"),"utf8");'
if game_decl not in qa:
    anchor='const SRC576=fs.readFileSync(path.join(ROOT,"runtime/alpha-discipline-curriculum-profiles-57600.js"),"utf8");\n'
    if qa.count(anchor)!=1: raise SystemExit("#576 QA source anchor drifted")
    qa=qa.replace(anchor,anchor+game_decl+'\n',1)
    guard=r'''
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
  const rowEnd=SRC576.indexOf("function activityData576",rowStart);
  const rowBuilder=SRC576.slice(rowStart,rowEnd>rowStart?rowEnd:rowStart+5000);
  assert(/id\s*:\s*disciplineId/.test(rowBuilder),"advanced Practical rows must submit discipline selector IDs");
  assert(/activityProfileId\s*:\s*profile\s*&&\s*profile\.id/.test(rowBuilder),"advanced rows must preserve separate curriculum profile provenance");
}
'''
    insertion='for(const id of EXACT_IDS)assert(SRC576.includes(id),"missing exact curriculum profile: "+id);\n'
    if qa.count(insertion)!=1: raise SystemExit("#576 QA guard anchor drifted")
    qa=qa.replace(insertion,insertion+guard,1)
qa_path.write_text(qa,encoding="utf-8")

for cmd in [["node","--check",GAME],["node","--check","runtime/alpha-discipline-curriculum-profiles-57600.js"],["node","--check",QA],["node",QA],["git","diff","--check"]]:
    subprocess.run(cmd,check=True)
changed=set(subprocess.check_output(["git","diff","--name-only"],text=True).splitlines())
if changed!={GAME,QA}: raise SystemExit(f"unexpected bounded writes: {sorted(changed)}")

# Commit/push ONLY the authorised production root hunks + focused QA. The
# temporary workflow/script remain uncommitted in this generated commit so the
# GitHub runner never needs workflow-file write scope.
subprocess.run(["git","config","user.name","github-actions[bot]"],check=True)
subprocess.run(["git","config","user.email","41898282+github-actions[bot]@users.noreply.github.com"],check=True)
subprocess.run(["git","add",GAME,QA],check=True)
subprocess.run(["git","commit","-m","[CODING][#576] Fix Practical advanced discipline selection"],check=True)
subprocess.run(["git","push","origin","HEAD:coding/576-expert-master-curriculum-profiles"],check=True)
