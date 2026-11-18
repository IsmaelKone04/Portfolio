import React from 'react';
import { FlaskConical, Boxes, ListChecks } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const METHOD_ICONS = [FlaskConical, Boxes, ListChecks];

// Principes de travail appliqués pendant les missions présentées ci-dessus.
const MethodBlock = () => {
  const { method } = useContent();
  if (!method?.length) return null;

  return (
    <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border bg-card p-8">
      <h3 className="text-center text-sm font-semibold text-foreground">Ma méthode de travail</h3>
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
  );
};

export default MethodBlock;
