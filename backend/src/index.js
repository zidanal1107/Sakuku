import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/expense.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Jalur API
app.use("/api/expenses", expenseRoutes);

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});
