import AppRouter from './components/AppRouter';

export default function App() {
  return (
    <div className="dark app-shell" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 max-w-[80vw] rounded-full bg-[#C9A961]/5 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-64 w-64 max-w-[70vw] rounded-full bg-[#C9A961]/3 blur-3xl" />
      </div>

      <main className="app-viewport">
        <AppRouter />
      </main>
    </div>
  );
}
