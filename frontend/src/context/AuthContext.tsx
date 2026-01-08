import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../lib/axios';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.role === 'customer';

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await api.get('/auth/me');
      if (response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error: unknown) {
      // Always set user to null on error - if it's a network error, 
      // we'll check again on next request
      setUser(null);
      // Only log non-401 errors (401 is expected when not logged in)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status !== 401) {
          console.error('Auth check error:', error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.user) {
        setUser(response.data.user);
      } else {
        // If user not in response, fetch it
        await checkAuth();
      }
    } catch (error) {
      setUser(null);
      throw error; // Re-throw so the Login component can handle it
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    await api.post('/auth/register', { email, password, name });
    // After registration, automatically log in
    await login(email, password);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Even if logout fails, clear local state
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

