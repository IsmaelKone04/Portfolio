import { Hono } from "hono";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/d1";
import { eq, asc } from "drizzle-orm";
import * as schema from "./db/schema";
import { admin } from "./admin";

type Bindings = { DB: D1Database; ADMIN_DEV_SECRET?: string };

const app = new Hono<{ Bindings: Bindings }>();

app.use("/api/*", cors());

// --- Lecture publique --------------------------------------------------

app.get("/api/profile", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const [p] = await db.select().from(schema.profile).where(eq(schema.profile.id, 1));
  const stats = await db.select().from(schema.heroStats).orderBy(asc(schema.heroStats.position));
  return c.json({ ...p, heroHighlight: { title: p?.heroHighlightTitle, stats } });
});

app.get("/api/groups", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const rows = await db.select().from(schema.groups).orderBy(asc(schema.groups.sortOrder));
  const achievements = await db.select().from(schema.groupAchievements);
  const stats = await db.select().from(schema.groupStats);
  const result = rows.map((g) => ({
    ...g,
    achievements: achievements
      .filter((a) => a.groupId === g.id)
      .sort((a, b) => a.position - b.position)
      .map((a) => a.text),
    stats: stats
      .filter((s) => s.groupId === g.id)
      .sort((a, b) => a.position - b.position),
  }));
  return c.json(result);
});

app.get("/api/projects", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const rows = await db.select().from(schema.projects).orderBy(asc(schema.projects.sortOrder));
  const technologies = await db.select().from(schema.projectTechnologies);
  const images = await db.select().from(schema.projectImages);
  const result = rows.map((p) => ({
    ...p,
    technologies: technologies
      .filter((t) => t.projectId === p.id)
      .sort((a, b) => a.position - b.position)
      .map((t) => t.technology),
    images: images
      .filter((i) => i.projectId === p.id)
      .sort((a, b) => a.position - b.position)
      .map((i) => i.url),
  }));
  return c.json(result);
});

app.get("/api/projects/:slug", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const [p] = await db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.slug, c.req.param("slug")));
  if (!p) return c.json({ error: "not_found" }, 404);
  const technologies = await db
    .select()
    .from(schema.projectTechnologies)
    .where(eq(schema.projectTechnologies.projectId, p.id))
    .orderBy(asc(schema.projectTechnologies.position));
  const images = await db
    .select()
    .from(schema.projectImages)
    .where(eq(schema.projectImages.projectId, p.id))
    .orderBy(asc(schema.projectImages.position));
  return c.json({
    ...p,
    technologies: technologies.map((t) => t.technology),
    images: images.map((i) => i.url),
  });
});

app.get("/api/skills", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const rows = await db.select().from(schema.skills).orderBy(asc(schema.skills.sortOrder));
  const details = await db.select().from(schema.skillDetails);
  const result = rows.map((s) => ({
    ...s,
    details: details
      .filter((d) => d.skillId === s.id)
      .sort((a, b) => a.position - b.position)
      .map((d) => d.text),
  }));
  return c.json(result);
});

app.get("/api/education", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const rows = await db.select().from(schema.education).orderBy(asc(schema.education.sortOrder));
  const courses = await db.select().from(schema.educationCourses);
  const result = rows.map((e) => ({
    ...e,
    courses: courses
      .filter((cs) => cs.educationId === e.id)
      .sort((a, b) => a.position - b.position)
      .map((cs) => cs.course),
  }));
  return c.json(result);
});

app.get("/api/academic", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const [a] = await db.select().from(schema.academic).where(eq(schema.academic.id, 1));
  return c.json(a ?? {});
});

app.get("/api/method", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  return c.json(await db.select().from(schema.method).orderBy(asc(schema.method.position)));
});

app.get("/api/interests", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const rows = await db.select().from(schema.interests).orderBy(asc(schema.interests.position));
  return c.json(rows.map((r) => r.text));
});

app.get("/api/languages", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  return c.json(await db.select().from(schema.languages).orderBy(asc(schema.languages.position)));
});

app.get("/api/sections", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const rows = await db.select().from(schema.sections).orderBy(asc(schema.sections.sortOrder));
  return c.json(rows);
});

app.get("/api/references", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const rows = await db.select().from(schema.references);
  const [fallback] = await db
    .select()
    .from(schema.siteMeta)
    .where(eq(schema.siteMeta.key, "referencesFallback"));
  return c.json({ references: rows, fallback: fallback?.value ?? null });
});

// --- Contact (écriture publique, lecture réservée à /admin) ------------

app.post("/api/contact", async (c) => {
  const body = await c.req
    .json<{ name?: string; email?: string; subject?: string; message?: string }>()
    .catch(() => null);
  const name = body?.name?.trim();
  const email = body?.email?.trim();
  const subject = body?.subject?.trim();
  const message = body?.message?.trim();

  if (!name || !email || !subject || !message) {
    return c.json({ error: "missing_fields" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: "invalid_email" }, 400);
  }
  if (name.length > 200 || email.length > 200 || subject.length > 300 || message.length > 5000) {
    return c.json({ error: "field_too_long" }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  await db.insert(schema.contactMessages).values({
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  });
  return c.json({ ok: true });
});

// --- Analytics (beacon public, lecture réservée à /admin) --------------

app.post("/api/analytics/beacon", async (c) => {
  const body = await c.req.json<{ path?: string; referrer?: string; sessionHash?: string }>().catch(() => null);
  const path = body?.path?.trim();
  if (!path || path.length > 500) {
    return c.json({ error: "invalid_path" }, 400);
  }
  const referrer = body?.referrer?.trim().slice(0, 500) || null;
  const sessionHash = body?.sessionHash?.trim().slice(0, 100) || null;

  const db = drizzle(c.env.DB, { schema });
  await db.insert(schema.pageViews).values({
    path: path.slice(0, 500),
    referrer,
    sessionHash,
    createdAt: new Date().toISOString(),
  });
  return c.json({ ok: true });
});

// --- Admin (écriture) ---------------------------------------------------
// Protégé par Cloudflare Access en prod (en-tête Cf-Access-Authenticated-User-Email,
// règle configurée dans le dashboard Zero Trust, hors dépôt) ; voir src/admin.ts
// et src/middleware/adminAuth.ts.
app.route("/api/admin", admin);

export default app;
