export default function RolloutSlider({ value, onChange }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-300">Rollout percentage</label>
        <span className="rounded-md bg-base-800 px-2 py-0.5 text-xs font-semibold text-brand-300">
          {pct}%
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pct}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none transition-all"
        style={{
          background: `linear-gradient(to right, #454e73 0%, #10b981 ${pct}%, #22273d ${pct}%, #22273d 100%)`,
        }}
      />
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.35), 0 2px 6px rgba(0,0,0,0.4);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        input[type=range]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border: none;
          border-radius: 9999px;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.35), 0 2px 6px rgba(0,0,0,0.4);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
