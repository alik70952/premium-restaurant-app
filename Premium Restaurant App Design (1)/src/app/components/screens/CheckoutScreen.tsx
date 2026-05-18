import { useState } from 'react';
import { ArrowLeft, MapPin, Check, ChevronRight, Clock } from 'lucide-react';
import { CartItem } from '../AppRouter';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutScreenProps {
  cart: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

const GOLD = '#C9A961';
const CARD = '#141414';
const SURFACE = '#1C1C1C';

const paymentMethods = [
  { id: 'apple', label: 'Apple Pay', logo: '🍎', sub: 'Touch ID bestätigen' },
  { id: 'card', label: 'Kreditkarte', logo: '💳', sub: '•••• •••• •••• 4242' },
  { id: 'google', label: 'Google Pay', logo: 'G', sub: 'Google Wallet' },
];

const timeSlots = ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

export default function CheckoutScreen({ cart, onBack, onComplete }: CheckoutScreenProps) {
  const [payment, setPayment] = useState('apple');
  const [timeSlot, setTimeSlot] = useState('19:00');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<'details' | 'confirm'>('details');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 5.00;

  const handleOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(onComplete, 2500);
    }, 2000);
  };

  if (success) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8" style={{ background: '#0A0A0A' }}>
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 250, damping: 20 }} className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #2d7a2d, #1d5a1d)', boxShadow: '0 16px 40px rgba(45,122,45,0.4)' }}>
            <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>Bestellung aufgegeben!</h2>
          <p style={{ color: 'rgba(250,250,248,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
            Ihre Bestellung wird von unserem Team vorbereitet. Sie erhalten in Kürze eine Bestätigung.
          </p>
          <div className="px-6 py-4 rounded-2xl w-full mb-4" style={{ background: SURFACE }}>
            <div className="flex items-center justify-between">
              <span style={{ color: 'rgba(250,250,248,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>Bestellnummer</span>
              <span style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 700 }}>#AG-1347</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: GOLD }} />
            <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>Weiterleitung zur Startseite…</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: '#0A0A0A' }}>

      {/* Header */}
      <div className="flex items-center gap-4 px-5 pb-4 pt-2 flex-shrink-0">
        <motion.button onClick={onBack} className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', background: SURFACE, border: '1px solid rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.92 }} disabled={processing}>
          <ArrowLeft className="w-5 h-5" style={{ color: '#FAFAF8' }} />
        </motion.button>
        <h1 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 600 }}>Kasse</h1>
        {/* Step indicator */}
        <div className="ml-auto flex items-center gap-1">
          {['details', 'confirm'].map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: step === s || (i === 0 && step === 'confirm') ? GOLD : SURFACE, border: `1px solid ${step === s || (i === 0 && step === 'confirm') ? GOLD : 'rgba(255,255,255,0.15)'}` }}>
                <span style={{ color: step === s || (i === 0 && step === 'confirm') ? '#0A0A0A' : 'rgba(250,250,248,0.4)', fontSize: '10px', fontWeight: 700 }}>{i + 1}</span>
              </div>
              {i === 0 && <div className="w-6 h-px" style={{ background: step === 'confirm' ? GOLD : 'rgba(255,255,255,0.15)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5" style={{ paddingBottom: '110px' }}>
        <AnimatePresence mode="wait">
          {step === 'details' ? (
            <motion.div key="details" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
              {/* Delivery address */}
              <div className="mb-5">
                <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>Lieferadresse</p>
                <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,169,97,0.12)' }}>
                    <MapPin className="w-5 h-5" style={{ color: GOLD }} />
                  </div>
                  <div className="flex-1">
                    <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600 }}>Bahnhofstrasse 1</p>
                    <p style={{ color: 'rgba(250,250,248,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>8001 Zürich, Schweiz</p>
                  </div>
                  <button style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500 }}>Ändern</button>
                </div>
              </div>

              {/* Delivery time */}
              <div className="mb-5">
                <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>Lieferzeit</p>
                <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                  {timeSlots.map((slot) => (
                    <button key={slot} onClick={() => setTimeSlot(slot)} className="flex-shrink-0 px-4 py-2.5 rounded-xl flex items-center gap-1.5" style={{ background: timeSlot === slot ? 'rgba(201,169,97,0.15)' : SURFACE, border: `1px solid ${timeSlot === slot ? 'rgba(201,169,97,0.4)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.2s' }}>
                      <Clock className="w-3 h-3" style={{ color: timeSlot === slot ? GOLD : 'rgba(250,250,248,0.4)' }} />
                      <span style={{ color: timeSlot === slot ? GOLD : 'rgba(250,250,248,0.55)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: timeSlot === slot ? 600 : 400 }}>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="mb-5">
                <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>Zahlungsart</p>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <motion.button key={method.id} onClick={() => setPayment(method.id)} className="w-full flex items-center gap-3 p-4 rounded-2xl text-left"
                      style={{ background: payment === method.id ? 'rgba(201,169,97,0.08)' : CARD, border: `1.5px solid ${payment === method.id ? 'rgba(201,169,97,0.4)' : 'rgba(255,255,255,0.07)'}`, transition: 'all 0.2s' }} whileTap={{ scale: 0.98 }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: SURFACE }}>
                        {method.logo}
                      </div>
                      <div className="flex-1">
                        <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600 }}>{method.label}</p>
                        <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>{method.sub}</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: payment === method.id ? GOLD : 'rgba(255,255,255,0.2)' }}>
                        {payment === method.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: GOLD }} />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <div className="rounded-2xl p-4" style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
                <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Bestellübersicht</p>
                <div className="space-y-2 mb-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span style={{ color: 'rgba(250,250,248,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>{item.quantity}× {item.name}</span>
                      <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500 }}>CHF {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="flex justify-between">
                  <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600 }}>Gesamt</span>
                  <span style={{ color: GOLD, fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 600 }}>CHF {total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="confirm" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
              <div className="flex flex-col items-center py-8 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(201,169,97,0.1)', border: '1px solid rgba(201,169,97,0.2)' }}>
                  <span style={{ fontSize: '32px' }}>{paymentMethods.find(p => p.id === payment)?.logo}</span>
                </div>
                <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>Bestellung bestätigen</h2>
                <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', marginBottom: '4px' }}>Gesamtbetrag</p>
                <p style={{ color: GOLD, fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: 700, marginBottom: '4px' }}>CHF {total.toFixed(2)}</p>
                <p style={{ color: 'rgba(250,250,248,0.3)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', marginBottom: '32px' }}>via {paymentMethods.find(p => p.id === payment)?.label} · Lieferzeit {timeSlot}</p>
                <div className="w-full p-4 rounded-2xl" style={{ background: SURFACE }}>
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between py-1">
                      <span style={{ color: 'rgba(250,250,248,0.55)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>{item.quantity}× {item.name}</span>
                      <span style={{ color: 'rgba(250,250,248,0.55)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>CHF {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-5" style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {step === 'details' ? (
          <motion.button onClick={() => setStep('confirm')} className="w-full flex items-center justify-between rounded-2xl px-6"
            style={{ height: '56px', background: 'linear-gradient(135deg, #C9A961, #A8862E)', boxShadow: '0 8px 24px rgba(201,169,97,0.3)' }} whileTap={{ scale: 0.98 }}>
            <span style={{ color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 700 }}>Weiter zur Bestätigung</span>
            <ChevronRight className="w-5 h-5 text-black/60" />
          </motion.button>
        ) : (
          <motion.button onClick={handleOrder} className="w-full flex items-center justify-center gap-3 rounded-2xl"
            style={{ height: '56px', background: processing ? SURFACE : 'linear-gradient(135deg, #C9A961, #A8862E)', boxShadow: processing ? 'none' : '0 8px 24px rgba(201,169,97,0.3)' }} whileTap={{ scale: 0.98 }}>
            {processing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 600 }}>Wird verarbeitet…</span>
              </>
            ) : (
              <span style={{ color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 700 }}>Jetzt bestellen · CHF {total.toFixed(2)}</span>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
