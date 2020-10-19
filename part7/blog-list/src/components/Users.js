/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import userService from '../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { userInit } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'

const Users = (props) => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    userService.getAllUsers().then(users => dispatch(userInit(users)))
  })


  return (
    <Container fluid className="mt-2">
      <h4>Users</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Bogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Users