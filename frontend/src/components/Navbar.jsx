import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        <span className="navbar-logo">💰</span>
        <span>StudentSpend</span>
      </Link>

      <div className="navbar-links">
        <Link
          to="/dashboard"
          className={isActive("/dashboard") ? "active-link" : ""}
        >
          Dashboard
        </Link>

        <Link
          to="/expenses"
          className={isActive("/expenses") ? "active-link" : ""}
        >
          Expenses
        </Link>

        <Link
          to="/budget"
          className={isActive("/budget") ? "active-link" : ""}
        >
          Budget
        </Link>

        <Link
          to="/goals"
          className={isActive("/goals") ? "active-link" : ""}
        >
          Goals
        </Link>

        <Link
          to="/reports"
          className={isActive("/reports") ? "active-link" : ""}
        >
          Reports
        </Link>

        <button onClick={handleLogout} className="logout-btn">
          Logout ↗
        </button>
      </div>
    </nav>
  );
}

export default Navbar;