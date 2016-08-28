import React from "react"
import { connect } from "react-redux"

let Editor = ({ assembly }) => (
  <textarea id="editor" className="textarea" defaultValue={assembly} />
)

const mapStateToProps = (state) => {
  return {
    assembly: state.assembly
  }
}

Editor = connect(
  mapStateToProps
)(Editor)

export default Editor
