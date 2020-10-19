import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { addMessage, resetMessage } from '../reducers/messageReducer'
import { addBlog } from '../reducers/blogReducer'
import { Button, Container, Form } from 'react-bootstrap'

const CreateBlog = (props) => {
  const dispatch = useDispatch()
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const create = async (event) => {
    event.preventDefault()
    const result = await blogService.create({ title, author, url })
    if (result instanceof Error) {
      dispatch(addMessage({ isError: true, value: result.message }))
      setTimeout(() => dispatch(resetMessage()), 5000)
    } else {
      dispatch(addBlog(result))
      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(addMessage({ isError: false, value: `a new blog ${result.title} by ${result.author} added` }))
      props.blogRef.current.toggleShow()
      setTimeout(() => dispatch(resetMessage()), 5000)
    }
  }

  return (
    <Container className="border" fluid>
      <Form onSubmit={create}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" id="title" onChange={({ target }) => setTitle(target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" id="author" onChange={({ target }) => setAuthor(target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" id="url" onChange={({ target }) => setUrl(target.value)}/>
        </Form.Group>
        <Form.Group>
          <Button type="submit" id="create">Create</Button>
          <Button type="button" id="cancel" className="ml-3" onClick={() => props.blogRef.current.toggleShow()}>Cancel</Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default CreateBlog