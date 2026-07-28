import express from "express";
import {
  getExpenses,
  createExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/", getExpenses);
router.post("/", createExpense);
router.delete("/:id", deleteExpense);

export default router;
