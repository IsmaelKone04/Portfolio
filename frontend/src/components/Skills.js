import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { studentData } from '../data/mockData';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animer les barres de progression avec délai
          setTimeout(() => {
            const newAnimatedSkills = {};
            ['languages', 'frameworks', 'tools'].forEach(category => {
              studentData.skills[category].forEach((skill, index) => {
                setTimeout(() => {
                  setAnimatedSkills(prev => ({
                    ...prev,
                    [`${category}-${index}`]: skill.level
                  }));
                }, index * 200);
              });
            });
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const SkillCategory = ({ title, skills, category }) => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></span>
        {title}
      </h3>
      
      <div className="grid gap-4">
        {skills.map((skill, index) => (
          <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-semibold text-gray-800 text-lg">{skill.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {skill.level}%
                </span>
              </div>
              
              <div className="relative">
                <Progress 
                  value={animatedSkills[`${category}-${index}`] || 0} 
                  className="h-3 bg-gray-200"
                />
                <div 
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${animatedSkills[`${category}-${index}`] || 0}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      
      {/* Formes géométriques décoratives */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-indigo-200/30 rounded-full animate-bounce blur-2xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Titre de section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mes Compétences
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Technologies et outils que je maîtrise pour créer des solutions innovantes
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Tabs pour organiser les compétences */}
          <Tabs defaultValue="languages" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-white shadow-lg rounded-xl p-1">
              <TabsTrigger 
                value="languages" 
                className="rounded-lg py-3 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              >
                💻 Langages
              </TabsTrigger>
              <TabsTrigger 
                value="frameworks"
                className="rounded-lg py-3 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              >
                🚀 Frameworks
              </TabsTrigger>
              <TabsTrigger 
                value="tools"
                className="rounded-lg py-3 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              >
                🔧 Outils
              </TabsTrigger>
            </TabsList>

            <TabsContent value="languages" className="space-y-6">
              <SkillCategory 
                title="Langages de Programmation" 
                skills={studentData.skills.languages}
                category="languages"
              />
            </TabsContent>

            <TabsContent value="frameworks" className="space-y-6">
              <SkillCategory 
                title="Frameworks & Librairies" 
                skills={studentData.skills.frameworks}
                category="frameworks"
              />
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <SkillCategory 
                title="Outils & Technologies" 
                skills={studentData.skills.tools}
                category="tools"
              />
            </TabsContent>
          </Tabs>

          {/* Certifications */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Certifications
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {studentData.certifications.map((cert, index) => (
                <Card key={index} className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{cert.logo}</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{cert.name}</h4>
                    <p className="text-gray-600 mb-2">{cert.issuer}</p>
                    <p className="text-sm text-blue-600 font-medium">{cert.date}</p>
                    <div className="mt-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium inline-block">
                      Certifié ✓
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;