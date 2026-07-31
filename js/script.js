/**
 * LUXURY BOX - JavaScript Fonksiyonlari
 */

// ============================================
// 1. KONFIGURASYON
// ============================================
const phoneNumber = '905439704241';

// ============================================
// 2. MANUEL ÜRÜN LİSTESİ - BURADAN EKLEYİN/SİLİN
// ============================================
const PRODUCTS = [
    // ANA SAYFA
    {
        id: 1,
        name: 'Loro Piana Summer Walk',
        brand: 'Loro Piana',
        price: 14900,
        image: 'css/foto/6.jpeg',
        category: 'anasayfa'
    },
    {
        id: 2,
        name: 'Chanel Classic Flap Bag',
        brand: 'Chanel',
        price: 45000,
        image: 'css/foto/6.jpeg',
        category: 'anasayfa'
    },
    {
        id: 3,
        name: "TOD'S Gommino Loafer",
        brand: "TOD'S",
        price: 10500,
        image: 'css/foto/2f91c24f-50ae-4b00-bfa9-7b83bc2660cc.jpeg',
        category: 'anasayfa'
    },
    {
        id: 4,
        name: 'Gucci GG Marmont',
        brand: 'Gucci',
        price: 32500,
        image: 'css/foto/7.jpeg',
        category: 'anasayfa'
    },
    {
        id: 5,
        name: 'Hermès Kelly Bag',
        brand: 'Hermès',
        price: 52000,
        image: 'css/foto/4.jpeg',
        category: 'anasayfa'
    },
    {
        id: 6,
        name: 'Prada Re-Edition',
        brand: 'Prada',
        price: 28900,
        image: 'css/foto/2f91c24f-50ae-4b00-bfa9-7b83bc2660cc.jpeg',
        category: 'anasayfa'
    },
    // AYAKKABILAR (Kadın)
    {
        id: 7,
        name: 'Christian Louboutin So Kate',
        brand: 'Christian Louboutin',
        price: 18900,
        image: 'css/foto/6.jpeg',
        category: 'ayakkabilar'
    },
    {
        id: 8,
        name: 'Jimmy Choo Romy 100',
        brand: 'Jimmy Choo',
        price: 15900,
        image: 'css/foto/7.jpeg',
        category: 'ayakkabilar'
    },
    {
        id: 9,
        name: 'Manolo Blahnik Hangisi',
        brand: 'Manolo Blahnik',
        price: 22000,
        image: 'css/foto/4.jpeg',
        category: 'ayakkabilar'
    },
    // GÖZLÜK & SAAT (Erkek)
    {
        id: 10,
        name: 'Rolex Daytona 116500LN',
        brand: 'Rolex',
        price: 85000,
        image: 'css/foto/6.jpeg',
        category: 'gozluk-saat'
    },
    {
        id: 11,
        name: 'Audemars Piguet Royal Oak',
        brand: 'Audemars Piguet',
        price: 92000,
        image: 'css/foto/7.jpeg',
        category: 'gozluk-saat'
    },
    {
        id: 12,
        name: 'Ray-Ban Clubmaster',
        brand: 'Ray-Ban',
        price: 4500,
        image: 'css/foto/4.jpeg',
        category: 'gozluk-saat'
    },
    // ÇANTALAR (Çocuk)
    {
        id: 13,
        name: 'Louis Vuitton Mini Backpack',
        brand: 'Louis Vuitton',
        price: 32000,
        image: 'css/foto/6.jpeg',
        category: 'cantalar'
    },
    {
        id: 14,
        name: 'Dior Saddle Bag Mini',
        brand: 'Dior',
        price: 28000,
        image: 'css/foto/7.jpeg',
        category: 'cantalar'
    },
];

// ============================================
// 3. FONKSİYONLAR
// ============================================

function getProducts() {
    return PRODUCTS;
}

