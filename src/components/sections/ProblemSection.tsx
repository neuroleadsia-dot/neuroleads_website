import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { TrendingDown, Clock, Users, Settings } from 'lucide-react';

const problems = [
  {
    icon: TrendingDown,
    title: 'Pipeline imprévisible',
    description: 'Votre chiffre d\'affaires dépend du hasard des inbound et de la motivation ponctuelle de vos commerciaux.',
  },
  {
    icon: Clock,
    title: 'Dépendance totale à l\'inbound',
    description: 'Vous attendez que les leads viennent à vous, sans contrôle sur votre croissance.',
  },
  {
    icon: Users,
    title: 'Temps perdu en tâches manuelles',
    description: 'Vos SDR passent 70% de leur temps sur des tâches répétitives au lieu de converser avec des prospects qualifiés.',
  },
  {
    icon: Settings,
    title: 'Manque d\'automatisation',
    description: 'Vos processus de qualification, relances et suivi reposent sur des feuilles Excel et de la bonne volonté.',
  },
];

export function ProblemSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            La prospection traditionnelle{' '}
            <span className="text-[#6B6B7B]">ne fonctionne plus</span>
          </h2>
          <p className="text-lg text-[#B8B8C8] max-w-2xl mx-auto">
            Les équipes commerciales françaises font face à des défis structurels 
            qui freinent leur croissance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-[#12121A] border border-white/5 hover:border-[#0066FF]/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#0066FF]/20 transition-colors">
                <problem.icon className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-[#B8B8C8] leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-[#B8B8C8]">
            Il existe une <span className="text-white font-semibold">autre façon</span> de générer des opportunités.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
