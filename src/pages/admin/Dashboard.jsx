import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import AdminHome from "./Home";
import ManageLawFirms from "./ManageLawFirms";
import ManageLawfirmUsers from "./ManageLawfirmUsers";
import AdminContacts from "./Contacts";
import Services from "./Services";
import Requests from "../user/Requests";
import Permission from "./Permission";
import Template from "./Template";

function Dashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/default-templates" element={<Template />} />
        <Route path="/user-permissions" element={<Permission />} />
        <Route path="/law-firms" element={<ManageLawfirmUsers />} />
        <Route path="/contacts" element={<AdminContacts />} />
        <Route path="/services" element={<Services />} />
        <Route path="/requests" element={<Requests />} />
      </Routes>
    </AdminLayout>
  );
}

export default Dashboard;
