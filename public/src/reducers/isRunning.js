const isRunning = (state = false, action) => {
  switch (action.type) {
  case "STEP":
  case "RUN":
    return true

  case "FINISH":
  case "RESET":
    return false

  default:
    return state
  }
}

export default isRunning
