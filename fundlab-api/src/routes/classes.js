import express from "express";
import crypto from "crypto";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { hashPassword } from "../utils/password.js";

export function createClassesRouter(prisma) {
  const router = express.Router();

  router.post(
    "/:classId/students",
    requireAuth,
    requireRole("teacher"),
    async (req, res) => {
      const { classId } = req.params;
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "請提供 name 和 email" });
      }

      const klass = await prisma.class.findUnique({ where: { id: classId } });

      if (!klass) {
        return res.status(404).json({ error: "找不到這個班級" });
      }

      if (klass.teacherId !== req.user.userId) {
        return res.status(403).json({ error: "你不是這個班級的老師" });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(409).json({ error: "這個 email 已經被使用了" });
      }

      const temporaryPassword = crypto.randomBytes(6).toString("base64url");
      const passwordHash = await hashPassword(temporaryPassword);

      const newStudent = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: { name, email, passwordHash, globalRole: "student" },
        });

        await tx.enrollment.create({
          data: { userId: user.id, classId: klass.id, roleInClass: "student" },
        });

        return user;
      });

      res.status(201).json({
        user: { id: newStudent.id, name: newStudent.name, email: newStudent.email },
        temporaryPassword,
      });
    }
  );

  return router;
}