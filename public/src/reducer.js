import { combineReducers } from "redux"
import assembly from "./reducers/assembly"
import binary from "./reducers/binary"
import eflags from "./reducers/eflags"
import isRunning from "./reducers/isRunning"
import memory from "./reducers/memory"
import registers from "./reducers/registers"
import program_counter from "./reducers/program_counter"

const reducer = combineReducers({
  assembly,
  binary,
  eflags,
  isRunning,
  memory,
  registers,
  program_counter
})

export default reducer
