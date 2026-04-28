import { useState, useEffect } from "react";
import Head from "next/head";
import UMKMForm from "../components/UMKMForm";
import PredictionResult from "../components/PredictionResult";
import GeneratedWebsite from "../components/GeneratedWebsite";
import { predictUMKM, checkAPIHealth } from "../utils/api";

export default function Home() {
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiHealth, setApiHealth] = useState(null);
  const [showWebsite, setShowWebsite] = useState(false);
  const [umkmName, setUMKMName] = useState("");
  const [umkmData, setUMKMData] = useState(null);

  // Check API health saat page load
  useEffect(() => {
    const checkAPI = async () => {
      const isHealthy = await checkAPIHealth();
      setApiHealth(isHealthy);
    };
    checkAPI();
  }, []);

  const handleFormSubmit = async (formData, name) => {
    setIsLoading(true);
    setError(null);
    setPredictionResult(null);
    setShowWebsite(false);
    setUMKMName(name);

    const result = await predictUMKM(formData);

    if (result.success) {
      setPredictionResult(result.data);
      setUMKMData({ ...formData, nama_usaha: name });
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const handleGenerateWebsite = () => {
    setShowWebsite(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    // clear semua state
    setPredictionResult(null);
    setError(null);
    setUMKMName("");
    setUMKMData(null);
    setShowWebsite(false);

    // scroll ke form
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  if (showWebsite && umkmData) {
    return (
      <>
        <Head>
          <title>{umkmData.nama_usaha} | LapaKita</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="flex gap-4 p-4 bg-blue-50 border-l-4 border-primary">
          <button
            onClick={() => setShowWebsite(false)}
            className="text-primary hover:underline font-semibold"
          >
            ← Kembali ke Dashboard
          </button>
        </div>
        <GeneratedWebsite umkmData={umkmData} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>LapaKita - Solusi Digitalisasi UMKM</title>
        <meta
          name="description"
          content="Platform AI-powered untuk digitalisasi UMKM Sleman"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary to-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">LapaKita UMKM Sleman</h1>
          <p className="text-white-250 text-lg mb-2">
            Solusi AI-Powered untuk Digitalisasi UMKM Sleman
          </p>
          <p className="text-white-300 text-sm">
            Analisis kesiapan digital dan bangun website penjualan dalam
            hitungan menit
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* API Status Alert */}
        {apiHealth === false && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ⚠️ <strong>Peringatan:</strong> API server sedang tidak terhubung.
            Beberapa fitur mungkin tidak berfungsi. Mohon coba lagi nanti.
          </div>
        )}

        {/* Feature Overview */}
        <section className="mb-12">
          <h2 className="section-title">Cara Kerja LapaKita</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              {/* <div className="text-5xl mb-4">📋</div> */}
              <h3 className="font-bold text-lg mb-2">1. Isi Data Usaha</h3>
              <p className="text-gray-600 text-sm">
                Masukkan profil UMKM Anda dengan lengkap (sektor, omset, tenaga
                kerja, dll)
              </p>
            </div>
            <div className="card text-center">
              {/* <div className="text-5xl mb-4">🤖</div> */}
              <h3 className="font-bold text-lg mb-2">2. AI Analisis</h3>
              <p className="text-gray-600 text-sm">
                Model AI kami menganalisis kesiapan digital berdasarkan 5000+
                data UMKM
              </p>
            </div>
            <div className="card text-center">
              {/* <div className="text-5xl mb-4">🌐</div> */}
              <h3 className="font-bold text-lg mb-2">3. Dapatkan Website</h3>
              <p className="text-gray-600 text-sm">
                Jika siap, dapatkan website penjualan dengan fitur lengkap siap
                pakai
              </p>
            </div>
          </div>
        </section>

        {/* Main Form & Result */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-1">
              <UMKMForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>

            {/* Result Column */}
            <div className="lg:col-span-2">
              {/* Loading State */}
              {isLoading && (
                <div className="card flex flex-col items-center justify-center py-12">
                  <div className="animate-spin text-4xl mb-4">⏳</div>
                  <p className="text-gray-600">
                    Sedang menganalisis kesiapan digital UMKM Anda...
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Tunggu beberapa detik
                  </p>
                </div>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <div className="card bg-red-50 border border-red-200">
                  <h3 className="text-red-800 font-bold mb-2">
                    ❌ Terjadi Kesalahan
                  </h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Result State */}
              {predictionResult && !isLoading && (
                <PredictionResult
                  result={predictionResult}
                  umkmName={umkmName}
                  onGenerateWebsite={handleGenerateWebsite}
                  onReset={handleReset}
                />
              )}

              {/* Empty State */}
              {!isLoading && !error && !predictionResult && (
                <div className="card text-center py-12 bg-gray-50">
                  {/* <p className="text-4xl mb-4">👋</p> */}
                  <p className="text-gray-600">
                    Isi data UMKM Anda di formulir, kemudian klik tombol
                    "Analisis Kesiapan Digital"
                  </p>
                  <p className="text-gray-500 text-sm mt-3">
                    Hasilnya akan ditampilkan di sini
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 mb-12">
          <h2 className="section-title">Pertanyaan Umum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-bold mb-2">Apa itu LapaKita?</h3>
              <p className="text-gray-600 text-sm">
                LapaKita adalah platform yang menggunakan AI untuk membantu UMKM
                mengetahui kesiapan mereka dalam digitalisasi, dan membantu
                membuat website penjualan otomatis.
              </p>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">
                Berapa akurasi prediksi yang dilakukan untuk memprediksi
                kesiapan digital UMKM?
              </h3>
              <p className="text-gray-600 text-sm">
                Model kami memiliki akurasi 92.6% pada test set, berdasarkan
                pelatihan dengan 5000 data UMKM Kabupaten Sleman.
              </p>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">Apakah layanan ini gratis?</h3>
              <p className="text-gray-600 text-sm">
                Ya! Kami menawarkan layanan analisis kesiapan digital UMKM Anda
                secara gratis.
              </p>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">
                Bagaimana jika UMKM saya tidak siap go-online?
              </h3>
              <p className="text-gray-600 text-sm">
                Kami akan memberikan rekomendasi langkah-langkah persiapan yang
                sesuai dengan profil usaha Anda.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">LapaKita</h3>
              <p className="text-gray-400 text-sm">
                Memberdayakan UMKM Sleman melalui teknologi dan inovasi.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Kontak</h3>
              <p className="text-gray-400 text-sm">Email: info@lapakita.com</p>
              <p className="text-gray-400 text-sm">
                WhatsApp: +62 812-3456-7890
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Teknologi</h3>
              <p className="text-gray-400 text-sm">
                Machine Learning • Python • Next.js • Azure
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 LapaKita. Semua hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
