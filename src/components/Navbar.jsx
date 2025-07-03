import React, { useState } from 'react';
import { Search, Home, FileText, Info, Mail, Menu, X, LogIn, UserPlus, User } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Recherche:', searchQuery);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    console.log('Connexion');
  };

  const handleSignup = () => {
    console.log('Inscription');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('Déconnexion');
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); // Fermer le menu mobile après navigation
  };

  const getNavItemClass = (page) => {
    const baseClass = "flex items-center space-x-1 transition-colors duration-200";
    return currentPage === page 
      ? `${baseClass} text-blue-200` 
      : `${baseClass} hover:text-blue-200`;
  };

  const getMobileNavItemClass = (page) => {
    const baseClass = "flex items-center space-x-2 py-2 px-4 rounded-md transition-colors";
    return currentPage === page 
      ? `${baseClass} bg-blue-500` 
      : `${baseClass} hover:bg-blue-500`;
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('home')}>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">SXP</span>
            </div>
            <h1 className="text-xl font-bold">ShareXP</h1>
          </div>

          {/* Barre de recherche - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher des articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
                <button onClick={() => handleNavigation('home')} className={getNavItemClass('home')}>
                  <Home className="w-4 h-4" />
                  <span>Accueil</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('articles')} className={getNavItemClass('articles')}>
                  <FileText className="w-4 h-4" />
                  <span>Articles</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('about')} className={getNavItemClass('about')}>
                  <Info className="w-4 h-4" />
                  <span>À propos</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('contact')} className={getNavItemClass('contact')}>
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </button>
              </li>
            </ul>

            {/* Authentication Buttons */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-blue-500">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogin}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md border border-blue-300 hover:bg-blue-500 hover:border-blue-400 transition-colors duration-200"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Se connecter</span>
                  </button>
                  <button
                    onClick={handleSignup}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md bg-white text-blue-600 hover:bg-gray-100 transition-colors duration-200 font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>S'inscrire</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Utilisateur</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm hover:text-blue-200 transition-colors duration-200"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-blue-500 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-500 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher des articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <ul className="space-y-2 mb-4">
              <li>
                <button onClick={() => handleNavigation('home')} className={getMobileNavItemClass('home')}>
                  <Home className="w-4 h-4" />
                  <span>Accueil</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('articles')} className={getMobileNavItemClass('articles')}>
                  <FileText className="w-4 h-4" />
                  <span>Articles</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('about')} className={getMobileNavItemClass('about')}>
                  <Info className="w-4 h-4" />
                  <span>À propos</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('contact')} className={getMobileNavItemClass('contact')}>
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </button>
              </li>
            </ul>

            {/* Mobile Authentication */}
            <div className="border-t border-blue-500 pt-4">
              {!isLoggedIn ? (
                <div className="space-y-2">
                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md border border-blue-300 hover:bg-blue-500 hover:border-blue-400 transition-colors duration-200"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Se connecter</span>
                  </button>
                  <button
                    onClick={handleSignup}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md bg-white text-blue-600 hover:bg-gray-100 transition-colors duration-200 font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>S'inscrire</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 py-2 px-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Utilisateur connecté</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 px-4 rounded-md hover:bg-blue-500 transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}