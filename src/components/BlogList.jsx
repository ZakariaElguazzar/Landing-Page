import React, { useState, useMemo } from 'react';
import BlogCard from './BlogCard';
import { useArticles } from '../hooks/useArticles';

const BlogList = () => {
  const { articles, loading, error, searchArticles, refetchArticles } = useArticles();
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
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
            <div className="flex items-center gap-2">
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
              
              <button className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nouvel article
              </button>
            </div>
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
                  <BlogCard key={article._id || article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article trouvé</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Essayez de modifier vos critères de recherche.' : 'Aucun article disponible pour le moment.'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;