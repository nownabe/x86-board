// USELESS

import { connect } from "react-redux"
import Button from "../components/Button.js"

const mapStateToProps = (state, ownProps) => {
  return {
    text: "Assemble",
    type: "is-primary"
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      console.log("onClick Assemble")
      // dispatch()
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
