"""
Convert .icns files from Downloads to PNG icons for the portfolio dock.
Usage: python convert-icns.py

Looks for .icns files in ~/Downloads and converts them to PNG in public/icons/
"""

import os
import glob
from PIL import Image

downloads = os.path.expanduser("~/Downloads")
output_dir = os.path.join(os.path.dirname(__file__), "..", "public", "icons")

# Map of search terms to output filenames
icon_map = {
    "mail": "mail.png",
    "photos": "photos.png",
    "github": "github.png",
    "linkedin": "linkedin.png",
}

# Find all .icns files in Downloads
icns_files = glob.glob(os.path.join(downloads, "*.icns"))

if not icns_files:
    print(f"No .icns files found in {downloads}")
    print("Download icons from macosicons.com first!")
    exit(1)

print(f"Found {len(icns_files)} .icns files in Downloads:")
for f in icns_files:
    print(f"  - {os.path.basename(f)}")

for icns_path in icns_files:
    name = os.path.basename(icns_path).lower().replace(".icns", "")

    # Try to match to an icon name
    output_name = None
    for key, val in icon_map.items():
        if key in name:
            output_name = val
            break

    if not output_name:
        print(f"\nSkipping {os.path.basename(icns_path)} (no match)")
        continue

    try:
        img = Image.open(icns_path)
        # Get the largest size available
        sizes = img.info.get("sizes", [])
        if sizes:
            img.size = max(sizes)

        # Convert to RGBA PNG
        img = img.convert("RGBA")

        # Resize to 512x512 for consistency
        img = img.resize((512, 512), Image.Resampling.LANCZOS)

        output_path = os.path.join(output_dir, output_name)
        img.save(output_path, "PNG")
        print(f"\n✓ {os.path.basename(icns_path)} → {output_name} ({img.size[0]}x{img.size[1]})")
    except Exception as e:
        print(f"\n✗ Error converting {os.path.basename(icns_path)}: {e}")

print("\nDone!")
