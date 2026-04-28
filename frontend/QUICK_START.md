# ⚡ QUICK START - Setup Next.js LapaKita di GitHub Kamu

Follow langkah-langkah ini untuk setup project Next.js yang sudah gw buat.

---

## 📋 Checklist Sebelum Mulai

- [ ] Sudah install Node.js (v16+) - cek dengan `node --version`
- [ ] Sudah punya Git di laptop - cek dengan `git --version`
- [ ] Sudah fork/clone repository dari GitHub
- [ ] Sudah buka folder project di VSCode

---

## 🚀 Step 1: Setup Awal (5 menit)

### 1.1 Buka terminal di VSCode
```
Ctrl + ` (backtick) atau Ctrl + Shift + `
```

### 1.2 Extract file dari output folder ke /frontend
Gw udah buat file lengkap di outputs folder. Copy ke folder `/frontend`:

```bash
# Pastikan kamu di root project directory
cd D:/Kuliah/Kompetisi/Datathon\ Dicoding/your-repo-name

# Kalau folder /frontend belum ada, buat:
mkdir frontend

# Copy semua file Next.js ke folder frontend:
# (Gunakan file manager atau drag-drop dari output folder)
```

### 1.3 Install Dependencies
```bash
cd frontend
npm install
```

Tunggu sampai selesai (first time bisa 3-5 menit).

### 1.4 Cek .env.local
Buka file `frontend/.env.local`:
```
NEXT_PUBLIC_AZURE_API_URL=https://api-umkm-sleman-2026-euhcecfvdvgrexft.indonesiacentral-01.azurewebsites.net
```

**Pastikan URL sesuai dengan Azure API kamu!**

---

## 🏃 Step 2: Run Development Server (2 menit)

```bash
# Pastikan kamu di dalam folder frontend/
cd frontend

# Run dev server
npm run dev
```

