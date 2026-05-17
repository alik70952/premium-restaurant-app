import { useState, useRef } from 'react';
import { Search, ShoppingCart, Bell, Star, ChevronRight, Flame, Award, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, FoodItem } from '../AppRouter';
import StatusBar from '../StatusBar';
import BottomNav from '../BottomNav';

interface HomeScreenProps {
  navigate: (screen: Screen, food?: FoodItem) => void;
  cartCount: number;
}

const GOLD = '#C9A961';
const DARK = '#0A0A0A';
const CARD = '#141414';
const SURFACE = '#1C1C1C';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1642477303430-ad6b97b6ad78?w=800&q=90',
    tag: 'CHEF EMPFEHLUNG',
    title: 'Abendmenü\nSignatur',
    sub: 'Heute ab 18:00 Uhr',
  },
  {
    image: 'https://images.unsplash.com/photo-1531973968078-9bb02785f13d?w=800&q=90',
    tag: 'NEUES ANGEBOT',
    title: 'Tasting\nMenü',
    sub: '5 Gänge · CHF 145',
  },
  {
    image: 'https://images.unsplash.com/photo-1673706530246-4c1d8b141748?w=800&q=90',
    tag: 'SAISON SPECIAL',
    title: 'Sommer\nSpezialitäten',
    sub: 'Frisch & Saisonal',
  },
];

const categories = [
  { id: 'empfehlung', label: 'Empfehlungen', active: true },
  { id: 'vorspeisen', label: 'Vorspeisen', active: false },
  { id: 'hauptgerichte', label: 'Hauptgerichte', active: false },
  { id: 'desserts', label: 'Desserts', active: false },
  { id: 'getraenke', label: 'Getränke', active: false },
];

