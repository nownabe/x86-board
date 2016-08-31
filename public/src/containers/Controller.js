import React from "react"
import { connect } from "react-redux"
import StepButton from "./StepButton"
import ResetButton from "./ResetButton"
import { setBinary, setAssembly } from "../actions"

const Controller = ({ dispatch, assembly, isRunning, emulator }) => {
  let assemblyEditor
  let assembleOnClick = (e) => {
    dispatch(setAssembly(assemblyEditor.value))
    console.log("POST /assemble")
    fetch("/assemble", {
      method: "POST",
      body: JSON.stringify({ code: assemblyEditor.value })
    }).then(response => {
      console.log("succeeded assemble")
      console.log(response)
      return response.json()
    }).then(data => {
      console.log(data.encoded)
      let binary = atob(data.encoded)
      dispatch(setBinary(binary, emulator))
    })
  }

  return (
    <div id="controller" className="column">
      <div id="buttons">
        <button className="button is-primary" onClick={assembleOnClick} disabled={isRunning}>Assemble</button>
        <StepButton />
        <button className="button is-success">Run</button>
        <ResetButton />
      </div>
      <div id="editor">
        <h2>Editor</h2>
        <textarea
          className="textarea"
          defaultValue={assembly}
          ref={node => {assemblyEditor = node}}
          disabled={isRunning}
        />
      </div>
      <div id="io">
        <div id="input">
          <h2>Input</h2>
          <textarea className="textarea" disabled={isRunning}></textarea>
        </div>
        <div id="output">
          <h2>Output</h2>
          <textarea className="textarea" disabled={isRunning}></textarea>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    assembly: state.assembly,
    isRunning: state.isRunning,
    emulator: state.emulator
  }
}

export default connect(mapStateToProps)(Controller)
