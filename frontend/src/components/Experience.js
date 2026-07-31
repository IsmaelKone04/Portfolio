import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { studentData } from '../data/mockData';

const Experience = () => {
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

  const ExperienceCard = ({ experience, index, isLast }) => (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-blue-500 to-indigo-600 opacity-30"></div>
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full border-4 border-white shadow-lg z-10"></div>
      
      <Card className="ml-16 mb-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group overflow-hidden">
        {/* Header avec logo */}
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                {experience.logo}
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {experience.position}
                </CardTitle>
                <p className="text-lg font-semibold text-blue-600">{experience.company}</p>
                <p className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
                  📍 {experience.location} • 📅 {experience.duration}
                  {experience.current && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs px-2 py-0.5">
                      En cours
                    </Badge>
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <p className="text-gray-600 mb-6 leading-relaxed">
            {experience.description}
          </p>

          {/* Réalisations — masquées tant qu'elles ne sont pas renseignées */}
          {experience.achievements?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                🏆 Principales réalisations
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="flex items-start gap-3 text-gray-600">
                    <span className="text-green-500 mt-1 text-sm">✓</span>
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-indigo-200/30 rounded-full animate-bounce blur-2xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mon Expérience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Parcours professionnel et stages qui ont forgé mes compétences en développement
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {studentData.experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <ExperienceCard 
                  experience={exp} 
                  index={index}
                  isLast={index === studentData.experience.length - 1}
                />
              </div>
            ))}
          </div>

          {/* Skills développées */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="bg-white border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  💡 Ma méthode de travail
                </h3>
                <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                  Les principes que j'ai appliqués sur une plateforme en production
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  {studentData.method.map((principle, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                        {principle.icon}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{principle.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{principle.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Prêt pour de nouveaux défis 💪
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Assumer des responsabilités au-delà de mon périmètre initial m'a appris à
                diagnostiquer en profondeur et à livrer des solutions durables. Je cherche à
                poursuivre sur cette double compétence système et développement.
              </p>
              <Badge className="bg-white text-blue-600 px-6 py-2 text-lg font-semibold">
                🎓 Étudiant • 💼 Ouvert aux opportunités
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;