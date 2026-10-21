// === NOMOR WHATSAPP RESTO/KAFE (Ganti sesuai nomor tujuan) ===
const NOMOR_WA_KAFE = "6281234567890";

// === DATA MENU KAFE ===
const dataMenu = [
  {
    id: 1,
    nama: "Es Kopi Milkshake Senja",
    kategori: "kopi",
    harga: 18000,
    deskripsi: "Signature espresso + susu creamy + gula aren asli. Bikin nagih!",
    gambar: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80",
    tag: "⭐ Best Seller",
    tersedia: true
  },
  {
    id: 2,
    nama: "Americano Cold Press",
    kategori: "kopi",
    harga: 15000,
    deskripsi: "Espresso dingin tanpa gula, pas buat yang lagi kejar deadline.",
    gambar: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=400&q=80",
    tag: "⚡ Bikin Melek",
    tersedia: true
  },
  {
    id: 3,
    nama: "Matcha Latte Creamy",
    kategori: "non-kopi",
    harga: 22000,
    deskripsi: "Matcha Kyoto murni dipadu susu gurih segar.",
    gambar: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80",
    tag: "🍵 Favorite",
    tersedia: true
  },
  {
    id: 4,
    nama: "Berry Choco Ice",
    kategori: "non-kopi",
    harga: 20000,
    deskripsi: "Perpaduan cokelat pekat dan sirup stroberi dingin.",
    gambar: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80",
    tag: "🍓 Seger Banget",
    tersedia: true
  },
  {
    id: 5,
    nama: "Kentang Goreng Truffle",
    kategori: "makanan",
    harga: 16000,
    deskripsi: "French fries renyah bertabur bumbu gurih khas kafe.",
    gambar: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80",
    tag: "🍟 Wajib Coba",
    tersedia: true
  },
  {
    id: 6,
    nama: "Toast Cokelat Keju Lumer",
    kategori: "makanan",
    harga: 18000,
    deskripsi: "Roti panggang crispy melimpah isi cokelat & keju.",
    gambar: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80",
    tag: "🧀 Melted",
    tersedia: false // Contoh stok habis
  }
];

// === STATE KERANJANG ===
let keranjang = [];

// === INISIALISASI SAAT HALAMAN DIMUAT ===
document.addEventListener("DOMContentLoaded", () => {
  tampilkanMenu(dataMenu);

  // Live Search
  document.getElementById("searchInput").addEventListener("input", (e) => {
    const kataKunci = e.target.value.toLowerCase();
    const hasilFilter = dataMenu.filter(item =>
      item.nama.toLowerCase().includes(kataKunci) ||
      item.deskripsi.toLowerCase().includes(kataKunci)
    );
    tampilkanMenu(hasilFilter);
  });
});

