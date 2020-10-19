import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginReducer from '../reducers/loginReducer'
import blogReducer from '../reducers/blogReducer'
import messageReducer from '../reducers/messageReducer'
import userReducer from '../reducers/userReducer'

const reducers = combineReducers({
  loggedUser: loginReducer,
  blogs: blogReducer,
  message: messageReducer,
  users: userReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store