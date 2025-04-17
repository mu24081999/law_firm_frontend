import { Routes, Route } from "react-router-dom";
import LawFirmLayout from "../../layouts/LawFirmLayout";
import LawFirmHome from "./Home";
import LawFirmClients from "./Clients";
import LawFirmServices from "./Services";
import LawFirmChat from "./Chat";
import Contacts from "./Contacts";
import Settings from "./Settings";
import Team from "./Team";
import Integration from "./Integrations";
import Template from "./Template";
function Dashboard() {
  return (
    <LawFirmLayout>
      <Routes>
        <Route path="/" element={<LawFirmHome />} />
        <Route path="/template" element={<Template />} />

        <Route path="/clients" element={<LawFirmClients />} />
        <Route path="/services" element={<LawFirmServices />} />
        <Route path="/chat" element={<LawFirmChat />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payment-integrations" element={<Integration />} />
      </Routes>
    </LawFirmLayout>
  );
}

export default Dashboard;
