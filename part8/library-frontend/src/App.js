
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) setToken(storedToken)
  }, [])

  useEffect(() => {
    if (token) setPage('authors')
  }, [token])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? 
          (<>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => {
              setToken(null)
              setPage('login')
              localStorage.clear()
            }}>logout</button>
          </>):
          (<button onClick={() => setPage('login')}>login</button>)
        }
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login 
        show={page === 'login'}
        setToken={setToken}
      />

      <Recommend show={page === 'recommend'}/>

    </div>
  )
}

export default App