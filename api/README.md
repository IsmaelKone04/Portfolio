# portfolio-api

Worker Cloudflare (Hono + Drizzle + D1) pour ce qui est réellement dynamique dans le
portfolio : formulaire de contact et analytics de visite (`mockData.js` reste la source
du contenu statique, voir `CLAUDE.md` §4). Lecture publique sur `/api/*`, écriture
réservée à `/api/admin/*` (protégé par Cloudflare Access, configuré dans le dashboard,
pas dans ce dépôt).

## Ce qui est déjà en place

- `src/db/schema.ts` — schéma Drizzle, calqué sur la forme réelle de `mockData.js`.
- `src/index.ts` — endpoints de lecture publique (`/api/profile`, `/api/projects`,
  `/api/projects/:slug`, `/api/skills`, `/api/education`, `/api/academic`,
  `/api/method`, `/api/interests`, `/api/languages`, `/api/references`), l'écriture
  publique du formulaire de contact (`POST /api/contact`) et le beacon d'analytics
  (`POST /api/analytics/beacon`).
- `scripts/export-mockdata.mjs` — lit `../frontend/src/data/mockData.js` tel quel et le
  normalise en JSON à la forme des tables.
- `scripts/generate-seed.mjs` — transforme ce JSON en `drizzle/seed.sql`.
- Côté front : `frontend/src/lib/analytics.js` (beacon au chargement de page) et
  `frontend/src/components/Admin.js` (page `/admin`, lit `GET /api/admin/contact` et
  `GET /api/admin/analytics` ci-dessous via un jeton saisi à la main).

## Ce qu'il reste à faire à la main (côté compte Cloudflare)

Ces étapes nécessitent ton compte Cloudflare — je ne peux pas les exécuter depuis cet
environnement (pas d'accès réseau à ton compte, pas d'identifiants).

```bash
cd api
npm install
npx wrangler login                     # ouvre le navigateur, connecte ton compte
npx wrangler d1 create portfolio-db    # note le database_id renvoyé
# colle ce database_id dans wrangler.toml (champ database_id)

npm run db:generate                     # génère la migration SQL depuis schema.ts
npm run db:migrate:local                # applique le schéma en local (SQLite émulé)
npm run export:mockdata                 # mockData.js -> JSON normalisé
npm run generate:seed                   # JSON -> seed.sql (à la racine de api/, pas dans drizzle/ :
                                         # ce dossier est migrations_dir, un .sql qui y traîne serait
                                         # exécuté comme une vraie migration par `d1 migrations apply`)
npx wrangler d1 execute portfolio-db --local --file=seed.sql

npm run dev                             # Worker local sur http://localhost:8787
```

Une fois vérifié en local, mêmes commandes avec `--remote` pour appliquer sur la vraie
base D1 Cloudflare, puis `npm run deploy`.

## Admin (écriture)

`src/admin.ts` expose le CRUD d'écriture, monté sur `/api/admin/*` :
`profile` (PUT, singleton + hero stats), `groups` (POST/PUT/DELETE, avec
achievements/stats imbriqués), `projects` (POST/PUT/DELETE, avec
technologies/images imbriquées), `skills` (POST/PUT/DELETE, avec details
imbriqués), `education` (POST/PUT/DELETE, avec courses imbriqués), `academic`
(PUT, singleton), `method` / `interests` / `languages` / `references`
(POST/PUT/DELETE), `site-meta/:key` (PUT) et `analytics` (GET, déplacé ici
depuis la racine publique).

Les listes imbriquées (`achievements`, `stats`, `technologies`, `images`,
`details`, `courses`) sont remplacées en bloc à chaque PUT/POST où elles sont
fournies (supprimées puis réinsérées dans l'ordre du tableau) — pas de
patch partiel champ par champ sur ces sous-tables.

**Auth** (`src/middleware/adminAuth.ts`) : en prod, Cloudflare Access protège
`/api/admin/*` en amont et injecte l'en-tête `Cf-Access-Authenticated-User-Email`
une fois configuré dans le dashboard Zero Trust (hors dépôt). En local, sans
Access, un jeton de secours est accepté via `Authorization: Bearer <secret>` si
`ADMIN_DEV_SECRET` est défini dans `.dev.vars` (non committé) :

```bash
echo "ADMIN_DEV_SECRET=un-secret-local" > .dev.vars
curl -X POST http://localhost:8787/api/admin/method \
  -H "Authorization: Bearer un-secret-local" -H "Content-Type: application/json" \
  -d '{"title":"..."}'
```

Ce repli ne s'active jamais en prod puisque `ADMIN_DEV_SECRET` n'y est pas
configuré (seule la variable `ENVIRONMENT` est définie dans `wrangler.toml`).

## Pas encore fait

- Déploiement réel sur le compte Cloudflare d'Ismaël (`wrangler login`, `d1 create` /
  migrations / seed en `--remote`, puis `npm run deploy`) — nécessite ses identifiants,
  ne peut pas être fait depuis une session Claude Code.
- Authentification admin réelle (configuration Cloudflare Access côté dashboard
  Zero Trust) — le CRUD est prêt à être protégé, il ne reste que la config.

**Décision prise, ne pas rouvrir sans demande explicite** : le frontend ne bascule pas
sur cette API pour le contenu statique (profil, projets, compétences...) — `mockData.js`
reste la source de vérité pour ça (voir `CLAUDE.md` §4). Cette API sert le formulaire de
contact, l'analytics et un futur pilotage admin du contenu si un jour demandé.
