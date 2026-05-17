import AppRouter from './components/AppRouter';

export default function App() {
  return (
    <div className="dark min-h-screen w-full bg-[#060606] flex items-center justify-center overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A961]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#C9A961]/3 rounded-full blur-3xl" />
      </div>

      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden shadow-2xl max-w-full max-h-full"
        style={{
          width: 'min(390px, 100vw)',
          height: 'min(844px, 100vh)',
          borderRadius: '44px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 80px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)',
          background: '#0A0A0A',
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-[#0A0A0A]"
          style={{ width: '126px', height: '34px', borderRadius: '0 0 20px 20px' }}
        />

        <AppRouter />
      </div>
    </div>
  );
}
