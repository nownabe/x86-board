const instructions = {
  0x00: () => {}
}

export const step = (eflags, memory, program_counter, registers) => {
  // dispatch(instructions[code])
  return {
    type: "STEP"
  }
}
