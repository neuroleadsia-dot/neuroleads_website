import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowRight, Building2, Factory, UtensilsCrossed, Briefcase } from 'lucide-react';

const useCases = [
  {
    id: 'saas',
    icon: Building2,
    title: 'SaaS B2B',
    target: 'Decision-makers IT et métiers',
    challenge: 'Long cycle de vente, multiples stakeholders',
    solution: 'Séquences multi-touch personnalisées par persona',
    result: '+180% de démos qualifiées',
  },
  {
    id: 'industrie',
    icon: Factory,
    title: 'Industrie & Manufacturing',
    target: 'Directeurs industriels, achats',
    challenge: 'Prospection B2B complexe, haute valeur',
    solution: 'Approche account-based avec recherche approfondie',
    result: '3x plus de rendez-vous avec des comptes cibles',
  },
  {
    id: 'restauration',
    icon: UtensilsCrossed,
    title: 'Restauration',
    target: 'Gérants de restaurants',
    challenge: 'Disponibilité limitée, appels manqués',
    solution: 'Voice Agent pour réservation et prise de RDV',
    result: '40% de réservations en plus, 0 appel manqué',
  },
  {
    id: 'services',
    icon: Briefcase,
    title: 'Services B2B',
    target: 'Dirigeants PME, directeurs',
    challenge: 'Différenciation, confiance',
    solution: 'Contenu personnalisé et social selling automatisé',
    result: 'Pipeline prévisible, réduction des coûts d\'acquisition',
  },
];

export function UseCasesSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('saas');

  const activeCase = useCases.find((c) => c.id === activeTab) || useCases[0];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="usecases" ref={ref} className="py-24 bg-[#12121A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Adapté à votre{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4AA] bg-clip-text text-transparent">
              secteur d'activité
            </span>
          </h2>
          <p className="text-lg text-[#B8B8C8] max-w-2xl mx-auto">
            Des solutions configurées pour les spécificités de votre marché.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {useCases.map((useCase) => (
            <button
              key={useCase.id}
              onClick={() => setActiveTab(useCase.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === useCase.id
                  ? 'bg-[#0066FF] text-white'
                  : 'bg-[#0A0A0F] text-[#B8B8C8] hover:text-white border border-white/5'
              }`}
            >
              <useCase.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{useCase.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0A0A0F] rounded-2xl border border-white/5 p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center">
                    <activeCase.icon className="w-6 h-6 text-[#0066FF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{activeCase.title}</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-[#6B6B7B] uppercase tracking-wider mb-1">Cible</p>
                    <p className="text-[#B8B8C8]">{activeCase.target}</p>
                  </div>

                  <div>
                    <p className="text-xs text-[#6B6B7B] uppercase tracking-wider mb-1">Défi</p>
                    <p className="text-[#B8B8C8]">{activeCase.challenge}</p>
                  </div>

                  <div>
                    <p className="text-xs text-[#6B6B7B] uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-[#B8B8C8]">{activeCase.solution}</p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-[#6B6B7B] uppercase tracking-wider mb-1">Résultat</p>
                    <p className="text-xl font-semibold text-[#00D4AA]">{activeCase.result}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#0066FF]/20 to-[#00D4AA]/20 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#0066FF]/30 to-[#00D4AA]/30 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4AA] flex items-center justify-center">
                        <activeCase.icon className="w-16 h-16 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#0066FF]/20 to-[#00D4AA]/20 rounded-full blur-2xl -z-10" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={scrollToContact}
            className="inline-flex items-center px-8 py-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0066FF]/30"
          >
            Voir nos études de cas
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
