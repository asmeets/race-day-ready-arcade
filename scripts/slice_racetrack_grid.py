from __future__ import annotations

import argparse
import json
from pathlib import Path

try:
    from PIL import Image
except ImportError as exc:
    raise SystemExit(
        "This slicer requires Pillow. Install it with: python3 -m pip install Pillow"
    ) from exc


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = REPO_ROOT / "assets" / "tilemap" / "racetrack-grid.png"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "assets" / "tilemap" / "racetrack-slices"
WHITE_THRESHOLD = 245
ALPHA_THRESHOLD = 200
GRID_SPAN_RATIO = 0.6


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Detect full-span white grid lines in racetrack-grid.png and export the interior of "
            "each grid cell as an individual PNG."
        )
    )
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    return parser.parse_args()


def is_grid_white(pixel: tuple[int, int, int, int]) -> bool:
    red, green, blue, alpha = pixel
    return (
        alpha >= ALPHA_THRESHOLD
        and red >= WHITE_THRESHOLD
        and green >= WHITE_THRESHOLD
        and blue >= WHITE_THRESHOLD
    )


def group_consecutive(indices: list[int]) -> list[tuple[int, int]]:
    if not indices:
        return []

    groups: list[tuple[int, int]] = []
    start = indices[0]
    previous = indices[0]

    for current in indices[1:]:
        if current == previous + 1:
            previous = current
            continue

        groups.append((start, previous))
        start = current
        previous = current

    groups.append((start, previous))
    return groups


def find_vertical_bands(image: Image.Image) -> list[tuple[int, int]]:
    pixels = image.load()
    minimum_white_pixels = int(image.height * GRID_SPAN_RATIO)
    indices: list[int] = []

    for x in range(image.width):
        white_pixels = 0
        for y in range(image.height):
            if is_grid_white(pixels[x, y]):
                white_pixels += 1

        if white_pixels >= minimum_white_pixels:
            indices.append(x)

    return group_consecutive(indices)


def find_horizontal_bands(image: Image.Image) -> list[tuple[int, int]]:
    pixels = image.load()
    minimum_white_pixels = int(image.width * GRID_SPAN_RATIO)
    indices: list[int] = []

    for y in range(image.height):
        white_pixels = 0
        for x in range(image.width):
            if is_grid_white(pixels[x, y]):
                white_pixels += 1

        if white_pixels >= minimum_white_pixels:
            indices.append(y)

    return group_consecutive(indices)


def crop_tiles(
    image: Image.Image,
    vertical_bands: list[tuple[int, int]],
    horizontal_bands: list[tuple[int, int]],
    output_dir: Path,
) -> dict:
    output_dir.mkdir(parents=True, exist_ok=True)

    tiles: list[dict] = []
    tile_index = 1

    for row_index in range(len(horizontal_bands) - 1):
        top_band = horizontal_bands[row_index]
        bottom_band = horizontal_bands[row_index + 1]
        top = top_band[1] + 1
        bottom = bottom_band[0]

        for column_index in range(len(vertical_bands) - 1):
            left_band = vertical_bands[column_index]
            right_band = vertical_bands[column_index + 1]
            left = left_band[1] + 1
            right = right_band[0]

            file_name = f"racetrack-tile-{tile_index}.png"
            crop_box = (left, top, right, bottom)
            tile = image.crop(crop_box)
            tile.save(output_dir / file_name)

            tiles.append(
                {
                    "index": tile_index,
                    "row": row_index + 1,
                    "column": column_index + 1,
                    "cropBox": [left, top, right, bottom],
                    "file": file_name,
                }
            )
            tile_index += 1

    return {
        "columns": len(vertical_bands) - 1,
        "rows": len(horizontal_bands) - 1,
        "tileCount": len(tiles),
        "tiles": tiles,
    }


def main() -> None:
    args = parse_args()
    image = Image.open(args.source).convert("RGBA")

    vertical_bands = find_vertical_bands(image)
    horizontal_bands = find_horizontal_bands(image)

    if len(vertical_bands) < 2 or len(horizontal_bands) < 2:
        raise RuntimeError(
            "Could not detect enough white grid lines to slice the racetrack image."
        )

    result = crop_tiles(image, vertical_bands, horizontal_bands, args.output_dir)
    manifest = {
        "source": str(args.source),
        "outputDir": str(args.output_dir),
        "imageSize": {"width": image.width, "height": image.height},
        "verticalBands": [list(band) for band in vertical_bands],
        "horizontalBands": [list(band) for band in horizontal_bands],
        "cropLogic": "Each tile is cropped from one pixel after the end of a detected white grid band to the start of the next detected white grid band.",
        **result,
    }

    manifest_path = args.output_dir / "racetrack-slices-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()