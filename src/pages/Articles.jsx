import React from "react";
import BlogList from "../components/BlogList";

export default function Articles() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre collection d'articles soigneusement sélectionnés sur une variété de sujets passionnants.
          </p>
        </div>
    <BlogList />
      </div>
    </div>
  );
}