import axios from 'axios';

// Configuration de base pour axios
const API_BASE_URL = 'http://localhost:5000/api'; // Remplacez par votre URL d'API

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API:', error);
    return Promise.reject(error);
  }
);

// Service pour les articles
export const articleService = {
  // Récupérer tous les articles avec recherche optionnelle
  getArticles: async (searchQuery = '') => {
    try {
      const params = searchQuery ? { q: searchQuery } : {};
      const response = await api.get('/articles', { params });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des articles');
    }
  },

  // Récupérer un article par ID
  getArticleById: async (id) => {
    try {
      const response = await api.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de l\'article');
    }
  },

  // Créer un nouvel article
  createArticle: async (articleData) => {
    try {
      const response = await api.post('/articles', articleData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la création de l\'article');
    }
  },

  // Mettre à jour un article
  updateArticle: async (id, articleData) => {
    try {
      const response = await api.put(`/articles/${id}`, articleData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de l\'article');
    }
  },

  // Supprimer un article
  deleteArticle: async (id) => {
    try {
      const response = await api.delete(`/articles/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la suppression de l\'article');
    }
  }
};

export default articleService;