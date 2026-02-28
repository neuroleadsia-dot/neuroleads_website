import { X, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect, useState } from 'react';

const CAL_LINK = 'neuroleads-9lh0hr/audit-gratuit';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [calError, setCalError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        cal('ui', {
          theme: 'dark',
          cssVarsPerTheme: {
            dark: {
              'cal-brand': '#0066FF',
              'cal-brand-emphasis': '#00D4AA',
              'cal-text': '#ffffff',
              'cal-text-emphasis': '#ffffff',
              'cal-bg': '#0A0A0F',
              'cal-bg-emphasis': '#12121A',
            },
            light: {
              'cal-brand': '#0066FF',
              'cal-brand-emphasis': '#00D4AA',
            },
          },
          hideEventTypeDetails: false,
        });
        setCalError(false);
      } catch (error) {
        console.error('Cal.com initialization error:', error);
        setCalError(true);
      }
    })();
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl bg-[#0A0A0F] border border-white/10"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0066FF] to-[#00D4AA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">
                Réserver un créneau
              </h3>
              <p className="text-white/70 text-sm">
                Choisissez un horaire qui vous convient
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cal.com Embed or Error Fallback */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {calError ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-red-500/15">
                <AlertCircle size={28} className="text-red-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">
                Impossible de charger le calendrier
              </h4>
              <p className="text-[#B8B8C8] text-sm mb-6 max-w-sm">
                Le service de réservation est temporairement indisponible.
                Vous pouvez nous contacter directement.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setCalError(false);
                    window.location.reload();
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:scale-105 bg-[#0066FF]/20 border border-[#0066FF]/40 text-white"
                >
                  <RefreshCw size={14} />
                  Réessayer
                </button>
                <a
                  href="https://wa.me/33781893935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:scale-105 bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <Cal
              calLink={CAL_LINK}
              style={{
                width: '100%',
                height: '100%',
                overflow: 'scroll',
                minHeight: '500px',
              }}
              config={{
                layout: 'month_view',
                theme: 'dark',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
