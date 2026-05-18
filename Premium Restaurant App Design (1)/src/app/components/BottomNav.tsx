import { Home, CalendarDays, Gift, User } from 'lucide-react';
import { Screen } from './AppRouter';

interface BottomNavProps {
  activeScreen: Screen;
  navigate: (screen: Screen) => void;
}

const navItems = [
  { screen: 'home' as Screen, icon: Home, label: 'Startseite' },
  { screen: 'reservation' as Screen, icon: CalendarDays, label: 'Reservierung' },
  { screen: 'loyalty' as Screen, icon: Gift, label: 'Treuepunkte' },
  { screen: 'profile' as Screen, icon: User, label: 'Profil' },
];

export default function BottomNav({ activeScreen, navigate }: BottomNavProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-40 flex-shrink-0"
      style={{
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div className="flex items-center justify-around px-2 pt-3 pb-1">
        {navItems.map(({ screen, icon: Icon, label }) => {
          const isActive = activeScreen === screen;
          return (
            <button
              key={screen}
              onClick={() => navigate(screen)}
              className="flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all duration-200"
            >
              <div className="relative">
                <Icon
                  className="w-6 h-6 transition-all duration-200"
                  style={{ color: isActive ? '#C9A961' : 'rgba(255,255,255,0.35)', strokeWidth: isActive ? 2.5 : 1.5 }}
                />
                {isActive && (
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#C9A961' }}
                  />
                )}
              </div>
              <span
                className="text-[10px] transition-all duration-200"
                style={{
                  color: isActive ? '#C9A961' : 'rgba(255,255,255,0.35)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.2px',
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
