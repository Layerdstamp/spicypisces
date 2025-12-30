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

    // Image filenames to try loading
    // Supports multiple formats and numbering
    const imageNames = [
        'cover', '001', '002', '003', '004', '005', 
        '006', '007', '008', '009', '010',
        '011', '012', '013', '014', '015',
        '016', '017', '018', '019', '020'
    ];

    const supportedFormats = ['jpg', 'jpeg', 'png', 'heic', 'webp'];

    // Clear existing gallery
    galleryContainer.innerHTML = '';

    let imageCount = 0;

    // Try to load each image with fallback formats
    imageNames.forEach((imageName) => {
        let formatIndex = 0;

        function tryNextFormat() {
            if (formatIndex >= supportedFormats.length) {
                // No more formats to try for this image
                return;
            }

            const format = supportedFormats[formatIndex];
            const imagePath = categoryConfig.path + imageName + '.' + format;
            
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
            
            // If image fails to load, try next format
            img.onerror = function() {
                formatIndex++;
                tryNextFormat();
            };

            // Start loading
            img.src = imagePath;
        }

        tryNextFormat();
    });

    // Log loading complete
    setTimeout(function() {
        if (imageCount === 0) {
            console.log(`No images found in ${category} folder. Upload images as: ${imageName}.jpg, ${imageName}.png, or ${imageName}.heic`);
        } else {
            console.log(`Loaded ${imageCount} images in ${category} gallery`);
        }
    }, 2000);
}
