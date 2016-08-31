import { REGISTERS } from "./constants"

const instructions = {}

// <B8+r> MOV r32, imm32
for (let i = 0; i < REGISTERS.length; i++) {
  instructions[0xB8 + i] = (emulator) => {
    let reg = emulator.getUint8() - 0xb8
    emulator.setRegister32(reg, emulator.getUint32(1))
    emulator.programCounter += 5
  }
}

// <0xE9> JMP rel32
instructions[0xE9] = (emulator) => {
  let rel = emulator.getInt32(1)
  emulator.programCounter += (5 + rel)
}

// <0xEB> JMP rel8
instructions[0xEB] = (emulator) => {
  let rel = emulator.getInt8(1)
  emulator.programCounter += (2 + rel)
}

export default instructions
