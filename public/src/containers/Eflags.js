import React from "react"
import { connect } from "react-redux"
import { sprintf } from "sprintf-js"

const mapStateToProps = (state) => {
  return {
    emulator: state.emulator
  }
}

const Eflags = ({ emulator }) => {
  let eflags = sprintf("%016b", emulator.eflags)

  let bits = []
  for(let i = eflags.length - 1; i >= 0; i--) {
    bits.push(<td key={i}>{eflags[i]}</td>)
  }

  return(
    <div is="eflags">
      <h2>Eflags</h2>
      <table className="table is-narrow">
        <thead>
          <tr>
            <th>C</th>
            <th></th>
            <th>P</th>
            <th></th>
            <th>A</th>
            <th></th>
            <th>Z</th>
            <th>S</th>
            <th>T</th>
            <th>I</th>
            <th>D</th>
            <th>O</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {bits}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default connect(mapStateToProps)(Eflags)
