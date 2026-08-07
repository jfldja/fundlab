import { FUND_I } from "../../data";
import { PillGroup } from "../Pill";

export function FundRank() {
  return (
    <div className="card">
      <div className="card-title">
        基金排行 <span className="badge teal">對應 03-1</span>
      </div>
      <table>
        <tbody>
          <tr>
            <th>名次</th>
            <th>基金</th>
            <th>NAV</th>
            <th>累積報酬</th>
            <th>Sharpe</th>
            <th>MDD</th>
          </tr>
          <tr>
            <td>🥇1</td>
            <td>{FUND_I.name}</td>
            <td>{FUND_I.nav}</td>
            <td className="up">+{FUND_I.ret}%</td>
            <td>2.41</td>
            <td>-9.6%</td>
          </tr>
          <tr>
            <td>🥈2</td>
            <td>科技成長一號</td>
            <td>11.2845</td>
            <td className="up">+12.85%</td>
            <td>1.98</td>
            <td>-7.2%</td>
          </tr>
          <tr>
            <td>🥉3</td>
            <td>AI 浪潮</td>
            <td>11.2310</td>
            <td className="up">+12.31%</td>
            <td>1.74</td>
            <td>-11.8%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function MgrRank() {
  return (
    <div className="card">
      <div className="card-title">
        經理人排行 <span className="badge teal">對應 03-2</span>
      </div>
      <table>
        <tbody>
          <tr>
            <th>名次</th>
            <th>經理人</th>
            <th>管理基金數</th>
            <th>合計報酬</th>
          </tr>
          <tr>
            <td>1</td>
            <td>林大華</td>
            <td>1</td>
            <td className="up">+18.42%</td>
          </tr>
          <tr>
            <td>2</td>
            <td>王小明</td>
            <td>2</td>
            <td className="up">+9.31%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function InvRank() {
  return (
    <div className="card">
      <div className="card-title">
        投資人排行 <span className="badge teal">對應 03-3</span>
      </div>
      <table>
        <tbody>
          <tr>
            <th>名次</th>
            <th>投資人</th>
            <th>組合報酬</th>
            <th>信任分數</th>
          </tr>
          <tr>
            <td>1</td>
            <td>陳玉婷</td>
            <td className="up">+14.2%</td>
            <td>8.8</td>
          </tr>
          <tr>
            <td>9</td>
            <td>（我）</td>
            <td className="down">－0.4%</td>
            <td>6.5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function Overlay() {
  return (
    <div className="card">
      <div className="card-title">
        報酬曲線疊圖 <span className="badge teal">對應 03-4（勾選互動）</span>
      </div>
      <div className="field">
        <label>勾選比較對象</label>
        <PillGroup
          options={["我的基金", "第1名（半導體先鋒）", "0050"]}
          mode="multi"
          defaultSelected={["我的基金", "第1名（半導體先鋒）"]}
        />
      </div>
      <div className="note">（示範用靜態說明；正式系統為可勾選疊圖之折線圖元件）</div>
    </div>
  );
}
