# CLAUDE.md — Portfolio d'Ismaël Koné

Ce fichier guide toute session Claude Code travaillant sur ce dépôt. Langue du site, des
commits et de **toutes les réponses à l'utilisateur** : **français** (il ne lit pas
l'anglais).

---

## 1. Ce qu'est le projet

Portfolio personnel full-stack, généré au départ sur la plateforme Emergent puis
redessiné dans un style sobre et professionnel (voir §6). Trois dossiers :

- **frontend/** — React 19 (Create React App via **CRACO**), **Tailwind CSS**,
  composants **shadcn/ui** (Radix UI), icônes **lucide-react**, routing
  **react-router-dom**. Le contenu statique (profil, compétences, projets, expériences,
  formation, langues) vient d'un seul fichier : [`frontend/src/data/mockData.js`](frontend/src/data/mockData.js)
  — voir §4 pour la décision de l'y garder.
- **api/** — Worker Cloudflare (**Hono + Drizzle + D1**), préfixe `/api`. Gère ce qui est
  réellement dynamique : formulaire de contact (`POST /api/contact`), analytics maison
  sans cookie tiers (`POST /api/analytics/beacon`), et un CRUD admin complet sur
  `/api/admin/*` (détails dans [`api/README.md`](api/README.md)). **Pas encore déployé
  sur le vrai compte Cloudflare** — tourne seulement en local via `wrangler dev --local`
  (D1 émulé). Le déploiement réel (`wrangler login`, `d1 create --remote`, `deploy`) et
  la configuration de Cloudflare Access pour `/api/admin/*` nécessitent les identifiants
  Cloudflare d'Ismaël : à faire par lui, pas depuis une session Claude Code.
- **backend/** — ancien scaffold FastAPI + MongoDB, **non utilisé**. Ne pas y développer
  de nouvelle fonctionnalité ; `api/` l'a remplacé pour tout ce qui est dynamique.

### Branche de travail
Le travail actif vit sur **`redesign/pro-ui`** — pas `main` (squelette seulement), pas
`conflict_120725_1247` (ancienne branche, abandonnée). Reste sur `redesign/pro-ui`.

### Déploiement
Cloudflare Pages redéploie automatiquement le frontend à chaque push sur
`redesign/pro-ui`. **Ne jamais pousser sans validation explicite d'Ismaël pour le
chantier concerné** — committer localement et tester sont délégués, le push ne l'est pas.

---

## 2. Structure

```
frontend/
  src/
    components/
      Hero.js  About.js  Skills.js  Projects.js  Experience.js  Education.js
      Contact.js  Admin.js  Portfolio.js (assemble tout)  ui/ (shadcn/ui)
    data/mockData.js           # ★ SOURCE UNIQUE du contenu statique
    lib/analytics.js           # beacon maison vers api/
    hooks/  App.js  App.css  index.js  index.css
  public/_redirects            # SPA fallback (nécessaire : il y a 2 routes, / et /admin)
  package.json  tailwind.config.js  craco.config.js  .env  .env.local (non versionné)
api/
  src/
    index.ts                   # lecture publique + POST /api/contact + beacon
    admin.ts                   # CRUD protégé, monté sur /api/admin/*
    db/schema.ts                # schéma Drizzle (calqué sur mockData.js)
    middleware/adminAuth.ts     # Cloudflare Access en prod, jeton .dev.vars en local
  wrangler.toml  README.md      # état détaillé, commandes de déploiement
backend/
  server.py  requirements.txt  .env   # legacy, non utilisé
CV_competences_Ismael_Kone.md  # ★ contenu RÉEL de référence
Portfolio_Ismael_Kone.md       # ★ contenu RÉEL de référence
```

Les deux `*.md` à la racine ne font pas partie de l'app : ce sont les sources de vérité
rédactionnelles (CV + descriptif détaillé des missions). Ne pas les publier tels quels.

---

## 3. Lancer le projet

**Frontend** (port 3000) :
```bash
cd frontend
yarn install
yarn start
```

**API Cloudflare** (port 8787, D1 émulé en local — voir `api/README.md` pour le détail) :
```bash
cd api
npm install
npm run dev
```

- Le front lit l'URL de l'API dans `frontend/.env.local` (`REACT_APP_API_URL`, non
  versionné). **Toujours** appeler l'API via cette variable, jamais une URL en dur.
- Ne jamais committer de secret (`.env.local`, `api/.dev.vars` restent locaux).
- Le `backend/` FastAPI n'est plus utilisé : pas besoin de le lancer.

---

## 4. Architecture des données — décision prise, ne pas la rouvrir sans demande

Le contenu statique (profil, ~20 projets, expériences, formation, compétences) reste
dans `mockData.js` : il change rarement, et le servir depuis l'API D1 ajouterait une
dépendance réseau et des états de chargement sans bénéfice visible pour un visiteur.
L'API Cloudflare (`api/`) existe pour ce qui est réellement dynamique :

- Formulaire de contact → table `contact_messages`, lue via `/admin`.
- Analytics de visite (beacon maison, pas de cookie tiers) → table `page_views`, lue via
  `/admin`.
- Un CRUD admin complet existe déjà côté Worker (`api/src/admin.ts`) pour piloter tout
  le contenu si une bascule complète était un jour explicitement demandée par Ismaël —
  **non engagée pour l'instant**.

---

## 5. Page d'administration (`/admin`)

`frontend/src/components/Admin.js` lit `GET /api/admin/contact` et
`GET /api/admin/analytics` via un jeton saisi à la main (stocké en `sessionStorage`,
jamais en dur dans le code, jamais dans le bundle). En prod, `/api/admin/*` doit être
protégé par Cloudflare Access (dashboard Zero Trust, hors dépôt — nécessite le compte
Cloudflare d'Ismaël, pas encore fait). En local, `ADMIN_DEV_SECRET` dans `api/.dev.vars`
(non committé) fait office de repli ; ce repli ne s'active jamais en prod puisque cette
variable n'y est pas configurée.

---

## 6. Design

Le design actuel (tokens indigo, Inter + JetBrains Mono, mode sombre, zéro emoji/dégradé
multicolore/barre de pourcentage) a été fait en suivant les specs détaillées de
`02-meta-prompt-claude-code.md` (racine, conservé comme référence historique — ce
travail est **déjà terminé**, ne pas le réexécuter). Réutiliser les tokens de
`src/index.css` et les composants `ui/` plutôt que d'en recréer.

---

## 7. Conventions de travail

- Éditer le contenu statique dans `mockData.js`, pas en dur dans les composants JSX
  (exception : contact/analytics/admin passent par l'API, voir §4).
- **Contenu réel uniquement.** Ne jamais inventer de donnée : tout ajout vient des deux
  `.md` de référence ou d'une confirmation explicite d'Ismaël. En cas de doute, demander.
- Ne pas exposer de données personnelles sensibles au-delà de ce qu'Ismaël veut publier.
- Anonymiser les missions freelance (pas de nom de client ni de filiale).
- Committer, tester et choisir le prochain chantier peuvent être faits de façon
  autonome ; **pousser sur GitHub attend toujours une validation explicite d'Ismaël**
  pour le chantier concerné (voir §1, Déploiement).

---

## 8. Références rapides

- Contenu rédactionnel réel : `CV_competences_Ismael_Kone.md`, `Portfolio_Ismael_Kone.md`.
- Données du site : `frontend/src/data/mockData.js`.
- Worker API : `api/src/index.ts` (lecture publique), `api/src/admin.ts` (écriture,
  protégé), `api/README.md` (état détaillé, commandes de déploiement restantes).
- Assemblage des sections : `frontend/src/components/Portfolio.js`.
