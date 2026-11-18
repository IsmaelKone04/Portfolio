import React from 'react';
import Header from '../components/Header';
import Projects from '../components/Projects';
import { useSectionVisible } from '../contexts/ContentContext';

const RealisationsPage = () => {
  const visible = useSectionVisible('realisations');
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-14 sm:pt-16">
        {visible ? (
          <Projects />
        ) : (
          <p className="py-24 text-center text-sm text-muted-foreground">Cette page n'est pas disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default RealisationsPage;
