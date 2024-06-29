

import os
from urllib.parse import quote
from PIL import Image

RESIZE_FACTOR = 1.5

def is_image(name):
    exts = ["png", "jpeg", "jpg"]
    for ext in exts:
        if ext in name.lower():
            return True

    return False

def compress_image(image_path, output_path, quality=85):
    try:
        with Image.open(image_path) as img:
            w, h = img.size
            new_size = (int(w/RESIZE_FACTOR), int(h/RESIZE_FACTOR))
            img.resize(new_size)
            img.save(output_path, "webp",optimize=True,  quality=quality,)
    except Exception as e:
        print(f"Error compressing {image_path}: {e}")


for root, dirs, files in  os.walk("./content/posts", topdown=True):
    if "index.md" in files and "img" in dirs:
        file_changed = False
        with open(root + "/index.md") as md_file:
            content = md_file.read()
        with os.scandir(root + "/img") as img_dir_entries:
            for entry in img_dir_entries:
                if is_image(entry.name):
                    image_path = root + "/img/" + entry.name
                    output_path = root + "/img/" + entry.name.split(".")[0] + ".webp"
                    compress_image(
                            image_path,
                            output_path
                    )
                    ext = entry.name.split(".")[-1]
                    image_name = quote(entry.name)
                    new_image_name= image_name.replace(ext, "webp")
                    content = content.replace(image_name, new_image_name)
                    os.remove(image_path)
                    file_changed=True


        if file_changed:
            with open(root + "/index.md", "w") as f:
                f.write(content)




