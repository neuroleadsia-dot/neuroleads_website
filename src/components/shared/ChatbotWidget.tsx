import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `Tu es l'assistant IA de NeuroLeads, une agence spécialisée dans l'intégration de solutions d'intelligence artificielle pour les entreprises. Tu t'appelles "Neuro", l'assistant virtuel de NeuroLeads.

## Ta mission
- Répondre aux questions des visiteurs sur les services de NeuroLeads
- Qualifier les prospects en comprenant leurs besoins
- Guider les visiteurs vers une prise de rendez-vous ou un contact
- Être professionnel, chaleureux et concis

## Les services de NeuroLeads

### 1. AI Revenue Engine
- Système autonome de prospection B2B piloté par l'IA
- Génération de leads qualifiés automatisée
- Scoring et priorisation intelligente

### 2. Voice Agents IA
- Agents vocaux IA pour gestion d'appels entrants/sortants 24/7
- Voix naturelle, multilingue
- Qualification et prise de rendez-vous automatisée

### 3. Automatisation sur mesure
- Intégration CRM, ERP, HRIS
- Workflows visuels intelligents
- Plus de 200 intégrations disponibles

### 4. Sites IA & Chatbots
- Chatbots intelligents pour sites web
- NLP avancé, qualification en temps réel
- Solutions sur mesure adaptées au contexte métier

## Informations de contact
- Email : neuroleads.ia@gmail.com
- Téléphone : 07 69 57 67 60 / 07 81 89 39 35
- Temps de réponse garanti : 24h

## Règles de conversation
1. Réponds TOUJOURS en français, sauf si le visiteur écrit dans une autre langue
2. Sois concis (2-4 phrases max par réponse)
3. Quand le visiteur montre de l'intérêt, propose de réserver un diagnostic gratuit via le formulaire de contact sur le site
4. Si on te pose une question hors sujet, redirige poliment vers les services
5. Ne donne jamais de prix exact — dis que c'est sur mesure et propose un diagnostic gratuit
6. Utilise des emojis de façon modérée et professionnelle
7. Ne t'invente jamais d'informations. Si tu ne sais pas, propose de mettre en contact avec l'équipe`;

const quickReplies = [
  { label: 'En savoir plus sur vos solutions', message: 'Quels services proposez-vous ?' },
  { label: 'Réserver un diagnostic', message: 'Je souhaite réserver un diagnostic gratuit.' },
  { label: 'Combien ça coûte ?', message: 'Quels sont vos tarifs ?' },
  { label: 'Parler à un conseiller', message: 'Je souhaite parler à un conseiller.' },
];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  // Track mobile breakpoint so we can apply dvh-based height (fixes iOS keyboard overlap)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 640
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Track keyboard height as a CSS variable so the chat bottom edge
  // can slide above the keyboard instantly (no React re-render needed).
  useEffect(() => {
    const vp = window.visualViewport;
    if (!vp) return;
    const update = () => {
      const kbH = Math.max(0, window.innerHeight - vp.height);
      document.documentElement.style.setProperty('--kb-h', `${kbH}px`);
    };
    update();
    vp.addEventListener('resize', update);
    vp.addEventListener('scroll', update);
    return () => {
      vp.removeEventListener('resize', update);
      vp.removeEventListener('scroll', update);
      document.documentElement.style.removeProperty('--kb-h');
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowQuickReplies(false);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('rate_limit');
        }
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data?.content?.[0]?.text;

      if (!responseText) {
        throw new Error('invalid_response');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      let errorMessage = "Oups, un petit souci technique ! Vous pouvez nous contacter directement au 07 69 57 67 60 ou par email à neuroleads.ia@gmail.com.";

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "La réponse prend trop de temps. Veuillez réessayer ou nous contacter par email.";
        } else if (error.message === 'rate_limit') {
          errorMessage = "Trop de messages envoyés. Veuillez patienter quelques instants.";
        }
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4AA] text-white shadow-lg shadow-[#0066FF]/30 flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            className="fixed z-50 bg-[#12121A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col
                       left-3 right-3 top-4
                       sm:left-auto sm:right-6 sm:top-auto sm:bottom-24 sm:w-96 sm:max-w-[calc(100vw-48px)]"
            style={isMobile ? {
              // No keyboard: bottom stays 88px above viewport bottom (above toggle button).
              // Keyboard open: --kb-h = keyboard height, bottom slides above keyboard instantly.
              // Height is auto-calculated from top (16px) + bottom, so no explicit height needed.
              bottom: 'max(88px, calc(var(--kb-h, 0px) + 8px))',
            } : {
              height: 'min(520px, calc(100vh - 120px))',
            }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#0066FF] to-[#00D4AA]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Neuro - Assistant IA</h3>
                  <p className="text-white/70 text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block animate-pulse"></span>
                    En ligne
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Welcome message */}
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-[#1A1A25] text-[#B8B8C8] rounded-bl-md">
                  Bonjour ! Je suis <strong>Neuro</strong>, l'assistant IA de NeuroLeads. Comment puis-je vous aider aujourd'hui ?
                </div>
              </div>

              {/* Quick Replies */}
              {showQuickReplies && messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.label}
                      onClick={() => sendMessage(reply.message)}
                      className="px-3 py-2 text-xs bg-[#1A1A25] hover:bg-[#0066FF]/20 text-[#B8B8C8] hover:text-white rounded-full border border-white/10 hover:border-[#0066FF]/30 transition-colors"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Conversation */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-[#0066FF] text-white rounded-br-md'
                        : 'bg-[#1A1A25] text-[#B8B8C8] rounded-bl-md'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-[#1A1A25] rounded-bl-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8B8C8]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8B8C8]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8B8C8]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Votre message..."
                  className="flex-1 px-4 py-2 bg-[#1A1A25] border border-white/10 rounded-full text-white placeholder-[#6B6B7B] focus:outline-none focus:border-[#0066FF]/50 text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-[#0066FF] text-white flex items-center justify-center hover:bg-[#0052CC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
