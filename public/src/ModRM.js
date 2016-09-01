export default class ModRM {
  // http://ref.x86asm.net/coder.html#modrm_byte_32
  constructor(emulator) {
    this.emulator = emulator
    let modrm = this.emulator.getUint8()
    this.mod = (modrm & 0b11000000) >> 6
    this.reg = (modrm & 0b00111000) >> 3
    this.rm  = (modrm & 0b00000111)

    if ((this.mod !== 0b11 && this.rm === 0b100)) {
      this.sib = this.emulator.getUint8()
    }

    if ((this.mod === 0b00 && this.rm === 0b101) || this.mod === 0b10) {
      this.disp32 = this.emulator.getInt32()
    } else if (this.mod === 0b01) {
      this.disp8 = this.emulator.getInt8()
    }

    if (this.mod !== 0b11 && this.rm !== 0b100) {
      this.address = this.calcAddress()
    }
  }

  calcAddress() {
    switch(this.mod) {
      case 0b00:
        if (this.rm === 0b100) return null
        else if (this.rm === 0b101) return this.disp32
        else return this.emulator.getRegister32(this.rm)
        break
      case 0b01:
        if (this.rm === 0b100) return null
        else return this.emulator.getRegister32(this.rm) + this.disp8
        break
      case 0b10:
        if (this.rm === 0b100) return null
        else return this.emulator.getRegister32(this.rm) + this.disp32
        break
      default:
        return null
    }
  }

  getR8() {
    return this.emulator.getRegister8(this.reg)
  }

  setR8(data) {}

  getR32() {
    return this.emulator.getRegister32(this.reg)
  }

  setR32(data) {
    this.emulator.setRegister32(this.reg, data)
  }

  getRM8() {
    if (this.mod === 0b11) {
      return this.emulator.getRegister8(this.rm)
    } else {
      return this.emulator.getMemory8(this.address)
    }
  }

  getRM32() {
    if (this.mod === 0b11) {
      return this.emulator.getRegister32(this.rm)
    } else {
      return this.emulator.getMemory32(this.address)
    }
  }

  setRM8(data) {
    if (this.mod === 0b11) {
      this.emulator.setRegister8(this.rm, data)
    } else {
      this.emulator.setMemory8(this.address, data)
    }
  }

  setRM32(data) {
    if (this.mod === 0b11) {
      this.emulator.setRegister32(this.rm, data)
    } else {
      this.emulator.setMemory32(this.address, data)
    }
  }
}
