"""
Prep the SMOALD brand assets for the website.

For each source image: make the near-white background transparent (with a
soft edge so it looks clean on white *and* cream sections), crop tight to the
artwork, and save into /assets. Also builds favicons from the lightning bolt.

Run from the repo root:  python scripts/process_logos.py
"""
from PIL import Image
from pathlib import Path

DOWNLOADS = Path.home() / "Downloads"
ASSETS = Path(__file__).resolve().parent.parent / "assets"

WORDMARK_SRC = DOWNLOADS / "ChatGPT Image Jun 23, 2026, 10_09_32 AM.png"
BOLT_SRC = DOWNLOADS / "ChatGPT Image Jun 23, 2026, 12_48_12 PM.png"

# White-knockout thresholds (on the minimum RGB channel):
#  >= HARD  -> fully transparent
#  <= SOFT  -> fully opaque
#  between  -> linear ramp (anti-aliased edge)
HARD, SOFT = 244, 216


def knockout_white(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            m = min(r, g, b)
            if m >= HARD:
                na = 0
            elif m <= SOFT:
                na = 255
            else:
                na = int(round((HARD - m) / (HARD - SOFT) * 255))
            if na < a:
                px[x, y] = (r, g, b, na)
    return img


def crop_to_content(img: Image.Image, pad_ratio: float = 0.04) -> Image.Image:
    bbox = img.getbbox()  # bbox of non-zero (non-transparent) region
    if not bbox:
        return img
    img = img.crop(bbox)
    # add a little breathing room proportional to the larger side
    pad = int(round(max(img.size) * pad_ratio))
    if pad:
        canvas = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2), (0, 0, 0, 0))
        canvas.paste(img, (pad, pad), img)
        img = canvas
    return img


def square(img: Image.Image) -> Image.Image:
    side = max(img.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(img, ((side - img.width) // 2, (side - img.height) // 2), img)
    return canvas


def main():
    ASSETS.mkdir(exist_ok=True)

    # --- wordmark ---
    wm = crop_to_content(knockout_white(Image.open(WORDMARK_SRC)))
    wm.save(ASSETS / "smoald-wordmark.png")
    print(f"wordmark -> {wm.size}")

    # --- lightning bolt ---
    bolt = crop_to_content(knockout_white(Image.open(BOLT_SRC)))
    bolt.save(ASSETS / "smoald-bolt.png")
    print(f"bolt -> {bolt.size}")

    # --- favicons from the bolt ---
    sq = square(bolt)
    sq.resize((180, 180), Image.LANCZOS).save(ASSETS / "apple-touch-icon.png")
    sq.resize((32, 32), Image.LANCZOS).save(ASSETS / "favicon-32.png")
    sq.save(ASSETS / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("favicons -> apple-touch-icon.png, favicon-32.png, favicon.ico")


if __name__ == "__main__":
    main()
