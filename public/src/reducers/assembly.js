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

initialState = "BITS 32\n" +
  "  org 0x0100\n" +
  "start:\n" +
  "  mov eax, 0x00f1\n" +
  "  mov ebx, 0x0029\n" +
  "  call add_routine\n" +
  "  jmp 0\n" +
  "add_routine:\n" +
  "  mov ecx, eax\n" +
  "  add ecx, ebx\n" +
  "  ret"

const assembly = (state = initialState, action) => {
  if (action.type == "SET_ASSEMBLY") {
    return action.assembly
  } else {
    return state
  }
}

export default assembly
