import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Profil — une seule ligne (id = 1). Remplace `studentData.personal`.
export const profile = sqliteTable("profile", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title"),
  year: text("year"),
  university: text("university"),
  location: text("location"),
  email: text("email"),
  phones: text("phones", { mode: "json" }).$type<string[]>(),
  github: text("github"),
  linkedin: text("linkedin"),
  avatar: text("avatar"),
  displayName: text("display_name"),
  subtitle: text("subtitle"),
  tagline: text("tagline"),
  bio: text("bio"),
  heroHighlightTitle: text("hero_highlight_title"),
  updatedAt: text("updated_at"),
});

// Cartes de métriques du Hero (studentData.personal.heroHighlight.stats).
export const heroStats = sqliteTable("hero_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  value: text("value").notNull(),
  label: text("label").notNull(),
  position: integer("position").notNull().default(0),
});

// Unifie `experience` (stages) et `projectGroups` (missions hors stage) :
// même usage dans le front (regroupement des réalisations par `groupId`).
export const groups = sqliteTable("groups", {
  id: text("id").primaryKey(), // ex. "1" (ex-experience.id) ou "freelance" (ex-projectGroups.id)
  kind: text("kind", { enum: ["experience", "group"] }).notNull(),
  company: text("company").notNull(),
  shortName: text("short_name"),
  position: text("position"), // intitulé du poste (nom de colonne SQL différent de "ordre")
  duration: text("duration"),
  location: text("location"),
  current: integer("current", { mode: "boolean" }).default(false),
  description: text("description"),
  logo: text("logo"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const groupAchievements = sqliteTable("group_achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  groupId: text("group_id").notNull().references(() => groups.id),
  text: text("text").notNull(),
  position: integer("position").notNull().default(0),
});

export const groupStats = sqliteTable("group_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  groupId: text("group_id").notNull().references(() => groups.id),
  value: text("value").notNull(),
  label: text("label").notNull(),
  icon: text("icon"),
  position: integer("position").notNull().default(0),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  groupId: text("group_id").references(() => groups.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category"),
  status: text("status"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  // Étude de cas (restructuration demandée) : contexte / archi-stack déjà couverts
  // par description + technologies ; défis et impact en champs dédiés.
  description: text("description"),
  challenges: text("challenges"),
  impact: text("impact"),
  video: text("video"),
  github: text("github"),
  demo: text("demo"),
  dockerhub: text("dockerhub"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const projectTechnologies = sqliteTable("project_technologies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull().references(() => projects.id),
  technology: text("technology").notNull(),
  position: integer("position").notNull().default(0),
});

export const projectImages = sqliteTable("project_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull().references(() => projects.id),
  url: text("url").notNull(),
  position: integer("position").notNull().default(0),
});

export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  groupKey: text("group_key", {
    enum: ["languages", "frameworks", "systems", "tools", "ai"],
  }).notNull(),
  name: text("name").notNull(),
  level: integer("level"),
  icon: text("icon"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const skillDetails = sqliteTable("skill_details", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  skillId: integer("skill_id").notNull().references(() => skills.id),
  text: text("text").notNull(),
  position: integer("position").notNull().default(0),
});

export const education = sqliteTable("education", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  institution: text("institution").notNull(),
  degree: text("degree"),
  duration: text("duration"),
  location: text("location"),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const educationCourses = sqliteTable("education_courses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  educationId: integer("education_id").notNull().references(() => education.id),
  course: text("course").notNull(),
  position: integer("position").notNull().default(0),
});

export const academic = sqliteTable("academic", {
  id: integer("id").primaryKey(),
  currentYear: integer("current_year"),
  totalYears: integer("total_years"),
  average: text("average"),
  specialization: text("specialization"),
  graduationYear: integer("graduation_year"),
});

export const method = sqliteTable("method", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  icon: text("icon"),
  title: text("title").notNull(),
  text: text("text"),
  position: integer("position").notNull().default(0),
});

export const interests = sqliteTable("interests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  text: text("text").notNull(),
  position: integer("position").notNull().default(0),
});

export const languages = sqliteTable("languages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  level: text("level"),
  position: integer("position").notNull().default(0),
});

export const references = sqliteTable("references", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  groupId: text("group_id").references(() => groups.id),
  name: text("name").notNull(),
  role: text("role"),
  company: text("company"),
  email: text("email"),
  phone: text("phone"),
  linkedin: text("linkedin"),
});

// Clé/valeur pour les textes singletons restants (ex. referencesFallback).
export const siteMeta = sqliteTable("site_meta", {
  key: text("key").primaryKey(),
  value: text("value"),
});

// Visibilité des sections du site, pilotée depuis /admin (afficher/masquer une
// section entière sans toucher à son contenu).
export const sections = sqliteTable("sections", {
  key: text("key").primaryKey(), // ex. "about", "skills", "projects"...
  label: text("label").notNull(),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

// Diplômes, concours et formations affichés sur la page Certifications.
// Le justificatif (PDF ou image) est stocké dans le bucket R2 "CERTIFICATIONS" ;
// fileUrl est la clé de l'objet dans ce bucket, pas une URL publique directe
// (servie par /api/certifications/:id/file, voir index.ts).
export const certifications = sqliteTable("certifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  type: text("type", { enum: ["diplome", "formation", "concours"] }).notNull(),
  organization: text("organization"),
  date: text("date"),
  description: text("description"),
  fileUrl: text("file_url"),
  fileName: text("file_name"),
  sortOrder: integer("sort_order").notNull().default(0),
});

// Messages reçus via le formulaire de contact du front (POST /api/contact).
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

// Analytics maison — alimentée par un beacon appelé depuis le front.
export const pageViews = sqliteTable("page_views", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  path: text("path").notNull(),
  referrer: text("referrer"),
  sessionHash: text("session_hash"),
  createdAt: text("created_at").notNull(),
});
