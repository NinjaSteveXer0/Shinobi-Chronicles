#!/usr/bin/env python3
"""Physical production QA for the Alpha Genin v2 25-row asset gate (#74).

This script validates only physical/format constraints and one explicit visual-authority
rejection already owned by #69/#74. It does not infer Registry identity, candidate
membership, ownership, or representation semantics from filenames.
"""

from __future__ import annotations

import sys
from pathlib import Path
from PIL import Image


TARGET_IDS = [
    "genin_hashirama",
    "genin_hiruzen",
    "genin_mito",
    "genin_tsunade",
    "genin_sakumo",
    "genin_duy",
    "genin_guy",
    "genin_rin",
    "genin_dan",
    "genin_nawaki",
    "genin_shizune",
    "genin_yamato",
    "genin_sai",
    "genin_kagami",
    "genin_danzo",
    "genin_torifu",
    "genin_inoichi",
    "genin_choza",
    "genin_shibi",
    "genin_tsume",
    "genin_hiashi",
    "genin_yugao",
    "genin_hayate",
    "genin_mukai",
    "genin_kosuke",
]

CARD_SIZE = (980, 1400)
PORTRAIT_SIZE = (1024, 1024)

# Durable Character Creation / CE / Registry authority: the current Chōza binary
# must remain non-authoritative even if it is physically a valid PNG.
CARD_AUTHORITY_REJECTIONS = {
    "genin_choza": "current collectible visual rejected by #69/#74; replacement required",
}


def inspect_png(path: Path, expected_size: tuple[int, int]) -> tuple[bool, str]:
    if not path.is_file():
        return False, "MISSING"
    try:
        with Image.open(path) as image:
            fmt = image.format
            size = image.size
            image.verify()
        # verify() intentionally invalidates the decoder; reopen and force decode.
        with Image.open(path) as image:
            image.load()
    except Exception as exc:  # pragma: no cover - CI diagnostic path
        return False, f"DECODE_FAIL: {type(exc).__name__}: {exc}"
    if fmt != "PNG":
        return False, f"FORMAT_FAIL: {fmt!r}"
    if size != expected_size:
        return False, f"SIZE_FAIL: {size[0]}x{size[1]} expected {expected_size[0]}x{expected_size[1]}"
    return True, f"GREEN {size[0]}x{size[1]} PNG"


def main() -> int:
    errors: list[str] = []
    card_green = 0
    portrait_green = 0

    print("Alpha Genin Expansion 25-row Assets QA (#74)")
    print("collectibleCard != uiPortrait")
    print()
    print("| # | Registry ID | collectibleCard | uiPortrait |")
    print("|---:|---|---|---|")

    for index, representation_id in enumerate(TARGET_IDS, start=1):
        card_path = Path("Assets/Genin") / f"{representation_id}.png"
        portrait_path = Path("Portraits/Genin") / f"{representation_id}.png"

        card_ok, card_detail = inspect_png(card_path, CARD_SIZE)
        portrait_ok, portrait_detail = inspect_png(portrait_path, PORTRAIT_SIZE)

        if representation_id in CARD_AUTHORITY_REJECTIONS:
            rejection = CARD_AUTHORITY_REJECTIONS[representation_id]
            card_ok = False
            card_detail = f"AUTHORITY_REJECTED: {rejection}; physical={card_detail}"

        if card_ok:
            card_green += 1
        else:
            errors.append(f"{representation_id} collectibleCard: {card_detail}")

        if portrait_ok:
            portrait_green += 1
        else:
            errors.append(f"{representation_id} uiPortrait: {portrait_detail}")

        print(
            f"| {index} | `{representation_id}` | `{card_path}` — {card_detail} | "
            f"`{portrait_path}` — {portrait_detail} |"
        )

    print()
    print(f"collectibleCard physical/authority GREEN: {card_green}/25")
    print(f"uiPortrait physical GREEN: {portrait_green}/25")
    print(f"total blocking rows/channels: {len(errors)}")

    if errors:
        print("\nBLOCKERS:")
        for item in errors:
            print(f"- {item}")
        return 1

    print("\nPASS: 25/25 collectible cards and 25/25 uiPortraits satisfy the #74 production asset gate.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
