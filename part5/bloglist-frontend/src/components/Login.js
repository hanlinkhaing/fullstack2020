import React from 'react'

const Login = (props) => {

  return (
    <div>
      <form onSubmit={props.loginHandler}>
        <div>
                    username
          <input type="text" value={props.username} onChange={(event) => props.setUsername(event.target.value)}></input>
        </div>
        <div>
                    password
          <input type="password" value={props.password} onChange={(event) => props.setPassword(event.target.value)}></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login