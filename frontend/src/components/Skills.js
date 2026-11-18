import React from 'react';
import { Code2, Layers, Server, Wrench, BrainCircuit } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { useContent } from '../contexts/ContentContext';

const GROUPS = [
  { key: 'languages', title: 'Langages', icon: Code2 },
  { key: 'frameworks', title: 'Frameworks', icon: Layers },
  { key: 'systems', title: 'Infra & ITSM', icon: Server },
  { key: 'tools', title: 'Outils & méthodes', icon: Wrench },
  { key: 'ai', title: 'IA appliquée', icon: BrainCircuit },
];

const SkillPill = ({ skill }) => {
  const hasDetails = skill.details?.length > 0;

  if (!hasDetails) {
    return (
      <span className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground">
        {skill.name}
      </span>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:border-primary/40 hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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

const SkillGroup = ({ title, icon: Icon, skills }) => (
  <div className="rounded-2xl border border-border bg-card p-6">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent">
        <Icon className="h-5 w-5 text-highlight" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>

    <div className="mt-4 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <SkillPill key={skill.name} skill={skill} />
      ))}
    </div>
  </div>
);

const Skills = () => {
  const { skills } = useContent();

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
          <div className="mx-auto mt-5 h-0.5 w-10 bg-primary" aria-hidden="true" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {GROUPS.map((group) => (
            <SkillGroup
              key={group.key}
              title={group.title}
              icon={group.icon}
              skills={skills[group.key]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
