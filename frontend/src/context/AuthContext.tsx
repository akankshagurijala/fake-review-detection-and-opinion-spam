import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  theme: 'dark' | 'light';
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  toggleRole: () => void;
  toggleTheme: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 1,
    email: "admin@ecom-guard.ai",
    username: "AdminGuard",
    role: "admin"
  });

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const login = (email: string, role: UserRole = 'user') => {
    setUser({
      id: Math.floor(Math.random() * 1000) + 1,
      email,
      username: email.split('@')[0],
      role
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleRole = () => {
    if (!user) return;
    const newRole: UserRole = user.role === 'admin' ? 'user' : 'admin';
    setUser({ ...user, role: newRole });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role || 'user', theme, login, logout, toggleRole, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
