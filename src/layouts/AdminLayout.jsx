import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  HomeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import ProfileMenu from "../components/ProfileMenu";
import PropTypes from "prop-types";
function AdminLayout({ children }) {
  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
    },
    {
      name: "Law Firms",
      path: "/admin/law-firms",
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <UserGroupIcon className="w-5 h-5" />,
    },
    {
      name: "Contacts",
      path: "/admin/contacts",
      icon: <UserPlusIcon className="w-5 h-5" />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar items={sidebarItems} userType="Admin" />

      <div className="pl-64">
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
AdminLayout.propTypes = {
  children: PropTypes.any,
};
export default AdminLayout;
