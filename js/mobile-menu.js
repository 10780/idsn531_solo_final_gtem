/**
 * Mobile Menu Enhancement
 * Handles dropdown interactions on touch devices
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only apply on mobile/tablet devices (below 768px)
    if (window.innerWidth < 768) {
        initMobileMenu();
    }
    
    // Re-initialize on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth < 768) {
                initMobileMenu();
            }
        }, 250);
    });
});

function initMobileMenu() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    if (dropdown && dropdownToggle) {
        // Remove any existing click listeners
        const newDropdownToggle = dropdownToggle.cloneNode(true);
        dropdownToggle.parentNode.replaceChild(newDropdownToggle, dropdownToggle);
        
        // Add click event for mobile
        newDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
}
