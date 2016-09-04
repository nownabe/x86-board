import React from "react"
import Eflags from "../containers/eflags"
import Memory from "../containers/Memory"
import Registers from "../containers/Registers"

const Computer = () => (
  <div id="computer" className="column">
    <div id="data">
      <Eflags />
      <div id="registers">
        <h2>Registers</h2>
        <Registers />
      </div>
      <div id="memory">
        <h2>Memory</h2>
        <Memory />
      </div>
    </div>
  </div>
)

export default Computer
