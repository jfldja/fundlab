import { useState } from "react";

// 單選或多選的藥丸型選項群組。原本用 togglePill(el, group) 直接操作 DOM classList，
// 這裡改用 React state 控制選取狀態。
export function PillGroup({ options, mode = "single", disabled = false, defaultSelected }) {
  const initial =
    defaultSelected ?? (mode === "single" ? [options[0]] : options.slice(0, Math.min(2, options.length)));
  const [selected, setSelected] = useState(initial);

  const toggle = (opt) => {
    if (disabled) return;
    if (mode === "single") {
      setSelected([opt]);
    } else {
      setSelected((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));
    }
  };

  return (
    <div className="pill-group">
      {options.map((opt) => (
        <div
          key={opt}
          className={`pill${selected.includes(opt) ? " selected" : ""}${disabled ? " locked" : ""}`}
          onClick={() => toggle(opt)}
        >
          {opt}
        </div>
      ))}
    </div>
  );
}
