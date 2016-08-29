import React from "react"
import { connect } from "react-redux"
import { setBinary, setAssembly } from "../actions"

const Controller = ({ dispatch, assembly }) => {
  let assemblyEditor
  let assembleOnClick = (e) => {
    dispatch(setAssembly(assemblyEditor.value))
    console.log("POST /assembly")
    fetch("/assemble", {
      method: "POST",
      body: JSON.stringify({ code: assemblyEditor.value })
    }).then(response => {
      console.log("succeeded assemble")
      console.log(response)
      return response.json()
    }).then(data => {
      console.log(data.encoded)
      dispatch(setBinary(atob(data.encoded)))
    })
  }

  return (
    <div id="controller" className="column">
      <div id="buttons">
        <button className="button is-primary" onClick={assembleOnClick}>Assemble</button>
        <button className="button is-success">Step</button>
        <button className="button is-success">Run</button>
        <button className="button is-warning">Reset</button>
      </div>
      <div id="editor">
        <h2>Editor</h2>
        <textarea
          className="textarea"
          defaultValue={assembly}
          ref={node => {assemblyEditor = node}}
        />
      </div>
      <div id="io">
        <div id="input">
          <h2>Input</h2>
          <textarea className="textarea"></textarea>
        </div>
        <div id="output">
          <h2>Output</h2>
          <textarea className="textarea"></textarea>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    assembly: state.assembly
  }
}

export default connect(mapStateToProps)(Controller)
