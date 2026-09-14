# FAKTA AI GENERATOR V2

Mobile First untuk HP dan laptop. Tanpa login/database. Pengguna memakai API Key Gemini sendiri.

## Jalankan
1. Install Node.js 20+.
2. Ekstrak ZIP.
3. Terminal di folder project.
4. `npm install`
5. `npm run dev`
6. Buka `http://localhost:3000`.

## Deploy
Upload ke GitHub, import repository di Vercel, lalu Deploy. Tidak perlu environment variable Gemini karena key dimasukkan pengguna.

## HP
Setelah deploy, buka domain Vercel di Chrome/Safari. Tampilan responsif. Bisa pilih Add to Home Screen.

## Penggunaan
Masukkan API Key Gemini, simpan, pilih kategori/platform/gaya/durasi/jumlah, opsional isi topik, lalu Generate. Copy hasil sesuai kebutuhan.

## Keamanan
API key disimpan di localStorage browser. Sebelum dijual luas, tambahkan rate limiting, validasi input, Terms/Privacy, dan perlindungan abuse.
