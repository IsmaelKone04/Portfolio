import React from 'react';
import { useContent } from '../contexts/ContentContext';

// Bref aperçu personnel avant les canaux de contact ci-dessous : la bio, les langues
// et les centres d'intérêt n'ont plus de page dédiée ("Qui suis-je ?" faisait doublon
// avec la page Compétences et ses propres boutons Mail/GitHub dupliquaient la carte
// "Informations de contact" juste en dessous).
const ContactIntro = () => {
  const { personal, languages, interests } = useContent();
  if (!personal.bio) return null;

  return (
    <div className="mx-auto mt-10 max-w-2xl space-y-6 text-center">
      <p className="leading-[1.65] text-muted-foreground">{personal.bio}</p>

      {(languages?.length > 0 || interests?.length > 0) && (
        <div className="flex flex-wrap items-start justify-center gap-8">
          {languages?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">Langues</h3>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang.name}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
                  >
                    {lang.name} — {lang.level}
                  </span>
                ))}
              </div>
            </div>
          )}

          {interests?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">Centres d'intérêt</h3>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactIntro;
