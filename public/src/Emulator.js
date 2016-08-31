import { ADDRESS_OFFSET, REGISTERS, MEMORY_SIZE } from "./constants"

export default class Emulator {
  constructor() {
    this.program_counter = ADDRESS_OFFSET
    this.registers = new Uint32Array(REGISTERS.length)
    // initialize esp
    this.eflags = 0
    this.memory = new Uint8Array(MEMORY_SIZE)
  }

  dup() {
    let emulator = new Emulator()
    emulator.program_counter = this.program_counter
    emulator.registers = this.registers
    emulator.eflags = this.eflags
    emulator.memory = this.memory
    return emulator
  }

  load_program(binary) {
    for (let i = 0; i < binary.length; i++) {
      this.memory[ADDRESS_OFFSET + i] = binary.charCodeAt(i)
    }
  }
}
