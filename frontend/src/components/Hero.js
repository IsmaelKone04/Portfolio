import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { studentData } from '../data/mockData';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    "Développeur Full-Stack",
    "Étudiant en Génie Informatique", 
    "Passionné d'IA",
    "Tech Innovator"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.8)), url('https://images.unsplash.com/photo-1607799279861-4dd421887fb3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50fGVufDB8fHxibHVlfDE3NTIzMjE5MzF8MA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-blue-400/20 rounded-full animate-bounce blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-300/30 rounded-full animate-ping blur-lg"></div>
      </div>

      <div className="container mx-auto px-6 z-20 relative">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Photo de profil animée */}
          <div className="mb-8 relative inline-block group">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden ring-4 ring-white/30 shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:ring-white/50">
              <img 
                src={studentData.personal.avatar}
                alt={studentData.personal.name}
                className="w-full h-full object-cover filter group-hover:brightness-110 transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white text-lg">🚀</span>
            </div>
          </div>

          {/* Nom et titre */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {studentData.personal.name}
          </h1>
          
          {/* Rôle animé */}
          <div className="h-16 mb-6">
            <h2 className="text-2xl md:text-3xl text-blue-100 font-light transition-all duration-500 transform">
              {roles[currentRole]}
            </h2>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm hover:bg-white/30 transition-all duration-300">
              📍 {studentData.personal.location}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm hover:bg-white/30 transition-all duration-300">
              🎓 {studentData.personal.year}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm hover:bg-white/30 transition-all duration-300">
              🏫 {studentData.personal.university}
            </Badge>
          </div>

          {/* Bio courte */}
          <p className="text-xl text-blue-50 mb-10 max-w-3xl mx-auto leading-relaxed">
            {studentData.personal.bio.substring(0, 150)}...
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => scrollToSection('projects')}
            >
              Voir mes projets
              <span className="ml-2">→</span>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-full transform transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('contact')}
            >
              Me contacter
              <span className="ml-2">📧</span>
            </Button>
          </div>

          {/* Indicateur de scroll */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;