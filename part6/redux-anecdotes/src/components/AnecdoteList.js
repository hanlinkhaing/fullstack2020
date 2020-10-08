import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const anecdotes = useSelector((state) => 
    state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  );
  const dispatch = useDispatch();

  const vote = async (anecdote) => {
    dispatch(giveVote(anecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={vote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
