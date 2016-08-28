{
  computer: {
    memory: Uint8Array(1024 * 1024),
    registers: Uint32Array(REGISTERS_SIZE),
    program_counter: uint32,
    stack_pointer: uint32
  },
  assembly: String,
  input: String,
  output: String
}
