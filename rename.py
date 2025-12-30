#!/usr/bin/env python3
import os
import shutil

# Directories
photos_dir = 'photos'
categories = ['cute', 'fancy', 'spicy']

# Collect all non-cover images
all_images = []
for category in categories:
    category_path = os.path.join(photos_dir, category)
    if os.path.exists(category_path):
        for file in os.listdir(category_path):
            if file.lower() != 'cover.jpg' and file.lower().endswith(('.jpg', '.jpeg', '.png', '.heic', '.webp')):
                all_images.append((category, file))

# Sort by category order, then by filename
category_order = {cat: i for i, cat in enumerate(categories)}
all_images.sort(key=lambda x: (category_order[x[0]], x[1]))

# Rename to 1.jpg, 2.jpg, etc.
counter = 1
for category, old_name in all_images:
    old_path = os.path.join(photos_dir, category, old_name)
    new_name = f"{counter}.jpg"
    new_path = os.path.join(photos_dir, category, new_name)
    shutil.move(old_path, new_path)
    print(f"Renamed {old_path} to {new_path}")
    counter += 1

print(f"Renamed {len(all_images)} images.")