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
import Pricing from "./pages/auth/Pricing";
import PaymentConfirmationPage from "./pages/auth/PaymentConfirmationPage";
import TermsAndConditions from "./pages/auth/Terms";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserNotifications } from "./redux/services/users";

function App() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getUserNotifications(token, user?.id));
    }
    return () => {};
  }, [user, token, dispatch]);
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
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/processing" element={<PaymentConfirmationPage />} />

          <Route path="/:firmId/login" element={<Login />} />
          <Route path="/:firmId/signup" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/subscription" element={<Pricing />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/:firmId/forgot-password" element={<ForgotPassword />} />
          <Route path="/:firmId/otp" element={<OTP />} />

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
