from pathlib import Path

runtime = Path('runtime/alpha-phase2-live-hud-49900.js')
text = runtime.read_text()

old_projection = '''  root.hidden=!data.visible;
  root.dataset.surface=data.surface.kind;
  syncMapGutterGeometry(root,data.surface.kind);'''
new_projection = '''  root.hidden=!data.visible;
  if(root.dataset.surface!==data.surface.kind)root.dataset.surface=data.surface.kind;
  syncMapGutterGeometry(root,data.surface.kind);'''
if old_projection in text:
    text = text.replace(old_projection, new_projection, 1)
elif new_projection not in text:
    raise SystemExit('surface projection seam missing')

old_state = 'resizeObserver:null,overlayObserver:null,structureObserver:null,'
new_state = 'resizeObserver:null,surfaceObserver:null,overlayObserver:null,structureObserver:null,'
if old_state in text:
    text = text.replace(old_state, new_state, 1)
elif new_state not in text:
    raise SystemExit('observer state seam missing')

old_install = '''    observeGeometryTargets(state.map,state.box);
  }
const overlay=document.getElementById("screen-overlay");'''
new_install = '''    observeGeometryTargets(state.map,state.box);
  }
  const root=document.getElementById(ROOT_ID);
  if(root){
    state.surfaceObserver=new MutationObserver(records=>{
      const changed=records.some(record=>record.type==="attributes"&&record.attributeName==="data-surface"&&record.oldValue!==root.dataset.surface);
      if(!changed)return;
      state.structureSignalCount+=1;
      schedule("surface_change");
    });
    state.surfaceObserver.observe(root,{attributes:true,attributeFilter:["data-surface"],attributeOldValue:true});
  }
const overlay=document.getElementById("screen-overlay");'''
if old_install in text:
    text = text.replace(old_install, new_install, 1)
elif 'state.surfaceObserver.observe(root,{attributes:true,attributeFilter:["data-surface"],attributeOldValue:true})' not in text:
    raise SystemExit('surface observer seam missing')

runtime.write_text(text)

qa = Path('tools/qa_issue_621_region_hud_stability.js')
q = qa.read_text()
old_asserts = '''assert(source.includes('state.overlayObserver.observe(overlay,{attributes:true,attributeFilter:["style","class","hidden"]})'),"#621 does not observe real overlay visibility transitions narrowly");
assert(!source.includes("rootObserver"),"#621 still wakes from #499 root projection churn");
assert(!source.includes('attributeFilter:["data-surface","hidden"]'),"#621 still observes #499 data-surface polling churn");'''
new_asserts = '''assert(runtime.includes('if(root.dataset.surface!==data.surface.kind)root.dataset.surface=data.surface.kind;'),"#621 did not make canonical #499 surface projection change-aware");
assert(!/\\n\\s*root\\.dataset\\.surface=data\\.surface\\.kind;/.test(runtime),"#621 left unconditional #499 data-surface writes active");
assert(source.includes('state.surfaceObserver.observe(root,{attributes:true,attributeFilter:["data-surface"],attributeOldValue:true})'),"#621 lacks narrow one-shot canonical surface transition observation");
assert(source.includes('record.oldValue!==root.dataset.surface'),"#621 surface observer does not reject unchanged projection churn");
assert(source.includes('state.overlayObserver.observe(overlay,{attributes:true,attributeFilter:["style","class","hidden"]})'),"#621 does not observe real overlay visibility transitions narrowly");
assert(!source.includes("rootObserver"),"#621 resurrected the old broad root observer");
assert(!source.includes('attributeFilter:["data-surface","hidden"]'),"#621 resurrected mixed root polling-churn observation");'''
if old_asserts in q:
    q = q.replace(old_asserts, new_asserts, 1)
elif 'canonical #499 surface projection change-aware' not in q:
    raise SystemExit('static assertion seam missing')
q = q.replace('scope:"#557 scheduler/observer only",','scope:"canonical #499 surface handoff + #557 scheduler/observer",',1)
qa.write_text(q)
