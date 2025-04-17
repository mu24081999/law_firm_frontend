import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
function PrivateRoute({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("user", user);
  const hasValidSubscription = user?.subscriptions?.some((sub) => {
    return (
      sub.status === "active" && new Date(sub.endDate) > new Date() // Check if the subscription is not expired
    );
  });

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }
  if (!hasValidSubscription || (!hasValidSubscription && !isAuthenticated)) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
