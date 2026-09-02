export const TRADE_FEE_RATE = 0.001425;
export const CONCENTRATION_CAP = 0.60;

const ACTION_RULES = {
  trade:               { days: [2], role: "manager" },
  editProspectus:      { days: [2, 3], role: "manager" },
  editManagerStatement:{ days: [2, 3], role: "manager" },
  managerRespond:      { days: [6], role: "manager" },
  investorRating:      { days: [4], role: "investor" },
  subscription:        { days: [5], role: "investor" },
  externalEvaluation:  { minCycle: 6, role: "external_evaluator" },
};

export function checkActionAllowed(classCycle, actionKey) {
  const rule = ACTION_RULES[actionKey];

  if (!rule) {
    throw new Error(`未知的動作類型: ${actionKey}`);
  }

  if (classCycle.status !== "current") {
    return { allowed: false, reason: "這一輪 Cycle 目前不是開放狀態" };
  }

  if (rule.minCycle && classCycle.cycleNumber < rule.minCycle) {
    return { allowed: false, reason: `此功能要 Cycle ${rule.minCycle} 起才開放` };
  }

  if (rule.days && !rule.days.includes(classCycle.currentDay)) {
    return {
      allowed: false,
      reason: `此功能僅於 Day ${rule.days.join("、")} 開放，目前是 Day ${classCycle.currentDay}`,
    };
  }

  return { allowed: true };
}