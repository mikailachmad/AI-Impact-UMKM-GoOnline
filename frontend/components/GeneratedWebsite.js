import { useState } from "react";

/**
 * Function untuk format nama menjadi email
 * Contoh: "Kursus Speak English Please!" -> "kursusspeakenglishplease@gmail.com"
 */
const formatEmailFromName = (name) => {
  if (!name) return "";
  // Lowercase semua
  let email = name.toLowerCase();
  // Hapus semua spasi
  email = email.replace(/\s+/g, "");
  // Hapus semua special characters (keep hanya a-z, 0-9)
  email = email.replace(/[^a-z0-9]/g, "");
  // Tambah @gmail.com
  return `${email}@gmail.com`;
};

/**
 * Component untuk template website UMKM yang di-generate otomatis
 * Props:
 *   - umkmData: data UMKM yang sudah diprediksi
 */
export default function GeneratedWebsite({ umkmData }) {
  const [activeTab, setActiveTab] = useState("catalog");
  const [cartItems, setCartItems] = useState([]);

  if (!umkmData) {
    return null;
  }

  const sampleProducts = [
    {
      id: 1,
      name: "Produk Unggulan 1",
      price: 50000,
      image: "🏷️",
      description: "Produk terbaik dari UMKM Anda",
      stock: 10,
    },
    {
      id: 2,
      name: "Produk Unggulan 2",
      price: 75000,
      image: "📦",
      description: "Kualitas premium dengan harga terjangkau",
      stock: 8,
    },
    {
      id: 3,
      name: "Produk Unggulan 3",
      price: 100000,
      image: "🎁",
      description: "Pilihan favorit pelanggan",
      stock: 5,
    },
  ];

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{umkmData.nama_usaha}</h1>
            <p className="text-blue-100 text-sm">
              Sektor: {umkmData.sektor_usaha} • {umkmData.kapanewon}
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setActiveTab("cart")}
              className="relative px-4 py-2 bg-white text-primary rounded-full font-semibold hover:bg-blue-100 transition-colors"
            >
              Keranjang
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 flex gap-8">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`py-4 font-semibold border-b-2 transition-colors ${
              activeTab === "catalog"
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Katalog
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`py-4 font-semibold border-b-2 transition-colors ${
              activeTab === "about"
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Tentang Kami
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`py-4 font-semibold border-b-2 transition-colors ${
              activeTab === "contact"
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Kontak
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Catalog Tab */}
        {activeTab === "catalog" && (
          <div>
            <h2 className="section-title">Katalog Produk</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleProducts.map((product) => (
                <div key={product.id} className="card">
                  <div className="text-6xl mb-4 text-center">
                    {product.image}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold text-primary">
                      Rp {product.price.toLocaleString("id-ID")}
                    </div>
                    <div className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                      Stok: {product.stock}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                      product.stock > 0
                        ? "bg-primary text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {product.stock > 0
                      ? "Tambah ke Keranjang"
                      : "Habis Terjual"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === "cart" && (
          <div>
            <h2 className="section-title">Keranjang Belanja</h2>
            {cartItems.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-4xl mb-4">🛒</p>
                <p className="text-gray-600">Keranjang Anda kosong</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="card flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{item.image}</span>
                        <div>
                          <h4 className="font-bold">{item.name}</h4>
                          <p className="text-gray-600 text-sm">
                            Rp {item.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value);
                            setCartItems(
                              cartItems.map((i) =>
                                i.id === item.id ? { ...i, qty: newQty } : i,
                              ),
                            );
                          }}
                          className="w-12 px-2 py-1 border border-gray-300 rounded"
                        />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Summary */}
                <div className="card bg-blue-50 h-fit">
                  <h3 className="font-bold text-lg mb-4">Ringkasan Pesanan</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        Rp {totalPrice.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Ongkir</span>
                      <span className="font-semibold">Rp 0</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg font-bold text-primary">
                      <span>Total</span>
                      <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                  <button className="w-full btn-primary">
                    💳 Lanjut Pembayaran
                  </button>
                  <p className="text-xs text-gray-600 text-center mt-3">
                    Aman dan terpercaya
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <div>
            <h2 className="section-title">Tentang Kami</h2>
            <div className="card">
              <p className="text-gray-700 mb-4">
                {umkmData.nama_usaha} adalah UMKM yang berkomitmen memberikan
                produk terbaik dalam bidang {umkmData.sektor_usaha} dengan
                kualitas dan harga yang kompetitif.
              </p>
              <h3 className="font-bold text-lg mb-3">Informasi Usaha</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Sektor:</strong> {umkmData.sektor_usaha}
                </li>
                <li>
                  <strong>Lokasi:</strong> {umkmData.kapanewon}, Sleman
                </li>
                <li>
                  <strong>Skala:</strong> {umkmData.skala_usaha}
                </li>
                <li>
                  <strong>Umur Usaha:</strong> {umkmData.umur_usaha} tahun
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div>
            <h2 className="section-title">Hubungi Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-bold text-lg mb-4">Kontak</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    {/* <span className="text-2xl">📞</span> */}
                    <span>- Telepon: +62 812-3456-7890</span>
                  </li>
                  <li className="flex items-center gap-3">
                    {/* <span className="text-2xl">💬</span> */}
                    <span>- Message: WhatsApp Business</span>
                  </li>
                  <li className="flex items-center gap-3">
                    {/* <span className="text-2xl">✉️</span> */}
                    <span>
                      - Email: {formatEmailFromName(umkmData.nama_usaha)}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="card">
                <h3 className="font-bold text-lg mb-4">Lokasi</h3>
                <p className="text-gray-700 mb-4">
                  {/* Jl. Contoh No. 123 */}
                  {/* <br /> */}
                  {umkmData.kapanewon}, Sleman
                  <br />
                  Yogyakarta, Indonesia
                </p>
                <p className="text-sm text-gray-600">
                  Jam Operasional:
                  <br />
                  Senin - Jumat: 08:00 - 17:00
                  <br />
                  Sabtu: 08:00 - 15:00
                  <br />
                  Minggu: Tutup
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2026 {umkmData.nama_usaha}. Semua hak cipta dilindungi.</p>
          <p className="text-gray-400 text-sm mt-2">Dibuat oleh LapaKita</p>
        </div>
      </footer>
    </div>
  );
}
