import React, { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';
import { publicGet, adminSend, linesToArray, arrayToLines } from '../../lib/adminApi';

const FIELDS = [
  ['name', 'Nom complet'],
  ['displayName', 'Nom affiché (Hero)'],
  ['title', 'Titre'],
  ['year', 'Année / niveau'],
  ['university', 'Établissement'],
  ['location', 'Localisation'],
  ['email', 'E-mail'],
  ['github', 'GitHub (URL)'],
  ['linkedin', 'LinkedIn (URL)'],
  ['avatar', 'Photo (chemin, ex. /images/moi.jpg)'],
];

const ProfileTab = ({ token }) => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    publicGet('/api/profile')
      .then((p) => setForm({
        ...p,
        phonesText: arrayToLines(p.phones),
      }))
      .catch(() => toast({ variant: 'destructive', title: 'Chargement du profil impossible' }));
  }, []);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminSend(token, '/api/admin/profile', 'PUT', {
        ...form,
        phones: linesToArray(form.phonesText),
      });
      toast({ title: 'Profil enregistré' });
    } catch {
      toast({ variant: 'destructive', title: 'Enregistrement impossible' });
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <p className="mt-6 text-sm text-muted-foreground">Chargement…</p>;

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Identité</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {FIELDS.map(([key, label]) => (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={key}>{label}</Label>
              <Input id={key} value={form[key] ?? ''} onChange={set(key)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Téléphones (un par ligne)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea rows={2} value={form.phonesText} onChange={set('phonesText')} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sous-titre, accroche, bio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="subtitle">Sous-titre (Hero)</Label>
            <Textarea id="subtitle" rows={2} value={form.subtitle ?? ''} onChange={set('subtitle')} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tagline">Citation (Hero)</Label>
            <Textarea id="tagline" rows={2} value={form.tagline ?? ''} onChange={set('tagline')} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio (section "Qui suis-je")</Label>
            <Textarea id="bio" rows={6} value={form.bio ?? ''} onChange={set('bio')} />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={saving} className="gap-2">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
        Enregistrer
      </Button>
    </form>
  );
};

export default ProfileTab;
