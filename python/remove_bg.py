import sys
from rembg import remove
from PIL import Image
import io

def remove_bg(src_img_path, out_img_path):
    with open(src_img_path, "rb") as f:
        input_bytes = f.read()

    # Configure rembg with alpha matting options via Session
    result = remove(
        input_bytes,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10,
        alpha_matting_base_size=1000
    )

    # Convert result to image and save as PNG
    image = Image.open(io.BytesIO(result)).convert("RGBA")
    image.save(out_img_path)

if __name__ == "__main__":
    src_path = sys.argv[1]
    out_path = sys.argv[2]
    remove_bg(src_path, out_path)
