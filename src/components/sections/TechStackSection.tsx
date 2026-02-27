import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Shield, Lock, Server } from 'lucide-react';

const technologies = [
  { name: 'OpenAI', category: 'IA Générative', color: '#10A37F' },
  { name: 'Make', category: 'Automatisation', color: '#7B68EE' },
  { name: 'HubSpot', category: 'CRM', color: '#FF7A59' },
  { name: 'Salesforce', category: 'CRM', color: '#00A1E0' },
  { name: 'Apollo', category: 'Données', color: '#3B82F6' },
  { name: 'Twilio', category: 'Communication', color: '#F22F46' },
  { name: 'AWS', category: 'Cloud', color: '#FF9900' },
  { name: 'ElevenLabs', category: 'Voice AI', color: '#6366F1' },
];

export function TechStackSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="tech" ref={ref} className="py-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Propulsé par les{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4AA] bg-clip-text text-transparent">
              meilleures technologies IA
            </span>
          </h2>
          <p className="text-lg text-[#B8B8C8] max-w-2xl mx-auto">
            Nous intégrons les leaders de l'IA avec votre infrastructure existante.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group p-6 rounded-xl bg-[#12121A] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1"
            >
              <div 
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
              >
                {tech.name.charAt(0)}
              </div>
              <h3 className="text-white font-semibold mb-1">{tech.name}</h3>
              <p className="text-[#6B6B7B] text-sm">{tech.category}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-6"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20">
            <Shield className="w-4 h-4 text-[#00D4AA]" />
            <span className="text-[#00D4AA] text-sm font-medium">RGPD compliant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20">
            <Server className="w-4 h-4 text-[#0066FF]" />
            <span className="text-[#0066FF] text-sm font-medium">Données UE</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8B8C8]/10 border border-[#B8B8C8]/20">
            <Lock className="w-4 h-4 text-[#B8B8C8]" />
            <span className="text-[#B8B8C8] text-sm font-medium">Chiffrement AES-256</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
