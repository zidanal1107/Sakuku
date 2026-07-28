# 🚂 SakuKu Backend API

Repositori ini berisi kode layanan _backend_ untuk aplikasi **SakuKu (Pencatat Keuangan Pribadi)**. Dibuat menggunakan Node.js, Express, Prisma ORM, dan MariaDB, serta dilengkapi sistem keamanan berbasis JSON Web Token (JWT).

---

## 🛠️ Spesifikasi Teknologi

- **Runtime Environment:** Node.js
- **Framework Web:** Express.js
- **Database:** MariaDB
- **ORM:** Prisma
- **Autentikasi:** JSON Web Token (JWT) & Bcrypt.js (Hash Password)
- **CORS:** Enabling Cross-Origin Resource Sharing untuk Frontend

---

## 🔑 Fitur & Fitur Keamanan API

1. **Aturan Domain Email Khusus:**
   - Registrasi user hanya menerima email dengan domain resmi **`@sakuku.com`** (contoh: `zidan@sakuku.com`).
2. **Autentikasi & Keamanan Kriptografi:**
   - Password disimpan secara aman dalam bentuk hash menggunakan `bcryptjs`.
   - Autentikasi stateless menggunakan `jsonwebtoken` (JWT).
3. **Data Isolation (Multi-Tenant):**
   - Setiap pengguna hanya dapat melihat, menambah, dan menghapus transaksi keuangan miliknya sendiri.
4. **Validasi Input & Error Handling:**
   - Penanganan error terstruktur untuk email duplikat, token kadaluwarsa, atau kegagalan request.

---

## 📁 Struktur Folder Backend

```text
backend/
├── prisma/
│   ├── schema.prisma       # Schema database (User & Expense)
│   └── migrations/         # Riwayat migrasi database MariaDB
├── src/
│   ├── controllers/        # Otak logika bisnis (authController & expenseController)
│   ├── middlewares/        # Validasi JWT Token (authMiddleware)
│   ├── routes/             # Pemetaan endpoint (/api/auth & /api/expenses)
│   └── index.js            # Entry point & saklar server Express
├── .env                    # Variabel lingkungan (Database URL & JWT Secret)
└── package.json
```
