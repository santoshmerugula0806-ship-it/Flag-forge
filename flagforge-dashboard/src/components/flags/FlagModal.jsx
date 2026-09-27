import { useEffect, useState } from "react";
import Modal from "../shared/Modal";
import Toggle from "../shared/Toggle";
import Button from "../shared/Button";
import RolloutSlider from "./RolloutSlider";

const emptyForm = {
  name: "",
  description: "",
  environment: "production",
  rollout: 0,
  status: false,
};

export default function FlagModal({ isOpen, onClose, onSave, flag }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm(flag ? { ...flag } : emptyForm);
      setError("");
    }
  }, [isOpen, flag]);

  function handleSave() {
    if (!form.name.trim()) {
      setError("Flag name is required.");
      return;
    }
    onSave({
      ...form,
      id: flag?.id ?? `flg_${Date.now()}`,
      updatedAt: new Date().toISOString(),
    });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={flag ? "Edit flag" : "New flag"}>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Flag name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. new-checkout-flow"
            className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-slate-100 outline-none transition-colors focus:border-brand-500"
          />
          {error && <p className="mt-1 text-xs text-off-400">{error}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What does this flag control?"
            className="w-full resize-none rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-slate-100 outline-none transition-colors focus:border-brand-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Environment</label>
          <select
            value={form.environment}
            onChange={(e) => setForm({ ...form, environment: e.target.value })}
            className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-slate-100 outline-none transition-colors focus:border-brand-500"
          >
            <option value="production">production</option>
            <option value="staging">staging</option>
          </select>
        </div>

        <RolloutSlider
          value={form.rollout}
          onChange={(v) => setForm({ ...form, rollout: v })}
        />

        <div className="flex items-center justify-between rounded-lg border border-base-700 bg-base-900 px-3 py-2.5">
          <span className="text-sm font-medium text-slate-300">Enabled</span>
          <Toggle checked={form.status} onChange={(v) => setForm({ ...form, status: v })} />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save flag</Button>
        </div>
      </div>
    </Modal>
  );
}
