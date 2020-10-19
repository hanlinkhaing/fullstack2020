/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import blogService from './services/blogs'
import { addLoggedUser } from './reducers/loginReducer'
import { initBlog } from './reducers/blogReducer'
import Routes from './routes'
import { useHistory } from 'react-router-dom'
import Message from './components/Message'
import { Nav, Button, Container, Navbar } from 'react-bootstrap'

const App = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)

  useEffect(() => {
    let storedUser = window.localStorage.getItem('loggedUser')
    if (storedUser)
      dispatch(addLoggedUser(JSON.parse(storedUser)))

    blogService.getAll().then((blogs) => dispatch(initBlog(blogs)))
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(addLoggedUser(null))
    history.push('/login')
  }

  return (
    <Container fluid className="mt-2">
      {loggedUser !== null && (
        <>
          <div>
            <Navbar variant="pills" bg="light">
              <Navbar.Brand><strong>Blog App</strong></Navbar.Brand>

              <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <Nav.Item ><Nav.Link href="/">Blogs</Nav.Link></Nav.Item>
                  <Nav.Item ><Nav.Link href="/users">Users</Nav.Link></Nav.Item>
                  <Nav.Item ><Nav.Link disabled>{loggedUser.name} logged in</Nav.Link></Nav.Item>
                  <Nav.Item className="float-right"><Button onClick={logout} variant="danger">Logout</Button></Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <Message/>
        </>
      )}
      <Routes/>
    </Container>
  )
}

export default App
