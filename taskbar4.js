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

    // Function to check if device is mobile (below 768px)
    function isMobile() {
        return window.innerWidth < 768;
    }

    // Show/hide mobile toggle button based on screen size
    function toggleMobileButton() {
        if (isMobile()) {
            mobileToggle.style.display = 'block';
        } else {
            mobileToggle.style.display = 'none';
            // Close navigation if it's open when resizing to desktop
            navigation.classList.remove('active');
            mobileOverlay.classList.remove('active');
            mobileToggle.innerHTML = '☰';
        }
    }

    // Toggle mobile navigation overlay
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

    // Close navigation when clicking overlay background
    mobileOverlay.addEventListener('click', function() {
        navigation.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileToggle.innerHTML = '☰';
    });

    // Enhanced mobile dropdown functionality
    function setupMobileDropdowns() {
        if (isMobile()) {
            // Remove existing event listeners to avoid duplicates
            document.querySelectorAll('.category h6').forEach(function(header) {
                header.replaceWith(header.cloneNode(true));
            });
            
            // Add event listeners to category headers
            document.querySelectorAll('.category h6').forEach(function(header) {
                header.addEventListener('click', function() {
                    const subcategory = this.nextElementSibling;
                    
                    // Check if subcategory exists and is one of the valid subcategory classes
                    if (subcategory && (
                        subcategory.classList.contains('subcategory1') || 
                        subcategory.classList.contains('subcategory2') || 
                        subcategory.classList.contains('subcategory3') || 
                        subcategory.classList.contains('subcategory4') || 
                        subcategory.classList.contains('subcategory5')
                    )) {
                        
                        const isVisible = subcategory.style.display === 'block';
                        
                        // Close all other subcategories
                        document.querySelectorAll('.subcategory1, .subcategory2, .subcategory3, .subcategory4, .subcategory5').forEach(function(sub) {
                            sub.style.display = 'none';
                        });
                        
                        // Toggle current subcategory
                        subcategory.style.display = isVisible ? 'none' : 'block';
                    }
                });
            });

            // Add event listeners to subcategory links
            document.querySelectorAll('.subcategory1 a, .subcategory2 a, .subcategory3 a, .subcategory4 a, .subcategory5 a').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    // Allow default link behavior to navigate to products.html
                    // The href already contains the correct path with filter parameters
                    
                    // Optional: Close the mobile navigation after clicking
                    navigation.classList.remove('');
                    mobileOverlay.classList.remove('');
                    mobileToggle.innerHTML = '';
                });
            });

            // Initially hide all subcategories
            document.querySelectorAll('.subcategory1, .subcategory2, .subcategory3, .subcategory4, .subcategory5').forEach(function(sub) {
                sub.style.display = 'block';
            });
        } else {
            // For desktop, show all subcategories
            document.querySelectorAll('.subcategory1, .subcategory2, .subcategory3, .subcategory4, .subcategory5').forEach(function(sub) {
                sub.style.display = '';
            });
        }
    }

    // Initialize mobile functionality
    toggleMobileButton();
    setupMobileDropdowns();

    // Handle window resize
    window.addEventListener('resize', function() {
        toggleMobileButton();
        setupMobileDropdowns();
    });
});