import React from "react"
import { connect } from "react-redux"
import { step } from "../instructions"

const StepButton = ({ dispatch, eflags, memory, program_counter, registers }) => {
  let onClick = () => {
    console.log("Step run")
    dispatch(step(eflags, memory, program_counter, registers))
  }

  return (
    <button className="button is-success" onClick={onClick}>
      Step
    </button>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    registers: state.registers,
    memory: state.memory,
    program_counter: state.program_counter,
    eflags: state.eflags
  }
}

export default connect(mapStateToProps)(StepButton)
