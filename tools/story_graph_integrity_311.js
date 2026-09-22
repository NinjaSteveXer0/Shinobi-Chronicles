"use strict";

function analyzeStoryScene(definition){
  const errors=[];
  const warnings=[];
  if(!definition||typeof definition!=="object")return{pass:false,errors:["scene_definition_missing"],warnings,sceneId:null};
  const sceneId=String(definition.sceneId||"");
  const beats=Array.isArray(definition.beats)?definition.beats:[];
  const beatMap=new Map();
  for(const beat of beats){
    const id=beat&&String(beat.beatId||"");
    if(!id){errors.push("beat_id_missing");continue;}
    if(beatMap.has(id))errors.push("duplicate_beat_id:"+id);
    beatMap.set(id,beat);
  }
  if(!definition.entryBeatId||!beatMap.has(definition.entryBeatId))errors.push("entry_beat_missing_or_unknown");

  const adjacency=new Map();
  let choiceCount=0,battleCount=0,beatFallbackChoiceCount=0;
  for(const [id,beat] of beatMap){
    const targets=new Set();
    const choices=Array.isArray(beat.choices)?beat.choices:[];
    const choiceIds=new Set();
    for(const choice of choices){
      choiceCount+=1;
      const cid=choice&&String(choice.choiceId||"");
      if(!cid)errors.push("choice_id_missing:"+id);
      else if(choiceIds.has(cid))errors.push("duplicate_choice_handler:"+id+":"+cid);
      else choiceIds.add(cid);

      const exact=choice&&choice.nextBeatId?String(choice.nextBeatId):null;
      const fallback=!exact&&beat.nextBeatId?String(beat.nextBeatId):null;
      const target=exact||fallback;
      if(!target)errors.push("handlerless_choice:"+id+":"+cid);
      else targets.add(target);
      if(fallback)beatFallbackChoiceCount+=1;
    }

    if(beat.nextBeatId)targets.add(String(beat.nextBeatId));

    if(beat.battle){
      battleCount+=1;
      if(!beat.battle.victoryBeatId)errors.push("battle_victory_return_missing:"+id);
      if(!beat.battle.defeatBeatId)errors.push("battle_defeat_return_missing:"+id);
      if(beat.battle.victoryBeatId)targets.add(String(beat.battle.victoryBeatId));
      if(beat.battle.defeatBeatId)targets.add(String(beat.battle.defeatBeatId));
    }

    const terminal=beat.exitScene===true;
    if(!terminal&&targets.size===0)errors.push("nonterminal_dead_end:"+id);
    adjacency.set(id,[...targets]);
  }

  for(const [id,targets] of adjacency){
    for(const target of targets)if(!beatMap.has(target))errors.push("missing_next_beat:"+id+"->"+target);
  }

  function walk(start,graph){
    const seen=new Set(),stack=start?[start]:[];
    while(stack.length){
      const id=stack.pop();
      if(seen.has(id)||!graph.has(id))continue;
      seen.add(id);
      for(const n of graph.get(id)||[])stack.push(n);
    }
    return seen;
  }

  const reachable=definition.entryBeatId?walk(definition.entryBeatId,adjacency):new Set();
  for(const id of beatMap.keys())if(!reachable.has(id))errors.push("unreachable_beat:"+id);

  const terminals=[...beatMap.entries()].filter(([,b])=>b.exitScene===true).map(([id])=>id);
  if(terminals.length===0)errors.push("terminal_missing");
  const reverse=new Map([...beatMap.keys()].map(id=>[id,[]]));
  for(const [from,targets] of adjacency)for(const to of targets)if(reverse.has(to))reverse.get(to).push(from);
  const canReachTerminal=new Set();
  for(const terminal of terminals){
    for(const id of walk(terminal,reverse))canReachTerminal.add(id);
  }
  for(const id of beatMap.keys())if(!canReachTerminal.has(id))errors.push("cannot_reach_terminal:"+id);

  return{
    pass:errors.length===0,
    sceneId,
    beatCount:beats.length,
    choiceCount,
    battleCount,
    terminalCount:terminals.length,
    beatFallbackChoiceCount,
    reachableCount:reachable.size,
    errors,
    warnings
  };
}

module.exports={analyzeStoryScene};
