// Petits helpers HTTP partagés par les onglets de /admin : lecture publique
// (mêmes endpoints que le site, pas besoin de jeton) et écriture protégée
// (/api/admin/*, jeton Bearer — Cloudflare Access en prod, ADMIN_DEV_SECRET
// en local, voir api/src/middleware/adminAuth.ts).
const API_URL = process.env.REACT_APP_API_URL;

export async function publicGet(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`request_failed:${path}`);
  return res.json();
}

async function parseError(res) {
  try {
    const body = await res.json();
    return body?.error || `http_${res.status}`;
  } catch {
    return `http_${res.status}`;
  }
}

export async function adminGet(token, path) {
  const res = await fetch(`${API_URL}${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function adminSend(token, path, method, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json().catch(() => ({}));
}

export async function adminUpload(token, path, file) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}${path}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function adminDelete(token, path) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await parseError(res));
  return true;
}

// --- Conversions pour les champs "liste" affichés comme un item par ligne ---

export function linesToArray(text) {
  return text.split('\n').map((line) => line.trim()).filter(Boolean);
}

export function arrayToLines(arr) {
  return (arr || []).join('\n');
}

// Lignes au format "value | label | icon" (icon optionnel) pour les stats.
export function linesToStats(text) {
  return linesToArray(text).map((line) => {
    const [value, label, icon] = line.split('|').map((part) => part.trim());
    return { value: value || '', label: label || '', icon: icon || undefined };
  });
}

export function statsToLines(stats) {
  return (stats || []).map((s) => [s.value, s.label, s.icon].filter((v) => v !== undefined && v !== '').join(' | ')).join('\n');
}
