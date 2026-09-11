#!/usr/bin/env python3
"""Shinobi Chronicles live-115 Battle/UI portrait QA.

Production authority is the explicit UI_PORTRAIT_MANIFEST in game.js, which must
match the current live 97 Character + 18 Entity = 115 production baseline. This
tool never derives a mapping from filenames or folders and never substitutes
collectible-card art.

Checks:
- exact 97 Character + 18 Entity = 115 production Registry IDs;
- exact 115-entry explicit uiPortrait manifest with the same ID set;
- retired Teen Nagato remains absent from production IDs and the active manifest;
- unique approved paths rooted at Portraits/;
- every approved file exists, is PNG, decodes, and is exactly 1024x1024;
- runtime resolver remains manifest-backed and explicitly no-fallback;
- Battle roster presentation continues to consume resolveUIPortraitProjection.

Any physical failure is reported against the exact approved Registry row/path.
A failure is not permission for Coding to choose a replacement portrait.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Iterable

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
GAME_JS = ROOT / "game.js"
EXPECTED_SIZE = (1024, 1024)
EXPECTED_CHARACTERS = 97
EXPECTED_ENTITIES = 18
EXPECTED_COUNT = 115
RETIRED_IDS = frozenset({"teen_nagato"})
MANIFEST_START = "// UI_PORTRAIT_MANIFEST_JSON_START"
MANIFEST_END = "// UI_PORTRAIT_MANIFEST_JSON_END"


def extract_production_ids(source: str, constant_name: str) -> list[str]:
    pattern = re.compile(
        rf"const\s+{re.escape(constant_name)}\s*=\s*Object\.freeze\(\[(.*?)\]\);",
        re.S,
    )
    match = pattern.search(source)
    if not match:
        raise RuntimeError(f"missing production constant: {constant_name}")
    return re.findall(r'"([^"]+)"', match.group(1))


def extract_manifest(source: str) -> dict[str, str]:
    start = source.find(MANIFEST_START)
    end = source.find(MANIFEST_END)
    if start < 0 or end < 0 or end <= start:
        raise RuntimeError("live115 uiPortrait manifest markers missing")
    section = source[start:end]
    match = re.search(
        r"const\s+UI_PORTRAIT_MANIFEST\s*=\s*Object\.freeze\((\{.*?\})\);",
        section,
        re.S,
    )
    if not match:
        raise RuntimeError("UI_PORTRAIT_MANIFEST object missing between markers")
    try:
        manifest = json.loads(match.group(1))
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"UI_PORTRAIT_MANIFEST is not machine-readable JSON: {exc}") from exc
    if not isinstance(manifest, dict):
        raise RuntimeError("UI_PORTRAIT_MANIFEST must decode to an object")
    return {str(key): str(value) for key, value in manifest.items()}


def extract_js_function(source: str, function_name: str) -> str:
    marker = f"function {function_name}("
    start = source.find(marker)
    if start < 0:
        raise RuntimeError(f"missing runtime function: {function_name}")
    brace = source.find("{", start)
    if brace < 0:
        raise RuntimeError(f"missing body for runtime function: {function_name}")
    depth = 0
    quote: str | None = None
    escaped = False
    for index in range(brace, len(source)):
        ch = source[index]
        if quote is not None:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == quote:
                quote = None
            continue
        if ch in {'"', "'", "`"}:
            quote = ch
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return source[start : index + 1]
    raise RuntimeError(f"unterminated runtime function: {function_name}")


def append_set_diff_errors(
    errors: list[str],
    expected: Iterable[str],
    actual: Iterable[str],
    missing_label: str,
    extra_label: str,
) -> None:
    expected_set = set(expected)
    actual_set = set(actual)
    missing = sorted(expected_set - actual_set)
    extra = sorted(actual_set - expected_set)
    if missing:
        errors.append(missing_label + ":" + ",".join(missing))
    if extra:
        errors.append(extra_label + ":" + ",".join(extra))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--static-only",
        action="store_true",
        help="validate source/manifest/resolver authority without opening PNG binaries",
    )
    args = parser.parse_args()

    errors: list[str] = []
    if not GAME_JS.is_file():
        print(f"ERROR: game.js missing: {GAME_JS}")
        return 1

    source = GAME_JS.read_text(encoding="utf-8")
    try:
        character_ids = extract_production_ids(source, "ALPHA_PRODUCTION_CHARACTER_IDS")
        entity_ids = extract_production_ids(source, "ALPHA_PRODUCTION_ENTITY_IDS")
        manifest = extract_manifest(source)
        resolver_source = extract_js_function(source, "resolveUIPortraitProjection")
        roster_source = extract_js_function(source, "renderBattleRosterSlot")
    except RuntimeError as exc:
        print("FAIL")
        print(" -", exc)
        return 1

    production_ids = character_ids + entity_ids
    manifest_ids = list(manifest)
    paths = list(manifest.values())

    if len(character_ids) != EXPECTED_CHARACTERS:
        errors.append(f"production_character_count:{len(character_ids)}!={EXPECTED_CHARACTERS}")
    if len(entity_ids) != EXPECTED_ENTITIES:
        errors.append(f"production_entity_count:{len(entity_ids)}!={EXPECTED_ENTITIES}")
    if len(production_ids) != EXPECTED_COUNT:
        errors.append(f"production_total:{len(production_ids)}!={EXPECTED_COUNT}")
    if len(set(production_ids)) != len(production_ids):
        errors.append("duplicate_production_registry_id")

    if len(manifest) != EXPECTED_COUNT:
        errors.append(f"manifest_row_count:{len(manifest)}!={EXPECTED_COUNT}")
    if len(set(manifest_ids)) != len(manifest_ids):
        errors.append("duplicate_manifest_registry_id")
    if len(set(paths)) != len(paths):
        errors.append("duplicate_portrait_path_mapping")
    append_set_diff_errors(
        errors,
        production_ids,
        manifest_ids,
        "manifest_missing_ids",
        "manifest_nonproduction_ids",
    )

    retired_in_production = sorted(RETIRED_IDS.intersection(production_ids))
    retired_in_manifest = sorted(RETIRED_IDS.intersection(manifest_ids))
    if retired_in_production:
        errors.append("retired_registry_id_in_production:" + ",".join(retired_in_production))
    if retired_in_manifest:
        errors.append("retired_registry_id_in_manifest:" + ",".join(retired_in_manifest))

    for registry_id, path in manifest.items():
        if not path.startswith("Portraits/") or not path.lower().endswith(".png"):
            errors.append(f"invalid_approved_path:{registry_id}:{path}")

    resolver_lower = resolver_source.lower()
    if "getuiportraitassetpath" not in resolver_lower:
        errors.append("runtime_resolver_not_manifest_backed")
    if resolver_source.count("fallbackUsed:false") < 2:
        errors.append("runtime_resolver_no_fallback_contract_missing")
    if "getCharacterCardAssetPath" in resolver_source or "getEntityCollectibleCardAssetPath" in resolver_source:
        errors.append("runtime_resolver_collectible_card_fallback_detected")
    if "resolveUIPortraitProjection(participant)" not in roster_source:
        errors.append("battle_roster_not_consuming_ui_portrait_resolver")
    if "getCharacterCardAssetPath" in roster_source or "getEntityCollectibleCardAssetPath" in roster_source:
        errors.append("battle_roster_collectible_card_fallback_detected")

    decoded = 0
    dimension_ok = 0
    binary_failures: list[str] = []
    if not args.static_only:
        for registry_id, relative_path in manifest.items():
            file_path = ROOT / relative_path
            if not file_path.is_file():
                binary_failures.append(f"missing_path:{registry_id}:{relative_path}")
                continue
            try:
                with Image.open(file_path) as image:
                    image_format = image.format
                    dimensions = image.size
                    image.verify()
                if image_format != "PNG":
                    binary_failures.append(
                        f"not_png:{registry_id}:{relative_path}:{image_format}"
                    )
                    continue
                decoded += 1
                if dimensions != EXPECTED_SIZE:
                    binary_failures.append(
                        f"bad_dimensions:{registry_id}:{relative_path}:{dimensions[0]}x{dimensions[1]}"
                    )
                else:
                    dimension_ok += 1
            except Exception as exc:  # Pillow exposes decode-specific exceptions.
                binary_failures.append(
                    f"decode_failure:{registry_id}:{relative_path}:{type(exc).__name__}:{exc}"
                )
        errors.extend(binary_failures)

    print("SC Live-115 Battle Portrait QA")
    print(f"production characters: {len(character_ids)}/{EXPECTED_CHARACTERS}")
    print(f"production entities: {len(entity_ids)}/{EXPECTED_ENTITIES}")
    print(f"production total: {len(production_ids)}/{EXPECTED_COUNT}")
    print(f"manifest rows: {len(manifest)}/{EXPECTED_COUNT}")
    print(f"unique paths: {len(set(paths))}/{EXPECTED_COUNT}")
    print("retired Teen Nagato: absent from production IDs and active portrait manifest")
    print("runtime resolver: explicit manifest-backed / no collectible-card fallback")
    if args.static_only:
        print("binary decode: SKIPPED (--static-only)")
    else:
        print(f"decoded PNGs: {decoded}/{EXPECTED_COUNT}")
        print(f"1024x1024: {dimension_ok}/{EXPECTED_COUNT}")

    if errors:
        print(f"FAIL ({len(errors)} issues)")
        for error in errors:
            print(" -", error)
        if binary_failures:
            print("FAILURE POLICY: return these exact approved rows to Assets; do not remap in Coding.")
        return 1

    if args.static_only:
        print("PASS — live-115 manifest/Registry/resolver authority is exact; binary QA not run.")
    else:
        print("PASS — 115/115 approved uiPortraits exist, decode as PNG, are exactly 1024x1024, and runtime source remains no-fallback.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
