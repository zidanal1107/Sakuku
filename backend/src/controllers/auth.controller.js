import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sakuku_secret_key";

// REGISTRASI USER BARU
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Semua kolom wajib diisi." });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Validasi Sisi Server: Domain Wajib @sakuku.com
    if (!cleanEmail.endsWith("@sakuku.com")) {
      return res.status(400).json({
        error: "Registrasi ditolak. Email wajib menggunakan domain @sakuku.com",
      });
    }

    // Cek ketersediaan email
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email sudah terdaftar. Silakan login." });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      message: "Registrasi berhasil! Silakan login.",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Gagal memproses pendaftaran." });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password wajib diisi." });
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "Email atau password salah." });
    }

    // Bandingkan password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Email atau password salah." });
    }

    // Buat JWT Token (berlaku 24 jam)
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      message: "Login berhasil!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat login." });
  }
};
