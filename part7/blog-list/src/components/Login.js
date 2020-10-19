import React, { useState } from 'react'
import loginService from '../services/login'
import { addLoggedUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { addMessage, resetMessage } from '../reducers/messageReducer'
import Message from './Message'
import { useHistory, useLocation } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'

const Login = (props) => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { from } = location.state || { from: { pathname: '/' } }

  const loginHandler = (event) => {
    event.preventDefault()
    loginService.login({ username, password }).then((res) => {
      window.localStorage.setItem('loggedUser', JSON.stringify(res.data))
      dispatch(addLoggedUser(res.data))
      history.replace(from)
    }).catch(err => {
      dispatch(addMessage({ isError: true, value: err.response.data.error }))
      setTimeout(() => dispatch(resetMessage()), 5000)
    })
  }

  return (
    <Container className="mt-5 p-3 border">
      <h2>Login into Application</h2>
      <Message/>
      <Form onSubmit={loginHandler}>
        <Form.Group>
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" id="username" onChange={(event) => setUsername(event.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id="password" onChange={(event) => setPassword(event.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default Login