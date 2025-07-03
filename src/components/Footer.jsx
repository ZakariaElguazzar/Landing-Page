import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Informations du blog */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-3 text-blue-400">ShareXP</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Un blog créé pour les étudiants par des étudiants.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Partagez vos expériences universitaires, découvrez des conseils pratiques 
              et connectez-vous avec d'autres étudiants à travers le monde.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Liens rapides</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Informations de contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:contact@sharexp.com" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  contact@sharexp.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+212600000000" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  +212 600 000 000
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">
                  Casablanca, Maroc
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-400 transition-colors duration-200 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            
            <div className="text-center sm:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 ShareXP. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Fait avec ❤️ par la communauté étudiante
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;