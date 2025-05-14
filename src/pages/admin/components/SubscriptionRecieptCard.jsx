import React from "react";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateSubscriptionReciept } from "../../../redux/services/users";

const SubscriptionReceiptCard = ({ subscriptionReciept, handleClose }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { id, userId, subscriptionId, reciept_url, status, createdAt } =
    subscriptionReciept;

  const statusStyles = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
  };

  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-4 space-y-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">
        Subscription Receipt
      </h2>

      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">ID:</span> {id}
        </p>
        <p>
          <span className="font-medium">User ID:</span> {userId}
        </p>
        <p>
          <span className="font-medium">Subscription ID:</span> {subscriptionId}
        </p>
        <p>
          <span className="font-medium">Created At:</span> {formattedDate}
        </p>
      </div>

      <div>
        <span className="font-medium text-sm text-gray-600 space-y-1">
          Status:
        </span>

        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            statusStyles[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="pt-2">
        <span className="font-medium text-sm text-gray-600 space-y-1">
          Reciept :
        </span>
        <img
          src={reciept_url}
          alt="Receipt"
          className="rounded-lg border border-gray-200"
        />
      </div>
      {status === "pending" && (
        <div className="pt-2">
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              const query = `recieptId=${id}`;
              dispatch(
                updateSubscriptionReciept(
                  token,
                  {
                    status: "confirm",
                  },
                  query
                )
              );
              handleClose();
            }}
          >
            Verify Receipt
          </Button>
        </div>
      )}
    </div>
  );
};

SubscriptionReceiptCard.propTypes = {
  subscriptionReciept: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    subscriptionId: PropTypes.string.isRequired,
    reciept_url: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SubscriptionReceiptCard;
