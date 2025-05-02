import { create } from 'zustand';
import { AuthState, User } from './ProtectedRouteProps';


export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true
  login: (userData: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true, isLoading: false });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false, isLoading: false });
  }
}));

// Initialize auth state
const initializeAuth = () => {
  const token = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');
  
  if (token && savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      useAuth.getState().login(userData, token);
    } catch (error) {
      console.error('Error restoring auth state:', error);
      useAuth.getState().logout();
    }
  } else {
    useAuth.setState({ isLoading: false });
  }
};

// Call initialization
initializeAuth();