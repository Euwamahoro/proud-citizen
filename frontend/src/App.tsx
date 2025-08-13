import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import Dashboard from './Components/Dashboard';

import type { ReactElement } from 'react';
import type { RootState } from './Store/index';
import { fetchUserProfile, getToken } from './Services/authService';
import { loginSuccess, logout } from './Store/authSlice';

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};


function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      const token = getToken();
      if (token) {
        const user = await fetchUserProfile();
        if (user) {
          dispatch(loginSuccess({ token, user }));
        } else {
          dispatch(logout());
        }
      }
      setIsInitializing(false);
    };

    initializeSession();
  }, [dispatch]); 

  
  if (isInitializing) {
    return <div>Loading session...</div>; 
  }


  return (
    <Routes>
      {/* If the user lands on the root path, redirect them correctly */}
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />}
      />

      {/* Your regular routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      {/* A fallback catch-all route is good practice */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;