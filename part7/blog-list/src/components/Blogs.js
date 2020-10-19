import React, { useRef } from 'react'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup, Container } from 'react-bootstrap'

const Blogs = (props) => {
  const blogRef = useRef()
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <Container fluid>
      <h4>Blogs</h4>
      <Togglable buttonName="New Blog" ref={blogRef}>
        <h6>Create Blog</h6>
        <CreateBlog blogRef={blogRef}/>
      </Togglable>
      <ListGroup className="mt-3">
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id} className="pl-2" style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default Blogs