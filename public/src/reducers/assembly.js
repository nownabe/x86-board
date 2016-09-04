const assembly = (state = "", action) => {
  if (action.type == "SET_ASSEMBLY") {
    return action.assembly
  } else {
    return state
  }
}

export default assembly
