import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <main className="">
        <Navbar />
        <BlogList />
        <Footer />
      </main>
    </div>
  );
}

export default App;
