<div align="center">
  <h1>🚀 LapaKita</h1>
  <p><b>AI-Powered Digitalization Readiness Predictor & Web Builder untuk UMKM Sleman</b></p>
  
  [![Status](https://img.shields.io/badge/Status-Live-success.svg)](#) 
  [![Backend](https://img.shields.io/badge/Backend-Flask_|_Azure-blue.svg)](#) 
  [![Frontend](https://img.shields.io/badge/Frontend-Bootstrap_|_Vercel-orange.svg)](#)
  [![Model](https://img.shields.io/badge/AI-Scikit_Learn-yellow.svg)](#)
</div>

---

**LapaKita adalah solusi cerdas berbasis kecerdasan buatan (AI) yang dirancang khusus untuk memecahkan kesulitan digitalisasi UMKM di wilayah Kabupaten Sleman. Proyek ini diajukan untuk AI Impact Challenge - Datathon Dicoding Indonesia.**

> **💡 Akses Langsung (Live Demo):**
> * **🔗 Frontend (Vercel):** `[https://lapakita-umkm.vercel.app]`
> * **⚙️ Backend API (Azure):** `https://api-umkm-sleman-2026-euhcecfvdvgrexft.indonesiacentral-01.azurewebsites.net/`
> * **📄 Dokumen Proposal:** Silakan cek di folder `/docs`

## 📌 Latar Belakang Masalah
Era perekonomian digital mendesak UMKM beradaptasi. Namun, temuan data kami (5.000 data sintetis berbasis profil Kabupaten Sleman) menunjukkan bahwa ketidaktahuan teknis (*skill gap*), keterbatasan sumber daya produksi, dan kompleksitas pengaturan teknologi menjadi penghambat utama. Terdapat *digital divide* spasial yang signifikan, di mana wilayah urban seperti Gamping memimpin (42,6% *go-online rate*), sementara wilayah rural seperti Tempel tertinggal di angka 14,9%. 

**LapaKita hadir untuk memangkas kerumitan teknis tersebut.**

## 🎯 Solusi yang Ditawarkan
LapaKita berfungsi sebagai Asisten Ekosistem Digital dengan tiga pilar utama:
1. **Mesin Prediksi Kesiapan Digital (AI Readiness Predictor):** Menghitung probabilitas kesiapan UMKM untuk *go-online* secara instan berdasarkan parameter bisnis spesifik (Sektor, Skala, Omset, dll).
2. **Smart Insight Generator:** Menerjemahkan skor prediksi AI menjadi wawasan teks dan rekomendasi tindakan strategis (Misal: "Fokus Integrasi Website" atau "Pendampingan Intensif via WhatsApp Business").
3. **Website Builder Integrator:** UMKM yang dinyatakan siap (>50%) akan langsung diarahkan untuk memiliki toko *online* (lengkap dengan katalog visual dan sistem *checkout*) tanpa perlu keahlian *coding*.

## 🛠️ Arsitektur Sistem & Teknologi
Proyek ini mengadopsi pemisahan arsitektur *Frontend* dan *Backend* secara tegas (*decoupled architecture*) untuk skalabilitas dan performa maksimal.

* **Machine Learning Model:**
    * **Algoritma:** Logistic Regression / Scikit-Learn
    * **Dataset:** 5.000 Baris Data Sintetis UMKM Kabupaten Sleman
    * **Akurasi Model:** 92.6%
* **Backend API:**
    * **Framework:** Python Flask (REST API)
    * **Deployment:** Microsoft Azure App Service (Tier F1)
    * **Fitur Kunci:** `Flask-CORS` Enabled, Endpoint POST `/predict`
* **Frontend User Interface:**
    * **Stack:** HTML5, CSS3 (Bootstrap 5), JavaScript (Fetch API)
    * **Deployment:** Vercel

## 📂 Struktur Repositori
```text
LapaKita/
├── backend/            # Kodingan Server Python Flask & Model AI
│   ├── app.py          # API Endpoint Logic
│   ├── model_final_umkm.pkl # Trained Machine Learning Model
│   └── requirements.txt
├── frontend/           # Kodingan User Interface
│   └── index.html      # Tampilan Dashboard Utama
├── notebooks/          # Eksperimen Data & Pelatihan Model
│   └── pengolahan_UMKM_6.ipynb # Final Data Prep & Training Script
├── data/               # Data Dictionary & Struktur Sintetis
└── docs/               # Proposal, Pitch Deck, & Analisis Spasial PDF
