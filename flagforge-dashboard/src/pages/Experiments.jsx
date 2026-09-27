import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/layout/PageWrapper";
import ExperimentCard from "../components/experiments/ExperimentCard";
import Spinner from "../components/shared/Spinner";
import EmptyState from "../components/shared/EmptyState";
import { initialExperiments } from "../data/mockExperiments";

export default function Experiments() {
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setExperiments(initialExperiments);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setExperiments((prev) =>
        prev.map((exp) => {
          if (exp.status !== "running") return exp;
          const bumpA = Math.random() < 0.5 ? Math.floor(Math.random() * 3) : 0;
          const bumpB = Math.random() < 0.6 ? Math.floor(Math.random() * 4) : 0;
          return {
            ...exp,
            variantA: {
              ...exp.variantA,
              conversions: exp.variantA.conversions + bumpA,
              visitors: exp.variantA.visitors + Math.floor(Math.random() * 5),
            },
            variantB: {
              ...exp.variantB,
              conversions: exp.variantB.conversions + bumpB,
              visitors: exp.variantB.visitors + Math.floor(Math.random() * 5),
            },
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <PageWrapper title="Experiments">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Experiments</h2>
        <p className="text-sm text-slate-500">
          Live A/B test results — running experiments update every few seconds.
        </p>
      </div>

      {loading ? (
        <div className="py-24">
          <Spinner size={32} message="Loading experiments…" />
        </div>
      ) : experiments.length === 0 ? (
        <EmptyState
          icon="🧪"
          title="No experiments yet"
          message="Launch your first A/B test to see results here."
        />
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {experiments.map((exp) => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}
        </motion.div>
      )}
    </PageWrapper>
  );
}
