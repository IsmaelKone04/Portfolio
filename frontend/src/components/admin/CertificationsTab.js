import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Save, Trash2, Plus, Pencil, X, Upload, FileText, FileX2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';
import { publicGet, adminSend, adminDelete, adminUpload } from '../../lib/adminApi';

const TYPES = [
  ['diplome', 'Diplôme'],
  ['formation', 'Formation'],
  ['concours', 'Concours'],
];

const emptyForm = { title: '', type: 'diplome', organization: '', date: '', description: '', sortOrder: 0 };

const CertificationsTab = ({ token }) => {
  const [list, setList] = useState(null);
  const [editingId, setEditingId] = useState(null); // null = fermé, 'new' = création
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState(null);
  const fileInputs = useRef({});
  const { toast } = useToast();

  const load = () => {
    publicGet('/api/certifications').then(setList).catch(() => toast({ variant: 'destructive', title: 'Chargement impossible' }));
  };

  useEffect(load, []);

  const startCreate = () => { setForm(emptyForm); setEditingId('new'); };
  const startEdit = (c) => { setForm(c); setEditingId(c.id); };
  const cancel = () => { setEditingId(null); setForm(emptyForm); };

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleDelete = async (id) => {
    try {
      await adminDelete(token, `/api/admin/certifications/${id}`);
      setList((prev) => prev.filter((c) => c.id !== id));
      toast({ title: 'Certification supprimée' });
    } catch {
      toast({ variant: 'destructive', title: 'Suppression impossible' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...form, sortOrder: Number(form.sortOrder) || 0 };
    try {
      if (editingId === 'new') {
        await adminSend(token, '/api/admin/certifications', 'POST', body);
      } else {
        await adminSend(token, `/api/admin/certifications/${editingId}`, 'PUT', body);
      }
      toast({ title: 'Certification enregistrée' });
      cancel();
      load();
    } catch {
      toast({ variant: 'destructive', title: 'Enregistrement impossible' });
    } finally {
      setSaving(false);
    }
  };

  const handleFilePick = (id) => (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) handleUpload(id, file);
  };

  const handleUpload = async (id, file) => {
    setUploadingId(id);
    try {
      await adminUpload(token, `/api/admin/certifications/${id}/file`, file);
      toast({ title: 'Justificatif déposé' });
      load();
    } catch (err) {
      const message = err.message === 'unsupported_type'
        ? 'Formats acceptés : PDF, PNG, JPEG, WebP'
        : err.message === 'file_too_large'
          ? 'Fichier trop volumineux (10 Mo max)'
          : 'Dépôt du justificatif impossible';
      toast({ variant: 'destructive', title: message });
    } finally {
      setUploadingId(null);
    }
  };

  const handleRemoveFile = async (id) => {
    setUploadingId(id);
    try {
      await adminDelete(token, `/api/admin/certifications/${id}/file`);
      toast({ title: 'Justificatif retiré' });
      load();
    } catch {
      toast({ variant: 'destructive', title: 'Suppression impossible' });
    } finally {
      setUploadingId(null);
    }
  };

  if (!list) return <p className="mt-6 text-sm text-muted-foreground">Chargement…</p>;

  return (
    <div className="mt-6 space-y-6">
      {editingId === null && (
        <Button type="button" onClick={startCreate} className="gap-2">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nouvelle certification
        </Button>
      )}

      {editingId !== null && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{editingId === 'new' ? 'Nouvelle certification' : `Modifier « ${form.title} »`}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="c-title">Titre</Label>
                  <Input id="c-title" required value={form.title} onChange={set('title')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-type">Type</Label>
                  <select
                    id="c-type"
                    value={form.type}
                    onChange={set('type')}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    {TYPES.map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-organization">Organisme</Label>
                  <Input id="c-organization" value={form.organization ?? ''} onChange={set('organization')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-date">Date</Label>
                  <Input id="c-date" value={form.date ?? ''} onChange={set('date')} placeholder="ex. 2023 - En cours" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-sortOrder">Ordre d'affichage</Label>
                  <Input id="c-sortOrder" type="number" value={form.sortOrder} onChange={set('sortOrder')} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-description">Description</Label>
                <Textarea id="c-description" rows={3} value={form.description ?? ''} onChange={set('description')} />
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
        {list.map((c) => (
          <Card key={c.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6">
              <div>
                <p className="text-sm font-medium text-foreground">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.organization || '—'} · {TYPES.find(([v]) => v === c.type)?.[1] ?? c.type}</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  ref={(el) => { fileInputs.current[c.id] = el; }}
                  type="file"
                  accept="application/pdf,image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleFilePick(c.id)}
                />
                {c.fileUrl ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={uploadingId === c.id}
                    onClick={() => handleRemoveFile(c.id)}
                    className="gap-1.5 text-xs"
                  >
                    <FileX2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Retirer le justificatif
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={uploadingId === c.id}
                    onClick={() => fileInputs.current[c.id]?.click()}
                    className="gap-1.5 text-xs"
                  >
                    {uploadingId === c.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : <Upload className="h-3.5 w-3.5" aria-hidden="true" />}
                    Déposer un justificatif
                  </Button>
                )}
                {c.fileUrl && (
                  <a
                    href={`${process.env.REACT_APP_API_URL}/api/certifications/${c.id}/file`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-highlight hover:underline"
                  >
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    Voir
                  </a>
                )}
                <Button variant="ghost" size="icon" onClick={() => startEdit(c)} aria-label="Modifier">
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)} aria-label="Supprimer">
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

export default CertificationsTab;
