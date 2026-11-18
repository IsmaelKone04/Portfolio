import React from 'react';
import { MapPin, Calendar, BookOpen, GraduationCap, BrainCircuit, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useContent } from '../contexts/ContentContext';

// Icône par id plutôt que par correspondance de texte sur le nom de l'établissement
// (fragile : casserait silencieusement au moindre renommage ou nouvel ajout).
const EDUCATION_ICONS = {
  2: BrainCircuit,
};

const EducationCard = ({ education, isLast }) => {
  const Icon = EDUCATION_ICONS[education.id] ?? GraduationCap;

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
              <Icon className="h-5 w-5 text-highlight" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {education.degree}
              </CardTitle>
              <p className="text-sm font-medium text-highlight">{education.institution}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  {education.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  {education.duration}
                </span>
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="leading-[1.65] text-muted-foreground">{education.description}</p>

          <div className="mt-5 space-y-3">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <BookOpen className="h-4 w-4 text-highlight" strokeWidth={1.75} aria-hidden="true" />
              Cours principaux
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {education.courses.map((course) => (
                <div
                  key={course}
                  className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground"
                >
                  {course}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Education = () => {
  const { academic, education } = useContent();

  return (
    <section id="education" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] text-foreground">
            Formation
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Parcours académique et formation continue.
          </p>
          <div className="mx-auto mt-5 h-0.5 w-10 bg-primary" aria-hidden="true" />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {education.map((edu, index) => (
            <EducationCard
              key={edu.id}
              education={edu}
              isLast={index === education.length - 1}
            />
          ))}
        </div>

        <div className="mx-auto mt-4 grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-accent">
              <Award className="h-5 w-5 text-highlight" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-lg font-semibold text-foreground">{academic.average}</p>
              <p className="text-xs text-muted-foreground">Moyenne actuelle</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-accent">
              <GraduationCap className="h-5 w-5 text-highlight" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-lg font-semibold text-foreground">
                {academic.graduationYear}
              </p>
              <p className="text-xs text-muted-foreground">Diplôme prévu — {academic.specialization}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
