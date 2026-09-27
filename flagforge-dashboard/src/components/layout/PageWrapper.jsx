import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function PageWrapper({ title, children }) {
  return (
    <div className="min-h-screen bg-base-950 bg-grid-glow bg-fixed">
      <Sidebar />
      <div className="ml-16 md:ml-64">
        <Topbar title={title} />
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl px-6 py-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
