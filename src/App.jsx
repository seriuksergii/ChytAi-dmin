import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { AuthProvider } from './context/useAuth';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Users from './components/Users/Users';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
