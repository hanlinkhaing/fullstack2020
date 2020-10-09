import React from "react"
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const content = event.target.anecdoteName.value
    props.createNew({
      content: content,
      votes: 0
    });
    event.target.anecdoteName.value = ''
    props.setNotification(`You created '${content}'`, 5);
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

const connectedAnecdoteForm = connect(null, { createNew, setNotification })(AnecdoteForm)
export default connectedAnecdoteForm;
