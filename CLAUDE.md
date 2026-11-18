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
  **react-router-dom**. Site en 5 pages (`/`, `/realisations`, `/competences`,
  `/certifications`, `/contact`) + `/admin` — voir §2 et §4.
- **api/** — Worker Cloudflare (**Hono + Drizzle + D1 + R2**), préfixe `/api`. C'est la
  **source de vérité du contenu** : profil, projets/expériences, compétences,
  certifications, formation, langues, etc., tous pilotables en CRUD depuis `/admin`
  (détails dans [`api/README.md`](api/README.md)). Le bucket R2 `CERTIFICATIONS` stocke
  les justificatifs (PDF/image) des certifications, servis par le Worker lui-même
  (jamais une URL R2 publique directe). **Pas encore déployé sur le vrai compte
  Cloudflare** — tourne seulement en local via `wrangler dev --local` (D1 et R2 émulés).
  Le déploiement réel (`wrangler login`, `d1 create --remote`, `r2 bucket create`,
  `deploy`) et la configuration de Cloudflare Access pour `/api/admin/*` nécessitent les
  identifiants Cloudflare d'Ismaël : à faire par lui, pas depuis une session Claude Code.
  En attendant ce déploiement, le frontend retombe automatiquement sur
  [`frontend/src/data/mockData.js`](frontend/src/data/mockData.js) si l'API est
  inatteignable (voir §4) — ce fichier reste donc à jour avec le contenu réel.
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
    pages/                      # une page = une route ; compose les components ci-dessous
      HomePage.js (Hero seul)  RealisationsPage.js  CompetencesPage.js
      CertificationsPage.js  ContactPage.js
    components/
      Header.js (nav par route)  Hero.js  About.js  Skills.js  Projects.js
      MethodBlock.js  Certifications.js  Contact.js  Admin.js  ui/ (shadcn/ui)
      admin/ (un onglet par domaine : Sections, Profil, Expériences, Réalisations,
        Certifications, Messages, Statistiques)
    contexts/ContentContext.js  # fetch API + repli mockData.js, visibilité des pages
    lib/content.js              # fetchContent/fetchSections (API -> forme attendue par l'UI)
    lib/adminApi.js             # helpers fetch pour /admin (jeton Bearer, upload FormData)
    data/mockData.js            # ★ contenu réel, utilisé en repli si l'API ne répond pas
    lib/analytics.js            # beacon maison vers api/
    hooks/  App.js  App.css  index.js  index.css
  public/_redirects            # SPA fallback générique (/* -> /index.html), couvre toutes les routes
  package.json  tailwind.config.js  craco.config.js  .env  .env.local (non versionné)
api/
  src/
    index.ts                   # lecture publique + POST /api/contact + beacon
    admin.ts                   # CRUD protégé, monté sur /api/admin/*
    db/schema.ts                # schéma Drizzle (profil, projets, compétences,
                                 # certifications, sections, etc.)
    middleware/adminAuth.ts     # Cloudflare Access en prod, jeton .dev.vars en local
  wrangler.toml  README.md      # bindings (D1 + R2), état détaillé, commandes de déploiement
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

## 4. Architecture des données

Le site public lit son contenu depuis l'API Cloudflare (`fetchContent`/`fetchSections`
dans `frontend/src/lib/content.js`, chargés une seule fois par `ContentContext.js` pour
toutes les pages publiques). **Si l'API est inatteignable** (Worker pas encore déployé,
ou coupure), le site retombe intégralement sur `mockData.js` plutôt que d'afficher une
page cassée ou un mélange incohérent — c'est un repli pour tout ou rien, jamais un
mélange partiel API/mockData. `mockData.js` doit donc rester à jour avec le contenu réel
en parallèle de ce qui est en base.

La visibilité de chaque page (sauf Accueil, toujours visible) est pilotable depuis
l'onglet Sections de `/admin` : `realisations`, `competences`, `certifications`,
`contact`. Masquer une page la retire du menu et affiche un message neutre si on y
accède directement par l'URL — son contenu reste en base, rien n'est supprimé.

Ce qui est réellement dynamique (jamais de repli mockData, uniquement en base) :
- Formulaire de contact → table `contact_messages`, lue via `/admin`.
- Analytics de visite (beacon maison, pas de cookie tiers) → table `page_views`, lue via
  `/admin`.
- Justificatifs de certifications (PDF/image) → bucket R2 `CERTIFICATIONS`, déposés
  depuis `/admin`.

---

## 5. Page d'administration (`/admin`)

`frontend/src/components/Admin.js` valide le jeton via `GET /api/admin/analytics`
(stocké en `sessionStorage`, jamais en dur dans le code, jamais dans le bundle), puis
affiche 7 onglets CRUD : **Sections** (afficher/masquer/réordonner une page),
**Profil**, **Expériences** (stages + missions, via `groups`), **Réalisations**
(projets), **Certifications** (diplômes/formations/concours + dépôt du justificatif),
**Messages** (contact) et **Statistiques** (analytics). Chaque onglet lit les endpoints
publics existants pour pré-remplir ses formulaires et écrit via `/api/admin/*` avec le
jeton Bearer.

En prod, `/api/admin/*` doit être protégé par Cloudflare Access (dashboard Zero Trust,
hors dépôt — nécessite le compte Cloudflare d'Ismaël, pas encore fait). En local,
`ADMIN_DEV_SECRET` dans `api/.dev.vars` (non committé) fait office de repli ; ce repli
ne s'active jamais en prod puisque cette variable n'y est pas configurée.

---

## 6. Design

Le design actuel (tokens indigo, Inter + JetBrains Mono, mode sombre, zéro emoji/dégradé
multicolore/barre de pourcentage) a été fait en suivant les specs détaillées de
`02-meta-prompt-claude-code.md` (racine, conservé comme référence historique — ce
travail est **déjà terminé**, ne pas le réexécuter). Réutiliser les tokens de
`src/index.css` et les composants `ui/` plutôt que d'en recréer.

---

## 7. Conventions de travail

- Éditer le contenu réel depuis `/admin` (persisté en base) et répercuter le même
  changement dans `mockData.js` (repli), plutôt qu'en dur dans les composants JSX.
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
- Repli hors-ligne du contenu : `frontend/src/data/mockData.js`.
- Worker API : `api/src/index.ts` (lecture publique), `api/src/admin.ts` (écriture,
  protégé), `api/README.md` (état détaillé, commandes de déploiement restantes).
- Pages et routage : `frontend/src/pages/`, `frontend/src/App.js`.
