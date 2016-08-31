import { ADDRESS_OFFSET, REGISTERS, MEMORY_SIZE } from "./constants"

export default class Emulator {
  constructor() {
    this.programCounter = ADDRESS_OFFSET
    this.registers = new Uint32Array(REGISTERS.length)
    // initialize esp
    this.eflags = 0
    this.memory = new Uint8Array(MEMORY_SIZE)
    this.dataView = new DataView(this.memory.buffer)
  }

  dup() {
    let emulator = new Emulator()
    emulator.programCounter = this.programCounter
    emulator.registers.set(this.registers)
    emulator.eflags = this.eflags
    emulator.memory.set(this.memory)
    return emulator
  }

  loadProgram(binary) {
    for (let i = 0; i < binary.length; i++) {
      this.memory[ADDRESS_OFFSET + i] = binary.charCodeAt(i)
    }
  }

  getInt8(offset = 0) {
    return this.dataView.getInt8(this.programCounter + offset)
  }

  getUint8(offset = 0) {
    return this.memory[this.programCounter + offset]
  }

  getInt32(offset = 0) {
    return this.dataView.getInt32(this.programCounter + offset, true)
  }

  getUint32(offset = 0) {
    return this.dataView.getUint32(this.programCounter + offset, true)
  }

  setRegister32(register, data) {
    this.registers[register] = data
  }
}
