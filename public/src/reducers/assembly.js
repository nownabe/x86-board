// let initialState = "BITS 32\n  org 0x0100\n  mov eax, 41\n  jmp 0\n"
let initialState = "BITS 32\n" +
  "  org 0x0100\n" +
  "  sub esp, 16\n" +
  "  mov ebp, esp\n" +
  "  mov eax, 2\n" +
  "  mov dword [ebp+4], 5\n" +
  "  add dword [ebp+4], eax\n" +
  "  mov esi, [ebp+4]\n" +
  "  inc dword [ebp+4]\n" +
  "  mov edi, [ebp+4]\n" +
  "  jmp 0"

const assembly = (state = initialState, action) => {
  if (action.type == "SET_ASSEMBLY") {
    return action.assembly
  } else {
    return state
  }
}

export default assembly
