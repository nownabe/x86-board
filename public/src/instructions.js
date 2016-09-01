import { REGISTERS } from "./constants"

// http://ref.x86asm.net/coder.html
const instructions = {}

// <0x00> ADD r/m8, r8
instructions[0x00] = (emulator) => {
  let modrm = emulator.getModRM()
  modrm.setRM8(modrm.getR8() + modrm.getRM8())
}

// <0x89> MOV r/m32, r32
instructions[0x89] = (emulator) => {
  let modrm = emulator.getModRM()
  modrm.setRM32(modrm.getR32)
}

// <0x8B> MOV r32, r/m32
instructions[0x8B] = (emulator) => {
  let modrm = emulator.getModRm()
  modrm.setR32(modrm.getRM32)
}

// <0xB8+r> MOV r32, imm32
for (let i = 0; i < REGISTERS.length; i++) {
  instructions[0xB8 + i] = (emulator) => {
    emulator.setRegister32(i, emulator.getUint32())
  }
}

// <0xC7> MOV r/m32, imm32
instructions[0xC7] = (emulator) => {
  let modrm = emulator.getModRM()
  modrm.setRM32(emulator.getUint32())
}

// <0xE9> JMP rel32
instructions[0xE9] = (emulator) => {
  emulator.programCounter += emulator.getInt32()
}

// <0xEB> JMP rel8
instructions[0xEB] = (emulator) => {
  emulator.programCounter += emulator.getInt8()
}

export default instructions
