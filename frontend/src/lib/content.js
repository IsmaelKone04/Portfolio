// Récupère le contenu du site depuis l'API Cloudflare (pilotable depuis /admin).
// Si l'API est inatteignable (déploiement pas encore fait, ou site en prod avant
// que le Worker ne soit déployé), on retombe sur mockData.js : voir ContentContext.

const API_URL = process.env.REACT_APP_API_URL;
const SKILL_GROUP_KEYS = ['languages', 'frameworks', 'systems', 'tools', 'ai'];

async function getJSON(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`request_failed:${path}`);
  return res.json();
}

export async function fetchContent() {
  if (!API_URL) return null;
  try {
    const [profile, groups, projects, skills, certifications, method, interests, languages, referencesData] =
      await Promise.all([
        getJSON('/api/profile'),
        getJSON('/api/groups'),
        getJSON('/api/projects'),
        getJSON('/api/skills'),
        getJSON('/api/certifications'),
        getJSON('/api/method'),
        getJSON('/api/interests'),
        getJSON('/api/languages'),
        getJSON('/api/references'),
      ]);

    const skillsByGroup = {};
    for (const key of SKILL_GROUP_KEYS) skillsByGroup[key] = [];
    for (const s of skills) {
      if (!skillsByGroup[s.groupKey]) skillsByGroup[s.groupKey] = [];
      skillsByGroup[s.groupKey].push({ name: s.name, level: s.level, icon: s.icon, details: s.details });
    }

    return {
      personal: profile,
      skills: skillsByGroup,
      projectGroups: groups.filter((g) => g.kind === 'group'),
      projects,
      experience: groups.filter((g) => g.kind === 'experience'),
      certifications,
      method,
      interests,
      languages,
      references: referencesData?.references ?? [],
      referencesFallback: referencesData?.fallback ?? null,
    };
  } catch {
    return null;
  }
}

export async function fetchSections() {
  if (!API_URL) return null;
  try {
    return await getJSON('/api/sections');
  } catch {
    return null;
  }
}
