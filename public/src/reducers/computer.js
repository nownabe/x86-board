import { MEMORY_SIZE, REGISTERS } from "../constants"

let initialState = {
  memory: new Uint8Array(MEMORY_SIZE),
  registers: new Uint32Array(REGISTERS.length),
  program_counter: 0,
  eflags: 0
}

const computer = (state = initialState, action) => {
  return state
}

export default computer
