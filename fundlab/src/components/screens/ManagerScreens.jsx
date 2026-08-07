import { FUND_M } from "../../data";
import { useToast } from "../../ToastContext";
import { PillGroup } from "../Pill";

export function ManagerList() {
  return (
    <div className="card">
      <div className="card-title">
        我的基金列表 <span className="badge teal">對應 01-3</span>
      </div>
      <div className="stat-grid">
        <div className="stat">
          <div className="stat-label">合計總資產</div>
          <div className="stat-value">21,887,300</div>
        </div>
        <div className="stat">
          <div className="stat-label">合計報酬率</div>
          <div className="stat-value up">+9.31%</div>
        </div>
        <div className="stat">
          <div className="stat-label">經理人排名</div>
          <div className="stat-value">#3 /42</div>
        </div>
        <div className="stat">
          <div className="stat-label">基金數</div>
          <div className="stat-value">2 檔</div>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>基金</th>
            <th>NAV</th>
            <th>累積報酬</th>
            <th>總資產</th>
            <th>持有人數</th>
            <th>排名</th>
          </tr>
          <tr>
            <td>{FUND_M.name}</td>
            <td>{FUND_M.nav}</td>
            <td className="up">+{FUND_M.ret}%</td>
            <td>{FUND_M.aum.toLocaleString()}</td>
            <td>{FUND_M.holders} 人</td>
            <td>{FUND_M.rank}</td>
          </tr>
          <tr>
            <td>高息防禦二號</td>
            <td>10.6028</td>
            <td className="up">+6.03%</td>
            <td>10,602,800</td>
            <td>9 人</td>
            <td>#15 /58</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function ManagerDetail({ editable }) {
  return (
    <div className="card">
      <div className="card-title">
        {FUND_M.name} <span className="badge blue">基金詳情</span>
      </div>
      <div className="fund-row">
        <div>
          <div className="fund-name">NAV {FUND_M.nav}</div>
          <div className="fund-meta">
            持有人 {FUND_M.holders}　｜　排名 {FUND_M.rank}
          </div>
        </div>
        <div className="return up">+{FUND_M.ret}%</div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>標的</th>
            <th>股數</th>
            <th>市值</th>
            <th>資金占比</th>
          </tr>
          <tr>
            <td>2330 台積電</td>
            <td>6,000</td>
            <td>6,390,000</td>
            <td>56.6%</td>
          </tr>
          <tr>
            <td>2454 聯發科</td>
            <td>1,500</td>
            <td>1,875,000</td>
            <td>16.6%</td>
          </tr>
          <tr>
            <td>0056 高股息</td>
            <td>30,000</td>
            <td>1,194,000</td>
            <td>10.6%</td>
          </tr>
          <tr>
            <td>💰 可用現金</td>
            <td>—</td>
            <td>{FUND_M.cash.toLocaleString()}</td>
            <td>15.4%</td>
          </tr>
        </tbody>
      </table>
      {editable ? (
        <div className="note">本日可前往「下單交易」調整持股配置。</div>
      ) : (
        <div className="locked-note">🔒 本輪交易視窗已關閉，僅可查看持股現況。</div>
      )}
    </div>
  );
}

export function ManagerTrade({ editable, day }) {
  const showToast = useToast();
  if (!editable) {
    return (
      <div className="card">
        <div className="card-title">
          下單交易 <span className="badge amber">不在開放期</span>
        </div>
        <div className="locked-note">
          🔒 下單交易僅於 Day 2 開放（對應教學設計：經理人檢視績效與策略日）。
          {day < 2 ? "目前尚未到開放時間。" : "本輪開放期已過。"}
        </div>
      </div>
    );
  }
  return (
    <div className="card">
      <div className="card-title">
        下單交易 <span className="badge blue">對應 01-6・Day 2 開放中</span>
      </div>
      <div className="note">可用現金 {FUND_M.cash.toLocaleString()}</div>
      <div className="field" style={{ marginTop: 10 }}>
        <label>步驟 1｜交易方向</label>
        <PillGroup options={["買進", "賣出"]} mode="single" />
      </div>
      <div className="field">
        <label>步驟 2｜標的</label>
        <input type="text" defaultValue="2330 台積電｜1,065.00 ▲1.43%" disabled />
      </div>
      <div className="field-row">
        <div className="field">
          <label>股數（零股可，1股起）</label>
          <input type="text" defaultValue="2,000" />
        </div>
        <div className="field">
          <label>預估成交金額</label>
          <input type="text" defaultValue="2,130,000" disabled />
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>手續費 0.1425%</th>
            <td>3,035</td>
          </tr>
          <tr>
            <th>預估扣款</th>
            <td>
              <b>2,133,035</b>
            </td>
          </tr>
          <tr>
            <th>成交後現金</th>
            <td className="down">－394,835 ⚠ 現金不足</td>
          </tr>
          <tr>
            <th>成交後 2330 占比</th>
            <td className="down">74.2% ⚠ 超過上限 60%</td>
          </tr>
        </tbody>
      </table>
      <div className="warn-note">⚠ 此筆交易將使現金不足且集中度超過上限，系統將擋下此交易；請調整股數。</div>
      <div className="field" style={{ marginTop: 10 }}>
        <label>交易日誌－決策理由（本課程必填）</label>
        <textarea rows={2} placeholder="例如：法說會釋出 AI 訂單能見度，加碼上游晶圓代工。" />
      </div>
      <button className="btn" style={{ marginTop: 6 }} onClick={() => showToast("（示範）交易已送出，回到基金詳情更新持股")}>
        確認買進（即時成交）
      </button>
    </div>
  );
}

export function ManagerProspectus({ editable }) {
  const showToast = useToast();
  return (
    <div className="card">
      <div className="card-title">
        公開說明書編輯 <span className={`badge ${editable ? "blue" : "amber"}`}>{editable ? "Day 2–3 開放中" : "已鎖定"}</span>
      </div>
      <div className="field">
        <label>投資目標</label>
        <textarea rows={2} disabled={!editable} defaultValue="聚焦台灣科技供應鏈成長機會，追求中長期資本增值，適合可承受中高波動之投資人。" />
      </div>
      <div className="field">
        <label>投資策略</label>
        <textarea rows={2} disabled={!editable} defaultValue="以半導體上游與終端應用領導廠商為核心持股，輔以高股息標的平衡波動。" />
      </div>
      <div className="field">
        <label>適合的投資人</label>
        <textarea rows={2} disabled={!editable} defaultValue="能承受短期 15% 以上波動、追求科技成長主題曝險之投資人。" />
      </div>
      {editable ? (
        <button className="btn secondary" onClick={() => showToast("（示範）已儲存為 v2，系統將記錄版本供老師端比對")}>
          儲存為新版本
        </button>
      ) : (
        <div className="locked-note">🔒 Day 3 後鎖定，下一輪 Cycle 開放期才能再修改。</div>
      )}
    </div>
  );
}

export function ManagerStatement({ editable }) {
  return (
    <div className="card">
      <div className="card-title">
        Manager Statement <span className={`badge ${editable ? "blue" : "amber"}`}>{editable ? "Day 2–3 開放中" : "已鎖定"}</span>
      </div>
      <div className="field">
        <label>本輪最大貢獻</label>
        <textarea rows={2} disabled={!editable} defaultValue="台積電本輪上漲 1.43%，貢獻組合報酬約 0.8 個百分點。" />
      </div>
      <div className="field">
        <label>本輪最大拖累</label>
        <textarea rows={2} disabled={!editable} defaultValue="高股息持股本輪表現平淡，未能跟上大盤漲幅。" />
      </div>
      <div className="field">
        <label>給投資人的說明</label>
        <textarea rows={3} disabled={!editable} defaultValue="本輪維持核心成長配置，台積電法說會釋出訂單能見度，符合原投資論點，暫不調整持股結構。" />
      </div>
      {!editable && <div className="locked-note">🔒 已鎖定，僅可於 Day 6 於「回應投資人提問」補充說明。</div>}
    </div>
  );
}

export function ManagerRespond({ editable, day }) {
  const showToast = useToast();
  return (
    <div className="card">
      <div className="card-title">
        回應投資人提問{" "}
        <span className={`badge ${editable ? "amber" : "teal"}`}>{editable ? "Day 6 開放中" : day < 6 ? "尚未開放" : "已鎖定"}</span>
      </div>
      <div className="field">
        <label>回應：「為何加碼台積電？」</label>
        <textarea rows={2} disabled={!editable} defaultValue="法說會釋出 AI 訂單能見度，符合本輪 thesis，因此加碼。" />
      </div>
      <div className="field">
        <label>回應：「集中度是否過高？」</label>
        <textarea rows={2} disabled={!editable} defaultValue="已檢視集中度上限，本輪交易因超過上限被系統擋下，將於下輪重新評估配置。" />
      </div>
      {editable && (
        <button className="btn" onClick={() => showToast("（示範）回應已送出並鎖定本輪 Manager Statement")}>
          送出回應並鎖定
        </button>
      )}
    </div>
  );
}

export function ManagerSettle() {
  return (
    <div className="card">
      <div className="card-title">
        本輪結算結果 <span className="badge teal">已結算（簡化版歸因）</span>
      </div>
      <div className="stat-grid">
        <div className="stat">
          <div className="stat-label">Gross return</div>
          <div className="stat-value">+2.1%</div>
        </div>
        <div className="stat">
          <div className="stat-label">本輪成本</div>
          <div className="stat-value">0.18%</div>
        </div>
        <div className="stat">
          <div className="stat-label">Investor net return</div>
          <div className="stat-value">+1.9%</div>
        </div>
        <div className="stat">
          <div className="stat-label">AUM 變化</div>
          <div className="stat-value">+0.6M</div>
        </div>
      </div>
      <div className="note">此結果將自動成為下一輪 Day 1 的起始資料。完整版歸因分析（Brinson 模型）於 Cycle 7 起對應「產業 Thesis 與公司比較」開放。</div>
    </div>
  );
}
