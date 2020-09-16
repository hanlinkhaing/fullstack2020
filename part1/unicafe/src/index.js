import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({ good, neutral, bad }) => {
  const getTotal = () => good + neutral + bad;

  return (
    <div>
      <h2>statistics</h2>
      {good || neutral || bad ? (
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={getTotal()} />
            <Statistic text="average" value={(good - bad) / getTotal()} />
            <Statistic text="positive" value={(good / getTotal()) * 100} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const Button = ({ text, clickHandler }) => (
  <button onClick={clickHandler}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value}
      {text === "positive" ? "%" : ""}
    </td>
  </tr>
);
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="Good" clickHandler={addGood} />
      <Button text="Netural" clickHandler={addNeutral} />
      <Button text="Bad" clickHandler={addBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
