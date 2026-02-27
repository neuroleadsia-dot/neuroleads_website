import { Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const footerLinks = {
  solutions: [
    { label: 'AI Revenue Engine', href: '/#solutions' },
    { label: 'Voice Agents IA', href: '/#solutions' },
    { label: 'Automatisation', href: '/#solutions' },
    { label: 'Sites IA & Chatbots', href: '/#solutions' },
  ],
  ressources: [
    { label: 'Méthodologie', href: '/#process' },
    { label: 'Cas d\'usage', href: '/#usecases' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Technologies', href: '/#tech' },
  ],
  entreprise: [
    { label: 'À propos', href: '/#team' },
    { label: 'Contact', href: '/#contact' },
  ],
  legal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'CGV', href: '/cgv' },
    { label: 'Confidentialité', href: '/confidentialite' },
  ],
};

export function Footer() {
  const navigate = useNavigate();

  const handleClick = (href: string) => {
    if (href.startsWith('/#')) {
      // Navigate to home and scroll to section
      const sectionId = href.replace('/#', '');
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (href.startsWith('/')) {
      // Navigate to page
      navigate(href);
    }
  };

  return (
    <footer className="bg-[#0A0A0F] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D4AA] flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-white font-semibold text-xl">NeuroLeads</span>
            </Link>
            <p className="text-[#B8B8C8] text-sm mb-6 max-w-xs">
              Installation et exploitation de systèmes autonomes de génération 
              d'opportunités commerciales pilotés par l'IA.
            </p>
            <div className="space-y-3 text-sm text-[#B8B8C8]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0066FF]" />
                <span>18 rue de Cabrières, 30320 Saint-Gervasy</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0066FF]" />
                <span>07 69 57 67 60 / 07 81 89 39 35</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0066FF]" />
                <span>neuroleads.ia@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleClick(link.href)}
                    className="text-[#B8B8C8] hover:text-white text-sm transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2">
              {footerLinks.ressources.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleClick(link.href)}
                    className="text-[#B8B8C8] hover:text-white text-sm transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.entreprise.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleClick(link.href)}
                    className="text-[#B8B8C8] hover:text-white text-sm transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[#B8B8C8] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[#6B6B7B] text-sm">
            © 2024 NeuroLeads. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#6B6B7B] hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#6B6B7B] hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
