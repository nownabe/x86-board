import React from "react"
import { connect } from "react-redux"
import { reset } from "../actions"

const ResetButton = ({ dispatch }) => {
  let onClick = () => {
    console.log("Reset")
    dispatch(reset())
  }

  return (
    <button className="button is-warning" onClick={onClick}>
      Reset
    </button>
  )
}

export default connect()(ResetButton)
