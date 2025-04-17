import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ClockIcon,
  BellIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../redux/services/auth";
import DropdownComponent from "./Dropdown";
import { FaChartLine, FaUsers } from "react-icons/fa";
import { getUserSubaccountsApi } from "../redux/services/users";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdSwitch } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

let navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Schedule", href: "/schedule", icon: CalendarIcon },
  { name: "History", href: "/history", icon: ClockIcon },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "Reviews", href: "/reviews", icon: ChatBubbleLeftRightIcon },
  { name: "Team", href: "/team", icon: UserGroupIcon },
  { name: "Team Chat", href: "/team/chat", icon: ChatBubbleLeftRightIcon },
  { name: "Website", href: "/website", icon: GlobeAltIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

function Sidebar() {
  const { users } = useSelector((state) => state.user);
  const { token, user, user_id } = useSelector((state) => state.auth);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // const { user } = useAuthStore();
  const handleLoginSubaccount = (user) => {
    const params = {
      email: user.email,
      password: user.password,
      passwordType: "decrypted",
    };
    dispatch(loginUser(params));
  };
  const handleLogout = () => {
    dispatch(logoutUser(token));
    navigate("/auth/signin");
  };
  useEffect(() => {
    const subscription =
      Array.isArray(user?.subscriptions) &&
      user?.subscriptions?.length > 0 &&
      user?.subscriptions?.[user?.subscriptions?.length - 1];
    setCurrentSubscription(subscription);
  }, [user]);
  useEffect(() => {
    if (currentSubscription?.plan === "agency" && !user?.parent_id) {
      navigation.splice(1, 0, {
        name: "Subaccounts",
        href: "/subaccounts",
        icon: UsersIcon,
      });
    }
    return () => {};
  }, [currentSubscription, user]);
  useEffect(() => {
    if (user?.parent_id !== null) {
      navigation = navigation.filter((nav) => nav.name !== "Subaccounts");
    }
    return () => {};
  }, [user]);
  useEffect(() => {
    dispatch(getUserSubaccountsApi(token, user_id));
  }, [token, user_id, dispatch]);
  useEffect(() => {
    if (users?.length > 0) {
      const filtered = users?.map((usr) => {
        return {
          ...usr,
          name: usr.firstname + " " + usr.lastname,
          onClick: () => handleLoginSubaccount(usr),
        };
      });
      setFilteredUsers(filtered);
    }
  }, [users]);
  console.log(navigation);
  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r">
      <div className="flex h-16 items-center justify-start ps-5 border-b">
        <h1 className="text-xl font-bold text-gray-900 flex gap-2">
          <span>
            <FaChartLine size={24} className="text-blue-500 mt-1" />
          </span>
          <span className=" text-2xl">Postified</span>
        </h1>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-medium">
              {user?.firstname?.[0]}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.firstname + " " + user?.lastname}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          {currentSubscription?.plan === "agency" && !user?.parent_id && (
            <DropdownComponent
              label={
                <span className=" font-medium">
                  {
                    <span className="flex items-center">
                      <IoMdSwitch size={28} className="text-gray-500" />
                      <IoMdArrowDropdown />
                    </span>
                  }
                </span>
              }
              direction={"bottom"}
              // items={users?.length > 0 ? users : []}
              items={filteredUsers}
            />
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
            >
              <item.icon
                className={`${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-400 group-hover:text-gray-900"
                } mr-3 h-6 w-6 flex-shrink-0`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Button */}
      <div className="p-4 border-t">
        <Link
          to="/settings?tab=subscription"
          className="group relative flex items-center justify-center p-4 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all duration-200"
        >
          <div className="absolute -top-3 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-gray-900">
            SAVE 10%
          </div>
          <div className="flex items-center">
            <SparklesIcon className="h-5 w-5 mr-2 animate-pulse" />
            <span className="font-medium">Upgrade Now</span>
          </div>
        </Link>
      </div>

      {/* Logout Button */}
      <div className="p-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
        >
          <CiLogout className="mr-3 h-6 w-6" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
