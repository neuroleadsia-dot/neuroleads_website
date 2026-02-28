import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowRight, Check, Calendar, Mail, User, Building, MessageSquare, Loader2, MessageCircle, Phone } from 'lucide-react';
import { useState, useCallback } from 'react';
import { BookingModal } from '@/components/shared/BookingModal';

const benefits = [
  'Sans engagement',
  'Diagnostic personnalisé',
  'Feuille de route concrète',
  'Résultats en 48h',
];

const serviceTypes = [
  'AI Revenue Engine',
  'Voice Agents IA',
  'Automatisation sur mesure',
  'Sites IA & Chatbots',
  'Autre',
];

const budgetRanges = [
  '< 5 000 €',
  '5 000 € - 10 000 €',
  '10 000 € - 25 000 €',
  '> 25 000 €',
];

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// XSS sanitization
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

export function FinalCTASection() {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide';
    }

    if (!formData.service) {
      newErrors.service = 'Le type de service est requis';
    }

    if (formData.message.length > 1000) {
      newErrors.message = 'Le message ne doit pas dépasser 1000 caractères';
    }

    // Honeypot check (if filled, it's a bot)
    if (formData.honeypot) {
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting (max 3 submissions)
    if (submitCount >= 3) {
      setErrors({ submit: 'Trop de tentatives. Veuillez réessayer plus tard.' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        company: sanitizeInput(formData.company),
        service: formData.service,
        budget: formData.budget,
        message: sanitizeInput(formData.message),
      };

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.status === 429) {
        throw new Error('Trop de soumissions. Veuillez patienter quelques minutes.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Erreur lors de l\'envoi');
      }

      setIsSubmitted(true);
      setSubmitCount(prev => prev + 1);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', company: '', service: '', budget: '', message: '', honeypot: '' });
      }, 8000);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setErrors({ submit: 'La requête a expiré. Veuillez réessayer.' });
      } else {
        const message = error instanceof Error ? error.message : 'Une erreur est survenue. Contactez-nous directement par email ou WhatsApp.';
        setErrors({ submit: message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-[#0A0A0F] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF]/10 rounded-full blur-[128px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D4AA]/5 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[#00D4AA] text-sm font-medium mb-8">
              <Calendar className="w-4 h-4" />
              5 diagnostics disponibles cette semaine
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à transformer votre prospection avec l'IA ?
            </h2>

            <p className="text-lg text-[#B8B8C8] mb-8">
              Réservez un diagnostic gratuit de 30 minutes. Nous analysons votre
              situation actuelle et vous présentons une feuille de route concrète.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-[#B8B8C8]">
                  <Check className="w-5 h-5 text-[#00D4AA]" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Booking CTA */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full p-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] bg-gradient-to-r from-[#0066FF] to-[#00D4AA] text-white font-semibold shadow-lg shadow-[#0066FF]/30 mb-4"
            >
              <Calendar className="w-6 h-6" />
              Réserver un créneau
            </button>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/33781893935"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] bg-[#25D366]/15 border border-[#25D366]/30"
            >
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
              <span className="text-white font-medium">Discuter sur WhatsApp</span>
            </a>

            <div className="p-6 bg-[#12121A] rounded-xl border border-white/5 mt-6">
              <p className="text-sm text-[#6B6B7B] mb-2">Contact direct</p>
              <div className="flex items-center gap-2 text-white font-semibold mb-1">
                <Phone className="w-4 h-4 text-[#00D4AA]" />
                07 69 57 67 60 / 07 81 89 39 35
              </div>
              <div className="flex items-center gap-2 text-[#B8B8C8]">
                <Mail className="w-4 h-4 text-[#00D4AA]" />
                neuroleads.ia@gmail.com
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#12121A] rounded-2xl border border-white/5 p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00D4AA]/20 flex items-center justify-center">
                    <Check className="w-8 h-8 text-[#00D4AA]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                  <p className="text-[#B8B8C8]">Nous vous recontacterons dans les 24 heures.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <h3 className="text-xl font-semibold text-white mb-6">Réserver votre diagnostic</h3>

                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={formData.honeypot}
                      onChange={(e) => handleChange('honeypot', e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#B8B8C8] mb-2">Nom *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B7B]" />
                        <input
                          type="text"
                          required
                          maxLength={100}
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 bg-[#0A0A0F] border rounded-xl text-white placeholder-[#4A4A5A] focus:outline-none focus:border-[#0066FF]/50 transition-colors ${
                            errors.name ? 'border-red-500' : 'border-white/10'
                          }`}
                          placeholder="Votre nom"
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm text-[#B8B8C8] mb-2">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B7B]" />
                        <input
                          type="email"
                          required
                          maxLength={100}
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 bg-[#0A0A0F] border rounded-xl text-white placeholder-[#4A4A5A] focus:outline-none focus:border-[#0066FF]/50 transition-colors ${
                            errors.email ? 'border-red-500' : 'border-white/10'
                          }`}
                          placeholder="votre@email.com"
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Company & Service row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#B8B8C8] mb-2">Entreprise</label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B7B]" />
                        <input
                          type="text"
                          maxLength={100}
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-[#4A4A5A] focus:outline-none focus:border-[#0066FF]/50 transition-colors"
                          placeholder="Votre entreprise"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#B8B8C8] mb-2">Type de service *</label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => handleChange('service', e.target.value)}
                        className={`w-full px-4 py-3 bg-[#0A0A0F] border rounded-xl text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors appearance-none ${
                          errors.service ? 'border-red-500' : 'border-white/10'
                        }`}
                        disabled={isSubmitting}
                      >
                        <option value="" className="bg-[#0A0A0F]">Sélectionnez</option>
                        {serviceTypes.map((type) => (
                          <option key={type} value={type} className="bg-[#0A0A0F]">
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service}</p>}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm text-[#B8B8C8] mb-2">Votre budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => handleChange('budget', e.target.value)}
                      className="w-full px-4 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors appearance-none"
                      disabled={isSubmitting}
                    >
                      <option value="" className="bg-[#0A0A0F]">Sélectionnez</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="bg-[#0A0A0F]">
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-[#B8B8C8] mb-2">Détails du projet</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[#6B6B7B]" />
                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-[#4A4A5A] focus:outline-none focus:border-[#0066FF]/50 resize-none transition-colors"
                        placeholder="Décrivez votre projet..."
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-sm text-red-400">{errors.submit}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || submitCount >= 3}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0047B3] text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
}
