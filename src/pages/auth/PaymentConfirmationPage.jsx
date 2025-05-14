import React from "react";
import { RiLoader2Fill } from "react-icons/ri";

const PaymentConfirmationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
        <RiLoader2Fill className="mx-auto h-12 w-12 text-blue-600 animate-spin mb-4" />
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Confirming Your Payment
        </h1>
        <p className="text-gray-600 text-sm">
          Thanks for your patience. As soon as your payment is verified you will
          be given access to dashboard.
        </p>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
