import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Users from '../components/Users'
import Login from '../components/Login'
import Blogs from '../components/Blogs'
import User from '../components/User'
import PrivateRouter from './PrivateRouter'
import Blog from '../components/Blog'

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <PrivateRouter path="/blogs/:id">
          <Blog/>
        </PrivateRouter>
        <PrivateRouter path="/blogs">
          <Blogs/>
        </PrivateRouter>
        <PrivateRouter path="/users/:id">
          <User/>
        </PrivateRouter>
        <PrivateRouter path="/users">
          <Users/>
        </PrivateRouter>
        <Route path="/"><Redirect to="/blogs"/></Route>
      </Switch>
    </>
  )
}

export default Routes