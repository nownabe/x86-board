import Emulator from "./Emulator.js"

export const setBinary = (binary) => {
  return {
    type: "SET_BINARY",
    binary
  }
}

export const setAssembly = (assembly) => {
  return {
    type: "SET_ASSEMBLY",
    assembly
  }
}

export const initializeEmulator = (binary) => {
  return {
    type: "INITIALIZE_EMULATOR",
    binary
  }
}
