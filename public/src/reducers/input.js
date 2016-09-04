let input = (state = "", action) => {
  switch(action.type) {
    case "SET_INPUT":
      return action.input

    case "RESET":
      return ""

    default:
      return state
  }
}

export default input
