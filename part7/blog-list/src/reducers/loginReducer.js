const loginReducer = (state = null, action) => {
  let changedState = state//{ ...state }
  if (action.type === 'LOGIN') {
    changedState = action.data
  }

  return changedState
}

export const addLoggedUser = (loggedUser) => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data: loggedUser
    })
  }
}

export default loginReducer