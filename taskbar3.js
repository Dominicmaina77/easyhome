document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle functionality
    const mobileToggle = document.getElementById('mobileToggle');
    const navigation = document.getElementById('navigation');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Check if elements exist
    if (!mobileToggle || !navigation || !mobileOverlay) {
        console.error('Required mobile navigation elements not found');
        return;
    }

    // Toggle mobile navigation
    mobileToggle.addEventListener('click', function() {
        navigation.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        
        // Change icon based on state
        if (navigation.classList.contains('active')) {
            mobileToggle.innerHTML = '✕';
        } else {
            mobileToggle.innerHTML = '☰';
        }
    });

    // Close navigation when clicking overlay
    // mobileOverlay.addEventListener('click', function() {
    //     navigation.classList.remove('active');
    //     mobileOverlay.classList.remove('active');
    //     mobileToggle.innerHTML = '☰';
    // });

    // Redirect to products page when clicking a link
    document.querySelectorAll('.category h6').forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Prevent default link behavior
            e.preventDefault();
            
            // Get the link text or href for potential use in products page
            const linkText = this.textContent.trim();
            const linkHref = this.getAttribute('href');
            
            // Redirect to products page
            // You can modify this URL to match your actual products page
            // You can also pass parameters if needed: products.html?category=${encodeURIComponent(linkText)}
            window.location.href = '/about.html';
            
            // Alternative: if you want to pass the category as a URL parameter
            // window.location.href = `products.html?category=${encodeURIComponent(linkText)}`;
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            navigation.classList.remove('active');
            mobileOverlay.classList.remove('active');
            mobileToggle.innerHTML = '☰';
        }
    });

    // Enhanced mobile dropdown functionality
    function setupMobileDropdowns() {
        if (window.innerWidth < 768) {
            document.querySelectorAll('.category h6').forEach(function(header) {
                // Remove existing event listeners to avoid duplicates
                header.replaceWith(header.cloneNode(true));
            });
            
            // Re-add event listeners
            document.querySelectorAll('.category h6').forEach(function(header) {
                header.addEventListener('click', function() {
                    // Check if this is the Products header
                    if (this.textContent.trim().toLowerCase() === 'products') {
                        const subcategory = this.nextElementSibling;
                        if (subcategory && (subcategory.classList.contains('subcategory1') || 
                            subcategory.classList.contains('subcategory2') || 
                            subcategory.classList.contains('subcategory3') || 
                            subcategory.classList.contains('subcategory4') || 
                            subcategory.classList.contains('subcategory5'))) {
                            
                            const isVisible = subcategory.style.display === 'flex';
                            
                            // Close all other subcategories
                            document.querySelectorAll('.subcategory1, .subcategory2, .subcategory3, .subcategory4, .subcategory5').forEach(function(sub) {
                                sub.style.display = 'none';
                            });
                            
                            // Toggle current subcategory
                            subcategory.style.display = isVisible ? 'none' : 'flex';
                        }
                    } else {
                        // For non-Products headers, redirect to another page
                        window.location.href = '/category.html?name=' + encodeURIComponent(this.textContent.trim());
                    }
                });
            });
        }
    }

    // Setup dropdowns on load
    setupMobileDropdowns();

    // Re-setup dropdowns on resize
    window.addEventListener('resize', setupMobileDropdowns);
});