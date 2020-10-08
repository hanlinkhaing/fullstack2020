import React from "react"
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const create = (event) => {
    event.preventDefault();
    dispatch(createNew(event.target.anecdoteName.value));
    dispatch(setNotification(`You created '${event.target.anecdoteName.value}'`));
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
