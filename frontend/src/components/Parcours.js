import React, { useState } from 'react';
import { Building2, MapPin, Calendar, Trophy, Check, ChevronDown } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Reveal } from './ui/motion-card';
import { useContent } from '../contexts/ContentContext';

// Au-delà de ce nombre, les réalisations suivantes sont repliées par défaut
// (rien n'est supprimé — le texte complet reste accessible via "Voir plus").
const VISIBLE_ACHIEVEMENTS = 3;

const ExperienceCard = ({ exp, isLast }) => {
  const [expanded, setExpanded] = useState(false);
  const achievements = exp.achievements || [];
  const hasMore = achievements.length > VISIBLE_ACHIEVEMENTS;
  const visibleAchievements = expanded ? achievements : achievements.slice(0, VISIBLE_ACHIEVEMENTS);

  return (
    <Reveal className="relative">
      {!isLast && <div className="absolute left-6 top-16 h-full w-px bg-border" aria-hidden="true" />}
      <div className="absolute left-[21px] top-6 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />

      <Card className="ml-16 mb-8 overflow-hidden rounded-[28px] p-0 shadow-[0_14px_36px_-12px_rgba(29,78,216,0.22)]">
        {/* Bandeau dégradé : poste + entreprise, pour un repère immédiat dans la chronologie. */}
        <div className="flex items-center gap-4 bg-[linear-gradient(160deg,#1D4ED8_0%,#2563EB_100%)] px-6 py-5 text-white">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white/15">
            <Building2 className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{exp.position}</h3>
            <p className="text-sm font-medium text-white/80">{exp.shortName || exp.company}</p>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/75">
              {exp.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  {exp.location}
                </span>
              )}
              {exp.duration && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  {exp.duration}
                </span>
              )}
              {exp.current && <Badge className="border-transparent bg-white/20 text-white hover:bg-white/20">En cours</Badge>}
            </p>
          </div>
        </div>

        <CardContent className="pt-6">
          {exp.description && <p className="leading-[1.65] text-muted-foreground">{exp.description}</p>}

          {achievements.length > 0 && (
            <div className="mt-5 space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Trophy className="h-4 w-4 text-highlight" strokeWidth={1.75} aria-hidden="true" />
                Principales réalisations
              </h4>
              <ul className="space-y-2">
                {visibleAchievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={1.75} aria-hidden="true" />
                    <span className="leading-[1.65]">{achievement}</span>
                  </li>
                ))}
              </ul>
              {hasMore && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="h-auto gap-1.5 p-0 text-sm font-medium text-highlight hover:bg-transparent hover:text-highlight/80"
                >
                  {expanded
                    ? 'Voir moins'
                    : `Voir ${achievements.length - VISIBLE_ACHIEVEMENTS} autre${achievements.length - VISIBLE_ACHIEVEMENTS > 1 ? 's' : ''} réalisation${achievements.length - VISIBLE_ACHIEVEMENTS > 1 ? 's' : ''}`}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Reveal>
  );
};

const Parcours = () => {
  const { experience } = useContent();

  return (
    <section id="parcours" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] text-foreground">
            Parcours professionnel
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Les stages qui ont forgé mes compétences en administration système et en
            développement — le détail des livrables de chacun est à retrouver dans
            les Réalisations.
          </p>
          <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-gradient-signature" aria-hidden="true" />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {experience.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} isLast={index === experience.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Parcours;
