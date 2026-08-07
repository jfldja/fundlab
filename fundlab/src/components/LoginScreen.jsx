import { USERS } from "../data";

export function LoginScreen({ onLogin }) {
  return (
    <div className="login-wrap">
      <div className="login-card">
        <h2>FundLab 系統登入</h2>
        <p>請選擇登入身份（原型演示用）</p>
        <div className="login-list">
          {USERS.map((u) => (
            <button key={u.id} className="login-btn" onClick={() => onLogin(u.id)}>
              {u.label} <span className="tag">{u.tag}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
