import React, { useEffect, useState } from 'react';
import { Loader2, Save, Trash2, Plus, Pencil, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../../hooks/use-toast';
import { publicGet, adminSend, adminDelete, linesToArray, arrayToLines, linesToStats, statsToLines } from '../../lib/adminApi';

const emptyForm = {
  id: '', kind: 'experience', company: '', shortName: '', position: '', duration: '',
  location: '', current: false, description: '', logo: '', sortOrder: 0,
  achievementsText: '', statsText: '',
};

const toForm = (g) => ({
  ...g,
  achievementsText: arrayToLines(g.achievements),
  statsText: statsToLines(g.stats),
});

// "Expériences" (stages) et groupes hors stage (ex. projets personnels/freelance)
// vivent dans la même table `groups`, rattachée aux réalisations par `groupId`.
const ExperienceTab = ({ token }) => {
  const [groups, setGroups] = useState(null);
  const [editingId, setEditingId] = useState(null); // null = fermé, 'new' = création
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    publicGet('/api/groups')
      .then((rows) => setGroups(rows))
      .catch(() => toast({ variant: 'destructive', title: 'Chargement impossible' }));
  };

  useEffect(load, []);

  const startCreate = () => { setForm(emptyForm); setEditingId('new'); };
  const startEdit = (g) => { setForm(toForm(g)); setEditingId(g.id); };
  const cancel = () => { setEditingId(null); setForm(emptyForm); };

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleDelete = async (id) => {
    try {
      await adminDelete(token, `/api/admin/groups/${id}`);
      setGroups((prev) => prev.filter((g) => g.id !== id));
      toast({ title: 'Groupe supprimé' });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Suppression impossible',
        description: err.message === 'group_in_use' ? 'Des réalisations ou références pointent encore vers ce groupe.' : undefined,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const body = {
      ...form,
      sortOrder: Number(form.sortOrder) || 0,
      achievements: linesToArray(form.achievementsText),
      stats: linesToStats(form.statsText),
    };
    try {
      if (editingId === 'new') {
        await adminSend(token, '/api/admin/groups', 'POST', body);
      } else {
        await adminSend(token, `/api/admin/groups/${editingId}`, 'PUT', body);
      }
      toast({ title: 'Groupe enregistré' });
      cancel();
      load();
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Enregistrement impossible',
        description: err.message === 'id_already_exists' ? 'Cet identifiant existe déjà.' : undefined,
      });
    } finally {
      setSaving(false);
    }
  };

  if (!groups) return <p className="mt-6 text-sm text-muted-foreground">Chargement…</p>;

  return (
    <div className="mt-6 space-y-6">
      {editingId === null && (
        <Button type="button" onClick={startCreate} className="gap-2">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nouvelle expérience / groupe
        </Button>
      )}

      {editingId !== null && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{editingId === 'new' ? 'Nouveau groupe' : `Modifier « ${form.company} »`}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="g-id">Identifiant (slug, ex. "freelance")</Label>
                  <Input id="g-id" required disabled={editingId !== 'new'} value={form.id} onChange={set('id')} />
                </div>
                <div className="space-y-1.5">
                  <Label>Type</Label>
                  <Select value={form.kind} onValueChange={(v) => setForm((p) => ({ ...p, kind: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="experience">Stage / expérience</SelectItem>
                      <SelectItem value="group">Groupe hors stage (freelance, perso...)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="g-company">Entreprise / structure</Label>
                  <Input id="g-company" required value={form.company} onChange={set('company')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="g-shortName">Nom court (affiché)</Label>
                  <Input id="g-shortName" value={form.shortName ?? ''} onChange={set('shortName')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="g-position">Poste</Label>
                  <Input id="g-position" value={form.position ?? ''} onChange={set('position')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="g-duration">Durée</Label>
                  <Input id="g-duration" value={form.duration ?? ''} onChange={set('duration')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="g-location">Localisation</Label>
                  <Input id="g-location" value={form.location ?? ''} onChange={set('location')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="g-logo">Logo (emoji ou chemin d'image)</Label>
                  <Input id="g-logo" value={form.logo ?? ''} onChange={set('logo')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="g-sortOrder">Ordre d'affichage</Label>
                  <Input id="g-sortOrder" type="number" value={form.sortOrder} onChange={set('sortOrder')} />
                </div>
                <div className="flex items-center gap-2 pt-7">
                  <Checkbox id="g-current" checked={!!form.current} onCheckedChange={(v) => setForm((p) => ({ ...p, current: !!v }))} />
                  <Label htmlFor="g-current">En cours</Label>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="g-description">Description</Label>
                <Textarea id="g-description" rows={3} value={form.description ?? ''} onChange={set('description')} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="g-achievements">Réalisations clés (une par ligne)</Label>
                <Textarea id="g-achievements" rows={5} value={form.achievementsText} onChange={set('achievementsText')} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="g-stats">Chiffres clés — une par ligne, "valeur | libellé | icône"</Label>
                <Textarea id="g-stats" rows={3} value={form.statsText} onChange={set('statsText')} />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={saving} className="gap-2">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
                  Enregistrer
                </Button>
                <Button type="button" variant="outline" onClick={cancel} className="gap-2">
                  <X className="h-4 w-4" aria-hidden="true" />
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {groups.map((g) => (
          <Card key={g.id}>
            <CardContent className="flex items-center justify-between gap-4 pt-6">
              <div>
                <p className="text-sm font-medium text-foreground">{g.shortName || g.company}</p>
                <p className="text-xs text-muted-foreground">
                  {g.kind === 'experience' ? 'Stage / expérience' : 'Groupe hors stage'} — {g.position || '—'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => startEdit(g)} aria-label="Modifier">
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(g.id)} aria-label="Supprimer">
                  <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTab;
