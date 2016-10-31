import instructions from "../src/instructions"
import Emulator from "../src/Emulator"
import { EAX, ECX, AL, CL } from "../src/constants"

function newEmulator(data) {
  let emulator = new Emulator()
  for (let i = 0; i < data.length; i++) {
    emulator.dataView.setUint8(0x0100 + i, data[i])
  }
  return emulator
}

// <0x00> ADD r/m8, r8
test("ADD al, cl", () => {
  let emulator = newEmulator([0xC8])
  emulator.setRegister8(AL, 2)
  emulator.setRegister8(CL, 3)
  instructions[0x00](emulator)
  expect(emulator.getRegister8(AL)).toBe(5)
})

// <0x01> ADD r/m32, r32
test("ADD dword [0xF0], eax", () => {
  let emulator = newEmulator([0x05, 0xF0, 0x00, 0x00, 0x00])
  emulator.dataView.setUint32(0xF0, 2, true)
  emulator.setRegister32(EAX, 3)
  instructions[0x01](emulator)
  expect(emulator.dataView.getUint32(0xF0, true)).toBe(5)
})

// <0x02> ADD r8, r/m8
test("ADD al, [0xF0]", () => {
  let emulator = newEmulator([0x05, 0xF0, 0x00, 0x00, 0x00])
  emulator.dataView.setUint8(0xF0, 2)
  emulator.setRegister8(AL, 3)
  instructions[0x02](emulator)
  expect(emulator.getRegister8(AL)).toBe(5)
})

// <0x03> ADD r32, r/m32
test("ADD eax, dword [0xF0]", () => {
  let emulator = newEmulator([0x05, 0xF0, 0x00, 0x00, 0x00])
  emulator.dataView.setUint32(0xF0, 2, true)
  emulator.setRegister32(EAX, 3)
  instructions[0x03](emulator)
  expect(emulator.getRegister32(EAX)).toBe(5)
})

// <0x8D> LEA r32, m
test("LEA eax, [0xF0]", () => {
  let emulator = newEmulator([0x05, 0xF0, 0x00, 0x00, 0x00])
  instructions[0x8D](emulator)
  expect(emulator.getRegister32(EAX)).toBe(0xF0)
})
