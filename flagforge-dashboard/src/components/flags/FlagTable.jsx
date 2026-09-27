import { motion } from "framer-motion";

function EnvBadge({ env }) {
  const styles =
    env === "production"
      ? "bg-brand-500/10 text-brand-300 border-brand-500/30"
      : "bg-warn-500/10 text-warn-400 border-warn-500/30";
  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${styles}`}>
      {env}
    </span>
  );
}

function StatusDot({ status }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span
        className={`h-2 w-2 rounded-full ${
          status ? "bg-on-400 animate-pulse-ring" : "bg-slate-600"
        }`}
      />
      <span className={status ? "text-on-400" : "text-slate-500"}>
        {status ? "Enabled" : "Disabled"}
      </span>
    </span>
  );
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ago`;
  const hours = Math.floor(diff / 3600000);
  if (hours > 0) return `${hours}h ago`;
  const mins = Math.floor(diff / 60000);
  return `${mins}m ago`;
}

export default function FlagTable({ flags, onEdit }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-base-800 bg-base-900/50 shadow-card">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-base-800 text-xs uppercase tracking-wide text-slate-500">
            <th className="px-5 py-3 font-medium">Name</th>
            <th className="px-5 py-3 font-medium">Environment</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Rollout</th>
            <th className="px-5 py-3 font-medium">Last updated</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flags.map((flag, i) => (
            <motion.tr
              key={flag.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="border-b border-base-800/60 transition-colors last:border-0 hover:bg-base-800/40"
            >
              <td className="px-5 py-4">
                <div className="font-medium text-slate-100">{flag.name}</div>
                <div className="mt-0.5 max-w-xs truncate text-xs text-slate-500">
                  {flag.description}
                </div>
              </td>
              <td className="px-5 py-4">
                <EnvBadge env={flag.environment} />
              </td>
              <td className="px-5 py-4">
                <StatusDot status={flag.status} />
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-base-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${flag.rollout}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-on-500"
                    />
                  </div>
                  <span className="text-xs text-slate-400">{flag.rollout}%</span>
                </div>
              </td>
              <td className="px-5 py-4 text-xs text-slate-500">{timeAgo(flag.updatedAt)}</td>
              <td className="px-5 py-4 text-right">
                <button
                  onClick={() => onEdit(flag)}
                  className="rounded-lg border border-base-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-brand-500/50 hover:text-brand-300"
                >
                  Edit
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
