# Laporan Pemeriksaan Error Backend

Tanggal pemeriksaan: 19 Juli 2026

## Status saat ini

Error impor Prisma sebelumnya sudah tidak terjadi. Perintah `npm run serve` berhasil menjalankan server dan menampilkan:

```text
Server backend berjalan di http://localhost:5000
```

## Error aktif

Saat Prisma menjalankan query yang dipakai endpoint `GET /api/expenses`, koneksi ke database gagal dengan error:

```text
PrismaClientInitializationError:
Can't reach database server at `localhost:3306`
```

## Penyebab

`DATABASE_URL` mengarah ke MySQL di `localhost:3306`, tetapi tidak ada server MySQL yang dapat dijangkau pada alamat dan port tersebut. Akibatnya semua endpoint yang memakai `prisma.expense` (`GET`, `POST`, dan `DELETE /api/expenses`) akan mengembalikan respons `500`.

## Yang perlu dilakukan

1. Jalankan layanan MySQL pada port `3306`, atau sesuaikan `DATABASE_URL` di `.env` dengan host, port, nama database, pengguna, dan kata sandi MySQL yang benar.
2. Setelah database dapat dijangkau, jalankan `npx prisma db push` atau migrasi Prisma untuk membuat tabel `Expense`.
3. Uji kembali endpoint `/api/expenses`.
