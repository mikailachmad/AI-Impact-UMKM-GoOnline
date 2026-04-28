export const getPrediction = async (dataDariForm) => {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://api-umkm-sleman-2026-euhcecfvdvgrexft.indonesiacentral-01.azurewebsites.net/";

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataDariForm),
  });

  if (!response.ok) {
    throw new Error("Gagal konek ke Azure");
  }

  const hasil = await response.json();
  return hasil;
};

/**
 * Format currency to IDR
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

/**
 * Calculate omset_pct_dalam_skala berdasarkan skala usaha
 */
const omsetRanges = {
  Mikro_Lv1: [2_000_000, 10_000_000],
  Mikro_Lv2: [10_000_000, 25_000_000],
  Mikro_Lv3: [25_000_000, 50_000_000],
  Mikro_Lv4: [50_000_000, 100_000_000],
  Mikro_Lv5: [100_000_000, 200_000_000],
  Kecil: [300_000_000, 1_000_000_000],
  Menengah: [1_000_000_000, 10_000_000_000],
};

export const calculateOmsetPercentage = (omset, skala) => {
  if (!omsetRanges[skala]) return 0.5;
  const [min, max] = omsetRanges[skala];
  return Math.min(Math.max((omset - min) / (max - min), 0), 1);
};

/**
 * Get skala encoding number dari skala usaha
 */
const skalaOrder = [
  "Mikro_Lv1",
  "Mikro_Lv2",
  "Mikro_Lv3",
  "Mikro_Lv4",
  "Mikro_Lv5",
  "Kecil",
  "Menengah",
];

export const getSkalaEncoding = (skala) => {
  return skalaOrder.indexOf(skala) || 0;
};

/**
 * Prepare data untuk API call
 */
export const prepareDataForPrediction = (formData) => {
  const {
    sektor_usaha,
    kapanewon,
    skala_usaha,
    omset,
    tenaga_kerja_total,
    rasio_perempuan,
    is_urban,
    umur_usaha,
  } = formData;

  return {
    sektor_usaha,
    kapanewon,
    skala_usaha,
    skala_enc: getSkalaEncoding(skala_usaha),
    log_omset: Math.log1p(omset),
    omset_pct_dalam_skala: calculateOmsetPercentage(omset, skala_usaha),
    tenaga_kerja_total: parseInt(tenaga_kerja_total),
    rasio_perempuan: parseFloat(rasio_perempuan),
    is_urban: parseInt(is_urban),
    umur_usaha: parseInt(umur_usaha),
  };
};

/**
 * Generate recommendation text dari prediction result
 */
export const generateRecommendation = (prediction) => {
  if (prediction.prediksi_go_online === 1) {
    return {
      status: "Siap Go-Online",
      title: "UMKM Anda memiliki potensi tinggi untuk digitalisasi!",
      description:
        "Berdasarkan profil bisnis Anda, kami merekomendasikan untuk segera memulai transisi digital dengan fokus pada integrasi website dan social media presence.",
      color: "success",
    };
  } else {
    return {
      status: "Perlu Persiapan",
      title: "Perlu langkah persiapan sebelum go-online",
      description:
        "Kami merekomendasikan untuk memulai dari WhatsApp Business terlebih dahulu, kemudian bertahap menuju website penjualan.",
      color: "warning",
    };
  }
};
