// Vérification one-shot (pas de dépendance de prod) : exécute le schéma + le seed
// réels sur une base SQLite en mémoire via sql.js (pur WASM, pas de compilation
// native) pour confirmer que les migrations générées sont valides avant de les
// envoyer à wrangler/D1.
import { readFileSync } from "node:fs";
import initSqlJs from "sql.js";

const SQL = await initSqlJs();
const db = new SQL.Database();

const schemaSql = readFileSync("drizzle/0000_dusty_apocalypse.sql", "utf-8");
for (const stmt of schemaSql.split("--> statement-breakpoint")) {
  if (stmt.trim()) db.run(stmt);
}

const seedSql = readFileSync("drizzle/seed.sql", "utf-8");
db.run(seedSql);

const tables = [
  "profile", "groups", "projects", "project_technologies", "project_images",
  "skills", "skill_details", "education", "education_courses", "method",
  "interests", "languages", "references", "site_meta", "hero_stats",
  "group_achievements", "group_stats",
];

const counts = {};
for (const t of tables) {
  const res = db.exec(`SELECT COUNT(*) FROM "${t}"`);
  counts[t] = res[0].values[0][0];
}
console.log("Lignes par table :", JSON.stringify(counts, null, 2));

const sample = db.exec("SELECT title, slug, group_id FROM projects LIMIT 3");
console.log("Échantillon projects :", JSON.stringify(sample[0]?.values));

const joined = db.exec(`
  SELECT p.slug, g.company FROM projects p
  JOIN "groups" g ON g.id = p.group_id
  LIMIT 5
`);
console.log("Jointure projects <-> groups :", JSON.stringify(joined[0]?.values));
