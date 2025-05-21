import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProfileMenu from "../components/ProfileMenu";
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
  UsersIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotificationDropdown from "../components/NotificationDropdown";
import { FaFileInvoice } from "react-icons/fa";
// import DarkModeSwitcher from "../components/DarkmodeSwitcher";
import {
  IoDocumentLockOutline,
  IoFolderOpenOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";

function LawFirmLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/lawfirm",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      name: "Clients",
      path: "/lawfirm/clients",
      icon: <UserGroupIcon className="w-5 h-5" />,
    },
    {
      name: "Services",
      path: "/lawfirm/services",
      icon: <BriefcaseIcon className="w-5 h-5" />,
    },
    {
      name: "Services Requests",
      path: "/lawfirm/service-requests",
      icon: <BriefcaseIcon className="w-5 h-5" />,
    },
    {
      name: "Template Editor",
      path: "/lawfirm/template",
      icon: <DocumentTextIcon className="w-5 h-5" />,
    },
    {
      name: "Team Chat",
      path: "/lawfirm/team-chat",
      icon: <UserPlusIcon className="w-5 h-5" />,
    },
    {
      name: "Client Chat",
      path: "/lawfirm/chat",
      icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
    },
    {
      name: "Case Management",
      path: "/lawfirm/case-management",
      icon: <IoDocumentLockOutline className="w-5 h-5" />,
    },
    {
      name: "Leads Management",
      path: "/lawfirm/leads-management",
      icon: <TbUsersGroup className="w-5 h-5" />,
    },
    {
      name: "Document Management",
      path: "/lawfirm/document-management",
      icon: <IoFolderOpenOutline className="w-5 h-5" />,
    },
    {
      name: "Billing And Invoicing",
      path: "/lawfirm/billing",
      icon: <IoWalletOutline className="w-5 h-5" />,
    },
    {
      name: "Settings",
      path: "/lawfirm/settings",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
    },
    {
      name: "Payment Integrations",
      path: "/lawfirm/payment-integrations",
      icon: <RiSecurePaymentLine className="w-5 h-5" />,
    },
  ];
  if (!user?.member) {
    sidebarItems?.splice(6, 0, {
      name: "Team",
      path: "/lawfirm/team",
      icon: <UsersIcon className="w-5 h-5" />,
    }); //0 for do not delete anything
  }
  const handleSidebarToggle = (value) => {
    setIsSidebarOpen(value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        items={sidebarItems}
        userType="Law Firm"
        handleSidebarToggle={handleSidebarToggle}
      />

      <div className={isSidebarOpen ? "ml-64" : "ml-0"}>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end h-16">
              <div className="flex items-center">
                <NotificationDropdown notifications={notifications} />
                <div className="ml-3 relative">
                  <ProfileMenu userType="Law Firm" />
                </div>
                {/* <DarkModeSwitcher /> */}
              </div>
            </div>
          </div>
        </nav>

        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
LawFirmLayout.propTypes = {
  children: PropTypes.any,
};
export default LawFirmLayout;
