import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { giveVote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, voteHandler }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteHandler(anecdote)}>vote</button>
      </div>
    </div>
  );
};
const AnecdoteList = (props) => {
  // const anecdotes = useSelector((state) => 
  //   state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  // );
  const dispatch = useDispatch();
  const [ timerId, setTimerId ] = useState('')

  const vote = async (anecdote) => {
    dispatch(giveVote(anecdote));
    if(timerId) clearTimeout(timerId);
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5, (id) => setTimerId(id)));
  };

  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={vote} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())),
    filter: state.filter
  }
}

const connectedAnecdoteList = connect(mapStateToProps, null)(AnecdoteList)
export default connectedAnecdoteList;
