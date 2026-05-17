interface StatusBarProps {
  transparent?: boolean;
  light?: boolean;
}

export default function StatusBar({ transparent = false, light = false }: StatusBarProps) {
  const textColor = light ? 'text-white' : 'text-[#FAFAF8]';
  const bg = transparent ? 'bg-transparent' : 'bg-[#0A0A0A]';

  return (
    <div className={`${bg} flex items-center justify-between px-6 pt-1 pb-1 flex-shrink-0`} style={{ height: '44px', paddingTop: '14px' }}>
      <span className={`text-xs font-semibold ${textColor}`} style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.2px' }}>9:41</span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <div className="flex items-end gap-0.5">
          {[3, 5, 7, 9].map((h, i) => (
            <div key={i} className={`w-1 rounded-sm ${textColor === 'text-white' ? 'bg-white' : 'bg-[#FAFAF8]'}`} style={{ height: `${h}px` }} />
          ))}
        </div>
        {/* WiFi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 8.5C8.05 8.5 8.5 8.95 8.5 9.5C8.5 10.05 8.05 10.5 7.5 10.5C6.95 10.5 6.5 10.05 6.5 9.5C6.5 8.95 6.95 8.5 7.5 8.5Z" fill={light ? 'white' : '#FAFAF8'} />
          <path d="M7.5 5.5C8.83 5.5 10.03 6.05 10.9 6.95L12.04 5.81C10.86 4.69 9.26 4 7.5 4C5.74 4 4.14 4.69 2.96 5.81L4.1 6.95C4.97 6.05 6.17 5.5 7.5 5.5Z" fill={light ? 'white' : '#FAFAF8'} fillOpacity="0.8" />
          <path d="M7.5 2C9.72 2 11.74 2.87 13.24 4.32L14.38 3.18C12.57 1.43 10.15 0.5 7.5 0.5C4.85 0.5 2.43 1.43 0.62 3.18L1.76 4.32C3.26 2.87 5.28 2 7.5 2Z" fill={light ? 'white' : '#FAFAF8'} fillOpacity="0.5" />
        </svg>
        {/* Battery */}
        <div className="relative flex items-center">
          <div className={`border rounded-sm flex items-center px-0.5 gap-0.5`} style={{ width: '25px', height: '12px', borderColor: light ? 'rgba(255,255,255,0.5)' : 'rgba(250,250,248,0.5)' }}>
            <div className={`rounded-xs flex-1 h-2 ${light ? 'bg-white' : 'bg-[#FAFAF8]'}`} style={{ width: '70%' }} />
          </div>
          <div className={`absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 rounded-r-xs ${light ? 'bg-white/40' : 'bg-[#FAFAF8]/40'}`} />
        </div>
      </div>
    </div>
  );
}
