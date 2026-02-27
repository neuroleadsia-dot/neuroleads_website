import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowRight, Check, Calendar, Mail, User, Building, MessageSquare, Loader2 } from 'lucide-react';
import { useState, useCallback } from 'react';

const benefits = [
  'Sans engagement',
  'Diagnostic personnalisé',
  'Feuille de route concrète',
  'Résultats en 48h',
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: '', // Honeypot field for bot detection
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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Sanitize data before sending
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      company: sanitizeInput(formData.company),
      message: sanitizeInput(formData.message),
    };

    console.log('Form submitted:', sanitizedData);

    setIsSubmitting(false);
    setIsSubmitted(true);
    setSubmitCount(prev => prev + 1);

    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '', honeypot: '' });
    }, 5000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
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

            <div className="p-6 bg-[#12121A] rounded-xl border border-white/5">
              <p className="text-sm text-[#6B6B7B] mb-2">Contact direct</p>
              <p className="text-white font-semibold">📞 07 69 57 67 60 / 07 81 89 39 35</p>
              <p className="text-[#B8B8C8]">✉️ neuroleads.ia@gmail.com</p>
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
                  <h3 className="text-2xl font-bold text-white mb-2">Merci !</h3>
                  <p className="text-[#B8B8C8]">Nous vous contacterons sous 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <h3 className="text-xl font-semibold text-white mb-6">Réserver votre diagnostic</h3>
                  
                  {/* Honeypot field - hidden from humans */}
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

                  <div>
                    <label className="block text-sm text-[#B8B8C8] mb-2">Nom complet *</label>
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
                        placeholder="Jean Dupont"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm text-[#B8B8C8] mb-2">Email professionnel *</label>
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
                        placeholder="jean@entreprise.fr"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

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
                        placeholder="Mon Entreprise"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#B8B8C8] mb-2">Message (optionnel)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[#6B6B7B]" />
                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder-[#4A4A5A] focus:outline-none focus:border-[#0066FF]/50 resize-none transition-colors"
                        placeholder="Dites-nous en plus sur vos besoins..."
                        disabled={isSubmitting}
                      />
                    </div>
                    <p className="mt-1 text-xs text-[#6B6B7B]">{formData.message.length}/1000</p>
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
                        Réserver mon diagnostic gratuit
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-[#6B6B7B]">
                    Places limitées : <span className="text-[#00D4AA]">5 diagnostics par semaine</span>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