function getProductsByCategory(category) {
    if (category === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
}

function getProductById(id) {
    return PRODUCTS.find(p => p.id === id);
}

// ============================================
// 4. SEPET FONKSİYONLARI
// ============================================

// Sepetteki ürünleri göster
function loadCartItems() {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return;
    
    const cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-bag" style="font-size: 3rem; color: #f4c2c2; margin-bottom: 20px; display: block;"></i>
                <p style="font-size: 1.2rem; font-weight: 300;">Sepetiniz boş.</p>
                <p style="color: #999; font-size: 0.9rem;">Lüks koleksiyonumuzu keşfedin!</p>
                <a href="index.html" class="btn btn-primary" style="margin-top: 20px; display: inline-block;">
                    <i class="fas fa-arrow-left"></i> Alışverişe Başla
                </a>
            </div>
        `;
        updateCartSummary(0);
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='css/foto/placeholder.jpeg'" />
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">${item.price.toLocaleString()} TL</p>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i> Kaldır
                </button>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    updateCartSummary(total);
}

// Sepet özetini güncelle
function updateCartSummary(total) {
    const totalElement = document.getElementById('cartTotal');
    const subtotalElement = document.getElementById('cartSubtotal');
    
    if (subtotalElement) {
        subtotalElement.textContent = total.toLocaleString() + ' TL';
    }
    
    if (totalElement) {
        totalElement.textContent = total.toLocaleString() + ' TL';
    }
    
    // Kargo bilgisini güncelle
    const shippingElement = document.querySelector('.summary-row span:last-child');
    if (shippingElement && total > 10000) {
        shippingElement.textContent = 'Ücretsiz';
    }
}

// Sepetteki ürün miktarını güncelle
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('luxuryCart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}

// Sepetten ürün kaldır
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    
    if (index >= 0 && index < cart.length) {
        const productName = cart[index].name;
        cart.splice(index, 1);
        localStorage.setItem('luxuryCart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
        showToast(productName + ' sepetten kaldırıldı.');
    }
}

// ============================================
// 5. SAYFA YUKLENDİĞİNDE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobil menü
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbarLinks = document.querySelector('.navbar-links');
    const dropdown = document.querySelector('.dropdown');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            navbarLinks.classList.toggle('active');
        });
    }

    const dropbtn = document.querySelector('.dropbtn');
    if (dropbtn) {
        dropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (dropdown) {
                dropdown.classList.toggle('open');
            }
        });
    }

    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarLinks) {
                navbarLinks.classList.remove('active');
            }
        });
    });

    updateCartCount();

    // FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.question');
        if (question) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');
                faqItems.forEach(faq => faq.classList.remove('open'));
                if (!isOpen) item.classList.add('open');
            });
        }
    });

    // Scroll to top
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Aktif link
    const navLinks = document.querySelectorAll('.navbar-links a');
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mesajiniz basariyla gonderildi!');
            this.reset();
        });
    }

    // Order form
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        const fullNameInput = document.getElementById('fullName');
        const phoneInput = document.getElementById('phone');
        const brandModelInput = document.getElementById('brandModel');
        const specialNoteInput = document.getElementById('specialNote');
        const nameError = document.getElementById('nameError');
        const phoneError = document.getElementById('phoneError');
        const brandError = document.getElementById('brandError');
        const submitBtn = document.getElementById('submitBtn');

        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            if (!fullNameInput.value.trim() || fullNameInput.value.trim().length < 2) {
                if (nameError) nameError.classList.add('visible');
                isValid = false;
            } else {
                if (nameError) nameError.classList.remove('visible');
            }

            if (!phoneInput.value.trim() || phoneInput.value.trim().length < 5) {
                if (phoneError) phoneError.classList.add('visible');
                isValid = false;
            } else {
                if (phoneError) phoneError.classList.remove('visible');
            }

            if (!brandModelInput.value.trim() || brandModelInput.value.trim().length < 2) {
                if (brandError) brandError.classList.add('visible');
                isValid = false;
            } else {
                if (brandError) brandError.classList.remove('visible');
            }

            if (!isValid) {
                if (submitBtn) {
                    submitBtn.style.animation = 'shake 0.4s ease';
                    setTimeout(() => { submitBtn.style.animation = ''; }, 500);
                }
                return;
            }

            const fullName = fullNameInput.value.trim();
            const phone = phoneInput.value.trim();
            const brandModel = brandModelInput.value.trim();
            const specialNote = specialNoteInput ? specialNoteInput.value.trim() || 'Belirtilmemis' : 'Belirtilmemis';

            const message = 
                'LUXURY BOX - OZEL SIPARIS\n' +
                '============================\n\n' +
                'Musteri: ' + fullName + '\n' +
                'Telefon: ' + phone + '\n' +
                'Marka / Model: ' + brandModel + '\n' +
                'Ozel Not: ' + specialNote + '\n\n' +
                'LUXURY BOX\n' +
                '@luxurybox.tm';

            const encodedMessage = encodeURIComponent(message);
            const url = 'https://wa.me/' + phoneNumber + '?text=' + encodedMessage;
            window.open(url, '_blank');

            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Gonderildi!';
            submitBtn.style.background = '#2ecc71';
            submitBtn.style.color = '#0a0a0a';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
            }, 3000);
        });

        if (fullNameInput) {
            fullNameInput.addEventListener('input', function() {
                if (this.value.trim().length >= 2 && nameError) {
                    nameError.classList.remove('visible');
                }
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                if (this.value.trim().length >= 5 && phoneError) {
                    phoneError.classList.remove('visible');
                }
            });
        }

        if (brandModelInput) {
            brandModelInput.addEventListener('input', function() {
                if (this.value.trim().length >= 2 && brandError) {
                    brandError.classList.remove('visible');
                }
            });
        }
    }

    // WhatsApp sipariş butonu
    const whatsappOrderBtn = document.getElementById('whatsapp-order-btn');
    if (whatsappOrderBtn) {
        whatsappOrderBtn.addEventListener('click', function() {
            sendCartToWhatsApp();
        });
    }

    // ===== SEPET SAYFASI KONTROL =====
    // Eğer sepet sayfasındaysak, sepeti göster
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'cart.html' || currentPage === 'sepet.html') {
        loadCartItems();
    }
    
    // Ürün sayfalarını yükle
    loadProductsByPage();
    setupAddToCartButtons();
});

// ============================================
// 6. SEPETE EKLE
// ============================================
function addToCart(e) {
    const button = e.target;
    const productId = parseInt(button.getAttribute('data-id'));
    const product = getProductById(productId);
    
    if (!product) {
        showToast('Ürün bulunamadı!');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('luxuryCart', JSON.stringify(cart));
    updateCartCount();
    
    showToast(product.name + ' sepete eklendi!');
}

// ============================================
// 7. SEPET SAYISINI GUNCELLE
// ============================================
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// ============================================
// 8. TOAST BILDIRIMI
// ============================================
function showToast(message) {
    const oldToast = document.querySelector('.toast-notification');
    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
            <i class="fas fa-check-circle" style="color:#f4c2c2; font-size:1.4rem;"></i>
            <span>${message}</span>
        </div>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #121212;
        color: #ffffff;
        padding: 16px 24px;
        border-radius: 16px;
        border: 1px solid rgba(244, 194, 194, 0.15);
        box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        max-width: 400px;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 400);
    }, 3000);
}

// ============================================
// 9. SEPETI WHATSAPP'A GONDER
// ============================================
function sendCartToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    
    if (cart.length === 0) {
        showToast('Sepetiniz bos!');
        return;
    }
    
    let message = 'LUXURY BOX - SIPARISIM\n';
    message += '============================\n\n';
    message += 'SIPARIS LISTEM:\n';
    
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += (index + 1) + '. ' + item.name + ' x' + item.quantity + ' = ' + itemTotal.toLocaleString() + ' TL\n';
    });
    
    message += '\nToplam: ' + total.toLocaleString() + ' TL\n\n';
    message += 'LUXURY BOX\n';
    message += 'Siparisimi onaylayin. Tesekkurler!';
    
    const encodedMessage = encodeURIComponent(message);
    const url = 'https://wa.me/' + phoneNumber + '?text=' + encodedMessage;
    window.open(url, '_blank');
}

// ============================================
// 10. WHATSAPP DOGRUDAN ILETISIM
// ============================================
function openWhatsApp(productName) {
    const message = 
        'LUXURY BOX - OZEL SIPARIS\n' +
        '============================\n\n' +
        'Urun: ' + productName + '\n' +
        'Bu urun hakkinda bilgi almak istiyorum.\n\n' +
        'LUXURY BOX\n' +
        '@luxurybox.tm';

    const encodedMessage = encodeURIComponent(message);
    const url = 'https://wa.me/' + phoneNumber + '?text=' + encodedMessage;
    window.open(url, '_blank');
}

// ============================================
// 11. SAYFAYA GÖRE ÜRÜN YÜKLE
// ============================================
function loadProductsByPage() {
    const currentPage = window.location.pathname.split('/').pop();
    let category = 'anasayfa';
    
    if (currentPage === 'kadin.html') {
        category = 'ayakkabilar';
    } else if (currentPage === 'erkek.html') {
        category = 'gozluk-saat';
    } else if (currentPage === 'cocuk.html') {
        category = 'cantalar';
    } else if (currentPage === 'cart.html' || currentPage === 'sepet.html') {
        return; // Sepet sayfasında ürün gösterme
    }
    
    displayProductsByCategory(category);
}

// ============================================
// 12. KATEGORİYE GÖRE ÜRÜN GÖSTER
// ============================================
function displayProductsByCategory(category) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    if (category === 'anasayfa') {
        const products = getProductsByCategory('anasayfa').filter(p => p.id > 6);
        if (products.length === 0) return;
        
        let html = '';
        products.forEach(product => {
            html += createProductCard(product);
        });
        grid.innerHTML += html;
        return;
    }
    
    const products = getProductsByCategory(category);
    grid.innerHTML = '';
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#999;padding:40px;">Bu kategoride henüz ürün yok.</p>';
        return;
    }
    
    let html = '';
    products.forEach(product => {
        html += createProductCard(product);
    });
    grid.innerHTML = html;
}

// ============================================
// 13. ÜRÜN KARTI OLUŞTUR
// ============================================
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='css/foto/placeholder.jpeg'" />
            <h3>${product.name}</h3>
            ${product.brand ? `<p class="brand">${product.brand}</p>` : ''}
            <p class="price">${product.price.toLocaleString()} TL</p>
            <button class="add-to-cart" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.image}">
                <i class="fas fa-plus"></i> Sepete Ekle
            </button>
        </div>
    `;
}

// ============================================
// 14. SEPETE EKLE BUTONLARINI AYARLA
// ============================================
function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.removeEventListener('click', addToCart);
        button.addEventListener('click', addToCart);
    });
}

document.addEventListener('click', function(e) {
    const button = e.target.closest('.add-to-cart');
    if (button) {
        e.preventDefault();
        addToCart(e);
    }
});

// ============================================
// 15. GLOBAL FONKSİYONLAR (HTML'den çağrılmak için)
// ============================================
window.openWhatsApp = openWhatsApp;
window.addToCart = addToCart;
window.loadCartItems = loadCartItems;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// ============================================
// 16. KONSOL
// ============================================
console.log('%c LUXURY BOX ', 'font-size:28px; font-weight:bold; color:#f4c2c2;');
console.log('%c Enya | Founder ', 'font-size:16px; color:#f4c2c2;');
console.log(`%c ${PRODUCTS.length} ürün yüklendi`, 'font-size:13px; color:#2ecc71;');
console.log('%c Sepet sayfası desteği eklendi ✅', 'font-size:13px; color:#f4c2c2;');
