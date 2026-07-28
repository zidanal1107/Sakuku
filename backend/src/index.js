import express from "express";
import cors from "cors";

import expenseRoutes from "./routes/expense.route.js";
import authenticateToken from "./middlewares/auth.middleware.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Jalur API
app.use("/api/auth", authRoutes);
app.use("/api/expenses", authenticateToken, expenseRoutes);

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});
