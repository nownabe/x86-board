import React from "react"
import { sprintf } from "sprintf-js"
import { REGISTERS } from "../constants"

const RegisterTable = ({ registers }) => {
  let regs = []
  for(let i = 0; i < REGISTERS.length / 2; i++) {
    regs.push(
      <tr key={i}>
        <td>{REGISTERS[i]}</td>
        <td>{sprintf("0x%08X", registers[i])}</td>
        <td>{REGISTERS[i + REGISTERS.length / 2]}</td>
        <td>{sprintf("0x%08X", registers[i + REGISTERS.length / 2])}</td>
      </tr>
    )
  }

  return(
    <table className="table is-narrow">
      <thead>
        <tr>
          <th>Register</th>
          <th>Data</th>
          <th>Register</th>
          <th>Data</th>
        </tr>
     </thead>
      <tbody>{regs}</tbody>
    </table>
  )
}

export default RegisterTable