const chefPicks: FoodItem[] = [
  { id: 'c1', name: 'Dry Aged Rindersteak', description: 'Rotweinreduktion & Trüffelkartoffeln', price: 58, image: 'https://images.unsplash.com/photo-1558030018-d461fe79233e?w=400&q=80', category: 'Hauptgerichte', rating: 4.9, reviews: 203 },
  { id: 'c2', name: 'Atlantik-Lachs', description: 'Kräuterbutter & Saisongemüse', price: 42.5, image: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?w=400&q=80', category: 'Hauptgerichte', rating: 4.8, reviews: 124 },
  { id: 'c3', name: 'Gourmet Vorspeise', description: 'Auswahl feiner Spezialitäten', price: 28.5, image: 'https://images.unsplash.com/photo-1616671285410-2a676a9a433d?w=400&q=80', category: 'Vorspeisen', rating: 4.7, reviews: 89 },
];

const popularDishes: FoodItem[] = [
  { id: 'p1', name: 'Hausgemachte Pasta', description: 'Trüffel-Sahnesauce & Parmesan', price: 32, image: 'https://images.unsplash.com/photo-1751890939642-52aa0d543bd0?w=400&q=80', category: 'Hauptgerichte', rating: 4.6, reviews: 156 },
  { id: 'p2', name: 'Schokoladen-Fondant', description: 'Mit Vanilleeis & Karamell', price: 18, image: 'https://images.unsplash.com/photo-1556940185-a527df03afcd?w=400&q=80', category: 'Desserts', rating: 4.8, reviews: 211 },
  { id: 'p3', name: 'Lachsvariation', description: 'Auf Kräutersalat & Rote Bete', price: 36, image: 'https://images.unsplash.com/photo-1676300185165-3f543c1fcb72?w=400&q=80', category: 'Hauptgerichte', rating: 4.7, reviews: 98 },
];

const seasonals: FoodItem[] = [
  { id: 's1', name: 'Chefs Table Menü', description: 'Exklusives 7-Gänge-Erlebnis', price: 165, image: 'https://images.unsplash.com/photo-1753229695018-bf8103cee6d7?w=400&q=80', category: 'Special', rating: 5.0, reviews: 42 },
  { id: 's2', name: 'Saisonale Spezialität', description: 'Frische Zutaten vom Markt', price: 38, image: 'https://images.unsplash.com/photo-1714579340610-88f3a5ce6a18?w=400&q=80', category: 'Hauptgerichte', rating: 4.9, reviews: 67 },
];

export default function HomeScreen({ navigate, cartCount }: HomeScreenProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('empfehlung');
  const heroRef = useRef<NodeJS.Timeout | null>(null);

  const cycleHero = (i: number) => {
    setHeroIndex(i);
    if (heroRef.current) clearTimeout(heroRef.current);
    heroRef.current = setTimeout(() => setHeroIndex((prev) => (prev + 1) % heroSlides.length), 4000);
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: DARK }}>
      <StatusBar />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '90px' }}>

        {/* ── HERO SECTION ── */}
        <div className="relative" style={{ height: '310px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={heroSlides[heroIndex].image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.05) 30%, rgba(10,10,10,0.7) 65%, rgba(10,10,10,0.97) 100%)' }} />
            </motion.div>
          </AnimatePresence>

          {/* Header overlaid on hero */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-3 z-10">
            <div>
              <p style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                Alpen Genuss · Zürich
              </p>
              <p style={{ color: 'rgba(250,250,248,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', marginTop: '1px' }}>
                Bahnhofstrasse 1, 8001 Zürich
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="relative flex items-center justify-center rounded-full"
                style={{ width: '38px', height: '38px', background: 'rgba(20,20,20,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Bell className="w-4 h-4" style={{ color: 'rgba(250,250,248,0.8)' }} />
              </button>
              <button
                onClick={() => navigate('cart')}
                className="relative flex items-center justify-center rounded-full"
                style={{ width: '38px', height: '38px', background: 'rgba(20,20,20,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <ShoppingCart className="w-4 h-4" style={{ color: 'rgba(250,250,248,0.8)' }} />
                {cartCount > 0 && (
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: GOLD, fontSize: '9px', color: '#0A0A0A', fontWeight: 700 }}>
                    {cartCount}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Hero text bottom */}
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-4 h-px" style={{ background: GOLD }} />
                <span style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '2.5px' }}>
                  {heroSlides[heroIndex].tag}
                </span>
              </div>
              <h2
                className="text-white mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '30px', fontWeight: 600, lineHeight: 1.15 }}
              >
                {heroSlides[heroIndex].title.split('\n').map((l, i, a) => <span key={i}>{l}{i < a.length - 1 && <br />}</span>)}
              </h2>
              <div className="flex items-center justify-between">
                <p style={{ color: 'rgba(250,250,248,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>
                  {heroSlides[heroIndex].sub}
                </p>
                {/* Dots */}
                <div className="flex gap-1.5">
                  {heroSlides.map((_, i) => (
                    <button key={i} onClick={() => cycleHero(i)}>
                      <div className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === heroIndex ? 20 : 6, background: i === heroIndex ? GOLD : 'rgba(255,255,255,0.3)' }} />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── GREETING + SEARCH ── */}
        <div className="px-5 pt-5 pb-4">
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <h1 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 600, lineHeight: 1.3 }}>
              Guten Abend,<br /><span style={{ color: GOLD }}>Alexander</span>
            </h1>
            <p style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', marginTop: '2px' }}>
              Was möchten Sie heute genießen?
            </p>
          </motion.div>

          {/* Search */}
          <div
            className="relative mt-4 flex items-center rounded-2xl"
            style={{ background: SURFACE, border: `1px solid ${searchFocused ? 'rgba(201,169,97,0.35)' : 'rgba(255,255,255,0.07)'}`, transition: 'border-color 0.2s' }}
          >
            <Search className="absolute left-4 w-4 h-4" style={{ color: 'rgba(250,250,248,0.35)' }} />
            <input
              type="text"
              placeholder="Wonach haben Sie heute Appetit?"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-11 pr-4 bg-transparent focus:outline-none"
              style={{ height: '48px', color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}
            />
          </div>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div className="px-5 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={() => navigate('reservation')}
              className="relative overflow-hidden rounded-2xl p-4 text-left"
              style={{ background: 'linear-gradient(135deg, rgba(201,169,97,0.15) 0%, rgba(201,169,97,0.05) 100%)', border: '1px solid rgba(201,169,97,0.2)', height: '80px' }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute top-2 right-2 opacity-10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#C9A961" strokeWidth="1.5"/><path d="M3 10h18M8 2v4M16 2v4" stroke="#C9A961" strokeWidth="1.5"/></svg>
              </div>
              <p style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Tisch</p>
              <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600 }}>Reservieren</p>
            </motion.button>
            <motion.button
              onClick={() => navigate('loyalty')}
              className="relative overflow-hidden rounded-2xl p-4 text-left"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)', height: '80px' }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute top-2 right-2 opacity-10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="white" strokeWidth="1.5"/></svg>
              </div>
              <p style={{ color: 'rgba(250,250,248,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Meine</p>
              <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600 }}>Treuepunkte</p>
            </motion.button>
          </div>
        </div>

        {/* ── CATEGORY PILLS ── */}
        <div className="mb-4">
          <div className="flex gap-2 px-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex-shrink-0 px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  background: activeCategory === cat.id ? GOLD : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${activeCategory === cat.id ? GOLD : 'transparent'}`,
                  color: activeCategory === cat.id ? '#0A0A0A' : 'rgba(250,250,248,0.55)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: activeCategory === cat.id ? 600 : 400,
                  whiteSpace: 'nowrap',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CHEF EMPFEHLUNGEN ── */}
        <div className="mb-7">
          <div className="flex items-center justify-between px-5 mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" style={{ color: GOLD }} />
              <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 600 }}>
                Chef Empfehlungen
              </h2>
            </div>
            <button className="flex items-center gap-1" style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>
              Alle <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex gap-4 px-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {chefPicks.map((dish) => (
              <motion.button
                key={dish.id}
                onClick={() => navigate('food-detail', dish)}
                className="flex-shrink-0 rounded-2xl overflow-hidden text-left"
                style={{ width: '180px', background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="relative" style={{ height: '130px' }}>
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(20,20,20,0.8) 100%)' }} />
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full px-2 py-1" style={{ background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(8px)' }}>
                    <Star className="w-3 h-3" style={{ color: GOLD, fill: GOLD }} />
                    <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600 }}>{dish.rating}</span>
                  </div>
                </div>
                <div className="p-3">
                  <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, lineHeight: 1.3, marginBottom: '3px' }}>{dish.name}</p>
                  <p style={{ color: 'rgba(250,250,248,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', marginBottom: '8px' }} className="line-clamp-1">{dish.description}</p>
                  <p style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600 }}>CHF {dish.price.toFixed(2)}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── LOYALTY TEASER ── */}
        <div className="px-5 mb-7">
          <motion.button
            onClick={() => navigate('loyalty')}
            className="w-full rounded-2xl overflow-hidden relative flex items-center gap-4 p-4"
            style={{
              background: 'linear-gradient(120deg, #1C1608 0%, #2A2010 40%, #1C1608 100%)',
              border: '1px solid rgba(201,169,97,0.25)',
              boxShadow: '0 8px 32px rgba(201,169,97,0.08)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,169,97,0.15)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#C9A961" strokeWidth="1.5" fill="none"/></svg>
            </div>
            <div className="flex-1 text-left">
              <p style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '3px' }}>Gold Member</p>
              <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600, marginBottom: '2px' }}>1.450 Treuepunkte</p>
              <p style={{ color: 'rgba(201,169,97,0.7)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>550 Punkte bis zum nächsten Level</p>
            </div>
            <ChevronRight className="w-5 h-5" style={{ color: GOLD }} />
          </motion.button>
        </div>

        {/* ── HEUTE BELIEBT ── */}
        <div className="mb-7">
          <div className="flex items-center justify-between px-5 mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4" style={{ color: '#FF6B35' }} />
              <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 600 }}>
                Heute beliebt
              </h2>
            </div>
          </div>

          <div className="px-5 space-y-3">
            {popularDishes.map((dish, idx) => (
              <motion.button
                key={dish.id}
                onClick={() => navigate('food-detail', dish)}
                className="w-full flex items-center gap-4 rounded-2xl overflow-hidden text-left"
                style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)', padding: '12px' }}
                whileTap={{ scale: 0.98 }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 * idx }}
              >
                <div className="relative rounded-xl overflow-hidden flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600, marginBottom: '3px' }}>{dish.name}</p>
                  <p style={{ color: 'rgba(250,250,248,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', marginBottom: '8px' }} className="truncate">{dish.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" style={{ color: GOLD, fill: GOLD }} />
                      <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 600 }}>{dish.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" style={{ color: 'rgba(250,250,248,0.35)' }} />
                      <span style={{ color: 'rgba(250,250,248,0.35)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>20–30 Min</span>
                    </div>
                  </div>
                </div>
                <p style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600, flexShrink: 0 }}>CHF {dish.price.toFixed(0)}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── SAISONALE HIGHLIGHTS ── */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-5 mb-4">
            <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 600 }}>
              Saisonale Highlights
            </h2>
          </div>
          <div className="flex gap-4 px-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {seasonals.map((dish) => (
              <motion.button
                key={dish.id}
                onClick={() => navigate('food-detail', dish)}
                className="flex-shrink-0 rounded-2xl overflow-hidden text-left relative"
                style={{ width: '240px', height: '160px' }}
                whileTap={{ scale: 0.97 }}
              >
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.8) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '3px' }}>{dish.category}</p>
                  <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 600, marginBottom: '1px' }}>{dish.name}</p>
                  <p style={{ color: 'rgba(250,250,248,0.65)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>ab CHF {dish.price.toFixed(0)}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav activeScreen="home" navigate={navigate} />
    </div>
  );
}
