# Troubleshooting Guide

## Error: CORS Policy saat Upload Gambar

### Gejala
```
Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

### Penyebab
1. **Storage rules belum di-setup atau belum di-publish**
2. User belum login sebagai admin
3. Storage rules tidak mengizinkan write untuk user yang login

### Solusi

#### Langkah 1: Pastikan Storage Rules Sudah Di-Setup

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Pergi ke **Storage** → **Rules**
4. Pastikan rules sudah seperti ini:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isAdmin() {
      return request.auth != null && firestore.get(/databases/(default)/documents/admins/$(request.auth.uid)).data != null;
    }
    
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

5. **Klik Publish** (jangan lupa!)
6. Tunggu beberapa detik

#### Langkah 2: Pastikan User Sudah Login sebagai Admin

1. Buka `/admin/login`
2. Login dengan email dan password admin
3. Pastikan Anda di-redirect ke `/admin/dashboard`
4. Coba upload gambar lagi

#### Langkah 3: Verifikasi Admin User di Firestore

1. Buka **Firestore Database** → **Data**
2. Pastikan collection `admins` ada
3. Pastikan ada document dengan ID = User UID Anda
4. User UID bisa dilihat di **Authentication** → **Users**

#### Langkah 4: Clear Cache dan Coba Lagi

1. Clear browser cache (Ctrl+Shift+Delete)
2. Atau gunakan Incognito/Private mode
3. Login ulang sebagai admin
4. Coba upload lagi

### Checklist

Sebelum upload gambar, pastikan:
- [ ] Storage rules sudah di-publish di Firebase Console
- [ ] User sudah login sebagai admin (bisa akses `/admin/dashboard`)
- [ ] User UID ada di collection `admins` di Firestore
- [ ] File yang diupload adalah gambar (jpg, png, etc)
- [ ] Ukuran file kurang dari 5MB
- [ ] Browser cache sudah di-clear

### Error Lainnya

#### "storage/unauthorized"
- Pastikan user sudah login sebagai admin
- Pastikan User UID ada di collection `admins`

#### "storage/canceled"
- Upload dibatalkan oleh user atau network issue
- Coba upload lagi

#### "storage/unknown"
- Storage rules belum di-setup dengan benar
- Pastikan rules sudah di-publish
- Cek apakah ada typo di rules

## Error: Missing or insufficient permissions (Firestore)

### Solusi
1. Pastikan Firestore rules sudah di-publish
2. Pastikan User UID ada di collection `admins`
3. Pastikan user sudah login

Lihat `FIREBASE_SETUP.md` untuk setup lengkap.


