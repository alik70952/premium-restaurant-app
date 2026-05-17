import { useState } from 'react';
import { ArrowLeft, Star, Plus, Minus, Share2, Heart, Check, Clock, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FoodItem, CartItem } from '../AppRouter';

interface FoodDetailScreenProps {
  food: FoodItem;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
}

const GOLD = '#C9A961';
const DARK = '#0A0A0A';
const CARD = '#141414';
const SURFACE = '#1C1C1C';

const extras = [
  { id: 'e1', name: 'Extra Trüffel', price: 8.50 },
  { id: 'e2', name: 'Premium Sauce', price: 4.50 },
  { id: 'e3', name: 'Zusatz-Beilage', price: 5.00 },
  { id: 'e4', name: 'Käse-Variation', price: 6.00 },
];

const tags = ['Bio-Qualität', 'Regional', 'Glutenfrei'];

export default function FoodDetailScreen({ food, onBack, onAddToCart }: FoodDetailScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const toggleExtra = (id: string) =>
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const extraTotal = selectedExtras.reduce((s, id) => s + (extras.find(e => e.id === id)?.price || 0), 0);
  const totalPrice = (food.price + extraTotal) * quantity;

  const handleAdd = () => {
    onAddToCart({ ...food, quantity, extras: selectedExtras.map(id => extras.find(e => e.id === id)?.name || '') });
    setAddedToCart(true);
    setTimeout(onBack, 1200);
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: DARK }}>
      {/* Hero image */}
      <div className="relative flex-shrink-0" style={{ height: '340px' }}>
        <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.05) 40%, rgba(10,10,10,0.6) 70%, #0A0A0A 100%)' }} />

        {/* Top controls */}
        <div className="absolute top-12 left-0 right-0 flex items-center justify-between px-5">
          <motion.button
            onClick={onBack}
            className="flex items-center justify-center rounded-full"
            style={{ width: '40px', height: '40px', background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.92 }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </motion.button>
          <div className="flex gap-2">
            <motion.button
              className="flex items-center justify-center rounded-full"
              style={{ width: '40px', height: '40px', background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.92 }}
            >
              <Share2 className="w-4 h-4 text-white" />
            </motion.button>
            <motion.button
              onClick={() => setLiked(!liked)}
              className="flex items-center justify-center rounded-full"
              style={{ width: '40px', height: '40px', background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(12px)', border: `1px solid ${liked ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}` }}
              whileTap={{ scale: 0.92 }}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </motion.button>
          </div>
        </div>

        {/* Rating badge */}
        <div
          className="absolute bottom-6 right-5 flex items-center gap-1.5 px-3 py-2 rounded-xl"
          style={{ background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(201,169,97,0.2)' }}
        >
          <Star className="w-3.5 h-3.5" style={{ color: GOLD, fill: GOLD }} />
          <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 700 }}>{food.rating}</span>
          <span style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>({food.reviews})</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '100px' }}>
        <div className="px-5 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(201,169,97,0.12)', border: '1px solid rgba(201,169,97,0.2)', color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              {food.category}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" style={{ color: 'rgba(250,250,248,0.4)' }} />
              <span style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>20–30 Min</span>
            </div>
          </div>

          <h1 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 600, lineHeight: 1.2, marginBottom: '8px' }}>
            {food.name}
          </h1>
          <p style={{ color: 'rgba(250,250,248,0.55)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.65, marginBottom: '16px' }}>
            {food.description}
          </p>

          <div className="flex gap-2 flex-wrap mb-6">
            {tags.map((tag) => (
              <div key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: SURFACE, border: '1px solid rgba(255,255,255,0.07)' }}>
                <Leaf className="w-3 h-3" style={{ color: '#5CB85C' }} />
                <span style={{ color: 'rgba(250,250,248,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>{tag}</span>
              </div>
            ))}
          </div>

          <div className="mb-6" style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

          {/* Extras */}
          <div className="mb-6">
            <h3 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
              Extras hinzufügen
            </h3>
            <div className="space-y-2">
              {extras.map((extra) => {
                const selected = selectedExtras.includes(extra.id);
                return (
                  <motion.button
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left"
                    style={{ background: selected ? 'rgba(201,169,97,0.1)' : SURFACE, border: `1px solid ${selected ? 'rgba(201,169,97,0.35)' : 'rgba(255,255,255,0.07)'}`, transition: 'all 0.2s' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: selected ? GOLD : 'rgba(255,255,255,0.1)', border: `1.5px solid ${selected ? GOLD : 'rgba(255,255,255,0.2)'}`, transition: 'all 0.2s' }}>
                        {selected && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
                      </div>
                      <span style={{ color: selected ? '#FAFAF8' : 'rgba(250,250,248,0.65)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: selected ? 500 : 400 }}>{extra.name}</span>
                    </div>
                    <span style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500 }}>+CHF {extra.price.toFixed(2)}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between mb-6 px-4 py-4 rounded-2xl" style={{ background: SURFACE }}>
            <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600 }}>Anzahl</span>
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: quantity === 1 ? 'rgba(255,255,255,0.06)' : CARD, border: '1px solid rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.9 }}
              >
                <Minus className="w-4 h-4" style={{ color: quantity === 1 ? 'rgba(255,255,255,0.25)' : '#FAFAF8' }} />
              </motion.button>
              <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '18px', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{quantity}</span>
              <motion.button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: GOLD }}
                whileTap={{ scale: 0.9 }}
              >
                <Plus className="w-4 h-4 text-black" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Add to cart CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-5" style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <AnimatePresence mode="wait">
          {addedToCart ? (
            <motion.div key="added" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center justify-center gap-3 rounded-2xl" style={{ height: '56px', background: 'linear-gradient(135deg, #2d7a2d, #1d5a1d)' }}>
              <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
              <span style={{ color: 'white', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 600 }}>Hinzugefügt!</span>
            </motion.div>
          ) : (
            <motion.button
              key="add"
              onClick={handleAdd}
              className="w-full flex items-center justify-between rounded-2xl px-6"
              style={{ height: '56px', background: 'linear-gradient(135deg, #C9A961, #A8862E)', boxShadow: '0 8px 24px rgba(201,169,97,0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={{ color: 'rgba(0,0,0,0.65)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500 }}>
                {quantity} {quantity === 1 ? 'Portion' : 'Portionen'}
              </span>
              <span style={{ color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 700 }}>
                In den Warenkorb
              </span>
              <span style={{ color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 700 }}>
                CHF {totalPrice.toFixed(2)}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
