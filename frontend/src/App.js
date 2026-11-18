import React, { useEffect } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import HomePage from './pages/HomePage';
import ParcoursPage from './pages/ParcoursPage';
import RealisationsPage from './pages/RealisationsPage';
import CompetencesPage from './pages/CompetencesPage';
import CertificationsPage from './pages/CertificationsPage';
import ContactPage from './pages/ContactPage';
import Admin from './components/Admin';
import { Toaster } from './components/ui/toaster';
import { trackPageView } from './lib/analytics';
import { ContentProvider } from './contexts/ContentContext';

// Une page = un chemin : on retrace à chaque changement de route, pas seulement
// au chargement initial (sinon toutes les visites remontent sous "/").
const PageViewTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);
  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PageViewTracker />
        <Routes>
          {/* Un seul ContentProvider pour les pages publiques : le contenu n'est
              rechargé qu'une fois, pas à chaque changement de page. */}
          <Route element={<ContentProvider><Outlet /></ContentProvider>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/parcours" element={<ParcoursPage />} />
            <Route path="/realisations" element={<RealisationsPage />} />
            <Route path="/competences" element={<CompetencesPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
