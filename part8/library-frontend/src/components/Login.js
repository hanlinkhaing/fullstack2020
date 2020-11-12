import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/library'

const Login = ({show, setToken}) => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [login, result] = useMutation(LOGIN, {
      onError: error => {
          console.log(error.message)
      }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[result.data])

  const submit = event => {
    event.preventDefault()
    login({ variables: {username, password}})
    setUsername(null)
    setPassword(null)
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username <input type="text" onChange={({target})=>setUsername(target.value)}/>
        </div>
        <div>
          Password <input type="password" onChange={({target})=>setPassword(target.value)}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
