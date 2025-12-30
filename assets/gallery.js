// Gallery management script for Spicy Pisces
// Supports: jpg, png, heic formats

function loadGallery(category) {
    const galleryContainer = document.getElementById('gallery');
    
    if (!galleryContainer) return;

    // Get the path for this category from config
    const categoryConfig = config.galleries[category];
    if (!categoryConfig) {
        console.error('Category not found:', category);
        return;
    }

    // Get the list of images for this category
    const images = categoryConfig.images || [];

    // Clear existing gallery
    galleryContainer.innerHTML = '';

    let imageCount = 0;

    // Load each image
    images.forEach((imageName) => {
        const imagePath = categoryConfig.path + encodeURIComponent(imageName);
        
        // Create image figure element
        const figure = document.createElement('figure');
        figure.className = 'photo-item';

        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `${category} photo`;
        img.loading = 'lazy';
        img.decoding = 'async';
        
        // If image loads successfully, add it to gallery
        img.onload = function() {
            figure.appendChild(img);
            galleryContainer.appendChild(figure);
            imageCount++;
        };
        
        // If image fails to load, do nothing (skip it)
        img.onerror = function() {
            // Optionally log error
            console.warn(`Failed to load image: ${imagePath}`);
        };
    });

    // Log loading complete
    setTimeout(function() {
        if (imageCount === 0) {
            console.log(`No images found in ${category} folder.`);
        } else {
            console.log(`Loaded ${imageCount} images in ${category} gallery`);
        }
    }, 2000);
}
