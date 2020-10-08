import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdote'
import { anecdoteInit } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(anecdoteInit(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App