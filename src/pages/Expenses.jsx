// src/pages/Expenses.jsx
import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { Trash2, Plus } from "lucide-react";

export default function Expenses() {
  const { expenses, addExpense, deleteExpense, EXPENSE_CATEGORIES, getTotalExpenses, getExpensesByCategory } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.category && formData.amount) {
      addExpense({
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

  const expensesByCategory = getExpensesByCategory();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, marginBottom: '10px' }}>Expense Management</h1>
          <p style={{ margin: 0, color: '#999' }}>Total Expenses: <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#FF5722' }}>PKR {getTotalExpenses().toLocaleString()}</span></p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={20} /> Add Expense
        </button>
      </div>

      {showForm && (
        <div className="chart-container" style={{ marginBottom: '30px' }}>
          <h3>Add New Expense</h3>
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
                  {EXPENSE_CATEGORIES.map(cat => (
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
          {EXPENSE_CATEGORIES.map(cat => {
            const amount = expensesByCategory[cat.name] || 0;
            return (
              <div key={cat.id} style={{ padding: '15px', background: '#f8f8f8', borderRadius: '8px', borderLeft: '4px solid #FF5722' }}>
                <p style={{ margin: 0, fontSize: '20px', marginBottom: '5px' }}>{cat.emoji}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>{cat.name}</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '18px', fontWeight: 'bold', color: '#FF5722' }}>PKR {amount.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>

      {expenses.length > 0 ? (
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
              {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => (
                <tr key={expense.id}>
                  <td>
                    <span style={{ fontSize: '18px', marginRight: '8px' }}>
                      {EXPENSE_CATEGORIES.find(c => c.name === expense.category)?.emoji}
                    </span>
                    {expense.category}
                  </td>
                  <td>{expense.description || '-'}</td>
                  <td style={{ fontWeight: 'bold', color: '#FF5722' }}>PKR {expense.amount?.toLocaleString() || 0}</td>
                  <td>{new Date(expense.date).toLocaleDateString('en-IN')}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteExpense(expense.id)}
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
          <p style={{ fontSize: '16px', color: '#999' }}>No expense records yet. Start tracking your expenses!</p>
        </div>
      )}
    </div>
  );
}
