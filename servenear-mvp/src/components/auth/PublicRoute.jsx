import { Navigate } from "react-router-dom";
import { getCurrentUser, getDashboardPath } from "../../utils/authStorage";

export default function PublicRoute({ children }) {
  const currentUser = getCurrentUser();

  if (currentUser) {
    return <Navigate to={getDashboardPath(currentUser.role)} replace />;
  }

  return children;
}