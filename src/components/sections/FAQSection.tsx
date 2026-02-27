import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Combien de temps prend la mise en place ?',
    answer: 'La mise en route complète prend généralement 3 à 4 semaines. La première semaine est dédiée à l\'audit et la stratégie, les semaines suivantes à l\'installation, les tests et l\'activation. Vous pouvez voir les premiers résultats dès la 3ème semaine.',
  },
  {
    question: 'L\'IA remplace-t-elle mes commerciaux ?',
    answer: 'Non. L\'IA automatise les tâches répétitives (recherche, première prise de contact, qualification initiale) pour que vos commerciaux se concentrent sur ce qu\'ils font de mieux : construire des relations et conclure des ventes.',
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'Absolument. Nous sommes fully RGPD compliant. Les données sont hébergées en Europe (AWS Frankfurt ou Scaleway Paris), chiffrées en transit et au repos (AES-256). Nous ne partageons jamais vos données avec des tiers.',
  },
  {
    question: 'Quel est le ROI attendu ?',
    answer: 'Nos clients constatent généralement un ROI positif dès le 2ème ou 3ème mois. En moyenne : +150% de leads qualifiés, -40% de coût d\'acquisition client, 40h économisées par mois pour l\'équipe commerciale.',
  },
  {
    question: 'Puis-je garder mon CRM actuel ?',
    answer: 'Oui, nous intégrons tous les CRM majeurs : HubSpot, Salesforce, Pipedrive, Zoho, et bien d\'autres. Nous nous adaptons à votre stack existante.',
  },
  {
    question: 'Comment fonctionne le Voice Agent ?',
    answer: 'Notre Voice Agent utilise les dernières technologies de synthèse vocale (ElevenLabs) et de compréhension du langage naturel (OpenAI). Il peut prendre des rendez-vous, qualifier des leads, gérer des réservations avec une voix naturelle indiscernable d\'un humain.',
  },
  {
    question: 'Quel est le prix ?',
    answer: 'Nous proposons des forfaits adaptés à votre taille et vos besoins. Le diagnostic initial est gratuit. Contactez-nous pour une étude personnalisée et un devis détaillé.',
  },
];

export function FAQSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" ref={ref} className="py-24 bg-[#12121A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Questions{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4AA] bg-clip-text text-transparent">
              fréquentes
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#0A0A0F] rounded-xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#6B6B7B] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-[#B8B8C8] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 text-[#0066FF] hover:text-[#00D4AA] font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Une question spécifique ? Contactez-nous
          </button>
        </motion.div>
      </div>
    </section>
  );
}
