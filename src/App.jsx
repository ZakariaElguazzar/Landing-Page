import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import Login from './components/Login';
import Signup from './components/Signup';
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, logout } = useAuth();

  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'articles':
        return <Articles />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'signup':
        return <Signup setCurrentPage={setCurrentPage} />;
      case 'home':
      default:
        return <Accueil setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        logout={logout}
      />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;