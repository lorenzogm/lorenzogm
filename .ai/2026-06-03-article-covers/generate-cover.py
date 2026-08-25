#!/usr/bin/env python3
"""Generate blog cover images for the autonomous agentic development article.

Matches the existing cover style: 2400x1260 white canvas, bold centered title,
red accent line, red divider, gray tagline.

Usage:
    python3 generate-cover.py
"""

from PIL import Image, ImageDraw, ImageFont

W, H = 2400, 1260
BG = (255, 255, 255)
DARK = (26, 26, 26)
RED = (184, 53, 44)
GRAY = (90, 90, 90)
GRAY_LIGHT = (140, 140, 140)

BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"

OUT_DIR = "/Users/lorenzogm/lorenzogm/lorenzogm/apps/lorenzogm/public"

CONTENT = {
    "en": {
        "title": ["The Autonomous Agentic", "Development Life Cycle"],
        "accent": "with GitHub Actions",
        "tagline1": "Issues become Epics. Epics become tickets.",
        "tagline2": "The backlog drives itself.",
        "file": "autonomous-agentic-development-with-github-actions-en.png",
    },
    "es": {
        "title": ["El Ciclo de Vida de Desarrollo", "Agéntico Autónomo"],
        "accent": "con GitHub Actions",
        "tagline1": "Las issues se vuelven Epics. Los Epics, tickets.",
        "tagline2": "El backlog se conduce a sí mismo.",
        "file": "autonomous-agentic-development-with-github-actions-es.png",
    },
}


def text_w(draw, text, font):
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0]


def draw_centered(draw, y, text, font, fill):
    w = text_w(draw, text, font)
    draw.text(((W - w) / 2, y), text, font=font, fill=fill)


def build(lang):
    c = CONTENT[lang]
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    title_font = ImageFont.truetype(BOLD, 150)
    accent_font = ImageFont.truetype(BOLD, 110)
    tag_font = ImageFont.truetype(REG, 62)
    tag_font2 = ImageFont.truetype(REG, 56)

    y = 330
    for line in c["title"]:
        draw_centered(draw, y, line, title_font, DARK)
        y += 175

    y += 30
    draw_centered(draw, y, c["accent"], accent_font, RED)
    y += 180

    # red divider
    div_w = 130
    draw.rectangle(
        [(W - div_w) / 2, y, (W + div_w) / 2, y + 10], fill=RED
    )
    y += 130

    draw_centered(draw, y, c["tagline1"], tag_font, GRAY)
    y += 95
    draw_centered(draw, y, c["tagline2"], tag_font2, GRAY_LIGHT)

    path = f"{OUT_DIR}/{c['file']}"
    img.save(path, "PNG")
    print(f"Saved {path}")


if __name__ == "__main__":
    for lang in ("en", "es"):
        build(lang)
