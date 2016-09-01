import Emulator from "./Emulator"
import instructions from "./instructions"

export const initializeEmulator = (binary) => {
  let emulator = new Emulator()
  emulator.loadProgram(binary)
  return {
    type: "INITIALIZE_EMULATOR",
    emulator: emulator
  }
}

export const setAssembly = (assembly) => {
  return {
    type: "SET_ASSEMBLY",
    assembly
  }
}

export const reset = () => {
  return {
    type: "RESET"
  }
}

export const step = (emulator) => {
  emulator = emulator.dup()
  instructions[emulator.getUint8()](emulator)
  if (emulator.programCounter == 0) {
    return {
      type: "FINISH",
      emulator: emulator
    }
  } else {
    return {
      type: "STEP",
      emulator: emulator
    }
  }
}
