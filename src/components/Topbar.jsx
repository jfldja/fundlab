import { USERS } from "../data";

export function Topbar({ userId, onLogout }) {
  const u = USERS.find((x) => x.id === userId);
  return (
    <div className="topbar">
      <h1>
        FundLab{" "}
        <span>{u.role === "teacher" ? "教師操作介面（課程指揮中心）" : "學生操作介面：流程節奏 ＋ 完整功能面板"}</span>
      </h1>
      <div className="who">
        登入身份：<b>{u.label}</b>（{u.tag}）　
        <button className="btn-link" onClick={onLogout}>
          登出 / 切換身份
        </button>
      </div>
    </div>
  );
}
