"""Optional vector refresh: PYTHONPATH=<fonttools install> python3 scripts/build-brand-vectors.py.
Outlines the existing fonts; no font substitutions or hand-drawn glyphs.
Raster assets are built with npm run brand:build (no Python dependency).
"""
from pathlib import Path
from html import escape
from math import ceil
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
fonts={name:TTFont(f'assets/fonts/{name}.woff2') for name in ['cal-sans','inter-regular']}
def text(value,x,y,size,face='cal-sans',color='#171816'):
    font=fonts[face]; glyphs=font.getGlyphSet(); cmap=font.getBestCmap(); scale=size/font['head'].unitsPerEm; advance=0; paths=[]
    for char in value:
        name=cmap[ord(char)]; pen=SVGPathPen(glyphs); glyphs[name].draw(pen)
        paths.append(f'<path transform="translate({advance},0)" d="{pen.getCommands()}"/>')
        advance+=font['hmtx'][name][0]
    return f'<g aria-label="{escape(value)}" fill="{color}" transform="translate({x},{y}) scale({scale}, {-scale})">'+''.join(paths)+'</g>'
def svg(w,h,body): return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{body}</svg>'
def rect(x,y,w,h,color): return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{color}"/>'
Path('public/quillo-wordmark.svg').write_text(svg(490,180,text('Quillo.',0,140,160)))
font=fonts['cal-sans']; gs=font.getGlyphSet(); name=font.getBestCmap()[ord('Q')]; bounds=BoundsPen(gs); gs[name].draw(bounds); x0,y0,x1,y1=bounds.bounds
scale=350/max(x1-x0,y1-y0); size=scale*font['head'].unitsPerEm
Path('public/favicon.svg').write_text(svg(512,512,rect(0,0,512,512,'#d5fc46')+text('Q',(512-(x1-x0)*scale)/2-x0*scale,(512+(y1-y0)*scale)/2+y0*scale,size)))
body=rect(0,0,1200,630,'#f3f1e9')+text('Quillo.',60,96,64)+text('QATAR',245,85,12,'inter-regular')+text('PRODUCT DESIGN STUDIO FOR QATAR',835,85,12,'inter-regular')+rect(60,146,1080,1,'#b7b9aa')
body+=text('Stop guessing',55,297,105)+rect(60,332,1080,125,'#d5fc46')+text('what to build next.',55,422,105)
body+=text('PRODUCT STRATEGY / UX / INTERFACE DESIGN',60,565,12,'inter-regular')+text('FOR QATAR. FOR WHAT’S NEXT.',918,565,12,'inter-regular')
Path('public/og.svg').write_text(svg(1200,630,body))
print('Outlined Quillo brand assets from Cal Sans and Inter.')
