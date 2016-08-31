const isRunning = (state = false, action) => {
  switch (action.type) {
  case "STEP":
  case "RUN":
    return true

  case "RESET":
    return false

  default:
    return state
  }
}

export default isRunning
