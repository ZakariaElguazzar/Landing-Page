import React, { useState, useMemo } from 'react';
import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import { useArticles } from '../hooks/useArticles';

const BlogList = () => {
  const { articles, loading, error, searchArticles, refetchArticles, createArticle, updateArticle, deleteArticle } = useArticles();
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  // Extraire toutes les catégories uniques
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(articles.map(article => article.category))];
    return ['Tous', ...uniqueCategories];
  }, [articles]);

  // Filtrer et trier les articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles;

    // Filtre par catégorie
    if (selectedCategory !== 'Tous') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return (a.author || '').localeCompare(b.author || '');
        case 'views':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, selectedCategory, sortBy]);

  // Gérer la recherche
  const handleSearch = (value) => {
    setSearchTerm(value);
    searchArticles(value);
  };

  // Gérer la création d'article
  const handleCreateArticle = async (articleData) => {
    try {
      await createArticle(articleData);
      setShowForm(false);
      refetchArticles();
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      throw error;
    }
  };

  // Gérer la modification d'article
  const handleUpdateArticle = async (articleData) => {
    try {
      await updateArticle(editingArticle._id || editingArticle.id, articleData);
      setEditingArticle(null);
      setShowForm(false);
      refetchArticles();
    } catch (error) {
      console.error('Erreur lors de la modification de l\'article:', error);
      throw error;
    }
  };

  // Gérer la suppression d'article
  const handleDeleteArticle = async (articleId) => {
    try {
      await deleteArticle(articleId);
      setDeleteConfirmation(null);
      refetchArticles();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      throw error;
    }
  };

  // Ouvrir le formulaire pour modification
  const handleEdit = (article) => {
    setEditingArticle(article);
    setShowForm(true);
    setActionMenuOpen(null);
  };

  // Ouvrir la confirmation de suppression
  const handleDeleteConfirm = (article) => {
    setDeleteConfirmation(article);
    setActionMenuOpen(null);
  };

  // Composant de chargement
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  // Composant d'erreur
  const ErrorMessage = () => (
    <div className="text-center py-12">
      <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
      <p className="text-gray-500 mb-4">{error}</p>
      <button 
        onClick={refetchArticles}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );

  // Composant Menu d'actions
  const ActionMenu = ({ article }) => {
    const isOpen = actionMenuOpen === (article._id || article.id);
    
    return (
      <div className="relative">
        <button
          onClick={() => setActionMenuOpen(isOpen ? null : (article._id || article.id))}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
            <div className="py-1">
              <button
                onClick={() => handleEdit(article)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Modifier
              </button>
              <button
                onClick={() => handleDeleteConfirm(article)}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Composant BlogCard avec menu d'actions
  const BlogCardWithActions = ({ article }) => (
    <div className="relative">
      <BlogCard article={article} />
      <div className="absolute top-4 right-4">
        <ActionMenu article={article} />
      </div>
    </div>
  );

  // Modal de confirmation de suppression
  const DeleteConfirmationModal = () => {
    if (!deleteConfirmation) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">Confirmer la suppression</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Êtes-vous sûr de vouloir supprimer l'article "{deleteConfirmation.title}" ? 
            Cette action est irréversible.
          </p>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setDeleteConfirmation(null)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={() => handleDeleteArticle(deleteConfirmation._id || deleteConfirmation.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Fermer le menu d'actions en cliquant ailleurs
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuOpen && !event.target.closest('.relative')) {
        setActionMenuOpen(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [actionMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header avec titre et bouton d'ajout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
            <p className="text-gray-600 mt-2">Découvrez nos derniers articles</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nouvel article
          </button>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Barre de recherche */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filtre par catégorie */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Tri */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              >
                <option value="date">Plus récent</option>
                <option value="title">Titre A-Z</option>
                <option value="author">Auteur</option>
                <option value="views">Plus populaire</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              {filteredAndSortedArticles.length} article{filteredAndSortedArticles.length !== 1 ? 's' : ''} 
              {selectedCategory !== 'Tous' && ` dans "${selectedCategory}"`}
              {searchTerm && ` pour "${searchTerm}"`}
            </div>
            
            {/* Bouton de rechargement */}
            <button 
              onClick={refetchArticles}
              className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              disabled={loading}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Actualiser
            </button>
          </div>
        )}

        {/* Contenu principal */}
        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage />}
        
        {!loading && !error && (
          <>
            {/* Grille des articles */}
            {filteredAndSortedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedArticles.map(article => (
                  <BlogCardWithActions key={article._id || article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article trouvé</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'Essayez de modifier vos critères de recherche.' : 'Aucun article disponible pour le moment.'}
                </p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Créer le premier article
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal du formulaire */}
      {showForm && (
        <BlogForm 
          article={editingArticle}
          onSubmit={editingArticle ? handleUpdateArticle : handleCreateArticle}
          onCancel={() => {
            setShowForm(false);
            setEditingArticle(null);
          }}
        />
      )}

      {/* Modal de confirmation de suppression */}
      <DeleteConfirmationModal />
    </div>
  );
};

export default BlogList;