import loginHeroImage from '../../../assets/images/login-hero.svg';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import StatusBar from '../StatusBar';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#080808' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={loginHeroImage}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center top' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.6) 35%, rgba(8,8,8,0.92) 65%, #080808 100%)' }} />
      </div>

      <StatusBar transparent light />

      {/* Logo area */}
      <div className="absolute top-20 left-0 right-0 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
            style={{ background: 'linear-gradient(135deg, #C9A961, #8B6914)', boxShadow: '0 8px 32px rgba(201,169,97,0.35)' }}
          >
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <path d="M18 4L32 30H4L18 4Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
              <path d="M10 22H26" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <p style={{ color: '#C9A961', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400, letterSpacing: '4px', textTransform: 'uppercase' }}>
            Alpen Genuss Zürich
          </p>
        </motion.div>
      </div>

      {/* Form panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          background: 'rgba(12,12,12,0.95)',
          backdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '32px 32px 0 0',
          padding: '28px 28px 40px',
        }}
      >
        {/* Tab switcher */}
        <div className="flex mb-6 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {['Anmelden', 'Registrieren'].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setIsLogin(i === 0)}
              className="flex-1 py-3 relative"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: (i === 0) === isLogin ? '#FAFAF8' : 'rgba(250,250,248,0.4)', transition: 'color 0.2s' }}
            >
              {tab}
              {(i === 0) === isLogin && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'rgba(201,169,97,0.15)', border: '1px solid rgba(201,169,97,0.2)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative"
              >
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(201,169,97,0.7)' }} />
                <input
                  type="text"
                  placeholder="Vollständiger Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 rounded-2xl focus:outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#FAFAF8',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(201,169,97,0.7)' }} />
            <input
              type="email"
              placeholder="E-Mail-Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl focus:outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#FAFAF8',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
              }}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(201,169,97,0.7)' }} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-12 py-4 rounded-2xl focus:outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#FAFAF8',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(250,250,248,0.4)' }}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {isLogin && (
            <div className="text-right">
              <button type="button" style={{ color: '#C9A961', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>
                Passwort vergessen?
              </button>
            </div>
          )}

          <div className="pt-2 space-y-3">
            <motion.button
              type="submit"
              className="w-full flex items-center justify-center rounded-2xl"
              style={{ height: '56px', background: 'linear-gradient(135deg, #C9A961, #A8862E)', color: 'white', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 600, boxShadow: '0 8px 24px rgba(201,169,97,0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Anmelden' : 'Konto erstellen'}
            </motion.button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ color: 'rgba(250,250,248,0.35)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>oder</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
            </div>

            <motion.button
              type="button"
              onClick={onLogin}
              className="w-full flex items-center justify-center rounded-2xl"
              style={{ height: '52px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(250,250,248,0.7)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 400 }}
              whileTap={{ scale: 0.98 }}
            >
              Als Gast fortfahren
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
