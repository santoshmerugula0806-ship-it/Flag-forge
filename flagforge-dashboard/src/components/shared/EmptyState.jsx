import { motion } from "framer-motion";
import Button from "./Button";

export default function EmptyState({ icon = "🗂️", title, message, ctaLabel, onCta }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-base-600 bg-base-900/40 py-20 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-5xl"
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      {message && <p className="max-w-sm text-sm text-slate-400">{message}</p>}
      {ctaLabel && (
        <Button className="mt-2" onClick={onCta}>
          {ctaLabel}
        </Button>
      )}
    </motion.div>
  );
}
