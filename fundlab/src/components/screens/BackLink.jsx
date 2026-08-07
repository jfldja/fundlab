export function BackLink({ label, onBack }) {
  return (
    <div className="panel-back" onClick={onBack}>
      ‹ 返回{label}
    </div>
  );
}
