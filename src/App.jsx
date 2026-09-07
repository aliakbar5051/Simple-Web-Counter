import { useState } from 'react';
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  return (
    <div className="App">
      <div className='value'>{value}</div>
      <div className="buttons-container">
        <button onClick={() => setValue(value + 1)}>Increment (+)</button>
        <button onClick={() => setValue(0)}>Reset</button>
        <button onClick={() => setValue(value - 1)}>Decrement (-)</button>
      </div>
    </div>
  );
}
export default App;