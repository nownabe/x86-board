import { sprintf } from "sprintf-js"
import ModRM from "./ModRM"
import IO from "./IO"
import instructions from "./instructions"
import { ADDRESS_OFFSET, REGISTERS, MEMORY_SIZE, ESP, CF, ZF, SF, OF } from "./constants"

export default class Emulator {
  constructor() {
    this.programCounter = ADDRESS_OFFSET
    this.registers = new Uint32Array(REGISTERS.length)
    this.registers[ESP] = ADDRESS_OFFSET
    this.eflags = 0
    this.memory = new Uint8Array(MEMORY_SIZE)
    this.dataView = new DataView(this.memory.buffer)
    this.io = new IO()
  }

  dup() {
    let emulator = new Emulator()
    emulator.programCounter = this.programCounter
    emulator.registers = new Uint32Array(this.registers)
    emulator.eflags = this.eflags
    emulator.memory = new Uint8Array(this.memory)
    emulator.dataView = new DataView(emulator.memory.buffer)
    emulator.io = this.io.dup()
    return emulator
  }

  loadProgram(binary) {
    for (let i = 0; i < binary.length; i++) {
      this.memory[ADDRESS_OFFSET + i] = binary.charCodeAt(i)
    }
  }

  execute() {
    let instruction = instructions[this.getUint8()]
    if (instruction) {
      instruction(this)
    } else {
      console.error("NOT IMPLEMENTED!")
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

  getMemory32(address, data) {
    return this.dataView.getUint32(address, true)
  }

  setMemory32(address, data) {
    this.dataView.setUint32(address, data, true)
  }

  // Stack
  push8(data) {
    let address = this.getRegister32(ESP) - 1
    this.setRegister32(ESP, address)
    this.setMemory8(address, data)
  }

  pop8() {
    let address = this.getRegister32(ESP)
    let data = this.getMemory8(address)
    this.setRegister32(ESP, address + 1)
    return data
  }

  push32(data) {
    let address = this.getRegister32(ESP) - 4
    this.setRegister32(ESP, address)
    this.setMemory32(address, data)
  }

  pop32() {
    let address = this.getRegister32(ESP)
    let data = this.getMemory32(address)
    this.setRegister32(ESP, address + 4)
    return data
  }

  // Flags
  updateFlags(val1, val2, result) {
    let sign1 = val1 >>> 31
    let sign2 = val2 >>> 31
    let signr = (result >>> 31) & 0b1
    this.setCF(sprintf("%033b", result)[0] === "1")
    this.setZF(result === 0)
    this.setSF(signr)
    this.setOF(sign1 != sign2 && sign1 != signr)
  }

  getFlag(bit) {
    let flag = 0b1 << bit
    return (this.eflags & flag) != 0
  }

  setFlag(bit, isFlagged) {
    let flag = 0b1 << bit
    if (isFlagged) {
      this.eflags |= flag
    } else {
      this.eflags &= ~flag
    }
  }

  getCF() {
    return this.getFlag(CF)
  }

  setCF(isFlagged) {
    this.setFlag(CF, isFlagged)
  }

  getZF() {
    return this.getFlag(ZF)
  }

  setZF(isFlagged) {
    this.setFlag(ZF, isFlagged)
  }

  getSF() {
    return this.getFlag(SF)
  }

  setSF(isFlagged) {
    this.setFlag(SF, isFlagged)
  }

  getOF() {
    return this.getFlag(OF)
  }

  setOF(isFlagged) {
    this.setFlag(OF, isFlagged)
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

  getUint32() {
    this.programCounter += 4
    return this.dataView.getUint32(this.programCounter - 4, true)
  }

  getModRM() {
    return new ModRM(this)
  }
}
