import { useDispatch, useSelector } from "react-redux";
import { getAdminAnalytics } from "../../redux/services/analytics";
import { useEffect } from "react";

function AdminHome() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { analytics } = useSelector((state) => state.analytics);
  useEffect(() => {
    if (token) {
      dispatch(getAdminAnalytics(token));
    }
  }, [dispatch, token]);
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-indigo-700">
            Total Law Firms
          </h2>
          <p className="text-3xl font-bold text-indigo-900 mt-2">
            {analytics?.totalLawFirms}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-green-700">Total Users</h2>
          <p className="text-3xl font-bold text-green-900 mt-2">
            {analytics?.totalUsers}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-purple-700">
            Active serviceRequests
          </h2>
          <p className="text-3xl font-bold text-purple-900 mt-2">
            {analytics?.serviceRequests}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
