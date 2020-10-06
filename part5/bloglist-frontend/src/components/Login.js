import React from 'react'

const Login = (props) => {

  return (
    <div>
      <form onSubmit={props.loginHandler}>
        <div>
                    username
          <input type="text" id="username" value={props.username} onChange={(event) => props.setUsername(event.target.value)}></input>
        </div>
        <div>
                    password
          <input type="password" id="password" value={props.password} onChange={(event) => props.setPassword(event.target.value)}></input>
        </div>
        <button type="submit" id="login">Login</button>
      </form>
    </div>
  )
}

export default Login