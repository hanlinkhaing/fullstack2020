import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { giveVote } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from '../reducers/notificationReducer'

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

  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(giveVote(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`));
    setTimeout(() => dispatch(removeNotification()), 5000)
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
