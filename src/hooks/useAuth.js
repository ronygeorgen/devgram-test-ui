import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { loginUser, signupUser, logout, clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const login = useCallback(
    async (email, password) => {
      try {
        const result = await dispatch(loginUser({ email, password })).unwrap();
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const signup = useCallback(
    async (username, email, password) => {
      try {
        const result = await dispatch(signupUser({ username, email, password })).unwrap();
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,
    
    // Actions
    login,
    signup,
    logout: handleLogout,
    clearError: handleClearError,
  };
};