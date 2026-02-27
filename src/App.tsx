import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { SocialProofSection } from './components/sections/SocialProofSection';
import { ProblemSection } from './components/sections/ProblemSection';
import { SolutionSection } from './components/sections/SolutionSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { UseCasesSection } from './components/sections/UseCasesSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { TeamSection } from './components/sections/TeamSection';
import { FAQSection } from './components/sections/FAQSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { ChatbotWidget } from './components/shared/ChatbotWidget';
import { LegalPage } from './pages/LegalPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Home page with all sections
function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
        <UseCasesSection />
        <TechStackSection />
        <TestimonialsSection />
        <TeamSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0A0A0F]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
          <Route path="/cgv" element={<LegalPage type="cgv" />} />
          <Route path="/confidentialite" element={<LegalPage type="confidentialite" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
