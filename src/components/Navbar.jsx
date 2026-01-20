// src/components/Navbar.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, LogOut, Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getPageTitle = () => {
    const titles = {
      "/": "Dashboard",
      "/income": "Income Tracking",
      "/expenses": "Expense Management",
      "/savings": "Savings Tracker",
      "/marriage": "Marriage Planning",
    };
    return titles[location.pathname] || "Smart Finance";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <button className="btn-menu" onClick={onMenuClick} title="Toggle Menu">
        <Menu size={24} />
      </button>
      <h3 style={{ margin: 0 }}>{getPageTitle()}</h3>
      <div className="navbar-right">
        <div className="profile-info">
          <User size={20} />
          <span className="profile-name">{user?.name || "User"}</span>
        </div>
        <button className="btn-logout" onClick={handleLogout} title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}
