# CLAUDE.md — Portfolio d'Ismaël Koné

Ce fichier guide toute session Claude Code travaillant sur ce dépôt. **Objectif de la
mission : faire évoluer ce portfolio d'un template à demi-personnalisé vers un portfolio
professionnel réel, en intégrant les compétences acquises pendant le stage YeshiGroup
(migration/administration GLPI).** Langue du site et des échanges : **français**.

---

## 1. Ce qu'est le projet

Portfolio personnel full-stack, généré au départ sur la plateforme **Emergent**
(image `fastapi_react_mongo_shadcn`). Deux services :

- **frontend/** — application **React 19** (Create React App via **CRACO**), **Tailwind CSS**,
  composants **shadcn/ui** (Radix UI), icônes **lucide-react**, routing **react-router-dom**.
  Tout le contenu affiché vient d'un **seul fichier de données** :
  [`frontend/src/data/mockData.js`](frontend/src/data/mockData.js).
- **backend/** — API **FastAPI** + **MongoDB** (via `motor`), préfixe `/api`.
  Aujourd'hui quasi vide : uniquement un endpoint de santé et un `status_checks` de démo
  ([`backend/server.py`](backend/server.py)). Le formulaire de contact du front n'est **pas**
  encore branché dessus.

Le portfolio est **piloté par les données** : modifier `mockData.js` suffit à changer
presque tout le contenu (profil, compétences, projets, expériences, formation, langues).
Les composants de `frontend/src/components/` ne font que consommer cette structure.

### Branche de travail
Le vrai projet vit sur la branche **`conflict_120725_1247`** (PAS `main`, qui n'a qu'un
squelette). Reste sur cette branche.

---

## 2. Structure

```
frontend/
  src/
    components/
      Hero.js  About.js  Skills.js  Projects.js
      Experience.js  Education.js  Contact.js  Portfolio.js  (assemble tout)
      ui/                      # composants shadcn/ui réutilisables
    data/mockData.js           # ★ SOURCE UNIQUE du contenu — c'est ici qu'on édite
    hooks/  lib/  App.js  App.css  index.js  index.css
  package.json  tailwind.config.js  craco.config.js  .env
backend/
  server.py                    # FastAPI, endpoints /api/*
  requirements.txt  .env        # MONGO_URL, DB_NAME
CV_competences_Ismael_Kone.md  # ★ contenu RÉEL de référence (voir §4)
Portfolio_Ismael_Kone.md       # ★ contenu RÉEL de référence (voir §4)
```

Les deux `*.md` à la racine ne font pas partie de l'app : ce sont les **sources de vérité
rédactionnelles** (CV + descriptif détaillé du stage). Ne pas les publier tels quels ;
s'en servir pour remplir `mockData.js`.

---

## 3. Lancer le projet

**Frontend** (port 3000) :
```bash
cd frontend
yarn install
yarn start
```

**Backend** (port 8001, nécessite un MongoDB local) :
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

- Le front lit l'URL du backend dans `frontend/.env` (`REACT_APP_BACKEND_URL`). En local,
  la pointer sur `http://localhost:8001`. **Toujours** appeler l'API via cette variable +
  préfixe `/api`, jamais une URL en dur.
- Ne jamais committer de secret. `.env` reste local.

---

## 4. Mission : ce qu'il faut améliorer

Le contenu actuel de `mockData.js` est **partiellement fictif** (hérité du template) et
ne reflète PAS le stage le plus important d'Ismaël. Objectifs, par priorité :

### 4.1 — Intégrer le stage YeshiGroup / GLPI (priorité haute)
Ismaël a réalisé un stage de technicien support (juin–août 2026) chez **YeshiGroup (DSI)**
dont le périmètre a largement dépassé le support N1. **Ajouter ce stage** comme
**expérience phare** et comme **projet vedette**. Contenu réel (détaillé dans
`CV_competences_Ismael_Kone.md` et `Portfolio_Ismael_Kone.md`) :

- Migration de la plateforme ITSM **GLPI 10 → 11** pour un groupe présent dans **14 pays**.
- Architecture **Docker / Docker Compose** multi-services (GLPI, MariaDB, reverse-proxy
  **nginx**, terminaison **TLS/HTTPS**).
- Développement de **4 plugins internes en PHP** : routage automatique intelligent des
  tickets (choix du technicien selon compétence + présence réelle + charge), pointage des
  techniciens, refonte visuelle de l'interface, personnalisation de la page de connexion.
- **SSO Microsoft** : Keycloak + oauth2-proxy en **OpenID Connect**, courtage d'identité
  vers **Microsoft Entra ID**.
- **Restauration d'un helpdesk de production après cyberattaque** (reconstruction Docker,
  restauration base/fichiers, HTTPS, sauvegarde hebdomadaire automatisée).
- Chaîne de **notifications e-mail (SMTP)** rétablie ; référentiel fiabilisé.
- Première prise en main d'un **serveur distant** (SSH, hébergement GoDaddy).

### 4.2 — Mettre à jour les compétences (`skills`)
Enrichir/rééquilibrer les niveaux à partir des compétences réellement acquises (voir la
section « Compétences » de `CV_competences_Ismael_Kone.md`) : **Docker/Docker Compose,
nginx, Linux/SSH, PHP (plugins GLPI), SQL/MariaDB, SSO OpenID Connect, HTTPS/TLS,
administration ITSM/GLPI, débogage par analyse de logs**. Garder des niveaux honnêtes et
cohérents avec un profil stagiaire monté en compétences (pas de 95 % partout).

### 4.3 — Nettoyer les données fictives résiduelles
Plusieurs éléments viennent encore du template et doivent être vérifiés/corrigés ou
supprimés s'ils ne sont pas réels :
- `personal.linkedin` pointe vers `jean-baptiste-kouadio` (nom du template) — **à corriger**.
- Projets `EduConnect CI`, `AgriTech Mobile`, `Smart Parking`, `Traducteur Langues Locales` :
  confirmer lesquels sont réels ; remplacer/retirer les fictifs. Le projet GLPI devient le
  projet vedette.
- `certifications` (AWS/Google/Meta avec `credentialId` en `...JBK`/année 2024) : semblent
  hérités du template — **à valider ou retirer** (ne rien inventer).
- Vérifier la cohérence de `experience` (intitulés, dates, réalisations).

**Règle d'or : ne jamais inventer de contenu.** Toute donnée ajoutée doit venir des deux
`.md` de référence ou être explicitement confirmée par Ismaël. En cas de doute, demander.

### 4.4 — Améliorations optionnelles (après validation)
- Brancher le **formulaire de contact** sur un vrai endpoint FastAPI (`POST /api/contact`
  stockant en MongoDB) plutôt que le `toast` fictif actuel.
- Section/badge dédiée aux réalisations chiffrées (4 plugins, 14 pays, ~44 problèmes
  auto-catégorisés, helpdesk restauré) — déjà rédigées dans le CV.
- Vérifier le responsive et l'accessibilité (contraste, focus clavier) après changements.

---

## 5. Conventions de travail

- **Éditer le contenu dans `mockData.js`**, pas en dur dans les composants JSX.
- Respecter le design system existant (Tailwind + shadcn/ui, palette bleu/indigo). Réutiliser
  les composants `ui/` plutôt que d'en réécrire.
- **Français** pour tout le contenu visible et les commits.
- Travailler **par étapes validées** : proposer le changement, montrer le diff, attendre le
  feu vert avant d'enchaîner. Ne pas committer/pusher sans demande explicite.
- Contenu réel uniquement (cf. §4.3). Pas de placeholder inventé.
- Ne pas exposer de données personnelles sensibles au-delà de ce qu'Ismaël veut publier
  (téléphone, adresse e-mail : lui demander avant de laisser en clair sur un site public).

---

## 6. Références rapides

- Contenu rédactionnel réel : `CV_competences_Ismael_Kone.md`, `Portfolio_Ismael_Kone.md`.
- Données du site : `frontend/src/data/mockData.js`.
- Assemblage des sections : `frontend/src/components/Portfolio.js`.
- API : `backend/server.py` (préfixe `/api`).
