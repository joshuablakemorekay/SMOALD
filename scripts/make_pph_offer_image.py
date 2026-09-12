"""Build the PeoplePerHour offer image for the 5-page website offer.

PPH requires an image and displays it at 3:2 (they advise 1200x800).

No company name, no wordmark, no URL: PPH forbids naming your business or
pointing buyers at your own site, and the safest reading of that covers the
image as well as the text.

Run from the repo root:  python scripts/make_pph_offer_image.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "pph-5-page-website.png"

W, H = 1200, 800

CREAM = (251, 246, 236)
INK = (26, 18, 11)
RED = (226, 6, 19)
GOLD = (236, 162, 0)
MUTED = (107, 98, 86)
PAPER = (255, 255, 255)
LINE = (214, 206, 192)

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


def page_thumb(draw, x, y, w, h, label, font):
    """One little page mock-up: a browser bar, a heading block, some lines."""
    draw.rectangle([x, y, x + w, y + h], fill=PAPER, outline=LINE, width=2)
    draw.rectangle([x, y, x + w, y + 18], fill=(240, 235, 226), outline=LINE, width=2)
    for i, dot_x in enumerate((x + 8, x + 18, x + 28)):
        draw.ellipse([dot_x, y + 6, dot_x + 6, y + 12], fill=LINE)

    # Heading block, then body lines of varying length.
    draw.rectangle([x + 12, y + 32, x + w - 40, y + 44], fill=GOLD)
    widths = (0.80, 0.66, 0.74, 0.52)
    ly = y + 56
    for frac in widths:
        draw.rectangle([x + 12, ly, x + 12 + int((w - 24) * frac), ly + 6], fill=LINE)
        ly += 14

    tw = draw.textlength(label, font=font)
    draw.text((x + (w - tw) / 2, y + h + 10), label, font=font, fill=MUTED)


def main() -> None:
    img = Image.new("RGB", (W, H), CREAM)
    draw = ImageDraw.Draw(img)

    # Brand bar across the top: red fading into gold.
    bar_h = 14
    for x in range(W):
        t = x / W
        colour = tuple(round(RED[i] + (GOLD[i] - RED[i]) * t) for i in range(3))
        draw.line([(x, 0), (x, bar_h)], fill=colour)

    f_head = load_font("bold", 74)
    f_sub = load_font("regular", 34)
    f_label = load_font("regular", 22)
    f_note = load_font("regular", 26)

    pad = 84
    y = 118

    draw.text((pad, y), "A 5-page business", font=f_head, fill=INK)
    y += 86
    draw.text((pad, y), "website, live in 5 days", font=f_head, fill=INK)
    y += 104

    draw.text((pad, y), "Your domain · SSL · works on phones · contact form that reaches you",
              font=f_sub, fill=MUTED)

    # Five page thumbnails, evenly spread.
    labels = ("Home", "About", "Services", "Contact", "+ one more")
    n = len(labels)
    gap = 26
    tw_total = W - pad * 2
    pw = (tw_total - gap * (n - 1)) // n
    ph = 150
    ty = 476
    for i, label in enumerate(labels):
        page_thumb(draw, pad + i * (pw + gap), ty, pw, ph, label, f_label)

    draw.text((pad, 690), "Two rounds of changes included. The code is yours.",
              font=f_note, fill=INK)

    # A quiet gold rule to close the composition.
    draw.line([(pad, 742), (W - pad, 742)], fill=GOLD, width=3)

    img.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT}  ({OUT.stat().st_size:,} bytes, {W}x{H})")


if __name__ == "__main__":
    main()
