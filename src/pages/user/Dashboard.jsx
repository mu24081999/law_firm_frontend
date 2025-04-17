import { Routes, Route } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
import UserHome from "./Home";
import UserServices from "./Services";
import UserChat from "./Chat";
import Settings from "./Settings";
import NTNVerificationForm from "./NTNVerification";
import Requests from "./Requests";
import Template from "../lawfirm/Template";

function Dashboard() {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/services" element={<UserServices />} />
        <Route path="/chat" element={<UserChat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/ntn-verification" element={<NTNVerificationForm />} />
      </Routes>
    </UserLayout>
  );
}

export default Dashboard;
