/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/library'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState("all genres")
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      addGenres(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (result.data) {
      if (genre === 'all genres') setBooks(result.data.allBooks)
      else setBooks(result.data.allBooks.filter(book => book.genres.includes(genre)))
    }
  }, [genre])

  const addGenres = async (bookList) => {
    let setArray = []
    setArray = await bookList.map(b => [...setArray, ...b.genres])
    setArray.push("all genres")
    setGenres([...new Set(setArray.flat())])
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{genre}</strong></p>
      {genres.map(g => (<button key={g} onClick={() => setGenre(g)}>{g}</button>))}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books