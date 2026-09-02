import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

export function createClassCyclesRouter(prisma) {
  const router = express.Router();

  router.post(
    "/:classId/advance-day",
    requireAuth,
    requireRole("teacher"),
    async (req, res) => {
      const { classId } = req.params;

      const klass = await prisma.class.findUnique({ where: { id: classId } });

      if (!klass) {
        return res.status(404).json({ error: "找不到這個班級" });
      }

      if (klass.teacherId !== req.user.userId) {
        return res.status(403).json({ error: "你不是這個班級的老師" });
      }

      const currentClassCycle = await prisma.classCycle.findFirst({
        where: { classId, status: "current" },
      });

      if (!currentClassCycle) {
        return res.status(409).json({ error: "目前沒有正在進行中的 Cycle" });
      }

      const result = await prisma.$transaction(async (tx) => {
        if (currentClassCycle.currentDay < 7) {
          return tx.classCycle.update({
            where: { id: currentClassCycle.id },
            data: { currentDay: currentClassCycle.currentDay + 1 },
          });
        }

        const settledCycle = await tx.classCycle.update({
          where: { id: currentClassCycle.id },
          data: { status: "done", settledAt: new Date() },
        });

        const nextClassCycle = await tx.classCycle.findFirst({
          where: { classId, cycleNumber: currentClassCycle.cycleNumber + 1 },
        });

        if (nextClassCycle) {
          await tx.classCycle.update({
            where: { id: nextClassCycle.id },
            data: { status: "current", currentDay: 1 },
          });
        }

        return settledCycle;
      });

      res.json({ message: "進度已推進", classCycle: result });
    }
  );

  return router;
}