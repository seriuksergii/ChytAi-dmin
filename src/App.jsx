import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { AuthProvider } from './context/useAuth';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Users from './components/Users/Users';
import BookDetail from './components/BookDetail/BookDetail';
import BookList from './components/BookList/BookList';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
