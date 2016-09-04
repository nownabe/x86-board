import { REGISTERS, ESP, EBP, CF, ZF, SF, OF } from "./constants"

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

// <0x3B> CMP r32, r/m32
instructions[0x3B] = (emulator) => {
  let modrm = emulator.getModRM()
  let r32   = modrm.getR32()
  let rm32  = modrm.getRM32()
  modrm.updateFlags(r32, rm32, r32 - rm32)
}

// <0x3C> CMP AL, imm8
instructions[0x3C]

// <0x3D> CMP EAX, imm32
instructions[0x3D]

// <0x40+r> INC r32
for (let r = 0; r < REGISTERS.length; r++) {
  instructions[0x40 + r] = (emulator) => {
  }
}

// <0x50+r> PUSH r32
for (let r = 0; r < REGISTERS.length; r++) {
  instructions[0x50 + r] = (emulator) => {
    emulator.push32(emulator.getRegister32(r))
  }
}

// <0x58+r> POP r32
for (let r = 0; r < REGISTERS; r++) {
  instructions[0x58 + r] = (emulator) => {
    emulator.setRegister32(emulator.pop32())
  }
}

// <0x68> PUSH imm32
instructions[0x68] = (emulator) => {
  emulator.push32(emulator.getUint32())
}

// <0x6A> PUSH imm8
instructions[0x6A] = (emulator) => {
  emulator.push8(emulator.getUint8())
}

let defineJump = (code, flag) => {
  instructions[code] = (emulator) => {
    let rel8 = emulator.getInt8()
    if (emulator.getFlag(flag)) {
      emulator.programCounter += rel8
    }
  }
  instructions[code + 1] = (emulator) => {
    let rel8 = emulator.getInt8()
    if (!emulator.getFlag(flag)) {
      emulator.programCounter += rel8
    }
  }
}

// <0x70> JO rel8
// <0x71> JNO rel8
defineJump(0x70, OF)

// <0x72> JC rel8
// <0x73> JNC rel8
defineJump(0x72, CF)

// <0x74> JZ rel8
// <0x75> JNZ rel8
defineJump(0x74, ZF)

// <0x78> JS rel8
// <0x79> JNS rel8
defineJump(0x78, SF)

// <0x7C> JL rel8
instructions[0x7C] = (emulator) => {
  let rel8 = emulator.getInt8()
  if (emulator.getSF() != emulator.getOF()) {
    emulator.programCounter += rel8
  }
}

// <0x7D> JNL rel8
instructions[0x7D] = (emulator) => {
  let rel8 = emulator.getInt8()
  if (emulator.getSF() === emulator.getOF()) {
    emulator.programCounter += rel8
  }
}

// <0x7E> JLE rel8
instructions[0x7E] = (emulator) => {
  let rel8 = emulator.getInt8()
  if (emulator.getZF() || emulator.getSF() !== emulator.getOF()) {
    emulator.programCounter += rel8
  }
}

// <0x7F> JNLE rel8
instructions[0x7F] = (emulator) => {
  let rel8 = emulator.getInt8()
  if (!emulator.getZF() && emulator.getSF() === emulator.getOF()) {
    emulator.programCounter += rel8
  }
}

// <0x83>
instructions[0x83] = (emulator) => {
  let modrm = emulator.getModRM()
  let rm32  = modrm.getRM32()
  let imm8  = emulator.getInt8()
  let res
  switch (modrm.reg) {
    case 0: // ADD r/m32, imm8
      res = rm32 + imm8
      modrm.setRM32(res)
      break
    case 5: // SUB r/m32, imm8
      res = rm32 - imm8
      modrm.setRM32(res)
      break
    case 7: // CMP r/m32, imm8
      res = rm32 - imm8
      break
    default:
      return
  }
  emulator.updateFlags(rm32, imm8, res)
}

// <0x88> MOV r/m8, r8
instructions[0x88]

// <0x89> MOV r/m32, r32
instructions[0x89] = (emulator) => {
  let modrm = emulator.getModRM()
  modrm.setRM32(modrm.getR32())
}

// <0x8A> MOV r/m8, r8
instructions[0x8A]

// <0x8B> MOV r32, r/m32
instructions[0x8B] = (emulator) => {
  let modrm = emulator.getModRM()
  modrm.setR32(modrm.getRM32())
}

// <0xB0+r> MOV r8, imm8
for (let r = 0; r < REGISTERS.length; r++) {
  instructions[0xB0 + r] = (emulator) => {
  }
}

// <0xB8+r> MOV r32, imm32
for (let r = 0; r < REGISTERS.length; r++) {
  instructions[0xB8 + r] = (emulator) => {
    emulator.setRegister32(r, emulator.getUint32())
  }
}

// <0xC3> RETN
instructions[0xC3] = (emulator) => {
  emulator.programCounter = emulator.pop32()
}

// <0xC7> MOV r/m32, imm32
instructions[0xC7] = (emulator) => {
  let modrm = emulator.getModRM()
  modrm.setRM32(emulator.getUint32())
}

// <0xC9> LEAVE
instructions[0xC9] = (emulator) => {
  emulator.setRegister32(ESP, emulator.getRegister32(EBP))
  emulator.setRegister32(EBP, emulator.pop32())
}

// <0xE8> CALL rel32
instructions[0xE8] = (emulator) => {
  let rel = emulator.getInt32()
  emulator.push32(emulator.programCounter)
  emulator.programCounter += rel
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

// <0xEC>
instructions[0xEC]

// <0xEE>
instructions[0xEE]

// <0xFF>
instructions[0xFF] = (emulator) => {
  let modrm = emulator.getModRM()
  switch (modrm.reg) {
    case 0: // INC r/m32
      modrm.setRM32(modrm.getRM32() + 1)
      break;
  }
}

export default instructions
