import React from 'react';
import Header from '../components/Header';
import Skills from '../components/Skills';
import { useSectionVisible } from '../contexts/ContentContext';

const CompetencesPage = () => {
  const visible = useSectionVisible('competences');
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-14 sm:pt-16">
        {visible ? (
          <Skills />
        ) : (
          <p className="py-24 text-center text-sm text-muted-foreground">Cette page n'est pas disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default CompetencesPage;
