import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Flags from "./pages/Flags";
import Experiments from "./pages/Experiments";
import Settings from "./pages/Settings";

function RequireAuth({ children }) {
  const user = localStorage.getItem("ff_user");
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/flags"
        element={
          <RequireAuth>
            <Flags />
          </RequireAuth>
        }
      />
      <Route
        path="/experiments"
        element={
          <RequireAuth>
            <Experiments />
          </RequireAuth>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireAuth>
            <Settings />
          </RequireAuth>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
