#!/usr/bin/env python3
"""Shinobi Chronicles Battle Portrait QA.

Validates the ratified 102-row uiPortrait manifest against current repository
bytes. This is presentation/asset QA only; it never derives Registry identity
from filenames and never substitutes another file when a mapping fails.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "Documentation/Assets/Battle Portrait Authority and Manifest.md"
GAME_JS = ROOT / "game.js"
EXPECTED_SIZE = (1024, 1024)
EXPECTED_COUNT = 102

ROW_RE = re.compile(
    r"^\|\s*`([^`]+)`\s*\|\s*`([^`]+\.png)`\s*\|\s*`(Assets/Portraits/[^`]+\.png)`\s*\|\s*\*\*ACTIVE — Assets approved\*\*\s*\|$"
)


def extract_production_ids(source: str, constant_name: str) -> list[str]:
    pattern = re.compile(
        rf"const\s+{re.escape(constant_name)}\s*=\s*Object\.freeze\(\[(.*?)\]\);",
        re.S,
    )
    match = pattern.search(source)
    if not match:
        raise RuntimeError(f"missing production constant: {constant_name}")
    return re.findall(r'"([^"]+)"', match.group(1))


def main() -> int:
    errors: list[str] = []
    if not MANIFEST.is_file():
        print(f"ERROR: manifest missing: {MANIFEST}")
        return 1
    if not GAME_JS.is_file():
        print(f"ERROR: game.js missing: {GAME_JS}")
        return 1

    rows: list[tuple[str, str, str]] = []
    for line in MANIFEST.read_text(encoding="utf-8").splitlines():
        match = ROW_RE.match(line.strip())
        if match:
            rows.append(match.groups())

    ids = [row[0] for row in rows]
    paths = [row[2] for row in rows]

    if len(rows) != EXPECTED_COUNT:
        errors.append(f"manifest_row_count:{len(rows)}!={EXPECTED_COUNT}")
    if len(set(ids)) != len(ids):
        errors.append("duplicate_registry_id_mapping")
    if len(set(paths)) != len(paths):
        errors.append("duplicate_portrait_path_mapping")

    source = GAME_JS.read_text(encoding="utf-8")
    try:
        production_ids = extract_production_ids(source, "ALPHA_PRODUCTION_CHARACTER_IDS") + extract_production_ids(
            source, "ALPHA_PRODUCTION_ENTITY_IDS"
        )
    except RuntimeError as exc:
        errors.append(str(exc))
        production_ids = []

    if production_ids:
        if len(production_ids) != EXPECTED_COUNT:
            errors.append(f"production_id_count:{len(production_ids)}!={EXPECTED_COUNT}")
        if len(set(production_ids)) != len(production_ids):
            errors.append("duplicate_production_registry_id")
        missing = sorted(set(production_ids) - set(ids))
        extra = sorted(set(ids) - set(production_ids))
        if missing:
            errors.append("manifest_missing_ids:" + ",".join(missing))
        if extra:
            errors.append("manifest_nonproduction_ids:" + ",".join(extra))

    decoded = 0
    dimension_ok = 0
    for registry_id, approved_file, relative_path in rows:
        file_path = ROOT / relative_path
        if Path(relative_path).name != approved_file:
            errors.append(f"filename_column_mismatch:{registry_id}:{approved_file}:{relative_path}")
        if not file_path.is_file():
            errors.append(f"missing_path:{registry_id}:{relative_path}")
            continue
        try:
            with Image.open(file_path) as image:
                if image.format != "PNG":
                    errors.append(f"not_png:{registry_id}:{relative_path}:{image.format}")
                dimensions = image.size
                image.verify()
            decoded += 1
            if dimensions != EXPECTED_SIZE:
                errors.append(f"bad_dimensions:{registry_id}:{relative_path}:{dimensions[0]}x{dimensions[1]}")
            else:
                dimension_ok += 1
        except Exception as exc:  # Pillow exposes several decode-specific exceptions.
            errors.append(f"decode_failure:{registry_id}:{relative_path}:{type(exc).__name__}:{exc}")

    print("SC Battle Portrait QA")
    print(f"manifest rows: {len(rows)}/{EXPECTED_COUNT}")
    print(f"unique IDs: {len(set(ids))}/{EXPECTED_COUNT}")
    print(f"unique paths: {len(set(paths))}/{EXPECTED_COUNT}")
    print(f"decoded PNGs: {decoded}/{EXPECTED_COUNT}")
    print(f"1024x1024: {dimension_ok}/{EXPECTED_COUNT}")

    if errors:
        print(f"FAIL ({len(errors)} issues)")
        for error in errors:
            print(" -", error)
        return 1

    print("PASS — 102/102 ratified uiPortrait mappings exist, decode, and are exactly 1024x1024.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
