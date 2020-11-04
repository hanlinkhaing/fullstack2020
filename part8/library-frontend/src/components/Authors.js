  
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries/library'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  if (!props.show) {
    return null
  }

  let authors = []
  if (!result.loading) authors = result.data.allAuthors

  const updateAuthor = () => {
    editAuthor({
      variables: {
        name,
        setBornTo: Number(born)
      }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h4>Set birthYear</h4>
      <div>
        {/* Name */}
        {/* <input type="text" value={name} onChange={({ target }) => setName(target.value)}></input> */}
        <Select options={authors.map(author => {
          return {
            value: author.name,
            label: author.name
          }
        })} onChange={(select) => setName(select.value)}></Select>
      </div>
      <div>
        Born
        <input type="text" value={born} onChange={({ target }) => setBorn(target.value)}></input>
      </div>
      <button onClick={updateAuthor}>Update Author</button>

    </div>
  )
}

export default Authors
