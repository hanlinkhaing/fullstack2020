import React, { useRef, useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
const Blog = ({ blog, replaceUpdated, removeBlog, setMessage }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [isView, setIsView] = useState(false)
  const blogRef = useRef()

  const changeButton = () => {
    blogRef.current.toggleShow()
    setIsView(!isView)
  }

  const likeBlog = async () => {
    ++blog.likes
    const result = await blogService.update(blog)
    if (result instanceof Error) {
      console.log(result.message)
    } else {
      replaceUpdated(result)
    }
  }

  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const result = await blogService.deleteBlog(blog.id)
      if (result instanceof Error) {
        setMessage({ isError: true, value: result.message })
        setTimeout(() => setMessage({ isError: false, value: null }), 5000)
      } else {
        setMessage({ isError: false, value: result })
        setTimeout(() => setMessage({ isError: false, value: null }), 5000)
        removeBlog(blog.id)
      }
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} by {blog.author}{' '}
      <button id="changeButton" className="changeButton" onClick={changeButton}>{isView ? 'Hide' : 'View'}</button>
      <Togglable buttonName="" ref={blogRef}>
        <div>{blog.url}</div>
        <div className="likes">
            likes {blog.likes}
          <button id="likeButton" onClick={likeBlog}>like</button>
        </div>
        <div>{blog.user ? blog.user.name : ''}</div>
        <button id="removeButton" onClick={remove}>remove</button>
      </Togglable>
    </div>
  )
}

export default Blog
