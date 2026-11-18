import React, { useState } from 'react';
import { GraduationCap, Trophy, BookOpen, Calendar, FileText, FileX2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Reveal } from './ui/motion-card';
import { useContent } from '../contexts/ContentContext';

const API_URL = process.env.REACT_APP_API_URL;

const TYPES = {
  diplome: { label: 'Diplôme', icon: GraduationCap },
  formation: { label: 'Formation', icon: BookOpen },
  concours: { label: 'Concours', icon: Trophy },
};

const CertificationCard = ({ certification: c }) => {
  const Icon = TYPES[c.type]?.icon ?? GraduationCap;

  return (
    <Reveal className="h-full">
    <Card className="flex h-full flex-col border-border">
      <CardContent className="flex flex-1 flex-col pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-signature shadow-sm">
            <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <Badge variant="soft">{TYPES[c.type]?.label ?? c.type}</Badge>
        </div>

        <h3 className="mt-4 text-base font-semibold text-foreground">{c.title}</h3>
        {c.organization && <p className="mt-1 text-sm font-medium text-highlight">{c.organization}</p>}
        {c.date && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            {c.date}
          </p>
        )}
        {c.description && (
          <p className="mt-3 flex-1 text-sm leading-[1.65] text-muted-foreground">{c.description}</p>
        )}

        <div className="mt-4">
          {c.fileUrl ? (
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href={`${API_URL}/api/certifications/${c.id}/file`} target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                Voir le justificatif
              </a>
            </Button>
          ) : (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileX2 className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              Justificatif à venir
            </p>
          )}
        </div>
      </CardContent>
    </Card>
    </Reveal>
  );
};

const Certifications = () => {
  const [filter, setFilter] = useState('all');
  const { certifications } = useContent();
  const list = certifications || [];
  const types = [...new Set(list.map((c) => c.type))];
  const visible = filter === 'all' ? list : list.filter((c) => c.type === filter);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] text-foreground">
            Certifications
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Diplômes, concours et formations — avec le justificatif quand il est disponible.
          </p>
          <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-gradient-signature" aria-hidden="true" />
        </div>

        {list.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            Aucune certification publiée pour le moment.
          </p>
        ) : (
          <>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              <Button
                type="button"
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className="rounded-full"
              >
                Toutes <span className="opacity-70">({list.length})</span>
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={filter === type ? 'default' : 'outline'}
                  onClick={() => setFilter(type)}
                  className="rounded-full"
                >
                  {TYPES[type]?.label ?? type}{' '}
                  <span className="opacity-70">({list.filter((c) => c.type === type).length})</span>
                </Button>
              ))}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((c) => (
                <CertificationCard key={c.id} certification={c} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Certifications;
