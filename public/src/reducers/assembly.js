let initialState = "BITS 32\n  org 0x7c00\n  mov eax, 41\n  jmp 0\n"

const assembly = (state = initialState, action) => {
  if (action.type == "SET_ASSEMBLY") {
    return action.assembly
  } else {
    return state
  }
}

export default assembly
