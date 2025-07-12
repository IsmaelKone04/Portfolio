import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { studentData } from '../data/mockData';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi (remplacer par vraie API plus tard)
    setTimeout(() => {
      toast({
        title: "Message envoyé avec succès ! ✅",
        description: "Je vous répondrai dans les plus brefs délais.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: "📧",
      label: "Email",
      value: studentData.personal.email,
      href: `mailto:${studentData.personal.email}`,
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: "📱",
      label: "Téléphone",
      value: studentData.personal.phone,
      href: `tel:${studentData.personal.phone}`,
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: "💻",
      label: "GitHub",
      value: "jbkouadio",
      href: studentData.personal.github,
      color: "from-gray-700 to-gray-900"
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "jean-baptiste-kouadio",
      href: studentData.personal.linkedin,
      color: "from-blue-600 to-blue-800"
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full animate-pulse blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full animate-bounce blur-2xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Restons en Contact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intéressé par une collaboration ? Un stage ? Ou simplement échanger sur la tech ? 
              N'hésitez pas à me contacter !
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Informations de contact */}
            <div className="space-y-8">
              <Card className="bg-white border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                      📞
                    </span>
                    Informations de Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {contactMethods.map((method, index) => (
                    <a
                      key={index}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        {method.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{method.label}</p>
                        <p className="text-gray-600 text-sm">{method.value}</p>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Disponibilité */}
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    Statut de Disponibilité
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                      <span>Disponible pour stages (été 2025)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                      <span>Ouvert aux projets freelance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                      <span>Collaborations sur projets étudiants</span>
                    </div>
                  </div>
                  <Badge className="mt-4 bg-white text-green-600 px-4 py-2">
                    Réponse sous 24h garantie
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire de contact */}
            <div>
              <Card className="bg-white border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      ✉️
                    </span>
                    Envoyez-moi un message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Objet de votre message"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Décrivez votre projet, opportunité ou question..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Envoi en cours...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Envoyer le message
                          <span>🚀</span>
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                {studentData.personal.name}
              </h3>
              <p className="text-blue-200 mb-6">
                {studentData.personal.title} • {studentData.personal.university}
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-white text-gray-900 px-4 py-2">
                  📍 {studentData.personal.location}
                </Badge>
                <Badge className="bg-blue-500 hover:bg-blue-600 px-4 py-2">
                  🎓 {studentData.personal.year}
                </Badge>
              </div>
              <p className="text-blue-100 text-sm mt-6">
                "Passionné par la technologie et l'innovation pour l'Afrique"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;