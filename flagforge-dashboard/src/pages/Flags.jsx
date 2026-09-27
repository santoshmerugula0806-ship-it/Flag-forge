import { useEffect, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import FlagTable from "../components/flags/FlagTable";
import FlagModal from "../components/flags/FlagModal";
import Spinner from "../components/shared/Spinner";
import EmptyState from "../components/shared/EmptyState";
import Button from "../components/shared/Button";
import { initialFlags } from "../data/mockFlags";

export default function Flags() {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFlag, setEditingFlag] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setFlags(initialFlags);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  function handleSave(flag) {
    setFlags((prev) => {
      const exists = prev.some((f) => f.id === flag.id);
      return exists ? prev.map((f) => (f.id === flag.id ? flag : f)) : [flag, ...prev];
    });
  }

  function openCreate() {
    setEditingFlag(null);
    setModalOpen(true);
  }

  function openEdit(flag) {
    setEditingFlag(flag);
    setModalOpen(true);
  }

  return (
    <PageWrapper title="Feature Flags">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Feature Flags</h2>
          <p className="text-sm text-slate-500">Control rollouts across your environments.</p>
        </div>
        <Button onClick={openCreate}>+ New Flag</Button>
      </div>

      {loading ? (
        <div className="py-24">
          <Spinner size={32} message="Loading flags…" />
        </div>
      ) : flags.length === 0 ? (
        <EmptyState
          icon="🚩"
          title="No flags yet"
          message="Create your first feature flag to start controlling rollouts."
          ctaLabel="Create your first flag"
          onCta={openCreate}
        />
      ) : (
        <FlagTable flags={flags} onEdit={openEdit} />
      )}

      <FlagModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        flag={editingFlag}
      />
    </PageWrapper>
  );
}
