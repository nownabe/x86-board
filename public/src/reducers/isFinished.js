const isFinished = (state = false, action) => {
  switch(action.type) {
    case "FINISH":
      return true
    default:
      return false
  }
}

export default isFinished
