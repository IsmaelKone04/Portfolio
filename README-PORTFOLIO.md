# 🎓 Portfolio Étudiant Génie Informatique

## 📋 Description
Portfolio moderne et dynamique créé pour un étudiant en 2ème année de génie informatique à l'Université Privée d'Abidjan. Le site présente un design professionnel avec des animations fluides et une interface intuitive.

## ✨ Fonctionnalités

### 🏠 Sections du Portfolio
- **Hero Section** : Présentation dynamique avec animation de texte et background parallax
- **À Propos** : Bio complète, langues parlées, centres d'intérêt
- **Compétences** : Barres de progression animées organisées par catégories
- **Projets** : Galerie de projets avec filtres et liens vers GitHub/Demo
- **Expérience** : Timeline des expériences professionnelles et stages
- **Formation** : Parcours académique détaillé
- **Contact** : Formulaire de contact et informations

### 🎨 Design Features
- **Animations fluides** : Scroll animations, hover effects, micro-interactions
- **Responsive Design** : Compatible mobile, tablette et desktop
- **Couleurs modernes** : Palette bleu/indigo professionnelle
- **Typography** : Hiérarchie claire avec Google Fonts
- **Effets visuels** : Gradients, ombres, blurs, parallax

## 🛠️ Technologies Utilisées
- **React** 19.0.0 - Framework principal
- **Tailwind CSS** - Styling et design system
- **Radix UI** - Composants UI accessibles
- **Lucide React** - Icônes modernes
- **React Router** - Navigation
- **Framer Motion** via CSS - Animations

## 📦 Installation et Lancement

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Étapes d'installation
```bash
# 1. Extraire l'archive
tar -xzf portfolio-etudiant-genieinfo.tar.gz
cd frontend/

# 2. Installer les dépendances
yarn install
# ou
npm install

# 3. Lancer le serveur de développement
yarn start
# ou
npm start

# 4. Ouvrir http://localhost:3000 dans votre navigateur
```

## 📁 Structure du Projet
```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/                  # Composants UI réutilisables
│   │   ├── Hero.js             # Section d'accueil
│   │   ├── About.js            # Section à propos
│   │   ├── Skills.js           # Compétences techniques
│   │   ├── Projects.js         # Portfolio de projets
│   │   ├── Experience.js       # Expérience professionnelle
│   │   ├── Education.js        # Formation académique
│   │   ├── Contact.js          # Formulaire de contact
│   │   └── Portfolio.js        # Page principale
│   ├── data/
│   │   └── mockData.js         # Données fictives du portfolio
│   ├── hooks/
│   │   └── use-toast.js        # Hook pour notifications
│   ├── App.js                  # Composant racine
│   ├── App.css                 # Styles globaux
│   └── index.js                # Point d'entrée
├── package.json                # Dépendances et scripts
├── tailwind.config.js          # Configuration Tailwind
└── README.md
```

## 🎯 Données Fictives Incluses

### 👨‍🎓 Profil Étudiant
- **Nom** : Kouadio Jean-Baptiste
- **Formation** : 2ème année Génie Informatique
- **Université** : Université Privée d'Abidjan
- **Localisation** : Abidjan, Côte d'Ivoire

### 💻 Projets Présentés
1. **EduConnect CI** - Plateforme éducative avec chat temps réel
2. **AgriTech Mobile** - App mobile pour agriculteurs ivoiriens
3. **Smart Parking Abidjan** - Système IoT de gestion de parking
4. **Traducteur Langues Locales** - IA pour langues ivoiriennes

### 🛠️ Compétences Techniques
- **Langages** : Python, JavaScript, Java, C++, HTML/CSS, SQL
- **Frameworks** : React, Node.js, Django, FastAPI, Flutter
- **Outils** : Git, Docker, VS Code, MongoDB, Firebase

## 🔧 Personnalisation

### Modifier les données
Éditez le fichier `src/data/mockData.js` pour personnaliser :
- Informations personnelles
- Projets et réalisations
- Compétences et niveaux
- Expérience professionnelle
- Formation académique

### Adapter les couleurs
Modifiez `tailwind.config.js` et les classes CSS pour changer la palette de couleurs.

### Ajouter des sections
Créez de nouveaux composants dans `src/components/` et ajoutez-les à `Portfolio.js`.

## 📱 Responsive Design
Le portfolio est entièrement responsive et s'adapte à :
- **Mobile** : Écrans < 768px
- **Tablette** : Écrans 768px - 1024px  
- **Desktop** : Écrans > 1024px

## 🚀 Production

### Build pour production
```bash
yarn build
# ou
npm run build
```

Le dossier `build/` contiendra les fichiers optimisés pour la production.

### Déploiement
Compatible avec :
- **Netlify** : Glissez-déposez le dossier build
- **Vercel** : Connectez votre repo GitHub
- **GitHub Pages** : Activez dans les paramètres du repo
- **Serveur web** : Uploadez le contenu du dossier build

## 📝 Licence
Ce portfolio est fourni comme template éducatif. Vous êtes libre de le modifier et l'adapter selon vos besoins.

## 🤝 Support
Pour toute question ou assistance :
- Modifiez les données dans `mockData.js`
- Consultez la documentation React et Tailwind CSS
- Référez-vous aux commentaires dans le code

---

**Créé avec ❤️ pour les étudiants en génie informatique d'Abidjan**