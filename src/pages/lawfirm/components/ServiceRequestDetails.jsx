import React from "react";
import PropTypes from "prop-types";
const ServiceRequestDetails = ({ data }) => {
  const {
    requestBy,
    service,
    amount,
    payment_status,
    transaction_id,
    createdAt,
    fields,
  } = data;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-6">
      {/* User Info */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          👤 Requested By
        </h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <strong>Name:</strong> {requestBy?.firstname} {requestBy?.lastname}
          </div>
          <div>
            <strong>Username:</strong> {requestBy?.username}
          </div>
          <div>
            <strong>Email:</strong> {requestBy?.email}
          </div>
          <div>
            <strong>Verified:</strong>{" "}
            {requestBy?.verified ? "✅ Yes" : "❌ No"}
          </div>
          <div>
            <strong>Connected:</strong>{" "}
            {requestBy?.connected ? "🟢 Yes" : "🔴 No"}
          </div>
          <div>
            <strong>Account Type:</strong> {requestBy?.accountType}
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            {new Date(requestBy?.createdAt).toLocaleString()}
          </div>
        </div>
      </section>

      <hr />

      {/* Service Info */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🛎️ Service Info
        </h2>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={service?.icon_url}
            alt="Service Icon"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">{service?.name}</p>
            <p className="text-sm text-gray-500">{service?.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>Service ID:</strong> {service?.id}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            {service?.status === "approved" ? "✅ Approved" : "❌ Not Approved"}
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            {new Date(service?.createdAt).toLocaleString()}
          </div>
        </div>
      </section>

      <hr />

      {/* Payment Info */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          💳 Payment Info
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>Amount:</strong> ${amount}
          </div>
          <div>
            <strong>Status:</strong> {payment_status}
          </div>
          <div>
            <strong>Transaction ID:</strong> {transaction_id || "N/A"}
          </div>
          <div>
            <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
          </div>
        </div>
      </section>

      <hr />

      {/* Fields Info */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          📝 Submitted Fields
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          {Object.entries(
            typeof fields === "string" ? JSON.parse(fields) : fields
          ).map(([key, value]) => (
            <div key={key}>
              <strong>{key.replace(/_/g, " ")}:</strong> {value}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
ServiceRequestDetails.propTypes = {
  data: PropTypes.object,
};
export default ServiceRequestDetails;
