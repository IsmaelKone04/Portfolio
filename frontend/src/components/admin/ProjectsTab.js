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
import { publicGet, adminSend, adminDelete, linesToArray, arrayToLines } from '../../lib/adminApi';

const NO_GROUP = '__none__';

const emptyForm = {
  groupId: NO_GROUP, title: '', slug: '', category: '', status: '', featured: false,
  description: '', impact: '', video: '', github: '', demo: '', dockerhub: '', sortOrder: 0,
  technologiesText: '', imagesText: '',
};

const toForm = (p) => ({
  ...p,
  groupId: p.groupId ?? NO_GROUP,
  technologiesText: arrayToLines(p.technologies),
  imagesText: arrayToLines(p.images),
});

const ProjectsTab = ({ token }) => {
  const [projects, setProjects] = useState(null);
  const [groups, setGroups] = useState([]);
  const [editingId, setEditingId] = useState(null); // null = fermé, 'new' = création
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    Promise.all([publicGet('/api/projects'), publicGet('/api/groups')])
      .then(([p, g]) => { setProjects(p); setGroups(g); })
      .catch(() => toast({ variant: 'destructive', title: 'Chargement impossible' }));
  };

  useEffect(load, []);

  const startCreate = () => { setForm(emptyForm); setEditingId('new'); };
  const startEdit = (p) => { setForm(toForm(p)); setEditingId(p.id); };
  const cancel = () => { setEditingId(null); setForm(emptyForm); };

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleDelete = async (id) => {
    try {
      await adminDelete(token, `/api/admin/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast({ title: 'Réalisation supprimée' });
    } catch {
      toast({ variant: 'destructive', title: 'Suppression impossible' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const body = {
      ...form,
      groupId: form.groupId === NO_GROUP ? null : form.groupId,
      sortOrder: Number(form.sortOrder) || 0,
      technologies: linesToArray(form.technologiesText),
      images: linesToArray(form.imagesText),
    };
    try {
      if (editingId === 'new') {
        await adminSend(token, '/api/admin/projects', 'POST', body);
      } else {
        await adminSend(token, `/api/admin/projects/${editingId}`, 'PUT', body);
      }
      toast({ title: 'Réalisation enregistrée' });
      cancel();
      load();
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Enregistrement impossible',
        description: err.message === 'slug_already_exists' ? 'Ce slug existe déjà.' : undefined,
      });
    } finally {
      setSaving(false);
    }
  };

  if (!projects) return <p className="mt-6 text-sm text-muted-foreground">Chargement…</p>;

  return (
    <div className="mt-6 space-y-6">
      {editingId === null && (
        <Button type="button" onClick={startCreate} className="gap-2">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nouvelle réalisation
        </Button>
      )}

      {editingId !== null && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{editingId === 'new' ? 'Nouvelle réalisation' : `Modifier « ${form.title} »`}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="p-title">Titre</Label>
                  <Input id="p-title" required value={form.title} onChange={set('title')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="p-slug">Slug (identifiant d'URL, unique)</Label>
                  <Input id="p-slug" required value={form.slug} onChange={set('slug')} />
                </div>
                <div className="space-y-1.5">
                  <Label>Groupe (mission / contexte)</Label>
                  <Select value={String(form.groupId)} onValueChange={(v) => setForm((p) => ({ ...p, groupId: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NO_GROUP}>Aucun</SelectItem>
                      {groups.map((g) => (
                        <SelectItem key={g.id} value={String(g.id)}>{g.shortName || g.company}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="p-category">Catégorie</Label>
                  <Input id="p-category" value={form.category ?? ''} onChange={set('category')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="p-status">Statut</Label>
                  <Input id="p-status" value={form.status ?? ''} onChange={set('status')} placeholder="Terminé, Validé en laboratoire..." />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="p-sortOrder">Ordre d'affichage</Label>
                  <Input id="p-sortOrder" type="number" value={form.sortOrder} onChange={set('sortOrder')} />
                </div>
                <div className="flex items-center gap-2 pt-7">
                  <Checkbox id="p-featured" checked={!!form.featured} onCheckedChange={(v) => setForm((p) => ({ ...p, featured: !!v }))} />
                  <Label htmlFor="p-featured">Mise en avant</Label>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="p-description">Description</Label>
                <Textarea id="p-description" rows={3} value={form.description ?? ''} onChange={set('description')} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-impact">Résultat / impact</Label>
                <Textarea id="p-impact" rows={3} value={form.impact ?? ''} onChange={set('impact')} />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="p-github">GitHub (URL)</Label>
                  <Input id="p-github" value={form.github ?? ''} onChange={set('github')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="p-demo">Démo (URL)</Label>
                  <Input id="p-demo" value={form.demo ?? ''} onChange={set('demo')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="p-dockerhub">Docker Hub (URL)</Label>
                  <Input id="p-dockerhub" value={form.dockerhub ?? ''} onChange={set('dockerhub')} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-technologies">Technologies (une par ligne)</Label>
                <Textarea id="p-technologies" rows={3} value={form.technologiesText} onChange={set('technologiesText')} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-images">Images (une URL/chemin par ligne)</Label>
                <Textarea id="p-images" rows={2} value={form.imagesText} onChange={set('imagesText')} />
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
        {projects.map((p) => (
          <Card key={p.id}>
            <CardContent className="flex items-center justify-between gap-4 pt-6">
              <div>
                <p className="text-sm font-medium text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.category || '—'} · {p.status || '—'}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => startEdit(p)} aria-label="Modifier">
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} aria-label="Supprimer">
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

export default ProjectsTab;
