import { REGISTERS } from "./constants"

// http://ref.x86asm.net/coder.html
const instructions = {}

// <0x00> ADD r/m8, r8
instructions[0x00] = (emulator) => {
  let modrm = emulator.getModRM()
  modrm.setRM8(modrm.getR8() + modrm.getRM8())
}

// <0x01> ADD r/m32, r32
instructions[0x01] = (emulator) => {
  let modrm = emulator.getModRM()
  modrm.setRM32(modrm.getRM32() + modrm.getR32())
}

// <0x83>
instructions[0x83] = (emulator) => {
  let modrm = emulator.getModRM()
  switch (modrm.reg) {
    case 5: // SUB r/m32, imm8
      modrm.setRM32(modrm.getRM32() - emulator.getInt8())
  }
}

// <0x89> MOV r/m32, r32
instructions[0x89] = (emulator) => {
  let modrm = emulator.getModRM()
  modrm.setRM32(modrm.getR32())
}

// <0x8B> MOV r32, r/m32
instructions[0x8B] = (emulator) => {
  let modrm = emulator.getModRM()
  modrm.setR32(modrm.getRM32())
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
  let rel = emulator.getInt32()
  emulator.programCounter += rel
}

// <0xEB> JMP rel8
instructions[0xEB] = (emulator) => {
  emulator.programCounter += emulator.getInt8()
}

// <0xFF>
instructions[0xFF] = (emulator) => {
  let modrm = emulator.getModRM()
  switch (modrm.reg) {
    case 0: // INC r/m32
      modrm.setRM32(modrm.getRM32() + 1)
  }
}

export default instructions
