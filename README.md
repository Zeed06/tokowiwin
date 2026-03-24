# Toko Wiwin - Product Catalog

Website katalog produk profesional yang dibangun dengan Next.js 15, TypeScript, TailwindCSS, dan Firebase.

## Features

- 📦 Daftar produk dengan pencarian dan filter kategori
- 🔍 Halaman detail produk yang menarik
- 🔐 Sistem autentikasi admin terpisah
- ➕ Tambah produk baru (hanya admin)
- ✏️ Edit produk (hanya admin)
- 🗑️ Hapus produk (hanya admin)
- 📊 Dashboard admin untuk mengelola produk
- 🖼️ Upload gambar ke Firebase Storage
- 📱 Desain responsif dan modern

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Firebase** (Firestore + Storage + Authentication)
## Security

- Route admin dilindungi dengan autentikasi
- Hanya user yang terdaftar di collection `admins` yang bisa akses fitur admin
- User biasa hanya bisa melihat produk

