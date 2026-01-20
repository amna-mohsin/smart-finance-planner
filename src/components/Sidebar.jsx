// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { DollarSign, TrendingUp, TrendingDown, PiggyBank, Heart } from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <h2>
        <DollarSign size={28} />
        SmartFinance
      </h2>
      <nav>
        <Link to="/" className={isActive("/")} title="Dashboard" onClick={handleLinkClick}>
          <DollarSign size={20} />
          Dashboard
        </Link>
        <Link to="/income" className={isActive("/income")} title="Income Tracker" onClick={handleLinkClick}>
          <TrendingUp size={20} />
          Income
        </Link>
        <Link to="/expenses" className={isActive("/expenses")} title="Expense Tracker" onClick={handleLinkClick}>
          <TrendingDown size={20} />
          Expenses
        </Link>
        <Link to="/savings" className={isActive("/savings")} title="Savings" onClick={handleLinkClick}>
          <PiggyBank size={20} />
          Savings
        </Link>
        <Link to="/marriage" className={isActive("/marriage")} title="Marriage Planner" onClick={handleLinkClick}>
          <Heart size={20} />
          Marriage Planner
        </Link>
      </nav>
    </div>
  );
}
