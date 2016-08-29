let initialState = null

const binary = (state = initialState, action) => {
  if (action.type == "SET_BINARY") {
    return action.binary
  } else {
    return state
  }
}

export default binary
