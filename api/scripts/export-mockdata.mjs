// Lit frontend/src/data/mockData.js (contenu réel, zéro invention) et produit
// un JSON normalisé à la forme des tables Drizzle (api/src/db/schema.ts).
// Étape 1 de la migration : mockData.js -> JSON -> seed.sql -> D1.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MOCKDATA_PATH = join(__dirname, "../../frontend/src/data/mockData.js");
const OUT_DIR = join(__dirname, ".data");
const OUT_PATH = join(OUT_DIR, "mockdata-normalized.json");

function slugify(title) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function loadStudentData() {
  // mockData.js est de l'ESM pur (export const / export default, pas de JSX/TS) :
  // on le copie tel quel en .mjs dans un répertoire temporaire pour que Node
  // l'importe nativement, sans dépendance de build supplémentaire.
  const source = await readFile(MOCKDATA_PATH, "utf-8");
  const tmpFile = join(tmpdir(), `mockdata-${Date.now()}.mjs`);
  await writeFile(tmpFile, source, "utf-8");
  const mod = await import(pathToFileURL(tmpFile).href);
  return mod.studentData ?? mod.default;
}

function buildGroups(studentData) {
  const fromExperience = studentData.experience.map((exp) => ({
    id: String(exp.id),
    kind: "experience",
    company: exp.company,
    shortName: exp.shortName ?? null,
    position: exp.position ?? null,
    duration: exp.duration ?? null,
    location: exp.location ?? null,
    current: Boolean(exp.current),
    description: exp.description ?? null,
    logo: exp.logo ?? null,
    achievements: exp.achievements ?? [],
    stats: exp.stats ?? [],
  }));

  const fromProjectGroups = (studentData.projectGroups ?? []).map((g) => ({
    id: String(g.id),
    kind: "group",
    company: g.company,
    shortName: g.shortName ?? null,
    position: g.position ?? null,
    duration: g.duration ?? null,
    location: g.location ?? null,
    current: false,
    description: g.description ?? null,
    logo: g.logo ?? null,
    achievements: [],
    stats: [],
  }));

  return [...fromExperience, ...fromProjectGroups].map((g, index) => ({
    ...g,
    sortOrder: index,
  }));
}

function buildProjects(studentData) {
  const usedSlugs = new Set();
  return studentData.projects.map((p, index) => {
    let slug = slugify(p.title);
    let candidate = slug;
    let n = 2;
    while (usedSlugs.has(candidate)) {
      candidate = `${slug}-${n++}`;
    }
    usedSlugs.add(candidate);

    return {
      groupId: String(p.groupId),
      title: p.title,
      slug: candidate,
      category: p.category ?? null,
      status: p.status ?? null,
      featured: Boolean(p.featured),
      description: p.description ?? null,
      challenges: p.challenges ?? null,
      impact: p.impact ?? null,
      video: p.video ?? null,
      github: p.github ?? null,
      demo: p.demo ?? null,
      dockerhub: p.dockerhub ?? null,
      sortOrder: index,
      technologies: p.technologies ?? [],
      images: p.images ?? [],
    };
  });
}

function buildSkills(studentData) {
  const groups = ["languages", "frameworks", "systems", "tools", "ai"];
  const result = [];
  for (const groupKey of groups) {
    const list = studentData.skills[groupKey] ?? [];
    list.forEach((skill, index) => {
      result.push({
        groupKey,
        name: skill.name,
        level: typeof skill.level === "number" ? skill.level : null,
        icon: skill.icon ?? null,
        sortOrder: index,
        details: skill.details ?? [],
      });
    });
  }
  return result;
}

function buildEducation(studentData) {
  return (studentData.education ?? []).map((e, index) => ({
    institution: e.institution,
    degree: e.degree ?? null,
    duration: e.duration ?? null,
    location: e.location ?? null,
    description: e.description ?? null,
    sortOrder: index,
    courses: e.courses ?? [],
  }));
}

async function main() {
  const studentData = await loadStudentData();

  const normalized = {
    profile: {
      id: 1,
      name: studentData.personal.name,
      title: studentData.personal.title ?? null,
      year: studentData.personal.year ?? null,
      university: studentData.personal.university ?? null,
      location: studentData.personal.location ?? null,
      email: studentData.personal.email ?? null,
      phones: studentData.personal.phones ?? [],
      github: studentData.personal.github ?? null,
      linkedin: studentData.personal.linkedin ?? null,
      avatar: studentData.personal.avatar ?? null,
      displayName: studentData.personal.displayName ?? null,
      subtitle: studentData.personal.subtitle ?? null,
      tagline: studentData.personal.tagline ?? null,
      bio: studentData.personal.bio ?? null,
      heroHighlightTitle: studentData.personal.heroHighlight?.title ?? null,
    },
    heroStats: (studentData.personal.heroHighlight?.stats ?? []).map((s, i) => ({
      value: s.value,
      label: s.label,
      position: i,
    })),
    groups: buildGroups(studentData),
    projects: buildProjects(studentData),
    skills: buildSkills(studentData),
    education: buildEducation(studentData),
    academic: { id: 1, ...studentData.academic },
    method: (studentData.method ?? []).map((m, i) => ({ ...m, position: i })),
    interests: (studentData.interests ?? []).map((text, i) => ({ text, position: i })),
    languages: (studentData.languages ?? []).map((l, i) => ({ ...l, position: i })),
    references: (studentData.references ?? []).map((r) => ({
      ...r,
      groupId: r.groupId != null ? String(r.groupId) : null,
    })),
    siteMeta: [{ key: "referencesFallback", value: studentData.referencesFallback ?? null }],
  };

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(normalized, null, 2), "utf-8");

  console.log(`OK — ${normalized.projects.length} projets, ${normalized.groups.length} groupes, ` +
    `${normalized.skills.length} compétences, ${normalized.education.length} formations.`);
  console.log(`Écrit : ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
