import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import GlobalPlayer from './components/GlobalPlayer';

// Lazy load pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Article = lazy(() => import('./pages/Article'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <AudioProvider>
      <GlobalPlayer />
      <Router>
        <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/category/:cat" element={<CategoryPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </Router>
    </AudioProvider>
  );
}

export default App;
