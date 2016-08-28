import React from "react"
import Editor from "../containers/Editor"

const Controller = () => (
  <div id="controller" className="column">
    <div id="buttons">
      <button className="button is-primary">Assemble</button>
      <button className="button is-success">Step</button>
      <button className="button is-success">Run</button>
      <button className="button is-warning">Reset</button>
    </div>
    <div>
      <h2>Editor</h2>
      <Editor />
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

export default Controller
