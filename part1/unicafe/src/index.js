import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good+1);
  const addNeutral = () => setNeutral(neutral+1);
  const addBad = () => setBad(bad+1);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
}

ReactDOM.render(<App/>,document.getElementById('root'))
