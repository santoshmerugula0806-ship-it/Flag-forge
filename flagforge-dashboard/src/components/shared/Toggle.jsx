import { motion } from "framer-motion";

export default function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-checked={checked}
        className="sr-only"
      />
      <span
        onClick={() => onChange?.(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          checked ? "bg-on-500" : "bg-base-600"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="h-5 w-5 rounded-full bg-white shadow"
          style={{ marginLeft: checked ? 22 : 2 }}
        />
      </span>
      {label && <span className="text-sm text-slate-300">{label}</span>}
    </label>
  );
}
