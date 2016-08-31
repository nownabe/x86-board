import Emulator from "../Emulator"

const emulator = (state = new Emulator(), action) => {
  switch (action.type) {
  case "SET_BINARY":
    return action.emulator

  case "STEP":
    return action.emulator

  case "RESET":
    return new Emulator()

  default:
    return state
  }
}

export default emulator
