import React from "react"
import { connect } from "react-redux"
import PresetSelector from "./PresetSelector"
import StepButton from "./StepButton"
import ResetButton from "./ResetButton"
import RunButton from "./RunButton"
import { initializeEmulator, setAssembly, setInput } from "../actions"

const Controller = ({ dispatch, assembly, isRunning, input, emulator, isAssembled, isFinished }) => {
  let assemblyEditor
  let inputEditor
  let assembleOnClick = (e) => {
    let input = inputEditor.value
    dispatch(setAssembly(assemblyEditor.value))
    dispatch(setInput(input))
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
      dispatch(initializeEmulator(binary, input))
    })
  }
  let onChangeEditor = (e) => {
    dispatch(setAssembly(assemblyEditor.value))
  }

  return (
    <div id="controller" className="column">
      { isFinished ? <span>Finished!</span> : null }
      <div id="buttons">
        <button className="button is-primary" onClick={assembleOnClick} disabled={isRunning}>Assemble</button>
        <StepButton />
        <RunButton />
        <ResetButton />
        <PresetSelector />
      </div>
      <div id="editor">
        <h2>Editor</h2>
        <textarea
          className="textarea"
          value={assembly}
          ref={node => {assemblyEditor = node}}
          disabled={isRunning}
          onChange={onChangeEditor}
        />
      </div>
      <div id="io">
        <div id="input">
          <h2>Input</h2>
          <textarea
            className="textarea"
            defaultValue={input}
            ref={node => {inputEditor = node}}
            disabled={isRunning}
          />
        </div>
        <div id="output">
          <h2>Output</h2>
          <pre>
            {emulator.io.output}
          </pre>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    assembly: state.assembly,
    emulator: state.emulator,
    input: state.input,
    isAssembled: state.isAssembled,
    isFinished: state.isFinished,
    isRunning: state.isRunning,
  }
}

export default connect(mapStateToProps)(Controller)
