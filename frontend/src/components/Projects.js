import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { studentData } from '../data/mockData';

// Les réalisations sont rattachées à leur contexte par `groupId` : soit un stage
// (`experience`), soit un groupe hors stage (`projectGroups`, ex. projets personnels).
// Elles sont présentées par groupe plutôt qu'en une seule grille indifférenciée.
const groups = [...studentData.experience, ...(studentData.projectGroups || [])]
  .map((exp) => ({
    exp,
    projects: studentData.projects.filter((p) => p.groupId === exp.id)
  }))
  .filter((group) => group.projects.length > 0);

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

  const visibleGroups =
    filter === 'all' ? groups : groups.filter((group) => group.exp.id === filter);

  const ProjectCard = ({ project }) => (
    <Card className="group h-full flex flex-col bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden">
      <div className="relative overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110"
          />
        ) : (
          // Pas de capture disponible : en-tête graphique portant l'emblème du chantier.
          <div className="w-full h-48 bg-gradient-to-br from-blue-500 via-indigo-600 to-indigo-800 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/25"></div>
            <span className="text-6xl drop-shadow-lg transition-transform duration-700 group-hover:scale-110">
              {project.emoji}
            </span>
          </div>
        )}

        {/* Statut */}
        <div className="absolute top-4 right-4">
          <Badge className={`${project.status === 'Terminé'
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-orange-500 hover:bg-orange-600'} text-white px-3 py-1`}>
            {project.status}
          </Badge>
        </div>

        {/* Catégorie */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 px-3 py-1">
            {project.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Résultat obtenu */}
        {project.impact && (
          <div className="mb-5 border-l-4 border-blue-500 bg-blue-50/70 rounded-r-lg px-4 py-3">
            <p className="text-sm font-semibold text-blue-800 mb-1">Résultat</p>
            <p className="text-sm text-gray-700 leading-relaxed">{project.impact}</p>
          </div>
        )}

        {/* Technologies */}
        {project.technologies.length > 0 && (
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
        )}

        {/* Liens — les chantiers internes n'ont ni dépôt public ni démonstration */}
        <div className="mt-auto">
          {project.github || project.demo || project.dockerhub ? (
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <Button
                  asChild
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    💻 Code
                  </a>
                </Button>
              )}

              {project.demo && (
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    🚀 Démo
                  </a>
                </Button>
              )}

              {/* Image publiée sur un registre : lien vérifiable vers le livrable */}
              {project.dockerhub && (
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <a href={project.dockerhub} target="_blank" rel="noopener noreferrer">
                    🐳 Image Docker
                  </a>
                </Button>
              )}
            </div>
          ) : (
            <p className="flex gap-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 leading-relaxed">
              <span aria-hidden="true" className="shrink-0">🔒</span>
              <span>
                Code non public — je ne peux pas le diffuser, mais je peux le présenter
                et le faire tourner devant vous lors d'un entretien.
              </span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // En-tête d'un groupe : rappelle le stage dont sont issues les réalisations qui suivent.
  const GroupHeader = ({ exp, count }) => (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="w-14 h-14 shrink-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
          {exp.logo}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            {exp.shortName || exp.company}
          </h3>
          <p className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
            {exp.position} • 📅 {exp.duration}
            {exp.current && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs px-2 py-0.5">
                En cours
              </Badge>
            )}
          </p>
        </div>
        <Badge variant="outline" className="ml-auto border-blue-200 bg-blue-50 text-blue-700 px-3 py-1">
          {count} réalisation{count > 1 ? 's' : ''}
        </Badge>
      </div>
      <div className="h-px bg-gradient-to-r from-blue-500 via-indigo-300 to-transparent"></div>
    </div>
  );

  // Personnes pouvant attester du travail présenté dans ce groupe.
  // Chaque coordonnée est optionnelle : on n'affiche que ce qui est renseigné,
  // pour ne jamais publier plus que ce que le référent a accepté.
  const GroupReferences = ({ groupId }) => {
    const refs = (studentData.references || []).filter((r) => r.groupId === groupId);

    if (refs.length === 0) {
      return studentData.referencesFallback ? (
        <p className="mt-8 text-sm text-gray-500 flex items-center gap-2">
          <span aria-hidden="true">✅</span>
          {studentData.referencesFallback}
        </p>
      ) : null;
    }

    return (
      <div className="mt-10 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6">
        <p className="text-sm font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <span aria-hidden="true">✅</span>
          {refs.length > 1 ? 'Personnes de référence' : 'Personne de référence'}
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {refs.map((ref, index) => (
            <div key={index} className="bg-white/70 rounded-xl p-4 border border-emerald-100">
              <p className="font-semibold text-gray-900">{ref.name}</p>
              {(ref.role || ref.company) && (
                <p className="text-sm text-gray-600 mt-0.5">
                  {[ref.role, ref.company].filter(Boolean).join(' — ')}
                </p>
              )}

              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm">
                {ref.email && (
                  <a
                    href={`mailto:${ref.email}`}
                    className="text-emerald-700 hover:text-emerald-900 underline underline-offset-2"
                  >
                    ✉️ {ref.email}
                  </a>
                )}
                {ref.phone && (
                  <a
                    href={`tel:${ref.phone.replace(/\s/g, '')}`}
                    className="text-emerald-700 hover:text-emerald-900 underline underline-offset-2"
                  >
                    📞 {ref.phone}
                  </a>
                )}
                {ref.linkedin && (
                  <a
                    href={ref.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-900 underline underline-offset-2"
                  >
                    💼 LinkedIn
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
              Mes Réalisations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les travaux que j'ai menés, regroupés par mission — de la migration d'une
              plateforme ITSM multi-pays au développement d'outils métier
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Filtre par mission */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'default' : 'outline'}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'border-blue-500 text-blue-600 hover:bg-blue-50'
              }`}
            >
              Toutes
              <span className="ml-2 text-sm opacity-70">({studentData.projects.length})</span>
            </Button>

            {groups.map(({ exp, projects }) => (
              <Button
                key={exp.id}
                onClick={() => setFilter(exp.id)}
                variant={filter === exp.id ? 'default' : 'outline'}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  filter === exp.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                }`}
              >
                {exp.shortName || exp.company}
                <span className="ml-2 text-sm opacity-70">({projects.length})</span>
              </Button>
            ))}
          </div>

          {/* Groupes de réalisations */}
          <div className="space-y-20">
            {visibleGroups.map(({ exp, projects }) => (
              <div key={exp.id}>
                <GroupHeader exp={exp} count={projects.length} />

                {/* Chiffres clés propres à ce stage */}
                {exp.stats?.length > 0 && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {exp.stats.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-3xl mb-2" aria-hidden="true">{item.icon}</div>
                        <div className="text-3xl font-bold text-blue-600 mb-1">{item.value}</div>
                        <div className="text-sm text-gray-600 font-medium leading-snug">{item.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`transform transition-all duration-700 ${
                        isVisible
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-20 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>

                <GroupReferences groupId={exp.id} />
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Envie d'en savoir plus ?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Je détaille volontiers l'architecture, les choix techniques et les impasses
                rencontrées sur chacun de ces chantiers. N'hésitez pas à me contacter.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Me contacter
                <span className="ml-2">📧</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
