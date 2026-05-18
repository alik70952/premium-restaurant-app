import profileAvatarImage from '../../../assets/images/profile-avatar.svg';
import { ArrowLeft, ChevronRight, Bell, Globe, HelpCircle, Shield, LogOut, CreditCard, MapPin, Crown, Edit3 } from 'lucide-react';
import { motion } from 'motion/react';
import StatusBar from '../StatusBar';
import BottomNav from '../BottomNav';
import { Screen } from '../AppRouter';

interface ProfileScreenProps {
  onBack: () => void;
  navigate?: (screen: Screen) => void;
}

const GOLD = '#C9A961';
const CARD = '#141414';
const SURFACE = '#1C1C1C';

const orderHistory = [
  { id: '#1247', date: '15. Mai', items: 'Lachs & Pasta', total: 74.50, status: 'Geliefert' },
  { id: '#1231', date: '8. Mai', items: 'Steak & Wein', total: 95.00, status: 'Geliefert' },
  { id: '#1208', date: '1. Mai', items: 'Tasting Menü', total: 145.00, status: 'Geliefert' },
];

const settingsSections = [
  {
    title: 'Konto',
    items: [
      { icon: CreditCard, label: 'Zahlungsmethoden', value: 'Visa •••• 4242' },
      { icon: MapPin, label: 'Lieferadressen', value: 'Bahnhofstrasse 1' },
      { icon: Crown, label: 'Mitgliedschaft', value: 'Gold Member' },
    ],
  },
  {
    title: 'Einstellungen',
    items: [
      { icon: Bell, label: 'Benachrichtigungen', toggle: true, on: true },
      { icon: Globe, label: 'Sprache', value: 'Deutsch' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Hilfe & FAQ', chevron: true },
      { icon: Shield, label: 'Datenschutz', chevron: true },
    ],
  },
];

export default function ProfileScreen({ onBack, navigate }: ProfileScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: '#0A0A0A' }}>
      <StatusBar />
      <div className="flex items-center gap-4 px-5 pb-4 pt-2 flex-shrink-0">
        <motion.button onClick={onBack} className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', background: SURFACE, border: '1px solid rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.92 }}>
          <ArrowLeft className="w-5 h-5" style={{ color: '#FAFAF8' }} />
        </motion.button>
        <h1 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 600 }}>Profil</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5" style={{ paddingBottom: navigate ? '100px' : '32px' }}>

        {/* User card */}
        <motion.div
          className="relative rounded-3xl p-5 mb-6 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #161208 0%, #1E1A0C 100%)', border: '1px solid rgba(201,169,97,0.15)' }}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={profileAvatarImage} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: GOLD }}>
                <Edit3 className="w-3 h-3 text-black" />
              </div>
            </div>
            <div className="flex-1">
              <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 600, marginBottom: '2px' }}>Alexander Weber</h2>
              <p style={{ color: 'rgba(250,250,248,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', marginBottom: '10px' }}>a.weber@email.com</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(201,169,97,0.12)', border: '1px solid rgba(201,169,97,0.2)' }}>
                  <Crown className="w-3 h-3" style={{ color: GOLD }} />
                  <span style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '1px' }}>GOLD</span>
                </div>
                <span style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>1.450 Punkte</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent orders */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 600 }}>Letzte Bestellungen</h2>
            <button style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>Alle</button>
          </div>
          <div className="space-y-2">
            {orderHistory.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-4 py-3 rounded-2xl" style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
                <div>
                  <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600 }}>{order.items}</p>
                  <p style={{ color: 'rgba(250,250,248,0.35)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px' }}>{order.date} · {order.id}</p>
                </div>
                <div className="text-right">
                  <p style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600 }}>CHF {order.total.toFixed(2)}</p>
                  <p style={{ color: '#4ade80', fontFamily: "'DM Sans', sans-serif", fontSize: '11px' }}>✓ {order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings sections */}
        {settingsSections.map((section) => (
          <div key={section.title} className="mb-5">
            <p style={{ color: 'rgba(250,250,248,0.35)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
              {section.title}
            </p>
            <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
              {section.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.button key={item.label} className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                    style={{ borderBottom: i < section.items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }} whileTap={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: SURFACE }}>
                      <Icon className="w-4 h-4" style={{ color: GOLD }} />
                    </div>
                    <span className="flex-1" style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500 }}>{item.label}</span>
                    {item.toggle ? (
                      <div className="w-11 h-6 rounded-full relative" style={{ background: item.on ? GOLD : SURFACE, border: `1px solid ${item.on ? GOLD : 'rgba(255,255,255,0.15)'}`, transition: 'all 0.2s' }}>
                        <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200" style={{ left: item.on ? 'calc(100% - 22px)' : '2px' }} />
                      </div>
                    ) : item.value ? (
                      <span style={{ color: 'rgba(250,250,248,0.35)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>{item.value}</span>
                    ) : (
                      <ChevronRight className="w-4 h-4" style={{ color: 'rgba(250,250,248,0.2)' }} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <motion.button
          className="w-full flex items-center justify-center gap-2 rounded-2xl mb-4"
          style={{ height: '52px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span style={{ color: '#f87171', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 500 }}>Abmelden</span>
        </motion.button>

        <p className="text-center" style={{ color: 'rgba(250,250,248,0.2)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px' }}>
          Alpen Genuss Zürich · Version 2.4.1
        </p>
      </div>

      {navigate && <BottomNav activeScreen="profile" navigate={navigate} />}
    </div>
  );
}
