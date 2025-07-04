import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialiser l'utilisateur au chargement
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const userData = await authService.login(email, password);
      setUser(userData); // Mettre à jour l'état immédiatement
      return userData;
    } catch (err) {
      setError(err.message || 'Erreur de connexion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const userData = await authService.register(email, password);
      setUser(userData); // Mettre à jour l'état immédiatement
      return userData;
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'inscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setError('');
  };

  return { user, login, register, logout, loading, error };
};