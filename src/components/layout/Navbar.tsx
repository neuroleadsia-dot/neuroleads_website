import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Solutions',
    href: '#solutions',
    children: [
      { label: 'AI Revenue Engine', href: '#solutions' },
      { label: 'Voice Agents IA', href: '#solutions' },
      { label: 'Automatisation', href: '#solutions' },
      { label: 'Sites IA & Chatbots', href: '#solutions' },
    ],
  },
  { label: 'Méthodologie', href: '#process' },
  { label: 'Cas d\'usage', href: '#usecases' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D4AA] flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-white font-semibold text-xl">NeuroLeads</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-1 text-[#B8B8C8] hover:text-white transition-colors"
                >
                  <span>{item.label}</span>
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-[#12121A] border border-white/10 rounded-xl overflow-hidden shadow-xl"
                    >
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => scrollToSection(child.href)}
                          className="block w-full text-left px-4 py-3 text-[#B8B8C8] hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('#contact')}
              className="inline-flex items-center px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0066FF]/30"
            >
              Réserver un diagnostic
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#12121A] border-t border-white/10 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left px-4 py-3 text-white hover:bg-white/5"
                    >
                      {item.label}
                    </button>
                  </div>
                ))}
                <div className="px-4 pt-4">
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="block w-full text-center px-6 py-3 bg-[#0066FF] text-white font-semibold rounded-lg"
                  >
                    Réserver un diagnostic
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
