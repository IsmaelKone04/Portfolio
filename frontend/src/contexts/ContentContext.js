import React, { createContext, useContext, useEffect, useState } from 'react';
import { studentData } from '../data/mockData';
import { fetchContent, fetchSections } from '../lib/content';

// `content` démarre avec mockData.js (rendu immédiat, pas d'écran de chargement)
// puis se met à jour si l'API répond. `sections` reste `null` tant que l'API n'a
// pas répondu : isSectionVisible considère alors tout comme visible (fail-open),
// pour ne jamais faire disparaître une section avant que le Worker soit déployé.
const ContentContext = createContext({
  content: studentData,
  isSectionVisible: () => true,
});

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(studentData);
  const [sections, setSections] = useState(null);

  useEffect(() => {
    fetchContent().then((data) => {
      if (data) setContent(data);
    });
    fetchSections().then((data) => {
      if (data) setSections(data);
    });
  }, []);

  const isSectionVisible = (key) => {
    if (!sections) return true;
    const entry = sections.find((s) => s.key === key);
    return entry ? entry.visible : true;
  };

  return (
    <ContentContext.Provider value={{ content, isSectionVisible }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext).content;
export const useSectionVisible = (key) => useContext(ContentContext).isSectionVisible(key);
