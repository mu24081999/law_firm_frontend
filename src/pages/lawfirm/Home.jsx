import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFirmAnalytics } from "../../redux/services/analytics";
function LawFirmHome() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { analytics } = useSelector((state) => state.analytics);
  const [analyticsData, setAnalyticsData] = useState({});
  const navigateTo = useNavigate();
  const handleNavigate = () => {
    navigateTo(`/${user.id}/login`);
  };

  useEffect(() => {
    dispatch(getFirmAnalytics(token, user.id));
  }, [token, user, dispatch]);
  useEffect(() => {
    if (analytics) {
      setAnalyticsData(analytics);
    }
  }, [analytics]);
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
          <p className="text-3xl font-bold text-blue-900 mt-2">
            {analyticsData?.totalClients}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-yellow-700">
            Active Service Requests
          </h2>
          <p className="text-3xl font-bold text-yellow-900 mt-2">
            {analyticsData?.activeCases}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-green-700">
            Completed Service Requests
          </h2>
          <p className="text-3xl font-bold text-green-900 mt-2">
            {analyticsData?.completedCases}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LawFirmHome;
