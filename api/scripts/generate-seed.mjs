// Transforme mockdata-normalized.json (produit par export-mockdata.mjs) en
// instructions SQL d'insertion, dans l'ordre des dépendances de clés étrangères.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IN_PATH = join(__dirname, ".data/mockdata-normalized.json");
// Volontairement HORS de drizzle/ : ce dossier est "migrations_dir" dans
// wrangler.toml, donc tout .sql qui y traîne est auto-détecté et exécuté par
// `wrangler d1 migrations apply` comme une vraie migration (pas ce qu'on veut
// pour un seed, rejoué à la main via `wrangler d1 execute --file=`).
const OUT_PATH = join(__dirname, "../seed.sql");

function sql(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "boolean") return value ? "1" : "0";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return sql(JSON.stringify(value));
  return `'${String(value).replace(/'/g, "''")}'`;
}

function insert(table, columns, row) {
  const values = columns.map((col) => sql(row[col]));
  return `INSERT INTO "${table}" (${columns.join(", ")}) VALUES (${values.join(", ")});`;
}

async function main() {
  const data = JSON.parse(await readFile(IN_PATH, "utf-8"));
  const lines = [];

  lines.push("-- Généré par scripts/generate-seed.mjs — ne pas éditer à la main.");
  lines.push('DELETE FROM page_views; DELETE FROM site_meta; DELETE FROM "references";');
  lines.push("DELETE FROM languages; DELETE FROM interests; DELETE FROM method;");
  lines.push("DELETE FROM education_courses; DELETE FROM education; DELETE FROM academic;");
  lines.push("DELETE FROM skill_details; DELETE FROM skills;");
  lines.push("DELETE FROM project_images; DELETE FROM project_technologies; DELETE FROM projects;");
  lines.push('DELETE FROM group_stats; DELETE FROM group_achievements; DELETE FROM "groups";');
  lines.push("DELETE FROM hero_stats; DELETE FROM profile;");

  lines.push(insert("profile", [
    "id", "name", "title", "year", "university", "location", "email", "phones",
    "github", "linkedin", "avatar", "display_name", "subtitle", "tagline", "bio",
    "hero_highlight_title",
  ], {
    ...data.profile,
    display_name: data.profile.displayName,
    hero_highlight_title: data.profile.heroHighlightTitle,
  }));

  for (const s of data.heroStats) {
    lines.push(insert("hero_stats", ["value", "label", "position"], s));
  }

  for (const g of data.groups) {
    lines.push(insert("groups", [
      "id", "kind", "company", "short_name", "position", "duration", "location",
      "current", "description", "logo", "sort_order",
    ], { ...g, short_name: g.shortName, sort_order: g.sortOrder }));

    g.achievements.forEach((text, i) => {
      lines.push(insert("group_achievements", ["group_id", "text", "position"], {
        group_id: g.id, text, position: i,
      }));
    });
    g.stats.forEach((s, i) => {
      lines.push(insert("group_stats", ["group_id", "value", "label", "icon", "position"], {
        group_id: g.id, value: s.value, label: s.label, icon: s.icon ?? null, position: i,
      }));
    });
  }

  for (const p of data.projects) {
    lines.push(`INSERT INTO projects (group_id, title, slug, emoji, category, status, featured, description, challenges, impact, video, github, demo, dockerhub, sort_order) VALUES (${[
      sql(p.groupId), sql(p.title), sql(p.slug), sql(p.emoji), sql(p.category), sql(p.status),
      sql(p.featured), sql(p.description), sql(p.challenges), sql(p.impact), sql(p.video),
      sql(p.github), sql(p.demo), sql(p.dockerhub), sql(p.sortOrder),
    ].join(", ")});`);
    lines.push(`-- project_technologies / project_images pour "${p.slug}" référencent last_insert_rowid()`);
    p.technologies.forEach((technology, i) => {
      lines.push(`INSERT INTO project_technologies (project_id, technology, position) VALUES ((SELECT id FROM projects WHERE slug = ${sql(p.slug)}), ${sql(technology)}, ${i});`);
    });
    p.images.forEach((url, i) => {
      lines.push(`INSERT INTO project_images (project_id, url, position) VALUES ((SELECT id FROM projects WHERE slug = ${sql(p.slug)}), ${sql(url)}, ${i});`);
    });
  }

  for (const s of data.skills) {
    lines.push(`INSERT INTO skills (group_key, name, level, icon, sort_order) VALUES (${[
      sql(s.groupKey), sql(s.name), sql(s.level), sql(s.icon), sql(s.sortOrder),
    ].join(", ")});`);
    s.details.forEach((text, i) => {
      lines.push(`INSERT INTO skill_details (skill_id, text, position) VALUES ((SELECT id FROM skills WHERE name = ${sql(s.name)}), ${sql(text)}, ${i});`);
    });
  }

  for (const e of data.education) {
    lines.push(`INSERT INTO education (institution, degree, duration, location, description, sort_order) VALUES (${[
      sql(e.institution), sql(e.degree), sql(e.duration), sql(e.location), sql(e.description), sql(e.sortOrder),
    ].join(", ")});`);
    e.courses.forEach((course, i) => {
      lines.push(`INSERT INTO education_courses (education_id, course, position) VALUES ((SELECT id FROM education WHERE sort_order = ${sql(e.sortOrder)}), ${sql(course)}, ${i});`);
    });
  }

  lines.push(insert("academic", [
    "id", "current_year", "total_years", "average", "specialization", "graduation_year",
  ], {
    id: 1,
    current_year: data.academic.currentYear,
    total_years: data.academic.totalYears,
    average: data.academic.average,
    specialization: data.academic.specialization,
    graduation_year: data.academic.graduationYear,
  }));

  for (const m of data.method) {
    lines.push(insert("method", ["icon", "title", "text", "position"], m));
  }
  for (const i of data.interests) {
    lines.push(insert("interests", ["text", "position"], i));
  }
  for (const l of data.languages) {
    lines.push(insert("languages", ["name", "level", "position"], l));
  }
  for (const r of data.references) {
    lines.push(insert("references", ["group_id", "name", "role", "company", "email", "phone", "linkedin"], {
      ...r, group_id: r.groupId,
    }));
  }
  for (const m of data.siteMeta) {
    lines.push(insert("site_meta", ["key", "value"], m));
  }

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, lines.join("\n") + "\n", "utf-8");
  console.log(`OK — ${lines.length} instructions SQL écrites dans ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
