"""Build the PeoplePerHour offer image for the website-restyle offer.

Same rules as make_pph_offer_image.py: 1200x800 (PPH shows it at 3:2), and
no company name, wordmark or URL anywhere on it.

The picture is a before/after: a plain grey page on the left, the same page
on the theme on the right - masthead, sidebar, reading column, right rail.

Run from the repo root:  python scripts/make_pph_restyle_image.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "pph-restyle-theme.png"

W, H = 1200, 800

CREAM = (251, 246, 236)
INK = (26, 18, 11)
RED = (226, 6, 19)
GOLD = (236, 162, 0)
MUTED = (107, 98, 86)
PAPER = (255, 255, 255)
LINE = (214, 206, 192)
GREY = (200, 200, 200)
GREY_DARK = (150, 150, 150)

# The theme's own palette, so the "after" looks like the thing being sold.
T_BRAND = (74, 26, 107)
T_BRAND_DEEP = (122, 31, 61)
T_SURFACE = (255, 248, 220)
T_ACCENT = (212, 175, 55)
T_TINT = (232, 222, 240)

FONT_CANDIDATES = {
    "bold": ["arialbd.ttf", "segoeuib.ttf", "DejaVuSans-Bold.ttf"],
    "regular": ["arial.ttf", "segoeui.ttf", "DejaVuSans.ttf"],
    "serif": ["georgiab.ttf", "timesbd.ttf", "DejaVuSerif-Bold.ttf"],
}


def load_font(kind: str, size: int):
    for name in FONT_CANDIDATES[kind]:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def browser_frame(draw, x, y, w, h):
    draw.rectangle([x, y, x + w, y + h], fill=PAPER, outline=LINE, width=2)
    draw.rectangle([x, y, x + w, y + 22], fill=(240, 235, 226), outline=LINE, width=2)
    for dot_x in (x + 10, x + 22, x + 34):
        draw.ellipse([dot_x, y + 8, dot_x + 7, y + 15], fill=LINE)


def lines(draw, x, y, w, count, fill, step=13, h=6, widths=None):
    widths = widths or (0.92, 0.78, 0.86, 0.6, 0.9, 0.7)
    for i in range(count):
        frac = widths[i % len(widths)]
        draw.rectangle([x, y, x + int(w * frac), y + h], fill=fill)
        y += step
    return y


def page_before(draw, x, y, w, h):
    """A plain site: grey nav, a stack of grey blocks, nothing in charge."""
    browser_frame(draw, x, y, w, h)
    ix, iy = x + 18, y + 40
    iw = w - 36
    draw.rectangle([ix, iy, ix + iw, iy + 22], fill=(235, 235, 235))
    for i in range(4):
        draw.rectangle([ix + 8 + i * 54, iy + 8, ix + 44 + i * 54, iy + 14], fill=GREY)
    iy += 40
    draw.rectangle([ix, iy, ix + int(iw * 0.55), iy + 16], fill=GREY_DARK)
    iy += 30
    iy = lines(draw, ix, iy, iw, 6, GREY)
    iy += 10
    draw.rectangle([ix, iy, ix + iw, iy + 46], fill=(238, 238, 238))
    iy += 60
    lines(draw, ix, iy, iw, 4, GREY)


def page_after(draw, x, y, w, h):
    """The same page on the theme: masthead, sidebar, reading column, rail."""
    browser_frame(draw, x, y, w, h)
    ix, iy = x + 2, y + 24
    iw = w - 4
    # Warm ground.
    draw.rectangle([ix, iy, ix + iw, y + h - 2], fill=T_SURFACE)
    # Masthead: brand fading to deep.
    mh = 34
    for px in range(iw):
        t = px / iw
        c = tuple(round(T_BRAND[i] + (T_BRAND_DEEP[i] - T_BRAND[i]) * t) for i in range(3))
        draw.line([(ix + px, iy), (ix + px, iy + mh)], fill=c)
    draw.rectangle([ix + 14, iy + 11, ix + 60, iy + 22], fill=T_ACCENT)
    for i in range(4):
        draw.rectangle([ix + 84 + i * 40, iy + 14, ix + 110 + i * 40, iy + 19],
                       fill=(240, 232, 250))
    # Gold hairline under the masthead.
    draw.line([(ix, iy + mh), (ix + iw, iy + mh)], fill=T_ACCENT, width=2)

    cy = iy + mh + 16
    pad = 14
    # Three columns: sidebar / main / rail.
    sw, rw = int(iw * 0.22), int(iw * 0.22)
    mw = iw - sw - rw - pad * 4
    sx = ix + pad
    mx = sx + sw + pad
    rx = mx + mw + pad

    # Sidebar: "In this section" list.
    draw.rectangle([sx, cy, sx + sw, y + h - 16], fill=T_TINT)
    ly = cy + 12
    for i in range(5):
        draw.rectangle([sx + 10, ly, sx + sw - 14, ly + 6],
                       fill=T_BRAND if i == 1 else (160, 140, 180))
        ly += 18

    # Main: serif heading, gold rule, prose.
    draw.rectangle([mx, cy + 4, mx + int(mw * 0.7), cy + 20], fill=T_BRAND)
    draw.line([(mx, cy + 32), (mx + int(mw * 0.35), cy + 32)], fill=T_ACCENT, width=3)
    my = lines(draw, mx, cy + 46, mw, 7, (196, 178, 160))
    # A callout box.
    draw.rectangle([mx, my + 6, mx + mw, my + 40], fill=(255, 253, 244),
                   outline=T_ACCENT, width=2)
    draw.rectangle([mx, my + 6, mx + 4, my + 40], fill=T_ACCENT)
    lines(draw, mx + 12, my + 14, mw - 24, 2, (196, 178, 160), widths=(0.9, 0.6))

    # Right rail: two cards, one with a button.
    for k in range(2):
        cy2 = cy + k * 74
        draw.rectangle([rx, cy2, rx + rw, cy2 + 62], fill=PAPER, outline=T_ACCENT, width=2)
        draw.rectangle([rx + 10, cy2 + 12, rx + rw - 10, cy2 + 18], fill=T_BRAND)
        if k == 0:
            lines(draw, rx + 10, cy2 + 28, rw - 20, 2, (196, 178, 160), widths=(0.9, 0.7))
        else:
            draw.rounded_rectangle([rx + 10, cy2 + 30, rx + rw - 10, cy2 + 50],
                                   radius=4, fill=T_ACCENT)


def main() -> None:
    img = Image.new("RGB", (W, H), CREAM)
    draw = ImageDraw.Draw(img)

    # Brand bar across the top: red fading into gold.
    bar_h = 14
    for x in range(W):
        t = x / W
        colour = tuple(round(RED[i] + (GOLD[i] - RED[i]) * t) for i in range(3))
        draw.line([(x, 0), (x, bar_h)], fill=colour)

    f_head = load_font("bold", 66)
    f_sub = load_font("regular", 31)
    f_label = load_font("regular", 24)
    f_note = load_font("regular", 26)

    pad = 84
    y = 104
    draw.text((pad, y), "Your site, moved onto", font=f_head, fill=INK)
    y += 78
    draw.text((pad, y), "a better design", font=f_head, fill=INK)
    y += 96
    draw.text((pad, y),
              "Your pages and content, rebuilt on a book-style theme in your colours",
              font=f_sub, fill=MUTED)

    # Before -> after.
    pw, ph = 420, 300
    ty = 380
    bx = pad
    ax = W - pad - pw
    page_before(draw, bx, ty, pw, ph)
    page_after(draw, ax, ty, pw, ph)

    for label, px in (("Before", bx), ("After", ax)):
        tw = draw.textlength(label, font=f_label)
        draw.text((px + (pw - tw) / 2, ty + ph + 12), label, font=f_label, fill=MUTED)

    # Arrow between them.
    mid_y = ty + ph // 2
    x1, x2 = bx + pw + 44, ax - 44
    draw.line([(x1, mid_y), (x2, mid_y)], fill=GOLD, width=5)
    draw.polygon([(x2, mid_y), (x2 - 22, mid_y - 14), (x2 - 22, mid_y + 14)], fill=GOLD)

    draw.text((pad, 738), "Live on your domain in 3 days. Licence and the code are yours.",
              font=f_note, fill=INK)

    img.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT}  ({OUT.stat().st_size:,} bytes, {W}x{H})")


if __name__ == "__main__":
    main()
