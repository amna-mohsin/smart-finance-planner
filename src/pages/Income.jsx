// src/pages/Income.jsx
import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { Trash2, Plus } from "lucide-react";

export default function Income() {
  const { incomes, addIncome, deleteIncome, INCOME_CATEGORIES, getTotalIncomes } = useFinance();
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
      addIncome({
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, marginBottom: '10px' }}>Income Tracking</h1>
          <p style={{ margin: 0, color: '#999' }}>Total Income: <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}>PKR {getTotalIncomes().toLocaleString()}</span></p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={20} /> Add Income
        </button>
      </div>

      {showForm && (
        <div className="chart-container" style={{ marginBottom: '30px' }}>
          <h3>Add New Income</h3>
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
                  {INCOME_CATEGORIES.map(cat => (
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
              <button type="submit" className="btn btn-primary">Add Income</button>
              <button type="button" className="btn" style={{ background: '#f0f0f0', color: '#212121' }} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {incomes.length > 0 ? (
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
              {incomes.map(income => (
                <tr key={income.id}>
                  <td>
                    <span style={{ fontSize: '18px', marginRight: '8px' }}>
                      {INCOME_CATEGORIES.find(c => c.name === income.category)?.emoji}
                    </span>
                    {income.category}
                  </td>
                  <td>{income.description || '-'}</td>
                  <td style={{ fontWeight: 'bold', color: '#4CAF50' }}>PKR {income.amount?.toLocaleString() || 0}</td>
                  <td>{new Date(income.date).toLocaleDateString('en-IN')}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteIncome(income.id)}
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
          <p style={{ fontSize: '16px', color: '#999' }}>No income records yet. Add your first income!</p>
        </div>
      )}
    </div>
  );
}
