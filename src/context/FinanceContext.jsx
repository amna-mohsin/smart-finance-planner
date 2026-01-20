import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};

const EXPENSE_CATEGORIES = [
  { id: 1, name: 'Food & Dining', emoji: '🍕' },
  { id: 2, name: 'Rent & Housing', emoji: '🏠' },
  { id: 3, name: 'Transport', emoji: '🚗' },
  { id: 4, name: 'Education', emoji: '📚' },
  { id: 5, name: 'Shopping', emoji: '🛍️' },
  { id: 6, name: 'Utilities', emoji: '💡' },
  { id: 7, name: 'Entertainment', emoji: '🎬' },
  { id: 8, name: 'Health', emoji: '🏥' },
  { id: 9, name: 'Others', emoji: '📦' },
];

const MARRIAGE_CATEGORIES = [
  { id: 1, name: 'Catering & Food', emoji: '🍽️' },
  { id: 2, name: 'Wedding Dresses', emoji: '👗' },
  { id: 3, name: 'Venue & Hall', emoji: '🏛️' },
  { id: 4, name: 'Decoration', emoji: '🎨' },
  { id: 5, name: 'Photography', emoji: '📸' },
  { id: 6, name: 'Music & DJ', emoji: '🎵' },
  { id: 7, name: 'Transportation', emoji: '🚗' },
  { id: 8, name: 'Jewelry', emoji: '💍' },
  { id: 9, name: 'Invitations', emoji: '💌' },
  { id: 10, name: 'Makeup & Salon', emoji: '💄' },
  { id: 11, name: 'Flowers', emoji: '🌸' },
  { id: 12, name: 'Gifts & Favors', emoji: '🎁' },
  { id: 13, name: 'Equipment Rentals', emoji: '🪑' },
  { id: 14, name: 'Legal & Documentation', emoji: '📜' },
  { id: 15, name: 'Other Expenses', emoji: '📋' },
];

const INCOME_CATEGORIES = [
  { id: 1, name: 'Salary', emoji: '💼' },
  { id: 2, name: 'Freelance', emoji: '💻' },
  { id: 3, name: 'Business', emoji: '🏢' },
  { id: 4, name: 'Investments', emoji: '📈' },
  { id: 5, name: 'Bonus', emoji: '🎉' },
  { id: 6, name: 'Others', emoji: '📦' },
];

export const FinanceProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [savingsGoal, setSavingsGoal] = useState(100000);
  const [marriageExpenses, setMarriageExpenses] = useState([]);
  const [marriageGoal, setMarriageGoal] = useState({
    budget: 500000,
    date: new Date(2026, 11, 31),
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('smart_expenses');
    const savedIncomes = localStorage.getItem('smart_incomes');
    const savedSavingsGoal = localStorage.getItem('smart_savings_goal');
    const savedMarriageExpenses = localStorage.getItem('smart_marriage_expenses');
    const savedMarriageGoal = localStorage.getItem('smart_marriage_goal');

    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedIncomes) setIncomes(JSON.parse(savedIncomes));
    if (savedSavingsGoal) setSavingsGoal(JSON.parse(savedSavingsGoal));
    if (savedMarriageExpenses) setMarriageExpenses(JSON.parse(savedMarriageExpenses));
    if (savedMarriageGoal) setMarriageGoal(JSON.parse(savedMarriageGoal));
  }, []);

  // Save expenses to localStorage
  useEffect(() => {
    localStorage.setItem('smart_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Save incomes to localStorage
  useEffect(() => {
    localStorage.setItem('smart_incomes', JSON.stringify(incomes));
  }, [incomes]);

  // Save savings goal to localStorage
  useEffect(() => {
    localStorage.setItem('smart_savings_goal', JSON.stringify(savingsGoal));
  }, [savingsGoal]);

  // Save marriage expenses to localStorage
  useEffect(() => {
    localStorage.setItem('smart_marriage_expenses', JSON.stringify(marriageExpenses));
  }, [marriageExpenses]);

  // Save marriage goal to localStorage
  useEffect(() => {
    localStorage.setItem('smart_marriage_goal', JSON.stringify(marriageGoal));
  }, [marriageGoal]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...updatedExpense, id } : exp));
  };

  const addIncome = (income) => {
    setIncomes([...incomes, { ...income, id: Date.now() }]);
  };

  const deleteIncome = (id) => {
    setIncomes(incomes.filter(inc => inc.id !== id));
  };

  const updateIncome = (id, updatedIncome) => {
    setIncomes(incomes.map(inc => inc.id === id ? { ...updatedIncome, id } : inc));
  };

  const addMarriageExpense = (expense) => {
    setMarriageExpenses([...marriageExpenses, { ...expense, id: Date.now() }]);
  };

  const deleteMarriageExpense = (id) => {
    setMarriageExpenses(marriageExpenses.filter(exp => exp.id !== id));
  };

  const updateMarriageExpense = (id, updatedExpense) => {
    setMarriageExpenses(marriageExpenses.map(exp => exp.id === id ? { ...updatedExpense, id } : exp));
  };

  const getTotalExpenses = () => expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
  const getTotalIncomes = () => incomes.reduce((sum, inc) => sum + (inc.amount || 0), 0);
  const getTotalMarriageExpenses = () => marriageExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

  const getExpensesByCategory = () => {
    const result = {};
    EXPENSE_CATEGORIES.forEach(cat => {
      result[cat.name] = expenses
        .filter(exp => exp.category === cat.name)
        .reduce((sum, exp) => sum + (exp.amount || 0), 0);
    });
    return result;
  };

  const getIncomesByCategory = () => {
    const result = {};
    INCOME_CATEGORIES.forEach(cat => {
      result[cat.name] = incomes
        .filter(inc => inc.category === cat.name)
        .reduce((sum, inc) => sum + (inc.amount || 0), 0);
    });
    return result;
  };

  const getMarriageExpensesByCategory = () => {
    const result = {};
    MARRIAGE_CATEGORIES.forEach(cat => {
      result[cat.name] = marriageExpenses
        .filter(exp => exp.category === cat.name)
        .reduce((sum, exp) => sum + (exp.amount || 0), 0);
    });
    return result;
  };

  const value = {
    // Expenses
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    getTotalExpenses,
    getExpensesByCategory,
    EXPENSE_CATEGORIES,

    // Incomes
    incomes,
    addIncome,
    deleteIncome,
    updateIncome,
    getTotalIncomes,
    getIncomesByCategory,
    INCOME_CATEGORIES,

    // Savings
    savingsGoal,
    setSavingsGoal,

    // Marriage
    marriageExpenses,
    addMarriageExpense,
    deleteMarriageExpense,
    updateMarriageExpense,
    getTotalMarriageExpenses,
    getMarriageExpensesByCategory,
    marriageGoal,
    setMarriageGoal,
    MARRIAGE_CATEGORIES,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
