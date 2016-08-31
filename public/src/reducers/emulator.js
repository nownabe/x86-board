import Emulator from "../Emulator"

const emulator = (state = new Emulator(), action) => {
  switch (action.type) {
  case "SET_BINARY":
    return action.emulator

  default:
    return state
  }
}

export default emulator
