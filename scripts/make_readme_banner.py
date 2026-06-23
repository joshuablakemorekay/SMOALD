"""
Build the README cover banner: the SMOALD bolt above a crisp, high-resolution
SMOALD wordmark (SMO red, AL shiny gold, D red), on a wide white rounded card.

The wordmark is rendered as live text (not the low-res logo PNG) so it stays
sharp at any size. GitHub strips CSS backgrounds and transparent PNGs follow
the viewer's light/dark theme, so the white card keeps the logo on-brand.

Run from repo root:  python scripts/make_readme_banner.py
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ASSETS = Path(__file__).resolve().parent.parent / "assets"
FONT = "C:/Windows/Fonts/ariblk.ttf"  # Arial Black — heavy, clean, always on Windows

RED = (226, 6, 19)
GOLD_STOPS = [(0.0, (255, 224, 122)), (0.5, (255, 193, 7)), (1.0, (240, 165, 0))]


def resize_h(img, h):
    return img.resize((round(img.width * h / img.height), h), Image.LANCZOS)


def _lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def vertical_gradient(w, h, stops):
    col = Image.new("RGB", (1, h))
    px = col.load()
    for y in range(h):
        t = y / max(1, h - 1)
        for i in range(len(stops) - 1):
            p0, c0 = stops[i]
            p1, c1 = stops[i + 1]
            if p0 <= t <= p1:
                px[0, y] = _lerp(c0, c1, (t - p0) / (p1 - p0))
                break
    return col.resize((w, h))


def render_wordmark(size=260):
    """Render 'SMOALD' crisply: SMO red, AL gold gradient, D red."""
    font = ImageFont.truetype(FONT, size)
    segs = [("SMO", "red"), ("AL", "gold"), ("D", "red")]
    pad = size // 4
    total_w = round(font.getlength("SMOALD")) + pad * 2
    canvas_h = size * 2
    canvas = Image.new("RGBA", (total_w, canvas_h), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)
    x, y = pad, pad // 2
    done = ""
    for text, kind in segs:
        sx = pad + round(font.getlength(done))
        if kind == "red":
            d.text((sx, y), text, font=font, fill=RED + (255,), anchor="la")
        else:
            mask = Image.new("L", canvas.size, 0)
            ImageDraw.Draw(mask).text((sx, y), text, font=font, fill=255, anchor="la")
            grad = vertical_gradient(canvas.width, canvas.height, GOLD_STOPS).convert("RGBA")
            grad.putalpha(mask)
            canvas.alpha_composite(grad)
        done += text
    return canvas.crop(canvas.getbbox())


def main():
    bolt = resize_h(Image.open(ASSETS / "smoald-bolt.png").convert("RGBA"), 200)
    word = resize_h(render_wordmark(), 104)

    W, H, radius, gap = 1600, 520, 34, 30
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)
    d.rounded_rectangle([0, 0, W - 1, H - 1], radius=radius, fill=(255, 255, 255, 255))
    d.rounded_rectangle([0, 0, W - 1, H - 1], radius=radius, outline=(26, 18, 11, 28), width=2)

    group_h = bolt.height + gap + word.height
    top = (H - group_h) // 2
    canvas.alpha_composite(bolt, ((W - bolt.width) // 2, top))
    canvas.alpha_composite(word, ((W - word.width) // 2, top + bolt.height + gap))

    out = ASSETS / "smoald-readme-banner.png"
    canvas.save(out)
    print(f"banner -> {canvas.size}; wordmark rendered at high-res text -> {out}")


if __name__ == "__main__":
    main()
