import onboardingCulinaryImage from '../../../assets/images/onboarding-culinary.svg';
import onboardingTableImage from '../../../assets/images/onboarding-table.svg';
import onboardingDessertImage from '../../../assets/images/onboarding-dessert.svg';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import StatusBar from '../StatusBar';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    image: onboardingCulinaryImage,
    eyebrow: 'HANDWERK & LEIDENSCHAFT',
    title: 'Kulinarik auf\nhöchstem Niveau',
    description: 'Erleben Sie exquisite Gerichte, kreiert von unseren Meisterköchen mit feinsten Zutaten aus der Schweizer Region.',
  },
  {
    image: onboardingTableImage,
    eyebrow: 'SCHNELL & ELEGANT',
    title: 'Reservieren in\nwenigen Sekunden',
    description: 'Sichern Sie sich Ihren exklusiven Tisch im Handumdrehen — flexibel, zuverlässig und absolut stressfrei.',
  },
  {
    image: onboardingDessertImage,
    eyebrow: 'VIP MEMBERSHIP',
    title: 'Exklusive Vorteile\nfür Stammgäste',
    description: 'Sammeln Sie Treuepunkte, erhalten Sie Zugang zu besonderen Events und genießen Sie einzigartige Erlebnisse.',
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
    else onComplete();
  };

  const slide = slides[currentSlide];

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#080808' }}>
      <StatusBar transparent light />

      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" loading={currentSlide === 0 ? "eager" : "lazy"} decoding="async" fetchPriority={currentSlide === 0 ? "high" : "auto"} />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0.05) 25%, rgba(8,8,8,0.55) 55%, rgba(8,8,8,0.96) 80%, #080808 100%)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Skip button top-right */}
      {currentSlide < slides.length - 1 && (
        <button
          onClick={onComplete}
          className="absolute top-16 right-6 z-10"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, letterSpacing: '0.3px' }}
        >
          Überspringen
        </button>
      )}

      {/* Content bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-7 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px" style={{ background: '#C9A961' }} />
              <span style={{ color: '#C9A961', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '3px' }}>
                {slide.eyebrow}
              </span>
            </div>

            <h2
              className="text-white mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '38px', fontWeight: 600, lineHeight: 1.15 }}
            >
              {slide.title.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>

            <p className="mb-8" style={{ color: 'rgba(250,250,248,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', lineHeight: 1.6, fontWeight: 300 }}>
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 mb-8">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full cursor-pointer"
              style={{ background: i === currentSlide ? '#C9A961' : 'rgba(255,255,255,0.2)' }}
              animate={{ width: i === currentSlide ? 28 : 8 }}
              transition={{ duration: 0.3 }}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          {currentSlide < slides.length - 1 && (
            <button
              onClick={onComplete}
              style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 400 }}
            >
              Überspringen
            </button>
          )}
          <motion.button
            onClick={next}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl"
            style={{ height: '56px', background: 'linear-gradient(135deg, #C9A961, #A8862E)', color: 'white', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 600, boxShadow: '0 8px 24px rgba(201,169,97,0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            {currentSlide === slides.length - 1 ? 'Jetzt starten' : 'Weiter'}
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
