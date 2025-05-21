import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { format } from "date-fns";
import {
  FaSignInAlt,
  FaKey,
  FaConciergeBell,
  FaComments,
  FaCheckCircle,
  FaPlusCircle,
  FaInfoCircle,
  FaRegBell,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from "../redux/services/users";
import { useNavigate } from "react-router-dom";

const getMessageIcon = (type) => {
  switch (type) {
    case "login":
      return <FaSignInAlt className="text-blue-500 mt-0.5" />;
    case "reset-password":
      return <FaKey className="text-yellow-500 mt-0.5" />;
    case "service-request":
      return <FaConciergeBell className="text-purple-500 mt-0.5" />;
    case "chat":
      return <FaComments className="text-green-500 mt-0.5" />;
    case "service-request-approval":
      return <FaCheckCircle className="text-emerald-500 mt-0.5" />;
    case "new-service-addon":
      return <FaPlusCircle className="text-pink-500 mt-0.5" />;
    case "info":
    default:
      return <FaInfoCircle className="text-gray-500 mt-0.5" />;
  }
};

const NotificationDropdown = ({ notifications = [], onClickNotification }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const unreadCount = notifications.filter((n) => n.is_read === "0").length;

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleOnClick = (item) => {
    const done = dispatch(
      updateNotification(token, user?.id, item?.id, { is_read: true })
    );
    if (done?.success && done?.response?.notification?.link) {
      navigateTo(done?.response?.notification?.link);
    } else return;
  };
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 text-gray-700 hover:text-blue-600"
      >
        <FaRegBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-2 max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-2 text-sm text-gray-500">
                No notifications
              </p>
            ) : (
              notifications.map((item, index) => (
                <div
                  key={item.id || index}
                  onClick={() => handleOnClick?.(item)}
                  className={`px-4 border-b border-gray-200 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    item.is_read === "0"
                      ? "bg-blue-50 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {getMessageIcon(item.messageType)}
                    <div className="flex-1">
                      <div>{item.message}</div>
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {format(item.createdAt, "dd MMM, yyyy h:mm a")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

NotificationDropdown.propTypes = {
  notifications: PropTypes.array,
  onClickNotification: PropTypes.func,
};

export default NotificationDropdown;
