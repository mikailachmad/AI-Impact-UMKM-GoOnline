# 🚀 LapaKita Frontend - Next.js

Platform AI-powered untuk digitalisasi UMKM Sleman

## 📁 Struktur Folder (Simplified)

```
frontend/
├── pages/
│   ├── _app.js              # Global setup React
│   └── index.js             # Main dashboard page
├── components/
│   ├── UMKMForm.js          # Form input data UMKM (PALING PENTING - banyak fields)
│   ├── PredictionResult.js  # Tampil hasil prediksi
│   └── GeneratedWebsite.js  # Website auto-generate untuk UMKM
├── utils/
│   ├── api.js               # Fungsi call Azure API
│   └── helpers.js           # Helper functions (format, calculation, etc)
├── styles/
│   └── globals.css          # Global styling + Tailwind
├── public/                  # Static files (image, icon, etc)
├── .env.local               # Environment variables (URL Azure API)
├── package.json             # Dependencies
├── next.config.js           # Next.js config
├── tailwind.config.js       # Tailwind CSS config
└── postcss.config.js        # PostCSS config
```

## 🎯 Tips Modifikasi di VSCode

### 1. **Ubah Form Input Fields**
File: `components/UMKMForm.js`

Kalau mau tambah/kurang field:
```javascript
// Cari section ini di dalam component:
const [formData, setFormData] = useState({
    nama_usaha: '',
    sektor_usaha: SEKTOR_OPTIONS[0],
    // Tambah field baru di sini
    field_baru: 'default_value',
});

// Dan copy pattern dari field yang sudah ada:
<div>
  <label htmlFor="field_baru">Label Field</label>
  <input
    type="text"
    id="field_baru"
    name="field_baru"
    value={formData.field_baru}
    onChange={handleChange}
    className="input-field"
  />
</div>
```

**Tips:** Setiap field yang ditambah di form harus:
- Ada di state `formData`
- Ada di HTML input dengan `name` attribute yang sesuai
- Ada di validation (jika perlu) di `validateForm()` function
- Ada di `prepareDataForPrediction()` di `utils/helpers.js` kalau mau dikirim ke API

---

### 2. **Ubah Styling/Warna**
File: `tailwind.config.js`

```javascript
theme: {
    extend: {
      colors: {
        primary: '#3B82F6',      // Ubah warna utama
        secondary: '#1F2937',     // Ubah warna secondary
        success: '#10B981',
        danger: '#EF4444',
      }
    },
},
```

Atau langsung di HTML dengan class Tailwind:
```javascript
// Ganti:
<button className="bg-primary">Button</button>

// Dengan:
<button className="bg-red-500">Button</button>
// Lihat: https://tailwindcss.com/docs/customizing-colors
```

---

### 3. **Ubah Text/Copy**
File: `pages/index.js` dan component-component lainnya

Cari bagian text yang mau diubah dan edit langsung:
```javascript
<p>Isi text di sini, bisa langsung diubah</p>
```

---

### 4. **Ubah Struktur Website Auto-Generated**
File: `components/GeneratedWebsite.js`

Di sini ada sample products dan template website. Bisa:
- Ubah sample products list
- Tambah section baru (misalnya "Testimoni", "Blog", etc)
- Ubah tab navigation
- Ubah checkout process

---

### 5. **Ubah Pesan Rekomendasi**
File: `utils/helpers.js` - function `generateRecommendation()`

```javascript
export const generateRecommendation = (prediction) => {
  if (prediction.prediksi_go_online === 1) {
    return {
      status: "Siap Go-Online 🚀",
      title: "UBAH TEXT INI",
      description: "UBAH TEXT INI",
      color: "success"
    };
  } else {
    return {
      status: "Perlu Persiapan 📚",
      title: "UBAH TEXT INI",
      description: "UBAH TEXT INI",
      color: "warning"
    };
  }
};
```

---

### 6. **Ubah Azure API URL**
File: `.env.local`

```
NEXT_PUBLIC_AZURE_API_URL=https://ganti-dengan-url-azure-kamu.azurewebsites.net
```

---

## 🔧 Setup & Running

### 1. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 2. Run Development Server
```bash
npm run dev
# atau
yarn dev
```

Akses di: `http://localhost:3000`

### 3. Build untuk Production
```bash
npm run build
npm start
```

---

## 🌐 Deploy ke Vercel

### Option 1: Via GitHub (Recommended)
1. Push code ke GitHub repository
2. Login ke https://vercel.com
3. Import project dari GitHub
4. Set environment variable `.env.local` di Vercel dashboard
5. Deploy! 🚀

### Option 2: Manual via CLI
```bash
npm install -g vercel
vercel
```

---

## 📚 File-by-File Breakdown

| File | Purpose | Modifikasi Untuk |
|------|---------|-------------------|
| `pages/index.js` | Main dashboard | Ubah layout, tambah section baru |
| `components/UMKMForm.js` | Form input | Tambah/kurang field, validasi |
| `components/PredictionResult.js` | Result display | Ubah tampilan hasil prediksi |
| `components/GeneratedWebsite.js` | Auto-generated website | Ubah template website, fitur |
| `utils/api.js` | API calls | Error handling, request/response |
| `utils/helpers.js` | Helper functions | Format data, calculation, recommendation |
| `styles/globals.css` | Global styling | Custom CSS, Tailwind components |
| `.env.local` | Environment vars | Azure API URL |

---

## 🐛 Debugging Tips

### 1. Check Console Browser
- Buka DevTools (F12)
- Tab "Console" untuk lihat error
- Tab "Network" untuk lihat API request/response

### 2. Check Network Request
- DevTools → Network tab
- Cari request ke `/predict`
- Lihat Response untuk error message dari API

### 3. Add Console.log
```javascript
const handleFormSubmit = async (formData, name) => {
    console.log('Form data:', formData); // DEBUG
    const result = await predictUMKM(formData);
    console.log('API result:', result);  // DEBUG
};
```

### 4. Cek .env.local
Pastikan `NEXT_PUBLIC_AZURE_API_URL` sudah benar:
```javascript
// Di utils/api.js, tambah:
console.log('API URL:', process.env.NEXT_PUBLIC_AZURE_API_URL);
```

---

## 📖 Learning Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hooks**: https://react.dev/reference/react
- **JavaScript Fetch/Axios**: https://axios-http.com/

---

## ✨ Next Features (Untuk Nanti)

- [ ] User authentication (login/register)
- [ ] Save hasil prediksi ke database
- [ ] Download website report PDF
- [ ] Integration payment gateway (Midtrans, Doku, etc)
- [ ] Analytics dashboard
- [ ] Mobile app version

---

## 📞 Support

Tanya aja kalau ada yang bingung! Saya siap help debug dan modifikasi kode.

Happy coding! 🎉
