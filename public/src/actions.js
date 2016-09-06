import Emulator from "./Emulator"

export const initializeEmulator = (binary, input) => {
  let emulator = new Emulator()
  emulator.loadProgram(binary)
  emulator.io.input = input
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

export const setInput = (input) => {
  return {
    type: "SET_INPUT",
    input
  }
}

export const reset = () => {
  return {
    type: "RESET"
  }
}

export const step = (emulator) => {
  emulator = emulator.dup()
  emulator.execute()

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

export const run = (emulator) => {
  let step = (emulator) => {
    return {
      type: "STEP",
      emulator: emulator
    }
  }
  let finish = (emulator) => {
    return {
      type: "FINISH",
      emulator: emulator
    }
  }

  return (dispatch, getState) => {
    while (true) {
      emulator = emulator.dup()
      emulator.execute()
      if (emulator.programCounter == 0) {
        dispatch(finish(emulator))
        break
      } else {
        dispatch(step(emulator))
      }
    }
  }
}
