import React from "react"
import { connect } from "react-redux"
import { step } from "../actions"

const StepButton = ({ dispatch, emulator }) => {
  let onClick = () => {
    console.log("Step run")
    dispatch(step(emulator))
  }

  return (
    <button className="button is-success" onClick={onClick}>
      Step
    </button>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    emulator: state.emulator,
  }
}

export default connect(mapStateToProps)(StepButton)
