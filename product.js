// product-filter.js

document.addEventListener("DOMContentLoaded", function () {
    // Cart functionality
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        document.querySelector(".cart-count").textContent = cart.length;
    }

    // Initialize cart count
    updateCartCount();

    // Add to cart functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const productCard = this.closest(".product-card");
            const productInfo = {
                name: productCard.querySelector("h3").textContent,
                price: productCard.querySelector(".product-price").textContent,
                category: productCard.dataset.category,
                image: productCard.querySelector("img").src
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(productInfo);
            localStorage.setItem("cart", JSON.stringify(cart));
            
            updateCartCount();
            alert("Product added to cart!");
        });
    });

    // URL Parameter Filter Functionality
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get("filter");

    if (filter) {
        const products = document.querySelectorAll(".product-card");
        const categoryMap = {
            "raw": "Raw",
            "white": "White",
            "premium": "Premium"
        };

        // Normalize filter value
        const normalizedFilter = filter.toLowerCase();
        const targetCategory = categoryMap[normalizedFilter];

        if (targetCategory) {
            products.forEach(product => {
                const productCategory = product.dataset.category.toLowerCase();
                product.style.display = productCategory === normalizedFilter ? "block" : "none";
            });

            // Update page title with filter
            document.title = `${targetCategory} Products - EasyHome`;
        }
    }

    // Preserve filter in navigation
    const productLinks = document.querySelectorAll("a[href^='products.html']");
    productLinks.forEach(link => {
        const currentUrl = new URL(link.href);
        if (filter) {
            currentUrl.searchParams.set("filter", filter);
            link.href = currentUrl.toString();
        }
    });
});