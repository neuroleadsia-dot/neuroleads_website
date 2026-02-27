import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const clients = ['TechFlow', 'IndustriePro', 'RestoGroup', 'ServicePlus', 'DataCorp'];

const metrics = [
  { value: '+150%', label: 'pipeline moyen' },
  { value: '40h', label: 'gagnées par mois' },
  { value: '85%', label: 'taux de conversion' },
  { value: '48h', label: 'mise en route' },
];

export function SocialProofSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-[#0A0A0F] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-[#6B6B7B] text-sm uppercase tracking-wider mb-10">
            Ils font confiance à l'IA pour leur croissance
          </p>

          {/* Client Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-16">
            {clients.map((client) => (
              <motion.div
                key={client}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="text-[#4A4A5A] text-xl md:text-2xl font-bold hover:text-[#B8B8C8] transition-colors cursor-default"
              >
                {client}
              </motion.div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0066FF] to-[#00D4AA] bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-[#6B6B7B]">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
