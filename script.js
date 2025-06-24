// --- 1. DATA PRODUK ---
const products = [
    {
        id: "cpu001",
        name: "Intel Core i7-14700K Processor",
        category: "CPU",
        price: 6500000,
        image: "id-11134207-7r98t-lmzsqpvxvdho4d.jpeg", // Pastikan gambar ada di folder 'images'
        description: "Processor berperforma tinggi dari Intel untuk gaming dan multitasking berat. Dibangun dengan arsitektur hybrid terbaru untuk efisiensi dan kekuatan.",
        specifications: {
            socket: "LGA 1700",
            cores: "20 (8 P-cores + 12 E-cores)",
            threads: "28",
            base_clock: "3.4 GHz",
            max_turbo_frequency: "5.5 GHz",
            cache: "33 MB Intel Smart Cache"
        }
    },
    {
        id: "gpu001",
        name: "NVIDIA GeForce RTX 4070 Ti SUPER",
        category: "GPU",
        price: 15500000,
        image: "600.png",
        description: "Kartu grafis powerful untuk pengalaman gaming 1440p hingga 4K dengan Ray Tracing dan DLSS 3. Dirancang untuk performa visual maksimal.",
        specifications: {
            memory: "16GB GDDR6X",
            memory_interface: "256-bit",
            cuda_cores: "8448",
            boost_clock: "2610 MHz",
            power_consumption: "285W"
        }
    },
    {
        id: "mb001",
        name: "ASUS ROG Strix Z790-E Gaming WiFi II",
        category: "Motherboard",
        price: 7800000,
        image: "performance-m.png",
        description: "Motherboard gaming premium dengan dukungan CPU Intel generasi terbaru dan fitur konektivitas lengkap. Ideal untuk PC rakitan high-end.",
        specifications: {
            chipset: "Intel Z790",
            socket: "LGA 1700",
            memory_slots: "4 x DIMM, Max. 128GB, DDR5",
            pcie_slots: "2 x PCIe 5.0 x16, 1 x PCIe 4.0 x16",
            connectivity: "Wi-Fi 7, Bluetooth 5.4, 2.5 Gb Ethernet"
        }
    },
    {
        id: "ram001",
        name: "Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz",
        category: "RAM",
        price: 2100000,
        image: "corsair-vengeance-rgb-rs-16gb-ddr4-cmg16gx4m1e3200c16.jpg",
        description: "RAM DDR5 berkecepatan tinggi dengan pencahayaan RGB yang menawan, cocok untuk gaming dan aplikasi berat.",
        specifications: {
            capacity: "32GB (2 x 16GB)",
            type: "DDR5",
            speed: "6000MHz",
            latency: "CL30",
            features: "XMP 3.0, RGB Lighting"
        }
    },
    {
        id: "ssd001",
        name: "Samsung 990 Pro 1TB NVMe PCIe 4.0 SSD",
        category: "SSD",
        price: 1800000,
        image: "DM_DD326CA3E815A48ED82E6640801DF1F2_210623160609_ll.jpg",
        description: "SSD NVMe tercepat dari Samsung untuk performa loading dan transfer data yang superior. Ideal untuk sistem operasi dan game.",
        specifications: {
            capacity: "1TB",
            interface: "PCIe Gen4 x4, NVMe 2.0",
            read_speed: "Up to 7450 MB/s",
            write_speed: "Up to 6900 MB/s",
            endurance: "600 TBW"
        }
    },
    {
        id: "psu001",
        name: "Seasonic Focus Plus Gold 750W",
        category: "Power Supply",
        price: 1500000,
        image: "SEASONIC_FOCUS_PLUS_GOLD_750FX_04_678x452.jpg",
        description: "Power supply 750W dengan sertifikasi 80 Plus Gold, menawarkan efisiensi tinggi dan keandalan untuk sistem PC modern.",
        specifications: {
            wattage: "750W",
            efficiency: "80 PLUS Gold",
            form_factor: "ATX",
            cables: "Full Modular",
            protection: "OPP, OVP, UVP, OCP, OTP, SCP"
        }
    }
];

