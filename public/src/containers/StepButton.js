import React from "react"
import { connect } from "react-redux"
import { step } from "../actions"

const StepButton = ({ dispatch, emulator, isAssembled }) => {
  let onClick = () => {
    dispatch(step(emulator))
  }

  return (
    <button className="button is-success" onClick={onClick} disabled={!isAssembled}>
      Step
    </button>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    emulator: state.emulator,
    isAssembled: state.isAssembled
  }
}

export default connect(mapStateToProps)(StepButton)
