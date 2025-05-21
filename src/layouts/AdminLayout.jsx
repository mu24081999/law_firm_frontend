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
import { useSelector } from "react-redux";
import NotificationDropdown from "../components/NotificationDropdown";
function AdminLayout({ children }) {
  const { notifications } = useSelector((state) => state.user);

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

    // {
    //   name: "Settings",
    //   path: "/admin/settings",
    //   icon: <Cog6ToothIcon className="w-5 h-5" />,
    // },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar items={sidebarItems} userType="Admin" />

      <div className="pl-64">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end h-16">
              <div className="flex items-center">
                <NotificationDropdown notifications={notifications} />

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
