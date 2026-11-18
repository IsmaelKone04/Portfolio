import React from 'react';
import { Radio } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Reveal } from './ui/motion-card';
import { useContent } from '../contexts/ContentContext';

// Même fait que la carte "Disponibilité" de Contact.js, répété ici en avant-plan
// plutôt que relu en détail : un recruteur qui n'ouvre que l'Accueil doit déjà
// savoir si je suis disponible.
const STATUS = 'Ouvert aux opportunités — stage et premier poste';

// Accueil épuré : aucune liste de compétences ici (Hero pointe déjà vers
// /competences pour le détail) — uniquement qui je suis, mon statut, langues
// et centres d'intérêt.
const Snapshot = () => {
  const { personal, languages, interests } = useContent();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] text-foreground">
            L'essentiel à savoir
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Qui je suis et où j'en suis, en un coup d'œil — le détail est dans les pages
            dédiées.
          </p>
          <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-gradient-signature" aria-hidden="true" />
        </div>

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <Card className="overflow-hidden rounded-[28px] shadow-[0_16px_40px_-16px_rgba(29,78,216,0.2)]">
            <CardContent className="space-y-6 p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-2 text-sm font-medium text-success">
                <Radio className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                {STATUS}
              </div>

              {personal.bio && <p className="leading-[1.65] text-muted-foreground">{personal.bio}</p>}

              {(languages?.length > 0 || interests?.length > 0) && (
                <div className="flex flex-wrap gap-8">
                  {languages?.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">Langues</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {languages.map((lang) => (
                          <span
                            key={lang.name}
                            className="rounded-full border border-transparent bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground"
                          >
                            {lang.name} — {lang.level}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {interests?.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                        Centres d'intérêt
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {interests.map((interest) => (
                          <span
                            key={interest}
                            className="rounded-full border border-transparent bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
};

export default Snapshot;
