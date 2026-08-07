import { CYCLE_INFO, USERS } from "../data";
import { nodeStatus } from "../state";
import { useToast } from "../ToastContext";

const STATUS_LABEL = { done: "已完成", current: "進行中", locked: "未開放" };

export function MapView({ state, userId, onEnterCycle, onGoProfile }) {
  const showToast = useToast();
  const u = USERS.find((x) => x.id === userId);

  const handleEnter = (n) => {
    const status = nodeStatus(state, n);
    if (status === "locked") {
      showToast("Cycle " + n + " 尚未開放，請先完成 Cycle " + state.progress);
      return;
    }
    onEnterCycle(n, status);
  };

  const nodes = [];
  for (let n = 1; n <= 10; n++) {
    const status = nodeStatus(state, n);
    nodes.push(
      <div key={n} className={`node ${status}`} onClick={() => handleEnter(n)}>
        <div className="n-top">
          <span className="n-id">Cycle {n}</span>
          {status === "locked" && <span className="lock-icon">🔒</span>}
        </div>
        <div className="n-title">{CYCLE_INFO[n].title}</div>
        <div className="n-status">{STATUS_LABEL[status]}</div>
      </div>
    );
  }

  const profileOpen = state.highestDone >= 10;
  nodes.push(
    <div
      key="profile"
      className={`node ${profileOpen ? "current" : "locked"}`}
      onClick={profileOpen ? onGoProfile : undefined}
    >
      <div className="n-top">
        <span className="n-id">期末</span>
        {!profileOpen && <span className="lock-icon">🔒</span>}
      </div>
      <div className="n-title">Talent Evidence Profile</div>
      <div className="n-status">{profileOpen ? "可查看" : "尚未開放"}</div>
    </div>
  );

  return (
    <>
      <div className="map-title">{u.role === "teacher" ? "課程進度總覽（教師視角）" : "我的學習地圖"}</div>
      <div className="map-sub">
        {u.role === "teacher"
          ? "可進入任一已開放或已完成之 Cycle，管理全班進度；未開放之 Cycle 顯示鎖定。"
          : "只能進入「目前進行中」的 Cycle；已完成的 Cycle 可回顧查看（唯讀），尚未開放的 Cycle 會鎖定，須先完成前一輪才能解鎖。每個 Cycle 內仍是完整的經理人／投資人／排行榜功能面板，但各項功能依七天節奏動態開放。"}
      </div>
      <div className="map-grid">{nodes}</div>
    </>
  );
}
