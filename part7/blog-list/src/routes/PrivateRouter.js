import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRouter = ({ children, ...rest }) => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  return (
    <Route
      { ...rest }
      render={({ location }) => {
        return loggedUser !== null ?
          ( children ) :
          ( <Redirect to={{ pathname: '/login', state: { from: location } }}/> ) }
      }/>
  )
}

export default PrivateRouter