import React from "react"

const Controller = () => (
  <div id="controller" className="column">
    <div id="buttons">
      <button className="button is-primary">Step</button>
      <button className="button is-primary">Run</button>
      <button className="button is-warning">Reset</button>
    </div>
    <div id="editor">
      <h2>Editor</h2>
      <textarea></textarea>
    </div>
    <div id="io">
      <div id="input">
        <h2>Input</h2>
        <textarea></textarea>
      </div>
      <div id="output">
        <h2>Output</h2>
        <textarea></textarea>
      </div>
    </div>
  </div>
)

export default Controller
