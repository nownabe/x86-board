import { REGISTERS, EAX, EDX, ESP, EBP, AL, FLAGS, CF, ZF, SF, OF } from "./constants"

// http://ref.x86asm.net/coder.html
const instructions = {}

// <0x00> ADD r/m8, r8
instructions[0x00] = (emulator) => {
  console.log("ADD r/m8, r8")
  let modrm = emulator.getModRM()
  modrm.setRM8(modrm.getR8() + modrm.getRM8())
}

// <0x01> ADD r/m32, r32
instructions[0x01] = (emulator) => {
  console.log("ADD r/m32, r32")
  let modrm = emulator.getModRM()
  modrm.setRM32(modrm.getRM32() + modrm.getR32())
}

// <0x02> ADD r8, r/m8
instructions[0x02] = (emulator) => {
  console.log("ADD r8, r/m8")
  let modrm = emulator.getModRM()
  modrm.setR8(modrm.getR8() + modrm.getRM8())
}

// <0x03> ADD r32, r/m32
// <0x04> ADD AL, imm8
// <0x05> ADD EAX, imm32
// <0x08> OR r/m8, r8
// <0x09> OR r/m32, r32
// <0x0A> OR r8, r/m8
// <0x0B> OR r32, r/m32
// <0x0C> OR AL, imm8
// <0x0D> OR EAX, imm32

// <0x3B> CMP r32, r/m32
instructions[0x3B] = (emulator) => {
  console.log("CMP r32, r/m32")
  let modrm = emulator.getModRM()
  let r32   = modrm.getR32()
  let rm32  = modrm.getRM32()
  modrm.updateFlags(r32, rm32, r32 - rm32)
}

// <0x3C> CMP AL, imm8
instructions[0x3C] = (emulator) => {
  console.log("CMP AL, imm8")
  let al   = emulator.getRegister8(AL)
  let imm8 = emulator.getUint8()
  emulator.updateFlags(al, imm8, al - imm8)
}

// <0x3D> CMP EAX, imm32
instructions[0x3D] = (emulator) => {
  console.log("CMP EAX, imm32")
  let eax   = emulator.getRegister32(EAX)
  let imm32 = emulator.getUin32()
  emulator.updateFlags(eax, imm32, eax - imm32)
}

// <0x40+r> INC r32
for (let r = 0; r < REGISTERS.length; r++) {
  instructions[0x40 + r] = (emulator) => {
    console.log("INC r32")
    emulator.setRegister32(r, emulator.getRegister32(r) + 1)
  }
}

// <0x50+r> PUSH r32
for (let r = 0; r < REGISTERS.length; r++) {
  instructions[0x50 + r] = (emulator) => {
    console.log("PUSH r32")
    emulator.push32(emulator.getRegister32(r))
  }
}

// <0x58+r> POP r32
for (let r = 0; r < REGISTERS; r++) {
  instructions[0x58 + r] = (emulator) => {
    console.log("POP r32")
    emulator.setRegister32(emulator.pop32())
  }
}

// <0x68> PUSH imm32
instructions[0x68] = (emulator) => {
  console.log("PUSH imm32")
  emulator.push32(emulator.getUint32())
}

// <0x6A> PUSH imm8
instructions[0x6A] = (emulator) => {
  console.log("PUSH imm8")
  emulator.push8(emulator.getUint8())
}

let defineJump = (code, flag) => {
  instructions[code] = (emulator) => {
    console.log(`J${FLAGS[flag][0]} rel8`)
    let rel8 = emulator.getInt8()
    if (emulator.getFlag(flag)) {
      emulator.programCounter += rel8
    }
  }
  instructions[code + 1] = (emulator) => {
    console.log(`JN${FLAGS[flag][0]} rel8`)
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
  console.log("JL rel8")
  let rel8 = emulator.getInt8()
  if (emulator.getSF() != emulator.getOF()) {
    emulator.programCounter += rel8
  }
}

// <0x7D> JNL rel8
instructions[0x7D] = (emulator) => {
  console.log("JNL rel8")
  let rel8 = emulator.getInt8()
  if (emulator.getSF() === emulator.getOF()) {
    emulator.programCounter += rel8
  }
}

// <0x7E> JLE rel8
instructions[0x7E] = (emulator) => {
  console.log("JLE rel8")
  let rel8 = emulator.getInt8()
  if (emulator.getZF() || emulator.getSF() !== emulator.getOF()) {
    emulator.programCounter += rel8
  }
}

// <0x7F> JNLE rel8
instructions[0x7F] = (emulator) => {
  console.log("JNLE rel8")
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
      console.log("ADD r/m32, imm8")
      res = rm32 + imm8
      modrm.setRM32(res)
      break
    case 5: // SUB r/m32, imm8
      console.log("SUB r/m32, imm8")
      res = rm32 - imm8
      modrm.setRM32(res)
      break
    case 7: // CMP r/m32, imm8
      console.log("CMP r/m32, imm8")
      res = rm32 - imm8
      break
    default:
      console.error("NOT IMPLEMENTED!")
      return
  }
  emulator.updateFlags(rm32, imm8, res)
}

