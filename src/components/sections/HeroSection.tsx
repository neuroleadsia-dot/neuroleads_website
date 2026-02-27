import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0066FF]/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D4AA]/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0066FF]/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Nouveau : Voice Agents IA disponible
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            L'IA qui génère vos{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4AA] bg-clip-text text-transparent">
              opportunités commerciales
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#B8B8C8] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            NeuroLeads installe et exploite des systèmes autonomes de prospection 
            B2B pilotés par l'intelligence artificielle. Pipelines prévisibles, 
            coûts réduits, croissance accélérée.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <button
              onClick={() => scrollToSection('#contact')}
              className="group inline-flex items-center px-8 py-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0066FF]/30"
            >
              Réserver un diagnostic gratuit
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('#solutions')}
              className="group inline-flex items-center px-8 py-4 bg-transparent border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all hover:bg-white/5"
            >
              <Play className="mr-2 w-5 h-5" />
              Voir nos solutions
            </button>
          </motion.div>

          {/* Micro-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-[#6B6B7B] flex items-center justify-center gap-4"
          >
            <span className="flex items-center gap-1">✓ Sans engagement</span>
            <span className="flex items-center gap-1">✓ Résultats en 48h</span>
          </motion.p>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#12121A]/50 backdrop-blur-sm">
              <div className="aspect-[16/9] bg-gradient-to-br from-[#12121A] to-[#1A1A25] flex items-center justify-center p-8">
                <div className="w-full max-w-3xl">
                  {/* Dashboard Mock */}
                  <div className="bg-[#0A0A0F] rounded-xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="text-xs text-[#6B6B7B]">AI Revenue Engine Dashboard</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-[#12121A] rounded-lg p-4">
                        <div className="text-[#6B6B7B] text-xs mb-1">Leads générés</div>
                        <div className="text-2xl font-bold text-white">+147%</div>
                        <div className="text-[#00D4AA] text-xs">↑ vs mois dernier</div>
                      </div>
                      <div className="bg-[#12121A] rounded-lg p-4">
                        <div className="text-[#6B6B7B] text-xs mb-1">Taux de conversion</div>
                        <div className="text-2xl font-bold text-white">85%</div>
                        <div className="text-[#00D4AA] text-xs">↑ +12%</div>
                      </div>
                      <div className="bg-[#12121A] rounded-lg p-4">
                        <div className="text-[#6B6B7B] text-xs mb-1">Temps économisé</div>
                        <div className="text-2xl font-bold text-white">40h</div>
                        <div className="text-[#00D4AA] text-xs">par mois</div>
                      </div>
                    </div>
                    <div className="mt-4 bg-[#12121A] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[#6B6B7B] text-xs">Pipeline actif</div>
                        <div className="text-[#0066FF] text-xs">Voir tout →</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 flex items-center justify-center text-xs">TM</div>
                          <div className="flex-1">
                            <div className="text-sm text-white">Thomas Martin - TechFlow</div>
                            <div className="text-xs text-[#6B6B7B]">Démonstration programmée</div>
                          </div>
                          <div className="px-2 py-1 bg-[#00D4AA]/20 text-[#00D4AA] text-xs rounded-full">Qualifié</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#00D4AA]/20 flex items-center justify-center text-xs">ML</div>
                          <div className="flex-1">
                            <div className="text-sm text-white">Marie L. - IndustriePro</div>
                            <div className="text-xs text-[#6B6B7B]">En négociation</div>
                          </div>
                          <div className="px-2 py-1 bg-[#0066FF]/20 text-[#0066FF] text-xs rounded-full">Chaud</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#0066FF]/20 to-[#00D4AA]/20 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
