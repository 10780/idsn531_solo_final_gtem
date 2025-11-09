/**
 * Custom Image Lightbox
 * Opens gallery images in a larger modal view when clicked
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeLightbox();
});

function initializeLightbox() {
    // Create lightbox modal structure
    const lightbox = document.createElement('div');
    lightbox.id = 'image-lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img" alt="Enlarged view">
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);

    // Get all gallery images
    const galleryImages = document.querySelectorAll('.project-gallery-pic');
    
    // Add click event to each image
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openLightbox(this);
        });
    });

    // Close lightbox when clicking the X
    const closeBtn = document.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Add touch swipe to close on mobile
    let touchStartY = 0;
    lightbox.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    lightbox.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const swipeDistance = touchEndY - touchStartY;
        
        // Close if swiped down more than 100px
        if (swipeDistance > 100) {
            closeLightbox();
        }
    });
}

function openLightbox(imgElement) {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.querySelector('.lightbox-caption');
    
    lightbox.style.display = 'block';
    lightboxImg.src = imgElement.src;
    caption.textContent = imgElement.alt;
    
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10);
}

function closeLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    
    lightbox.classList.remove('show');
    
    // Wait for fade-out animation before hiding
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}
