import { useColdStart } from '../../context/ColdStartContext';

const TOTAL_DURATION = 60;
const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const ColdStartOverlay: React.FC = () => {
  const { isVisible, elapsed, dismiss } = useColdStart();

  if (!isVisible) return null;

  const progress = Math.min(elapsed / TOTAL_DURATION, 1);
  const offset = RING_CIRCUMFERENCE * (1 - progress);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]" onMouseDown={dismiss}>
      <div className="bg-white rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center gap-4 max-w-xs w-full mx-4" onMouseDown={(e) => e.stopPropagation()}>
        <p className="text-emerald-800 font-semibold text-lg">Waking up the server...</p>

        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={RING_RADIUS}
              fill="none"
              stroke="#d1d5db"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r={RING_RADIUS}
              fill="none"
              stroke="#059669"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={offset}
              className="transition-[stroke-dashoffset] duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-emerald-700 tabular-nums">
              {elapsed}s
            </span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 leading-relaxed">
          <p>Our server is on a free plan and sleeps after inactivity.</p>
          <p>This may take up to a minute. Thanks for your patience!</p>
        </div>
        <p className="text-gray-300 text-xs cursor-default">Click anywhere to dismiss</p>
      </div>
    </div>
  );
};

export default ColdStartOverlay;
