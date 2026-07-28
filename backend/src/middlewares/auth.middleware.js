import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Format token: "Bearer <TOKEN_JWT>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Akses ditolak. Silakan login terlebih dahulu." });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "sakuku_secret_key",
    (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ error: "Token tidak valid atau sudah kedaluwarsa." });
      }
      // Simpan payload token ({ userId: ... }) ke request object
      req.user = user;
      next();
    },
  );
};

export default authenticateToken;
