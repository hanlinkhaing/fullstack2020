import React from "react"
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const create = (event) => {
    event.preventDefault();
    dispatch(createNew(event.target.anecdoteName.value));
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
