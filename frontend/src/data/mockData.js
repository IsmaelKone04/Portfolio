export const studentData = {
  personal: {
    name: "Koné Cheick Ismael Thierry",
    title: "Génie Logiciel · Administration ITSM & Développement",
    year: "3ème année",
    university: "Université de Technologie d'Abidjan",
    location: "Abidjan, Côte d'Ivoire",
    email: "Konethierry.uta@gmail.com",
    // Les deux numéros sont affichés dans la section Contact.
    phones: ["+225 07 04 59 66 12", "+225 01 43 48 64 21"],
    github: "https://github.com/ismaelkone04",
    linkedin: "https://www.linkedin.com/in/cheick-ismaël-koné-772a77333",
    avatar: "/images/moi.JPG",
    tagline: "Entre exploitation système et développement : je construis des plateformes qui tiennent en production.",
    bio: "Étudiant en 3ᵉ année de Licence Informatique — spécialité Génie Logiciel — à l'Université de Technologie d'Abidjan. Recruté comme stagiaire technicien support chez YeshiGroup (DSI), j'y ai conduit des chantiers qui ont largement dépassé le support N1 : migration de la plateforme ITSM GLPI 10 vers 11 pour un groupe présent dans 14 pays, conception d'un socle Docker Compose (GLPI, MariaDB, reverse-proxy nginx, HTTPS), développement de 4 plugins métier en PHP, mise en place d'une authentification unique Microsoft via Keycloak, et remise en service d'un helpdesk de production après une cyberattaque. Ma méthode : tester plutôt que supposer, privilégier les mécanismes natifs et les développements réversibles, et avancer par étapes validées. Je cherche aujourd'hui à poursuivre sur cette double compétence système et développement."
  },

  // Niveaux calibrés sur les dépôts réellement livrés (voir `projects`), pas sur des
  // intentions : un langage n'est haut que s'il porte au moins un projet mis en production
  // ou livré à un tiers.
  //
  // `details` : ce que je sais concrètement faire avec cette compétence. Affiché au clic
  // sur la carte (voir Skills.js). Chaque ligne doit renvoyer à un travail réel — si une
  // compétence n'a pas encore servi, mieux vaut peu de lignes que des lignes creuses.
  skills: {
    languages: [
      {
        name: "PHP 8 (Laravel, plugins GLPI)",
        level: 78,
        icon: "⚡",
        details: [
          "Écrire un plugin GLPI complet : hooks d'installation et de désinstallation, tables dédiées, greffe sur le cycle de vie d'un ticket",
          "Développer une application Laravel de bout en bout — modèles Eloquent, migrations, policies, back-office Filament",
          "Importer des classeurs Excel volumineux et les convertir en enregistrements validés",
          "Travailler dans une base de code PHP existante sans la casser, en privilégiant les points d'extension prévus"
        ]
      },
      {
        name: "Python 3 (Django, pandas)",
        level: 75,
        icon: "🐍",
        details: [
          "Modéliser un domaine métier réel et le faire évoluer par migrations successives",
          "Écrire des scripts d'import pandas tolérants aux données sales : normalisation, détection de doublons, mise en quarantaine des lignes douteuses",
          "Produire des exports Excel, CSV et PDF depuis les données de l'application",
          "Couvrir le code par des tests pytest et mesurer la couverture obtenue"
        ]
      },
      {
        name: "Java 21 (Spring Boot)",
        level: 75,
        icon: "☕",
        details: [
          "Structurer un projet Maven multi-module dont le cœur métier ne dépend d'aucun framework",
          "Utiliser les apports récents du langage : records, sealed types, pattern matching, text blocks",
          "Mettre en place la validation, la gestion centralisée des erreurs et le mapping DTO via MapStruct",
          "Écrire des tests d'intégration sur une vraie base de données grâce à Testcontainers"
        ]
      },
      {
        name: "TypeScript",
        level: 75,
        icon: "🔷",
        details: [
          "Typer un domaine applicatif complet plutôt que de saupoudrer des `any`",
          "Valider les données entrantes à l'exécution avec Zod, et en déduire les types",
          "Construire des composants React réutilisables et correctement typés",
          "Partager les mêmes types entre le client et le serveur d'une application mobile"
        ]
      },
      {
        name: "SQL (PostgreSQL, MariaDB)",
        level: 75,
        icon: "🗄️",
        details: [
          "Concevoir un schéma relationnel normalisé, avec index et contraintes d'intégrité",
          "Écrire des requêtes de jointure et d'agrégation pour alimenter des rapports statistiques",
          "Gérer l'évolution du schéma par migrations versionnées (Flyway, migrations Django)",
          "Sauvegarder et restaurer une base de production, y compris après incident",
          "Manipuler des données géographiques avec PostGIS"
        ]
      },
      {
        name: "JavaScript (DOM, AJAX)",
        level: 72,
        icon: "📜",
        details: [
          "Rendre une interface dynamique sans framework : manipulation du DOM, appels fetch, gestion des erreurs réseau",
          "Capturer un enregistrement audio dans le navigateur et l'envoyer à une API",
          "Implémenter un algorithme de bas niveau en JavaScript pur quand aucune bibliothèque n'est disponible (SHA-1 pour la poignée de main WebSocket)"
        ]
      },
      {
        name: "XML (layouts Android, configuration)",
        level: 65,
        icon: "📐",
        details: [
          "Décrire une interface Android en XML : layouts, contraintes, ressources et thèmes",
          "Lire et modifier des fichiers de configuration XML (manifestes, descripteurs d'application)"
        ]
      },
      {
        name: "HTML / CSS",
        level: 80,
        icon: "🎨",
        details: [
          "Écrire un balisage sémantique et accessible plutôt qu'un empilement de div",
          "Construire des mises en page responsive en Flexbox et Grid",
          "Travailler avec des moteurs de templates (Django, Blade, Twig) et l'héritage de gabarits"
        ]
      }
    ],
    frameworks: [
      {
        name: "Django & Django REST Framework",
        level: 75,
        icon: "🎯",
        details: [
          "Bâtir une application de gestion complète : modèles, vues, formulaires, permissions par rôle",
          "Exposer une API REST documentée en OpenAPI, avec pagination et filtres",
          "Personnaliser l'interface d'administration pour la rendre utilisable par des non-informaticiens",
          "Mettre en place un journal d'audit et la suppression logique avec restauration"
        ]
      },
      {
        name: "React / Next.js",
        level: 75,
        icon: "⚛️",
        details: [
          "Structurer une application en composants, avec état local et état partagé",
          "Utiliser l'App Router de Next.js : routes imbriquées, layouts, rendu serveur",
          "Mettre en place l'authentification et la protection des routes avec NextAuth",
          "Présenter des données sous forme de tableaux triables et filtrables et de graphiques"
        ]
      },
      {
        name: "Spring Boot 3",
        level: 72,
        icon: "🍃",
        details: [
          "Découper une application selon une architecture hexagonale et faire vérifier les règles de dépendance automatiquement à chaque build",
          "Sécuriser une API avec Spring Security : jetons JWT, rotation du refresh token, contrôle d'accès par rôle",
          "Cloisonner les données par entité pour qu'aucune requête ne franchisse la frontière d'une filiale",
          "Publier des événements temps réel en Server-Sent Events et des webhooks signés"
        ]
      },
      {
        name: "Laravel 12",
        level: 70,
        icon: "🔺",
        details: [
          "Modéliser un domaine avec Eloquent : relations, accesseurs, observateurs",
          "Gérer les rôles et permissions et générer un back-office d'administration",
          "Importer et exporter des fichiers Excel, produire des PDF",
          "Relier un back-end Laravel à un front Vue via Inertia, sans écrire d'API séparée"
        ]
      },
      {
        name: "Tailwind CSS",
        level: 80,
        icon: "🎨",
        details: [
          "Composer une interface cohérente à partir d'un système de design, sans feuille de style parallèle",
          "Décliner un rendu responsive du mobile au grand écran",
          "Assembler des composants accessibles à partir de primitives Radix / shadcn-ui"
        ]
      },
      {
        name: "React Native / Expo (Android & iOS)",
        level: 65,
        icon: "📱",
        details: [
          "Développer une application mobile unique fonctionnant sur Android et iOS",
          "Utiliser les capacités de l'appareil : caméra, lecture de QR code, réseau local, stockage",
          "Faire communiquer plusieurs téléphones entre eux en Wi-Fi, sans serveur distant ni Internet",
          "Animer l'interface de façon fluide avec Reanimated"
        ]
      },
      {
        name: "Flutter / Dart (Android & iOS)",
        level: 55,
        icon: "🐦",
        details: [
          "Construire une interface à partir de l'arbre de widgets et gérer l'état d'un écran",
          "Produire une application unique compilée pour Android et pour iOS",
          "Consommer une API REST et gérer les états de chargement et d'erreur"
        ]
      },
      {
        name: "Vue 3 / Inertia.js",
        level: 60,
        icon: "💚",
        details: [
          "Écrire des composants avec la Composition API et le typage TypeScript",
          "Construire des pages pilotées par un back-end Laravel via Inertia",
          "Gérer les formulaires, la validation et le retour des erreurs serveur"
        ]
      }
    ],
    systems: [
      {
        name: "GLPI 10 / 11 (administration ITSM)",
        level: 85,
        icon: "🎫",
        details: [
          "Conduire une migration de version majeure sur une plateforme en production, sauvegarde et retour arrière prévus",
          "Structurer le référentiel : entités, lieux, profils, habilitations, sources des demandes",
          "Concevoir l'arborescence des catégories et le formulaire de self-service vus par les utilisateurs",
          "Développer des plugins métier plutôt que de modifier le cœur du produit",
          "Intégrer et arbitrer des plugins tiers, en évaluant leur compatibilité avec la montée de version"
        ]
      },
      {
        name: "Docker & Docker Compose",
        level: 80,
        icon: "🐳",
        details: [
          "Décrire une plateforme multi-services en Compose : application, base de données, reverse-proxy, réseaux isolés",
          "Écrire un Dockerfile et publier l'image sur un registre public",
          "Gérer la persistance par volumes et distinguer ce qui doit survivre à la recréation d'un conteneur",
          "Reconstruire un environnement complet à partir de zéro après incident",
          "Sortir la configuration sensible des images et la passer par variables d'environnement"
        ]
      },
      {
        name: "Sécurité applicative (JWT, RBAC, chiffrement)",
        level: 72,
        icon: "🛡️",
        details: [
          "Mettre en place une authentification par jeton court avec rotation du jeton de rafraîchissement",
          "Définir une matrice de droits par rôle et la faire appliquer côté serveur, jamais seulement côté interface",
          "Chiffrer les données sensibles au repos (AES-256-GCM) et journaliser les accès",
          "Valider les fichiers déposés par leur signature binaire plutôt que par leur extension",
          "Signer les webhooks sortants en HMAC-SHA256 pour que le destinataire puisse en vérifier l'origine"
        ]
      },
      {
        name: "nginx (reverse-proxy, TLS)",
        level: 70,
        icon: "🔀",
        details: [
          "Placer un reverse-proxy devant une application et router selon le nom de domaine",
          "Installer un certificat et forcer la redirection HTTPS",
          "Servir des fichiers statiques et ajuster les limites de taille de dépôt",
          "Lire les journaux d'accès et d'erreur pour localiser une panne"
        ]
      },
      {
        name: "Linux & SSH",
        level: 70,
        icon: "🐧",
        details: [
          "Me connecter à un serveur distant en SSH et y travailler en ligne de commande",
          "Gérer les droits sur les fichiers, les services et les processus",
          "Planifier des tâches récurrentes, notamment des sauvegardes automatiques",
          "Diagnostiquer une panne en lisant les journaux système"
        ]
      },
      {
        name: "SMTP / notifications",
        level: 70,
        icon: "📧",
        details: [
          "Configurer l'envoi de courriels d'une application et le tester de bout en bout",
          "Rétablir une chaîne de notification interrompue en remontant de l'application au serveur de messagerie",
          "Adapter les modèles de messages et les destinataires selon l'événement"
        ]
      },
      {
        name: "SSO OpenID Connect (Keycloak)",
        level: 65,
        icon: "🔐",
        details: [
          "Installer Keycloak et le placer en coupure devant une application avec oauth2-proxy",
          "Configurer le courtage d'identité vers un fournisseur externe (Microsoft Entra ID)",
          "Comprendre le déroulé d'un échange OpenID Connect et le déboguer quand il échoue",
          "Faire correspondre les attributs du fournisseur d'identité aux profils de l'application"
        ]
      }
    ],
    tools: [
      {
        name: "Conception d'API REST & documentation OpenAPI",
        level: 78,
        icon: "🔗",
        details: [
          "Définir un contrat d'interface avant l'implémentation : ressources, codes d'erreur, pagination",
          "Publier une documentation navigable et l'entretenir avec le code",
          "Livrer à une équipe front un guide d'intégration lui permettant de travailler sans moi",
          "Faire évoluer une API sans casser les clients existants"
        ]
      },
      {
        name: "Tests automatisés (pytest, JUnit, Testcontainers)",
        level: 70,
        icon: "🧪",
        details: [
          "Écrire des tests unitaires sur la logique métier et mesurer la couverture",
          "Lancer les tests d'intégration sur une vraie base de données jetable plutôt que sur des doublures",
          "Faire échouer le build quand une règle d'architecture est violée"
        ]
      },
      {
        name: "Android Studio",
        level: 60,
        icon: "🤖",
        details: [
          "Créer et configurer un projet Android, gérer les dépendances Gradle",
          "Construire les écrans en XML et les relier au code",
          "Exécuter et déboguer sur émulateur comme sur appareil réel",
          "Générer un APK installable"
        ]
      },
      {
        name: "Intégration continue (GitHub Actions)",
        level: 65,
        icon: "🔁",
        details: [
          "Déclencher build et tests à chaque push et à chaque pull request",
          "Construire une image Docker dans le pipeline et la publier",
          "Bloquer la fusion tant que la chaîne n'est pas verte"
        ]
      },
      {
        name: "Diagnostic & dépannage informatique",
        level: 80,
        icon: "🛠️",
        details: [
          "Isoler une panne méthodiquement plutôt que de changer des pièces au hasard",
          "Distinguer une défaillance matérielle d'un problème logiciel avant d'intervenir",
          "Remettre un poste en service et expliquer à l'utilisateur ce qui s'est passé"
        ]
      },
      {
        name: "Débogage par analyse de logs",
        level: 80,
        icon: "🔍",
        details: [
          "Remonter d'un symptôme visible à sa cause en croisant les journaux de plusieurs services",
          "Reproduire un incident dans un environnement de test avant de corriger quoi que ce soit",
          "Confirmer une hypothèse par un test réel, jamais par intuition"
        ]
      },
      {
        name: "Documentation technique",
        level: 80,
        icon: "📝",
        details: [
          "Rédiger un guide d'installation qu'un tiers peut suivre sans m'appeler",
          "Écrire un manuel utilisateur destiné à des non-informaticiens",
          "Documenter les décisions d'architecture et les raisons des choix retenus"
        ]
      },
      {
        name: "Maintenance matérielle & logicielle",
        level: 75,
        icon: "🖥️",
        details: [
          "Démonter, remplacer et remonter les composants d'un poste de travail",
          "Installer et réinstaller un système d'exploitation et ses pilotes",
          "Assurer l'entretien courant d'un parc informatique"
        ]
      },
      {
        name: "Sauvegarde & restauration",
        level: 75,
        icon: "💾",
        details: [
          "Automatiser une sauvegarde périodique de base de données et de fichiers",
          "Restaurer un service de production à partir de ses sauvegardes après un sinistre",
          "Vérifier qu'une sauvegarde est réellement exploitable, plutôt que supposer qu'elle l'est"
        ]
      },
      {
        name: "Migration de données",
        level: 70,
        icon: "🔄",
        details: [
          "Reprendre un historique tenu dans un tableur et le porter vers une base relationnelle",
          "Nettoyer, dédupliquer et faire correspondre les référentiels avant reprise",
          "Simuler l'opération et présenter un rapport avant de l'appliquer réellement"
        ]
      },
      {
        name: "Git",
        level: 75,
        icon: "🔧",
        details: [
          "Travailler par branches et intégrer proprement, y compris en résolvant des conflits",
          "Écrire un historique lisible plutôt qu'une suite de « update »",
          "Retrouver et restaurer du contenu supprimé grâce à l'historique",
          "Tenir la configuration sensible hors du dépôt"
        ]
      },
      {
        name: "VS Code",
        level: 90,
        icon: "💻",
        details: [
          "Configurer un environnement de travail par langage : formatage, analyse statique, débogueur",
          "Utiliser le débogueur pas à pas plutôt que des affichages temporaires",
          "Travailler à distance sur un serveur ou dans un conteneur"
        ]
      }
    ]
  },

  // Groupes de réalisations qui ne proviennent pas d'un stage.
  // Ils complètent `experience` dans la section Réalisations (voir Projects.js).
  projectGroups: [
    {
      id: "freelance",
      shortName: "Missions freelance",
      company: "Missions freelance",
      position: "Développeur back-end indépendant",
      duration: "2026",
      logo: "🤝"
    },
    {
      id: "perso",
      shortName: "Projets personnels",
      company: "Projets personnels",
      position: "Initiative personnelle",
      duration: "2026",
      logo: "🚀"
    },
    {
      id: "academique",
      shortName: "Projets académiques",
      company: "Projets académiques",
      position: "Université de Technologie d'Abidjan",
      duration: "2026",
      logo: "🎓"
    }
  ],

  // Chaque réalisation est rattachée à son groupe par `groupId` :
  // un identifiant d'`experience` (stage) ou de `projectGroups`.
  // github/demo à null : code interne à l'entreprise, non publiable.
  // image à null tant que les captures réelles ne sont pas disponibles.
  projects: [
    {
      id: 1,
      groupId: 1,
      title: "Moteur de routage automatique des tickets",
      emoji: "🧠",
      category: "Développement",
      status: "Terminé",
      featured: true,
      description:
        "Plugin PHP branché sur les points d'extension de GLPI, qui attribue chaque ticket au bon technicien selon trois critères combinés : compétence sur le sujet, présence réelle et charge de travail courante. GLPI n'ayant aucune détection de déconnexion, j'ai mis en place un « battement de cœur » avec seuil de fraîcheur pour exclure du routage un technicien absent, même après une déconnexion brutale.",
      impact:
        "Attribution automatique fiable, validée en conditions réelles — chaque hypothèse de bug confirmée par des tests authentifiés, jamais par supposition.",
      technologies: ["PHP", "Hooks GLPI", "SQL", "Heartbeat / présence", "Analyse de logs"],
      image: null,
      github: null,
      demo: null
    },
    {
      id: 2,
      groupId: 1,
      title: "Migration & conteneurisation GLPI 10 → 11",
      emoji: "🐳",
      category: "Infrastructure",
      status: "Terminé",
      featured: true,
      description:
        "Conception d'un socle Docker Compose à trois services : application GLPI 11, base MariaDB non exposée au réseau, et reverse-proxy nginx assurant le HTTPS par certificat. Reprise complète du paramétrage du groupe (entités par pays, profils, catégories) et diagnostic d'un sous-dimensionnement mémoire de la base.",
      impact:
        "Une plateforme moderne, isolée et reproductible pour un groupe présent dans 14 pays — socle de tous les développements suivants.",
      technologies: ["Docker Compose", "GLPI 11", "MariaDB", "nginx", "TLS"],
      image: null,
      github: null,
      demo: null
    },
    {
      id: 3,
      groupId: 1,
      title: "Remise en service d'un helpdesk après cyberattaque",
      emoji: "🛡️",
      category: "Sécurité",
      status: "Terminé",
      featured: true,
      description:
        "Le serveur du helpdesk de production a été rendu totalement inaccessible par une attaque, mettant à l'arrêt le support de toutes les filiales. J'ai reconstruit un environnement sain sans repartir de l'infrastructure compromise : réinstallation à l'identique de la version, ré-application des personnalisations, restauration de la base et des fichiers depuis sauvegarde, remise en ligne derrière un accès HTTPS.",
      impact:
        "Service rétabli pour l'ensemble des filiales, avec une sauvegarde automatique hebdomadaire instaurée pour ne plus subir l'incident sans filet.",
      technologies: ["Docker", "Linux", "nginx / HTTPS", "Sauvegarde & restauration", "Gestion d'incident"],
      image: null,
      github: null,
      demo: null
    },
    {
      id: 4,
      groupId: 1,
      title: "Authentification unique Microsoft (SSO)",
      emoji: "🔐",
      category: "Sécurité",
      status: "Validé en laboratoire",
      featured: false,
      description:
        "GLPI n'offre aucun SSO natif. J'ai monté une chaîne complète : Keycloak comme fournisseur d'identité en courtage vers Microsoft Entra ID, oauth2-proxy devant nginx pour porter le flux OpenID Connect, et GLPI configuré pour recevoir l'identité vérifiée par en-tête HTTP. Plusieurs pièges de configuration diagnostiqués et résolus (encodage du secret de session, nom d'hôte public du fournisseur, propagation des en-têtes).",
      impact:
        "Parcours de connexion validé de bout en bout en laboratoire ; la bascule vers l'instance d'entreprise a été volontairement différée.",
      technologies: ["Keycloak", "oauth2-proxy", "OpenID Connect", "Microsoft Entra ID", "nginx"],
      image: null,
      github: null,
      demo: null
    },
    {
      id: 5,
      groupId: 1,
      title: "Catégorisation guidée du self-service",
      emoji: "🎯",
      category: "Développement",
      status: "Terminé",
      featured: false,
      description:
        "Quand un utilisateur créait lui-même sa demande, aucune catégorie n'était choisie et le routage automatique ne se déclenchait donc jamais. J'ai transformé le champ « Titre » du formulaire en un menu guidé « Quel est votre problème ? » listant environ 44 problèmes récurrents, chacun adossé à une catégorie via une table de correspondance unique servant de source de vérité partagée.",
      impact:
        "Les demandes des utilisateurs finaux sont désormais catégorisées puis attribuées automatiquement, de bout en bout — les cas « Autre » restant traités par un technicien.",
      technologies: ["PHP", "Formulaires GLPI", "Conception de mapping", "Réutilisation de l'existant"],
      image: null,
      github: null,
      demo: null
    },
    {
      id: 6,
      groupId: 1,
      title: "Refonte visuelle aux couleurs du groupe",
      emoji: "🎨",
      category: "Développement",
      status: "Terminé",
      featured: false,
      description:
        "Étude comparative de 5 approches (de la CSS pure aux micro-frontends React), chiffrées en effort et en risque, avant de retenir la plus pérenne. Réalisation à partir de maquettes validées, sans jamais toucher au cœur de GLPI : deux plugins internes injectent styles et scripts par les points d'extension — l'un pour la page de connexion, l'autre pour toute l'interface authentifiée — complétés d'un thème de connexion Keycloak assorti.",
      impact:
        "Une interface aux couleurs du groupe, entièrement réversible et qui survit aux mises à jour de GLPI.",
      technologies: ["HTML / CSS", "JavaScript (MutationObserver)", "Plugins GLPI", "Thème Keycloak", "UI/UX"],
      image: null,
      github: null,
      demo: null
    },
    {
      id: 7,
      groupId: 1,
      title: "Suivi de présence des techniciens (pointage)",
      emoji: "⏱️",
      category: "Développement",
      status: "Terminé",
      featured: false,
      description:
        "Plugin interne capturant l'arrivée, l'activité et le départ selon une logique hybride (déconnexion explicite → dernière activité → plafond horaire), avec deux tâches planifiées pour clôturer les sessions ouvertes et agréger les données quotidiennes. Restitution par onglet sur la fiche, page de reporting et export CSV, le tout réservé aux responsables.",
      impact:
        "Bilans de présence jour / semaine / mois fiables, assortis d'un indicateur de qualité de la donnée distinguant présence certaine et présence estimée.",
      technologies: ["PHP", "CronTask", "SQL / agrégations", "Export CSV", "Contrôle d'accès"],
      image: null,
      github: null,
      demo: null
    },
    {
      id: 8,
      groupId: 1,
      title: "Fiabilisation du référentiel et de l'exploitation",
      emoji: "🗂️",
      category: "ITSM",
      status: "Terminé",
      featured: false,
      description:
        "Arborescence des lieux entièrement réorganisée (Pays → Entreprise → Ville → site) via l'API native, en conservant les identifiants pour ne casser aucun rattachement de ticket ou d'actif. Profil « Technicien » débloqué de l'interface simplifiée vers l'interface centrale, champ « source de la demande » réparé, et chaîne de notifications e-mail rétablie en SMTP après diagnostic par les logs (aucun agent d'envoi local dans le conteneur).",
      impact:
        "Un référentiel propre, un paramétrage conforme aux rôles réels, et des notifications vérifiées de bout en bout sur une demande réelle.",
      technologies: ["GLPI (API native)", "SQL", "SMTP", "Modélisation de données", "Audit"],
      image: null,
      github: null,
      demo: null
    },

    // Ministère des Mines et de la Géologie — contenu établi depuis le dépôt DGH_V1
    // (README SIGFOR + 256 fichiers, 93 commits).
    {
      id: 9,
      groupId: 2,
      title: "SIGFOR — Système d'information de gestion des forages pétroliers",
      emoji: "🛢️",
      category: "Développement",
      status: "Terminé",
      featured: true,
      description:
        "Application web de gestion des quelque 300 puits pétroliers forés en Côte d'Ivoire depuis 1957. Le référentiel national vivait dans un classeur Excel : je l'ai porté sur une base PostgreSQL/PostGIS pilotée par une interface web complète — recherche multicritère, exports Excel/CSV/PDF, rapports statistiques et financiers, API REST documentée et journal d'audit retraçant chaque modification.",
      impact:
        "Le fonds documentaire est passé d'un tableur à un système d'information : trois profils d'accès (administrateur, gestionnaire, lecteur), traçabilité complète des modifications, et un pipeline d'import Excel récurrent qui simule l'opération avant de l'appliquer et met en quarantaine les lignes douteuses pour arbitrage, plutôt que de corrompre le référentiel.",
      technologies: [
        "Python 3.12",
        "Django 5",
        "PostgreSQL 16",
        "PostGIS",
        "Django REST Framework",
        "OpenAPI / Swagger",
        "HTMX",
        "Bootstrap 5",
        "pandas",
        "pytest"
      ],
      image: null,
      github: "https://github.com/IsmaelKone04/DGH_V1",
      demo: null
    },

    // Première itération du même cahier des charges (dépôt `Stage`, Laravel/Vue).
    // Ismaël a construit le système en 3 versions successives ; la 3ᵉ reste à identifier.
    {
      id: 14,
      groupId: 2,
      title: "SIGFOR — première itération en Laravel/Vue",
      emoji: "🧪",
      category: "Développement",
      status: "Terminé",
      featured: false,
      description:
        "Première approche du même cahier des charges, bâtie sur Laravel et Vue : modélisation du domaine (puits, forages, blocs, opérateurs, appareils de forage), importateurs Excel dédiés à chaque type de fichier reçu, gestion des rôles et back-office d'administration généré.",
      impact:
        "Cette version a servi de banc d'essai : elle a permis d'arrêter le modèle de données et les règles d'import avant la réécriture en Django. Avoir traité le même problème avec deux piles distinctes m'a appris à distinguer ce qui relève du métier de ce qui relève du framework.",
      technologies: [
        "PHP 8.2",
        "Laravel 12",
        "Vue 3",
        "Inertia.js",
        "Filament",
        "Spatie Permission",
        "Maatwebsite Excel",
        "Tailwind CSS",
        "TypeScript",
        "Vite"
      ],
      image: null,
      github: "https://github.com/IsmaelKone04/Stage",
      demo: null
    },

    // Missions freelance — le client est volontairement anonymisé (accord d'Ismaël).
    // Ne pas réintroduire le nom du groupe ni celui de ses filiales.
    {
      id: 10,
      groupId: "freelance",
      title: "Plateforme RH multi-filiales",
      emoji: "👥",
      category: "Développement",
      status: "Terminé",
      featured: true,
      description:
        "API de gestion des ressources humaines pour un groupe holding et ses cinq filiales : personnel, congés et absences, recrutement, évaluations, formations, pointage, paie variable et santé au travail — 21 modules fonctionnels. Chaque requête est cloisonnée par filiale, de sorte qu'aucune donnée ne franchit la frontière d'une entité.",
      impact:
        "Architecture hexagonale sur cinq modules Maven, dont le cœur métier ne dépend d'aucun framework ; les règles de dépendance sont vérifiées automatiquement à chaque build par ArchUnit. Sécurité : jetons courts avec rotation du refresh token, contrôle d'accès à sept rôles, chiffrement AES-256-GCM des coordonnées bancaires et journal d'audit avant/après.",
      technologies: [
        "Java 21",
        "Spring Boot 3.4",
        "Spring Security",
        "PostgreSQL 15",
        "Redis",
        "Maven multi-module",
        "Testcontainers",
        "ArchUnit",
        "Docker",
        "GitHub Actions"
      ],
      image: null,
      github: null,
      demo: null
    },
    {
      id: 11,
      groupId: "freelance",
      title: "API de gestion de chantiers BTP",
      emoji: "🏗️",
      category: "Développement",
      status: "Terminé",
      featured: false,
      description:
        "Back-end couvrant le cycle de vie complet d'un chantier pour la division construction du même groupe : projets, documents versionnés, devis et facturation, détail quantitatif estimatif, planning, matériaux, contrôles qualité, logistique et tableau de bord. Conçu en API-first, consommé par une équipe front-end distincte.",
      impact:
        "Le contrat d'interface a été livré comme un produit à part entière — endpoints, schémas, codes d'erreur, matrice des droits et guide d'intégration documentés — pour que l'équipe front travaille sans dépendre de moi. Notifications temps réel en SSE, webhooks signés HMAC-SHA256, et validation des fichiers par signature binaire plutôt que par extension.",
      technologies: [
        "Java 21",
        "Spring Boot 3.4",
        "PostgreSQL 15",
        "Flyway",
        "MapStruct",
        "OpenAPI / Swagger",
        "Server-Sent Events",
        "Docker",
        "Testcontainers"
      ],
      image: null,
      github: null,
      demo: null
    },

    // Travail mené en collaboration dans l'équipe du même client : dépôts tenus par un
    // autre développeur, Ismaël y a contribué en binôme. On ne revendique donc pas la
    // paternité du dépôt — le libellé « en collaboration » est à conserver tel quel.
    {
      id: 18,
      groupId: "freelance",
      title: "Microservices comptabilité-trésorerie et agro (en collaboration)",
      emoji: "🧩",
      category: "Développement",
      status: "Terminé",
      featured: false,
      description:
        "Contribution, en binôme avec un autre développeur de l'équipe, à deux microservices Spring Boot du même système d'information : l'un dédié à la comptabilité et à la trésorerie, l'autre au métier agro-industriel d'une filiale. Travail sur le découpage du domaine, les entités et les API exposées aux autres services.",
      impact:
        "C'est le contexte où j'ai travaillé sur une base de code que je ne contrôlais pas seul : se caler sur les conventions déjà en place, discuter les frontières entre services et intégrer sa partie sans casser celle des autres. Une compétence différente de celle qu'on développe sur ses propres dépôts.",
      technologies: ["Java", "Spring Boot", "Architecture microservices", "Maven", "Docker", "Git en équipe"],
      image: null,
      github: null,
      demo: null
    },

    // Projet personnel — dépôt public : github.com/IsmaelKone04/FraudShield-v2
    // Contenu établi à partir du code source. Le back-end FastAPI n'a jamais été livré :
    // l'application tourne sur des jeux de données simulés. Ne rien affirmer de plus.
    {
      id: 12,
      groupId: "perso",
      title: "FraudShield — détection de fraude à l'assurance santé",
      emoji: "🛡️",
      category: "Développement",
      status: "Prototype",
      featured: true,
      description:
        "Projet mené à deux en vue d'un concours : j'ai pris en charge l'intégralité du front-end, mon binôme le back-end. Interface de supervision destinée aux analystes d'un organisme d'assurance santé, en six écrans — tableau de bord, alertes, analyses, investigations, rapports et paramètres — avec un contrôle d'accès à trois rôles (administrateur, superviseur, analyste).",
      impact:
        "Le front-end est architecturé en couches (types → service → composants) : une couche de service isole entièrement l'accès aux données, si bien que le passage des jeux simulés au back-end se fait par une simple variable d'environnement, sans toucher un seul composant. Le back-end n'ayant pas été livré, l'application fonctionne aujourd'hui sur des données simulées. L'accès aux pages est filtré avant le rendu, en amont des composants, et les mots de passe des comptes de démonstration sont vérifiés par empreinte bcrypt.",
      technologies: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS 4",
        "shadcn/ui",
        "Recharts",
        "TanStack Table",
        "NextAuth.js",
        "bcrypt",
        "Zod"
      ],
      image: null,
      // Dépôt public. Revu le 30/07/2026 : correction d'une authentification qui
      // ne vérifiait pas le mot de passe, 12 erreurs de typage corrigées,
      // documentation et licence ajoutées. Build de production vérifié.
      github: "https://github.com/IsmaelKone04/FraudShield-v2",
      demo: null
    },
    {
      id: 13,
      groupId: "perso",
      title: "KizunaVerse — quiz multijoueur en réseau local",
      emoji: "🎮",
      category: "Développement",
      status: "Terminé",
      featured: false,
      description:
        "Application mobile de quiz multijoueur fonctionnant intégralement hors ligne : un joueur devient hôte, son téléphone héberge le serveur, les autres rejoignent son point d'accès Wi-Fi en scannant un QR code. Aucun serveur distant, aucune connexion Internet — la partie se joue n'importe où. 216 questions embarquées sur 5 catégories et 4 niveaux de difficulté, huit écrans, thèmes graphiques changeant selon l'univers joué.",
      impact:
        "React Native ne fournissant pas de serveur WebSocket, j'ai implémenté le protocole moi-même au-dessus de TCP : négociation d'ouverture RFC 6455, SHA-1 en JavaScript pur pour la clé d'acceptation, puis encodage et décodage des trames. L'hôte fait autorité sur l'état de la partie ; battement de cœur, reconnexion à intervalle croissant, correction du décalage d'horloge et rejet des messages en double permettent à un joueur déconnecté de revenir sans perdre son score. Le dépôt est documenté de bout en bout : architecture réseau, protocole de messages et limites connues sont expliqués dans le README.",
      technologies: [
        "React Native",
        "Expo SDK 52",
        "TypeScript strict",
        "WebSocket (RFC 6455)",
        "TCP sockets",
        "Zustand",
        "Reanimated",
        "Découverte réseau LAN"
      ],
      image: null,
      // Projet personnel, code publiable. Dépôt assaini le 30/07/2026 (historique
      // réécrit pour purger notes de travail et config IDE, licence MIT ajoutée).
      // Reste à faire avant bascule en public : ajouter les captures d'écran.
      github: "https://github.com/IsmaelKone04/kizunaverse",
      demo: null
    },

    // Projet d'école — images publiques sur Docker Hub (ismael04/mediasense-*).
    // Pile établie depuis le docker-compose retrouvé dans l'historique du dépôt
    // `virtualisation` (contenu supprimé le 31/03/2026, toujours présent en historique).
    // Le fournisseur d'IA reste à confirmer par Ismaël (cf. échange du 30/07/2026).
    {
      id: 15,
      groupId: "academique",
      title: "MediaSense — transcription audio et description d'images",
      emoji: "🎙️",
      category: "Développement",
      status: "Terminé",
      featured: false,
      description:
        "Projet d'école mené en équipe : une application web qui transcrit un fichier audio en texte — depuis un fichier déposé ou un enregistrement fait dans le navigateur — et décrit automatiquement le contenu d'une image, en s'appuyant sur des services d'intelligence artificielle en ligne.",
      impact:
        "L'ensemble a été livré conteneurisé : un front-end servi par nginx et un back-end Node.js séparés, reliés par un réseau Docker interne, et publiés comme images publiques que n'importe qui peut récupérer et lancer. C'est mon premier projet distribué sous forme d'artefacts déployables plutôt que de code à recompiler.",
      technologies: [
        "Docker",
        "Docker Compose",
        "nginx",
        "Node.js / Express",
        "JavaScript",
        "API d'IA en ligne (transcription & vision)"
      ],
      image: null,
      github: null,
      demo: null,
      // Image publique : preuve vérifiable de la livraison.
      dockerhub: "https://hub.docker.com/r/ismael04/mediasense-frontend"
    },

    // Tout premier projet d'école (Django, mars 2024). Conservé volontairement :
    // il sert de point de départ dans la progression, pas de vitrine technique.
    // Dépôt repris le 30/07/2026 : correctifs bloquants, secrets sortis du code,
    // base SQLite (qui contenait un vrai compte) purgée de l'historique, README.
    // Reste à faire avant bascule en public : force-push de l'historique réécrit.
    {
      id: 16,
      groupId: "academique",
      title: "Billetterie pour la can 2023 — premier projet Django",
      emoji: "🎟️",
      category: "Développement",
      status: "Terminé",
      featured: false,
      description:
        "Mon tout premier projet web, réalisé en cours : une billetterie d'événements sportifs en Django. Catalogue des événements, création de compte, connexion, page de détail par événement, achat d'un billet selon sa catégorie tarifaire, et back-office réservé aux administrateurs pour ajouter les événements.",
      impact:
        "C'est ici que j'ai appris le modèle MVT, les migrations et l'authentification Django — les mêmes fondations que j'ai reprises deux ans plus tard pour SIGFOR, à une tout autre échelle. Je l'ai repris récemment pour le rendre présentable, et c'est cette relecture qui est instructive : le prix du billet remontait du formulaire au lieu d'être fixé côté serveur, les secrets étaient écrits dans le code, et les pages de connexion étaient restées à l'état de maquettes. Le README liste ces six erreurs et ce que j'en ai tiré.",
      technologies: ["Python", "Django", "SQLite", "HTML / CSS"],
      image: null,
      github: "https://github.com/IsmaelKone04/Atelier-",
      demo: null
    },

    // Projet de groupe (janvier 2025) — réalisé à trois. Présenté comme tel :
    // co-auteurs Doumbia Ben et Koné Cheick Abdoul (source : README du dépôt).
    {
      id: 17,
      groupId: "academique",
      title: "TechInnova — intranet de gestion de projets",
      emoji: "🗂️",
      category: "Développement",
      status: "Terminé",
      featured: false,
      description:
        "Projet de groupe mené à trois en une semaine : un intranet d'entreprise en PHP/MySQL couvrant la gestion des projets, des utilisateurs, des événements et du calendrier, une gestion documentaire avec téléversement et téléchargement, une boîte à idées avec circuit de traitement, et des rapports.",
      impact:
        "Premier travail à plusieurs sur une même base de code : nous avons dû nous répartir les modules, nous mettre d'accord sur le schéma de base de données commun et intégrer nos parties. C'est aussi le projet qui m'a fait comprendre l'intérêt de séparer l'accès aux données des pages elles-mêmes — les modèles sont isolés dans `includes/`.",
      technologies: ["PHP", "MySQL", "HTML / CSS", "Travail en équipe"],
      image: null,
      github: null,
      demo: null
    },

    // Projet d'école (avril 2024), longtemps oublié dans une branche du dépôt
    // Atelier-. Extrait dans son propre dépôt le 30/07/2026, corrigé, restructuré
    // (public/ + src/) et documenté. La branche Examen d'Atelier- a été supprimée
    // le même jour : elle exposait encore un dump avec des données personnelles.
    // Dépôt privé pour l'instant — à basculer en public après test avec MySQL.
    {
      id: 19,
      groupId: "academique",
      title: "kiNouGarde — mise en relation parents / nounous",
      emoji: "🍼",
      category: "Développement",
      status: "Terminé",
      featured: false,
      description:
        "Plateforme permettant à des parents de trouver une garde d'enfants : inscription séparée pour les parents et les nounous, profils consultables, fiches enfants (âge, allergies, besoins spécifiques), messagerie interne entre les deux parties et suivi des contrats. Écrit en PHP sans framework, volontairement : l'exercice consistait à implémenter soi-même le routage, les sessions, les requêtes préparées et le hachage des mots de passe.",
      impact:
        "C'est le projet sur lequel j'ai le plus appris en le relisant deux ans après. La page de modification d'une fiche enfant chargeait la ligne sur le seul identifiant de l'URL, sans vérifier à qui elle appartenait : n'importe quel parent pouvait consulter et modifier le dossier de l'enfant d'une autre famille. L'inscription des nounous enregistrait aussi le mot de passe en clair alors que celle des parents le hachait. J'ai également réorganisé le projet, dont les trente fichiers vivaient tous à la racine : la connexion à la base et les identifiants MySQL sont désormais hors de la racine web, où aucune URL ne peut les atteindre. Avoir trouvé ces défauts moi-même, les avoir corrigés et documentés dans le README m'a plus appris que le développement initial.",
      technologies: ["PHP 8", "MySQL", "PDO", "HTML / CSS", "JavaScript"],
      image: null,
      github: "https://github.com/IsmaelKone04/kinougarde",
      demo: null
    }
  ],

  experience: [
    {
      id: 1,
      company: "YeshiGroup — Direction des Systèmes d'Information",
      shortName: "YeshiGroup",
      position: "Stagiaire Technicien Support Informatique",
      duration: "01 Juin 2026 - 31 Août 2026",
      location: "Abidjan - Marcory Zone 4, CI",
      current: true,
      description:
        "Recruté comme stagiaire support, j'ai en réalité conduit des chantiers d'ingénierie système et de développement sur la plateforme ITSM centrale d'un groupe multi-filiales présent dans 14 pays : migration, conteneurisation, développement de plugins métier, sécurisation par SSO et gestion d'incident.",
      achievements: [
        "Migré la plateforme ITSM GLPI 10 → 11 sur une architecture Docker Compose (GLPI, MariaDB, reverse-proxy nginx, HTTPS)",
        "Développé 4 plugins internes en PHP : routage automatique des tickets, pointage des techniciens, refonte de l'interface et personnalisation de la page de connexion",
        "Conçu un moteur de routage sélectionnant le technicien selon la compétence, la présence réelle et la charge, étendu au self-service par un sélecteur catégorisant automatiquement la demande",
        "Mis en place et validé une authentification unique Microsoft (Keycloak + oauth2-proxy, OpenID Connect) en environnement de test",
        "Rétabli le helpdesk de production après une cyberattaque : reconstruction Docker, restauration base et fichiers, HTTPS, sauvegarde hebdomadaire automatisée",
        "Rétabli la chaîne de notifications e-mail (SMTP) et fiabilisé le référentiel : arborescence des lieux, profils, source des demandes",
        "Pris en main un serveur distant : connexion SSH à un hébergement GoDaddy et premier déploiement de test"
      ],
      // Chiffres propres à ce stage — affichés dans son groupe de réalisations.
      stats: [
        { value: "4", label: "plugins métier développés", icon: "🧩" },
        { value: "14", label: "pays couverts par la plateforme", icon: "🌍" },
        { value: "~44", label: "problèmes auto-catégorisés", icon: "🎯" },
        { value: "10", label: "mise à jour et installations de plugins tiers", icon: "🔌" },
        { value: "6", label: "création de conteneur sur docker desktop", icon: "" }
      ],
      logo: "🏢"
    },
    {
      id: 2,
      company: "Ministère des Mines du Pétrole et de l'Energie - Direction Générale des Hydrocarbures",
      shortName: "DGH",
      position: "Stagiaire Développeur",
      duration: "Août 2025 - Décembre 2025",
      location: "Abidjan - Plateau, CI",
      current: false,
      description:
        "Conception et développement de SIGFOR, le système d'information de gestion des forages pétroliers : sortie du référentiel national de son classeur Excel vers une base PostgreSQL, avec l'interface web, l'API et la traçabilité qui vont avec.",
      achievements: [
        "Porté le référentiel des ~300 puits forés depuis 1957 d'un classeur Excel vers une base PostgreSQL/PostGIS",
        "Développé l'application web de gestion en Django 5 : saisie, recherche multicritère, suppression logique et restauration",
        "Construit un pipeline d'import Excel récurrent avec simulation préalable, quarantaine des lignes douteuses et rapport d'arbitrage",
        "Exposé une API REST documentée en OpenAPI et mis en place un journal d'audit retraçant chaque modification",
        "Défini trois profils d'accès aux permissions distinctes et produit les guides utilisateur et d'exploitation",
        "Couvert le code par une suite de tests automatisés (pytest) avec mesure de couverture"
      ],
      // Chiffres issus du dépôt SIGFOR — affichés dans son groupe de réalisations.
      stats: [
        { value: "~300", label: "puits pétroliers gérés", icon: "🛢️" },
        { value: "1957", label: "profondeur de l'historique repris", icon: "🗓️" },
        { value: "3", label: "profils d'accès", icon: "🔑" },
        { value: "4", label: "formats d'export (Excel, CSV, PDF, API)", icon: "📤" }
      ],
      logo: "🏛️"
    },
    {
      id: 3,
      company: "Sintech sarl",
      shortName: "Sintech sarl",
      position: "Stagiaire en Maintenance Informatique",
      duration: "Juin 2024 - Juillet 2025",
      location: "Abidjan, CI",
      current: false,
      description:
        "Stage en maintenance informatique : diagnostic et résolution de pannes matérielles et logicielles sur le parc d'ordinateurs.",
      achievements: [
        "Diagnostiqué et résolu des pannes matérielles et logicielles sur postes de travail",
        "Assuré la maintenance courante du parc informatique"
      ],
      logo: "💼"
    }
  ],

  // Métadonnées du parcours académique (alimentent les cartes de la section Formation).
  academic: {
    currentYear: 3,
    totalYears: 3,
    average: "13.5/20",
    specialization: "Génie Logiciel",
    graduationYear: 2026
  },

  education: [
    {
      id: 1,
      institution: "Université de Technologie d'Abidjan",
      degree: "Licence en Informatique — Génie Logiciel",
      duration: "2023 - En cours",
      location: "Riviera Palmeraie, CI",
      description:
        "Formation orientée développement logiciel, bases de données et administration système et réseaux. Moyenne actuelle : 13.5/20.",
      courses: [
        "Algorithmique et Structures de Données",
        "Programmation Orientée Objet",
        "Bases de Données",
        "Développement Web",
        "Administration Systèmes et Réseaux",
        "Réseaux avancés",
        "Cybersécurité",
        "Architecture des ordinateurs",
        "Intelligence Artificielle",
        "Génie Logiciel"
      ],
      logo: "🎓"
    },
    {
      id: 2,
      institution: "Collège Privé Jules Ronsard 2",
      degree: "Baccalauréat Série D",
      duration: "2022 - 2023",
      location: "Vridi Cité, CI",
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

  // Principes de travail appliqués pendant le stage YeshiGroup.
  method: [
    {
      icon: "🧪",
      title: "Tester, pas supposer",
      text: "Chaque cause de bug confirmée par des tests réels — requêtes authentifiées, lecture des logs et du code source — jamais par intuition."
    },
    {
      icon: "🧱",
      title: "Pérenne plutôt que rapide",
      text: "Priorité aux mécanismes natifs et aux développements réversibles, pour ne rien casser lors des montées de version."
    },
    {
      icon: "✅",
      title: "Par étapes validées",
      text: "Aucune action à impact sans sauvegarde préalable ni accord explicite, y compris sur les opérations en base."
    }
  ],

  interests: [
    "Administration système & Docker",
    "ITSM & automatisation",
    "Cybersécurité & IAM",
    "Développement backend",
    "Linux & open source",
    "Documentation technique"
  ],

  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "Courant" }
  ],

  // Personnes pouvant attester d'un stage ou d'une réalisation.
  // `groupId` renvoie à un `experience.id` ou à un `projectGroups.id` : la référence
  // s'affiche alors sous le groupe correspondant dans la section Réalisations.
  //
  // ⚠️ Ne jamais inscrire ici quelqu'un sans son accord explicite : publier le nom et le
  // numéro d'un tiers sur un site public l'expose. Demander avant, et ne mettre que ce que
  // la personne accepte de voir affiché (souvent : nom + fonction + e-mail professionnel).
  // Champs disponibles : name, role, company, email, phone, linkedin.
  // Laisser le tableau vide masque entièrement le bloc côté site.
  //
  // Exemple à recopier une fois l'accord obtenu :
  // {
  //   groupId: 1,
  //   name: "",
  //   role: "",
  //   company: "",
  //   email: "",
  //   phone: "",
  //   linkedin: ""
  // },
  references: [],

  // Texte affiché quand un groupe n'a pas encore de référent renseigné.
  referencesFallback:
    "Références professionnelles disponibles sur demande."
};

export default studentData;
