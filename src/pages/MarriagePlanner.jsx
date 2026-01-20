// src/pages/MarriagePlanner.jsx
import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { Trash2, Plus } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function MarriagePlanner() {
  const {
    marriageExpenses,
    addMarriageExpense,
    deleteMarriageExpense,
    marriageGoal,
    setMarriageGoal,
    getTotalMarriageExpenses,
    getMarriageExpensesByCategory,
    MARRIAGE_CATEGORIES,
  } = useFinance();

  const [showForm, setShowForm] = useState(false);
  const [newBudget, setNewBudget] = useState(marriageGoal.budget);
  const [newDate, setNewDate] = useState(marriageGoal.date);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const totalExpenses = getTotalMarriageExpenses();
  const remaining = marriageGoal.budget - totalExpenses;
  const percentageUsed = (totalExpenses / marriageGoal.budget) * 100;
  const expensesByCategory = getMarriageExpensesByCategory();

  // Calculate days remaining
  const weddingDate = new Date(marriageGoal.date);
  const today = new Date();
  const daysRemaining = Math.ceil((weddingDate - today) / (1000 * 60 * 60 * 24));
  const monthsRemaining = Math.ceil(daysRemaining / 30);
  const monthlySavingsRequired = monthsRemaining > 0 ? remaining / monthsRemaining : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.category && formData.amount) {
      addMarriageExpense({
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date),
      });
      setFormData({
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateGoal = () => {
    setMarriageGoal({
      budget: parseFloat(newBudget),
      date: new Date(newDate),
    });
  };

  const expenseChartData = Object.entries(expensesByCategory)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  const COLORS = ['#FF9800', '#FF5722', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#E91E63', '#795548', '#607D8B'];

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Marriage Planning</h1>

      {/* Goal Settings */}
      <div className="chart-container" style={{ marginBottom: '30px' }}>
        <h3>Wedding Goal Settings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div className="form-group">
            <label className="form-label">Budget (PKR )</label>
            <input
              type="number"
              className="form-control"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Wedding Date</label>
            <input
              type="date"
              className="form-control"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-primary" onClick={handleUpdateGoal} style={{ width: '100%' }}>
              Update Goal
            </button>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="cards-grid" style={{ marginBottom: '30px' }}>
        <div className="stat-card" style={{ borderLeftColor: '#FF9800' }}>
          <div className="stat-card-label">Wedding Budget</div>
          <div className="stat-card-value">PKR {marriageGoal.budget.toLocaleString()}</div>
        </div>

        <div className="stat-card" style={{ borderLeftColor: '#FF5722' }}>
          <div className="stat-card-label">Total Expenses</div>
          <div className="stat-card-value">PKR {totalExpenses.toLocaleString()}</div>
        </div>

        <div className="stat-card" style={{ borderLeftColor: daysRemaining > 0 ? '#4CAF50' : '#f44336' }}>
          <div className="stat-card-label">Remaining Budget</div>
          <div className="stat-card-value" style={{ color: remaining >= 0 ? '#4CAF50' : '#f44336' }}>
            PKR {remaining.toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">Days Until Wedding</div>
          <div className="stat-card-value">{daysRemaining > 0 ? daysRemaining : 0}</div>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#999' }}>({monthsRemaining} months)</p>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="chart-container" style={{ marginBottom: '30px' }}>
        <h3>Budget Progress</h3>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>{percentageUsed.toFixed(1)}% Used</span>
            <span>PKR {totalExpenses.toLocaleString()} / PKR {marriageGoal.budget.toLocaleString()}</span>
          </div>
          <div style={{ background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', height: '20px' }}>
            <div
              style={{
                background: percentageUsed > 100 ? '#f44336' : '#FF9800',
                width: `${Math.min(100, percentageUsed)}%`,
                height: '100%',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        <p style={{ margin: '20px 0', padding: '15px', background: '#FFF3E0', borderRadius: '8px', borderLeft: '4px solid #FF9800' }}>
          💡 You need to save <strong>PKR {monthlySavingsRequired.toFixed(0)}</strong> per month to meet your wedding budget by{' '}
          {weddingDate.toLocaleDateString('en-IN')}
        </p>
      </div>

      {/* Add Expense */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Wedding Expenses</h3>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={20} /> Add Expense
        </button>
      </div>

      {showForm && (
        <div className="chart-container" style={{ marginBottom: '30px' }}>
          <h3>Add Wedding Expense</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {MARRIAGE_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.emoji} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Amount (PKR )</label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0"
                  required
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="btn btn-primary">Add Expense</button>
              <button type="button" className="btn" style={{ background: '#f0f0f0', color: '#212121' }} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Category Summary */}
      <div className="chart-container" style={{ marginBottom: '30px' }}>
        <h3>Expense Summary by Category</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          {MARRIAGE_CATEGORIES.map((cat, idx) => {
            const amount = expensesByCategory[cat.name] || 0;
            return (
              <div key={cat.id} style={{ padding: '15px', background: '#f8f8f8', borderRadius: '8px', borderLeft: `4px solid ${COLORS[idx % COLORS.length]}` }}>
                <p style={{ margin: 0, fontSize: '20px', marginBottom: '5px' }}>{cat.emoji}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>{cat.name}</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '18px', fontWeight: 'bold', color: COLORS[idx % COLORS.length] }}>PKR {amount.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      {expenseChartData.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          <div className="chart-container">
            <div className="chart-title">Wedding Expense Distribution</div>
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

          <div className="chart-container">
            <div className="chart-title">Top Expenses</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={expenseChartData.sort((a, b) => b.value - a.value).slice(0, 5)}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip formatter={(value) => `PKR ${value}`} />
                <Bar dataKey="value" fill="#FF9800" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Expenses Table */}
      {marriageExpenses.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {marriageExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => (
                <tr key={expense.id}>
                  <td>
                    <span style={{ fontSize: '18px', marginRight: '8px' }}>
                      {MARRIAGE_CATEGORIES.find(c => c.name === expense.category)?.emoji}
                    </span>
                    {expense.category}
                  </td>
                  <td>{expense.description || '-'}</td>
                  <td style={{ fontWeight: 'bold', color: '#FF9800' }}>PKR {expense.amount?.toLocaleString() || 0}</td>
                  <td>{new Date(expense.date).toLocaleDateString('en-IN')}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteMarriageExpense(expense.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px' }}>
          <p style={{ fontSize: '16px', color: '#999' }}>No wedding expenses yet. Start planning your wedding!</p>
        </div>
      )}
    </div>
  );
}
