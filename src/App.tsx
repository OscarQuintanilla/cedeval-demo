import { Navigate, Route, Routes } from 'react-router-dom';
import AcceptTermsPage from './pages/auth/AcceptTerms';
import LoginPage from './pages/auth/login';
import PasswordResetPage from './pages/auth/PasswordReset';
import SignupPage from './pages/auth/register/signup';
import SignupSuccessful from './pages/auth/register/signup-successful';
import VerifyTokenPage from './pages/auth/VerifyToken';
import VerifyUserPage from './pages/auth/VerifyUser';
import DashboardPage from './pages/dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="accept-terms" element={<AcceptTermsPage />} />
        <Route path="terms" element={<AcceptTermsPage onlyView={true} />} />
        <Route path="verify-user" element={<VerifyUserPage />} />
        <Route path="verify-token" element={<VerifyTokenPage />} />
        <Route path="password-reset" element={<PasswordResetPage />} />
        <Route path="signup/successful" element={<SignupSuccessful />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
