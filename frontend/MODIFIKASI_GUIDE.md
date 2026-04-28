# 🛠️ Panduan Modifikasi Kode di VSCode

Ini adalah guide lengkap bagaimana memodifikasi kode yang sudah gw buat agar sesuai dengan kebutuhan kamu.

---

## 💡 Filosofi Kode

Kode ini didesain dengan prinsip:
1. **Modular** - Setiap file punya tanggung jawab spesifik
2. **Reusable** - Components bisa dipakai berkali-kali
3. **Readable** - Mudah dimengerti dan dimodifikasi
4. **Commented** - Ada penjelasan di setiap fungsi penting

---

## 🎯 Skenario Modifikasi Umum

### Skenario 1: Tambah Field Baru di Form

**Situasi:** Kamu mau tambah field "alamat_usaha" di form input

**File yang diubah:**
1. `components/UMKMForm.js`
2. `utils/helpers.js`
3. `.env.local` (optional, kalau perlu simpan di API)

**Step by step:**

**STEP 1: Edit `components/UMKMForm.js`**

Cari section `useState`:
```javascript
const [formData, setFormData] = useState({
    nama_usaha: '',
    sektor_usaha: SEKTOR_OPTIONS[0],
    kapanewon: KAPANEWON_OPTIONS[0],
    // TAMBAH FIELD INI:
    alamat_usaha: '',  // <-- FIELD BARU
    // ... field lainnya
});
```

Kemudian scroll ke bawah, cari di section `return`, dan copy-paste pattern field lain:

```javascript
{/* Alamat Usaha */}
<div>
  <label htmlFor="alamat_usaha" className="block text-sm font-medium text-gray-700 mb-2">
    Alamat Usaha
  </label>
  <textarea
    id="alamat_usaha"
    name="alamat_usaha"
    value={formData.alamat_usaha}
    onChange={handleChange}
    placeholder="Jl. Contoh No. 123, Sleman"
    className="input-field"
    rows="3"
  />
</div>
```

**STEP 2: Edit `utils/helpers.js`**

Cari function `prepareDataForPrediction`:
```javascript
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
    // TAMBAH INI:
    alamat_usaha,  // <-- FIELD BARU
  } = formData;

  return {
    sektor_usaha,
    kapanewon,
    skala_enc: getSkalaEncoding(skala_usaha),
    log_omset: Math.log1p(omset),
    // ... field lainnya
    // TAMBAH INI:
    alamat_usaha,  // <-- Kalau mau dikirim ke API
  };
};
```

**Done!** Field baru sudah siap. 🎉

---

### Skenario 2: Ubah Warna dan Design

**Situasi:** Kamu mau ubah warna utama dari biru ke ungu (purple)

**File yang diubah:** `tailwind.config.js` dan `styles/globals.css`

**Step 1: Ubah di `tailwind.config.js`**
```javascript
theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',      // Changed dari #3B82F6 (blue) ke #8B5CF6 (purple)
        secondary: '#1F2937',
        success: '#10B981',
        danger: '#EF4444',
      }
    },
},
```

**Step 2: Verifikasi di component**

Semua button/link yang pake class `btn-primary` atau `bg-primary` akan otomatis berubah warna.

Kalau ada warna yang hardcode (tidak pake `primary` class), cari dan ganti manual:
```javascript
// SEBELUM:
<button className="bg-blue-600">Click</button>

// SESUDAH:
<button className="bg-purple-600">Click</button>
```

**Tips:** Lihat color palette Tailwind di: https://tailwindcss.com/docs/customizing-colors

---

### Skenario 3: Ubah Pesan dan Text

**Situasi:** Kamu mau ubah pesan rekomendasi berdasarkan prediction

**File yang diubah:** `utils/helpers.js`

