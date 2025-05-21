// components/Notification.jsx
import React from "react";
// import dayjs from "dayjs";
import PropTypes from "prop-types";
const icons = {
  login: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325Z"
        fill="#4338CA"
      />
    </svg>
  ),
  // Add more icons for other message types like "logout", "error", etc.
};

const Notification = ({ title = "Notifications", notifications = [] }) => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-auto p-8">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-gray-800">{title}</p>
      </div>

      {notifications.map((item, index) => {
        const isRead = item.is_read === "1";

        return (
          <div
            key={item.id || index}
            className={`w-full p-3 mt-4 rounded flex items-start transition ${
              isRead ? "bg-white" : "bg-blue-50 shadow"
            }`}
          >
            <div className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center">
              {icons[item.messageType] || icons.login}
            </div>
            <div className="pl-3 w-full">
              <p className="text-sm font-medium text-gray-800">
                {item.message}
              </p>
              <p className="text-xs text-gray-500">{item.description}</p>
              {/* <p className="text-xs pt-1 text-gray-400">
                {momen(item.createdAt).format("MMM D, YYYY h:mm A")}
              </p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
Notification.propTypes = {
  title: PropTypes.string,
  notifications: PropTypes.array,
};
export default Notification;
