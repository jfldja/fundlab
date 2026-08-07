// 單列星等評分（Fund Rating Card 使用）。editable 時可點擊修改。
export function StarsRow({ label, value, editable, onChange }) {
  return (
    <div className="rating-item">
      <span>{label}</span>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`star${i <= value ? " filled" : ""}`}
            onClick={editable ? () => onChange(i) : undefined}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
}

// 唯讀星等顯示（例如經理人回應品質評分、外部評議 rating）
export function StaticStars({ filled, total = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`star${i < filled ? " filled" : ""}`}>
          ●
        </span>
      ))}
    </div>
  );
}
