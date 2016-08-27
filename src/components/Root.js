import React from "react"
import Controller from "./Controller"
import Computer from "./Computer"

const Root = () => (
  <div id="board" className="columns">
    <Controller />
    <Computer />
  </div>
)

export default Root
