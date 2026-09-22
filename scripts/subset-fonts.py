"""Optional source-font refresh: pip install fonttools brotli; python scripts/subset-fonts.py.

The site is English. Keep Latin-1, punctuation, currencies, arrows, and ligatures.
Glyph outlines, hinting, kerning, and OpenType layout features remain unchanged.
Builds consume the checked-in WOFF2 subsets and do not require Python.
"""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

unicodes = set(range(0x20, 0x100)) | set(range(0x2000, 0x2070)) | set(range(0x20A0, 0x20D0)) | set(range(0x2190, 0x2200)) | {0xFB01, 0xFB02, 0xFEFF}
for source in Path('assets/font-sources').glob('*.woff2'):
    font = TTFont(source)
    options = subset.Options()
    options.layout_features = ['*']
    options.name_IDs = ['*']
    options.name_legacy = True
    options.name_languages = ['*']
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    font.flavor = 'woff2'
    output = Path('assets/fonts') / source.name
    font.save(output)
    print(f'{source.name}: {source.stat().st_size} → {output.stat().st_size} bytes')
