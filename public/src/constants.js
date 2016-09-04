export const ADDRESS_OFFSET = 0x0100 >>> 0
export const MEMORY_SIZE = 1024 * 1
export const REGISTERS = ["eax", "ecx", "edx", "ebx", "esp", "ebp", "esi", "edi"]
export const SHORT_REGISTERS = ["al", "cl", "dl", "bl", "ah", "ch", "dh", "bh"]
export const EAX = REGISTERS.indexOf("eax")
export const ECX = REGISTERS.indexOf("ecx")
export const EDX = REGISTERS.indexOf("edx")
export const EBX = REGISTERS.indexOf("ebx")
export const ESP = REGISTERS.indexOf("esp")
export const EBP = REGISTERS.indexOf("ebp")
export const ESI = REGISTERS.indexOf("esi")
export const EDI = REGISTERS.indexOf("edi")

// Flags
export const CF = 0
export const ZF = 6
export const SF = 7
export const OF = 11
