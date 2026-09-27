export default function Spinner({ size = 28, message, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className="animate-spin rounded-full border-2 border-base-600 border-t-brand-400"
        style={{ width: size, height: size }}
      />
      {message && <p className="text-sm text-slate-400">{message}</p>}
    </div>
  );
}
