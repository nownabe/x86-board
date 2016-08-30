import { MEMORY_SIZE, ADDRESS_OFFSET } from "../constants"

const memory = (state = new Uint8Array(MEMORY_SIZE), action) => {
  switch (action.type) {
  case "INITIALIZE_EMULATOR":
    let state = new Uint8Array(MEMORY_SIZE)
    let i = 0
    for (let i = 0; i < action.binary.length; i++) {
      state[ADDRESS_OFFSET + i] = action.binary.charCodeAt(i)
    }
    return state

  default:
    return state
  }
}

export default memory
