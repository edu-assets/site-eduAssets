"""Builds public/fonts/material-symbols-outlined.woff2 with only the icons the site uses.

Usage:  python3 scripts/subset-icons.py <full-material-symbols.woff2>
Needs:  pip install fonttools brotli
The eduAssets app keeps the full font in frontend/public/assets/fonts/.
Layout closure is disabled on purpose: otherwise every ligature whose letters are present
is kept and the file grows from ~6 KB to ~290 KB.
"""
import re
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

if len(sys.argv) != 2:
    sys.exit(__doc__)

# `image` is used by the screenshot placeholder; `content_copy` is inserted
# by client-side code and cannot be found by the static <Icon name="..."> scan.
icons = {"image", "content_copy"}
patterns = [r"icon:\s*['\"]([a-z0-9_]+)['\"]", r"\bicon=[\"']([a-z0-9_]+)[\"']", r"<Icon\s+name=[\"']([a-z0-9_]+)[\"']"]
for path in Path("src").rglob("*"):
    if path.suffix in (".astro", ".ts"):
        text = path.read_text(encoding="utf8")
        for p in patterns:
            icons.update(re.findall(p, text))

font = TTFont(sys.argv[1])
missing = sorted(i for i in icons if i not in font.getGlyphOrder())
if missing:
    sys.exit(f"Icons not found in the font: {', '.join(missing)}")

font = instancer.instantiateVariableFont(font, {"wght": 400, "opsz": 24, "GRAD": 0, "FILL": 0})
opts = subset.Options()
opts.layout_features = ["liga", "rlig", "calt"]
opts.layout_closure = False
opts.hinting = False
opts.name_IDs = []
subsetter = subset.Subsetter(opts)
subsetter.populate(glyphs=sorted(icons), text=" ".join(sorted(icons)))
subsetter.subset(font)
font.flavor = "woff2"
out = Path("public/fonts/material-symbols-outlined.woff2")
font.save(out)
print(f"{len(icons)} icons -> {out.stat().st_size / 1024:.1f} KB")
print(", ".join(sorted(icons)))