Cari function `generateRecommendation`:
```javascript
export const generateRecommendation = (prediction) => {
  if (prediction.prediksi_go_online === 1) {
    return {
      status: "Siap Go-Online 🚀",  // Ubah text ini
      title: "UMKM Anda memiliki potensi tinggi untuk digitalisasi!",  // Ubah
      description: "Berdasarkan profil bisnis Anda, kami merekomendasikan untuk segera memulai transisi digital dengan fokus pada integrasi website dan social media presence.",  // Ubah
      color: "success"
    };
  } else {
    return {
      status: "Perlu Persiapan 📚",  // Ubah text ini
      title: "Perlu langkah persiapan sebelum go-online",  // Ubah
      description: "Kami merekomendasikan untuk memulai dari WhatsApp Business terlebih dahulu, kemudian bertahap menuju website penjualan.",  // Ubah
      color: "warning"
    };
  }
};
```

**Simple, kan?** Tinggal edit text yang ada di return object. ✨

---

### Skenario 4: Tambah Section Baru di Website Auto-Generated

**Situasi:** Kamu mau tambah section "Testimonial" di website generated

**File yang diubah:** `components/GeneratedWebsite.js`

**Step 1: Tambah navigation tab**

Cari section `Navigation Tabs`, tambah:
```javascript
<button
  onClick={() => setActiveTab('testimonial')}
  className={`py-4 font-semibold border-b-2 transition-colors ${
    activeTab === 'testimonial'
      ? 'border-primary text-primary'
      : 'border-transparent text-gray-600 hover:text-gray-800'
  }`}
>
  ⭐ Testimonial
</button>
```

**Step 2: Tambah content untuk tab**

Di section content, tambah sebelum closing `</main>`:
```javascript
{/* Testimonial Tab */}
{activeTab === 'testimonial' && (
  <div>
    <h2 className="section-title">Testimoni Pelanggan</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">😊</div>
          <div>
            <h4 className="font-bold">Nama Pelanggan 1</h4>
            <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</p>
          </div>
        </div>
        <p className="text-gray-600">
          "Produk berkualitas dan pelayanan cepat. Highly recommended!"
        </p>
      </div>
      <div className="card">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">😊</div>
          <div>
            <h4 className="font-bold">Nama Pelanggan 2</h4>
            <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</p>
          </div>
        </div>
        <p className="text-gray-600">
          "Puas dengan kualitas dan harganya. Pasti beli lagi!"
        </p>
      </div>
    </div>
  </div>
)}
```

**Done!** Section testimonial sudah bisa diakses. 🌟

---

## 🔍 Tips Debugging

### Tip 1: Gunakan Console.log

Kalau ada yang error atau tidak jalan sesuai ekspektasi, tambah `console.log` untuk debug:

```javascript
const handleFormSubmit = async (formData, name) => {
    console.log('📋 Form data yang dikirim:', formData);  // DEBUG
    setIsLoading(true);
    
    const result = await predictUMKM(formData);
    console.log('🎯 Hasil dari API:', result);  // DEBUG
    
    // ... rest of code
};
```

Buka DevTools browser (F12 → Console tab) untuk lihat apa yang di-log.

### Tip 2: Check Network Request

Kalau API tidak merespons:
1. Buka DevTools (F12)
2. Tab "Network"
3. Cek request ke `/predict`
4. Lihat "Response" untuk error message

### Tip 3: Cek .env.local

Pastikan Azure API URL benar:
```bash
# Di .env.local, pastikan:
NEXT_PUBLIC_AZURE_API_URL=https://api-umkm-sleman-2026-euhcecfvdvgrexft.indonesiacentral-01.azurewebsites.net

# JANGAN lupa restart dev server (Ctrl+C terus npm run dev lagi)
```

---

## 🎓 Belajar Pattern di Kode

### Pattern 1: Form Component (UMKMForm.js)

Pattern form yang baik:
```javascript
// 1. State untuk store data form
const [formData, setFormData] = useState({...});

// 2. State untuk store error
const [errors, setErrors] = useState({});

// 3. Handle change input
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({...}));
};

// 4. Validate sebelum submit
const validateForm = () => {
  // Check each field
  // Return boolean
};

// 5. Handle submit
const handleSubmit = (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  // Call API atau callback
};
```

