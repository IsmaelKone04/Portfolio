import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  ImageOff,
  Images,
  Github,
  ExternalLink,
  Container,
  Lock,
  BadgeCheck,
  Mail,
  Phone,
  Linkedin,
  ChevronDown,
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import ProjectGallery from './ProjectGallery';
import { useContent } from '../contexts/ContentContext';

// Au-delà de cette longueur, la description est repliée par défaut (rien n'est
// supprimé : le texte complet et le résultat restent accessibles via "Voir les détails").
const DESCRIPTION_TRUNCATE_LENGTH = 140;

const ProjectCard = ({ project }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const images = project.images || [];
  const hasMedia = images.length > 0 || Boolean(project.video);
  const hasExpandableContent =
    Boolean(project.impact) || (project.description?.length ?? 0) > DESCRIPTION_TRUNCATE_LENGTH;

  return (
    <Card className="flex h-full flex-col overflow-hidden border-border">
      <div className="relative">
        {images.length > 0 ? (
          <img src={images[0]} alt={project.title} className="h-48 w-full object-cover" />
        ) : (
          // Pas de capture disponible pour ce chantier.
          <div className="flex h-48 w-full items-center justify-center bg-muted">
            <ImageOff className="h-8 w-8 text-muted-foreground" strokeWidth={1.75} aria-hidden="true" />
          </div>
        )}

        <div className="absolute top-3 right-3">
          <Badge
            className={
              project.status === 'Terminé'
                ? 'bg-success text-success-foreground hover:bg-success'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary'
            }
          >
            {project.status}
          </Badge>
        </div>

        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {project.category}
          </Badge>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="bg-background/80 text-foreground">
              +{images.length - 1}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col pt-5">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <p
          className={`mt-2 leading-[1.65] text-muted-foreground ${
            !expanded && hasExpandableContent ? 'line-clamp-2' : ''
          }`}
        >
          {project.description}
        </p>

        {expanded && project.impact && (
          <div className="mt-4 rounded-r-lg border-l-2 border-primary bg-accent/40 px-4 py-3">
            <p className="mb-1 text-sm font-semibold text-highlight">Résultat</p>
            <p className="text-sm leading-[1.65] text-foreground">{project.impact}</p>
          </div>
        )}

        {hasExpandableContent && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 h-auto w-fit gap-1.5 p-0 text-sm font-medium text-highlight hover:bg-transparent hover:text-highlight/80"
          >
            {expanded ? 'Réduire' : 'Voir les détails'}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </Button>
        )}

        {project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {hasMedia && (
          <Button
            variant="outline"
            onClick={() => setGalleryOpen(true)}
            className="mt-4 w-fit gap-2"
          >
            <Images className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Galerie
          </Button>
        )}

        <div className="mt-5">
          {project.github || project.demo || project.dockerhub ? (
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <Button asChild className="flex-1 gap-2">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    Code
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button asChild variant="outline" className="flex-1 gap-2">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    Démo
                  </a>
                </Button>
              )}
              {project.dockerhub && (
                <Button asChild variant="outline" className="flex-1 gap-2">
                  <a href={project.dockerhub} target="_blank" rel="noopener noreferrer">
                    <Container className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    Image Docker
                  </a>
                </Button>
              )}
            </div>
          ) : (
            <p className="flex gap-2 rounded-lg border border-border bg-secondary px-4 py-3 text-sm leading-[1.65] text-muted-foreground">
              <Lock className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span>
                Code non public — je ne peux pas le diffuser, mais je peux le présenter et le
                faire tourner devant vous lors d'un entretien.
              </span>
            </p>
          )}
        </div>
      </CardContent>

      {hasMedia && <ProjectGallery project={project} open={galleryOpen} onOpenChange={setGalleryOpen} />}
    </Card>
  );
};