// === UTILITY: FORMAT RUPIAH ===
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// === TAMPILKAN MENU KE GRID ===
function tampilkanMenu(daftar) {
  const container = document.getElementById("menuGrid");
  container.innerHTML = "";

  if (daftar.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 20px; color:#64748b;">Menu tidak ditemukan 😅</p>`;
    return;
  }

  daftar.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-card";

    card.innerHTML = `
      <div class="card-img-container">
        <img src="${item.gambar}" alt="${item.nama}" class="card-img" loading="lazy">
        ${item.tag ? `<span class="tag-badge">${item.tag}</span>` : ""}
        ${!item.tersedia ? `<div class="soldout-overlay">STOK HABIS</div>` : ""}
      </div>
      <div class="card-body">
        <h3 class="item-title">${item.nama}</h3>
        <p class="item-desc">${item.deskripsi}</p>
        <div class="card-footer">
          <span class="item-price">${formatRupiah(item.harga)}</span>
          ${item.tersedia 
            ? `<button class="btn-add" onclick="tambahKeKeranjang(${item.id})">+</button>` 
            : `<button class="btn-add" disabled style="opacity: 0.4;">+</button>`
          }
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// === FILTER KATEGORI ===
function filterKategori(kategori, btnElement) {
  // Update UI tombol aktif
  document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
  btnElement.classList.add("active");

  // Filter Data
  if (kategori === "semua") {
    tampilkanMenu(dataMenu);
  } else {
    const hasil = dataMenu.filter(item => item.kategori === kategori);
    tampilkanMenu(hasil);
  }
}

// === LOGIKA KERANJANG ===
function tambahKeKeranjang(id) {
  const itemMenu = dataMenu.find(m => m.id === id);
  const itemDiKeranjang = keranjang.find(item => item.id === id);

  if (itemDiKeranjang) {
    itemDiKeranjang.qty += 1;
  } else {
    keranjang.push({
      ...itemMenu,
      qty: 1
    });
  }

  updateCartBar();
}

function ubahKuantitas(id, perubahan) {
  const index = keranjang.findIndex(item => item.id === id);
  if (index !== -1) {
    keranjang[index].qty += perubahan;
    if (keranjang[index].qty <= 0) {
      keranjang.splice(index, 1);
    }
  }

  updateCartBar();
  renderCartModal();
}

function hitungTotal() {
  return keranjang.reduce((sum, item) => sum + (item.harga * item.qty), 0);
}

function hitungTotalItem() {
  return keranjang.reduce((sum, item) => sum + item.qty, 0);
}

// === UPDATE BAR & MODAL KERANJANG ===
function updateCartBar() {
  const cartBar = document.getElementById("cartBar");
  const totalItem = hitungTotalItem();

  if (totalItem > 0) {
    cartBar.classList.remove("hidden");
    document.getElementById("cartBadgeCount").innerText = totalItem;
    document.getElementById("cartBarTotal").innerText = formatRupiah(hitungTotal());
  } else {
    cartBar.classList.add("hidden");
    tutupModalCart();
  }
}

function renderCartModal() {
  const listContainer = document.getElementById("cartItemsList");
  listContainer.innerHTML = "";

  if (keranjang.length === 0) {
    listContainer.innerHTML = `<p style="text-align:center; color:#64748b; padding:15px;">Keranjangmu kosong nih.</p>`;
  } else {
    keranjang.forEach(item => {
      const row = document.createElement("div");
      row.className = "cart-item-row";
      row.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.nama}</h4>
          <p>${formatRupiah(item.harga * item.qty)}</p>
        </div>
        <div class="qty-controls">
          <button class="btn-qty" onclick="ubahKuantitas(${item.id}, -1)">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="btn-qty" onclick="ubahKuantitas(${item.id}, 1)">+</button>
        </div>
      `;
      listContainer.appendChild(row);
    });
  }

  document.getElementById("modalTotalPrice").innerText = formatRupiah(hitungTotal());
}

function bukaModalCart() {
  renderCartModal();
  document.getElementById("modalOverlay").classList.remove("hidden");
}

function tutupModalCart() {
  document.getElementById("modalOverlay").classList.add("hidden");
}

// === CHECKOUT KE WHATSAPP ===
function kirimKeWhatsApp() {
  const noMeja = document.getElementById("noMeja").value.trim();
  const namaPemesan = document.getElementById("namaPemesan").value.trim();
  const catatan = document.getElementById("catatan").value.trim();

  if (!noMeja || !namaPemesan) {
    alert("Mohon isi Nomor Meja dan Nama Kamu terlebih dahulu ya! 🙏");
    return;
  }

  if (keranjang.length === 0) {
    alert("Keranjang belanjaan kamu masih kosong!");
    return;
  }

  // Format Pesan
  let pesan = `*HALO KASIR, ADA PESANAN BARU!* ☕✨\n\n`;
  pesan += `📍 *No. Meja:* ${noMeja}\n`;
  pesan += `👤 *Nama:* ${namaPemesan}\n`;
  pesan += `-----------------------------------\n`;
  pesan += `*RINCIAN PESANAN:*\n`;

  keranjang.forEach(item => {
    pesan += `• ${item.nama} (${item.qty}x) = ${formatRupiah(item.harga * item.qty)}\n`;
  });

  pesan += `-----------------------------------\n`;
  pesan += `💰 *TOTAL BAYAR:* ${formatRupiah(hitungTotal())}\n`;

  if (catatan) {
    pesan += `📝 *Catatan Tambahan:* ${catatan}\n`;
  }

  pesan += `\nMohon diproses ya, terima kasih! 🙌`;

  // Encode URL
  const linkWA = `https://wa.me/${NOMOR_WA_KAFE}?text=${encodeURIComponent(pesan)}`;
  
  // Buka WhatsApp
  window.open(linkWA, "_blank");
}
