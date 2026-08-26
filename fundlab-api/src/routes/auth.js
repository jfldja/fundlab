import express from "express";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../utils/password.js";

export function createAuthRouter(prisma) {
  const router = express.Router();

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "請提供 email 和 password" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "帳號或密碼錯誤" });
    }

    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return res.status(401).json({ error: "帳號或密碼錯誤" });
    }

    const token = jwt.sign(
      { userId: user.id, globalRole: user.globalRole, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, globalRole: user.globalRole },
    });
  });

  return router;
}