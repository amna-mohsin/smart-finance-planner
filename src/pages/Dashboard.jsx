// src/pages/Dashboard.jsx
import { useFinance } from "../context/FinanceContext";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

export default function Dashboard() {
  const { getTotalIncomes, getTotalExpenses, savingsGoal, getTotalMarriageExpenses, getExpensesByCategory, getIncomesByCategory } = useFinance();

  const totalIncome = getTotalIncomes();
  const totalExpenses = getTotalExpenses();
  const balance = totalIncome - totalExpenses;
  const marriageExpenses = getTotalMarriageExpenses();

  const expensesByCategory = getExpensesByCategory();
  const incomeByCategory = getIncomesByCategory();

  const expenseChartData = Object.entries(expensesByCategory)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  const incomeChartData = Object.entries(incomeByCategory)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  const COLORS = ['#4CAF50', '#2196F3', '#FF5722', '#FF9800', '#9C27B0', '#00BCD4', '#FFC107', '#E91E63', '#607D8B'];

  return (
    <div>
      <h1 style={{ marginBottom: '30px', color: '#212121' }}>Financial Overview</h1>

      {/* Stats Cards */}
      <div className="cards-grid">
        <div className="stat-card income">
          <div className="stat-card-icon">💰</div>
          <div className="stat-card-label">Total Income</div>
          <div className="stat-card-value">PKR {totalIncome.toLocaleString()}</div>
        </div>

        <div className="stat-card expense">
          <div className="stat-card-icon">📉</div>
          <div className="stat-card-label">Total Expenses</div>
          <div className="stat-card-value">PKR {totalExpenses.toLocaleString()}</div>
        </div>

        <div className="stat-card savings">
          <div className="stat-card-icon">🎯</div>
          <div className="stat-card-label">Balance</div>
          <div className="stat-card-value" style={{ color: balance >= 0 ? '#4CAF50' : '#f44336' }}>
            PKR {balance.toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">💍</div>
          <div className="stat-card-label">Marriage Fund Used</div>
          <div className="stat-card-value">PKR {marriageExpenses.toLocaleString()}</div>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        {/* Expense Distribution */}
        {expenseChartData.length > 0 && (
          <div className="chart-container">
            <div className="chart-title">Expense Distribution</div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name}: PKR ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `PKR ${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Income Distribution */}
        {incomeChartData.length > 0 && (
          <div className="chart-container">
            <div className="chart-title">Income Distribution</div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name}: PKR ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incomeChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `PKR ${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Income vs Expenses */}
        <div className="chart-container">
          <div className="chart-title">Income vs Expenses</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: 'Income', value: totalIncome },
                { name: 'Expenses', value: totalExpenses },
                { name: 'Balance', value: balance },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `PKR ${value}`} />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary */}
      <div className="chart-container" style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '20px' }}>Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <p style={{ margin: 0, color: '#999', fontSize: '12px', textTransform: 'uppercase' }}>Savings Goal</p>
            <p style={{ margin: '10px 0 0 0', fontSize: '20px', fontWeight: 'bold' }}>PKR {savingsGoal.toLocaleString()}</p>
            <p style={{ margin: '5px 0 0 0', color: '#999', fontSize: '12px' }}>Current Balance: PKR {balance.toLocaleString()}</p>
            <div style={{ marginTop: '10px', background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', height: '8px' }}>
              <div style={{ background: balance >= savingsGoal ? '#4CAF50' : '#FF9800', width: `${Math.min(100, (balance / savingsGoal) * 100)}%`, height: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
