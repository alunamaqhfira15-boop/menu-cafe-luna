// Data Menu Kafe (Dapat diubah pemilik kafe kapan saja dengan mudah)
const dataMenu = [
  { id: 1, nama: "Es Kopi Gula Aren", kategori: "kopi", harga: "Rp 18.000", deskripsi: "Kopi susu dengan gula aren asli.", tersedia: true },
  { id: 2, nama: "Americano Cold", kategori: "kopi", harga: "Rp 15.000", deskripsi: "Ekstrak espresso dingin menyegarkan.", tersedia: true },
  { id: 3, nama: "Roti Bakar Cokelat", kategori: "makanan", harga: "Rp 12.000", deskripsi: "Roti bakar crispy isi cokelat lumer.", tersedia: true },
  { id: 4, nama: "French Fries", kategori: "makanan", harga: "Rp 14.000", deskripsi: "Kentang goreng gurih khas kafe.", tersedia: false } // Contoh jika habis
];

// Fungsi untuk menampilkan menu ke layar
function tampilkanMenu(daftar) {
  const container = document.getElementById("menuContainer");
  container.innerHTML = "";

  daftar.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-card";
    
    card.innerHTML = `
      <h3>${item.nama}</h3>
      <p>${item.deskripsi}</p>
      <div class="price">${item.harga}</div>
      ${!item.tersedia ? '<span class="badge-soldout">[ Stok Habis ]</span>' : ''}
    `;
    
    container.appendChild(card);
  });
}

// Fitur Filter Berdasarkan Kategori
function filterMenu(kategori) {
  if (kategori === 'semua') {
    tampilkanMenu(dataMenu);
  } else {
    const hasilFilter = dataMenu.filter(item => item.kategori === kategori);
    tampilkanMenu(hasilFilter);
  }
}

// Fitur Pencarian Nama Menu
document.getElementById("searchInput").addEventListener("input", function(e) {
  const kataKunci = e.target.value.toLowerCase();
  const hasilCari = dataMenu.filter(item => 
    item.nama.toLowerCase().includes(kataKunci)
  );
  tampilkanMenu(hasilCari);
});

// Jalankan fungsi pertama kali saat halaman dibuka
tampilkanMenu(dataMenu);
