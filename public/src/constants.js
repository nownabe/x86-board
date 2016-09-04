export const ADDRESS_OFFSET = 0x0100 >>> 0
export const MEMORY_SIZE = 1024 * 1

// Registers
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
export const AL = SHORT_REGISTERS.indexOf("al")

// Flags
export const CF = 0
export const ZF = 6
export const SF = 7
export const OF = 11
export const FLAGS = new Array(16)
FLAGS[CF] = "CF"
FLAGS[ZF] = "ZF"
FLAGS[SF] = "SF"
FLAGS[OF] = "OF"