Output akan seperti:
```
> lapakita-frontend@0.1.0 dev
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Buka Browser
Akses: **http://localhost:3000**

Kamu akan lihat:
- Hero section dengan LapaKita branding
- Form input UMKM di sebelah kiri
- Section fitur di bawah

Selamat! 🎉 Server sudah running!

---

## 🛠️ Step 3: Modifikasi Pertama Kamu

### 3.1 Ubah Judul
File: `frontend/pages/index.js` (baris ~30)

```javascript
<h1 className="text-4xl font-bold mb-4">LapaKita 🚀</h1>
```

Ubah ke:
```javascript
<h1 className="text-4xl font-bold mb-4">LapaKita Sleman 🚀</h1>
```

**Save** → Browser otomatis reload. Lihat judul berubah!

### 3.2 Ubah Warna Primary
File: `frontend/tailwind.config.js` (baris ~8)

```javascript
primary: '#3B82F6',  // Biru
```

Ubah ke:
```javascript
primary: '#EF4444',  // Merah
```

**Save** → Semua button dan accent color berubah! ✨

---

## 🧪 Step 4: Test Form & API

### 4.1 Isi Form
1. Nama Usaha: "Toko Aku"
2. Sektor: "Perdagangan"
3. Kapanewon: "Depok"
4. Skala: "Mikro_Lv2"
5. Omset: 15000000
6. Tenaga Kerja: 3
7. Rasio Perempuan: 0.5
8. Lokasi: "Perkotaan"
9. Umur Usaha: 5

### 4.2 Click "Analisis Kesiapan Digital"
Tunggu sebentar...

**Kalau berhasil:** Kamu akan lihat result card dengan probability dan rekomendasi

**Kalau error:** Cek di Browser DevTools (F12 → Console tab) untuk error message

---

## 📁 Struktur Folder

Setelah extract, struktur folder `/frontend` akan seperti ini:

```
frontend/
├── components/
│   ├── UMKMForm.js           ← Form input (PENTING)
│   ├── PredictionResult.js    ← Tampil hasil
│   └── GeneratedWebsite.js    ← Auto-generated website
├── pages/
│   ├── _app.js               ← Global setup
│   └── index.js              ← Main page (PENTING)
├── utils/
│   ├── api.js                ← API calls
│   └── helpers.js            ← Helper functions
├── styles/
│   └── globals.css           ← Global styles
├── public/                   ← Static files
├── package.json              ← Dependencies list
├── next.config.js            ← Next.js config
├── tailwind.config.js        ← Tailwind config (PENTING)
├── .env.local                ← Environment vars (PENTING)
├── .gitignore                ← Git ignore
└── README.md                 ← Full documentation
```

---

## 📝 File yang Paling Sering Dimodifikasi

| File | Untuk Apa | Difficulty |
|------|----------|------------|
| `pages/index.js` | Ubah layout, text, sections | ⭐ Easy |
| `components/UMKMForm.js` | Tambah/kurang form fields | ⭐ Easy |
| `tailwind.config.js` | Ubah warna dan styling | ⭐ Easy |
| `components/GeneratedWebsite.js` | Ubah template website generated | ⭐⭐ Medium |
| `utils/helpers.js` | Ubah logika rekomendasi | ⭐⭐ Medium |
| `utils/api.js` | Ubah API handling | ⭐⭐⭐ Hard |

**Mulai dari yang "Easy" dulu!**

---

## 🐛 Troubleshooting

### Problem: "Cannot find module..."
**Solution:**
```bash
# Hapus folder node_modules dan reinstall
rm -rf node_modules
npm install
```

### Problem: "Port 3000 already in use"
**Solution:**
```bash
# Gunakan port lain
npm run dev -- -p 3001
```

### Problem: "API request failed"
**Solution:**
1. Cek `.env.local` - pastikan URL benar
2. Cek Azure API masih running (akses URL di browser)
3. Lihat error message di browser Console (F12)

### Problem: "Styling tidak muncul (Tailwind not working)"
**Solution:**
```bash
# Restart dev server
# Ctrl+C (stop) → npm run dev (start lagi)
```

---

## 🎯 Next Steps Setelah Setup

1. **Modifikasi Form** - Tambah/kurang fields sesuai kebutuhan
2. **Ubah Text & Copy** - Ganti judul, deskripsi, tombol
3. **Styling** - Ubah warna, font, layout
4. **Tambah Features** - Testimoni, FAQ section, dll
5. **Test & Debug** - Pastikan semua berjalan smooth
6. **Deploy ke Vercel** - Push ke GitHub, deploy otomatis

---

## 🌐 Deploy ke Vercel (Final Step)

### Via GitHub (Recommended)

1. **Push ke GitHub:**
```bash
git add .
git commit -m "Add Next.js frontend"
git push origin main
```

2. **Login ke Vercel:**
https://vercel.com

3. **Import Project:**
- Click "Add New..." → "Project"
- Select repository dari GitHub
- Click "Import"

4. **Set Environment Variables:**
- Click "Environment Variables"
- Add: `NEXT_PUBLIC_AZURE_API_URL` = `https://api-umkm-sleman-2026-...`
- Click "Deploy"

**Done!** Website kamu live di `https://your-project.vercel.app`

---

## 📚 Full Documentation

Baca file ini untuk penjelasan detail:
- `README.md` - Overview struktur
- `MODIFIKASI_GUIDE.md` - Panduan modifikasi lengkap

---

## 🚨 Important Notes

⚠️ **Sebelum deploy ke production:**
- Test form validation
- Test API integration
- Test di mobile (F12 → toggle device toolbar)
- Cek semua link dan button berfungsi
- Remove console.log debug code

---

## 💬 Butuh Bantuan?

Kalau ada yang stuck:
1. **Baca README.md** - mungkin udah ada jawabannya
2. **Cek MODIFIKASI_GUIDE.md** - ada contoh-contoh konkret
3. **Tanya di console** - buka browser DevTools (F12)
4. **Tanya ke saya** - jangan ragu!

---

**Happy coding! 🎉**

Semoga bisa smooth setup-nya. Report hasilnya ya!
