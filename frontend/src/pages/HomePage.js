import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Snapshot from '../components/Snapshot';

// Accueil : le Hero (nom, accroche, proposition de valeur, CTA vers les autres
// pages) puis un résumé bio + statut + compétences clés — le détail de chaque
// sujet reste sur sa propre page dédiée.
const HomePage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <Hero />
    <Snapshot />
  </div>
);

export default HomePage;
