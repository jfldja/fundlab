import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../src/utils/password.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CYCLE_INFO = {
  1: "最小可行基金與初始募集",
  2: "績效檢視與經理人說明",
  3: "基金說明書深化與策略一致性",
  4: "風控、成本與基金事業模型",
  5: "信任、問答與內部 rating",
  6: "期中審查與外部評議啟動",
  7: "產業 Thesis 與公司比較",
  8: "預測、基金評等與經理人選擇",
  9: "預測驗證、誤差檢討與策略再平衡",
  10: "期末投資人報告與 Talent Evidence Profile",
};

const DAY_NOTES = {
  1: "課堂啟動・本輪任務開放",
  2: "基金經理人檢視績效與策略・可下單調整",
  3: "經理人提交說明報告（鎖定）",
  4: "投資人閱讀・評等・提問",
  5: "投資人申購／贖回・外部 rating（Cycle 6 起）",
  6: "經理人回應・本輪鎖定",
  7: "系統自動結算・產生下一輪資料",
};

async function main() {
  const existing = await prisma.class.findFirst();
  if (existing) {
    console.log("資料庫已經有班級資料了，略過 seed（避免重複灌入）。");
    return;
  }

  // 1. 建立帳號
  const teacher = await prisma.user.create({
    data: {
      name: "陳教授",
      email: "teacher1@fundlab.local",
      passwordHash: await hashPassword("password123"),
      globalRole: "teacher",
    },
  });

  const student = await prisma.user.create({
    data: {
      name: "王小明",
      email: "student1@fundlab.local",
      passwordHash: await hashPassword("password123"),
      globalRole: "student",
    },
  });

  const otherManager = await prisma.user.create({
    data: {
      name: "林大華",
      email: "student2@fundlab.local",
      passwordHash: await hashPassword("password123"),
      globalRole: "student",
    },
  });

  // 2. 建立班級與選課關聯
  const klass = await prisma.class.create({
    data: { teacherId: teacher.id, name: "示範班級：投資學實習（113-2）" },
  });

  await prisma.enrollment.createMany({
    data: [
      { userId: student.id, classId: klass.id, roleInClass: "student" },
      { userId: otherManager.id, classId: klass.id, roleInClass: "student" },
    ],
  });

  // 3. Cycle 教材（10 輪共用）
  for (const [num, title] of Object.entries(CYCLE_INFO)) {
    await prisma.cycleTemplate.create({
      data: { cycleNumber: Number(num), title, dayNotes: DAY_NOTES },
    });
  }

  // 4. 這個班的 10 輪進度（Cycle 1 開放中，其餘鎖定）
  for (let i = 1; i <= 10; i++) {
    await prisma.classCycle.create({
      data: {
        classId: klass.id,
        cycleNumber: i,
        currentDay: 1,
        status: i === 1 ? "current" : "locked",
      },
    });
  }

  // 5. 兩檔基金
  const fundM = await prisma.fund.create({
    data: { classId: klass.id, managerId: student.id, name: "科技成長一號" },
  });
  const fundI = await prisma.fund.create({
    data: { classId: klass.id, managerId: otherManager.id, name: "半導體先鋒" },
  });

  // 6. 各自的初始 NAV 快照
  await prisma.fundNavSnapshot.create({
    data: {
      fundId: fundM.id,
      cycleNumber: 1,
      day: 1,
      nav: 11.2845,
      aum: 11284500,
      cash: 1738200,
      cumulativeReturnPct: 12.85,
    },
  });
  await prisma.fundNavSnapshot.create({
    data: {
      fundId: fundI.id,
      cycleNumber: 1,
      day: 1,
      nav: 11.842,
      cumulativeReturnPct: 18.42,
    },
  });

  console.log("Seed 完成！");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });