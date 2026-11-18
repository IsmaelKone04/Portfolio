import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq, desc } from "drizzle-orm";
import * as schema from "./db/schema";
import { adminAuth } from "./middleware/adminAuth";

type Bindings = { DB: D1Database; ADMIN_DEV_SECRET?: string };

export const admin = new Hono<{ Bindings: Bindings }>();
admin.use("*", adminAuth);

function missingFields(body: Record<string, unknown>, fields: string[]) {
  return fields.filter((f) => body[f] === undefined || body[f] === null || body[f] === "");
}

// --- Profil (+ hero stats) -----------------------------------------------

admin.put("/profile", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const body = await c.req.json<Record<string, any>>();
  const { heroStats, ...profileFields } = body;

  const [existing] = await db.select().from(schema.profile).where(eq(schema.profile.id, 1));
  const row: Record<string, any> = { ...profileFields, id: 1, updatedAt: new Date().toISOString() };
  if (existing) {
    await db.update(schema.profile).set(row).where(eq(schema.profile.id, 1));
  } else {
    if (!row.name) return c.json({ error: "missing_fields", fields: ["name"] }, 400);
    await db.insert(schema.profile).values(row as typeof schema.profile.$inferInsert);
  }

  if (Array.isArray(heroStats)) {
    await db.delete(schema.heroStats);
    for (const [i, s] of heroStats.entries()) {
      await db.insert(schema.heroStats).values({ value: s.value, label: s.label, position: i });
    }
  }

  return c.json({ ok: true });
});

// --- Groups (expériences / missions) -------------------------------------

admin.post("/groups", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const body = await c.req.json<Record<string, any>>();
  const missing = missingFields(body, ["id", "kind", "company"]);
  if (missing.length) return c.json({ error: "missing_fields", fields: missing }, 400);

  const [existing] = await db.select().from(schema.groups).where(eq(schema.groups.id, body.id));
  if (existing) return c.json({ error: "id_already_exists" }, 409);

  await db.insert(schema.groups).values({
    id: body.id, kind: body.kind, company: body.company, shortName: body.shortName ?? null,
    position: body.position ?? null, duration: body.duration ?? null, location: body.location ?? null,
    current: body.current ?? false, description: body.description ?? null, logo: body.logo ?? null,
    sortOrder: body.sortOrder ?? 0,
  });
  await replaceGroupAchievements(db, body.id, body.achievements);
  await replaceGroupStats(db, body.id, body.stats);
  return c.json({ ok: true, id: body.id }, 201);
});

admin.put("/groups/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = c.req.param("id");
  const body = await c.req.json<Record<string, any>>();
  const [existing] = await db.select().from(schema.groups).where(eq(schema.groups.id, id));
  if (!existing) return c.json({ error: "not_found" }, 404);

  await db.update(schema.groups).set({
    kind: body.kind ?? existing.kind, company: body.company ?? existing.company,
    shortName: body.shortName ?? existing.shortName, position: body.position ?? existing.position,
    duration: body.duration ?? existing.duration, location: body.location ?? existing.location,
    current: body.current ?? existing.current, description: body.description ?? existing.description,
    logo: body.logo ?? existing.logo, sortOrder: body.sortOrder ?? existing.sortOrder,
  }).where(eq(schema.groups.id, id));

  if (body.achievements !== undefined) await replaceGroupAchievements(db, id, body.achievements);
  if (body.stats !== undefined) await replaceGroupStats(db, id, body.stats);
  return c.json({ ok: true });
});

admin.delete("/groups/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = c.req.param("id");
  const [blockingProject] = await db.select().from(schema.projects).where(eq(schema.projects.groupId, id));
  const [blockingReference] = await db.select().from(schema.references).where(eq(schema.references.groupId, id));
  if (blockingProject || blockingReference) {
    return c.json({ error: "group_in_use", detail: "des projets ou références pointent encore vers ce groupe" }, 409);
  }
  await db.delete(schema.groupAchievements).where(eq(schema.groupAchievements.groupId, id));
  await db.delete(schema.groupStats).where(eq(schema.groupStats.groupId, id));
  const result = await db.delete(schema.groups).where(eq(schema.groups.id, id));
  if (!result.meta.changes) return c.json({ error: "not_found" }, 404);
  return c.json({ ok: true });
});

async function replaceGroupAchievements(db: ReturnType<typeof drizzle>, groupId: string, achievements?: string[]) {
  if (!Array.isArray(achievements)) return;
  await db.delete(schema.groupAchievements).where(eq(schema.groupAchievements.groupId, groupId));
  for (const [i, text] of achievements.entries()) {
    await db.insert(schema.groupAchievements).values({ groupId, text, position: i });
  }
}

async function replaceGroupStats(db: ReturnType<typeof drizzle>, groupId: string, stats?: { value: string; label: string; icon?: string }[]) {
  if (!Array.isArray(stats)) return;
  await db.delete(schema.groupStats).where(eq(schema.groupStats.groupId, groupId));
  for (const [i, s] of stats.entries()) {
    await db.insert(schema.groupStats).values({ groupId, value: s.value, label: s.label, icon: s.icon ?? null, position: i });
  }
}

// --- Projects --------------------------------------------------------------

admin.post("/projects", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const body = await c.req.json<Record<string, any>>();
  const missing = missingFields(body, ["title", "slug"]);
  if (missing.length) return c.json({ error: "missing_fields", fields: missing }, 400);

  const [existing] = await db.select().from(schema.projects).where(eq(schema.projects.slug, body.slug));
  if (existing) return c.json({ error: "slug_already_exists" }, 409);

  const [inserted] = await db.insert(schema.projects).values(projectRow(body)).returning({ id: schema.projects.id });
  await replaceProjectTechnologies(db, inserted.id, body.technologies);
  await replaceProjectImages(db, inserted.id, body.images);
  return c.json({ ok: true, id: inserted.id }, 201);
});

admin.put("/projects/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  const body = await c.req.json<Record<string, any>>();
  const [existing] = await db.select().from(schema.projects).where(eq(schema.projects.id, id));
  if (!existing) return c.json({ error: "not_found" }, 404);

  await db.update(schema.projects).set(projectRow({ ...existing, ...body })).where(eq(schema.projects.id, id));
  if (body.technologies !== undefined) await replaceProjectTechnologies(db, id, body.technologies);
  if (body.images !== undefined) await replaceProjectImages(db, id, body.images);
  return c.json({ ok: true });
});

admin.delete("/projects/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  await db.delete(schema.projectTechnologies).where(eq(schema.projectTechnologies.projectId, id));
  await db.delete(schema.projectImages).where(eq(schema.projectImages.projectId, id));
  const result = await db.delete(schema.projects).where(eq(schema.projects.id, id));
  if (!result.meta.changes) return c.json({ error: "not_found" }, 404);
  return c.json({ ok: true });
});

function projectRow(p: Record<string, any>) {
  return {
    groupId: p.groupId ?? null, title: p.title, slug: p.slug,
    category: p.category ?? null, status: p.status ?? null, featured: p.featured ?? false,
    description: p.description ?? null, challenges: p.challenges ?? null, impact: p.impact ?? null,
    video: p.video ?? null, github: p.github ?? null, demo: p.demo ?? null, dockerhub: p.dockerhub ?? null,
    sortOrder: p.sortOrder ?? 0,
  };
}

async function replaceProjectTechnologies(db: ReturnType<typeof drizzle>, projectId: number, technologies?: string[]) {
  if (!Array.isArray(technologies)) return;
  await db.delete(schema.projectTechnologies).where(eq(schema.projectTechnologies.projectId, projectId));
  for (const [i, technology] of technologies.entries()) {
    await db.insert(schema.projectTechnologies).values({ projectId, technology, position: i });
  }
}

