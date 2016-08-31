import instructions from "./instructions"

export const setBinary = (binary, emulator) => {
  let next_emulator = emulator.dup()
  next_emulator.load_program(binary)
  return {
    type: "SET_BINARY",
    emulator: next_emulator
  }
}

export const setAssembly = (assembly) => {
  return {
    type: "SET_ASSEMBLY",
    assembly
  }
}

export const step = (emulator) => {
  let pc = emulator.program_counter
  if (pc === 0) {
    return {
      type: "RESET"
    }
  } else {
    let code = memory[pc]
    let instruction = instructions[code]
    return {
      type: "STEP",
      // emulator: instructions[code](emulator.dup)
      emulator: emulator.dup
    }
  }
}
