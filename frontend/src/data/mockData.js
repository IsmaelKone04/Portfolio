export const studentData = {
  personal: {
    name: "Koné Cheick Ismael Thierry",
    title: "Étudiant en Informatique Génie Logiciel",
    year: "3ème année",
    university: "Université de Technologie d'Abidjan",
    location: "Abidjan, Côte d'Ivoire",
    email: "Konethierry.uta@gmail.com",
    phone: "+225 01 43 48 64 21 /05 64 11 92 28",
    github: "https://github.com/ismaelkone04",
    linkedin: "https://linkedin.com/in/jean-baptiste-kouadio",
    portfolio: "https://ismaelkone.dev",
    bio: "Actuellement étudiant en 3e année de Licence en Informatique, spécialité Génie Logiciel, à l’Université de Technologie d’Abidjan, je suis à la recherche d’un stage ou d’un emploi temporaire me permettant de mettre en pratique les compétences théoriques acquises durant ma formation. Je m’apprête à intégrer la troisième année de Licence à la rentrée de septembre 2025. Mon parcours m’a permis d’acquérir des bases solides en algorithmique, programmation orientée objet, développement web, bases de données, analyse des systèmes et gestion de projets informatiques. Dynamique, curieux et motivé, je suis capable de m’adapter rapidement à un environnement professionnel. J’ai de notions de base dans plusieurs langages de programmation (Python, PHP, Java, HTML/CSS, JavaScript) ainsi que les outils de développement modernes. Je suis également intéressé par les tâches d’assistance technique, le développement d’applications, la maintenance logicielle et le support utilisateur. Je suis prêt à m’investir pleinement dans les missions que vous me confierez, avec sérieux et envie d’apprendre. Intégrer votre structure serait pour moi une opportunité précieuse de me professionnaliser et de contribuer à vos activités.",
    avatar: "/images/moi.JPG"
  },
  
  skills: {
    languages: [
      { name: "Python", level: 85, icon: "🐍" },
      { name: "JavaScript", level: 80, icon: "📝" },
      { name: "Java", level: 75, icon: "☕" },
      { name: "PHP", level: 70, icon: "⚡" },
      { name: "HTML/CSS", level: 90, icon: "🎨" },
      { name: "SQL", level: 75, icon: "🗄️" }
    ],
    frameworks: [
      { name: "React", level: 80, icon: "⚛️" },
      { name: "Next.js/Nest.js", level: 75, icon: "🟢" },
      { name: "Django/Flask", level: 70, icon: "🎯" },
      { name: "Laravel/angular", level: 65, icon: "🚀" },
      { name: "Flutter", level: 60, icon: "📱" }
    ],
    tools: [
      { name: "Git", level: 85, icon: "🔧" },
      { name: "Docker", level: 65, icon: "🐳" },
      { name: "VS Code", level: 95, icon: "💻" },
      { name: "MongoDB", level: 70, icon: "🍃" },
      { name: "Trello", level: 75, icon: "🔥" }
    ]
  },

  projects: [
    {
      id: 1,
      title: "EduConnect CI",
      description: "Plateforme éducative connectant étudiants et professeurs en Côte d'Ivoire avec chat en temps réel, partage de ressources et suivi des progrès.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxjb21wdXRlciUyMHNjaWVuY2V8ZW58MHx8fGJsdWV8MTc1MjMyMTkyM3ww&ixlib=rb-4.1.0&q=85",
      technologies: ["React", "Node.js", "MySQL", "Socket.io"],
      github: "https://github.com/ismaelkone04/atelier",
      demo: "https://educonnect-ci.netlify.app",
      status: "Terminé",
      category: "Web"
    },
    {
      id: 2,
      title: "AgriTech Mobile",
      description: "Application mobile aidant les agriculteurs ivoiriens à optimiser leurs cultures avec prédictions météo, conseils personnalisés et marketplace.",
      image: "https://images.unsplash.com/photo-1597007519573-0575fd4cc96b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50fGVufDB8fHxibHVlfDE3NTIzMjE5MzF8MA&ixlib=rb-4.1.0&q=85",
      technologies: ["Flutter", "Trello", "Python", "TensorFlow"],
      github: "https://github.com/Ismaelkone04/agritech-mobile",
      demo: null,
      status: "Terminé",
      category: "Mobile"
    },
    {
      id: 3,
      title: "Smart Parking Abidjan",
      description: "Système intelligent de gestion de parking utilisant l'IoT et l'IA pour optimiser l'utilisation des places de stationnement à Abidjan.",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxjb21wdXRlciUyMHNjaWVuY2V8ZW58MHx8fGJsdWV8MTc1MjMyMTkyM3ww&ixlib=rb-4.1.0&q=85",
      technologies: ["Python", "Arduino", "OpenCV", "FastAPI"],
      github: "https://github.com/Ismaelkone04/smart-parking",
      demo: "https://smart-parking-demo.vercel.app",
      status: "Terminé",
      category: "IoT"
    },
    {
      id: 4,
      title: "Traducteur Langues Locales",
      description: "Outil de traduction automatique pour les langues locales ivoiriennes (Baoulé, Dioula) utilisant des modèles d'IA personnalisés.",
      image: "https://images.unsplash.com/photo-1636979648933-6d06b1ce9ad7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjaWVuY2V8ZW58MHx8fGJsdWV8MTc1MjMyMTkyM3ww&ixlib=rb-4.1.0&q=85",
      technologies: ["Python", "NLP", "Transformers", "React"],
      github: "https://github.com/ismaelkone04/local-translator",
      demo: null,
      status: "En cours",
      category: "IA"
    }
  ],

  experience: [
    {
      id: 1,
      company: "Sintech sarl",
      position: "Stagiaire Développeur Web",
      duration: "Juin 2024 - Juillet 2025",
      location: "Abidjan, CI",
      description: "Développement d'une application web de gestion de clients avec React et Node.js. Collaboration avec une équipe de 5 développeurs sur des projets clients.",
      achievements: [
        "Développé 3 fonctionnalités majeures pour l'application client",
        "Réduit le temps de chargement de 40% par optimisation du code",
        "Formé 2 nouveaux stagiaires aux bonnes pratiques React"
      ],
      logo: "🏢"
    },
    {
      id: 2,
      company: "Ministère des mines et de la géologie",
      position: "Stagiaire Développeur",
      duration: "Aout 2025 - Présent",
      location: "Abidjan, CI",
      description: "Contribution au développement d'applications mobiles pour startups locales. Mentorat d'étudiants en programmation.",
      achievements: [
        "Développé 2 applications mobiles pour des startups",
        "Organisé 5 ateliers de formation en développement mobile",
        "Mentor de +15 étudiants débutants"
      ],
      logo: "🍊"
    }
  ],

  education: [
    {
      id: 1,
      institution: "Université de Technologie d'Abidjan",
      degree: "Licence en Informatique Génie Lociel",
      duration: "2023 - En cours",
      location: "Riviera Palmeraie, CI",
      description: "Spécialisation en développement logiciel et intelligence artificielle. Moyenne actuelle: 13.5/20",
      courses: [
        "Algorithmique et Structures de Données",
        "Programmation Orientée Objet",
        "Base de Données",
        "Développement Web",
        "Adminitration Système Réseaux",
        "Réseaux avancés",
        "Cyber sécurité",
        "Architecture des ordinateurs",
        "Intélligence Artificielle",
        "Génie Logiciel"
      ],
      logo: "🎓"
    },
    {
      id: 2,
      institution: "Collège Privé Jules Ronsard 2",
      degree: "Baccalauréat Série D",
      duration: "2022 - 2023",
      location: "vridi Cité, CI",
      description: "Baccalauréat scientifique avec mention Bien.",
      courses: [
        "Mathématiques Avancées",
        "Physique-Chimie", 
        "SVT",
        "Informatique"
      ],
      logo: "📚"
    }
  ],

  certifications: [
    {
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Décembre 2024",
      credentialId: "AWS-CP-2024-JBK",
      logo: "☁️"
    },
    {
      name: "Google AI Essentials",
      issuer: "Google",
      date: "Novembre 2024", 
      credentialId: "GOOG-AI-2024-456",
      logo: "🤖"
    },
    {
      name: "Meta React Developer",
      issuer: "Meta",
      date: "Octobre 2024",
      credentialId: "META-REACT-2024-789",
      logo: "⚛️"
    }
  ],

  interests: [
    "Intelligence Artificielle",
    "Développement Mobile",
    "Blockchain",
    "Cybersécurité",
    "Open Source",
    "Tech pour l'Afrique"
  ],

  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "Courant" },
    { name: "Koulango", level: "Natif" },
    { name: "Agni", level: "Intermédiaire" }
  ]
};

export default studentData;