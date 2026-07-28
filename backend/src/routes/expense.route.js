import express from "express";
import {
  getExpenses,
  createExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js"; // Import middleware JWT

const router = express.Router();

// Pasang authenticateToken di semua rute transaksi
router.get("/", authenticateToken, getExpenses);
router.post("/", authenticateToken, createExpense);
router.delete("/:id", authenticateToken, deleteExpense);

export default router;
