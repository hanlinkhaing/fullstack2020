import React, { useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Footer from './components/Footer'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote '${anecdote.content}' created!`)
    setTimeout(() => setNotification(''), 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match? 
    anecdotes.find(anec => anec.id === match.params.id)
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification? (<p>{notification}</p>): null}
      <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdote={anecdote}></Anecdote>
          </Route>
          <Route path="/create">
            <AnecdoteForm addNew={addNew} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
      </Switch>
      <Footer/>
    </div>
  )
}

export default App;
