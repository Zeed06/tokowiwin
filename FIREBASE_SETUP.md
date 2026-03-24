# Setup Firebase Security Rules

Error "Missing or insufficient permissions" terjadi karena Firestore security rules belum dikonfigurasi dengan benar. Ikuti langkah-langkah berikut:

## 1. Setup Firestore Security Rules

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Pergi ke **Firestore Database** → **Rules**
4. Ganti rules yang ada dengan kode berikut:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // Admins collection - users can only read their own admin status
    match /admins/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // Only manually set via Firebase Console
    }
    
    // Products collection
    match /products/{productId} {
      // Everyone can read products
      allow read: if true;
      
      // Only admins can create, update, or delete products
      allow create: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
  }
}
```

5. Klik **Publish** untuk menyimpan rules

## 2. Setup Storage Security Rules (PENTING!)

**Error CORS biasanya terjadi karena Storage rules belum di-setup!**

1. Di Firebase Console, pergilah ke **Storage** → **Rules**
2. **Hapus semua rules yang ada** (jika ada rules default)
3. Ganti dengan kode berikut:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && firestore.get(/databases/(default)/documents/admins/$(request.auth.uid)).data != null;
    }
    
    // Products folder - everyone can read, only admins can write
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

4. **WAJIB**: Klik **Publish** untuk menyimpan rules
5. **Tunggu beberapa detik** sampai rules ter-apply

**Catatan Penting:**
- Rules harus di-publish, tidak cukup hanya disimpan
- Pastikan Anda sudah login sebagai admin sebelum upload gambar
- Jika masih error CORS setelah publish, coba:
  - Clear browser cache
  - Logout dan login ulang sebagai admin
  - Refresh halaman

## 3. Verifikasi Setup Admin User

Pastikan Anda sudah:

1. ✅ Membuat user di **Authentication** → **Users**
2. ✅ Mencatat **User UID** dari user tersebut
3. ✅ Membuat collection `admins` di **Firestore Database**
4. ✅ Menambahkan document dengan **Document ID = User UID** di collection `admins`

**Struktur Firestore yang benar:**
```
Collection: admins
  Document ID: [User UID dari Authentication]
    (bisa kosong atau berisi field apapun, misalnya: role: "admin")
```

## 4. Testing

Setelah setup rules:

1. Refresh halaman login admin
2. Login dengan email dan password yang sudah dibuat
3. Jika masih error, cek:
   - Apakah User UID sudah benar di collection `admins`?
   - Apakah rules sudah di-publish?
   - Cek browser console untuk error detail

## Troubleshooting

### Masih error "Missing or insufficient permissions"?

1. **Pastikan User UID benar**: 
   - Buka Authentication → Users
   - Klik user yang ingin dijadikan admin
   - Copy **User UID** (bukan email)
   - Pastikan Document ID di collection `admins` sama persis dengan User UID

2. **Pastikan rules sudah di-publish**:
   - Rules harus di-publish, tidak cukup hanya disimpan
   - Tunggu beberapa detik setelah publish

3. **Cek di Firebase Console**:
   - Firestore → Rules → Pastikan rules sudah ter-update
   - Storage → Rules → Pastikan rules sudah ter-update

4. **Clear browser cache** dan coba lagi

### Error saat upload gambar?

- Pastikan Storage rules sudah di-setup dengan benar
- Pastikan user sudah login sebagai admin
- Pastikan folder `products/` ada di Storage

