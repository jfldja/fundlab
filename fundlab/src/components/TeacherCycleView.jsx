import { useToast } from "../ToastContext";

export function TeacherCycleView({ n, isReadonly, day, dispatch, onBackToMap }) {
  const showToast = useToast();
  const onTeacherAdvanceDay = () => dispatch({ type: "TEACHER_ADVANCE_DAY" });
  const detail = () => showToast("（示範）開啟學生明細");

  return (
    <>
      <div className="card">
        <div className="card-title">
          課程指揮中心 Dashboard <span className="badge gold">對應 04-4</span>
        </div>
        <div className="stat-grid">
          <div className="stat">
            <div className="stat-label">學生 / 基金</div>
            <div className="stat-value">42 / 58</div>
          </div>
          <div className="stat">
            <div className="stat-label">基金報酬中位數</div>
            <div className="stat-value">+6.4%</div>
          </div>
          <div className="stat">
            <div className="stat-label">勝過 0050（+5.42%）</div>
            <div className="stat-value">31 檔</div>
          </div>
          <div className="stat">
            <div className="stat-label">今日交易筆數</div>
            <div className="stat-value">127</div>
          </div>
        </div>
        <div className="note">上次結算　06/10 14:52 成功　公司行動：0056 除息 1.07/股，已入帳 12 檔基金</div>
      </div>

      <div className="card">
        <div className="card-title">
          Cycle {n} · Day {day} 班級進度
        </div>
        <div className="stat-grid">
          <div className="stat">
            <div className="stat-label">Manager Statement 提交率</div>
            <div className="stat-value">{day >= 3 ? "10/10" : "7/10"}</div>
          </div>
          <div className="stat">
            <div className="stat-label">Rating 完成率</div>
            <div className="stat-value">{day >= 4 ? "14/22" : "0/22"}</div>
          </div>
          <div className="stat">
            <div className="stat-label">本輪提問數</div>
            <div className="stat-value">{day >= 4 ? "9" : "0"}</div>
          </div>
          <div className="stat">
            <div className="stat-label">異常案例</div>
            <div className="stat-value">1</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">基金排行（教師版，可點學生看明細）</div>
        <table>
          <tbody>
            <tr>
              <th>名次</th>
              <th>基金（經理人）</th>
              <th>NAV</th>
              <th>累積報酬</th>
              <th>Sharpe</th>
              <th>MDD</th>
              <th>持有人數</th>
              <th></th>
            </tr>
            <tr>
              <td>🥇1</td>
              <td>半導體先鋒（林大華）</td>
              <td>11.8420</td>
              <td className="up">+18.42%</td>
              <td>2.41</td>
              <td>-9.6%</td>
              <td>26</td>
              <td>
                <button className="btn-link" onClick={detail}>
                  學生明細
                </button>
              </td>
            </tr>
            <tr>
              <td>🥈2</td>
              <td>科技成長一號（王小明）</td>
              <td>11.2845</td>
              <td className="up">+12.85%</td>
              <td>1.98</td>
              <td>-7.2%</td>
              <td>17</td>
              <td>
                <button className="btn-link" onClick={detail}>
                  學生明細
                </button>
              </td>
            </tr>
            <tr>
              <td>🥉3</td>
              <td>AI 浪潮（黃啟翔）</td>
              <td>11.2310</td>
              <td className="up">+12.31%</td>
              <td>1.74</td>
              <td>-11.8%</td>
              <td>14</td>
              <td>
                <button className="btn-link" onClick={detail}>
                  學生明細
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-title">⚠ 待關注（前 3 筆）</div>
        <table>
          <tbody>
            <tr>
              <td>張惠雯</td>
              <td>11 天無任何交易</td>
              <td>
                <button className="btn-link" onClick={detail}>
                  明細
                </button>
              </td>
            </tr>
            <tr>
              <td>航運王者（張志明）</td>
              <td>MDD -22.4%、持有人僅 3</td>
              <td>
                <button className="btn-link" onClick={detail}>
                  明細
                </button>
              </td>
            </tr>
            <tr>
              <td>李建成</td>
              <td>說明書修改 4 次（漂移偵測）</td>
              <td>
                <button className="btn-link" onClick={detail}>
                  明細
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {n >= 6 && (
        <div className="card">
          <div className="card-title">
            外部評議人意見彙整 <span className="badge blue">Cycle {n} 起新增（FundLab 教學設計）</span>
          </div>
          <table>
            <tbody>
              <tr>
                <th>外部評議人</th>
                <th>基金</th>
                <th>推薦標籤</th>
                <th>意見</th>
              </tr>
              <tr>
                <td>評議人 1</td>
                <td>科技成長一號</td>
                <td>
                  <span className="badge teal">值得追蹤</span>
                </td>
                <td>持股調整理由說明清楚</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {!isReadonly ? (
        <>
          <div className="day-actions">
            <button className="btn gold" onClick={onTeacherAdvanceDay}>
              {day < 7
                ? `開放下一日任務 → Day ${day + 1}`
                : `⚡ 立即結算 → ${n < 10 ? "解鎖 Cycle " + (n + 1) + "（全班）" : "產出全班 Talent Evidence Profile"}`}
            </button>
            <button className="btn secondary" onClick={onBackToMap}>
              回到課程進度總覽
            </button>
          </div>
          <div className="note">
            「立即結算」對應原型 04-4 Dashboard 結算鈕，冪等可重複執行；本整合設計中，結算同時觸發 FundLab 的 Cycle 解鎖機制。
          </div>
        </>
      ) : (
        <>
          <div className="day-actions">
            <button className="btn secondary" onClick={onBackToMap}>
              回到課程進度總覽
            </button>
          </div>
          <div className="note">本輪已結算完成，教師端顯示為唯讀歷史紀錄（對應原型 04-1b 已結束課程檢視）。</div>
        </>
      )}
    </>
  );
}
