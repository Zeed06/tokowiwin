# Panduan Upload Gambar Produk

Sistem ini **TIDAK menggunakan Firebase Storage** untuk menghindari biaya berlangganan. Ada 2 cara untuk menambahkan gambar produk:

## Opsi 1: URL Gambar (Direkomendasikan)

**Cara termudah dan terbaik untuk gambar besar**

1. Upload gambar ke layanan hosting gambar gratis:
   - [Imgur](https://imgur.com/) - Gratis, tidak perlu daftar
   - [ImgBB](https://imgbb.com/) - Gratis, tidak perlu daftar
   - [Unsplash](https://unsplash.com/) - Gambar gratis berkualitas tinggi
   - [Pexels](https://www.pexels.com/) - Gambar gratis
   - Atau hosting gambar lainnya

2. Copy URL gambar (harus dimulai dengan `http://` atau `https://`)

3. Paste URL di form tambah/edit produk

**Contoh URL:**
```
https://i.imgur.com/abc123.jpg
https://images.unsplash.com/photo-1234567890
```

## Opsi 2: Upload File (Base64)

**Untuk gambar kecil (< 500KB)**

1. Pilih opsi "Upload File" di form
2. Pilih gambar dari komputer
3. Sistem akan otomatis convert ke Base64

**Batasan:**
- Maksimal 500KB per gambar
- Gambar disimpan langsung di Firestore sebagai string Base64
- Firestore memiliki limit 1MB per field, jadi gunakan untuk gambar kecil saja

**Kapan menggunakan Base64:**
- Gambar logo kecil
- Icon produk
- Thumbnail kecil

**Kapan menggunakan URL:**
- Gambar produk utama
- Foto berkualitas tinggi
- Gambar lebih dari 500KB

## Tips

1. **Untuk kualitas terbaik**: Gunakan URL gambar dari hosting profesional
2. **Untuk kecepatan**: Gunakan CDN seperti Imgur atau Cloudinary
3. **Untuk gambar kecil**: Base64 cukup, tapi pastikan < 500KB
4. **Validasi**: Sistem akan otomatis validasi format dan ukuran

## Troubleshooting

### URL tidak bisa dimuat
- Pastikan URL dimulai dengan `http://` atau `https://`
- Pastikan gambar bisa diakses publik (tidak private)
- Coba buka URL di browser baru untuk verifikasi

### Base64 error "ukuran terlalu besar"
- Kompres gambar terlebih dahulu
- Gunakan tool online seperti [TinyPNG](https://tinypng.com/)
- Atau gunakan URL gambar sebagai gantinya

### Gambar tidak muncul di preview
- Cek koneksi internet
- Pastikan URL valid dan gambar bisa diakses
- Coba refresh halaman


