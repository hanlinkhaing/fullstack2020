import React, { useState, useEffect } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries/library'
import { updateAllAuthorsCache, updateAllBooksCache, updateRecommendCache } from './client/updateCache'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) setToken(storedToken)
  }, [])

  useEffect(() => {
    if (token) setPage('authors')
  }, [token])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`Title ${addedBook.title}, Author ${addedBook.author.name}`)
      updateAllBooksCache(addedBook, client)
      updateAllAuthorsCache(addedBook.author, client)
      updateRecommendCache(addedBook, client)
    }
  })

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