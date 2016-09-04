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

initialState = "BITS 32\n\
  org 0x0100\n\
start:\n\
  mov edx, 0x03f8\n\
mainloop:\n\
  in al, dx\n\
  cmp al, 'h'\n\
  je puthello\n\
  cmp al, 'w'\n\
  je putworld\n\
  cmp al, 'q'\n\
  je fin\n\
  jmp mainloop\n\
puthello:\n\
  mov esi, msghello\n\
  call puts\n\
  jmp mainloop\n\
putworld:\n\
  mov esi, msgworld\n\
  call puts\n\
  jmp mainloop\n\
fin:\n\
  jmp 0\n\
\n\
puts:\n\
  mov al, [esi]\n\
  inc esi\n\
  cmp al, 0\n\
  je putsend\n\
  out dx, al\n\
  jmp puts\n\
putsend:\n\
  ret\n\
\n\
msghello:\n\
  db \"hello\", 0x0d, 0x0a, 0\n\
\n\
msgworld:\n\
  db \"world\", 0x0d, 0x0a, 0"

const assembly = (state = initialState, action) => {
  if (action.type == "SET_ASSEMBLY") {
    return action.assembly
  } else {
    return state
  }
}

export default assembly
