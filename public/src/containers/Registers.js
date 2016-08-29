import { connect } from "react-redux"
import RegisterTable from "../components/RegisterTable"

const mapStateToProps = (state) => {
  return {
    registers: state.registers
  }
}

const Registers = connect(
  mapStateToProps
)(RegisterTable)

export default Registers
