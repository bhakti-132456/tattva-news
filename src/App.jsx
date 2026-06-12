import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { LanguageProvider } from './context/LanguageContext';
import GlobalPlayer from './components/GlobalPlayer';

// Lazy load pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Article = lazy(() => import('./pages/Article'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const Admin = lazy(() => import('./pages/Admin'));
const AuthorPortal = lazy(() => import('./pages/AuthorPortal'));
const Census = lazy(() => import('./pages/Census'));
const CensusThankYou = lazy(() => import('./pages/CensusThankYou'));

function App() {
  return (
    <AudioProvider>
      <LanguageProvider>
        <GlobalPlayer />
        <Router>
          <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="/category/:cat" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/author" element={<AuthorPortal />} />
              <Route path="/census" element={<Census />} />
              <Route path="/census/thank-you" element={<CensusThankYou />} />
            </Routes>
          </Suspense>
        </Router>
      </LanguageProvider>
    </AudioProvider>
  );
}

export default App;
