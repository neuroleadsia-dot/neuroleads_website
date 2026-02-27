import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Code, Brain, Wrench, HeartHandshake } from 'lucide-react';

const team = [
  {
    icon: Brain,
    role: 'Direction & Stratégie',
    description: 'Vision produit et orientation business pour maximiser votre ROI.',
  },
  {
    icon: Code,
    role: 'Ingénierie IA',
    description: 'Expertise en LLMs, automation et systèmes distribués de pointe.',
  },
  {
    icon: Wrench,
    role: 'Solutions & Intégrations',
    description: 'Architecture technique et workflows sur mesure pour votre stack.',
  },
  {
    icon: HeartHandshake,
    role: 'Customer Success',
    description: 'Accompagnement dédié pour garantir le succès de chaque déploiement.',
  },
];

export function TeamSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="team" ref={ref} className="py-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Une équipe d'ingénieurs{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4AA] bg-clip-text text-transparent">
              passionnés
            </span>
          </h2>
          <p className="text-lg text-[#B8B8C8] max-w-2xl mx-auto">
            Nous combinons expertise technique et compréhension métier pour créer des solutions qui fonctionnent.
          </p>
        </motion.div>

        {/* Vision Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <blockquote className="text-xl md:text-2xl text-[#B8B8C8] italic leading-relaxed">
            "Notre mission est de rendre l'intelligence artificielle accessible aux entreprises françaises pour créer des avantages compétitifs durables et éthiques."
          </blockquote>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-[#12121A] border border-white/5 hover:border-[#0066FF]/30 transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-[#00D4AA]/20 flex items-center justify-center group-hover:from-[#0066FF]/30 group-hover:to-[#00D4AA]/30 transition-colors">
                <member.icon className="w-8 h-8 text-[#0066FF]" />
              </div>
              <h3 className="text-lg font-semibold text-white text-center mb-2">{member.role}</h3>
              <p className="text-[#B8B8C8] text-sm text-center leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
