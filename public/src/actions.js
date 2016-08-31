import instructions from "./instructions"

export const setBinary = (binary, emulator) => {
  let nextEmulator = emulator.dup()
  nextEmulator.loadProgram(binary)
  return {
    type: "SET_BINARY",
    emulator: nextEmulator
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
  let pc = emulator.programCounter
  if (pc === 0) {
    return {
      type: "RESET"
    }
  } else {
    let nextEmulator = emulator.dup()
    instructions[emulator.memory[pc]](nextEmulator)
    return {
      type: "STEP",
      emulator: nextEmulator
    }
  }
}
