// Beacon maison vers le Worker Cloudflare (POST /api/analytics/beacon).
// Pas de cookie tiers ni d'identifiant persistant : juste un hash de session
// (sessionStorage, effacé à la fermeture de l'onglet) pour distinguer les visiteurs.
const SESSION_KEY = 'portfolio_session_hash';

function getSessionHash() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

export function trackPageView() {
  const apiUrl = process.env.REACT_APP_API_URL;
  if (!apiUrl) return;

  const payload = JSON.stringify({
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    sessionHash: getSessionHash(),
  });
  const url = `${apiUrl}/api/analytics/beacon`;

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([payload], { type: 'application/json' }));
  } else {
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(() => {});
  }
}
