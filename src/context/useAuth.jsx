import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenticated_user, login, logout, register } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const get_authenticated_user = async () => {
    try {
      const user = await authenticated_user();
      setUser(user);
    } catch (error) {
      console.error('Error getting authenticated user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const user = await login(email, password);
      if (user) {
        setUser(user); // Встановлюємо користувача лише при успішному вході
        nav('/dashboard'); // Перенаправляємо на /dashboard
        return true; // Повертаємо true, щоб показати успішний вхід
      } else {
        alert('Incorrect email or password');
        return false; // Повертаємо false, щоб показати невдалий вхід
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
      return false;
    }
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    nav('/login');
  };

  const registerUser = async (username, email, password, confirm_password) => {
    if (password === confirm_password) {
      const response = await register(username, email, password);
      if (response) {
        alert('User successfully registered');
        nav('/login');
      } else {
        alert('Error registering user');
      }
    } else {
      alert('Passwords do not match');
    }
  };

  useEffect(() => {
    get_authenticated_user();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, loginUser, logoutUser, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
