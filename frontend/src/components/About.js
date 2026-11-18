import React from 'react';
import { ShieldCheck, Code2, BrainCircuit, Mail, Github } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const WHAT_I_DO_ICONS = {
  itsm: ShieldCheck,
  dev: Code2,
  ai: BrainCircuit,
};

const About = () => {
  const { whatIDo, languages, interests, personal } = useContent();

  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] text-foreground">
          Qui suis-je ?
        </h2>
        <div className="mx-auto mt-3 h-0.5 w-10 bg-primary" aria-hidden="true" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Ce que je fais */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {whatIDo.map(({ icon, title, description }) => {
              const Icon = WHAT_I_DO_ICONS[icon] ?? ShieldCheck;
              return (
                <div key={title} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent">
                    <Icon className="h-5 w-5 text-highlight" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
                  <p className="mt-1.5 text-sm leading-[1.65] text-muted-foreground">{description}</p>
                </div>
              );
            })}
          </div>

          {/* Bio, langues, intérêts, contact */}
          <div className="space-y-8">
            <div className="space-y-4 text-base leading-[1.65] text-muted-foreground">
              <p>{personal.bio}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">Langues</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang.name}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
                  >
                    {lang.name} — {lang.level}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">Centres d'intérêt</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
              >
                <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                E-mail
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
              >
                <Github className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
