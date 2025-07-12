import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { studentData } from '../data/mockData';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
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

  const categories = ['all', 'Web', 'Mobile', 'IA', 'IoT'];
  
  const filteredProjects = filter === 'all' 
    ? studentData.projects 
    : studentData.projects.filter(project => project.category === filter);

  const ProjectCard = ({ project, index }) => (
    <Card className="group bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        
        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <Badge className={`${project.status === 'Terminé' 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-orange-500 hover:bg-orange-600'} text-white px-3 py-1`}>
            {project.status}
          </Badge>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 px-3 py-1">
            {project.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, techIndex) => (
            <Badge 
              key={techIndex}
              variant="outline" 
              className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors duration-200"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button 
            asChild
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              💻 Code
            </a>
          </Button>
          
          {project.demo && (
            <Button 
              asChild
              variant="outline" 
              className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                🚀 Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-30 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full opacity-30 animate-bounce blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mes Projets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez mes réalisations et expérimentations en développement logiciel, 
              mobile et intelligence artificielle
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? "default" : "outline"}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  filter === category 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                    : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                }`}
              >
                {category === 'all' ? 'Tous' : category}
                <span className="ml-2 text-sm opacity-70">
                  ({category === 'all' 
                    ? studentData.projects.length 
                    : studentData.projects.filter(p => p.category === category).length})
                </span>
              </Button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucun projet trouvé
              </h3>
              <p className="text-gray-500">
                Essayez de changer les filtres pour voir d'autres projets
              </p>
            </div>
          )}

          {/* Call to action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Interested in collaborating?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Je suis toujours ouvert à de nouveaux défis et collaborations. 
                N'hésitez pas à me contacter pour discuter de vos projets !
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Démarrer un projet
                <span className="ml-2">🚀</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;