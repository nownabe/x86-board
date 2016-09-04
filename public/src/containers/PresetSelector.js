import React from "react"
import { connect } from "react-redux"
import { setAssembly } from "../actions"
import presets from "../presets"

const mapStateToProps = (state) => {
  return {
    assembly: state.assembly
  }
}

const PresetSelector = ({dispatch, assembly}) => {
  const onChange = (event) => {
    if (event.target.value !== "title") {
      dispatch(setAssembly(presets[event.target.value]))
    }
  }

  return(
    <span className="select" id="codeSelector">
      <select className="select" onChange={onChange}>
        <option value="title">Preset Codes</option>
        <option value="tutorial">Tutorial</option>
        <option value="ex1">Example 1</option>
        <option value="subroutine">Subroutine</option>
        <option value="io">I/O</option>
      </select>
    </span>
  )
}

export default connect(mapStateToProps)(PresetSelector)
