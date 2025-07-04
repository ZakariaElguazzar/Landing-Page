// hooks/useArticles.js
import { useState, useEffect, useCallback } from 'react';
import { articleService } from '../services/articleService';

export const useArticles = (initialSearchTerm = '') => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  // Fonction pour charger les articles
  const fetchArticles = useCallback(async (search = '') => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getArticles(search);
      setArticles(data);
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction pour recharger les articles
  const refetchArticles = useCallback(() => {
    fetchArticles(searchTerm);
  }, [fetchArticles, searchTerm]);

  // Fonction pour créer un nouvel article
  const createArticle = useCallback(async (articleData) => {
    try {
      const newArticle = await articleService.createArticle(articleData);
      setArticles(prev => [newArticle, ...prev]);
      return newArticle;
    } catch (err) {
      throw new Error(err.message);
    }
  }, []);

  // Fonction pour mettre à jour un article
  const updateArticle = useCallback(async (id, articleData) => {
    try {
      const updatedArticle = await articleService.updateArticle(id, articleData);
      setArticles(prev => 
        prev.map(article => 
          article._id === id ? updatedArticle : article
        )
      );
      return updatedArticle;
    } catch (err) {
      throw new Error(err.message);
    }
  }, []);

  // Fonction pour supprimer un article
  const deleteArticle = useCallback(async (id) => {
    try {
      await articleService.deleteArticle(id);
      setArticles(prev => prev.filter(article => article._id !== id));
    } catch (err) {
      throw new Error(err.message);
    }
  }, []);

  // Fonction pour rechercher des articles
  const searchArticles = useCallback((search) => {
    setSearchTerm(search);
    fetchArticles(search);
  }, [fetchArticles]);

  // Charger les articles au montage du composant
  useEffect(() => {
    fetchArticles(searchTerm);
  }, [fetchArticles, searchTerm]);

  return {
    articles,
    loading,
    error,
    searchTerm,
    refetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    searchArticles
  };
};