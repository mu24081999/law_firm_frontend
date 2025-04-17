import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserDashboard from "./pages/user/Dashboard";
import LawFirmDashboard from "./pages/lawfirm/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OTP from "./pages/auth/OTP";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        hideProgressBar
        pauseOnHover
      />
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/:firmId/login" element={<Login />} />
          <Route path="/:firmId/signup" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<OTP />} />

          {/* User Dashboard Routes */}
          <Route path="/:firmId/user/*" element={<UserDashboard />} />

          {/* Law Firm Dashboard Routes */}
          <Route path="/lawfirm/*" element={<LawFirmDashboard />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
