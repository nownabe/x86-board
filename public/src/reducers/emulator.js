import Emulator from "../Emulator"

const emulator = (state = new Emulator(), action) => {
  switch (action.type) {
  case "INITIALIZE_EMULATOR":
  case "STEP":
  case "FINISH":
    return action.emulator

  case "RESET":
    return new Emulator()

  default:
    return state
  }
}

export default emulator
