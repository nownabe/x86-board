const isRunning = (state = false, action) => {
  switch (action.type) {
  case "STEP":
  case "RUN":
    return true
  default:
    return state
  }
}

export default isRunning
