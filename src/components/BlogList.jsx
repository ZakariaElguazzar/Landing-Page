import React from 'react';
import BlogCard from './BlogCard';
import { articles } from '../data/articles';

const BlogList = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default BlogList;