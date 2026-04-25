#!/usr/bin/env python3
"""
GeoJSON cleaner — remove unwanted property fields from feature collections.

Configure FILES and FIELDS_TO_REMOVE below, then run:
    python scripts/clean.py
"""

import json
from pathlib import Path

# ── Configuration ─────────────────────────────────────────────────────────────

FILES = [
    "public/datasf_districts.geojson",
    "public/datasf_precincts.geojson",
    "public/sffind_neighborhoods.geojson",
    "public/sfmta_transit.geojson",
    "public/bart_transit.geojson",
]

FIELDS_TO_REMOVE = [
    ":id",
    "id",
    ":version",
    ":created_at",
    ":updated_at",
    "data_loaded_at",
    "data_as_of",
    "shape_leng",
    "shape_area",
]

# ── Script ────────────────────────────────────────────────────────────────────

ROOT = Path(__file__).parent.parent


def clean_file(rel_path: str, fields: list[str]) -> None:
    path = ROOT / rel_path
    if not path.exists():
        print(f"  SKIP  {rel_path} (file not found)")
        return

    with open(path) as f:
        data = json.load(f)

    features = data.get("features", [])
    removed_counts: dict[str, int] = {field: 0 for field in fields}

    for feature in features:
        props = feature.get("properties") or {}
        for field in fields:
            if field in props:
                del props[field]
                removed_counts[field] += 1

    with open(path, "w") as f:
        json.dump(data, f, separators=(",", ":"))
        f.write("\n")

    summary = ", ".join(
        f"{field!r} x{count}" for field, count in removed_counts.items() if count
    )
    print(f"  OK    {rel_path}  —  {summary or 'nothing removed'}")


def main() -> None:
    print(f"Cleaning {len(FILES)} file(s), removing fields: {FIELDS_TO_REMOVE}\n")
    for rel_path in FILES:
        clean_file(rel_path, FIELDS_TO_REMOVE)
    print("\nDone.")


if __name__ == "__main__":
    main()
