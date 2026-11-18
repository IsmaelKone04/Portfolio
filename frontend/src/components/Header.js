import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useContent, useSectionVisible } from '../contexts/ContentContext';

const NAV_LINKS = [
  { label: 'Accueil', href: '#hero', section: null },
  { label: 'Réalisations', href: '#projects', section: 'projects' },
  { label: 'Parcours', href: '#experience', section: 'experience' },
  { label: 'Contact', href: '#contact', section: 'contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { personal } = useContent();
  const projectsVisible = useSectionVisible('projects');
  const experienceVisible = useSectionVisible('experience');
  const contactVisible = useSectionVisible('contact');
  const sectionVisibility = { projects: projectsVisible, experience: experienceVisible, contact: contactVisible };
  const navLinks = NAV_LINKS.filter((link) => !link.section || sectionVisibility[link.section]);

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-sm sm:h-16">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <a href="#hero" className="flex items-center gap-2.5 font-semibold text-foreground">
          <img
            src={personal.avatar}
            alt=""
            aria-hidden="true"
            className="h-7 w-7 rounded-full object-cover"
          />
          <span>{personal.displayName}</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <span className="h-5 w-px bg-border" aria-hidden="true" />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-b border-border bg-background px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
