import { ArrowLeft, ChevronRight, Zap, Gift, Crown, Star } from 'lucide-react';
import { motion } from 'motion/react';
import BottomNav from '../BottomNav';
import { Screen } from '../AppRouter';

interface LoyaltyScreenProps {
  onBack: () => void;
  navigate?: (screen: Screen) => void;
}

const GOLD = '#C9A961';
const CARD = '#141414';
const SURFACE = '#1C1C1C';

const rewards = [
  { id: 'r1', emoji: '🍰', title: 'Gratis Dessert', points: 500, desc: 'Beliebiges Dessert der Karte', available: true },
  { id: 'r2', emoji: '🍷', title: 'Weinbegleitung', points: 800, desc: 'Weinpairing zum Menü', available: true },
  { id: 'r3', emoji: '🍽️', title: 'Premium Hauptgang', points: 1200, desc: 'Hauptgericht Ihrer Wahl gratis', available: true },
  { id: 'r4', emoji: '👨‍🍳', title: "Chef's Table", points: 2000, desc: 'Exklusives Degustationsmenü', available: false },
];

const history = [
  { date: '15. Mai', action: 'Bestellung #1247', points: +120, type: 'earn' },
  { date: '12. Mai', action: 'Tischreservierung', points: +50, type: 'earn' },
  { date: '08. Mai', action: 'Dessert eingelöst', points: -500, type: 'spend' },
  { date: '02. Mai', action: 'Bestellung #1231', points: +95, type: 'earn' },
  { date: '25. April', action: 'Bewertung abgegeben', points: +25, type: 'earn' },
];

const benefits = [
  { icon: '🥂', title: 'Willkommensgetränk', desc: 'Bei jeder Reservierung' },
  { icon: '🎂', title: 'Geburtstags-Special', desc: 'Exklusives Geburtstagsmenü' },
  { icon: '🔑', title: 'VIP-Zugang', desc: 'Private Events & Tastings' },
];

export default function LoyaltyScreen({ onBack, navigate }: LoyaltyScreenProps) {
  const currentPoints = 1450;
  const nextTierPoints = 2000;
  const progress = (currentPoints / nextTierPoints) * 100;

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: '#0A0A0A' }}>
      <div className="flex items-center gap-4 px-5 pb-4 pt-2 flex-shrink-0">
        <motion.button onClick={onBack} className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', background: SURFACE, border: '1px solid rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.92 }}>
          <ArrowLeft className="w-5 h-5" style={{ color: '#FAFAF8' }} />
        </motion.button>
        <h1 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 600 }}>Treueprogramm</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5" style={{ paddingBottom: navigate ? '100px' : '32px' }}>

        {/* Gold Membership Card */}
        <motion.div
          className="relative rounded-3xl overflow-hidden mb-6"
          style={{ height: '200px', background: 'linear-gradient(135deg, #1C1608 0%, #2E2210 35%, #1A140A 65%, #0E0C06 100%)' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,169,97,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,169,97,0.06) 0%, transparent 70%)', transform: 'translate(-20%, 30%)' }} />
          <div className="absolute inset-0" style={{ border: '1px solid rgba(201,169,97,0.2)', borderRadius: '24px' }} />

          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-4 h-4" style={{ color: GOLD }} />
                  <span style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>Gold Member</span>
                </div>
                <p style={{ color: 'rgba(201,169,97,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>Alpen Genuss Zürich</p>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(201,169,97,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(201,169,97,0.2)' }}>
                <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
                  <path d="M18 4L32 30H4L18 4Z" stroke="#C9A961" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                  <path d="M10 22H26" stroke="#C9A961" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div>
              <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', marginBottom: '4px' }}>Ihre Punkte</p>
              <p style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '40px', fontWeight: 700, lineHeight: 1, marginBottom: '12px' }}>
                {currentPoints.toLocaleString('de-CH')}
              </p>
              {/* Progress bar */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <span style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px' }}>Gold</span>
                  <span style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600 }}>{nextTierPoints - currentPoints} bis Platin</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, #C9A961, #E8C97A)` }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Besuche', value: '24', icon: <Star className="w-4 h-4" style={{ color: GOLD }} /> },
            { label: 'Eingelöst', value: '6', icon: <Gift className="w-4 h-4" style={{ color: GOLD }} /> },
            { label: 'Gespart', value: 'CHF 180', icon: <Zap className="w-4 h-4" style={{ color: GOLD }} /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className="rounded-2xl p-3 flex flex-col items-center gap-1" style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
              {icon}
              <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 700 }}>{value}</p>
              <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Rewards */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 600 }}>Prämien einlösen</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {rewards.map((reward) => {
              const canRedeem = currentPoints >= reward.points;
              return (
                <motion.div key={reward.id} className="flex-shrink-0 rounded-2xl p-4 flex flex-col gap-2" style={{ width: '155px', background: CARD, border: `1px solid ${canRedeem ? 'rgba(201,169,97,0.2)' : 'rgba(255,255,255,0.06)'}`, opacity: reward.available ? 1 : 0.5 }}>
                  <span style={{ fontSize: '28px' }}>{reward.emoji}</span>
                  <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600, lineHeight: 1.3 }}>{reward.title}</p>
                  <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', lineHeight: 1.4, flex: 1 }}>{reward.desc}</p>
                  <div className="flex items-center justify-between">
                    <span style={{ color: canRedeem ? GOLD : 'rgba(250,250,248,0.35)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 700 }}>{reward.points} Pkt.</span>
                    {canRedeem ? (
                      <motion.button className="px-2.5 py-1 rounded-lg" style={{ background: 'rgba(201,169,97,0.15)', border: '1px solid rgba(201,169,97,0.3)', color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600 }} whileTap={{ scale: 0.9 }}>
                        Einlösen
                      </motion.button>
                    ) : (
                      <span style={{ color: 'rgba(250,250,248,0.2)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px' }}>{reward.points - currentPoints} fehlen</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* VIP Benefits */}
        <div className="mb-6">
          <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Gold-Vorteile</h2>
          <div className="space-y-2">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: SURFACE, border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '22px' }}>{b.icon}</span>
                <div className="flex-1">
                  <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600 }}>{b.title}</p>
                  <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>{b.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: 'rgba(250,250,248,0.2)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="mb-4">
          <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Punktehistorie</h2>
          <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
            {history.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3" style={{ borderBottom: i < history.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div>
                  <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500 }}>{item.action}</p>
                  <p style={{ color: 'rgba(250,250,248,0.35)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px' }}>{item.date}</p>
                </div>
                <span style={{ color: item.type === 'earn' ? '#4ade80' : '#f87171', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 700 }}>
                  {item.type === 'earn' ? '+' : ''}{item.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {navigate && <BottomNav activeScreen="loyalty" navigate={navigate} />}
    </div>
  );
}
