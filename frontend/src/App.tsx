import { useEffect } from 'react';
import type {ReactElement} from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import Dashboard from './Components/Dashboard';
import type { RootState } from './Store/index';

interface ProtectedRouteProps {
  children: ReactElement;
}

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname == '/'){
    navigate(isLoggedIn ? '/dashboard' : '/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default App;