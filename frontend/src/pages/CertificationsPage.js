import React from 'react';
import Header from '../components/Header';
import Certifications from '../components/Certifications';
import { useSectionVisible } from '../contexts/ContentContext';

const CertificationsPage = () => {
  const visible = useSectionVisible('certifications');
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-14 sm:pt-16">
        {visible ? (
          <Certifications />
        ) : (
          <p className="py-24 text-center text-sm text-muted-foreground">Cette page n'est pas disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default CertificationsPage;
