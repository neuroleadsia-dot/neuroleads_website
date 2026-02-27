import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const quickReplies = [
  'En savoir plus sur vos solutions',
  'Réserver un diagnostic',
  'Combien ça coûte ?',
  'Parler à un conseiller',
];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleQuickReply = (reply: string) => {
    setMessages([...messages, { text: reply, isUser: true }]);
    
    setTimeout(() => {
      let response = '';
      switch (reply) {
        case 'En savoir plus sur vos solutions':
          response = 'Nous proposons 4 solutions : AI Revenue Engine, Voice Agents IA, Automatisation sur mesure, et Sites IA & Chatbots. Quelle vous intéresse ?';
          break;
        case 'Réserver un diagnostic':
          response = 'Parfait ! Faites défiler jusqu\'à la section "Prêt à transformer votre prospection" ou cliquez sur "Réserver un diagnostic" dans le menu.';
          break;
        case 'Combien ça coûte ?':
          response = 'Nos forfaits sont adaptés à votre taille et vos besoins. Le diagnostic initial est gratuit. Souhaitez-vous que nous vous contactions pour un devis ?';
          break;
        case 'Parler à un conseiller':
          response = 'Je peux transmettre votre demande. Pouvez-vous me laisser votre nom et email ? Un conseiller vous contactera sous 24h.';
          break;
        default:
          response = 'Je comprends. Un conseiller va prendre contact avec vous rapidement. Pouvez-vous me laisser votre email ?';
      }
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    }, 800);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      handleQuickReply(inputValue);
      setInputValue('');
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-48px)] bg-[#12121A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#0066FF] to-[#00D4AA]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Assistant NeuroLeads</h3>
                  <p className="text-white/70 text-sm">En ligne</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.isUser
                        ? 'bg-[#0066FF] text-white rounded-br-md'
                        : 'bg-[#1A1A25] text-[#B8B8C8] rounded-bl-md'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {/* Quick Replies */}
              {messages[messages.length - 1]?.isUser === false && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-2 text-xs bg-[#1A1A25] hover:bg-[#0066FF]/20 text-[#B8B8C8] hover:text-white rounded-full border border-white/10 hover:border-[#0066FF]/30 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Votre message..."
                  className="flex-1 px-4 py-2 bg-[#1A1A25] border border-white/10 rounded-full text-white placeholder-[#6B6B7B] focus:outline-none focus:border-[#0066FF]/50 text-sm"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 rounded-full bg-[#0066FF] text-white flex items-center justify-center hover:bg-[#0052CC] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
