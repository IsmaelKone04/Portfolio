import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Radio } from 'lucide-react';
import { Button } from './ui/button';
import BubbleField from './BubbleField';
import { useContent } from '../contexts/ContentContext';

const Hero = () => {
  const { personal, uiSettings } = useContent();

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      {/* Halo discret, pas de dégradé saturé */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08),_transparent_70%)]"
        aria-hidden="true"
      />
      <BubbleField className="-z-0" enabled={uiSettings?.bubblesEnabled !== false} />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Colonne gauche */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
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

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="btn-shine gap-2">
              <Link to="/realisations">
                Voir mes réalisations
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-shine">
              <Link to="/competences">Mes compétences</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-shine">
              <Link to="/contact">Me contacter</Link>
            </Button>
          </div>
        </motion.div>

        {/* Colonne droite */}
        <motion.div
          className="relative mx-auto w-full max-w-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        >
          {/* Halo dégradé flouté derrière la photo, décalé pour casser le cadre rectangulaire */}
          <div
            className="absolute -right-6 -top-6 -z-10 h-56 w-56 rounded-full bg-gradient-signature opacity-30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-full bg-gradient-signature opacity-20 blur-2xl"
            aria-hidden="true"
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative rounded-[30px] bg-gradient-signature p-[3px] shadow-[0_20px_45px_-15px_rgba(29,78,216,0.35)]"
          >
            <figure className="overflow-hidden rounded-[27px] bg-card">
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

            {/* Pastille flottante : disponibilité, rappel discret du statut */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="absolute -left-5 bottom-10 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-success shadow-lg"
            >
              <Radio className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              Disponible
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
