import React from "react"

const Button = ({ text, type, onClick }) => (
  <button
    className={`button ${type}`}
    onClick={onClick}
  >
    {text}
  </button>
)

export default Button
