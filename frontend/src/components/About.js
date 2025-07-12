import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { studentData } from '../data/mockData';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Formes géométriques décoratives */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Titre de section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              À propos de moi
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Partie gauche - Image et stats */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl transform rotate-3 opacity-20"></div>
                <img 
                  src={studentData.personal.avatar}
                  alt={studentData.personal.name}
                  className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105"
                />
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg transform transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {studentData.projects.length}+
                    </div>
                    <div className="text-gray-600 font-medium">Projets</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg transform transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {studentData.skills.languages.length}+
                    </div>
                    <div className="text-gray-600 font-medium">Technologies</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Partie droite - Contenu */}
            <div className="space-y-8">
              
              {/* Bio */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mon parcours</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {studentData.personal.bio}
                </p>
              </div>

              {/* Langues */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Langues</h3>
                <div className="grid grid-cols-2 gap-3">
                  {studentData.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">{lang.name}</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {lang.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Centres d'intérêt */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Centres d'intérêt</h3>
                <div className="flex flex-wrap gap-2">
                  {studentData.interests.map((interest, index) => (
                    <Badge 
                      key={index} 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-2 text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact rapide */}
              <div className="flex gap-4">
                <a 
                  href={`mailto:${studentData.personal.email}`}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  📧 Email
                </a>
                <a 
                  href={studentData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium text-center hover:shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  💻 GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;