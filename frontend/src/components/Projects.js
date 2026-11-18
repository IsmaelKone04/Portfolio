import React, { useState } from 'react';
import {
  Building2,
  Calendar,
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
  Code2,
  Server,
  ShieldCheck,
  LifeBuoy,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TiltCard } from './ui/motion-card';
import ProjectGallery from './ProjectGallery';
import MethodBlock from './MethodBlock';
import { useContent } from '../contexts/ContentContext';

// Au-delà de cette longueur, la description est repliée par défaut (rien n'est
// supprimé : le texte complet et le résultat restent accessibles via "Voir les détails").
const DESCRIPTION_TRUNCATE_LENGTH = 140;

// Icône flottante de la carte, choisie par domaine plutôt que par projet individuel.
const CATEGORY_ICONS = {
  Développement: Code2,
  Infrastructure: Server,
  Sécurité: ShieldCheck,
  ITSM: LifeBuoy,
};

const ProjectCard = ({ project, index, total }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const images = project.images || [];
  const hasMedia = images.length > 0 || Boolean(project.video);
  const hasExpandableContent = (project.description?.length ?? 0) > DESCRIPTION_TRUNCATE_LENGTH;
  const CategoryIcon = CATEGORY_ICONS[project.category] ?? Code2;

  return (
    <TiltCard className="h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-[28px] p-0 shadow-[0_10px_30px_-10px_rgba(29,78,216,0.15)]">
        {/* Moitié haute : icône flottante, catégorie, titre, description courte. */}
        <div className="px-6 pt-6 pb-8">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-signature shadow-sm">
              <CategoryIcon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <Badge
              variant={project.status === 'Terminé' ? 'default' : 'soft'}
              className={project.status === 'Terminé' ? 'bg-success text-success-foreground hover:bg-success' : ''}
            >
              {project.status}
            </Badge>
          </div>

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-highlight">
            Projet • {project.category}
          </p>
          <h3 className="mt-1.5 text-lg font-semibold text-foreground">{project.title}</h3>
          <p
            className={`mt-2 leading-[1.65] text-muted-foreground ${
              !expanded && hasExpandableContent ? 'line-clamp-2' : ''
            }`}
          >
            {project.description}
          </p>

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
        </div>

        {/* Séparateur organique entre la moitié claire et le socle dégradé. */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block h-6 w-full text-[#1D4ED8]"
          aria-hidden="true"
        >
          <path
            d="M0,64 C240,100 480,10 720,46 C960,82 1200,20 1440,56 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>

        {/* Socle dégradé : numéro de carte, impact chiffré, compétences mobilisées. */}
        <div className="relative flex flex-1 flex-col gap-4 bg-[linear-gradient(160deg,#1D4ED8_0%,#2563EB_100%)] px-6 pb-6 pt-1 text-white">
          <div className="absolute top-2 right-5 font-serif text-xl font-semibold text-white/30">
            {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
          </div>

          {project.impact && (
            <div className="flex gap-3 pt-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-[11px] font-semibold text-white">
                ★
              </span>
              <div>
                <p className="mb-1 text-sm font-semibold text-white/80">Résultat</p>
                <p className="text-sm leading-[1.65] text-white">{project.impact}</p>
              </div>
            </div>
          )}

          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white"
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
              className="w-fit gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/30"
            >
              <Images className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              Galerie{images.length > 1 ? ` (${images.length})` : ''}
            </Button>
          )}

          <div className="mt-auto">
            {project.github || project.demo || project.dockerhub ? (
              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <Button asChild className="flex-1 gap-2 bg-white text-[#1D4ED8] shadow-sm hover:bg-white/90 hover:-translate-y-0.5">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                      Code
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                      Démo
                    </a>
                  </Button>
                )}
                {project.dockerhub && (
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
                  >
                    <a href={project.dockerhub} target="_blank" rel="noopener noreferrer">
                      <Container className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                      Image Docker
                    </a>
                  </Button>
                )}
              </div>
            ) : (
              <p className="flex gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm leading-[1.65] text-white/90">
                <Lock className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  Code non public — je ne peux pas le diffuser, mais je peux le présenter et le
                  faire tourner devant vous lors d'un entretien.
                </span>
              </p>
            )}
          </div>
        </div>

        {hasMedia && <ProjectGallery project={project} open={galleryOpen} onOpenChange={setGalleryOpen} />}
      </Card>
    </TiltCard>
  );
};

// En-tête d'un groupe : rappelle le stage/contexte dont sont issues les réalisations qui suivent.
const GroupHeader = ({ exp, count }) => (
  <div className="mb-6">
    <div className="mb-4 flex flex-wrap items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-signature shadow-sm">
        <Building2 className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
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

  // Filtre par domaine (catégorie du projet) plutôt que par mission : un recruteur
  // cherche plutôt "montre-moi du dev" que "montre-moi ce qui vient de tel stage" —
  // le regroupement par mission reste visible comme contexte, pas comme filtre.
  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];

  const visibleGroups = groups
    .map((group) => ({
      ...group,
      projects: filter === 'all' ? group.projects : group.projects.filter((p) => p.category === filter),
    }))
    .filter((group) => group.projects.length > 0);

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
          <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-gradient-signature" aria-hidden="true" />
        </div>

        {/* Filtre par domaine */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <Button
            type="button"
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="rounded-full"
          >
            Toutes <span className="opacity-70">({projects.length})</span>
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              type="button"
              variant={filter === category ? 'default' : 'outline'}
              onClick={() => setFilter(category)}
              className="rounded-full"
            >
              {category}{' '}
              <span className="opacity-70">({projects.filter((p) => p.category === category).length})</span>
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
                      <div
                        key={item.label}
                        className="rounded-3xl bg-gradient-signature-deep p-5 text-center text-white shadow-sm"
                      >
                        <div className="font-mono text-2xl font-semibold">{item.value}</div>
                        <div className="mt-1 text-xs leading-snug text-white/80">{item.label}</div>
                      </div>
                    ))}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} total={projects.length} />
                ))}
              </div>

              <GroupReferences groupId={exp.id} />
            </div>
          ))}
        </div>

        <MethodBlock />
      </div>
    </section>
  );
};

export default Projects;
