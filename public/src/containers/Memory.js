import React from "react"
import { connect } from "react-redux"
import { sprintf } from "sprintf-js"

const mapStateToProps = (state) => {
  return {
    memory: state.memory,
    program_counter: state.program_counter
  }
}

const Memory = ({ memory, program_counter }) => {
  let memoryRows = new Array(Math.ceil(memory.length / 16.0))

  for (let i = 0; i < memory.length; i += 16) {
    let row = new Array(17)
    row.push(<td key={`address${i}`} className="address">{sprintf("0x%08X", i)}</td>)
    for (let j = 0; j < 16; j++) {
      let addr = i + j
      let klass = ""
      if ( addr === program_counter ) {
        klass = "pointed"
      }
      row.push(<td key={i + j} className={klass}>{sprintf("%02X", memory[i + j])}</td>)
    }
    memoryRows.push(<tr key={`row${i}`}>{row}</tr>)
  }

  return (
    <table className="table is-narrow is-striped" id="memoryTable">
      <thead>
        <tr>
          <th className="address">Address</th>
          <th>+0</th>
          <th>+1</th>
          <th>+2</th>
          <th>+3</th>
          <th>+4</th>
          <th>+5</th>
          <th>+6</th>
          <th>+7</th>
          <th>+8</th>
          <th>+9</th>
          <th>+A</th>
          <th>+B</th>
          <th>+C</th>
          <th>+D</th>
          <th>+E</th>
          <th>+F</th>
        </tr>
      </thead>
      <tbody>
        {memoryRows}
      </tbody>
    </table>
  )
}

export default connect(mapStateToProps)(Memory)
