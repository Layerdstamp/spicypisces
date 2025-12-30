#!/usr/bin/env python3
import os
import json

# Directory containing photos
photos_dir = 'photos'

# Supported formats
supported_formats = ['jpg', 'jpeg', 'png', 'heic', 'webp']

# Categories
categories = ['cute', 'fancy', 'spicy']

config = {
    'galleries': {}
}

for category in categories:
    category_path = os.path.join(photos_dir, category)
    if os.path.exists(category_path):
        images = []
        for file in os.listdir(category_path):
            if file.lower().endswith(tuple('.' + fmt for fmt in supported_formats)):
                images.append(file)
        # Sort images, put cover first if exists
        images.sort()
        if 'cover.jpg' in images:
            images.remove('cover.jpg')
            images.insert(0, 'cover.jpg')
        config['galleries'][category] = {
            'path': f'{photos_dir}/{category}/',
            'images': images
        }

# Write to config.js
with open('assets/config.js', 'w') as f:
    f.write('// Configuration file for Spicy Pisces gallery\n\n')
    f.write('const config = ')
    json.dump(config, f, indent=4)
    f.write(';\n')

print("Config updated with image lists.")