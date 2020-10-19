/* eslint-disable react/no-unescaped-entities */
/* eslint-disable eqeqeq */
import React from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, resetMessage } from '../reducers/messageReducer'
import { replaceBlog, deleteBlog } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'
import {
  InputGroup,
  FormControl,
  Button,
  Container,
  Form,
} from 'react-bootstrap'

const Blog = (props) => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id == id))
  const dispatch = useDispatch()
  const history = useHistory()

  const likeBlog = async () => {
    ++blog.likes
    const result = await blogService.update({ id:blog.id, likes:blog.likes })
    if (result instanceof Error) {
      console.log(result.message)
    } else {
      dispatch(replaceBlog(result))
    }
  }

  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const result = await blogService.deleteBlog(blog.id)
      if (result instanceof Error) {
        dispatch(addMessage({ isError: true, value: result.message }))
        setTimeout(() => dispatch(resetMessage()), 5000)
      } else {
        dispatch(addMessage({ isError: false, value: result }))
        setTimeout(() => dispatch(resetMessage()), 5000)
        dispatch(deleteBlog(blog.id))
        history.goBack()
      }
    }
  }

  const addComment = async (event) => {
    event.preventDefault()
    const result = await blogService.createComment(blog.id, { comment: event.target.comment.value })
    if (result instanceof Error) {
      dispatch(addMessage({ isError: true, value: result.message }))
      setTimeout(() => dispatch(resetMessage()), 5000)
    } else {
      dispatch(addMessage({ isError: false, value: 'Comment has been successfully added.' }))
      dispatch(replaceBlog(result))
      setTimeout(() => dispatch(resetMessage()), 5000)
    }
  }

  if (!blog) return null

  return (
    <Container className="mt-2" fluid>

      <h5 className="display-4">"{blog.title}" <small>by {blog.author}</small></h5>
      <p>Link: <a href={blog.url} target="true">{blog.url}</a></p>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user ? blog.user.name : ''}</p>
      <Button id="likeButton" variant="outline-primary" onClick={likeBlog}>like</Button>
      <Button id="removeButton" className="ml-3" variant="outline-danger" onClick={remove}>remove</Button>

      <hr/>
      <h6>Comments</h6>
      <Form onSubmit={addComment} inline>
        <InputGroup onSubmit={addComment}>
          <FormControl name="comment"/>
        </InputGroup>
        <Button type="submit">add comment</Button>
      </Form>
      <ul className="mt-1">
        {blog.comments.map(comment => (<li key={comment.id}>{comment.comment}</li>))}
      </ul>
    </Container>
  )
}

export default Blog
