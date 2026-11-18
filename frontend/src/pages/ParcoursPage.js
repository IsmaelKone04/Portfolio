import React from 'react';
import Header from '../components/Header';
import Parcours from '../components/Parcours';
import { useSectionVisible } from '../contexts/ContentContext';

const ParcoursPage = () => {
  const visible = useSectionVisible('parcours');
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-14 sm:pt-16">
        {visible ? (
          <Parcours />
        ) : (
          <p className="py-24 text-center text-sm text-muted-foreground">Cette page n'est pas disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default ParcoursPage;
