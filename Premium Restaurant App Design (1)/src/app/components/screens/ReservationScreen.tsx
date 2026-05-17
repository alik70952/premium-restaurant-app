import { useState } from 'react';
import { ArrowLeft, Users, Clock, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import StatusBar from '../StatusBar';
import BottomNav from '../BottomNav';
import { Screen } from '../AppRouter';

interface ReservationScreenProps {
  onBack: () => void;
  navigate?: (screen: Screen) => void;
}

const GOLD = '#C9A961';
const CARD = '#141414';
const SURFACE = '#1C1C1C';

const timeSlots = ['12:00', '12:30', '13:00', '13:30', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];
const sections = ['Terrasse', 'Innenbereich', 'Privat'];
const DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

function buildCalendar(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return cells;
}

export default function ReservationScreen({ onBack, navigate }: ReservationScreenProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState('19:00');
  const [guests, setGuests] = useState(2);
  const [section, setSection] = useState('Innenbereich');
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const cells = buildCalendar(viewYear, viewMonth);
  const isToday = (d: number) => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  const isPast = (d: number) => new Date(viewYear, viewMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const handleConfirm = () => { setConfirmed(true); };

  if (confirmed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8" style={{ background: '#0A0A0A' }}>
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 250, damping: 20 }} className="flex flex-col items-center text-center w-full">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #C9A961, #A8862E)', boxShadow: '0 16px 40px rgba(201,169,97,0.4)' }}>
            <Check className="w-12 h-12 text-black" strokeWidth={2.5} />
          </div>
          <h2 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 600, marginBottom: '8px' }}>Reservierung bestätigt</h2>
          <p style={{ color: 'rgba(250,250,248,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
            Wir freuen uns auf Ihren Besuch und bereiten alles für Ihren Abend vor.
          </p>
          <div className="w-full p-5 rounded-2xl mb-6" style={{ background: CARD, border: '1px solid rgba(201,169,97,0.15)' }}>
            {[
              { label: 'Datum', value: `${selectedDay}. ${MONTHS[viewMonth]} ${viewYear}` },
              { label: 'Uhrzeit', value: selectedTime },
              { label: 'Gäste', value: `${guests} Personen` },
              { label: 'Bereich', value: section },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2">
                <span style={{ color: 'rgba(250,250,248,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>{label}</span>
                <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(250,250,248,0.3)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', marginBottom: '24px' }}>Reservierungsnr. <span style={{ color: GOLD, fontWeight: 600 }}>#RES-0892</span></p>
          <motion.button onClick={onBack} className="px-8 flex items-center justify-center rounded-2xl" style={{ height: '52px', background: 'linear-gradient(135deg, #C9A961, #A8862E)', color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600, width: '100%' }} whileTap={{ scale: 0.97 }}>
            Zurück zur Startseite
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: '#0A0A0A' }}>
      <StatusBar />
      <div className="flex items-center gap-4 px-5 pb-4 pt-2 flex-shrink-0">
        <motion.button onClick={onBack} className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', background: SURFACE, border: '1px solid rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.92 }}>
          <ArrowLeft className="w-5 h-5" style={{ color: '#FAFAF8' }} />
        </motion.button>
        <h1 style={{ color: '#FAFAF8', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 600 }}>Tisch reservieren</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5" style={{ paddingBottom: navigate ? '155px' : '100px' }}>

        {/* Calendar */}
        <div className="mb-5 rounded-2xl p-4" style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-4">
            <motion.button onClick={prevMonth} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: SURFACE }} whileTap={{ scale: 0.9 }}>
              <ChevronLeft className="w-4 h-4" style={{ color: '#FAFAF8' }} />
            </motion.button>
            <span style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 600 }}>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <motion.button onClick={nextMonth} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: SURFACE }} whileTap={{ scale: 0.9 }}>
              <ChevronRight className="w-4 h-4" style={{ color: '#FAFAF8' }} />
            </motion.button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center py-1" style={{ color: 'rgba(250,250,248,0.3)', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600 }}>{d}</div>
            ))}
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((cell, i) => (
              <div key={i}>
                {cell === null ? <div /> : (
                  <motion.button
                    onClick={() => !isPast(cell) && setSelectedDay(cell)}
                    className="w-full aspect-square flex items-center justify-center rounded-xl"
                    style={{
                      background: selectedDay === cell ? GOLD : isToday(cell) ? 'rgba(201,169,97,0.12)' : 'transparent',
                      border: isToday(cell) && selectedDay !== cell ? '1px solid rgba(201,169,97,0.3)' : '1px solid transparent',
                      opacity: isPast(cell) ? 0.25 : 1,
                      cursor: isPast(cell) ? 'not-allowed' : 'pointer',
                    }}
                    whileTap={isPast(cell) ? {} : { scale: 0.88 }}
                  >
                    <span style={{ color: selectedDay === cell ? '#0A0A0A' : '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: selectedDay === cell ? 700 : 400 }}>
                      {cell}
                    </span>
                  </motion.button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4" style={{ color: GOLD }} />
            <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600 }}>Uhrzeit</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <motion.button key={slot} onClick={() => setSelectedTime(slot)} className="px-4 py-2 rounded-xl"
                style={{ background: selectedTime === slot ? GOLD : SURFACE, border: `1px solid ${selectedTime === slot ? GOLD : 'rgba(255,255,255,0.08)'}`, color: selectedTime === slot ? '#0A0A0A' : 'rgba(250,250,248,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: selectedTime === slot ? 700 : 400, transition: 'all 0.15s' }} whileTap={{ scale: 0.92 }}>
                {slot}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Guests */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4" style={{ color: GOLD }} />
            <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600 }}>Anzahl Gäste</p>
          </div>
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {guestOptions.map((n) => (
              <motion.button key={n} onClick={() => setGuests(n)} className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: guests === n ? GOLD : SURFACE, border: `1px solid ${guests === n ? GOLD : 'rgba(255,255,255,0.08)'}`, color: guests === n ? '#0A0A0A' : 'rgba(250,250,248,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: guests === n ? 700 : 400, transition: 'all 0.15s' }} whileTap={{ scale: 0.9 }}>
                {n}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Section */}
        <div className="mb-5">
          <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600, marginBottom: '10px' }}>Bereich</p>
          <div className="flex gap-2">
            {sections.map((s) => (
              <motion.button key={s} onClick={() => setSection(s)} className="flex-1 py-2.5 rounded-xl"
                style={{ background: section === s ? 'rgba(201,169,97,0.12)' : SURFACE, border: `1px solid ${section === s ? 'rgba(201,169,97,0.4)' : 'rgba(255,255,255,0.08)'}`, color: section === s ? GOLD : 'rgba(250,250,248,0.55)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: section === s ? 600 : 400, transition: 'all 0.15s' }} whileTap={{ scale: 0.95 }}>
                {s}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mb-4">
          <p style={{ color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 600, marginBottom: '10px' }}>Besondere Wünsche</p>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="z. B. Fensterplatz, Allergie, Geburtstag…" rows={3} className="w-full px-4 py-3 rounded-2xl resize-none focus:outline-none"
            style={{ background: SURFACE, border: '1px solid rgba(255,255,255,0.08)', color: '#FAFAF8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }} />
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-5" style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.07)', paddingBottom: navigate ? '90px' : '20px' }}>
        <motion.button onClick={handleConfirm} disabled={!selectedDay} className="w-full flex items-center justify-center rounded-2xl"
          style={{ height: '56px', background: selectedDay ? 'linear-gradient(135deg, #C9A961, #A8862E)' : SURFACE, color: selectedDay ? '#0A0A0A' : 'rgba(250,250,248,0.25)', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 700, boxShadow: selectedDay ? '0 8px 24px rgba(201,169,97,0.3)' : 'none', transition: 'all 0.2s' }} whileTap={{ scale: 0.98 }}>
          {selectedDay ? `Reservierung für ${selectedDay}. ${MONTHS[viewMonth]} um ${selectedTime}` : 'Bitte Datum wählen'}
        </motion.button>
      </div>

      {navigate && <BottomNav activeScreen="reservation" navigate={navigate} />}
    </div>
  );
}
