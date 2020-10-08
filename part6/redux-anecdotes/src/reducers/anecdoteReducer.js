import anecdoteService from '../services/anecdote'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  let changedState = [ ...state ]

  if (action.type === 'VOTE') {
    changedState = state.map(anecdote => anecdote.id === action.data.id ? action.data: anecdote)
  } else if (action.type === 'NEW') {
    changedState = [ ...state, action.data ]
  } else if (action.type === 'ANECDOTE_INIT') {
    changedState = action.data
  }

  changedState.sort((a, b) => a.votes < b.votes? 1: a.votes === b.votes? 0: -1)

  return changedState
}

export const giveVote = (anecdote) => {
  return async dispatch => {
    const voted = await anecdoteService.vote(anecdote.id, ++anecdote.votes)
    dispatch({
      type: 'VOTE',
      data: voted
    })
  }
}

export const createNew = (anecdote) => {
  return async dispatch => {
    const created = await anecdoteService.create(anecdote)
    dispatch({
      type: 'NEW',
      data: created
    })
  }
}

export const anecdoteInit = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ANECDOTE_INIT',
      data: anecdotes
    })
  }
}

export default reducer