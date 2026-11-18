import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import { adminGet } from '../lib/adminApi';
import SectionsTab from './admin/SectionsTab';
import ProfileTab from './admin/ProfileTab';
import ExperienceTab from './admin/ExperienceTab';
import ProjectsTab from './admin/ProjectsTab';
import EducationTab from './admin/EducationTab';
import MessagesTab from './admin/MessagesTab';
import AnalyticsTab from './admin/AnalyticsTab';

// Page d'administration : CRUD complet sur le contenu du site (profil,
// expériences, réalisations, formation), visibilité des sections, messages
// de contact et statistiques de visite. Protégée côté Worker par Cloudflare
// Access en production (en-tête Cf-Access-Authenticated-User-Email) ; en
// local, par le jeton ADMIN_DEV_SECRET saisi ci-dessous (voir api/.dev.vars,
// non versionné).
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
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const tryAuth = async (currentToken) => {
    setLoading(true);
    try {
      await adminGet(currentToken, '/api/admin/analytics');
      setAuthorized(true);
      try {
        sessionStorage.setItem(TOKEN_KEY, currentToken);
      } catch {
        // sessionStorage indisponible (navigation privée...) : on continue sans persister.
      }
    } catch {
      setAuthorized(false);
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
    if (token) tryAuth(token);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    tryAuth(token);
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

      {authorized && (
        <Tabs defaultValue="sections" className="mt-10">
          <TabsList className="flex h-auto flex-wrap justify-start gap-1">
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="experience">Expériences</TabsTrigger>
            <TabsTrigger value="projects">Réalisations</TabsTrigger>
            <TabsTrigger value="education">Formation</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="analytics">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="sections"><SectionsTab token={token} /></TabsContent>
          <TabsContent value="profile"><ProfileTab token={token} /></TabsContent>
          <TabsContent value="experience"><ExperienceTab token={token} /></TabsContent>
          <TabsContent value="projects"><ProjectsTab token={token} /></TabsContent>
          <TabsContent value="education"><EducationTab token={token} /></TabsContent>
          <TabsContent value="messages"><MessagesTab token={token} /></TabsContent>
          <TabsContent value="analytics"><AnalyticsTab token={token} /></TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Admin;
