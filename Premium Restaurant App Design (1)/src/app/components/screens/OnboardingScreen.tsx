import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80',
    eyebrow: 'HANDWERK & LEIDENSCHAFT',
    title: 'Kulinarik auf\nhöchstem Niveau',
    description: 'Erleben Sie exquisite Gerichte, kreiert von unseren Meisterköchen mit feinsten Zutaten aus der Schweizer Region.',
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    eyebrow: 'SCHNELL & ELEGANT',
    title: 'Reservieren in\nwenigen Sekunden',
    description: 'Sichern Sie sich Ihren exklusiven Tisch im Handumdrehen — flexibel, zuverlässig und absolut stressfrei.',
  },
  {
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1600&q=80',
    eyebrow: 'VIP MEMBERSHIP',
    title: 'Exklusive Vorteile\nfür Stammgäste',
    description: 'Sammeln Sie Treuepunkte, erhalten Sie Zugang zu besonderen Events und genießen Sie einzigartige Erlebnisse.',
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [failedSlideImages, setFailedSlideImages] = useState<Record<number, boolean>>({});
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    slides.forEach((slide, slideIndex) => {
      const preloadedImage = new Image();
      preloadedImage.loading = 'eager';
      preloadedImage.decoding = 'async';
      preloadedImage.onload = () => {
        if (!isMounted) return;
        setFailedSlideImages((failedImages) => {
          if (!failedImages[slideIndex]) return failedImages;
          const nextFailedImages = { ...failedImages };
          delete nextFailedImages[slideIndex];
          return nextFailedImages;
        });
      };
      preloadedImage.onerror = () => {
        if (!isMounted) return;
        setFailedSlideImages((failedImages) => ({ ...failedImages, [slideIndex]: true }));
      };
      preloadedImage.src = slide.image;
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const next = useCallback(() => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
    else onComplete();
  }, [currentSlide, onComplete]);

  const previous = useCallback(() => {
    setCurrentSlide((slideIndex) => Math.max(0, slideIndex - 1));
  }, []);

  const handleSlideImageLoad = useCallback((slideIndex: number) => {
    setFailedSlideImages((failedImages) => {
      if (!failedImages[slideIndex]) return failedImages;
      const nextFailedImages = { ...failedImages };
      delete nextFailedImages[slideIndex];
      return nextFailedImages;
    });
  }, []);

  const handleSlideImageError = useCallback((slideIndex: number) => {
    setFailedSlideImages((failedImages) => {
      if (failedImages[slideIndex]) return failedImages;
      return { ...failedImages, [slideIndex]: true };
    });
  }, []);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if ((event.target as Element).closest('button, a, [role="button"]')) {
      touchStartXRef.current = null;
      return;
    }

    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX;
    if (touchEndX === undefined) return;

    const distance = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(distance) < 56) return;
    if (distance < 0) next();
    else previous();
  }, [next, previous]);

  const slide = slides[currentSlide];
  const showCurrentImage = !failedSlideImages[currentSlide];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{ background: '#080808' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pointer-events-none relative z-20">
      </div>

      {/* Background image and decorative gradient never receive taps. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          aria-hidden="true"
        >
          {showCurrentImage && (
            <img
              src={slide.image}
              alt=""
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onLoad={() => handleSlideImageLoad(currentSlide)}
              onError={() => handleSlideImageError(currentSlide)}
            />
          )}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0.05) 25%, rgba(8,8,8,0.55) 55%, rgba(8,8,8,0.96) 80%, #080808 100%)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Skip button top-right */}
      {currentSlide < slides.length - 1 && (
        <button
          onClick={onComplete}
          className="pointer-events-auto absolute top-16 right-6 z-30"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, letterSpacing: '0.3px' }}
        >
          Überspringen
        </button>
      )}

      {/* Content bottom */}
      <div className="pointer-events-auto absolute right-0 bottom-0 left-0 z-20 px-7 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="pointer-events-auto"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="pointer-events-none flex items-center gap-2 mb-4">
              <div className="w-6 h-px" style={{ background: '#C9A961' }} />
              <span style={{ color: '#C9A961', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '3px' }}>
                {slide.eyebrow}
              </span>
            </div>

            <h2
              className="pointer-events-none text-white mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '38px', fontWeight: 600, lineHeight: 1.15 }}
            >
              {slide.title.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>

            <p className="pointer-events-none mb-8" style={{ color: 'rgba(250,250,248,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', lineHeight: 1.6, fontWeight: 300 }}>
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="pointer-events-auto flex items-center gap-1.5 mb-8">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              className="pointer-events-auto h-1 rounded-full cursor-pointer"
              style={{ background: i === currentSlide ? '#C9A961' : 'rgba(255,255,255,0.2)' }}
              animate={{ width: i === currentSlide ? 28 : 8 }}
              transition={{ duration: 0.3 }}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Zu Onboarding-Folie ${i + 1} wechseln`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="pointer-events-auto flex items-center gap-4">
          {currentSlide < slides.length - 1 && (
            <button
              onClick={onComplete}
              className="pointer-events-auto relative z-30"
              style={{ color: 'rgba(250,250,248,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 400 }}
            >
              Überspringen
            </button>
          )}
          <motion.button
            type="button"
            onClick={next}
            className="pointer-events-auto relative z-30 flex-1 flex items-center justify-center gap-2 rounded-2xl"
            style={{ height: '56px', background: 'linear-gradient(135deg, #C9A961, #A8862E)', color: 'white', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 600, boxShadow: '0 8px 24px rgba(201,169,97,0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            {currentSlide === slides.length - 1 ? 'Jetzt starten' : 'Weiter'}
            <ChevronRight className="pointer-events-none w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
