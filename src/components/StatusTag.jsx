import React from "react";
import PropTypes from "prop-types";
const StatusTag = ({ status }) => {
  const baseClasses = "px-3 py-1 rounded-full text-sm font-semibold";

  const statusClasses = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`${baseClasses} ${
        statusClasses[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
    </span>
  );
};
StatusTag.propTypes = {
  status: PropTypes.oneOf(["active", "pending", "non-active"]).isRequired,
};
export default StatusTag;
