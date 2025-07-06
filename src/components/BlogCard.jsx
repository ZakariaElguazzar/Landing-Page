import React, { useState } from 'react';
import axios from 'axios';

const BlogCard = ({ article }) => {
  const [likes, setLikes] = useState(article.likes || 0);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const formatReadTime = (readTime) => {
    return readTime ? `${readTime} min de lecture` : '5 min de lecture';
  };

  const handleLike = async () => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/articles/${article._id}/like`);
      setLikes(res.data.likes);
    } catch (error) {
      console.error("Erreur lors du like :", error);
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {article.image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            {article.category}
          </span>
          <time className="text-sm text-gray-500" dateTime={article.date}>
            {formatDate(article.date)}
          </time>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {article.title}
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {article.author ? article.author.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {article.author || 'Auteur anonyme'}
            </p>
            <p className="text-xs text-gray-500">
              {formatReadTime(article.readTime)}
            </p>
          </div>
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 group">
            Lire l'article
            <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex items-center space-x-4 text-gray-400">
            {article.views !== undefined && (
              <div className="flex items-center text-xs">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {article.views}
              </div>
            )}
            <div
              className="flex items-center text-xs cursor-pointer hover:text-pink-500 transition"
              onClick={handleLike}
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likes}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
