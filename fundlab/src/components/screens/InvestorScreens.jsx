import { FUND_I } from "../../data";
import { useToast } from "../../ToastContext";
import { PillGroup } from "../Pill";
import { StarsRow, StaticStars } from "../StarsRow";

export function InvestorMarket() {
  return (
    <div className="card">
      <div className="card-title">
        基金總覽（市場） <span className="badge teal">對應 02-1</span>
      </div>
      <table>
        <tbody>
          <tr>
            <th>排名</th>
            <th>基金（經理人）</th>
            <th>NAV</th>
            <th>累積報酬</th>
            <th>持有人數</th>
          </tr>
          <tr>
            <td>🥇1</td>
            <td>{FUND_I.name}</td>
            <td>{FUND_I.nav}</td>
            <td className="up">+{FUND_I.ret}%</td>
            <td>26</td>
          </tr>
          <tr>
            <td>🥈2</td>
            <td>科技成長一號（王小明）</td>
            <td>11.2845</td>
            <td className="up">+12.85%</td>
            <td>17</td>
          </tr>
          <tr>
            <td>🥉3</td>
            <td>AI 浪潮（黃啟翔）</td>
            <td>11.2310</td>
            <td className="up">+12.31%</td>
            <td>14</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function InvestorFundDetail() {
  return (
    <div className="card">
      <div className="card-title">
        {FUND_I.name} <span className="badge blue">投資人視角</span>
      </div>
      <div className="fund-row">
        <div>
          <div className="fund-name">NAV {FUND_I.nav}</div>
          <div className="fund-meta">本輪 Manager Statement 已開放閱讀</div>
        </div>
        <div className="return up">+{FUND_I.ret}%</div>
      </div>
      <div className="field">
        <label>經理人說明摘錄</label>
        <textarea rows={3} disabled defaultValue="本輪持續加碼半導體上游，產業趨勢明確，惟集中度偏高，將持續觀察分散空間。" />
      </div>
    </div>
  );
}

const RATING_LABELS = ["基金定位清楚度", "策略一致性", "風險揭露完整度", "經理人說明品質", "信任感", "成本合理性"];

export function InvestorRatingCard({ editable, ratings, onSetStar }) {
  const showToast = useToast();
  return (
    <div className="card">
      <div className="card-title">
        Fund Rating Card <span className={`badge ${editable ? "teal" : "amber"}`}>{editable ? "Day 4 填寫中" : "已鎖定"}</span>
      </div>
      <div className="rating-grid">
        {RATING_LABELS.map((label, idx) => (
          <StarsRow key={label} label={label} value={ratings[idx]} editable={editable} onChange={(v) => onSetStar(idx, v)} />
        ))}
      </div>
      <div className="field">
        <label>提出問題</label>
        <textarea rows={2} disabled={!editable} defaultValue="集中度是否過高？單一持股占比超過 50% 是否符合風險控管？" />
      </div>
      {editable && (
        <button className="btn" onClick={() => showToast("（示範）評等已提交")}>
          提交評等
        </button>
      )}
    </div>
  );
}

export function InvestorSubscribe({ editable }) {
  const showToast = useToast();
  if (!editable) {
    return (
      <div className="card">
        <div className="card-title">
          申購／贖回 <span className="badge amber">不在開放期</span>
        </div>
        <div className="locked-note">🔒 僅於 Day 5 開放（對應教學設計：投資人配置調整日）。</div>
      </div>
    );
  }
  return (
    <div className="card">
      <div className="card-title">
        申購／贖回 <span className="badge blue">對應 02-3・Day 5 開放中</span>
      </div>
      <div className="field">
        <label>步驟 1｜操作類型</label>
        <PillGroup options={["申購", "贖回"]} mode="single" />
      </div>
      <div className="field">
        <label>步驟 2｜標的基金</label>
        <input type="text" defaultValue={FUND_I.name} disabled />
      </div>
      <div className="field-row">
        <div className="field">
          <label>金額</label>
          <input type="text" defaultValue="100,000" />
        </div>
        <div className="field">
          <label>預估取得單位數</label>
          <input type="text" defaultValue="8,445 單位" disabled />
        </div>
      </div>
      <div className="field">
        <label>理由（FundLab 教學設計新增，原型無此欄位）</label>
        <textarea rows={2} placeholder="例如：策略與持股一致，加碼。" />
      </div>
      <button className="btn" onClick={() => showToast("（示範）申購已送出")}>
        確認申購
      </button>
    </div>
  );
}

export function InvestorPortfolio() {
  return (
    <div className="card">
      <div className="card-title">
        我的組合 <span className="badge teal">對應 02-4</span>
      </div>
      <table>
        <tbody>
          <tr>
            <th>基金</th>
            <th>持有單位</th>
            <th>帳戶價值</th>
            <th>本輪報酬</th>
          </tr>
          <tr>
            <td>{FUND_I.name}</td>
            <td>1,180</td>
            <td>NT$ 64,200</td>
            <td className="down">－0.4%</td>
          </tr>
        </tbody>
      </table>
      <div className="stat-grid" style={{ marginTop: 10 }}>
        <div className="stat">
          <div className="stat-label">累積信任分數</div>
          <div className="stat-value">6.5</div>
        </div>
        <div className="stat">
          <div className="stat-label">投資人排名</div>
          <div className="stat-value">#9 /60</div>
        </div>
      </div>
    </div>
  );
}

export function InvestorFeedback() {
  return (
    <div className="card">
      <div className="card-title">
        經理人回應 <span className="badge teal">已開放</span>
      </div>
      <p style={{ fontSize: 13 }}>「已檢視集中度上限，本輪交易因超過上限被系統擋下，將於下輪重新評估配置。」</p>
      <div className="field" style={{ marginTop: 12 }}>
        <label>對此回應品質評分</label>
        <StaticStars filled={3} />
      </div>
    </div>
  );
}
