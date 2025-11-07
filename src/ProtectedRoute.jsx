// File: src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({
  children,
  requirePaid = false,
  redirectTo = "/login",
}) => {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  // Check if user is logged in
  if (!user) {
    // Save the location they were trying to access
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // If route requires paid access, check isPaid status
  if (requirePaid && !user.isPaid) {
    return <Navigate to="/upload" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
