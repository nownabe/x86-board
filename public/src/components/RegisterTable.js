import React from "react"
import { sprintf } from "sprintf-js"
import { REGISTERS } from "../constants"

const RegisterTable = ({ registers }) => {
  let regs = REGISTERS.map(reg => {
    let key = REGISTERS.indexOf(reg)
    return(
      <tr key={key}>
        <td>{reg}</td>
        <td>{sprintf("0x%08X", registers[key])}</td>
      </tr>
    )
  })
  return(
    <table className="table is-narrow">
      <thead>
        <tr>
          <th>Register</th>
          <th>Value</th>
        </tr>
     </thead>
      <tbody>{regs}</tbody>
    </table>
  )
}

export default RegisterTable
