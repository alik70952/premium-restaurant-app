import cartBreadImage from '../../../assets/images/cart-bread.svg';
import cartAioliImage from '../../../assets/images/cart-aioli.svg';
import { ArrowLeft, Plus, Minus, Trash2, Tag, ShoppingBag, ChevronRight, Zap } from 'lucide-react';
import { CartItem } from '../AppRouter';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CartScreenProps {
  cart: CartItem[];
  onBack: () => void;
  onCheckout: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

const GOLD = '#C9A961';
const CARD = '#141414';
const SURFACE = '#1C1C1C';

const suggestions = [
  { id: 'sug1', name: 'Hausgemachtes Brot', price: 8, image: cartBreadImage },
  { id: 'sug2', name: 'Trüffel-Aioli', price: 5, image: cartAioliImage },
];

export default function CartScreen({ cart, onBack, onCheckout, updateQuantity, removeFromCart }: CartScreenProps) {
  const [discountCode, setDiscountCode] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [appliedCode, setAppliedCode] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryOption === 'delivery' ? 5.00 : 0;
  const discount = appliedCode ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee - discount;
  const earnedPoints = Math.floor(total * 2);

  if (cart.length === 0) {
    return (
      <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="flex items-center gap-4 px-5 pb-4 pt-2">
          <motion.button onClick={onBack} className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', background: SURFACE, border: '1px solid rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.92 }}>
            <ArrowLeft className="w-5 h-5" style={{ color: '#FAFAF8' }} />
          </motion.button>
          <h1 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 600 }}>Warenkorb</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: SURFACE }}>
            <ShoppingBag className="w-10 h-10" style={{ color: 'rgba(250,250,248,0.25)' }} />
          </div>
          <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 600, marginBottom: '8px', textAlign: 'center' }}>Ihr Warenkorb ist leer</h2>
          <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', textAlign: 'center', lineHeight: 1.6, marginBottom: '32px' }}>
            Entdecken Sie unsere exquisiten Gerichte und fügen Sie Ihre Lieblingskreationen hinzu.
          </p>
          <motion.button onClick={onBack} className="px-8 flex items-center justify-center rounded-2xl" style={{ height: '52px', background: 'linear-gradient(135deg, #C9A961, #A8862E)', color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600 }} whileTap={{ scale: 0.97 }}>
            Menü entdecken
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: '#0A0A0A' }}>

      {/* Header */}
      <div className="flex items-center gap-4 px-5 pb-4 pt-2 flex-shrink-0">
        <motion.button onClick={onBack} className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', background: SURFACE, border: '1px solid rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.92 }}>
          <ArrowLeft className="w-5 h-5" style={{ color: '#FAFAF8' }} />
        </motion.button>
        <h1 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 600, flex: 1 }}>Warenkorb</h1>
        <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(201,169,97,0.15)', color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 600 }}>
          {cart.reduce((s, i) => s + i.quantity, 0)} Artikel
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5" style={{ paddingBottom: '100px' }}>
        {/* Delivery toggle */}
        <div className="mb-4 flex rounded-2xl overflow-hidden p-1" style={{ background: SURFACE }}>
          {(['delivery', 'pickup'] as const).map((opt) => (
            <button key={opt} onClick={() => setDeliveryOption(opt)} className="flex-1 py-2.5 rounded-xl transition-all duration-200 text-center"
              style={{ background: deliveryOption === opt ? CARD : 'transparent', border: deliveryOption === opt ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 600, color: deliveryOption === opt ? '#FAFAF8' : 'rgba(250,250,248,0.4)' }}>
              {opt === 'delivery' ? '🛵  Lieferung · 30–45 Min' : '🏃  Abholung · 15–20 Min'}
            </button>
          ))}
        </div>

        {/* Cart items */}
        <div className="space-y-3 mb-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div key={item.id} className="flex gap-3 rounded-2xl p-3" style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }} layout exit={{ opacity: 0, x: -60 }}>
                <img src={item.image} alt={item.name} className="w-[72px] h-[72px] rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, marginBottom: '2px' }} className="truncate">{item.name}</p>
                  <p style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>CHF {item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <motion.button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: SURFACE }} whileTap={{ scale: 0.88 }}>
                      <Minus className="w-3 h-3" style={{ color: '#FAFAF8' }} />
                    </motion.button>
                    <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <motion.button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: GOLD }} whileTap={{ scale: 0.88 }}>
                      <Plus className="w-3 h-3 text-black" />
                    </motion.button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <motion.button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)' }} whileTap={{ scale: 0.88 }}>
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </motion.button>
                  <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600 }}>CHF {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Suggestions */}
        <div className="mb-4">
          <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>Dazu empfehlen wir</p>
          <div className="flex gap-3">
            {suggestions.map((s) => (
              <div key={s.id} className="flex items-center gap-2 flex-1 rounded-xl p-2.5" style={{ background: SURFACE, border: '1px solid rgba(255,255,255,0.07)' }}>
                <img src={s.image} alt={s.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500 }} className="truncate">{s.name}</p>
                  <p style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>CHF {s.price}</p>
                </div>
                <button className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: GOLD }}>
                  <Plus className="w-3 h-3 text-black" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Discount */}
        <div className="mb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(250,250,248,0.3)' }} />
              <input type="text" placeholder="Rabattcode eingeben" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} className="w-full pl-10 pr-4 rounded-xl focus:outline-none"
                style={{ height: '44px', background: SURFACE, border: '1px solid rgba(255,255,255,0.08)', color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }} />
            </div>
            <motion.button onClick={() => discountCode.length > 0 && setAppliedCode(true)} className="px-4 rounded-xl flex-shrink-0"
              style={{ height: '44px', background: discountCode.length > 0 ? GOLD : SURFACE, color: discountCode.length > 0 ? '#0A0A0A' : 'rgba(250,250,248,0.3)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600, transition: 'all 0.2s' }} whileTap={{ scale: 0.95 }}>
              Einlösen
            </motion.button>
          </div>
          {appliedCode && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5" style={{ color: '#4ade80', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>✓ 10% Rabatt angewendet</motion.p>}
        </div>

        {/* Summary */}
        <div className="rounded-2xl p-4 mb-3" style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="space-y-2.5">
            <div className="flex justify-between">
              <span style={{ color: 'rgba(250,250,248,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>Zwischensumme</span>
              <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500 }}>CHF {subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span style={{ color: '#4ade80', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>Rabatt (10%)</span>
                <span style={{ color: '#4ade80', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500 }}>–CHF {discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span style={{ color: 'rgba(250,250,248,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>{deliveryOption === 'delivery' ? 'Liefergebühr' : 'Abholung'}</span>
              <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500 }}>{deliveryOption === 'delivery' ? 'CHF 5.00' : 'Kostenlos'}</span>
            </div>
            <div className="h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="flex justify-between items-center">
              <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 600 }}>Gesamt</span>
              <span style={{ color: GOLD, fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 600 }}>CHF {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Points */}
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.15)' }}>
          <Zap className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
          <p style={{ color: 'rgba(201,169,97,0.9)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>
            Sie erhalten <span style={{ fontWeight: 700, color: GOLD }}>+{earnedPoints} Treuepunkte</span> für diese Bestellung
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-5" style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <motion.button onClick={onCheckout} className="w-full flex items-center justify-between rounded-2xl px-6"
          style={{ height: '56px', background: 'linear-gradient(135deg, #C9A961, #A8862E)', boxShadow: '0 8px 24px rgba(201,169,97,0.3)' }} whileTap={{ scale: 0.98 }}>
          <span style={{ color: 'rgba(0,0,0,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>{cart.reduce((s, i) => s + i.quantity, 0)} Artikel</span>
          <span style={{ color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 700 }}>Zur Kasse</span>
          <div className="flex items-center gap-1">
            <span style={{ color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 700 }}>CHF {total.toFixed(2)}</span>
            <ChevronRight className="w-4 h-4 text-black/60" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
