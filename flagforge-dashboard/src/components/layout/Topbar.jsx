import { useNavigate } from "react-router-dom";

export default function Topbar({ title }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("ff_user") || "null") || {
    name: "Test User",
  };
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function logout() {
    localStorage.removeItem("ff_user");
    navigate("/login");
  }

  return (
    <header className="glass sticky top-0 z-20 flex h-16 items-center justify-between border-b border-base-800 px-6">
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-on-500 text-xs font-bold text-white shadow-glow">
          {initials}
        </div>
        <span className="hidden text-sm text-slate-300 sm:inline">{user.name}</span>
        <button
          onClick={logout}
          className="rounded-lg border border-base-700 px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-off-500/40 hover:text-off-400"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
