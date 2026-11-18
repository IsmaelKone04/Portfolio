import React from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Education from './Education';
import Contact from './Contact';
import { useSectionVisible } from '../contexts/ContentContext';

const Portfolio = () => {
  const aboutVisible = useSectionVisible('about');
  const skillsVisible = useSectionVisible('skills');
  const projectsVisible = useSectionVisible('projects');
  const experienceVisible = useSectionVisible('experience');
  const educationVisible = useSectionVisible('education');
  const contactVisible = useSectionVisible('contact');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      {aboutVisible && <About />}
      {skillsVisible && <Skills />}
      {projectsVisible && <Projects />}
      {experienceVisible && <Experience />}
      {educationVisible && <Education />}
      {contactVisible && <Contact />}
    </div>
  );
};

export default Portfolio;