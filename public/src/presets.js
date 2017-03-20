const presets = {}

presets["tutorial"] = `;
; This is i386 assmbly emulator.
;
; This emulator has 1KB memory.
; Program will be loaded into 0x100.
; Use 'org 0x0100'
;
; To finish your program, jump to 0x0.
; Use 'jmp 0'
;
; All operations have not been implemented yet.
; Please let me know operations you need.
; https://github.com/nownabe/x86-board/issues
;
; Code from https://www.amazon.co.jp/dp/B0148FQNVC
;

BITS 32
  org 0x0100
  mov eax, 41
  jmp 0`

presets["ex1"] = `;
; Code from https://www.amazon.co.jp/dp/B0148FQNVC
;

BITS 32
  org 0x0100
  sub esp, 16
  mov ebp, esp
  mov eax, 2
  mov dword [ebp+4], 5
  add dword [ebp+4], eax
  mov esi, [ebp+4]
  inc dword [ebp+4]
  mov edi, [ebp+4]
  jmp 0`

presets["subroutine"] = `;
; Code from https://www.amazon.co.jp/dp/B0148FQNVC
;

BITS 32
  org 0x0100
start:
  mov eax, 0x00f1
  mov ebx, 0x0029
  call add_routine
  jmp 0
add_routine:
  mov ecx, eax
  add ecx, ebx
  ret`

presets["io"] = `;
; Enter 'hwq' in input editor.
;
; 'h': prints 'hello'
; 'w': prints 'world'
; 'q': quit
;
; Input/Output is mapped to port 0x03f8.
;
; Code from https://www.amazon.co.jp/dp/B0148FQNVC
;

BITS 32
  org 0x0100
start:
  mov edx, 0x03f8
mainloop:
  in al, dx
  cmp al, 'h'
  je puthello
  cmp al, 'w'
  je putworld
  cmp al, 'q'
  je fin
  jmp mainloop
puthello:
  mov esi, msghello
  call puts
  jmp mainloop
putworld:
  mov esi, msgworld
  call puts
  jmp mainloop
fin:
  jmp 0

puts:
  mov al, [esi]
  inc esi
  cmp al, 0
  je putsend
  out dx, al
  jmp puts
putsend:
  ret

msghello:
  db "hello", 0x0d, 0x0a, 0

msgworld:
  db "world", 0x0d, 0x0a, 0`

export default presets
