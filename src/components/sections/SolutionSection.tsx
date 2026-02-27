import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Bot, Mic, Cog, MessageSquare, ArrowRight, Check } from 'lucide-react';

const solutions = [
  {
    icon: Bot,
    title: 'AI Revenue Engine',
    description: 'Système autonome de prospection B2B',
    features: [
      'Identification automatique de cibles',
      'Personnalisation IA à grande échelle',
      'Séquences multi-canaux',
      'Qualification et scoring automatique',
    ],
  },
  {
    icon: Mic,
    title: 'Voice Agents IA',
    description: 'Assistants vocaux intelligents',
    features: [
      'Prise de rendez-vous 24/7',
      'Réservation restaurant automatisée',
      'Standard téléphonique intelligent',
      'Voix naturelle indiscernable',
    ],
  },
  {
    icon: Cog,
    title: 'Automatisation sur mesure',
    description: 'Workflows métier intelligents',
    features: [
      'Intégration API et CRM',
      'Workflows de qualification',
      'Relances automatiques contextuelles',
      'Reporting et analytics avancés',
    ],
  },
  {
    icon: MessageSquare,
    title: 'Sites IA & Chatbots',
    description: 'Expérience digitale intelligente',
    features: [
      'Sites web avec chatbot intégré',
      'Qualification de visiteurs en temps réel',
      'Conversion visiteur → lead → opportunité',
      'Analytics comportementaux avancés',
    ],
  },
];

export function SolutionSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="solutions" ref={ref} className="py-24 bg-[#12121A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Des systèmes autonomes qui{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4AA] bg-clip-text text-transparent">
              travaillent 24/7
            </span>
          </h2>
          <p className="text-lg text-[#B8B8C8] max-w-2xl mx-auto">
            Nous installons et exploitons des solutions d'IA générative qui 
            transforment votre prospection en machine prévisible et scalable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-[#0A0A0F] border border-white/5 hover:border-[#0066FF]/30 transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-[#00D4AA]/20 flex items-center justify-center mb-6 group-hover:from-[#0066FF]/30 group-hover:to-[#00D4AA]/30 transition-colors">
                <solution.icon className="w-7 h-7 text-[#0066FF]" />
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-2">{solution.title}</h3>
              <p className="text-[#B8B8C8] mb-6">{solution.description}</p>
              
              <ul className="space-y-3 mb-8">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                    <span className="text-[#B8B8C8] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={scrollToContact}
                className="inline-flex items-center text-[#0066FF] hover:text-[#00D4AA] font-medium transition-colors group/link"
              >
                En savoir plus
                <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={scrollToContact}
            className="inline-flex items-center px-8 py-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0066FF]/30"
          >
            Réserver un appel découverte
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
