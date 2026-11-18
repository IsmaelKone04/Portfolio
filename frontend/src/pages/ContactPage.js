import React from 'react';
import Header from '../components/Header';
import Contact from '../components/Contact';
import { useSectionVisible } from '../contexts/ContentContext';

const ContactPage = () => {
  const visible = useSectionVisible('contact');
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-14 sm:pt-16">
        {visible ? (
          <Contact />
        ) : (
          <p className="py-24 text-center text-sm text-muted-foreground">Cette page n'est pas disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
