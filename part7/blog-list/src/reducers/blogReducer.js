const blogReducer = (state = [], action) => {
  let changedState = [ ...state ]

  if (action.type === 'BLOG_INIT') {
    changedState = action.data
  } else if (action.type === 'ADD_BLOG') {
    changedState.push(action.data)
  } else if (action.type === 'DELETE_BLOG') {
    changedState = changedState.filter(blog => blog.id !== action.data.id)
  } else if (action.type === 'REPLACE_BLOG') {
    changedState = changedState.map(blog => blog.id === action.data.id ? action.data: blog)
  }
  changedState.sort((a, b) => a.likes < b.likes? 1: -1)
  return changedState
}

export const initBlog = (blogs) => {
  return dispatch => {
    dispatch({
      type: 'BLOG_INIT',
      data: blogs
    })
  }
}

export const addBlog = (blog) => {
  return dispatch => {
    dispatch({
      type: 'ADD_BLOG',
      data: blog
    })
  }
}

export const deleteBlog = (id) => {
  return dispatch => {
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export const replaceBlog = (blog) => {
  return dispatch => {
    dispatch({
      type: 'REPLACE_BLOG',
      data: blog
    })
  }
}

export default blogReducer