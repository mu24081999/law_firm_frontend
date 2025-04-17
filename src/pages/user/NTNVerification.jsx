import React, { useState } from "react";
import axios from "axios";
const NTNVerificationForm = () => {
  const [ntn, setNtn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const backendURL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setIsVerified(null);

    try {
      // Replace with your API endpoint
      const response = await axios.post(`${backendURL}/ntn/verify`, {
        ntn,
      });

      if (response.data.data.verified) {
        setIsVerified(response.data.data.verified);
      } else {
        setIsVerified(false);
      }
    } catch (error) {
      setErrorMessage("Error verifying NTN. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh] bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          NTN Verification
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="ntn"
              className="block text-sm font-medium text-gray-700"
            >
              Enter NTN Number
            </label>
            <input
              type="text"
              id="ntn"
              name="ntn"
              value={ntn}
              maxLength={7}
              minLength={7}
              onChange={(e) => setNtn(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {isLoading ? (
            <button
              type="button"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg opacity-50 cursor-not-allowed"
              disabled
            >
              Verifying...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            >
              Verify NTN
            </button>
          )}
        </form>
        {isVerified !== null && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              isVerified
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isVerified ? (
              <div className="flex justify-between">
                <div>
                  <div>NTN</div>
                  <div>Name</div>
                  <div>Business Name</div>
                  <div>Status</div>
                  <div>Date</div>
                </div>
                <div>
                  <div>{isVerified?.NTN}</div>
                  <div>{isVerified?.NAME}</div>
                  <div>{isVerified?.BUSINESS_NAME || "nill"}</div>
                  <div className="text-green-500">Verified</div>
                  <div>28-09-2025</div>
                </div>
              </div>
            ) : (
              <>NTN is not valid</>
            )}
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default NTNVerificationForm;
