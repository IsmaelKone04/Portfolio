import { createMiddleware } from "hono/factory";

type Bindings = { DB: D1Database; ADMIN_DEV_SECRET?: string };

// En production, Cloudflare Access protège /api/admin/* en amont (règle
// configurée dans le dashboard Zero Trust, hors dépôt) et injecte cet en-tête
// une fois l'utilisateur authentifié. En local, il n'y a pas d'Access devant
// `wrangler dev` : on autorise alors un jeton défini dans .dev.vars (non
// committé). Ce repli ne s'active jamais en prod puisque ADMIN_DEV_SECRET n'y
// est pas configuré.
export const adminAuth = createMiddleware<{ Bindings: Bindings }>(async (c, next) => {
  if (c.req.header("Cf-Access-Authenticated-User-Email")) return next();

  const devSecret = c.env.ADMIN_DEV_SECRET;
  if (devSecret && c.req.header("Authorization") === `Bearer ${devSecret}`) return next();

  return c.json({ error: "unauthorized" }, 401);
});
