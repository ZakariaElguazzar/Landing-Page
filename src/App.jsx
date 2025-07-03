import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <BlogList />
      </main>
      <Footer />
    </div>
  );
}

export default App;