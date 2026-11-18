import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';

// Accueil minimaliste : uniquement le Hero (nom, accroche, proposition de valeur,
// CTA vers les autres pages) — le reste du contenu vit sur ses propres pages.
const HomePage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <Hero />
  </div>
);

export default HomePage;
