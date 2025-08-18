import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [croatian, setCroatian] = useState(true);

  return (
    <div>
      <Navbar croatian={croatian} setCroatian={setCroatian} />
      <Routes>
        <Route path="/" element={<Home croatian={croatian} />} />
        <Route path="/services" element={<Services croatian={croatian} />} />
        <Route path="/contact" element={<Contact croatian={croatian} />} />
      </Routes>
      <Footer croatian={croatian} />
    </div>
  );
}

export default App;
