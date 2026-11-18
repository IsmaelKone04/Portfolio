import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';
import { adminGet, adminDelete } from '../../lib/adminApi';

const MessagesTab = ({ token }) => {
  const [messages, setMessages] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    adminGet(token, '/api/admin/contact').then(setMessages).catch(() => {
      toast({ variant: 'destructive', title: 'Chargement des messages impossible' });
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await adminDelete(token, `/api/admin/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch {
      toast({ variant: 'destructive', title: 'Suppression impossible' });
    }
  };

  if (!messages) return <p className="mt-6 text-sm text-muted-foreground">Chargement…</p>;

  return (
    <div className="mt-6 space-y-3">
      <h2 className="text-sm font-semibold text-foreground">Messages reçus ({messages.length})</h2>
      {messages.length === 0 && <p className="text-sm text-muted-foreground">Aucun message pour le moment.</p>}
      {messages.map((m) => (
        <Card key={m.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{m.subject}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {m.name} — {m.email} — {new Date(m.createdAt).toLocaleString('fr-FR')}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)} aria-label="Supprimer ce message">
                <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
              </Button>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">{m.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MessagesTab;
