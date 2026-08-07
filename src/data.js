// ===================== STATIC DATA =====================
// 對應原型設計中的固定資料表：每輪資訊、每日備註、各角色功能面板的開放時程

export const CYCLE_INFO = {
  1: { title: "最小可行基金與初始募集" },
  2: { title: "績效檢視與經理人說明" },
  3: { title: "基金說明書深化與策略一致性" },
  4: { title: "風控、成本與基金事業模型" },
  5: { title: "信任、問答與內部 rating" },
  6: { title: "期中審查與外部評議啟動" },
  7: { title: "產業 Thesis 與公司比較" },
  8: { title: "預測、基金評等與經理人選擇" },
  9: { title: "預測驗證、誤差檢討與策略再平衡" },
  10: { title: "期末投資人報告與 Talent Evidence Profile" },
};

export const DAY_NOTES = {
  1: "課堂啟動・本輪任務開放",
  2: "基金經理人檢視績效與策略・可下單調整",
  3: "經理人提交說明報告（鎖定）",
  4: "投資人閱讀・評等・提問",
  5: "投資人申購／贖回・外部 rating（Cycle 6 起）",
  6: "經理人回應・本輪鎖定",
  7: "系統自動結算・產生下一輪資料",
};

// 每個「功能頁面」對應到原 35 頁原型的哪一頁，並標明在 Day 幾開放
// open: [起始Day, 結束Day]（含端點）；超出範圍則為 locked（未到）或 readonly（已過，鎖定後僅可查看）
export const MANAGER_FEATURES = [
  { id: "list", icon: "📋", name: "我的基金列表", desc: "對應原型 01-3 經理人首頁", open: [1, 7] },
  { id: "detail", icon: "📈", name: "基金詳情", desc: "對應原型 01-5 基金詳情", open: [1, 7] },
  { id: "trade", icon: "💱", name: "下單交易", desc: "對應原型 01-6 下單交易（買賣連動試算）", open: [2, 2] },
  { id: "prospect", icon: "📄", name: "公開說明書編輯", desc: "對應原型 01-7 說明書編輯", open: [2, 3] },
  { id: "statement", icon: "📝", name: "Manager Statement", desc: "FundLab 教學設計：經理人說明報告", open: [2, 3] },
  { id: "respond", icon: "💬", name: "回應投資人提問", desc: "FundLab 教學設計：Day6 回應區", open: [6, 6] },
  { id: "settle", icon: "✅", name: "本輪結算結果", desc: "對應原型 04-7 歸因分析（簡化版）", open: [7, 7] },
];

export const INVESTOR_FEATURES = [
  { id: "market", icon: "🌐", name: "基金總覽（市場）", desc: "對應原型 02-1 基金總覽", open: [1, 7] },
  { id: "detail2", icon: "🔍", name: "基金詳情（投資人視角）", desc: "對應原型 02-2 基金詳情", open: [3, 7] },
  { id: "rating", icon: "⭐", name: "Fund Rating Card", desc: "FundLab 教學設計：評等與提問", open: [4, 4] },
  { id: "subscribe", icon: "💵", name: "申購／贖回", desc: "對應原型 02-3 申購贖回（步驟式）", open: [5, 5] },
  { id: "portfolio", icon: "📊", name: "我的組合", desc: "對應原型 02-4 我的組合", open: [1, 7] },
  { id: "feedback", icon: "📨", name: "查看經理人回應", desc: "FundLab 教學設計：Day6-7", open: [6, 7] },
];

export const LEADERBOARD_FEATURES = [
  { id: "fundrank", icon: "🏆", name: "基金排行", desc: "對應原型 03-1 基金排行", open: [1, 7] },
  { id: "mgrrank", icon: "👔", name: "經理人排行", desc: "對應原型 03-2 經理人排行", open: [1, 7] },
  { id: "invrank", icon: "💼", name: "投資人排行", desc: "對應原型 03-3 投資人排行", open: [1, 7] },
  { id: "overlay", icon: "📉", name: "報酬曲線疊圖", desc: "對應原型 03-4 疊圖（勾選互動）", open: [1, 7] },
];

// Cycle 6 起新增的外部評議功能（不屬於原 35 頁原型，是 FundLab 教學設計新增角色）
export const EXTERNAL_FEATURES = [
  { id: "extview", icon: "👁️", name: "查看公開說明書與報告", desc: "FundLab 教學設計：外部可讀版本", open: [3, 7] },
  { id: "extrating", icon: "📝", name: "External Rating Form", desc: "FundLab 教學設計：外部評議表", open: [5, 5] },
];

export const USERS = [
  { id: "student1", label: "王小明", tag: "基金經理人＋投資人", role: "student" },
  { id: "teacher1", label: "陳教授", tag: "教師", role: "teacher" },
];

export const FUND_M = {
  name: "科技成長一號",
  aum: 11284500,
  nav: 11.2845,
  ret: 12.85,
  cash: 1738200,
  holders: 17,
  rank: "#2 /58",
};

export const FUND_I = {
  name: "半導體先鋒（林大華）",
  ret: 18.42,
  nav: 11.842,
};

export function featureListForGroup(group) {
  if (group === "manager") return MANAGER_FEATURES;
  if (group === "investor") return INVESTOR_FEATURES;
  if (group === "leaderboard") return LEADERBOARD_FEATURES;
  if (group === "external") return EXTERNAL_FEATURES;
  return [];
}

// 功能在指定 day / isReadonly 狀態下的可用性："locked" | "open" | "readonly"
export function featureState(feat, day, isReadonly) {
  if (isReadonly) return "readonly"; // 整輪已結束，全部唯讀可看
  const [s, e] = feat.open;
  if (day < s) return "locked"; // 還沒到開放時機
  if (day > e) return "readonly"; // 開放期已過，鎖定僅可查看
  return "open";
}
