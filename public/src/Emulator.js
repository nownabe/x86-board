import { MEMORY_SIZE } from "./constants"

export default class Emulator {
  constructor(binary) {
    this.memory = new Uint8Array(MEMORY_SIZE)
    this.registers = new Uint32Array(REGISTERS.length)
    this.program_counter = 0x7c00
    load_program(binary, 0x7c00)
    // esp = 0x7c00;
  }

  load_program(binary, address) {
    let i = 0
    for (byte of binary) {
      this.memory[address + i] = byte
    }
  }
}
