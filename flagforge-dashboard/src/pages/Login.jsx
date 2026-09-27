import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/shared/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("ff_user", JSON.stringify({ name: "Test User", role: "admin" }));
      navigate("/dashboard");
    }, 800);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-950 px-4">
      <div className="aurora-bg absolute inset-0 animate-aurora bg-aurora opacity-[0.08]" />
      <div className="absolute inset-0 bg-grid-glow" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm rounded-2xl border border-base-700 bg-base-900/80 p-8 shadow-card backdrop-blur-xl"
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl"
          >
            🚩
          </motion.span>
          <h1 className="text-xl font-bold text-slate-100">Welcome to FlagForge</h1>
          <p className="text-sm text-slate-500">Sign in to manage your flags & experiments</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingInput
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={setEmail}
          />
          <FloatingInput
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={setPassword}
          />

          <Button type="submit" isLoading={loading} className="w-full justify-center">
            {loading ? "Signing in…" : "Log In"}
          </Button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-600">
          Demo mode — any email & password will work.
        </p>
      </motion.div>
    </div>
  );
}

function FloatingInput({ id, type, label, value, onChange }) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        required
        className="peer w-full rounded-lg border border-base-700 bg-base-900 px-3 pb-2 pt-4 text-sm text-slate-100 outline-none transition-colors focus:border-brand-500"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-1 text-xs text-slate-500 transition-all
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500
          peer-focus:top-1 peer-focus:text-xs peer-focus:text-brand-400"
      >
        {label}
      </label>
    </div>
  );
}
