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
// import DarkModeSwitcher from "../components/DarkmodeSwitcher";

function LawFirmLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
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
    sidebarItems?.push({
      name: "Team",
      path: "/lawfirm/team",
      icon: <UsersIcon className="w-5 h-5" />,
    });
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
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
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
