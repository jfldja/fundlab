import { MANAGER_FEATURES, INVESTOR_FEATURES, LEADERBOARD_FEATURES, EXTERNAL_FEATURES } from "../data";
import { FeatureGrid } from "./FeatureGrid";
import { FeatureDetail } from "./FeatureDetail";

const TABS = [
  { id: "manager", label: "經理人面板" },
  { id: "investor", label: "投資人面板" },
  { id: "leaderboard", label: "排行榜" },
  { id: "external", label: "外部評議（Cycle6起）" },
];

export function StudentCycleView({ state, n, isReadonly, day, dispatch, onBackToMap }) {
  const externalUnlocked = n >= 6;

  const setFuncTab = (id) => dispatch({ type: "SET_FUNC_TAB", id });
  const onOpenFeature = (group, id) => dispatch({ type: "OPEN_FEATURE", group, id });
  const onClose = () => dispatch({ type: "CLOSE_FEATURE" });
  const onSetStar = (idx, val) => dispatch({ type: "SET_STAR", idx, val });
  const onAdvanceDay = () => dispatch({ type: "ADVANCE_DAY" });

  const tabsHtml = (
    <div className="func-tabs">
      {TABS.map((t) => {
        const disabled = t.id === "external" && !externalUnlocked;
        return (
          <button
            key={t.id}
            className={`func-tab${state.funcTab === t.id ? " active" : ""}`}
            disabled={disabled}
            onClick={disabled ? undefined : () => setFuncTab(t.id)}
          >
            {t.label}
            {disabled && <span className="lock">🔒</span>}
          </button>
        );
      })}
    </div>
  );

  let panel;
  if (state.activeFeature) {
    panel = (
      <FeatureDetail
        activeFeature={state.activeFeature}
        day={day}
        isReadonly={isReadonly}
        ratings={state.ratings}
        onSetStar={onSetStar}
        onClose={onClose}
      />
    );
  } else if (state.funcTab === "manager") {
    panel = <FeatureGrid features={MANAGER_FEATURES} day={day} isReadonly={isReadonly} group="manager" onOpenFeature={onOpenFeature} />;
  } else if (state.funcTab === "investor") {
    panel = <FeatureGrid features={INVESTOR_FEATURES} day={day} isReadonly={isReadonly} group="investor" onOpenFeature={onOpenFeature} />;
  } else if (state.funcTab === "leaderboard") {
    panel = (
      <FeatureGrid features={LEADERBOARD_FEATURES} day={day} isReadonly={isReadonly} group="leaderboard" onOpenFeature={onOpenFeature} />
    );
  } else if (state.funcTab === "external") {
    panel = <FeatureGrid features={EXTERNAL_FEATURES} day={day} isReadonly={isReadonly} group="external" onOpenFeature={onOpenFeature} />;
  }

  let bottomActions = null;
  if (!state.activeFeature) {
    if (!isReadonly) {
      const nextLabel =
        day < 7 ? `完成本日任務 → 進入 Day ${day + 1}` : `完成 Day 7 結算 → ${n < 10 ? "解鎖 Cycle " + (n + 1) : "產出 Talent Evidence Profile"}`;
      bottomActions = (
        <div className="day-actions">
          <button className="btn" onClick={onAdvanceDay}>
            {nextLabel}
          </button>
          <button className="btn secondary" onClick={onBackToMap}>
            回到學習地圖
          </button>
        </div>
      );
    } else {
      bottomActions = (
        <>
          <div className="day-actions">
            <button className="btn secondary" onClick={onBackToMap}>
              回到學習地圖
            </button>
          </div>
          <div className="note">本輪已完成結算，所有功能為唯讀回顧模式。</div>
        </>
      );
    }
  }

  return (
    <>
      {tabsHtml}
      {panel}
      {bottomActions}
    </>
  );
}
