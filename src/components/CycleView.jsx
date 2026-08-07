import { CYCLE_INFO, DAY_NOTES, USERS } from "../data";
import { nodeStatus } from "../state";
import { StudentCycleView } from "./StudentCycleView";
import { TeacherCycleView } from "./TeacherCycleView";

export function CycleView({ state, userId, dispatch, onBackToMap }) {
  const u = USERS.find((x) => x.id === userId);
  const n = state.activeCycle;
  const isReadonly = nodeStatus(state, n) === "done";
  const maxDay = isReadonly ? 7 : state.day;

  const days = [];
  for (let d = 1; d <= 7; d++) {
    let cls = "day";
    if (d < maxDay) cls += " done";
    if (d === maxDay) cls += " active";
    days.push(
      <div className={cls} key={d}>
        {d}
      </div>
    );
  }

  return (
    <>
      <div className="crumb">
        <b onClick={onBackToMap}>{u.role === "teacher" ? "課程進度總覽" : "我的學習地圖"}</b> ／ Cycle {n}
      </div>

      <div className="cycle-bar">
        <div className="cycle-top">
          <div className="cycle-label">
            Cycle {n} <span className="sub">{CYCLE_INFO[n].title}</span>
          </div>
          {isReadonly ? <span className="badge teal">已完成・唯讀回顧</span> : <span className="badge blue">進行中</span>}
        </div>
        <div className="days">{days}</div>
        <div className="day-note">
          Day {maxDay}　{DAY_NOTES[maxDay]}
        </div>
      </div>

      {u.role === "teacher" ? (
        <TeacherCycleView n={n} isReadonly={isReadonly} day={maxDay} dispatch={dispatch} onBackToMap={onBackToMap} />
      ) : (
        <StudentCycleView state={state} n={n} isReadonly={isReadonly} day={maxDay} dispatch={dispatch} onBackToMap={onBackToMap} />
      )}
    </>
  );
}
