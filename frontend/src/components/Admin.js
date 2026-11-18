import React, { useEffect, useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';

// Page d'administration minimale : lecture des messages de contact et des
// statistiques de visite. Protégée côté Worker par Cloudflare Access en
// production (en-tête Cf-Access-Authenticated-User-Email) ; en local, par le
// jeton ADMIN_DEV_SECRET saisi ci-dessous (voir api/.dev.vars, non versionné).
const API_URL = process.env.REACT_APP_API_URL;
const TOKEN_KEY = 'portfolio_admin_token';

const Admin = () => {
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem(TOKEN_KEY) || '';
    } catch {
      return '';
    }
  });
  const [messages, setMessages] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const load = async (currentToken) => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${currentToken}` };
      const [contactRes, analyticsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/contact`, { headers }),
        fetch(`${API_URL}/api/admin/analytics`, { headers }),
      ]);
      if (!contactRes.ok || !analyticsRes.ok) throw new Error('unauthorized');

      setMessages(await contactRes.json());
      setAnalytics(await analyticsRes.json());
      try {
        sessionStorage.setItem(TOKEN_KEY, currentToken);
      } catch {
        // sessionStorage indisponible (navigation privée...) : on continue sans persister.
      }
    } catch {
      setMessages(null);
      setAnalytics(null);
      toast({
        variant: 'destructive',
        title: 'Accès refusé',
        description: "Jeton d'administration invalide ou absent.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) load(token);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    load(token);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('delete_failed');
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch {
      toast({ variant: 'destructive', title: 'Suppression impossible' });
    }
  };

  if (!API_URL) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center text-sm text-muted-foreground">
        API non configurée (REACT_APP_API_URL manquant).
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-xl font-semibold text-foreground">Administration</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <Input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Jeton d'administration"
          autoComplete="off"
        />
        <Button type="submit" disabled={loading || !token}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : 'Charger'}
        </Button>
      </form>

      {analytics && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-foreground">Statistiques de visite</h2>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-2xl font-semibold text-foreground">{analytics.totalViews}</p>
                <p className="text-xs text-muted-foreground">Vues totales</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-2xl font-semibold text-foreground">{analytics.uniqueVisitors}</p>
                <p className="text-xs text-muted-foreground">Visiteurs uniques</p>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Pages vues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {Object.entries(analytics.byPath).map(([path, count]) => (
                <div key={path} className="flex justify-between border-b border-border py-1 text-sm last:border-0">
                  <span className="text-foreground">{path}</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      )}

      {messages && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-foreground">Messages reçus ({messages.length})</h2>
          <div className="mt-3 space-y-3">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground">Aucun message pour le moment.</p>
            )}
            {messages.map((m) => (
              <Card key={m.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.subject}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {m.name} — {m.email} —{' '}
                        {new Date(m.createdAt).toLocaleString('fr-FR')}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(m.id)}
                      aria-label="Supprimer ce message"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                    </Button>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">{m.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Admin;
