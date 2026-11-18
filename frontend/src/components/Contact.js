import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { useContent } from '../contexts/ContentContext';

// Worker Cloudflare (api/) — voir REACT_APP_API_URL dans .env.local. Pas encore
// de valeur en production : le formulaire retombe sur le mailto en cas d'échec.
const API_URL = process.env.REACT_APP_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { personal } = useContent();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!API_URL) throw new Error('api_url_missing');
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('request_failed');

      toast({
        title: 'Message envoyé avec succès',
        description: 'Je vous répondrai dans les plus brefs délais.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast({
        variant: 'destructive',
        title: "Impossible d'envoyer le message",
        description: `Écrivez-moi directement à ${personal.email} en attendant.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatHandle = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, '');

  const contactMethods = [
    personal.email && {
      icon: Mail,
      label: 'E-mail',
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    ...(personal.phones || []).map((phone, index) => ({
      icon: Phone,
      label: personal.phones.length > 1 ? `Téléphone ${index + 1}` : 'Téléphone',
      value: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
    })),
    personal.github && {
      icon: Github,
      label: 'GitHub',
      value: formatHandle(personal.github),
      href: personal.github,
    },
    personal.linkedin && {
      icon: Linkedin,
      label: 'LinkedIn',
      value: formatHandle(personal.linkedin),
      href: personal.linkedin,
    },
  ].filter(Boolean);

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] text-foreground">
            Contact
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Un stage, une collaboration ou un échange technique sur ITSM, DevOps ou
            développement backend ? Je réponds rapidement.
          </p>
          <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-gradient-signature" aria-hidden="true" />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Informations de contact */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Informations de contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-border hover:bg-accent/40"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-signature shadow-sm">
                      <method.icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{method.label}</p>
                      <p className="text-sm text-muted-foreground">{method.value}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-sm font-semibold text-foreground">Disponibilité</h3>
                <ul className="mt-3 space-y-2 text-sm leading-[1.65] text-muted-foreground">
                  <li>Ouvert aux opportunités — stage et premier poste</li>
                  <li>Administration système, ITSM, développement backend</li>
                  <li>Références professionnelles disponibles sur demande</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de contact */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-foreground">
                Envoyez-moi un message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Nom complet
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      E-mail
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Sujet</label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Objet de votre message"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Décrivez votre projet, opportunité ou question..."
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} aria-hidden="true" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer
                      <Send className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Pied de page */}
        <div className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personal.name}
        </div>
      </div>
    </section>
  );
};

export default Contact;
