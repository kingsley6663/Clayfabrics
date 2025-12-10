// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form validation and submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const submitButton = this.querySelector('button[type="submit"]');

    if (name && email && message) {
        // --- Use EmailJS to send the email ---
        const serviceID = 'PASTE_YOUR_SERVICE_ID_HERE'; // Replace with your EmailJS Service ID
        const templateID = 'PASTE_YOUR_TEMPLATE_ID_HERE'; // Replace with your EmailJS Template ID
        const publicKey = 'PASTE_YOUR_PUBLIC_KEY_HERE'; // Replace with your EmailJS Public Key

        const templateParams = {
            name: name,
            email: email,
            message: message
        };

        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then((response) => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            }, (error) => {
                alert('Failed to send message. Please try again later.');
                console.error('EmailJS Error:', error);
            }).finally(() => {
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            });
    } else {
        alert('Please fill in all fields.');
    }
});

// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Auto slideshow
setInterval(function() {
    plusSlides(1);
}, 5000);

// Product gallery hover effects
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Scroll animations
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.about, .products, .contact');
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        
        if (position < screenHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.about, .products, .contact');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Advanced feature: Search functionality
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product-item');
    
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Add search input to the header
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const searchDiv = document.createElement('div');
    searchDiv.innerHTML = '<input type="text" id="search-input" placeholder="Search products..." onkeyup="searchProducts()">';
    nav.appendChild(searchDiv);
});

// Advanced feature: Shopping cart
let cart = [];

function addToCart(productName, price, image) {
    const parsedPrice = parseFloat(price.replace('$', ''));
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: parsedPrice, image: image, quantity: 1 });
    }
    updateCartDisplay();
    alert(`${productName} added to cart!`);
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }

    const cartTotal = document.getElementById('cart-total');
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Add cart button to header
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const cartLi = document.createElement('li');
        cartLi.innerHTML = '<button id="cart-button">Cart (<span id="cart-count">0</span>) - $<span id="cart-total">0.00</span></button>';
        navLinks.appendChild(cartLi);

        document.getElementById('cart-button').addEventListener('click', function() {
            const modal = document.getElementById('cart-modal');
            if (modal) {
                modal.style.display = 'block';
                updateCartModal();
            }
        });
    }
});

// Cart modal functionality
function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            cartItems.appendChild(itemDiv);
        });
    }

    const totalProductsAvailable = document.getElementById('total-products-available');
    if (totalProductsAvailable) {
        totalProductsAvailable.textContent = products.length;
    }

    const cartTotalProducts = document.getElementById('cart-total-products');
    if (cartTotalProducts) {
        cartTotalProducts.textContent = cart.length;
    }

    const cartTotalItems = document.getElementById('cart-total-items');
    if (cartTotalItems) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalItems.textContent = totalItems;
    }
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCartDisplay();
    updateCartModal();
}

