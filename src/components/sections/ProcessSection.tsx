import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Search, Settings, Rocket, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Audit & Stratégie',
    duration: 'Semaine 1',
    description: 'Nous analysons votre ICP, votre stack actuel et vos processus pour concevoir l\'architecture optimale.',
    deliverable: 'Plan de déploiement personnalisé',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Installation & Configuration',
    duration: 'Semaine 2',
    description: 'Nous intégrons les outils d\'IA avec vos systèmes existants (CRM, email, téléphonie, données).',
    deliverable: 'Système opérationnel et testé',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Activation & Lancement',
    duration: 'Semaine 3',
    description: 'Premières campagnes, ajustements des séquences et optimisation des messages par l\'IA.',
    deliverable: 'Pipeline actif générant des leads',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Optimisation Continue',
    duration: 'Semaine 4+',
    description: 'Amélioration itérative basée sur les données, A/B testing et affinage de l\'ICP.',
    deliverable: 'Performance croissante mois après mois',
  },
];

export function ProcessSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="process" ref={ref} className="py-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            De l'audit à l'activation en{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4AA] bg-clip-text text-transparent">
              4 semaines
            </span>
          </h2>
          <p className="text-lg text-[#B8B8C8] max-w-2xl mx-auto">
            Une méthodologie éprouvée pour déployer l'IA dans votre prospection 
            sans disruption.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="p-6 rounded-2xl bg-[#12121A] border border-white/5 h-full">
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold text-[#0066FF]/30">{step.number}</span>
                  <span className="px-3 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-medium">
                    {step.duration}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-[#0066FF]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-[#B8B8C8] text-sm mb-4 leading-relaxed">{step.description}</p>

                {/* Deliverable */}
                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-[#6B6B7B] uppercase tracking-wider mb-1">Livrable</p>
                  <p className="text-sm text-[#00D4AA]">{step.deliverable}</p>
                </div>
              </div>

              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[#0066FF]/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

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
            Démarrer votre projet IA
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
