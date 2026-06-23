"""
Build a README banner: the SMOALD bolt + wordmark on a clean white rounded
card, so the logo always sits on the brand's white background on GitHub
(GitHub strips CSS backgrounds, and transparent PNGs otherwise follow the
viewer's light/dark theme). Run from repo root: python scripts/make_readme_banner.py
"""
from PIL import Image, ImageDraw
from pathlib import Path

ASSETS = Path(__file__).resolve().parent.parent / "assets"


def resize_h(img: Image.Image, h: int) -> Image.Image:
    w = round(img.width * h / img.height)
    return img.resize((w, h), Image.LANCZOS)


def main():
    bolt = resize_h(Image.open(ASSETS / "smoald-bolt.png").convert("RGBA"), 150)
    word = resize_h(Image.open(ASSETS / "smoald-wordmark.png").convert("RGBA"), 60)

    pad_x, pad_y, gap, radius = 90, 54, 26, 30
    content_w = max(bolt.width, word.width)
    W = content_w + pad_x * 2
    H = pad_y * 2 + bolt.height + gap + word.height

    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)
    # white card with a faint edge so it still reads on a white (light-mode) page
    d.rounded_rectangle([0, 0, W - 1, H - 1], radius=radius, fill=(255, 255, 255, 255))
    d.rounded_rectangle([0, 0, W - 1, H - 1], radius=radius, outline=(26, 18, 11, 28), width=2)

    canvas.alpha_composite(bolt, ((W - bolt.width) // 2, pad_y))
    canvas.alpha_composite(word, ((W - word.width) // 2, pad_y + bolt.height + gap))

    out = ASSETS / "smoald-readme-banner.png"
    canvas.save(out)
    print(f"banner -> {canvas.size} at {out}")


if __name__ == "__main__":
    main()
