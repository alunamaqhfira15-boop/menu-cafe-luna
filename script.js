// === NOMOR WHATSAPP KASIR (Telah disesuaikan: 085786485755 -> 6285786485755) ===
const NOMOR_WA_KAFE = "6285786485755";

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
    tersedia: false
  }
];

// === STATE KERANJANG BELANJA ===
let keranjang = [];

// === INISIALISASI SAAT HALAMAN DIMUAT ===
document.addEventListener("DOMContentLoaded", () => {
  tampilkanMenu(dataMenu);

  // Fitur Live Search (Pencarian Otomatis)
  document.getElementById("searchInput").addEventListener("input", (e) => {
    const kataKunci = e.target.value.toLowerCase();
    const hasilFilter = dataMenu.filter(item =>
      item.nama.toLowerCase().includes(kataKunci) ||
      item.deskripsi.toLowerCase().includes(kataKunci)
    );
    tampilkanMenu(hasilFilter);
  });
});

// === UTILITY: FORMAT MATA UANG RUPIAH ===
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// === FUNGSI MENAMPILKAN KARTU MENU KE HALAMAN ===
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
        <img src="${item.gambar}" alt="${item.
