// ===================== STATE (useReducer) =====================
// 取代原本用一個可變全域物件 `app` + 手動 render() 的作法。
// 這裡把所有狀態變化收斂成明確的 action，交給 React 自己決定何時重繪。

export const initialState = {
  user: null,
  progress: 1,
  highestDone: 0,
  view: "login", // login | map | cycle | profile
  activeCycle: null,
  funcTab: "manager", // manager | investor | leaderboard | external
  activeFeature: null, // { group, id } | null
  day: 1,
  ratings: [3, 3, 3, 3, 3, 2],
  cycleDayProgress: {},
};

export function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.userId, view: "map" };

    case "LOGOUT":
      return { ...initialState };

    case "ENTER_CYCLE": {
      const { n, status } = action;
      const cycleDayProgress = state.cycleDayProgress[n]
        ? state.cycleDayProgress
        : { ...state.cycleDayProgress, [n]: 1 };
      const day = status === "done" ? 7 : cycleDayProgress[n];
      return {
        ...state,
        activeCycle: n,
        view: "cycle",
        cycleDayProgress,
        day,
        funcTab: "manager",
        activeFeature: null,
      };
    }

    case "BACK_TO_MAP":
      return { ...state, view: "map", activeFeature: null };

    case "GO_PROFILE":
      return { ...state, view: "profile" };

    case "SET_FUNC_TAB":
      return { ...state, funcTab: action.id, activeFeature: null };

    case "OPEN_FEATURE":
      return { ...state, activeFeature: { group: action.group, id: action.id } };

    case "CLOSE_FEATURE":
      return { ...state, activeFeature: null };

    case "SET_STAR": {
      const ratings = [...state.ratings];
      ratings[action.idx] = action.val;
      return { ...state, ratings };
    }

    // 學生視角：完成本日任務 → 進下一天；Day7 → 結算並解鎖下一輪
    case "ADVANCE_DAY": {
      const n = state.activeCycle;
      if (state.day < 7) {
        const newDay = state.day + 1;
        return {
          ...state,
          day: newDay,
          cycleDayProgress: { ...state.cycleDayProgress, [n]: newDay },
          activeFeature: null,
        };
      }
      const highestDone = Math.max(state.highestDone, n);
      let progress = state.progress;
      let cycleDayProgress = state.cycleDayProgress;
      if (n === state.progress && n < 10) {
        progress = n + 1;
        cycleDayProgress = { ...cycleDayProgress, [progress]: 1 };
      }
      return {
        ...state,
        highestDone,
        progress,
        cycleDayProgress,
        view: "map",
        activeFeature: null,
      };
    }

    // 教師視角：邏輯與學生相同，但語意上是「為全班開放下一日」
    case "TEACHER_ADVANCE_DAY": {
      const n = state.activeCycle;
      if (state.day < 7) {
        const newDay = state.day + 1;
        return {
          ...state,
          day: newDay,
          cycleDayProgress: { ...state.cycleDayProgress, [n]: newDay },
        };
      }
      const highestDone = Math.max(state.highestDone, n);
      let progress = state.progress;
      let cycleDayProgress = state.cycleDayProgress;
      if (n === state.progress && n < 10) {
        progress = n + 1;
        cycleDayProgress = { ...cycleDayProgress, [progress]: 1 };
      }
      return {
        ...state,
        highestDone,
        progress,
        cycleDayProgress,
        view: "map",
      };
    }

    default:
      return state;
  }
}

// Cycle 節點狀態："locked" | "current" | "done"
export function nodeStatus(state, n) {
  if (n > state.progress) return "locked";
  if (n <= state.highestDone) return "done";
  return "current";
}
