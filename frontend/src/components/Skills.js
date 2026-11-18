import React from 'react';
import { Code2, Server, Lock, Wrench, BrainCircuit } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Reveal } from './ui/motion-card';
import { useContent } from '../contexts/ContentContext';

// Compétences affichées par domaine plutôt que par langage/outil isolé — plus lisible
// pour un recruteur qui scanne la page. Reclassement pur (aucune compétence ajoutée
// ou retirée) ; les noms ci-dessous doivent rester synchronisés avec mockData.js /
// le contenu réel saisi dans l'admin.
const SECURITY_SKILL_NAMES = new Set([
  'Sécurité applicative (JWT, RBAC, chiffrement)',
  'SSO OpenID Connect (Keycloak)',
]);
const INFRA_TOOL_NAMES = new Set(['Intégration continue (GitHub Actions)']);

function categorize(skills) {
  const systems = skills.systems ?? [];
  const tools = skills.tools ?? [];
  return [
    { key: 'dev', title: 'Développement', icon: Code2, skills: [...(skills.languages ?? []), ...(skills.frameworks ?? [])] },
    {
      key: 'infra',
      title: 'Infrastructure & DevOps',
      icon: Server,
      skills: [...systems.filter((s) => !SECURITY_SKILL_NAMES.has(s.name)), ...tools.filter((s) => INFRA_TOOL_NAMES.has(s.name))],
    },
    { key: 'security', title: 'Sécurité & IAM', icon: Lock, skills: systems.filter((s) => SECURITY_SKILL_NAMES.has(s.name)) },
    { key: 'methodology', title: 'Méthodologie & Outils', icon: Wrench, skills: tools.filter((s) => !INFRA_TOOL_NAMES.has(s.name)) },
    { key: 'ai', title: 'IA appliquée', icon: BrainCircuit, skills: skills.ai ?? [] },
  ].filter((group) => group.skills.length > 0);
}

const SkillPill = ({ skill }) => {
  const hasDetails = skill.details?.length > 0;

  if (!hasDetails) {
    return (
      <span className="rounded-full border border-transparent bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
        {skill.name}
      </span>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="rounded-full border border-transparent bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {skill.name}
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm font-semibold text-foreground">{skill.name}</p>
        <ul className="mt-2 space-y-2">
          {skill.details.map((detail) => (
            <li key={detail} className="flex gap-2.5 text-sm leading-[1.65] text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-highlight" aria-hidden="true" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

// Grille Bento : les domaines les mieux dotés en compétences occupent plus de
// place (2 colonnes) plutôt qu'une grille strictement uniforme — la taille
// reflète le volume réel de compétences, rien n'est arbitraire.
const SkillGroup = ({ title, icon: Icon, skills, wide, delay }) => (
  <Reveal delay={delay} className={wide ? 'md:col-span-2' : ''}>
    <div className="h-full rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-signature shadow-sm">
          <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillPill key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  </Reveal>
);

const Skills = () => {
  const { skills } = useContent();
  const groups = categorize(skills);

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] text-foreground">
            Compétences
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Compétences acquises en formation et consolidées en production, entre exploitation
            système et développement. Cliquez sur une compétence pour voir ce que je sais
            concrètement en faire.
          </p>
          <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-gradient-signature" aria-hidden="true" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {groups.map((group, i) => (
            <SkillGroup
              key={group.key}
              title={group.title}
              icon={group.icon}
              skills={group.skills}
              wide={group.skills.length >= 5}
              delay={i * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
