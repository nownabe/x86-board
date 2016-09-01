import ModRM from "./ModRM"
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

  // Register
  getRegister8(register) {
    if (register < 4) {
      return (this.registers[register] & 0xFF)
    } else {
      return ((this.registers[register - 4] >> 8) & 0xFF)
    }
  }

  setRegister8(register, data) {
    if (register < 4) {
      this.registers[register] = (this.registers[register] & 0xffffff00) | data
    } else {
      this.registers[register - 4] = (this.registers[register - 4] & 0xffff00ff) | (data << 8)
    }
  }

  getRegister32(register) {
    return this.registers[register]
  }

  setRegister32(register, data) {
    this.registers[register] = data
  }

  // Memory
  getMemory8(address) {
    return this.dataView.getUint8(address)
  }

  setMemory8(address, data) {
    this.dataView.setUint8(address, data & 0xff)
  }

  setMemory32(address, data) {
    this.dataView.setUint32(address, data, true)
  }

  // Memory pointed by program counter
  getInt8() {
    this.programCounter += 1
    return this.dataView.getInt8(this.programCounter - 1)
  }

  getUint8() {
    this.programCounter += 1
    return this.dataView.getUint8(this.programCounter - 1)
  }

  getInt32() {
    this.programCounter += 4
    return this.dataView.getInt32(this.programCounter - 4, true)
  }

  getUint32(offset = 0) {
    this.programCounter += 4
    return this.dataView.getUint32(this.programCounter - 4, true)
  }

  getModRM() {
    return new ModRM(this)
  }
}
