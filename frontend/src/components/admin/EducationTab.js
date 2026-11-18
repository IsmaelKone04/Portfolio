import React, { useEffect, useState } from 'react';
import { Loader2, Save, Trash2, Plus, Pencil, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';
import { publicGet, adminSend, adminDelete, linesToArray, arrayToLines } from '../../lib/adminApi';

const emptyForm = { institution: '', degree: '', duration: '', location: '', description: '', sortOrder: 0, coursesText: '' };
const toForm = (e) => ({ ...e, coursesText: arrayToLines(e.courses) });

const ACADEMIC_FIELDS = [
  ['currentYear', 'Année en cours'],
  ['totalYears', "Nombre total d'années"],
  ['average', 'Moyenne'],
  ['specialization', 'Spécialisation'],
  ['graduationYear', 'Année de diplôme prévue'],
];

const EducationTab = ({ token }) => {
  const [education, setEducation] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [academicSaving, setAcademicSaving] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = fermé, 'new' = création
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    publicGet('/api/education').then(setEducation).catch(() => toast({ variant: 'destructive', title: 'Chargement impossible' }));
    publicGet('/api/academic').then(setAcademic).catch(() => {});
  };

  useEffect(load, []);

  const startCreate = () => { setForm(emptyForm); setEditingId('new'); };
  const startEdit = (e) => { setForm(toForm(e)); setEditingId(e.id); };
  const cancel = () => { setEditingId(null); setForm(emptyForm); };

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const setAcademicField = (key) => (e) => setAcademic((prev) => ({ ...prev, [key]: e.target.value }));

  const handleDelete = async (id) => {
    try {
      await adminDelete(token, `/api/admin/education/${id}`);
      setEducation((prev) => prev.filter((e) => e.id !== id));
      toast({ title: 'Formation supprimée' });
    } catch {
      toast({ variant: 'destructive', title: 'Suppression impossible' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...form, sortOrder: Number(form.sortOrder) || 0, courses: linesToArray(form.coursesText) };
    try {
      if (editingId === 'new') {
        await adminSend(token, '/api/admin/education', 'POST', body);
      } else {
        await adminSend(token, `/api/admin/education/${editingId}`, 'PUT', body);
      }
      toast({ title: 'Formation enregistrée' });
      cancel();
      load();
    } catch {
      toast({ variant: 'destructive', title: 'Enregistrement impossible' });
    } finally {
      setSaving(false);
    }
  };

  const handleAcademicSubmit = async (e) => {
    e.preventDefault();
    setAcademicSaving(true);
    try {
      await adminSend(token, '/api/admin/academic', 'PUT', {
        ...academic,
        currentYear: Number(academic.currentYear) || null,
        totalYears: Number(academic.totalYears) || null,
        graduationYear: Number(academic.graduationYear) || null,
      });
      toast({ title: 'Parcours académique enregistré' });
    } catch {
      toast({ variant: 'destructive', title: 'Enregistrement impossible' });
    } finally {
      setAcademicSaving(false);
    }
  };

  if (!education || !academic) return <p className="mt-6 text-sm text-muted-foreground">Chargement…</p>;

  return (
    <div className="mt-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Parcours académique (chiffres affichés sous la liste)</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAcademicSubmit} className="grid gap-4 sm:grid-cols-3">
            {ACADEMIC_FIELDS.map(([key, label]) => (
              <div key={key} className="space-y-1.5">
                <Label htmlFor={`a-${key}`}>{label}</Label>
                <Input id={`a-${key}`} value={academic[key] ?? ''} onChange={setAcademicField(key)} />
              </div>
            ))}
            <div className="sm:col-span-3">
              <Button type="submit" disabled={academicSaving} size="sm" className="gap-2">
                {academicSaving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
                Enregistrer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {editingId === null && (
        <Button type="button" onClick={startCreate} className="gap-2">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nouvelle formation
        </Button>
      )}

      {editingId !== null && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{editingId === 'new' ? 'Nouvelle formation' : `Modifier « ${form.institution} »`}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="e-institution">Établissement</Label>
                  <Input id="e-institution" required value={form.institution} onChange={set('institution')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="e-degree">Diplôme / formation</Label>
                  <Input id="e-degree" value={form.degree ?? ''} onChange={set('degree')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="e-duration">Durée</Label>
                  <Input id="e-duration" value={form.duration ?? ''} onChange={set('duration')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="e-location">Localisation</Label>
                  <Input id="e-location" value={form.location ?? ''} onChange={set('location')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="e-sortOrder">Ordre d'affichage</Label>
                  <Input id="e-sortOrder" type="number" value={form.sortOrder} onChange={set('sortOrder')} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="e-description">Description</Label>
                <Textarea id="e-description" rows={3} value={form.description ?? ''} onChange={set('description')} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="e-courses">Cours principaux (un par ligne)</Label>
                <Textarea id="e-courses" rows={4} value={form.coursesText} onChange={set('coursesText')} />
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
        {education.map((e) => (
          <Card key={e.id}>
            <CardContent className="flex items-center justify-between gap-4 pt-6">
              <div>
                <p className="text-sm font-medium text-foreground">{e.institution}</p>
                <p className="text-xs text-muted-foreground">{e.degree || '—'}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => startEdit(e)} aria-label="Modifier">
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(e.id)} aria-label="Supprimer">
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

export default EducationTab;
