import { motion } from "framer-motion";
import ConfidenceBadge from "./ConfidenceBadge";
import VariantChart from "./VariantChart";

function StatBlock({ label, variant, accent }) {
  const rate = ((variant.conversions / variant.visitors) * 100).toFixed(2);
  return (
    <div className="flex-1 rounded-xl border border-base-700 bg-base-900/60 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 text-xl font-bold ${accent}`}>{rate}%</p>
      <p className="text-xs text-slate-500">
        {variant.conversions.toLocaleString()} / {variant.visitors.toLocaleString()}
      </p>
    </div>
  );
}

export default function ExperimentCard({ experiment }) {
  const isRunning = experiment.status === "running";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="card-hover rounded-2xl border border-base-800 bg-base-900/50 p-5 shadow-card"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-100">{experiment.name}</h3>
          <p className="text-xs text-slate-500">Started {experiment.startDate}</p>
        </div>
        <span
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
            isRunning
              ? "border-on-500/30 bg-on-500/10 text-on-400"
              : "border-base-600 bg-base-800 text-slate-400"
          }`}
        >
          {isRunning && (
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-on-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          )}
          {isRunning ? "Running" : "Completed"}
        </span>
      </div>

      <div className="mb-4 flex gap-3">
        <StatBlock label={experiment.variantA.name} variant={experiment.variantA} accent="text-brand-300" />
        <StatBlock label={experiment.variantB.name} variant={experiment.variantB} accent="text-on-400" />
      </div>

      <div className="mb-3 flex justify-end">
        <ConfidenceBadge confidence={experiment.confidence} />
      </div>

      <VariantChart variantA={experiment.variantA} variantB={experiment.variantB} />
    </motion.div>
  );
}
