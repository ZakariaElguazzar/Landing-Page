import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'articles':
        return <Articles />;
      case 'home':
      default:
        return <Accueil setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;