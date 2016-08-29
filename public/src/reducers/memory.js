import { MEMORY_SIZE } from "../constants"

const ADDRESS = 0x7c00

const memory = (state = new Uint8Array(MEMORY_SIZE), action) => {
  switch (action.type) {
  case "INITIALIZE_EMULATOR":
    let state = new Uint8Array(MEMORY_SIZE)
    let i = 0
    for (let i = 0; i < action.binary.length; i++) {
      state[ADDRESS + i] = action.binary[i]
      console.log(state[ADDRESS + i])
    }
    return state

  default:
    return state
  }
}

export default memory
