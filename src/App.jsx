import { useState, useEffect, useRef } from 'react';
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const [step, setStep] = useState(1);
  const [autoCount, setAutoCount] = useState(0);

  const valueRef = useRef(0);
  const seqIndexRef = useRef(0);
  const autoCountRef = useRef(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const isDecrementingRef = useRef(false);

  const INCREMENT_SEQUENCE = [1, 2, 4, 8];

  const clearAllTimers = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startInterval = () => {
    clearAllTimers();
    isDecrementingRef.current = false;

    intervalRef.current = setInterval(() => {
      if (isDecrementingRef.current) return;

      if (autoCountRef.current === 3) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        isDecrementingRef.current = true;

        timeoutRef.current = setTimeout(() => {
          valueRef.current -= 1;
          setValue(valueRef.current);

          autoCountRef.current = 0;
          setAutoCount(0);
          seqIndexRef.current = 0;
          isDecrementingRef.current = false;
          timeoutRef.current = null;

          startInterval();
        }, 10000);

        return;
      }

      const incrementValue = INCREMENT_SEQUENCE[seqIndexRef.current];
      valueRef.current += incrementValue;
      setValue(valueRef.current);

      seqIndexRef.current = (seqIndexRef.current + 1) % INCREMENT_SEQUENCE.length;

      autoCountRef.current += 1;
      setAutoCount(autoCountRef.current);
    }, 10000);
  };

  useEffect(() => {
    startInterval();
    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    clearAllTimers();

    valueRef.current = 0;
    seqIndexRef.current = 0;
    autoCountRef.current = 0;
    isDecrementingRef.current = false;

    setValue(0);
    setAutoCount(0);

    startInterval();
  };

  const handleIncrement = () => setValue(prev => {
    const next = prev + step;
    valueRef.current = next;
    return next;
  });

  const handleDecrement = () => setValue(prev => {
    const next = prev - step;
    valueRef.current = next;
    return next;
  });

  const statusLabel =
    isDecrementingRef.current
      ? 'Waiting to decrement…'
      : autoCount === 3
        ? 'Decrement scheduled'
        : `Auto increment ${autoCount}/3`;

  return (
    <div className="App">
      <div className="counter-card">
        <div className="value">{value}</div>
        <div className="auto-status">{statusLabel}</div>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <div className="buttons-container">
          <button className="btn-increment" onClick={handleIncrement}>
            Increment (+)
          </button>
          <button className="btn-reset" onClick={handleReset}>
            Reset
          </button>
          <button className="btn-decrement" onClick={handleDecrement}>
            Decrement (-)
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
