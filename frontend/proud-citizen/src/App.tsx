import { useState } from 'react';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';

type AuthMode = 'login' | 'register';

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  return (
    <>
      {authMode === 'login' ? (
        <LoginPage onSwitchToRegister={() => setAuthMode('register')} />
      ) : (
        <RegisterPage onSwitchToLogin={() => setAuthMode('login')} />
      )}
    </>
  );
}

export default App;