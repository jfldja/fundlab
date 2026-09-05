import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { checkActionAllowed, TRADE_FEE_RATE, CONCENTRATION_CAP } from "../utils/featureRules.js";

export function createTradesRouter(prisma) {
  const router = express.Router();

  router.post(
    "/:fundId/trades",
    requireAuth,
    requireRole("student"),
    async (req, res) => {
      const { fundId } = req.params;
      const { ticker, side, shares, price } = req.body;

      if (!ticker || !side || !shares || !price) {
        return res.status(400).json({ error: "請提供 ticker、side、shares、price" });
      }

      if (!["buy", "sell"].includes(side)) {
        return res.status(400).json({ error: "side 必須是 buy 或 sell" });
      }

      const fund = await prisma.fund.findUnique({ where: { id: fundId } });

      if (!fund) {
        return res.status(404).json({ error: "找不到這檔基金" });
      }

      if (fund.managerId !== req.user.userId) {
        return res.status(403).json({ error: "你不是這檔基金的經理人" });
      }

      const classCycle = await prisma.classCycle.findFirst({
        where: { classId: fund.classId, status: "current" },
      });

      if (!classCycle) {
        return res.status(409).json({ error: "目前沒有正在進行中的 Cycle" });
      }

      const timingCheck = checkActionAllowed(classCycle, "trade");
      if (!timingCheck.allowed) {
        return res.status(403).json({ error: timingCheck.reason });
      }

      const sharesNum = Number(shares);
      const priceNum = Number(price);
      const amount = sharesNum * priceNum;
      const fee = amount * TRADE_FEE_RATE;

      const existingHolding = await prisma.fundHolding.findUnique({
        where: { fundId_ticker: { fundId, ticker } },
      });

      const currentShares = existingHolding ? Number(existingHolding.shares) : 0;
      const currentCash = Number(fund.cashBalance);

      if (side === "buy") {
        const totalCost = amount + fee;
        if (totalCost > currentCash) {
          return res.status(400).json({
            error: `現金不足：需要 ${totalCost.toFixed(2)}，目前可用現金 ${currentCash.toFixed(2)}`,
          });
        }
      } else {
        if (sharesNum > currentShares) {
          return res.status(400).json({
            error: `持股不足：欲賣出 ${sharesNum} 股，目前僅持有 ${currentShares} 股`,
          });
        }
      }

      const otherHoldings = await prisma.fundHolding.findMany({
        where: { fundId, ticker: { not: ticker } },
      });

      const projectedThisHoldingShares =
        side === "buy" ? currentShares + sharesNum : currentShares - sharesNum;
      const projectedThisHoldingValue = projectedThisHoldingShares * priceNum;
      const projectedCash =
        side === "buy" ? currentCash - amount - fee : currentCash + amount - fee;
      const otherHoldingsValue = otherHoldings.reduce(
        (sum, h) => sum + Number(h.shares) * priceNum,
        0
      );
      const projectedTotalAssets = projectedCash + projectedThisHoldingValue + otherHoldingsValue;
      const projectedConcentration =
        projectedTotalAssets > 0 ? projectedThisHoldingValue / projectedTotalAssets : 0;

      if (side === "buy" && projectedConcentration > CONCENTRATION_CAP) {
        return res.status(400).json({
          error: `此筆交易後，${ticker} 將佔基金總資產 ${(projectedConcentration * 100).toFixed(1)}%，超過集中度上限 ${CONCENTRATION_CAP * 100}%`,
        });
      }

      const trade = await prisma.$transaction(async (tx) => {
        const newTrade = await tx.trade.create({
          data: {
            fundId,
            cycleNumber: classCycle.cycleNumber,
            ticker,
            side,
            shares: sharesNum,
            price: priceNum,
            amount,
            reasonNote: req.body.reasonNote ?? null,
          },
        });

        await tx.fundHolding.upsert({
          where: { fundId_ticker: { fundId, ticker } },
          create: { fundId, ticker, shares: projectedThisHoldingShares, avgCost: priceNum },
          update: { shares: projectedThisHoldingShares },
        });

        await tx.fund.update({
          where: { id: fundId },
          data: { cashBalance: projectedCash },
        });

        return newTrade;
      });

      res.status(201).json({ message: "交易成功", trade });
    }
  );

  return router;
}