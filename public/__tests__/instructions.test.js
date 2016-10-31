//const instructions = require("../src/instructions.js").default
//const Emulator = require("../src/Emulator.js").default

import instructions from "../src/instructions"
import Emulator from "../src/Emulator"

test("0x00 ADD r/m8, r8", () => {
  let emulator = new Emulator()
  emulator.setRegister32(0, 0)
  emulator.setRegister8(1, 1)
  emulator.dataView.setUint8(0x0100, 0xC8)
  emulator.programCounter = 0x0100
  instructions[0x00](emulator)
  expect(emulator.getRegister8(0)).toBe(1)
})
