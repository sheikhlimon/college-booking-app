import { createContext, useContext, useState, useCallback, useRef } from 'react';

interface ColdStartState {
  isVisible: boolean;
  elapsed: number;
}

interface ColdStartContextType extends ColdStartState {
  start: () => void;
  stop: () => void;
  dismiss: () => void;
}

const ColdStartContext = createContext<ColdStartContextType>({
  isVisible: false,
  elapsed: 0,
  start: () => {},
  stop: () => {},
  dismiss: () => {},
});

export const useColdStart = () => useContext(ColdStartContext);

export const ColdStartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const pendingRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef(0);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    startRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setElapsed(0);
  }, []);

  const start = useCallback(() => {
    pendingRef.current++;
    if (pendingRef.current === 1) {
      setDismissed(false);
      startTimer();
      setIsVisible(true);
    }
  }, [startTimer]);

  const stop = useCallback(() => {
    pendingRef.current = Math.max(0, pendingRef.current - 1);
    if (pendingRef.current === 0) {
      setIsVisible(false);
      setDismissed(false);
      stopTimer();
    }
  }, [stopTimer]);

  const dismiss = useCallback(() => {
    setDismissed(true);
    stopTimer();
  }, [stopTimer]);

  return (
    <ColdStartContext.Provider value={{ isVisible: isVisible && !dismissed, elapsed, start, stop, dismiss }}>
      {children}
    </ColdStartContext.Provider>
  );
};
