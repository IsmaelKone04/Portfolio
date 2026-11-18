# portfolio-api

Worker Cloudflare (Hono + Drizzle + D1 + R2) qui sert tout le contenu du portfolio
(profil, réalisations, compétences, certifications, etc.) — `mockData.js` côté frontend
n'est plus qu'un repli si cette API est inatteignable (voir `CLAUDE.md` §4). Lecture
publique sur `/api/*`, écriture réservée à `/api/admin/*` (protégé par Cloudflare
Access, configuré dans le dashboard, pas dans ce dépôt).

## Ce qui est déjà en place

- `src/db/schema.ts` — schéma Drizzle, calqué sur la forme réelle de `mockData.js`.
- `src/index.ts` — endpoints de lecture publique (`/api/profile`, `/api/groups`,
  `/api/projects`, `/api/projects/:slug`, `/api/skills`, `/api/certifications`,
  `/api/certifications/:id/file`, `/api/method`, `/api/interests`, `/api/languages`,
  `/api/references`, `/api/sections`), l'écriture publique du formulaire de contact
  (`POST /api/contact`) et le beacon d'analytics (`POST /api/analytics/beacon`).
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
imbriqués), `certifications` (POST/PUT/DELETE + `PUT`/`DELETE
/certifications/:id/file` pour le justificatif, stocké dans le bucket R2
`CERTIFICATIONS`), `method` / `interests` / `languages` / `references`
(POST/PUT/DELETE), `sections` (GET/PUT, visibilité par page), `site-meta/:key`
(PUT) et `analytics` (GET, déplacé ici depuis la racine publique).

La migration `0006` réintroduit la page Parcours (`sections.key = 'parcours'`), retirée
par erreur lors du passage aux pages dédiées — purement une donnée, aucun changement de
schéma. Le contenu qu'elle affiche (stages/missions) vit déjà dans `groups`/
`group_achievements`/`group_stats`, administré via l'onglet Expériences de `/admin`.

Les tables `education`/`academic` existent encore en base (migrations 0000-0002)
mais ne sont plus exposées côté public ni admin : leur contenu réel a été repris
dans `certifications` (migration 0005) quand le site est passé de 5 sections sur
une page à des pages dédiées, dont Certifications couvre diplômes/formations/
concours. Elles pourraient être supprimées par une migration dédiée si besoin,
mais rien ne les lit aujourd'hui donc ça peut attendre.

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
  migrations / seed en `--remote`, `r2 bucket create portfolio-certifications`, puis
  `npm run deploy`) — nécessite ses identifiants, ne peut pas être fait depuis une
  session Claude Code.
- Authentification admin réelle (configuration Cloudflare Access côté dashboard
  Zero Trust) — le CRUD est prêt à être protégé, il ne reste que la config.

Le frontend lit désormais cette API pour tout son contenu (voir `CLAUDE.md` §4),
avec repli sur `mockData.js` si elle est inatteignable — ce n'est donc plus une
API secondaire au contenu statique mais la source de vérité.
