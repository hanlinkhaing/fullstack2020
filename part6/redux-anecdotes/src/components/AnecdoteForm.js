import React from "react"
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const anecdote = await anecdoteService.create({
      content: event.target.anecdoteName.value,
      votes: 0
    })
    dispatch(createNew(anecdote));
    dispatch(setNotification(`You created '${anecdote.content}'`));
    setTimeout(() => dispatch(removeNotification()), 5000)
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdoteName" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
