import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';
import { publicGet, adminSend } from '../../lib/adminApi';

// Afficher/masquer une section entière du site (contenu conservé, juste
// retiré de la page) et en changer l'ordre d'affichage.
const SectionsTab = ({ token }) => {
  const [sections, setSections] = useState(null);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const { toast } = useToast();

  const load = () => {
    publicGet('/api/sections')
      .then((rows) => setSections([...rows].sort((a, b) => a.sortOrder - b.sortOrder)))
      .catch(() => toast({ variant: 'destructive', title: 'Chargement des sections impossible' }));
    publicGet('/api/settings')
      .then(setSettings)
      .catch(() => toast({ variant: 'destructive', title: 'Chargement des réglages d\'apparence impossible' }));
  };

  useEffect(load, []);

  const toggleSetting = async (metaKey, settingKey) => {
    const nextValue = !settings[settingKey];
    setSavingSettings(true);
    try {
      await adminSend(token, `/api/admin/site-meta/${metaKey}`, 'PUT', { value: String(nextValue) });
      setSettings((prev) => ({ ...prev, [settingKey]: nextValue }));
    } catch {
      toast({ variant: 'destructive', title: 'Enregistrement impossible' });
    } finally {
      setSavingSettings(false);
    }
  };

  const persist = async (next) => {
    setSaving(true);
    try {
      await adminSend(token, '/api/admin/sections', 'PUT', next.map((s, i) => ({ key: s.key, visible: s.visible, sortOrder: i })));
      setSections(next.map((s, i) => ({ ...s, sortOrder: i })));
    } catch {
      toast({ variant: 'destructive', title: 'Enregistrement impossible' });
    } finally {
      setSaving(false);
    }
  };

  const toggle = (key) => {
    const next = sections.map((s) => (s.key === key ? { ...s, visible: !s.visible } : s));
    persist(next);
  };

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    persist(next);
  };

  if (!sections) return <p className="mt-6 text-sm text-muted-foreground">Chargement…</p>;

  return (
    <div className="mt-6 space-y-8">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Apparence</h3>
        <Card>
          <CardContent className="flex items-center justify-between gap-4 pt-6">
            <div>
              <p className="text-sm font-medium text-foreground">Cartes en verre (glassmorphism)</p>
              <p className="text-xs text-muted-foreground">
                Donne à toutes les cartes du site un fond translucide et flouté façon iOS, au lieu du fond
                blanc opaque habituel.
              </p>
            </div>
            {settings && !savingSettings ? (
              <Switch
                checked={settings.glassCards}
                onCheckedChange={() => toggleSetting('uiGlassCards', 'glassCards')}
                aria-label="Activer les cartes en verre"
              />
            ) : (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between gap-4 pt-6">
            <div>
              <p className="text-sm font-medium text-foreground">Bulles animées de l'Accueil</p>
              <p className="text-xs text-muted-foreground">
                Désactive le décor de bulles en mouvement derrière le Hero (garde le reste des animations).
              </p>
            </div>
            {settings && !savingSettings ? (
              <Switch
                checked={settings.bubblesEnabled}
                onCheckedChange={() => toggleSetting('uiBubblesEnabled', 'bubblesEnabled')}
                aria-label="Activer les bulles animées"
              />
            ) : (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Masquer une section la retire du site sans supprimer son contenu. Le Hero
        (en-tête) et les Messages/Statistiques ne sont pas concernés.
      </p>
      {sections.map((s, i) => (
        <Card key={s.key}>
          <CardContent className="flex items-center justify-between gap-4 pt-6">
            <div>
              <p className="text-sm font-medium text-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground">#{s.key}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" disabled={saving || i === 0} onClick={() => move(i, -1)} aria-label="Monter">
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" disabled={saving || i === sections.length - 1} onClick={() => move(i, 1)} aria-label="Descendre">
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Button>
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />
              ) : (
                <Switch checked={s.visible} onCheckedChange={() => toggle(s.key)} aria-label={`Afficher ${s.label}`} />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  );
};

export default SectionsTab;
