import { Navigate } from "react-router-dom";
import { getCurrentUser, getDashboardPath } from "../../utils/authStorage";

export default function ProtectedRoute({ children, allowedRole }) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to={getDashboardPath(currentUser.role)} replace />;
  }

  return children;
}