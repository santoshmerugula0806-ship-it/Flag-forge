import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/shared/Button";
import { initialFlags } from "../data/mockFlags";
import { initialExperiments } from "../data/mockExperiments";

function SummaryCard({ label, value, accent, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="card-hover rounded-2xl border border-base-800 bg-base-900/50 p-5 shadow-card"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${accent}`}>{value}</p>
    </motion.div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const totalFlags = initialFlags.length;
    const activeFlags = initialFlags.filter((f) => f.status).length;
    const runningExperiments = initialExperiments.filter((e) => e.status === "running").length;
    const avgConfidence = Math.round(
      initialExperiments.reduce((sum, e) => sum + e.confidence, 0) / initialExperiments.length
    );
    setStats({ totalFlags, activeFlags, runningExperiments, avgConfidence });
  }, []);

  const recentActivity = [...initialFlags]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

  return (
    <PageWrapper title="Dashboard">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-100">
          Welcome back <span className="shimmer-text animate-shimmer">👋</span>
        </h2>
        <p className="text-sm text-slate-500">Here's what's happening across your flags today.</p>
      </div>

      {stats && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard label="Total Flags" value={stats.totalFlags} accent="text-slate-100" delay={0} />
          <SummaryCard label="Active Flags" value={stats.activeFlags} accent="text-on-400" delay={0.05} />
          <SummaryCard
            label="Running Experiments"
            value={stats.runningExperiments}
            accent="text-brand-300"
            delay={0.1}
          />
          <SummaryCard
            label="Avg. Confidence"
            value={`${stats.avgConfidence}%`}
            accent="text-warn-400"
            delay={0.15}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 rounded-2xl border border-base-800 bg-base-900/50 p-5 shadow-card"
        >
          <h3 className="mb-4 font-semibold text-slate-100">Recent activity</h3>
          <ul className="space-y-3">
            {recentActivity.map((f, i) => (
              <motion.li
                key={f.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
                className="flex items-center justify-between rounded-lg border border-base-800 bg-base-900/60 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-200">{f.name}</p>
                  <p className="text-xs text-slate-500">{f.environment}</p>
                </div>
                <span
                  className={`h-2 w-2 rounded-full ${f.status ? "bg-on-400" : "bg-slate-600"}`}
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-2xl border border-base-800 bg-base-900/50 p-5 shadow-card"
        >
          <h3 className="mb-4 font-semibold text-slate-100">Quick actions</h3>
          <div className="flex flex-col gap-3">
            <Button onClick={() => navigate("/flags")} className="justify-center">
              Create Flag
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/experiments")}
              className="justify-center"
            >
              New Experiment
            </Button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
