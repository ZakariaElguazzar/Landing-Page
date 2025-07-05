import React from 'react';
import BlogCard from './BlogCard';
import { articles } from '../data/articles';

// Image URL — tu peux remplacer par ta propre image ou importer un fichier local
const bgImageUrl = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80';

const BlogList = () => {
  return (
    <main
      className="min-h-screen bg-gray-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      {/* Overlay sombre pour lisibilité */}
      <div className="bg-black bg-opacity-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
              Blog Tech
            </h1>
            <p className="text-xl max-w-3xl mx-auto drop-shadow-md">
              Découvrez les dernières tendances en développement web, design et technologies modernes. 
              Restez à jour avec nos articles, tutoriels et analyses approfondies.
            </p>
            {/* Image décorative */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
              alt="Icône technologie"
              className="mx-auto mt-8 w-24 opacity-80"
            />
          </header>

          {/* Articles Grid */}
          <section
            aria-label="Liste des articles du blog"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.length > 0 ? (
              articles.map(article => (
                <BlogCard key={article.id} article={article} />
              ))
            ) : (
              <p className="text-center text-gray-300">Aucun article disponible pour le moment.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default BlogList;
