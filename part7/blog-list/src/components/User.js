/* eslint-disable eqeqeq */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

const User = (props) => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(user => user.id == id))

  if (!user) {
    return null
  }
  return (
    <Container fluid className="mt-2">
      <h4>{user.name}</h4>
      <p>Added bogs</p>
      <ul>
        {user.blogs.map((blog,i) => (<li key={i}>{blog.title}</li>))}
      </ul>
    </Container>
  )
}

export default User