// En-tête d'un groupe : rappelle le stage/contexte dont sont issues les réalisations qui suivent.
const GroupHeader = ({ exp, count }) => (
  <div className="mb-6">
    <div className="mb-4 flex flex-wrap items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent">
        <Building2 className="h-5 w-5 text-highlight" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{exp.shortName || exp.company}</h3>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{exp.position}</span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            {exp.duration}
          </span>
        </p>
      </div>
      <Badge variant="outline" className="ml-auto border-border bg-secondary text-secondary-foreground">
        {count} réalisation{count > 1 ? 's' : ''}
      </Badge>
    </div>
    <div className="h-px bg-border" />
  </div>
);

// Personnes pouvant attester du travail présenté dans ce groupe.
const GroupReferences = ({ groupId }) => {
  const { references, referencesFallback } = useContent();
  const refs = (references || []).filter((r) => r.groupId === groupId);

  if (refs.length === 0) {
    return referencesFallback ? (
      <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
        <BadgeCheck className="h-4 w-4 text-highlight" strokeWidth={1.75} aria-hidden="true" />
        {referencesFallback}
      </p>
    ) : null;
  }

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6">
      <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
        <BadgeCheck className="h-4 w-4 text-highlight" strokeWidth={1.75} aria-hidden="true" />
        {refs.length > 1 ? 'Personnes de référence' : 'Personne de référence'}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {refs.map((ref) => (
          <div key={ref.name} className="rounded-xl border border-border bg-secondary p-4">
            <p className="font-medium text-foreground">{ref.name}</p>
            {(ref.role || ref.company) && (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {[ref.role, ref.company].filter(Boolean).join(' — ')}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
              {ref.email && (
                <a
                  href={`mailto:${ref.email}`}
                  className="inline-flex items-center gap-1.5 text-highlight hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  {ref.email}
                </a>
              )}
              {ref.phone && (
                <a
                  href={`tel:${ref.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-highlight hover:underline"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  {ref.phone}
                </a>
              )}
              {ref.linkedin && (
                <a
                  href={ref.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-highlight hover:underline"
                >
                  <Linkedin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const { experience, projectGroups, projects } = useContent();

  // Les réalisations sont rattachées à leur contexte par `groupId` : soit un stage
  // (`experience`), soit un groupe hors stage (`projectGroups`, ex. projets personnels).
  // Elles sont présentées par groupe plutôt qu'en une seule grille indifférenciée.
  const groups = [...experience, ...(projectGroups || [])]
    .map((exp) => ({
      exp,
      projects: projects.filter((p) => p.groupId === exp.id)
    }))
    .filter((group) => group.projects.length > 0);

  const visibleGroups = filter === 'all' ? groups : groups.filter((group) => group.exp.id === filter);

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] text-foreground">
            Réalisations
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Les travaux que j'ai menés, regroupés par mission — de la migration d'une
            plateforme ITSM multi-pays au développement d'outils métier.
          </p>
          <div className="mx-auto mt-5 h-0.5 w-10 bg-primary" aria-hidden="true" />
        </div>

        {/* Filtre par mission */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <Button
            type="button"
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="rounded-full"
          >
            Toutes <span className="opacity-70">({projects.length})</span>
          </Button>

          {groups.map(({ exp, projects }) => (
            <Button
              key={exp.id}
              type="button"
              variant={filter === exp.id ? 'default' : 'outline'}
              onClick={() => setFilter(exp.id)}
              className="rounded-full"
            >
              {exp.shortName || exp.company} <span className="opacity-70">({projects.length})</span>
            </Button>
          ))}
        </div>

        {/* Groupes de réalisations */}
        <div className="mt-14 space-y-16">
          {visibleGroups.map(({ exp, projects }) => (
            <div key={exp.id}>
              <GroupHeader exp={exp} count={projects.length} />

              {exp.stats?.length > 0 && (
                <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {exp.stats
                    .filter((item) => item.label)
                    .map((item) => (
                      <div key={item.label} className="rounded-2xl border border-border bg-card p-5 text-center">
                        <div className="font-mono text-2xl font-semibold text-highlight">{item.value}</div>
                        <div className="mt-1 text-xs leading-snug text-muted-foreground">{item.label}</div>
                      </div>
                    ))}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              <GroupReferences groupId={exp.id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
