import React from "react";
import BlogList from "../components/BlogList";

export default function Articles() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête de la page */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Articles
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Découvrez une collection d'articles rédigés par notre communauté : 
              retours d'expérience, astuces pratiques, tutoriels détaillés et découvertes passionnantes.
            </p>
            
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-blue-100">Articles publiés</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-blue-100">Auteurs actifs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-sm text-blue-100">Lectures ce mois</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catégories populaires */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Catégories populaires
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'Tutoriels', count: 45, icon: '📚' },
              { name: 'Astuces', count: 32, icon: '💡' },
              { name: 'Retours d\'expérience', count: 28, icon: '✍️' },
              { name: 'Découvertes', count: 25, icon: '🔍' },
              { name: 'Outils', count: 20, icon: '🛠️' }
            ].map((category, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 px-4 py-2 rounded-full cursor-pointer"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des articles */}
      <BlogList />

      {/* Section d'encouragement à contribuer */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Vous aussi, partagez votre expérience !
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Rejoignez notre communauté d'auteurs et partagez vos connaissances, 
            découvertes et expériences avec tous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200">
              Rédiger un article
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200">
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}