// <0x88> MOV r/m8, r8
instructions[0x88] = (emulator) => {
  console.log("MOV r/m8, r8")
  let modrm = emulator.getModRM()
  modrm.setRM8(modrm.getR8())
}

// <0x89> MOV r/m32, r32
instructions[0x89] = (emulator) => {
  console.log("MOV r/m32, r32")
  let modrm = emulator.getModRM()
  modrm.setRM32(modrm.getR32())
}

// <0x8A> MOV r8, r/m8
instructions[0x8A] = (emulator) => {
  console.log("MOV r8, r/m8")
  let modrm = emulator.getModRM()
  modrm.setR8(modrm.getRM8())
}

// <0x8B> MOV r32, r/m32
instructions[0x8B] = (emulator) => {
  console.log("MOV r32, r/m32")
  let modrm = emulator.getModRM()
  modrm.setR32(modrm.getRM32())
}

// <0xB0+r> MOV r8, imm8
for (let r = 0; r < REGISTERS.length; r++) {
  instructions[0xB0 + r] = (emulator) => {
    console.log("MOV r8, imm8")
    emulator.setRegister8(r, emulator.getUint8())
  }
}

// <0xB8+r> MOV r32, imm32
for (let r = 0; r < REGISTERS.length; r++) {
  instructions[0xB8 + r] = (emulator) => {
    console.log("MOV r32, imm32")
    emulator.setRegister32(r, emulator.getUint32())
  }
}

// <0xC3> RETN
instructions[0xC3] = (emulator) => {
  console.log("RETN")
  emulator.programCounter = emulator.pop32()
}

// <0xC7> MOV r/m32, imm32
instructions[0xC7] = (emulator) => {
  console.log("MOV r/m32, imm32")
  let modrm = emulator.getModRM()
  modrm.setRM32(emulator.getUint32())
}

// <0xC9> LEAVE
instructions[0xC9] = (emulator) => {
  console.log("LEAVE")
  emulator.setRegister32(ESP, emulator.getRegister32(EBP))
  emulator.setRegister32(EBP, emulator.pop32())
}

// <0xE8> CALL rel32
instructions[0xE8] = (emulator) => {
  console.log("CALL rel32")
  let rel = emulator.getInt32()
  emulator.push32(emulator.programCounter)
  emulator.programCounter += rel
}

// <0xE9> JMP rel32
instructions[0xE9] = (emulator) => {
  console.log("JMP rel32")
  let rel = emulator.getInt32()
  emulator.programCounter += rel
}

// <0xEB> JMP rel8
instructions[0xEB] = (emulator) => {
  console.log("JMP rel8")
  let rel = emulator.getInt8()
  emulator.programCounter += rel
}

// <0xEC> IN AL, DX
instructions[0xEC] = (emulator) => {
  console.log("IN AL, DX")
  let address = emulator.getRegister32(EDX) & 0xffff
  let char = emulator.io.in8(address)
  emulator.setRegister8(AL, char)
}

// <0xEE> OUT DX, AL
instructions[0xEE] = (emulator) => {
  console.log("OUT DX, AL")
  let address = emulator.getRegister32(EDX) & 0xffff
  let char = emulator.getRegister8(AL)
  emulator.io.out8(address, char)
}

// <0xFF>
instructions[0xFF] = (emulator) => {
  let modrm = emulator.getModRM()
  switch (modrm.reg) {
    case 0: // INC r/m32
      console.log("INC r/m32")
      modrm.setRM32(modrm.getRM32() + 1)
      break
    default:
      console.error("NOT IMPLEMENTED!")
      return
  }
}

export default instructions