// Login functionality
let isLoggedIn = false;
let isAdmin = false;

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById('login-modal');
            if (modal) {
                modal.style.display = 'block';
            }
        });
    }

    const loginSubmit = document.getElementById('login-submit');
    if (loginSubmit) {
        loginSubmit.addEventListener('click', function() {
            const password = document.getElementById('password').value;

            // Simple authentication with password "KING" for admin access
            if (password === 'KING') {
                isLoggedIn = true;
                isAdmin = true;
                alert('Admin access granted!');
                window.location.href = 'admin.html';
            } else {
                alert('Invalid password! Access denied.');
            }

            const modal = document.getElementById('login-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Close modals
    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.cart-modal') || this.closest('.login-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Admin functionality
    const addProductBtn = document.getElementById('add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', addProduct);
    }

    // Image preview functionality
    const imageInput = document.getElementById('product-image');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('image-preview');
                    preview.innerHTML = `<img src="${e.target.result}" alt="Image Preview">`;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Load products from localStorage if available
document.addEventListener('DOMContentLoaded', function() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products.length = 0;
        products.push(...JSON.parse(storedProducts));
    }
});

// Admin product list
function loadAdminProducts() {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'product-list-item';
            itemDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)}</p>
                </div>
                <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
            `;
            productList.appendChild(itemDiv);
        });
    }
}

function editProduct(index) {
    const product = products[index];
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-image').value = product.image;
    // Change button to update
    const btn = document.getElementById('add-product-btn');
    btn.textContent = 'Update Product';
    btn.onclick = function() {
        updateProduct(index);
    };
}

function clearProductForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-image').value = '';
    document.getElementById('image-preview').style.display = 'none';
}

function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const imageInput = document.getElementById('product-image');

    if (name && price && imageInput.files[0]) {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageData = e.target.result;
            const newProduct = { name, price, image: imageData };
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            alert('Product added!');
            loadProducts();
            loadAdminProducts();
            clearProductForm();
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please fill all fields!');
    }
}

function updateProduct(index) {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value;

    if (name && price && image) {
        products[index] = { name, price, image };
        localStorage.setItem('products', JSON.stringify(products));
        alert('Product updated!');
        loadProducts();
        loadAdminProducts();
        // Reset button
        const btn = document.getElementById('add-product-btn');
        btn.textContent = 'Add Product';
        btn.onclick = addProduct;
        clearProductForm();
    } else {
        alert('Please fill all fields!');
    }
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
        loadAdminProducts();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadAdminProducts();
});

// Initialize products from localStorage or default products
let products = JSON.parse(localStorage.getItem('products')) || [
    { name: 'Elegant Dress', price: 99.99, image: 'images/image1.png' },
    { name: 'Stylish Jacket', price: 149.99, image: 'images/image2.png' },
    { name: 'Trendy Accessories', price: 29.99, image: 'images/product3.jpg' },
    { name: 'Casual Blouse', price: 59.99, image: 'images/product4.jpg' },
    { name: 'Designer Skirt', price: 79.99, image: 'images/product5.jpg' },
    { name: 'Luxury Handbag', price: 199.99, image: 'images/product6.jpg' },
    { name: 'Silk Scarf', price: 39.99, image: 'images/product7.jpg' },
    { name: 'Leather Boots', price: 129.99, image: 'images/product8.jpg' },
    { name: 'Summer Hat', price: 24.99, image: 'images/product9.jpg' },
    { name: 'Evening Gown', price: 299.99, image: 'images/product10.jpg' },
    { name: 'Cotton T-Shirt', price: 19.99, image: 'images/product11.jpg' },
    { name: 'Denim Jeans', price: 89.99, image: 'images/product12.jpg' },
    { name: 'Wool Sweater', price: 119.99, image: 'images/product13.jpg' },
    { name: 'Sporty Sneakers', price: 79.99, image: 'images/product14.jpg' },
    { name: 'Bikini Set', price: 49.99, image: 'images/product15.jpg' },
    { name: 'Formal Suit', price: 249.99, image: 'images/product16.jpg' },
    { name: 'Casual Shorts', price: 34.99, image: 'images/product17.jpg' },
    { name: 'Winter Coat', price: 179.99, image: 'images/product18.jpg' },
    { name: 'Sunglasses', price: 69.99, image: 'images/product19.jpg' },
    { name: 'Belt', price: 29.99, image: 'images/product20.jpg' },
    { name: 'Necklace', price: 89.99, image: 'images/product21.jpg' },
    { name: 'Earrings', price: 39.99, image: 'images/product22.jpg' },
    { name: 'Bracelet', price: 49.99, image: 'images/product23.jpg' },
    { name: 'Ring', price: 59.99, image: 'images/product24.jpg' },
];

// Load products into gallery
function loadProducts() {
    const gallery = document.getElementById('product-gallery');
    if (gallery) {
        gallery.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn">Add to Cart</button>
            `;
            gallery.appendChild(productItem);
        });
        addCartButtonListeners();
    }
}

// Add event listeners to "Add to Cart" buttons
function addCartButtonListeners() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.parentElement;
            const name = productItem.querySelector('h3').textContent;
            const price = productItem.querySelector('p').textContent;
            const image = productItem.querySelector('img').src;
            addToCart(name, price, image);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    addCartButtonListeners();
});

// Mobile navigation toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Invoice generation
function generateInvoice() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    let invoiceHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
            <h1 style="text-align: center; color: #333;">Clayfabrics Invoice</h1>
            <p style="text-align: center;">Date: ${new Date().toLocaleDateString()}</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background-color: #f5f5f5;">
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Quantity</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Price</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Total</th>
                    </tr>
                </thead>
                <tbody>
    `;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        invoiceHTML += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${item.price.toFixed(2)}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    invoiceHTML += `
                </tbody>
                <tfoot>
                    <tr style="background-color: #f9f9f9;">
                        <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">Total Items: ${totalItems}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">$${total.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
            <p style="text-align: center; margin-top: 20px;">Thank you for shopping with Clayfabrics!</p>
        </div>
    `;

    // Create a new window for the invoice
    const invoiceWindow = window.open('', '_blank');
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();

    // Clear the cart after generating invoice
    cart = [];
    updateCartDisplay();
    updateCartModal();

    alert('Invoice generated! Your cart has been cleared.');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    if (!nav.contains(event.target)) {
        navLinks.classList.remove('show');
    }
});
