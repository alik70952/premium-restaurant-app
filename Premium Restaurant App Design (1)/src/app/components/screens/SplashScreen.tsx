import splashHeroImage from '../../../assets/images/splash-hero.svg';
import { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#080808' }}>
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img
          src={splashHeroImage}
          alt="Restaurant"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        {/* Deep cinematic overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.35) 40%, rgba(8,8,8,0.7) 70%, rgba(8,8,8,0.97) 100%)' }} />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Decorative line top */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="w-16 h-px mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A961, transparent)' }}
        />

        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative mb-6"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #C9A961, #8B6914)', boxShadow: '0 0 40px rgba(201,169,97,0.3), 0 0 80px rgba(201,169,97,0.1)' }}
          >
            {/* Alpine A monogram */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 4L32 30H4L18 4Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
              <path d="M10 22H26" stroke="white" strokeWidth="1.5" />
              <path d="M18 4L18 12" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(201,169,97,0.3)' }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, delay: 0.8, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-center mb-3"
        >
          <h1
            className="text-white tracking-widest uppercase mb-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 600, letterSpacing: '6px' }}
          >
            Alpen Genuss
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A961)' }} />
            <p style={{ color: '#C9A961', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400, letterSpacing: '4px' }}>
              ZÜRICH
            </p>
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #C9A961, transparent)' }} />
          </div>
        </motion.div>

        {/* Decorative line bottom */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="w-16 h-px mt-8"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A961, transparent)' }}
        />
      </div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="absolute bottom-20 left-0 right-0 text-center"
      >
        <p style={{ color: 'rgba(250,250,248,0.35)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Seit 1987 · Zürich
        </p>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center gap-1.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#C9A961' }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </div>
  );
}
