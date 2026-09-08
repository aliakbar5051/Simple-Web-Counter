import { useState } from 'react';
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const [step, setStep] = useState(1);
  return (
    <div className="App">
      <div className='value'>{value}</div>
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <div className="buttons-container">
        <button onClick={() => setValue(value + step)}>Increment (+)</button>
        <button onClick={() => setValue(0)}>Reset</button>
        <button onClick={() => setValue(value - step)}>Decrement (-)</button>
      </div>
    </div>
  );
}
export default App;