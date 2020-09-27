import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginService from "./services/login";
import CreateBlog from "./components/CreateBlog"
import Togglable from "./components/Togglable"

const styles = {
  successMessage: {
    color: 'green',
    border: '3px solid green',
    paddingLeft: '5px'
  },
  errorMessage: {
    color: 'red',
    border: '3px solid red',
    paddingLeft: '5px'
  }
}
const App = () => {
  const blogRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    isError: false,
    value: null
  })

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => a.likes < b.likes? 1: -1)
      setBlogs(blogs)
    });
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      let user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const loginHandler = (event) => {
    event.preventDefault();
    loginService.login({ username, password }).then((res) => {
      setUser(res.data);
      window.localStorage.setItem('loggedUser', JSON.stringify(res.data))
      setUsername("");
      setPassword("");
    }).catch(err => {
      setMessage({isError: true, value: err.response.data.error})
      setTimeout(() => setMessage({isError: false, value: null}), 5000)
    });
  };

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addCreatedBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
  }

  const replaceUpdated = (updated) => {
    setBlogs(blogs.map(blog => {
      if (blog.id === updated.id)
        blog = updated
      return blog
    }).sort((a,b) => a.likes < b.likes? 1: -1))
  }

  const removeBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id).sort((a,b) => a.likes < b.likes? 1: -1))
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Login into Application</h2>
          {message.value && (<h3 style={styles.errorMessage}>{message.value}</h3>)}
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            loginHandler={loginHandler}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {message.value && (<h3 style={message.isError? styles.errorMessage: styles.successMessage}>{message.value}</h3>)}
          <h4>{user.name} logged in <button onClick={logout}>Logout</button></h4>
          <Togglable buttonName="New Blog" ref={blogRef}>
            <h3>Create Blog</h3>
            <CreateBlog addCreatedBlog={addCreatedBlog} setMessage={setMessage} blogRef={blogRef}/>
          </Togglable>
          {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} replaceUpdated={replaceUpdated} removeBlog={removeBlog} setMessage={setMessage}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
