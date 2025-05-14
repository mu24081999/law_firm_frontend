import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
const PrivateRoute = ({
  children,
  isAuthenticated,
  isSubscribed,
  loading,
  emailVerified,
  subscriptionStatus,
}) => {
  console.log(
    "🚀 ~  children,isAuthenticated,isSubscribed,loading,emailVerified,:",
    // children,
    isAuthenticated,
    isSubscribed,
    loading,
    emailVerified,
    subscriptionStatus
  );
  const navigateTo = useNavigate();
  window.onbeforeunload = function (event) {
    event.returnValue =
      "You have unsaved changes. Are you sure you want to leave?";
    localStorage.setItem("lastLocation", location.pathname);
  };
  // useEffect(() => {
  //   // Redirect to the last location on component mount
  //   const savedLocation = localStorage.getItem("lastLocation");
  //   if (savedLocation && savedLocation !== location.pathname) {
  //     navigateTo(savedLocation);
  //     localStorage.removeIte m("lastLocation");
  //   }
  // }, []);
  if (!emailVerified && isAuthenticated) {
    return <Navigate to={`/otp`} replace />;
  }
  // User not logged in
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }
  // User is logged in but has no valid subscription
  if (!isSubscribed && isAuthenticated && !loading) {
    return <Navigate to="/subscription" replace />;
  }
  if (
    isSubscribed &&
    isAuthenticated &&
    !loading &&
    subscriptionStatus !== "active"
  ) {
    return <Navigate to="/processing" replace />;
  }
  // User is authenticated and subscribed
  return children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool,
  isSubscribed: PropTypes.bool,
  loading: PropTypes.bool,
  emailVerified: PropTypes.bool,
  subscriptionStatus: PropTypes.string,
};
// PrivateRoute.defaultProps = {
//   isAuthenticated: false,
//   subscription: null,
//   loading: true,
// };
export default PrivateRoute;
