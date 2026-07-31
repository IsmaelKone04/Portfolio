import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
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
            ['languages', 'frameworks', 'systems', 'tools'].forEach(category => {
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

  // Une seule compétence ouverte à la fois, identifiée par « catégorie-index ».
  const [openSkill, setOpenSkill] = useState(null);

  const SkillCategory = ({ title, skills, category }) => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></span>
        {title}
      </h3>

      <p className="text-sm text-gray-500 -mt-4 mb-2">
        Cliquez sur une compétence pour voir ce que je sais concrètement en faire.
      </p>

      <div className="grid gap-4">
        {skills.map((skill, index) => {
          const key = `${category}-${index}`;
          const hasDetails = skill.details?.length > 0;
          const isOpen = openSkill === key;

          return (
            <Card
              key={index}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                {/* En-tête cliquable : dépliable au clic comme au clavier */}
                <button
                  type="button"
                  onClick={() => hasDetails && setOpenSkill(isOpen ? null : key)}
                  aria-expanded={hasDetails ? isOpen : undefined}
                  aria-controls={hasDetails ? `detail-${key}` : undefined}
                  disabled={!hasDetails}
                  className={`w-full text-left p-6 rounded-xl transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    hasDetails ? 'cursor-pointer hover:bg-blue-50/60' : 'cursor-default'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl shrink-0">{skill.icon}</span>
                      <span className="font-semibold text-gray-800 text-lg">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {skill.level}%
                      </span>
                      {hasDetails && (
                        <span
                          aria-hidden="true"
                          className={`text-blue-600 text-sm transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        >
                          ▾
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <Progress
                      value={animatedSkills[key] || 0}
                      className="h-3 bg-gray-200"
                    />
                    <div
                      className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${animatedSkills[key] || 0}%` }}
                    ></div>
                  </div>
                </button>

                {/* Détail : ce que je sais faire avec cette compétence */}
                {hasDetails && isOpen && (
                  <div
                    id={`detail-${key}`}
                    className="px-6 pb-6 pt-1 border-t border-blue-100 bg-blue-50/40 rounded-b-xl"
                  >
                    <p className="text-sm font-semibold text-blue-800 mt-4 mb-3">
                      Ce que je sais faire
                    </p>
                    <ul className="space-y-2">
                      {skill.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex gap-3 text-gray-700 leading-relaxed">
                          <span className="text-blue-500 mt-1 shrink-0" aria-hidden="true">▸</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
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
              Compétences acquises en formation et consolidées en production, entre
              exploitation système et développement
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Tabs pour organiser les compétences */}
          <Tabs defaultValue="languages" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 sm:grid-cols-4 gap-1 h-auto mb-12 bg-white shadow-lg rounded-xl p-1">
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
                🧱 Frameworks
              </TabsTrigger>
              <TabsTrigger
                value="systems"
                className="rounded-lg py-3 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              >
                🐳 Systèmes
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
                title="Langages & développement"
                skills={studentData.skills.languages}
                category="languages"
              />
            </TabsContent>

            <TabsContent value="frameworks" className="space-y-6">
              <SkillCategory
                title="Frameworks & bibliothèques"
                skills={studentData.skills.frameworks}
                category="frameworks"
              />
            </TabsContent>

            <TabsContent value="systems" className="space-y-6">
              <SkillCategory
                title="Systèmes, infrastructure & sécurité"
                skills={studentData.skills.systems}
                category="systems"
              />
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <SkillCategory
                title="Outils & méthodes"
                skills={studentData.skills.tools}
                category="tools"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Skills;