**Kalau bikin form baru, ikuti pattern ini!**

### Pattern 2: API Call (utils/api.js)

Pattern API yang aman:
```javascript
export const predictUMKM = async (data) => {
  try {
    const response = await apiClient.post('/predict', data);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    // Handle error dengan proper message
    return {
      success: false,
      error: error.response?.data?.message || 'Default error message',
      status: error.response?.status
    };
  }
};
```

**Selalu return object dengan `{ success, data/error }` untuk consistent handling!**

### Pattern 3: Component Props

Setiap component punya JSDoc di atas untuk dokumentasi:
```javascript
/**
 * Form Component untuk input data UMKM
 * Props:
 *   - onSubmit: callback ketika form di-submit
 *   - isLoading: status loading API call
 */
export default function UMKMForm({ onSubmit, isLoading = false }) {
  // ... component code
}
```

**Sebelum bikin component baru, tulis JSDoc terlebih dahulu!**

---

## 📂 File Organization Best Practice

Jangan taruh semua code di 1 file. Ikuti struktur ini:

```
pages/           → Halaman full (route)
components/      → Reusable components
utils/           → Helper functions & services
styles/          → CSS & styling
public/          → Static files
```

**Example:**
- Kalau bikin form, taruh di `components/`
- Kalau bikin utility function, taruh di `utils/`
- Jangan mix concerns!

---

## 🚀 Workflow Modifikasi Optimal

1. **Identify**: Cari file mana yang perlu diubah
2. **Understand**: Baca kode yang ada, pahami flow-nya
3. **Modify**: Edit sesuai kebutuhan (ikuti pattern yang ada)
4. **Test**: Jalankan `npm run dev` dan test di browser
5. **Debug**: Kalau ada error, gunakan console.log & DevTools
6. **Commit**: Commit ke GitHub kalau selesai

---

## 🎯 Checkpoints untuk Cek Kode

Sebelum commit, cek:
- ✅ Kode berjalan tanpa error (buka console)
- ✅ Styling terlihat OK di desktop dan mobile (F12 → toggle device toolbar)
- ✅ API call berhasil (check Network tab)
- ✅ Form validation berfungsi (test dengan data invalid)
- ✅ Tidak ada typo atau hardcoded value

---

## 💬 Contoh Real-World Modification

### Contoh: Ganti Sektor dari 3 menjadi 5

**Sebelum:**
```javascript
const SEKTOR_OPTIONS = ['Perdagangan', 'Jasa', 'Industri'];
```

**Sesudah:**
```javascript
const SEKTOR_OPTIONS = [
  'Perdagangan', 
  'Jasa', 
  'Industri',
  'Pertanian',      // NEW
  'Kerajinan'       // NEW
];
```

**Itu aja!** Select dropdown akan otomatis punya 5 pilihan. ✨

---

## 🔗 Resources untuk Belajar Lebih Lanjut

1. **React Hooks**: https://react.dev/reference/react
2. **Next.js**: https://nextjs.org/docs
3. **Tailwind CSS**: https://tailwindcss.com/docs
4. **JavaScript Async/Await**: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises

---

## ❓ FAQ Modifikasi

**Q: Bagaimana cara nambahin field di database?**
A: Field form dan API adalah 2 hal terpisah. Field form tinggal edit di `UMKMForm.js`, tapi kalau mau simpan ke database, butuh database schema yang berbeda (tidak gw cover di kode ini).

**Q: Bagaimana cara ganti logo/gambar?**
A: Taruh image di folder `public/`, kemudian reference di component:
```javascript
<img src="/my-logo.png" alt="Logo" />
```

**Q: Gimana cara styling component baru?**
A: Gunakan Tailwind classes. Contoh:
```javascript
<div className="bg-white rounded-lg shadow-md p-6">
  {/* Styling: white bg, rounded corners, shadow, padding */}
</div>
```

---

Happy coding! Jangan ragu tanya kalau ada yang bingung. 🚀