// --- 2. ELEMEN DOM ---
const sections = {
    home: document.getElementById('home-section'),
    detail: document.getElementById('detail-section'),
    cart: document.getElementById('cart-section'),
    checkout: document.getElementById('checkout-section'),
    confirmation: document.getElementById('confirmation-section'),
    about: document.getElementById('about-section')
};

const navLinks = {
    home: document.getElementById('nav-home'),
    cart: document.getElementById('nav-cart'),
    about: document.getElementById('nav-about')
};

const productListDiv = document.getElementById('product-list');
const productDetailDiv = document.getElementById('product-detail');
const cartCountSpans = [
    document.getElementById('cart-count')
]; // Array karena ada satu span cart-count di header
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const checkoutForm = document.getElementById('checkout-form');
const orderIdSpan = document.getElementById('order-id');
const backToHomeDetailButton = document.getElementById('back-to-home');
const confirmBackToHomeButton = document.getElementById('confirm-back-to-home');
const emptyCartMessage = document.getElementById('empty-cart-message');

// --- 3. FUNGSI UTILITAS (Keranjang Belanja) ---
const CART_STORAGE_KEY = 'pc_store_cart';

function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount(); // Update tampilan jumlah item di keranjang
}

function updateCartCount() {
    const cart = getCart();
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    cartCountSpans.forEach(span => {
        if (span) span.textContent = totalItems;
    });
}

function getProductById(productId) {
    return products.find(p => p.id === productId);
}

// --- 4. FUNGSI NAVIGASI Halaman (Single Page Application) ---
function showSection(sectionToShow) {
    // Sembunyikan semua section
    for (const key in sections) {
        if (sections[key]) {
            sections[key].classList.remove('active-section');
            sections[key].classList.add('hidden-section');
        }
    }
    // Tampilkan section yang diinginkan
    if (sections[sectionToShow]) {
        sections[sectionToShow].classList.remove('hidden-section');
        sections[sectionToShow].classList.add('active-section');
    }
}

