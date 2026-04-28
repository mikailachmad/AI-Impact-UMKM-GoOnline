# 🚀 Deploy LapaKita ke Vercel - Step by Step

Panduan ini untuk deploy aplikasi Next.js kamu dari localhost ke production di Vercel dengan custom domain.

---

## 📋 Persiapan (5 menit)

### ✅ Checklist:
- [ ] Sudah punya GitHub account
- [ ] Repository sudah di-push ke GitHub
- [ ] Folder `/frontend` sudah ada di repository
- [ ] Sudah install Git di laptop
- [ ] Sudah punya custom domain (atau pakai domain gratis dari Vercel)

---

## 🔧 Step 1: Push Kode ke GitHub (5 menit)

### 1.1 Buka Terminal di VSCode
```
Ctrl + ` (backtick)
```

### 1.2 Masuk ke root folder project
```bash
cd D:/Kuliah/Kompetisi/Datathon\ Dicoding/your-repo-name
# Atau sesuaikan path kamu
```

### 1.3 Cek status Git
```bash
git status
```

Output akan menunjukkan file yang belum di-commit.

### 1.4 Add semua file
```bash
git add .
```

### 1.5 Commit dengan message
```bash
git commit -m "Add Next.js frontend - LapaKita"
```

### 1.6 Push ke GitHub
```bash
git push origin main
```

**Tunggu sampai selesai!** Output akan terlihat:
```
Counting objects: 150
Compressing objects: 100%
Writing objects: 100%
remote: Resolving deltas: 100%
...
main -> main
```

✅ **Kode sudah di GitHub!**

---

## 🌐 Step 2: Setup Vercel Account (3 menit)

### 2.1 Buka https://vercel.com
Klik **"Sign Up"**

### 2.2 Pilih login dengan GitHub
- Klik "Continue with GitHub"
- Authorize Vercel untuk akses repository GitHub kamu

### 2.3 Done!
Kamu sudah punya Vercel account 🎉

---

## 📦 Step 3: Import Project ke Vercel (5 menit)

### 3.1 Di Vercel Dashboard, klik "Add New..."
Pilih **"Project"**

### 3.2 Klik "Import Git Repository"
Cari repository kamu yang baru di-push. Contoh: `your-username/lapakita` atau nama repo kamu.

**Klik tombol "Import"**

### 3.3 Configure Project

**Root Directory:**
```
Kalau struktur folder kamu:
├── frontend/
│   ├── package.json
│   └── pages/
├── README.md
└── (file lainnya)

Maka pilih: ./frontend
```

**Tapi kalau struktur-nya:**
```
├── package.json
├── pages/
└── (langsung Next.js files)

Maka biarkan default: ./
```

Lihat di screenshot untuk confirm!

### 3.4 Set Environment Variables

Klik "Environment Variables" atau ada field untuk `.env`:

**Tambahkan:**
```
NEXT_PUBLIC_AZURE_API_URL = https://api-umkm-sleman-2026-euhcecfvdvgrexft.indonesiacentral-01.azurewebsites.net
```

**Penting:** Ini sama seperti file `.env.local` kamu di VSCode.

### 3.5 Klik "Deploy"

**Status akan berubah:**
```
- Building...
- Installing dependencies...
- Building application...
- Generating static files...
- Deployed! ✅
```

Tunggu 2-3 menit sampai selesai.

---

## ✅ Step 4: Cek Website Live (2 menit)

### 4.1 Copy URL dari Vercel
Vercel akan kasih URL format: `https://your-project-name.vercel.app`

**Contoh:**
```
https://lapakita-frontend.vercel.app
```

### 4.2 Buka di Browser
Kunjungi URL tersebut dan cek:
- [ ] Form muncul
- [ ] Semua styling OK
- [ ] Bisa input data
- [ ] Bisa klik "Analisis"
- [ ] Bisa terkoneksi ke Azure API

**Kalau ada error:**
- Buka Vercel Dashboard → Logs
- Cari error message-nya
- Fix di VSCode → push ke GitHub → Vercel otomatis re-deploy

---

## 🌍 Step 5: Setup Custom Domain (10 menit)

### 5.1 Pilih Domain Kamu

**Option A: Beli domain baru** (recommended)
- Registrar: Namecheap, GoDaddy, Niagahoster, dll
- Harga: Rp 50rb - 200rb per tahun
- Contoh: `lapakita-sleman.com`

**Option B: Domain gratis dari Vercel**
- Vercel kasih subdomain gratis: `lapakita-frontend.vercel.app`
- Sudah live langsung, gak perlu setup apa-apa
- **SKIP ke Step 6 kalau milih ini**

### 5.2 Buka Domain Settings di Vercel

Di Vercel Dashboard project kamu:
1. Klik **"Settings"**
2. Klik **"Domains"** di sidebar kiri
3. Klik **"Add Domain"**

### 5.3 Input Domain Kamu
```
Contoh: lapakita-sleman.com
```

Klik **"Add"**

### 5.4 Vercel Kasih Nameserver
Vercel akan kasih **4 nameserver** (NS records):
```
ns1.vercel-dns.com
ns2.vercel-dns.com
ns3.vercel-dns.com
ns4.vercel-dns.com
```

**Copy ke notepad!**

### 5.5 Update Nameserver di Registrar Domain

