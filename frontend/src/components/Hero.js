import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useContent } from '../contexts/ContentContext';

const Hero = () => {
  const { personal } = useContent();

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      {/* Halo discret, pas de dégradé saturé */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08),_transparent_70%)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Colonne gauche */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-highlight">
            {personal.name}
          </p>

          <h1 className="mt-3 text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.02em] text-foreground">
            {personal.displayName}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-[1.65] text-muted-foreground">
            {personal.subtitle}
          </p>

          <blockquote className="mt-6 border-l-2 border-primary pl-4 text-base leading-[1.65] text-foreground">
            « {personal.tagline} »
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/realisations">
                Voir mes réalisations
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/competences">Mes compétences</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Me contacter</Link>
            </Button>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col gap-4">
          <figure className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={personal.avatar}
              alt={personal.displayName}
              fetchpriority="high"
              className="aspect-[2/3] w-full object-cover object-top"
            />
            <figcaption className="border-t border-border px-4 py-2.5 text-sm text-muted-foreground">
              {personal.location}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
