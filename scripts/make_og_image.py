"""Build the default Open Graph preview card (assets/og-default.png).

This is the image that appears when a smoald.com link is shared on LinkedIn,
Facebook, WhatsApp or X. Open Graph wants 1200x630.

Run from the repo root:  python scripts/make_og_image.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
OUT = ASSETS / "og-default.png"

W, H = 1200, 630

# Brand palette, matching assets/style.css
CREAM = (251, 246, 236)
INK = (26, 18, 11)
RED = (226, 6, 19)
GOLD = (236, 162, 0)
MUTED = (107, 98, 86)

HEADLINE = "Websites, web apps &\nready-made templates"
SUBLINE = "for UK businesses"
FOOTLINE = "smoald.com  ·  Built and deployed by Joshua Kay"

# Windows ships these; fall back to PIL's default if a face is missing.
FONT_CANDIDATES = {
    "bold": ["arialbd.ttf", "segoeuib.ttf", "DejaVuSans-Bold.ttf"],
    "regular": ["arial.ttf", "segoeui.ttf", "DejaVuSans.ttf"],
}


def load_font(kind: str, size: int):
    for name in FONT_CANDIDATES[kind]:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def main() -> None:
    img = Image.new("RGB", (W, H), CREAM)
    draw = ImageDraw.Draw(img)

    # Brand bar down the left edge: red fading into gold.
    bar_w = 18
    for y in range(H):
        t = y / H
        colour = tuple(round(RED[i] + (GOLD[i] - RED[i]) * t) for i in range(3))
        draw.line([(0, y), (bar_w, y)], fill=colour)

    pad_x = 78
    y = 96

    # Wordmark, if it is available.
    wordmark = ASSETS / "smoald-wordmark.png"
    if wordmark.exists():
        mark = Image.open(wordmark).convert("RGBA")
        target_h = 62
        target_w = round(mark.width * target_h / mark.height)
        mark = mark.resize((target_w, target_h), Image.LANCZOS)
        img.paste(mark, (pad_x, y), mark)
        y += target_h + 46
    else:
        draw.text((pad_x, y), "SMOALD", font=load_font("bold", 58), fill=INK)
        y += 96

    headline_font = load_font("bold", 62)
    draw.multiline_text(
        (pad_x, y), HEADLINE, font=headline_font, fill=INK, spacing=14
    )
    bbox = draw.multiline_textbbox(
        (pad_x, y), HEADLINE, font=headline_font, spacing=14
    )
    y = bbox[3] + 12

    draw.text((pad_x, y), SUBLINE, font=load_font("bold", 62), fill=RED)
    y += 104

    draw.line([(pad_x, y), (pad_x + 132, y)], fill=GOLD, width=4)
    y += 34

    draw.text((pad_x, y), FOOTLINE, font=load_font("regular", 27), fill=MUTED)

    img.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size:,} bytes, {W}x{H})")


if __name__ == "__main__":
    main()
