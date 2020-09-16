import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0));
  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handler = () => {
    const copy = [ ...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const postion = () => votes.indexOf(votes.reduce((large, current)=> large >= current? large: current));

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <h5>{props.anecdotes[selected]}</h5>
      <p>has {votes[selected]} votes</p>
      <button onClick={handler}>vote</button>
      <button onClick={()=> setSelected(randomInteger(0, 5))}>next acecdote</button>
      <h3>Anecdote with most votes</h3>
      <h5>{props.anecdotes[postion()]}</h5>
      <p>has {votes[postion()]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)