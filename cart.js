/**
 * LUXURY BOX - Cart JavaScript
 * Sepet işlemleri ve WhatsApp entegrasyonu
 */

// ============================================
// 1. KONFIGURASYON - WhatsApp Numarasi
// ============================================
const phoneNumber = '905439704241';

// ============================================
// 2. SEPETI GOSTER
// ============================================
function displayCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart-message">Sepetiniz boş. Lüks koleksiyonumuzu keşfedin!</p>';
        updateCartSummary();
        return;
    }
    
    let html = '';
    cart.forEach((item, index) => {
        html += `
            <div class="cart-item" data-index="${index}">
                <img src="${item.image || 'css/foto/placeholder.jpeg'}" alt="${item.name}" />
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">${item.price.toLocaleString()} TL</p>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-index="${index}">
                    <i class="fas fa-trash"></i> Kaldır
                </button>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    
    // Quantity buttons
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const action = this.getAttribute('data-action');
            updateQuantity(index, action);
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeFromCart(index);
        });
    });
    
    updateCartSummary();
}

// ============================================
// 3. SEPET OZETINI GUNCELLE
// ============================================
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const whatsappBtn = document.getElementById('whatsapp-order-btn');
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const shipping = subtotal >= 10000 ? 0 : 0;
    const total = subtotal + shipping;
    
    if (subtotalElement) {
        subtotalElement.textContent = subtotal.toLocaleString() + ' TL';
    }
    
    if (totalElement) {
        totalElement.textContent = total.toLocaleString() + ' TL';
    }
    
    // Butonları güncelle
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
    
    if (whatsappBtn) {
        whatsappBtn.disabled = cart.length === 0;
    }
}

// ============================================
// 4. MIKTAR GUNCELLE
// ============================================
function updateQuantity(index, action) {
    const cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    
    if (index < 0 || index >= cart.length) return;
    
    if (action === 'increase') {
        cart[index].quantity += 1;
    } else if (action === 'decrease') {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    
    localStorage.setItem('luxuryCart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// ============================================
// 5. SEPETTEN KALDIR
// ============================================
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    
    if (index < 0 || index >= cart.length) return;
    
    const productName = cart[index].name;
    cart.splice(index, 1);
    
    localStorage.setItem('luxuryCart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
    
    showToast(productName + ' sepette kaldırıldı.');
}

// ============================================
// 6. WHATSAPP ILE SIPARIS GONDER
// ============================================
function sendCartToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    
    if (cart.length === 0) {
        showToast('Sepetiniz boş!');
        return;
    }
    
    let message = '🛍️ *LUXURY BOX SİPARİŞİM*%0A%0A';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `📦 ${index + 1}. ${item.name}%0A`;
        message += `   Fiyat: ${item.price.toLocaleString()} TL x ${item.quantity}%0A`;
        message += `   Toplam: ${itemTotal.toLocaleString()} TL%0A%0A`;
    });
    
    message += `💰 *GENEL TOPLAM: ${total.toLocaleString()} TL*%0A%0A`;
    message += `📱 Instagram: @luxurybox.tm%0A`;
    message += `📍 İstanbul, Türkiye%0A%0A`;
    message += `Teşekkürler! 🙏`;
    
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
}

// ============================================
// 7. WHATSAPP DOGRUDAN ILETISIM (Urun butonlari icin)
// ============================================
function openWhatsApp(productName) {
    const message = 
        'LUXURY BOX - ÖZEL SİPARİŞ%0A' +
        '============================%0A%0A' +
        'Ürün: ' + productName + '%0A' +
        'Bu ürün hakkında bilgi almak istiyorum.%0A%0A' +
        'LUXURY BOX%0A' +
        'En özel sipariş talebi.%0A' +
        '@luxurybox.tm';

    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
}

// ============================================
// 8. SAYFA YUKLENDIGINDE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Sepeti göster
    displayCart();
    
    // Sepet sayısını güncelle
    updateCartCount();
    
    // WhatsApp sipariş butonu (cart.html'deki)
    const whatsappOrderBtn = document.getElementById('whatsapp-order-btn');
    if (whatsappOrderBtn) {
        whatsappOrderBtn.addEventListener('click', function() {
            sendCartToWhatsApp();
        });
    }
    
    // Eski checkout butonu (geriye dönük uyumluluk)
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            sendCartToWhatsApp();
        });
    }
});

// ============================================
// 9. SEPET SAYISINI GUNCELLE (script.js ile uyumlu)
// ============================================
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// ============================================
// 10. TOAST MESAJI (script.js ile uyumlu)
// ============================================
function showToast(message) {
    // Eski toast'u kaldır
    const oldToast = document.querySelector('.toast-notification');
    if (oldToast) oldToast.remove();
    
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
    
    // Animasyon
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 50);
    
    // Otomatik kapat
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