import './App.css';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import ScrollTopButton from './components/ScrollTopButton';
import PageMetadata from './components/PageMetadata';

const Services = lazy(() => import('./components/Services'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));
const Privacy = lazy(() => import('./components/Privacy'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <div className="app">
      <PageMetadata />
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<div className="route-loading" aria-live="polite">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privatnost" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <ScrollTopButton />
    </div>
  );
}

export default App;
