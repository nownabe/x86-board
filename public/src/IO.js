export default class IO {
  constructor() {
    this.input = ""
    this.output = ""
    this.point = 0
  }

  dup() {
    let io = new IO()
    io.input = this.input
    io.output = this.output
    io.point = this.point
    return io
  }

  in8(address) {
    switch(address) {
      case 0x03f8:
        return this.getChar()
    }
  }

  out8(address, char) {
    switch(address) {
      case 0x03f8:
        this.putChar(char)
    }
  }

  getChar() {
    if (this.input.length > this.point) {
      return this.input[this.point++].charCodeAt(0)
    } else {
      return null
    }
  }

  putChar(char) {
    this.output += String.fromCharCode(char)
  }
}
