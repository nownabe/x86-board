const isAssembled = (state = false, action) => {
  switch(action.type) {
    case "INITIALIZE_EMULATOR":
      return true

    case "FINISH":
    case "RESET":
      return false

    default:
      return state
  }
}

export default isAssembled
