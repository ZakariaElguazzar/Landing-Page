import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import Login from './pages/Login';
import Signup from './pages/Signup';
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, login, register, logout, loading, error } = useAuth();

  // Fonction pour gérer la connexion réussie
  const handleLoginSuccess = (userData) => {
  console.log('Connexion réussie:', userData);
  setCurrentPage('articles'); // ✅ redirige vers les articles
};


  // Fonction pour gérer l'inscription réussie
  const handleRegisterSuccess = (userData) => {
    console.log('Inscription réussie:', userData);
    // Rediriger vers le profil après l'inscription
    setCurrentPage('profile');
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  // Afficher un loader pendant le chargement initial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Accueil />;
      case 'articles':
        return <Articles />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'login':
        return (
          <Login 
            onLogin={login}
            onSuccess={handleLoginSuccess}
            setCurrentPage={setCurrentPage}
            error={error}
          />
        );
      case 'signup':
        return (
          <Signup 
            onRegister={register}
            onSuccess={handleRegisterSuccess}
            setCurrentPage={setCurrentPage}
            error={error}
          />
        );
      case 'profile':
        return (
          <Profile 
            user={user}
            setCurrentPage={setCurrentPage}
            logout={handleLogout}
          />
        );
      default:
        return <Accueil />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        logout={handleLogout}
      />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;