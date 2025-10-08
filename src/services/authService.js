import axiosInstance from '../utils/axios';

class AuthService {
  static async login(credentials) {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  }

  static async signup(userData) {
    const response = await axiosInstance.post('/auth/signup', userData);
    return response.data;
  }

  static async getCurrentUser() {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  }

  static logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  }

  static storeAuthData(token, user = null) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('isAuthenticated', 'true');
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  static getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static getStoredToken() {
    return localStorage.getItem('authToken');
  }

  // Check if token exists and is valid
  static isAuthenticated() {
    const token = this.getStoredToken();
    if (!token) return false;

    // Basic token validation - you might want to add more checks
    try {
      // Check if token is expired (basic check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      return !isExpired;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }
}

export default AuthService;