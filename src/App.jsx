import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AppProvider, useApp } from './context/AppContext';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import FeedPage from './pages/Feed/FeedPage';
import ProfilePage from './pages/Profile/ProfilePage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useApp();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/feed" /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/feed" /> : <Signup />} />
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <FeedPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/feed" : "/login"} />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
