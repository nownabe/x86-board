import React from "react"
import { connect } from "react-redux"
import { run } from "../actions"

const RunButton = ({ dispatch, emulator, isAssembled, isRunning }) => {
  let onClick = () => {
    dispatch(run(emulator))
  }

  return (
    <button className="button is-success" onClick={onClick} disabled={!isAssembled || isRunning}>
      Run
    </button>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    emulator: state.emulator,
    isAssembled: state.isAssembled,
    isRunning: state.isRunning
  }
}

export default connect(mapStateToProps)(RunButton)
