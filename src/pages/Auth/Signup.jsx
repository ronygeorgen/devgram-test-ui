import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper, Alert, Link } from '@mui/material';
import { Code } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated, loading, error, clearError } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/feed');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    clearError();

    // Client-side validation
    if (!username || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    const result = await signup(username, email, password);
    
    if (result.success) {
      // After successful signup, redirect to login or auto-login
      // For now, redirect to login page with success message
      navigate('/login', { 
        state: { message: 'Account created successfully! Please sign in.' } 
      });
    } else {
      console.error('Signup failed:', result.error);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    // Clear errors when user starts typing
    if (formError) setFormError('');
    if (error) clearError();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <Code sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              DevConnect
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
            Join the Community
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Create an account to connect with developers worldwide
          </Typography>

          {(error || formError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error || formError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={handleInputChange(setUsername)}
              disabled={loading}
              sx={{ mb: 2 }}
              autoComplete="username"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              disabled={loading}
              sx={{ mb: 2 }}
              autoComplete="email"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={handleInputChange(setPassword)}
              disabled={loading}
              sx={{ mb: 2 }}
              autoComplete="new-password"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword)}
              disabled={loading}
              sx={{ mb: 3 }}
              autoComplete="new-password"
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large" 
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link 
                component={RouterLink} 
                to="/login" 
                sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none' }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;