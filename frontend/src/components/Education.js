import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { studentData } from '../data/mockData';

const Education = () => {
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

  const EducationCard = ({ education, index, isLast }) => (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-blue-500 to-indigo-600 opacity-30"></div>
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full border-4 border-white shadow-lg z-10"></div>
      
      <Card className="ml-16 mb-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                {education.logo}
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {education.degree}
                </CardTitle>
                <p className="text-lg font-semibold text-indigo-600">{education.institution}</p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  📍 {education.location} • 📅 {education.duration}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <p className="text-gray-600 mb-6 leading-relaxed">
            {education.description}
          </p>

          {/* Cours principaux */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              📚 Cours principaux
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {education.courses.map((course, courseIndex) => (
                <div key={courseIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <span className="text-indigo-500 text-sm">📖</span>
                  <span className="text-gray-700 text-sm font-medium">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <section id="education" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ma Formation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Parcours académique et formation continue pour exceller dans le domaine de l'informatique
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto mb-16">
            {studentData.education.map((edu, index) => (
              <div
                key={edu.id}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <EducationCard 
                  education={edu} 
                  index={index}
                  isLast={index === studentData.education.length - 1}
                />
              </div>
            ))}
          </div>

          {/* Progress & Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            
            {/* Progression académique */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                  📊
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Progression</h3>
                <p className="text-gray-600 mb-4">2ème année sur 3</p>
                <Progress value={66} className="h-3 bg-white" />
                <p className="text-sm text-gray-500 mt-2">66% complété</p>
              </CardContent>
            </Card>

            {/* Moyenne */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Moyenne</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">16.5/20</p>
                <Badge className="bg-green-100 text-green-800">Excellent</Badge>
              </CardContent>
            </Card>

            {/* Spécialisation */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                  🧠
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Spécialisation</h3>
                <p className="text-gray-600 mb-2">Développement & IA</p>
                <Badge className="bg-purple-100 text-purple-800">En cours</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Projets académiques highlights */}
          <Card className="bg-gradient-to-r from-gray-900 to-blue-900 text-white border-0 shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-6 text-center">
                🏆 Projets Académiques Marquants
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-blue-300">Projet de 1ère année</h4>
                  <h5 className="text-lg font-medium">Système de Gestion Bibliothèque</h5>
                  <p className="text-gray-300 leading-relaxed">
                    Application desktop en Java avec interface graphique pour gérer les emprunts, 
                    retours et catalogues d'une bibliothèque universitaire.
                  </p>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-500 hover:bg-blue-600">Java</Badge>
                    <Badge className="bg-blue-500 hover:bg-blue-600">Swing</Badge>
                    <Badge className="bg-blue-500 hover:bg-blue-600">MySQL</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-green-300">Projet de 2ème année</h4>
                  <h5 className="text-lg font-medium">Plateforme E-learning</h5>
                  <p className="text-gray-300 leading-relaxed">
                    Plateforme web collaborative permettant aux étudiants et professeurs 
                    de partager des cours, exercices et suivre les progressions.
                  </p>
                  <div className="flex gap-2">
                    <Badge className="bg-green-500 hover:bg-green-600">React</Badge>
                    <Badge className="bg-green-500 hover:bg-green-600">Node.js</Badge>
                    <Badge className="bg-green-500 hover:bg-green-600">MongoDB</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                En route vers l'excellence ! 🚀
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Ma formation m'équipe des compétences théoriques et pratiques nécessaires 
                pour affronter les défis technologiques de demain.
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-indigo-100 text-indigo-800 px-4 py-2 text-sm">
                  🎓 Diplôme prévu: 2026
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm">
                  💡 Spécialisation: IA & Développement
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;