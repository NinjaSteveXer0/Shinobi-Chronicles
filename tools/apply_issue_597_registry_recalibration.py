#!/usr/bin/env python3
from pathlib import Path

path = Path("game.js")
text = path.read_text(encoding="utf-8")


def replace_between(source: str, start_marker: str, end_marker: str, replacement: str) -> str:
    start = source.find(start_marker)
    if start < 0:
        raise SystemExit(f"missing start marker: {start_marker}")
    end = source.find(end_marker, start + len(start_marker))
    if end < 0:
        raise SystemExit(f"missing end marker after {start_marker}: {end_marker}")
    return source[:start] + replacement + source[end:]


hinata = '''"academy_hinata": {
    "id": "academy_hinata",
    "baseStats": {
      "nin": 8,
      "tai": 13,
      "buki": 6,
      "fuin": 5,
      "kin": 5,
      "gen": 6,
      "stamina": 10
    },
    "basePL": 12,
    "formalRank": "academy",
    "embodiedExpressions": []
  },
  '''
mirai = '''"academy_mirai": {
    "id": "academy_mirai",
    "baseStats": {
      "nin": 9,
      "tai": 9,
      "buki": 12,
      "fuin": 6,
      "kin": 6,
      "gen": 13,
      "stamina": 10
    },
    "basePL": 12,
    "formalRank": "academy",
    "embodiedExpressions": []
  },
  '''
menma = '''"academy_menma": {
    "id": "academy_menma",
    "baseStats": {
      "nin": 10,
      "tai": 8,
      "buki": 6,
      "fuin": 5,
      "kin": 13,
      "gen": 7,
      "stamina": 11
    },
    "basePL": 12,
    "formalRank": "academy",
    "embodiedExpressions": [],
    "defaultAttachedSummonId": "menma_nine_tails"
  },
  '''

text = replace_between(text, '"academy_hinata": {', '"academy_izuno": {', hinata)
text = replace_between(text, '"academy_mirai": {', '"academy_menma": {', mirai)
text = replace_between(text, '"academy_menma": {', '"academy_kushina": {', menma)

function_start = text.find("function runAcademyPilotDeploymentDiagnostics")
if function_start < 0:
    raise SystemExit("runAcademyPilotDeploymentDiagnostics missing")
mapping_start = text.find("const expectedPL = {", function_start)
mapping_end = text.find("};", mapping_start)
if mapping_start < 0 or mapping_end < 0:
    raise SystemExit("Academy pilot expectedPL mapping missing")

mapping = '''const expectedPL = {

            academy_hinata:
              12,

            academy_izuno:
              9,

            academy_mirai:
              12,

            academy_menma:
              12,

            academy_kushina:
              12

          }'''
text = text[:mapping_start] + mapping + text[mapping_end + 1:]
path.write_text(text, encoding="utf-8")
