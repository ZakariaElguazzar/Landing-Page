import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            À propos de ShareXP
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              ShareXP est une plateforme dédiée au partage d'expériences et de connaissances. 
              Notre mission est de créer un espace où les utilisateurs peuvent découvrir, 
              partager et apprendre à travers des articles de qualité sur une variété de sujets.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Que vous soyez passionné de technologie, amateur d'art, entrepreneur ou simplement 
              curieux d'apprendre, ShareXP vous offre une communauté bienveillante pour explorer 
              de nouvelles idées et perspectives.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Rejoignez notre communauté grandissante d'experts et d'apprenants qui partagent 
              leurs expériences pour enrichir les connaissances de tous.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}