// --- 5. FUNGSI TAMPILAN PRODUK ---
function renderProductList() {
    productListDiv.innerHTML = ''; // Kosongkan daftar produk
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-content">
                <h3>${product.name}</h3>
                <p class="price">${formatRupiah(product.price)}</p>
                <button class="button add-to-cart-button" data-id="${product.id}">Tambah ke Keranjang</button>
                <button class="button primary-button view-detail-button" data-id="${product.id}">Lihat Detail</button>
            </div>
        `;
        productListDiv.appendChild(productCard);
    });

    // Tambahkan event listener untuk tombol "Tambah ke Keranjang" dan "Lihat Detail"
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            addToCart(productId);
        });
    });

    document.querySelectorAll('.view-detail-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            renderProductDetail(productId);
            showSection('detail');
        });
    });
}

function renderProductDetail(productId) {
    const product = getProductById(productId);
    if (!product) {
        productDetailDiv.innerHTML = '<p>Produk tidak ditemukan.</p>';
        return;
    }

    let specsHtml = '<ul>';
    for (const key in product.specifications) {
        // Format key menjadi lebih readable (misal: "base_clock" jadi "Base Clock")
        const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        specsHtml += `<li><strong>${formattedKey}:</strong> ${product.specifications[key]}</li>`;
    }
    specsHtml += '</ul>';

    productDetailDiv.innerHTML = `
        <div class="detail-content">
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h2>${product.name}</h2>
                <p class="price">${formatRupiah(product.price)}</p>
                <p>${product.description}</p>
                <h3>Spesifikasi:</h3>
                ${specsHtml}
                <button class="button add-to-cart-button" data-id="${product.id}">Tambah ke Keranjang</button>
            </div>
        </div>
    `;
    // Add event listener for add to cart button on detail page
    productDetailDiv.querySelector('.add-to-cart-button').addEventListener('click', (event) => {
        addToCart(event.target.dataset.id);
    });
}

// --- 6. FUNGSI KERANJANG BELANJA ---
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;

    let cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart(cart);
    alert(`${product.name} ditambahkan ke keranjang!`); // Notifikasi sederhana
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart(); // Refresh tampilan keranjang
}

function updateCartItemQuantity(productId, newQuantity) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        const quantity = parseInt(newQuantity);
        if (quantity > 0) {
            cart[itemIndex].quantity = quantity;
        } else {
            // Jika quantity 0 atau kurang, hapus item
            cart.splice(itemIndex, 1);
        }
    }
    saveCart(cart);
    renderCart(); // Refresh tampilan keranjang
}

function renderCart() {
    const cart = getCart();
    cartItemsDiv.innerHTML = ''; // Kosongkan tampilan keranjang

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        checkoutButton.disabled = true;
        cartTotalSpan.textContent = formatRupiah(0);
        return;
    } else {
        emptyCartMessage.style.display = 'none';
        checkoutButton.disabled = false;
    }

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${formatRupiah(item.price)} per unit</p>
            </div>
            <div class="cart-item-actions">
                <input type="number" class="item-quantity" data-id="${item.id}" value="${item.quantity}" min="1">
                <span class="item-total-price">${formatRupiah(itemTotal)}</span>
                <button class="button remove-from-cart-button" data-id="${item.id}">Hapus</button>
            </div>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });

    cartTotalSpan.textContent = formatRupiah(total);

    // Event listener untuk update kuantitas
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = event.target.dataset.id;
            updateCartItemQuantity(productId, event.target.value);
        });
    });

    // Event listener untuk tombol hapus
    document.querySelectorAll('.remove-from-cart-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            removeFromCart(productId);
        });
    });
}

// --- 7. FUNGSI CHECKOUT ---
function handleCheckout(event) {
    event.preventDefault(); // Mencegah form submit secara default

    const formData = new FormData(checkoutForm);
    const orderDetails = {};
    for (const [key, value] of formData.entries()) {
        orderDetails[key] = value;
    }

    const cart = getCart();
    if (cart.length === 0) {
        alert('Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.');
        return;
    }

    // Simulasi proses pesanan (tidak ada pengiriman data ke server nyata)
    console.log('Pesanan diproses:', {
        customer: orderDetails,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    });

    // Bersihkan keranjang setelah simulasi pesanan
    saveCart([]);

    // Tampilkan halaman konfirmasi
    showSection('confirmation');
    // Generate ID pesanan acak
    orderIdSpan.textContent = '#PCSTORE-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

// --- 8. FUNGSI PEMBANTU ---
function formatRupiah(angka) {
    const reverse = angka.toString().split('').reverse().join('');
    const ribuan = reverse.match(/\d{1,3}/g);
    const result = ribuan.join('.').split('').reverse().join('');
    return 'Rp ' + result;
}


// --- 9. EVENT LISTENERS UTAMA ---
document.addEventListener('DOMContentLoaded', () => {
    renderProductList(); // Tampilkan produk saat halaman dimuat
    updateCartCount(); // Update jumlah item di keranjang
    showSection('home'); // Pastikan halaman beranda yang pertama tampil
});

// Navigasi
navLinks.home.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
    renderProductList(); // Pastikan produk terload ulang jika perlu (opsional, tapi aman)
});
navLinks.cart.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('cart');
    renderCart(); // Render keranjang setiap kali dibuka
});
navLinks.about.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('about');
});

// Tombol dari Detail kembali ke Home
backToHomeDetailButton.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
    renderProductList();
});

// Tombol dari Konfirmasi kembali ke Home
confirmBackToHomeButton.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
    renderProductList();
});

// Event listener untuk tombol Checkout di halaman keranjang
checkoutButton.addEventListener('click', () => {
    showSection('checkout');
});

// Event listener untuk form checkout
checkoutForm.addEventListener('submit', handleCheckout);