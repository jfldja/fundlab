import { useReducer } from "react";
import { initialState, reducer } from "./state";
import { ToastProvider } from "./ToastContext";
import { LoginScreen } from "./components/LoginScreen";
import { Topbar } from "./components/Topbar";
import { MapView } from "./components/MapView";
import { CycleView } from "./components/CycleView";
import { ProfileView } from "./components/ProfileView";
import "./App.css";

function AppShell() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onLogin = (userId) => dispatch({ type: "LOGIN", userId });
  const onLogout = () => dispatch({ type: "LOGOUT" });
  const onEnterCycle = (n, status) => dispatch({ type: "ENTER_CYCLE", n, status });
  const onBackToMap = () => dispatch({ type: "BACK_TO_MAP" });
  const onGoProfile = () => dispatch({ type: "GO_PROFILE" });

  if (state.view === "login") {
    return (
      <div className="app">
        <LoginScreen onLogin={onLogin} />
      </div>
    );
  }

  return (
    <div className="app">
      <Topbar userId={state.user} onLogout={onLogout} />
      {state.view === "map" && (
        <MapView state={state} userId={state.user} onEnterCycle={onEnterCycle} onGoProfile={onGoProfile} />
      )}
      {state.view === "cycle" && (
        <CycleView state={state} userId={state.user} dispatch={dispatch} onBackToMap={onBackToMap} />
      )}
      {state.view === "profile" && <ProfileView onBackToMap={onBackToMap} />}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppShell />
    </ToastProvider>
  );
}
