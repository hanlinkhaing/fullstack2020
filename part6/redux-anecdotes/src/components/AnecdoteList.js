import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { giveVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, voteHandler }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteHandler(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};
const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(giveVote(id));
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
