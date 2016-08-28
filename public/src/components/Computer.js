import React from "react"
import Registers from "../containers/Registers"

const Computer = () => (
  <div id="computer" className="column">
    <div id="data">
      <div id="registers">
        <h2>Registers</h2>
        <Registers />
      </div>
      <div id="memory">
        <h2>Memory</h2>
      </div>
    </div>
  </div>
)

export default Computer
