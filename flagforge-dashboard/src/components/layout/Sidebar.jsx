import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/flags", label: "Flags", icon: "🚩" },
  { to: "/experiments", label: "Experiments", icon: "🧪" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-16 flex-col border-r border-base-800 bg-base-900/80 backdrop-blur-md md:w-64">
      <div className="flex h-16 items-center gap-2 px-4 md:px-6">
        <motion.span
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
          className="text-xl"
        >
          🚩
        </motion.span>
        <span className="hidden bg-gradient-to-r from-brand-400 to-on-400 bg-clip-text text-lg font-bold text-transparent md:inline">
          FlagForge
        </span>
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-1 px-2 md:px-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-brand-500/10 text-brand-300"
                  : "text-slate-400 hover:bg-base-800 hover:text-slate-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute left-0 top-0 h-full w-0.5 rounded-r bg-brand-400"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="text-base">{link.icon}</span>
                <span className="hidden md:inline">{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="hidden border-t border-base-800 p-4 text-xs text-slate-500 md:block">
        v1.0.0 · mock data
      </div>
    </aside>
  );
}
