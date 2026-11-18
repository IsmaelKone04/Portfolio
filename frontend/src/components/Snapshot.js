import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useContent } from '../contexts/ContentContext';

// Même fait que la carte "Disponibilité" de Contact.js, répété ici en avant-plan
// plutôt que relu en détail : un recruteur qui n'ouvre que l'Accueil doit déjà
// savoir si je suis disponible.
const STATUS = 'Ouvert aux opportunités — stage et premier poste';

// Compétences les plus représentatives de mon profil (mêmes technologies que
// l'accroche du Hero), pas un classement brut par score : "GLPI" ou "HTML/CSS"
// sont mieux notés dans mockData.js mais moins lisibles en tête de page que la
// combinaison backend + DevOps déjà mise en avant ailleurs sur le site.
const HIGHLIGHT_SKILL_NAMES = [
  'PHP 8 (Laravel, plugins GLPI)',
  'Python 3 (Django, pandas)',
  'TypeScript',
  'Java 21 (Spring Boot)',
  'Docker & Docker Compose',
  'GLPI 10 / 11 (administration ITSM)',
];

const Snapshot = () => {
  const { personal, skills, languages, interests } = useContent();
  const allSkills = Object.values(skills || {}).flat();
  const highlights = HIGHLIGHT_SKILL_NAMES.map((name) => allSkills.find((s) => s.name === name)).filter(Boolean);

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

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Qui je suis, statut, langues, intérêts */}
          <div className="space-y-6">
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
          </div>

          {/* Compétences clés */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-signature shadow-sm">
                <Sparkles className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Compétences clés</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {highlights.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-full border border-transparent bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground"
                >
                  {skill.name}
                </span>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-6 gap-2">
              <Link to="/competences">
                Voir toutes mes compétences
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Snapshot;
