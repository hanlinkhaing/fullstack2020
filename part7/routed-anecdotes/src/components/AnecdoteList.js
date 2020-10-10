import React from "react";
import { useHistory } from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => {
  const history = useHistory()

  const toAnecdote = (id) => (event) => {
      event.preventDefault()
      history.push(`/anecdotes/${id}`)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
              <a href="#/" onClick={toAnecdote(anecdote.id)}>{anecdote.content}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
