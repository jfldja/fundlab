const SKILLS = [
  ["基金設計能力", "A"],
  ["投資組合管理能力", "B+"],
  ["風險控管能力", "A-"],
  ["基金事業經營能力", "B"],
  ["產業研究能力", "A"],
  ["預測與驗證能力", "B+"],
  ["經理人選擇能力", "A-"],
  ["信任溝通能力", "A"],
  ["外部 rating（平均）", "8.1 / 10"],
  ["推薦人才標籤", "值得追蹤"],
];

export function ProfileView({ onBackToMap }) {
  return (
    <>
      <div className="crumb">
        <b onClick={onBackToMap}>我的學習地圖</b> ／ Talent Evidence Profile
      </div>
      <div className="card">
        <div className="card-title">
          Talent Evidence Profile <span className="badge teal">Cycle 10 結算完成</span>
        </div>
        <div className="profile-grid">
          {SKILLS.map(([label, lvl]) => (
            <div className="profile-item" key={label}>
              <span>{label}</span>
              <span className="lvl">{lvl}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="day-actions">
        <button className="btn secondary" onClick={onBackToMap}>
          回到學習地圖
        </button>
      </div>
    </>
  );
}
