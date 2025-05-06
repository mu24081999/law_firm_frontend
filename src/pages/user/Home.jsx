import { useDispatch, useSelector } from "react-redux";
import { getUserAnalytics } from "../../redux/services/analytics";
import { useEffect, useState } from "react";

function UserHome() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { analytics } = useSelector((state) => state.analytics);
  const [analyticsData, setAnalyticsData] = useState({});
  useEffect(() => {
    dispatch(getUserAnalytics(token, user.id));
  }, [token, user, dispatch]);
  useEffect(() => {
    if (analytics) {
      setAnalyticsData(analytics);
    }
  }, [analytics]);
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Welcome to Tax Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-blue-700">Active Services</h2>
          <p className="text-3xl font-bold text-blue-900 mt-2">
            {analyticsData?.activeCases}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-green-700">
            Completed Services
          </h2>
          <p className="text-3xl font-bold text-green-900 mt-2">
            {analyticsData?.completedCases}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
