# 📋 Konsep Authentication & User Management - LapaKita

## 1. User Registration (Sign Up)

**Flow:**
```
UMKM mengisi form daftar
    ↓
Data tersimpan ke database (Email, Password, Nama Usaha)
    ↓
Email verification link dikirim
    ↓
UMKM verifikasi email
    ↓
Akun aktif, bisa login
```

**Form yang diperlukan:**
- Email (unique)
- Password (encrypted)
- Nama Usaha
- No. WhatsApp (untuk notifikasi)

**Database:**
- Users table (id, email, password_hash, created_at)
- UMKM Profile table (user_id, nama_usaha, sektor, kapanewon, dll)

---

## 2. User Login (Sign In)

**Flow:**
```
UMKM input email & password
    ↓
Verifikasi credentials
    ↓
Generate JWT Token (session)
    ↓
Redirect ke Dashboard
    ↓
Token disimpan di localStorage browser
```

**Keamanan:**
- Password hashed menggunakan bcrypt
- JWT token untuk session management
- Logout = hapus token dari localStorage

---

## 3. User Dashboard (After Login)

**Fitur yang tersedia:**

### a) **Profile Management**
- Lihat & edit data UMKM (hasil analisis sebelumnya)
- Upload logo usaha
- Edit informasi kontak

### b) **Prediction History**
- Riwayat analisis kesiapan digital
- Lihat hasil prediksi sebelumnya
- Download report PDF

### c) **Website Builder** (jika sudah go-online)
- Manage katalog produk
- Edit informasi website
- Lihat analytics (traffic, order)

### d) **Notification Center**
- Update tentang website mereka
- Tips digitalisasi sesuai sektor

---

## 4. Technical Architecture

```
Frontend (Next.js):
├── pages/auth/signup.js
├── pages/auth/login.js
├── pages/dashboard/profile.js
├── pages/dashboard/history.js
└── pages/dashboard/website-builder.js

Backend (bisa pakai):
├── Firebase Auth (simple, recommended)
├── Node.js + Express + PostgreSQL (scalable)
└── Supabase (Firebase alternative)

Database:
├── Users (id, email, password_hash, created_at, verified_at)
├── UMKM_Profiles (user_id, nama_usaha, sektor, prediction_result, dll)
└── Prediction_History (user_id, date, prediction_data, probability)
```

---

## 5. Implementation Timeline

| Phase | Timeline | Features |
|-------|----------|----------|
| **Phase 1** | Bulan 1-2 | Sign Up/Login, User Profile, Basic Dashboard |
| **Phase 2** | Bulan 3-4 | Prediction History, Download Report |
| **Phase 3** | Bulan 5-6 | Website Builder, Product Management |
| **Phase 4** | Bulan 7+ | Analytics, Payment Integration, Scaling |

---

## 6. Benefits untuk UMKM

✅ **Data Persistence** - Data UMKM tersimpan, bisa diakses kapan saja
✅ **Personalization** - Rekomendasi yang customized per UMKM
✅ **Progress Tracking** - Monitor perkembangan digitalisasi mereka
✅ **Exclusive Access** - Akses ke website penjualan yang sudah dibuat
✅ **Analytics** - Melihat performa website mereka

---

## 7. Recommended Tech Stack

**Frontend:**
- Next.js (sudah ada)
- NextAuth.js (untuk authentication)
- Tailwind CSS (sudah ada)

**Backend:**
- Firebase Realtime Database / Firestore (simple & scalable)
- Atau: Node.js + Express + PostgreSQL (jika butuh custom)

**Authentication Service:**
- Firebase Auth (recommended - gratis, secure, scalable)
- Atau: Auth0 (enterprise-grade)

---

## 8. MVP Features (Minimum Viable Product)

Untuk fase awal, fokus ke:

1. ✅ Sign Up / Login dengan email
2. ✅ User Profile (nama, email, no. WA)
3. ✅ Save prediction result ke profile
4. ✅ View prediction history (list)
5. ✅ Download report as PDF

**Fitur di-skip untuk MVP:**
- Email verification (bisa manual verify dulu)
- Analytics dashboard (fase 2)
- Website builder (fase 3)

---

## 9. Security Considerations

🔒 **HARUS diprioritaskan:**
- Password hashing (bcrypt)
- HTTPS everywhere
- CORS configuration
- Rate limiting untuk login (prevent brute force)
- Input validation
- Data encryption untuk sensitive data

---

## 10. Estimasi Effort

| Component | Estimasi | Complexity |
|-----------|----------|-----------|
| Auth System | 1-2 minggu | Medium |
| User Profile | 1 minggu | Easy |
| Dashboard | 1-2 minggu | Medium |
| Database Setup | 3-5 hari | Easy-Medium |
| Testing & Deployment | 1 minggu | Medium |
| **Total** | **4-6 minggu** | - |

---

## Rekomendasi untuk Proposal

**"Pengembangan Phase 2: Authentication & User Management"**

LapaKita akan mengintegrasikan sistem login/register untuk memungkinkan pelaku UMKM:
- Menyimpan data profil usaha mereka
- Mengakses riwayat analisis kesiapan digital
- Menyimpan hasil prediksi & rekomendasi
- Mengakses website penjualan yang telah di-generate
- Menerima tips & notifikasi digitalisasi yang customized

**Tech Stack:** Firebase Auth + Next.js + Supabase/PostgreSQL

**Target Launch:** Q2 2026

---
