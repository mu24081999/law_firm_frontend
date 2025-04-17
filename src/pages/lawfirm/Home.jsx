import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function LawFirmHome() {
  const { user } = useSelector((state) => state.auth);
  const navigateTo = useNavigate();
  const handleNavigate = () => {
    navigateTo(`/${user.id}/login`);
  };
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div>
        <Button
          type="button"
          onClick={handleNavigate}
          className="max-w-52 float-end"
        >
          Client Portal
        </Button>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Law Firm Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-blue-700">Total Clients</h2>
          <p className="text-3xl font-bold text-blue-900 mt-2">0</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-yellow-700">Active Cases</h2>
          <p className="text-3xl font-bold text-yellow-900 mt-2">0</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-green-700">
            Completed Cases
          </h2>
          <p className="text-3xl font-bold text-green-900 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}

export default LawFirmHome;
