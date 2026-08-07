# FundLab 整合設計原型（React 版）

原本是一份純 HTML + 字串拼接 JS 的教學模擬系統原型，這裡重構成標準的 Vite + React 專案。

## 開發

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
```

## 專案結構666

```
src/
  data.js                  # 靜態資料：Cycle 資訊、每日備註、各角色功能開放時程、假資料
  state.js                 # useReducer：集中管理登入者/進度/當前 Cycle・Day/評分等狀態
  ToastContext.jsx         # 取代原本全域 showToast()，用 Context 提供 toast 通知
  App.jsx                  # 進入點：依 view 切換 Login / Map / Cycle / Profile
  App.css                  # 沿用原型視覺樣式（CSS 變數 + class）
  components/
    LoginScreen.jsx        # 登入畫面
    Topbar.jsx              # 頂部列
    MapView.jsx             # 10 輪 Cycle 學習地圖
    CycleView.jsx           # 單一 Cycle 容器（進度條 + 分流到學生／教師視角）
    StudentCycleView.jsx    # 學生視角：功能分頁（經理人/投資人/排行榜/外部評議）
    TeacherCycleView.jsx    # 教師視角：課程指揮中心 Dashboard
    FeatureGrid.jsx         # 功能卡片列表（依 Day 開放/鎖定/唯讀）
    FeatureDetail.jsx       # 依 group/id 路由到對應功能詳情畫面
    ProfileView.jsx         # 期末 Talent Evidence Profile
    Pill.jsx                # 單選／多選藥丸元件
    StarsRow.jsx             # 星等評分元件
    screens/
      ManagerScreens.jsx     # 經理人面板各功能畫面
      InvestorScreens.jsx    # 投資人面板各功能畫面
      LeaderboardScreens.jsx # 排行榜各功能畫面
      ExternalScreens.jsx    # 外部評議各功能畫面
      BackLink.jsx           # 功能詳情返回列
```

## 與原始版本的主要差異

- 移除所有 `innerHTML` 字串拼接與 `document.getElementById` 手動渲染，改用 JSX + React 元件樹。
- 移除全域可變物件 `app` 與 `onclick="fn()"` 字串綁定，改用 `useReducer` 統一管理狀態、`onClick={fn}` 綁定事件。
- `showToast()` 改為 `ToastContext`，任何元件都可透過 `useToast()` 呼叫。
- 邏輯（Cycle/Day 進度、功能開放時程、鎖定狀態判斷）完整保留，行為與原型一致。
- 交易表單、申購贖回等仍為靜態示範資料，尚未串接真實運算或後端 API（與原型相同）。
