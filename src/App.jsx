import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ScanPage from "./pages/ScanPage";
import Projects from "./pages/Projects";
import NotFoundPage from "./pages/NotFoundPage";
import PublicRoute from "./components/Routes/PublicRoute";
import RootRedirect from "./components/Routes/RootRedirect";
import ProtectedRoute from "./components/Routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/scans" element={<ScanPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