async function replaceProjectImages(db: ReturnType<typeof drizzle>, projectId: number, images?: string[]) {
  if (!Array.isArray(images)) return;
  await db.delete(schema.projectImages).where(eq(schema.projectImages.projectId, projectId));
  for (const [i, url] of images.entries()) {
    await db.insert(schema.projectImages).values({ projectId, url, position: i });
  }
}

// --- Skills ------------------------------------------------------------

admin.post("/skills", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const body = await c.req.json<Record<string, any>>();
  const missing = missingFields(body, ["groupKey", "name"]);
  if (missing.length) return c.json({ error: "missing_fields", fields: missing }, 400);

  const [inserted] = await db.insert(schema.skills).values({
    groupKey: body.groupKey, name: body.name, level: body.level ?? null, icon: body.icon ?? null,
    sortOrder: body.sortOrder ?? 0,
  }).returning({ id: schema.skills.id });
  await replaceSkillDetails(db, inserted.id, body.details);
  return c.json({ ok: true, id: inserted.id }, 201);
});

admin.put("/skills/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  const body = await c.req.json<Record<string, any>>();
  const [existing] = await db.select().from(schema.skills).where(eq(schema.skills.id, id));
  if (!existing) return c.json({ error: "not_found" }, 404);

  await db.update(schema.skills).set({
    groupKey: body.groupKey ?? existing.groupKey, name: body.name ?? existing.name,
    level: body.level ?? existing.level, icon: body.icon ?? existing.icon,
    sortOrder: body.sortOrder ?? existing.sortOrder,
  }).where(eq(schema.skills.id, id));
  if (body.details !== undefined) await replaceSkillDetails(db, id, body.details);
  return c.json({ ok: true });
});

admin.delete("/skills/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  await db.delete(schema.skillDetails).where(eq(schema.skillDetails.skillId, id));
  const result = await db.delete(schema.skills).where(eq(schema.skills.id, id));
  if (!result.meta.changes) return c.json({ error: "not_found" }, 404);
  return c.json({ ok: true });
});

async function replaceSkillDetails(db: ReturnType<typeof drizzle>, skillId: number, details?: string[]) {
  if (!Array.isArray(details)) return;
  await db.delete(schema.skillDetails).where(eq(schema.skillDetails.skillId, skillId));
  for (const [i, text] of details.entries()) {
    await db.insert(schema.skillDetails).values({ skillId, text, position: i });
  }
}

// --- Education -----------------------------------------------------------

admin.post("/education", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const body = await c.req.json<Record<string, any>>();
  const missing = missingFields(body, ["institution"]);
  if (missing.length) return c.json({ error: "missing_fields", fields: missing }, 400);

  const [inserted] = await db.insert(schema.education).values({
    institution: body.institution, degree: body.degree ?? null, duration: body.duration ?? null,
    location: body.location ?? null, description: body.description ?? null, sortOrder: body.sortOrder ?? 0,
  }).returning({ id: schema.education.id });
  await replaceEducationCourses(db, inserted.id, body.courses);
  return c.json({ ok: true, id: inserted.id }, 201);
});

admin.put("/education/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  const body = await c.req.json<Record<string, any>>();
  const [existing] = await db.select().from(schema.education).where(eq(schema.education.id, id));
  if (!existing) return c.json({ error: "not_found" }, 404);

  await db.update(schema.education).set({
    institution: body.institution ?? existing.institution, degree: body.degree ?? existing.degree,
    duration: body.duration ?? existing.duration, location: body.location ?? existing.location,
    description: body.description ?? existing.description, sortOrder: body.sortOrder ?? existing.sortOrder,
  }).where(eq(schema.education.id, id));
  if (body.courses !== undefined) await replaceEducationCourses(db, id, body.courses);
  return c.json({ ok: true });
});

