import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import { getCurrentUser, logoutUser } from "../../utils/authStorage";

export default function AppLayout({ children, userType = "customer" }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div>
          <strong>ServeNear</strong>
          {currentUser && (
            <p>
              {currentUser.fullName} · {currentUser.role}
            </p>
          )}
        </div>

        <button type="button" onClick={handleLogout} className="logout-button">
          Log out
        </button>
      </header>

      <main className="page-content">{children}</main>
      <BottomNav userType={userType} />
    </div>
  );
}