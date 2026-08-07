import { FUND_M } from "../../data";
import { PillGroup } from "../Pill";
import { StaticStars } from "../StarsRow";

export function ExtView() {
  return (
    <div className="card">
      <div className="card-title">
        查看公開說明書與報告 <span className="badge blue">外部可讀版本</span>
      </div>
      <p style={{ fontSize: 13 }}>
        {FUND_M.name}：本輪維持核心成長配置，台積電法說會釋出訂單能見度，符合原投資論點，暫不調整持股結構。
      </p>
    </div>
  );
}

export function ExtRating({ editable }) {
  return (
    <div className="card">
      <div className="card-title">
        External Rating Form <span className={`badge ${editable ? "blue" : "amber"}`}>{editable ? "Day 5 開放中" : "已鎖定"}</span>
      </div>
      <div className="rating-grid">
        <div className="rating-item">
          <span>基金 rating</span>
          <StaticStars filled={4} />
        </div>
        <div className="rating-item">
          <span>經理人 rating</span>
          <StaticStars filled={3} />
        </div>
      </div>
      <div className="field">
        <label>是否值得推薦觀察</label>
        <PillGroup options={["值得追蹤", "需要補強"]} mode="single" disabled={!editable} />
      </div>
    </div>
  );
}
