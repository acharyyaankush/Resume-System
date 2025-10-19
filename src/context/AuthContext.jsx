// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Initialize registered users from localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    const savedUser = localStorage.getItem('resumeUser');
    
    if (savedUsers) {
      setRegisteredUsers(JSON.parse(savedUsers));
    }

    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // Verify user still exists in registered users
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        setUser(userData);
      } else {
        localStorage.removeItem('resumeUser');
      }
    }
    setLoading(false);
  }, []);

  // Save registered users to localStorage whenever it changes
  useEffect(() => {
    if (registeredUsers.length > 0) {
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
  }, [registeredUsers]);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Find user in registered users
        const user = registeredUsers.find(u => 
          u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (user) {
          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar
          };
          setUser(userData);
          localStorage.setItem('resumeUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password. Please try again or sign up.'));
        }
      }, 1000);
    });
  };

  const signup = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = registeredUsers.find(u => 
          u.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
          reject(new Error('User already exists with this email address. Please login instead.'));
          return;
        }

        if (name && email && password) {
          // Create new user
          const newUser = {
            id: Date.now(),
            email: email.toLowerCase(),
            password: password,
            name: name,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff`
          };

          // Add to registered users
          const updatedUsers = [...registeredUsers, newUser];
          setRegisteredUsers(updatedUsers);

          const userData = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            avatar: newUser.avatar
          };
          
          setUser(userData);
          localStorage.setItem('resumeUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Please fill all fields'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('resumeUser');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}