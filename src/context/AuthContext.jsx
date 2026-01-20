import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('smart_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
    };
    setUser(newUser);
    localStorage.setItem('smart_user', JSON.stringify(newUser));
    return newUser;
  };

  const login = (email, password) => {
    const savedUser = localStorage.getItem('smart_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === email && user.password === password) {
        setUser(user);
        return user;
      }
    }
    throw new Error('Invalid email or password');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smart_user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('smart_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
