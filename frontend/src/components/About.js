import React from 'react';
import { ShieldCheck, Code2, BrainCircuit, Mail, Github } from 'lucide-react';
import { studentData } from '../data/mockData';

const WHAT_I_DO_ICONS = {
  itsm: ShieldCheck,
  dev: Code2,
  ai: BrainCircuit,
};

const About = () => {
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
            {studentData.whatIDo.map(({ icon, title, description }) => {
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
              <p>
                Étudiant en 3<sup>e</sup> année de Licence en Génie Logiciel à l'Université de
                Technologie d'Abidjan, j'ai un double profil : développeur (PHP, Python,
                TypeScript, Java) et administrateur ITSM / DevOps (GLPI, Docker, Keycloak).
              </p>
              <p>
                À la DSI de YeshiGroup, j'ai dépassé le périmètre d'un stage de support :
                migration de la plateforme GLPI 10 vers 11 d'un groupe présent dans 14 pays sur
                une architecture Docker Compose, développement de 4 plugins PHP,
                authentification unique Microsoft via Keycloak (validée en laboratoire) et remise
                en service d'un helpdesk de production après une cyberattaque.
              </p>
              <p>
                Ma méthode : tester plutôt que supposer, privilégier les mécanismes natifs et les
                développements réversibles, avancer par étapes validées. J'utilise aussi l'IA
                appliquée comme partenaire de travail (programme AiCE, MTN × ALX Africa) pour
                cadrer, prototyper et analyser, en gardant toujours la validation finale.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">Langues</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {studentData.languages.map((lang) => (
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
                {studentData.interests.map((interest) => (
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
                href={`mailto:${studentData.personal.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
              >
                <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                E-mail
              </a>
              <a
                href={studentData.personal.github}
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