admin.delete("/education/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  await db.delete(schema.educationCourses).where(eq(schema.educationCourses.educationId, id));
  const result = await db.delete(schema.education).where(eq(schema.education.id, id));
  if (!result.meta.changes) return c.json({ error: "not_found" }, 404);
  return c.json({ ok: true });
});

async function replaceEducationCourses(db: ReturnType<typeof drizzle>, educationId: number, courses?: string[]) {
  if (!Array.isArray(courses)) return;
  await db.delete(schema.educationCourses).where(eq(schema.educationCourses.educationId, educationId));
  for (const [i, course] of courses.entries()) {
    await db.insert(schema.educationCourses).values({ educationId, course, position: i });
  }
}

// --- Academic (singleton) -------------------------------------------------

admin.put("/academic", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const body = await c.req.json<Record<string, any>>();
  const [existing] = await db.select().from(schema.academic).where(eq(schema.academic.id, 1));
  const row = {
    id: 1, currentYear: body.currentYear ?? existing?.currentYear ?? null,
    totalYears: body.totalYears ?? existing?.totalYears ?? null, average: body.average ?? existing?.average ?? null,
    specialization: body.specialization ?? existing?.specialization ?? null,
    graduationYear: body.graduationYear ?? existing?.graduationYear ?? null,
  };
  if (existing) await db.update(schema.academic).set(row).where(eq(schema.academic.id, 1));
  else await db.insert(schema.academic).values(row);
  return c.json({ ok: true });
});

// --- Petites listes plates : method / interests / languages / references --

admin.post("/method", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const body = await c.req.json<Record<string, any>>();
  const missing = missingFields(body, ["title"]);
  if (missing.length) return c.json({ error: "missing_fields", fields: missing }, 400);
  const [inserted] = await db.insert(schema.method).values({
    icon: body.icon ?? null, title: body.title, text: body.text ?? null, position: body.position ?? 0,
  }).returning({ id: schema.method.id });
  return c.json({ ok: true, id: inserted.id }, 201);
});
admin.put("/method/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  const body = await c.req.json<Record<string, any>>();
  const [existing] = await db.select().from(schema.method).where(eq(schema.method.id, id));
  if (!existing) return c.json({ error: "not_found" }, 404);
  await db.update(schema.method).set({
    icon: body.icon ?? existing.icon, title: body.title ?? existing.title,
    text: body.text ?? existing.text, position: body.position ?? existing.position,
  }).where(eq(schema.method.id, id));
  return c.json({ ok: true });
});
admin.delete("/method/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const result = await db.delete(schema.method).where(eq(schema.method.id, Number(c.req.param("id"))));
  if (!result.meta.changes) return c.json({ error: "not_found" }, 404);
  return c.json({ ok: true });
});

admin.post("/interests", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const body = await c.req.json<Record<string, any>>();
  const missing = missingFields(body, ["text"]);
  if (missing.length) return c.json({ error: "missing_fields", fields: missing }, 400);
  const [inserted] = await db.insert(schema.interests).values({ text: body.text, position: body.position ?? 0 })
    .returning({ id: schema.interests.id });
  return c.json({ ok: true, id: inserted.id }, 201);
});
admin.put("/interests/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  const body = await c.req.json<Record<string, any>>();
  const [existing] = await db.select().from(schema.interests).where(eq(schema.interests.id, id));
  if (!existing) return c.json({ error: "not_found" }, 404);
  await db.update(schema.interests).set({
    text: body.text ?? existing.text, position: body.position ?? existing.position,
  }).where(eq(schema.interests.id, id));
  return c.json({ ok: true });
});
admin.delete("/interests/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const result = await db.delete(schema.interests).where(eq(schema.interests.id, Number(c.req.param("id"))));
  if (!result.meta.changes) return c.json({ error: "not_found" }, 404);
  return c.json({ ok: true });
});

