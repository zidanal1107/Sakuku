import prisma from '../config/db.js';

// Ambil semua data
export const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
};

// Tambah data baru
export const createExpense = async (req, res) => {
  const { title, amount, type, category } = req.body;
  try {
    const newExpense = await prisma.expense.create({
      data: {
        title,
        amount: parseFloat(amount),
        type,
        category
      }
    });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambah data' });
  }
};

// Hapus data
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.expense.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus data' });
  }
};