Contoh pakai Namecheap:
1. Login ke Namecheap
2. Cari domain kamu di "My Domains"
3. Klik "Manage"
4. Di "Nameservers" section, pilih "Custom DNS"
5. Masukkan 4 nameserver dari Vercel
6. **Save Changes**

**Catatan:** Perubahan DNS butuh waktu 24 jam untuk fully propagate (tapi biasanya lebih cepat, 5-30 menit).

### 5.6 Tunggu DNS Propagate

Cek di Vercel apakah domain sudah verified:
- Buka Vercel Dashboard → Settings → Domains
- Status akan berubah dari "Pending" → "Valid Configuration"

**Setelah valid, coba akses:**
```
https://lapakita-sleman.com
```

---

## 🔐 Step 6: Setup SSL Certificate (Auto)

**Good news:** Vercel otomatis setup SSL (HTTPS) untuk setiap domain! 

Kamu gak perlu setup apa-apa, Vercel pake Let's Encrypt.

Cek di browser:
```
https://lapakita-sleman.com
↑ Ada lock icon = SSL aktif ✅
```

---

## 📝 Step 7: Update Azure API URL (Optional)

Kalau mau ganti URL di production:

### 7.1 Di Vercel Dashboard

Settings → Environment Variables

Update:
```
NEXT_PUBLIC_AZURE_API_URL = https://api-umkm-sleman-2026-euhcecfvdvgrexft.indonesiacentral-01.azurewebsites.net
```

### 7.2 Re-deploy

Klik "Redeploy" atau push code baru ke GitHub (Vercel otomatis deploy).

---

## 🚨 Troubleshooting

### Problem: "Build failed" di Vercel
**Solution:**
1. Buka Vercel Logs (Deployments tab)
2. Lihat error message
3. Fix di VSCode
4. `git push origin main`
5. Vercel otomatis re-deploy

### Problem: Domain tidak terkoneksi
**Solution:**
1. Tunggu 24 jam DNS propagate (max)
2. Cek di https://www.nslookup.io input domain kamu
3. Verify nameserver sudah update di registrar

### Problem: Form gak bisa submit / 502 error
**Solution:**
1. Check Azure API masih running
2. Verify NEXT_PUBLIC_AZURE_API_URL di Vercel environment
3. Check CORS settings di Azure (kalau perlu)

### Problem: Styling gak muncul (Tailwind CSS)
**Solution:**
- Vercel otomatis build Tailwind
- Coba "Redeploy without cache"
- Di Vercel Dashboard → Deployments → "..." → "Redeploy"

---

## ✨ Checklist Post-Deployment

- [ ] Website bisa diakses via custom domain
- [ ] Form bisa diisi
- [ ] Tombol "Analisis" berfungsi
- [ ] Hasil prediksi muncul
- [ ] Loading state bekerja
- [ ] Error handling berfungsi (coba submit tanpa isi)
- [ ] Mobile responsive (F12 → toggle device toolbar)
- [ ] Semua styling OK (warna, font, spacing)

---

## 📊 Monitoring & Logs

### Akses Logs di Vercel

Di Vercel Dashboard:
1. Klik project
2. Klik "Deployments" tab
3. Pilih deployment terbaru
4. Klik "Logs"

Di sini bisa lihat:
- Build logs (saat deploy)
- Runtime logs (saat user akses)
- Error messages
- Performance metrics

---

## 🔄 Auto-Deploy dari GitHub

**Best practice:** Setiap push ke GitHub, Vercel otomatis deploy!

Workflow:
```
1. Edit file di VSCode
2. git add .
3. git commit -m "Update feature X"
4. git push origin main
5. GitHub pemberitahu Vercel
6. Vercel otomatis build & deploy
7. Dalam 2-3 menit, live di production ✅
```

Kamu gak perlu manual deploy lagi!

---

## 🎯 Best Practices

1. **Selalu push ke GitHub dulu** sebelum mengubah di production
2. **Test di localhost** sebelum push
3. **Jangan commit `.env` file** (sudah di `.gitignore`)
4. **Set environment variables di Vercel dashboard**, bukan di file
5. **Gunakan branches** untuk fitur baru (feature branch)
6. **Write meaningful commit messages** untuk tracking

---

## 📞 Quick Reference

| Kebutuhan | Command |
|-----------|---------|
| Push ke GitHub | `git push origin main` |
| Check status | `git status` |
| View logs Vercel | Dashboard → Logs |
| Re-deploy | Vercel Dashboard → "..." → Redeploy |
| Update env vars | Vercel Dashboard → Settings → Environment |
| Cek domain | https://your-domain.com |

---

## 🎉 Selesai!

Aplikasi LapaKita sekarang **LIVE di production** dengan:
✅ Custom domain (atau Vercel subdomain)
✅ HTTPS/SSL aktif
✅ Auto-deploy dari GitHub
✅ Global CDN (fast loading di mana pun)
✅ Scalable infrastructure

---

## 📚 Next Steps

1. **Monitor performance** - Lihat analytics di Vercel
2. **Collect user feedback** - Lihat bagian mana yang perlu improvement
3. **Plan Phase 2** - Authentication & user management
4. **Scale up** - Kalau traffic banyak, upgrade plan Vercel

---

**Questions? Troubleshooting?**
- Check Vercel docs: https://vercel.com/docs
- Check Next.js docs: https://nextjs.org/docs

Happy deploying! 🚀
