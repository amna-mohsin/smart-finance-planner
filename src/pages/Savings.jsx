// src/pages/Savings.jsx
import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function Savings() {
  const { savingsGoal, setSavingsGoal, getTotalIncomes, getTotalExpenses } = useFinance();
  const [newGoal, setNewGoal] = useState(savingsGoal);

  const totalIncome = getTotalIncomes();
  const totalExpenses = getTotalExpenses();
  const currentBalance = totalIncome - totalExpenses;
  const savingsPercentage = (currentBalance / savingsGoal) * 100;

  const handleUpdateGoal = () => {
    setSavingsGoal(parseFloat(newGoal));
  };

  const mockData = [
    { month: 'Jan', savings: 10000 },
    { month: 'Feb', savings: 15000 },
    { month: 'Mar', savings: 22000 },
    { month: 'Apr', savings: 28000 },
    { month: 'May', savings: 35000 },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Savings Tracker</h1>

      {/* Main Savings Card */}
      <div className="cards-grid">
        <div className="chart-container" style={{ gridColumn: '1 / -1' }}>
          <h3>Savings Goal Progress</h3>
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#4CAF50', marginBottom: '10px' }}>
              PKR {currentBalance.toLocaleString()}
            </div>
            <p style={{ margin: 0, color: '#999', fontSize: '14px', marginBottom: '20px' }}>
              of PKR {savingsGoal.toLocaleString()} goal
            </p>

            {/* Progress Bar */}
            <div style={{ background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', height: '20px', marginBottom: '20px' }}>
              <div
                style={{
                  background: savingsPercentage >= 100 ? '#4CAF50' : '#FF9800',
                  width: `${Math.min(100, savingsPercentage)}%`,
                  height: '100%',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            <p style={{ margin: 0, color: '#212121', fontWeight: 'bold', marginBottom: '20px' }}>
              {savingsPercentage.toFixed(1)}% Complete
            </p>

            {/* Update Goal Form */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <input
                type="number"
                className="form-control"
                style={{ maxWidth: '200px' }}
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="New goal amount"
              />
              <button className="btn btn-primary" onClick={handleUpdateGoal}>
                Update Goal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="cards-grid" style={{ marginTop: '30px' }}>
        <div className="stat-card">
          <div className="stat-card-label">Current Balance</div>
          <div className="stat-card-value" style={{ color: currentBalance >= 0 ? '#4CAF50' : '#f44336' }}>
            PKR {currentBalance.toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">Savings Goal</div>
          <div className="stat-card-value">PKR {savingsGoal.toLocaleString()}</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">Remaining to Save</div>
          <div className="stat-card-value" style={{ color: savingsGoal - currentBalance > 0 ? '#FF9800' : '#4CAF50' }}>
            PKR {Math.max(0, savingsGoal - currentBalance).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container" style={{ marginTop: '30px' }}>
        <h3>Savings Growth Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockData}>
            <defs>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `PKR ${value}`} />
            <Area
              type="monotone"
              dataKey="savings"
              stroke="#4CAF50"
              fillOpacity={1}
              fill="url(#colorSavings)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tips */}
      <div className="chart-container" style={{ marginTop: '30px' }}>
        <h3>Savings Tips</h3>
        <ul style={{ lineHeight: '1.8', color: '#555' }}>
          <li>📌 Track every expense to identify saving opportunities</li>
          <li>💳 Set up automatic transfers to a savings account</li>
          <li>🎯 Break down your goal into smaller monthly targets</li>
          <li>📊 Review your spending regularly and adjust budget</li>
          <li>⏰ Start small and gradually increase your savings rate</li>
        </ul>
      </div>
    </div>
  );
}
