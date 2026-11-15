import json
import re
from pathlib import Path
from PIL import Image, ImageFile, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "Product"
OUTPUT = ROOT / "assets" / "images" / "products"
SUPPORTED = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"}
ImageFile.LOAD_TRUNCATED_IMAGES = True


def slug(value):
    return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", value.lower().strip()))


def image_files(folder):
    if not folder.exists():
        return []
    return sorted(
        [item for item in folder.iterdir() if item.is_file() and item.suffix.lower() in SUPPORTED],
        key=lambda item: item.name.casefold(),
    )


def convert(source, destination):
    try:
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image)
            image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            if image.mode not in ("RGB", "RGBA"):
                image = image.convert("RGB")
            image.save(destination, "WEBP", quality=82, method=5)
        return True
    except (OSError, ValueError) as error:
        print(f"Skipped unreadable image: {source.name} ({error})")
        return False


OUTPUT.mkdir(parents=True, exist_ok=True)
manifest = {}

for product in sorted((item for item in SOURCE.iterdir() if item.is_dir()), key=lambda item: item.name):
    main_files = image_files(product / "main product images")
    extra_files = image_files(product / "extra product images")
    if not main_files and not extra_files:
        continue
    product_slug = slug(product.name)
    destination = OUTPUT / product_slug
    destination.mkdir(parents=True, exist_ok=True)
    main_paths = []
    gallery_paths = []
    for index, source in enumerate(main_files, start=1):
        filename = f"main-{index:02d}.webp"
        if convert(source, destination / filename):
            main_paths.append(f"assets/images/products/{product_slug}/{filename}")
    for index, source in enumerate(extra_files, start=1):
        filename = f"gallery-{index:02d}.webp"
        if convert(source, destination / filename):
            gallery_paths.append(f"assets/images/products/{product_slug}/{filename}")
    manifest[product.name] = {"main": main_paths, "gallery": main_paths + gallery_paths}

(OUTPUT / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(f"Processed {len(manifest)} product folders.")
