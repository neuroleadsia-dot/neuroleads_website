import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: 'En 3 mois, NeuroLeads a transformé notre prospection. Notre pipeline est passé de sporadique à prévisible. L\'IA génère des leads qualifiés pendant que notre équipe se concentre sur la conversion.',
    author: 'Thomas M.',
    role: 'CEO',
    company: 'TechFlow',
    results: [
      { metric: 'leads qualifiés', value: '+150%' },
      { metric: 'coût d\'acquisition', value: '-40%' },
    ],
  },
  {
    id: 2,
    quote: 'Le Voice Agent a révolutionné notre prise de rendez-vous. Nos prospects ne réalisent même pas qu\'ils parlent à une IA. Le taux de conversion des appels est meilleur qu\'avec nos SDR.',
    author: 'Marie L.',
    role: 'Directrice Commerciale',
    company: 'IndustriePro',
    results: [
      { metric: 'rendez-vous', value: '+200%' },
      { metric: 'taux de conversion', value: '85%' },
    ],
  },
  {
    id: 3,
    quote: 'Plus jamais un appel de réservation manqué. Le système gère nos réservations 24/7 et nos clients sont ravis de la réactivité. Un investissement rentabilisé en 2 mois.',
    author: 'Pierre D.',
    role: 'Fondateur',
    company: 'RestoGroup',
    results: [
      { metric: 'réservations', value: '+40%' },
      { metric: 'appels manqués', value: '0' },
    ],
  },
];

export function TestimonialsSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section ref={ref} className="py-24 bg-[#12121A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ce que disent nos{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4AA] bg-clip-text text-transparent">
              clients
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Testimonial Card */}
          <div className="bg-[#0A0A0F] rounded-2xl border border-white/5 p-8 md:p-12">
            <Quote className="w-12 h-12 text-[#0066FF]/30 mb-6" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8">
                  "{current.quote}"
                </blockquote>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4AA] flex items-center justify-center text-white font-bold text-xl">
                      {current.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{current.author}</div>
                      <div className="text-[#B8B8C8] text-sm">{current.role}, {current.company}</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {current.results.map((result) => (
                      <div key={result.metric} className="text-center px-4 py-2 bg-[#12121A] rounded-lg">
                        <div className="text-xl font-bold text-[#00D4AA]">{result.value}</div>
                        <div className="text-xs text-[#6B6B7B]">{result.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-[#12121A] border border-white/10 flex items-center justify-center text-[#B8B8C8] hover:text-white hover:border-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-[#0066FF]' : 'bg-[#4A4A5A]'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-[#12121A] border border-white/10 flex items-center justify-center text-[#B8B8C8] hover:text-white hover:border-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