admin.post("/languages", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const body = await c.req.json<Record<string, any>>();
  const missing = missingFields(body, ["name"]);
  if (missing.length) return c.json({ error: "missing_fields", fields: missing }, 400);
  const [inserted] = await db.insert(schema.languages).values({
    name: body.name, level: body.level ?? null, position: body.position ?? 0,
  }).returning({ id: schema.languages.id });
  return c.json({ ok: true, id: inserted.id }, 201);
});
admin.put("/languages/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  const body = await c.req.json<Record<string, any>>();
  const [existing] = await db.select().from(schema.languages).where(eq(schema.languages.id, id));
  if (!existing) return c.json({ error: "not_found" }, 404);
  await db.update(schema.languages).set({
    name: body.name ?? existing.name, level: body.level ?? existing.level,
    position: body.position ?? existing.position,
  }).where(eq(schema.languages.id, id));
  return c.json({ ok: true });
});
admin.delete("/languages/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const result = await db.delete(schema.languages).where(eq(schema.languages.id, Number(c.req.param("id"))));
  if (!result.meta.changes) return c.json({ error: "not_found" }, 404);
  return c.json({ ok: true });
});

admin.post("/references", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const body = await c.req.json<Record<string, any>>();
  const missing = missingFields(body, ["name"]);
  if (missing.length) return c.json({ error: "missing_fields", fields: missing }, 400);
  const [inserted] = await db.insert(schema.references).values({
    groupId: body.groupId ?? null, name: body.name, role: body.role ?? null, company: body.company ?? null,
    email: body.email ?? null, phone: body.phone ?? null, linkedin: body.linkedin ?? null,
  }).returning({ id: schema.references.id });
  return c.json({ ok: true, id: inserted.id }, 201);
});
admin.put("/references/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  const body = await c.req.json<Record<string, any>>();
  const [existing] = await db.select().from(schema.references).where(eq(schema.references.id, id));
  if (!existing) return c.json({ error: "not_found" }, 404);
  await db.update(schema.references).set({
    groupId: body.groupId ?? existing.groupId, name: body.name ?? existing.name,
    role: body.role ?? existing.role, company: body.company ?? existing.company,
    email: body.email ?? existing.email, phone: body.phone ?? existing.phone,
    linkedin: body.linkedin ?? existing.linkedin,
  }).where(eq(schema.references.id, id));
  return c.json({ ok: true });
});
admin.delete("/references/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const result = await db.delete(schema.references).where(eq(schema.references.id, Number(c.req.param("id"))));
  if (!result.meta.changes) return c.json({ error: "not_found" }, 404);
  return c.json({ ok: true });
});

admin.put("/site-meta/:key", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const key = c.req.param("key");
  const body = await c.req.json<{ value: string }>();
  const [existing] = await db.select().from(schema.siteMeta).where(eq(schema.siteMeta.key, key));
  if (existing) await db.update(schema.siteMeta).set({ value: body.value }).where(eq(schema.siteMeta.key, key));
  else await db.insert(schema.siteMeta).values({ key, value: body.value });
  return c.json({ ok: true });
});

// --- Contact (lecture + suppression des messages reçus) --------------------

admin.get("/contact", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const rows = await db.select().from(schema.contactMessages).orderBy(desc(schema.contactMessages.createdAt));
  return c.json(rows);
});

admin.delete("/contact/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const result = await db.delete(schema.contactMessages).where(eq(schema.contactMessages.id, Number(c.req.param("id"))));
  if (!result.meta.changes) return c.json({ error: "not_found" }, 404);
  return c.json({ ok: true });
});

// --- Analytics (lecture) ---------------------------------------------------

admin.get("/analytics", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const rows = await db.select().from(schema.pageViews);
  const totalViews = rows.length;
  const uniqueVisitors = new Set(rows.map((r) => r.sessionHash)).size;
  const byPath: Record<string, number> = {};
  for (const r of rows) byPath[r.path] = (byPath[r.path] ?? 0) + 1;
  return c.json({ totalViews, uniqueVisitors, byPath });
});
