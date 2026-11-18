import React, { useState } from 'react';
import { MapPin, Calendar, Trophy, Check, ChevronDown, FlaskConical, Boxes, ListChecks, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useContent } from '../contexts/ContentContext';

const METHOD_ICONS = [FlaskConical, Boxes, ListChecks];

// Au-delà de ce nombre, les réalisations suivantes sont repliées par défaut
// (tout reste présent, rien n'est supprimé — voir le bouton "Voir plus").
const VISIBLE_ACHIEVEMENTS = 3;

const ExperienceCard = ({ experience, isLast }) => {
  const [expanded, setExpanded] = useState(false);
  const achievements = experience.achievements || [];
  const hasMore = achievements.length > VISIBLE_ACHIEVEMENTS;
  const visibleAchievements = expanded ? achievements : achievements.slice(0, VISIBLE_ACHIEVEMENTS);

  return (
  <div className="relative">
    {!isLast && (
      <div className="absolute left-6 top-16 h-full w-px bg-border" aria-hidden="true" />
    )}
    <div className="absolute left-[21px] top-6 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />

    <Card className="ml-16 mb-8 border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-accent">
            <Building2 className="h-5 w-5 text-highlight" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              {experience.position}
            </CardTitle>
            <p className="text-sm font-medium text-highlight">{experience.company}</p>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                {experience.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                {experience.duration}
              </span>
              {experience.current && (
                <Badge className="bg-primary text-primary-foreground">En cours</Badge>
              )}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="leading-[1.65] text-muted-foreground">{experience.description}</p>

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
                {expanded ? 'Voir moins' : `Voir ${achievements.length - VISIBLE_ACHIEVEMENTS} autre${achievements.length - VISIBLE_ACHIEVEMENTS > 1 ? 's' : ''} réalisation${achievements.length - VISIBLE_ACHIEVEMENTS > 1 ? 's' : ''}`}
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
    </div>
  );
};

const Experience = () => {
  const { experience, method } = useContent();

  return (
    <section id="experience" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] text-foreground">
            Parcours
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Stages qui ont forgé mes compétences en administration système et en développement.
          </p>
          <div className="mx-auto mt-5 h-0.5 w-10 bg-primary" aria-hidden="true" />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {experience.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-card p-8">
          <h3 className="text-center text-sm font-semibold text-foreground">
            Ma méthode de travail
          </h3>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            Les principes que j'ai appliqués sur une plateforme en production.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {method.map((principle, index) => {
              const Icon = METHOD_ICONS[index] ?? FlaskConical;
              return (
                <div key={principle.title} className="text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent">
                    <Icon className="h-5 w-5 text-highlight" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-foreground">{principle.title}</h4>
                  <p className="mt-1.5 text-sm leading-[1.65] text-muted-foreground">{principle.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
