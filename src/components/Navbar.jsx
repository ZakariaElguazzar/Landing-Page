import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">ShareXP</h1>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:underline">Accueil</a></li>
          <li><a href="#" className="hover:underline">Articles</a></li>
          <li><a href="#" className="hover:underline">À propos</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
