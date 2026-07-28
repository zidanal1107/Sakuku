// backend/src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <TOKEN>

  if (!token) {
    return res
      .status(401)
      .json({ error: "Akses ditolak. Token tidak ditemukan." });
  }

  try {
    // jwt.verify otomatis mengecek tanda tangan (signature) DAN expired time
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data payload user ke request
    next();
  } catch (error) {
    // Jika token expired atau invalid, akan masuk ke catch ini
    return res
      .status(403)
      .json({ error: "Token tidak valid atau sudah kedaluwarsa." });
  }
};

export default authenticateToken;
