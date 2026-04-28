import { generateRecommendation, formatCurrency } from "../utils/helpers";

/**
 * Component untuk menampilkan hasil prediksi kesiapan digital
 * Props:
 *   - result: object hasil prediksi dari API
 *   - umkmName: nama UMKM untuk ditampilkan
 *   - onGenerateWebsite: callback untuk generate website
 */
export default function PredictionResult({
  result,
  umkmName,
  onGenerateWebsite,
  onReset,
}) {
  if (!result) return null;

  // Debug: lihat apa yang ada di result
  console.log("Result object:", result);
  console.log("Probabilitas:", result.probabilitas_persen);

  const recommendation = generateRecommendation(result);
  const successColor =
    result.prediksi_go_online === 1
      ? "bg-green-100 border-green-300"
      : "bg-yellow-100 border-yellow-300";
  const textColor =
    result.prediksi_go_online === 1 ? "text-green-800" : "text-orange-600";

  return (
    <div className={`card border-2 ${successColor} mt-8`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Hasil Analisis</h3>
          <p className="text-gray-600 text-sm">UMKM: {umkmName}</p>
        </div>
        <div className="text-right">
          <div className={`text-5xl font-bold ${textColor}`}>
            {result.probabilitas_persen}
          </div>
          <div className={`text-lg font-semibold ${textColor}`}>%</div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-white rounded-lg">
        <h4 className={`text-lg font-bold mb-2 ${textColor}`}>
          {recommendation.status}
        </h4>
        <p className="text-gray-700 font-semibold mb-2">
          {recommendation.title}
        </p>
        <p className="text-gray-600 text-sm">{recommendation.description}</p>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-semibold text-gray-700">Status Prediksi:</span>
          <span
            className={`px-4 py-1 rounded-full font-semibold text-white ${
              result.prediksi_go_online === 1 ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            {result.prediksi_go_online === 1
              ? "Siap Go-Online"
              : "Perlu Persiapan"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-700">
            Tingkat Kepercayaan:
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                result.prediksi_go_online === 1
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
              style={{ width: `${result.probabilitas_persen}%` }}
            />
          </div>
        </div>
      </div>

      {/* Detailed Info */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <h5 className="font-semibold text-gray-800 mb-3">Insight Penting:</h5>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            • Probabilitas kesiapan digital:{" "}
            <strong>{result.probabilitas_persen}%</strong>
          </li>
          <li>
            • Rekomendasi fokus awal: <strong>{result.rekomendasi}</strong>
          </li>
          <li>• Analisis berdasarkan ML model dengan akurasi 92.6%</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {result.prediksi_go_online === 1 && (
          <button onClick={onGenerateWebsite} className="flex-1 btn-primary">
            Buat Website Sekarang
          </button>
        )}
        <button onClick={onReset} className="flex-1 btn-secondary">
          ← Analisis Ulang
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>Catatan:</strong> Hasil analisis ini berdasarkan model machine
          learning yang dilatih dengan data 5000 UMKM di Sleman. Semakin lengkap
          data yang Anda isi, semakin akurat prediksi ini.
        </p>
      </div>
    </div>
  );
}
