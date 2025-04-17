import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProfileMenu from "../components/ProfileMenu";
import {
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { MdDomainVerification } from "react-icons/md";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function UserLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  const [firm, setFirm] = useState(null);
  const { firmId } = useParams();
  const sidebarItems = [
    {
      name: "Dashboard",
      path: `/${firmId}/user`,
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      name: "Services",
      path: `/${firmId}/user/services`,
      icon: <BriefcaseIcon className="w-5 h-5" />,
    },
    {
      name: "Service Requests",
      path: `/${firmId}/user/requests`,
      icon: <BriefcaseIcon className="w-5 h-5" />,
    },
    {
      name: "Chat",
      path: `/${firmId}/user/chat`,
      icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
    },
    {
      name: "NTN Verification",
      path: `/${firmId}/user/ntn-verification`,
      icon: <MdDomainVerification className="w-5 h-5" />,
    },
    {
      name: "Settings",
      path: `/${firmId}/user/settings`,
      icon: <Cog6ToothIcon className="w-5 h-5" />,
    },
  ];
  useEffect(() => {
    if (user?.firm?.id) {
      setFirm(user?.firm);
    }
    return () => {};
  }, [user]);
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar items={sidebarItems} userType="User" firm={firm} />

      <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">
        <nav
          className=" shadow-sm"
          style={{ backgroundColor: firm?.headerColor || "white" }}
        >
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
                  <ProfileMenu userType="User" />
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UserLayout;
