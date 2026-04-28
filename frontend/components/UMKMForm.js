import { useState } from "react";
import { prepareDataForPrediction } from "../utils/helpers";

const SEKTOR_OPTIONS = ["Perdagangan", "Jasa", "Agribisnis"];
const KAPANEWON_OPTIONS = [
  "Gamping",
  "Godean",
  "Moyudan",
  "Minggir",
  "Seyegan",
  "Mlati",
  "Depok",
  "Berbah",
  "Prambanan",
  "Kalasan",
  "Ngemplak",
  "Ngaglik",
  "Sleman",
  "Tempel",
  "Turi",
  "Pakem",
  "Cangkringan",
];
const SKALA_OPTIONS = [
  "Mikro_Lv1",
  "Mikro_Lv2",
  "Mikro_Lv3",
  "Mikro_Lv4",
  "Mikro_Lv5",
  "Kecil",
  "Menengah",
];

/**
 * Form Component untuk input data UMKM
 * Props:
 *   - onSubmit: callback ketika form di-submit
 *   - isLoading: status loading API call
 */
export default function UMKMForm({ onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState({
    nama_usaha: "",
    sektor_usaha: "",
    kapanewon: "",
    skala_usaha: "",
    omset: "",
    tenaga_kerja_total: "",
    rasio_perempuan: "",
    is_urban: "",
    umur_usaha: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));

    // Clear error untuk field ini
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama_usaha.trim())
      newErrors.nama_usaha = "Nama usaha harus diisi";
    if (formData.omset <= 0) newErrors.omset = "Omset harus lebih dari 0";
    if (formData.tenaga_kerja_total < 1)
      newErrors.tenaga_kerja_total = "Minimal 1 tenaga kerja";
    if (formData.rasio_perempuan < 0 || formData.rasio_perempuan > 1) {
      newErrors.rasio_perempuan = "Rasio harus antara 0-1";
    }
    if (formData.umur_usaha < 1)
      newErrors.umur_usaha = "Umur usaha minimal 1 tahun";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataForPrediction = prepareDataForPrediction(formData);
    onSubmit(dataForPrediction, formData.nama_usaha);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="section-title">Data Profil UMKM</h2>

      {/* Nama Usaha */}
      <div>
        <label
          htmlFor="nama_usaha"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nama Usaha
        </label>
        <input
          type="text"
          id="nama_usaha"
          name="nama_usaha"
          value={formData.nama_usaha}
          onChange={handleChange}
          placeholder="Contoh: Toko Kue Manis Jaya"
          className={`input-field ${errors.nama_usaha ? "border-danger" : ""}`}
        />
        {errors.nama_usaha && (
          <p className="text-danger text-sm mt-1">{errors.nama_usaha}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sektor Usaha */}
        <div>
          <label
            htmlFor="sektor_usaha"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sektor Usaha
          </label>
          <select
            id="sektor_usaha"
            name="sektor_usaha"
            value={formData.sektor_usaha}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Pilih</option>

            {SEKTOR_OPTIONS.map((sektor) => (
              <option key={sektor} value={sektor}>
                {sektor}
              </option>
            ))}
          </select>
        </div>

        {/* Kapanewon */}
        <div>
          <label
            htmlFor="kapanewon"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Kapanewon
          </label>
          <select
            id="kapanewon"
            name="kapanewon"
            value={formData.kapanewon}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Pilih</option>

            {KAPANEWON_OPTIONS.map((kap) => (
              <option key={kap} value={kap}>
                {kap}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skala Usaha */}
        <div>
          <label
            htmlFor="skala_usaha"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Skala Usaha
          </label>
          <select
            id="skala_usaha"
            name="skala_usaha"
            value={formData.skala_usaha}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Pilih</option>
            {SKALA_OPTIONS.map((skala) => (
              <option key={skala} value={skala}>
                {skala}
              </option>
            ))}
          </select>
        </div>

        {/* Omset Tahunan */}
        <div>
          <label
            htmlFor="omset"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Omset Tahunan (Rp)
          </label>
          <input
            type="number"
            id="omset"
            name="omset"
            value={formData.omset}
            onChange={handleChange}
            min="0"
            step="1000000"
            className={`input-field ${errors.omset ? "border-danger" : ""}`}
          />
          {errors.omset && (
            <p className="text-danger text-sm mt-1">{errors.omset}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tenaga Kerja */}
        <div>
          <label
            htmlFor="tenaga_kerja_total"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Jumlah Tenaga Kerja
          </label>
          <input
            type="number"
            id="tenaga_kerja_total"
            name="tenaga_kerja_total"
            value={formData.tenaga_kerja_total}
            onChange={handleChange}
            min="1"
            className={`input-field ${errors.tenaga_kerja_total ? "border-danger" : ""}`}
          />
          {errors.tenaga_kerja_total && (
            <p className="text-danger text-sm mt-1">
              {errors.tenaga_kerja_total}
            </p>
          )}
        </div>

        {/* Rasio Perempuan */}
        <div>
          <label
            htmlFor="rasio_perempuan"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Rasio Perempuan (0-1)
          </label>
          <input
            type="number"
            id="rasio_perempuan"
            name="rasio_perempuan"
            value={formData.rasio_perempuan}
            onChange={handleChange}
            min="0"
            max="1"
            step="0.1"
            className={`input-field ${errors.rasio_perempuan ? "border-danger" : ""}`}
          />
          {errors.rasio_perempuan && (
            <p className="text-danger text-sm mt-1">{errors.rasio_perempuan}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Urban/Rural */}
        <div>
          <label
            htmlFor="is_urban"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Lokasi
          </label>
          <select
            id="is_urban"
            name="is_urban"
            value={formData.is_urban}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Pilih</option>
            <option value={1}>Perkotaan</option>
            <option value={0}>Pedesaan</option>
          </select>
        </div>

        {/* Umur Usaha */}
        <div>
          <label
            htmlFor="umur_usaha"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Umur Usaha (Tahun)
          </label>
          <input
            type="number"
            id="umur_usaha"
            name="umur_usaha"
            value={formData.umur_usaha}
            onChange={handleChange}
            min="1"
            className={`input-field ${errors.umur_usaha ? "border-danger" : ""}`}
          />
          {errors.umur_usaha && (
            <p className="text-danger text-sm mt-1">{errors.umur_usaha}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full btn-primary ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Sedang Memproses..." : "Analisis Kesiapan Digital"}
      </button>
    </form>
  );
}
