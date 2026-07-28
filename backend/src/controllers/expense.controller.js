import prisma from "../config/db.js";

// 1. Ambil data HANYA milik user yang sedang login
export const getExpenses = async (req, res) => {
  try {
    // req.user.userId didapat dari middleware auth JWT
    const userId = req.user.userId;

    const expenses = await prisma.expense.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: "desc" },
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// 2. Tambah data baru dengan menautkan userId
export const createExpense = async (req, res) => {
  const { title, amount, type, category } = req.body;
  const userId = req.user.userId;

  try {
    const newExpense = await prisma.expense.create({
      data: {
        title,
        amount: parseFloat(amount),
        type,
        category,
        userId: parseInt(userId), // Tautkan transaksi ke ID user
      },
    });

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Gagal menambah data" });
  }
};

// 3. Hapus data dengan pengaman hak akses (ownership check)
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    // Cari transaksi terlebih dahulu untuk memastikan pemiliknya sesuai
    const expense = await prisma.expense.findUnique({
      where: { id: parseInt(id) },
    });

    if (!expense) {
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    // Cegah user A menghapus data milik user B
    if (expense.userId !== parseInt(userId)) {
      return res
        .status(403)
        .json({ error: "Anda tidak memiliki akses untuk menghapus data ini" });
    }

    await prisma.expense.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus data" });
  }
};
