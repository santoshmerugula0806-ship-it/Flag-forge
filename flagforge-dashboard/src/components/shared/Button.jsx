import { motion } from "framer-motion";
import Spinner from "./Spinner";

const variants = {
  primary:
    "bg-brand-500 hover:bg-brand-400 text-white shadow-glow border border-brand-400/30",
  secondary:
    "bg-base-800 hover:bg-base-700 text-slate-200 border border-base-600",
  danger:
    "bg-off-500/10 hover:bg-off-500/20 text-off-400 border border-off-500/30",
  ghost:
    "bg-transparent hover:bg-base-800 text-slate-300 border border-transparent",
};

export default function Button({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
        transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading && <Spinner size={14} />}
      <span className={isLoading ? "opacity-80" : ""}>{children}</span>
    </motion.button>
  );
}
