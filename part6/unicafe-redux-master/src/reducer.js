const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  const copyState = { ...state }
  switch (action.type) {
    case 'GOOD':
      copyState.good += 1
      return copyState
    case 'OK':
      copyState.ok += 1
      return copyState
    case 'BAD':
      copyState.bad += 1
      return copyState
    case 'ZERO':
      return initialState
    default: return copyState
  }
  
}

export default counterReducer