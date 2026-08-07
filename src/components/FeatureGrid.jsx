import { featureState } from "../data";
import { useToast } from "../ToastContext";

export function FeatureGrid({ features, day, isReadonly, group, onOpenFeature }) {
  const showToast = useToast();

  return (
    <div className="feat-grid">
      {features.map((f) => {
        const st = featureState(f, day, isReadonly);
        const tagText = st === "open" ? "本日可操作" : st === "readonly" ? "已鎖定／可查看" : `Day ${f.open[0]} 開放`;
        const handleClick = () => {
          if (st === "locked") {
            showToast(`此功能於 Day ${f.open[0]} 開放，目前是 Day ${day}`);
            return;
          }
          onOpenFeature(group, f.id);
        };
        return (
          <div className={`feat ${st}`} key={f.id} onClick={handleClick}>
            <div className="f-tag">{tagText}</div>
            <div className="f-icon">{f.icon}</div>
            <div className="f-name">{f.name}</div>
            <div className="f-desc">{f.desc}</div>
          </div>
        );
      })}
    </div>
  );
}
